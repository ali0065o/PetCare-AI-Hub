import React, { createContext, useContext, useState, useEffect } from 'react';

export type PlanType = 'free' | 'pro' | 'vip';

interface SubscriptionContextType {
  currentPlan: PlanType;
  trialScansLeft: number;
  isSubscribed: boolean;
  upgradePlan: (plan: PlanType) => void;
  downgradePlan: () => void;
  useTrialScan: () => boolean;
  isCheckoutModalOpen: boolean;
  selectedPlanForCheckout: PlanType | null;
  openCheckout: (plan: PlanType) => void;
  closeCheckout: () => void;
}

const LOCAL_STORAGE_PLAN_KEY = 'petcare_subscription_plan_v2';
const LOCAL_STORAGE_SCANS_KEY = 'petcare_trial_scans_v2';

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPlan, setCurrentPlan] = useState<PlanType>('free');
  const [trialScansLeft, setTrialScansLeft] = useState<number>(1);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<PlanType | null>(null);

  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem(LOCAL_STORAGE_PLAN_KEY) as PlanType;
      if (savedPlan && ['free', 'pro', 'vip'].includes(savedPlan)) {
        setCurrentPlan(savedPlan);
      }
      const savedScans = localStorage.getItem(LOCAL_STORAGE_SCANS_KEY);
      if (savedScans !== null) {
        setTrialScansLeft(parseInt(savedScans, 10));
      }
    } catch (e) {}
  }, []);

  const upgradePlan = (plan: PlanType) => {
    setCurrentPlan(plan);
    try {
      localStorage.setItem(LOCAL_STORAGE_PLAN_KEY, plan);
    } catch (e) {}
    setIsCheckoutModalOpen(false);
  };

  const downgradePlan = () => {
    setCurrentPlan('free');
    try {
      localStorage.setItem(LOCAL_STORAGE_PLAN_KEY, 'free');
    } catch (e) {}
  };

  const useTrialScan = (): boolean => {
    if (currentPlan === 'pro' || currentPlan === 'vip') return true;
    if (trialScansLeft > 0) {
      const next = trialScansLeft - 1;
      setTrialScansLeft(next);
      try {
        localStorage.setItem(LOCAL_STORAGE_SCANS_KEY, next.toString());
      } catch (e) {}
      return true;
    }
    return false;
  };

  const openCheckout = (plan: PlanType) => {
    setSelectedPlanForCheckout(plan);
    setIsCheckoutModalOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutModalOpen(false);
    setSelectedPlanForCheckout(null);
  };

  const isSubscribed = currentPlan === 'pro' || currentPlan === 'vip';

  return (
    <SubscriptionContext.Provider
      value={{
        currentPlan,
        trialScansLeft,
        isSubscribed,
        upgradePlan,
        downgradePlan,
        useTrialScan,
        isCheckoutModalOpen,
        selectedPlanForCheckout,
        openCheckout,
        closeCheckout,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
