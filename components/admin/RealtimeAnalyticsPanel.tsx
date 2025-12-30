import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Clock, Globe, Monitor, Smartphone, MapPin, Activity, Sparkles } from 'lucide-react';
import { DashboardStats } from '../../types';

interface RealtimeAnalyticsPanelProps {
    stats: DashboardStats;
}

const WaveGraph = () => {
    return (
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-30 pointer-events-none overflow-hidden">
            <svg viewBox="0 0 100 20" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                <motion.path
                    d="M0 10 Q 25 20 50 10 T 100 10 V 20 H 0 Z"
                    fill="url(#blue-gradient)"
                    animate={{
                        d: [
                            "M0 10 Q 25 10 50 10 T 100 10 V 20 H 0 Z",
                            "M0 10 Q 25 5 50 10 T 100 15 V 20 H 0 Z",
                            "M0 10 Q 25 15 50 10 T 100 5 V 20 H 0 Z",
                            "M0 10 Q 25 10 50 10 T 100 10 V 20 H 0 Z"
                        ]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <defs>
                    <linearGradient id="blue-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

export const RealtimeAnalyticsPanel: React.FC<RealtimeAnalyticsPanelProps> = ({ stats }) => {
    const totalDevices = (stats.deviceStats?.desktop || 0) + (stats.deviceStats?.mobile || 0) || 1;
    const desktopPercent = Math.round(((stats.deviceStats?.desktop || 0) / totalDevices) * 100);
    const mobilePercent = Math.round(((stats.deviceStats?.mobile || 0) / totalDevices) * 100);

    const formattedDuration = useMemo(() => {
        const mins = Math.floor(stats.avgSessionDuration / 60);
        const secs = Math.round(stats.avgSessionDuration % 60);
        return `${mins}m ${secs}s`;
    }, [stats.avgSessionDuration]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Realtime Card */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-1 lg:col-span-2 glass-panel p-10 rounded-[3rem] border border-blue-500/20 bg-gradient-to-br from-blue-900/10 to-[#020617] relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-1000">
                    <Globe size={300} className="text-blue-500 animate-spin-slow" />
                </div>

                {/* Dynamic Background Effect */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
                <WaveGraph />

                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                <h3 className="text-[10px] uppercase tracking-[0.2em] font-black text-blue-400">Live Intelligence</h3>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-white/30">
                                <Activity size={14} />
                                <span>Realtime Data</span>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-7xl md:text-9xl font-black text-white tracking-tighter tabular-nums leading-none">
                                {stats.realTimeUsers}
                            </h2>
                            <p className="text-lg text-white/40 font-medium pl-2 mt-2">Active Citizens on Site</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-12 mt-16 backdrop-blur-sm bg-white/[0.01] p-6 rounded-3xl border border-white/5 mx-[-10px]">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-white/40 text-[10px] uppercase tracking-widest font-black">
                                <div className="flex items-center gap-2"><Monitor size={14} /> Desktop</div>
                                <span>{desktopPercent}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }} animate={{ width: `${desktopPercent}%` }} transition={{ duration: 1.5, ease: "circOut" }}
                                    className="h-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-white/40 text-[10px] uppercase tracking-widest font-black">
                                <div className="flex items-center gap-2"><Smartphone size={14} /> Mobile</div>
                                <span>{mobilePercent}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }} animate={{ width: `${mobilePercent}%` }} transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
                                    className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Right Column Stats */}
            <div className="space-y-6">
                {/* AI Insight Card */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-panel p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-6 text-purple-400">
                            <Sparkles size={16} />
                            <p className="text-[10px] uppercase tracking-[0.2em] font-black">AI Forecast</p>
                        </div>
                        <h4 className="text-3xl font-black text-white leading-tight mb-2">
                            {stats.realTimeUsers > 5 ? "High Traffic" : "Stable Flow"}
                        </h4>
                        <p className="text-[11px] text-white/50 leading-relaxed">
                            Currently observing {stats.realTimeUsers} active nodes.
                            {stats.realTimeUsers > 5
                                ? " Traffic is above average. Recommendation: Monitor server load."
                                : " Traffic is within normal baseline parameters."}
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel p-8 rounded-[2.5rem] border border-white/5 flex items-center justify-between"
                >
                    <div>
                        <p className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-black mb-2">Avg. Session</p>
                        <p className="text-4xl font-black text-white tracking-tighter">{formattedDuration}</p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 border border-white/5">
                        <Clock size={24} />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-panel p-8 rounded-[2.5rem] border border-white/5"
                >
                    <p className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-black mb-6">Top Nodes</p>
                    <div className="space-y-4">
                        {(stats.geoStats || []).map((geo, i) => (
                            <div key={geo.country} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-blue-500' : 'bg-white/20'}`} />
                                    <span className="text-[11px] font-bold text-white/80">{geo.country}</span>
                                </div>
                                <span className="text-[10px] font-black text-white/30">{geo.percent}%</span>
                            </div>
                        ))}
                        {(!stats.geoStats || stats.geoStats.length === 0) && (
                            <div className="text-[10px] text-white/20 font-black uppercase tracking-widest text-center py-2">No Geo Data Yet</div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
