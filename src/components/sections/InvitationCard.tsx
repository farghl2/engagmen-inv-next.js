'use client';

import { motion } from 'framer-motion';

/* ─── Watercolor roses SVG ───────────────────────────────── */
function WatercolorRoses() {
  return (
    <svg viewBox="0 0 340 115" fill="none" className="w-full max-w-[340px]" aria-hidden="true">
      {/* Main leaves */}
      <ellipse cx="55"  cy="78" rx="26" ry="10" transform="rotate(-38 55 78)"  fill="#7CAF6A" opacity="0.52"/>
      <ellipse cx="78"  cy="92" rx="20" ry="8"  transform="rotate(-18 78 92)"  fill="#8FBF7A" opacity="0.46"/>
      <ellipse cx="285" cy="78" rx="26" ry="10" transform="rotate(38 285 78)"  fill="#7CAF6A" opacity="0.52"/>
      <ellipse cx="262" cy="92" rx="20" ry="8"  transform="rotate(18 262 92)"  fill="#8FBF7A" opacity="0.46"/>
      <ellipse cx="170" cy="96" rx="30" ry="9"  transform="rotate(-4 170 96)"  fill="#7CAF6A" opacity="0.38"/>
      <ellipse cx="118" cy="84" rx="16" ry="6"  transform="rotate(-28 118 84)" fill="#8FBF7A" opacity="0.42"/>
      <ellipse cx="222" cy="82" rx="16" ry="6"  transform="rotate(24 222 82)"  fill="#8FBF7A" opacity="0.42"/>
      {/* Stem line */}
      <path d="M170 96 L88 98"  stroke="#7CAF6A" strokeWidth="1.3" opacity="0.45"/>
      <path d="M170 96 L252 98" stroke="#7CAF6A" strokeWidth="1.3" opacity="0.45"/>

      {/* Centre big rose */}
      <circle cx="170" cy="54" r="28" fill="#8B1A2A" opacity="0.1"/>
      <circle cx="170" cy="54" r="22" fill="#9B2235" opacity="0.16"/>
      <circle cx="170" cy="54" r="16" fill="#800020" opacity="0.72"/>
      <circle cx="170" cy="54" r="9"  fill="#9B0030" opacity="0.58"/>
      <circle cx="170" cy="54" r="4.5" fill="#C5405A" opacity="0.5"/>
      {[0,45,90,135,180,225,270,315].map((a,i)=>(
        <ellipse key={i}
          cx={170+Math.cos(a*Math.PI/180)*19} cy={54+Math.sin(a*Math.PI/180)*19}
          rx="9" ry="5.5"
          transform={`rotate(${a} ${170+Math.cos(a*Math.PI/180)*19} ${54+Math.sin(a*Math.PI/180)*19})`}
          fill="#800020" opacity="0.28"/>
      ))}

      {/* Left rose */}
      <circle cx="106" cy="62" r="20" fill="#800020" opacity="0.09"/>
      <circle cx="106" cy="62" r="14" fill="#9B2235" opacity="0.52"/>
      <circle cx="106" cy="62" r="8"  fill="#800020" opacity="0.62"/>
      <circle cx="106" cy="62" r="3.5" fill="#C5405A" opacity="0.44"/>

      {/* Right rose */}
      <circle cx="234" cy="62" r="20" fill="#800020" opacity="0.09"/>
      <circle cx="234" cy="62" r="14" fill="#9B2235" opacity="0.52"/>
      <circle cx="234" cy="62" r="8"  fill="#800020" opacity="0.62"/>
      <circle cx="234" cy="62" r="3.5" fill="#C5405A" opacity="0.44"/>

      {/* Small accent roses */}
      <circle cx="142" cy="72" r="10" fill="#C5405A" opacity="0.42"/>
      <circle cx="198" cy="72" r="10" fill="#C5405A" opacity="0.42"/>
      <circle cx="80"  cy="80" r="8"  fill="#D4919A" opacity="0.48"/>
      <circle cx="260" cy="80" r="8"  fill="#D4919A" opacity="0.48"/>
      <circle cx="128" cy="80" r="6"  fill="#E8C5C8" opacity="0.55"/>
      <circle cx="212" cy="80" r="6"  fill="#E8C5C8" opacity="0.55"/>
    </svg>
  );
}

/* ─── Tiny gold divider ──────────────────────────────────── */
function GoldDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-3 my-2">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C5A059]/50"/>
      <span className="text-[#C5A059]/60 text-[9px] tracking-[0.35em] uppercase font-sans">{label}</span>
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C5A059]/50"/>
    </div>
  );
}

