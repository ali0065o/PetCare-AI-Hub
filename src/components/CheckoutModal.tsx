import React, { useState } from 'react';
import { useSubscription, PlanType } from '../context/SubscriptionContext';
import { ShieldCheck, CreditCard, Lock, CheckCircle2, X, Sparkles, Loader2 } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutModalOpen, closeCheckout, selectedPlanForCheckout, upgradePlan } = useSubscription();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'paypal'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('888');
  const [cardHolder, setCardHolder] = useState('Alex Taylor');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isCheckoutModalOpen) return null;

  const targetPlan: PlanType = selectedPlanForCheckout || 'pro';
  const planName = targetPlan === 'vip' ? 'Breeder & Multi-Pet VIP' : 'Pro Pet Care Pass';
  const planPrice = targetPlan === 'vip' ? '$19.99' : '$9.99';

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        upgradePlan(targetPlan);
        setIsSuccess(false);
      }, 1000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
                Stripe Secure Gateway
              </span>
              <span className="text-xs text-emerald-200">256-Bit SSL Encrypted</span>
            </div>
            <h3 className="text-xl font-bold font-display mt-1">
              Upgrade to {planName}
            </h3>
            <p className="text-xs text-emerald-100 mt-0.5">
              Unlock unlimited AI Vet Video & Photo symptom analysis.
            </p>
          </div>
          <button
            onClick={closeCheckout}
            className="w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success State */}
        {isSuccess ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-stone-900 font-display">Payment Successful!</h4>
            <p className="text-xs text-stone-500">
              Your {planName} is now active. Enjoy unlimited AI video consultations!
            </p>
          </div>
        ) : (
          /* Payment Form */
          <form onSubmit={handlePay} className="p-6 space-y-5 text-xs text-stone-700">
            {/* Plan Summary Bar */}
            <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-emerald-950 text-sm">{planName}</p>
                <p className="text-[11px] text-emerald-800 mt-0.5">Billed monthly • Cancel anytime with 1 click</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-extrabold text-stone-900 font-display">{planPrice}</span>
                <span className="text-[10px] text-stone-500 block">/ month</span>
              </div>
            </div>

            {/* Payment Method Switcher */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-stone-600 uppercase">
                Select Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2 px-3 rounded-xl border font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('applepay')}
                  className={`py-2 px-3 rounded-xl border font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'applepay'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                  }`}
                >
                  <span> Pay</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`py-2 px-3 rounded-xl border font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'paypal'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                  }`}
                >
                  <span className="font-bold text-blue-600">P</span>
                  <span>PayPal</span>
                </button>
              </div>
            </div>

            {/* Card Inputs */}
            {paymentMethod === 'card' && (
              <div className="space-y-3 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    required
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                      className="w-full bg-white border border-stone-300 rounded-xl pl-3 pr-8 py-2 text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-mono"
                    />
                    <Lock className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">
                      Expires
                    </label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM/YY"
                      required
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">
                      CVC / CVV
                    </label>
                    <input
                      type="text"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      placeholder="123"
                      required
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod !== 'card' && (
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-center space-y-2">
                <p className="text-xs text-stone-600">
                  You will be securely authenticated with your {paymentMethod === 'applepay' ? 'Apple Pay' : 'PayPal'} account.
                </p>
                <span className="text-[10px] text-stone-400 block">Instant tokenized checkout</span>
              </div>
            )}

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>30-Day Money-Back Guarantee • No Questions Asked</span>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={closeCheckout}
                className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold px-4 py-3 rounded-xl transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isProcessing}
                className="flex-1 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Pay {planPrice} & Activate Plan</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
