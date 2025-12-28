"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";

interface KineticStatsProps {
    value: number;
    suffix?: string;
    label: string;
    duration?: number;
}

export const KineticStats: React.FC<KineticStatsProps> = ({ value, suffix = "", label, duration = 2 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const springValue = useSpring(count, { stiffness: 20, damping: 10 });

    useEffect(() => {
        if (isInView) {
            count.set(value);
        }
    }, [isInView, value, count]);

    return (
        <div ref={ref} className="relative flex flex-col items-start text-left p-6">
            {/* Background Index */}
            <div className="absolute -top-4 -left-2 text-[120px] font-black text-blue-500/5 select-none pointer-events-none tracking-tighter">
                {value.toString().padStart(2, '0')}
            </div>

            <div className="relative z-10 flex items-baseline">
                <motion.span className="text-6xl md:text-7xl font-mono font-black text-white tracking-tighter glow-text-sapphire">
                    {rounded}
                </motion.span>
                {suffix && (
                    <span className="text-xl md:text-2xl font-mono text-blue-400/60 ml-1">{suffix}</span>
                )}
            </div>
            <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 0.8, x: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative z-10 text-[11px] font-mono uppercase tracking-[0.4em] text-blue-100/40 mt-2"
            >
                {label}
            </motion.span>
        </div>
    );
};
