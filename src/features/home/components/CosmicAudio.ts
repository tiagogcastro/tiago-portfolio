import type { DiscoveryId } from "@/features/home/components/cosmicTypes";

/** A quiet, original 74 BPM instrumental: soft keys, bass and brushed percussion. */
export class CosmicAudio {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private input: BiquadFilterNode | null = null;
  private noise: AudioBuffer | null = null;
  private timer: ReturnType<typeof setInterval> | undefined;
  private voices = new Set<AudioScheduledSourceNode>();
  private playing = false;
  private volume = 0.5;
  private step = 0;
  private nextTime = 0;
  private lastActivation = -Infinity;

  async start() {
    if (!this.context) {
      this.context = new AudioContext();
      const context = this.context;
      const master = context.createGain();
      master.gain.value = 0;
      this.master = master;

      const compressor = context.createDynamicsCompressor();
      compressor.threshold.value = -18;
      compressor.ratio.value = 3;
      master.connect(compressor).connect(context.destination);

      const filter = context.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 3400;
      filter.Q.value = 0.3;
      filter.connect(master);
      this.input = filter;

      const impulse = context.createBuffer(
        2,
        context.sampleRate * 1.7,
        context.sampleRate,
      );
      for (let channel = 0; channel < 2; channel++) {
        const data = impulse.getChannelData(channel);
        for (let i = 0; i < data.length; i++) {
          data[i] =
            (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 3.5);
        }
      }

      const reverb = context.createConvolver();
      reverb.buffer = impulse;
      const wet = context.createGain();
      wet.gain.value = 0.14;
      filter.connect(reverb).connect(wet).connect(master);

      this.noise = context.createBuffer(
        1,
        context.sampleRate * 0.3,
        context.sampleRate,
      );
      const noise = this.noise.getChannelData(0);
      for (let i = 0; i < noise.length; i++) noise[i] = Math.random() * 2 - 1;
    }

    await this.context.resume();
    if (this.context.state !== "running")
      throw new Error("Audio could not resume");
    if (this.playing) return;

    this.playing = true;
    this.step = 0;
    this.nextTime = this.context.currentTime + 0.04;
    this.setVolume(this.volume);
    this.schedule();
    this.timer = setInterval(() => this.schedule(), 25);
  }

  private track(source: AudioScheduledSourceNode, nodes: AudioNode[]) {
    this.voices.add(source);
    source.onended = () => {
      source.disconnect();
      nodes.forEach((node) => node.disconnect());
      this.voices.delete(source);
    };
  }

  private note(
    frequency: number,
    time: number,
    duration: number,
    strength: number,
    type: OscillatorType = "sine",
  ) {
    if (!this.playing || !this.context || !this.input) return;

    const context = this.context;
    const envelope = context.createGain();
    envelope.gain.setValueAtTime(0, time);
    envelope.gain.linearRampToValueAtTime(strength, time + 0.025);
    envelope.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    envelope.connect(this.input);

    const oscillator = context.createOscillator();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    oscillator.connect(envelope);
    this.track(oscillator, [envelope]);
    oscillator.start(time);
    oscillator.stop(time + duration + 0.02);
  }

  private drum(time: number, kind: "kick" | "brush" | "hat") {
    if (!this.context || !this.input || !this.noise) return;
    const context = this.context;
    const envelope = context.createGain();
    envelope.connect(this.input);

    if (kind === "kick") {
      const oscillator = context.createOscillator();
      oscillator.frequency.setValueAtTime(110, time);
      oscillator.frequency.exponentialRampToValueAtTime(48, time + 0.12);
      envelope.gain.setValueAtTime(0, time);
      envelope.gain.linearRampToValueAtTime(0.22, time + 0.008);
      envelope.gain.exponentialRampToValueAtTime(0.0001, time + 0.28);
      oscillator.connect(envelope);
      this.track(oscillator, [envelope]);
      oscillator.start(time);
      oscillator.stop(time + 0.3);
      return;
    }

    const source = context.createBufferSource();
    source.buffer = this.noise;
    const filter = context.createBiquadFilter();
    filter.type = kind === "hat" ? "highpass" : "bandpass";
    filter.frequency.value = kind === "hat" ? 4500 : 1800;
    filter.Q.value = 0.5;
    source.connect(filter).connect(envelope);
    const duration = kind === "hat" ? 0.065 : 0.16;
    envelope.gain.setValueAtTime(0, time);
    envelope.gain.linearRampToValueAtTime(
      kind === "hat" ? 0.028 : 0.075,
      time + 0.01,
    );
    envelope.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    this.track(source, [filter, envelope]);
    source.start(time);
    source.stop(time + duration + 0.01);
  }

