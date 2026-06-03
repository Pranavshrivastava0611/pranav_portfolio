'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Swords, Flame, Zap, ShieldAlert, RotateCcw, Volume2, VolumeX, Terminal, Sparkles, Skull } from 'lucide-react';

interface DdBattleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CharacterClass = 'PALADIN' | 'MAGE' | 'ROGUE';

interface ActionLog {
  text: string;
  type: 'info' | 'player-hit' | 'player-miss' | 'enemy-hit' | 'system' | 'victory' | 'defeat';
  timestamp: string;
}

export default function DdBattleModal({ isOpen, onClose }: DdBattleModalProps) {
  const [playerClass, setPlayerClass] = useState<CharacterClass | null>(null);
  const [playerHp, setPlayerHp] = useState(100);
  const [playerMana, setPlayerMana] = useState(50);
  const [enemyHp, setEnemyHp] = useState(100);
  const [isRolling, setIsRolling] = useState(false);
  const [rolledValue, setRolledValue] = useState<number | null>(null);
  const [battleLogs, setBattleLogs] = useState<ActionLog[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [gameState, setGameState] = useState<'select' | 'battle' | 'won' | 'lost'>('select');
  const logsEndRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Auto-scroll battle logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [battleLogs]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Reset game state
  const resetGame = () => {
    setPlayerClass(null);
    setPlayerHp(100);
    setPlayerMana(50);
    setEnemyHp(100);
    setRolledValue(null);
    setBattleLogs([]);
    setGameState('select');
  };

  // Synthesize Retro Sounds
  const playSound = (type: 'roll' | 'hit' | 'miss' | 'growl' | 'victory' | 'defeat') => {
    if (isMuted) return;

    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      if (type === 'roll') {
        // Arpeggiated sequence of square waves
        const notes = [300, 450, 600, 750, 900];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(freq, now + idx * 0.06);
          gain.gain.setValueAtTime(0.08, now + idx * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.06 + 0.05);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.06);
          osc.stop(now + idx * 0.06 + 0.05);
        });
      } else if (type === 'hit') {
        // High-to-low pitch sweep with high volume
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.25);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(now + 0.25);
      } else if (type === 'miss') {
        // Low dull noise
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120, now);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(now + 0.2);
      } else if (type === 'growl') {
        // Low frequency pitch modulated rumble
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(80, now);
        osc.frequency.linearRampToValueAtTime(45, now + 0.35);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(now + 0.35);
      } else if (type === 'victory') {
        // Major chord fanfare
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.1, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.25);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.25);
        });
      } else if (type === 'defeat') {
        // Descending dissonant notes
        const notes = [440, 415, 392, 349, 220, 110];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);
          gain.gain.setValueAtTime(0.08, now + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.12 + 0.15);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 0.15);
        });
      }
    } catch (e) {
      console.warn('Audio Context failed to play:', e);
    }
  };

  // Start battle
  const startBattle = (selectedClass: CharacterClass) => {
    setPlayerClass(selectedClass);
    setGameState('battle');
    playSound('victory');
    const logs: ActionLog[] = [
      { text: `CHOSEN PROFILE: ${selectedClass} REGISTERED.`, type: 'system', timestamp: getTimestamp() },
      { text: 'WARNING: HIGH-ENERGY BREACH DETECTED IN SECTOR 4!', type: 'enemy-hit', timestamp: getTimestamp() },
      { text: 'A wild DEMOGORGON crawls out from the dimensional gate! Roll for initiative!', type: 'info', timestamp: getTimestamp() },
    ];
    setBattleLogs(logs);
  };

  const getTimestamp = () => {
    return new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const addLog = (text: string, type: ActionLog['type']) => {
    setBattleLogs((prev) => [...prev, { text, type, timestamp: getTimestamp() }]);
  };

  // Enemy Counter-Attack Turn
  const triggerEnemyTurn = (currentEnemyHp: number) => {
    if (currentEnemyHp <= 0) return;

    setTimeout(() => {
      playSound('growl');
      const hitRoll = Math.floor(Math.random() * 20) + 1;
      addLog(`The Demogorgon sweeps its claws! (Roll: ${hitRoll})`, 'info');

      if (hitRoll >= 10) {
        const damage = Math.floor(Math.random() * 15) + 10;
        setPlayerHp((prev) => {
          const nextHp = Math.max(0, prev - damage);
          if (nextHp <= 0) {
            playSound('defeat');
            setGameState('lost');
            setBattleLogs((l) => [...l, { text: 'CRITICAL SHIELD BREACH! OPERATOR ELIMINATED.', type: 'defeat', timestamp: getTimestamp() }]);
          }
          return nextHp;
        });
        addLog(`Direct hit! You take ${damage} psychic damage!`, 'enemy-hit');
      } else {
        addLog('The claws swipe wide! You dodged the breach wave!', 'player-miss');
      }
    }, 1000);
  };

  // Roll D20 Simulation
  const simulateRoll = (callback: (roll: number) => void) => {
    setIsRolling(true);
    playSound('roll');
    let counter = 0;
    const interval = setInterval(() => {
      setRolledValue(Math.floor(Math.random() * 20) + 1);
      counter++;
      if (counter > 10) {
        clearInterval(interval);
        const finalRoll = Math.floor(Math.random() * 20) + 1;
        setRolledValue(finalRoll);
        setIsRolling(false);
        callback(finalRoll);
      }
    }, 60);
  };

  // Player action: Sword attack
  const handlePhysicalAttack = () => {
    if (isRolling || gameState !== 'battle') return;

    addLog(`You prepare a physical strike with your retro sword...`, 'system');
    simulateRoll((roll) => {
      if (roll >= 8) {
        playSound('hit');
        const critMultiplier = roll === 20 ? 2 : 1;
        const damage = (Math.floor(Math.random() * 12) + 8) * critMultiplier;
        const finalEnemyHp = Math.max(0, enemyHp - damage);
        setEnemyHp(finalEnemyHp);

        addLog(`${roll === 20 ? 'CRITICAL DOUBLE HIT!' : 'HIT!'} You deal ${damage} damage to the Demogorgon!`, 'player-hit');

        if (finalEnemyHp <= 0) {
          playSound('victory');
          setGameState('won');
          addLog('THE DEMOGORGON DISSOLVES BACK INTO THE VOID. VICTORY!', 'victory');
        } else {
          triggerEnemyTurn(finalEnemyHp);
        }
      } else {
        playSound('miss');
        addLog(`MISSED! The blade slices thin air.`, 'player-miss');
        triggerEnemyTurn(enemyHp);
      }
    });
  };

  // Player action: Spell attack
  const handleSpellAttack = () => {
    if (isRolling || gameState !== 'battle') return;
    if (playerMana < 15) {
      addLog('INSUFFICIENT ENERGY RESERVES (Mana below 15)', 'system');
      return;
    }

    setPlayerMana((m) => Math.max(0, m - 15));
    addLog(`You channel local radiation into a FIREBALL spell! (Cost: 15 Mana)`, 'system');

    simulateRoll((roll) => {
      if (roll >= 6) {
        playSound('hit');
        const damage = Math.floor(Math.random() * 20) + 18;
        const finalEnemyHp = Math.max(0, enemyHp - damage);
        setEnemyHp(finalEnemyHp);

        addLog(`BOOM! Direct spell explosion! You deal ${damage} fire damage!`, 'player-hit');

        if (finalEnemyHp <= 0) {
          playSound('victory');
          setGameState('won');
          addLog('THE DEMOGORGON DISSOLVES BACK INTO THE VOID. VICTORY!', 'victory');
        } else {
          triggerEnemyTurn(finalEnemyHp);
        }
      } else {
        playSound('miss');
        addLog(`Fizzled! The spell discharges harmlessly.`, 'player-miss');
        triggerEnemyTurn(enemyHp);
      }
    });
  };

  // Player action: Telekinesis (Eleven)
  const handleTelekinesis = () => {
    if (isRolling || gameState !== 'battle') return;
    if (playerMana < 30) {
      addLog('INSUFFICIENT ENERGY RESERVES (Mana below 30)', 'system');
      return;
    }

    setPlayerMana((m) => Math.max(0, m - 30));
    addLog(`You close your eyes and call Eleven for telekinetic relief! (Cost: 30 Mana)`, 'system');

    simulateRoll((roll) => {
      if (roll >= 10) {
        playSound('hit');
        const damage = Math.floor(Math.random() * 15) + 35; // Massive damage
        const finalEnemyHp = Math.max(0, enemyHp - damage);
        setEnemyHp(finalEnemyHp);

        addLog(`Eleven lifts the beast and crushes its mind! Deal ${damage} psychic crush damage!`, 'player-hit');

        if (finalEnemyHp <= 0) {
          playSound('victory');
          setGameState('won');
          addLog('THE DEMOGORGON DISSOLVES BACK INTO THE VOID. VICTORY!', 'victory');
        } else {
          triggerEnemyTurn(finalEnemyHp);
        }
      } else {
        playSound('miss');
        addLog(`Eleven is out of range or weak! Only deals 8 deflection damage.`, 'player-miss');
        const finalEnemyHp = Math.max(0, enemyHp - 8);
        setEnemyHp(finalEnemyHp);
        if (finalEnemyHp <= 0) {
          playSound('victory');
          setGameState('won');
          addLog('THE DEMOGORGON DISSOLVES BACK INTO THE VOID. VICTORY!', 'victory');
        } else {
          triggerEnemyTurn(finalEnemyHp);
        }
      }
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-stretch justify-stretch overflow-hidden w-screen h-screen">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/95 backdrop-blur-md z-0"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="relative w-full h-full bg-black flex flex-col overflow-hidden z-10 border-none"
        >
          {/* Scanline Background Layer */}
          <div className="scanline-overlay absolute inset-0 opacity-20 pointer-events-none z-0" />

          {/* Header Bar */}
          <div className="flex justify-between items-center bg-surface-container border-b border-primary/20 px-6 py-4 relative z-10 shrink-0">
            <div className="flex items-center gap-2">
              <Terminal className="text-primary animate-pulse" size={16} />
              <div className="font-mono text-xs uppercase tracking-widest text-[#fffaf9]/90 font-bold">
                EASTER EGG // DUNGEONS & BREACHES V1.0
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                title={isMuted ? 'UNMUTE SOUND' : 'MUTE SOUND'}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <button
                onClick={onClose}
                className="text-primary hover:text-white hover:bg-primary/20 p-1.5 transition-all border border-primary/20 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* DYNAMIC SCENE CONTAINER */}
          <div className="p-6 flex flex-col gap-6 flex-1 min-h-0 overflow-hidden relative z-10">
            
            {/* STATE 1: SELECT CLASS */}
            {gameState === 'select' && (
              <div className="flex-1 flex flex-col justify-center items-center gap-8 py-6">
                <div>
                  <h3 className="font-display text-3xl md:text-4xl font-black text-primary uppercase tracking-wider mb-3">
                    ROLL FOR INITIATIVE OPERATIVE
                  </h3>
                  <p className="font-mono text-xs text-on-surface-variant uppercase tracking-widest max-w-lg mx-auto leading-relaxed">
                    A dimensional rift has opened in your browser memory. Choose your class profile and repel the Demogorgon.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl mt-4">
                  {/* PALADIN */}
                  <button
                    onClick={() => startBattle('PALADIN')}
                    className="group border border-void-gray-border/60 hover:border-primary bg-black/60 p-6 flex flex-col items-center gap-3 transition-all hover:shadow-[0_0_20px_rgba(227,24,55,0.2)] cursor-pointer text-center"
                  >
                    <Swords size={32} className="text-on-surface-variant group-hover:text-primary transition-colors animate-pulse" />
                    <span className="font-mono text-sm font-bold text-white group-hover:text-primary uppercase tracking-wider">PALADIN</span>
                    <span className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider leading-relaxed">
                      High HP // Sword Swing // Deflection Shield
                    </span>
                  </button>

                  {/* MAGE */}
                  <button
                    onClick={() => startBattle('MAGE')}
                    className="group border border-void-gray-border/60 hover:border-primary bg-black/60 p-6 flex flex-col items-center gap-3 transition-all hover:shadow-[0_0_20px_rgba(227,24,55,0.2)] cursor-pointer text-center"
                  >
                    <Flame size={32} className="text-on-surface-variant group-hover:text-primary transition-colors animate-pulse" />
                    <span className="font-mono text-sm font-bold text-white group-hover:text-primary uppercase tracking-wider">MAGE</span>
                    <span className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider leading-relaxed">
                      High Mana // Fireball Spells // Mind Crushes
                    </span>
                  </button>

                  {/* ROGUE */}
                  <button
                    onClick={() => startBattle('ROGUE')}
                    className="group border border-void-gray-border/60 hover:border-primary bg-black/60 p-6 flex flex-col items-center gap-3 transition-all hover:shadow-[0_0_20px_rgba(227,24,55,0.2)] cursor-pointer text-center"
                  >
                    <Zap size={32} className="text-on-surface-variant group-hover:text-primary transition-colors animate-pulse" />
                    <span className="font-mono text-sm font-bold text-white group-hover:text-primary uppercase tracking-wider">ROGUE</span>
                    <span className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider leading-relaxed">
                      High Crit Chance // Sneak Attacks // High Dodge Rate
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* STATE 2: ACTIVE BATTLE SCREEN */}
            {gameState === 'battle' && (
              <div className="flex-1 flex flex-col gap-6 min-h-0">
                
                {/* Health Grid */}
                <div className="grid grid-cols-2 gap-6 border-b border-void-gray-border/30 pb-4 shrink-0">
                  {/* Player HP */}
                  <div className="font-mono bg-surface-container-low border border-void-gray-border/40 p-4 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs uppercase font-bold text-[#fffaf9]/75">
                      <span>OPERATIVE STATUS ({playerClass})</span>
                      <span className={playerHp < 35 ? 'text-primary animate-pulse' : 'text-[#fffaf9]'}>{playerHp} HP</span>
                    </div>
                    {/* HP Bar */}
                    <div className="w-full h-2.5 bg-black border border-white/10">
                      <div className="h-full bg-primary transition-all duration-300" style={{ width: `${playerHp}%` }} />
                    </div>
                    {/* Mana Bar */}
                    <div className="flex justify-between items-center text-[10px] text-on-surface-variant/80 mt-1">
                      <span>ENERGY TELEMETRY (Mana)</span>
                      <span>{playerMana} MP</span>
                    </div>
                    <div className="w-full h-1.5 bg-black border border-white/5">
                      <div className="h-full bg-[#00ff66] transition-all duration-300" style={{ width: `${playerMana * 2}%` }} />
                    </div>
                  </div>

                  {/* Enemy HP */}
                  <div className="font-mono bg-surface-container-low border border-void-gray-border/40 p-4 flex flex-col gap-2 justify-center">
                    <div className="flex justify-between items-center text-xs uppercase font-bold text-primary">
                      <span>ENTITY STATUS (DEMOGORGON)</span>
                      <span>{enemyHp} HP</span>
                    </div>
                    {/* HP Bar */}
                    <div className="w-full h-2.5 bg-black border border-white/10">
                      <div className="h-full bg-void-red transition-all duration-300 shadow-[0_0_8px_#e31837]" style={{ width: `${enemyHp}%` }} />
                    </div>
                    <span className="text-[9px] text-primary/75 tracking-wider text-right uppercase mt-1 animate-pulse font-bold">
                      THREAT SIGNATURE: CRITICAL_BREACH
                    </span>
                  </div>
                </div>

                {/* Main Battle layout: Logs on left, Dice/Visuals on right */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 min-h-0 items-stretch">
                  
                  {/* Action Logs - 8 cols */}
                  <div className="md:col-span-8 bg-black border border-void-gray-border/60 overflow-y-auto p-4 flex flex-col gap-2 font-mono text-xs leading-relaxed h-full">
                    {battleLogs.map((log, idx) => {
                      const getColor = () => {
                        switch (log.type) {
                          case 'player-hit': return 'text-[#00ff66] font-bold';
                          case 'player-miss': return 'text-on-surface-variant';
                          case 'enemy-hit': return 'text-primary font-bold animate-pulse';
                          case 'system': return 'text-[#00ffff]/80';
                          case 'victory': return 'text-[#ffd700] font-extrabold';
                          case 'defeat': return 'text-primary font-extrabold';
                          default: return 'text-[#fffaf9]/90';
                        }
                      };
                      return (
                        <div key={idx} className="flex gap-2">
                          <span className="opacity-45 text-[10px] shrink-0 pt-0.5">[{log.timestamp}]</span>
                          <span className={getColor()}>{log.text}</span>
                        </div>
                      );
                    })}
                    <div ref={logsEndRef} />
                  </div>

                  {/* Dice visualizer - 4 cols */}
                  <div className="md:col-span-4 border border-void-gray-border/60 bg-surface-container-low flex flex-col justify-center gap-4 items-center p-6 text-center h-full">
                    <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider font-bold">
                      ROLL SENSOR (D20)
                    </span>

                    {/* SVG 3D Dice */}
                    <div className="relative w-28 h-28 my-2 shrink-0">
                      <svg
                        viewBox="0 0 100 100"
                        className={`w-full h-full text-primary filter drop-shadow-[0_0_12px_rgba(227,24,55,0.85)] transition-transform duration-300 ${
                          isRolling ? 'animate-spin' : ''
                        }`}
                      >
                        <polygon
                          points="50,5 90,30 90,70 50,95 10,70 10,30"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        />
                        <polygon points="50,5 50,95" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                        <polygon points="10,30 90,30" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        <polygon points="10,70 90,70" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        <polygon points="50,5 10,70 90,70 50,5" fill="none" stroke="currentColor" strokeWidth="2" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center font-display text-2xl font-black text-white">
                        {rolledValue !== null ? rolledValue : '?'}
                      </div>
                    </div>

                    <span className="font-mono text-[10px] text-primary uppercase animate-pulse font-bold">
                      {isRolling ? 'TUNING SIGNAL...' : rolledValue !== null ? `ROLLED: ${rolledValue}` : 'WAITING FOR ROLL'}
                    </span>
                  </div>
                </div>

                {/* Player Controls */}
                <div className="grid grid-cols-3 gap-4 pt-2 pb-4 shrink-0">
                  <button
                    onClick={handlePhysicalAttack}
                    disabled={isRolling}
                    className="flex flex-col items-center justify-center gap-1.5 border border-primary/40 hover:bg-primary/10 text-white font-mono text-[11px] py-3.5 uppercase tracking-wider cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    <Swords size={16} className="text-primary" />
                    <span>PHYSICAL SLASH</span>
                  </button>

                  <button
                    onClick={handleSpellAttack}
                    disabled={isRolling || playerMana < 15}
                    className="flex flex-col items-center justify-center gap-1.5 border border-primary/40 hover:bg-primary/10 text-white font-mono text-[11px] py-3.5 uppercase tracking-wider cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    <Flame size={16} className="text-primary" />
                    <span>CAST FIREBALL (15 MP)</span>
                  </button>

                  <button
                    onClick={handleTelekinesis}
                    disabled={isRolling || playerMana < 30}
                    className="flex flex-col items-center justify-center gap-1.5 border border-primary/40 hover:bg-primary/10 text-white font-mono text-[11px] py-3.5 uppercase tracking-wider cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    <Zap size={16} className="text-primary" />
                    <span>TELEKINESIS (30 MP)</span>
                  </button>
                </div>
              </div>
            )}

            {/* STATE 3: WON THE BATTLE */}
            {gameState === 'won' && (
              <div className="flex-1 flex flex-col justify-center items-center gap-6 text-center py-6">
                <div className="w-20 h-20 rounded-full bg-[#00ff66]/10 border border-[#00ff66]/40 flex items-center justify-center animate-bounce">
                  <Sparkles className="text-[#00ff66] w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-display text-3xl font-black text-[#00ff66] uppercase tracking-wider mb-3">
                    INITIATIVE SUCCESSFUL!
                  </h3>
                  <p className="font-mono text-xs text-on-surface-variant uppercase tracking-widest max-w-lg mx-auto leading-relaxed">
                    You have forced the shadow creature back into the rift. Hawkins Laboratories acknowledges your tactical excellence. Security clearance has been restored.
                  </p>
                </div>

                <div className="flex gap-4 mt-2">
                  <button
                    onClick={resetGame}
                    className="flex items-center gap-2 border border-[#00ff66]/40 hover:bg-[#00ff66]/10 text-white font-mono text-xs uppercase tracking-wider px-8 py-3.5 cursor-pointer active:scale-95"
                  >
                    <RotateCcw size={14} className="text-[#00ff66]" />
                    <span>PLAY AGAIN</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="border border-void-gray-border/60 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider px-8 py-3.5 cursor-pointer active:scale-95"
                  >
                    CLOSE TELEMETRY
                  </button>
                </div>
              </div>
            )}

            {/* STATE 4: LOST THE BATTLE */}
            {gameState === 'lost' && (
              <div className="flex-1 flex flex-col justify-center items-center gap-6 text-center py-6">
                <div className="w-20 h-20 rounded-full bg-void-red/10 border border-void-red/40 flex items-center justify-center animate-pulse">
                  <Skull className="text-void-red w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-display text-3xl font-black text-void-red uppercase tracking-wider mb-3">
                    OPERATOR LOST IN TRANSIT
                  </h3>
                  <p className="font-mono text-xs text-on-surface-variant uppercase tracking-widest max-w-lg mx-auto leading-relaxed">
                    Your clearance shield fractured. The anomaly swept you into the Upside Down. Recompile bio-logs and try again.
                  </p>
                </div>

                <div className="flex gap-4 mt-2">
                  <button
                    onClick={resetGame}
                    className="flex items-center gap-2 border border-primary/40 hover:bg-primary/10 text-white font-mono text-xs uppercase tracking-wider px-8 py-3.5 cursor-pointer active:scale-95"
                  >
                    <RotateCcw size={14} className="text-primary" />
                    <span>TRY AGAIN</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="border border-void-gray-border/60 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider px-8 py-3.5 cursor-pointer active:scale-95"
                  >
                    CLOSE TELEMETRY
                  </button>
                </div>
              </div>
            )}
            
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
