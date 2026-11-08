export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 15%, #1d4a30 0%, #0b1f14 52%, #06120c 100%)',
        }}
      />

      <div className="absolute -top-40 left-[18%] h-[75vh] w-32 -rotate-12 bg-gradient-to-b from-gold/10 via-leaf-light/5 to-transparent blur-3xl" />
      <div className="absolute -top-32 right-[22%] h-[65vh] w-24 rotate-12 bg-gradient-to-b from-cream/10 via-leaf-light/5 to-transparent blur-3xl" />
      <div className="absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-leaf/10 blur-3xl" />

      <svg
        viewBox="0 0 220 420"
        className="absolute -bottom-8 -left-16 h-[78vh] w-64 text-leaf/30"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M118 424c-16-74 18-116-4-176-18-49 14-88 2-136" />
        <path d="M114 248c-34-6-50-25-68-21 22-13 48-4 68 21Z" fill="currentColor" stroke="none" />
        <path d="M112 186c26-6 38-24 56-18-17-12-41-2-56 18Z" fill="currentColor" stroke="none" />
        <path d="M116 320c30 2 47-13 64-4-17-16-43-12-64 4Z" fill="currentColor" stroke="none" />
        <ellipse cx="78" cy="112" rx="8" ry="18" transform="rotate(-38 78 112)" fill="currentColor" stroke="none" />
        <ellipse cx="146" cy="92" rx="7" ry="16" transform="rotate(34 146 92)" fill="currentColor" stroke="none" />
      </svg>

      <svg
        viewBox="0 0 220 420"
        className="absolute -right-16 -bottom-10 h-[72vh] w-60 scale-x-[-1] text-moss"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M118 424c-16-74 18-116-4-176-18-49 14-88 2-136" />
        <path d="M114 248c-34-6-50-25-68-21 22-13 48-4 68 21Z" fill="currentColor" stroke="none" />
        <path d="M112 186c26-6 38-24 56-18-17-12-41-2-56 18Z" fill="currentColor" stroke="none" />
        <path d="M116 320c30 2 47-13 64-4-17-16-43-12-64 4Z" fill="currentColor" stroke="none" />
        <ellipse cx="78" cy="112" rx="8" ry="18" transform="rotate(-38 78 112)" fill="currentColor" stroke="none" />
      </svg>

      <div className="absolute left-[12%] top-[22%] h-2 w-2 rounded-full bg-gold/80 shadow-[0_0_14px_4px_rgba(245,197,66,0.35)]" />
      <div className="absolute right-[16%] top-[38%] h-1.5 w-1.5 rounded-full bg-leaf-light/80 shadow-[0_0_12px_4px_rgba(123,211,137,0.3)]" />
      <div className="absolute left-[24%] top-[64%] h-1 w-1 rounded-full bg-gold/60 shadow-[0_0_10px_3px_rgba(245,197,66,0.25)]" />
      <div className="absolute right-[28%] top-[72%] h-1.5 w-1.5 rounded-full bg-cream/50 shadow-[0_0_10px_3px_rgba(246,241,223,0.2)]" />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, transparent 30%, rgba(2, 10, 6, 0.45) 78%, rgba(2, 8, 5, 0.72) 100%)',
        }}
      />
    </div>
  );
}
