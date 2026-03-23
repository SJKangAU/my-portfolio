import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import SpaceBackground from "./components/SpaceBackground";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "light") setDarkMode(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div
      className={`relative min-h-screen transition-colors duration-700 ${
        darkMode ? "text-gray-100" : "text-gray-900"
      }`}
    >
      {/* Global space background */}
      <SpaceBackground darkMode={darkMode} />

      {/* All content sits above the background */}
      <div className="relative z-10">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <main className="space-y-24">
          <Hero darkMode={darkMode} />
          <About darkMode={darkMode} />

          <Projects darkMode={darkMode} />

          <Contact darkMode={darkMode} />
        </main>
      </div>
    </div>
  );
}
