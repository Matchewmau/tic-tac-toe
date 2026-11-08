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
      <div className="grid grid-cols-2 items-stretch gap-2 rounded-2xl border border-bark/70 bg-moss/70 p-2 shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:grid-cols-[1fr_auto_1fr]">
        {(['hero', 'shadow'] as const).map((player) => (
          <div
            key={player}
            className={[
              'flex items-center gap-2 rounded-xl border px-3 py-2',
              player === 'hero'
                ? 'order-1 border-leaf/25 bg-leaf/10'
                : 'order-2 border-[var(--shadow)]/25 bg-[var(--shadow)]/10 sm:order-3',
            ].join(' ')}
          >
            <GamePiece player={player} className="h-7 w-7 shrink-0" />
            <div className="min-w-0">
              <p
                className={[
                  'font-display text-[0.65rem] uppercase tracking-[0.2em]',
                  player === 'hero'
                    ? 'text-leaf-light'
                    : 'text-[var(--shadow)]',
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

        <div className="order-3 col-span-2 flex items-center justify-center rounded-xl border border-gold/15 bg-gold/5 px-2 py-1.5 text-center sm:order-2 sm:col-span-1 sm:border-0 sm:bg-transparent sm:px-2 sm:py-0">
          <span className="font-display text-sm leading-tight text-gold">
            Round {round}
          </span>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 px-1">
        <p className="text-xs text-cream/45">
          First to 3 wins claims the Triforce
        </p>
        <button
          type="button"
          onClick={requestReset}
          className="inline-flex min-h-11 items-center rounded-full border border-cream/15 px-4 py-2 text-xs font-medium text-cream/70 transition hover:border-gold/60 hover:text-gold focus-visible:border-gold/60 focus-visible:text-gold"
        >
          New match
        </button>
      </div>
    </section>
  );
}
