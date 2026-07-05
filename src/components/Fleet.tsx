import React, { useState } from 'react';
import { Star, Users, Briefcase, Compass, CheckCircle2, ArrowRight, Scale, Check, Eye } from 'lucide-react';
import { Vehicle, Language } from '../types';
import { VEHICLES, TRANSLATIONS } from '../data';

interface FleetProps {
  currentLang: Language;
  currency: 'RWF' | 'USD';
  onSelectCar: (car: Vehicle) => void;
  selectedCarId?: string;
  onViewDetails: (car: Vehicle) => void;
  compareList: Vehicle[];
  onToggleCompare: (car: Vehicle) => void;
  onOpenCompare: () => void;
}

export default function Fleet({
  currentLang,
  currency,
  onSelectCar,
  selectedCarId,
  onViewDetails,
  compareList,
  onToggleCompare,
  onOpenCompare,
}: FleetProps) {
  const t = TRANSLATIONS[currentLang];
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: currentLang === 'en' ? 'All' : 'Tout véhicule' },
    { id: 'suv', label: currentLang === 'en' ? 'SUVs' : 'SUVs & Crossovers' },
    { id: 'sedan', label: currentLang === 'en' ? 'Sedans' : 'Berlines' },
  ];

  const filteredVehicles = activeCategory === 'all'
    ? VEHICLES
    : VEHICLES.filter(v => v.type === activeCategory);

  const formatPrice = (val: number) => {
    if (currency === 'RWF') {
      return val.toLocaleString('fr-FR') + ' RF';
    } else {
      return '$' + val;
    }
  };

  return (
    <section id="fleet" className="py-16 bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Screenshot 1 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4" id="fleet-section-header">
          <div>
            <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 dark:text-yellow-400 block mb-2 font-mono">
              ★ {currentLang === 'en' ? 'CURATED COLLECTION' : 'COLLECTION SÉLECTIONNÉE'}
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight uppercase">
              {currentLang === 'en' ? 'A car for each trip.' : 'Une voiture pour chaque trajet.'}
            </h2>
          </div>
          
          <div className="flex items-center space-x-3">
            {compareList.length > 0 && (
              <button
                onClick={onOpenCompare}
                className="text-xs font-bold text-blue-600 dark:text-yellow-400 hover:underline inline-flex items-center space-x-1.5 p-2 bg-blue-50 dark:bg-yellow-400/10 rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <Scale className="h-3.5 w-3.5" />
                <span>{currentLang === 'en' ? `Compare (${compareList.length})` : `Comparer (${compareList.length})`}</span>
              </button>
            )}

            <button 
              onClick={() => setActiveCategory('all')}
              className="text-xs font-bold text-gray-550 dark:text-gray-400 hover:text-blue-600 dark:hover:text-yellow-400 inline-flex items-center space-x-1.5 group transition-colors cursor-pointer"
            >
              <span>{currentLang === 'en' ? 'View Entire Fleet' : 'Voir toute la flotte'}</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-2 mb-8" id="fleet-categories-bar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-blue-600 dark:bg-yellow-400 text-white dark:text-slate-950 shadow-xs'
                  : 'bg-gray-50 dark:bg-slate-900 text-gray-650 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 border border-gray-200/60 dark:border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Vehicles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" id="fleet-grid">
          {filteredVehicles.map((car) => {
            const isSelected = selectedCarId === car.id;
            const isComparing = compareList.some(c => c.id === car.id);
            const price = currency === 'RWF' ? car.pricePerDayRwf : car.pricePerDayUsd;
            
            return (
              <div
                key={car.id}
                className={`flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border transition-all duration-500 relative group ${
                  isSelected 
                    ? 'border-blue-500 ring-4 ring-blue-500/10 dark:ring-yellow-400/25 shadow-xl' 
                    : 'border-gray-150 dark:border-slate-800/80 shadow-xs hover:border-gray-300 dark:hover:border-slate-700 hover:shadow-xl hover:scale-[1.015]'
                }`}
                id={`car-card-${car.id}`}
              >
                {/* Image & Quick Action Header overlay */}
                <div className="relative aspect-4/3 w-full bg-gray-100 dark:bg-slate-950 overflow-hidden shadow-inner">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Category Tag */}
                  <span className="absolute top-4 left-4 bg-slate-950/85 dark:bg-yellow-400 text-white dark:text-slate-950 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-xs">
                    {car.type.toUpperCase()}
                  </span>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 bg-gray-950/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-xs flex items-center space-x-1 text-[9px] font-black">
                    <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                    <span>{car.rating}</span>
                  </div>

                  {/* Compare Checkbox Icon overlay */}
                  <button
                    onClick={() => onToggleCompare(car)}
                    className={`absolute bottom-4 right-4 p-2.5 rounded-full border shadow-md cursor-pointer transition-all hover:scale-110 active:scale-95 ${
                      isComparing
                        ? 'bg-blue-600 dark:bg-yellow-400 border-blue-500 text-white dark:text-slate-950'
                        : 'bg-white/95 hover:bg-white dark:bg-slate-900/95 dark:border-slate-800 text-gray-700 dark:text-gray-200'
                    }`}
                    title={isComparing ? "Remove from comparison" : "Add to comparison"}
                  >
                    {isComparing ? (
                      <Check className="h-3.5 w-3.5 stroke-[3.5px]" />
                    ) : (
                      <Scale className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    
                    {/* Name & Brand */}
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className="font-display font-black text-lg text-gray-900 dark:text-white leading-tight uppercase tracking-tight">
                          {car.name}
                        </h3>
                        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-0.5 font-mono">
                          {car.fuel === 'electric' ? (currentLang === 'en' ? 'Electric' : 'Électrique') : car.fuel} • {car.transmission === 'automatic' ? (currentLang === 'en' ? 'Automatic' : 'Auto') : 'Manuelle'}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-display font-black text-blue-600 dark:text-yellow-400 block leading-none">
                          {formatPrice(price)}
                        </span>
                        <span className="text-[9px] text-gray-400 dark:text-gray-500 font-bold block mt-1 uppercase tracking-wider">
                          /{t.day}
                        </span>
                      </div>
                    </div>

                    {/* Specifications */}
                    <div className="grid grid-cols-3 gap-2 py-2.5 border-t border-b border-gray-100 dark:border-slate-800 text-xs text-gray-500 dark:text-gray-400 font-bold font-sans transition-colors">
                      <div className="flex items-center space-x-1.5">
                        <Users className="h-4 w-4 text-gray-400 shrink-0" />
                        <span>{car.seats} {currentLang === 'en' ? 'Seats' : 'Pl'}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Briefcase className="h-4 w-4 text-gray-400 shrink-0" />
                        <span>{car.suitcases} {currentLang === 'en' ? 'Bags' : 'Bag'}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 capitalize truncate">
                        <Compass className="h-4 w-4 text-gray-400 shrink-0" />
                        <span className="truncate text-[10px]">{currentLang === 'en' ? car.transmission : (car.transmission === 'automatic' ? 'auto' : 'manu')}</span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-1.5">
                      <p className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{t.features}</p>
                      <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                        {(currentLang === 'en' ? car.features : car.featuresFr).slice(0, 4).map((feat, i) => (
                          <li key={i} className="flex items-center space-x-1.5 text-xs text-gray-600 dark:text-gray-350">
                            <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recommendation */}
                    <div className="bg-slate-50 dark:bg-slate-950/40 rounded-xl p-3 text-xs border border-gray-100 dark:border-slate-850 transition-colors">
                      <span className="font-bold text-gray-750 dark:text-gray-300 uppercase text-[9px] tracking-wider block mb-0.5 font-mono">
                        ★ {t.recommended}
                      </span>
                      <p className="text-gray-550 dark:text-gray-400 leading-relaxed font-sans">
                        {currentLang === 'en' ? car.recommendedFor : car.recommendedForFr}
                      </p>
                    </div>

                  </div>

                  {/* Buttons: Split details sheet and instant bookings */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {/* View Details modal CTA */}
                    <button
                      onClick={() => onViewDetails(car)}
                      className="py-3 rounded-xl text-xs font-bold tracking-wider border border-gray-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-gray-750 dark:text-gray-300 transition-all cursor-pointer flex items-center justify-center space-x-1.5 hover:scale-[1.01]"
                    >
                      <Eye className="h-3.5 w-3.5 text-gray-500" />
                      <span>{currentLang === 'en' ? 'Details' : 'Détails'}</span>
                    </button>

                    {/* Instant selection */}
                    <button
                      onClick={() => onSelectCar(car)}
                      className={`py-3 rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-300 cursor-pointer hover:scale-[1.01] ${
                        isSelected
                          ? 'bg-blue-50 dark:bg-yellow-400/10 text-blue-800 dark:text-yellow-400 border border-blue-200 dark:border-yellow-400/30'
                          : 'bg-blue-600 dark:bg-yellow-400 hover:bg-blue-700 dark:hover:bg-yellow-500 text-white dark:text-slate-950 shadow-sm'
                      }`}
                    >
                      <span>{isSelected ? (currentLang === 'en' ? 'Selected' : 'Sélectionné') : (currentLang === 'en' ? 'Book' : 'Réserver')}</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Brand lists marquee black bar below the fleet grid */}
      <div className="mt-16 bg-slate-950 py-4 overflow-hidden" id="brand-ticker">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center whitespace-nowrap text-xs font-mono font-medium tracking-widest text-slate-400">
          <div className="animate-marquee flex gap-12 justify-around w-full shrink-0">
            <span>HYUNDAI</span>
            <span>SUZUKI</span>
            <span>TOYOTA</span>
            <span>MERCEDES-BENZ</span>
            <span>LAND CRUISER</span>
            <span>RAV4</span>
            <span>HILUX</span>
            <span>COROLLA</span>
            <span className="hidden md:inline">HYUNDAI</span>
            <span className="hidden md:inline">SUZUKI</span>
          </div>
        </div>
      </div>
    </section>
  );
}
