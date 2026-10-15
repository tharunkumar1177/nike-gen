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

function layVoice(clips, rate, length) {
  const voice = new Float32Array(length);
  const active = new Uint8Array(length);
  const target = dbToGain(script.voice.peakDbfs);
  const overruns = [];
  for (const { line, samples } of clips) {
    const start = frameToSample(line.startFrame, rate);
    const endFrame = Math.ceil(
      ((start + samples.length) / rate) * script.fps,
    );
    console.log(
      `${line.scene}: ${(samples.length / rate).toFixed(2)} s, frames ${line.startFrame}-${endFrame} (limit ${line.endByFrame})`,
    );
    if (endFrame > line.endByFrame) {
      overruns.push(`${line.scene} ends at ${endFrame} > ${line.endByFrame}`);
      continue;
    }
    const level = peak(samples);
    if (level === 0) {
      throw new Error(`${line.scene} narration is silent.`);
    }
    const gain = target / level;
    for (let i = 0; i < samples.length; i += 1) {
      voice[start + i] += samples[i] * gain;
      active[start + i] = 1;
    }
  }
  if (overruns.length > 0) {
    throw new Error(`Narration overruns: ${overruns.join("; ")}.`);
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
    chordHz.forEach((hz, index) => {
      const swell = 0.6 + 0.4 * Math.sin(2 * Math.PI * (0.03 + index * 0.011) * t);
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
  const rate = clips[0].rate;
  if (clips.some((clip) => clip.rate !== rate)) {
    throw new Error("Narration clips have different sample rates.");
  }
  const length = frameToSample(script.durationInFrames, rate);
  const { voice, active } = layVoice(clips, rate, length);
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
