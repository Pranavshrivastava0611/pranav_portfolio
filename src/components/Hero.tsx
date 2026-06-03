"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Terminal, Sparkles } from "lucide-react";

interface HeroProps {
  onEnterRift: () => void;
  onJoinParty: () => void;
  onPlayGame?: () => void;
}

export default function Hero({ onEnterRift, onJoinParty, onPlayGame }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frequency, setFrequency] = useState(47.3);

  // Animated signal frequency counter
  useEffect(() => {
    const interval = setInterval(() => {
      setFrequency(
        parseFloat((40 + Math.random() * 20).toFixed(1))
      );
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      life: number;
      maxLife: number;
    }

    const particles: Particle[] = [];
    const PARTICLE_COUNT = 85;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5 - 0.3,
        opacity: Math.random() * 0.4 + 0.1,
        life: Math.random() * 300,
        maxLife: 300 + Math.random() * 200,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Mouse influence
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = (200 - dist) / 200;
          p.speedX -= (dx / dist) * force * 0.02;
          p.speedY -= (dy / dist) * force * 0.02;
        }

        p.x += p.speedX;
        p.y += p.speedY;
        p.life++;

        // Fade in/out
        const lifeRatio = p.life / p.maxLife;
        let alpha = p.opacity;
        if (lifeRatio < 0.1) alpha *= lifeRatio / 0.1;
        if (lifeRatio > 0.9) alpha *= (1 - lifeRatio) / 0.1;

        // Reset
        if (p.life >= p.maxLife || p.x < -50 || p.x > canvas.width + 50 || p.y < -50 || p.y > canvas.height + 50) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 20;
          p.life = 0;
          p.speedX = (Math.random() - 0.5) * 0.5;
          p.speedY = (Math.random() - 0.5) * 0.5 - 0.3;
        }

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 189, 187, ${alpha})`;
        ctx.fill();

        // Tiny glow
        if (p.size > 1.5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(227, 24, 55, ${alpha * 0.15})`;
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden vignette pt-16"
    >
      {/* Stranger Things Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage: "url('/stranger_things_bg.png')",
        }}
        aria-hidden="true"
      />

      {/* Atmospheric mist - Radial red glow */}
      <div
        className="absolute inset-0 z-0 stranger-flicker-ambient"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(227,24,55,0.1) 0%, transparent 60%)",
          filter: "blur(48px)",
        }}
        aria-hidden="true"
      />


      {/* Top/bottom gradient fade */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to top, #131313 0%, transparent 35%, transparent 65%, #131313 100%)",
        }}
        aria-hidden="true"
      />

      {/* Particle canvas */}
      <canvas ref={canvasRef} id="particle-canvas" className="absolute inset-0 z-0 pointer-events-none" />

      {/* Center content */}
      <div className="relative z-10 text-center px-6 max-w-[900px] flex flex-col items-center">
        {/* Terminal label */}
        <div className="flex items-center gap-2 mb-6">
          <Terminal size={14} className="text-primary animate-pulse" />
          <span
            className="font-mono text-xs text-primary uppercase tracking-[0.15em] bg-primary/10 border border-primary/20 px-2 py-0.5 rounded"
          >
            IIIT UNA // CSE 2023-2027 // OPEN TO INTERNSHIPS
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="font-display text-4xl sm:text-6xl md:text-8xl text-primary-container neon-glow mb-6 font-black uppercase tracking-wider"
          data-text="PRANAV SHRIVASTAVA"
        >
          PRANAV SHRIVASTAVA
        </h1>

        {/* Tagline */}
        <p className="font-body text-sm sm:text-base md:text-lg text-on-surface-variant mb-8 max-w-[720px] mx-auto leading-relaxed opacity-95">
          Full-Stack AI Engineer with hands-on experience building <strong>agentic LLM systems</strong>, multi-step orchestration pipelines, and production-grade enterprise workflows.
        </p>

        {/* Social & Contact Telemetry */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 mb-8 font-mono text-[10px] text-on-surface-variant tracking-wider uppercase bg-black/25 border border-void-gray-border/40 px-6 py-2.5 rounded max-w-2xl">
          <a
            href="mailto:pranavwork9@gmail.com"
            className="hover:text-primary transition-colors flex items-center gap-1 border-b border-transparent hover:border-primary pb-0.5"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-primary font-bold">[EMAIL]</span> pranavwork9@gmail.com
          </a>
          <span className="opacity-30 hidden sm:inline">|</span>
          <a
            href="https://github.com/Pranavshrivastava0611"
            className="hover:text-primary transition-colors flex items-center gap-1 border-b border-transparent hover:border-primary pb-0.5"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-primary font-bold">[GITHUB]</span> Pranavshrivastava0611
          </a>
          <span className="opacity-30 hidden sm:inline">|</span>
          <a
            href="https://linkedin.com/in/pranav-shrivastava-293944295"
            className="hover:text-primary transition-colors flex items-center gap-1 border-b border-transparent hover:border-primary pb-0.5"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-primary font-bold">[LINKEDIN]</span> Pranav Shrivastava
          </a>
        </div>

        {/* Signal indicator */}
        <div className="flex justify-center items-center gap-3 mb-10 bg-black/40 border border-void-gray-border px-4 py-2 rounded">
          <div className="signal-indicator flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-void-red animate-ping" />
            <span className="w-1.5 h-1.5 rounded-full bg-void-red" />
          </div>
          <span
            className="font-mono text-[10px] uppercase text-on-surface-variant tracking-wider"
          >
            <span className="hidden sm:inline">MAINFRAME FREQUENCY: {frequency} MHz // CHANNEL STATUS: ACTIVE</span>
            <span className="sm:hidden">FREQ: {frequency} MHz // ACTIVE</span>
          </span>
        </div>


        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onEnterRift}
            className="group flex items-center gap-2 px-8 py-4 bg-primary-container text-on-primary-container font-mono text-xs font-bold uppercase tracking-[0.1em] transition-all active:scale-95 flicker-btn cursor-pointer"
            style={{
              boxShadow: "0 0 20px rgba(227,24,55,0.4)"
            }}
          >
            ENTER THE RIFT
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={onPlayGame}
            className="group flex items-center gap-2 px-6 py-4 border border-primary text-[#fffaf9]/90 hover:text-primary font-mono text-xs font-bold uppercase tracking-[0.1em] transition-all active:scale-95 cursor-pointer hover:shadow-[0_0_15px_rgba(227,24,55,0.35)]"
          >
            <Sparkles size={14} className="text-primary animate-pulse" />
            <span>ROLL FOR INITIATIVE (D20)</span>
          </button>
          <button
            onClick={onJoinParty}
            className="px-6 py-4 border border-on-surface-variant hover:border-primary hover:text-primary text-on-surface-variant font-mono text-xs font-bold uppercase tracking-[0.1em] transition-all active:scale-95 cursor-pointer"
          >
            SECURE BADGE
          </button>
        </div>
      </div>

      {/* Bottom vine/organic elements */}
      <div className="absolute bottom-0 left-0 right-0 h-[100px] z-[2] pointer-events-none">
        <svg
          viewBox="0 0 1440 100"
          className="absolute bottom-0 w-full opacity-20"
          preserveAspectRatio="none"
          style={{ animation: "vine-sway 8s ease-in-out infinite" }}
        >
          <path
            d="M0 100 C200 75 300 90 500 60 C700 30 800 50 1000 40 C1200 30 1300 75 1440 50 L1440 100 Z"
            fill="rgba(227,24,55,0.15)"
          />
          <path
            d="M0 100 C150 85 400 95 600 70 C800 45 900 80 1100 65 C1300 50 1400 85 1440 70 L1440 100 Z"
            fill="rgba(227,24,55,0.08)"
          />
        </svg>
      </div>
    </section>
  );
}
