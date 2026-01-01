import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { api } from '../../services/apiService';
import { DashboardStats } from '../../types';
import { TrendingUp, Users, Sparkles } from 'lucide-react';

interface CountUpProps {
    to: number;
    label: string;
    suffix?: string;
    duration?: number;
    icon?: React.ReactNode;
    gradient?: string;
}

const CountUp: React.FC<CountUpProps> = ({ to, label, suffix = "", duration = 2, icon, gradient = "from-blue-600 to-purple-600" }) => {
    const count = useMotionValue(0);
    const [displayValue, setDisplayValue] = useState("0");

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        const unsubscribe = count.on("change", (latest) => {
            if (to >= 1000) {
                setDisplayValue(Math.round(latest).toLocaleString());
            } else {
                setDisplayValue(Math.round(latest).toString());
            }
        });

        return unsubscribe;
    }, [count, to]);

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
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.6 }}
            className="group relative"
        >
            {/* Animated Glow */}
            <motion.div
                animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className={`absolute inset-0 bg-gradient-to-r ${gradient} blur-2xl opacity-0 group-hover:opacity-40 transition-opacity rounded-3xl`}
            />

            {/* Glassmorphism Card */}
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 hover:border-white/20 transition-all overflow-hidden">
                {/* Gradient Overlay */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 blur-3xl rounded-full`} />

                {/* Icon */}
                {icon && (
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center mb-4 sm:mb-6`}>
                        {icon}
                    </div>
                )}

                {/* Counter */}
                <div className="relative">
                    <div className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 tabular-nums">
                        {displayValue}
                        <span className="text-2xl sm:text-3xl md:text-4xl">{suffix}</span>
                    </div>
                </div>

                {/* Label */}
                <div className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest font-bold mt-3 sm:mt-4">
                    {label}
                </div>

                {/* Decorative Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
        </motion.div>
    );
};

const SectionStats: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);

    useEffect(() => {
        api.getDashboardStats().then(setStats).catch(console.error);
    }, []);

    return (
        <section className="relative py-20 sm:py-32 md:py-40 bg-gradient-to-b from-black via-blue-950/5 to-black border-y border-white/5 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full" />
            </div>

            {/* Floating Particles */}
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        y: [0, -50, 0],
                        x: [0, Math.random() * 50 - 25, 0]
                    }}
                    transition={{
                        duration: 8 + Math.random() * 4,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                    }}
                    className="absolute w-1 h-1 bg-white/30 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                />
            ))}

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 sm:mb-16 md:mb-20"
                >
                    <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4 sm:mb-6">
                        <span className="text-[8px] sm:text-[10px] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-black uppercase tracking-widest">
                            Our Impact
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                        Crafting Excellence <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Worldwide</span>
                    </h2>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    <CountUp
                        to={15}
                        label="Countries We Ship To"
                        icon={<TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-white" />}
                        gradient="from-purple-600 to-pink-600"
                    />
                    <CountUp
                        to={stats?.activeUsers || 1200}
                        label="Active Visitors"
                        suffix="+"
                        duration={2.5}
                        icon={<Users className="w-6 h-6 sm:w-7 sm:h-7 text-white" />}
                        gradient="from-pink-600 to-orange-600"
                    />
                    <CountUp
                        to={100}
                        label="Unique Scents"
                        suffix="%"
                        icon={<Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />}
                        gradient="from-orange-600 to-purple-600"
                    />
                </div>
            </div>
        </section>
    );
};

export default SectionStats;
