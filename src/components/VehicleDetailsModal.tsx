import React from 'react';
import { X, Check, Star, Shield, HelpCircle, MapPin, Compass, Users, Briefcase, Sparkles, Fuel, Settings, Landmark } from 'lucide-react';
import { Vehicle, Language } from '../types';
import { TRANSLATIONS } from '../data';

interface VehicleDetailsModalProps {
  car: Vehicle | null;
  currentLang: Language;
  currency: 'RWF' | 'USD';
  isOpen: boolean;
  onClose: () => void;
  onSelectCar: (car: Vehicle) => void;
}

export default function VehicleDetailsModal({
  car,
  currentLang,
  currency,
  isOpen,
  onClose,
  onSelectCar,
}: VehicleDetailsModalProps) {
  const t = TRANSLATIONS[currentLang];

  if (!isOpen || !car) return null;

  const formatPrice = (val: number) => {
    if (currency === 'RWF') {
      return val.toLocaleString('fr-FR') + ' RF';
    } else {
      return '$' + val;
    }
  };

  const price = currency === 'RWF' ? car.pricePerDayRwf : car.pricePerDayUsd;

  return (
    <div className="fixed inset-0 z-100 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity" 
      />

      {/* Modal Dialog */}
      <div className="relative bg-white dark:bg-slate-950 rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-100 dark:border-slate-850 overflow-hidden transition-transform transform scale-100 max-h-[90vh] flex flex-col">
        
        {/* Header Image Cover */}
        <div className="relative h-60 w-full overflow-hidden bg-gray-100">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          
          {/* Close trigger */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-slate-900/60 hover:bg-slate-900/80 text-white rounded-full transition-colors backdrop-blur-md"
          >
            <X className="h-4.5 w-4.5" />
          </button>

          {/* Type / Rating Badge overlay */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <span className="bg-blue-600 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-sm">
              {car.type.toUpperCase()}
            </span>
            <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-sm flex items-center gap-1">
              <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
              <span>{car.rating} ({car.reviewsCount} {t.reviews})</span>
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Main Titles */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
            <div>
              <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block">
                74 | FG777F • PREMIUM FLEET
              </span>
              <h3 className="text-2xl font-sans font-black text-gray-900 dark:text-white capitalize leading-tight">
                {car.name}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {currentLang === 'en' ? 'Available for instant pickup at KGL airport or hotel delivery.' : 'Disponible pour livraison immédiate à l’aéroport ou à votre hôtel.'}
              </p>
            </div>
            
            <div className="bg-blue-50/50 dark:bg-slate-900/60 border border-blue-100/50 dark:border-slate-800 p-3 rounded-xl text-right shrink-0">
              <span className="text-[9px] font-bold text-gray-400 block uppercase">{currentLang === 'en' ? 'Daily Rate' : 'Tarif journalier'}</span>
              <span className="text-xl font-extrabold text-blue-600 dark:text-yellow-400 block leading-none mt-1">
                {formatPrice(price)}
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase mt-1 block">/{t.day}</span>
            </div>
          </div>

          <hr className="border-gray-100 dark:border-slate-800" />

          {/* Quick specs grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-gray-800 dark:text-gray-200">
            <div className="bg-gray-50 dark:bg-slate-900/40 p-3 rounded-xl border border-gray-100 dark:border-slate-850 flex items-center space-x-2.5">
              <Users className="h-4.5 w-4.5 text-blue-600 dark:text-yellow-400 shrink-0" />
              <div>
                <span className="text-[9px] text-gray-400 block leading-none mb-1">SEATS</span>
                <span>{car.seats} {currentLang === 'en' ? 'Passenger' : 'Places'}</span>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-900/40 p-3 rounded-xl border border-gray-100 dark:border-slate-850 flex items-center space-x-2.5">
              <Briefcase className="h-4.5 w-4.5 text-blue-600 dark:text-yellow-400 shrink-0" />
              <div>
                <span className="text-[9px] text-gray-400 block leading-none mb-1">LUGGAGE</span>
                <span>{car.suitcases} {currentLang === 'en' ? 'Large Bags' : 'Gros Sacs'}</span>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-900/40 p-3 rounded-xl border border-gray-100 dark:border-slate-850 flex items-center space-x-2.5">
              <Fuel className="h-4.5 w-4.5 text-blue-600 dark:text-yellow-400 shrink-0" />
              <div>
                <span className="text-[9px] text-gray-400 block leading-none mb-1">FUEL</span>
                <span className="capitalize">{car.fuel === 'electric' ? (currentLang === 'en' ? 'Electric' : 'Électrique') : car.fuel}</span>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-900/40 p-3 rounded-xl border border-gray-100 dark:border-slate-850 flex items-center space-x-2.5">
              <Compass className="h-4.5 w-4.5 text-blue-600 dark:text-yellow-400 shrink-0" />
              <div>
                <span className="text-[9px] text-gray-400 block leading-none mb-1">GEARBOX</span>
                <span className="capitalize">{currentLang === 'en' ? car.transmission : (car.transmission === 'automatic' ? 'auto' : 'manuelle')}</span>
              </div>
            </div>
          </div>

          {/* Features and Description */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
                {t.features}
              </h4>
              <ul className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-300">
                {(currentLang === 'en' ? car.features : car.featuresFr).map((feat, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="border-gray-50 dark:border-slate-900" />

            {/* Travel recommendation & Limitations */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                {currentLang === 'en' ? 'Rwanda Travel Guide Compatibility' : 'Compatibilité Itinéraires Rwanda'}
              </h4>
              <div className="p-3 bg-blue-50/30 dark:bg-slate-900/30 border border-blue-100/30 dark:border-slate-800 rounded-xl space-y-1 text-xs">
                <span className="font-bold text-blue-800 dark:text-yellow-400 uppercase text-[9px] tracking-wider block">
                  {t.recommended}
                </span>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                  {currentLang === 'en' ? car.recommendedFor : car.recommendedForFr}
                </p>
                <div className="pt-2 flex items-center space-x-1.5 text-[10px] font-bold text-slate-500 mt-1 border-t border-gray-100 dark:border-slate-800/80">
                  <Landmark className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>
                    {car.type === 'suv' 
                      ? (currentLang === 'en' ? 'Fully authorized for National Safari Parks (Akagera, Virunga)' : 'Entièrement autorisé pour les Parcs Nationaux (Akagera, Virunga)')
                      : (currentLang === 'en' ? 'Perfect for Kigali urban streets & highway transits' : 'Recommandé pour Kigali urbain et liaisons interurbaines goudronnées')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Insurance note */}
          <div className="p-4 bg-gray-50 dark:bg-slate-900/60 border border-gray-100 dark:border-slate-850 rounded-xl flex items-start space-x-2.5">
            <Shield className="h-4.5 w-4.5 text-blue-600 dark:text-yellow-400 shrink-0 mt-0.5" />
            <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-normal">
              <strong>{currentLang === 'en' ? 'Full Insurance & Assitance' : 'Assurance Tous Risques Incluse'} :</strong> {t.vatIncluded}. {currentLang === 'en' ? 'No upfront credit card deposit needed.' : 'Aucun dépôt ou empreinte de carte de crédit requis en amont.'}
            </p>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-gray-150 dark:border-slate-850 bg-gray-50 dark:bg-slate-900 flex flex-col sm:flex-row gap-3 justify-end items-center">
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 px-6 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
          >
            {currentLang === 'en' ? 'Close' : 'Fermer'}
          </button>
          
          <button
            onClick={() => {
              onSelectCar(car);
              onClose();
            }}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase shadow-md transition-colors cursor-pointer flex items-center justify-center space-x-2"
          >
            <Sparkles className="h-4 w-4" />
            <span>{currentLang === 'en' ? 'Book This Vehicle' : 'Sélectionner ce Véhicule'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
