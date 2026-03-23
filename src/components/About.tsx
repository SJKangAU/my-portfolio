interface AboutProps {
  darkMode: boolean;
}

const skills = {
  Languages: ["TypeScript", "JavaScript", "Python", "Java"],
  "Frameworks & Libraries": ["React", "Node.js", "Firebase"],
  "Web & Cloud": ["RESTful APIs", "Firebase Hosting", "Docker", "AWS"],
  "Tools & Practices": ["Git", "VS Code", "Agile / Scrum"],
  "Data & Automation": ["SQL", "Python Pandas", "NumPy", "Excel VBA"],
};

const education = [
  {
    degree: "Master of Information Technology",
    major: "Major in Computing",
    institution: "The University of Melbourne",
    period: "Jan 2021 – Nov 2023",
  },
  // {
  //   degree: "Bachelor of Agriculture",
  //   major: "Major in Agricultural Economics",
  //   institution: "The University of Melbourne",
  //   period: "Jan 2018 – Dec 2020",
  // },
];

export default function About({ darkMode }: AboutProps) {
  const border = darkMode ? "border-gray-800" : "border-gray-300";
  const muted = darkMode ? "text-gray-400" : "text-gray-500";
  const card = darkMode
    ? "bg-gray-900/60 border-gray-800"
    : "bg-white/50 border-gray-300";
  const accent = darkMode ? "text-blue-400" : "text-violet-600";
  const chipBg = darkMode
    ? "bg-blue-500/10 border-blue-500/30 text-blue-300"
    : "bg-violet-100 border-violet-300 text-violet-700";
  const heading = darkMode ? "text-white" : "text-gray-900";

  return (
    <section
      id="about"
      className={`min-h-screen px-8 md:px-20 py-24 border-b ${border}`}
    >
      {/* Centred container */}
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Section label */}
        <p
          className={`text-sm tracking-[0.25em] uppercase font-medium mb-3 ${accent}`}
        >
          About Me
        </p>

        <h2 className={`text-4xl md:text-5xl font-extrabold mb-12 ${heading}`}>
          Who I am
        </h2>

        {/* Two col grid — left aligned internally but centred as a whole */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 text-left">
          {/* Left col — Bio + Education */}
          <div className="space-y-12">
            <div>
              <h3
                className={`text-xs uppercase tracking-widest font-semibold mb-4 ${muted}`}
              >
                Background
              </h3>
              <p className={`text-base leading-relaxed ${muted}`}>
                I'm a Melbourne-based developer with a Master of IT (Computing)
                from the University of Melbourne. My background is a bit
                unconventional — I started in Agricultural Economics before
                pivoting fully into software, which means I bring a
                problem-solving mindset that's grounded in real-world
                constraints, not just code.
              </p>
              <p className={`mt-4 text-base leading-relaxed ${muted}`}>
                I focus on full-stack web development, data analytics, and
                process automation. I enjoy building things that are actually
                useful — whether that's a user-facing app or a script that
                eliminates repetitive work. Currently at Crown Melbourne leading
                a CPT project team while shipping personal projects on the side.
              </p>
            </div>

            <div>
              <h3
                className={`text-xs uppercase tracking-widest font-semibold mb-4 ${muted}`}
              >
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div
                    key={edu.degree}
                    className={`p-4 rounded-lg border ${card}`}
                  >
                    <p className={`text-sm font-semibold ${heading}`}>
                      {edu.degree}
                    </p>
                    <p className={`text-sm mt-0.5 ${accent}`}>{edu.major}</p>
                    <p className={`text-xs mt-1 ${muted}`}>
                      {edu.institution} · {edu.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right col — Skills */}
          <div>
            <h3
              className={`text-xs uppercase tracking-widest font-semibold mb-4 ${muted}`}
            >
              Technical Skills
            </h3>
            <div className="space-y-6">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category}>
                  <p
                    className={`text-xs font-semibold uppercase tracking-wider mb-2 ${muted}`}
                  >
                    {category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${chipBg}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
