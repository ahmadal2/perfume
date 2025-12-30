
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../services/apiService';
import { Product, CartItem, Sale } from '../types';
import PerfumeShowcase from '../components/ui/spatial-product-showcase';
import GridProductCard from '../components/ui/GridProductCard';
import { TextEffect } from '../components/ui/text-effect';
import { LayoutGrid, Maximize2 } from 'lucide-react';

interface CatalogProps {
  onAddToCart: (item: CartItem) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
}

const Catalog: React.FC<CatalogProps> = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'cinematic' | 'grid'>('grid');

  // Real Data State
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prods, cats, allSales] = await Promise.all([
          api.getPublicProducts(),
          api.getCategories(),
          api.getSales()
        ]);
        setProducts(prods);
        setCategories(cats);
        setSales(allSales);
      } catch (error) {
        console.error("Failed to load catalog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase());

      let matchFilter = true;
      if (activeFilter !== 'all' && activeFilter !== 'price-asc' && activeFilter !== 'price-desc') {
        // Filter by Category UUID
        matchFilter = p.category === activeFilter;
      }

      return matchSearch && matchFilter && p.isActive;
    });

    // Apply Sorting
    if (activeFilter === 'price-asc') {
      result.sort((a, b) => {
        const priceA = a.variants?.[0]?.price || 0;
        const priceB = b.variants?.[0]?.price || 0;
        return priceA - priceB;
      });
    } else if (activeFilter === 'price-desc') {
      result.sort((a, b) => {
        const priceA = a.variants?.[0]?.price || 0;
        const priceB = b.variants?.[0]?.price || 0;
        return priceB - priceA;
      });
    }

    return result;
  }, [searchQuery, activeFilter, products]);

  const handleBuyNow = (item: CartItem) => {
    onAddToCart(item);
    navigate('/checkout');
  };

  const filterButtons = [
    { id: 'all', label: 'All' },
    { id: 'price-asc', label: 'Price: Low to High' },
    { id: 'price-desc', label: 'Price: High to Low' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-24 text-white">
      {/* Immersive Background Glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-900/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-2 gap-16 items-end"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="h-px w-10 bg-blue-500/20" />
              <TextEffect per="char" preset="fade" className="text-blue-400 text-[10px] uppercase tracking-[1em] font-black">
                Olfactory Archives
              </TextEffect>
            </div>
            <div className="flex items-center justify-between">
              <TextEffect
                per="char"
                preset="blur"
                as="h1"
                className="text-7xl md:text-[9rem] serif italic font-black text-white leading-none tracking-tighter text-glow"
              >
                The Vault.
              </TextEffect>
              <button
                onClick={() => {
                  setLoading(true);
                  window.location.reload();
                }}
                className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                title="Refresh Archive"
              >
                <motion.div whileTap={{ rotate: 360 }}>
                  <Filter size={20} className="text-blue-400" />
                </motion.div>
              </button>
            </div>
          </div>

          <div className="space-y-6 max-w-md pb-4">
            <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] leading-loose font-bold">
              Distilling the essence of 2026. Explore our gender-refined collections and rare original flacons.
            </p>
            <div className="h-px w-full bg-gradient-to-r from-blue-500/20 to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* 2026 Refined Control Bar */}
      <div className="max-w-4xl mx-auto px-6 mb-20 relative z-20">
        <div className="flex flex-col lg:flex-row items-center gap-4 bg-[#0a0d14]/40 backdrop-blur-3xl border border-white/5 p-2 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)]">

          {/* Search & Meta Icons */}
          <div className="flex items-center gap-2 pl-4 flex-1 w-full lg:w-auto">
            <Search className="text-white/20" size={16} />
            <input
              type="text"
              placeholder="Search Archives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none py-3 text-[11px] uppercase tracking-[0.3em] focus:outline-none placeholder:text-white/10 text-white font-bold w-full"
            />

            <div className="h-6 w-px bg-white/10 mx-2" />

            <div className="flex items-center gap-1">
              <button
                onClick={() => setViewMode('cinematic')}
                className={`p-2.5 rounded-xl transition-all ${viewMode === 'cinematic' ? 'bg-white/10 text-white' : 'text-white/20 hover:text-white'}`}
              >
                <Maximize2 size={16} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-lg' : 'text-white/20 hover:text-white'}`}
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          </div>

          {/* Filter & Sort Pills */}
          <div className="flex items-center gap-2 p-1 w-full lg:w-auto overflow-x-auto no-scrollbar justify-center">
            {filterButtons.map(btn => (
              <button
                key={btn.id}
                onClick={() => setActiveFilter(btn.id)}
                className={`whitespace-nowrap px-6 py-3 rounded-full text-[9px] uppercase tracking-[0.2em] font-black transition-all duration-500 border ${activeFilter === btn.id
                  ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                  : 'bg-white/5 border-white/5 text-white/40 hover:text-white hover:bg-white/10'
                  }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`w-full ${viewMode === 'grid' ? 'max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8' : ''}`}>
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => {
            const activeSale = sales.find(s => s.isActive && (
              s.appliesTo === 'all' ||
              (s.appliesTo === 'specific_products' && s.targetIds?.includes(product.id)) ||
              (s.appliesTo === 'specific_categories' && s.targetIds?.includes(product.category))
            ));

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 1 }}
                layout
              >
                {viewMode === 'cinematic' ? (
                  <PerfumeShowcase
                    product={product}
                    onAddToCart={onAddToCart}
                    onBuyNow={handleBuyNow}
                    activeSale={activeSale}
                  />
                ) : (
                  <GridProductCard
                    product={product}
                    onAddToCart={onAddToCart}
                    onBuyNow={handleBuyNow}
                    activeSale={activeSale}
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredProducts.length === 0 && (
          <div className="py-40 text-center space-y-6">
            <h2 className="text-xl md:text-2xl serif italic text-white/20 tracking-[0.4em] uppercase">Archive contains no matching resonance.</h2>
            <button
              onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
              className="text-[10px] text-blue-500 uppercase tracking-[0.5em] font-black border-b border-blue-500/20 pb-1 hover:text-blue-400 transition-colors"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
