'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Player, RoundResult } from '@/lib/game';
import { Triforce } from './Triforce';

interface WinnerOverlayProps {
  result: RoundResult | null;
  matchWinner?: Player | null;
  onPlayAgain: () => void;
}

const PLAYER_NAMES = {
  hero: 'Hero',
  shadow: 'Shadow',
} as const;

export function WinnerOverlay({
  result,
  matchWinner = null,
  onPlayAgain,
}: WinnerOverlayProps) {
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion === true;
  const dialogRef = useRef<HTMLDivElement>(null);
  const playAgainRef = useRef<HTMLButtonElement>(null);

  const isMatchWin =
    result?.type === 'win' &&
    matchWinner !== null &&
    result.player === matchWinner;

  useEffect(() => {
    if (!result) {
      return;
    }

    const target = isMatchWin ? playAgainRef.current : dialogRef.current;
    target?.focus();
  }, [result, isMatchWin]);

  if (!result) {
    return null;
  }

  const title =
    result.type === 'draw'
      ? 'Draw'
      : isMatchWin
        ? `${PLAYER_NAMES[result.player]} claims the Triforce!`
        : `${PLAYER_NAMES[result.player]} wins!`;

  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0 }}
      animate={reduceMotion ? undefined : { opacity: 1 }}
      className="pointer-events-none fixed inset-0 z-50 flex items-end justify-center overflow-hidden px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:pb-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-forest/65 backdrop-blur-sm"
      />

      {result.type === 'win' ? (
        reduceMotion ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <Triforce className="h-72 w-72 text-gold/15 sm:h-96 sm:w-96" />
          </div>
        ) : (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.55, 0.12, 0.45, 0.14],
              scale: [0.5, 1.12, 0.96, 1.08, 1],
            }}
            transition={{
              duration: 0.8,
              times: [0, 0.25, 0.5, 0.75, 1],
              repeat: 1,
            }}
          >
            <Triforce className="h-72 w-72 text-gold/70 sm:h-96 sm:w-96" />
          </motion.div>
        )
      ) : null}

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-label="Round result"
        tabIndex={-1}
        initial={reduceMotion ? undefined : { opacity: 0, scale: 0.9, y: 12 }}
        animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
        transition={
          reduceMotion
            ? undefined
            : { type: 'spring', stiffness: 260, damping: 22 }
        }
        className={[
          'pointer-events-auto relative z-10 w-full max-w-sm overflow-hidden rounded-3xl border px-6 py-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.6)]',
          isMatchWin
            ? 'border-gold/70 bg-gradient-to-b from-[#2b2410] via-moss to-forest'
            : 'border-cream/15 bg-gradient-to-b from-moss to-forest',
        ].join(' ')}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-1 rounded-[1.35rem] border border-gold/15"
        />

        <Triforce className="mx-auto mb-4 h-12 w-12 text-gold drop-shadow-[0_0_16px_rgba(245,197,66,0.55)]" />

        <p className="font-display text-2xl font-semibold leading-tight text-cream sm:text-3xl">
          {title}
        </p>

        {result.type === 'draw' ? (
          <p className="mt-2 text-sm text-cream/70">
            No points this round — the forest waits.
          </p>
        ) : isMatchWin ? (
          <p className="mt-2 text-sm text-cream/70">
            The match is won. The legend is yours.
          </p>
        ) : (
          <p className="mt-2 text-sm text-cream/70">
            The next round begins shortly.
          </p>
        )}

        {isMatchWin ? (
          <button
            ref={playAgainRef}
            type="button"
            onClick={onPlayAgain}
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-gold/70 bg-gold/15 px-6 py-2 font-display text-sm uppercase tracking-[0.16em] text-gold transition hover:bg-gold/25 focus-visible:bg-gold/25"
          >
            Play again
          </button>
        ) : null}
      </motion.div>
    </motion.div>
  );
}
