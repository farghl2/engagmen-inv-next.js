'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RSVPFormData } from '@/src/types/invitation';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

/* ─── Floating celebration rose ─────────────────────────── */
function CelebrationRose({ delay, x, color }: { delay: number; x: number; color: string }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: '50%', bottom: '40%', color }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 0.5, rotate: 0 }}
      animate={{
        x: x,
        y: -(180 + Math.abs(x) * 0.4),
        opacity: [1, 1, 0],
        scale: [0.5, 1.1, 0.7],
        rotate: x > 0 ? 40 : -40,
      }}
      transition={{ duration: 1.4, delay, ease: 'easeOut' }}
    >
      <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
        <path d="M11 1C11 1 2 7 2 13C2 18.5 6 23 11 23C16 23 20 18.5 20 13C20 7 11 1 11 1Z"
          fill="currentColor" opacity="0.85"/>
        <path d="M11 23L11 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </motion.div>
  );
}

/* ─── Styled input field ────────────────────────────────── */
function FormField({
  id, label, labelAr, type = 'text', value, onChange, placeholder, required,
  icon,
}: {
  id: string; label: string; labelAr: string; type?: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string; required?: boolean; icon: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-[#C5A059]/80 text-xs uppercase tracking-widest font-sans">
          {label}{required && <span className="text-[#E8C5C8] ml-1">*</span>}
        </label>
        <span className="text-[#E8C5C8]/40 font-arabic text-xs" dir="rtl">{labelAr}</span>
      </div>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#C5A059]/50">
          {icon}
        </div>
        <motion.input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          placeholder={placeholder}
          animate={{
            borderColor: focused ? 'rgba(197,160,89,0.6)' : 'rgba(197,160,89,0.15)',
            boxShadow: focused
              ? '0 0 0 3px rgba(197,160,89,0.1), inset 0 1px 0 rgba(197,160,89,0.05)'
              : '0 0 0 0px transparent',
          }}
          transition={{ duration: 0.2 }}
          className="w-full pl-12 pr-4 py-4 rounded-xl font-sans text-[#FDFBF7] text-sm
                     placeholder:text-[#FDFBF7]/20 outline-none transition-colors duration-200"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(197,160,89,0.15)',
          }}
        />
      </div>
    </div>
  );
}

/* ─── Styled select ─────────────────────────────────────── */
function FormSelect({
  id, label, labelAr, value, onChange, options, icon,
}: {
  id: string; label: string; labelAr: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: number; label: string }[];
  icon: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-[#C5A059]/80 text-xs uppercase tracking-widest font-sans">{label}</label>
        <span className="text-[#E8C5C8]/40 font-arabic text-xs" dir="rtl">{labelAr}</span>
      </div>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#C5A059]/50">{icon}</div>
        <motion.select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          animate={{
            borderColor: focused ? 'rgba(197,160,89,0.6)' : 'rgba(197,160,89,0.15)',
          }}
          transition={{ duration: 0.2 }}
          className="w-full pl-12 pr-4 py-4 rounded-xl font-sans text-[#FDFBF7] text-sm
                     outline-none cursor-pointer appearance-none"
          style={{
            background: 'rgba(20,8,14,0.9)',
            border: '1px solid rgba(197,160,89,0.15)',
          }}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} style={{ background: '#14080e' }}>{o.label}</option>
          ))}
        </motion.select>
      </div>
    </div>
  );
}

