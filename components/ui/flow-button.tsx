
'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

// Fix: Correctly extend React.ButtonHTMLAttributes to include standard props like className, children, type, and onClick.
interface FlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  variant?: 'blue' | 'glass' | 'outline' | 'gold' | 'custom';
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function FlowButton({
  text = "Modern Button",
  className,
  variant = 'blue',
  children,
  ...props
}: FlowButtonProps) {

  const variants = {
    blue: "border-blue-500/30 bg-blue-500/5 backdrop-blur-xl text-blue-400 hover:border-blue-500/60 hover:text-white",
    glass: "border-white/10 bg-white/[0.03] backdrop-blur-2xl text-white hover:border-white/40 hover:text-black",
    outline: "border-white/20 bg-transparent text-white hover:bg-white hover:text-black",
    gold: "border-[#D4AF37]/30 bg-[#D4AF37]/5 backdrop-blur-xl text-[#D4AF37] hover:border-[#D4AF37]/60 hover:text-black",
    custom: ""
  };

  const circles = {
    blue: "bg-blue-600",
    glass: "bg-white",
    outline: "bg-white",
    gold: "bg-[#D4AF37]",
    custom: "bg-white/10"
  };

  const selectedVariant = variants[variant] || variants.blue;
  const selectedCircle = circles[variant] || circles.blue;

  return (
    <button
      className={cn(
        "group relative flex items-center justify-center gap-2 overflow-hidden rounded-full border-[1px] px-8 py-4 text-[10px] font-black uppercase tracking-[0.4em] cursor-pointer transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.96] shadow-2xl",
        selectedVariant,
        className
      )}
      {...props}
    >
      {/* Shimmer Effect */}
      <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -skew-x-12 -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />

      {/* Animated Arrow - Left (In) */}
      <ArrowRight
        className={cn(
          "absolute w-4 h-4 left-[-20%] fill-none z-20 transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:left-6 group-hover:stroke-current",
          (variant === 'blue' || variant === 'gold') ? (variant === 'blue' ? "stroke-blue-400" : "stroke-[#D4AF37]") : "stroke-white"
        )}
      />

      {/* Content Layer - Explicitly set z-index and hover colors for text readability */}
      <span className="relative z-20 transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-5 block">
        {children || text}
      </span>

      {/* Growing Surface */}
      <span className={cn(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full opacity-0 group-hover:w-[160%] group-hover:h-[600%] group-hover:opacity-100 group-hover:rounded-none transition-all duration-[1000ms] ease-[cubic-bezier(0.19,1,0.22,1)] z-10",
        selectedCircle
      )}></span>

      {/* Animated Arrow - Right (Out) */}
      <ArrowRight
        className={cn(
          "absolute w-4 h-4 right-6 fill-none z-20 transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:right-[-20%] group-hover:stroke-current",
          (variant === 'blue' || variant === 'gold') ? (variant === 'blue' ? "stroke-blue-400" : "stroke-[#D4AF37]") : "stroke-white"
        )}
      />

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(400%) skewX(-12deg); }
        }
      `}</style>
    </button>
  );
}
