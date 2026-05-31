export function trackAffiliateClick(payload: {label: string; url: string; placement?: string}) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(new CustomEvent("affiliate-click", {detail: payload}));

  fetch("/api/track-click", {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(payload),
    keepalive: true
  }).catch(() => undefined);
}
