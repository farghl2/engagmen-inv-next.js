'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EVENT_DETAILS } from '@/src/constants/event';

interface TimeUnit {
  value: number;
  label: string;
  labelAr: string;
}

/* ─── Single digit flip tile ─────────────────────────────── */
function DigitTile({ digit }: { digit: string }) {
  return (
    <div
      className="relative overflow-hidden flex items-center justify-center"
      style={{ width: 'clamp(1.8rem,5vw,3.5rem)', height: 'clamp(3.5rem,8vw,6.5rem)' }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={digit}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute font-serif text-[clamp(2.4rem,6vw,5rem)] font-bold text-[#FDFBF7] tabular-nums leading-none select-none"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

/* ─── Countdown card ─────────────────────────────────────── */
function CountCard({ unit, index }: { unit: TimeUnit; index: number }) {
  const digits = unit.value.toString().padStart(2, '0').split('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      {/* Glow on hover */}
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(ellipse at center, rgba(197,160,89,0.18) 0%, transparent 70%)' }}
      />

      {/* Card body */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, rgba(42,16,24,0.95) 0%, rgba(20,8,14,0.98) 100%)',
          border: '1px solid rgba(197,160,89,0.2)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(197,160,89,0.1)',
        }}
      >
        {/* Top shine */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent" />

        {/* Digit area — fixed height so AnimatePresence has room */}
        <div className="px-4 pt-5 pb-3 flex gap-0.5 items-center justify-center h-[100px] md:h-[120px]">
          {digits.map((d, i) => (
            <DigitTile key={i} digit={d} />
          ))}
        </div>

        {/* Divider */}
        <div className="mx-4 h-px bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent" />

        {/* Labels */}
        <div className="px-6 py-4 text-center">
          <p className="text-[#C5A059] text-xs uppercase tracking-widest font-sans mb-0.5">
            {unit.label}
          </p>
          <p className="text-[#E8C5C8]/60 font-arabic text-sm" dir="rtl">
            {unit.labelAr}
          </p>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{ background: 'linear-gradient(90deg, transparent, #C5A059, #E8C5C8, #C5A059, transparent)' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
        />

        {/* Corner ornaments */}
        <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#C5A059]/30" />
        <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[#C5A059]/30" />
        <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-[#C5A059]/30" />
        <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#C5A059]/30" />
      </div>
    </motion.div>
  );
}

/* ─── Decorative rose row ────────────────────────────────── */
function RoseRow() {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-[#C5A059]/40" />
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
        >
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
            <path d="M9 1C9 1 2 6 2 11C2 16 5.1 20 9 20C12.9 20 16 16 16 11C16 6 9 1 9 1Z"
              fill={i === 1 ? '#800020' : '#C5A059'} opacity="0.85" />
            <path d="M9 20L9 22" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      ))}
      <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-[#C5A059]/40" />
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([
    { value: 0, label: 'Days',    labelAr: 'يوم' },
    { value: 0, label: 'Hours',   labelAr: 'ساعة' },
    { value: 0, label: 'Minutes', labelAr: 'دقيقة' },
    { value: 0, label: 'Seconds', labelAr: 'ثانية' },
  ]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (!isClient) return;
    const tick = () => {
      const diff = EVENT_DETAILS.eventDate.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft([
          { value: 0, label: 'Days',    labelAr: 'يوم' },
          { value: 0, label: 'Hours',   labelAr: 'ساعة' },
          { value: 0, label: 'Minutes', labelAr: 'دقيقة' },
          { value: 0, label: 'Seconds', labelAr: 'ثانية' },
        ]);
        return;
      }
      setTimeLeft([
        { value: Math.floor(diff / 86400000),          label: 'Days',    labelAr: 'يوم' },
        { value: Math.floor((diff / 3600000) % 24),    label: 'Hours',   labelAr: 'ساعة' },
        { value: Math.floor((diff / 60000) % 60),      label: 'Minutes', labelAr: 'دقيقة' },
        { value: Math.floor((diff / 1000) % 60),       label: 'Seconds', labelAr: 'ثانية' },
      ]);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [isClient]);

  if (!isClient) return <section className="py-32" style={{ background: 'rgba(10,4,8,0.98)' }} />;

  return (
    <section
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #100508 0%, #0a0306 50%, #100508 100%)' }}
    >
      {/* Ambient side glows */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-32 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(128,0,32,0.15) 0%, transparent 70%)' }} />
      <div className="absolute top-1/2 -translate-y-1/2 -right-32 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(197,160,89,0.1) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <RoseRow />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-8 mb-3"
          >
            <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-[#FDFBF7]">
              Save the Date
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-arabic text-xl text-[#C5A059]/80"
            dir="rtl"
          >
            الدنيا هتتغير ١٦ يوليو — كون جزء منها 🌹
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-[#E8C5C8]/50 font-sans text-sm mt-3 tracking-wider"
          >
            {EVENT_DETAILS.eventDate.toLocaleDateString('en-US', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            })}
          </motion.p>
        </div>

        {/* Timer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-3xl mx-auto">
          {timeLeft.map((unit, i) => (
            <CountCard key={unit.label} unit={unit} index={i} />
          ))}
        </div>

        {/* Colon separators — desktop only */}
        <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 
                        justify-center pointer-events-none gap-0 max-w-3xl mx-auto"
          style={{ paddingTop: '40px' }}>
          {/* Visual separators are handled by grid gap; this is purely decorative */}
        </div>

        {/* Footer message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center mt-14"
        >
          <p className="text-[#E8C5C8]/50 font-serif text-base italic">
            Every second counts towards forever...
          </p>
          <p className="text-[#C5A059]/60 font-arabic text-sm mt-2" dir="rtl">
            كل ثانية بتقربنا من أجمل يوم 🌹
          </p>
        </motion.div>

        <div className="mt-12">
          <RoseRow />
        </div>
      </div>
    </section>
  );
}
