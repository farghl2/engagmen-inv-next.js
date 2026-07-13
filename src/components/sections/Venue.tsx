'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EVENT_DETAILS } from '@/src/constants/event';

/* ─── Animated rose divider ─────────────────────────────── */
function RoseDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-10">
      <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-[#C5A059]/40" />
      <motion.div
        animate={{ rotate: [-8, 8, -8], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
          <path d="M11 2C11 2 2 8 2 15C2 21 5.9 26 11 26C16.1 26 20 21 20 15C20 8 11 2 11 2Z"
            fill="#800020" opacity="0.9" />
          <path d="M5 14C5 14 1 10 3 6" stroke="#E8C5C8" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
          <path d="M17 14C17 14 21 10 19 6" stroke="#E8C5C8" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
          <path d="M11 26L11 28" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.div>
      <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-[#C5A059]/40" />
    </div>
  );
}

/* ─── Detail pill ────────────────────────────────────────── */
function DetailPill({ icon, label, value, valueAr }: {
  icon: React.ReactNode; label: string; value: string; valueAr: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-4 group"
    >
      <div
        className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center mt-0.5"
        style={{
          background: 'rgba(197,160,89,0.12)',
          border: '1px solid rgba(197,160,89,0.25)',
        }}
      >
        {icon}
      </div>
      <div>
        <p className="text-[#C5A059]/60 text-xs uppercase tracking-widest font-sans mb-0.5">{label}</p>
        <p className="text-[#FDFBF7] text-base font-sans">{value}</p>
        <p className="text-[#E8C5C8]/60 font-arabic text-sm mt-0.5" dir="rtl">{valueAr}</p>
      </div>
    </motion.div>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export default function Venue() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const mapScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1.04, 0.98]);
  const mapOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.6]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0306 0%, #12060c 50%, #0a0306 100%)' }}
    >
      {/* Background blooms */}
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(128,0,32,0.12) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none translate-x-1/3 translate-y-1/3"
        style={{ background: 'radial-gradient(circle, rgba(197,160,89,0.1) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <RoseDivider />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#C5A059] tracking-[0.45em] uppercase text-xs font-sans mb-4">
              The Venue
            </p>
            <h2 className="font-serif text-[clamp(2.2rem,5vw,4rem)] text-[#FDFBF7] mb-3">
              Where It All Happens
            </h2>
            <p className="font-arabic text-xl text-[#E8C5C8]/70" dir="rtl">
              وده المكان اللي هيشهد أجمل لحظة 🌹
            </p>
          </motion.div>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* ── Left: venue info ── */}
          <div className="space-y-6">

            {/* Venue name hero card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl overflow-hidden p-8 md:p-10"
              style={{
                background: 'linear-gradient(135deg, rgba(42,16,24,0.95) 0%, rgba(20,8,14,1) 100%)',
                border: '1px solid rgba(197,160,89,0.22)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(197,160,89,0.1)',
              }}
            >
              {/* Top shine */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent" />
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-40 h-40 rounded-bl-full opacity-30"
                style={{ background: 'radial-gradient(circle at top right, rgba(197,160,89,0.15), transparent 70%)' }} />

              {/* Corner ornaments */}
              {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-5 h-5 border-[#C5A059]/25
                  ${i < 2 ? 'border-t' : 'border-b'} ${i % 2 === 0 ? 'border-l' : 'border-r'}`} />
              ))}

              <div className="relative z-10">
                <p className="text-[#C5A059]/60 text-xs uppercase tracking-widest font-sans mb-3">
                  Venue
                </p>
                <h3 className="font-serif text-[clamp(3.5rem,8vw,6rem)] text-[#FDFBF7] leading-none mb-2">
                  {EVENT_DETAILS.venueName}
                </h3>
                {/* Gold underline */}
                <motion.div
                  className="h-0.5 w-0 bg-gradient-to-r from-[#C5A059] to-[#E8C5C8]"
                  whileInView={{ width: '5rem' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                />
                <p className="text-[#E8C5C8]/70 text-base mt-4 font-sans leading-relaxed">
                  {EVENT_DETAILS.venueLocation}
                </p>
                <p className="text-[#C5A059]/70 font-arabic text-sm mt-2" dir="rtl">
                  المنصورة، مصر — على ضفاف النيل مباشرةً 🌊
                </p>
              </div>
            </motion.div>

            {/* Detail pills */}
            <motion.div
              className="rounded-2xl p-6 space-y-5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{
                background: 'rgba(20,8,14,0.8)',
                border: '1px solid rgba(197,160,89,0.15)',
              }}
            >
              <DetailPill
                icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="7.5" stroke="#C5A059" strokeWidth="1.2" />
                  <path d="M9 5V9.5L12 11.5" stroke="#C5A059" strokeWidth="1.2" strokeLinecap="round" />
                </svg>}
                label="Time"
                value="7.30 PM Onwards"
                valueAr="من الساعة 7.30 بالليل"
              />
              <div className="h-px bg-gradient-to-r from-transparent via-[#C5A059]/15 to-transparent" />
              <DetailPill
                icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 1C5.7 1 3 3.7 3 7C3 11.5 9 17 9 17C9 17 15 11.5 15 7C15 3.7 12.3 1 9 1Z"
                    stroke="#C5A059" strokeWidth="1.2" fill="none" />
                  <circle cx="9" cy="7" r="2" stroke="#C5A059" strokeWidth="1.2" />
                </svg>}
                label="Location"
                value="Cove, Mansoura"
                valueAr="كوف، المنصورة"
              />
              <div className="h-px bg-gradient-to-r from-transparent via-[#C5A059]/15 to-transparent" />
              <DetailPill
                icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="1" y="3" width="16" height="14" rx="2" stroke="#C5A059" strokeWidth="1.2" />
                  <path d="M1 7H17" stroke="#C5A059" strokeWidth="1.2" />
                  <path d="M5 1V4M13 1V4" stroke="#C5A059" strokeWidth="1.2" strokeLinecap="round" />
                </svg>}
                label="Date"
                value="Thursday, July 16 · 2026"
                valueAr="الخميس ١٦ يوليو ٢٠٢٦"
              />
            </motion.div>

            {/* Google Maps CTA */}
            <motion.a
              href={"https://www.google.com/maps/place/31%C2%B002'24.1%22N+31%C2%B020'06.4%22E/@31.0400257,31.3325329,17z/data=!3m1!4b1!4m4!3m3!8m2!3d31.0400257!4d31.3351078?hl=en&entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D"}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex items-center justify-between p-5 rounded-xl overflow-hidden group block"
              style={{
                background: 'linear-gradient(135deg, #800020 0%, #600015 100%)',
                border: '1px solid rgba(197,160,89,0.3)',
                boxShadow: '0 8px 32px rgba(128,0,32,0.35)',
              }}
            >
              {/* Shimmer sweep */}
              <motion.div
                className="absolute inset-0 -skew-x-12"
                style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)' }}
                initial={{ x: '-120%' }}
                whileHover={{ x: '120%' }}
                transition={{ duration: 0.7 }}
              />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2C6.7 2 4 4.7 4 8C4 13 10 18 10 18C10 18 16 13 16 8C16 4.7 13.3 2 10 2Z"
                      fill="white" opacity="0.9" />
                    <circle cx="10" cy="8" r="2.5" fill="#800020" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#FDFBF7] font-sans font-semibold text-base">Get Directions</p>
                  <p className="text-[#FDFBF7]/60 font-arabic text-sm" dir="rtl">افتح جوجل ماب</p>
                </div>
              </div>
              <motion.div
                className="relative z-10"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M11 5L16 10L11 15" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </motion.a>
          </div>

          {/* ── Right: map ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Map frame */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                height: 'clamp(340px, 50vw, 560px)',
                border: '1px solid rgba(197,160,89,0.25)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
              }}
            >
              {/* Parallax-scaled map */}
             <motion.div
  className="absolute inset-0"
  style={{ scale: mapScale, opacity: mapOpacity }}
>
  <iframe
    src="https://maps.google.com/maps?q=31.0400257,31.3351078&z=17&output=embed"
    width="100%"
    height="100%"
    style={{
      border: 0,
      filter: "saturate(0.6) contrast(1.1) brightness(0.85)",
    }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Engagement Venue"
  />
</motion.div>

              {/* Dark overlay edges */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl"
                style={{ boxShadow: 'inset 0 0 40px rgba(10,3,6,0.5)' }} />

              {/* Gold inner border */}
              <div className="absolute inset-3 rounded-xl pointer-events-none"
                style={{ border: '1px solid rgba(197,160,89,0.12)' }} />

              {/* Animated pin */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 pointer-events-none z-10"
                style={{ translateY: '-100%' }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg width="36" height="44" viewBox="0 0 36 44" fill="none"
                  style={{ filter: 'drop-shadow(0 4px 12px rgba(128,0,32,0.7))' }}>
                  <path d="M18 2C9.2 2 2 9.2 2 18C2 30 18 44 18 44C18 44 34 30 34 18C34 9.2 26.8 2 18 2Z"
                    fill="#800020" />
                  <circle cx="18" cy="18" r="7" fill="#FDFBF7" opacity="0.9" />
                  <path d="M18 10C18 10 12 14 12 18C12 21.3 14.7 24 18 24C21.3 24 24 21.3 24 18C24 14 18 10 18 10Z"
                    fill="#800020" opacity="0.7" />
                </svg>
              </motion.div>
            </div>

            {/* Nile quote card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-5 -left-4 md:-left-8 rounded-xl px-5 py-4 max-w-[220px]"
              style={{
                background: 'linear-gradient(135deg, rgba(42,16,24,0.98) 0%, rgba(20,8,14,0.98) 100%)',
                border: '1px solid rgba(197,160,89,0.3)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
              }}
            >
              <p className="text-[#C5A059] text-2xl mb-1">🌊</p>
              <p className="text-[#FDFBF7] font-sans text-sm font-medium leading-snug">
                Overlooking the Nile
              </p>
              <p className="text-[#E8C5C8]/60 font-arabic text-xs mt-1" dir="rtl">
                على ضفاف النيل
              </p>
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-20">
          <RoseDivider />
        </div>
      </div>
    </section>
  );
}
