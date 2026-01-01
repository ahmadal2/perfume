import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronRight, Heart, ShoppingBag, MessageCircle, Star,
  Minus, Plus, ShieldCheck, Users, Info
} from 'lucide-react';
import { Variant, CartItem, Sale, Product } from '../types';
import { api } from '../services/apiService';
import { WHATSAPP_NUMBER } from '../constants';
import { FlowButton } from '../components/ui/flow-button';
import { RatingModal } from '../components/ui/rating-modal';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetail: React.FC<{
  onAddToCart: (item: CartItem) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}> = ({ onAddToCart, wishlist, onToggleWishlist }) => {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Simulated initial viewers base
  const initialViewers = useMemo(() => Math.floor(Math.random() * (25 - 12 + 1)) + 12, []);

  // Dynamic Live Viewers
  const [currentViewers, setCurrentViewers] = useState(initialViewers);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentViewers(prev => {
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
        return Math.max(12, Math.min(45, prev + change));
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // User Rating Interaction
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hasRated, setHasRated] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  const handleRate = async (rating: number) => {
    try {
      await api.submitReview(product?.id || '', rating);
      setUserRating(rating);
      setHasRated(true);
    } catch (err) {
      console.error("Failed to submit rating", err);
      // Optional: Show error toast/alert if user not logged in
      alert("Please log in to submit a rating.");
    }
  };

  // Check for existing rating
  useEffect(() => {
    if (product?.id) {
      api.getUserReview(product.id).then(r => {
        if (r) {
          setUserRating(r);
          setHasRated(true);
        }
      });
    }
  }, [product?.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, salesData] = await Promise.all([
          api.getPublicProducts(),
          api.getSales()
        ]);
        const foundProduct = productsData.find(p => p.slug === slug);
        setProduct(foundProduct || null);
        setSales(salesData);
        if (foundProduct?.variants?.length) {
          setSelectedVariant(foundProduct.variants[0]);
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const activeSale = useMemo(() => {
    if (!product) return null;
    return sales.find(s =>
      s.isActive &&
      (s.appliesTo === 'all' ||
        (s.appliesTo === 'specific_products' && s.targetIds?.includes(product.id)) ||
        (s.appliesTo === 'specific_categories' && s.targetIds?.includes(product.category)))
    );
  }, [product, sales]);

  const originalPrice = selectedVariant?.price || 0;
  let discountedPrice = originalPrice;
  let savingsPercent = 0;

  if (activeSale) {
    if (activeSale.discountType === 'percentage') {
      discountedPrice = originalPrice * (1 - activeSale.discountValue / 100);
      savingsPercent = activeSale.discountValue;
    } else {
      discountedPrice = Math.max(0, originalPrice - activeSale.discountValue);
      savingsPercent = Math.round((activeSale.discountValue / (originalPrice || 1)) * 100);
    }
  }

  // Price per Liter calculation
  const pricePerLiter = useMemo(() => {
    if (!selectedVariant) return 0;
    const sizeMatch = selectedVariant.size.match(/\d+/);
    if (!sizeMatch) return 0;
    const ml = parseInt(sizeMatch[0]);
    return (discountedPrice / ml) * 1000;
  }, [selectedVariant, discountedPrice]);

  const isInWishlist = product ? wishlist.includes(product.id) : false;

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-white/20 uppercase tracking-[1em] text-[10px] animate-pulse">Distilling...</div>;
  if (!product) return <div className="p-40 text-center text-white/40 uppercase tracking-widest">Essence not found.</div>;

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    onAddToCart({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      brand: product.brand,
      image: product.images[0],
      size: selectedVariant.size,
      price: discountedPrice,
      quantity: quantity,
      originalPrice: discountedPrice < originalPrice ? originalPrice : undefined
    });
  };

  const handleBuyNow = () => {
    if (!selectedVariant || !product) return;

    // Construct message
    const message = `Hi, I would like to order:
${product.name}
Size: ${selectedVariant.size}
Price: €${discountedPrice.toFixed(2)}
SKU: ${selectedVariant.sku || 'N/A'}

Please confirm availability.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-24 text-white">
      <div className="max-w-7xl mx-auto px-6 h-full">

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/30 mb-20">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link to="/products" className="hover:text-white transition-colors">Archive</Link>
          <ChevronRight size={10} />
          <span className="text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-32 items-start">

          {/* LEFT: GALLERY */}
          <div className="space-y-8 sticky top-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square bg-white/[0.02] border border-white/5 rounded-[4rem] overflow-hidden relative group"
            >
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/40 to-transparent pointer-events-none" />

              <button
                onClick={() => onToggleWishlist(product.id)}
                className="absolute top-8 right-8 w-14 h-14 rounded-2xl bg-black/40 backdrop-blur-3xl border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all z-20 group"
              >
                <Heart size={20} className={isInWishlist ? 'text-red-500 fill-red-500' : 'text-white/40 group-hover:text-white'} />
              </button>
            </motion.div>

            {/* Thumbnails */}
            <div className="flex gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-24 h-24 rounded-3xl overflow-hidden border-2 transition-all relative ${activeImage === idx ? 'border-blue-500 bg-blue-500/10' : 'border-white/5 opacity-40 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: CONTENT */}
          <div className="space-y-12">

            {/* Trust Banner */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-6 py-2.5 rounded-full bg-white border border-white/20 shadow-xl"
            >
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]">Über {product.salesCount || 0}+ zufriedene Kunden</span>
            </motion.div>

            {/* Title & Brand */}
            <div className="space-y-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-1 group">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={(userRating || Math.floor(product.rating || 5)) > i ? "#f59e0b" : "none"}
                        className={(userRating || Math.floor(product.rating || 5)) > i ? "text-[#f59e0b]" : "text-white/20"}
                      />
                    ))}
                  </div>

                  {!hasRated && (
                    <button
                      onClick={() => setIsRatingModalOpen(true)}
                      className="ml-4 text-[10px] uppercase tracking-widest font-bold text-blue-400 hover:text-blue-300 transition-colors border-b border-blue-400/30 hover:border-blue-300"
                    >
                      Bewerten
                    </button>
                  )}

                  <span className="text-[11px] font-bold text-white/40 ml-2 uppercase tracking-widest">
                    ({product.reviewCount || 0})
                  </span>

                  <RatingModal
                    isOpen={isRatingModalOpen}
                    onClose={() => setIsRatingModalOpen(false)}
                    onRate={handleRate}
                    productName={product.name}
                    initialRating={userRating}
                  />
                </div>
                <AnimatePresence>
                  {hasRated && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-[10px] font-bold text-blue-400 uppercase tracking-widest"
                    >
                      Vielen Dank für deine Bewertung!
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <h1 className="text-5xl md:text-8xl serif italic tracking-tighter leading-[1.1] text-white/95">{product.name}</h1>
              <p className="text-white/40 text-[13px] md:text-[15px] uppercase tracking-[0.2em] font-medium leading-relaxed max-w-md text-center md:text-left">geht in die Richtung wie {product.brand}</p>
            </div>

            {/* Pricing Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-6">
                {savingsPercent > 0 && (
                  <span className="text-2xl text-white/30 line-through font-mono">€{originalPrice.toFixed(2)} EUR</span>
                )}
                <span className="text-4xl font-black tracking-tighter text-white">€{discountedPrice.toFixed(2)} EUR</span>
                {savingsPercent > 0 && (
                  <span className="px-5 py-1.5 rounded-full bg-black text-[10px] font-black uppercase tracking-widest border border-white/20">Sale</span>
                )}
              </div>
              <div className="space-y-1 mt-3">
                <p className="text-[12px] text-white/30 uppercase tracking-[0.1em] font-bold">€{pricePerLiter.toFixed(2)}/l</p>
                <p className="text-[11px] text-white/35 font-medium leading-relaxed">
                  Inkl. Steuern. <span className="underline cursor-pointer hover:text-white transition-opacity decoration-white/20">Versand</span> wird beim Checkout berechnet
                </p>
              </div>
            </div>

            {/* Size/Variant Selection */}
            <div className="space-y-6 pt-4">
              <h4 className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-black">Größe</h4>
              <div className="flex flex-wrap gap-4">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-10 py-5 rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] transition-all duration-300 border-2 ${selectedVariant?.id === v.id
                      ? 'bg-white text-black border-white shadow-2xl shadow-white/10'
                      : 'bg-[#3d3d31] border-transparent text-white/50 hover:text-white hover:bg-[#4d4d41]'}`}
                  >
                    {v.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-10">
              <div className="space-y-6">
                <h4 className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-black">Anzahl</h4>
                <div className="inline-flex items-center gap-10 bg-white/5 border border-white/10 rounded-2xl px-10 py-5 group hover:border-white/20 transition-all">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-white/30 hover:text-white transition-colors"><Minus size={18} /></button>
                  <span className="text-[20px] font-black w-8 text-center tabular-nums text-white/90 font-mono tracking-tighter">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="text-white/30 hover:text-white transition-colors"><Plus size={18} /></button>
                </div>
              </div>

              {/* Status Indicators */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-green-500/10 flex items-center justify-center relative">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)] animate-soft-pulse" />
                  </div>
                  <span className="text-[12px] uppercase tracking-[0.15em] font-black text-white/50">
                    Auf Lager - {product.deliveryTime || 'In 1-3 Tagen bei dir'}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-blue-500/10 flex items-center justify-center relative">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)] animate-soft-pulse" />
                  </div>
                  <span className="text-[12px] uppercase tracking-[0.15em] font-black text-white/50">
                    {currentViewers} Personen schauen sich diesen Artikel gerade an
                  </span>
                </div>
              </div>

              {/* Main Actions */}
              <div className="flex flex-col gap-4 pt-4">
                <FlowButton
                  onClick={handleAddToCart}
                  variant="custom"
                  className="h-16 md:h-20 text-[11px] md:text-[13px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-black blue-glass text-white/90 shadow-2xl transition-all duration-500 hover:scale-[1.01] active:scale-[0.99]"
                  text="In den Warenkorb"
                />
                <FlowButton
                  onClick={handleBuyNow}
                  variant="custom"
                  className={`h-16 md:h-20 text-[11px] md:text-[13px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-black border-none text-white transition-all duration-500 hover:scale-[1.01] active:scale-[0.99] ${savingsPercent > 30 ? 'animate-sale-urgency shadow-[0_10px_40px_rgba(239,68,68,0.3)]' : 'bg-blue-600 hover:bg-blue-500 shadow-[0_10px_40px_rgba(59,130,246,0.3)]'}`}
                  text="Buy Now"
                />
              </div>

              {/* Secondary Actions */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <button className="flex items-center justify-center gap-3 py-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                  <ShieldCheck size={18} className="text-blue-500" />
                  <span className="text-[9px] uppercase tracking-[0.4em] font-black">Secure Checkout</span>
                </button>
                <button className="flex items-center justify-center gap-3 py-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                  <Info size={18} className="text-blue-500" />
                  <span className="text-[9px] uppercase tracking-[0.4em] font-black">Returns Info</span>
                </button>
              </div>
            </div>

            {/* Notes Pyramid (Keeping the essence) */}
            <div className="pt-20 border-t border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="space-y-3">
                  <span className="text-[8px] font-black uppercase tracking-[0.5em] text-blue-500">Top Notes</span>
                  <p className="text-sm font-medium text-white/60 leading-relaxed">{product.notes.top.join(' • ')}</p>
                </div>
                <div className="space-y-3">
                  <span className="text-[8px] font-black uppercase tracking-[0.5em] text-blue-500">Heart Notes</span>
                  <p className="text-sm font-medium text-white/60 leading-relaxed">{product.notes.middle.join(' • ')}</p>
                </div>
                <div className="space-y-3">
                  <span className="text-[8px] font-black uppercase tracking-[0.5em] text-blue-500">Base Notes</span>
                  <p className="text-sm font-medium text-white/60 leading-relaxed">{product.notes.base.join(' • ')}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;