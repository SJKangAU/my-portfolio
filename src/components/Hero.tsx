import { useEffect, useRef } from "react";
import Magnetic from "./Magnetic";

interface HeroProps {
  darkMode: boolean;
}

export default function Hero({ darkMode }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const xPct = (e.clientX / window.innerWidth - 0.5) * 12;
      const yPct = (e.clientY / window.innerHeight - 0.5) * 8;
      el.style.setProperty("--mx", `${xPct}px`);
      el.style.setProperty("--my", `${yPct}px`);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const skills = [
    "TypeScript",
    "React",
    "Firebase",
    "Python",
    "SQL",
    "Requirements",
    "Process Mapping",
    "Excel VBA",
  ];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-8 text-center overflow-hidden"
      style={{ "--mx": "0px", "--my": "0px" } as unknown as React.CSSProperties}
    >
      <div className="relative z-10 max-w-3xl w-full flex flex-col items-center">
        {/* Eyebrow */}
        <p
          className={`mb-4 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase font-medium animate-fade-in ${
            darkMode ? "text-blue-400" : "text-violet-700"
          }`}
          style={{ animationDelay: "0.1s" }}
        >
          Technology Graduate · Business Analysis &amp; Automation · Melbourne, AU
        </p>

        {/* Name */}
        <h1
          className="text-6xl md:text-8xl font-extrabold leading-none tracking-tight animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <span className={darkMode ? "text-white" : "text-gray-900"}>
            Jason{" "}
          </span>
          <span
            className={`${
              darkMode
                ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500"
                : "text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-500"
            }`}
          >
            Kang
          </span>
        </h1>

        {/* Tagline */}
        <p
          className={`mt-6 text-lg md:text-xl leading-relaxed animate-fade-in ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
          style={{ animationDelay: "0.35s" }}
        >
          Master of IT graduate who turns messy processes into working tools. I map
          processes, write requirements and build automations, from Excel VBA
          to full-stack web apps.
        </p>

        {/* Skill chips */}
        <div
          className="mt-8 flex flex-wrap justify-center gap-2 animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          {skills.map((skill) => (
            <span
              key={skill}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                darkMode
                  ? "border-blue-500/40 text-blue-300 bg-blue-500/10 hover:bg-blue-500/20"
                  : "border-violet-400/50 text-violet-700 bg-violet-100 hover:bg-violet-200"
              }`}
            >
              {skill}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div
          className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-in"
          style={{ animationDelay: "0.65s" }}
        >
          {/* Primary CTA */}
          <Magnetic>
            <a
              href="#case-study"
              className={`block px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg hover:scale-105 active:scale-95 ${
                darkMode
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/40"
                  : "bg-violet-600 hover:bg-violet-500 text-white shadow-violet-200"
              }`}
            >
              View Case Study
            </a>
          </Magnetic>

          {/* Resume — opens PDF in new tab, browser handles viewing and downloading */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-6 py-3 rounded-lg font-semibold text-sm border transition-all duration-200 hover:scale-105 active:scale-95 ${
              darkMode
                ? "border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-300"
                : "border-gray-300 text-gray-700 hover:border-violet-500 hover:text-violet-700"
            }`}
          >
            View Resume
          </a>

          <a
            href="#contact"
            className={`px-3 py-3 text-sm font-semibold underline-offset-4 hover:underline ${
              darkMode ? "text-blue-300" : "text-violet-700"
            }`}
          >
            Get in touch →
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce opacity-50 ${
          darkMode ? "text-gray-600" : "text-gray-400"
        }`}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 12L1 5h14L8 12z" />
        </svg>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          opacity: 0;
          animation: fade-in 0.7s var(--ease-smooth) forwards;
        }
      `}</style>
    </section>
  );
}
