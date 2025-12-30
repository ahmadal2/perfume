import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X } from 'lucide-react';

interface RatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRate: (rating: number) => void;
    productName?: string;
    initialRating?: number | null;
}

export const RatingModal: React.FC<RatingModalProps> = ({
    isOpen,
    onClose,
    onRate,
    productName = "Product",
    initialRating = 0
}) => {
    const [hoveredRating, setHoveredRating] = useState<number | null>(null);
    const [selectedRating, setSelectedRating] = useState<number>(initialRating || 0);

    const handleRatingSubmit = (rating: number) => {
        setSelectedRating(rating);
        // Add a small delay for better UX before closing
        setTimeout(() => {
            onRate(rating);
            onClose();
        }, 300);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-2xl"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="text-center space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-white uppercase tracking-widest">
                                    Bewerten
                                </h3>
                                <p className="text-xs text-white/40 font-medium">
                                    Wie gefällt dir {productName}?
                                </p>
                            </div>

                            <div className="flex justify-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onMouseEnter={() => setHoveredRating(star)}
                                        onMouseLeave={() => setHoveredRating(null)}
                                        onClick={() => handleRatingSubmit(star)}
                                        className="p-2 transition-transform hover:scale-110 active:scale-95 focus:outline-none"
                                    >
                                        <Star
                                            size={32}
                                            fill={(hoveredRating !== null ? star <= hoveredRating : star <= selectedRating) ? "#f59e0b" : "none"}
                                            className={`transition-colors duration-200 ${(hoveredRating !== null ? star <= hoveredRating : star <= selectedRating) ? "text-[#f59e0b]" : "text-white/10"}`}
                                        />
                                    </button>
                                ))}
                            </div>

                            <div className="pt-2 text-[10px] text-white/20 uppercase tracking-widest font-mono">
                                {(hoveredRating || selectedRating) ?
                                    ['Schrecklich', 'Nicht gut', 'Ganz okay', 'Gut', 'Fantastisch'][(hoveredRating || selectedRating) - 1]
                                    : 'Wähle Sterne'}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
