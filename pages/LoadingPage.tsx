
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
  const stageRef = React.useRef(stage);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  useEffect(() => {
    const s1 = setTimeout(() => setStage(1), 800);
    const s2 = setTimeout(() => setStage(2), 2000);
    const s3 = setTimeout(() => setStage(3), 3500);
    const s4 = setTimeout(() => {
      setStage(4);
      onCompleteRef.current(); // Automatic redirection after 5 seconds
    }, 5000);

    // Precise progress update: 100% / 5 seconds = 2% every 100ms
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 2;
        return next > 100 ? 100 : next;
      });
    }, 100);

    const heatInterval = setInterval(() => {
      setGlassHeat(prev => {
        if (stageRef.current !== 3) return 0;
        return Math.min(prev + 8, 100);
      });
    }, 40);

    return () => {
      clearTimeout(s1);
      clearTimeout(s2);
      clearTimeout(s3);
      clearTimeout(s4);
      clearInterval(progressInterval);
      clearInterval(heatInterval);
    };
  }, []); // Run only on mount

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
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden transition-colors duration-1000 ${stage === 3 ? 'bg-[#0a0a0a]' : 'bg-black'
        }`}
    >
      {/* Cinematic Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[160px] transition-all duration-1000 mix-blend-screen ${stage === 3 ? 'bg-amber-900 scale-150 opacity-40' : 'bg-amber-600 opacity-20'
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
            className="w-4 h-4 bg-amber-400 rounded-full shadow-[0_0_40px_rgba(251,191,36,1)]"
            style={{ animation: 'pulse-dot 0.8s infinite' }}
          />
        )}
      </AnimatePresence>

      {/* Main Experience Visuals */}
      {stage > 0 && stage < 4 && (
        <div className="relative w-full h-full flex flex-col items-center justify-center z-20">

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
              {/* Energy Distortion Layer */}
              {stage === 3 && (
                <div className="absolute inset-[-100px] opacity-60 pointer-events-none"
                  style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(251, 191, 36, 0.15) 1px, rgba(251, 191, 36, 0.15) 2px)',
                    animation: 'heat-wave 1s linear infinite'
                  }}
                />
              )}

              {/* Advanced Perfume Bottle (Framer Motion Enhanced) */}
              <motion.div
                animate={stage === 3 ? { y: -80, opacity: 0, filter: 'blur(20px)', scale: 0.4 } : {}}
                className="relative z-20 flex flex-col items-center"
              >
                <div className="relative w-64 h-96">
                  {/* Floating Glow Background */}
                  <motion.div
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -inset-10 bg-blue-600/10 rounded-full blur-[60px]"
                  />

                  {/* Main Bottle Container */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-full h-full"
                  >
                    {/* Glass Cap */}
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      className="absolute inset-x-12 top-0 h-16 bg-gradient-to-br from-white/20 via-blue-200/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-xl overflow-hidden"
                    >
                      {/* Cap Pattern */}
                      <div className="absolute inset-0 flex">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div key={i} className="h-full w-px bg-white/10 mx-auto transform skew-x-[-20deg]" />
                        ))}
                      </div>
                      {/* Gold Cap Base */}
                      <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 border-t border-amber-300/30 shadow-[0_-2px_10px_rgba(251,191,36,0.2)]" />
                    </motion.div>

                    {/* Glass Body */}
                    <div className="absolute inset-x-6 top-16 bottom-0 bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-md border border-white/20 shadow-2xl overflow-hidden group">
                      {/* Liquid Fill (SAPPHIRE BLUE) */}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${progress}%` }}
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-700 via-blue-500 to-blue-400/80 shadow-[inset_0_4px_20px_rgba(255,255,255,0.2)] transition-all duration-300"
                      >
                        {/* Liquid Wake/Wave */}
                        <motion.div
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                        />
                        {/* Internal Bubbles */}
                        {bubbles.map(b => (
                          <motion.div
                            key={b.id}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                              opacity: [0, 0.4, 0],
                              scale: [0.5, 1, 0.5],
                              y: ["100%", "-20%"]
                            }}
                            transition={{
                              duration: b.duration * 2,
                              repeat: Infinity,
                              delay: b.delay
                            }}
                            style={{ left: `${b.left}%` }}
                            className="absolute w-1 h-1 bg-white rounded-full blur-[0.5px]"
                          />
                        ))}
                      </motion.div>

                      {/* Gold Central Label */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: progress > 30 ? 1 : 0, opacity: progress > 30 ? 1 : 0 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-20 bg-gradient-to-br from-amber-500 via-amber-300 to-amber-700 border border-amber-200/50 shadow-2xl flex items-center justify-center z-10"
                      >
                        <div className="text-center">
                          <span className="block text-[10px] uppercase tracking-[0.4em] text-amber-950 font-black">KHAMEAH</span>
                          <div className="h-px w-8 bg-amber-950/20 mx-auto my-1" />
                          <span className="block text-[6px] uppercase tracking-[0.2em] text-amber-900/60 font-bold">Paris • Dubai</span>
                        </div>
                      </motion.div>

                      {/* Glass Shine */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                    </div>
                  </motion.div>

                  {/* Sparkling particles around glass */}
                  {progress > 50 && (
                    <div className="absolute inset-0 pointer-events-none">
                      {Array.from({ length: 15 }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
                          className="absolute w-0.5 h-0.5 bg-blue-300 rounded-full blur-[0.5px]"
                          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Inner Flow effect particles */}
              {stage === 3 && bubbles.map(b => (
                <div key={b.id} className="absolute w-2 h-2 bg-amber-400/60 rounded-full blur-[0.5px]"
                  style={{
                    left: `${b.left}%`, bottom: '20%',
                    animation: `bubble ${b.duration}s ${b.delay}s ease-in infinite`
                  } as any}
                />
              ))}

              {stage === 3 && (
                <div className="absolute inset-0 border-[6px] border-amber-500/40 rounded-[3rem] z-[5] blur-[4px]" style={{ animation: 'fire-pulse 0.5s ease-in-out infinite' }} />
              )}
            </motion.div>

            {/* Dynamic Typography - Moved to absolute to keep bottle centered */}
            <div className="absolute top-[105%] left-1/2 -translate-x-1/2 text-center w-screen px-4">
              <AnimatePresence mode="wait">
                {stage < 3 ? (
                  <motion.div
                    key="brand-reveal"
                    initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.8, filter: 'blur(30px)', y: -30 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center"
                  >
                    <h1 className="text-3xl md:text-8xl font-black tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-400 to-amber-100 uppercase serif italic text-glow leading-none">
                      KHAMRAH
                    </h1>
                    <div className="flex items-center gap-4 md:gap-8 mt-4 md:mt-10 opacity-50 scale-75 md:scale-100">
                      <div className="h-px w-12 md:w-24 bg-amber-500/40" />
                      <span className="text-[8px] md:text-[12px] uppercase tracking-[0.4em] md:tracking-[0.8em] text-amber-400 font-black whitespace-nowrap">The Essence of Amber</span>
                      <div className="h-px w-12 md:w-24 bg-amber-500/40" />
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
                    <h1 className="text-3xl md:text-8xl font-black tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-400 to-amber-600 uppercase serif italic text-glow leading-none">
                      FEVER
                    </h1>
                    <div className="flex items-center gap-4 md:gap-8 mt-4 md:mt-10 animate-pulse scale-75 md:scale-100">
                      <div className="h-px w-12 md:w-24 bg-red-600/60" />
                      <span className="text-[8px] md:text-[12px] uppercase tracking-[0.4em] md:tracking-[0.8em] text-orange-500 font-black whitespace-nowrap">Distilled In Paris</span>
                      <div className="h-px w-12 md:w-24 bg-red-600/60" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      {/* Progress Monitor */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-[340px] md:w-[450px] space-y-5 px-8 z-30">
        <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className={`h-full transition-all duration-300 ${stage === 3 ? 'bg-gradient-to-r from-amber-600 via-orange-500 to-red-600' : 'bg-amber-600'
              }`}
          />
        </div>
        <div className="flex justify-between items-center tabular-nums">
          <span className="text-[9px] uppercase tracking-[1em] text-white/20 font-black">Distillation Progress</span>
          <span className={`text-[14px] font-black ${stage === 3 ? 'text-orange-500' : 'text-amber-500'}`}>{Math.floor(progress)}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingPage;
