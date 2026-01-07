//landing.tsx
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, BookOpen, User } from 'lucide-react';

import { CartItem } from '../types';
import { KineticStats } from '../components/ui/kinetic-stats';
import { NoiseOverlay } from '../components/ui/noise-overlay';
import { OrganicBackground } from '../components/ui/organic-background';
import { NavBar } from '../components/ui/tubelight-navbar';
import Footer from '../components/Footer';
import { ScentSignature } from '../components/ui/scent-signature';

// Khameah Components
import HeroMarquee from '../components/khameah/HeroMarquee';
import HeroStatement from '../components/khameah/HeroStatement';
import SectionProductShowcase from '../components/khameah/SectionProductShowcase';
import ParallaxTextWaves from '../components/khameah/ParallaxTextWaves';
import SectionWhyChooseUs from '../components/khameah/SectionWhyChooseUs';
import ContactFormSequence from '../components/khameah/ContactFormSequence';
import SectionCollections from '../components/khameah/SectionCollections';

interface LandingProps {
  onAddToCart: (item: CartItem) => void;
}

/* =========================================================
   INTERNAL SECTION WRAPPER (FIXES EMPTY SECTIONS)
   ========================================================= */
type SectionWrapperProps = {
  children: React.ReactNode;
  minHeight?: string;
  className?: string;
};

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  minHeight = 'min-h-screen',
  className = '',
}) => {
  if (!children) return null;

  return (
    <section
      className={`relative w-full ${minHeight} flex items-center ${className}`}
    >
      {children}
    </section>
  );
};

/* =========================================================
   LANDING PAGE
   ========================================================= */
const Landing: React.FC<LandingProps> = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await import('../services/apiService').then((m) =>
          m.api.getPublicProducts()
        );
        setProducts(data);
      } catch (e) {
        console.error('Failed to load products for gallery', e);
      }
    };
    loadProducts();
  }, []);

  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Products', url: '/products', icon: Search },
    { name: 'Story', url: '/contact', icon: BookOpen },
    { name: 'Login', url: '/auth', icon: User },
  ];

  return (
    <div
      ref={containerRef}
      className="relative bg-black text-blue-400 min-h-screen overflow-x-hidden"
    >
      {/* ================= GLOBAL LAYERS (NO HEIGHT) ================= */}
      <NavBar items={navItems} />
      <NoiseOverlay />
      <OrganicBackground />
      <ScentSignature />

      {/* Mouse Follow Glow */}
      <div
        className="fixed inset-0 pointer-events-none z-10 opacity-20"
        style={{
          background: `radial-gradient(
            circle 600px at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(59,130,246,0.12),
            transparent 80%
          )`,
        }}
        onMouseMove={(e) => {
          const t = e.currentTarget;
          t.style.setProperty('--mouse-x', `${e.clientX}px`);
          t.style.setProperty('--mouse-y', `${e.clientY}px`);
        }}
      />

      {/* ================= LANDING SECTIONS ================= */}

      {/* 1 — Hero Marquee (ABSOLUTE VISUAL → NEEDS HEIGHT) */}
      <SectionWrapper minHeight="min-h-[60vh]">
        <HeroMarquee />
      </SectionWrapper>

      {/* 2 — Main Hero Statement */}
      <SectionWrapper>
        <HeroStatement />
      </SectionWrapper>

      {/* 3 — Product Showcase */}
      <SectionWrapper>
        <SectionProductShowcase />
      </SectionWrapper>

      {/* 4 — Parallax Text Waves (ABSOLUTE / CANVAS STYLE) */}
      <SectionWrapper minHeight="min-h-[70vh]">
        <ParallaxTextWaves />
      </SectionWrapper>

      {/* 5 — Why Choose Us */}
      <SectionWrapper>
        <SectionWhyChooseUs />
      </SectionWrapper>

      {/* 6 — Statistics */}
      <SectionWrapper minHeight="min-h-[50vh]" className="py-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6 max-w-7xl mx-auto">
          <KineticStats value={15} label="Countries We Ship To" />
          <KineticStats value={50000} suffix="+" label="Happy Customers" />
          <KineticStats value={100} suffix="+" label="Unique Scents" />
        </div>
      </SectionWrapper>

      {/* 7 — Collections */}
      <SectionWrapper>
        <SectionCollections />
      </SectionWrapper>

      {/* 8 — Contact */}
      <SectionWrapper minHeight="min-h-[80vh]">
        <ContactFormSequence />
      </SectionWrapper>

      {/* 9 — Footer (NO SECTION WRAPPER) */}
      <footer className="relative z-20">
        <Footer />
      </footer>
    </div>
  );
};

export default Landing;
