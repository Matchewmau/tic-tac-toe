import type { CellValue } from '@/lib/game';
import { GamePiece } from './GamePiece';

interface CellProps {
  value: CellValue;
  index: number;
  onSelect: (index: number) => void;
  disabled?: boolean;
  winning?: boolean;
}

const PLAYER_LABELS = {
  hero: 'Hero',
  shadow: 'Shadow',
} as const;

export function Cell({ value, index, onSelect, disabled = false, winning = false }: CellProps) {
  const row = Math.floor(index / 3) + 1;
  const column = (index % 3) + 1;
  const state = value ? PLAYER_LABELS[value] : 'empty';
  const isDisabled = disabled || value !== null;

  return (
    <button
      type="button"
      aria-label={`Row ${row}, column ${column}, ${state}`}
      data-winning={winning ? 'true' : undefined}
      disabled={isDisabled}
      onClick={() => {
        if (!isDisabled) {
          onSelect(index);
        }
      }}
      className={[
        'group relative flex h-full w-full items-center justify-center rounded-xl border transition duration-200',
        winning
          ? 'border-gold bg-gold/15 shadow-[0_0_26px_rgba(245,197,66,0.5)]'
          : 'border-bark/80 bg-moss/90 shadow-[inset_0_2px_10px_rgba(2,10,6,0.55)]',
        !isDisabled && 'hover:-translate-y-0.5 hover:border-leaf-light/70 hover:bg-moss',
        !isDisabled && 'focus-visible:-translate-y-0.5',
        isDisabled ? 'cursor-default' : 'cursor-pointer',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-1 rounded-lg border border-leaf/15"
      />
      {value ? <GamePiece player={value} className="relative h-3/5 w-3/5" /> : null}
    </button>
  );
}
