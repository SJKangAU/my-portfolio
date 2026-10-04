import { useEffect, useRef } from "react";

interface SpaceBackgroundProps {
  darkMode: boolean;
}

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  speedY: number; // parallax speed
  baseY: number; // original Y position
}

const STAR_COUNT = 160;
const CONNECTION_RADIUS = 120; // px — how close cursor must be to a star to activate
const STAR_LINK_RADIUS = 100; // px — how close two stars must be to connect
const CURSOR_PULL_RADIUS = 160; // px — stars slightly drift toward cursor

export default function SpaceBackground({ darkMode }: SpaceBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const scrollRef = useRef(0);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Size canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Generate stars
    starsRef.current = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 3, // spread over 3x viewport height
      baseY: Math.random() * window.innerHeight * 3,
      size: Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.5 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
      speedY: Math.random() * 0.4 + 0.1, // parallax depth
    }));

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    // Scroll tracking
    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Draw loop
    const draw = (timestamp: number) => {
      timeRef.current = timestamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scroll = scrollRef.current;
      const mouse = mouseRef.current;
      const isDark = darkMode;

      // Visible stars (those within viewport after parallax offset)
      const visibleStars: (Star & { screenX: number; screenY: number })[] = [];

      starsRef.current.forEach((star) => {
        const screenY = star.baseY - scroll * star.speedY;
        if (screenY < -20 || screenY > canvas.height + 20) return;
        visibleStars.push({ ...star, screenX: star.x, screenY });
      });

      // Draw constellation lines between stars near cursor
      if (isDark) {
        visibleStars.forEach((starA, i) => {
          const dxA = starA.screenX - mouse.x;
          const dyA = starA.screenY - mouse.y;
          const distToMouse = Math.sqrt(dxA * dxA + dyA * dyA);
          if (distToMouse > CONNECTION_RADIUS) return;

          visibleStars.forEach((starB, j) => {
            if (j <= i) return;
            const dx = starA.screenX - starB.screenX;
            const dy = starA.screenY - starB.screenY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > STAR_LINK_RADIUS) return;

            const dxB = starB.screenX - mouse.x;
            const dyB = starB.screenY - mouse.y;
            const distBToMouse = Math.sqrt(dxB * dxB + dyB * dyB);
            if (distBToMouse > CONNECTION_RADIUS) return;

            // Fade line based on distance from cursor
            const alpha =
              (1 - distToMouse / CONNECTION_RADIUS) *
              (1 - distBToMouse / CONNECTION_RADIUS) *
              0.6;

            ctx.beginPath();
            ctx.moveTo(starA.screenX, starA.screenY);
            ctx.lineTo(starB.screenX, starB.screenY);
            ctx.strokeStyle = `rgba(147, 197, 253, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          });
        });
      } else {
        // Light mode — softer violet lines
        visibleStars.forEach((starA, i) => {
          const dxA = starA.screenX - mouse.x;
          const dyA = starA.screenY - mouse.y;
          const distToMouse = Math.sqrt(dxA * dxA + dyA * dyA);
          if (distToMouse > CONNECTION_RADIUS) return;

          visibleStars.forEach((starB, j) => {
            if (j <= i) return;
            const dx = starA.screenX - starB.screenX;
            const dy = starA.screenY - starB.screenY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > STAR_LINK_RADIUS) return;

            const dxB = starB.screenX - mouse.x;
            const dyB = starB.screenY - mouse.y;
            const distBToMouse = Math.sqrt(dxB * dxB + dyB * dyB);
            if (distBToMouse > CONNECTION_RADIUS) return;

            const alpha =
              (1 - distToMouse / CONNECTION_RADIUS) *
              (1 - distBToMouse / CONNECTION_RADIUS) *
              0.35;

            ctx.beginPath();
            ctx.moveTo(starA.screenX, starA.screenY);
            ctx.lineTo(starB.screenX, starB.screenY);
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          });
        });
      }

      // Draw stars
      visibleStars.forEach((star) => {
        const twinkle =
          Math.sin(timestamp * star.twinkleSpeed + star.twinkleOffset) * 0.3 +
          0.7;

        // Cursor proximity glow
        const dx = star.screenX - mouse.x;
        const dy = star.screenY - mouse.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        const nearCursor = distToMouse < CURSOR_PULL_RADIUS;
        const glowBoost = nearCursor
          ? (1 - distToMouse / CURSOR_PULL_RADIUS) * 1.5
          : 0;

        const finalOpacity = Math.min(
          1,
          star.opacity * twinkle + glowBoost * 0.4,
        );
        const finalSize = star.size + glowBoost * 1.2;

        if (isDark) {
          // Glow halo for stars near cursor
          if (nearCursor && glowBoost > 0.1) {
            const grd = ctx.createRadialGradient(
              star.screenX,
              star.screenY,
              0,
              star.screenX,
              star.screenY,
              finalSize * 4,
            );
            grd.addColorStop(0, `rgba(147, 197, 253, ${glowBoost * 0.4})`);
            grd.addColorStop(1, "rgba(147, 197, 253, 0)");
            ctx.beginPath();
            ctx.arc(star.screenX, star.screenY, finalSize * 4, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(star.screenX, star.screenY, finalSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`;
          ctx.fill();
        } else {
          // Light mode — small dark dots as "stars"
          if (nearCursor && glowBoost > 0.1) {
            const grd = ctx.createRadialGradient(
              star.screenX,
              star.screenY,
              0,
              star.screenX,
              star.screenY,
              finalSize * 4,
            );
            grd.addColorStop(0, `rgba(139, 92, 246, ${glowBoost * 0.3})`);
            grd.addColorStop(1, "rgba(139, 92, 246, 0)");
            ctx.beginPath();
            ctx.arc(star.screenX, star.screenY, finalSize * 4, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(star.screenX, star.screenY, finalSize * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99, 102, 241, ${finalOpacity * 0.6})`;
          ctx.fill();
        }
      });

      // Shooting star (dark only)
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [darkMode]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Base background */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background: darkMode
            ? "radial-gradient(ellipse at 20% 20%, #0d1225 0%, #080c18 50%, #050810 100%)"
            : "#dde4f0",
        }}
      />

      {/* Light mode tint */}
      {!darkMode && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(139,92,246,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(59,130,246,0.07) 0%, transparent 50%)",
          }}
        />
      )}

      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: darkMode
            ? "linear-gradient(rgba(99,120,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(99,120,255,0.07) 1px, transparent 1px)"
            : "linear-gradient(rgba(99,120,200,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(99,120,200,0.12) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Nebula glows */}
      <div
        className="absolute rounded-full blur-[160px]"
        style={{
          width: "500px",
          height: "500px",
          top: "-100px",
          right: "-100px",
          background: darkMode
            ? "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute rounded-full blur-[200px]"
        style={{
          width: "400px",
          height: "400px",
          bottom: "20%",
          left: "-80px",
          background: darkMode
            ? "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Star + constellation canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
