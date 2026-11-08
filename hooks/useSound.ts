'use client';

import { useCallback, useState } from 'react';
import { playMoveSound, playWinSound } from '@/lib/sound';

export function useSound() {
  const [muted, setMuted] = useState(false);

  const toggleMuted = useCallback(() => {
    setMuted((current) => !current);
  }, []);

  const playMove = useCallback(() => {
    if (!muted) {
      playMoveSound();
    }
  }, [muted]);

  const playWin = useCallback(
    (matchWin = false) => {
      if (!muted) {
        playWinSound(matchWin);
      }
    },
    [muted],
  );

  return { muted, toggleMuted, playMove, playWin };
}
