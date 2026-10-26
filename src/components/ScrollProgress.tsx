import { useEffect, useRef } from "react";

interface ScrollProgressProps {
  darkMode: boolean;
}

// Thin bar along the top of the navbar that fills as the page scrolls.
export default function ScrollProgress({ darkMode }: ScrollProgressProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    // Capture phase so scrolling in any container (window or #root) is picked up.
    const onScroll = (e: Event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el =
          e.target instanceof HTMLElement
            ? e.target
            : document.scrollingElement;
        const bar = barRef.current;
        if (!el || !bar) return;
        const max = el.scrollHeight - el.clientHeight;
        const pct = max > 0 ? el.scrollTop / max : 0;
        bar.style.transform = `scaleX(${Math.min(Math.max(pct, 0), 1)})`;
      });
    };
    document.addEventListener("scroll", onScroll, {
      capture: true,
      passive: true,
    });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("scroll", onScroll, { capture: true });
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute top-0 left-0 w-full h-0.5 pointer-events-none"
    >
      <div
        ref={barRef}
        className={`h-full w-full origin-left ${
          darkMode
            ? "bg-gradient-to-r from-blue-400 to-violet-500"
            : "bg-gradient-to-r from-violet-600 to-blue-500"
        }`}
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