/* ─── Main section ───────────────────────────────────────── */
export default function InvitationCard() {
  const stagger = {
    hidden:   { opacity: 0 },
    visible:  { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const item = {
    hidden:   { opacity: 0, y: 20 },
    visible:  { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22,1,0.36,1] as [number,number,number,number] } },
  };

  return (
    <section
      className="relative py-20 px-4 flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #100508 0%, #0e0408 50%, #100508 100%)' }}
    >
      {/* Soft ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full opacity-50"
          style={{ background: 'radial-gradient(ellipse, rgba(232,197,200,0.06) 0%, transparent 70%)' }}/>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="relative z-10 w-full max-w-[420px]"
      >
        {/* The card */}
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(170deg, #FDFAF6 0%, #FDF5F2 55%, #FDFAF6 100%)',
            boxShadow: '0 40px 100px rgba(128,0,32,0.22), 0 8px 32px rgba(197,160,89,0.15)',
            border: '1px solid rgba(197,160,89,0.25)',
          }}
        >
          {/* Outer border frame */}
          <div className="absolute inset-3 rounded-2xl pointer-events-none"
            style={{ border: '1px solid rgba(197,160,89,0.2)' }}/>
          {/* Second frame */}
          <div className="absolute inset-[18px] rounded-xl pointer-events-none"
            style={{ border: '0.5px solid rgba(197,160,89,0.1)' }}/>

          <div className="relative z-10 flex flex-col items-center px-8 pb-10 pt-0">

            {/* Roses — bleeds to top */}
            <motion.div variants={item} className="-mx-8 w-[calc(100%+4rem)] -mt-1">
              <WatercolorRoses />
            </motion.div>

            {/* ENGAGEMENT CEREMONY */}
            <motion.div variants={item} className="text-center mt-1">
              <p className="tracking-[0.35em] text-[9px] text-[#800020]/55 uppercase font-sans">
                Engagement Ceremony
              </p>
              <div className="mt-2 h-px w-20 mx-auto bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent"/>
            </motion.div>

            {/* Arabic invitation text */}
            <motion.div variants={item} className="text-center mt-3 space-y-0.5">
              <p className="font-arabic text-sm text-[#800020]/70 leading-relaxed" dir="rtl">
                نتشرف بكل مودة وحب
              </p>
              <p className="font-arabic text-sm text-[#800020]/65 leading-relaxed" dir="rtl">
                بدعوتكم لحضور
              </p>
            </motion.div>

            {/* حفل الخطوبة */}
            <motion.div variants={item} className="text-center mt-3">
              <h2 className="font-arabic font-bold text-4xl text-[#800020] leading-tight" dir="rtl">
                حفل الخطوبة
              </h2>
              <div className="mt-2 h-0.5 w-14 mx-auto bg-gradient-to-r from-transparent via-[#C5A059] to-transparent"/>
            </motion.div>

            {/* Names */}
            <motion.div variants={item} className="text-center mt-5">
              <p className="font-arabic font-bold text-[3rem] text-[#800020] leading-none" dir="rtl">
                أحمد
              </p>
              <motion.div
                animate={{ scale: [1, 1.18, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="my-1.5"
              >
                <svg width="26" height="22" viewBox="0 0 26 22" fill="none" className="mx-auto">
                  <path d="M13 21C13 21 1 13 1 6.5C1 3.5 3.5 1 6.5 1C8.8 1 11 2.2 13 4.5C15 2.2 17.2 1 19.5 1C22.5 1 25 3.5 25 6.5C25 13 13 21 13 21Z"
                    fill="#C5A059" opacity="0.65"/>
                </svg>
              </motion.div>
              <p className="font-arabic font-bold text-[3rem] text-[#800020] leading-none" dir="rtl">
                ندى
              </p>
            </motion.div>

            {/* و ذلك بمشيئة الله */}
            <motion.div variants={item} className="mt-3 text-center">
              <p className="font-arabic text-xs text-[#800020]/45 leading-relaxed" dir="rtl">
                و ذلك بمشيئة الله تعالى 🤍
              </p>
            </motion.div>

            {/* Details */}
            <motion.div variants={item} className="mt-5 w-full space-y-2">
              <GoldDivider label="Date" />
              <p className="text-center font-arabic text-lg font-bold text-[#800020]" dir="rtl">
                الخميس ١٦ يوليو ٢٠٢٦
              </p>

              <GoldDivider label="Time" />
              <p className="text-center font-arabic text-xl font-bold text-[#800020]" dir="rtl">
                ٦ مساءً
              </p>

              <GoldDivider label="Location" />
              <p className="text-center font-arabic text-lg font-bold text-[#800020]" dir="rtl">
                كوف — المنصورة
              </p>
              <p className="text-center font-arabic text-xs text-[#800020]/45 mt-0.5" dir="rtl">
                على ضفاف النيل 🌊
              </p>
            </motion.div>

            {/* Bottom ornament */}
            <motion.div variants={item} className="mt-6 flex items-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C5A059]/45"/>
              <svg width="14" height="17" viewBox="0 0 14 17" fill="none">
                <path d="M7 1C7 1 1 5 1 9C1 13 3.7 16 7 16C10.3 16 13 13 13 9C13 5 7 1 7 1Z"
                  fill="#C5A059" opacity="0.55"/>
                <path d="M7 16L7 17" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C5A059]/45"/>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}
