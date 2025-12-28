
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Wind,
  Droplets,
  ChevronRight,
  Flame,
  Sparkles,
  ShoppingBag,
  CreditCard,
  LucideIcon,
} from 'lucide-react';
import { Product, CartItem } from '../../types';
import { FlowButton } from './flow-button';

// =========================================
// 1. CONFIGURATION & DATA TYPES
// =========================================

interface PerfumeShowcaseProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
  onBuyNow: (item: CartItem) => void;
}

const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
    exit: { opacity: 0, y: -10, filter: 'blur(5px)' },
  },
  image: {
    initial: {
      opacity: 0,
      scale: 1.2,
      filter: 'blur(15px)',
      rotate: 5,
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      rotate: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      filter: 'blur(20px)',
      transition: { duration: 0.25 },
    },
  },
};

// =========================================
// 2. SUB-COMPONENTS
// =========================================

const ProductVisual = ({ product }: { product: Product }) => {
  const MotionDiv = motion.div as any;
  const MotionImg = motion.img as any;

  return (
    <MotionDiv layout="position" className="relative group shrink-0">
      {/* Animated Rings - Blue Theme */}
      <MotionDiv
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-[-15%] rounded-[3rem] border border-dashed border-blue-500/20"
      />
      <MotionDiv
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-full bg-blue-600 blur-[100px] opacity-10"
      />

      {/* Image Container */}
      <div className="relative h-72 w-72 md:h-[480px] md:w-[480px] rounded-[3rem] border border-white/5 shadow-2xl flex items-center justify-center overflow-hidden bg-white/[0.01] backdrop-blur-xl">
        <MotionDiv
          animate={{ y: [-15, 15, -15] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          className="relative z-10 w-full h-full flex items-center justify-center font-bold text-white/10"
        >
          {product.images?.[0] ? (
            <MotionImg
              src={product.images[0]}
              alt={product.name}
              variants={ANIMATIONS.image}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full h-full object-cover transition-all duration-1000 p-8"
              draggable={false}
            />
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Sparkles size={48} className="opacity-20 translate-y-4" />
              <span className="text-[10px] uppercase tracking-widest">Image Loading</span>
            </div>
          )}
        </MotionDiv>
      </div>

      {/* Status Label */}
      <MotionDiv
        layout="position"
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
      >
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/50 bg-black/80 px-6 py-3 rounded-full border border-white/10 backdrop-blur-xl">
          <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-pulse" />
          {product.fragranceType} Selection
        </div>
      </MotionDiv>
    </MotionDiv>
  );
};

export default function PerfumeShowcase({ product, onAddToCart, onBuyNow }: PerfumeShowcaseProps) {
  const MotionDiv = motion.div as any;
  const MotionH1 = motion.h1 as any;
  const MotionH2 = motion.h2 as any;
  const MotionP = motion.p as any;

  const handleCartClick = () => {
    if (!product.variants?.length) return;
    onAddToCart({
      productId: product.id,
      variantId: product.variants[0].id,
      name: product.name,
      brand: product.brand,
      image: product.images?.[0] || '',
      size: product.variants[0].size,
      price: product.variants[0].price,
      quantity: 1,
    });
  };

  const handleBuyClick = () => {
    if (!product.variants?.length) return;
    onBuyNow({
      productId: product.id,
      variantId: product.variants[0].id,
      name: product.name,
      brand: product.brand,
      image: product.images?.[0] || '',
      size: product.variants[0].size,
      price: product.variants[0].price,
      quantity: 1,
    });
  };

  return (
    <div className="relative w-full py-32 flex flex-col items-center justify-center overflow-hidden border-b border-white/5">
      <main className="relative z-10 w-full px-6 flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 lg:gap-40 max-w-7xl mx-auto">

        {/* Visuals */}
        <ProductVisual product={product} />

        {/* Content */}
        <MotionDiv
          variants={ANIMATIONS.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full max-w-lg flex flex-col items-start text-left"
        >
          <MotionH2 variants={ANIMATIONS.item} className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400 mb-3">
            {product.brand} Essence
          </MotionH2>
          <MotionH1 variants={ANIMATIONS.item} className="text-4xl md:text-7xl serif italic font-black mb-6 text-white leading-tight">
            {product.name}
          </MotionH1>
          <MotionP variants={ANIMATIONS.item} className="text-white/40 text-sm leading-loose mb-10 tracking-[0.05em]">
            {product.description}
          </MotionP>

          {/* Olfactory Notes Mini Grid */}
          <MotionDiv variants={ANIMATIONS.item} className="w-full grid grid-cols-3 gap-4 mb-10 py-8 border-y border-white/5">
            <div className="space-y-1">
              <span className="text-[8px] font-black uppercase tracking-widest text-blue-500">Prelude</span>
              <p className="text-[10px] text-white/60 truncate">{product.notes.top?.[0] || 'N/A'}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[8px] font-black uppercase tracking-widest text-blue-500">Heart</span>
              <p className="text-[10px] text-white/60 truncate">{product.notes.middle?.[0] || 'N/A'}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[8px] font-black uppercase tracking-widest text-blue-500">Base</span>
              <p className="text-[10px] text-white/60 truncate">{product.notes.base?.[0] || 'N/A'}</p>
            </div>
          </MotionDiv>

          {/* Price & Actions */}
          <MotionDiv variants={ANIMATIONS.item} className="w-full space-y-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl font-black text-white tracking-tighter">
                ${product.variants?.[0]?.price || '0.00'}
              </span>
              <span className="text-[10px] font-bold text-white/30 tracking-widest uppercase">
                {product.variants?.[0]?.size || 'Standard'} / Limited Vault
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <FlowButton
                onClick={handleBuyClick}
                variant="outline"
                className="flex-1 h-14"
                text="Secure Archive"
                disabled={!product.variants?.length}
              >
                <CreditCard size={14} className="mr-2" /> Buy Now
              </FlowButton>
              <FlowButton
                onClick={handleCartClick}
                variant="glass"
                className="flex-1 h-14"
                text="Add to Bag"
                disabled={!product.variants?.length}
              >
                <ShoppingBag size={14} className="mr-2" /> Bag
              </FlowButton>
            </div>
          </MotionDiv>
        </MotionDiv>
      </main>
    </div>
  );
}
