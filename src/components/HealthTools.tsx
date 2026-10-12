import React, { useState } from 'react';
import { Calculator, AlertTriangle, ShieldCheck, Droplets, Flame, Search, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';

export const HealthTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chocolate' | 'calories' | 'substance'>('chocolate');

  // Chocolate Calculator State
  const [dogWeight, setDogWeight] = useState<number>(30); // lbs
  const [weightUnit, setWeightUnit] = useState<'lbs' | 'kg'>('lbs');
  const [chocolateType, setChocolateType] = useState<string>('milk');
  const [chocolateAmount, setChocolateAmount] = useState<number>(3); // oz

  // Calorie & Hydration Calculator State
  const [petType, setPetType] = useState<'dog' | 'cat'>('dog');
  const [petWeightCalc, setPetWeightCalc] = useState<number>(20); // lbs
  const [petLifeStage, setPetLifeStage] = useState<string>('neutered_adult');

  // Substance Toxicity AI Checker State
  const [substanceQuery, setSubstanceQuery] = useState('');
  const [substanceSpecies, setSubstanceSpecies] = useState('Dog');
  const [substanceLoading, setSubstanceLoading] = useState(false);
  const [substanceResult, setSubstanceResult] = useState<any | null>(null);

  // Chocolate Toxicity calculation
  // Methylxanthine (theobromine + caffeine) content in mg/oz:
  // White: ~1 mg/oz
  // Milk: ~60 mg/oz
  // Dark: ~150 mg/oz
  // Baker's chocolate: ~400 mg/oz
  // Cocoa powder: ~700 mg/oz
  const weightInKg = weightUnit === 'lbs' ? dogWeight * 0.453592 : dogWeight;
  const mgPerOzMap: Record<string, number> = {
    white: 1,
    milk: 60,
    dark: 155,
    bakers: 400,
    cocoa: 750
  };
  const totalTheobromineMg = chocolateAmount * (mgPerOzMap[chocolateType] || 60);
  const doseMgPerKg = weightInKg > 0 ? totalTheobromineMg / weightInKg : 0;

  let toxicitySeverity = 'Safe / Very Mild';
  let toxicityColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  let toxicityAction = 'Unlikely to cause major theobromine toxicity. May still cause mild diarrhea or vomiting due to rich dairy/sugar content.';

  if (doseMgPerKg >= 60) {
    toxicitySeverity = '🚨 CRITICAL DANGER: Potentially Fatal Dose';
    toxicityColor = 'text-red-700 bg-red-50 border-red-300';
    toxicityAction = 'Immediate veterinary emergency! Induce clinical emesis, administer activated charcoal, and initiate cardiac monitoring immediately.';
  } else if (doseMgPerKg >= 40) {
    toxicitySeverity = '⚠️ HIGH RISK: Cardiotoxicity / Arrhythmia Expected';
    toxicityColor = 'text-rose-700 bg-rose-50 border-rose-300';
    toxicityAction = 'Rush to emergency clinic. High risk of rapid tachycardia, tremors, muscle rigidity, and hyperthermia.';
  } else if (doseMgPerKg >= 20) {
    toxicitySeverity = '⚠️ MODERATE TOXICITY: Clinical Symptoms Likely';
    toxicityColor = 'text-amber-800 bg-amber-50 border-amber-300';
    toxicityAction = 'Contact your vet promptly. Expected signs include vomiting, diarrhea, excessive thirst, and restlessness.';
  }

  // Calorie & Hydration calculation
  // RER = 70 * (weight_kg)^0.75
  const calcWeightKg = petWeightCalc * 0.453592;
  const rer = Math.round(70 * Math.pow(calcWeightKg, 0.75));
  let merMultiplier = 1.6;

  if (petType === 'dog') {
    if (petLifeStage === 'intact_adult') merMultiplier = 1.8;
    if (petLifeStage === 'neutered_adult') merMultiplier = 1.6;
    if (petLifeStage === 'weight_loss') merMultiplier = 1.0;
    if (petLifeStage === 'senior') merMultiplier = 1.4;
    if (petLifeStage === 'puppy') merMultiplier = 3.0;
    if (petLifeStage === 'active') merMultiplier = 2.2;
  } else {
    // Cat
    if (petLifeStage === 'intact_adult') merMultiplier = 1.4;
    if (petLifeStage === 'neutered_adult') merMultiplier = 1.2;
    if (petLifeStage === 'weight_loss') merMultiplier = 0.8;
    if (petLifeStage === 'senior') merMultiplier = 1.1;
    if (petLifeStage === 'puppy') merMultiplier = 2.5; // kitten
    if (petLifeStage === 'active') merMultiplier = 1.4;
  }

  const dailyCalories = Math.round(rer * merMultiplier);
  // Water intake: approximately 50-60 ml per kg of body weight daily
  const dailyWaterMl = Math.round(calcWeightKg * 55);
  const dailyWaterCups = (dailyWaterMl / 240).toFixed(1);

  // Substance AI Check
  const handleSubstanceCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!substanceQuery.trim()) return;

    setSubstanceLoading(true);
    setSubstanceResult(null);

    try {
      const res = await fetch('/api/toxicity-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          species: substanceSpecies,
          itemIngested: substanceQuery,
          amount: 'Standard household exposure',
          timeElapsed: 'Recent',
          petWeight: 'Average'
        })
      });
      const data = await res.json();
      setSubstanceResult(data);
    } catch (err) {
      setSubstanceResult({
        dangerLevel: 'Unknown',
        summary: 'Could not connect to toxicity evaluation service. Call ASPCA Animal Poison Control at (888) 426-4435 immediately.'
      });
    } finally {
      setSubstanceLoading(false);
    }
  };

  return (
    <div id="health-tools" className="scroll-mt-24 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-semibold tracking-wide uppercase mb-3">
          <Calculator className="w-3.5 h-3.5" /> Clinical Veterinary Calculators
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-display">
          Pet Health & Emergency Dosage Calculators
        </h2>
        <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
          Evidence-based veterinary algorithms for chocolate toxicity dosage, daily resting caloric requirements, water balance, and AI emergency substance analysis.
        </p>

        {/* Tab Switcher */}
        <div className="flex justify-center mt-6">
          <div className="bg-stone-200/80 p-1 rounded-2xl inline-flex gap-1">
            <button
              onClick={() => setActiveTab('chocolate')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'chocolate'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              🍫 Dog Chocolate Toxicity
            </button>
            <button
              onClick={() => setActiveTab('calories')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'calories'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              🥗 Daily Calories & Hydration
            </button>
            <button
              onClick={() => setActiveTab('substance')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'substance'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              🧪 AI Toxic Substance Lookup
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: CHOCOLATE TOXICITY */}
      {activeTab === 'chocolate' && (
        <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-6 sm:p-8 max-w-4xl mx-auto animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h3 className="font-bold text-stone-900 text-base font-display">
                Canine Methylxanthine Exposure Calculator
              </h3>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Dog Weight:
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    max="250"
                    value={dogWeight}
                    onChange={(e) => setDogWeight(parseFloat(e.target.value) || 1)}
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <div className="bg-stone-100 rounded-xl p-1 flex">
                    <button
                      type="button"
                      onClick={() => setWeightUnit('lbs')}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                        weightUnit === 'lbs' ? 'bg-white shadow-2xs text-stone-900' : 'text-stone-500'
                      }`}
                    >
                      lbs
                    </button>
                    <button
                      type="button"
                      onClick={() => setWeightUnit('kg')}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                        weightUnit === 'kg' ? 'bg-white shadow-2xs text-stone-900' : 'text-stone-500'
                      }`}
                    >
                      kg
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Type of Chocolate Ingested:
                </label>
                <select
                  value={chocolateType}
                  onChange={(e) => setChocolateType(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="milk">Milk Chocolate (Bars, M&Ms, Hershey's)</option>
                  <option value="dark">Dark Chocolate (60% - 70% Cacao)</option>
                  <option value="bakers">Baker's / Cooking Chocolate (Unsweetened)</option>
                  <option value="cocoa">Dry Pure Cocoa Powder (Highest Danger)</option>
                  <option value="white">White Chocolate (Trace theobromine only)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Estimated Amount Ingested (Ounces):
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.5"
                  max="40"
                  value={chocolateAmount}
                  onChange={(e) => setChocolateAmount(parseFloat(e.target.value) || 0.1)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <span className="text-[11px] text-stone-400 mt-0.5 block">
                  Tip: A standard Hershey bar is 1.55 oz (43 grams).
                </span>
              </div>
            </div>

            {/* Results Card */}
            <div className={`p-6 rounded-2xl border ${toxicityColor} space-y-4`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider">Toxicity Risk Assessment</span>
                <span className="text-xs font-bold">~{doseMgPerKg.toFixed(1)} mg/kg dose</span>
              </div>

              <h4 className="text-lg font-extrabold font-display leading-snug">
                {toxicitySeverity}
              </h4>

              <p className="text-xs leading-relaxed font-medium">
                {toxicityAction}
              </p>

              <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-current text-xs space-y-1">
                <div className="flex justify-between text-stone-700">
                  <span>Theobromine Threshold:</span>
                  <span className="font-bold">20 mg/kg (Mild) • 40+ mg/kg (Cardiotoxic)</span>
                </div>
                <div className="flex justify-between text-stone-700">
                  <span>Total Ingested Methylxanthines:</span>
                  <span className="font-bold">{totalTheobromineMg.toFixed(0)} mg</span>
                </div>
              </div>

              <p className="text-[10px] opacity-75">
                Note: Darker chocolate and pure cocoa have radically higher toxin density than milk chocolate.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CALORIES & HYDRATION */}
      {activeTab === 'calories' && (
        <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-6 sm:p-8 max-w-4xl mx-auto animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h3 className="font-bold text-stone-900 text-base font-display">
                Pet Calorie (RER/MER) & Hydration Calculator
              </h3>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPetType('dog')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                    petType === 'dog'
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-stone-50 text-stone-700 border-stone-200'
                  }`}
                >
                  🐶 Dog
                </button>
                <button
                  type="button"
                  onClick={() => setPetType('cat')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                    petType === 'cat'
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-stone-50 text-stone-700 border-stone-200'
                  }`}
                >
                  🐱 Cat
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Weight (lbs):
                </label>
                <input
                  type="number"
                  min="1"
                  max="200"
                  value={petWeightCalc}
                  onChange={(e) => setPetWeightCalc(parseFloat(e.target.value) || 1)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Life Stage & Activity:
                </label>
                <select
                  value={petLifeStage}
                  onChange={(e) => setPetLifeStage(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="neutered_adult">Neutered / Spayed Adult (Normal Activity)</option>
                  <option value="intact_adult">Intact Adult</option>
                  <option value="senior">Senior / Sedentary Pet</option>
                  <option value="weight_loss">Weight Loss Plan (Calorie restriction)</option>
                  <option value="active">Active / Working / Agility Dog</option>
                  <option value="puppy">Growing Puppy / Kitten</option>
                </select>
              </div>
            </div>

            {/* Nutrition Result Box */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6 space-y-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                  Target Daily Requirements
                </span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-stone-900 font-display">
                    {dailyCalories}
                  </span>
                  <span className="text-sm font-bold text-stone-600">kcal / day (MER)</span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Resting Energy Requirement (RER): <strong>{rer} kcal</strong>
                </p>
              </div>

              <div className="pt-4 border-t border-emerald-200/80">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider">
                  <Droplets className="w-4 h-4 text-blue-600" />
                  <span>Daily Fluid Intake Target</span>
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-stone-900 font-display">
                    {dailyWaterMl} mL
                  </span>
                  <span className="text-xs font-semibold text-stone-600">
                    (~{dailyWaterCups} standard cups of fresh water)
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
                  Wet food contributes significantly to this daily fluid goal (especially essential for cats).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SUBSTANCE TOXICITY LOOKUP */}
      {activeTab === 'substance' && (
        <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-6 sm:p-8 max-w-4xl mx-auto animate-fade-in">
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-stone-900 text-base font-display">
                Emergency Substance & Plant Toxicity Screener
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Type any household plant, chemical, human medication, or food item to evaluate toxicity risk.
              </p>
            </div>

            <form onSubmit={handleSubstanceCheck} className="flex flex-col sm:flex-row gap-3">
              <select
                value={substanceSpecies}
                onChange={(e) => setSubstanceSpecies(e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 outline-none w-full sm:w-36"
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Rabbit">Rabbit</option>
              </select>

              <div className="relative flex-1">
                <input
                  type="text"
                  value={substanceQuery}
                  onChange={(e) => setSubstanceQuery(e.target.value)}
                  placeholder="e.g. Pothos leaf, Ibuprofen 200mg, Macadamia nuts, Xylitol gum..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-3.5 pr-4 py-2.5 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={substanceLoading || !substanceQuery.trim()}
                className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 shrink-0"
              >
                {substanceLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Search className="w-3.5 h-3.5" />
                )}
                <span>Check Risk</span>
              </button>
            </form>

            {/* Quick Suggestion Pills */}
            <div className="flex flex-wrap gap-1.5 text-xs text-stone-500">
              <span className="font-semibold text-stone-400 mr-1">Quick Check:</span>
              {['Aloe Vera', 'Poinsettia', 'Tylenol', 'Sago Palm', 'Garlic powder', 'Grapes'].map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setSubstanceQuery(item)}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-700 px-2 py-0.5 rounded-lg text-[11px]"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Substance Result Display */}
            {substanceResult && (
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900">
                    Evaluation for: <strong>{substanceQuery}</strong>
                  </span>
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                      substanceResult.dangerLevel === 'Critical Danger' || substanceResult.dangerLevel === 'High'
                        ? 'bg-red-600 text-white'
                        : substanceResult.dangerLevel === 'Moderate'
                        ? 'bg-amber-500 text-white'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {substanceResult.dangerLevel}
                  </span>
                </div>

                <p className="text-xs text-stone-800 leading-relaxed font-medium">
                  {substanceResult.summary}
                </p>

                {substanceResult.immediateAction && (
                  <div className="bg-white p-3 rounded-xl border border-stone-200 text-xs text-stone-900">
                    <strong>Immediate Action:</strong> {substanceResult.immediateAction}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
