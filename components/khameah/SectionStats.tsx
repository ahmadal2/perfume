import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

interface CountUpProps {
    to: number;
    label: string;
    suffix?: string;
    duration?: number;
}

const CountUp: React.FC<CountUpProps> = ({ to, label, suffix = "", duration = 2 }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => {
        if (to >= 1000) {
            return Math.round(latest).toLocaleString();
        }
        return Math.round(latest);
    });
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, to, {
                duration,
                ease: [0.22, 1, 0.36, 1],
            });
            return controls.stop;
        }
    }, [isInView, count, to, duration]);

    return (
        <div ref={ref} className="flex flex-col items-center gap-2">
            <div className="text-5xl md:text-8xl font-black text-blue-500 tracking-tighter">
                <motion.span>{rounded as any}</motion.span>{suffix}
            </div>
            <span className="text-white/40 font-mono text-[10px] md:text-xs uppercase tracking-[0.5em]">
                {label}
            </span>
        </div>
    );
};

const SectionStats: React.FC = () => {
    return (
        <section className="relative py-40 md:py-60 bg-[#0a0a0a] border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-10 text-center">
                <CountUp to={15} label="Countries We Ship To" />
                <CountUp to={50000} label="Happy Customers" suffix="+" duration={2.5} />
                <CountUp to={100} label="Unique Scents" suffix="%" />
            </div>
        </section>
    );
};

export default SectionStats;
