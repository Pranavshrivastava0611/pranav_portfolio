'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Menu, X, ShieldAlert } from 'lucide-react';
import { ActiveScreen, UserBadge } from '../types';

interface HeaderProps {
  activeScreen: ActiveScreen;
  setActiveScreen: (screen: ActiveScreen) => void;
  userBadge: UserBadge | null;
}

export default function Header({ activeScreen, setActiveScreen, userBadge }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { screen: ActiveScreen; label: string }[] = [
    { screen: 'HOME', label: 'THE RIFT' },
    { screen: 'PROJECTS', label: 'PROJECTS' },
    { screen: 'TIMELINE', label: 'TIMELINE' },
    { screen: 'ARCHIVE', label: 'ARCHIVE' },
    { screen: 'CONTACT', label: 'JOIN THE PARTY' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-surface-variant shadow-[0_4px_20px_rgba(0,0,0,0.6)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="flex justify-between items-center px-6 md:px-8 max-w-7xl mx-auto h-20">
        {/* LOGO */}
        <div
          onClick={() => {
            setActiveScreen('HOME');
            setMobileMenuOpen(false);
          }}
          className="font-display-lg text-2xl md:text-3xl font-extrabold text-primary drop-shadow-[0_0_8px_rgba(255,255,255,0.35)] cursor-pointer transition-transform active:scale-95 flex items-center gap-2"
        >
          <span className="hidden sm:inline">THE VOID // PRANAV</span>
          <span className="sm:hidden">THE VOID</span>
          {userBadge && (
            <span className="text-[10px] font-label-mono tracking-widest text-[#00ff66] bg-[#00ff66]/10 px-2 py-0.5 border border-[#00ff66]/30 rounded flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-pulse"></span>
              SEC_CLR_{userBadge.clearanceLevel}
            </span>
          )}
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => {
            const isActive = activeScreen === item.screen;
            return (
              <button
                key={item.screen}
                onClick={() => setActiveScreen(item.screen)}
                className={`relative pb-1 font-label-mono text-xs uppercase tracking-widest transition-all duration-300 hover:text-primary cursor-pointer ${
                  isActive
                    ? 'text-primary font-bold'
                    : 'text-on-surface-variant'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* MOBILE MENU TRIGGER */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-primary hover:text-primary-container transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-20 left-0 right-0 bg-background/95 backdrop-blur-2xl border-b border-surface-variant p-6 flex flex-col gap-6 md:hidden z-40 shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
        >
          {navItems.map((item) => (
            <button
              key={item.screen}
              onClick={() => {
                setActiveScreen(item.screen);
                setMobileMenuOpen(false);
              }}
              className={`text-left font-label-mono text-base uppercase tracking-widest py-2 border-b border-surface-variant/20 cursor-pointer ${
                activeScreen === item.screen ? 'text-primary font-bold' : 'text-on-surface-variant'
              }`}
            >
              {item.label}
            </button>
          ))}
          {userBadge && (
            <div className="flex items-center gap-2 text-xs font-label-mono text-on-surface-variant border border-surface-variant/45 p-3 rounded bg-surface-container-low">
              <ShieldAlert size={16} className="text-primary" />
              <span>LOGGED AS: CLASSIFIED_CODENAME_{userBadge.codename.toUpperCase()}</span>
            </div>
          )}
        </motion.div>
      )}
    </header>
  );
}
