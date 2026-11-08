import type { Player } from '@/lib/game';
import type { Phase } from '@/hooks/useGame';
import { GamePiece } from './GamePiece';

interface TurnIndicatorProps {
  currentPlayer: Player;
  phase: Phase;
}

export function TurnIndicator({ currentPlayer, phase }: TurnIndicatorProps) {
  const isPlaying = phase === 'playing';
  const name = currentPlayer === 'hero' ? 'Hero' : 'Shadow';

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-forest/60 px-4 py-1.5 shadow-[0_0_24px_rgba(0,0,0,0.35)]">
      {isPlaying ? (
        <GamePiece player={currentPlayer} className="h-5 w-5" />
      ) : (
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full bg-gold shadow-[0_0_10px_3px_rgba(245,197,66,0.45)]"
        />
      )}
      <span className="font-display text-sm tracking-wide text-cream">
        {isPlaying ? `${name}'s turn` : 'Round complete'}
      </span>
    </div>
  );
}
