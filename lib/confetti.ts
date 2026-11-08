import type { Shape } from 'canvas-confetti';

const PALETTE = ['#2f8f46', '#7bd389', '#f5c542', '#6d4aa8', '#f6f1df'];

const SHAPE_PATHS = [
  'M0 10 L5 0 L10 10 Z',
  'M5 0 L10 5 L5 10 L0 5 Z',
  'M8 0 C2 2 0 8 0 12 C6 10 10 6 8 0 Z',
];

export async function fireZeldaConfetti(): Promise<void> {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const { default: confetti } = await import('canvas-confetti');
    const shapes = SHAPE_PATHS.map((path) => confetti.shapeFromPath({ path }));

    const burst = (origin: { x: number; y: number }, angle: number) => {
      confetti({
        particleCount: 90,
        spread: 70,
        angle,
        origin,
        colors: PALETTE,
        scalar: 1.2,
        shapes: shapes as Shape[],
        disableForReducedMotion: true,
      });
    };

    burst({ x: 0.18, y: 0.3 }, 60);
    burst({ x: 0.82, y: 0.3 }, 120);
  } catch {
    // Celebration is optional: a failed import or canvas should never break play.
  }
}
