'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnvelopeProps {
  onOpen: () => void;
  onAudioUnlock: () => void;
}

/* ─── Falling petals ─────────────────────────────────────── */
function FallingPetals() {
  const petals = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    left: `${(i * 3.6) % 100}%`,
    delay: i * 0.28,
    dur: 7 + (i % 6),
    size: 0.55 + (i % 4) * 0.2,
    color: ['#D4919A', '#C5A059', '#800020', '#E8C5C8'][i % 4],
    rx: (i * 27) % 360,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((p) => (
        <motion.div key={p.id} className="absolute" style={{ left: p.left, top: -30, color: p.color }}
          initial={{ y: -30, opacity: 0, rotate: p.rx, scale: p.size }}
          animate={{ y: '105vh', opacity: [0, 0.6, 0.5, 0], rotate: p.rx + 400, x: [0, 22, -14, 10, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        >
          <svg width="13" height="17" viewBox="0 0 13 17" fill="none">
            <path d="M6.5 1C6.5 1 1 5 1 9.5C1 13.1 3.5 16 6.5 16C9.5 16 12 13.1 12 9.5C12 5 6.5 1 6.5 1Z"
              fill="currentColor" opacity="0.6" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Ambient glow orbs ──────────────────────────────────── */
function GlowOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(197,160,89,0.12) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full translate-x-1/2 translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(212,145,154,0.12) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
      <motion.div className="absolute top-1/2 left-1/2 w-[800px] h-[400px] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(ellipse, rgba(128,0,32,0.07) 0%, transparent 65%)' }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
    </div>
  );
}

/* ─── Thin decorative lines ──────────────────────────────── */
function DecorLines() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Top left corner */}
      <motion.div className="absolute top-5 left-5 sm:top-8 sm:left-8"
        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}>
        <div className="w-10 sm:w-16 h-px bg-gradient-to-r from-[#800020]/40 to-transparent" />
        <div className="w-px h-10 sm:h-16 bg-gradient-to-b from-[#800020]/40 to-transparent mt-0" />
      </motion.div>
      {/* Top right corner */}
      <motion.div className="absolute top-5 right-5 sm:top-8 sm:right-8 flex flex-col items-end"
        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}>
        <div className="w-10 sm:w-16 h-px bg-gradient-to-l from-[#800020]/40 to-transparent" />
        <div className="w-px h-10 sm:h-16 bg-gradient-to-b from-[#800020]/40 to-transparent" />
      </motion.div>
      {/* Bottom left */}
      <motion.div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8 flex flex-col-reverse"
        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}>
        <div className="w-10 sm:w-16 h-px bg-gradient-to-r from-[#800020]/40 to-transparent" />
        <div className="w-px h-10 sm:h-16 bg-gradient-to-t from-[#800020]/40 to-transparent" />
      </motion.div>
      {/* Bottom right */}
      <motion.div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 flex flex-col-reverse items-end"
        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}>
        <div className="w-10 sm:w-16 h-px bg-gradient-to-l from-[#800020]/40 to-transparent" />
        <div className="w-px h-10 sm:h-16 bg-gradient-to-t from-[#800020]/40 to-transparent" />
      </motion.div>
    </div>
  );
}

