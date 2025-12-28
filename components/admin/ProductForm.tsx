import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Upload, AlertCircle } from 'lucide-react';
import { Product, Gender, FragranceFamily } from '../../types';
import { api } from '../../services/apiService';

interface ProductFormProps {
    initialData?: Product;
    onClose: () => void;
    onSuccess: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ initialData, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        description: '',
        brand: '',
        category: '',
        fragranceType: 'Oriental',
        gender: 'unisex',
        isActive: true,
        isFeatured: false,
        notes: { top: [], middle: [], base: [] },
        variants: [],
        images: []
    });

    // Load categories and initial data
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const cats = await api.getCategories();
                setCategories(cats);
                // Default category if creating new
                if (!initialData && cats.length > 0) {
                    setFormData(prev => ({ ...prev, category: cats[0].id }));
                }
            } catch (e) {
                console.error("Failed to load categories", e);
            }
        };
        loadCategories();

        if (initialData) {
            setFormData(JSON.parse(JSON.stringify(initialData))); // Deep copy
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("🚀 Submitting Form Data:", formData);
        setLoading(true);
        try {
            if (initialData && initialData.id) {
                await api.updateProduct(initialData.id, formData);
            } else {
                await api.createProduct(formData as any);
            }
            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            alert(`Failed to save product: ${(err as any).message || 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    };

    // Helper to update simple fields
    const updateField = (field: keyof Product, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Helper for array fields (Notes)
    const addNote = (type: 'top' | 'middle' | 'base') => {
        const newNotes = { ...formData.notes! };
        newNotes[type] = [...newNotes[type], ''];
        setFormData(prev => ({ ...prev, notes: newNotes }));
    };

    const updateNote = (type: 'top' | 'middle' | 'base', index: number, value: string) => {
        const newNotes = { ...formData.notes! };
        newNotes[type][index] = value;
        setFormData(prev => ({ ...prev, notes: newNotes }));
    };

    const removeNote = (type: 'top' | 'middle' | 'base', index: number) => {
        const newNotes = { ...formData.notes! };
        newNotes[type] = newNotes[type].filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, notes: newNotes }));
    };

    // Helper for Variants
    const addVariant = () => {
        setFormData(prev => ({
            ...prev,
            variants: [...(prev.variants || []), { id: Date.now().toString(), size: '50ml', price: 0, stock: 0, sku: '' }]
        }));
    };

    const updateVariant = (index: number, field: string, value: any) => {
        const newVars = [...(formData.variants || [])];
        (newVars[index] as any)[field] = value;
        setFormData(prev => ({ ...prev, variants: newVars }));
    };

    const removeVariant = (index: number) => {
        setFormData(prev => ({
            ...prev,
            variants: (prev.variants || []).filter((_, i) => i !== index)
        }));
    };


    const compressImage = (file: File): Promise<File> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 1200;
                    const MAX_HEIGHT = 1200;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);
                    canvas.toBlob((blob) => {
                        if (blob) {
                            resolve(new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", { type: 'image/jpeg' }));
                        } else {
                            resolve(file);
                        }
                    }, 'image/jpeg', 0.82);
                };
            };
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        try {
            const compressed = await compressImage(file);
            const url = await api.uploadImage(compressed);
            setFormData(prev => ({
                ...prev,
                images: [url, ...(prev.images || []).slice(1)] // Replace primary image
            }));
        } catch (error: any) {
            console.error("Upload failed", error);
            alert(`Failed to upload image: ${error.message || JSON.stringify(error)}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
            <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="glass-panel w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] border border-white/10 p-8 md:p-12 relative"
            >
                <button onClick={onClose} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors">
                    <X size={24} />
                </button>

                <h2 className="text-3xl serif italic mb-8">{initialData ? 'Edit Essence' : 'New Essence'}</h2>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/50">Name</label>
                            <input
                                required
                                value={formData.name || ''}
                                onChange={e => updateField('name', e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50"
                                placeholder="Product Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/50">Brand</label>
                            <input
                                required
                                value={formData.brand || ''}
                                onChange={e => updateField('brand', e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50"
                                placeholder="Brand Name"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/50">Category</label>
                            <select
                                value={formData.category || ''}
                                onChange={e => updateField('category', e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500/50 [&>option]:text-black"
                            >
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/50">Fragrance Type</label>
                            <select
                                value={formData.fragranceType || 'oriental'}
                                onChange={e => updateField('fragranceType', e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500/50 [&>option]:text-black"
                            >
                                {['oriental', 'western', 'french', 'floral', 'woody'].map(t => (
                                    <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                        {/* Removed Gender Input */}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/50">Description</label>
                        <textarea
                            required
                            rows={4}
                            value={formData.description || ''}
                            onChange={e => updateField('description', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50"
                            placeholder="Detailed description..."
                        />
                    </div>

                    {/* Fragrance Notes */}
                    <div className="space-y-4">
                        <h3 className="text-xl serif italic">Olfactory Pyramid</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {(['top', 'middle', 'base'] as const).map(type => (
                                <div key={type} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <label className="text-[10px] uppercase tracking-widest text-white/50 capitalize">{type} Notes</label>
                                        <button type="button" onClick={() => addNote(type)} className="text-blue-400 hover:text-blue-300"><Plus size={14} /></button>
                                    </div>
                                    {formData.notes?.[type].map((note, idx) => (
                                        <div key={idx} className="flex gap-2">
                                            <input
                                                value={note}
                                                onChange={e => updateNote(type, idx, e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none"
                                            />
                                            <button type="button" onClick={() => removeNote(type, idx)} className="text-white/20 hover:text-red-500"><X size={14} /></button>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Variants */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl serif italic">Variants & Stock</h3>
                            <button type="button" onClick={addVariant} className="text-xs uppercase tracking-widest text-blue-400 hover:text-blue-300 flex items-center gap-2">
                                <Plus size={14} /> Add Variant
                            </button>
                        </div>

                        <div className="space-y-4">
                            {formData.variants?.map((v, idx) => (
                                <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end bg-white/[0.02] p-4 rounded-xl border border-white/5">
                                    <div className="space-y-1">
                                        <label className="text-[9px] uppercase tracking-widest text-white/40">Size</label>
                                        <select
                                            value={v.size}
                                            onChange={e => updateVariant(idx, 'size', e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white [&>option]:text-black"
                                        >
                                            {['30ml', '50ml', '100ml', 'custom'].map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] uppercase tracking-widest text-white/40">Price ($)</label>
                                        <input type="number" step="0.01" value={v.price} onChange={e => updateVariant(idx, 'price', parseFloat(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] uppercase tracking-widest text-white/40">Stock</label>
                                        <input type="number" value={v.stock} onChange={e => updateVariant(idx, 'stock', parseInt(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] uppercase tracking-widest text-white/40">SKU</label>
                                        <input type="text" value={v.sku} onChange={e => updateVariant(idx, 'sku', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white" />
                                    </div>
                                    <div className="flex justify-end pb-2">
                                        <button type="button" onClick={() => removeVariant(idx)} className="text-red-500/50 hover:text-red-500"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                            ))}
                            {(!formData.variants || formData.variants.length === 0) && (
                                <div className="text-center py-8 text-white/20 text-sm border border-dashed border-white/10 rounded-xl">No variants added</div>
                            )}
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-4">
                        <label className="text-[10px] uppercase tracking-widest text-white/50">Primary Image</label>

                        {/* Desktop Upload */}
                        <div className="flex items-center gap-4">
                            <label className="flex items-center justify-center px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer gap-2">
                                <Upload size={16} className="text-white/60" />
                                <span className="text-sm text-white/80">Upload File</span>
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                            </label>
                            <span className="text-xs text-white/30 uppercase tracking-widest">OR</span>

                            {/* URL Input */}
                            <input
                                value={formData.images?.[0] || ''}
                                onChange={e => {
                                    const newImages = [...(formData.images || [])];
                                    newImages[0] = e.target.value;
                                    setFormData(prev => ({ ...prev, images: newImages }));
                                }}
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50"
                                placeholder="Paste Image URL..."
                            />
                        </div>

                        {/* Preview */}
                        {formData.images?.[0] && (
                            <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-white/20 group">
                                <img src={formData.images[0]} alt="Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <p className="text-[9px] uppercase tracking-widest text-white">Preview</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-4 pt-8">
                        <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-colors">Cancel</button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save Essence'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};
