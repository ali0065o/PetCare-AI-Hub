import React, { useState, useMemo } from 'react';
import { PAKISTAN_CITIES, PAKISTAN_DIRECTORY_PLACES } from '../data/pakistanDirectoryData';
import { DirectoryPlace, CityLocation } from '../types/pakistanDirectory';
import {
  MapPin,
  PhoneCall,
  MessageCircle,
  ExternalLink,
  Clock,
  Search,
  Stethoscope,
  ShoppingBag,
  ShieldAlert,
  Star,
  Copy,
  Check,
  Sparkles,
  Navigation,
  Filter,
  AlertTriangle
} from 'lucide-react';

export const PakistanPetMap: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'vet_clinic' | 'pet_shop'>('all');
  const [onlyEmergency, setOnlyEmergency] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activePinPlace, setActivePinPlace] = useState<DirectoryPlace | null>(null);

  const filteredPlaces = useMemo(() => {
    return PAKISTAN_DIRECTORY_PLACES.filter((place) => {
      const matchCity = selectedCity === 'all' || place.city === selectedCity;
      const matchType = selectedType === 'all' || place.type === selectedType;
      const matchEmergency = !onlyEmergency || place.is24x7Emergency;
      const matchSearch =
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (place.doctorName && place.doctorName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        place.servicesOrProducts.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCity && matchType && matchEmergency && matchSearch;
    });
  }, [selectedCity, selectedType, onlyEmergency, searchQuery]);

  const handleCopyAddress = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // City pins for interactive Pakistan SVG visualizer
  const cityPins = [
    { name: 'Islamabad', x: 67, y: 32, province: 'Federal' },
    { name: 'Rawalpindi', x: 66, y: 34, province: 'Punjab' },
    { name: 'Peshawar', x: 57, y: 30, province: 'KP' },
    { name: 'Lahore', x: 74, y: 45, province: 'Punjab' },
    { name: 'Faisalabad', x: 65, y: 47, province: 'Punjab' },
    { name: 'Multan', x: 55, y: 58, province: 'Punjab' },
    { name: 'Quetta', x: 34, y: 60, province: 'Balochistan' },
    { name: 'Karachi', x: 42, y: 90, province: 'Sindh' },
  ];

  return (
    <div id="pakistan-map" className="scroll-mt-24 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
          <span className="text-sm">🇵🇰</span> Verified Local Pakistan Pet Network
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-display">
          Pakistan Pet Map & Local Vets Directory
        </h2>
        <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
          Locate certified Veterinarian Doctors (with direct phone and instant <strong>WhatsApp triage</strong>) and verified Pet Food & Accessories Shops across Lahore, Karachi, Islamabad, Rawalpindi, Multan, and Faisalabad.
        </p>
      </div>

      {/* Interactive Map Visualizer & Controls */}
      <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Interactive Vector Map Representation of Pakistan */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 via-stone-900 to-stone-950 p-6 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Background Map Grid & Coordinates */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

            <div className="relative z-10 flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                  Interactive Geo Locator
                </span>
                <h3 className="text-base font-bold font-display text-white mt-0.5">
                  Pakistan Cities Hotspots
                </h3>
              </div>
              <span className="text-xs bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 px-2.5 py-1 rounded-full font-mono">
                {selectedCity === 'all' ? 'All 8 Regions' : selectedCity}
              </span>
            </div>

            {/* Interactive SVG Radar Graphic */}
            <div className="relative z-10 my-4 h-64 sm:h-72 w-full bg-stone-900/60 rounded-2xl border border-stone-800 p-3 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full max-h-64">
                {/* Pakistan Rough Geo Boundary Silhouette */}
                <path
                  d="M 52,15 L 68,18 L 78,28 L 74,45 L 70,55 L 58,68 L 48,82 L 40,94 L 32,88 L 22,76 L 20,60 L 32,48 L 45,30 Z"
                  fill="rgba(16, 185, 129, 0.08)"
                  stroke="rgba(16, 185, 129, 0.3)"
                  strokeWidth="0.8"
                  strokeDasharray="2 1"
                />

                {/* Radar target rings */}
                <circle cx="55" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                <circle cx="55" cy="50" r="28" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

                {/* City Interactive Clickable Pins */}
                {cityPins.map((pin) => {
                  const isCurrent = selectedCity === pin.name;
                  return (
                    <g
                      key={pin.name}
                      onClick={() => setSelectedCity(pin.name)}
                      className="cursor-pointer transition-transform hover:scale-125"
                    >
                      {/* Pulse circle for active pin */}
                      {isCurrent && (
                        <circle
                          cx={pin.x}
                          cy={pin.y}
                          r="5"
                          fill="rgba(16, 185, 129, 0.35)"
                          className="animate-ping"
                        />
                      )}
                      {/* Pin point */}
                      <circle
                        cx={pin.x}
                        cy={pin.y}
                        r={isCurrent ? "3" : "2"}
                        fill={isCurrent ? "#10b981" : "#e2e8f0"}
                        stroke={isCurrent ? "#ffffff" : "#0f172a"}
                        strokeWidth="0.6"
                      />
                      {/* City Text Label */}
                      <text
                        x={pin.x + 3}
                        y={pin.y + 1}
                        fontSize="3.2"
                        fontWeight={isCurrent ? "bold" : "normal"}
                        fill={isCurrent ? "#34d399" : "#cbd5e1"}
                        className="select-none font-sans"
                      >
                        {pin.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Quick Map Stat Footer */}
            <div className="relative z-10 pt-2 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
              <span>Showing {filteredPlaces.length} verified facilities</span>
              <button
                onClick={() => setSelectedCity('all')}
                className="text-emerald-400 hover:text-emerald-300 font-semibold underline"
              >
                Reset Map
              </button>
            </div>
          </div>

          {/* Right Column: Search, Filter, & City Pills */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Search Box */}
              <div className="relative mb-4">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by clinic name, doctor, or area (e.g. DHA, Gulberg, Clifton, F-7)..."
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all placeholder:text-stone-400"
                />
              </div>

              {/* City Filter Tabs */}
              <div className="space-y-1.5 mb-4">
                <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                  Select City:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {PAKISTAN_CITIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCity(c.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        selectedCity === c.id
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Type Filter & Emergency Toggle */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setSelectedType('all')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedType === 'all'
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    All Facilities
                  </button>
                  <button
                    onClick={() => setSelectedType('vet_clinic')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      selectedType === 'vet_clinic'
                        ? 'bg-emerald-700 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    <Stethoscope className="w-3 h-3" />
                    <span>Vet Doctors</span>
                  </button>
                  <button
                    onClick={() => setSelectedType('pet_shop')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      selectedType === 'pet_shop'
                        ? 'bg-emerald-700 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Pet Shops</span>
                  </button>
                </div>

                <label className="flex items-center gap-2 cursor-pointer bg-red-50 hover:bg-red-100 text-red-900 border border-red-200 px-3 py-1 rounded-xl text-xs font-bold transition-colors">
                  <input
                    type="checkbox"
                    checked={onlyEmergency}
                    onChange={(e) => setOnlyEmergency(e.target.checked)}
                    className="rounded text-red-600 focus:ring-red-500"
                  />
                  <span>🚨 24/7 Emergency Only</span>
                </label>
              </div>
            </div>

            {/* Pakistan Animal Rescue Hotline Card */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-xs text-amber-950 space-y-1">
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-1.5 text-amber-900">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  Pakistan Emergency Rescue & Stray Animal Care:
                </span>
                <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.2 rounded font-mono">24/7 HELPLINE</span>
              </div>
              <p className="text-[11px] text-amber-900 leading-relaxed">
                National Rescue: <strong>1122</strong> • Karachi: ACF Animal Rescue (<strong>0300-8288826</strong>) • Lahore: TWS Animal Shelter (<strong>0321-4444897</strong>) • Islamabad: Strays Home (<strong>0333-5123987</strong>).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Place Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaces.map((place) => (
          <div
            key={place.id}
            className="group bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-0.5"
          >
            <div>
              {/* Place Card Image & Header Badges */}
              <div className="relative h-44 bg-stone-100 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent"></div>

                {/* Facility Type Badge */}
                <span className={`absolute top-3 left-3 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md shadow-xs ${
                  place.type === 'vet_clinic'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-amber-500 text-stone-950'
                }`}>
                  {place.type === 'vet_clinic' ? '🩺 Vet Clinic & Hospital' : '🛍️ Pet Supplies & Food'}
                </span>

                {/* 24/7 Emergency Pill */}
                {place.is24x7Emergency && (
                  <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs animate-pulse">
                    24/7 Emergency
                  </span>
                )}

                {/* Bottom City / Area overlay */}
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <span className="text-[11px] font-bold text-emerald-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{place.city} • {place.area}</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                {/* Name & Doctor Details */}
                <div>
                  <h3 className="font-bold text-stone-900 text-base font-display leading-snug">
                    {place.name}
                  </h3>
                  {place.doctorName && (
                    <p className="text-xs font-semibold text-emerald-800 mt-0.5">
                      {place.doctorName}
                    </p>
                  )}
                  {place.qualification && (
                    <p className="text-[11px] text-stone-500">
                      {place.qualification}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="text-xs text-stone-600 bg-stone-50 p-2.5 rounded-xl border border-stone-100 flex items-start justify-between gap-2">
                  <div className="flex items-start gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-stone-400 mt-0.5 shrink-0" />
                    <span className="leading-relaxed line-clamp-2">{place.address}</span>
                  </div>
                  <button
                    onClick={() => handleCopyAddress(place.id, place.address)}
                    className="text-stone-400 hover:text-stone-700 p-1 shrink-0"
                    title="Copy Address"
                  >
                    {copiedId === place.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Timings */}
                <div className="flex items-center gap-2 text-xs text-stone-600">
                  <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="truncate">{place.timings}</span>
                </div>

                {/* Services / Products Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {place.servicesOrProducts.slice(0, 3).map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md font-medium"
                    >
                      {item}
                    </span>
                  ))}
                  {place.servicesOrProducts.length > 3 && (
                    <span className="text-[10px] text-stone-400 px-1 py-0.5">
                      +{place.servicesOrProducts.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons: Call, WhatsApp, Directions */}
            <div className="p-5 pt-0 border-t border-stone-100 space-y-2 mt-2">
              <div className="grid grid-cols-2 gap-2 pt-3">
                {/* Direct Phone Dialer */}
                <a
                  href={`tel:${place.phone.replace(/\s+/g, '')}`}
                  className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all shadow-2xs flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call Doctor</span>
                </a>

                {/* Direct WhatsApp Chat */}
                <a
                  href={`https://wa.me/${place.whatsapp}?text=${encodeURIComponent(
                    `Hello, I found ${place.name} on PetCare AI & Hub and would like to ask about consultation timings / appointment.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all shadow-2xs flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Google Maps Directions Link */}
              <a
                href={place.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-semibold py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPlaces.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 mt-6">
          <p className="text-3xl mb-2">📍</p>
          <h3 className="font-bold text-stone-800 text-lg">No matching facilities found</h3>
          <p className="text-sm text-stone-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query, unchecking 24/7 filter, or selecting "All Pakistan" to browse all verified facilities.
          </p>
          <button
            onClick={() => {
              setSelectedCity('all');
              setSelectedType('all');
              setOnlyEmergency(false);
              setSearchQuery('');
            }}
            className="mt-4 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
