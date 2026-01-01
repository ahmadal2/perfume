import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const SectionFooter: React.FC = () => {
    const navigate = useNavigate();
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-black py-20 px-6 md:px-20 border-t border-white/5">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto"
            >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20 mb-20">
                    <div className="space-y-6">
                        <h2
                            className="text-3xl font-black text-blue-500 tracking-tighter italic font-serif cursor-pointer"
                            onClick={scrollToTop}
                        >
                            KHAMEAH
                        </h2>
                        <p className="text-white/40 text-xs font-mono leading-relaxed uppercase tracking-widest">
                            The ultimate destination for luxury Sapphire fragrances.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-white text-[10px] font-black uppercase tracking-[0.5em]">Main Menu</h4>
                        <ul className="space-y-4 text-white/40 text-[10px] font-mono uppercase tracking-widest">
                            <li><Link to="/home" className="hover:text-blue-500 transition-colors">Homepage</Link></li>
                            <li><Link to="/products" className="hover:text-blue-500 transition-colors">Fragrance Products</Link></li>
                            <li><Link to="/blueprint" className="hover:text-blue-500 transition-colors">Our Blueprint</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-white text-[10px] font-black uppercase tracking-[0.5em]">Experience</h4>
                        <ul className="space-y-4 text-white/40 text-[10px] font-mono uppercase tracking-widest">
                            <li><Link to="/contact" className="hover:text-blue-500 transition-colors">Contact Us</Link></li>
                            <li><Link to="/auth" className="hover:text-blue-500 transition-colors">Member Access</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-white text-[10px] font-black uppercase tracking-[0.5em]">Stay Connected</h4>
                        <div className="flex gap-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-blue-500 hover:text-blue-500 transition-all cursor-pointer">
                                    <span className="text-[10px]">●</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-white/20 text-[9px] font-mono uppercase tracking-widest">© 2026 KHAMEAH PARFUMS. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-10">
                        <span className="text-white/20 text-[9px] font-mono uppercase tracking-widest hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
                        <span className="text-white/20 text-[9px] font-mono uppercase tracking-widest hover:text-white transition-colors cursor-pointer">Terms of Service</span>
                    </div>
                </div>
            </motion.div>
        </footer>
    );
};

export default SectionFooter;
