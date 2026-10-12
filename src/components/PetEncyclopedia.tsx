import React, { useState, useMemo } from 'react';
import { PET_DATABASE } from '../data/petDatabase';
import { PetInfo } from '../types';
import {
  Thermometer,
  AlertTriangle,
  HeartHandshake,
  Search,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  X,
  Droplets,
  Home,
  CheckCircle2,
  Clock,
  Activity,
  Flame,
  Info
} from 'lucide-react';

interface PetEncyclopediaProps {
  onSelectPetForConsultation?: (species: string) => void;
  selectedSpeciesFilter?: string | null;
}

export const PetEncyclopedia: React.FC<PetEncyclopediaProps> = ({
  onSelectPetForConsultation,
  selectedSpeciesFilter
}) => {
  const [selectedSpecies, setSelectedSpecies] = useState<string>(selectedSpeciesFilter || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePet, setActivePet] = useState<PetInfo | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'diet' | 'toxic' | 'behavior'>('overview');

  const speciesOptions = [
    { id: 'all', label: 'All Pets', emoji: '🐾' },
    { id: 'dog', label: 'Dogs', emoji: '🐶' },
    { id: 'cat', label: 'Cats', emoji: '🐱' },
    { id: 'bird', label: 'Birds', emoji: '🦜' },
    { id: 'rabbit', label: 'Rabbits', emoji: '🐰' },
    { id: 'guinea_pig', label: 'Guinea Pigs', emoji: '🐹' },
    { id: 'hamster', label: 'Hamsters', emoji: '🐭' },
    { id: 'reptile', label: 'Reptiles', emoji: '🦎' },
    { id: 'fish', label: 'Fishes', emoji: '🐠' },
  ];

  const filteredPets = useMemo(() => {
    return PET_DATABASE.filter((pet) => {
      const matchesSpecies = selectedSpecies === 'all' || pet.species === selectedSpecies;
      const matchesSearch =
        pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.speciesLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.popularBreeds.some((breed) => breed.toLowerCase().includes(searchQuery.toLowerCase())) ||
        pet.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSpecies && matchesSearch;
    });
  }, [selectedSpecies, searchQuery]);

  return (
    <div id="encyclopedia" className="scroll-mt-24 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-semibold tracking-wide uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Comprehensive Care Database
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-display">
          Pet Encyclopedia & Health Database
        </h2>
        <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
          Veterinary-reviewed profiles on thermal requirements, optimal nutrition, strict toxicity warnings, and psychological behavioral needs for every companion animal.
        </p>
      </div>

      {/* Search & Species Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200/80 p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search species, breeds, foods, guides..."
              className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all placeholder:text-stone-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Species Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {speciesOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedSpecies(opt.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedSpecies === opt.id
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                <span>{opt.emoji}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPets.map((pet) => (
          <div
            key={pet.id}
            className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col hover:-translate-y-0.5"
          >
            {/* Card Image */}
            <div className="relative h-48 overflow-hidden bg-stone-100">
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[11px] font-bold tracking-wider uppercase bg-emerald-600/90 backdrop-blur-xs px-2 py-0.5 rounded-md">
                  {pet.speciesLabel}
                </span>
                <h3 className="font-bold text-lg font-display mt-1 leading-snug drop-shadow-xs">
                  {pet.name.split('(')[0].trim()}
                </h3>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {pet.tagline}
                </p>

                {/* Key Metrics Quick Badges */}
                <div className="mt-3.5 space-y-2">
                  <div className="flex items-center gap-2 text-xs bg-amber-50/80 text-amber-900 border border-amber-200/60 px-2.5 py-1.5 rounded-lg">
                    <Thermometer className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">
                      Ideal Temp: <strong>{pet.idealTemperature.fahrenheit}</strong> ({pet.idealTemperature.celsius})
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs bg-red-50/80 text-red-900 border border-red-200/60 px-2.5 py-1.5 rounded-lg">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span className="truncate">
                      Toxic Alert: <strong>{pet.toxicFoods.strictlyForbidden[0]?.name}</strong>
                    </span>
                  </div>
                </div>

                {/* Popular Breeds Pill Preview */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {pet.popularBreeds.slice(0, 3).map((breed, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md font-medium"
                    >
                      {breed}
                    </span>
                  ))}
                  {pet.popularBreeds.length > 3 && (
                    <span className="text-[10px] text-stone-600 px-1 py-0.5 font-medium">
                      +{pet.popularBreeds.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-stone-100 flex items-center gap-2">
                <button
                  onClick={() => {
                    setActivePet(pet);
                    setActiveTab('overview');
                  }}
                  className="flex-1 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1 shadow-2xs"
                >
                  <span>Full Care Profile</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                {onSelectPetForConsultation && (
                  <button
                    onClick={() => onSelectPetForConsultation(pet.speciesLabel)}
                    title="Consult AI Vet about this species"
                    className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition-colors border border-emerald-200/60"
                  >
                    <HeartHandshake className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPets.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
          <p className="text-3xl mb-2">🐾</p>
          <h3 className="font-bold text-stone-800 text-lg">No matching pet guides found</h3>
          <p className="text-sm text-stone-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or select "All Pets" to browse our complete encyclopedia.
          </p>
          <button
            onClick={() => {
              setSelectedSpecies('all');
              setSearchQuery('');
            }}
            className="mt-4 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Detailed Modal Profile */}
      {activePet && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-white w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
            {/* Modal Header Banner */}
            <div className="relative h-48 sm:h-56 bg-stone-900 shrink-0">
              <img
                src={activePet.image}
                alt={activePet.name}
                className="w-full h-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>
              
              <button
                onClick={() => setActivePet(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider bg-emerald-600 px-2.5 py-0.5 rounded-md text-white">
                    {activePet.speciesLabel} Profile
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display mt-1 text-white">
                    {activePet.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-200 mt-0.5 line-clamp-1">
                    {activePet.tagline}
                  </p>
                </div>

                {onSelectPetForConsultation && (
                  <button
                    onClick={() => {
                      const spec = activePet.speciesLabel;
                      setActivePet(null);
                      onSelectPetForConsultation(spec);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 self-start sm:self-auto shrink-0"
                  >
                    <span>Consult AI Vet For This Pet</span>
                    <HeartHandshake className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-stone-200 bg-stone-50 px-6 flex items-center gap-2 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-emerald-600 text-emerald-800'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <Thermometer className="w-3.5 h-3.5" />
                <span>Environment & Temperature</span>
              </button>
              <button
                onClick={() => setActiveTab('diet')}
                className={`py-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'diet'
                    ? 'border-emerald-600 text-emerald-800'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Safe Diet & Nutrition</span>
              </button>
              <button
                onClick={() => setActiveTab('toxic')}
                className={`py-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'toxic'
                    ? 'border-red-600 text-red-700'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Strictly Toxic Foods</span>
              </button>
              <button
                onClick={() => setActiveTab('behavior')}
                className={`py-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'behavior'
                    ? 'border-emerald-600 text-emerald-800'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Behavior, Lifespan & Care</span>
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-stone-700">
              {/* TAB 1: Environment & Temperature */}
              {activeTab === 'overview' && (
                <div className="space-y-6 animate-fade-in">
                  {/* Temperature Highlight Box */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                          <Thermometer className="w-4 h-4 text-amber-600" />
                          <span>Ideal Temperature & Climate Range</span>
                        </div>
                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="text-3xl font-extrabold text-stone-900 font-display">
                            {activePet.idealTemperature.fahrenheit}
                          </span>
                          <span className="text-lg font-semibold text-stone-600">
                            ({activePet.idealTemperature.celsius})
                          </span>
                        </div>
                      </div>
                      <div className="bg-white/80 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-amber-200/80 text-xs text-stone-700">
                        <div className="flex items-center gap-1.5 font-bold text-stone-900">
                          <Droplets className="w-3.5 h-3.5 text-blue-500" />
                          <span>Humidity Requirement</span>
                        </div>
                        <p className="mt-0.5">{activePet.idealTemperature.humidity}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-amber-900 leading-relaxed bg-white/60 p-3 rounded-xl border border-amber-100">
                      <strong>Veterinary Note:</strong> {activePet.idealTemperature.comfortNotes}
                    </p>
                  </div>

                  {/* Housing & Space Requirements Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
                      <div className="flex items-center gap-2 text-stone-900 font-bold text-xs uppercase tracking-wide mb-1.5">
                        <Home className="w-4 h-4 text-emerald-600" />
                        <span>Housing & Environment</span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {activePet.environmentRequirements.housing}
                      </p>
                    </div>

                    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
                      <div className="flex items-center gap-2 text-stone-900 font-bold text-xs uppercase tracking-wide mb-1.5">
                        <Activity className="w-4 h-4 text-emerald-600" />
                        <span>Space & Roaming Needs</span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {activePet.environmentRequirements.spaceNeeds}
                      </p>
                    </div>

                    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
                      <div className="flex items-center gap-2 text-stone-900 font-bold text-xs uppercase tracking-wide mb-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Bedding & Substrate</span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {activePet.environmentRequirements.beddingSubstrate}
                      </p>
                    </div>

                    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
                      <div className="flex items-center gap-2 text-stone-900 font-bold text-xs uppercase tracking-wide mb-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <span>Lighting & Mental Enrichment</span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {activePet.environmentRequirements.lightingEnrichment}
                      </p>
                    </div>
                  </div>

                  {/* Popular Breeds */}
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-2">
                      Popular Companion Breeds & Species
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activePet.popularBreeds.map((breed, idx) => (
                        <span
                          key={idx}
                          className="bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-800 text-xs px-3 py-1 rounded-xl transition-colors"
                        >
                          {breed}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Safe Diet & Nutrition */}
              {activeTab === 'diet' && (
                <div className="space-y-6 animate-fade-in">
                  {/* Feeding Schedule Banner */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
                    <Clock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-emerald-950 text-xs uppercase tracking-wider">
                        Recommended Feeding Routine
                      </h4>
                      <p className="text-xs text-emerald-900 mt-1 leading-relaxed">
                        {activePet.safeDiet.feedingFrequency}
                      </p>
                    </div>
                  </div>

                  {/* Staples vs Treats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Staple Foods */}
                    <div className="bg-white border border-stone-200 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center gap-2 font-bold text-stone-900 text-xs uppercase tracking-wider pb-2 border-b border-stone-100">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Safe Core Staple Foods</span>
                      </div>
                      <ul className="space-y-2">
                        {activePet.safeDiet.stapleFoods.map((item, i) => (
                          <li key={i} className="text-xs text-stone-700 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Healthy Treats */}
                    <div className="bg-white border border-stone-200 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center gap-2 font-bold text-stone-900 text-xs uppercase tracking-wider pb-2 border-b border-stone-100">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>Vet-Approved Treats & Rewards</span>
                      </div>
                      <ul className="space-y-2">
                        {activePet.safeDiet.healthyTreats.map((item, i) => (
                          <li key={i} className="text-xs text-stone-700 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Safe Fruits & Veggies */}
                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
                    <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-2">
                      Safe Fresh Vegetables & Fruits Checklist
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activePet.safeDiet.safeFruitsVegetables.map((fv, i) => (
                        <span
                          key={i}
                          className="bg-white border border-emerald-200 text-emerald-900 text-xs px-2.5 py-1 rounded-lg font-medium flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{fv}</span>
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-stone-500 italic">
                      💡 {activePet.safeDiet.dietaryTips}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 3: Toxic / Strictly Forbidden Foods */}
              {activeTab === 'toxic' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-red-950 text-xs uppercase tracking-wider">
                        High Danger / Poison Warning
                      </h4>
                      <p className="text-xs text-red-900 mt-1 leading-relaxed">
                        {activePet.toxicFoods.warningNote}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {activePet.toxicFoods.strictlyForbidden.map((food, i) => (
                      <div
                        key={i}
                        className="bg-white border border-red-100 hover:border-red-200 rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-stone-900 text-sm">{food.name}</span>
                            <span
                              className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                                food.dangerLevel === 'Deadly'
                                  ? 'bg-red-600 text-white'
                                  : food.dangerLevel === 'Severe'
                                  ? 'bg-orange-500 text-white'
                                  : 'bg-amber-100 text-amber-900'
                              }`}
                            >
                              {food.dangerLevel}
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 leading-relaxed">
                            {food.reason}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-stone-900 text-white rounded-2xl flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-amber-300">
                        Suspect Ingestion Right Now?
                      </h4>
                      <p className="text-xs text-stone-300">
                        Do not wait for symptoms to appear. Contact Animal Poison Control or use our AI Vet Symptom Checker immediately.
                      </p>
                    </div>
                    {onSelectPetForConsultation && (
                      <button
                        onClick={() => {
                          const spec = activePet.speciesLabel;
                          setActivePet(null);
                          onSelectPetForConsultation(spec);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-2 rounded-xl shrink-0 transition-colors"
                      >
                        Launch Triage
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: Behavior, Lifespan & Care Tips */}
              {activeTab === 'behavior' && (
                <div className="space-y-6 animate-fade-in">
                  {/* Vital Stats Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="bg-stone-50 border border-stone-200 p-3 rounded-2xl">
                      <span className="text-[10px] font-bold text-stone-600 uppercase">Avg Lifespan</span>
                      <p className="font-extrabold text-stone-900 text-sm mt-0.5">{activePet.behaviorAndCare.lifespan}</p>
                    </div>
                    <div className="bg-stone-50 border border-stone-200 p-3 rounded-2xl">
                      <span className="text-[10px] font-bold text-stone-600 uppercase">Daily Exercise</span>
                      <p className="font-extrabold text-stone-900 text-sm mt-0.5">{activePet.behaviorAndCare.exerciseNeeds.split(':')[0]}</p>
                    </div>
                    <div className="bg-stone-50 border border-stone-200 p-3 rounded-2xl">
                      <span className="text-[10px] font-bold text-stone-600 uppercase">Grooming Needs</span>
                      <p className="font-extrabold text-stone-900 text-sm mt-0.5">{activePet.behaviorAndCare.groomingNeeds.split(',')[0]}</p>
                    </div>
                    <div className="bg-stone-50 border border-stone-200 p-3 rounded-2xl">
                      <span className="text-[10px] font-bold text-stone-600 uppercase">Temperament</span>
                      <p className="font-extrabold text-stone-900 text-sm mt-0.5 truncate">{activePet.behaviorAndCare.temperament.split(',')[0]}</p>
                    </div>
                  </div>

                  {/* Common Behaviors */}
                  <div className="bg-white border border-stone-200 rounded-2xl p-4">
                    <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-emerald-600" />
                      <span>Natural Behaviors & Communication Signals</span>
                    </h4>
                    <div className="space-y-2">
                      {activePet.behaviorAndCare.commonBehaviors.map((item, i) => (
                        <div key={i} className="text-xs text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-100 flex items-start gap-2">
                          <span className="font-bold text-emerald-700">▸</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pro Care Tips */}
                  <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4">
                    <h4 className="font-bold text-amber-950 text-xs uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Veterinarian Pro Care Tips</span>
                    </h4>
                    <ul className="space-y-2">
                      {activePet.behaviorAndCare.proCareTips.map((tip, i) => (
                        <li key={i} className="text-xs text-amber-900 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between shrink-0">
              <span className="text-[11px] text-stone-500">
                Source: AAFCO & Merck Veterinary Manual Guidelines
              </span>
              <button
                onClick={() => setActivePet(null)}
                className="bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
