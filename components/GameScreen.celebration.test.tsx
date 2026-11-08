import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireZeldaConfetti } from '@/lib/confetti';
import { playMoveSound, playWinSound } from '@/lib/sound';
import { GameScreen } from './GameScreen';

vi.mock('@/lib/confetti', () => ({ fireZeldaConfetti: vi.fn() }));
vi.mock('@/lib/sound', () => ({
  playMoveSound: vi.fn(),
  playWinSound: vi.fn(),
}));

const clickCell = (name: string) => fireEvent.click(screen.getByRole('button', { name }));

const winForHero = () => {
  clickCell('Row 1, column 1, empty');
  clickCell('Row 2, column 1, empty');
  clickCell('Row 1, column 2, empty');
  clickCell('Row 2, column 2, empty');
  clickCell('Row 1, column 3, empty');
};

describe('celebration effects', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => vi.restoreAllMocks());

  it('plays a move sound only for accepted moves', () => {
    render(<GameScreen />);
    clickCell('Row 2, column 2, empty');
    expect(playMoveSound).toHaveBeenCalledOnce();

    fireEvent.click(screen.getByRole('button', { name: 'Row 2, column 2, Hero' }));
    expect(playMoveSound).toHaveBeenCalledOnce();
  });

  it('fires confetti and plays the win jingle on a win', () => {
    render(<GameScreen />);
    winForHero();
    expect(fireZeldaConfetti).toHaveBeenCalledOnce();
    expect(playWinSound).toHaveBeenCalled();
  });

  it('mutes sound without stopping the game', () => {
    render(<GameScreen />);
    fireEvent.click(screen.getByRole('button', { name: 'Mute sound' }));
    clickCell('Row 2, column 2, empty');
    expect(playMoveSound).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Row 2, column 2, Hero' })).toBeInTheDocument();
  });
});
