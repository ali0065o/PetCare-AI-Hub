import React, { useState } from 'react';
import { AffiliateProduct } from '../types';
import { saveAffiliateProducts, resetAffiliateProducts } from '../data/affiliateProducts';
import { ExternalLink, Link2, RotateCcw, Save, Trash2, Plus, Sparkles, X, Check } from 'lucide-react';

interface AffiliateManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: AffiliateProduct[];
  onUpdateProducts: (updated: AffiliateProduct[]) => void;
}

export const AffiliateManagerModal: React.FC<AffiliateManagerModalProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateProducts
}) => {
  const [editedProducts, setEditedProducts] = useState<AffiliateProduct[]>(products);
  const [globalAmazonTag, setGlobalAmazonTag] = useState('petcareai-20');
  const [globalChewyTag, setGlobalChewyTag] = useState('petcarehub');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLinkChange = (id: string, newUrl: string) => {
    setEditedProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, affiliateUrl: newUrl } : p))
    );
  };

  const handlePriceChange = (id: string, newPrice: number) => {
    setEditedProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, price: newPrice } : p))
    );
  };

  const applyGlobalTags = () => {
    setEditedProducts((prev) =>
      prev.map((p) => {
        let url = p.affiliateUrl;
        if (p.retailerName === 'Amazon' && globalAmazonTag) {
          url = url.replace(/tag=[^&]+/, `tag=${globalAmazonTag}`);
          if (!url.includes('tag=')) {
            url += `${url.includes('?') ? '&' : '?'}tag=${globalAmazonTag}`;
          }
        } else if (p.retailerName === 'Chewy' && globalChewyTag) {
          url = url.replace(/aff_id=[^&]+/, `aff_id=${globalChewyTag}`);
          if (!url.includes('aff_id=')) {
            url += `${url.includes('?') ? '&' : '?'}aff_id=${globalChewyTag}`;
          }
        }
        return { ...p, affiliateUrl: url };
      })
    );
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleSave = () => {
    saveAffiliateProducts(editedProducts);
    onUpdateProducts(editedProducts);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleReset = () => {
    if (confirm('Reset all affiliate links and products to factory defaults?')) {
      const defaults = resetAffiliateProducts();
      setEditedProducts(defaults);
      onUpdateProducts(defaults);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-stone-900 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded">
                Affiliate Control Center
              </span>
              <span className="text-xs text-stone-400">Easy Link Management</span>
            </div>
            <h3 className="text-xl font-bold font-display mt-1">
              Manage Affiliate Product Links & Tracking IDs
            </h3>
            <p className="text-xs text-stone-300 mt-0.5">
              Easily update your Amazon Associates, Chewy Partner, or Petco affiliate tracking parameters without editing source code.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Batch Tag Updater */}
        <div className="p-4 bg-amber-50/70 border-b border-amber-200/80 shrink-0">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div>
                <label className="block text-[10px] font-bold uppercase text-amber-900">
                  Global Amazon Tag:
                </label>
                <input
                  type="text"
                  value={globalAmazonTag}
                  onChange={(e) => setGlobalAmazonTag(e.target.value)}
                  placeholder="e.g. yourtag-20"
                  className="bg-white border border-amber-300 rounded-lg px-2.5 py-1 text-xs text-stone-800 outline-none w-36"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-amber-900">
                  Global Chewy Tag:
                </label>
                <input
                  type="text"
                  value={globalChewyTag}
                  onChange={(e) => setGlobalChewyTag(e.target.value)}
                  placeholder="e.g. yourchewyid"
                  className="bg-white border border-amber-300 rounded-lg px-2.5 py-1 text-xs text-stone-800 outline-none w-36"
                />
              </div>
            </div>

            <button
              onClick={applyGlobalTags}
              className="bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-2xs flex items-center gap-1.5 self-end sm:self-auto shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" /> Apply Tags Across Catalog
            </button>
          </div>
        </div>

        {/* Product Links List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {editedProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 max-w-sm">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0"
                />
                <div>
                  <h4 className="text-xs font-bold text-stone-900 line-clamp-1">{prod.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] bg-stone-200 text-stone-700 px-1.5 py-0.5 rounded font-medium">
                      {prod.retailerName}
                    </span>
                    <span className="text-xs font-bold text-emerald-700">${prod.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full space-y-1">
                <label className="block text-[10px] font-semibold text-stone-500 uppercase">
                  Target Affiliate URL:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={prod.affiliateUrl}
                    onChange={(e) => handleLinkChange(prod.id, e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs text-stone-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <a
                    href={prod.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-stone-200 hover:bg-stone-300 rounded-xl text-stone-700 shrink-0 transition-colors"
                    title="Test Open Link"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between shrink-0">
          <button
            onClick={handleReset}
            className="text-stone-500 hover:text-red-600 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset to Defaults
          </button>

          <div className="flex items-center gap-3">
            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <Check className="w-4 h-4" /> Saved!
              </span>
            )}
            <button
              onClick={onClose}
              className="bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-6 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
