'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EVENT_DETAILS } from '@/src/constants/event';

/* ─── Floating rose SVG ─────────────────────────────────── */
function FloatingRose({
  x, y, size, delay, duration, color,
}: {
  x: string; y: string; size: number; delay: number; duration: number; color: string;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0, rotate: -30 }}
      animate={{ opacity: [0, 0.85, 0.6, 0], scale: [0, size, size * 0.9, 0], rotate: ['-30deg', '15deg', '-10deg', '20deg'] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="36" height="44" viewBox="0 0 36 44" fill="none">
        <path d="M18 2C18 2 4 11 4 22C4 31.9 10.3 40 18 40C25.7 40 32 31.9 32 22C32 11 18 2 18 2Z" fill={color} opacity="0.8"/>
        <path d="M8 20C8 20 2 14 6 8" stroke="#F9E4E7" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
        <path d="M28 20C28 20 34 14 30 8" stroke="#F9E4E7" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
        <path d="M18 40L18 44" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M13 43L23 43" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </motion.div>
  );
}

/* ─── Falling petal ─────────────────────────────────────── */
function Petal({ left, delay, duration, color, size }: {
  left: string; delay: number; duration: number; color: string; size: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left, top: '-30px', color }}
      initial={{ y: -30, opacity: 0, rotate: 0, x: 0 }}
      animate={{
        y: 900,
        opacity: [0, 0.8, 0.7, 0],
        rotate: [0, 180, 360],
        x: [0, 25, -15, 30, -10, 0],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    >
      <svg width={size * 14} height={size * 18} viewBox="0 0 14 18" fill="none">
        <path d="M7 1C7 1 1 5 1 10C1 14 3.7 17 7 17C10.3 17 13 14 13 10C13 5 7 1 7 1Z" fill="currentColor" opacity="0.7"/>
      </svg>
    </motion.div>
  );
}

