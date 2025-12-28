"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface CornerFrameProps {
    children: React.ReactNode;
    className?: string;
}

export const CornerFrame: React.FC<CornerFrameProps> = ({ children, className = "" }) => {
    return (
        <div className={`relative p-8 corner-frame-border bg-zinc-950/20 backdrop-blur-sm ${className}`}>
            {/* L-Brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500/50 -translate-x-1 -translate-y-1" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500/50 translate-x-1 -translate-y-1" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-500/50 -translate-x-1 translate-y-1" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500/50 translate-x-1 translate-y-1" />

            {children}

            {/* Background Glow */}
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-1000 -z-10" />
        </div>
    );
};
