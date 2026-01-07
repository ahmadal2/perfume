import React, { useMemo } from 'react';
import { motion, useTransform } from 'framer-motion';

interface GlassBottleProps {
    color: string;
    liquidColor: string;
    height: number;
    width: number;
    slosh: any;
    mouseX?: any;
    mouseY?: any;
}

export const GlassBottle: React.FC<GlassBottleProps> = ({ color, liquidColor, height, width, slosh, mouseX, mouseY }) => {
    return (
        <div
            className="relative flex flex-col items-center"
            style={{ height, width }}
        >
            {/* Premium Cap (2026 Edition) */}
            <div className="w-[40%] h-[12%] relative z-20 group/cap">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#4a4a4a] to-[#0a0a0a] rounded-t-sm shadow-2xl overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10" />
                    <div className="absolute inset-0 border-x border-t border-white/5" />
                    {/* Engraving */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-40">
                        <div className="w-1/2 h-px bg-white/20" />
                    </div>
                </div>
                {/* Glow behind cap */}
                <div className="absolute -inset-4 bg-blue-500/10 blur-xl opacity-0 group-hover/cap:opacity-100 transition-opacity" />
            </div>

            {/* Neck - Transition */}
            <div className="w-[28%] h-[6%] relative z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/40 to-white/10 backdrop-blur-md border-x border-white/20" />
            </div>

            {/* Main Master Body */}
            <div className="relative w-full h-[82%] rounded-[2.5rem] overflow-hidden border border-white/30 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] backdrop-blur-[2px] group/glass transition-transform duration-700">

                {/* 1. Base Glass Material (Thick Wall Effect) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 z-30 pointer-events-none" />
                <div className="absolute inset-x-2 inset-y-4 border-2 border-white/5 rounded-[2rem] z-30 pointer-events-none" />

                {/* 2. Internal Refraction Layer (Blurry Depth) */}
                <div className="absolute inset-2 bg-white/5 backdrop-blur-sm rounded-[2rem]" />

                {/* 3. Liquid Simulation (Volumetric) */}
                <motion.div
                    className="absolute inset-0 bottom-0 pointer-events-none z-10 overflow-hidden"
                    style={{
                        backgroundColor: liquidColor,
                        opacity: 0.7,
                        y: "35%", // fill level
                    }}
                >
                    {/* sloshing surface */}
                    <motion.svg
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
                        className="absolute top-0 left-0 w-full h-[40px] -translate-y-full fill-current filter drop-shadow-[0_-5px_15px_rgba(255,255,255,0.2)]"
                        style={{ color: liquidColor }}
                    >
                        <motion.path
                            d="M 0 10 Q 25 20 50 10 T 100 10 L 100 20 L 0 20 Z"
                            style={{ d: slosh }}
                        />
                    </motion.svg>

                    {/* Internal Volumetric Glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10" />
                    <motion.div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-blue-400/20 blur-[40px]"
                        animate={{ opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                </motion.div>

                {/* 4. Luxury Branding Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-40 pointer-events-none">
                    <motion.div
                        className="w-1/2 aspect-square flex flex-col items-center justify-center bg-black/50 backdrop-blur-2xl border border-white/20 rounded-lg shadow-2xl p-4"
                        animate={{
                            boxShadow: ["0 0 20px rgba(59,130,246,0.1)", "0 0 40px rgba(59,130,246,0.2)", "0 0 20px rgba(59,130,246,0.1)"]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        <span className="text-[10px] tracking-[0.8em] font-black text-white italic uppercase mb-2">ROYALE</span>
                        <div className="w-8 h-px bg-blue-500/50" />
                        <span className="text-[6px] tracking-[0.4em] font-light text-white/60 uppercase mt-2 font-serif italic">MAESTRO</span>
                    </motion.div>
                </div>

                {/* 5. Dynamic Caustics/Reflections */}
                <div className="absolute inset-0 z-50 pointer-events-none">
                    {/* Main reflection streak */}
                    <div className="absolute top-0 left-[10%] w-[15%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent blur-[2px] skew-x-[-15deg]" />
                    {/* Right edge rim light */}
                    <div className="absolute inset-y-0 right-1 w-2 bg-gradient-to-l from-white/20 to-transparent blur-[1px]" />
                </div>
            </div>

            {/* Floor Shadow & Reflection */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[120%] h-12 bg-black/40 blur-3xl opacity-60 rounded-full" />
        </div>
    );
};
