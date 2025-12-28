import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';

interface VelocitySkewProps {
    children: React.ReactNode;
    className?: string;
}

export const VelocitySkew: React.FC<VelocitySkewProps> = ({ children, className }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    // Transform velocity into a skew value
    // We want a subtle tilt based on scroll speed
    const skewBase = useTransform(scrollVelocity, [-3000, 3000], [-5, 5]);

    // Smooth the skew with a spring
    const skew = useSpring(skewBase, {
        stiffness: 100,
        damping: 30
    });

    return (
        <motion.div
            ref={containerRef}
            style={{ skewY: skew }}
            className={`will-change-transform ${className || ''}`}
        >
            {children}
        </motion.div>
    );
};
