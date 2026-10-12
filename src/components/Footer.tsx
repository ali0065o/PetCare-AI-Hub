import React from 'react';
import { Stethoscope, PhoneCall, AlertTriangle, Heart, ExternalLink, ShieldCheck } from 'lucide-react';
import { AdBanner } from './AdBanner';

interface FooterProps {
  onOpenEmergency: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEmergency }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-8 border-t border-stone-800">
      {/* Footer Banner Ad */}
      <AdBanner slot="footer-banner" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center font-bold">
                <Stethoscope className="w-5 h-5 text-emerald-100" />
              </div>
              <span className="font-extrabold text-xl font-display text-white">
                PetCare <span className="text-emerald-400">AI & Hub</span>
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              Dedicated to companion animal welfare through cutting-edge multimodal AI triage, clinical nutrition guides, and verified pet equipment.
            </p>

            <button
              onClick={onOpenEmergency}
              className="bg-red-700/80 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 transition-colors border border-red-500/50"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
              <span>24/7 Animal Poison Control</span>
            </button>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Pet Encyclopedia
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#encyclopedia" className="hover:text-emerald-400 transition-colors">Canine (Dogs & Puppies)</a></li>
              <li><a href="#encyclopedia" className="hover:text-emerald-400 transition-colors">Feline (Cats & Kittens)</a></li>
              <li><a href="#encyclopedia" className="hover:text-emerald-400 transition-colors">Avian (Birds & Parrots)</a></li>
              <li><a href="#encyclopedia" className="hover:text-emerald-400 transition-colors">Lagomorphs (Rabbits)</a></li>
              <li><a href="#encyclopedia" className="hover:text-emerald-400 transition-colors">Small Mammals & Reptiles</a></li>
            </ul>
          </div>

          {/* Clinical Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              AI Vet & Local Networks
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#pakistan-map" className="hover:text-emerald-400 transition-colors">🇵🇰 Pakistan Pet Map & Directory</a></li>
              <li><a href="#ai-vet-doctor" className="hover:text-emerald-400 transition-colors">Multimodal Symptom Checker</a></li>
              <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">Pro Pet Care Pass Subscription</a></li>
              <li><a href="#health-tools" className="hover:text-emerald-400 transition-colors">Dog Chocolate Toxicity Calculator</a></li>
              <li><a href="#shop" className="hover:text-emerald-400 transition-colors">Affiliate Equipment Shop</a></li>
            </ul>
          </div>

          {/* Affiliate & Legal Disclosures */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Transparency & Affiliates
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              PetCare AI & Hub is a participant in retail affiliate programs (Amazon Associates, Chewy Partner, Petco). We may earn a small commission from qualifying purchases through our shop at zero extra cost to you.
            </p>
            <div className="pt-2 text-[11px] text-stone-500">
              <span>Google AdSense publisher compliant • Responsive ad slots</span>
            </div>
          </div>
        </div>

        {/* Big Medical Disclaimer Box */}
        <div className="p-4 bg-stone-950/80 rounded-2xl border border-stone-800 text-xs text-stone-400 leading-relaxed text-center space-y-1">
          <p className="font-bold text-stone-300 flex items-center justify-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Comprehensive Veterinary Health Disclaimer</span>
          </p>
          <p>
            The artificial intelligence triage guidance and encyclopedia databases provided on PetCare AI & Hub are intended strictly for educational, preliminary, and informational reference. They do not constitute formal veterinary medical diagnoses or treatments. If your pet exhibits severe pain, labored breathing, seizures, continuous vomiting, or suspected poison ingestion, rush to a licensed physical emergency veterinary clinic immediately.
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-stone-800 text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} PetCare AI & Hub. All rights reserved.</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Built with compassionate veterinary care</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
