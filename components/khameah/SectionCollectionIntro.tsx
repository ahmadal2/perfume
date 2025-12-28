import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SectionCollectionIntro: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.4], [1.1, 1]);

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
            {/* Parallax Background */}
            <motion.div
                style={{ y, scale }}
                className="absolute inset-0 z-0"
            >
                <img
                    src="/imag/lattafa khamrah.jpg"
                    alt="The Archive"
                    className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </motion.div>

            {/* Content */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 text-center space-y-8 px-6"
            >
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100px" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-px bg-blue-500 mx-auto"
                />

                <div className="space-y-4">
                    <span className="block font-mono text-blue-500 uppercase tracking-[1.5em] text-[10px] font-black">
                        Discovery Phase
                    </span>
                    <h2 className="text-7xl md:text-[10rem] font-black text-white tracking-tighter leading-none italic serif glow-text-sapphire">
                        THE ARCHIVE
                    </h2>
                </div>

                <p className="max-w-xl mx-auto text-blue-200/60 font-mono text-xs md:text-sm uppercase tracking-[0.5em] leading-relaxed">
                    Every bottle holds a universe. <br />
                    A curated sanctuary of scents designed to transcend time and space.
                </p>

                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100px" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-px bg-blue-500 mx-auto"
                />
            </motion.div>

            {/* Scent Map SVG Decoration */}
            <div className="absolute bottom-0 left-0 w-full h-64 pointer-events-none opacity-20">
                <svg viewBox="0 0 1440 320" className="w-full h-full">
                    <motion.path
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2 }}
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="2"
                        d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,186.7C672,203,768,181,864,154.7C960,128,1056,96,1152,106.7C1248,117,1344,171,1392,197.3L1440,224"
                    />
                </svg>
            </div>
        </section>
    );
};

export default SectionCollectionIntro;
