let ctx: AudioContext | null = null;
let noiseBuffer: AudioBuffer | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const W = window as typeof window & { webkitAudioContext?: typeof AudioContext };
    const Ctor = window.AudioContext || W.webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  return ctx;
}

// Pre-generate a short noise buffer once, reuse forever.
function getNoiseBuffer(audioCtx: AudioContext): AudioBuffer {
  if (noiseBuffer && noiseBuffer.sampleRate === audioCtx.sampleRate) {
    return noiseBuffer;
  }
  const duration = 0.04; // 40 ms — longer than playback so we can window it
  const len = Math.floor(audioCtx.sampleRate * duration);
  const buf = audioCtx.createBuffer(1, len, audioCtx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  noiseBuffer = buf;
  return buf;
}

/**
 * Roulette-wheel / spinner tick — a filtered noise burst.
 * Sharp impulse + tight bandpass ring, no pitch sweep, ~25 ms total.
 */
export function playClick() {
  const audioCtx = getCtx();
  if (!audioCtx) return;

  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }

  const now = audioCtx.currentTime;

  // Short noise burst — the source of the "click" texture
  const source = audioCtx.createBufferSource();
  source.buffer = getNoiseBuffer(audioCtx);

  // Tight bandpass for the metallic "tick" focus
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 2300;
  filter.Q.value = 11;

  // Slight highpass cleanup to kill any low rumble
  const hp = audioCtx.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = 1100;

  // Razor-fast envelope: 0 → peak in 1 ms, decay to silence in ~22 ms
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.18, now + 0.001);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.023);

  source.connect(filter);
  filter.connect(hp);
  hp.connect(gain);
  gain.connect(audioCtx.destination);

  source.start(now);
  source.stop(now + 0.04);
}
