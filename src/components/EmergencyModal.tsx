import React from 'react';
import { PhoneCall, AlertTriangle, ShieldAlert, HeartPulse, X, ExternalLink } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border-2 border-red-300 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Urgent Header */}
        <div className="p-6 bg-gradient-to-r from-red-700 via-rose-700 to-red-800 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded">
                Code Red Hotline
              </span>
              <span className="text-xs font-semibold text-rose-200">24/7 National Emergency</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold font-display mt-1">
              Pet Emergency & Poison Control Hotlines
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-stone-700">
          {/* Hotline Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4.5 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-900 block">
                ASPCA Animal Poison Control Center
              </span>
              <a
                href="tel:18884264435"
                className="text-xl font-extrabold text-red-700 hover:text-red-800 flex items-center gap-2"
              >
                <PhoneCall className="w-5 h-5" /> (888) 426-4435
              </a>
              <p className="text-xs text-red-900 leading-relaxed">
                Available 24 hours a day, 365 days a year across North America for suspected toxin ingestions.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4.5 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block">
                Pet Poison Helpline (24/7)
              </span>
              <a
                href="tel:18557647661"
                className="text-xl font-extrabold text-amber-800 hover:text-amber-900 flex items-center gap-2"
              >
                <PhoneCall className="w-5 h-5" /> (855) 764-7661
              </a>
              <p className="text-xs text-amber-900 leading-relaxed">
                Staffed by veterinary toxicologists and critical care specialists for acute crises.
              </p>
            </div>
          </div>

          {/* Quick 3-Step Emergency Triage Checklist */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4.5 space-y-3">
            <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-red-600" />
              Immediate Actions While In Transit to Clinic:
            </h4>
            <div className="space-y-2 text-xs text-stone-700">
              <div className="flex items-start gap-2">
                <span className="font-bold text-red-600">1.</span>
                <span><strong>Never induce vomiting without explicit vet direction:</strong> Corrosive chemicals, batteries, and sharp bones cause fatal esophageal tears on the way back up.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-red-600">2.</span>
                <span><strong>Save the packaging or plant specimen:</strong> Bring the exact bottle, candy wrapper, or plant leaf in a ziplock bag to the emergency vet so they identify the exact antidote.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-red-600">3.</span>
                <span><strong>Keep pet warm and gently restrained:</strong> Wrap in a soft towel or blanket to prevent hypothermia and self-injury from tremors.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            I Understand / Close
          </button>
        </div>
      </div>
    </div>
  );
};
