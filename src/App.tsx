import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

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
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Navbar at top */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Scrollable Content */}
      <main className="pt-24 px-8 space-y-24">
        <section className="min-h-screen flex flex-col items-center justify-center border-b border-gray-700/40">
          <h1 className="text-5xl font-bold">Persistent Theme Toggle</h1>
          <p className="mt-4 text-lg text-gray-400">
            Your preference is saved — try refreshing the page!
          </p>
        </section>

        <section
          id="about"
          className="min-h-screen flex items-center justify-center border-b border-gray-700/40"
        >
          <h2 className="text-3xl font-semibold">About Section</h2>
        </section>

        <section
          id="projects"
          className="min-h-screen flex items-center justify-center border-b border-gray-700/40"
        >
          <h2 className="text-3xl font-semibold">Projects Section</h2>
        </section>

        <section
          id="contact"
          className="min-h-screen flex items-center justify-center border-b border-gray-700/40"
        >
          <h2 className="text-3xl font-semibold">Contact Section</h2>
        </section>
      </main>
    </div>
  );
}
