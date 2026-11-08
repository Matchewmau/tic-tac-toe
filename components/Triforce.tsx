'use client';

import { useId } from 'react';

interface TriforceProps {
  className?: string;
}

export function Triforce({ className = '' }: TriforceProps) {
  const glowId = `triforce-glow-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      fill="currentColor"
      className={className}
    >
      <defs>
        <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.2" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter={`url(#${glowId})`}>
        <path d="M32 5 46 29H18Z" />
        <path d="M17 33 31 57H3Z" />
        <path d="M47 33 61 57H33Z" />
      </g>
    </svg>
  );
}
