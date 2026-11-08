import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireZeldaConfetti } from '@/lib/confetti';
import { GameScreen } from './GameScreen';

vi.mock('@/lib/confetti', () => ({ fireZeldaConfetti: vi.fn() }));
vi.mock('@/lib/sound', () => ({
  playMoveSound: vi.fn(),
  playWinSound: vi.fn(),
}));

const clickCell = (name: string) =>
  fireEvent.click(screen.getByRole('button', { name }));
const winForHero = () => {
  clickCell('Row 1, column 1, empty');
  clickCell('Row 2, column 1, empty');
  clickCell('Row 1, column 2, empty');
  clickCell('Row 2, column 2, empty');
  clickCell('Row 1, column 3, empty');
};

const mockReducedMotion = (reduced: boolean) => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: reduced && query.includes('prefers-reduced-motion'),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
};

describe('GameScreen accessibility', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockReducedMotion(false);
  });
  afterEach(() => vi.restoreAllMocks());

  it('announces turns and results in a live region', () => {
    render(<GameScreen />);
    expect(screen.getByRole('status')).toHaveTextContent(
      "Round 1. Hero's turn",
    );

    winForHero();
    expect(screen.getByRole('status')).toHaveTextContent('Hero wins');
  });

  it('keeps the board keyboard operable with native buttons', () => {
    render(<GameScreen />);
    const cell = screen.getByRole('button', { name: 'Row 2, column 2, empty' });
    expect(cell.tagName).toBe('BUTTON');
    cell.focus();
    expect(cell).toHaveFocus();
  });

  it('keeps focus on a cell after it is played', () => {
    render(<GameScreen />);
    const cell = screen.getByRole('button', { name: 'Row 2, column 2, empty' });
    cell.focus();
    fireEvent.click(cell);

    const played = screen.getByRole('button', {
      name: 'Row 2, column 2, Hero',
    });
    expect(played).toBe(cell);
    expect(played).toHaveAttribute('aria-disabled', 'true');
    expect(played).not.toBeDisabled();
    expect(played).toHaveFocus();
  });

  it('skips confetti when reduced motion is preferred', () => {
    mockReducedMotion(true);
    render(<GameScreen />);
    winForHero();
    expect(fireZeldaConfetti).not.toHaveBeenCalled();
    expect(screen.getByText('Hero wins!')).toBeInTheDocument();
  });
});
