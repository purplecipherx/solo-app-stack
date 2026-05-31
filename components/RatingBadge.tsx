export function RatingBadge({score}: {score: number}) {
  return (
    <span className="inline-flex h-11 min-w-16 items-center justify-center rounded-md bg-[var(--ink)] px-3 text-base font-black text-white">
      {score.toFixed(1)}
    </span>
  );
}
