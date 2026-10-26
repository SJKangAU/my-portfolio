import type { CSSProperties } from "react";

// Spread onto an element to fade it up when it scrolls into view (see useScrollReveal).
// `index` staggers siblings by 80ms each.
export function reveal(index = 0) {
  return {
    "data-reveal": "",
    style: { "--reveal-delay": `${index * 80}ms` } as CSSProperties,
  };
}
