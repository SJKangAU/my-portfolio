import { useState, useEffect } from "react";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  // Load saved preference on first render
  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "light") setDarkMode(false);
  }, []);

  // Save preference whenever mode changes
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div
      className={`relative w-screen h-screen flex flex-col items-center justify-center transition-colors duration-700 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Optional vignette only in dark mode */}
      {darkMode && (
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_70%,_rgba(0,0,0,0.9)_100%)] pointer-events-none -z-10"
        ></div>
      )}

      {/* Button to toggle modes */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`absolute top-6 right-6 px-4 py-2 rounded-md text-sm font-medium border transition-all ${
          darkMode
            ? "bg-gray-900 border-gray-600 text-gray-200 hover:bg-gray-800"
            : "bg-gray-200 border-gray-400 text-gray-700 hover:bg-gray-300"
        }`}
      >
        {darkMode ? "Light" : "Dark"}
      </button>

      {/* Content */}
      <h1 className="text-5xl font-bold">Persistent Theme Toggle</h1>
      <p className="mt-4 text-lg text-gray-400">
        Your preference is saved — try refreshing the page!
        
      </p>
    </div>
  );
}
