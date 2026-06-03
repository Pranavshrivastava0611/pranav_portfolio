'use client';

import React from 'react';
import { UserBadge } from '../types';
import { Shield, Radio, ShieldAlert, Cpu, Calendar, Trash2 } from 'lucide-react';

interface HawkinsBadgeProps {
  badge: UserBadge;
  onRevoke: () => void;
}

export default function HawkinsBadge({ badge, onRevoke }: HawkinsBadgeProps) {
  return (
    <div
      className="relative max-w-sm w-full bg-surface-container border-2 border-primary p-6 shadow-[0_0_40px_rgba(227,24,55,0.25)] flex flex-col gap-6 overflow-hidden"
      style={{ minHeight: '340px' }}
    >
      {/* Scanline & Grid Effect */}
      <div className="scanline-overlay absolute inset-0 opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-start border-b border-primary/30 pb-4 relative z-10">
        <div>
          <h3 className="font-display-lg text-lg font-black text-primary tracking-wider uppercase leading-none">
            HAWKINS LABS
          </h3>
          <span className="font-label-mono text-[9px] text-on-surface-variant tracking-widest uppercase opacity-75">
            SECURITY DIVISION
          </span>
        </div>
        <div className="bg-primary/20 border border-primary/40 px-2 py-0.5 text-primary text-[10px] font-label-mono uppercase tracking-wider rounded">
          LEVEL {badge.clearanceLevel}
        </div>
      </div>

      {/* Body Details */}
      <div className="flex gap-4 items-start relative z-10 flex-1">
        {/* Mock Photo Area */}
        <div className="w-20 h-24 border border-surface-variant bg-surface-container-lowest flex flex-col items-center justify-center relative overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(227,24,55,0.05)_50%,_rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px]" />
          <ShieldAlert size={32} className="text-primary/40 animate-pulse" />
          <span className="font-label-mono text-[8px] text-on-surface-variant opacity-60 mt-1 uppercase tracking-tighter">
            PHOTO REQ
          </span>
        </div>

        {/* Text Specs */}
        <div className="flex flex-col gap-2.5 font-label-mono text-[10px] text-on-surface-variant flex-1 min-w-0">
          <div className="truncate">
            <span className="text-primary font-bold">CODENAME:</span> <span className="text-on-background uppercase">{badge.codename}</span>
          </div>
          <div className="truncate">
            <span className="text-primary font-bold">PSYCHIC ABILITY:</span> <span className="text-on-background uppercase">{badge.specialPower}</span>
          </div>
          <div className="truncate">
            <span className="text-primary font-bold">DEPARTMENT:</span> <span className="text-on-background uppercase">{badge.assignedDepartment}</span>
          </div>
          <div className="truncate">
            <span className="text-primary font-bold">COMMS LINK:</span> <span className="text-on-background uppercase">{badge.commsAppliance}</span>
          </div>
          <div className="truncate">
            <span className="text-primary font-bold">ISSUE DATE:</span> <span className="text-on-background">{badge.joinedDate}</span>
          </div>
        </div>
      </div>

      {/* Footer & Action */}
      <div className="flex justify-between items-center border-t border-primary/30 pt-4 relative z-10 mt-auto">
        <div className="flex items-center gap-1.5 text-primary text-[9px] font-label-mono">
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
          <span>ACTIVE TELEMETRY CHANNEL</span>
        </div>
        <button
          onClick={onRevoke}
          className="flex items-center gap-1 border border-primary/40 text-primary hover:bg-primary/10 transition-all font-label-mono text-[9px] uppercase px-2.5 py-1.5 cursor-pointer rounded"
        >
          <Trash2 size={10} />
          <span>REVOKE</span>
        </button>
      </div>
    </div>
  );
}
