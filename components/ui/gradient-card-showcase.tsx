import React from 'react';
import { cn } from "../../lib/utils";

const cards = [
    {
        title: 'The Prelude',
        desc: 'An opening of Cinnamon, Nutmeg, and Bergamot. A warm, spicy invitation that ignites the senses with sapphire brilliance.',
        gradientFrom: '#1e3a8a',
        gradientTo: '#3b82f6',
    },
    {
        title: 'The Core',
        desc: 'A heart of Dates, Praline, Tuberose, and Mahonial. Sweet, intoxicating, and deeply resonant with royal lineage.',
        gradientFrom: '#3b82f6',
        gradientTo: '#60a5fa',
    },
    {
        title: 'The Foundation',
        desc: 'A base of Vanilla, Tonka Bean, Amberwood, Benzoin, and Myrrh. An eternal legacy that lingers in the olfactory archive.',
        gradientFrom: '#60a5fa',
        gradientTo: '#93c5fd',
    },
];

export default function GradientCardShowcase() {
    return (
        <div className="relative py-32 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
                <h3 className="text-[12px] font-black uppercase tracking-[1em] text-blue-500 mb-6">Olfactory Architecture</h3>
                <h2 className="text-5xl md:text-8xl serif italic text-white tracking-tighter">The Triple Resonance.</h2>
            </div>

            <div className="flex justify-center items-center flex-wrap gap-10">
                {cards.map(({ title, desc, gradientFrom, gradientTo }, idx) => (
                    <div
                        key={idx}
                        className="group relative w-[340px] h-[440px] transition-all duration-500"
                    >
                        {/* Skewed gradient panels */}
                        <span
                            className="absolute top-0 left-[50px] w-1/2 h-full rounded-3xl transform skew-x-[15deg] transition-all duration-700 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-40px)]"
                            style={{
                                background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
                            }}
                        />
                        <span
                            className="absolute top-0 left-[50px] w-1/2 h-full rounded-3xl transform skew-x-[15deg] blur-[40px] opacity-40 transition-all duration-700 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-40px)] group-hover:opacity-60"
                            style={{
                                background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
                            }}
                        />

                        {/* Animated blurs */}
                        <span className="pointer-events-none absolute inset-0 z-10">
                            <span className="absolute top-0 left-0 w-0 h-0 rounded-full opacity-0 bg-blue-400/20 backdrop-blur-[20px] shadow-[0_0_50px_rgba(59,130,246,0.3)] transition-all duration-100 animate-blob group-hover:top-[-60px] group-hover:left-[40px] group-hover:w-[120px] group-hover:h-[120px] group-hover:opacity-100" />
                            <span className="absolute bottom-0 right-0 w-0 h-0 rounded-full opacity-0 bg-blue-600/20 backdrop-blur-[20px] shadow-[0_0_50px_rgba(37,99,235,0.3)] transition-all duration-500 animate-blob animation-delay-1000 group-hover:bottom-[-60px] group-hover:right-[40px] group-hover:w-[120px] group-hover:h-[120px] group-hover:opacity-100" />
                        </span>

                        {/* Content */}
                        <div className="absolute inset-0 z-20 p-10 flex flex-col justify-center items-start bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl transition-all duration-700 group-hover:translate-x-[-20px] group-hover:bg-white/[0.05]">
                            <h2 className="text-3xl font-black italic serif mb-4 text-white group-hover:text-blue-200 transition-colors uppercase">{title}</h2>
                            <p className="text-sm leading-relaxed mb-8 text-white/50 group-hover:text-white/80 transition-colors tracking-wide font-light">
                                {desc}
                            </p>
                            <div
                                className="inline-block text-[10px] font-black tracking-[0.4em] uppercase text-white border-b border-white/20 pb-1 hover:text-blue-400 hover:border-blue-400 transition-all"
                            >
                                Signature Genesis
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tailwind custom utilities for animation and shadows */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes blob {
          0%, 100% { transform: translateY(15px) scale(1); }
          50% { transform: translate(-15px, -10px) scale(1.1); }
        }
        .animate-blob { animation: blob 4s ease-in-out infinite; }
        .animation-delay-1000 { animation-delay: -2s; }
      `}} />
        </div>
    );
}
