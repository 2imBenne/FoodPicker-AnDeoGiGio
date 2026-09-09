/**
 * Sound Engine — Web Audio API synthesized sounds
 * Tạo âm thanh CS2 case opening: tick, roll, fanfare
 * Không cần file audio bên ngoài
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.initialized = false;
    this.muted = false;
  }

  init() {
    if (this.initialized) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.initialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported:', e);
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  /** Tick sound — mỗi khi item đi qua indicator */
  playTick(pitchMultiplier = 1) {
    if (!this.initialized || this.muted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = (1000 + Math.random() * 400) * pitchMultiplier;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  /** Roll sound — low rumble khi đang quay */
  playRoll() {
    if (!this.initialized || this.muted) return { stop() {} };
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 7;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 300;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.06, now);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    source.start(now);
    return {
      stop: () => {
        try {
          const t = this.ctx.currentTime;
          gain.gain.setValueAtTime(gain.gain.value, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
          setTimeout(() => { try { source.stop(); } catch (_) {} }, 500);
        } catch (_) {}
      },
    };
  }

  /** Win fanfare — ascending chimes */
  playWin() {
    if (!this.initialized || this.muted) return;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        if (this.muted) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const osc2 = this.ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.value = freq * 2;
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        const gain2 = this.ctx.createGain();
        gain2.gain.setValueAtTime(0.04, now);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        osc2.connect(gain2);
        gain.connect(this.ctx.destination);
        gain2.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.55);
        osc2.start(now);
        osc2.stop(now + 0.4);
      }, i * 140);
    });
    // Low thump at end
    setTimeout(() => {
      if (this.muted || !this.initialized) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.3);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    }, notes.length * 140 + 50);
  }

  /** CS2 Epic Gold Secret Win — Tiếng nổ vàng cực phẩm chấn động */
  playGoldWin() {
    if (!this.initialized || this.muted) return;
    const now = this.ctx.currentTime;

    // 1. Deep sub-bass drop chấn động
    const subOsc = this.ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(160, now);
    subOsc.frequency.exponentialRampToValueAtTime(30, now + 0.8);
    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.35, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.95);

    // 2. Chuỗi chimes lấp lánh vàng (Gold sparkle arpeggios)
    const sparkles = [1046.5, 1318.5, 1567.98, 2093.0, 2637.0, 3135.96];
    sparkles.forEach((freq, idx) => {
      setTimeout(() => {
        if (this.muted || !this.ctx) return;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        const g = this.ctx.createGain();
        g.gain.setValueAtTime(0.08, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
        osc.connect(g);
        g.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.4);
      }, idx * 60);
    });

    // 3. Triumphant Major Brass Chords (Kèn mừng hoàng gia CS2)
    const chords = [
      [523.25, 659.25, 783.99],          // C major
      [587.33, 739.99, 880.00],          // D major
      [659.25, 830.61, 987.77],          // E major
      [783.99, 987.77, 1174.66, 1567.98] // G major grand finish
    ];

    chords.forEach((chord, step) => {
      setTimeout(() => {
        if (this.muted || !this.ctx) return;
        const t = this.ctx.currentTime;
        chord.forEach(freq => {
          const osc = this.ctx.createOscillator();
          osc.type = 'sawtooth';
          osc.frequency.value = freq;

          const filter = this.ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1400, t);
          filter.frequency.exponentialRampToValueAtTime(400, t + 0.7);

          const g = this.ctx.createGain();
          const duration = step === chords.length - 1 ? 1.4 : 0.45;
          g.gain.setValueAtTime(0.07, t);
          g.gain.exponentialRampToValueAtTime(0.001, t + duration);

          osc.connect(filter);
          filter.connect(g);
          g.connect(this.ctx.destination);

          osc.start(t);
          osc.stop(t + duration + 0.05);
        });
      }, 250 + step * 220);
    });
  }
}

// Singleton instance
export const soundEngine = new SoundEngine();
