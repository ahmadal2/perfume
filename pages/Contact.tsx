import React from 'react';
import { TestimonialSlider } from '../components/ui/testimonial-slider-1';
import { Mail, MapPin, Phone, Instagram, Facebook, Twitter } from 'lucide-react';
import { TextEffect } from '../components/ui/text-effect';
import { LocationMap } from '../components/ui/expand-map';

const reviews = [
  {
    id: 1,
    name: "Alexander Vance",
    affiliation: "Vogue Hommes",
    quote: "The boozy warmth of Khamrah is unparalleled. It doesn't just sit on the skin; it commands the room with a quiet, regal authority.",
    imageSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1200&fit=crop&q=90",
    thumbnailSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=300&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Julian Sterling",
    affiliation: "Highsnobiety",
    quote: "Qahwa is the definitive evening scent for 2026. The coffee note is roasted to perfection, balancing the praline sweetness in a way that feels incredibly masculine.",
    imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop&q=90",
    thumbnailSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Maximilian Roth",
    affiliation: "GQ Berlin",
    quote: "I’ve worn niche fragrances three times the price, but the silage and complexity of Royale's collection rival the world's most exclusive boutiques.",
    imageSrc: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&h=1200&fit=crop&q=90",
    thumbnailSrc: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=300&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Dominic Thorne",
    affiliation: "Creative Director",
    quote: "It's a visceral experience. The cinnamon doesn't just smell good—it evokes memories of distant travels and opulent evenings.",
    imageSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1200&fit=crop&q=90",
    thumbnailSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=300&fit=crop&q=80",
  },
];

const Contact: React.FC = () => {
  return (
    <div className="pt-32 space-y-32">
      {/* Story Header */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <TextEffect
              per="char"
              preset="blur"
              as="h4"
              className="text-blue-500 text-[10px] uppercase tracking-[1em] font-black"
            >
              Our Chronicles
            </TextEffect>
            <div className="space-y-4">
              <TextEffect
                per="word"
                preset="slide"
                as="h1"
                className="text-6xl md:text-8xl serif italic leading-none text-white tracking-tighter"
              >
                The Royale Testament.
              </TextEffect>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-md uppercase tracking-[0.4em] font-light italic">
              We curate scents for the modern sovereign. Those who understand that fragrance is the invisible crown of one's presence.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <LocationMap className="shadow-[0_0_100px_rgba(59,130,246,0.15)]" />
          </div>
        </div>
      </section>

      {/* Testimonial Slider - "Only the Mens" */}
      <section className="py-32 bg-zinc-950/30">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center lg:text-left">
          <TextEffect
            per="word"
            preset="blur"
            className="text-blue-500 text-[10px] uppercase tracking-[1em] font-light block mb-4"
          >
            Voice of the Royale
          </TextEffect>
          <TextEffect
            per="word"
            preset="blur"
            as="h2"
            className="text-5xl serif italic text-white"
          >
            Gentlemen's Consensus
          </TextEffect>
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <TestimonialSlider reviews={reviews} />
        </div>
      </section>

      {/* Contact Details */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid md:grid-cols-3 gap-12 border-t border-white/5 pt-20">
          <div className="space-y-4">
            <h4 className="text-[10px] text-blue-500 uppercase tracking-[0.5em] font-black mb-6">Concierge</h4>
            <div className="flex items-center gap-4 text-white/40 group cursor-pointer hover:text-white transition-colors">
              <div className="h-10 w-10 glass-panel rounded-full flex items-center justify-center group-hover:border-blue-500/50 transition-all">
                <Phone size={14} />
              </div>
              <span className="text-xs tracking-widest">+49 155 605 495 29</span>
            </div>
            <div className="flex items-center gap-4 text-white/40 group cursor-pointer hover:text-white transition-colors">
              <div className="h-10 w-10 glass-panel rounded-full flex items-center justify-center group-hover:border-blue-500/50 transition-all">
                <Mail size={14} />
              </div>
              <span className="text-xs tracking-widest">concierge@lessence.com</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] text-blue-500 uppercase tracking-[0.5em] font-black mb-6">Flagship</h4>
            <div className="flex items-start gap-4 text-white/40 group cursor-pointer hover:text-white transition-colors">
              <div className="h-10 w-10 glass-panel rounded-full flex items-center justify-center group-hover:border-blue-500/50 transition-all shrink-0">
                <MapPin size={14} />
              </div>
              <span className="text-xs tracking-widest leading-relaxed">123 Luxury Avenue, <br />75008 Paris, France</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] text-blue-500 uppercase tracking-[0.5em] font-black mb-6">Social Circle</h4>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <button key={i} className="h-12 w-12 glass-panel rounded-full flex items-center justify-center text-white/20 hover:text-blue-500 hover:border-blue-500/50 transition-all">
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;