'use client';

import React, { useState } from 'react';
import { TIMELINE_ENTRIES } from '../data';
import TimelineCard from './TimelineCard';

export default function TimelineSection() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleTagClick = (tag: string) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  };

  const filteredEntries = selectedTag
    ? TIMELINE_ENTRIES.filter((entry) => entry.tags.includes(selectedTag))
    : TIMELINE_ENTRIES;

  // Extract all unique tags
  const allTags = Array.from(
    new Set(TIMELINE_ENTRIES.flatMap((entry) => entry.tags))
  );

  return (
    <section className="px-6 md:px-8 max-w-6xl mx-auto py-12">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <span className="font-label-mono text-xs text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 border border-primary/20 rounded">
            COGNITIVE SEQUENCE // SECURE TELEMETRY
          </span>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background uppercase mt-2 font-black">
            Chronological History
          </h2>
          <div className="w-24 h-1 bg-primary mt-2"></div>
        </div>
        <p className="font-label-mono text-xs text-on-surface-variant uppercase tracking-tighter text-left md:text-right max-w-sm">
          A trace of energetic ruptures and analog software development since 1980.
        </p>
      </div>

      {/* TAG FILTER BAR */}
      <div className="mb-12 bg-surface-container-low border border-surface-variant p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <span className="font-mono text-xs text-void-blue-gray uppercase tracking-wider">
          FILTER CHRONICLES BY TELEMETRY TAG:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1 text-[10px] font-mono uppercase border transition-all duration-300 cursor-pointer ${
              selectedTag === null
                ? 'border-void-red bg-void-red/20 text-void-red font-bold'
                : 'border-void-gray-border text-on-surface/65 hover:border-void-red/40 bg-black/10'
            }`}
          >
            SHOW ALL RECORDS
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1 text-[10px] font-mono uppercase border transition-all duration-300 cursor-pointer ${
                selectedTag === tag
                  ? 'border-void-red bg-void-red/20 text-void-red font-bold'
                  : 'border-void-gray-border text-on-surface/65 hover:border-void-red/40 bg-black/10'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* TIMELINE STREAM */}
      <div className="relative flex flex-col gap-16 md:gap-24">
        {/* Central timeline track line on desktop */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-void-gray-border/30 hidden md:block" />

        {filteredEntries.map((entry, idx) => (
          <TimelineCard
            key={entry.id}
            entry={entry}
            onTagClick={handleTagClick}
            selectedTag={selectedTag}
            index={idx}
          />
        ))}

        {filteredEntries.length === 0 && (
          <div className="text-center py-20 border border-dashed border-void-gray-border text-on-surface-variant/60 font-mono text-sm">
            NO CLASSIFIED LOGS FOUND MATCHING SELECTED SEARCH PROFILE.
          </div>
        )}
      </div>
    </section>
  );
}
