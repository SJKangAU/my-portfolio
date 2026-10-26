import { useState } from "react";

interface CaseStudyProps {
  darkMode: boolean;
}

// Based on the real Sua Hair project: owner-stated needs, the Fresha export, and automated test runs (docs/PILOT_READINESS.md).

const requirements = {
  Must: [
    "The server checks clashes and gives one slot to one client, even when requests arrive together.",
    "Services can have phases (hands-on, rest, hands-on) so a stylist can see another client during a rest window.",
    "Service eligibility rules, such as previous bleach needing a call first. Not built yet, waiting on a workshop with the owner.",
    "Import existing clients from the Fresha export so history is not lost.",
  ],
  Should: [
    "Roles: owner, stylist and public each see only what they need.",
    "A booking request holds its slot for 24 hours until the owner approves or declines.",
    "All times follow the salon's Melbourne clock.",
  ],
  Could: ["Follow-up reminders per service, subject to Spam Act consent."],
  "Won't (this release)": ["Online payments.", "SMS reminders, until consent rules are covered."],
};

const testCases = [
  {
    id: "TC1",
    title: "Simultaneous requests",
    steps: "Send eight booking requests for the same slot at once.",
    expected: "Exactly one booking is created; the others are refused.",
  },
  {
    id: "TC2",
    title: "Phased service",
    steps: "Book a second client into the first client's rest window.",
    expected: "Allowed. Overlap of hands-on time is rejected.",
  },
  {
    id: "TC3",
    title: "Public lockdown",
    steps: "As an anonymous visitor, try to write bookings, prices or client records, and read private data.",
    expected: "Every write and private read is denied.",
  },
  {
    id: "TC4",
    title: "Melbourne clock",
    steps: "Run the 5 pm cutoff and 2-hour notice across daylight-saving days, under UTC and Melbourne.",
    expected: "Identical results in both time zones.",
  },
  {
    id: "TC5",
    title: "Fresha client import",
    steps: "Import a synthetic Fresha-style file, then roll it back.",
    expected: "Clients created, blocked clients flagged, rollback removes exactly those records.",
  },
];

