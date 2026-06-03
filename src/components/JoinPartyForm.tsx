'use client';

import React, { useState } from 'react';
import { SecurityPass } from '../types';
import { RefreshCw, ArrowBigDownDash, Award } from 'lucide-react';

interface JoinPartyFormProps {
  onRegisterPass?: (pass: SecurityPass) => void;
}

export default function JoinPartyForm({ onRegisterPass }: JoinPartyFormProps) {
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('SIGNAL DECRYPTION');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusLog, setStatusLog] = useState('');
  const [securityPass, setSecurityPass] = useState<SecurityPass | null>(null);

  const specializations = [
    'SIGNAL DECRYPTION',
    'INTER-DIMENSIONAL UX',
    'ANALOG HARDWARE MODDING',
    'TELEPATHIC SIGNAL PROCESSING',
    'CLASSIFIED EXPEDITION SCOUT'
  ];

  const handleRequestClearance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsProcessing(true);
    setStatusLog('INITIATING MAINFRAME VALIDATION...');

    // Simulate retro terminal connection logs
    const steps = [
      { delay: 400, text: 'SECURE LINK: ESTABLISHED (GATE-S4)' },
      { delay: 800, text: 'COMPILING BIOMETRICAL AND SPATIAL LOGS...' },
      { delay: 1200, text: 'AUTHORIZING LEVEL 5 CLASS SYNERGY...' },
      { delay: 1600, text: 'CREDENTIAL GRANTED. EMITTING SECURITY BLOCK...' }
    ];

    steps.forEach((step) => {
      setTimeout(() => {
        setStatusLog(step.text);
      }, step.delay);
    });

    setTimeout(() => {
      const generatedCodeword = 'OVERRIDE_' + Math.random().toString(36).substring(2, 7).toUpperCase();
      const generatedBarcode = '|||' + Math.floor(Math.random() * 90000 + 10000) + '||' + Math.floor(Math.random() * 900 + 100) + '|||';
      
      const newPass: SecurityPass = {
        name: name.toUpperCase(),
        specialization,
        clearanceLevel: 'LEVEL 5 clearance',
        issuedAt: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        barcode: generatedBarcode,
        codeWord: generatedCodeword,
        avatarSeed: Math.floor(Math.random() * 10)
      };

      setSecurityPass(newPass);
      setIsProcessing(false);

      if (onRegisterPass) {
        onRegisterPass(newPass);
      }
    }, 2000);
  };

  const handleReset = () => {
    setSecurityPass(null);
    setName('');
    setStatusLog('');
  };

  return (
    <div className="h-full flex flex-col justify-between">
      {!isProcessing && !securityPass ? (
        <form onSubmit={handleRequestClearance} className="flex flex-col h-full justify-between">
          <div>
            <h5 className="font-display text-[#fffaf9] text-lg uppercase tracking-wide mb-3 flex items-center gap-1.5 justify-center font-bold">
              <Award className="w-4 h-4 text-white animate-bounce" />
              JOIN THE PARTY
            </h5>
            <p className="font-mono text-[10px] text-[#fffaf9]/75 uppercase tracking-widest text-center mb-6">
              Request Hawkins Authorization Pass
            </p>

            <div className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block font-mono text-[9px] text-[#fffaf9]/70 uppercase tracking-widest mb-1.5 text-left">
                  OPERATOR IDENT_NAME
                </label>
                <input
                  type="text"
                  required
                  id="operator-name-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.G. DUSTIN HENDERSON"
                  className="w-full bg-black/50 border border-white/20 px-3 py-2 text-xs font-mono text-white placeholder-white/35 focus:ring-1 focus:ring-white focus:border-white rounded-none outline-none transition-all uppercase"
                  maxLength={25}
                />
              </div>

              {/* Specialization Selection */}
              <div>
                <label className="block font-mono text-[9px] text-[#fffaf9]/70 uppercase tracking-widest mb-1.5 text-left">
                  CORE ASSIGNED ROLE
                </label>
                <select
                  id="operator-specialization"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full bg-black/70 border border-white/20 px-3 py-2 text-xs font-mono text-white focus:ring-1 focus:ring-white focus:border-white rounded-none outline-none cursor-pointer transition-all appearance-none"
                >
                  {specializations.map((spec) => (
                    <option key={spec} value={spec} className="bg-black text-white">
                      {spec}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              id="clearance-submit-btn"
              className="w-full py-2.5 bg-white text-void-red hover:bg-[#fffaf9]/90 font-mono text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95 border-none"
            >
              <span>REQUEST ACCESS NOW</span>
              <ArrowBigDownDash className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      ) : isProcessing ? (
        /* Processing Screen */
        <div id="badge-loader" className="flex flex-col items-center justify-center h-full my-auto text-center py-8">
          <RefreshCw className="w-8 h-8 text-white animate-spin mb-4" />
          <div className="font-mono text-xs text-white/95 animate-pulse tracking-widest uppercase">
            {statusLog}
          </div>
          <div className="font-mono text-[10px] text-white/40 mt-1.5">
            HAWKINS MAINFRAME ENCRYPTION V4.2
          </div>
        </div>
      ) : (
        /* Security Badge Generated Screen */
        <div id="security-badge-card" className="flex flex-col h-full justify-between animate-fadeIn">
          <div className="border border-white bg-black p-4 relative overflow-hidden screen-flicker">
            {/* Stamp badge background logo */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 border border-white/10 rounded-full flex items-center justify-center transform rotate-12 select-none pointer-events-none">
              <span className="font-mono text-[6px] text-white/5 font-extrabold text-center uppercase tracking-tighter leading-none">
                HAWKINS SPECIALIZED LAB DIVISION LEVEL 5 COMPLIANT
              </span>
            </div>

            {/* Top Pass Title */}
            <div className="flex justify-between items-center border-b border-white/30 pb-2 mb-3">
              <div className="text-[8px] font-mono uppercase tracking-wider text-white">
                Hawkins Security Pass
              </div>
              <div className="text-[10px] font-mono font-bold text-void-red uppercase px-1.5 bg-white tracking-widest">
                CLASS-5
              </div>
            </div>

            {/* Body contents */}
            <div className="grid grid-cols-4 gap-3">
              {/* Procedural Icon Avatar */}
              <div className="col-span-1 border border-white/30 p-1 bg-void-gray-dark flex items-center justify-center aspect-square self-start">
                <div className="grid grid-cols-5 gap-[1px] w-full h-full">
                  {Array.from({ length: 25 }).map((_, idx) => {
                    // Simple deterministic noise drawing based on name/seed
                    const nameSum = securityPass!.name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
                    const isFilled = (idx + nameSum + securityPass!.avatarSeed) % 3 === 0 || (idx % 4 === 0);
                    return (
                      <div
                        key={idx}
                        className={`w-full h-full ${
                          isFilled ? 'bg-void-red shadow-[0_0_4px_#e31837]' : 'bg-transparent'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Citizen Information */}
              <div className="col-span-3 text-left font-mono">
                <div className="text-[8px] text-white/60 tracking-wider">NAME</div>
                <div className="text-xs font-bold text-white tracking-wide truncate uppercase mb-1">
                  {securityPass!.name}
                </div>

                <div className="text-[8px] text-white/60 tracking-wider">SPECIALIZATION</div>
                <div className="text-[9px] text-white font-medium truncate uppercase mb-1">
                  {securityPass!.specialization}
                </div>

                <div className="flex gap-4">
                  <div>
                    <div className="text-[8px] text-white/60 tracking-wider">CLEARANCE</div>
                    <div className="text-[8px] text-void-red font-bold uppercase tracking-widest animate-pulse">
                      LEVEL 5 APPROVED
                    </div>
                  </div>
                  <div>
                    <div className="text-[8px] text-white/60 tracking-wider">ISSUE DATE</div>
                    <div className="text-[8px] text-white font-light">
                      {securityPass!.issuedAt}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Barcode representation */}
            <div className="mt-4 pt-2 border-t border-white/10 flex flex-col items-center">
              <div className="text-white/80 font-mono tracking-widest text-[9px] h-3 select-none">
                {securityPass!.barcode}
              </div>
              <div className="text-[7px] font-mono text-white/30 tracking-widest mt-0.5 uppercase">
                CODE_CELL_KEY // {securityPass!.codeWord}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleReset}
              className="w-full py-1.5 bg-transparent border border-white text-white hover:bg-white hover:text-black font-mono text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>RE-GENERATE PASS</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
