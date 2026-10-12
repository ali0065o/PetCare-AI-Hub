import React, { useState } from 'react';
import { useSubscription, PlanType } from '../context/SubscriptionContext';
import {
  Sparkles,
  Check,
  X,
  CreditCard,
  Zap,
  ShieldCheck,
  Crown,
  HelpCircle,
  Video,
  FileText
} from 'lucide-react';

export const PricingSection: React.FC = () => {
  const { currentPlan, isSubscribed, openCheckout, downgradePlan } = useSubscription();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      id: 'free' as PlanType,
      name: 'Free Companion',
      priceMonthly: 0,
      priceAnnual: 0,
      description: 'Essential encyclopedia knowledge, dosage calculators, and basic text symptom guidance.',
      badge: 'Free Forever',
      popular: false,
      features: [
        { text: 'Pet Encyclopedia (All 8 Species & Breeds)', included: true },
        { text: 'Thermal & Environment Guides', included: true },
        { text: 'Toxic & Safe Foods Database', included: true },
        { text: 'Chocolate & Calorie Calculators', included: true },
        { text: '1 Free Trial AI Video/Photo Symptom Scan', included: true },
        { text: 'Basic Text Symptom Guidance Preview', included: true },
        { text: 'Unlimited Video/Photo AI Vet Consultations', included: false },
        { text: 'Custom Veterinary Recovery Diet Recipes', included: false },
        { text: 'Follow-Up AI Vet Doctor Q&A Chat', included: false },
        { text: 'Printable Clinical Clinic Reports', included: false },
      ],
      buttonText: currentPlan === 'free' ? 'Current Plan' : 'Downgrade to Free',
    },
    {
      id: 'pro' as PlanType,
      name: 'Pro Pet Care Pass',
      priceMonthly: 9.99,
      priceAnnual: 7.99,
      description: 'The gold standard for dedicated pet owners needing instant AI video & photo triage triage 24/7.',
      badge: 'Most Popular',
      popular: true,
      features: [
        { text: 'Everything in Free Companion', included: true },
        { text: 'Unlimited AI Video & Photo Symptom Scans', included: true },
        { text: 'Full Differential Clinical Diagnosis Breakdown', included: true },
        { text: 'Immediate Precautions (Atiyat) Action Steps', included: true },
        { text: 'Specialized Recovery Diet & Hydration Plans', included: true },
        { text: 'Interactive Follow-up AI Vet Doctor Chat', included: true },
        { text: 'Downloadable & Printable Clinic PDF Reports', included: true },
        { text: 'Consultation History Cloud Sync', included: true },
        { text: 'Ad-Free Browsing Experience', included: true },
      ],
      buttonText: currentPlan === 'pro' ? 'Current Active Plan' : 'Subscribe Now',
    },
    {
      id: 'vip' as PlanType,
      name: 'Multi-Pet VIP Pass',
      priceMonthly: 19.99,
      priceAnnual: 15.99,
      description: 'Comprehensive coverage for households with multiple pets, breeders, and fosters.',
      badge: 'Best Value For Multi-Pets',
      popular: false,
      features: [
        { text: 'Everything in Pro Pet Care Pass', included: true },
        { text: 'Up to 10 Individual Pet Health Profiles', included: true },
        { text: 'Priority Gemini 3.8 Multi-Vision Processing', included: true },
        { text: 'Emergency Medication & Vaccine Timelines', included: true },
        { text: 'Licensed Telehealth Partner Discounts (20% off)', included: true },
        { text: '24/7 Priority Emergency Triage Hotline Support', included: true },
      ],
      buttonText: currentPlan === 'vip' ? 'Current Active Plan' : 'Upgrade to VIP',
    },
  ];

  const handlePlanClick = (planId: PlanType) => {
    if (planId === currentPlan) return;
    if (planId === 'free') {
      if (confirm('Downgrade to the Free plan? Premium video scans will require a pass.')) {
        downgradePlan();
      }
    } else {
      openCheckout(planId);
    }
  };

  const faqs = [
    {
      q: 'How does the AI Video/Photo Symptom Checker work?',
      a: 'Our platform uses multimodal vision algorithms to examine gait, limping, skin rashes, eye discharge, and posture from your uploaded videos or photos, cross-referencing thousands of clinical veterinary presentations.'
    },
    {
      q: 'Can I cancel my subscription anytime?',
      a: 'Yes, with zero lock-in or cancellation fees. You can switch plans or cancel with a single click at any time from your account panel.'
    },
    {
      q: 'Does this replace my physical neighborhood veterinarian?',
      a: 'No. Our AI Vet provides rapid preliminary triage, immediate safety precautions (Atiyat), and recovery diets for mild concerns or while you arrange a clinic appointment. In acute life-threatening situations, physical clinic care is essential.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit and debit cards (Visa, MasterCard, American Express), Apple Pay, Google Pay, and PayPal via 256-bit SSL encrypted Stripe processing.'
    }
  ];

  return (
    <div id="pricing" className="scroll-mt-24 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-semibold tracking-wide uppercase mb-3">
          <Zap className="w-3.5 h-3.5" /> Flexible SaaS Subscription Plans
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-display">
          Affordable Peace of Mind for Every Pet Parent
        </h2>
        <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
          Access our comprehensive Encyclopedia & Health Tools 100% free forever, or upgrade to the <strong>Pro Pet Care Pass</strong> for unlimited multimodal AI video & photo symptom consultations.
        </p>

        {/* Monthly vs Annual Toggle */}
        <div className="mt-8 inline-flex items-center gap-3 bg-stone-100 p-1.5 rounded-2xl border border-stone-200">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              billingCycle === 'monthly'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              billingCycle === 'annual'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>Annual (Save 20%)</span>
            <span className="text-[10px] bg-amber-400 text-stone-950 font-black px-1.5 py-0.2 rounded-md">
              SAVE
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
        {plans.map((plan) => {
          const isCurrent = currentPlan === plan.id;
          const displayPrice = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;

          return (
            <div
              key={plan.id}
              className={`relative bg-white rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? 'border-2 border-emerald-600 shadow-xl ring-4 ring-emerald-500/10'
                  : 'border border-stone-200 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs ${
                      plan.popular
                        ? 'bg-emerald-700 text-white'
                        : 'bg-stone-800 text-white'
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="text-center pt-2 pb-6 border-b border-stone-100">
                  <h3 className="text-xl font-bold font-display text-stone-900">{plan.name}</h3>
                  <p className="text-xs text-stone-500 mt-1 min-h-[36px]">{plan.description}</p>

                  <div className="mt-4 flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-extrabold font-display text-stone-950">
                      ${displayPrice.toFixed(2)}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">/ month</span>
                  </div>
                  {billingCycle === 'annual' && plan.priceMonthly > 0 && (
                    <span className="text-[10px] text-emerald-700 font-semibold block mt-1">
                      Billed annually (${(displayPrice * 12).toFixed(2)}/yr)
                    </span>
                  )}
                </div>

                {/* Features List */}
                <ul className="py-6 space-y-3">
                  {plan.features.map((feat, fi) => (
                    <li key={fi} className="flex items-start gap-2.5 text-xs">
                      {feat.included ? (
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-4 h-4 text-stone-300 shrink-0 mt-0.5" />
                      )}
                      <span className={feat.included ? 'text-stone-700 font-medium' : 'text-stone-400 line-through'}>
                        {feat.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-stone-100">
                <button
                  onClick={() => handlePlanClick(plan.id)}
                  disabled={isCurrent}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer ${
                    isCurrent
                      ? 'bg-stone-100 text-stone-500 cursor-default border border-stone-200'
                      : plan.popular
                      ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-md'
                      : 'bg-stone-900 hover:bg-stone-800 text-white'
                  }`}
                >
                  {isCurrent ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>{plan.buttonText}</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>{plan.buttonText}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-3xl mx-auto pt-8 border-t border-stone-200">
        <h3 className="text-xl font-bold font-display text-center text-stone-900 mb-8 flex items-center justify-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-600" />
          <span>Frequently Asked Billing & Consultation Questions</span>
        </h3>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-stone-50 border border-stone-200 rounded-2xl p-4.5 space-y-1">
              <h4 className="font-bold text-xs sm:text-sm text-stone-900">{faq.q}</h4>
              <p className="text-xs text-stone-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
