import type { Player } from '@/lib/game';
import { GamePiece } from './GamePiece';

interface ScoreboardProps {
  scores: Record<Player, number>;
  round: number;
  onReset: () => void;
}

const PLAYER_NAMES = {
  hero: 'Hero',
  shadow: 'Shadow',
} as const;

export function Scoreboard({ scores, round, onReset }: ScoreboardProps) {
  const requestReset = () => {
    if (window.confirm('Start a new match? Current scores will be cleared.')) {
      onReset();
    }
  };

  return (
    <section aria-label="Scoreboard" className="w-full max-w-md">
      <div className="flex items-stretch gap-2 rounded-2xl border border-bark/70 bg-moss/70 p-2 shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm">
        {(['hero', 'shadow'] as const).map((player) => (
          <div
            key={player}
            className={[
              'flex flex-1 items-center gap-2 rounded-xl border px-3 py-2',
              player === 'hero'
                ? 'border-leaf/25 bg-leaf/10'
                : 'border-[var(--shadow)]/25 bg-[var(--shadow)]/10',
            ].join(' ')}
          >
            <GamePiece player={player} className="h-7 w-7 shrink-0" />
            <div className="min-w-0">
              <p
                className={[
                  'font-display text-[0.65rem] uppercase tracking-[0.2em]',
                  player === 'hero' ? 'text-leaf-light' : 'text-[var(--shadow)]',
                ].join(' ')}
              >
                {PLAYER_NAMES[player]}
              </p>
              <p
                aria-label={`${PLAYER_NAMES[player]} score`}
                className="font-display text-2xl leading-none text-cream"
              >
                {scores[player]}
              </p>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-center px-2 text-center">
          <span className="font-display text-sm leading-tight text-gold">Round {round}</span>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between px-1">
        <p className="text-xs text-cream/45">First to 3 wins claims the Triforce</p>
        <button
          type="button"
          onClick={requestReset}
          className="rounded-full border border-cream/15 px-3 py-1 text-xs font-medium text-cream/70 transition hover:border-gold/60 hover:text-gold focus-visible:border-gold/60 focus-visible:text-gold"
        >
          New match
        </button>
      </div>
    </section>
  );
}
