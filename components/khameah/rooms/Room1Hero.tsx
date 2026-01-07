// Room1Hero.tsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const Room1Hero: React.FC = () => {
    const bgRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 30;
            const y = (clientY / window.innerHeight - 0.5) * 30;

            if (bgRef.current) {
                gsap.to(bgRef.current, {
                    x: x * 0.5,
                    y: y * 0.5,
                    duration: 1,
                    ease: 'power2.out'
                });
            }
            if (logoRef.current) {
                gsap.to(logoRef.current, {
                    x: -x,
                    y: -y,
                    duration: 1.5,
                    ease: 'power3.out'
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#000512]">
            {/* Cinematic Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover scale-110 opacity-40 grayscale-[0.3]"
                    poster="/imag/khm-poster.jpg"
                >
                    <source src="/imag/khm-ved.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Particle Overlay / Vignette */}
            <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,#000512_100%)] opacity-80" />

            <div className="relative z-20 flex flex-col items-center">
                <motion.div
                    ref={logoRef}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center gap-6"
                >
                    <div className="w-16 h-16 border-2 border-blue-500 rounded-full flex items-center justify-center shadow-[0_0_30px_#3b82f6]">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                    </div>
                    <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter text-white uppercase text-center leading-[0.8]">
                        Khamrah
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-12 flex flex-col items-center gap-4"
                >
                    <span className="text-[10px] uppercase font-black tracking-[1em] text-blue-400">Where Scent Becomes Story</span>
                    <div className="w-px h-24 bg-gradient-to-b from-blue-500 to-transparent animate-bounce mt-8" />
                </motion.div>
            </div>

            {/* Floating Dust Particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/10 rounded-full z-10"
                    initial={{
                        x: Math.random() * 2000 - 1000,
                        y: Math.random() * 1000 - 500,
                        opacity: 0
                    }}
                    animate={{
                        y: '-=100',
                        opacity: [0, 0.2, 0]
                    }}
                    transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
};

export default Room1Hero;
