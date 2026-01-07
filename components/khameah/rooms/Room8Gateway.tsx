// Room8Gateway.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Room8Gateway: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="relative w-screen h-screen flex items-center justify-center bg-black overflow-hidden z-10">
            {/* Visual Climax */}
            <div className="absolute inset-0 opacity-40">
                <video
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover scale-110"
                    poster="https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1964&auto=format&fit=crop"
                >
                    <source src="/imag/khm-ved.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

            <div className="relative z-10 text-center max-w-4xl px-12">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="flex flex-col items-center"
                >
                    <Sparkles className="text-blue-500 mb-8 animate-pulse" size={48} />
                    <span className="text-[10px] font-black uppercase tracking-[0.8em] text-blue-500 mb-6">The Journey Ends Here</span>
                    <h2 className="text-6xl md:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] mb-12">
                        Own Your <br /> <span className="text-transparent border-t border-b border-white/20 py-2">Destiny</span>
                    </h2>

                    <div className="group relative">
                        <button
                            onClick={() => navigate('/products')}
                            className="relative z-10 w-80 py-8 bg-white text-black text-xs font-black uppercase tracking-[0.4em] overflow-hidden group-hover:bg-blue-600 group-hover:text-white transition-all duration-700 rounded-2xl"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-4">
                                Begin Your Legacy <ArrowRight size={18} />
                            </span>
                        </button>
                        <div className="absolute -inset-4 bg-white/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>

                    <p className="mt-16 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
                        Limited Quantities Dispatched Monthly — Secure Yours
                    </p>
                </motion.div>
            </div>

            {/* Footer Copyright Link Decor */}
            <div className="absolute bottom-12 inset-x-0 flex justify-center gap-12 opacity-30">
                {['Craftmanship', 'Exclusivity', 'Archival'].map(text => (
                    <span key={text} className="text-[8px] font-black uppercase tracking-[0.4em]">{text}</span>
                ))}
            </div>
        </div>
    );
};

export default Room8Gateway;
