'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Envelope from '@/src/components/Envelope';
import MusicPlayer from '@/src/components/MusicPlayer';
import Hero from '@/src/components/sections/Hero';
import Countdown from '@/src/components/sections/Countdown';
import Venue from '@/src/components/sections/Venue';
import MazeSection from '@/src/components/sections/MazeSection';

type FlowState = 'envelope' | 'landing';

export default function InvitationApp() {
  const [flow, setFlow]           = useState<FlowState>('envelope');
  const [audioUnlocked, setAudio] = useState(false);

  return (
    <>
      {audioUnlocked && <MusicPlayer autoPlay />}

      <AnimatePresence mode="wait">

        {flow === 'envelope' && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <Envelope
              onOpen={() => setFlow('landing')}
              onAudioUnlock={() => setAudio(true)}
            />
          </motion.div>
        )}

        {flow === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            style={{ background: '#0a0306' }}
          >
            <Hero />
            <SectionDivider />
            <Countdown />
            <SectionDivider flip />
            <Venue />
            <SectionDivider />
            <MazeSection />
            <Footer />
          </motion.div>
        )}

      </AnimatePresence>
    </>
  );
}

/* ─── Section divider ────────────────────────────────────── */
function SectionDivider({ flip }: { flip?: boolean }) {
  return (
    <div
      className="relative h-20 overflow-hidden pointer-events-none flex items-center"
      style={{ background: flip ? '#120609' : '#0a0306' }}
    >
      <div className="w-full h-px relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C5A059]/25 to-transparent" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            >
              <svg width="12" height="15" viewBox="0 0 12 15" fill="none">
                <path d="M6 1C6 1 1 4 1 7.5C1 10.5 3.2 13 6 13C8.8 13 11 10.5 11 7.5C11 4 6 1 6 1Z"
                  fill={i === 1 ? '#800020' : '#C5A059'} opacity="0.7"/>
                <path d="M6 13L6 15" stroke="#C5A059" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Footer ─────────────────────────────────────────────── */
function Footer() {
  return (
    <footer
      className="relative py-16 px-4 text-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0306 0%, #060204 100%)' }}
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/20 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-80 h-40 rounded-full opacity-30"
          style={{ background: 'radial-gradient(ellipse, rgba(128,0,32,0.2) 0%, transparent 70%)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 space-y-4"
      >
        <div className="flex justify-center mb-4">
          <svg width="36" height="44" viewBox="0 0 36 44" fill="none">
            <path d="M18 2C18 2 4 11 4 22C4 31.9 10.3 40 18 40C25.7 40 32 31.9 32 22C32 11 18 2 18 2Z"
              fill="#800020" opacity="0.85"/>
            <path d="M6 20C6 20 1 14 5 8" stroke="#E8C5C8" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
            <path d="M30 20C30 20 35 14 31 8" stroke="#E8C5C8" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
            <path d="M18 40L18 44" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"/>
            <path d="M13 43L23 43" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>

        <p className="text-[#FDFBF7]/30 font-sans text-xs uppercase tracking-widest">
          with all our love
        </p>

        <p className="font-serif text-[clamp(1.5rem,4vw,2.5rem)] text-[#FDFBF7]">
          Ahmed & Nada
        </p>
        <p className="font-arabic text-xl text-[#C5A059]/80" dir="rtl">
          أحمد & ندى 💛
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#C5A059]/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#E8C5C8]/40" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#C5A059]/30" />
        </div>

        <p className="text-[#FDFBF7]/20 font-sans text-xs mt-4">
          16 July 2026 &nbsp;·&nbsp; Cove, Mansoura, Egypt 🌊
        </p>
      </motion.div>
    </footer>
  );
}
