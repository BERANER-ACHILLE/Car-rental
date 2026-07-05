import React, { useState } from 'react';
import { Calendar, MapPin, ArrowRight, Star, Search, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';

interface HeroProps {
  currentLang: Language;
  currency: 'RWF' | 'USD';
  onSearch: (searchData: {
    pickup: string;
    dropoff: string;
    pickupDate: string;
    dropoffDate: string;
    category: string;
  }) => void;
}

export default function Hero({ currentLang, currency, onSearch }: HeroProps) {
  const t = TRANSLATIONS[currentLang];
  const [vehicleType, setVehicleType] = useState('all');
  
  // Set default dates
  const today = new Date();
  const formatShortDate = (d: Date) => {
    return d.toISOString().split('T')[0];
  };

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const fiveDaysLater = new Date();
  fiveDaysLater.setDate(today.getDate() + 6);

  const [pickupDate, setPickupDate] = useState(formatShortDate(tomorrow));
  const [dropoffDate, setDropoffDate] = useState(formatShortDate(fiveDaysLater));

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      pickup: 'kigali_airport',
      dropoff: 'kigali_airport',
      pickupDate,
      dropoffDate,
      category: vehicleType,
    });
    
    const fleetSection = document.getElementById('fleet');
    if (fleetSection) {
      fleetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFleet = () => {
    const fleetSection = document.getElementById('fleet');
    if (fleetSection) {
      fleetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative bg-white dark:bg-slate-950 pt-28 pb-20 overflow-hidden transition-colors">
      {/* Premium Subtle Dot Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-70 pointer-events-none" />
      
      {/* Soft Ambient Light Blobs */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-150/30 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-emerald-50/20 dark:bg-emerald-950/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left: Text & copy matching the screenshot */}
          <div className="lg:col-span-7 space-y-8" id="hero-info-panel">
            <div className="flex flex-wrap gap-2.5 animate-fade-in-down" id="hero-badges">
              <span className="inline-flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/30 px-4 py-1.5 rounded-full text-xs font-semibold text-emerald-800 dark:text-emerald-450 tracking-wide shadow-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{currentLang === 'en' ? '22 Premium cars available' : '22 voitures premium disponibles'}</span>
              </span>
              <span className="inline-flex items-center bg-blue-50/80 dark:bg-slate-900/80 backdrop-blur-xs border border-blue-100/80 dark:border-slate-800/80 px-4 py-1.5 rounded-full text-xs font-semibold text-blue-800 dark:text-blue-300 shadow-xs">
                <span>{currentLang === 'en' ? 'Kigali • Musanze • Rubavu' : 'Kigali • Musanze • Rubavu'}</span>
              </span>
            </div>

            <div className="space-y-5">
              <h1 
                className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-gray-900 dark:text-white leading-[1.05]"
                id="hero-heading"
              >
                {currentLang === 'en' ? (
                  <>
                    Drive <br />
                    Rwanda <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-yellow-400 dark:to-amber-300 bg-clip-text text-transparent italic font-serif font-normal">at your own pace.</span>
                  </>
                ) : (
                  <>
                    Conduisez le <br />
                    Rwanda <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-yellow-400 dark:to-amber-300 bg-clip-text text-transparent italic font-serif font-normal">à votre rythme.</span>
                  </>
                )}
              </h1>
              <p 
                className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl font-medium leading-relaxed"
                id="hero-subtitle"
              >
                {t.subtitle}
              </p>
            </div>

            {/* Hero CTA Buttons */}
            <div className="flex flex-wrap gap-4" id="hero-actions">
              <button
                onClick={scrollToFleet}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-slate-950 font-black tracking-wider uppercase text-xs py-4 px-8 rounded-xl inline-flex items-center space-x-2.5 transition-all cursor-pointer shadow-lg hover:shadow-xl hover:translate-y-[-1px] active:translate-y-[1px]"
                id="hero-cta-primary"
              >
                <span>{currentLang === 'en' ? 'View the fleet' : 'Voir la flotte'}</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
              <a
                href="https://wa.me/250780097079"
                target="_blank"
                rel="noreferrer"
                className="border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-850 text-gray-800 dark:text-gray-250 font-bold tracking-wider uppercase text-xs py-4 px-8 rounded-xl inline-flex items-center space-x-2 transition-all shadow-xs hover:shadow-md hover:translate-y-[-1px]"
                id="hero-cta-secondary"
              >
                <span>{currentLang === 'en' ? 'Quick Quote' : 'Devis rapide'}</span>
              </a>
            </div>

            {/* Real Stats beneath CTA */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-100 dark:border-slate-850 max-w-md" id="hero-stats">
              <div>
                <p className="text-2xl sm:text-3xl font-display font-black text-gray-900 dark:text-white">500+</p>
                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1">{currentLang === 'en' ? 'Satisfied clients' : 'Clients satisfaits'}</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-display font-black text-gray-900 dark:text-white">22</p>
                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1">{currentLang === 'en' ? 'Cars in fleet' : 'Voitures en flotte'}</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-display font-black text-gray-900 dark:text-white flex items-center">
                  4.9
                  <Star className="h-5 w-5 text-amber-400 fill-amber-400 ml-1.5 shrink-0" />
                </p>
                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1">{currentLang === 'en' ? 'Average rating' : 'Notes moyennes'}</p>
              </div>
            </div>
          </div>

          {/* Hero Right: The premium Volkswagen ID.4 card */}
          <div className="lg:col-span-5 flex justify-center" id="hero-featured-card">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl hover:shadow-2xl border border-gray-150/80 dark:border-slate-800/80 p-5 max-w-[370px] w-full transition-all duration-500 hover:scale-[1.02] relative group">
              <span className="absolute top-8 left-8 z-10 bg-slate-950/80 dark:bg-yellow-400/95 backdrop-blur-xs text-white dark:text-slate-950 text-[10px] font-black px-3 py-1 rounded-sm tracking-widest uppercase">
                {currentLang === 'en' ? 'RECOMMENDED' : 'RECOMMANDÉ'}
              </span>
              
              <div className="aspect-4/3 rounded-2xl overflow-hidden bg-gray-100 dark:bg-slate-950 relative shadow-inner">
                <img 
                  src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=600" 
                  alt="Volkswagen ID.4"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-bold font-mono">ID.4 • ELECTRIC</span>
                    <h3 className="text-xl font-display font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tight">volkswagen</h3>
                    <p className="text-xs font-semibold text-gray-450 dark:text-gray-400 mt-0.5">{currentLang === 'en' ? 'Eco-Luxury SUV • Automatic' : 'SUV Éco-Luxe • Auto'}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-gray-400 dark:text-gray-500 uppercase block font-bold tracking-wider">{currentLang === 'en' ? 'FROM' : 'À PARTIR DE'}</span>
                    <span className="text-xl font-display font-black text-blue-600 dark:text-yellow-400 block mt-0.5">
                      {currency === 'RWF' ? '80 000 RF' : '$64'}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 block">/{currentLang === 'en' ? 'day' : 'jour'}</span>
                  </div>
                </div>

                <button 
                  onClick={scrollToFleet}
                  className="w-full bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-gray-850 dark:text-gray-200 font-bold tracking-wider uppercase text-xs py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 border border-gray-100 dark:border-slate-850 transition-all cursor-pointer"
                >
                  <span>{currentLang === 'en' ? 'Configure & Book' : 'Configurer & Réserver'}</span>
                  <ArrowRight className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Floating Horizontal Search Bar matches Screenshot 1 */}
        <div className="mt-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-xl border border-gray-150 dark:border-slate-800/80 p-5 md:p-3 max-w-4xl mx-auto hover:border-gray-350 dark:hover:border-slate-700 transition-all duration-300" id="hero-floating-search">
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row items-center gap-4 md:gap-2">
            
            {/* Pickup Date */}
            <div className="w-full md:flex-1 px-4 py-2 border-b md:border-b-0 md:border-r border-gray-100 dark:border-slate-800 text-left">
              <label className="block text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5 font-sans">
                {currentLang === 'en' ? 'PICK-UP DATE' : 'DATE DE DÉPART'}
              </label>
              <div className="flex items-center space-x-2.5">
                <Calendar className="h-4.5 w-4.5 text-blue-600 dark:text-yellow-400 shrink-0" />
                <input 
                  type="date" 
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="bg-transparent text-sm font-bold text-gray-800 dark:text-white focus:outline-hidden w-full cursor-pointer font-sans"
                  required
                />
              </div>
            </div>

            {/* Dropoff Date */}
            <div className="w-full md:flex-1 px-4 py-2 border-b md:border-b-0 md:border-r border-gray-100 dark:border-slate-800 text-left">
              <label className="block text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5 font-sans">
                {currentLang === 'en' ? 'DROP-OFF DATE' : 'DATE DE RETOUR'}
              </label>
              <div className="flex items-center space-x-2.5">
                <Calendar className="h-4.5 w-4.5 text-gray-450 dark:text-gray-500 shrink-0" />
                <input 
                  type="date" 
                  value={dropoffDate}
                  min={pickupDate}
                  onChange={(e) => setDropoffDate(e.target.value)}
                  className="bg-transparent text-sm font-bold text-gray-800 dark:text-white focus:outline-hidden w-full cursor-pointer font-sans"
                  required
                />
              </div>
            </div>

            {/* Vehicle Type selection */}
            <div className="w-full md:flex-1 px-4 py-2 text-left">
              <label className="block text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5 font-sans">
                {currentLang === 'en' ? 'VEHICLE TYPE' : 'TYPE DE VÉHICULE'}
              </label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="bg-transparent text-sm font-bold text-gray-800 dark:text-white focus:outline-hidden w-full cursor-pointer font-sans"
              >
                <option value="all">{currentLang === 'en' ? 'Any Vehicle' : 'Tout véhicule'}</option>
                <option value="suv">{currentLang === 'en' ? 'SUVs & Crossovers' : 'SUVs & Crossovers'}</option>
                <option value="sedan">{currentLang === 'en' ? 'Sedans' : 'Berlines'}</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-slate-950 text-xs font-black tracking-widest uppercase py-4.5 px-8 rounded-xl md:rounded-2xl shrink-0 flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md hover:shadow-lg hover:scale-[1.01]"
              id="floating-search-submit"
            >
              <Search className="h-4 w-4" />
              <span>{currentLang === 'en' ? 'Check availability' : 'Vérifier disponibilité'}</span>
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}
