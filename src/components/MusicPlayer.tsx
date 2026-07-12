'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  audioSrc?: string;
  autoPlay?: boolean;
  onAudioUnlocked?: () => void;
}

/**
 * Floating music player with equalizer animation
 * Handles browser autoplay restrictions by waiting for user interaction
 */
export default function MusicPlayer({
  audioSrc = '/music.mp3',
  autoPlay = true,
  onAudioUnlocked,
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Initialize audio element
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;

      // Handle audio end (shouldn't happen with loop, but safety)
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc]);

  const unlockAudio = async () => {
    if (!audioRef.current || isUnlocked) return;

    try {
      // Attempt to play - this unlocks audio context on user interaction
      await audioRef.current.play();
      setIsUnlocked(true);
      setIsPlaying(true);
      onAudioUnlocked?.();
    } catch (error) {
      console.warn('Audio autoplay prevented:', error);
      setIsUnlocked(true); // Mark as unlocked anyway for future attempts
    }
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;

    // First interaction unlocks audio
    if (!isUnlocked) {
      await unlockAudio();
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  };

  // External method to unlock audio (called by envelope click)
  useEffect(() => {
    if (autoPlay && !isUnlocked) {
      unlockAudio();
    }
  }, [autoPlay, isUnlocked]);

  if (!isMounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="group relative w-14 h-14 rounded-full bg-glassmorphism border border-[#C5A059]/20 
                   shadow-lg flex items-center justify-center overflow-hidden
                   hover:border-[#C5A059]/40 transition-colors duration-300"
        aria-label={isPlaying ? 'Mute music' : 'Play music'}
      >
        {/* Ripple effect on hover */}
        <motion.div
          className="absolute inset-0 bg-[#C5A059]/10 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />

        {/* Equalizer bars animation when playing */}
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-0.5 h-5"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-[#C5A059] rounded-full"
                  animate={{
                    height: ['40%', '100%', '60%', '80%', '40%'],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <VolumeX className="w-5 h-5 text-[#800020]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tooltip */}
        <span
          className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-[#2B2B2B] text-[#FDFBF7] 
                     text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity 
                     duration-300 whitespace-nowrap pointer-events-none"
        >
          {isPlaying ? 'Mute Music' : 'Play Music'}
        </span>
      </motion.button>
    </motion.div>
  );
}

/**
 * Hook to imperatively control music player
 */
export function useMusicPlayer() {
  const [controller, setController] = useState<{
    play: () => void;
    pause: () => void;
    toggle: () => void;
  } | null>(null);

  return controller;
}
