export function formatDateTime(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleString();
}

export function snippet(text: string, max = 100): string {
  const t = text.trim().replace(/\s+/g, " ");
  if (t.length <= max) return t;
  return t.slice(0, max - 1) + "…";
}

export function debounce<T extends any[]>(fn: ((...a: T) => void), delay = 200) {
  let handle: number | undefined;
  return (...a: T) => {
    if (handle) window.clearTimeout(handle);
    handle = window.setTimeout(() => fn(...a), delay);
  };
}
