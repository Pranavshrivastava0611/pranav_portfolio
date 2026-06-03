'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Radar, Activity } from 'lucide-react';
import { RadarTarget } from '../types';

export default function RadarScanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 280, height: 280 });
  const [selectedTarget, setSelectedTarget] = useState<RadarTarget | null>(null);
  const [scanSpeed, setScanSpeed] = useState<number>(3.5); // Degrees per frame
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMuted, setIsMuted] = useState(true);

  // Hardcode some creepy anomalies
  const [targets, setTargets] = useState<RadarTarget[]>([
    {
      id: 'target-1',
      angle: 45,
      distance: 0.65,
      size: 6,
      intensity: 0.9,
      detectedAt: '03:45:12',
      type: 'Psi Energy (Subject 11)',
      coordinates: 'SEC4-X45-Y12',
    },
    {
      id: 'target-2',
      angle: 195,
      distance: 0.8,
      size: 8,
      intensity: 0.75,
      detectedAt: '05:12:00',
      type: 'Gate Seismograph Leak',
      coordinates: 'SEC4-X99-Y72',
    },
    {
      id: 'target-3',
      angle: 310,
      distance: 0.4,
      size: 5,
      intensity: 0.5,
      detectedAt: '05:41:34',
      type: 'Vaporized Ether Transponder',
      coordinates: 'SEC4-X02-Y98',
    },
  ]);

  // Keep track of the current angle of the sweeping line
  const sweepAngleRef = useRef<number>(0);

  // ResizeObserver for canvas responsiveness
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        // Keep it circular/square
        const side = Math.max(220, Math.min(width, 360));
        setDimensions({ width: side, height: side });
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Frame Animator
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      // 1. Clear with deep space black & transparent background
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      const cx = dimensions.width / 2;
      const cy = dimensions.height / 2;
      const maxRadius = (dimensions.width / 2) - 10;

      // Draw Radar Background Circles
      ctx.strokeStyle = 'rgba(227, 24, 55, 0.15)';
      ctx.lineWidth = 1;

      // Draw concentric circles
      [0.25, 0.5, 0.75, 1.0].forEach((ratio) => {
        ctx.beginPath();
        ctx.arc(cx, cy, maxRadius * ratio, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Draw crosshairs
      ctx.beginPath();
      ctx.moveTo(cx - maxRadius, cy);
      ctx.lineTo(cx + maxRadius, cy);
      ctx.moveTo(cx, cy - maxRadius);
      ctx.lineTo(cx, cy + maxRadius);
      ctx.stroke();

      // Draw diagonal guidelines
      ctx.strokeStyle = 'rgba(227, 24, 55, 0.08)';
      ctx.beginPath();
      ctx.moveTo(cx - maxRadius * 0.7, cy - maxRadius * 0.7);
      ctx.lineTo(cx + maxRadius * 0.7, cy + maxRadius * 0.7);
      ctx.moveTo(cx - maxRadius * 0.7, cy + maxRadius * 0.7);
      ctx.lineTo(cx + maxRadius * 0.7, cy - maxRadius * 0.7);
      ctx.stroke();

      // Update Sweep Line Angle
      sweepAngleRef.current = (sweepAngleRef.current + scanSpeed) % 360;
      const sweepRad = (sweepAngleRef.current * Math.PI) / 180;

      // Draw the beautiful sweeping fade beam (a gradient arc)
      const gradSegments = 50;
      for (let i = 0; i < gradSegments; i++) {
        const segAngle = sweepAngleRef.current - i;
        const segRad = (segAngle * Math.PI) / 180;
        const opacity = (1 - i / gradSegments) * 0.35;

        ctx.strokeStyle = `rgba(227, 24, 55, ${opacity})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(segRad) * maxRadius, cy + Math.sin(segRad) * maxRadius);
        ctx.stroke();
      }

      // Draw the bright active sweep line edge
      ctx.strokeStyle = '#e31837';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(sweepRad) * maxRadius, cy + Math.sin(sweepRad) * maxRadius);
      ctx.stroke();

      // Render system targets / blips
      targets.forEach((target) => {
        const targetRad = (target.angle * Math.PI) / 185;
        const tx = cx + Math.cos(targetRad) * (maxRadius * target.distance);
        const ty = cy + Math.sin(targetRad) * (maxRadius * target.distance);

        // Compute angle delta from sweep beam to trigger intense highlights
        let angleDiff = Math.abs(sweepAngleRef.current - target.angle);
        if (angleDiff > 180) angleDiff = 360 - angleDiff;

        let blipOpacity = 0.08;
        if (angleDiff < 30) {
          blipOpacity = 0.9 - angleDiff / 35; // Bright peak
        } else {
          // Lingering decay trace
          blipOpacity = Math.max(0.1, 0.4 - angleDiff / 360);
        }

        // Draw glowing rings
        ctx.fillStyle = `rgba(227, 24, 55, ${blipOpacity})`;
        ctx.beginPath();
        ctx.arc(tx, ty, target.size * (1 + (1 - blipOpacity) * 0.5), 0, Math.PI * 2);
        ctx.fill();

        // Draw solid core
        ctx.fillStyle = `rgba(255, 179, 177, ${Math.min(1, blipOpacity + 0.2)})`;
        ctx.beginPath();
        ctx.arc(tx, ty, target.size / 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Keep animation going
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [dimensions, targets, scanSpeed]);

  const handleManualTrigger = () => {
    // Generate a fresh random spatial blip
    const newTarget: RadarTarget = {
      id: `target-${Date.now()}`,
      angle: Math.floor(Math.random() * 360),
      distance: parseFloat((0.2 + Math.random() * 0.7).toFixed(2)),
      size: Math.floor(4 + Math.random() * 6),
      intensity: parseFloat((0.5 + Math.random() * 0.5).toFixed(2)),
      detectedAt: new Date().toLocaleTimeString(),
      type: Math.random() < 0.5 ? 'Inter-dimensional Tremor' : 'Ecto Radiotransmission',
      coordinates: `SEC4-X${Math.floor(Math.random() * 99)}-Y${Math.floor(Math.random() * 99)}`,
    };

    setTargets((prev) => {
      const current = [newTarget, ...prev];
      if (current.length > 5) {
        current.pop();
      }
      return current;
    });

    setSelectedTarget(newTarget);
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Radar className="w-4 h-4 text-void-red animate-pulse" />
            <span className="font-mono text-xs text-void-red uppercase font-semibold">
              SECTOR 4 TRANSDUCER
            </span>
          </div>
          <div className="flex items-center gap-1 bg-void-red/10 border border-void-red/20 px-2 py-0.5 rounded-none">
            <span className="w-1.5 h-1.5 bg-void-red rounded-full animate-ping"></span>
            <span className="font-mono text-[9px] text-[#e31837] tracking-widest font-bold">
              SWEEP ACTIVE
            </span>
          </div>
        </div>

        {/* Sonar Circle Canvas Frame */}
        <div ref={containerRef} className="flex justify-center my-3 relative">
          <canvas
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
            className="border border-void-red/20 bg-black/40 shadow-inner max-w-full"
            style={{ width: dimensions.width, height: dimensions.height }}
            onClick={handleManualTrigger}
          />
          <div className="absolute top-2 right-2 flex flex-col font-mono text-[9px] text-on-surface/40 leading-tight">
            <span>AZIMUTH: 359°</span>
            <span>GAUSSIAN: L-V5</span>
          </div>
        </div>

        {/* Diagnostic speed tuning */}
        <div className="flex justify-between items-center border-t border-void-gray-border/50 pt-3 mt-3">
          <div className="flex gap-1.5">
            <button
              onClick={() => setScanSpeed(1.5)}
              className={`px-2 py-0.5 text-[9px] font-mono border rounded-none transition-colors cursor-pointer ${
                scanSpeed === 1.5
                  ? 'border-void-red bg-void-red/20 text-void-red'
                  : 'border-void-gray-border text-on-surface/50 hover:text-void-red'
              }`}
            >
              SLOW
            </button>
            <button
              onClick={() => setScanSpeed(3.5)}
              className={`px-2 py-0.5 text-[9px] font-mono border rounded-none transition-colors cursor-pointer ${
                scanSpeed === 3.5
                  ? 'border-void-red bg-void-red/20 text-void-red'
                  : 'border-void-gray-border text-on-surface/50 hover:text-void-red'
              }`}
            >
              NORM
            </button>
            <button
              onClick={() => setScanSpeed(6)}
              className={`px-2 py-0.5 text-[9px] font-mono border rounded-none transition-colors cursor-pointer ${
                scanSpeed === 6
                  ? 'border-void-red bg-void-red/20 text-void-red'
                  : 'border-void-gray-border text-on-surface/50 hover:text-void-red'
              }`}
            >
              CRIT
            </button>
          </div>

          <button
            onClick={handleManualTrigger}
            className="flex items-center gap-1 text-[10px] font-mono px-2 py-1 bg-void-red/10 border border-void-red/30 text-void-red hover:bg-void-red hover:text-white transition-all rounded-none cursor-pointer"
          >
            <Activity className="w-3 h-3" />
            <span>FORCE SCAN</span>
          </button>
        </div>
      </div>

      {/* Target summary HUD overlay */}
      <div className="p-3 bg-black/60 border border-void-gray-border/50 text-[11px] font-mono text-[#ad8886]/80 mt-4 leading-relaxed self-stretch text-left">
        <div className="text-[10px] mb-1 font-bold text-void-blue-gray uppercase border-b border-void-gray-border/30 pb-1">
          LIVELINK LOG OUTFLOW:
        </div>
        {selectedTarget ? (
          <div>
            <div className="flex justify-between">
              <span>ANOMALY ID:</span>
              <span className="text-void-red font-bold">{selectedTarget.coordinates}</span>
            </div>
            <div className="flex justify-between">
              <span>TYPE:</span>
              <span className="text-white truncate max-w-[150px]">{selectedTarget.type}</span>
            </div>
            <div className="flex justify-between">
              <span>UTC TIME:</span>
              <span>{selectedTarget.detectedAt}</span>
            </div>
          </div>
        ) : (
          <div className="text-on-surface/40 italic">
            Monitoring Sector 4. No high-level anomalies recorded in the last 24 cycles. Click canvas to sweep manually.
          </div>
        )}
      </div>
    </div>
  );
}
