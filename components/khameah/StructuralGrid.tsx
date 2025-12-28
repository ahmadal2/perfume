import React from 'react';
import { motion } from 'framer-motion';

const StructuralGrid: React.FC = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Background Base Dot Grid */}
            <div className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage: 'radial-gradient(#2563eb 0.5px, transparent 0.5px)',
                    backgroundSize: '30px 30px'
                }}
            />

            {/* Vertical Structural Lines */}
            <div className="absolute inset-0 flex justify-between px-12 md:px-24">
                <div className="w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
                <div className="hidden md:block w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
                <div className="hidden md:block w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
                <div className="w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
            </div>

            {/* Horizontal Divider at 1/3 and 2/3 */}
            <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
            <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />

            {/* Dot in Circle - Structural Icon (Corner Decor) */}
            <div className="absolute top-12 left-12 md:left-24 -translate-x-1/2 -translate-y-1/2 scale-50 md:scale-75 opacity-20">
                <div className="relative w-12 h-12 flex items-center justify-center border border-blue-500 rounded-full">
                    <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="w-2 h-2 bg-blue-500 rounded-full"
                    />
                </div>
            </div>

            <div className="absolute top-12 right-12 md:right-24 translate-x-1/2 -translate-y-1/2 scale-50 md:scale-75 opacity-20 hidden md:block">
                <div className="relative w-12 h-12 flex items-center justify-center border border-blue-500 rounded-full">
                    <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                        className="w-2 h-2 bg-blue-500 rounded-full"
                    />
                </div>
            </div>

            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-blue-500/30" />
            <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-blue-500/30" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l border-b border-blue-500/30" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-blue-500/30" />
        </div>
    );
};

export default StructuralGrid;
