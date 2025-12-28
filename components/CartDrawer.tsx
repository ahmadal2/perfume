
import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, variantId: string, delta: number) => void;
  onRemove: (productId: string, variantId: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden flex justify-end">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" 
          />
          
          {/* 2026 Bag Container */}
          <motion.div 
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-lg h-full bg-[#05070a]/80 backdrop-blur-[60px] border-l border-white/5 flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="px-8 py-10 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase tracking-[0.2em] serif italic text-white">Scent Archive</h2>
                  <p className="text-[8px] uppercase tracking-[0.4em] text-white/30 font-bold mt-1">
                    {items.length} Essence{items.length !== 1 ? 's' : ''} Stored
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 rounded-full border border-dashed border-white/10 flex items-center justify-center text-white/10">
                    <ShoppingBag size={32} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-white/40 text-xs uppercase tracking-[0.3em] font-bold">Your archive is empty.</p>
                    <Link
                      to="/catalog"
                      onClick={onClose}
                      className="inline-block text-blue-500 text-[9px] uppercase tracking-[0.5em] font-black border-b border-blue-500/20 pb-1 hover:border-blue-500 transition-all"
                    >
                      Begin Distillation
                    </Link>
                  </div>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    key={`${item.productId}-${item.variantId}`} 
                    className="group relative flex gap-6 p-4 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all duration-500"
                  >
                    <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden border border-white/5 bg-zinc-900">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-xs font-black text-white uppercase tracking-wider truncate">{item.name}</h3>
                          <button 
                            onClick={() => onRemove(item.productId, item.variantId)}
                            className="text-white/10 hover:text-red-500 transition-colors shrink-0"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-bold mt-1">
                          {item.brand} • {item.size}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3 bg-black/40 border border-white/5 rounded-full p-1">
                          <button 
                            onClick={() => onUpdateQuantity(item.productId, item.variantId, -1)}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:bg-white/5 hover:text-white transition-all"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="text-[10px] font-black w-4 text-center tabular-nums">{item.quantity}</span>
                          <button 
                             onClick={() => onUpdateQuantity(item.productId, item.variantId, 1)}
                             className="w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:bg-white/5 hover:text-white transition-all"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                        <p className="text-xs font-black text-white tracking-widest tabular-nums">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="p-8 border-t border-white/5 space-y-8 bg-[#0a0d14]/40 backdrop-blur-md">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/30 uppercase text-[9px] tracking-[0.4em] font-bold">Subtotal Resonance</span>
                    <span className="text-2xl font-black text-white tracking-tighter tabular-nums">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-3 py-3 px-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                    <ShieldCheck size={14} className="text-blue-500" />
                    <p className="text-[8px] uppercase tracking-[0.3em] text-blue-400 font-black">
                      Encrypted Boutique Transaction 2026
                    </p>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="relative group block w-full text-center bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl uppercase font-black tracking-[0.5em] text-[10px] transition-all duration-500 shadow-[0_15px_40px_rgba(37,99,235,0.2)] overflow-hidden"
                >
                  <span className="relative z-10">Finalize Distillation</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Link>
                
                <p className="text-[7px] text-white/20 text-center uppercase tracking-[0.5em] font-medium italic">
                  Taxes and logistics distilled at final step
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