/* ─── Rose ornament SVG ──────────────────────────────────── */
function RoseOrnament({ size = 48, opacity = 0.7 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 40 48" fill="none" style={{ opacity }}>
      <path d="M20 3C20 3 6 12 6 22C6 30.8 12.3 38 20 38C27.7 38 34 30.8 34 22C34 12 20 3 20 3Z"
        fill="#800020" />
      <path d="M8 20C8 20 2 14 6 8" stroke="#E8C5C8" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
      <path d="M32 20C32 20 38 14 34 8" stroke="#E8C5C8" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
      <path d="M20 38L20 46" stroke="#C5A059" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M15 44L25 44" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Line reveal animation ──────────────────────────────── */
function RevealLine({ children, delay, className }: {
  children: React.ReactNode; delay: number; className?: string;
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: '110%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────── */
export default function Envelope({ onOpen, onAudioUnlock }: EnvelopeProps) {
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleEnter = () => {
    if (leaving) return;
    onAudioUnlock();
    setLeaving(true);
    setTimeout(onOpen, 800);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          key="intro"
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{ background: 'radial-gradient(ellipse at 50% 30%, #FDF5F0 0%, #FDFAF5 45%, #F8F2EC 100%)' }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <FallingPetals />
          <GlowOrbs />
          <DecorLines />

          {/* ── Content ── */}
          <div className="relative z-10 flex flex-col items-center text-center
                          px-5 sm:px-8 max-w-2xl w-full
                          py-10 sm:py-0
                          min-h-screen sm:min-h-0 justify-center">

            {/* آية */}
            <RevealLine delay={0.2}>
              <p className="font-arabic text-xs sm:text-sm md:text-base
                            text-[#800020]/60 leading-loose tracking-wide mb-5 sm:mb-8"
                dir="rtl">
                ❝ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا ❞
              </p>
            </RevealLine>

            {/* Rose ornament */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 sm:mb-8"
            >
              <RoseOrnament size={40} />
            </motion.div>

            {/* ندعوكم */}
            <RevealLine delay={0.7}>
              <p className="font-arabic text-sm sm:text-base md:text-lg
                            text-[#6B4050]/75 tracking-wider mb-3 sm:mb-4"
                dir="rtl">
                ندعوكم لحضور حفل خطوبة
              </p>
            </RevealLine>

            {/* الأسماء */}
            <RevealLine delay={0.9}>
              <h1
                className="font-serif leading-none tracking-tight
                           text-[clamp(3rem,11vw,8rem)]
                           text-[#2B1018]"
                style={{ textShadow: '0 2px 20px rgba(197,160,89,0.2)' }}
              >
                Ahmed
              </h1>
            </RevealLine>

            <RevealLine delay={1.0}>
              <div className="flex items-center gap-3 sm:gap-4 my-1.5 sm:my-2">
                <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#C5A059]/60" />
                <motion.span
                  className="text-[#800020] text-xl sm:text-2xl"
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  ❤
                </motion.span>
                <div className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#C5A059]/60" />
              </div>
            </RevealLine>

            <RevealLine delay={1.1}>
              <h1
                className="font-serif leading-none tracking-tight
                           text-[clamp(3rem,11vw,8rem)]
                           text-[#2B1018]"
                style={{ textShadow: '0 2px 20px rgba(197,160,89,0.2)' }}
              >
                Nada
              </h1>
            </RevealLine>

            {/* الأسماء عربي */}
            <RevealLine delay={1.25}>
              <p className="font-arabic text-[clamp(1.4rem,4.5vw,3rem)]
                            text-[#9B7E3F] mt-2 sm:mt-3 leading-loose"
                dir="rtl">
                أحمد & ندى
              </p>
            </RevealLine>

            {/* مشيئة الله */}
            <RevealLine delay={1.4}>
              <p className="font-arabic text-xs sm:text-sm
                            text-[#800020]/50 mt-1.5 sm:mt-2 tracking-wide"
                dir="rtl">
                و ذلك بمشيئة الله تعالى 🤍
              </p>
            </RevealLine>

            {/* ── CTA button ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.75, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 sm:mt-12 w-full flex flex-col items-center"
            >
              <motion.button
                onClick={handleEnter}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
                className="relative group overflow-hidden rounded-full
                           w-full max-w-[260px] sm:max-w-xs
                           py-4 sm:py-5"
                style={{
                  background: 'linear-gradient(135deg, #800020 0%, #5e0018 100%)',
                  border: '1px solid rgba(197,160,89,0.5)',
                  boxShadow: '0 4px 24px rgba(128,0,32,0.25), 0 2px 8px rgba(128,0,32,0.15)',
                  minHeight: '56px',
                }}
              >
                <motion.div
                  className="absolute inset-0 -skew-x-12"
                  style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)' }}
                  initial={{ x: '-130%' }}
                  whileHover={{ x: '130%' }}
                  transition={{ duration: 0.65 }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[#C5A059]/40"
                  animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className="relative z-10 font-arabic text-base sm:text-lg md:text-xl
                                 text-[#FDFBF7] tracking-wider">
                  تشرفنا بيكم 🌹
                </span>
              </motion.button>

              {/* scroll hint */}
              <motion.div
                className="flex flex-col items-center gap-1.5 mt-6"
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <p className="text-[#800020]/30 text-[9px] sm:text-[10px] tracking-[0.4em] uppercase font-sans">
                  اضغط للدخول
                </p>
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path d="M4 7L9 12L14 7" stroke="rgba(128,0,32,0.3)" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
