
"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
    src: string;
    index: number;
    total: number;
    phase: AnimationPhase;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
    // Fix: Added optional key to props interface
    key?: React.Key;
}

// --- FlipCard Component ---
const IMG_WIDTH = 60;  
const IMG_HEIGHT = 85; 

function FlipCard({
    src,
    index,
    target,
}: FlipCardProps) {
    // Cast motion components to any to bypass type errors
    const MotionDiv = motion.div as any;

    return (
        <MotionDiv
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{
                type: "spring",
                stiffness: 40,
                damping: 15,
            }}
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d",
            }}
            className="cursor-pointer group"
        >
            <MotionDiv
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: 180 }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-2xl bg-zinc-900 border border-white/5"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <img
                        src={src}
                        alt={`hero-${index}`}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-transparent" />
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-black flex flex-col items-center justify-center p-4 border border-[#D4AF37]/30"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="text-center">
                        <p className="text-[6px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mb-1">Archive</p>
                        <p className="text-[10px] font-medium text-white tracking-widest uppercase">Essence</p>
                    </div>
                </div>
            </MotionDiv>
        </MotionDiv>
    );
}

// --- Main Hero Component ---
const TOTAL_IMAGES = 20;
const MAX_SCROLL = 2500; 

// High-end perfume imagery
const IMAGES = [
    "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=300&q=80",
    "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=300&q=80",
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300&q=80",
    "https://images.unsplash.com/photo-1544413647-b51046402840?w=300&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
    "https://images.unsplash.com/photo-1583445013765-48c22001c51e?w=300&q=80",
    "https://images.unsplash.com/photo-1557170334-a7c3c4675830?w=300&q=80",
    "https://images.unsplash.com/photo-1590736704728-f4730bb3c3af?w=300&q=80",
    "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=300&q=80",
    "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=300&q=80",
    "https://images.unsplash.com/photo-1512789675414-06b26bab0a08?w=300&q=80",
    "https://images.unsplash.com/photo-1563170351-be39c88e27ca?w=300&q=80",
    "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=300&q=80",
    "https://images.unsplash.com/photo-1616984242997-5965a04ac246?w=300&q=80",
    "https://images.unsplash.com/photo-1615484477778-ca3b77942123?w=300&q=80",
    "https://images.unsplash.com/photo-1617360547704-3da8b5363369?w=300&q=80",
    "https://images.unsplash.com/photo-1605615843914-eeaba3ed300d?w=300&q=80",
    "https://images.unsplash.com/photo-1592914610354-fd354ea45e44?w=300&q=80",
    "https://images.unsplash.com/photo-1596462502278-27bfad450216?w=300&q=80",
    "https://images.unsplash.com/photo-1555529771-835f59fc5efe?w=300&q=80",
];

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function IntroAnimation() {
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // Cast motion components to any to bypass type errors
    const MotionH1 = motion.h1 as any;
    const MotionP = motion.p as any;
    const MotionDiv = motion.div as any;

    useEffect(() => {
        if (!containerRef.current) return;
        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        };
        const observer = new ResizeObserver(handleResize);
        observer.observe(containerRef.current);
        setContainerSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
        });
        return () => observer.disconnect();
    }, []);

    const virtualScroll = useMotionValue(0);
    const scrollRef = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // Allow horizontal swipe on touchpads
            e.preventDefault();
            const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => container.removeEventListener("wheel", handleWheel);
    }, [virtualScroll]);

    const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

    const scrollRotate = useTransform(virtualScroll, [600, 2500], [0, 360]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const normalizedX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouseX.set(normalizedX * 100);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    useEffect(() => {
        const timer1 = setTimeout(() => setIntroPhase("line"), 500);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, []);

    const scatterPositions = useMemo(() => {
        return IMAGES.map(() => ({
            x: (Math.random() - 0.5) * 1500,
            y: (Math.random() - 0.5) * 1000,
            rotation: (Math.random() - 0.5) * 180,
            scale: 0.6,
            opacity: 0,
        }));
    }, []);

    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const unsubMorph = smoothMorph.on("change", setMorphValue);
        const unsubRotate = smoothScrollRotate.on("change", setRotateValue);
        const unsubParallax = smoothMouseX.on("change", setParallaxValue);
        return () => { unsubMorph(); unsubRotate(); unsubParallax(); };
    }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

    const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
    const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

    return (
        <div ref={containerRef} className="relative w-full h-[600px] bg-[#050505] overflow-hidden rounded-[3rem] border border-white/5">
            <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">

                {/* Intro Text */}
                <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2">
                    <MotionH1
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 1 }}
                        className="text-3xl md:text-5xl font-black serif italic tracking-tighter gold-text"
                    >
                        Legacy in every drop.
                    </MotionH1>
                    <MotionP
                        initial={{ opacity: 0 }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 0.5 - morphValue } : { opacity: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mt-4 text-[10px] font-bold tracking-[0.5em] text-gray-500 uppercase"
                    >
                        SCROLL TO EXPLORE THE VAULT
                    </MotionP>
                </div>

                {/* Arc Content */}
                <MotionDiv
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute top-[12%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
                >
                    <h2 className="text-4xl md:text-6xl serif italic gold-text font-black mb-4">
                        The Olfactory Archive
                    </h2>
                    <p className="text-[10px] md:text-xs text-gray-400 max-w-lg leading-loose uppercase tracking-[0.2em]">
                        Discover a world where craftsmanship meets pure essence. <br />
                        Each bottle in this circle represents a milestone in oriental perfumery.
                    </p>
                </MotionDiv>

                {/* Main Container */}
                <div className="relative flex items-center justify-center w-full h-full">
                    {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => {
                        let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                        if (introPhase === "scatter") {
                            target = scatterPositions[i];
                        } else if (introPhase === "line") {
                            const lineSpacing = 65;
                            const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
                            const lineX = i * lineSpacing - lineTotalWidth / 2;
                            target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
                        } else {
                            const isMobile = containerSize.width < 768;
                            const minDimension = Math.min(containerSize.width, containerSize.height);
                            const circleRadius = Math.min(minDimension * 0.35, 240);

                            const circleAngle = (i / TOTAL_IMAGES) * 360;
                            const circleRad = (circleAngle * Math.PI) / 180;
                            const circlePos = {
                                x: Math.cos(circleRad) * circleRadius,
                                y: Math.sin(circleRad) * circleRadius,
                                rotation: circleAngle + 90,
                            };

                            const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                            const arcRadius = baseRadius * (isMobile ? 1.3 : 1.1);
                            const arcApexY = containerSize.height * (isMobile ? 0.3 : 0.2);
                            const arcCenterY = arcApexY + arcRadius;

                            const spreadAngle = isMobile ? 90 : 120;
                            const startAngle = -90 - (spreadAngle / 2);
                            const step = spreadAngle / (TOTAL_IMAGES - 1);

                            const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                            const maxRotation = spreadAngle * 0.6; 
                            const boundedRotation = -scrollProgress * maxRotation;

                            const currentArcAngle = startAngle + (i * step) + boundedRotation;
                            const arcRad = (currentArcAngle * Math.PI) / 180;

                            const arcPos = {
                                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                                rotation: currentArcAngle + 90,
                                scale: isMobile ? 1.4 : 1.7,
                            };

                            target = {
                                x: lerp(circlePos.x, arcPos.x, morphValue),
                                y: lerp(circlePos.y, arcPos.y, morphValue),
                                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                                scale: lerp(1, arcPos.scale, morphValue),
                                opacity: 1,
                            };
                        }

                        return (
                            <FlipCard
                                key={i}
                                src={src}
                                index={i}
                                total={TOTAL_IMAGES}
                                phase={introPhase}
                                target={target}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
