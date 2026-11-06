import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { adminUpdateProduct, productToUpdateBody, describeError } from '../api';

export default function ProductEditModal({ product, categoryOptions, brandOptions, onClose, onSaved, addToast }) {
  const [form, setForm] = useState({
    name: product.name,
    brand: product.brand,
    category: product.category,
    price: String(product.price),
    mrp: String(product.mrp),
    bulkPrice: String(product.bulkPrice),
    bulkMinQty: String(product.bulkMinQty),
    badge: product.badge || '',
    specs: product.specs || ''
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    setError('');
    try {
      // Send the whole product (PUT replaces details) with only the edited fields changed.
      const body = productToUpdateBody(product, {
        name: form.name.trim(),
        brand: form.brand,
        category: form.category,
        price: Number(form.price),
        mrp: Number(form.mrp),
        bulkPrice: Number(form.bulkPrice),
        bulkMinQty: Number(form.bulkMinQty),
        badge: form.badge.trim() || null,
        specs: form.specs.trim() || null
      });
      const updated = await adminUpdateProduct(product.id, body);
      addToast(`Updated ${updated.id}`);
      onSaved(updated);
    } catch (err) {
      if (err.status !== 401) setError(describeError(err));
    } finally {
      setSaving(false);
    }
  };

  const brands = brandOptions.includes(form.brand) ? brandOptions : [form.brand, ...brandOptions];
  const categories = categoryOptions.includes(form.category) ? categoryOptions : [form.category, ...categoryOptions];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto print:hidden">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-black text-slate-900">Edit Product</h3>
            <p className="text-[11px] text-slate-500 font-mono">
              {product.id} • stock is changed with the +/- buttons, not here
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Product Name *</label>
            <input required value={form.name} onChange={set('name')} className="w-full py-2 px-3 border border-slate-300 rounded-xl" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Brand</label>
              <select value={form.brand} onChange={set('brand')} className="w-full py-2 px-2 border border-slate-300 rounded-xl font-semibold">
                {brands.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Category</label>
              <select value={form.category} onChange={set('category')} className="w-full py-2 px-2 border border-slate-300 rounded-xl font-semibold">
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Selling ₹ *</label>
              <input required type="number" min="0.01" step="0.01" value={form.price} onChange={set('price')} className="w-full py-2 px-2.5 border border-slate-300 rounded-xl" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">MRP ₹ *</label>
              <input required type="number" min="0.01" step="0.01" value={form.mrp} onChange={set('mrp')} className="w-full py-2 px-2.5 border border-slate-300 rounded-xl" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Bulk ₹ *</label>
              <input required type="number" min="0.01" step="0.01" value={form.bulkPrice} onChange={set('bulkPrice')} className="w-full py-2 px-2.5 border border-slate-300 rounded-xl" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Bulk min qty *</label>
              <input required type="number" min="2" step="1" value={form.bulkMinQty} onChange={set('bulkMinQty')} className="w-full py-2 px-2.5 border border-slate-300 rounded-xl" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-1">
              <label className="font-bold text-slate-700 block mb-1">Badge</label>
              <input value={form.badge} onChange={set('badge')} className="w-full py-2 px-3 border border-slate-300 rounded-xl" />
            </div>
            <div className="col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Technical Specification</label>
              <input value={form.specs} onChange={set('specs')} className="w-full py-2 px-3 border border-slate-300 rounded-xl" />
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 font-semibold">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-px" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold"
            >
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
