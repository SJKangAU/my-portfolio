import { reveal } from "../lib/reveal";
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

const stakeholders = [
  ["Owner and director", "See all stylists live, approve bookings, manage services and prices, build in the salon's own rules", "High / High", "Losing control of the diary, a double booking in front of a client", "Manage closely: walkthroughs, sign-off on requirements"],
  ["Stylists", "See only their own bookings; stop being interrupted to take bookings", "Medium / High", "Extra admin on the floor, being overbooked", "Keep informed and involved"],
  ["Clients", "Book any time in under 3 minutes without an account", "Low / Medium", "Privacy of name and phone, a booking that silently disappears", "Keep satisfied; represented by the owner until tested"],
  ["Fresha and hosting providers", "Dependencies: Fresha holds client data until the import is verified", "Medium / Low", "Cost and terms changing; losing data access too early", "Monitor; keep Fresha active until verified"],
];

const scope = [
  ["In scope", "Online booking without accounts. Admin timeline, bookings and client records. Phased services. Roles. Pending requests with a 24-hour hold. Fresha client import. Waitlist and email notifications."],
  ["Not yet", "Service rules and hair-history screening (needs the owner workshop). Follow-up reminders."],
  ["Out of scope", "Payments, customer accounts, multiple locations, payroll, replacing the Fresha marketplace."],
  ["Assumptions", "One location, five stylists, closed Mondays, 10am to 6pm, 30-minute slots, Australian mobile numbers."],
];

const raid = [
  ["R1", "A booking is overwritten or double-booked", "6", "Server-side clash check under a lock; race tests", "Mitigated in tests"],
  ["R2", "Owner and stylists fall back to old habits", "6", "Weekly walkthroughs; one-week pilot alongside the current process", "Open"],
  ["R3", "Client names and phone numbers exposed", "3", "Minimum data collected; public availability has no personal data; lockdown tests", "Mitigated in tests"],
  ["R9", "Success cannot be proven without a baseline", "6", "Compute bookings, cancellations and no-shows from the Fresha export before the switch", "Open"],
  ["R10", "The switch loses what Fresha provided (reminders, card payments, marketplace)", "6", "List what the salon uses, replace the essentials, run both side by side", "Open"],
];

const trace = [
  ["R1", "No double bookings", "Must", "Parity with Fresha", "Eight simultaneous requests give one booking", "Automated pass"],
  ["R2", "Book into processing windows", "Must", "Owner pain point", "Phase overlap tests", "Automated pass"],
  ["R3", "Book online 24/7 in under 3 minutes", "Must", "Parity with Fresha", "Browser booking flow tests", "Flow passes; 3-minute target not measured"],
  ["R5", "Manage stylists, services and prices", "Should", "Owner pain point", "Admin write tests", "Automated pass"],
  ["R7", "Owner approves or declines requests", "Should", "Business case", "Approval and email logic tests", "Logic passes; email delivery not verified"],
  ["R8", "Service rules and hair history", "Must", "Owner pain point", "None yet", "Not built"],
  ["R9", "Fresha client import", "Must", "Transition", "Import tests up to 10,000 rows", "Synthetic files only; real export not run"],
];

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

  const table = (head: string[], rows: string[][]) => (
    <div className="overflow-x-auto">
      <table className={`w-full text-sm ${muted}`}>
        <thead>
          <tr className={`text-left ${heading}`}>
            {head.map((h) => (
              <th key={h} className="pr-4 pb-2 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]} className={`border-t ${border}`}>
              {r.map((c, i) => (
                <td
                  key={i}
                  className={`pr-4 py-2 align-top min-w-24 ${i === 0 ? heading : ""}`}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

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
          Real Project
        </p>
        <h2
          {...reveal(1)}
          className={`text-4xl md:text-5xl font-extrabold mb-4 ${heading}`}
        >
          Case Study
        </h2>
        <p {...reveal(2)} className={`mb-8 text-base max-w-xl ${muted}`}>
          Sua Hair: a booking system for a real salon, moving off Fresha.
          Requirements, process change, test evidence and the analysis documents behind them.
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
            {/* BA artefacts */}
            <div className={`rounded-xl border p-6 ${card}`}>
              <h3 className={`text-lg font-bold mb-1 ${heading}`}>
                4. Stakeholder analysis
              </h3>
              <p className={`text-xs mb-4 ${muted}`}>
                Ratings are my own assessment (influence / interest), not yet
                validated with the owner.
              </p>
              {table(
                ["Stakeholder", "Needs", "Influence / interest", "Main concern", "Engagement"],
                stakeholders,
              )}
            </div>

            <div className={`rounded-xl border p-6 ${card}`}>
              <h3 className={`text-lg font-bold mb-4 ${heading}`}>
                5. Scope statement
              </h3>
              {table(["", "Detail"], scope)}
            </div>

            <div className={`rounded-xl border p-6 ${card}`}>
              <h3 className={`text-lg font-bold mb-1 ${heading}`}>
                6. RAID log (top risks)
              </h3>
              <p className={`text-xs mb-4 ${muted}`}>
                Score = likelihood x impact (1 to 3 each). A score of 6 or more
                needs an owner and a response. The full log also holds
                assumptions, issues and dependencies.
              </p>
              {table(["ID", "Risk", "Score", "Response", "Status"], raid)}
            </div>

            <div className={`rounded-xl border p-6 ${card}`}>
              <h3 className={`text-lg font-bold mb-1 ${heading}`}>
                7. Requirements traceability
              </h3>
              <p className={`text-xs mb-4 ${muted}`}>
                Each requirement links to its source, its tests and what is
                actually verified. Nothing is marked verified by user
                acceptance, because none has happened yet.
              </p>
              {table(
                ["ID", "Requirement", "Priority", "Source", "Tests", "Verified?"],
                trace,
              )}
            </div>

            <div className={`rounded-xl border p-6 ${card}`}>
              <h3 className={`text-lg font-bold mb-3 ${heading}`}>
                8. Also produced, and what is next
              </h3>
              <p className={`text-sm mb-3 ${muted}`}>
                Also in the full document: business case, glossary,
                success measures with a Fresha baseline, non-functional
                requirements, decision log, defect log, user acceptance test
                plans, and a workshop pack for the owner covering service
                profiles, hair-history rules and reminder consent.
              </p>
              <ul className={`space-y-1.5 text-sm ${muted}`}>
                <li>• Run the owner workshop and build the service rules from it.</li>
                <li>• Compute the baseline from the Fresha export.</li>
                <li>• Run a one-week pilot alongside the current process, then user acceptance tests.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