/* ─── Styled textarea ───────────────────────────────────── */
function FormTextarea({
  id, label, labelAr, value, onChange, placeholder, icon,
}: {
  id: string; label: string; labelAr: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string; icon: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-[#C5A059]/80 text-xs uppercase tracking-widest font-sans">{label}</label>
        <span className="text-[#E8C5C8]/40 font-arabic text-xs" dir="rtl">{labelAr}</span>
      </div>
      <div className="relative">
        <div className="absolute left-4 top-4 pointer-events-none text-[#C5A059]/50">{icon}</div>
        <motion.textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={4}
          placeholder={placeholder}
          animate={{
            borderColor: focused ? 'rgba(197,160,89,0.6)' : 'rgba(197,160,89,0.15)',
            boxShadow: focused ? '0 0 0 3px rgba(197,160,89,0.1)' : '0 0 0 0px transparent',
          }}
          transition={{ duration: 0.2 }}
          className="w-full pl-12 pr-4 py-4 rounded-xl font-sans text-[#FDFBF7] text-sm
                     placeholder:text-[#FDFBF7]/20 outline-none resize-none"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(197,160,89,0.15)',
          }}
        />
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export default function RSVPForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState<RSVPFormData>({
    name: '', phone: '', email: '', attendees: 1, message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: name === 'attendees' ? parseInt(value) || 1 : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }
    setStatus('loading');
    await new Promise((r) => setTimeout(r, 1800));
    setStatus('success');
  };

  /* Rose confetti positions */
  const confettiRoses = [
    { x: -160, delay: 0,    color: '#800020' },
    { x: -90,  delay: 0.1,  color: '#C5A059' },
    { x: -40,  delay: 0.2,  color: '#E8C5C8' },
    { x: 40,   delay: 0.15, color: '#E8C5C8' },
    { x: 90,   delay: 0.05, color: '#C5A059' },
    { x: 160,  delay: 0.25, color: '#800020' },
    { x: -120, delay: 0.3,  color: '#E8C5C8' },
    { x: 120,  delay: 0.35, color: '#C5A059' },
  ];

  /* SVG icons */
  const IconUser = <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3.2" stroke="currentColor" strokeWidth="1.2"/><path d="M2 14C2 11.2 4.7 9 8 9C11.3 9 14 11.2 14 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
  const IconPhone = <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 2H6L7.5 5.5L5.5 6.5C6.3 8.2 7.8 9.7 9.5 10.5L10.5 8.5L14 10V13C14 13.6 13.6 14 13 14C6.4 14 2 9.6 2 3C2 2.4 2.4 2 3 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  const IconMail = <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M1.5 5L8 9L14.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
  const IconUsers = <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2"/><path d="M1 13C1 10.8 3.2 9 6 9C8.8 9 11 10.8 11 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><circle cx="11.5" cy="5" r="2" stroke="currentColor" strokeWidth="1.2"/><path d="M13 13C13 11.4 12.1 10 10.8 9.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
  const IconMsg = <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2H14C14.6 2 15 2.4 15 3V10C15 10.6 14.6 11 14 11H5L2 14V3C2 2.4 2.4 2 2 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>;

  return (
    <section
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0306 0%, #0e0509 60%, #0a0306 100%)' }}
    >
      {/* Ambient corner glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center top, rgba(128,0,32,0.15) 0%, transparent 70%)' }}/>

      <div className="relative z-10 max-w-2xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          {/* Rose ornament */}
          <div className="flex items-center justify-center gap-3 mb-6">
            {[0, 1, 2].map((i) => (
              <motion.div key={i}
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
              >
                <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                  <path d="M10 1C10 1 2 6.5 2 12C2 16.4 5.6 20 10 20C14.4 20 18 16.4 18 12C18 6.5 10 1 10 1Z"
                    fill={i === 1 ? '#800020' : '#C5A059'} opacity="0.85"/>
                  <path d="M10 20L10 24" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </motion.div>
            ))}
          </div>

          <h2 className="font-serif text-[clamp(2.2rem,5vw,3.8rem)] text-[#FDFBF7] mb-2">
            RSVP
          </h2>
          <p className="text-[#E8C5C8]/60 font-sans text-base tracking-wide mb-2">
            Confirm your attendance
          </p>
          <p className="text-[#C5A059]/70 font-arabic text-base" dir="rtl">
            قولنا هتيجي عشان نستناك 🌹
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, rgba(35,12,20,0.97) 0%, rgba(15,6,10,0.99) 100%)',
            border: '1px solid rgba(197,160,89,0.2)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(197,160,89,0.1)',
          }}
        >
          {/* Top shimmer line */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent"/>

          {/* Corner ornaments */}
          {['top-3 left-3','top-3 right-3','bottom-3 left-3','bottom-3 right-3'].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-5 h-5 border-[#C5A059]/20
              ${i < 2 ? 'border-t' : 'border-b'} ${i % 2 === 0 ? 'border-l' : 'border-r'}`}/>
          ))}

          <AnimatePresence mode="wait">

            {/* ── SUCCESS STATE ── */}
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative p-12 text-center overflow-hidden"
              >
                {/* Confetti roses */}
                {confettiRoses.map((r, i) => (
                  <CelebrationRose key={i} {...r} />
                ))}

                {/* Big rose */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                  className="mb-6"
                >
                  <svg width="80" height="96" viewBox="0 0 80 96" fill="none" className="mx-auto">
                    <path d="M40 4C40 4 8 22 8 44C8 63 22 80 40 80C58 80 72 63 72 44C72 22 40 4 40 4Z"
                      fill="#800020" opacity="0.9"/>
                    <path d="M16 40C16 40 4 30 10 18" stroke="#E8C5C8" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
                    <path d="M64 40C64 40 76 30 70 18" stroke="#E8C5C8" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
                    <path d="M40 80L40 96" stroke="#C5A059" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M28 90L52 90" stroke="#C5A059" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </motion.div>

                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="font-serif text-3xl md:text-4xl text-[#FDFBF7] mb-3"
                >
                  مبروك! 🎉
                </motion.h3>
                <motion.p
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="text-[#E8C5C8]/70 font-sans text-base mb-2"
                >
                  We can&apos;t wait to celebrate with you!
                </motion.p>
                <motion.p
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className="text-[#C5A059]/80 font-arabic text-base"
                  dir="rtl"
                >
                  يلا بينا نعمل فرحة تتحكى 🌹
                </motion.p>
              </motion.div>

            ) : (

              /* ── FORM STATE ── */
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-7 md:p-10 space-y-5"
              >
                {/* Name + Phone side by side on md */}
                <div className="grid md:grid-cols-2 gap-5">
                  <FormField
                    id="name" label="Full Name" labelAr="الاسم" required
                    type="text" value={formData.name}
                    onChange={handleChange}
                    placeholder="اسمك إيه؟"
                    icon={IconUser}
                  />
                  <FormField
                    id="phone" label="Phone" labelAr="موبايل" required
                    type="tel" value={formData.phone}
                    onChange={handleChange}
                    placeholder="+20 1XX XXX XXXX"
                    icon={IconPhone}
                  />
                </div>

                {/* Email + Attendees */}
                <div className="grid md:grid-cols-2 gap-5">
                  <FormField
                    id="email" label="Email" labelAr="إيميل (اختياري)"
                    type="email" value={formData.email ?? ''}
                    onChange={handleChange}
                    placeholder="example@mail.com"
                    icon={IconMail}
                  />
                  <FormSelect
                    id="attendees" label="Guests" labelAr="عدد الحضور"
                    value={formData.attendees}
                    onChange={handleChange}
                    icon={IconUsers}
                    options={[1,2,3,4,5,6].map((n) => ({
                      value: n,
                      label: `${n} ${n === 1 ? 'Guest' : 'Guests'}`,
                    }))}
                  />
                </div>

                {/* Message */}
                <FormTextarea
                  id="message" label="Message" labelAr="رسالة (اختياري)"
                  value={formData.message ?? ''}
                  onChange={handleChange}
                  placeholder="قولنا أي حاجة — بركات، أمنيات، أو بس سلام 💛"
                  icon={IconMsg}
                />

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#C5A059]/20 to-transparent" />

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                  whileTap={status === 'idle' ? { scale: 0.97 } : {}}
                  className="relative w-full py-4 rounded-xl font-sans font-semibold text-base
                             text-[#FDFBF7] overflow-hidden disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(135deg, #800020 0%, #600015 100%)',
                    border: '1px solid rgba(197,160,89,0.3)',
                    boxShadow: '0 8px 32px rgba(128,0,32,0.4)',
                  }}
                >
                  {/* Shimmer sweep on hover */}
                  <motion.div
                    className="absolute inset-0 -skew-x-12 pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }}
                    initial={{ x: '-120%' }}
                    whileHover={{ x: '120%' }}
                    transition={{ duration: 0.6 }}
                  />

                  <AnimatePresence mode="wait">
                    {status === 'loading' ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-3"
                      >
                        {/* Spinning rose loader */}
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M9 1C9 1 3 5 3 9.5C3 13.1 5.7 16 9 16C12.3 16 15 13.1 15 9.5C15 5 9 1 9 1Z"
                              fill="rgba(253,251,247,0.8)"/>
                          </svg>
                        </motion.div>
                        بنبعت...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-3"
                      >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <path d="M9 1C9 1 3 5 3 9.5C3 13.1 5.7 16 9 16C12.3 16 15 13.1 15 9.5C15 5 9 1 9 1Z"
                            fill="rgba(253,251,247,0.9)"/>
                        </svg>
                        هحضر معاكم! 🌹
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Error */}
                <AnimatePresence>
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center text-sm font-arabic text-red-400"
                      dir="rtl"
                    >
                      ⚠️ الاسم والموبايل مطلوبين
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Bottom shimmer line */}
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent"/>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-[#FDFBF7]/20 font-arabic text-xs mt-6"
          dir="rtl"
        >
          بياناتك آمنة ومش هتتشارك مع حد 🔒
        </motion.p>
      </div>
    </section>
  );
}
