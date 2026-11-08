import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  ROUND_ADVANCE_DELAY_MS,
  WINS_TO_TAKE_MATCH,
  gameReducer,
  initialGameState,
  useGame,
} from './useGame';

const winForHero = [0, 3, 1, 4, 2] as const; // hero wins top row

describe('gameReducer', () => {
  it('starts with hero, round 1, and zero scores', () => {
    expect(initialGameState()).toMatchObject({
      currentPlayer: 'hero',
      starter: 'hero',
      round: 1,
      scores: { hero: 0, shadow: 0 },
      phase: 'playing',
      result: null,
    });
  });

  it('alternates turns and rejects occupied or post-result moves', () => {
    let state = initialGameState();
    state = gameReducer(state, { type: 'move', index: 4 });
    expect(state.board[4]).toBe('hero');
    expect(state.currentPlayer).toBe('shadow');

    const occupied = gameReducer(state, { type: 'move', index: 4 });
    expect(occupied).toBe(state);

    state = gameReducer(state, { type: 'move', index: 2 });
    state = gameReducer(state, { type: 'move', index: 0 });
    state = gameReducer(state, { type: 'move', index: 5 });
    state = gameReducer(state, { type: 'move', index: 1 });
    state = gameReducer(state, { type: 'move', index: 8 });
    expect(state.result).toEqual({ type: 'win', player: 'shadow', line: [2, 5, 8] });
    expect(state.phase).toBe('roundOver');

    const afterWin = gameReducer(state, { type: 'move', index: 1 });
    expect(afterWin).toBe(state);
  });

  it('scores a win once and advances to an alternating starter', () => {
    let state = initialGameState();
    for (const index of winForHero) state = gameReducer(state, { type: 'move', index });
    expect(state.scores.hero).toBe(1);
    expect(state.phase).toBe('roundOver');

    state = gameReducer(state, { type: 'nextRound' });
    expect(state.round).toBe(2);
    expect(state.starter).toBe('shadow');
    expect(state.currentPlayer).toBe('shadow');
    expect(state.board).toEqual(Array(9).fill(null));
    expect(state.result).toBeNull();
    expect(state.phase).toBe('playing');
  });

  it('does not score a draw and still advances', () => {
    const drawMoves = [0, 1, 2, 4, 3, 5, 7, 6, 8];
    let state = initialGameState();
    for (const index of drawMoves) state = gameReducer(state, { type: 'move', index });
    expect(state.result).toEqual({ type: 'draw' });
    expect(state.scores).toEqual({ hero: 0, shadow: 0 });
    expect(state.phase).toBe('roundOver');
  });

  it('ends the match at three wins and refuses further rounds', () => {
    let state = initialGameState();
    state = { ...state, scores: { hero: WINS_TO_TAKE_MATCH - 1, shadow: 0 } };

    for (const index of winForHero) state = gameReducer(state, { type: 'move', index });

    expect(state.scores.hero).toBe(WINS_TO_TAKE_MATCH);
    expect(state.phase).toBe('matchOver');
    expect(gameReducer(state, { type: 'nextRound' })).toBe(state);
  });

  it('resets the whole match', () => {
    let state = initialGameState();
    state = { ...state, scores: { hero: 2, shadow: 1 }, round: 4 };
    state = gameReducer(state, { type: 'resetMatch' });
    expect(state).toEqual(initialGameState());
  });
});

describe('useGame timers', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('auto-advances after a normal win', () => {
    const { result } = renderHook(() => useGame());
    act(() => {
      winForHero.forEach((index) => result.current.playMove(index));
    });
    expect(result.current.phase).toBe('roundOver');

    act(() => {
      vi.advanceTimersByTime(ROUND_ADVANCE_DELAY_MS);
    });

    expect(result.current.phase).toBe('playing');
    expect(result.current.round).toBe(2);
    expect(result.current.board).toEqual(Array(9).fill(null));
  });

  it('auto-advances after a draw without scoring', () => {
    const { result } = renderHook(() => useGame());
    const drawMoves = [0, 1, 2, 4, 3, 5, 7, 6, 8];
    act(() => {
      drawMoves.forEach((index) => result.current.playMove(index));
    });
    expect(result.current.phase).toBe('roundOver');

    act(() => {
      vi.advanceTimersByTime(ROUND_ADVANCE_DELAY_MS);
    });

    expect(result.current.phase).toBe('playing');
    expect(result.current.round).toBe(2);
    expect(result.current.scores).toEqual({ hero: 0, shadow: 0 });
  });

  it('cancels the pending timer when the match is reset during celebration', () => {
    const { result } = renderHook(() => useGame());
    act(() => {
      winForHero.forEach((index) => result.current.playMove(index));
    });
    expect(result.current.phase).toBe('roundOver');

    act(() => {
      result.current.resetMatch();
    });
    act(() => {
      vi.advanceTimersByTime(ROUND_ADVANCE_DELAY_MS * 2);
    });

    expect(result.current.round).toBe(1);
    expect(result.current.phase).toBe('playing');
    expect(result.current.scores).toEqual({ hero: 0, shadow: 0 });
  });

  it('does not auto-advance after the match-winning round', () => {
    const { result } = renderHook(() => useGame());

    const play = (moves: readonly number[]) => {
      act(() => {
        moves.forEach((index) => result.current.playMove(index));
      });
    };
    const advance = () => {
      act(() => {
        vi.advanceTimersByTime(ROUND_ADVANCE_DELAY_MS);
      });
    };
    const heroRound = [0, 3, 1, 4, 2] as const;
    const shadowRound = [3, 0, 4, 1, 5] as const;

    play(heroRound); // round 1 (hero starts): hero 1
    advance();
    play(shadowRound); // round 2 (shadow starts): shadow 1
    advance();
    play(heroRound); // round 3: hero 2
    advance();
    play(shadowRound); // round 4: shadow 2
    advance();
    play(heroRound); // round 5: hero 3 -> match over

    expect(result.current.scores).toEqual({ hero: 3, shadow: 2 });
    expect(result.current.phase).toBe('matchOver');
    expect(result.current.round).toBe(5);

    act(() => {
      vi.advanceTimersByTime(ROUND_ADVANCE_DELAY_MS * 2);
    });
    expect(result.current.phase).toBe('matchOver');
    expect(result.current.round).toBe(5);
  });
});
