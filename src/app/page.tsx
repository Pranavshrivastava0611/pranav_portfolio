'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProjectModal from '@/components/ProjectModal';
import TimelineSection from '@/components/TimelineSection';
import ArchiveSection from '@/components/ArchiveSection';
import ContactSection from '@/components/ContactSection';
import { ActiveScreen, Project, UserBadge } from '@/types';
import { SHOWCASE_PROJECTS } from '@/data';
import { ArrowRight, Cpu, Layers, Trophy } from 'lucide-react';
import NetflixIntro from '@/components/NetflixIntro';
import DdBattleModal from '@/components/DdBattleModal';


export default function Home() {
  const [activeScreen, setActiveScreen] = React.useState<ActiveScreen>('HOME');
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const [isDdGameOpen, setIsDdGameOpen] = React.useState(false);
  const [showIntro, setShowIntro] = React.useState(true);


  const [userBadge, setUserBadge] = React.useState<UserBadge | null>(null);

  // Load badge from localStorage on mount (client only)
  React.useEffect(() => {
    const saved = localStorage.getItem('hawkins_auth_badge');
    if (saved) setUserBadge(JSON.parse(saved));
  }, []);

  // Ambient glitch triggers
  const [isChiming, setIsChiming] = React.useState(false);
  const [spores, setSpores] = React.useState<{ id: number; size: number; left: number; top: number; delay: number }[]>([]);

  React.useEffect(() => {
    const generatedSpores = Array.from({ length: 22 }).map((_, idx) => ({
      id: idx,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setSpores(generatedSpores);
  }, []);

  // Periodic chime pulse
  React.useEffect(() => {
    const chimeTimer = setInterval(() => {
      setIsChiming(true);
      setTimeout(() => setIsChiming(false), 3500);
    }, 14000);
    return () => clearInterval(chimeTimer);
  }, []);

  const handleRegisterBadge = (badge: UserBadge) => {
    setUserBadge(badge);
    localStorage.setItem('hawkins_auth_badge', JSON.stringify(badge));
  };

  const handleRevokeBadge = () => {
    setUserBadge(null);
    localStorage.removeItem('hawkins_auth_badge');
  };

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <NetflixIntro onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      <div className={`min-h-screen bg-background text-on-background font-body monitor-flicker cinematic-screen-flicker overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container relative ${isChiming ? 'animate-pulse' : ''}`}>

      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Glitch chime overlay */}
      <div className={`fixed inset-0 pointer-events-none z-[49] transition-opacity duration-1000 ${isChiming ? 'bg-primary/5 opacity-100' : 'bg-transparent opacity-0'}`} />

      {/* VHS static */}
      <div className={`vhs-overlay ${isChiming ? 'vhs-glitch' : ''}`}>
        <div className="vhs-static" />
      </div>

      {/* Corner veins */}
      <div className="vein-container">
        <div className="vein vein-tl" />
        <div className="vein vein-tr" />
        <div className="vein vein-bl" />
        <div className="vein vein-br" />
      </div>

      {/* Floating spores */}
      {spores.map((spore) => (
        <motion.div
          key={spore.id}
          className="spore"
          style={{ width: spore.size, height: spore.size, left: `${spore.left}%`, top: `${spore.top}%` }}
          animate={{ y: [0, -40, 0], x: [0, 15, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 10 + spore.size * 2, repeat: Infinity, delay: spore.delay, ease: 'easeInOut' }}
        />
      ))}

      <Header activeScreen={activeScreen} setActiveScreen={setActiveScreen} userBadge={userBadge} />

      <main className="pt-20 min-h-[calc(100vh-80px)] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {activeScreen === 'HOME' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1">
              {/* HERO */}
              <Hero
                onEnterRift={() => {
                  const el = document.getElementById('featured-projects');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setActiveScreen('PROJECTS');
                  }
                }}
                onJoinParty={() => setActiveScreen('CONTACT')}
                onPlayGame={() => setIsDdGameOpen(true)}
              />

              {/* Rift Divider */}
              <div className="rift-divider mx-auto w-3/4 my-10" />

              {/* ABOUT SECTION */}
              <section className="px-6 md:px-8 max-w-6xl mx-auto py-16 border-b border-surface-variant/20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  {/* Left Column: Bio */}
                  <div className="lg:col-span-7 flex flex-col gap-6">
                    <div>
                      <span className="font-mono text-xs text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 border border-primary/20 rounded">
                        DOSSIER // SUBJECT BIO
                      </span>
                      <h2 className="font-display text-3xl md:text-5xl font-black uppercase text-on-background mt-3">
                        PRANAV SHRIVASTAVA
                      </h2>
                      <div className="w-16 h-1 bg-primary mt-2"></div>
                    </div>
                    <div className="font-body text-sm text-on-surface-variant/90 leading-relaxed flex flex-col gap-4">
                      <p>
                        I&apos;m a Computer Science undergrad at <strong>IIIT Una (2023–2027)</strong>, passionate about the full spectrum of software engineering—from LLM pipelines and backend infrastructure to polished front-end experiences. I thrive at the intersection of systems thinking and rapid building.
                      </p>
                      <p>
                        Previously, I worked as a <strong>Software Engineer Trainee at FoodBot AI</strong>, where I developed MCP server integrations, event-driven microservices, LLM pipelines, and WebSocket backend systems at production scale. I also serve as the Technical Head of the Entrepreneurship &amp; Innovation Cell at IIIT Una.
                      </p>
                      <p>
                        Beyond my technical endeavors, I represented Madhya Pradesh at the division level in cricket, bringing the same strategic precision to my engineering work.
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Diagnostic Statistics */}
                  <div className="lg:col-span-5 flex flex-col gap-6">
                    <div className="border border-void-gray-border p-6 bg-surface-container-low shadow-[0_0_20px_rgba(0,0,0,0.4)] relative">
                      <div className="scanline-overlay absolute inset-0 opacity-10 pointer-events-none"></div>
                      <div className="flex items-center gap-2 border-b border-void-gray-border pb-3 mb-4">
                        <Cpu className="text-primary animate-pulse" size={16} />
                        <span className="font-mono text-xs text-primary uppercase tracking-wider font-bold">
                          SYSTEM METRICS &amp; TELEMETRY
                        </span>
                      </div>

                      <div className="flex flex-col gap-6">
                        {/* LeetCode Stat */}
                        <div className="border-l-2 border-primary pl-4">
                          <div className="flex items-center justify-between">
                            <span className="font-display text-3xl font-black text-on-background">900+</span>
                            <span className="font-mono text-[9px] text-[#00ff66] bg-[#00ff66]/10 px-1.5 py-0.5 border border-[#00ff66]/20 uppercase">
                              TOP 7% GLOBALLY
                            </span>
                          </div>
                          <p className="font-mono text-[10px] text-on-surface-variant uppercase mt-1">
                            LeetCode problems solved · Max rating 1790.
                          </p>
                        </div>

                        {/* DefiLlama Stat */}
                        <div className="border-l-2 border-primary pl-4">
                          <div className="flex items-center justify-between">
                            <span className="font-display text-3xl font-black text-on-background">185+</span>
                            <span className="font-mono text-[9px] text-[#ffcc00] bg-[#ffcc00]/10 px-1.5 py-0.5 border border-[#ffcc00]/20 uppercase">
                              IMPACTED ADAPTERS
                            </span>
                          </div>
                          <p className="font-mono text-[10px] text-on-surface-variant uppercase mt-1">
                            DefiLlama PR merged into server core.
                          </p>
                        </div>

                        {/* CGPA Stat */}
                        <div className="border-l-2 border-primary pl-4">
                          <div className="flex items-center justify-between">
                            <span className="font-display text-3xl font-black text-on-background">7.64</span>
                            <span className="font-mono text-[9px] text-primary bg-primary/10 px-1.5 py-0.5 border border-primary/20 uppercase">
                              B.TECH CSE
                            </span>
                          </div>
                          <p className="font-mono text-[10px] text-on-surface-variant uppercase mt-1">
                            Cumulative Grade Point Average at IIIT Una.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Rift Divider */}
              <div className="rift-divider mx-auto w-3/4 my-10" />


              {/* Featured Projects */}
              <section id="featured-projects" className="px-6 md:px-8 max-w-7xl mx-auto py-12">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                  <div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-primary uppercase">
                      Featured Reports
                    </h2>
                    <div className="w-24 h-1 bg-primary mt-2" />
                  </div>
                  <p className="font-mono text-xs text-on-surface-variant uppercase tracking-[0.1em]">
                    CLASSIFIED // EXTRA-DIMENSIONAL ACTIVITY
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {SHOWCASE_PROJECTS.slice(0, 3).map((proj, idx) => (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedProject(proj)}
                      key={proj.id}
                      type="button"
                      className={`group relative bg-surface-container-low border border-surface-container-high overflow-hidden cursor-pointer flex flex-col h-full w-full text-left p-0 transition-all duration-300 hover:border-primary/50 ${
                        idx === 1 ? 'md:-translate-y-6 md:shadow-[0_15px_30px_rgba(0,0,0,0.6)]' : ''
                      }`}
                    >
                      <div className="relative aspect-[3/4] overflow-hidden w-full">
                        <img src={proj.imgUrl} alt={proj.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="scanline-overlay absolute inset-0 opacity-50" />
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-6">
                        <span className="font-mono text-[10px] text-primary border border-primary/40 px-2 py-0.5 mb-3 block w-fit uppercase tracking-wider">
                          {proj.caseFileNumber}
                        </span>
                        <h3 className="font-display text-lg text-on-background uppercase mb-2 group-hover:text-primary transition-colors font-bold">
                          {proj.name}
                        </h3>
                        <p className="font-body text-xs text-on-surface-variant opacity-80 leading-relaxed">
                          {proj.description}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </section>

              {/* Rift Divider */}
              <div className="rift-divider mx-auto w-3/4 my-10" />

              {/* Recruitment CTA */}
              <section className="relative py-20 overflow-hidden bg-surface-container-lowest">
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <div className="grid grid-cols-12 h-full w-full">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="border-r border-primary" />
                    ))}
                  </div>
                </div>

                <div className="relative z-10 px-6 max-w-3xl mx-auto text-center">
                  <h2 className="font-display text-3xl md:text-5xl font-black uppercase mb-6 leading-tight">
                    Ready to enter <br /> the party?
                  </h2>
                  <p className="font-body text-sm md:text-base text-on-surface-variant mb-10 leading-relaxed">
                    We&apos;re looking for explorers, thinkers, and designers to venture into the unknown.
                    No walkie-talkies required, just raw creative ambition.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                      onClick={() => setActiveScreen('CONTACT')}
                      className="group flex items-center gap-2 px-8 py-4 bg-primary-container text-on-primary-container font-mono text-xs font-bold uppercase tracking-[0.1em] shadow-[0_4px_25px_rgba(255,255,255,0.1)] hover:shadow-[0_4px_35px_rgba(255,255,255,0.22)] transition-all flicker-btn cursor-pointer"
                    >
                      JOIN THE PARTY
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </button>
                    <button
                      onClick={() => setActiveScreen('TIMELINE')}
                      className="px-8 py-4 border border-on-surface-variant text-on-surface-variant font-mono text-xs font-bold uppercase tracking-[0.1em] hover:border-primary hover:text-primary transition-all cursor-pointer"
                    >
                      VIEW PROTOCOLS
                    </button>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeScreen === 'PROJECTS' && (
            <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1">
              <ArchiveSection onProjectSelect={setSelectedProject} />
            </motion.div>
          )}

          {activeScreen === 'TIMELINE' && (
            <motion.div key="timeline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1">
              <TimelineSection />
            </motion.div>
          )}

          {activeScreen === 'ARCHIVE' && (
            <motion.div key="archive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1">
              <ArchiveSection onProjectSelect={setSelectedProject} />
            </motion.div>
          )}

          {activeScreen === 'CONTACT' && (
            <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1">
              <ContactSection userBadge={userBadge} onRegister={handleRegisterBadge} onRevoke={handleRevokeBadge} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 bg-surface-container-lowest border-t border-primary/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-8 max-w-7xl mx-auto gap-6 text-center">
          <button
            onClick={() => { setActiveScreen('HOME'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="font-display text-primary text-2xl font-bold cursor-pointer transition-transform active:scale-95"
            style={{ filter: 'drop-shadow(0 0 8px rgba(227,24,55,0.6))' }}
          >
            THE VOID // PRANAV
          </button>

          <div className="flex flex-wrap justify-center gap-6 my-4 md:my-0">
            {(['PROJECTS', 'TIMELINE', 'ARCHIVE', 'CONTACT'] as ActiveScreen[]).map((screen) => (
              <button
                key={screen}
                onClick={() => { setActiveScreen(screen); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`font-mono text-xs uppercase tracking-[0.1em] hover:text-primary transition-all hover:scale-105 cursor-pointer ${
                  screen === 'CONTACT' ? 'text-primary font-bold' : 'text-on-surface-variant'
                }`}
              >
                {screen === 'CONTACT' ? 'JOIN THE PARTY' : screen}
              </button>
            ))}
          </div>

          <div className="font-mono text-[10px] text-on-surface-variant opacity-50 uppercase tracking-[0.1em]">
            © 2026 PRANAV SHRIVASTAVA // IIIT UNA. ALL TRANSMISSIONS SECURED.
          </div>

        </div>
      </footer>
    </div>

    {/* Project Modal */}
    {selectedProject && (
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    )}

    {/* D&D Battle Easter Egg Modal */}
    <DdBattleModal isOpen={isDdGameOpen} onClose={() => setIsDdGameOpen(false)} />
  </>
);
}
