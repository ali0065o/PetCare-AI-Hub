import React, { useState } from 'react';
import {
  Stethoscope,
  Compass,
  Sparkles,
  ShieldCheck,
  Heart,
  ChevronRight,
  AlertCircle,
  Lightbulb,
  Video,
  CheckCircle2
} from 'lucide-react';

interface HeroProps {
  onExplorePets: () => void;
  onConsultVet: () => void;
  onFindLocalVets: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplorePets, onConsultVet, onFindLocalVets }) => {
  const dailyTips = [
    'Cats mask pain instinctively: squinting eyes, tucked paws, and reluctance to jump are subtle signs of joint discomfort.',
    'A single grape or raisin can cause irreversible acute kidney failure in dogs of any size.',
    'Rabbits require 85%+ fresh timothy hay. If a rabbit stops eating for 12 hours, treat it as a medical emergency.',
    'Teflon (PTFE) cookware overheated above 400°F emits odorless fumes that are instantly fatal to birds.'
  ];

  const [tipIndex, setTipIndex] = useState(0);

  const nextTip = () => {
    setTipIndex((prev) => (prev + 1) % dailyTips.length);
  };

  return (
    <section id="home" className="relative pt-8 pb-16 overflow-hidden">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-amber-200/40 via-emerald-100/30 to-orange-100/40 blur-3xl pointer-events-none rounded-full -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Text & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs font-bold tracking-wide shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Next-Gen Veterinary Intelligence & Pet Care</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.1] font-display">
              Healthy, Happy Pets with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900">
                AI Veterinary
              </span>{' '}
              Triage & Care Hub.
            </h1>

            {/* Subheading */}
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Upload photos or videos of sick pets for immediate preliminary clinical symptom triage. Access comprehensive thermal environments, safe vs toxic diets, and vetted gear for dogs, cats, birds, and small pets.
            </p>

            {/* Action Buttons: "Explore Pets", "Consult AI Vet", and "Find Local Vets & Shops" */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onConsultVet}
                className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm px-6 py-3.5 rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Stethoscope className="w-4 h-4 text-emerald-200 group-hover:scale-110 transition-transform" />
                <span>Consult AI Vet</span>
                <ChevronRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExplorePets}
                className="w-full sm:w-auto bg-white hover:bg-stone-50 border border-stone-200/90 text-stone-800 font-bold text-sm px-6 py-3.5 rounded-2xl transition-all shadow-xs hover:border-emerald-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-emerald-600" />
                <span>Explore Pets</span>
              </button>

              <button
                onClick={onFindLocalVets}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-extrabold text-sm px-6 py-3.5 rounded-2xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>🇵🇰</span>
                <span>Find Local Vets & Shops</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-stone-500">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Multimodal Vision Triage</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Vet-Approved Diets</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Toxicity Alert Warning</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-white rounded-3xl p-5 shadow-xl border border-stone-200 space-y-4">
              {/* Pet Snapshot Preview */}
              <div className="relative h-60 rounded-2xl overflow-hidden bg-stone-100">
                <img
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80"
                  alt="Pet Health Checkup"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent"></div>
                
                {/* Live Scanning Simulation Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-stone-800 flex items-center gap-1.5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>AI Symptom Scanner Active</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider">
                    Preliminary Case Scan
                  </p>
                  <p className="text-sm font-bold font-display">
                    Golden Retriever • Hind Paw Favoring
                  </p>
                </div>
              </div>

              {/* Triage Preview Card */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-950 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    Immediate Atiyat (Precaution)
                  </span>
                  <span className="text-[10px] font-bold uppercase bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded">
                    Action Step
                  </span>
                </div>
                <p className="text-xs text-amber-950 leading-relaxed">
                  Restrict vigorous hopping or stairs immediately. Apply cold pack (10 min on/off) and avoid all human pain pills.
                </p>
              </div>

              {/* Daily Health Tip Ticker */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 flex items-start justify-between gap-3 text-xs">
                <div className="flex items-start gap-2 text-stone-700">
                  <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 block text-[11px] uppercase tracking-wide">
                      Daily Vet Tip #{tipIndex + 1}
                    </span>
                    <p className="text-stone-600 leading-relaxed text-[11px] mt-0.5">
                      {dailyTips[tipIndex]}
                    </p>
                  </div>
                </div>
                <button
                  onClick={nextTip}
                  className="text-stone-400 hover:text-emerald-700 p-1 shrink-0 font-bold text-xs"
                  title="Next Tip"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