export default function CaseStudy({ darkMode }: CaseStudyProps) {
  const [open, setOpen] = useState(false);

  const border = darkMode ? "border-gray-800" : "border-gray-300";
  const accent = darkMode ? "text-blue-400" : "text-violet-700";
  const heading = darkMode ? "text-white" : "text-gray-900";
  const muted = darkMode ? "text-gray-400" : "text-gray-600";
  const card = darkMode
    ? "bg-gray-900/60 border-gray-800"
    : "bg-white/50 border-gray-300";
  const btn = darkMode
    ? "border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-300"
    : "border-gray-400 text-gray-700 hover:border-violet-500 hover:text-violet-700";

  // Diagram colours
  const box = darkMode ? "#111a33" : "#ffffff";
  const stroke = darkMode ? "#60a5fa" : "#6d28d9";
  const text = darkMode ? "#e5e7eb" : "#1f2937";
  const pain = darkMode ? "#f87171" : "#b91c1c";

  const step = (x: number, y: number, label: string, warn = false) => (
    <g key={`${x}-${y}`}>
      <rect
        x={x}
        y={y}
        width="150"
        height="44"
        rx="8"
        fill={box}
        stroke={warn ? pain : stroke}
        strokeWidth="1.5"
      />
      <text x={x + 75} y={y + 26} textAnchor="middle" fontSize="12" fill={text}>
        {label}
      </text>
    </g>
  );

  return (
    <section
      id="case-study"
      className={`px-8 md:px-20 py-24 border-b ${border}`}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <p
          className={`text-sm tracking-[0.25em] uppercase font-medium mb-3 ${accent}`}
        >
          Real Project
        </p>
        <h2 className={`text-4xl md:text-5xl font-extrabold mb-4 ${heading}`}>
          Case Study
        </h2>
        <p className={`mb-8 text-base max-w-xl ${muted}`}>
          Sua Hair: a booking system for a real salon, moving off Fresha.
          Requirements, process change and test evidence.
        </p>

        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="case-study-content"
          className={`px-6 py-3 rounded-lg font-semibold text-sm border transition-all duration-200 hover:scale-105 active:scale-95 ${btn}`}
        >
          {open ? "Hide case study" : "View case study"}
        </button>

        {open && (
          <div
            id="case-study-content"
            className="w-full mt-12 space-y-10 text-left"
          >
            {/* Requirements */}
            <div className={`rounded-xl border p-6 ${card}`}>
              <h3 className={`text-lg font-bold mb-4 ${heading}`}>
                1. Requirements (MoSCoW)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(requirements).map(([group, items]) => (
                  <div key={group}>
                    <p
                      className={`text-xs font-semibold uppercase tracking-wider mb-2 ${accent}`}
                    >
                      {group}
                    </p>
                    <ul className={`space-y-1.5 text-sm ${muted}`}>
                      {items.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Process diagram */}
            <div className={`rounded-xl border p-6 ${card}`}>
              <h3 className={`text-lg font-bold mb-1 ${heading}`}>
                2. Process: As-Is vs To-Be
              </h3>
              <p className={`text-xs mb-4 ${muted}`}>
                Bookings were handled on Fresha. The reasons for leaving are the
                owner's own and are still to be confirmed in a workshop.
              </p>
              <svg
                viewBox="0 0 650 210"
                role="img"
                aria-label="As-Is process: client books on Fresha, which has one-size service slots, so staff fix rules by hand and the data stays in Fresha. To-Be process: client requests a slot, the server checks clashes, the owner approves, and the calendar updates."
                className="w-full h-auto"
              >
                <defs>
                  <marker
                    id="cs-arrow"
                    markerWidth="8"
                    markerHeight="8"
                    refX="6"
                    refY="4"
                    orient="auto"
                  >
                    <path d="M0,0 L8,4 L0,8 z" fill={stroke} />
                  </marker>
                </defs>
                <text x="10" y="18" fontSize="13" fontWeight="700" fill={pain}>
                  As-Is (Fresha)
                </text>
                {step(10, 28, "Client books on Fresha")}
                {step(170, 28, "One-size service slot", true)}
                {step(330, 28, "Staff fix rules by hand", true)}
                {step(490, 28, "Data stays in Fresha", true)}
                <text
                  x="10"
                  y="118"
                  fontSize="13"
                  fontWeight="700"
                  fill={stroke}
                >
                  To-Be (Sua Hair)
                </text>
                {step(10, 128, "Client requests slot")}
                {step(170, 128, "Server checks clashes")}
                {step(330, 128, "Owner approves")}
                {step(490, 128, "Calendar updates")}
                {[0, 1, 2].flatMap((i) =>
                  [50, 150].map((y) => (
                    <line
                      key={`${i}-${y}`}
                      x1={160 + i * 160}
                      y1={y}
                      x2={169 + i * 160}
                      y2={y}
                      stroke={stroke}
                      strokeWidth="1.5"
                      markerEnd="url(#cs-arrow)"
                    />
                  )),
                )}
              </svg>
              <p className={`text-sm mt-2 ${muted}`}>
                <span style={{ color: pain }}>Gap:</span> Fresha cannot model multi-step
                services or eligibility rules, and charges fees. The red steps
                are the workarounds. The To-Be flow checks clashes on the server
                and keeps the data in the salon's own hands.
              </p>
            </div>

            {/* Test cases */}
            <div className={`rounded-xl border p-6 ${card}`}>
              <h3 className={`text-lg font-bold mb-4 ${heading}`}>
                3. Selected test scenarios
              </h3>
              <div className="overflow-x-auto">
                <table className={`w-full text-sm ${muted}`}>
                  <thead>
                    <tr className={`text-left ${heading}`}>
                      <th className="pr-4 pb-2 font-semibold">ID</th>
                      <th className="pr-4 pb-2 font-semibold">Scenario</th>
                      <th className="pr-4 pb-2 font-semibold">Steps</th>
                      <th className="pb-2 font-semibold">Expected result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testCases.map((tc) => (
                      <tr key={tc.id} className={`border-t ${border}`}>
                        <td className="pr-4 py-2 align-top">{tc.id}</td>
                        <td className={`pr-4 py-2 align-top ${heading}`}>
                          {tc.title}
                        </td>
                        <td className="pr-4 py-2 align-top min-w-48">
                          {tc.steps}
                        </td>
                        <td className="py-2 align-top min-w-48">
                          {tc.expected}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={`text-xs mt-4 ${muted}`}>
                All automated, run against Firebase emulators: 354 unit, 99
                rules, 111 server-function and 108 browser tests, passing under
                UTC and Melbourne time. Not yet verified: deployment, real
                email delivery, Safari and phones, and user acceptance testing
                with the salon.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
