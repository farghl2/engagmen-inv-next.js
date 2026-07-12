'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Heart, Navigation } from 'lucide-react';
import { Position, MazeCell } from '@/src/types/invitation';

interface MazeGameProps {
  onComplete: () => void;
}

// Simple maze layout (1 = wall, 0 = path, S = start, E = end)
const MAZE_LAYOUT = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 'S', 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 'E', 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const CELL_SIZE = 40; // pixels

/**
 * Interactive maze game where groom (Ahmed) finds bride (Nada)
 * Supports keyboard arrows and touch/swipe controls
 */
export default function MazeGame({ onComplete }: MazeGameProps) {
  const [playerPos, setPlayerPos] = useState<Position>({ x: 1, y: 1 });
  const [isCompleting, setIsCompleting] = useState(false);
  const [touchStart, setTouchStart] = useState<Position | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);

  // Find start and end positions
  const startPos = { x: 1, y: 1 };
  const endPos = { x: 7, y: 7 };

  const isWall = (x: number, y: number): boolean => {
    if (y < 0 || y >= MAZE_LAYOUT.length || x < 0 || x >= MAZE_LAYOUT[0].length) {
      return true;
    }
    return MAZE_LAYOUT[y][x] === 1;
  };

  const checkWin = (x: number, y: number): boolean => {
    return x === endPos.x && y === endPos.y;
  };

  const movePlayer = useCallback((dx: number, dy: number) => {
    setPlayerPos((prev) => {
      const newX = prev.x + dx;
      const newY = prev.y + dy;

      // Check collision with walls
      if (isWall(newX, newY)) {
        return prev;
      }

      // Check win condition
      if (checkWin(newX, newY)) {
        setIsCompleting(true);
        setTimeout(() => {
          onComplete();
        }, 1500);
      }

      return { x: newX, y: newY };
    });
  }, [onComplete]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCompleting) return;

      setShowInstructions(false);

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          movePlayer(0, -1);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          movePlayer(0, 1);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          movePlayer(-1, 0);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          movePlayer(1, 0);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [movePlayer, isCompleting]);

  // Touch/Swipe controls
  const handleTouchStart = (e: React.TouchEvent) => {
    setShowInstructions(false);
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart || isCompleting) return;

    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStart.x;
    const dy = touch.clientY - touchStart.y;

    // Determine swipe direction (minimum 30px movement)
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) {
      // Horizontal swipe
      movePlayer(dx > 0 ? 1 : -1, 0);
    } else if (Math.abs(dy) > 30) {
      // Vertical swipe
      movePlayer(0, dy > 0 ? 1 : -1);
    }

    setTouchStart(null);
  };

  // Click/tap on adjacent cells for mobile
  const handleCellClick = (x: number, y: number) => {
    if (isCompleting) return;
    
    setShowInstructions(false);
    
    const dx = x - playerPos.x;
    const dy = y - playerPos.y;

    // Only move if adjacent (not diagonal)
    if ((Math.abs(dx) === 1 && dy === 0) || (Math.abs(dy) === 1 && dx === 0)) {
      movePlayer(dx, dy);
    }
  };

  useEffect(() => {
    // Hide instructions after 5 seconds
    const timer = setTimeout(() => setShowInstructions(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#FDFBF7] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 border-2 border-[#E8C5C8] rounded-full" />
        <div className="absolute bottom-10 right-10 w-56 h-56 border-2 border-[#C5A059] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 z-10"
      >
        <h2 className="font-serif text-2xl md:text-3xl text-[#800020] mb-2">
          Help Ahmed Find Nada
        </h2>
        <p className="font-arabic text-xl md:text-2xl text-[#C5A059]" dir="rtl">
          ساعد أحمد ليصل إلى ندى
        </p>
      </motion.div>

      {/* Instructions */}
      {showInstructions && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-24 left-1/2 -translate-x-1/2 bg-glassmorphism 
                   px-6 py-3 rounded-full border border-[#C5A059]/30 z-20
                   flex items-center gap-2 shadow-lg"
        >
          <Navigation className="w-4 h-4 text-[#C5A059]" />
          <span className="text-sm text-[#6B6B6B]">
            Use arrow keys or swipe to move
          </span>
        </motion.div>
      )}

      {/* Maze container */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative bg-white/50 backdrop-blur-sm p-4 md:p-8 rounded-2xl 
                 shadow-2xl border border-[#E5DFD4]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="grid gap-1 bg-[#F5F1E8] p-2 rounded-xl"
          style={{
            gridTemplateColumns: `repeat(${MAZE_LAYOUT[0].length}, ${CELL_SIZE}px)`,
          }}
        >
          {MAZE_LAYOUT.map((row, y) =>
            row.map((cell, x) => {
              const isPlayer = playerPos.x === x && playerPos.y === y;
              const isEnd = endPos.x === x && endPos.y === y;
              const isWallCell = cell === 1;

              return (
                <motion.div
                  key={`${x}-${y}`}
                  onClick={() => handleCellClick(x, y)}
                  className={`
                    relative flex items-center justify-center rounded
                    ${isWallCell 
                      ? 'bg-gradient-to-br from-[#E5DFD4] to-[#D5CFC4] cursor-not-allowed' 
                      : 'bg-[#FDFBF7] cursor-pointer hover:bg-[#F5F1E8] transition-colors'
                    }
                  `}
                  style={{
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                  }}
                  whileHover={!isWallCell ? { scale: 1.05 } : {}}
                >
                  {/* End position (Nada) */}
                  {isEnd && !isPlayer && (
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <Heart
                        className="w-6 h-6 text-[#E8C5C8]"
                        fill="currentColor"
                      />
                    </motion.div>
                  )}

                  {/* Player (Ahmed) */}
                  {isPlayer && (
                    <motion.div
                      layoutId="player"
                      className="absolute inset-0 flex items-center justify-center"
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      {isCompleting ? (
                        // Winning animation: hearts merge
                        <motion.div
                          animate={{
                            scale: [1, 1.5, 1],
                            rotate: [0, 360],
                          }}
                          transition={{ duration: 1 }}
                        >
                          <div className="relative">
                            <Heart
                              className="w-7 h-7 text-[#800020]"
                              fill="currentColor"
                            />
                            <Heart
                              className="w-5 h-5 text-[#E8C5C8] absolute top-1/2 left-1/2 
                                       -translate-x-1/2 -translate-y-1/2"
                              fill="currentColor"
                            />
                          </div>
                        </motion.div>
                      ) : (
                        <div className="w-8 h-8 bg-[#800020] rounded-full shadow-lg 
                                      flex items-center justify-center">
                          <Heart className="w-4 h-4 text-[#FDFBF7]" fill="currentColor" />
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      </motion.div>

      {/* Mobile direction buttons */}
      <div className="md:hidden mt-8 grid grid-cols-3 gap-2">
        <div />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => movePlayer(0, -1)}
          className="w-12 h-12 bg-glassmorphism rounded-full flex items-center 
                   justify-center border border-[#C5A059]/30 shadow-md"
          disabled={isCompleting}
        >
          ↑
        </motion.button>
        <div />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => movePlayer(-1, 0)}
          className="w-12 h-12 bg-glassmorphism rounded-full flex items-center 
                   justify-center border border-[#C5A059]/30 shadow-md"
          disabled={isCompleting}
        >
          ←
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => movePlayer(0, 1)}
          className="w-12 h-12 bg-glassmorphism rounded-full flex items-center 
                   justify-center border border-[#C5A059]/30 shadow-md"
          disabled={isCompleting}
        >
          ↓
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => movePlayer(1, 0)}
          className="w-12 h-12 bg-glassmorphism rounded-full flex items-center 
                   justify-center border border-[#C5A059]/30 shadow-md"
          disabled={isCompleting}
        >
          →
        </motion.button>
      </div>

      {/* Completion overlay */}
      {isCompleting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-[#FDFBF7]/80 backdrop-blur-sm 
                   flex items-center justify-center z-30"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
            }}
            className="text-center"
          >
            <Heart className="w-24 h-24 mx-auto mb-4 text-[#800020]" fill="currentColor" />
            <h3 className="font-serif text-3xl text-[#800020]">
              Together at Last!
            </h3>
            <p className="font-arabic text-2xl text-[#C5A059] mt-2" dir="rtl">
              معاً أخيراً!
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
