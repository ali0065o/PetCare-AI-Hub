/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SubscriptionProvider } from './context/SubscriptionContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PetEncyclopedia } from './components/PetEncyclopedia';
import { AIVetDoctor } from './components/AIVetDoctor';
import { PakistanPetMap } from './components/PakistanPetMap';
import { PricingSection } from './components/PricingSection';
import { AffiliateShop } from './components/AffiliateShop';
import { HealthTools } from './components/HealthTools';
import { BlogSection } from './components/BlogSection';
import { EmergencyModal } from './components/EmergencyModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AdBanner } from './components/AdBanner';
import { Footer } from './components/Footer';

function PetCareApp() {
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [selectedPetForConsult, setSelectedPetForConsult] = useState<string>('Dog');
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConsultPetSpecies = (species: string) => {
    // Map species label to consult option
    if (species.includes('Dog')) setSelectedPetForConsult('Dog');
    else if (species.includes('Cat')) setSelectedPetForConsult('Cat');
    else if (species.includes('Bird')) setSelectedPetForConsult('Bird');
    else if (species.includes('Rabbit')) setSelectedPetForConsult('Rabbit');
    else if (species.includes('Guinea')) setSelectedPetForConsult('Guinea Pig');
    else if (species.includes('Hamster')) setSelectedPetForConsult('Hamster');
    else if (species.includes('Reptile')) setSelectedPetForConsult('Reptile');
    else if (species.includes('Fish')) setSelectedPetForConsult('Fish');
    else setSelectedPetForConsult('Other');

    scrollToSection('ai-vet-doctor');
  };

  return (
    <div className="min-h-screen bg-stone-50/50 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      {/* Modern Navigation Header with Leaderboard Ad */}
      <Header
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        activeSection={activeSection}
        onSearch={() => scrollToSection('encyclopedia')}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onExplorePets={() => scrollToSection('encyclopedia')}
          onConsultVet={() => scrollToSection('ai-vet-doctor')}
          onFindLocalVets={() => scrollToSection('pakistan-map')}
        />

        {/* 2. Pet Encyclopedia Database (FREE) */}
        <PetEncyclopedia
          onSelectPetForConsultation={handleConsultPetSpecies}
        />

        {/* Ad Space: In-Feed Interstitial Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdBanner slot="in-feed-banner" />
        </div>

        {/* 3. AI Vet Doctor & Video/Image Symptom Checker (Freemium/Pro Model) */}
        <AIVetDoctor
          initialSpecies={selectedPetForConsult}
        />

        {/* 4. Pakistan Local Pet Directory & Interactive Map (New Core Feature) */}
        <PakistanPetMap />

        {/* 5. SaaS Subscription & Pricing Plans */}
        <PricingSection />

        {/* 6. Pet Care Equipment & Affiliate Shopping Section */}
        <AffiliateShop />

        {/* 7. Health Calculators (Chocolate toxicity, calories, AI substance checker) */}
        <HealthTools />

        {/* 8. Blog & Emergency First-Aid Guides */}
        <BlogSection />
      </main>

      {/* 24/7 Animal Poison Control Hotline Modal */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />

      {/* Payment Gateway Modal (Stripe / Apple Pay / PayPal Simulator) */}
      <CheckoutModal />

      {/* Footer & Comprehensive Disclaimer */}
      <Footer
        onOpenEmergency={() => setIsEmergencyOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <SubscriptionProvider>
      <PetCareApp />
    </SubscriptionProvider>
  );
}
