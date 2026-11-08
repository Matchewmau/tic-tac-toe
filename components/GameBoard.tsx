import type { Board, WinLine } from '@/lib/game';
import { Cell } from './Cell';

interface GameBoardProps {
  board: Board;
  onMove: (index: number) => void;
  disabled?: boolean;
  winLine?: WinLine | null;
}

export function GameBoard({
  board,
  onMove,
  disabled = false,
  winLine = null,
}: GameBoardProps) {
  const winningIndexes = new Set(winLine ?? []);

  return (
    <div className="relative aspect-square w-full max-w-md rounded-[2rem] border-4 border-bark bg-gradient-to-br from-[#2a160c] via-bark to-[#1b0f08] p-2 shadow-[0_30px_70px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(246,241,223,0.12)] sm:p-3">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-1 rounded-[1.6rem] border border-gold/15"
      />
      <div className="relative grid aspect-square w-full grid-cols-3 grid-rows-3 gap-1.5 sm:gap-2">
        {board.map((value, index) => (
          <Cell
            key={index}
            value={value}
            index={index}
            onSelect={onMove}
            disabled={disabled}
            winning={winningIndexes.has(index)}
          />
        ))}
      </div>
      <span
        aria-hidden="true"
        className="absolute -top-1.5 left-8 h-3 w-3 rotate-45 rounded-sm border border-leaf-light/30 bg-leaf/70"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-1.5 right-8 h-3 w-3 rotate-45 rounded-sm border border-leaf-light/30 bg-leaf/70"
      />
    </div>
  );
}
