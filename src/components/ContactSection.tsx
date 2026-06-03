'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, UserCheck } from 'lucide-react';
import { UserBadge, SecurityPass } from '../types';
import HawkinsBadge from './HawkinsBadge';
import JoinPartyForm from './JoinPartyForm';
import RadarScanner from './RadarScanner';

interface ContactSectionProps {
  userBadge: UserBadge | null;
  onRegister: (badge: UserBadge) => void;
  onRevoke: () => void;
}

export default function ContactSection({ userBadge, onRegister, onRevoke }: ContactSectionProps) {
  const handleRegisterPass = (pass: SecurityPass) => {
    const badge: UserBadge = {
      codename: pass.name,
      specialPower: pass.specialization,
      clearanceLevel: 5,
      assignedDepartment: 'HAWKINS SPECIALIZED LAB DIVISION',
      commsAppliance: 'SECURE TELEMETRY CHANNEL',
      joinedDate: pass.issuedAt,
    };
    onRegister(badge);
  };

  return (
    <section className="px-6 md:px-8 max-w-6xl mx-auto py-12">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 border-b border-surface-variant/30 pb-8">
        <div>
          <span className="font-label-mono text-xs text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 border border-primary/20 rounded">
            CENTRAL SECURITY INTERFACE
          </span>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background uppercase mt-2 font-black">
            Join the Party
          </h2>
          <div className="w-24 h-1 bg-primary mt-2"></div>
        </div>
        <p className="font-label-mono text-xs text-on-surface-variant uppercase tracking-tighter text-left md:text-right max-w-sm">
          Register with Hawkins Laboratories for level 5 clearance and assign your psychic specialty.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: RADAR SCANNER - 5 cols */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-surface-container-low border border-surface-variant p-6 flex flex-col gap-4">
            <span className="font-label-mono text-xs text-primary uppercase tracking-widest flex items-center gap-1.5 font-bold">
              <ShieldAlert className="animate-pulse" size={16} /> ANOMALOUS RADAR SWEEP
            </span>
            <RadarScanner />
          </div>
        </div>

        {/* RIGHT COLUMN: DYNAMIC ACCESS BADGING - 7 cols */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {userBadge ? (
              /* ALREADY LOGGED IN: RENDERS BADGE CARD W/ GLOW INDICATOR */
              <motion.div
                key="badge-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col gap-6 items-center"
              >
                <div className="text-center font-label-mono text-xs text-[#00ff66] bg-[#00ff66]/10 px-4 py-3 border border-[#00ff66]/30 w-full flex items-center justify-center gap-2">
                  <UserCheck size={16} />
                  <span>AUTHORIZATION VERIFIED: USER ACCESS APPROVED</span>
                </div>

                <HawkinsBadge badge={userBadge} onRevoke={onRevoke} />
              </motion.div>
            ) : (
              /* JOIN THE PARTY FORM W/ RETRO LOGS */
              <motion.div
                key="form-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-surface-container-low border border-surface-variant p-6 flex flex-col gap-6 shadow-[0_0_30px_rgba(0,0,0,0.6)] relative"
              >
                <JoinPartyForm onRegisterPass={handleRegisterPass} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
