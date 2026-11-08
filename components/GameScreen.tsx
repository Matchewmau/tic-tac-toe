'use client';

import { useGame } from '@/hooks/useGame';
import { GameBoard } from './GameBoard';
import { Scoreboard } from './Scoreboard';
import { TurnIndicator } from './TurnIndicator';
import { WinnerOverlay } from './WinnerOverlay';

export function GameScreen() {
  const game = useGame();

  const matchWinner =
    game.phase === 'matchOver' && game.result?.type === 'win' ? game.result.player : null;
  const winLine = game.result?.type === 'win' ? game.result.line : null;
  const locked = game.phase !== 'playing';

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center gap-5 px-4 py-8 sm:py-12">
      <header className="flex flex-col items-center gap-2 text-center">
        <svg
          aria-hidden="true"
          viewBox="0 0 64 64"
          className="h-9 w-9 text-gold drop-shadow-[0_0_18px_rgba(245,197,66,0.45)]"
          fill="currentColor"
        >
          <path d="M32 5 46 29H18Z" />
          <path d="M17 33 31 57H3Z" />
          <path d="M47 33 61 57H33Z" />
        </svg>
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
        onMove={game.playMove}
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
