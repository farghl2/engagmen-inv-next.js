'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Position } from '@/src/types/invitation';

/* ─── Maze layout ─────────────────────────────────────────── */
const MAZE: (0 | 1 | 'S' | 'E')[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1,'S',0, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0,'E',1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
const ROWS = MAZE.length;
const COLS = MAZE[0].length;
const START: Position = { x: 1, y: 1 };
const END: Position   = { x: 9, y: 9 };

/* ─── Win petals burst ────────────────────────────────────── */
function WinPetals() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {Array.from({ length: 14 }, (_, i) => {
        const angle = (i / 14) * 360;
        const color = i % 3 === 0 ? '#800020' : i % 3 === 1 ? '#C5A059' : '#E8C5C8';
        return (
          <motion.div key={i} className="absolute"
            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
            animate={{
              x: Math.cos(angle * Math.PI / 180) * (60 + (i % 3) * 30),
              y: Math.sin(angle * Math.PI / 180) * (60 + (i % 3) * 30),
              opacity: [1, 1, 0], scale: [0, 1.1, 0.3],
            }}
            transition={{ duration: 1.1, delay: i * 0.05, ease: 'easeOut' }}
          >
            <svg width="12" height="15" viewBox="0 0 12 15" fill={color} opacity="0.85">
              <path d="M6 1C6 1 1 4 1 7.5C1 11 3.3 14 6 14C8.7 14 11 11 11 7.5C11 4 6 1 6 1Z"/>
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── Maze game ───────────────────────────────────────────── */
function MazeGame({ cellSize, onWin }: { cellSize: number; onWin: () => void }) {
  const [pos, setPos]     = useState<Position>(START);
  const [won, setWon]     = useState(false);
  const [trail, setTrail] = useState<Position[]>([START]);
  const touchRef          = useRef<{ x: number; y: number } | null>(null);

  const isWall = (x: number, y: number) =>
    y < 0 || y >= ROWS || x < 0 || x >= COLS || MAZE[y][x] === 1;

  const move = useCallback((dx: number, dy: number) => {
    if (won) return;
    setPos((prev) => {
      const nx = prev.x + dx, ny = prev.y + dy;
      if (isWall(nx, ny)) return prev;
      setTrail((t) => [...t.slice(-20), { x: nx, y: ny }]);
      if (nx === END.x && ny === END.y) {
        setWon(true);
        setTimeout(onWin, 1500);
      }
      return { x: nx, y: ny };
    });
  }, [won, onWin]);

  /* keyboard */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const m: Record<string, [number,number]> = {
        ArrowUp:[0,-1],w:[0,-1],W:[0,-1],
        ArrowDown:[0,1],s:[0,1],S:[0,1],
        ArrowLeft:[-1,0],a:[-1,0],A:[-1,0],
        ArrowRight:[1,0],d:[1,0],D:[1,0],
      };
      if (m[e.key]) { e.preventDefault(); move(...m[e.key]); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [move]);

  /* touch swipe on the grid */
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchRef.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchRef.current.x;
    const dy = t.clientY - touchRef.current.y;
    const adx = Math.abs(dx), ady = Math.abs(dy);
    if (adx < 10 && ady < 10) return;
    if (adx > ady) move(dx > 0 ? 1 : -1, 0);
    else           move(0, dy > 0 ? 1 : -1);
    touchRef.current = null;
  };

  const gap = 2;

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Grid */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="select-none touch-none"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, ${cellSize}px)`,
          gap: `${gap}px`,
          padding: '6px',
          borderRadius: '12px',
          background: 'rgba(10,3,6,0.88)',
          border: '1px solid rgba(197,160,89,0.18)',
          boxShadow: '0 4px 30px rgba(128,0,32,0.18)',
        }}
      >
        {MAZE.map((row, y) => row.map((cell, x) => {
          const isPlayer = pos.x === x && pos.y === y;
          const isEnd    = END.x === x && END.y === y;
          const isTrail  = !isPlayer && trail.some(t => t.x === x && t.y === y);
          const wall     = cell === 1;

          return (
            <div key={`${x}-${y}`} style={{
              width: cellSize, height: cellSize, borderRadius: 3,
              background: wall
                ? 'linear-gradient(135deg,rgba(42,16,24,0.96),rgba(28,10,18,1))'
                : isTrail ? 'rgba(197,160,89,0.07)' : 'rgba(255,255,255,0.025)',
              border: wall ? '1px solid rgba(197,160,89,0.08)' : 'none',
              position: 'relative', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              {isTrail && (
                <div style={{ width: 3, height: 3, borderRadius: '50%',
                  background: 'rgba(197,160,89,0.3)' }} />
              )}
              {isEnd && !isPlayer && (
                <motion.div animate={{ scale:[1,1.2,1] }}
                  transition={{ duration:1.5, repeat:Infinity }}>
                  <svg width={cellSize * 0.6} height={cellSize * 0.7} viewBox="0 0 18 22">
                    <path d="M9 2C9 2 2 7 2 12C2 16.4 5.1 20 9 20C12.9 20 16 16.4 16 12C16 7 9 2 9 2Z"
                      fill="#E8C5C8" opacity="0.9"/>
                    <path d="M9 20L9 22" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </motion.div>
              )}
              {isPlayer && (
                <motion.div layoutId="player"
                  style={{ position:'absolute', inset:0, display:'flex',
                    alignItems:'center', justifyContent:'center' }}
                  transition={{ type:'spring', stiffness:420, damping:34 }}>
                  {won ? (
                    <motion.div animate={{ scale:[1,1.5,1], rotate:[0,360] }}
                      transition={{ duration:0.8 }} className="relative">
                      <WinPetals />
                      <svg width={cellSize * 0.65} height={cellSize * 0.75} viewBox="0 0 22 26">
                        <path d="M11 2C11 2 3 8 3 14C3 19.5 6.5 24 11 24C15.5 24 19 19.5 19 14C19 8 11 2 11 2Z"
                          fill="#800020"/>
                        <path d="M11 24L11 26" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </motion.div>
                  ) : (
                    <div style={{
                      width: cellSize - 6, height: cellSize - 6, borderRadius: '50%',
                      background: 'radial-gradient(circle at 35% 35%,#a0001e,#600015)',
                      boxShadow: '0 0 8px rgba(128,0,32,0.55)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                    }}>
                      <svg width={cellSize * 0.38} height={cellSize * 0.44} viewBox="0 0 12 14">
                        <path d="M6 1C6 1 1 4 1 7C1 9.8 3.2 12 6 12C8.8 12 11 9.8 11 7C11 4 6 1 6 1Z"
                          fill="rgba(253,251,247,0.9)"/>
                      </svg>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          );
        }))}
      </div>

      {/* D-pad — shown on touch/small screens */}
      <div className="grid grid-cols-3 gap-2 md:hidden" style={{ gridTemplateRows: 'auto auto' }}>
        <div />
        <DpadBtn label="↑" onClick={() => move(0,-1)} />
        <div />
        <DpadBtn label="←" onClick={() => move(-1,0)} />
        <DpadBtn label="↓" onClick={() => move(0,1)} />
        <DpadBtn label="→" onClick={() => move(1,0)} />
      </div>

      <p className="text-[#C5A059]/35 text-[10px] font-sans tracking-wider hidden md:block">
        Arrow keys / WASD
      </p>
      <p className="text-[#C5A059]/35 text-[10px] font-sans tracking-wider md:hidden">
        Swipe or use the buttons above
      </p>
    </div>
  );
}

function DpadBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <motion.button
      whileTap={{ scale: 0.82 }}
      onClick={onClick}
      className="w-12 h-12 rounded-xl text-[#FDFBF7] font-bold text-lg
                 flex items-center justify-center active:opacity-80"
      style={{
        background: 'rgba(42,16,24,0.9)',
        border: '1px solid rgba(197,160,89,0.22)',
        boxShadow: '0 3px 10px rgba(0,0,0,0.35)',
        touchAction: 'manipulation',
        userSelect: 'none',
      }}
    >
      {label}
    </motion.button>
  );
}

/* ─── Main section ────────────────────────────────────────── */
export default function MazeSection() {
  const [unlocked, setUnlocked] = useState(false);
  const [won, setWon]           = useState(false);
  const [gameKey, setGameKey]   = useState(0);
  const [cellSize, setCellSize] = useState(34);
  const containerRef            = useRef<HTMLDivElement>(null);

  /* Dynamic cell size based on container width */
  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth;
      // available width: viewport minus padding (40px each side) minus grid padding (12px) minus gaps
      const available = Math.min(vw - 80, 480);
      const size = Math.floor((available - 12 - (COLS - 1) * 2) / COLS);
      setCellSize(Math.max(24, Math.min(size, 42)));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const reset = () => { setWon(false); setGameKey(k => k + 1); };

  return (
    <section className="relative py-20 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0306 0%, #120609 60%, #0a0306 100%)' }}>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[400px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(ellipse, rgba(197,160,89,0.08) 0%, transparent 70%)' }} />
      </div>

      <div ref={containerRef} className="relative z-10 max-w-lg mx-auto text-center">

        {/* Header */}
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.7 }} className="mb-8">
          <p className="text-[#C5A059] tracking-[0.4em] uppercase text-xs font-sans mb-3">
            Fun Zone
          </p>
          <h2 className="font-serif text-[clamp(1.6rem,4vw,2.8rem)] text-[#FDFBF7] mb-2">
            Help Ahmed Find Nada
          </h2>
          <p className="font-arabic text-sm text-[#E8C5C8]/55" dir="rtl">
            ساعد أحمد يوصل لندى قبل الحفلة 😄
          </p>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* ── Locked ── */}
          {!unlocked && (
            <motion.div key="locked"
              initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
              exit={{ opacity:0, scale:0.9 }}
              transition={{ duration:0.45, ease:[0.22,1,0.36,1] }}
              className="rounded-2xl overflow-hidden p-8 sm:p-12"
              style={{ background:'linear-gradient(160deg,rgba(35,12,20,0.97),rgba(15,6,10,0.99))',
                border:'1px solid rgba(197,160,89,0.18)',
                boxShadow:'0 20px 60px rgba(0,0,0,0.45)' }}>
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/25 to-transparent" />
              <motion.div animate={{ rotate:[0,5,-5,0] }}
                transition={{ duration:4, repeat:Infinity }} className="mb-5">
                <svg width="60" height="60" viewBox="0 0 72 72" fill="none" className="mx-auto">
                  <rect x="4" y="4" width="64" height="64" rx="8" stroke="rgba(197,160,89,0.4)" strokeWidth="1.5"/>
                  <path d="M16 16H28M16 16V28M28 16V24M16 28H20M20 28V36M20 36H32M32 28V40M32 40H44M44 28H56M56 28V40M56 40H48M48 40V48M48 48H36M36 48V56M36 56H56M16 40H12M12 40V56H28M28 56V48M28 48H20M20 48V44"
                    stroke="rgba(197,160,89,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="16" cy="16" r="4" fill="#800020" opacity="0.9"/>
                  <circle cx="56" cy="56" r="4" fill="#E8C5C8" opacity="0.9"/>
                </svg>
              </motion.div>
              <h3 className="font-serif text-xl text-[#FDFBF7] mb-2">Mini Maze Challenge</h3>
              <p className="text-[#E8C5C8]/45 font-arabic text-sm mb-6" dir="rtl">
                لو حاسس بالمغامرة — جرّب توصّل أحمد لندى 🌹
              </p>
              <motion.button onClick={() => setUnlocked(true)}
                whileHover={{ scale:1.04 }} whileTap={{ scale:0.95 }}
                className="relative px-8 py-3.5 rounded-xl font-arabic font-semibold
                           text-[#FDFBF7] overflow-hidden text-base"
                style={{ background:'linear-gradient(135deg,rgba(128,0,32,0.85),rgba(96,0,21,0.95))',
                  border:'1px solid rgba(197,160,89,0.28)',
                  boxShadow:'0 6px 22px rgba(128,0,32,0.3)',
                  minHeight:'48px', touchAction:'manipulation' }}>
                <span className="relative z-10">ابدأ اللعبة 🎮</span>
              </motion.button>
            </motion.div>
          )}

          {/* ── Active ── */}
          {unlocked && !won && (
            <motion.div key={`maze-${gameKey}`}
              initial={{ opacity:0, y:24, scale:0.97 }} animate={{ opacity:1, y:0, scale:1 }}
              exit={{ opacity:0 }}
              transition={{ duration:0.5, ease:[0.22,1,0.36,1] }}
              className="rounded-2xl overflow-hidden p-4 sm:p-6"
              style={{ background:'rgba(12,5,8,0.97)',
                border:'1px solid rgba(197,160,89,0.18)',
                boxShadow:'0 16px 50px rgba(0,0,0,0.5)' }}>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mb-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background:'radial-gradient(circle at 35% 35%,#a0001e,#600015)' }}>
                    <svg width="7" height="8" viewBox="0 0 10 12" fill="rgba(253,251,247,0.9)">
                      <path d="M5 1C5 1 1 3.5 1 6C1 8.5 2.8 10.5 5 10.5C7.2 10.5 9 8.5 9 6C9 3.5 5 1 5 1Z"/>
                    </svg>
                  </div>
                  <span className="text-[#C5A059]/60 text-xs font-arabic">أحمد</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg width="12" height="15" viewBox="0 0 14 17" fill="#E8C5C8" opacity="0.9">
                    <path d="M7 1C7 1 1 5 1 9C1 13 3.7 16 7 16C10.3 16 13 13 13 9C13 5 7 1 7 1Z"/>
                  </svg>
                  <span className="text-[#E8C5C8]/60 text-xs font-arabic">ندى</span>
                </div>
              </div>

              <div className="flex justify-center overflow-hidden">
                <MazeGame key={gameKey} cellSize={cellSize} onWin={() => setWon(true)} />
              </div>

              <button onClick={reset}
                className="mt-4 text-[#C5A059]/40 hover:text-[#C5A059]/70 text-xs
                           font-sans underline underline-offset-2 transition-colors">
                إعادة ↺
              </button>
            </motion.div>
          )}

          {/* ── Win ── */}
          {won && (
            <motion.div key="win"
              initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
              transition={{ duration:0.55, ease:[0.22,1,0.36,1] }}
              className="rounded-2xl overflow-hidden p-10 sm:p-14"
              style={{ background:'linear-gradient(160deg,rgba(42,16,24,0.97),rgba(15,6,10,0.99))',
                border:'1px solid rgba(197,160,89,0.28)',
                boxShadow:'0 28px 70px rgba(128,0,32,0.28)' }}>
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/35 to-transparent" />
              <motion.div initial={{ scale:0, rotate:-180 }} animate={{ scale:1, rotate:0 }}
                transition={{ type:'spring', stiffness:180, damping:14 }} className="mb-5">
                <svg width="72" height="86" viewBox="0 0 80 96" fill="none" className="mx-auto">
                  <path d="M40 4C40 4 8 22 8 44C8 63 22 80 40 80C58 80 72 63 72 44C72 22 40 4 40 4Z"
                    fill="#800020" opacity="0.95"/>
                  <path d="M16 40C16 40 4 30 10 18" stroke="#E8C5C8" strokeWidth="2" strokeLinecap="round" opacity="0.45"/>
                  <path d="M64 40C64 40 76 30 70 18" stroke="#E8C5C8" strokeWidth="2" strokeLinecap="round" opacity="0.45"/>
                  <path d="M40 80L40 96" stroke="#C5A059" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M28 90L52 90" stroke="#C5A059" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </motion.div>
              <motion.h3 initial={{ y:18, opacity:0 }} animate={{ y:0, opacity:1 }}
                transition={{ delay:0.3 }} className="font-serif text-2xl text-[#FDFBF7] mb-2">
                وصلوا لبعض! 🌹
              </motion.h3>
              <motion.p initial={{ y:14, opacity:0 }} animate={{ y:0, opacity:1 }}
                transition={{ delay:0.45 }}
                className="text-[#E8C5C8]/55 font-arabic text-sm mb-6" dir="rtl">
                زي ما أحمد وصل لندى في المتاه — كده هيوصلوا لبعض في الحياة 💛
              </motion.p>
              <motion.button initial={{ opacity:0 }} animate={{ opacity:1 }}
                transition={{ delay:0.6 }}
                onClick={reset} whileHover={{ scale:1.04 }} whileTap={{ scale:0.95 }}
                className="px-7 py-3 rounded-xl font-arabic text-[#C5A059] text-sm
                           border border-[#C5A059]/28 hover:bg-[#C5A059]/6 transition-all"
                style={{ minHeight:'44px', touchAction:'manipulation' }}>
                العب تاني 🔄
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}
