import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { Sale, Product } from '../../types';
import { api } from '../../services/apiService';

interface SaleFormProps {
    initialData?: Sale;
    onClose: () => void;
    onSuccess: () => void;
}

export const SaleForm: React.FC<SaleFormProps> = ({ initialData, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState<Partial<Sale>>({
        name: '',
        discountType: 'percentage',
        discountValue: 0,
        isActive: true,
        isPermanent: false,
        appliesTo: 'specific_products', // Now always specific products
        targetIds: [],
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await api.getProducts();
                setProducts(data);
            } catch (err) {
                console.error("Failed to load products for sale selector:", err);
            }
        };
        loadProducts();

        if (initialData) {
            setFormData({
                ...JSON.parse(JSON.stringify(initialData)),
                targetIds: initialData.targetIds || []
            });
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Validate that at least one product is selected
        if (formData.appliesTo === 'specific_products' && (!formData.targetIds || formData.targetIds.length === 0)) {
            alert('Please select at least one product for this sale');
            setLoading(false);
            return;
        }

        // Fix: Ensure empty strings for dates are sent as null to Supabase
        const submissionData = {
            ...formData,
            startDate: formData.startDate || null,
            endDate: formData.endDate || null,
            // Ensure appliesTo is always 'specific_products' now
            appliesTo: 'specific_products' as const
        };

        console.log('💾 Submitting sale data:', submissionData);

        try {
            if (initialData && initialData.id) {
                console.log('📝 Updating existing sale:', initialData.id);
                await api.updateSale(initialData.id, submissionData);
                console.log('✅ Sale updated successfully');
            } else {
                console.log('➕ Creating new sale');
                await api.createSale(submissionData as any);
                console.log('✅ Sale created successfully');
            }
            onSuccess();
            onClose();
        } catch (err) {
            console.error('❌ Failed to save sale:', err);
            const errorMessage = (err as any).message || 'Unknown error';
            alert(`Failed to save sale: ${errorMessage}\n\nPlease check the console for details.`);
        } finally {
            setLoading(false);
        }
    };

    const toggleProduct = (productId: string) => {
        const current = formData.targetIds || [];
        if (current.includes(productId)) {
            setFormData(prev => ({ ...prev, targetIds: current.filter(id => id !== productId) }));
        } else {
            setFormData(prev => ({ ...prev, targetIds: [...current, productId] }));
        }
    };

    const updateField = (field: keyof Sale, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl overflow-y-auto"
        >
            <motion.div
                initial={{ scale: 0.95, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                className="glass-panel w-full max-w-5xl rounded-[3rem] border border-white/10 p-10 relative my-auto bg-[#020617]/50"
            >
                <button onClick={onClose} className="absolute top-10 right-10 w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all z-20">
                    <X size={20} />
                </button>

                <div className="flex flex-col lg:flex-row gap-16">

                    {/* LEFT: FORM SETTINGS */}
                    <div className="w-full lg:w-1/3 space-y-8">
                        <div>
                            <span className="text-[10px] uppercase tracking-[1em] text-blue-500 font-black block mb-4">Fiscal Policy</span>
                            <h2 className="text-4xl serif italic">{initialData ? 'Edit Campaign' : 'New Campaign'}</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black">Campaign Name</label>
                                <input
                                    required
                                    value={formData.name}
                                    onChange={e => updateField('name', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-xs uppercase tracking-widest focus:outline-none focus:border-blue-500/50"
                                    placeholder="e.g. SUMMER REVERIE 20%"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black">Type</label>
                                    <select
                                        value={formData.discountType}
                                        onChange={e => updateField('discountType', e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-[10px] uppercase tracking-widest focus:outline-none [&>option]:text-black"
                                    >
                                        <option value="percentage">Percent (%)</option>
                                        <option value="fixed">Fixed ($)</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black">Factor</label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.discountValue}
                                        onChange={e => updateField('discountValue', parseFloat(e.target.value))}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white font-black text-xl focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black">Application Scope</label>
                                <select
                                    value={formData.appliesTo}
                                    onChange={e => updateField('appliesTo', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-[10px] uppercase tracking-widest focus:outline-none [&>option]:text-black"
                                >
                                    <option value="specific_products">Selectively Marked Products</option>
                                </select>
                                <p className="text-[8px] text-white/30 uppercase tracking-wider leading-relaxed">
                                    Sales are now product-specific only for better control
                                </p>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-white/5">
                                <label className="flex items-center gap-4 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={formData.isPermanent}
                                        onChange={e => updateField('isPermanent', e.target.checked)}
                                        className="w-5 h-5 rounded-lg border-white/10 bg-white/5 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Eternal Campaign</span>
                                </label>
                                <label className="flex items-center gap-4 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={formData.isActive}
                                        onChange={e => updateField('isActive', e.target.checked)}
                                        className="w-5 h-5 rounded-lg border-white/10 bg-white/5 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Active Immediately</span>
                                </label>
                            </div>

                            <div className="flex gap-4 pt-8">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl shadow-blue-500/20 transition-all disabled:opacity-50"
                                >
                                    {loading ? 'Processing...' : 'Deploy Policy'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* RIGHT: PRODUCT PICKER */}
                    <AnimatePresence>
                        {formData.appliesTo === 'specific_products' && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="flex-1 border-l border-white/5 pl-16 space-y-8"
                            >
                                <div className="flex justify-between items-end">
                                    <div>
                                        <span className="text-[10px] uppercase tracking-[1em] text-blue-500 font-black block mb-2">Mark Selection</span>
                                        <h3 className="text-3xl serif italic">Collective Marking</h3>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-4xl font-black tracking-tighter text-blue-500">{formData.targetIds?.length}</span>
                                        <span className="text-[8px] uppercase tracking-widest text-white/30 block">Marked Essences</span>
                                    </div>
                                </div>

                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Scan Archive..."
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-[10px] uppercase tracking-widest focus:outline-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-h-[500px] overflow-y-auto pr-4 scrollbar-hide">
                                    {filteredProducts.map(p => (
                                        <button
                                            key={p.id}
                                            onClick={() => toggleProduct(p.id)}
                                            className={`relative group rounded-3xl overflow-hidden aspect-[3/4] border-2 transition-all duration-500 ${formData.targetIds?.includes(p.id) ? 'border-blue-500 shadow-2xl shadow-blue-500/20' : 'border-white/5'}`}
                                        >
                                            <img src={p.images[0]} className={`w-full h-full object-cover transition-transform duration-1000 ${formData.targetIds?.includes(p.id) ? 'scale-110 opacity-40' : 'group-hover:scale-105'}`} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                            <div className="absolute inset-x-4 bottom-4 text-left">
                                                <p className="text-[8px] uppercase tracking-widest text-white/40 mb-1">{p.brand}</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-white line-clamp-1">{p.name}</p>
                                            </div>

                                            {formData.targetIds?.includes(p.id) && (
                                                <div className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-blue-500 flex items-center justify-center text-white shadow-xl">
                                                    <Check size={16} strokeWidth={4} />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* FALLBACK INFO */}
                    {formData.appliesTo !== 'specific_products' && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-20 border-l border-white/5">
                            <div className="w-20 h-20 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center mb-8">
                                <span className="text-4xl">✨</span>
                            </div>
                            <h3 className="text-2xl serif italic mb-4">Universal Coverage</h3>
                            <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] leading-loose max-w-sm">
                                This policy will automatically disseminate across the entire collective resonance of the archive.
                            </p>
                        </div>
                    )}

                </div>
            </motion.div>
        </motion.div>
    );
};
