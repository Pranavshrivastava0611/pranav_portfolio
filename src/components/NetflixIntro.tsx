'use client';

import React, { useEffect, useState, useMemo } from 'react';

interface NetflixIntroProps {
  onComplete: () => void;
}

export default function NetflixIntro({ onComplete }: NetflixIntroProps) {
  const [stage, setStage] = useState<'logo' | 'spectrum' | 'fade-out'>('logo');

  useEffect(() => {
    // Disable body scroll during intro
    document.body.style.overflow = 'hidden';

    // Stage 1: Netflix style logo zoom
    const spectrumTimer = setTimeout(() => {
      setStage('spectrum');
    }, 1800);

    // Stage 2: Spectrum of barcode lines zoom
    const fadeTimer = setTimeout(() => {
      setStage('fade-out');
    }, 3000);

    // Stage 3: Fade out and complete
    const completeTimer = setTimeout(() => {
      document.body.style.overflow = '';
      onComplete();
    }, 3600);

    return () => {
      clearTimeout(spectrumTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  // Pre-generate random parameters for the 180 spectrum lines so they don't change on re-render.
  const lines = useMemo(() => {
    const redColors = [
      'bg-[#E50914]', // Brand red
      'bg-[#E50914]',
      'bg-[#B20710]', // Symbol Dark red
      'bg-[#B20710]',
      'bg-[#8a060c]', // Very dark red
      'bg-[#e31837]', // Secondary red
    ];

    const edgeColors = [
      'bg-[#E50914]',
      'bg-[#B20710]',
      'bg-[#f43f5e]', // Highlight: Rose
      'bg-[#a855f7]', // Highlight: Purple
      'bg-[#3b82f6]', // Highlight: Blue
      'bg-[#eab308]', // Highlight: Yellow
      'bg-[#f97316]', // Highlight: Orange
    ];

    return Array.from({ length: 180 }).map((_, i) => {
      const delay = Math.random() * 0.5; // Staggered over 0.5s
      const duration = Math.random() * 0.4 + 1.1; // Staggered duration between 1.1s and 1.5s
      const left = Math.random() * 120 - 10; // from -10% to 110% to cover beyond edges
      const isCenter = left > 35 && left < 65;

      const widthPx = isCenter ? (Math.random() * 10 + 2.5) : (Math.random() * 45 + 8);
      const opacity = Math.random() * 0.4 + 0.55;
      const colorClass = isCenter
        ? redColors[Math.floor(Math.random() * redColors.length)]
        : edgeColors[Math.floor(Math.random() * edgeColors.length)];

      return {
        delay,
        duration,
        left,
        widthPx,
        opacity,
        colorClass,
      };
    });
  }, []);

  return (
    <div
      className={`fixed inset-0 bg-black z-[999999] flex items-center justify-center overflow-hidden transition-all duration-700 ${
        stage === 'fade-out' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {stage === 'logo' && (
        <div className="flex flex-col items-center justify-center animate-netflix-zoom">
          {/* Ambient soft glow container */}
          <div className="relative w-28 h-44 md:w-36 md:h-56">
            {/* Ambient Red Glow behind the N */}
            <div className="absolute inset-0 bg-[#E50914] rounded-full blur-[45px] opacity-25 pointer-events-none" />

            {/* The actual Netflix-style N logo with curved bottom */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                clipPath:
                  'polygon(0% 0%, 100% 0%, 100% 100%, 85% 95%, 70% 91.5%, 50% 90%, 30% 91.5%, 15% 95%, 0% 100%)',
              }}
            >
              {/* Left vertical bar */}
              <div className="absolute left-0 top-0 w-[24%] h-full bg-gradient-to-t from-[#8a060c] via-[#E50914] to-[#E50914] z-10 animate-draw-left" />

              {/* Middle diagonal bar */}
              <div
                className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#E50914] via-[#B20710] to-[#8a060c] z-20 animate-draw-diagonal"
                style={{
                  clipPath: 'polygon(0% 0%, 28% 0%, 100% 100%, 72% 100%)',
                  filter: 'drop-shadow(0 0 12px rgba(0, 0, 0, 0.9))',
                }}
              />

              {/* Right vertical bar */}
              <div className="absolute right-0 top-0 w-[24%] h-full bg-gradient-to-t from-[#8a060c] via-[#E50914] to-[#E50914] z-10 animate-draw-right" />
            </div>
          </div>

          {/* Spaced title below with cinematic reveal */}
          <span className="font-display text-lg md:text-xl text-[#E50914] uppercase tracking-[0.4em] font-extrabold mt-8 drop-shadow-[0_0_8px_rgba(229,9,20,0.6)] animate-title-fade-in">
            PRANAV
          </span>
        </div>
      )}

      {stage === 'spectrum' && (
        <div
          className="absolute inset-0 w-full h-full overflow-hidden bg-black animate-camera-zoom"
          style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
          {/* Vertical barcode neon lines zooming past in 3D */}
          {lines.map((line, i) => (
            <div
              key={i}
              className={`absolute top-0 bottom-0 ${line.colorClass} animate-fly-through`}
              style={{
                left: `${line.left}%`,
                width: `${line.widthPx}px`,
                opacity: line.opacity,
                animationDelay: `${line.delay}s`,
                animationDuration: `${line.duration}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
