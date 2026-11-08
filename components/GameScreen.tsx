'use client';

import { useEffect, useRef } from 'react';
import { useGame } from '@/hooks/useGame';
import { useSound } from '@/hooks/useSound';
import { fireZeldaConfetti } from '@/lib/confetti';
import type { RoundResult } from '@/lib/game';
import { GameBoard } from './GameBoard';
import { Scoreboard } from './Scoreboard';
import { SoundToggle } from './SoundToggle';
import { Triforce } from './Triforce';
import { TurnIndicator } from './TurnIndicator';
import { WinnerOverlay } from './WinnerOverlay';

export function GameScreen() {
  const game = useGame();
  const { muted, toggleMuted, playMove, playWin } = useSound();
  const lastResult = useRef<RoundResult | null>(null);

  const matchWinner =
    game.phase === 'matchOver' && game.result?.type === 'win' ? game.result.player : null;
  const winLine = game.result?.type === 'win' ? game.result.line : null;
  const locked = game.phase !== 'playing';

  useEffect(() => {
    const result = game.result;

    if (!result || result === lastResult.current) {
      return;
    }

    lastResult.current = result;

    if (result.type !== 'win') {
      return;
    }

    playWin(game.phase === 'matchOver');

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    void fireZeldaConfetti();

    if (game.phase === 'matchOver') {
      const timer = window.setTimeout(() => {
        void fireZeldaConfetti();
      }, 300);

      return () => window.clearTimeout(timer);
    }
  }, [game.result, game.phase, playWin]);

  const handleMove = (index: number) => {
    if (game.playMove(index)) {
      playMove();
    }
  };

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center gap-5 px-4 py-8 sm:py-12">
      <header className="relative flex w-full max-w-md flex-col items-center gap-2 text-center">
        <div className="absolute right-0 top-0">
          <SoundToggle muted={muted} onToggle={toggleMuted} />
        </div>

        <Triforce className="h-9 w-9 text-gold drop-shadow-[0_0_18px_rgba(245,197,66,0.45)]" />
        <h1 className="font-display text-3xl font-semibold tracking-wide text-cream sm:text-4xl">
          Zelda Tic-Tac-Toe
        </h1>
        <p className="max-w-sm text-sm text-cream/55">
          Hero and Shadow meet in the forest clearing. Win three rounds to claim the Triforce.
        </p>
      </header>

      <Scoreboard scores={game.scores} round={game.round} onReset={game.resetMatch} />

      <TurnIndicator currentPlayer={game.currentPlayer} phase={game.phase} />

      <GameBoard
        board={game.board}
        onMove={handleMove}
        disabled={locked}
        winLine={winLine}
      />

      <WinnerOverlay
        result={game.result}
        matchWinner={matchWinner}
        onPlayAgain={game.resetMatch}
      />
    </main>
  );
}
