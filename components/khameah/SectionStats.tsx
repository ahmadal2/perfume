import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { api } from '../../services/apiService';
import { DashboardStats } from '../../types';

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
            <div className="space-y-4 md:space-y-6">
                <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic serif leading-tight">
                    Fortune <span className="text-blue-500 not-italic font-sans">Favors</span> <br className="sm:hidden" /> The Scented
                </h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-white/30 font-mono text-[10px] sm:text-sm md:text-lg tracking-[0.3em] md:tracking-[0.5em] uppercase"
                >
                    May your signature fragrance lead you to destiny.
                </motion.p>
            </div>
        </div>
    );
};

const SectionStats: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);

    useEffect(() => {
        api.getDashboardStats().then(setStats).catch(console.error);
    }, []);

    return (
        <section className="relative py-40 md:py-60 bg-[#0a0a0a] border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-10 text-center">
                <CountUp to={15} label="Countries We Ship To" />
                <CountUp to={stats?.activeUsers || 1200} label="Active Visitors" suffix="+" duration={2.5} />
                <CountUp to={100} label="Unique Scents" suffix="%" />
            </div>
        </section>
    );
};

export default SectionStats;
