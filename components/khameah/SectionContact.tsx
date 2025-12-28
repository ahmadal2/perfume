import React from 'react';
import { motion } from 'framer-motion';

const SectionContact: React.FC = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 1.2
            }
        }
    };

    return (
        <section className="py-40 bg-[#050505] flex flex-col items-center px-6">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="max-w-xl w-full text-center space-y-12"
            >
                <div className="space-y-4">
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                        Experience <span className="text-blue-500 italic">Luxury</span>
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-white/40 font-mono text-[10px] uppercase tracking-[0.5em]">
                        Join our fragrance journey
                    </motion.p>
                </div>

                <form className="space-y-6 w-full text-left">
                    <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-[10px] font-mono tracking-widest text-white/20 uppercase ml-4">Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 text-white focus:outline-none focus:border-blue-600/50 transition-colors uppercase tracking-widest text-[10px]"
                        />
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-[10px] font-mono tracking-widest text-white/20 uppercase ml-4">Email Address</label>
                        <input
                            type="email"
                            placeholder="john@example.com"
                            className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 text-white focus:outline-none focus:border-blue-600/50 transition-colors uppercase tracking-widest text-[10px]"
                        />
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-[10px] font-mono tracking-widest text-white/20 uppercase ml-4">Phone Number</label>
                        <input
                            type="tel"
                            placeholder="+1 234 567 890"
                            className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 text-white focus:outline-none focus:border-blue-600/50 transition-colors uppercase tracking-widest text-[10px]"
                        />
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-[10px] font-mono tracking-widest text-white/20 uppercase ml-4">Your Message (Optional)</label>
                        <textarea
                            rows={4}
                            placeholder="Tell us about your preferences..."
                            className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-white focus:outline-none focus:border-blue-600/50 transition-colors uppercase tracking-widest text-[10px]"
                        />
                    </motion.div>

                    <motion.div variants={buttonVariants} className="pt-6">
                        <button className="w-full py-6 bg-blue-600 text-white font-black uppercase tracking-[0.5em] text-[10px] rounded-full hover:bg-blue-500 transition-all shadow-[0_0_50px_rgba(59,130,246,0.1)]">
                            Submit Request
                        </button>
                    </motion.div>
                </form>
            </motion.div>
        </section>
    );
};

export default SectionContact;
