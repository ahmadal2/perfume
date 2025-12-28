import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Share2, Info, Star, Heart, ShoppingBag, MessageCircle, Sparkles } from 'lucide-react';
import { PRODUCTS, WHATSAPP_NUMBER } from '../constants';
import { Variant, CartItem } from '../types';
import { getSmartProductDescription } from '../services/geminiService';
import { FlowButton } from '../components/ui/flow-button';
import { TextEffect } from '../components/ui/text-effect';

interface ProductDetailProps {
  onAddToCart: (item: CartItem) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart, wishlist, onToggleWishlist }) => {
  const { slug } = useParams();
  const product = PRODUCTS.find(p => p.slug === slug);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [smartDescription, setSmartDescription] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const isInWishlist = product ? wishlist.includes(product.id) : false;

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0]);
      setActiveImage(0);

      const fetchAiDesc = async () => {
        setIsAiLoading(true);
        const desc = await getSmartProductDescription(product.name, [...product.notes.top, ...product.notes.middle]);
        setSmartDescription(desc);
        setIsAiLoading(false);
      };
      fetchAiDesc();
    }
  }, [product]);

  if (!product) return <div className="p-20 text-center text-white uppercase tracking-widest">Product not found.</div>;

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    onAddToCart({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      brand: product.brand,
      image: product.images[0],
      size: selectedVariant.size,
      price: selectedVariant.price,
      quantity: 1,
    });
  };

  const handleWhatsAppOrder = () => {
    if (!selectedVariant) return;
    const message = encodeURIComponent(
      `Hello! I'm interested in ordering:\nProduct: ${product.name}\nSize: ${selectedVariant.size}\nPrice: $${selectedVariant.price}\nBrand: ${product.brand}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 lg:py-24">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 mb-12">
        <Link to="/" className="hover:text-white transition-colors font-black">Home</Link>
        <ChevronRight size={10} />
        <Link to="/catalog" className="hover:text-white transition-colors font-black">Catalog</Link>
        <ChevronRight size={10} />
        <span className="text-white font-black">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Gallery */}
        <div className="space-y-6">
          <div className="aspect-[4/5] bg-zinc-900 border border-white/5 overflow-hidden rounded-[2.5rem] shadow-2xl relative">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`aspect-square border rounded-2xl transition-all overflow-hidden relative ${activeImage === idx ? 'border-[#D4AF37] scale-95 shadow-[0_0_15px_rgba(212,175,55,0.2)]' : 'border-white/5 opacity-40 grayscale hover:grayscale-0 hover:opacity-100'}`}
              >
                <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-10">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.6em] font-black">{product.brand}</span>
              <div className="h-[1px] w-12 bg-[#D4AF37]/20" />
            </div>
            <TextEffect
              per="char"
              preset="blur"
              as="h1"
              className="text-5xl md:text-7xl serif italic mb-6 text-white leading-tight font-black"
            >
              {product.name}
            </TextEffect>
            <div className="flex items-center gap-6">
              <span className="text-3xl gold-text font-black tracking-widest">
                ${selectedVariant?.price}
              </span>
              <div className="h-6 w-[1px] bg-white/10" />
              <div className="flex items-center gap-1.5 text-[#D4AF37]">
                <Star size={12} fill="currentColor" />
                <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">Boutique Selection</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-gray-400 leading-loose text-xs uppercase tracking-[0.1em]">{product.description}</p>
            </div>

            {/* Minimal Glass Description Box - No header as requested */}
            {isAiLoading ? (
              <div className="p-8 bg-white/[0.02] border border-white/5 animate-pulse rounded-[2rem] backdrop-blur-xl">
                <div className="h-2 bg-white/10 w-3/4 mb-3 rounded-full"></div>
                <div className="h-2 bg-white/10 w-1/2 rounded-full"></div>
              </div>
            ) : smartDescription && (
              <div className="relative group overflow-hidden">
                <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] border border-white/5 group-hover:border-[#D4AF37]/20 transition-all duration-1000" />
                <div className="relative p-8">
                  <p className="text-[#F1D382] leading-loose text-sm italic font-light serif text-glow">
                    {smartDescription}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Olfactory Notes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-10 border-y border-white/5">
            <div className="space-y-2">
              <h5 className="text-[9px] uppercase tracking-[0.4em] text-[#D4AF37] font-black">Prelude</h5>
              <p className="text-xs text-gray-400 tracking-wider leading-relaxed">{product.notes.top.join(' • ')}</p>
            </div>
            <div className="space-y-2">
              <h5 className="text-[9px] uppercase tracking-[0.4em] text-[#D4AF37] font-black">Resonance</h5>
              <p className="text-xs text-gray-400 tracking-wider leading-relaxed">{product.notes.middle.join(' • ')}</p>
            </div>
            <div className="space-y-2">
              <h5 className="text-[9px] uppercase tracking-[0.4em] text-[#D4AF37] font-black">Foundation</h5>
              <p className="text-xs text-gray-400 tracking-wider leading-relaxed">{product.notes.base.join(' • ')}</p>
            </div>
          </div>

          {/* Variant Select */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-[9px] uppercase tracking-[0.4em] font-black text-gray-500">Archive Options</h4>
            </div>
            <div className="flex flex-wrap gap-4">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-700 border ${selectedVariant?.id === v.id
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_10px_40px_rgba(212,175,55,0.3)]'
                      : 'bg-white/[0.02] border-white/10 text-gray-500 hover:border-white/30 hover:text-white'
                    }`}
                >
                  {v.size}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-6 pt-4">
            <div className="flex flex-col sm:flex-row gap-6">
              <FlowButton
                onClick={handleAddToCart}
                text="Secure Archive Volume"
                variant="gold"
                className="flex-[2] h-16"
              />
              <FlowButton
                onClick={() => onToggleWishlist(product.id)}
                variant="glass"
                className="flex-1 h-16"
                text={isInWishlist ? 'Archived' : 'Archive'}
              >
                <Heart size={14} fill={isInWishlist ? "currentColor" : "none"} className="mr-2" />
                {isInWishlist ? 'Archived' : 'Archive'}
              </FlowButton>
            </div>
            <FlowButton
              onClick={handleWhatsAppOrder}
              variant="glass"
              className="w-full py-8 border-blue-500/20 hover:border-blue-500/50 hover:text-blue-400 group relative overflow-hidden bg-blue-900/5"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <MessageCircle size={16} className="mr-3 text-blue-500 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase tracking-[0.6em] font-black">Direct Boutique Consultation</span>
            </FlowButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;