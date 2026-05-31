export function AffiliateDisclosure({compact = false}: {compact?: boolean}) {
  return (
    <aside className="rounded-md border border-[var(--line)] bg-[#fff4dc] p-4 text-sm leading-6 text-[#443a2c]">
      <strong>Affiliate disclosure:</strong>{" "}
      {compact
        ? "Some links may be affiliate links. We may earn a commission at no extra cost to you."
        : "Some links on Solo App Stack may be affiliate links. We may earn a commission if you buy through them, at no extra cost to you. Placeholder links in seed content should be replaced before production publishing."}
    </aside>
  );
}
