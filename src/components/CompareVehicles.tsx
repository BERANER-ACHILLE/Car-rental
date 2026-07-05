import React from 'react';
import { X, Scale, Users, Briefcase, Fuel, Settings, HelpCircle, AlertCircle, Check, ArrowRight } from 'lucide-react';
import { Vehicle, Language } from '../types';
import { TRANSLATIONS } from '../data';

interface CompareVehiclesProps {
  currentLang: Language;
  currency: 'RWF' | 'USD';
  compareList: Vehicle[];
  onRemove: (carId: string) => void;
  onClear: () => void;
  onSelectCar: (car: Vehicle) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function CompareVehicles({
  currentLang,
  currency,
  compareList,
  onRemove,
  onClear,
  onSelectCar,
  isOpen,
  onClose,
}: CompareVehiclesProps) {
  const t = TRANSLATIONS[currentLang];

  if (!isOpen) return null;

  const formatPrice = (val: number) => {
    if (currency === 'RWF') {
      return val.toLocaleString('fr-FR') + ' RF';
    } else {
      return '$' + val;
    }
  };

  const translateFuel = (fuel: string) => {
    if (currentLang === 'fr') {
      if (fuel === 'electric') return 'Électrique';
      if (fuel === 'hybrid') return 'Hybride';
      if (fuel === 'diesel') return 'Diesel';
      if (fuel === 'petrol') return 'Essence';
    }
    return fuel;
  };

  const translateTransmission = (trans: string) => {
    if (currentLang === 'fr') {
      if (trans === 'automatic') return 'Automatique';
      if (trans === 'manual') return 'Manuelle';
    }
    return trans;
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300" 
      />

      {/* Slideout Panel */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-950 h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-gray-100 dark:border-slate-800 transition-transform duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-150 dark:border-slate-800 flex justify-between items-center bg-gray-50 dark:bg-slate-900/60">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-blue-600 text-white rounded-lg">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-lg text-slate-800 dark:text-white leading-tight">
                {currentLang === 'en' ? 'Compare Vehicles' : 'Comparer les Véhicules'}
              </h3>
              <p className="text-xs text-gray-400">
                {currentLang === 'en' 
                  ? `Select up to 3 cars (${compareList.length}/3 selected)` 
                  : `Sélectionnez jusqu'à 3 voitures (${compareList.length}/3 sélectionnées)`}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {compareList.length > 0 && (
              <button
                onClick={onClear}
                className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline px-3 py-1 cursor-pointer"
              >
                {currentLang === 'en' ? 'Clear All' : 'Tout effacer'}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Comparison Board Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {compareList.length === 0 ? (
            <div className="text-center py-24 space-y-4 max-w-sm mx-auto">
              <div className="inline-flex p-4 bg-gray-50 dark:bg-slate-900 text-gray-400 dark:text-gray-600 rounded-full">
                <Scale className="h-10 w-10 stroke-1" />
              </div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                {currentLang === 'en' ? 'No Vehicles Selected' : 'Aucun véhicule sélectionné'}
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                {currentLang === 'en'
                  ? 'Click "Compare" on any car card in our fleet section to perform a side-by-side analysis.'
                  : 'Cliquez sur "Comparer" sur n’importe quelle carte de la flotte pour afficher un comparatif détaillé.'}
              </p>
              <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full text-xs tracking-wider uppercase shadow-xs cursor-pointer"
              >
                {currentLang === 'en' ? 'Browse Fleet' : 'Voir la Flotte'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* Specs categories side column on desktop */}
              <div className="hidden md:block md:col-span-3 space-y-16 pt-36 text-xs font-bold uppercase text-gray-400 tracking-wider">
                <div className="border-b border-gray-50 dark:border-slate-900 pb-2">
                  {currentLang === 'en' ? 'Rate / Day' : 'Tarif / Jour'}
                </div>
                <div className="border-b border-gray-50 dark:border-slate-900 pb-2">
                  {currentLang === 'en' ? 'Fuel Type' : 'Carburant'}
                </div>
                <div className="border-b border-gray-50 dark:border-slate-900 pb-2">
                  {currentLang === 'en' ? 'Gearbox' : 'Boîte de vitesses'}
                </div>
                <div className="border-b border-gray-50 dark:border-slate-900 pb-2">
                  {currentLang === 'en' ? 'Passenger' : 'Capacité'}
                </div>
                <div className="border-b border-gray-50 dark:border-slate-900 pb-2">
                  {currentLang === 'en' ? 'Luggage' : 'Bagages'}
                </div>
                <div className="border-b border-gray-50 dark:border-slate-900 pb-2">
                  {currentLang === 'en' ? 'Recommended For' : 'Idéal Pour'}
                </div>
                <div>{currentLang === 'en' ? 'Top Features' : 'Équipements Clés'}</div>
              </div>

              {/* Vehicle columns */}
              <div className={`md:col-span-9 grid gap-4`} style={{ gridTemplateColumns: `repeat(${compareList.length}, minmax(0, 1fr))` }}>
                {compareList.map((car) => {
                  const rate = currency === 'RWF' ? car.pricePerDayRwf : car.pricePerDayUsd;
                  return (
                    <div 
                      key={car.id} 
                      className="border border-gray-150 dark:border-slate-800 rounded-xl overflow-hidden relative bg-slate-50/50 dark:bg-slate-900/20 p-4 space-y-6 flex flex-col justify-between"
                    >
                      {/* Close button for single car */}
                      <button
                        onClick={() => onRemove(car.id)}
                        className="absolute top-2 right-2 p-1 bg-white/80 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full shadow-xs border border-gray-100 transition-colors z-10"
                        title="Remove vehicle"
                      >
                        <X className="h-3 w-3" />
                      </button>

                      {/* Info & Image */}
                      <div className="space-y-3">
                        <div className="aspect-16/10 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={car.image}
                            alt={car.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white capitalize text-sm leading-tight">
                            {car.name}
                          </h4>
                          <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block">
                            {car.type}
                          </span>
                        </div>
                      </div>

                      {/* Specs breakdown rows */}
                      <div className="space-y-4 text-xs font-semibold text-gray-800 dark:text-gray-300">
                        {/* Daily Rate */}
                        <div className="space-y-1 py-1 border-b border-gray-100 dark:border-slate-800/80">
                          <span className="md:hidden text-[9px] font-bold text-gray-400 block uppercase">{currentLang === 'en' ? 'Rate / Day' : 'Tarif / Jour'}</span>
                          <span className="text-base font-extrabold text-blue-600 dark:text-yellow-400">
                            {formatPrice(rate)}
                          </span>
                        </div>

                        {/* Fuel Type */}
                        <div className="space-y-1 py-1 border-b border-gray-100 dark:border-slate-800/80 flex items-center space-x-1.5">
                          <span className="md:hidden text-[9px] font-bold text-gray-400 block uppercase mr-2">{currentLang === 'en' ? 'Fuel' : 'Carburant'}</span>
                          <Fuel className="h-3.5 w-3.5 text-gray-400" />
                          <span>{translateFuel(car.fuel)}</span>
                        </div>

                        {/* Transmission */}
                        <div className="space-y-1 py-1 border-b border-gray-100 dark:border-slate-800/80 flex items-center space-x-1.5">
                          <span className="md:hidden text-[9px] font-bold text-gray-400 block uppercase mr-2">{currentLang === 'en' ? 'Gearbox' : 'Boîte'}</span>
                          <Settings className="h-3.5 w-3.5 text-gray-400" />
                          <span className="capitalize">{translateTransmission(car.transmission)}</span>
                        </div>

                        {/* Seats */}
                        <div className="space-y-1 py-1 border-b border-gray-100 dark:border-slate-800/80 flex items-center space-x-1.5">
                          <span className="md:hidden text-[9px] font-bold text-gray-400 block uppercase mr-2">{currentLang === 'en' ? 'Seats' : 'Places'}</span>
                          <Users className="h-3.5 w-3.5 text-gray-400" />
                          <span>{car.seats} {currentLang === 'en' ? 'Seats' : 'Places'}</span>
                        </div>

                        {/* Luggage */}
                        <div className="space-y-1 py-1 border-b border-gray-100 dark:border-slate-800/80 flex items-center space-x-1.5">
                          <span className="md:hidden text-[9px] font-bold text-gray-400 block uppercase mr-2">{currentLang === 'en' ? 'Luggage' : 'Bagages'}</span>
                          <Briefcase className="h-3.5 w-3.5 text-gray-400" />
                          <span>{car.suitcases} {currentLang === 'en' ? 'Bags' : 'Sacs'}</span>
                        </div>

                        {/* Recommended */}
                        <div className="space-y-1 py-1 border-b border-gray-100 dark:border-slate-800/80">
                          <span className="md:hidden text-[9px] font-bold text-gray-400 block uppercase">{currentLang === 'en' ? 'Recommended for' : 'Recommandé pour'}</span>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-normal font-normal italic">
                            "{currentLang === 'en' ? car.recommendedFor : car.recommendedForFr}"
                          </p>
                        </div>

                        {/* Features */}
                        <div className="space-y-1.5">
                          <span className="md:hidden text-[9px] font-bold text-gray-400 block uppercase">{currentLang === 'en' ? 'Top features' : 'Équipements'}</span>
                          <ul className="space-y-1 text-[11px] font-normal text-gray-600 dark:text-gray-400">
                            {(currentLang === 'en' ? car.features : car.featuresFr).slice(0, 3).map((feat, i) => (
                              <li key={i} className="flex items-center space-x-1">
                                <span className="h-1 w-1 bg-blue-500 rounded-full" />
                                <span className="truncate">{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Select & Book CTA */}
                      <button
                        onClick={() => {
                          onSelectCar(car);
                          onClose();
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg text-xs tracking-wider uppercase transition-all shadow-xs cursor-pointer flex items-center justify-center space-x-1.5"
                      >
                        <span>{currentLang === 'en' ? 'Book' : 'Réserver'}</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>
          )}
        </div>

        {/* Bottom Banner */}
        <div className="p-4 border-t border-gray-150 dark:border-slate-900 bg-gray-50 dark:bg-slate-900/60 text-center text-[10px] text-gray-400">
          FlexiRent Ltd Rwanda. Complete transparency, comprehensive pricing.
        </div>

      </div>
    </div>
  );
}
