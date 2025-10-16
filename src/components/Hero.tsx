export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center text-center md:text-left min-h-[80vh] px-6 py-10 bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <div className="max-w-lg">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Jason Kang</h2>
        <p className="text-lg sm:text-xl mb-6 text-gray-300">
          IT Graduate & Aspiring Software Developer. I love building clean, efficient, and meaningful code.
        </p>
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          <a href="https://github.com/yourusername" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">GitHub</a>
          <a href="https://linkedin.com/in/yourprofile" className="px-4 py-2 border border-blue-600 rounded hover:bg-blue-700">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}
