import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, ArrowRight } from 'lucide-react';
import { Product, CartItem, Sale } from '../../types';
import { api } from '../../services/apiService';

interface GridProductCardProps {
    product: Product;
    onAddToCart: (item: CartItem) => void;
    onBuyNow: (item: CartItem) => void;
    activeSale?: Sale;
}

const GridProductCard: React.FC<GridProductCardProps> = ({ product, onAddToCart, onBuyNow, activeSale }) => {
    const navigate = useNavigate();
    const [userRating, setUserRating] = React.useState<number | null>(null);
    const [hasRated, setHasRated] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const primaryVariant = product.variants[0];
    const originalPrice = primaryVariant?.price || 0;

    let discountedPrice = originalPrice;
    let savingsPercent = 0;

    if (activeSale && activeSale.isActive) {
        if (activeSale.discountType === 'percentage') {
            discountedPrice = originalPrice * (1 - activeSale.discountValue / 100);
            savingsPercent = activeSale.discountValue;
        } else {
            discountedPrice = Math.max(0, originalPrice - activeSale.discountValue);
            savingsPercent = Math.round((activeSale.discountValue / originalPrice) * 100);
        }
    }

    const pricePerLiter = primaryVariant?.size
        ? (discountedPrice / (parseFloat(primaryVariant.size) / 1000)).toFixed(2)
        : '0.00';

    const cartItem: CartItem = {
        productId: product.id,
        variantId: primaryVariant?.id || '',
        name: product.name,
        brand: product.brand,
        image: product.images[0] || '',
        size: primaryVariant?.size || '',
        price: discountedPrice,
        quantity: 1,
        originalPrice: discountedPrice < originalPrice ? originalPrice : undefined
    };

    const handleRate = async (e: React.MouseEvent, rating: number) => {
        e.stopPropagation();
        if (hasRated) return;
        setUserRating(rating);
        setHasRated(true);
        await api.submitReview(product.id, rating);
    };

    return (
        <motion.div
            layout={!isMobile}
            initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate(`/product/${product.slug}`)}
            className={`group relative bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#0a0a0a] rounded-xl sm:rounded-[2rem] overflow-hidden border border-white/10 ${!isMobile ? 'hover:border-blue-500/40 transition-all duration-700 hover:shadow-[0_20px_60px_rgba(59,130,246,0.3)] hover:scale-[1.02]' : ''} flex flex-col h-full cursor-pointer shadow-2xl`}
        >
            {/* Sale Badge - Modern 2026 Design */}
            {savingsPercent > 0 && (
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="absolute top-2 sm:top-4 left-2 sm:left-4 z-20"
                >
                    <div className="relative group">
                        {/* Animated Glow Effect - Simplified or removed on mobile */}
                        {!isMobile && (
                            <motion.div
                                animate={{
                                    opacity: [0.5, 1, 0.5],
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-xl sm:rounded-2xl blur-lg opacity-75"
                            />
                        )}
                        {isMobile && (
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-xl opacity-80" />
                        )}

                        {/* Main Badge */}
                        <div className="relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 shadow-2xl overflow-hidden">
                            {/* Glassmorphism Overlay */}
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

                            {/* Animated Shine Effect - Removed on mobile */}
                            {!isMobile && (
                                <motion.div
                                    animate={{
                                        x: ['-100%', '200%'],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        repeatDelay: 1
                                    }}
                                    className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                                />
                            )}

                            {/* Text Content - Clean Design Without Emoji */}
                            <div className="relative flex items-center justify-center">
                                <span className="text-white text-[10px] sm:text-xs font-black uppercase tracking-wider drop-shadow-lg">
                                    {savingsPercent}% OFF
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Image Container with Atmospheric Background */}
            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-200 via-stone-100 to-amber-50 p-4 sm:p-8">
                {/* Decorative Elements - Simplified on Mobile */}
                {!isMobile && (
                    <>
                        <div className="absolute top-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-yellow-200/40 to-transparent rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-tl from-rose-200/30 to-transparent rounded-full blur-3xl" />
                    </>
                )}

                <motion.img
                    whileHover={isMobile ? {} : { scale: 1.08, y: -5 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    src={product.images[0]}
                    alt={product.name}
                    className="relative w-full h-full object-contain drop-shadow-2xl z-10"
                />

                {/* Hover Action Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-2 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex gap-2 z-20">
                    <button
                        onClick={(e) => { e.stopPropagation(); onAddToCart(cartItem); }}
                        className="flex-1 bg-black/60 backdrop-blur-xl border border-white/20 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-black/80 transition-all"
                    >
                        <ShoppingCart size={14} className="text-white" />
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white">Add</span>
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onBuyNow(cartItem); }}
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center hover:bg-blue-500 transition-all shadow-[0_0_30px_rgba(37,99,235,0.5)]"
                    >
                        <ArrowRight size={14} className="text-white sm:w-4 sm:h-4" />
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4 sm:p-6 flex flex-col flex-1 bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a]">
                {/* Product Name */}
                <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight mb-1 truncate">
                    {product.name}
                </h3>

                {/* Tagline */}
                <p className="text-[8px] sm:text-[10px] text-white/50 uppercase tracking-[0.2em] sm:tracking-[0.3em] font-black mb-3 sm:mb-4 leading-relaxed">
                    {product.brand} • {product.notes?.top?.[0] || 'Luxury Essence'}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <button
                                key={i}
                                onClick={(e) => handleRate(e, i + 1)}
                                className="transition-transform active:scale-90"
                            >
                                <Star
                                    size={14}
                                    className={`sm:w-4 sm:h-4 ${(userRating || Math.floor(product.rating || 5)) > i ? "fill-emerald-500 text-emerald-500" : "text-white/10"}`}
                                />
                            </button>
                        ))}
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-white/40 font-bold">({product.reviewCount || 52})</span>
                </div>

                <AnimatePresence>
                    {hasRated && (
                        <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="text-[8px] sm:text-[9px] font-bold text-emerald-400 uppercase tracking-widest mb-2"
                        >
                            Thank you!
                        </motion.p>
                    )}
                </AnimatePresence>

                {/* Pricing */}
                <div className="mt-auto space-y-1.5 sm:space-y-2">
                    {discountedPrice < originalPrice && (
                        <span className="text-xs sm:text-sm text-white/30 line-through font-mono block">
                            €{originalPrice.toFixed(2)} EUR
                        </span>
                    )}
                    <div className="flex items-baseline gap-1.5 sm:gap-2">
                        <span className="text-[8px] sm:text-[10px] text-white/50 uppercase tracking-widest font-black">Von</span>
                        <span className="text-xl sm:text-2xl font-black text-white">€{discountedPrice.toFixed(2)}</span>
                        <span className="text-xs sm:text-sm text-white/60 font-bold">EUR</span>
                    </div>
                    <div className="flex justify-between items-center text-[8px] sm:text-[9px] text-white/30 font-mono uppercase tracking-wider pt-1.5 sm:pt-2 border-t border-white/5">
                        <span>{primaryVariant?.size || 'N/A'}</span>
                        <span>€{pricePerLiter}/L</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default GridProductCard;
