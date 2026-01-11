import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { GlassBottle } from './ui/glass-bottle';
import WordLoader from './ui/word-loader';

interface PerfumeHeroProps {
    className?: string;
    bottleColor?: string;
    liquidColor?: string;
    bottles?: any[];
}

export const PerfumeHero: React.FC<PerfumeHeroProps> = ({
    className = "",
    bottleColor = "#ffffff",
    liquidColor = "#1e3a8a"
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 35, stiffness: 80, mass: 1.2 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const { left, top, width, height } = containerRef.current.getBoundingClientRect();
            const x = ((e.clientX - left) / width) * 2 - 1;
            const y = ((e.clientY - top) / height) * 2 - 1;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const xTranslate = useTransform(smoothX, (v: number) => v * 40);
    const yTranslate = useTransform(smoothY, (v: number) => v * 20);
    const zRotate = useTransform(smoothX, (v: number) => v * 5);
    const xRotate = useTransform(smoothY, (v: number) => v * -10);
    const yRotate = useTransform(smoothX, (v: number) => v * 20);

    const sloshPath = useTransform(smoothX, (v: number) =>
        `M 0 10 Q 25 ${10 + v * 20} 50 10 T 100 10 L 100 20 L 0 20 Z`
    );

    const backgroundGradient = useTransform(
        [smoothX, smoothY],
        ([x, y]) => `radial-gradient(circle at ${50 + (x as number) * 30}% ${50 + (y as number) * 30}%, #3b82f633 0%, transparent 60%)`
    );

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-[600px] md:h-[750px] overflow-hidden bg-[#020617]/40 flex flex-col justify-center items-center rounded-[5rem] border border-white/5 ${!isMobile ? 'backdrop-blur-2xl shadow-[0_0_100px_rgba(30,58,138,0.2)]' : ''} group ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Atmosphere - Simplified on mobile */}
            <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-blue-900/20 to-transparent opacity-60 ${!isMobile ? 'blur-3xl' : ''}`} />
                {!isMobile && (
                    <motion.div
                        className="absolute inset-0 opacity-40 blur-[150px]"
                        style={{ background: backgroundGradient }}
                    />
                )}
            </div>

            {/* The Master Centerpiece */}
            <motion.div
                style={{
                    x: isMobile ? 0 : xTranslate,
                    y: isMobile ? 0 : yTranslate,
                    rotateX: isMobile ? 0 : xRotate,
                    rotateY: isMobile ? 0 : yRotate,
                    rotateZ: isMobile ? 0 : zRotate,
                    perspective: 2000
                }}
                className="relative z-20 transform-gpu mb-12"
            >
                <motion.div
                    animate={{
                        scale: isHovered ? 1.05 : 1,
                        y: [0, -10, 0],
                    }}
                    transition={{
                        scale: { type: 'spring', stiffness: 100, damping: 20 },
                        y: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
                    }}
                >
                    <GlassBottle
                        color={bottleColor}
                        liquidColor={liquidColor}
                        width={200}
                        height={320}
                        slosh={sloshPath}
                    />
                </motion.div>

                <AnimatePresence>
                    {isHovered && [...Array(8)].map((_, i) => (
                        <Particle key={i} />
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* 2026 Modern Welcome Message with WordLoader */}
            <div className="relative z-30 flex flex-col items-center space-y-6 w-full max-w-xl">
                <div className="flex items-center space-x-4 opacity-30 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500" />
                    <span className="text-[10px] tracking-[0.8em] font-black text-white uppercase italic">Status: Synchronized</span>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-500" />
                </div>

                <WordLoader
                    words={[
                        "Welcome to shop",
                        "Have fun buying",
                        "Your perfume",
                        "Legacy essence",
                    ]}
                    className="scale-110 md:scale-125"
                />

                <div className="pt-8 flex flex-col items-center">
                    <motion.div
                        className="w-px h-12 bg-gradient-to-b from-blue-500/50 to-transparent"
                        animate={{ height: [48, 64, 48], opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <p className="text-[8px] tracking-[0.5em] text-white/20 uppercase font-light mt-4">Olfactory Protocol v2.6</p>
                </div>
            </div>

            {/* Interactive Micro-Labels */}
            <div className="absolute inset-0 pointer-events-none p-10 flex flex-col justify-between">
                <div className="flex justify-between items-start opacity-10 group-hover:opacity-30 transition-opacity">
                    <div className="text-[8px] tracking-[1em] font-black uppercase text-white">GSAP / WORD-LOADER</div>
                    <div className="text-[8px] tracking-[1em] font-black uppercase text-white">AUTH / 2026</div>
                </div>
            </div>
        </div>
    );
};

const Particle: React.FC = () => {
    const randomX = Math.random() * 300 - 150;
    const randomY = Math.random() * 300 - 150;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: randomX,
                y: randomY
            }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
            <Sparkles className="text-blue-300 opacity-40" size={6} />
        </motion.div>
    );
};
