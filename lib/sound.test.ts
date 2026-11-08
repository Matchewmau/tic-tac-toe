import { afterEach, describe, expect, it, vi } from 'vitest';
import { playMoveSound, playWinSound } from './sound';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('sound helpers', () => {
  it('does not throw when AudioContext is unavailable', () => {
    vi.stubGlobal('AudioContext', undefined);
    expect(() => playMoveSound()).not.toThrow();
    expect(() => playWinSound()).not.toThrow();
    expect(() => playWinSound(true)).not.toThrow();
  });
});
