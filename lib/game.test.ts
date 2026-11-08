import { describe, expect, it } from 'vitest';
import {
  WIN_LINES,
  applyMove,
  createBoard,
  getResult,
  getWinner,
  isDraw,
  otherPlayer,
  type Board,
  type Player,
} from './game';

const fill = (indices: readonly number[], player: Player): Board => {
  const board = createBoard();
  indices.forEach((index) => {
    board[index] = player;
  });
  return board;
};

describe('createBoard', () => {
  it('returns nine empty cells as a fresh array', () => {
    const first = createBoard();
    const second = createBoard();
    expect(first).toEqual(Array(9).fill(null));
    expect(first).not.toBe(second);
  });
});

describe('otherPlayer', () => {
  it('swaps hero and shadow', () => {
    expect(otherPlayer('hero')).toBe('shadow');
    expect(otherPlayer('shadow')).toBe('hero');
  });
});

describe('getWinner', () => {
  for (const line of WIN_LINES) {
    it(`detects line ${line.join('-')} for both players`, () => {
      for (const player of ['hero', 'shadow'] as const) {
        expect(getWinner(fill(line, player))).toEqual({ player, line });
      }
    });
  }

  it('returns null with no winning line', () => {
    expect(getWinner(createBoard())).toBeNull();
    expect(getWinner(fill([0, 1, 3, 4], 'hero'))).toBeNull();
  });
});

describe('isDraw', () => {
  it('is true only for a full board with no winner', () => {
    expect(isDraw(createBoard())).toBe(false);
    expect(
      isDraw(['hero', 'shadow', 'hero', 'hero', 'shadow', 'shadow', 'shadow', 'hero', 'hero']),
    ).toBe(true);
    expect(isDraw(fill([0, 1, 2], 'hero'))).toBe(false);
  });
});

describe('getResult', () => {
  it('returns a win before checking for a draw', () => {
    expect(getResult(fill([0, 1, 2], 'shadow'))).toEqual({
      type: 'win',
      player: 'shadow',
      line: [0, 1, 2],
    });
  });

  it('returns a draw for a full board without a winner', () => {
    expect(
      getResult(['hero', 'shadow', 'hero', 'hero', 'shadow', 'shadow', 'shadow', 'hero', 'hero']),
    ).toEqual({
      type: 'draw',
    });
  });

  it('returns null while the round is still playable', () => {
    expect(getResult(createBoard())).toBeNull();
  });
});

describe('applyMove', () => {
  it('returns a new board with the mark placed', () => {
    const board = createBoard();
    const next = applyMove(board, 4, 'hero');
    expect(next?.[4]).toBe('hero');
    expect(board[4]).toBeNull();
  });

  it('rejects occupied and out-of-range cells', () => {
    const board = fill([4], 'shadow');
    expect(applyMove(board, 4, 'hero')).toBeNull();
    expect(applyMove(board, -1, 'hero')).toBeNull();
    expect(applyMove(board, 9, 'hero')).toBeNull();
  });
});
