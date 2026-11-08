export type Player = 'hero' | 'shadow';
export type CellValue = Player | null;
export type Board = CellValue[];
export type WinLine = readonly [number, number, number];
export type RoundResult =
  | { type: 'win'; player: Player; line: WinLine }
  | { type: 'draw' };

export const WIN_LINES: readonly WinLine[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function createBoard(): Board {
  return Array<CellValue>(9).fill(null);
}

export function otherPlayer(player: Player): Player {
  return player === 'hero' ? 'shadow' : 'hero';
}

export function getWinner(board: Board): { player: Player; line: WinLine } | null {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    const value = board[a];

    if (value !== null && board[b] === value && board[c] === value) {
      return { player: value, line };
    }
  }

  return null;
}

export function isDraw(board: Board): boolean {
  return board.every((cell) => cell !== null) && getWinner(board) === null;
}

export function getResult(board: Board): RoundResult | null {
  const winner = getWinner(board);

  if (winner) {
    return { type: 'win', ...winner };
  }

  if (board.every((cell) => cell !== null)) {
    return { type: 'draw' };
  }

  return null;
}

export function applyMove(board: Board, index: number, player: Player): Board | null {
  if (!Number.isInteger(index) || index < 0 || index >= 9 || board[index] !== null) {
    return null;
  }

  const next = board.slice();
  next[index] = player;
  return next;
}
