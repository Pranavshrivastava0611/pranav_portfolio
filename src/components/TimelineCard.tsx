'use client';

import React, { useState } from 'react';
import { TimelineEntry } from '../types';
import { ShieldAlert, Cpu, Brain, Lock, Unlock, Terminal } from 'lucide-react';

interface TimelineCardProps {
  entry: TimelineEntry;
  onTagClick: (tag: string) => void;
  selectedTag: string | null;
  index: number;
}

export default function TimelineCard({ entry, onTagClick, selectedTag, index }: TimelineCardProps) {
  const [revealedRedactions, setRevealedRedactions] = useState<{ [key: string]: boolean }>({});
  const [showLog, setShowLog] = useState(false);
  const [isDecryptingLog, setIsDecryptingLog] = useState(false);

  // Parse [REDACTED_...] keywords into interactive elements
  const renderDescription = (text: string) => {
    const parts = text.split(/(\[REDACTED_[A-Z0-9_]+\])/g);
    return parts.map((part, i) => {
      if (part.startsWith('[REDACTED_') && part.endsWith(']')) {
        const cleanName = part
          .replace('[REDACTED_', '')
          .replace(']', '')
          .replace(/_/g, ' ');
        const isRevealed = revealedRedactions[part];

        return (
          <span
            key={i}
            onClick={() => {
              setRevealedRedactions((prev) => ({ ...prev, [part]: !prev[part] }));
            }}
            className={`redacted inline-block px-1.5 font-mono text-xs uppercase tracking-wide transition-all mx-1 font-bold cursor-pointer ${
              isRevealed
                ? 'revealed border border-void-red bg-void-red/20 text-void-red font-extrabold px-2'
                : 'bg-black text-black hover:bg-void-red hover:text-white border border-transparent'
            }`}
            title="CLASSIFIED DECIPHER: CLICK TO DECRYPT"
          >
            {isRevealed ? cleanName : '█ █ █ █ █'}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const handleDecryptLogClick = () => {
    if (showLog) {
      setShowLog(false);
      return;
    }
    setIsDecryptingLog(true);
    setTimeout(() => {
      setIsDecryptingLog(false);
      setShowLog(true);
    }, 1200);
  };

  // Determine icon
  const getIcon = () => {
    switch (entry.iconType) {
      case 'dangerous':
        return <ShieldAlert className="w-5 h-5 text-void-red" />;
      case 'memory':
        return <Cpu className="w-5 h-5 text-void-blue-gray" />;
      case 'psychology':
        return <Brain className="w-5 h-5 text-void-red" />;
      default:
        return <ShieldAlert className="w-5 h-5 text-void-red" />;
    }
  };

  // Border styling depending on iconType
  const getIconBorder = () => {
    switch (entry.iconType) {
      case 'dangerous':
        return 'border-void-red shadow-[0_0_15px_rgba(227,24,55,0.7)]';
      case 'memory':
        return 'border-void-blue-gray shadow-[0_0_15px_rgba(181,200,223,0.35)]';
      case 'psychology':
        return 'border-void-red shadow-[0_0_15px_rgba(227,24,55,0.5)]';
      default:
        return 'border-void-red shadow-[0_0_15px_rgba(227,24,55,0.7)]';
    }
  };

  const isEven = index % 2 === 0;

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-16 group w-full relative z-10 my-4">
      {/* On desktop, alternate left or right layout */}
      <div 
        id={`timeline-card-content-${entry.id}`}
        className={`w-full md:w-[calc(50%-2rem)] order-2 ${isEven ? 'md:order-1 md:text-right' : 'md:order-3 md:text-left'}`}
      >
        <div className="bg-void-gray-dark border border-void-gray-border p-6 md:p-8 relative overflow-hidden group-hover:border-void-red/40 transition-colors duration-500 shadow-md">
          {/* File code decoration */}
          <div className={`absolute top-2 font-mono text-[10px] tracking-widest text-[#ad8886]/30 ${isEven ? 'left-4' : 'right-4'}`}>
            {entry.fileCode}
          </div>

          <h3 className="font-mono text-xs md:text-sm text-void-red tracking-widest mb-1 mt-2 font-semibold">
            {entry.yearRange}
          </h3>
          <h2 className="font-display text-2xl md:text-3xl text-on-surface uppercase tracking-tight mb-2 font-bold">
            {entry.title}
          </h2>
          <div className="font-mono text-[11px] text-void-blue-gray mb-5 tracking-widest uppercase opacity-90">
            {entry.department}
          </div>

          <p className="font-sans text-sm md:text-base text-on-surface/85 leading-relaxed font-light mb-6 transition-all">
            {renderDescription(entry.description)}
          </p>

          {/* Interactive Tag Selectors */}
          <div className={`flex flex-wrap gap-2 mb-6 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
            {entry.tags.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  id={`tag-btn-${entry.id}-${tag}`}
                  onClick={() => onTagClick(tag)}
                  className={`px-3 py-1 text-[10px] font-mono uppercase border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'border-void-red bg-void-red/20 text-void-red font-bold'
                      : 'border-void-gray-border text-on-surface/60 hover:text-void-red hover:border-void-red/50 bg-black/10'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          {/* Collapsible Decrypter Console Log */}
          <div className="border-t border-void-gray-border/50 pt-4 mt-2">
            <button
              id={`decrypt-btn-${entry.id}`}
              onClick={handleDecryptLogClick}
              disabled={isDecryptingLog}
              className="flex items-center gap-2 text-xs font-mono tracking-wider font-semibold text-void-blue-gray hover:text-void-red transition-all cursor-pointer disabled:opacity-50"
            >
              {isDecryptingLog ? (
                <>
                  <span className="w-1.5 h-1.5 bg-void-red animate-ping rounded-full inline-block"></span>
                  <span className="animate-pulse">DECRYPTING TRANSCRIPTION CELL...</span>
                </>
              ) : showLog ? (
                <>
                  <Lock className="w-3.5 h-3.5 text-void-red" />
                  <span className="text-void-red">RE-LOCK FILE INTEL</span>
                </>
              ) : (
                <>
                  <Unlock className="w-3.5 h-3.5" />
                  <span>ACCESS DECRYPTED TRANSMISSION</span>
                </>
              )}
            </button>

            {showLog && (
              <div className="mt-3 p-3 bg-black/80 border border-void-red/20 font-mono text-[11px] leading-relaxed text-void-red/90 rounded-none screen-flicker animate-fadeIn">
                <div className="flex items-center gap-1.5 border-b border-void-red/15 pb-1 mb-2 text-[9px] uppercase tracking-widest text-[#ad8886]/50">
                  <Terminal className="w-2.5 h-2.5" />
                  <span>INTELLIGENCE READOUT STAL-4 // HIGHLY MUTATIVE</span>
                </div>
                <div className="typewriter-desc leading-relaxed text-left">
                  {entry.confidentialLog}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Central Indicator Node */}
      <div className="z-20 hidden md:flex absolute left-1/2 -translate-x-1/2 justify-center items-center">
        <div className={`w-11 h-11 rounded-full bg-void-gray-dark border-2 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 ${getIconBorder()}`}>
          {getIcon()}
        </div>
      </div>

      {/* Image Block */}
      <div 
        id={`timeline-card-image-${entry.id}`}
        className={`w-full md:w-[calc(50%-2rem)] order-1 ${isEven ? 'md:order-3' : 'md:order-1'}`}
      >
        <div className="aspect-[16/10] bg-void-gray-dark overflow-hidden border border-void-gray-border/70 relative group-hover:border-void-red/40 transition-all duration-500 shadow-lg">
          <img
            className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
            src={entry.imageUrl}
            alt={entry.imageAlt}
            referrerPolicy="no-referrer"
          />
          {/* Subtle Scanline Layer on top of images */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_60%,rgba(0,0,0,0.6))] pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
