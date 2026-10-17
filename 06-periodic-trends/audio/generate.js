import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { env } from "@huggingface/transformers";
import { KokoroTTS } from "kokoro-js";

const MIX_CEILING_DBFS = -1;

const readJson = async (name) =>
  JSON.parse(await readFile(new URL(name, import.meta.url), "utf8"));

const script = await readJson("./script.json");
const model = await readJson("./model.json");
const outputUrl = new URL("../public/soundtrack.wav", import.meta.url);
const timelineUrl = new URL("../src/timeline.json", import.meta.url);

const dbToGain = (db) => 10 ** (db / 20);
const gainToDb = (gain) => 20 * Math.log10(gain);
const frameToSample = (frame, rate) => Math.round((frame / script.fps) * rate);

function peak(samples) {
  let max = 0;
  for (const value of samples) {
    max = Math.max(max, Math.abs(value));
  }
  return max;
}

async function speakLines() {
  env.cacheDir = fileURLToPath(
    new URL("../.cache/huggingface/", import.meta.url),
  );
  env.remotePathTemplate = `{model}/resolve/${model.revision}/`;
  const tts = await KokoroTTS.from_pretrained(model.id, {
    dtype: model.dtype,
    device: "cpu",
  });
  const clips = [];
  for (const line of script.lines) {
    const audio = await tts.generate(line.text, {
      voice: script.voice.id,
      speed: script.voice.speed,
    });
    clips.push({ line, samples: audio.audio, rate: audio.sampling_rate });
  }
  return clips;
}

/**
 * Lays scenes out around the measured narration: each line starts a fixed
 * lead into its scene, consecutive lines are separated by a fixed silence,
 * and scenes overlap by the crossfade.
 */
function layOut(clips, rate) {
  const {
    firstLeadFrames,
    leadFrames,
    gapFrames,
    crossfadeFrames,
    endHoldFrames,
  } = script.timeline;
  const scenes = [];
  let from = 0;
  let lineStart = firstLeadFrames;
  clips.forEach(({ line, samples }, index) => {
    const lineFrames = Math.ceil((samples.length / rate) * script.fps);
    const lineEnd = lineStart + lineFrames;
    const nextStart = lineEnd + gapFrames;
    const last = index === clips.length - 1;
    const to = last
      ? lineEnd + endHoldFrames
      : nextStart - leadFrames + crossfadeFrames;
    scenes.push({ id: line.scene, from, to, lineStart, lineFrames });
    from = nextStart - leadFrames;
    lineStart = nextStart;
  });
  const durationInFrames = scenes[scenes.length - 1].to;
  return { fps: script.fps, durationInFrames, scenes };
}

function checkTimeline(timeline) {
  const { crossfadeFrames, minGapSeconds, maxGapSeconds } = script.timeline;
  const { minTotalSeconds, maxTotalSeconds } = script.timeline;
  timeline.scenes.forEach((scene, index) => {
    const lineEnd = scene.lineStart + scene.lineFrames;
    console.log(
      `${scene.id}: ${(scene.lineFrames / script.fps).toFixed(2)} s, scene ${scene.from}-${scene.to}, narration ${scene.lineStart}-${lineEnd}`,
    );
    const fadeIn = index === 0 ? 0 : crossfadeFrames;
    if (scene.lineStart - scene.from < fadeIn) {
      throw new Error(`${scene.id} narration starts during the crossfade.`);
    }
    const last = index === timeline.scenes.length - 1;
    if (!last && scene.to - lineEnd < crossfadeFrames) {
      throw new Error(`${scene.id} narration runs into the crossfade.`);
    }
    const next = timeline.scenes[index + 1];
    if (next) {
      const gap = (next.lineStart - lineEnd) / script.fps;
      if (gap < minGapSeconds || gap > maxGapSeconds) {
        throw new Error(
          `Gap after ${scene.id} is ${gap.toFixed(2)} s, outside ${minGapSeconds}-${maxGapSeconds} s.`,
        );
      }
    }
  });
  const total = timeline.durationInFrames / script.fps;
  console.log(`Timeline: ${timeline.durationInFrames} frames, ${total} s`);
  if (total < minTotalSeconds || total > maxTotalSeconds) {
    throw new Error(
      `Video is ${total.toFixed(2)} s, outside ${minTotalSeconds}-${maxTotalSeconds} s.`,
    );
  }
}

