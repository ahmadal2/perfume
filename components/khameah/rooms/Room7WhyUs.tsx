// Room7WhyUs.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Droplets, Leaf } from 'lucide-react';

const Room7WhyUs: React.FC = () => {
    const features = [
        { icon: Shield, title: "Uncompromising Integrity", desc: "No synthetic fillers, No compromises." },
        { icon: Sparkles, title: "Royal Pedigree", desc: "Formulae used by sovereigns for centuries." },
        { icon: Droplets, title: "Oil Extraction Only", desc: "We utilize pure oil infusion techniques." },
        { icon: Leaf, title: "Sustainably Harvested", desc: "Giving back to the soil that feeds us." },
    ];

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#000512] overflow-hidden p-12">
            <div className="max-w-4xl w-full flex flex-col gap-12 relative">
                {/* Connecting Vertical Line */}
                <div className="absolute left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />

                {features.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="flex items-center gap-12 group"
                    >
                        <div className="relative">
                            <div className="w-24 h-24 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-700">
                                <item.icon className="text-white group-hover:scale-125 transition-transform duration-500" size={32} />
                            </div>
                            <div className="absolute -inset-2 bg-blue-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        <div>
                            <h3 className="text-3xl font-black uppercase tracking-tighter mb-2 group-hover:text-blue-400 transition-colors uppercase">
                                {item.title}
                            </h3>
                            <p className="text-sm font-medium tracking-widest text-white/40 group-hover:text-white/60 transition-colors uppercase">
                                {item.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Decorative Side Text */}
            <div className="absolute top-0 right-12 h-full flex items-center pointer-events-none">
                <h4 className="rotate-90 text-[10px] font-black uppercase tracking-[2em] text-white/5 origin-center">The Khamrah Quality Standard</h4>
            </div>
        </div>
    );
};

export default Room7WhyUs;
