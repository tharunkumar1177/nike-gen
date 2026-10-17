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
const samplesToFrames = (samples, rate) =>
  Math.ceil((samples / rate) * script.fps);

function peak(samples) {
  let max = 0;
  for (const value of samples) {
    max = Math.max(max, Math.abs(value));
  }
  return max;
}

function splitSentences(text) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text];
  return sentences.map((sentence) => sentence.trim()).filter(Boolean);
}

/**
 * Kokoro truncates long inputs, so each sentence is synthesised separately
 * and joined with a short pause.
 */
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
    const sentences = [];
    for (const text of splitSentences(line.text)) {
      const audio = await tts.generate(text, {
        voice: script.voice.id,
        speed: script.voice.speed,
      });
      sentences.push({
        text,
        samples: audio.audio,
        rate: audio.sampling_rate,
      });
    }
    clips.push({ line, sentences });
  }
  return clips;
}

/**
 * Lays scenes end to end from the measured clips: each narration starts
 * `leadFrames` into its scene and the next one starts `gapFrames` after it
 * ends, so the silence between topics is fixed.
 */
function layout(clips, rate) {
  const gap = Math.round(script.timing.sentenceGapSeconds * rate);
  const scenes = {};
  const lines = [];
  let from = 0;
  clips.forEach(({ line, sentences }, i) => {
    const startFrame =
      i === 0 ? script.timing.firstStartFrame : from + script.timing.leadFrames;
    let offset = 0;
    const parts = sentences.map((sentence, k) => {
      const part = {
        text: sentence.text,
        startFrame: startFrame + Math.floor((offset / rate) * script.fps),
        frames: samplesToFrames(sentence.samples.length, rate),
        samples: sentence.samples,
        sampleOffset: offset,
      };
      offset += sentence.samples.length + (k < sentences.length - 1 ? gap : 0);
      return part;
    });
    const endFrame = startFrame + samplesToFrames(offset, rate);
    const to = endFrame + script.timing.gapFrames - script.timing.leadFrames;
    scenes[line.scene] = { from, to };
    lines.push({ scene: line.scene, startFrame, endFrame, parts });
    console.log(
      `${line.scene}: ${(offset / rate).toFixed(2)} s, narration ${startFrame}-${endFrame}, scene ${from}-${to}`,
    );
    from = to;
  });
  scenes[script.timing.closingScene] = {
    from,
    to: from + script.timing.closingFrames,
  };
  return {
    scenes,
    lines,
    durationInFrames: from + script.timing.closingFrames,
  };
}

function layVoice(lines, rate, length) {
  const voice = new Float32Array(length);
  const active = new Uint8Array(length);
  const target = dbToGain(script.voice.peakDbfs);
  for (const line of lines) {
    const level = Math.max(...line.parts.map((part) => peak(part.samples)));
    if (level === 0) {
      throw new Error(`${line.scene} narration is silent.`);
    }
    const gain = target / level;
    const start = frameToSample(line.startFrame, rate);
    for (const part of line.parts) {
      const at = start + part.sampleOffset;
      for (let i = 0; i < part.samples.length; i += 1) {
        voice[at + i] += part.samples[i] * gain;
        active[at + i] = 1;
      }
    }
  }
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
          0.4 * Math.sin(2 * Math.PI * hz * 2.002 * t) +
          0.15 * Math.sin(2 * Math.PI * hz * 0.5 * t));
    });
    const cutoff = 900 + 300 * Math.sin(2 * Math.PI * 0.04 * t);
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
  const rate = clips[0].sentences[0].rate;
  if (clips.some((clip) => clip.sentences.some((s) => s.rate !== rate))) {
    throw new Error("Narration clips have different sample rates.");
  }
  const timeline = layout(clips, rate);
  const { minSeconds, maxSeconds } = script.timing.totalSeconds;
  const seconds = timeline.durationInFrames / script.fps;
  if (seconds < minSeconds || seconds > maxSeconds) {
    throw new Error(
      `Timeline is ${seconds.toFixed(1)} s, outside ${minSeconds}-${maxSeconds} s.`,
    );
  }
  const length = frameToSample(timeline.durationInFrames, rate);
  const { voice, active } = layVoice(timeline.lines, rate, length);
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
  const json = {
    fps: script.fps,
    durationInFrames: timeline.durationInFrames,
    scenes: timeline.scenes,
    lines: timeline.lines.map((line) => ({
      scene: line.scene,
      startFrame: line.startFrame,
      endFrame: line.endFrame,
      sentences: line.parts.map((part) => ({
        text: part.text,
        startFrame: part.startFrame,
        frames: part.frames,
      })),
    })),
  };
  await writeFile(timelineUrl, `${JSON.stringify(json, null, 2)}\n`);
  console.log(
    `Soundtrack: ${seconds.toFixed(2)} s at ${rate} Hz, peak ${peakDb.toFixed(1)} dBFS`,
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
