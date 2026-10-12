import React, { useState } from 'react';
import { ExternalLink, Info, Sparkles, X } from 'lucide-react';

interface AdBannerProps {
  slot: 'header-leaderboard' | 'sidebar-card' | 'in-feed-banner' | 'consultation-sponsor' | 'footer-banner';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ slot, className = '' }) => {
  const [closed, setClosed] = useState(false);
  const [showAdInfo, setShowAdInfo] = useState(false);

  if (closed) return null;

  // Header Leaderboard (728x90 desktop / 320x50 mobile)
  if (slot === 'header-leaderboard') {
    return (
      <div className={`w-full bg-stone-100 border-b border-stone-200/80 py-1.5 px-4 no-print ${className}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-stone-600">
            <span className="bg-stone-200 px-1.5 py-0.5 rounded text-stone-600">Ad</span>
            <span>Google AdSense (Leaderboard 728x90 / Responsive)</span>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <a
              href="https://www.chewy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-white/90 hover:bg-white border border-stone-200 px-4 py-1.5 rounded-lg text-xs transition-all shadow-xs"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold text-stone-800">
                Chewy Pharmacy: <span className="font-normal text-stone-600">Get 20% off your first pet medication & diet order. Code: <strong className="text-emerald-700">PETCARE20</strong></span>
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-600 transition-colors" />
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowAdInfo(!showAdInfo)}
              title="AdSense Placement Info"
              className="text-stone-400 hover:text-stone-600 p-1 text-xs"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setClosed(true)}
              className="text-stone-400 hover:text-stone-600 p-1"
              title="Close Ad"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {showAdInfo && (
          <div className="max-w-xl mx-auto mt-2 p-2.5 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900 flex justify-between items-center">
            <span><strong>Ad Slot ID:</strong> data-ad-slot="header_leaderboard_728x90" • Responsive Display Ad</span>
            <button onClick={() => setShowAdInfo(false)} className="text-xs font-semibold underline ml-2">Hide</button>
          </div>
        )}
      </div>
    );
  }

  // Sidebar Ad (300x250 Medium Rectangle or 300x600 Half Page)
  if (slot === 'sidebar-card') {
    return (
      <div className={`bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200/80 rounded-2xl p-4.5 shadow-xs relative overflow-hidden no-print ${className}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded">
              Sponsored
            </span>
            <span className="text-[11px] text-stone-600 font-medium">Google AdSense (300x250)</span>
          </div>
          <button onClick={() => setClosed(true)} className="text-stone-400 hover:text-stone-600">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="relative z-10 space-y-2 mt-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">🩺</span>
            <h4 className="font-bold text-stone-900 text-sm">24/7 Licensed Pet Telehealth</h4>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Need an immediate live video prescription? Connect with state-licensed veterinarians in 15 minutes.
          </p>
          <div className="bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-amber-100 flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700">$29 First Consult</span>
            <a
              href="https://www.chewy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs px-3 py-1.5 rounded-lg inline-flex items-center gap-1 shadow-xs transition-colors"
            >
              Consult Now <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="text-[10px] text-stone-600 mt-2 text-right">
          Ad by Google • slot-id: sidebar_rect_300x250
        </div>
      </div>
    );
  }

  // In-Feed Interstitial Banner (Between Content Sections)
  if (slot === 'in-feed-banner') {
    return (
      <div className={`my-8 bg-stone-900 text-stone-100 rounded-2xl p-6 relative overflow-hidden shadow-md no-print ${className}`}>
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded">
                Sponsored Partner
              </span>
              <span className="text-xs text-stone-400">AdSense In-Feed 728x90 Placement</span>
            </div>
            <h4 className="text-lg font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
              <span>Fresh, Human-Grade Pet Food Delivered Frozen</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h4>
            <p className="text-xs text-stone-300 max-w-xl">
              Cooked gently with whole USDA meats, veggies, and zero preservatives. See visible energy and digestion improvements in 14 days.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="https://www.thefarmersdog.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              Claim 50% Off First Box <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => setClosed(true)}
              className="text-stone-400 hover:text-stone-200 text-xs px-2 py-1"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Consultation Results Sponsor (Shown right inside AI Vet output for veterinary meds/products)
  if (slot === 'consultation-sponsor') {
    return (
      <div className={`mt-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 no-print ${className}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 text-lg shrink-0 font-bold">
            Rx
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase bg-emerald-200/70 text-emerald-900 px-1.5 py-0.5 rounded">Sponsored Partner</span>
              <span className="text-xs font-bold text-stone-800">Pet Pharmacy & Triage Delivery</span>
            </div>
            <p className="text-xs text-stone-600 mt-0.5">
              Need sterile saline wash, gastrointestinal electrolyte powder, or prescribed vet diets? Express overnight delivery available.
            </p>
          </div>
        </div>
        <a
          href="https://www.chewy.com"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
        >
          Browse Vet Rx Supplies <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    );
  }

  // Footer Banner
  return (
    <div className={`w-full bg-stone-100/70 border-t border-stone-200 py-3 px-4 text-center text-xs text-stone-500 no-print ${className}`}>
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-3">
        <span className="text-[10px] font-bold bg-stone-200 text-stone-600 px-1.5 py-0.5 rounded">Ad Slot</span>
        <span>Google AdSense Matched Content Unit • ID: data-ad-client="ca-pub-petcarehub"</span>
      </div>
    </div>
  );
};