function layVoice(clips, timeline, rate, length) {
  const voice = new Float32Array(length);
  const active = new Uint8Array(length);
  const target = dbToGain(script.voice.peakDbfs);
  clips.forEach(({ line, samples }, index) => {
    const start = frameToSample(timeline.scenes[index].lineStart, rate);
    const level = peak(samples);
    if (level === 0) {
      throw new Error(`${line.scene} narration is silent.`);
    }
    const gain = target / level;
    for (let i = 0; i < samples.length; i += 1) {
      voice[start + i] += samples[i] * gain;
      active[start + i] = 1;
    }
  });
  return { voice, active };
}

function padTrack(rate, length) {
  const pad = new Float32Array(length);
  const { chordHz } = script.pad;
  let lowpass = 0;
  for (let i = 0; i < length; i += 1) {
    const t = i / rate;
    let sample = 0;
    chordHz.forEach((hz, voiceIndex) => {
      const swell =
        0.6 + 0.4 * Math.sin(2 * Math.PI * (0.03 + voiceIndex * 0.011) * t);
      sample +=
        swell *
        (Math.sin(2 * Math.PI * hz * t) +
          0.3 * Math.sin(2 * Math.PI * hz * 2.002 * t) +
          0.15 * Math.sin(2 * Math.PI * hz * 0.5 * t));
    });
    const cutoff = 700 + 200 * Math.sin(2 * Math.PI * 0.04 * t);
    const alpha = 1 - Math.exp((-2 * Math.PI * cutoff) / rate);
    lowpass += alpha * (sample - lowpass);
    pad[i] = lowpass;
  }
  const gain = dbToGain(script.pad.peakDbfs) / peak(pad);
  const fadeIn = frameToSample(script.pad.fadeInFrames, rate);
  const fadeOut = frameToSample(script.pad.fadeOutFrames, rate);
  for (let i = 0; i < length; i += 1) {
    const rise = Math.min(1, i / fadeIn);
    const fall = Math.min(1, (length - 1 - i) / fadeOut);
    pad[i] *=
      gain * Math.sin((Math.PI / 2) * rise) * Math.sin((Math.PI / 2) * fall);
  }
  return pad;
}

function duck(active, rate) {
  const envelope = new Float32Array(active.length);
  const low = dbToGain(script.pad.duckDb);
  const attack = Math.exp(-1 / ((script.pad.duckAttackMs / 1000) * rate));
  const release = Math.exp(-1 / ((script.pad.duckReleaseMs / 1000) * rate));
  let gain = 1;
  for (let i = 0; i < active.length; i += 1) {
    const target = active[i] ? low : 1;
    const coefficient = target < gain ? attack : release;
    gain = target + coefficient * (gain - target);
    envelope[i] = gain;
  }
  return envelope;
}

function toWav(samples, rate) {
  const bytes = samples.length * 2;
  const buffer = Buffer.alloc(44 + bytes);
  buffer.write("RIFF", 0, "ascii");
  buffer.writeUInt32LE(36 + bytes, 4);
  buffer.write("WAVE", 8, "ascii");
  buffer.write("fmt ", 12, "ascii");
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(rate, 24);
  buffer.writeUInt32LE(rate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36, "ascii");
  buffer.writeUInt32LE(bytes, 40);
  samples.forEach((value, i) => {
    const clamped = Math.max(-1, Math.min(1, value));
    buffer.writeInt16LE(Math.round(clamped * 32767), 44 + i * 2);
  });
  return buffer;
}

async function main() {
  const clips = await speakLines();
  const rate = clips[0].rate;
  if (clips.some((clip) => clip.rate !== rate)) {
    throw new Error("Narration clips have different sample rates.");
  }
  const timeline = layOut(clips, rate);
  checkTimeline(timeline);
  const length = frameToSample(timeline.durationInFrames, rate);
  const { voice, active } = layVoice(clips, timeline, rate, length);
  const pad = padTrack(rate, length);
  const envelope = duck(active, rate);
  const mix = new Float32Array(length);
  for (let i = 0; i < length; i += 1) {
    mix[i] = voice[i] + pad[i] * envelope[i];
  }
  const peakDb = gainToDb(peak(mix));
  if (peakDb > MIX_CEILING_DBFS) {
    throw new Error(
      `Mix peaks at ${peakDb.toFixed(1)} dBFS, above ${MIX_CEILING_DBFS} dBFS.`,
    );
  }
  await mkdir(new URL(".", outputUrl), { recursive: true });
  await writeFile(outputUrl, toWav(mix, rate));
  await writeFile(timelineUrl, `${JSON.stringify(timeline, null, 2)}\n`);
  console.log(
    `Soundtrack: ${(length / rate).toFixed(2)} s at ${rate} Hz, peak ${peakDb.toFixed(1)} dBFS`,
  );
}

// The phonemizer replaces uncaught error output with its bundled source,
// so failures must be reported here.
try {
  await main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
