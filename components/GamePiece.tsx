import type { Player } from '@/lib/game';

interface GamePieceProps {
  player: Player;
  className?: string;
}

export function GamePiece({ player, className = '' }: GamePieceProps) {
  if (player === 'hero') {
    return (
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
        className={`text-leaf-light drop-shadow-[0_0_10px_rgba(123,211,137,0.45)] ${className}`}
        fill="currentColor"
      >
        <path d="M32 3 39 15v25H25V15Z" />
        <rect x="18" y="40" width="28" height="5" rx="2.5" />
        <rect x="29" y="45" width="6" height="11" rx="2" />
        <circle cx="32" cy="59" r="4" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={`text-[var(--shadow)] drop-shadow-[0_0_10px_rgba(109,74,168,0.5)] ${className}`}
      fill="none"
    >
      <path
        d="M8 32c8-10 16-15 24-15s16 5 24 15c-8 10-16 15-24 15S16 42 8 32Z"
        fill="currentColor"
        opacity="0.18"
      />
      <path
        d="M8 32c8-10 16-15 24-15s16 5 24 15c-8 10-16 15-24 15S16 42 8 32Z"
        stroke="currentColor"
        strokeWidth="3"
      />
      <circle cx="32" cy="32" r="7" fill="currentColor" />
      <path
        d="M32 45c0 7-3 12-7 16"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
