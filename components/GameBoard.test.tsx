import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { createBoard } from '@/lib/game';
import { GameBoard } from './GameBoard';

describe('GameBoard', () => {
  it('renders nine labelled cells and reports the clicked index', () => {
    const onMove = vi.fn();
    render(<GameBoard board={createBoard()} onMove={onMove} />);

    expect(screen.getAllByRole('button')).toHaveLength(9);
    fireEvent.click(screen.getByRole('button', { name: 'Row 2, column 2, empty' }));
    expect(onMove).toHaveBeenCalledWith(4);
  });

  it('labels occupied cells and disables them', () => {
    const onMove = vi.fn();
    const board = createBoard();
    board[0] = 'hero';
    render(<GameBoard board={board} onMove={onMove} />);

    const cell = screen.getByRole('button', { name: 'Row 1, column 1, Hero' });
    expect(cell).toBeDisabled();
    fireEvent.click(cell);
    expect(onMove).not.toHaveBeenCalled();
  });

  it('disables every cell when input is locked', () => {
    render(<GameBoard board={createBoard()} onMove={vi.fn()} disabled />);
    screen.getAllByRole('button').forEach((cell) => expect(cell).toBeDisabled());
  });

  it('marks exactly the winning cells', () => {
    const board = createBoard();
    board[0] = 'hero';
    board[1] = 'hero';
    board[2] = 'hero';
    render(<GameBoard board={board} onMove={vi.fn()} winLine={[0, 1, 2]} />);

    expect(screen.getByRole('button', { name: 'Row 1, column 1, Hero' })).toHaveAttribute(
      'data-winning',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Row 1, column 3, Hero' })).toHaveAttribute(
      'data-winning',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Row 2, column 1, empty' })).not.toHaveAttribute(
      'data-winning',
    );
  });
});
