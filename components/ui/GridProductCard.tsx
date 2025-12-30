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
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate(`/product/${product.slug}`)}
            className="group relative bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-500 flex flex-col h-full cursor-pointer"
        >
            {/* Sale Badge */}
            {savingsPercent > 0 && (
                <div className={`absolute top-4 left-4 z-20 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-2xl border ${savingsPercent > 30 ? 'animate-sale-urgency text-white' : 'bg-blue-600 text-white border-blue-400'}`}>
                    Save {savingsPercent}%
                </div>
            )}

            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-white/5 to-transparent">
                <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-700"
                />

                {/* Hover Action Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); onAddToCart(cartItem); }}
                        className="flex-1 blue-glass py-3 rounded-2xl flex items-center justify-center gap-2"
                    >
                        <ShoppingCart size={14} className="text-blue-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Add</span>
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onBuyNow(cartItem); }}
                        className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                    >
                        <ArrowRight size={16} className="text-white" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
                <div className="space-y-1 mb-4">
                    <span className="text-[9px] text-blue-500 font-mono tracking-[0.3em] uppercase">{product.brand}</span>
                    <h3 className="text-xl font-bold text-white tracking-tight font-serif italic truncate">{product.name}</h3>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-black leading-tight line-clamp-2">
                        In the direction of {product.notes?.top?.[0] || 'Luxury'}
                    </p>
                </div>

                {/* Rating */}
                <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <button
                                key={i}
                                onClick={(e) => handleRate(e, i + 1)}
                                className="transition-transform active:scale-90"
                            >
                                <Star
                                    size={14}
                                    className={`${(userRating || Math.floor(product.rating || 5)) > i ? "fill-blue-500 text-blue-500" : "text-white/10"}`}
                                />
                            </button>
                        ))}
                        <span className="text-[10px] text-white/30 font-black ml-1">({product.reviewCount || 0})</span>
                    </div>
                    <AnimatePresence>
                        {hasRated && (
                            <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="text-[8px] font-bold text-blue-400 uppercase tracking-widest"
                            >
                                Thank you!
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-auto space-y-2">
                    <div className="flex flex-col">
                        {discountedPrice < originalPrice && (
                            <span className="text-xs text-blue-500/30 line-through font-mono">€{originalPrice.toFixed(2)} EUR</span>
                        )}
                        <div className="flex items-baseline gap-2">
                            <span className="text-[9px] text-white/40 uppercase tracking-widest font-black">Von</span>
                            <span className="text-xl font-black text-white">€{discountedPrice.toFixed(2)} EUR</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center text-[9px] text-white/20 font-mono uppercase tracking-widest">
                        <span>{primaryVariant?.size || 'N/A'}</span>
                        <span>€{pricePerLiter}/l</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default GridProductCard;
