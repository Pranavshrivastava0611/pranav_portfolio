"use client";

import { useState } from "react";

interface Project {
  id: number;
  type: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  classification: string;
}

const projects: Project[] = [
  {
    id: 1, type: "WEB APPLICATION", title: "Project Hawkins",
    description: "A full-stack surveillance dashboard monitoring anomalous electromagnetic signatures across multiple dimensional rifts.",
    tags: ["React", "Node.js", "WebSocket", "D3.js"], category: "fullstack", classification: "TOP SECRET",
  },
  {
    id: 2, type: "MOBILE APPLICATION", title: "The Upside Down Tracker",
    description: "Cross-platform mobile application for field agents to report and track inter-dimensional breach events with offline-first architecture.",
    tags: ["React Native", "Firebase", "TypeScript"], category: "mobile", classification: "CLASSIFIED",
  },
  {
    id: 3, type: "API SYSTEM", title: "Demogorgon Protocol",
    description: "RESTful API service handling authentication, authorization, and secure data transmission between Hawkins Lab nodes.",
    tags: ["Python", "FastAPI", "PostgreSQL", "Docker"], category: "backend", classification: "RESTRICTED",
  },
  {
    id: 4, type: "DESIGN SYSTEM", title: "Eleven UI",
    description: "A comprehensive component library and design system built for rapid deployment of government-grade interfaces.",
    tags: ["Figma", "Storybook", "CSS", "React"], category: "design", classification: "DECLASSIFIED",
  },
  {
    id: 5, type: "DATA PIPELINE", title: "Mind Flayer Analytics",
    description: "Real-time data processing pipeline capable of ingesting and analyzing millions of sensor readings from the barrier between dimensions.",
    tags: ["Apache Kafka", "Python", "Elasticsearch"], category: "backend", classification: "TOP SECRET",
  },
  {
    id: 6, type: "WEB APPLICATION", title: "Vecna's Network",
    description: "Decentralized communication platform with end-to-end encryption for coordinating multi-team operations across hostile digital environments.",
    tags: ["Next.js", "WebRTC", "Tailwind", "Prisma"], category: "fullstack", classification: "CLASSIFIED",
  },
];

const categories = [
  { label: "// ALL FILES", value: "all" },
  { label: "// FULL-STACK", value: "fullstack" },
  { label: "// BACKEND", value: "backend" },
  { label: "// MOBILE", value: "mobile" },
  { label: "// DESIGN", value: "design" },
];

function ClassificationBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    "TOP SECRET": "border-primary-container/50 text-primary-container",
    CLASSIFIED: "border-primary/30 text-primary",
    RESTRICTED: "border-secondary/30 text-secondary",
    DECLASSIFIED: "border-on-surface/20 text-on-surface",
  };
  return (
    <span className={`text-[10px] px-2 py-1 border ${colors[level] || ""}`}
      style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
      [{level}]
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="classified-card group" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="card-scanline relative h-[200px] bg-surface-container-low overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "linear-gradient(rgba(227,24,55,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(227,24,55,0.1) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="material-symbols-outlined text-outline-variant" style={{ fontSize: 48, opacity: 0.3 }}>folder_special</span>
        </div>
        <div className="absolute inset-0 transition-opacity duration-300 pointer-events-none" style={{
          opacity: hovered ? 1 : 0,
          boxShadow: "inset 0 0 30px rgba(227,24,55,0.15)",
          background: hovered ? "linear-gradient(135deg, rgba(255,0,0,0.05), transparent, rgba(0,255,255,0.05))" : "none",
        }} />
      </div>
      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] text-outline" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{project.type}</span>
          <ClassificationBadge level={project.classification} />
        </div>
        <h3 className="text-[22px] leading-[28px] text-on-surface mb-3 font-bold" style={{ fontFamily: "var(--font-display)" }}>{project.title}</h3>
        <p className="text-[14px] leading-[22px] text-on-surface-variant mb-5 opacity-80">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (<span key={tag} className="tech-chip">{tag}</span>))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="archive" className="px-6 max-w-[1200px] mx-auto" style={{ paddingTop: 120, paddingBottom: 120 }}>
      <div className="mb-16 reveal">
        <p className="text-primary-container mb-3" style={{ fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {"> ACCESSING ARCHIVE..."}
        </p>
        <h2 className="text-headline-lg text-on-surface neon-glow-subtle" style={{ fontFamily: "var(--font-display)" }}>The Archive</h2>
        <p className="text-body-lg text-on-surface-variant mt-3 max-w-[600px]">
          Classified project files recovered from inter-dimensional operations. Each file contains evidence of unauthorized technological advancement.
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mb-12 reveal">
        {categories.map((cat) => (
          <button key={cat.value} className={`filter-tab ${filter === cat.value ? "active" : ""}`} onClick={() => setFilter(cat.value)}>{cat.label}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
        {filtered.map((project) => (<ProjectCard key={project.id} project={project} />))}
      </div>
    </section>
  );
}
