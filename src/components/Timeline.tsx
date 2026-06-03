"use client";

interface TimelineEntry {
  date: string;
  role: string;
  company: string;
  description: string;
  redacted?: boolean;
}

const entries: TimelineEntry[] = [
  {
    date: "2024 — PRESENT",
    role: "Senior Dimensional Engineer",
    company: "Hawkins National Laboratory",
    description: "Leading the containment architecture team. Designing fault-tolerant systems that operate under extreme inter-dimensional stress conditions. Managing a cross-functional team of 8 operatives.",
  },
  {
    date: "2022 — 2024",
    role: "Full-Stack Operative",
    company: "The Upside Down Initiative",
    description: "Built and deployed mission-critical applications for monitoring breach zones. Reduced system latency by 40% through architectural optimization.",
  },
  {
    date: "2021 — 2022",
    role: "Frontend Specialist",
    company: "Starcourt Industries",
    description: "Developed consumer-facing interfaces with a focus on performance and accessibility. Implemented design system used across 12 product teams.",
    redacted: true,
  },
  {
    date: "2019 — 2021",
    role: "Junior Research Associate",
    company: "Department of Energy — Division 7",
    description: "Contributed to early-stage research on electromagnetic anomalies. Developed internal tools for data visualization and reporting pipelines.",
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="px-6 max-w-[1200px] mx-auto relative" style={{ paddingTop: 120, paddingBottom: 120 }}>
      {/* Section header */}
      <div className="mb-16 reveal">
        <p className="text-primary-container mb-3" style={{ fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {"> DECRYPTING RECORDS..."}
        </p>
        <h2 className="text-headline-lg text-on-surface neon-glow-subtle" style={{ fontFamily: "var(--font-display)" }}>
          The Timeline
        </h2>
        <p className="text-body-lg text-on-surface-variant mt-3 max-w-[600px]">
          Government records of classified operational deployments. Some entries remain under active redaction protocols.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative pl-16 md:pl-20">
        {/* Vertical line */}
        <div className="timeline-line" />

        {entries.map((entry, i) => (
          <div key={i} className="relative mb-16 last:mb-0 reveal" style={{ transitionDelay: `${i * 0.15}s` }}>
            {/* Dot */}
            <div className="timeline-dot" />

            {/* Card */}
            <div className="classified-card p-6 md:p-8 ml-4">
              {/* Date */}
              <span className="text-primary-container block mb-2" style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.1em" }}>
                {entry.date}
              </span>

              {/* Role */}
              <h3 className="text-[20px] leading-[26px] text-on-surface font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>
                {entry.role}
              </h3>

              {/* Company */}
              <p className="text-on-surface-variant mb-4" style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.05em" }}>
                @ {entry.company}
              </p>

              {/* Description */}
              {entry.redacted ? (
                <div className="relative">
                  <p className="text-body-md text-on-surface-variant opacity-80">{entry.description}</p>
                  <div className="absolute inset-0 flex items-center justify-center" style={{
                    background: "repeating-linear-gradient(0deg, #131313 0px, #131313 3px, transparent 3px, transparent 6px)",
                    opacity: 0.85,
                  }}>
                    <span className="text-primary-container px-3 py-1 border border-primary-container/30" style={{
                      fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase",
                      background: "#131313",
                    }}>
                      [DATA EXPUNGED — CLEARANCE LEVEL 4 REQUIRED]
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-body-md text-on-surface-variant opacity-80">{entry.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
