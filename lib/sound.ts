type AudioContextWindow = Window & {
  webkitAudioContext?: typeof AudioContext;
};

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    if (audioContext && audioContext.state !== 'closed') {
      if (audioContext.state === 'suspended') {
        void audioContext.resume();
      }
      return audioContext;
    }

    const AudioContextConstructor =
      window.AudioContext ?? (window as AudioContextWindow).webkitAudioContext;

    if (!AudioContextConstructor) {
      return null;
    }

    audioContext = new AudioContextConstructor();
    return audioContext;
  } catch {
    return null;
  }
}

function playTone(
  context: AudioContext,
  frequency: number,
  offset: number,
  duration: number,
  volume: number,
  type: OscillatorType,
) {
  const start = context.currentTime + offset;
  const oscillator = context.createOscillator();
  const envelope = context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);

  envelope.gain.setValueAtTime(0.0001, start);
  envelope.gain.exponentialRampToValueAtTime(volume, start + 0.015);
  envelope.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  oscillator.connect(envelope);
  envelope.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.05);
}

export function playMoveSound(): void {
  const context = getAudioContext();
  if (!context) {
    return;
  }

  try {
    playTone(context, 220, 0, 0.09, 0.06, 'triangle');
  } catch {
    // Sound is a bonus; never let it interrupt the game.
  }
}

export function playWinSound(matchWin = false): void {
  const context = getAudioContext();
  if (!context) {
    return;
  }

  try {
    const notes = matchWin
      ? [523.25, 659.25, 783.99, 1046.5, 1318.51]
      : [523.25, 659.25, 783.99, 1046.5];
    const step = matchWin ? 0.13 : 0.1;
    const duration = matchWin ? 0.5 : 0.35;
    const volume = matchWin ? 0.075 : 0.055;

    notes.forEach((frequency, index) => {
      playTone(context, frequency, index * step, duration, volume, 'triangle');
    });
  } catch {
    // Sound is a bonus; never let it interrupt the game.
  }
}
