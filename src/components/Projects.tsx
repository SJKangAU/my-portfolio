import { useEffect, useState } from "react";

interface Repo {
  name: string;
  html_url: string;
  description: string;
  language: string;
}

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    fetch("https://api.github.com/users/<your-github-username>/repos")
      .then(res => res.json())
      .then(data => setRepos(data.slice(0, 6)));
  }, []);

  return (
    <section id="projects" className="px-6 py-12 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map(repo => (
          <div
            key={repo.name}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg mb-2">{repo.name}</h3>
            <p className="text-sm text-gray-600">{repo.description || "No description"}</p>
            <p className="text-xs text-gray-500 mt-2">{repo.language}</p>
            <a
              href={repo.html_url}
              target="_blank"
              className="text-blue-600 text-sm mt-3 inline-block"
            >
              View on GitHub →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
