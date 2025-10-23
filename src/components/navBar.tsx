import { useEffect, useRef, useState } from "react";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [activeSection, setActiveSection] = useState<string>("about");
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
  });
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    const activeLink = navRef.current.querySelector(
      `a[href="#${activeSection}"]`
    ) as HTMLAnchorElement;
    if (activeLink) {
      const { offsetLeft, offsetWidth } = activeLink;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeSection]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 backdrop-blur-md transition-all duration-300 border-b ${
        darkMode
          ? "bg-black/60 border-gray-800 text-white"
          : "bg-white/60 border-gray-300 text-black"
      }`}
    >
      <h1 className="text-xl font-bold tracking-wide">My Portfolio</h1>

      <div ref={navRef} className="relative flex items-center space-x-6 text-sm font-medium">
        {["about", "projects", "contact"].map((section) => (
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

        {/* Animated underline */}
        <span
          className={`absolute bottom-0 h-[2px] transition-all duration-300 ease-in-out ${
            darkMode ? "bg-blue-500" : "bg-purple-500"
          }`}
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
          }}
        />

        {/* Theme toggle */}
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
    </nav>
  );
}
