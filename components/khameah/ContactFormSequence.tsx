import React from 'react';
import { motion } from 'framer-motion';
import { FlowButton } from '../ui/flow-button';

const ContactFormSequence: React.FC = () => {
    return (
        <section className="min-h-screen bg-black flex items-center justify-center py-40 px-6">
            <div className="w-full max-w-2xl space-y-16">

                <div className="text-center space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.5 }}
                        className="text-4xl md:text-6xl font-black text-white italic font-serif tracking-tighter"
                    >
                        Experience luxury
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true, amount: 0.5 }}
                        className="text-blue-500 font-mono uppercase tracking-[0.2em] text-sm"
                    >
                        Join our fragrance journey
                    </motion.p>
                </div>

                <form className="space-y-6">
                    <InputField delay={0.3} label="Full Name" placeholder="Enter your name" />
                    <InputField delay={0.4} label="Email Address" placeholder="Enter your email" type="email" />
                    <InputField delay={0.5} label="Phone Number" placeholder="Enter your number" type="tel" />
                    <InputField delay={0.6} label="Message" placeholder="Your inquiry (optional)" type="textarea" />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
                        viewport={{ once: true }}
                        className="pt-8"
                    >
                        <FlowButton
                            text="Send Request"
                            variant="blue"
                            className="w-full h-16 text-xs uppercase tracking-widest"
                            onClick={() => { }}
                        />
                    </motion.div>
                </form>

            </div>
        </section>
    );
};

const InputField: React.FC<{ delay: number, label: string, placeholder: string, type?: string }> = ({ delay, label, placeholder, type = "text" }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: delay }}
        viewport={{ once: true, amount: 0.5 }}
        className="space-y-2"
    >
        <label className="text-[10px] uppercase tracking-widest text-white/40 ml-2">{label}</label>
        {type === 'textarea' ? (
            <textarea
                placeholder={placeholder}
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
            />
        ) : (
            <input
                type={type}
                placeholder={placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
            />
        )}
    </motion.div>
);

export default ContactFormSequence;
