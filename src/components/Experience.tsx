import { reveal } from "../lib/reveal";
import CountUp from "./CountUp";
interface ExperienceProps {
  darkMode: boolean;
}

interface Role {
  title: string;
  company: string;
  period: string;
  bullets: string[];
}

// Reverse chronological. No client names or internal details.
const roles: Role[] = [
  {
    title: "Support Coordinator",
    company: "Innovative Security and Data",
    period: "Jun 2026 – Oct 2026",
    bullets: [
      "Developed a repeatable Python-based method to convert raw security panel exports into structured, site-specific device checklists.",
      "Wrote a business requirements document, As-Is/To-Be process maps with a gap analysis, and a user acceptance test plan for a proposed workflow improvement.",
      "Defined requirements and a test plan to evaluate a job management and CRM platform.",
      "Provided day-to-day functional support for security systems and AroFlo.",
    ],
  },
  {
    title: "Front Desk & Bell Attendant (part-time)",
    company: "Crown Melbourne",
    period: "Jun 2022 – Present",
    bullets: [
      "Designed and deployed an Excel VBA tool connected to the Opera PMS so bell attendants could log guest rooms and track check-ins.",
      "Led a cross-hotel improvement initiative across 3 Crown properties that reduced technical service requests by 10%.",
    ],
  },
  {
    title: "Intern Programmer",
    company: "Doodel Delivery",
    period: "Dec 2021 – Mar 2022",
    bullets: [
      "Java, Python and SQL on two production mobile and web apps in an Agile/Scrum team.",
    ],
  },
];

const stats = [
  { end: 10, suffix: "%", label: "fewer technical service requests (Crown Melbourne)" },
  { end: 3, suffix: "", label: "Crown properties in the improvement initiative" },
  { end: 15, suffix: "%", label: "prediction accuracy gain (ML salary bias project)" },
];

export default function Experience({ darkMode }: ExperienceProps) {
  const border = darkMode ? "border-gray-800" : "border-gray-300";
  const accent = darkMode ? "text-blue-400" : "text-violet-700";
  const heading = darkMode ? "text-white" : "text-gray-900";
  const muted = darkMode ? "text-gray-400" : "text-gray-600";
  const card = darkMode
    ? "bg-gray-900/60 border-gray-800"
    : "bg-white/50 border-gray-300";
  const featureDot = darkMode ? "bg-blue-400" : "bg-violet-500";

  return (
    <section
      id="experience"
      className={`px-8 md:px-20 py-24 border-b ${border}`}
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <p
          {...reveal(0)}
          className={`text-sm tracking-[0.25em] uppercase font-medium mb-3 ${accent}`}
        >
          Where I've Worked
        </p>
        <h2
          {...reveal(1)}
          className={`text-4xl md:text-5xl font-extrabold mb-12 ${heading}`}
        >
          Work Experience
        </h2>

        {/* Headline numbers, all taken from the roles and projects on this site */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              {...reveal(i)}
              className={`rounded-xl border p-5 text-center ${card}`}
            >
              <p className={`text-3xl font-extrabold ${accent}`}>
                <CountUp end={stat.end} suffix={stat.suffix} />
              </p>
              <p className={`mt-1 text-xs ${muted}`}>{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="w-full space-y-6 text-left">
          {roles.map((role, i) => (
            <article
              key={`${role.company}-${role.period}`}
              {...reveal(i)}
              className={`rounded-xl border p-6 ${card}`}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-4">
                <div>
                  <h3 className={`text-lg font-bold ${heading}`}>
                    {role.title}
                  </h3>
                  <p className={`text-sm font-medium ${accent}`}>
                    {role.company}
                  </p>
                </div>
                <p className={`text-xs ${muted}`}>{role.period}</p>
              </div>
              <ul className="space-y-2">
                {role.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className={`flex items-start gap-2 text-sm leading-relaxed ${muted}`}
                  >
                    <span
                      className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${featureDot}`}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
