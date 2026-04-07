import { useState, useEffect, useRef } from "react";

interface ProjectsProps {
  darkMode: boolean;
}

interface Project {
  title: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  tech: string[];
  // Each project can have a github link, live demo, report, or any combo
  github?: string;
  liveDemo?: string;
  report?: string;
}

// Project data — links updated to reflect actual availability
const projects: Project[] = [
  {
    title: "IntelliJourney",
    shortDescription:
      "Analytics and reporting platform integrating the Canvas LMS API and Firebase to surface educational data insights.",
    longDescription:
      "IntelliJourney was built to help students and educators make sense of learning data that was previously locked away in Canvas LMS. It pulls assignment, grade, and engagement data via the Canvas API and presents it in a clean, actionable dashboard backed by Firebase for real-time updates.",
    features: [
      "Canvas LMS API integration for live grade and assignment data",
      "Firebase Firestore for real-time data syncing across sessions",
      "Custom analytics dashboard with filterable views",
      "Role-based access for students and educators",
    ],
    tech: ["React", "Firebase", "Canvas API", "TypeScript"],
    // Private repo — linking to live site instead
    liveDemo: "https://www.intellijourney.education/",
  },
  {
    title: "Recipe App",
    shortDescription:
      "Full-stack application where users can upload, review, and rate recipes with real-time data syncing.",
    longDescription:
      "A full-stack recipe sharing platform built with React and Firebase. Users can create accounts, upload their own recipes with ingredients and steps, browse community recipes, and leave reviews and star ratings. All data is synced in real time via Firestore.",
    features: [
      "User authentication with Firebase Auth",
      "Recipe creation with image upload support",
      "Star rating and review system",
      "Real-time updates via Firestore listeners",
    ],
    tech: ["React", "Firebase", "TypeScript"],
    // Repo on inaccessible account — report to be hosted on deployment
    report: "#",
  },
  {
    title: "Multi-threaded Whiteboard",
    shortDescription:
      "Real-time collaborative whiteboard with live drawing support built in Java using multi-threading.",
    longDescription:
      "A networked whiteboard application that allows multiple users to draw simultaneously in real time. Built in Java with a custom multi-threaded server to handle concurrent connections, ensuring low-latency updates across all connected clients.",
    features: [
      "Multi-threaded server handling concurrent user sessions",
      "Real-time canvas synchronisation across clients",
      "Drawing tools including pen, shapes, and eraser",
      "Chat functionality alongside the whiteboard",
    ],
    tech: ["Java", "Multi-threading", "Networking", "Swing"],
    github: "https://github.com/SJKangAU/JavaWhiteBoard",
  },
  {
    title: "Bias in Job Salaries",
    shortDescription:
      "Machine learning report detecting salary bias, achieving a 15% improvement in prediction accuracy.",
    longDescription:
      "A data science project investigating bias in job salary data using machine learning. Cleaned and processed a large dataset of job listings, engineered features to isolate demographic signals, and compared multiple ML models to detect and quantify salary bias.",
    features: [
      "Data cleaning and feature engineering with Pandas",
      "Comparison of regression models including Random Forest and XGBoost",
      "15% improvement in prediction accuracy over baseline",
      "Visualisations of bias patterns across job categories",
    ],
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn"],
    // Repo on inaccessible account — report to be hosted on deployment
    report: "/MachineLearning_SalaryBias_Report.pdf",
  },
  {
    title: "Computer Vision Project",
    shortDescription:
      "Siamese neural network with triplet loss to identify visually similar images in datasets.",
    longDescription:
      "Designed and trained a Siamese neural network using triplet loss to learn image similarity embeddings. The model was evaluated on its ability to correctly identify matching images from a large dataset, outperforming baseline cosine similarity approaches.",
    features: [
      "Siamese network architecture with shared weights",
      "Triplet loss for learning similarity embeddings",
      "Custom data pipeline for triplet mining",
      "Evaluation on image retrieval benchmarks",
    ],
    tech: ["Python", "PyTorch", "Computer Vision", "NumPy"],
    // Repo on inaccessible account — report to be hosted on deployment
    report: "/ComputerVision_Report.pdf",
  },
  {
    title: "Portfolio Website",
    shortDescription:
      "This site — built from scratch with React, TypeScript, and Tailwind CSS v4 with a space theme.",
    longDescription:
      "A fully custom portfolio site built while learning React and TypeScript. Features a space-themed background with parallax scrolling stars, constellation cursor interactions rendered on canvas, dark/light mode with localStorage persistence, and smooth scroll-based navbar highlighting.",
    features: [
      "Canvas-based star field with cursor constellation interactions",
      "Parallax scrolling stars across 3 depth layers",
      "Dark/light mode toggle with localStorage persistence",
      "Scroll-based active section detection in the navbar",
    ],
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    github: "https://github.com/SJKangAU/my-portfolio",
    // Live demo link to be added after deployment
  },
];

