import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
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

          <section
            id="projects"
            className="min-h-screen flex items-center justify-center"
          >
            <h2 className="text-3xl font-semibold">Projects Section</h2>
          </section>

          <section
            id="contact"
            className="min-h-screen flex items-center justify-center"
          >
            <h2 className="text-3xl font-semibold">Contact Section</h2>
          </section>
        </main>
      </div>
    </div>
  );
}
