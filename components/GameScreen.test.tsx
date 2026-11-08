import { fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { GameScreen } from './GameScreen';

const playHeroWin = () => {
  [
    'Row 1, column 1, empty',
    'Row 2, column 1, empty',
    'Row 1, column 2, empty',
    'Row 2, column 2, empty',
    'Row 1, column 3, empty',
  ].forEach((name) => fireEvent.click(screen.getByRole('button', { name })));
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('GameScreen', () => {
  it('shows scores, round, and whose turn it is', () => {
    render(<GameScreen />);
    expect(screen.getByText(/Round 1/)).toBeInTheDocument();
    expect(screen.getByText("Hero's turn")).toBeInTheDocument();
    expect(screen.getByLabelText('Hero score')).toHaveTextContent('0');
    expect(screen.getByLabelText('Shadow score')).toHaveTextContent('0');
  });

  it('places a mark and alternates the turn', () => {
    render(<GameScreen />);
    fireEvent.click(screen.getByRole('button', { name: 'Row 2, column 2, empty' }));
    expect(screen.getByRole('button', { name: 'Row 2, column 2, Hero' })).toBeInTheDocument();
    expect(screen.getByText("Shadow's turn")).toBeInTheDocument();
  });

  it('shows the winner banner and updates the score', () => {
    render(<GameScreen />);
    playHeroWin();
    const overlay = screen.getByRole('dialog', { name: 'Round result' });
    expect(within(overlay).getByText('Hero wins!')).toBeInTheDocument();
    expect(screen.getByLabelText('Hero score')).toHaveTextContent('1');
  });

  it('resets the match only after confirmation', () => {
    const confirm = vi
      .spyOn(window, 'confirm')
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);
    render(<GameScreen />);
    playHeroWin();
    fireEvent.click(screen.getByRole('button', { name: 'New match' }));
    expect(screen.getByLabelText('Hero score')).toHaveTextContent('1');

    fireEvent.click(screen.getByRole('button', { name: 'New match' }));
    expect(confirm).toHaveBeenCalledTimes(2);
    expect(screen.getByLabelText('Hero score')).toHaveTextContent('0');
    expect(screen.getByText(/Round 1/)).toBeInTheDocument();
  });
});
