import { useEffect, useRef } from "react";

interface SpaceBackgroundProps {
  darkMode: boolean;
}

const STAR_LAYERS = [
  { count: 60, speed: 0.15, size: [0.5, 1.0], opacity: [0.3, 0.6] },  // far — slow
  { count: 40, speed: 0.35, size: [1.0, 1.8], opacity: [0.5, 0.8] },  // mid
  { count: 20, speed: 0.6,  size: [1.8, 2.5], opacity: [0.7, 1.0] },  // near — fast
];

function generateStars() {
  return STAR_LAYERS.flatMap((layer, layerIndex) =>
    Array.from({ length: layer.count }, (_, i) => ({
      id: `${layerIndex}-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 200, // spread over 200vh so stars fill scrollable area
      size: Math.random() * (layer.size[1] - layer.size[0]) + layer.size[0],
      opacity: Math.random() * (layer.opacity[1] - layer.opacity[0]) + layer.opacity[0],
      twinkleDuration: Math.random() * 4 + 3,
      twinkleDelay: Math.random() * 5,
      speed: layer.speed,
    }))
  );
}

const stars = generateStars();

export default function SpaceBackground({ darkMode }: SpaceBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Parallax scroll for stars
  useEffect(() => {
    if (!darkMode) return;

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const tick = () => {
      if (starsRef.current) {
        const children = starsRef.current.children;
        let i = 0;
        STAR_LAYERS.forEach((layer) => {
          for (let s = 0; s < layer.count; s++) {
            const el = children[i] as HTMLElement;
            if (el) {
              const offset = scrollRef.current * layer.speed;
              el.style.transform = `translateY(${offset}px)`;
            }
            i++;
          }
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [darkMode]);

  // Shooting stars canvas
  useEffect(() => {
    if (!darkMode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let animId: number;
    let lastShoot = 0;

    const drawShootingStar = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (timestamp - lastShoot > 5000) {
        lastShoot = timestamp;
        const x = Math.random() * canvas.width * 0.6;
        const y = Math.random() * canvas.height * 0.4;
        const length = Math.random() * 120 + 80;
        const angle = Math.PI / 6;
        let progress = 0;

        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          progress += 0.035;
          if (progress > 1) return;

          const grad = ctx.createLinearGradient(
            x + Math.cos(angle) * length * (progress - 0.3),
            y + Math.sin(angle) * length * (progress - 0.3),
            x + Math.cos(angle) * length * progress,
            y + Math.sin(angle) * length * progress
          );
          grad.addColorStop(0, "rgba(147, 197, 253, 0)");
          grad.addColorStop(1, "rgba(147, 197, 253, 0.75)");

          ctx.beginPath();
          ctx.strokeStyle = grad as unknown as string;
          ctx.lineWidth = 1.5;
          ctx.moveTo(
            x + Math.cos(angle) * length * (progress - 0.3),
            y + Math.sin(angle) * length * (progress - 0.3)
          );
          ctx.lineTo(
            x + Math.cos(angle) * length * progress,
            y + Math.sin(angle) * length * progress
          );
          ctx.stroke();
          requestAnimationFrame(animate);
        };
        animate();
      }

      animId = requestAnimationFrame(drawShootingStar);
    };

    animId = requestAnimationFrame(drawShootingStar);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
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

      {/* Light mode: soft texture overlay */}
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
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          backgroundImage: darkMode
            ? "linear-gradient(rgba(99,120,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(99,120,255,0.07) 1px, transparent 1px)"
            : "linear-gradient(rgba(99,120,200,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(99,120,200,0.12) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Stars — dark mode only, with parallax applied via JS */}
      {darkMode && (
        <div ref={starsRef} className="absolute inset-0 overflow-hidden">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full will-change-transform"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                background: "white",
                opacity: star.opacity,
                animation: `twinkle ${star.twinkleDuration}s ease-in-out ${star.twinkleDelay}s infinite`,
              }}
            />
          ))}
        </div>
      )}

      {/* Nebula glows */}
      <div
        className="absolute rounded-full blur-[160px] transition-all duration-700"
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
        className="absolute rounded-full blur-[200px] transition-all duration-700"
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

      {/* Shooting star canvas */}
      {darkMode && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.8 }}
        />
      )}

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}