  private schedule() {
    if (!this.playing || !this.context) return;
    const eighth = 60 / 74 / 2;
    if (this.nextTime < this.context.currentTime - eighth)
      this.nextTime = this.context.currentTime + 0.03;

    // Schedule against the audio clock so animation frames cannot disturb the beat.
    while (this.nextTime < this.context.currentTime + 0.15) {
      const step = this.step % 16;
      const bar = Math.floor(this.step / 16) % 4;
      const chords = [
        [130.81, 164.81, 196, 246.94],
        [110, 130.81, 164.81, 196],
        [87.31, 110, 130.81, 164.81],
        [98, 123.47, 146.83, 174.61],
      ];
      const chord = chords[bar];
      const time = this.nextTime + (step % 2 ? 0.035 : 0);

      if (step === 0 || step === 7) {
        chord.forEach((frequency, index) =>
          this.note(
            frequency * 2,
            time + index * 0.012,
            2.3,
            step === 0 ? 0.075 : 0.052,
            "triangle",
          ),
        );
      }
      if (step === 0 || step === 8) this.note(chord[0] / 2, time, 0.85, 0.2);
      if (step === 0 || step === 8 || (bar % 2 === 1 && step === 11))
        this.drum(time, "kick");
      if (step === 4 || step === 12) this.drum(time, "brush");
      if (step % 2 === 0) this.drum(time, "hat");
      if (step === 3 || step === 10 || (bar % 2 === 0 && step === 14)) {
        this.note(chord[(step + bar) % chord.length] * 4, time, 1.8, 0.04);
      }

      this.step++;
      this.nextTime += eighth;
    }
  }

  discover(id: DiscoveryId) {
    if (!this.playing || !this.context || !this.input) return;
    const time = this.context.currentTime;
    if (time - this.lastActivation < 0.25) return;
    this.lastActivation = time;

    if (id === "core") {
      // A warm rising activation tone, followed by a soft confirmation note.
      const oscillator = this.context.createOscillator();
      const envelope = this.context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(196, time);
      oscillator.frequency.exponentialRampToValueAtTime(523.25, time + 0.45);
      envelope.gain.setValueAtTime(0, time);
      envelope.gain.linearRampToValueAtTime(0.14, time + 0.08);
      envelope.gain.exponentialRampToValueAtTime(0.0001, time + 0.85);
      oscillator.connect(envelope).connect(this.input);
      this.track(oscillator, [envelope]);
      oscillator.start(time);
      oscillator.stop(time + 0.9);
      this.note(783.99, time + 0.38, 0.9, 0.055);
    } else if (id === "avatar") {
      // Three short, airy notes suggest a thought lighting up.
      [1046.5, 1318.51, 1567.98].forEach((frequency, index) => {
        this.note(frequency, time + index * 0.11, 0.55, 0.065);
      });
    } else {
      const frequency = { lakeit: 392, futbuy: 523.25, orbit: 587.33 }[id];
      this.note(frequency, time, 0.7, 0.065);
      this.note(frequency * 1.5, time + 0.15, 0.8, 0.04);
    }
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (!this.context || !this.master) return;
    this.master.gain.cancelScheduledValues(this.context.currentTime);
    this.master.gain.setTargetAtTime(
      this.playing ? this.volume * 0.6 : 0,
      this.context.currentTime,
      0.12,
    );
  }

  stop() {
    this.playing = false;
    clearInterval(this.timer);
    this.timer = undefined;
    this.setVolume(this.volume);
    if (this.context)
      this.voices.forEach((voice) =>
        voice.stop(this.context!.currentTime + 0.4),
      );
  }

  close() {
    this.stop();
    void this.context?.close();
    this.context = null;
  }
}