export default function Projects({ darkMode }: ProjectsProps) {
  // Track which project is expanded and animation state
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Refs to measure card and grid positions for the expand animation
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [startRect, setStartRect] = useState<DOMRect | null>(null);
  const [gridRect, setGridRect] = useState<DOMRect | null>(null);

  const expandedProject = projects.find((p) => p.title === expandedId) ?? null;

  // Open — measure rects then trigger animation
  const open = (title: string) => {
    const cardEl = cardRefs.current[title];
    const gridEl = gridRef.current;
    if (!cardEl || !gridEl) return;
    setStartRect(cardEl.getBoundingClientRect());
    setGridRect(gridEl.getBoundingClientRect());
    setExpandedId(title);
    setTimeout(() => setIsVisible(true), 10);
  };

  // Close — animate out then unmount
  const close = () => {
    setIsVisible(false);
    setTimeout(() => {
      setExpandedId(null);
      setStartRect(null);
      setGridRect(null);
    }, 400);
  };

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Theme-based styles
  const border = darkMode ? "border-gray-800" : "border-gray-300";
  const accent = darkMode ? "text-blue-400" : "text-violet-600";
  const heading = darkMode ? "text-white" : "text-gray-900";
  const muted = darkMode ? "text-gray-400" : "text-gray-500";
  const card = darkMode
    ? "bg-gray-900/60 border-gray-800 hover:border-blue-500/50"
    : "bg-white/50 border-gray-300 hover:border-violet-400";
  const chipBg = darkMode
    ? "bg-blue-500/10 border-blue-500/30 text-blue-300"
    : "bg-violet-100 border-violet-300 text-violet-700";
  const linkBtn = darkMode
    ? "border-gray-700 text-gray-400 hover:border-blue-500 hover:text-blue-300"
    : "border-gray-300 text-gray-500 hover:border-violet-500 hover:text-violet-600";
  const featureDot = darkMode ? "bg-blue-400" : "bg-violet-500";
  const expandedCard = darkMode
    ? "bg-[#0d1225] border-blue-500/40"
    : "bg-white border-violet-400/60";
  const closeBtn = darkMode
    ? "text-gray-400 hover:text-white border-gray-700 hover:border-gray-400"
    : "text-gray-500 hover:text-gray-900 border-gray-300 hover:border-gray-500";

  // Animate the expanded card from the clicked card's rect to the grid's rect
  const getExpandedStyle = (): React.CSSProperties => {
    if (!startRect || !gridRect) return {};

    // On mobile use a centred fixed panel instead of matching the full grid rect
    const isMobile = window.innerWidth < 768;

    if (!isVisible) {
      return {
        position: "fixed",
        top: startRect.top,
        left: startRect.left,
        width: startRect.width,
        height: startRect.height,
        borderRadius: "0.75rem",
        transition: "none",
        zIndex: 50,
      };
    }

    if (isMobile) {
      // Centre the expanded card with comfortable padding from screen edges
      return {
        position: "fixed",
        top: "10vh",
        left: "5vw",
        width: "90vw",
        height: "80vh",
        borderRadius: "0.75rem",
        transition:
          "top 0.4s cubic-bezier(0.4,0,0.2,1), left 0.4s cubic-bezier(0.4,0,0.2,1), width 0.4s cubic-bezier(0.4,0,0.2,1), height 0.4s cubic-bezier(0.4,0,0.2,1)",
        zIndex: 50,
      };
    }

    // Desktop: expand to fill the full grid area
    return {
      position: "fixed",
      top: gridRect.top,
      left: gridRect.left,
      width: gridRect.width,
      height: gridRect.height,
      borderRadius: "0.75rem",
      transition:
        "top 0.4s cubic-bezier(0.4,0,0.2,1), left 0.4s cubic-bezier(0.4,0,0.2,1), width 0.4s cubic-bezier(0.4,0,0.2,1), height 0.4s cubic-bezier(0.4,0,0.2,1)",
      zIndex: 50,
    };
  };

  // Render the correct action buttons depending on what links a project has
  const renderLinks = (project: Project, large = false) => {
    const size = large ? "text-sm px-4 py-2" : "text-xs px-3 py-1.5";
    const iconSize = large ? 16 : 14;

    return (
      <div className="flex flex-wrap gap-2">
        {/* GitHub button */}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`inline-flex items-center gap-1.5 font-semibold border rounded-lg transition-all duration-200 hover:scale-105 ${size} ${linkBtn}`}
          >
            <svg
              width={iconSize}
              height={iconSize}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
        )}

        {/* Live demo button */}
        {project.liveDemo && (
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`inline-flex items-center gap-1.5 font-semibold border rounded-lg transition-all duration-200 hover:scale-105 ${size} ${linkBtn}`}
          >
            <svg
              width={iconSize}
              height={iconSize}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            Live Demo
          </a>
        )}

        {/* Report button — shown when repo is unavailable but report exists */}
        {project.report && (
          <a
            href={project.report}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`inline-flex items-center gap-1.5 font-semibold border rounded-lg transition-all duration-200 hover:scale-105 ${size} ${linkBtn}`}
          >
            <svg
              width={iconSize}
              height={iconSize}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            View Report
          </a>
        )}
      </div>
    );
  };

  return (
    <section
      id="projects"
      className={`relative px-8 md:px-20 py-24 border-b ${border}`}
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* ── Section header ── */}
        <p
          className={`text-sm tracking-[0.25em] uppercase font-medium mb-3 ${accent}`}
        >
          My Work
        </p>
        <h2 className={`text-4xl md:text-5xl font-extrabold mb-4 ${heading}`}>
          Projects
        </h2>
        <p className={`mb-12 text-base ${muted}`}>
          Click any card to learn more.
        </p>

        {/* ── Card grid ── */}
        <div
          ref={gridRef}
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <div
              key={project.title}
              ref={(el) => {
                cardRefs.current[project.title] = el;
              }}
              onClick={() => open(project.title)}
              className={`flex flex-col rounded-xl border p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${card} ${
                darkMode
                  ? "hover:shadow-blue-900/30"
                  : "hover:shadow-violet-200/60"
              }`}
            >
              {/* Title row */}
              <div className="flex justify-between items-start mb-2">
                <h3 className={`text-lg font-bold ${heading}`}>
                  {project.title}
                </h3>
                <span className={`text-sm ${muted}`}>↗</span>
              </div>

              {/* Short description */}
              <p className={`text-sm leading-relaxed flex-1 mb-4 ${muted}`}>
                {project.shortDescription}
              </p>

              {/* Tech chips */}
              <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className={`px-2 py-0.5 rounded-full text-xs font-medium border ${chipBg}`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action buttons — small size on card */}
              {renderLinks(project, false)}
            </div>
          ))}
        </div>
      </div>

      {/* ── Expanded card ──
          Animates from the clicked card's rect to fill the entire grid area. ── */}
      {expandedId && expandedProject && (
        <div
          style={getExpandedStyle()}
          className={`overflow-auto border shadow-2xl ${expandedCard}`}
        >
          <div className="p-8 h-full flex flex-col">
            {/* Close button */}
            <button
              onClick={close}
              className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg border text-sm transition-all ${closeBtn}`}
            >
              ✕
            </button>

            {/* Content fades in after the expand animation completes */}
            <div
              className="flex flex-col h-full"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.25s ease 0.2s",
              }}
            >
              {/* Title */}
              <h3 className={`text-2xl font-extrabold mb-2 pr-8 ${heading}`}>
                {expandedProject.title}
              </h3>

              {/* Tech chips */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {expandedProject.tech.map((t) => (
                  <span
                    key={t}
                    className={`px-2 py-0.5 rounded-full text-xs font-medium border ${chipBg}`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Full description */}
              <p className={`text-sm leading-relaxed mb-6 ${muted}`}>
                {expandedProject.longDescription}
              </p>

              {/* Key features */}
              <h4
                className={`text-xs uppercase tracking-widest font-semibold mb-3 ${muted}`}
              >
                Key Features
              </h4>
              <ul className="space-y-2 mb-8">
                {expandedProject.features.map((feature) => (
                  <li
                    key={feature}
                    className={`flex items-start gap-2 text-sm ${muted}`}
                  >
                    <span
                      className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${featureDot}`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Action buttons — large size in expanded view */}
              <div className="mt-auto">
                {renderLinks(expandedProject, true)}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
