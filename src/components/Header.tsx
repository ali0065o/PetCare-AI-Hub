import React, { useState } from 'react';
import { useSubscription } from '../context/SubscriptionContext';
import {
  Stethoscope,
  Heart,
  Search,
  Menu,
  X,
  PhoneCall,
  ShoppingBag,
  BookOpen,
  Calculator,
  Compass,
  Sparkles,
  Crown,
  Zap
} from 'lucide-react';
import { AdBanner } from './AdBanner';

interface HeaderProps {
  onSearch?: (query: string) => void;
  onOpenEmergency: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  onOpenEmergency,
  activeSection
}) => {
  const { currentPlan, isSubscribed, openCheckout } = useSubscription();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState('');

  const navLinks = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'encyclopedia', label: 'Pet Encyclopedia', href: '#encyclopedia' },
    { id: 'ai-vet-doctor', label: 'AI Vet Doctor', href: '#ai-vet-doctor', badge: 'AI Doctor' },
    { id: 'pakistan-map', label: 'Pakistan Pet Map', href: '#pakistan-map', badge: 'Map' },
    { id: 'pricing', label: 'Pricing & Plans', href: '#pricing', badge: isSubscribed ? 'Active' : 'Pro' },
    { id: 'shop', label: 'Shop Gear & Food', href: '#shop' },
    { id: 'health-tools', label: 'Health Tools', href: '#health-tools' },
    { id: 'blog', label: 'Blog', href: '#blog' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerSearch.trim()) {
      if (onSearch) onSearch(headerSearch);
      // Smooth scroll to encyclopedia to show search
      const enc = document.getElementById('encyclopedia');
      if (enc) enc.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-2xs">
      {/* Google AdSense Leaderboard Placement above navbar */}
      <AdBanner slot="header-leaderboard" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-700 to-teal-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Stethoscope className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl font-display text-stone-900 tracking-tight leading-none block">
                PetCare <span className="text-emerald-700">AI & Hub</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-stone-600 block mt-0.5">
                Veterinary & Care Portal
              </span>
            </div>
          </a>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden lg:flex items-center relative w-64 xl:w-80"
          >
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              placeholder="Search pets, foods, symptoms..."
              className="w-full pl-9 pr-3 py-1.5 bg-stone-100 hover:bg-stone-50 focus:bg-white border border-stone-200/90 rounded-xl text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
            />
          </form>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all relative ${
                  activeSection === link.id
                    ? 'text-emerald-800 bg-emerald-50/80 font-bold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/60'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="ml-1.5 text-[9px] font-black uppercase px-1.5 py-0.2 bg-emerald-600 text-white rounded-full">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Subscription Status & Emergency CTA */}
          <div className="flex items-center gap-2">
            {isSubscribed ? (
              <a
                href="#pricing"
                className="bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-2xs"
                title="Your active subscription"
              >
                <Crown className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">{currentPlan === 'vip' ? 'VIP Pass Active' : 'Pro Pass Active'}</span>
                <span className="sm:hidden">Pro</span>
              </a>
            ) : (
              <button
                onClick={() => openCheckout('pro')}
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                title="Upgrade to Pro Pet Care Pass"
              >
                <Zap className="w-3.5 h-3.5 text-emerald-300" />
                <span className="hidden sm:inline">Upgrade Pro</span>
                <span className="sm:hidden">Pro</span>
              </button>
            )}

            <button
              onClick={onOpenEmergency}
              className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-bold px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-2xs"
              title="24/7 Animal Poison Control Hotline"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-600 animate-pulse" />
              <span className="hidden sm:inline">24/7 ER Vet Hotline</span>
              <span className="sm:hidden">ER Vet</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-stone-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <form onSubmit={handleSearchSubmit} className="relative w-full mb-3">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              placeholder="Search pets, foods, symptoms..."
              className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </form>

          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl text-sm font-semibold text-stone-700 hover:bg-stone-100 flex items-center justify-between"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEmergency();
              }}
              className="w-full bg-red-600 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 shadow-xs"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call 24/7 Animal Poison Control Hotline</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
