import { reveal } from "../lib/reveal";
import { useState } from "react";

interface CaseStudyProps {
  darkMode: boolean;
}

// Illustrative example based on the Sua Hair feature set; not a record of the real project documents.

const requirements = {
  Must: [
    "Customers can choose a service, stylist and available time slot and confirm a booking.",
    "Availability updates in real time so the same slot cannot be double-booked.",
    "Admins can view, edit and cancel appointments from a dashboard.",
  ],
  Should: [
    "Admins can manage staff and the list of services.",
    "The booking flow works on mobile screens.",
  ],
  Could: ["Admins can set and change staff availability in advance."],
  "Won't (this release)": ["Online payments and automated reminders."],
};

const testCases = [
  {
    id: "TC1",
    title: "Book an available slot",
    steps: "Select service, stylist and a free time, then confirm.",
    expected: "Booking is saved and appears in the admin dashboard.",
  },
  {
    id: "TC2",
    title: "Prevent double booking",
    steps: "Open the same slot in two browsers and confirm in both.",
    expected: "The second attempt is rejected with a clear message.",
  },
  {
    id: "TC3",
    title: "Admin cancels an appointment",
    steps: "Cancel a booking from the dashboard.",
    expected: "The slot becomes available to customers again.",
  },
  {
    id: "TC4",
    title: "Manage staff and services",
    steps: "Add a service and edit a staff member as an admin.",
    expected: "Changes show in the customer booking flow.",
  },
  {
    id: "TC5",
    title: "Mobile booking flow",
    steps: "Complete a booking on a phone-sized screen.",
    expected: "All steps are usable without horizontal scrolling.",
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
          {...reveal(0)}
          className={`text-sm tracking-[0.25em] uppercase font-medium mb-3 ${accent}`}
        >
          Illustrative Example
        </p>
        <h2
          {...reveal(1)}
          className={`text-4xl md:text-5xl font-extrabold mb-4 ${heading}`}
        >
          Case Study
        </h2>
        <p {...reveal(2)} className={`mb-8 text-base max-w-xl ${muted}`}>
          Illustrative example based on the Sua Hair feature set: requirements,
          process change and test cases.
        </p>

        <button
          {...reveal(3)}
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
                Illustrative example based on the Sua Hair feature set. The As-Is
                flow assumes bookings were arranged manually and confirmed back
                and forth.
              </p>
              <svg
                viewBox="0 0 650 210"
                role="img"
                aria-label="As-Is process: customer enquires, staff checks diary, reply to confirm, booking noted by hand. To-Be process: customer picks a slot, system checks availability, booking auto-confirmed, admin sees it on the dashboard."
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
                  As-Is (manual)
                </text>
                {step(10, 28, "Customer enquires")}
                {step(170, 28, "Staff checks diary", true)}
                {step(330, 28, "Reply to confirm", true)}
                {step(490, 28, "Booking noted by hand", true)}
                <text
                  x="10"
                  y="118"
                  fontSize="13"
                  fontWeight="700"
                  fill={stroke}
                >
                  To-Be (booking system)
                </text>
                {step(10, 128, "Customer picks slot")}
                {step(170, 128, "Checks availability")}
                {step(330, 128, "Auto-confirmed")}
                {step(490, 128, "Admin sees dashboard")}
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
                <span style={{ color: pain }}>Gap:</span> the manual steps
                (red) add delay and double-booking risk. The To-Be flow removes
                them by checking availability at the point of booking.
              </p>
            </div>

            {/* Test cases */}
            <div className={`rounded-xl border p-6 ${card}`}>
              <h3 className={`text-lg font-bold mb-4 ${heading}`}>
                3. Test cases
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
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
