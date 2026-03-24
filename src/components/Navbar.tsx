import { useEffect, useRef, useState } from "react";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [activeSection, setActiveSection] = useState<string>("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);

  // Track which section is in view for the active underline indicator
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.6 },
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Move the underline indicator to the active nav link on desktop
  useEffect(() => {
    if (!navRef.current) return;
    const activeLink = navRef.current.querySelector(
      `a[href="#${activeSection}"]`,
    ) as HTMLAnchorElement;
    if (activeLink) {
      const { offsetLeft, offsetWidth } = activeLink;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeSection]);

  // Close mobile menu when a link is tapped
  const handleNavClick = () => setMenuOpen(false);

  const sections = ["about", "projects", "contact"];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-300 border-b ${
        darkMode
          ? "bg-black/60 border-gray-800 text-white"
          : "bg-white/60 border-gray-300 text-black"
      }`}
    >
      {/* ── Main nav row ── */}
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo / name */}
        <h1 className="text-base font-bold tracking-wide truncate mr-4">
          Jason Kang
        </h1>

        {/* Desktop nav links — hidden on mobile */}
        <div
          ref={navRef}
          className="relative hidden md:flex items-center space-x-6 text-sm font-medium"
        >
          {sections.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={`capitalize px-1 pb-1 transition-colors ${
                activeSection === section
                  ? darkMode
                    ? "text-blue-400"
                    : "text-purple-600"
                  : "hover:opacity-70"
              }`}
            >
              {section}
            </a>
          ))}

          {/* Animated underline indicator */}
          <span
            className={`absolute bottom-0 h-[2px] transition-all duration-300 ease-in-out ${
              darkMode ? "bg-blue-500" : "bg-purple-500"
            }`}
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
            }}
          />

          {/* Dark/light toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`ml-6 px-3 py-1 rounded-md border text-xs font-medium transition-all ${
              darkMode
                ? "bg-gray-900 border-gray-600 text-gray-200 hover:bg-gray-800"
                : "bg-gray-100 border-gray-400 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Mobile controls — theme toggle + hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-2 py-1 rounded-md border text-xs font-medium transition-all ${
              darkMode
                ? "bg-gray-900 border-gray-600 text-gray-200"
                : "bg-gray-100 border-gray-400 text-gray-700"
            }`}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* Hamburger button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex flex-col gap-1.5 p-1 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 transition-all duration-300 ${
                darkMode ? "bg-gray-300" : "bg-gray-700"
              } ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 transition-all duration-300 ${
                darkMode ? "bg-gray-300" : "bg-gray-700"
              } ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 transition-all duration-300 ${
                darkMode ? "bg-gray-300" : "bg-gray-700"
              } ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown menu ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`flex flex-col px-6 pb-4 gap-4 text-sm font-medium border-t ${
            darkMode ? "border-gray-800" : "border-gray-200"
          }`}
        >
          {sections.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={handleNavClick}
              className={`capitalize pt-3 transition-colors ${
                activeSection === section
                  ? darkMode
                    ? "text-blue-400"
                    : "text-purple-600"
                  : "hover:opacity-70"
              }`}
            >
              {section}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}