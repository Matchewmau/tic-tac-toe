'use client';

interface SoundToggleProps {
  muted: boolean;
  onToggle: () => void;
}

export function SoundToggle({ muted, onToggle }: SoundToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={muted}
      aria-label={muted ? 'Enable sound' : 'Mute sound'}
      onClick={onToggle}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 bg-forest/60 text-cream/70 shadow-[0_0_20px_rgba(0,0,0,0.3)] transition hover:border-gold/60 hover:text-gold focus-visible:border-gold/60 focus-visible:text-gold"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 9.5v5h3.5L12 18V6L7.5 9.5Z" fill="currentColor" stroke="none" />
        {muted ? (
          <>
            <path d="m16.5 9.5 5 5" />
            <path d="m21.5 9.5-5 5" />
          </>
        ) : (
          <>
            <path d="M15.5 9a4.2 4.2 0 0 1 0 6" />
            <path d="M18.5 6.5a8 8 0 0 1 0 11" />
          </>
        )}
      </svg>
    </button>
  );
}
