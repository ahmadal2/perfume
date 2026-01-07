// Room3Products.tsx
import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { api as apiService } from '../../../services/apiService';

const Room3Products: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await apiService.getPublicProducts();
                setProducts(data.slice(0, 5));
            } catch (err) {
                console.error(err);
            }
        };
        fetchProducts();
    }, []);

    const next = () => setCurrentIndex((prev) => (prev + 1) % products.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);

    if (products.length === 0) return null;

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#000512] overflow-hidden p-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">The Collections</h2>
                <div className="w-12 h-px bg-blue-500 mx-auto mt-4" />
            </motion.div>

            {/* 3D Carousel Surface */}
            <div className="relative w-full max-w-6xl h-[500px] flex items-center justify-center perspective-[2000px]">
                <AnimatePresence mode="popLayout">
                    {products.map((product, i) => {
                        const offset = i - currentIndex;
                        const isActive = i === currentIndex;

                        // Only show active and nearest items
                        if (Math.abs(offset) > 1 && !(i === 0 && currentIndex === products.length - 1) && !(i === products.length - 1 && currentIndex === 0)) {
                            // handle wrap around logic for simpler representation
                            // return null; 
                        }

                        // Calculate visual properties based on carousel position
                        let x = offset * 250;
                        let rotateY = offset * -45;
                        let scale = isActive ? 1.2 : 0.8;
                        let z = isActive ? 100 : -200;
                        let opacity = isActive ? 1 : 0.4;

                        // Wrap around logic for offset
                        if (offset > 2) x = 500;
                        if (offset < -2) x = -500;

                        return (
                            <motion.div
                                key={product.id}
                                initial={false}
                                animate={{
                                    x,
                                    z,
                                    rotateY,
                                    scale,
                                    opacity,
                                }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className={`absolute w-[300px] h-[400px] bg-white/5 backdrop-blur-3xl rounded-[2rem] border border-white/10 p-8 flex flex-col items-center justify-between cursor-pointer group ${isActive ? 'z-50 shadow-[0_0_100px_rgba(59,130,246,0.1)]' : 'z-10'}`}
                            >
                                <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />

                                <img
                                    src={product.images?.[0] || 'https://via.placeholder.com/300?text=Khamrah+Scent'}
                                    alt={product.name}
                                    className="w-48 h-48 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-700"
                                />

                                <div className="text-center relative z-10 w-full">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2">{product.category}</p>
                                    <h3 className="text-2xl font-black uppercase tracking-tight truncate">{product.name}</h3>
                                    {isActive && (
                                        <motion.button
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="mt-6 w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors"
                                        >
                                            Explore Essence <ArrowRight size={14} />
                                        </motion.button>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="flex gap-4 mt-16">
                <button onClick={prev} className="w-16 h-16 rounded-2xl border border-white/5 hover:border-blue-500 hover:bg-blue-500/10 flex items-center justify-center transition-all">
                    <ChevronLeft size={24} />
                </button>
                <button onClick={next} className="w-16 h-16 rounded-2xl border border-white/5 hover:border-blue-500 hover:bg-blue-500/10 flex items-center justify-center transition-all">
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Background Texture Overlay */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-900/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-900/20 to-transparent" />
        </div>
    );
};

export default Room3Products;