/* ─── Word-by-word reveal ────────────────────────────────── */
function AnimatedWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.75,
              delay: delay + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const roses = [
    { x: '5%', y: '15%', size: 1, delay: 0, duration: 8, color: '#800020' },
    { x: '88%', y: '10%', size: 0.8, delay: 1.5, duration: 10, color: '#C5A059' },
    { x: '15%', y: '65%', size: 1.1, delay: 3, duration: 9, color: '#E8C5C8' },
    { x: '80%', y: '55%', size: 0.9, delay: 0.8, duration: 11, color: '#800020' },
    { x: '50%', y: '5%', size: 0.7, delay: 2.2, duration: 7, color: '#C5A059' },
    { x: '93%', y: '78%', size: 1.2, delay: 4, duration: 12, color: '#E8C5C8' },
    { x: '3%', y: '85%', size: 0.85, delay: 1, duration: 9, color: '#800020' },
  ];

  const petals = Array.from({ length: 18 }, (_, i) => ({
    left: `${(i * 5.5 + Math.random() * 5) % 100}%`,
    delay: i * 0.55,
    duration: 6 + (i % 4),
    color: i % 3 === 0 ? '#E8C5C8' : i % 3 === 1 ? '#C5A059' : '#D4919A',
    size: 0.7 + (i % 3) * 0.2,
  }));

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 30%, #1e0812 0%, #100508 55%, #07020A 100%)' }}
    >
      {/* Parallax background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        {/* Centre glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(128,0,32,0.22) 0%, transparent 70%)' }} />
        {/* Gold haze */}
        <div className="absolute bottom-0 left-0 right-0 h-64"
          style={{ background: 'linear-gradient(0deg, rgba(197,160,89,0.07) 0%, transparent 100%)' }} />
      </motion.div>

      {/* Falling petals */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {petals.map((p, i) => <Petal key={i} {...p} />)}
        </div>
      )}

      {/* Floating roses */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {roses.map((r, i) => <FloatingRose key={i} {...r} />)}
        </div>
      )}

      {/* Decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[500, 720, 960].map((size, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size, height: size,
              border: '1px solid rgba(197,160,89,0.08)',
            }}
            animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        style={{ y: textY, opacity }}
      >
        {/* Top ornament */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-10"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C5A059]/60" />
          <svg width="28" height="34" viewBox="0 0 28 34" fill="none">
            <path d="M14 1C14 1 3 8 3 16C3 23.2 8 30 14 30C20 30 25 23.2 25 16C25 8 14 1 14 1Z" fill="#800020" opacity="0.9"/>
            <path d="M14 30L14 34" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M10 33L18 33" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C5A059]/60" />
        </motion.div>

        {/* آية قرآنية */}
        <div className="overflow-hidden mb-5">
          <motion.p
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-arabic text-sm md:text-base text-[#C5A059]/75 leading-loose tracking-wide"
            dir="rtl"
          >
            ❝ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا ❞
          </motion.p>
          <motion.p
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#C5A059]/40 text-xs font-arabic mt-1"
            dir="rtl"
          >
            سورة الروم — آية ٢١
          </motion.p>
        </div>

        {/* فاصل */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-px w-14 bg-gradient-to-r from-transparent to-[#C5A059]/40" />
          <div className="w-1 h-1 rounded-full bg-[#E8C5C8]/50" />
          <div className="h-px w-14 bg-gradient-to-l from-transparent to-[#C5A059]/40" />
        </motion.div>

        {/* الأسماء - إنجليزي */}
        <div className="overflow-hidden mb-3">
          <AnimatedWords
            text={`${EVENT_DETAILS.groomName} & ${EVENT_DETAILS.brideName}`}
            delay={0.45}
            className="font-serif text-[clamp(3.5rem,10vw,8rem)] text-[#FDFBF7] leading-none tracking-tight"
          />
        </div>

        {/* الأسماء - عربي */}
        <div className="overflow-hidden mb-8" dir="rtl">
          <motion.h2
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.85, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="font-arabic text-[clamp(2.5rem,7vw,6rem)] text-[#C5A059] leading-relaxed"
          >
            {EVENT_DETAILS.groomNameArabic}
            <span className="mx-4 text-[#E8C5C8]">❤</span>
            {EVENT_DETAILS.brideNameArabic}
          </motion.h2>
        </div>

        {/* و ذلك بمشيئة الله */}
        <div className="overflow-hidden mb-8">
          <motion.p
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-arabic text-base md:text-lg text-[#E8C5C8]/55 tracking-wider"
            dir="rtl"
          >
            و ذلك بمشيئة الله تعالى 🤍
          </motion.p>
        </div>

        {/* الدعوة */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="space-y-3"
        >
          {/* بوردر فاصل */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#C5A059]/30" />
            <svg width="18" height="22" viewBox="0 0 18 22" fill="none" className="opacity-60">
              <path d="M9 1C9 1 2 6 2 11C2 16 5.1 20 9 20C12.9 20 16 16 16 11C16 6 9 1 9 1Z" fill="#C5A059"/>
              <path d="M9 20L9 22" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#C5A059]/30" />
          </div>

          <p className="font-arabic text-lg md:text-xl text-[#E8C5C8]/80 leading-loose" dir="rtl">
            ندعوكم لحضور حفل خطوبة أحمد وندى
          </p>
          <p className="font-arabic text-sm md:text-base text-[#E8C5C8]/50 leading-relaxed" dir="rtl">
            يشرفنا وجودكم معنا في هذه الليلة الجميلة 🌹
          </p>
        </motion.div>

        {/* Bottom ornament with scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-16 flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-[#C5A059]/50" />
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#C5A059]/50" />
              ))}
            </div>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-[#C5A059]/50" />
          </div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1 mt-4"
          >
            <p className="text-[#C5A059]/40 text-xs tracking-widest uppercase">اسكرول</p>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 8L10 13L15 8" stroke="rgba(197,160,89,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
