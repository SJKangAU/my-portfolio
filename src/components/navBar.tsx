export default function Navbar() {
  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold">Jason Kang</h1>
      <div className="flex flex-wrap justify-center sm:justify-end gap-3 mt-3 sm:mt-0">
        <a href="#projects" className="hover:text-blue-400">Projects</a>
        <a href="#about" className="hover:text-blue-400">About</a>
        <a href="#contact" className="hover:text-blue-400">Contact</a>
      </div>
    </nav>
  );
}
