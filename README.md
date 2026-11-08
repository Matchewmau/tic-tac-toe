# Zelda Tic-Tac-Toe

A forest-themed, pass-and-play tic-tac-toe match — first to three round wins claims the Triforce.

## Features

- **Two-player pass-and-play** on a hand-carved wooden board, with Hero and Shadow marks.
- **First to three round wins** takes the match; the starting player alternates every round.
- **Round flow** with a winner banner, automatic next-round advance, and a final "Play again" action.
- **Celebrations** with canvas confetti and a pulsing Triforce when a round or match is won.
- **Synthesized sound effects** for moves and victories, with a persistent mute toggle.
- **Accessible by design**: native button cells, a single live region for turn/result announcements, visible gold focus rings, and reduced-motion support.
- **Responsive layout** that stacks the scoreboard and keeps the board square on small screens.

## Getting started

Requires Node.js 22 or newer (Next.js 16 and Tailwind CSS 4 need a current runtime).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm test` | Run the Vitest suite once |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run lint` | Lint the project with ESLint |
| `npm run build` | Create a production build |
| `npm run format` | Format the project with Prettier |

## Tech decisions

- **Pure rules, separate from React.** `lib/game.ts` contains board creation, win-line detection, draw detection, and immutable move application. All eight winning lines are covered for both players.
- **Reducer-driven match state.** `hooks/useGame.ts` owns scoring, alternating starters, the first-to-three finish, and the 2.6-second auto-advance timer between rounds. Side effects stay in the hook; the rules stay pure.
- **Original art and audio.** Every mark, leaf, Triforce, and icon is an inline SVG drawn for this project. Sound effects are synthesized with the Web Audio API. No Nintendo art, music, or other assets are bundled.
- **Test-first component coverage.** Vitest and React Testing Library cover the rules, reducer timers, board interaction, score flow, celebration wiring, and reduced-motion behavior.
- **Small, client-only surface.** The page is a server component that renders one client game screen; there is no backend, persistence, or account system.

## Intentionally out of scope

- A CPU opponent or difficulty levels.
- Online multiplayer or shared rooms.
- Score persistence across reloads or accounts.

This is an unofficial fan-made project built as a UI exercise.
