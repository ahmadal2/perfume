import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Search, Box, Anchor, Heart, Sparkles, User, BookOpen } from 'lucide-react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';

// Room Components
import Room1Hero from '../components/khameah/rooms/Room1Hero.tsx';
import Room2Manifesto from '../components/khameah/rooms/Room2Manifesto.tsx';
import Room3Products from '../components/khameah/rooms/Room3Products.tsx';
import Room4Ingredients from '../components/khameah/rooms/Room4Ingredients.tsx';
import Room5Collections from '../components/khameah/rooms/Room5Collections.tsx';
import Room6Stats from '../components/khameah/rooms/Room6Stats.tsx';
import Room7WhyUs from '../components/khameah/rooms/Room7WhyUs.tsx';
import Room8Gateway from '../components/khameah/rooms/Room8Gateway.tsx';

// Global UI
import StructuralGrid from '../components/khameah/StructuralGrid';
import LoadingPage from './LoadingPage';

gsap.registerPlugin(ScrollTrigger);

const KhameahLanding: React.FC = () => {
    const navigate = useNavigate();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const lenisRef = useRef<Lenis | null>(null); // Add lenisRef
    const [activeRoom, setActiveRoom] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0); // Ensure scroll to top on component mount
    }, []);

    // Lenis Smooth Scroll Initialization
    useEffect(() => {
        if (isLoading || isMobile) return;

        const lenis = new Lenis({
            duration: 1.5, // Slightly longer for premium weight
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.1,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Synchronize ScrollTrigger with Lenis
        lenis.on('scroll', ScrollTrigger.update);

        // Unified Ticker Loop (60fps Sync)
        const updateLenis = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(updateLenis);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(updateLenis);
            lenis.destroy();
        };
    }, [isLoading, isMobile]);

    const activeRoomRef = useRef(0);

    // ScrollTrigger Animation & Active Room Tracking
    useEffect(() => {
        const container = containerRef.current;
        const wrapper = wrapperRef.current;
        if (!container || !wrapper || isLoading || isMobile) return;

        const sections = gsap.utils.toArray<HTMLElement>('.room-section');
        const totalSections = sections.length;

        // Reset scroll position on refresh
        window.scrollTo(0, 0);

        // Horizontal Scroll Animation - Target the container for stability
        const scrollTween = gsap.to(container, {
            x: () => -(container.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: wrapper,
                pin: true,
                scrub: 1.2, // Balanced for premium feel and responsiveness
                invalidateOnRefresh: true,
                anticipatePin: 1,
                end: () => `+=${container.scrollWidth}`,
                snap: {
                    snapTo: 1 / (totalSections - 1),
                    duration: { min: 0.5, max: 1.2 },
                    delay: 0.1,
                    ease: "power2.inOut"
                },
                onUpdate: (self) => {
                    const progress = self.progress;
                    setScrollProgress(progress);
                    const newActiveRoom = Math.round(progress * (totalSections - 1));

                    if (newActiveRoom !== activeRoomRef.current) {
                        activeRoomRef.current = newActiveRoom;
                        setActiveRoom(newActiveRoom);
                    }
                }
            }
        });

        const refreshST = () => ScrollTrigger.refresh();
        window.addEventListener('resize', refreshST);

        // Forced refresh after components settled
        const timer = setTimeout(refreshST, 500);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', refreshST);
            if (scrollTween) scrollTween.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [isLoading, isMobile]); // Removed activeRoom from dependencies to stop the loop

    const menuItems = [
        { label: 'Hero', icon: Home, index: 0 },
        { label: 'Philosophy', icon: Anchor, index: 1 },
        { label: 'Collection', icon: Box, index: 2 },
        { label: 'Ingredients', index: 3 },
        { label: 'Galleries', index: 4 },
        { label: 'Impact', index: 5 },
        { label: 'Purity', icon: Heart, index: 6 },
        { label: 'Journey', icon: Sparkles, index: 7 },
    ];

    const scrollToRoom = (index: number) => {
        if (!lenisRef.current) return;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const targetScroll = (index / (menuItems.length - 1)) * totalHeight;
        lenisRef.current.scrollTo(targetScroll, {
            duration: 2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
    };


    const [scrollProgress, setScrollProgress] = useState(0);

    if (isLoading) {
        return <LoadingPage onComplete={() => setIsLoading(false)} />;
    }

    if (isMobile) {
        // You might want a different view for mobile, or keep LoadingPage if it's immersive
        return <div className="h-screen w-screen flex items-center justify-center bg-black text-white p-8 text-center">
            <h2 className="text-2xl font-black uppercase tracking-widest mb-4">Mobile Experience Coming Soon</h2>
            <p className="opacity-50 text-xs tracking-[0.3em]">Please view on desktop for the full cinematic experience.</p>
        </div>;
    }

    return (
        <div
            className="relative min-h-screen bg-[#000512] text-white selection:bg-blue-500/30"
        >
            {/* Quantum Progress Line (Top Edge) */}
            <div className="fixed top-0 left-0 w-full h-[3px] z-[200] bg-white/5">
                <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                    style={{ width: `${scrollProgress * 100}%` }}
                />

                {/* Trailing Glow Effect */}
                <motion.div
                    className="absolute top-0 h-full w-[150px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent blur-md pointer-events-none"
                    style={{ left: `${scrollProgress * 100}%`, transform: 'translateX(-100%)' }}
                />

                {/* Room Markers (Quantum Nodes) */}
                <div className="absolute inset-0 flex justify-between px-1 pointer-events-none">
                    {menuItems.map((_, i) => (
                        <div
                            key={i}
                            className={`relative h-full transition-all duration-1000 ${i <= activeRoom ? 'w-[2px] bg-blue-400 shadow-[0_0_10px_#3b82f6]' : 'w-[1px] bg-white/10'}`}
                        >
                            {i === activeRoom && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[4px] h-[4px] bg-blue-400 rounded-full blur-[2px] animate-pulse" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Background Structure */}
            <div className="fixed inset-0 z-0">
                <StructuralGrid />
            </div>

            {/* Premium Header */}
            <nav className="fixed top-0 left-0 right-0 z-[100] px-12 py-8 flex justify-between items-center pointer-events-none">
                <div className="flex items-center gap-3 pointer-events-auto cursor-pointer" onClick={() => scrollToRoom(0)}>
                    <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6] animate-pulse" />
                    <span className="text-sm font-black tracking-[0.6em] uppercase text-white/90">Khamrah</span>
                </div>

                <div className="flex gap-12 items-center pointer-events-auto">
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="w-14 h-14 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-400 transition-all duration-700 group overflow-hidden"
                    >
                        <Menu size={20} className="group-hover:scale-110 transition-transform" />
                        <div className="absolute inset-0 bg-blue-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>
                </div>
            </nav>

            {/* Side Navigation (Audemars Piguet Inspired) */}
            <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-center gap-12">
                {/* Premium Scale Indicator (The "Sayle" Line) */}
                <div className="absolute -top-32 right-0 w-48 flex flex-col items-end gap-3 pointer-events-none">
                    <div className="flex items-baseline gap-4">
                        <motion.span
                            key={`count-${activeRoom}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-4xl font-black font-mono text-white/90 drop-shadow-2xl"
                        >
                            0{activeRoom + 1}
                        </motion.span>
                        <div className="h-px w-8 bg-blue-500/50" />
                        <span className="text-[10px] font-black font-mono text-white/20">08</span>
                    </div>

                    <div className="relative w-full h-[1px] bg-white/5 overflow-hidden">
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent w-1/2"
                            animate={{
                                x: ['-100%', '200%'],
                                opacity: [0, 1, 0]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                        {/* Shimmering Indicator Line */}
                        <motion.div
                            className="absolute right-0 top-0 h-full bg-blue-500 shadow-[0_0_15px_#3b82f6]"
                            animate={{ width: `${(activeRoom + 1) / 8 * 100}%` }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        />
                    </div>

                    <motion.div
                        key={`label-${activeRoom}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-end text-right"
                    >
                        <span className="text-[8px] font-black uppercase tracking-[0.5em] text-blue-500">Current Phase</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-1 whitespace-nowrap drop-shadow-md">{menuItems[activeRoom].label}</span>
                    </motion.div>
                </div>

                {/* Vertical Progress Rail */}
                <div className="relative flex flex-col items-center gap-6">
                    {/* Background Rail */}
                    <div className="absolute top-0 bottom-0 w-[1px] bg-white/5 left-1/2 -translate-x-1/2" />

                    {/* Active Fill Rail */}
                    <motion.div
                        className="absolute top-0 w-[1px] bg-gradient-to-b from-blue-600 to-blue-400 left-1/2 -translate-x-1/2 shadow-[0_0_10px_#3b82f6]"
                        style={{ height: `${scrollProgress * 100}%` }}
                    />

                    {menuItems.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => scrollToRoom(i)}
                            className="group relative flex items-center justify-center p-2"
                        >
                            {/* Dot / Indicator */}
                            <div className={`relative z-10 transition-all duration-700 ease-[0.16,1,0.3,1] ${activeRoom === i ? "w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_15px_#3b82f6] scale-125" : "w-1 h-1 rounded-full bg-white/20 group-hover:bg-blue-400/50 group-hover:scale-150"}`} />

                            {/* Precise Tooltip on Hover */}
                            <div className="absolute right-10 opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap text-[8px] font-black uppercase tracking-[0.3em] text-white/60 pointer-events-none translate-x-4 group-hover:translate-x-0">
                                {item.label}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Horizontal Scroll Surface */}
            <div ref={wrapperRef} className="relative overflow-hidden">
                <div
                    ref={containerRef}
                    className="flex flex-nowrap w-fit will-change-transform"
                    style={{ height: '100vh' }}
                >
                    <div className="room-section w-screen h-screen flex-shrink-0"><Room1Hero /></div>
                    <div className="room-section w-screen h-screen flex-shrink-0"><Room2Manifesto /></div>
                    <div className="room-section w-screen h-screen flex-shrink-0"><Room3Products /></div>
                    <div className="room-section w-screen h-screen flex-shrink-0"><Room4Ingredients /></div>
                    <div className="room-section w-screen h-screen flex-shrink-0"><Room5Collections /></div>
                    <div className="room-section w-screen h-screen flex-shrink-0"><Room6Stats /></div>
                    <div className="room-section w-screen h-screen flex-shrink-0"><Room7WhyUs /></div>
                    <div className="room-section w-screen h-screen flex-shrink-0"><Room8Gateway /></div>
                </div>
            </div>

            {/* Immersive Overlay Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "circle(0% at 90% 10%)" }}
                        animate={{ opacity: 1, clipPath: "circle(150% at 90% 10%)" }}
                        exit={{ opacity: 0, clipPath: "circle(0% at 90% 10%)" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-12 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] -rotate-45" />
                        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-600/5 blur-[200px]" />

                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="absolute top-12 right-12 w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all duration-500 z-50 group"
                        >
                            <X size={32} className="group-hover:rotate-90 transition-transform duration-500" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-8 max-w-7xl w-full">
                            {menuItems.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + i * 0.05 }}
                                    onClick={() => {
                                        scrollToRoom(i);
                                        setIsMenuOpen(false);
                                    }}
                                    className="group cursor-pointer relative"
                                >
                                    <div className="flex items-center gap-8">
                                        <span className="text-2xl font-mono text-blue-500/20 group-hover:text-blue-500 transition-colors duration-500">0{i + 1}</span>
                                        <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white/10 group-hover:text-white transition-all duration-700 group-hover:pl-4">
                                            {item.label}
                                        </h3>
                                    </div>
                                    <div className="absolute left-0 bottom-0 w-0 h-px bg-gradient-to-r from-blue-600 to-transparent group-hover:w-full transition-all duration-700" />
                                </motion.div>
                            ))}
                        </div>

                        <div className="absolute bottom-16 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-8">
                            <div className="space-y-2">
                                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">The Absolute Archive</p>
                                <p className="text-white/40 font-medium tracking-widest uppercase">Est. 2026 — Khamrah</p>
                            </div>
                            <div className="flex gap-8">
                                {['Instagram', 'Archive', 'Contact'].map(link => (
                                    <span key={link} className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-blue-500 cursor-pointer transition-colors">{link}</span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default KhameahLanding;
