'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '@/types';
import { X, ShieldAlert, Cpu, Radio, Zap } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [frequency, setFrequency] = React.useState<number>(1.5);
  const [amplitude, setAmplitude] = React.useState<number>(40);
  const [energyLevel, setEnergyLevel] = React.useState<number>(10);
  const [isInjecting, setIsInjecting] = React.useState<boolean>(false);
  const animationFrameId = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!project) return;

    let offset = 0;
    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const parent = canvas.parentElement;
      if (parent && canvas.width !== parent.clientWidth) {
        canvas.width = parent.clientWidth;
        canvas.height = 120;
      }

      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 20) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += 20) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // Center line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath(); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke();

      // Waveform
      ctx.strokeStyle = isInjecting ? '#10b981' : '#ffffff';
      ctx.lineWidth = isInjecting ? 2.5 : 1.5;
      ctx.shadowBlur = isInjecting ? 12 : 5;
      ctx.shadowColor = isInjecting ? '#10b981' : 'rgba(255, 255, 255, 0.4)';

      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const frequencyScale = (frequency * Math.PI * 2) / w;
        const noise = (Math.random() - 0.5) * (isInjecting ? energyLevel * 0.8 : energyLevel * 0.15);
        const y = h / 2 + Math.sin(x * frequencyScale + offset) * amplitude +
          Math.sin(x * frequencyScale * 2.5 + offset * 1.5) * (amplitude * 0.25) + noise;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Text diagnostics
      ctx.fillStyle = isInjecting ? '#10b981' : '#888888';
      ctx.font = '10px "Space Mono", monospace';
      ctx.fillText(`FRQ: ${frequency.toFixed(2)} Hz`, 10, 20);
      ctx.fillText(`AMP: ${amplitude.toFixed(1)} px`, 110, 20);
      ctx.fillText(`ENERGY: ${energyLevel}%`, 210, 20);
      ctx.fillText(isInjecting ? 'SIGNAL STATE: INJECTED' : 'SIGNAL STATE: IDLE', 10, h - 10);

      offset += isInjecting ? 0.25 : 0.08;
      animationFrameId.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [project, frequency, amplitude, energyLevel, isInjecting]);

  const handleEnergyOverload = () => {
    setIsInjecting(true);
    setFrequency((prev) => prev * 2.4);
    setAmplitude((prev) => prev * 1.5);
    setEnergyLevel(100);
    setTimeout(() => {
      setIsInjecting(false);
      setFrequency(1.5);
      setAmplitude(40);
      setEnergyLevel(10);
    }, 2500);
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/85 backdrop-blur-xl"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          className="relative max-w-4xl w-full bg-surface-container-low border border-primary/30 max-h-[90vh] overflow-y-auto shadow-[0_10px_50px_rgba(0,0,0,0.8)] z-10"
        >
          {/* Header Bar */}
          <div className="flex justify-between items-center bg-surface-container border-b border-surface-container-high px-6 py-4">
            <div className="flex items-center gap-3">
              <ShieldAlert className="text-primary animate-pulse" size={24} />
              <div className="font-mono text-xs uppercase tracking-[0.1em] text-on-surface-variant">
                CLASSIFIED DOSSIER // LEVEL 4 AUTHORIZED ONLY
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-primary hover:text-on-surface hover:bg-primary/10 p-1.5 transition-all active:scale-95 border border-primary/20 cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Left Column */}
            <div className="md:col-span-5 p-6 border-b md:border-b-0 md:border-r border-surface-container-high flex flex-col gap-6 bg-surface-container-lowest">
              <div className="relative aspect-video md:aspect-[3/4] overflow-hidden border border-surface-container-high">
                <img src={project.imgUrl} alt={project.name} className="w-full h-full object-cover" />
                <div className="scanline-overlay absolute inset-0 opacity-45" />
              </div>

              {/* Telemetry */}
              <div className="border border-surface-container-high/40 p-4 bg-background">
                <div className="flex items-center gap-2 mb-3 text-xs font-mono text-primary font-bold uppercase tracking-wider">
                  <div className="w-2 h-2 bg-primary animate-ping" />
                  ANALOG TELEMETRY RECORD
                </div>
                <div className="font-mono text-xs text-on-surface-variant flex flex-col gap-1.5 opacity-80 leading-relaxed">
                  <div>CASE ID: {project.caseFileNumber}</div>
                  <div>RATING: {project.metadata.threatLevel} THREAT</div>
                  <div>RECORDED DATE: {project.date}</div>
                  <div>TELEMETRY SENSOR: {project.metadata.signalTelemetryTitle}</div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="md:col-span-7 p-6 flex flex-col gap-6">
              <div>
                <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-1 inline-block mb-3 border border-primary/20 uppercase tracking-wider">
                  {project.category.toUpperCase()} INDEX
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-on-background uppercase tracking-wider">
                  {project.name}
                </h2>
                <div className="w-16 h-1 bg-primary mt-2" />
              </div>

              {/* Dossier */}
              <div>
                <h4 className="font-mono text-xs uppercase text-primary tracking-[0.1em] mb-2 flex items-center gap-1">
                  <Cpu size={14} /> THE EXPERIMENT (DOSSIER)
                </h4>
                <p className="font-body text-on-surface-variant leading-relaxed text-sm md:text-base">
                  {project.fullDossier}
                </p>
              </div>

              {/* Signal Generator */}
              <div className="border border-surface-container-high p-4 bg-surface-container-lowest flex flex-col gap-4">
                <div className="flex justify-between items-center text-xs font-mono text-primary tracking-[0.1em] uppercase">
                  <span className="flex items-center gap-1">
                    <Radio size={14} className="animate-pulse" /> SENSOR TELEMETRY INTERFACE
                  </span>
                  <span className={isInjecting ? 'text-[#00ff66]' : 'text-primary'}>
                    {isInjecting ? 'ENERGY EXCESSIVE' : 'STABLE'}
                  </span>
                </div>

                <div className="border border-primary/20 bg-background overflow-hidden relative" style={{ height: '120px' }}>
                  <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
                </div>

                {/* Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
                      Frequency Tuning
                    </label>
                    <input
                      type="range" min="0.5" max="10" step="0.1"
                      value={frequency} disabled={isInjecting}
                      onChange={(e) => setFrequency(parseFloat(e.target.value))}
                      className="accent-primary cursor-pointer w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
                      Amplitude Gain
                    </label>
                    <input
                      type="range" min="10" max="60" step="1"
                      value={amplitude} disabled={isInjecting}
                      onChange={(e) => setAmplitude(parseFloat(e.target.value))}
                      className="accent-primary cursor-pointer w-full"
                    />
                  </div>
                  <div className="flex justify-end pt-2 sm:pt-0">
                    <button
                      onClick={handleEnergyOverload}
                      disabled={isInjecting}
                      className="w-full flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-mono text-xs font-bold uppercase tracking-[0.1em] py-3 px-4 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border border-primary/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] cursor-pointer"
                    >
                      <Zap size={14} className={isInjecting ? 'animate-bounce' : ''} />
                      {isInjecting ? 'INJECTING...' : 'INJECT ENERGY'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Containment Protocol */}
              <div className="border-l-2 border-primary pl-4 bg-primary/5 py-3">
                <h4 className="font-mono text-xs uppercase text-primary tracking-[0.1em] mb-1">
                  SECURITY PROTOCOL #S-1042
                </h4>
                <p className="font-body text-on-surface-variant text-xs md:text-sm leading-relaxed italic">
                  {project.metadata.containmentProtocol}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
