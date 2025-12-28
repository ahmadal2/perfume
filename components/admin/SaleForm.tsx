import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Sale, DiscountType } from '../../types';
import { api } from '../../services/apiService';

interface SaleFormProps {
    onClose: () => void;
    onSuccess: () => void;
}

export const SaleForm: React.FC<SaleFormProps> = ({ onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<Sale>>({
        name: '',
        discountType: 'percentage',
        discountValue: 0,
        isActive: true,
        isPermanent: false,
        appliesTo: 'all',
        startDate: '',
        endDate: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.createSale(formData as any);
            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            alert(`Failed to create sale: ${(err as any).message || 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    };

    const updateField = (field: keyof Sale, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
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
                className="glass-panel w-full max-w-2xl rounded-[2rem] border border-white/10 p-8 relative"
            >
                <button onClick={onClose} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors">
                    <X size={24} />
                </button>

                <h2 className="text-3xl serif italic mb-8">New Campaign</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/50">Campaign Name</label>
                        <input
                            required
                            value={formData.name}
                            onChange={e => updateField('name', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500/50"
                            placeholder="Summer Sale 2025"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/50">Discount Type</label>
                            <select
                                value={formData.discountType}
                                onChange={e => updateField('discountType', e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none [&>option]:text-black"
                            >
                                <option value="percentage">Percentage (%)</option>
                                <option value="fixed">Fixed Amount ($)</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/50">Value</label>
                            <input
                                type="number"
                                required
                                value={formData.discountValue}
                                onChange={e => updateField('discountValue', parseFloat(e.target.value))}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/50">Start Date</label>
                            <input
                                type="datetime-local"
                                value={formData.startDate || ''}
                                onChange={e => updateField('startDate', e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none [color-scheme:dark]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/50">End Date</label>
                            <input
                                type="datetime-local"
                                disabled={formData.isPermanent}
                                value={formData.endDate || ''}
                                onChange={e => updateField('endDate', e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none [color-scheme:dark] disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 py-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isPermanent}
                                onChange={e => updateField('isPermanent', e.target.checked)}
                                className="rounded border-white/20 bg-white/5"
                            />
                            <span className="text-xs uppercase tracking-widest text-white/70">Permanent Campaign</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isActive}
                                onChange={e => updateField('isActive', e.target.checked)}
                                className="rounded border-white/20 bg-white/5"
                            />
                            <span className="text-xs uppercase tracking-widest text-white/70">Active Immediately</span>
                        </label>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white transition-colors">Cancel</button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Launch Campaign'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};
