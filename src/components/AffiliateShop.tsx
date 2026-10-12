import React, { useState, useMemo } from 'react';
import { AffiliateProduct } from '../types';
import { getAffiliateProducts } from '../data/affiliateProducts';
import { AffiliateManagerModal } from './AffiliateManagerModal';
import {
  ShoppingBag,
  ExternalLink,
  Star,
  Settings,
  ShieldCheck,
  Check,
  Tag,
  Sparkles,
  Search,
  Filter
} from 'lucide-react';

export const AffiliateShop: React.FC = () => {
  const [products, setProducts] = useState<AffiliateProduct[]>(getAffiliateProducts());
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activePetFilter, setActivePetFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isManagerOpen, setIsManagerOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Equipment' },
    { id: 'grooming', label: 'Grooming Kits' },
    { id: 'nutrition', label: 'Health Supplements & Food' },
    { id: 'health', label: 'First-Aid & Care' },
    { id: 'gear', label: 'Orthopedic Beds & Leashes' },
    { id: 'toys', label: 'Smart Toys & Enrichment' },
  ];

  const petFilters = [
    { id: 'all', label: 'All Pets' },
    { id: 'dog', label: 'Dogs' },
    { id: 'cat', label: 'Cats' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchPet = activePetFilter === 'all' || item.petTarget === 'all' || item.petTarget === activePetFilter;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.retailerName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchPet && matchSearch;
    });
  }, [products, activeCategory, activePetFilter, searchQuery]);

  return (
    <div id="shop" className="scroll-mt-24 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-semibold tracking-wide uppercase mb-3">
            <ShoppingBag className="w-3.5 h-3.5" /> Vet-Approved Gear & Nutrition
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-display">
            Pet Care Equipment & Curated Shop
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Essential veterinary-endorsed recovery supplies, orthopedic memory beds, grooming vacuums, and clean nutritional supplements with instant affiliate checkout.
          </p>
        </div>

        {/* Affiliate Manager CTA Button */}
        <div className="shrink-0 flex items-center gap-2">
          <button
            onClick={() => setIsManagerOpen(true)}
            className="bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-2"
            title="Configure affiliate links and partner tags"
          >
            <Settings className="w-3.5 h-3.5 text-emerald-400" />
            <span>Manage Affiliate Links</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200/80 p-4 mb-8 space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Categories Horizontal Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, brands..."
              className="w-full pl-9 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>

        {/* Sub filter: Pet Target */}
        <div className="flex items-center gap-2 pt-2 border-t border-stone-100 text-xs text-stone-600">
          <span className="font-semibold text-stone-400 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Pet Type:
          </span>
          {petFilters.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePetFilter(p.id)}
              className={`px-2.5 py-0.5 rounded-lg text-xs transition-colors ${
                activePetFilter === p.id
                  ? 'bg-amber-100 text-amber-900 font-bold'
                  : 'hover:bg-stone-100 text-stone-600'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-0.5"
          >
            <div>
              {/* Product Image & Badges */}
              <div className="relative h-48 bg-stone-100 overflow-hidden">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Badge (Best Seller / Vet Recommended) */}
                {prod.badge && (
                  <span className="absolute top-2.5 left-2.5 bg-amber-500 text-stone-950 font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
                    {prod.badge}
                  </span>
                )}

                {/* Retailer badge */}
                <span className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-xs text-white font-semibold text-[10px] px-2 py-0.5 rounded-md">
                  {prod.retailerName}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-2.5">
                {/* Rating */}
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold ml-1 text-stone-800">{prod.rating}</span>
                  </div>
                  <span className="text-stone-400">({prod.reviewCount.toLocaleString()} reviews)</span>
                </div>

                <h3 className="font-bold text-stone-900 text-sm font-display leading-snug line-clamp-2">
                  {prod.name}
                </h3>

                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  {prod.description}
                </p>

                {/* Highlights */}
                <div className="space-y-1 pt-1">
                  {prod.highlights.slice(0, 2).map((h, hi) => (
                    <div key={hi} className="text-[11px] text-stone-600 flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Price & Buy Online Affiliate Button */}
            <div className="p-4 pt-0 border-t border-stone-100 mt-2 space-y-3">
              <div className="flex items-baseline justify-between pt-2">
                <div>
                  <span className="text-lg font-extrabold text-stone-950 font-display">
                    ${prod.price.toFixed(2)}
                  </span>
                  {prod.originalPrice && (
                    <span className="text-xs text-stone-400 line-through ml-2">
                      ${prod.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {prod.originalPrice && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    Save {Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              {/* BUY ONLINE (AFFILIATE LINK) BUTTON */}
              <a
                href={prod.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-2xs flex items-center justify-center gap-1.5 group/btn"
              >
                <span>Buy Online ({prod.retailerName})</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
              </a>

              <div className="text-[9px] text-stone-600 text-center flex items-center justify-center gap-1">
                <Tag className="w-2.5 h-2.5 text-stone-600" />
                <span>Affiliate Link • Easy link management enabled</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Affiliate Link Manager Modal */}
      <AffiliateManagerModal
        isOpen={isManagerOpen}
        onClose={() => setIsManagerOpen(false)}
        products={products}
        onUpdateProducts={(updated) => setProducts(updated)}
      />
    </div>
  );
};
