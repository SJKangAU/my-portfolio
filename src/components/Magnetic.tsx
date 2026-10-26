import { useRef } from "react";
import type { ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
}

// Nudges its child a few pixels toward the mouse. Mouse only, and off for reduced motion.
export default function Magnetic({ children, strength = 0.25 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="inline-block transition-transform duration-300 ease-smooth"
    >
      {children}
    </span>
  );
}
