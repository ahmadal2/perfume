'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface LoadingPageProps {
  onComplete: () => void;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [progress, setProgress] = useState(0);
  const [glassHeat, setGlassHeat] = useState(0);

  const onCompleteRef = React.useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const s1 = setTimeout(() => setStage(1), 800);
    const s2 = setTimeout(() => setStage(2), 1800);
    const s3 = setTimeout(() => setStage(3), 3500);
    const s4 = setTimeout(() => {
      setStage(4);
      onCompleteRef.current();
    }, 5000);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 2;
        return next > 100 ? 100 : next;
      });
    }, 100);

    return () => {
      clearTimeout(s1);
      clearTimeout(s2);
      clearTimeout(s3);
      clearTimeout(s4);
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    const heatInterval = setInterval(() => {
      setGlassHeat(prev => {
        if (stage !== 3) return 0;
        return Math.min(prev + 5, 100);
      });
    }, 40);

    return () => clearInterval(heatInterval);
  }, [stage]);

  const heatParticles = useMemo(() => Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    delay: Math.random() * 0.8,
    duration: 0.6 + Math.random() * 0.6,
    left: 15 + Math.random() * 70,
    drift: (Math.random() - 0.5) * 100
  })), []);

  const bubbles = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    delay: Math.random() * 1,
    duration: 0.5 + Math.random() * 0.8,
    left: 5 + Math.random() * 90
  })), []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(50px)', scale: 1.15 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden transition-colors duration-1000 ${stage === 3 ? 'bg-[#3d0505]' : 'bg-[#010512]'
        }`}
    >
      {/* Cinematic Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.3] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[160px] transition-all duration-1000 mix-blend-screen ${stage === 3 ? 'bg-red-600 scale-150 opacity-40' : 'bg-blue-600 opacity-20'
            }`}
        />
      </div>

      {/* Stage 0: Initial Energy Hub */}
      <AnimatePresence>
        {stage === 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 5, opacity: 0, filter: 'blur(30px)' }}
            className="w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_40px_rgba(96,165,250,1)]"
            style={{ animation: 'pulse-dot 0.8s infinite' }}
          />
        )}
      </AnimatePresence>

      {/* Main Experience Visuals */}
      {stage > 0 && stage < 4 && (
        <div className="relative flex flex-col items-center">

          <motion.div
            initial={{ scale: 0, rotate: -270, opacity: 0, filter: 'blur(30px)' }}
            animate={{ scale: 1, rotate: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center"
            style={stage === 3 ? {
              transform: `scale(${1 + glassHeat * 0.003}) rotate(${Math.sin(glassHeat / 5) * 5}deg)`,
              filter: `blur(${glassHeat * 0.03}px) brightness(${1 + glassHeat * 0.006})`
            } : {}}
          >
            {/* Heat Distortion Layer */}
            {stage === 3 && (
              <div className="absolute inset-[-100px] opacity-60 pointer-events-none"
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255, 40, 0, 0.15) 1px, rgba(255, 40, 0, 0.15) 2px)',
                  animation: 'heat-wave 1s linear infinite'
                }}
              />
            )}

            {/* Bottle Components */}
            <motion.div
              animate={stage === 3 ? { y: -80, opacity: 0, filter: 'blur(20px)', scale: 0.4 } : {}}
              className="relative z-20 flex flex-col items-center"
            >
              <div className="w-16 h-4 bg-gradient-to-r from-[#0a1b4d] via-[#1e3a8a] to-[#0a1b4d] rounded-t-2xl shadow-lg" />
              <div className="w-20 h-14 bg-gradient-to-b from-[#1e3a8a] to-[#020617] rounded-2xl border border-white/10 relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
              </div>
            </motion.div>

            <div className="w-18 h-16 bg-gradient-to-b from-blue-400/40 to-transparent backdrop-blur-xl -mt-2"
              style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)' }} />

            <div className={`relative w-40 h-64 -mt-2 rounded-[3rem] backdrop-blur-3xl border transition-all duration-1500 overflow-hidden ${stage === 3 ? 'border-red-500/70 shadow-[0_0_100px_rgba(239,68,68,0.5)]' : 'border-blue-500/40 shadow-2xl'
              }`}>
              <div className={`absolute inset-0 transition-all duration-2000 ${stage === 3
                ? 'bg-gradient-to-t from-red-950 via-red-600 to-yellow-300 h-full'
                : 'bg-gradient-to-t from-blue-950 via-blue-800 to-blue-400 h-full opacity-95'
                }`}>
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white/20 to-transparent opacity-70"
                  style={{ animation: 'ripple 0.6s ease-in-out infinite' }} />

                {stage === 3 && bubbles.map(b => (
                  <div key={b.id} className="absolute w-3 h-3 bg-white/50 rounded-full blur-[0.5px]"
                    style={{
                      left: `${b.left}%`, bottom: '-20px',
                      animation: `bubble ${b.duration}s ${b.delay}s ease-in infinite`
                    }}
                  />
                ))}
              </div>

              <div className="absolute inset-0 z-10" style={{ animation: 'shimmer-slow 1.2s linear infinite' }}>
                <div className="h-full w-20 bg-white/15 skew-x-[-25deg]" />
              </div>

              {stage === 3 && glassHeat > 10 && (
                <>
                  <div className="absolute top-16 left-8 h-px bg-white/80 rotate-[35deg]" style={{ animation: 'crack-appear 0.3s forwards', '--final-width': '90px' } as any} />
                  <div className="absolute top-44 right-8 h-px bg-white/80 -rotate-[20deg]" style={{ animation: 'crack-appear 0.3s 0.2s forwards', '--final-width': '70px' } as any} />
                  <div className="absolute bottom-20 left-1/2 h-px bg-white/60 rotate-90" style={{ animation: 'crack-appear 0.3s 0.4s forwards', '--final-width': '50px' } as any} />
                </>
              )}

              <div className="absolute top-0 left-4 w-5 h-full bg-gradient-to-r from-white/20 to-transparent blur-2xl" />

              <motion.div
                animate={stage === 3 ? { opacity: 0, scale: 0.6, filter: 'blur(15px)', y: 30 } : {}}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-20 bg-black/50 backdrop-blur-3xl rounded-3xl border border-blue-500/20 flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              >
                <span className="text-3xl font-black tracking-[0.4em] text-blue-400 serif italic">K</span>
              </motion.div>
            </div>

            {stage === 3 && heatParticles.map(p => (
              <div key={p.id} className="absolute w-2.5 h-2.5 bg-orange-500/90 rounded-full blur-[2px]"
                style={{
                  left: `${p.left}%`, bottom: '30px',
                  animation: `heat-particle ${p.duration}s ${p.delay}s ease-out infinite`,
                  '--drift': `${p.drift}px`
                } as any}
              />
            ))}

            {stage === 3 && glassHeat > 40 && (
              <>
                <div className="absolute bottom-0 left-10 w-3 bg-gradient-to-b from-orange-800 to-transparent" style={{ animation: 'drip 1s ease-in infinite' }} />
                <div className="absolute bottom-0 right-16 w-2 bg-gradient-to-b from-yellow-500 to-transparent" style={{ animation: 'drip 1.2s 0.1s ease-in infinite' }} />
              </>
            )}

            {stage === 3 && (
              <div className="absolute inset-0 border-[6px] border-orange-500/60 rounded-[3rem] z-[5] blur-[4px]" style={{ animation: 'fire-pulse 0.5s ease-in-out infinite' }} />
            )}
          </motion.div>

          {/* Dynamic Typography */}
          <div className="mt-16 text-center relative h-32 w-screen px-4">
            <AnimatePresence mode="wait">
              {stage < 3 ? (
                <motion.div
                  key="khamrah-reveal"
                  initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.8, filter: 'blur(30px)', y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <h1 className="text-7xl md:text-[9rem] font-black tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-blue-400 to-blue-100 uppercase serif italic text-glow leading-none">
                    KHAMRAH
                  </h1>
                  <div className="flex items-center gap-8 mt-10 opacity-50">
                    <div className="h-px w-24 bg-blue-500/40" />
                    <span className="text-[12px] uppercase tracking-[0.8em] text-blue-400 font-black whitespace-nowrap">Distilled In Paris</span>
                    <div className="h-px w-24 bg-blue-500/40" />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="fever-reveal"
                  initial={{ opacity: 0, scale: 1.4, filter: 'blur(30px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex flex-col items-center"
                  style={{ animation: 'text-heat 0.8s ease-in-out infinite' }}
                >
                  <h1 className="text-7xl md:text-[9rem] font-black tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-600 to-yellow-400 uppercase serif italic text-glow leading-none">
                    FEVER
                  </h1>
                  <div className="flex items-center gap-8 mt-10 animate-pulse">
                    <div className="h-px w-24 bg-red-600/60" />
                    <span className="text-[12px] uppercase tracking-[0.8em] text-red-500 font-black whitespace-nowrap">Burning Passion</span>
                    <div className="h-px w-24 bg-red-600/60" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Progress Monitor */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-[340px] md:w-[450px] space-y-5 px-8">
        <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className={`h-full transition-all duration-300 ${stage === 3 ? 'bg-gradient-to-r from-red-600 via-orange-600 to-yellow-500' : 'bg-blue-600'
              }`}
          />
        </div>
        <div className="flex justify-between items-center tabular-nums">
          <span className="text-[9px] uppercase tracking-[1em] text-white/20 font-black">Archive Distillation</span>
          <span className={`text-[14px] font-black ${stage === 3 ? 'text-orange-500' : 'text-blue-500'}`}>{Math.floor(progress)}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingPage;
