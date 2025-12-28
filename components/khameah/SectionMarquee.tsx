import React from 'react';
import { motion } from 'framer-motion';

const marqueeLines = [
    { text: "Luxury. Refined. Timeless. Luxury. Refined. Timeless. Luxury. Refined. Timeless. ", direction: -1 },
    { text: "Elegance. Crafted. Unforgettable. Elegance. Crafted. Unforgettable. Elegance. Crafted. ", direction: 1 },
    { text: "Fragrance. Redefined. Experience. Fragrance. Redefined. Experience. Fragrance. Redefined. ", direction: -1 },
];

const SectionMarquee: React.FC = () => {
    return (
        <section className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center bg-black">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-80"
                >
                    <source src="/imag/khm-ved.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            <div className="relative z-10 w-full space-y-8 md:space-y-12">
                {marqueeLines.map((line, idx) => (
                    <div key={idx} className="flex whitespace-nowrap overflow-hidden">
                        <motion.div
                            initial={{ x: line.direction > 0 ? "-50%" : "0%" }}
                            animate={{ x: line.direction > 0 ? "0%" : "-50%" }}
                            transition={{
                                repeat: Infinity,
                                duration: 20,
                                ease: "linear",
                            }}
                            className="flex text-[8vw] md:text-[6vw] font-black uppercase tracking-tighter leading-none"
                        >
                            <span className={idx === 1 ? "text-blue-600 italic" : "text-white/20"}>
                                {line.text}
                            </span>
                            <span className={idx === 1 ? "text-blue-600 italic" : "text-white/20"}>
                                {line.text}
                            </span>
                        </motion.div>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/40 uppercase tracking-[0.5em] text-[10px] animate-pulse">
                <span>Scroll to Discover</span>
                <div className="w-px h-12 bg-blue-600/50" />
            </div>

            {/* Linear Decoration: Right Sidebar Line */}
            <div className="absolute right-12 md:right-24 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />

            {/* Linear Decoration: Title Frame */}
            <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 h-[40vh] border-t border-b border-blue-500/10 pointer-events-none" />
        </section>
    );
};

export default SectionMarquee;
