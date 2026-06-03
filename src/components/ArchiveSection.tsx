'use client';

import React from 'react';
import { motion } from 'motion/react';
import { SHOWCASE_PROJECTS } from '@/data';
import { Project } from '@/types';

interface ArchiveSectionProps {
  onProjectSelect: (project: Project) => void;
}

const CATEGORIES = [
  { label: '// ALL FILES', value: 'all' },
  { label: '// FULL-STACK', value: 'fullstack' },
  { label: '// BACKEND', value: 'backend' },
  { label: '// MOBILE', value: 'mobile' },
  { label: '// DESIGN', value: 'design' },
];

export default function ArchiveSection({ onProjectSelect }: ArchiveSectionProps) {
  const [filter, setFilter] = React.useState('all');

  const filtered = filter === 'all'
    ? SHOWCASE_PROJECTS
    : SHOWCASE_PROJECTS.filter((p) => p.category === filter);

  return (
    <section className="px-6 md:px-8 max-w-7xl mx-auto py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div>
          <span className="font-mono text-xs text-primary uppercase tracking-[0.1em] bg-primary/10 px-2 py-0.5 border border-primary/20">
            {'> ACCESSING ARCHIVE...'}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-on-background uppercase mt-3">
            The Archive
          </h2>
          <div className="w-24 h-1 bg-primary mt-2" />
          <p className="font-body text-on-surface-variant mt-3 max-w-xl text-sm">
            Classified project files recovered from inter-dimensional operations.
            Each file contains evidence of unauthorized technological advancement.
          </p>
        </div>
        <p className="font-mono text-xs text-on-surface-variant uppercase tracking-[0.1em]">
          CLASSIFIED // EXTRA-DIMENSIONAL ACTIVITY
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            className={`filter-tab cursor-pointer ${filter === cat.value ? 'active' : ''}`}
            onClick={() => setFilter(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((proj, idx) => (
          <motion.button
            key={proj.id}
            type="button"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onProjectSelect(proj)}
            className="group relative bg-surface-container-low border border-surface-container-high overflow-hidden cursor-pointer flex flex-col h-full w-full text-left p-0 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(227,24,55,0.15)] animate-none"
          >
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={proj.imgUrl}
                alt={proj.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="scanline-overlay absolute inset-0 opacity-50" />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col flex-1">
              <span className="font-mono text-[10px] text-primary border border-primary/40 px-2 py-0.5 mb-3 block w-fit uppercase tracking-wider">
                {proj.caseFileNumber}
              </span>
              <h3 className="font-display text-lg text-on-background uppercase mb-2 group-hover:text-primary transition-colors font-bold">
                {proj.name}
              </h3>
              <p className="font-body text-xs text-on-surface-variant opacity-80 leading-relaxed mb-4 flex-1">
                {proj.description}
              </p>
              <div className="flex flex-wrap gap-1.5 text-left">
                {proj.tags.map((tag) => (
                  <span key={tag} className="tech-chip text-[10px]">{tag}</span>
                ))}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
