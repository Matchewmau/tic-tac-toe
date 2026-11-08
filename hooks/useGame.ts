import { useCallback, useEffect, useReducer } from 'react';
import {
  applyMove,
  createBoard,
  getResult,
  otherPlayer,
  type Board,
  type Player,
  type RoundResult,
} from '@/lib/game';

export type Phase = 'playing' | 'roundOver' | 'matchOver';

export interface GameState {
  board: Board;
  currentPlayer: Player;
  starter: Player;
  scores: Record<Player, number>;
  round: number;
  result: RoundResult | null;
  phase: Phase;
}

export type GameAction =
  | { type: 'move'; index: number }
  | { type: 'nextRound' }
  | { type: 'resetMatch' };

export const WINS_TO_TAKE_MATCH = 3;
export const ROUND_ADVANCE_DELAY_MS = 2600;

export function initialGameState(): GameState {
  return {
    board: createBoard(),
    currentPlayer: 'hero',
    starter: 'hero',
    scores: { hero: 0, shadow: 0 },
    round: 1,
    result: null,
    phase: 'playing',
  };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'move': {
      if (state.phase !== 'playing') {
        return state;
      }

      const board = applyMove(state.board, action.index, state.currentPlayer);
      if (!board) {
        return state;
      }

      const result = getResult(board);
      if (!result) {
        return {
          ...state,
          board,
          currentPlayer: otherPlayer(state.currentPlayer),
        };
      }

      if (result.type === 'draw') {
        return { ...state, board, result, phase: 'roundOver' };
      }

      const scores = {
        ...state.scores,
        [result.player]: state.scores[result.player] + 1,
      };

      return {
        ...state,
        board,
        result,
        scores,
        phase: scores[result.player] >= WINS_TO_TAKE_MATCH ? 'matchOver' : 'roundOver',
      };
    }

    case 'nextRound': {
      if (state.phase !== 'roundOver') {
        return state;
      }

      const starter = otherPlayer(state.starter);

      return {
        ...state,
        board: createBoard(),
        currentPlayer: starter,
        starter,
        round: state.round + 1,
        result: null,
        phase: 'playing',
      };
    }

    case 'resetMatch':
      return initialGameState();

    default:
      return state;
  }
}

export function useGame(): GameState & {
  playMove: (index: number) => boolean;
  nextRound: () => void;
  resetMatch: () => void;
} {
  const [state, dispatch] = useReducer(gameReducer, undefined, initialGameState);

  useEffect(() => {
    if (state.phase !== 'roundOver') {
      return;
    }

    const timer = setTimeout(() => dispatch({ type: 'nextRound' }), ROUND_ADVANCE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [state.phase, state.round, state.result]);

  const playMove = useCallback(
    (index: number) => {
      if (state.phase !== 'playing') {
        return false;
      }

      if (!Number.isInteger(index) || index < 0 || index >= 9) {
        return false;
      }

      if (state.board[index] !== null) {
        return false;
      }

      dispatch({ type: 'move', index });
      return true;
    },
    [state.phase, state.board],
  );

  const nextRound = useCallback(() => dispatch({ type: 'nextRound' }), []);
  const resetMatch = useCallback(() => dispatch({ type: 'resetMatch' }), []);

  return { ...state, playMove, nextRound, resetMatch };
}
