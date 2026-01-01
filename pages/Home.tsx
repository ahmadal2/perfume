import React from 'react';
import { Link } from 'react-router-dom';
import { VerticalImageStack } from '../components/ui/vertical-image-stack';
import { FlowButton } from '../components/ui/flow-button';
import { TextEffect } from '../components/ui/text-effect';
import { FloatingPerfume } from '../components/ui/floating-perfume';

const Home: React.FC = () => {
  return (
    <div className="pt-32 pb-20 space-y-40 bg-[#020617] overflow-x-hidden">
      {/* Featured Header */}
      <section className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12 text-center lg:text-left">
            <div className="space-y-8">
              <TextEffect
                per="char"
                preset="blur"
                as="h4"
                className="text-blue-500 text-[10px] uppercase tracking-[1em] font-black"
              >
                Curated Archives
              </TextEffect>
              <TextEffect
                per="word"
                preset="slide"
                as="h2"
                className="text-7xl md:text-[8rem] lg:text-[9rem] serif italic leading-[0.9] text-white tracking-tighter text-glow"
              >
                The Royale Selection.
              </TextEffect>
            </div>

            <div className="space-y-8 max-w-md mx-auto lg:mx-0">
              <p className="text-white/40 text-sm leading-loose tracking-[0.1em] uppercase font-light">
                An exploration of rare Extraits and aromatic masterpieces. Each scent in our boutique is a legacy preserved in deep sapphire essence.
              </p>
              <Link to="/products" className="inline-block w-full sm:w-auto">
                <FlowButton text="Explore The Absolute Vault" variant="blue" className="h-20 px-12 shadow-[0_0_80px_rgba(59,130,246,0.3)]" />
              </Link>
            </div>
          </div>

          {/* 3D Visual Centerpiece */}
          <div className="relative order-first lg:order-last">
            <FloatingPerfume />
          </div>
        </div>
      </section>

      {/* Interactive Manifesto Gallery */}
      <section className="py-20 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 mb-24 text-center">
          <TextEffect
            per="char"
            preset="blur"
            className="text-blue-500 text-[12px] uppercase tracking-[1.5em] font-black block mb-6 opacity-60"
          >
            The Visual Opus
          </TextEffect>
          <TextEffect
            per="char"
            preset="blur"
            as="h2"
            className="text-6xl md:text-[10rem] serif italic text-white leading-none tracking-tighter"
          >
            Manifesto
          </TextEffect>
        </div>

        {/* The Vertical Interactive Stack */}
        <div className="relative z-10">
          <VerticalImageStack />
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      </section>

      {/* Call to Action for Catalog */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="glass-panel p-20 md:p-32 rounded-[5rem] border border-white/5 bg-white/[0.01]">
          <div className="space-y-12 max-w-2xl mx-auto">
            <TextEffect
              per="word"
              preset="blur"
              as="h2"
              className="text-6xl md:text-8xl serif italic leading-tight text-white tracking-tighter"
            >
              Enter The Vault.
            </TextEffect>
            <p className="text-white/40 text-sm leading-loose uppercase tracking-[0.3em] font-light">
              Our full collection of olfactory signatures awaits your discovery.
            </p>
            <Link to="/products">
              <FlowButton text="View Products" variant="blue" className="h-20 w-full max-w-md mx-auto" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;