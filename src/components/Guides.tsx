import React, { useState } from 'react';
import { 
  Milestone, Car, Compass, MapPin, AlertTriangle, 
  Gauge, Clock, Fuel, TrendingUp, Check, ArrowRight, Info, Star
} from 'lucide-react';
import { Language, Vehicle } from '../types';
import { VEHICLES, TRANSLATIONS } from '../data';

interface GuidesProps {
  currentLang: Language;
  onSelectVehicle?: (vehicle: Vehicle) => void;
}

interface ItineraryDestination {
  id: string;
  titleEn: string;
  titleFr: string;
  descEn: string;
  descFr: string;
  distanceKm: number; // One-way distance from Kigali
  timeEn: string;
  timeFr: string;
  highlightsEn: string[];
  highlightsFr: string[];
  tipsEn: string[];
  tipsFr: string[];
  itineraryEn: { title: string; desc: string }[];
  itineraryFr: { title: string; desc: string }[];
  terrainEn: string;
  terrainFr: string;
  image: string;
}

export default function Guides({ currentLang, onSelectVehicle }: GuidesProps) {
  const t = TRANSLATIONS[currentLang];
  const [selectedDestId, setSelectedDestId] = useState<string>('musanze');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('toyota_rav4');

  // Hardcoded destinations details to ensure highest quality content
  const DESTINATIONS_PLANNER: ItineraryDestination[] = [
    {
      id: 'musanze',
      titleEn: 'Volcanoes Mountain Gorilla Trek',
      titleFr: 'Volcans & Gorilles de Montagne',
      descEn: 'Northern Province. Gateway to Volcanoes gorilla treks and golden monkey tracking.',
      descFr: 'Province du Nord. Idéal pour observer les gorilles de montagne et singes dorés.',
      distanceKm: 110,
      timeEn: '2h 00m',
      timeFr: '2h 00m',
      terrainEn: 'Paved highway all the way. Some steep climbs & wet forest trails near the park entry.',
      terrainFr: 'Route goudronnée parfaite. Quelques montées raides et sentiers humides près de l\'entrée.',
      highlightsEn: [
        'Face-to-face mountain gorilla experience',
        'Stunning views of the Virunga chain',
        'Traditional cultural village walks'
      ],
      highlightsFr: [
        'Rencontre magique avec les gorilles',
        'Vues spectaculaires sur la chaîne des Virunga',
        'Visite des villages culturels traditionnels'
      ],
      tipsEn: [
        'Start very early from Kigali (approx. 4:30 AM) to reach the briefing on time.',
        'Carry thick rain gear and solid hiking boots.'
      ],
      tipsFr: [
        'Partez très tôt de Kigali (vers 4h30) pour arriver à l\'heure pour le briefing du parc.',
        'Prévoyez des vêtements de pluie robustes et de bonnes chaussures de marche.'
      ],
      itineraryEn: [
        { title: 'Morning (04:30 - 07:00)', desc: 'Scenic mountain climb to Musanze with sunrise over hills.' },
        { title: 'Daytime (07:00 - 13:00)', desc: 'Registration, briefing & guided trek into the deep bamboo forest.' },
        { title: 'Afternoon (14:00 - 17:00)', desc: 'Relax at local lodge, visit cultural centers, return cruise to Kigali.' }
      ],
      itineraryFr: [
        { title: 'Matin (04h30 - 07h00)', desc: 'Montée panoramique vers Musanze avec le lever du soleil sur les collines.' },
        { title: 'Journée (07h00 - 13h00)', desc: 'Briefing, rencontre des guides et trek immersif dans la forêt de bambous.' },
        { title: 'Après-midi (14h00 - 17h00)', desc: 'Détente dans un lodge, visite culturelle et retour vers Kigali.' }
      ],
      image: 'https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'akagera',
      titleEn: 'Akagera Big Five Savannah Safari',
      titleFr: 'Safari Savane de l\'Akagera',
      descEn: 'Eastern Rwanda. Savannah landscape home to lions, rhinos, elephants, leopards, and buffaloes.',
      descFr: 'Est du Rwanda. Plaines de savane abritant lions, rhinos, éléphants, léopards et buffles.',
      distanceKm: 135,
      timeEn: '2h 30m',
      timeFr: '2h 30m',
      terrainEn: 'Paved until the park gates. Rough unpaved dirt tracks, mud during rainy season. High clearance SUV required.',
      terrainFr: 'Asphalte jusqu\'aux portes du parc. Pistes de terre accidentées, boue en saison humide. SUV surélevé requis.',
      highlightsEn: [
        'Independent safari spot of lions and rhinos',
        'Stunning boat cruise on Lake Ihema',
        'Breathtaking scenery over savannah hills'
      ],
      highlightsFr: [
        'Safari en autonomie à la recherche des fauves',
        'Croisière en bateau sur le Lac Ihema',
        'Vues spectaculaires sur les plaines de l\'Est'
      ],
      tipsEn: [
        'Fuel up 100% in Kigali or Kayonza before entering the park.',
        'Keep windows rolled up near baboon areas!'
      ],
      tipsFr: [
        'Faites le plein complet à Kigali ou Kayonza avant d\'entrer dans le parc.',
        'Gardez les fenêtres fermées à proximité des zones de babouins !'
      ],
      itineraryEn: [
        { title: 'Early Morning (05:00 - 07:30)', desc: 'Drive through Kayonza flatlands to the Akagera Southern Gate.' },
        { title: 'Mid-Day Safari (08:00 - 14:00)', desc: 'Explore circuits around Lake Ihema and central savannah waterholes.' },
        { title: 'Late Afternoon (14:30 - 17:30)', desc: 'Optional boat safari, then steady drive back to Kigali.' }
      ],
      itineraryFr: [
        { title: 'Tôt le Matin (05h00 - 07h30)', desc: 'Trajet à travers les plaines de Kayonza vers l\'entrée sud d\'Akagera.' },
        { title: 'Journée Safari (08h00 - 14h00)', desc: 'Exploration des circuits du lac Ihema et des points d\'eau de la savane.' },
        { title: 'Fin d\'Après-midi (14h30 - 17h30)', desc: 'Safari en bateau en option, puis retour tranquille vers Kigali.' }
      ],
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'lake_kivu',
      titleEn: 'Lake Kivu Beach Resort Escape',
      titleFr: 'Échappée Balnéaire au Lac Kivu',
      descEn: 'Western Rwanda. One of Africa’s Great Lakes, scenic beaches, lakeside restaurants and boat cruises.',
      descFr: 'Ouest du Rwanda. L\'un des Grands Lacs d\'Afrique, plages calmes, restos et sorties en bateau.',
      distanceKm: 160,
      timeEn: '3h 00m',
      timeFr: '3h 00m',
      terrainEn: 'Very winding paved scenic roads. Steep slopes, beautiful curves. Ideal for any premium cruiser.',
      terrainFr: 'Superbe route côtière goudronnée très sinueuse. Fortes pentes, virages serrés. Idéal pour tout cruiser.',
      highlightsEn: [
        'Sunset boat trips & volcanic hot springs',
        'Fresh local Sambaza fish tasting by the shore',
        'Stunning views of the Congo mountains'
      ],
      highlightsFr: [
        'Balade en bateau au coucher du soleil et sources thermales',
        'Dégustation de Sambaza grillés au bord de l\'eau',
        'Vues à couper le souffle sur les montagnes du Congo'
      ],
      tipsEn: [
        'Drive cautiously around tight curves, keep inside the lanes.',
        'Plan a stop at the Pfunda Tea Estate for beautiful green photos!'
      ],
      tipsFr: [
        'Roulez prudemment dans les virages serrés, restez bien sur votre voie.',
        'Faites un arrêt à la plantation de thé de Pfunda pour de belles photos vertes !'
      ],
      itineraryEn: [
        { title: 'Morning (08:00 - 11:00)', desc: 'Drive the gorgeous Nyabarongo valley route up towards Rubavu.' },
        { title: 'Afternoon (11:30 - 15:30)', desc: 'Lakeside lunch, kayaking or optional private boat ride to islands.' },
        { title: 'Sunset (16:00 - 19:00)', desc: 'Stunning drive back or check-in to a premium lakeside resort.' }
      ],
      itineraryFr: [
        { title: 'Matin (08h00 - 11h00)', desc: 'Route magnifique longeant la vallée de la Nyabarongo vers Rubavu.' },
        { title: 'Après-midi (11h30 - 15h30)', desc: 'Déjeuner au bord de l\'eau, kayak ou balade en bateau privé vers les îles.' },
        { title: 'Coucher du soleil (16h00 - 19h00)', desc: 'Retour panoramique vers Kigali ou installation dans un resort au bord du lac.' }
      ],
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'nyungwe',
      titleEn: 'Nyungwe Rain Forest & Canopy Walk',
      titleFr: 'Forêt de Nyungwe & Canopy Walk',
      descEn: 'Southwestern Rwanda. Ancient mountain rainforest sanctuary for chimpanzees and primates.',
      descFr: 'Sud-Ouest du Rwanda. Forêt tropicale d\'altitude abritant chimpanzés et primates.',
      distanceKm: 220,
      timeEn: '5h 00m',
      timeFr: '5h 00m',
      terrainEn: 'Asphalt highway, extremely winding forest pass. Heavy fog and wet surface risk. AWD highly recommended.',
      terrainFr: 'Route goudronnée sinueuse traversant la jungle. Brouillard fréquent et chaussée humide. AWD conseillé.',
      highlightsEn: [
        'Thrilling suspended Canopy walkway adventure',
        'Chimpanzee and colobus monkey tracking',
        'Spectacular waterfalls hidden inside the jungle'
      ],
      highlightsFr: [
        'Passage spectaculaire sur le pont suspendu de la Canopy',
        'Trek des chimpanzés et singes colobes',
        'Cascades magnifiques cachées au cœur de la jungle'
      ],
      tipsEn: [
        'Keep a steady speed in the forest. Sudden mist can reduce visibility dramatically.',
        'Prepare warm clothes as mountain forests get chilly.'
      ],
      tipsFr: [
        'Maintenez une vitesse stable dans la forêt. La brume réduit vite la visibilité.',
        'Prévoyez des vêtements chauds, l\'altitude rend la forêt tropicale fraîche.'
      ],
      itineraryEn: [
        { title: 'Morning (06:00 - 11:00)', desc: 'Drive south through Huye historical town to the forest entrance.' },
        { title: 'Afternoon (11:30 - 14:30)', desc: 'Canopy walk briefing, jungle trek & walk on the suspension bridge.' },
        { title: 'Rest of Day (15:00 - 19:00)', desc: 'Chimpanzee lodge check-in or scenic drive onwards to Cyangugu.' }
      ],
      itineraryFr: [
        { title: 'Matin (06h00 - 11h00)', desc: 'Route vers le sud via la ville historique de Huye jusqu\'à la forêt.' },
        { title: 'Après-midi (11h30 - 14h30)', desc: 'Briefing Canopy, trek de 1h et passage sensationnel sur le pont suspendu.' },
        { title: 'Fin de journée (15h00 - 19h00)', desc: 'Nuit en lodge forestier ou route côtière panoramique vers Cyangugu.' }
      ],
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=600'
    }
  ];

  // Simulator vehicles and specifications
  const SIMULATOR_VEHICLES = [
    {
      id: 'toyota_corolla',
      name: 'Toyota Corolla',
      fuelType: 'petrol',
      consumption: '6.0 L / 100km',
      consVal: 6.0,
      unit: 'L',
      suitability: {
        musanze: { rating: 3.5, textEn: 'Good paved highway cruise, but slow down near Volcanoes tracks.', textFr: 'Bon cruiser sur asphalte, ralentissez près des pistes des Volcans.' },
        akagera: { rating: 1.5, textEn: 'Low clearance, high risk of bottom damage on safari dirt tracks.', textFr: 'Garde au sol basse, risque de chocs élevé sur pistes de terre.' },
        lake_kivu: { rating: 4, textEn: 'Great fuel economy for paved lakeside winding roads.', textFr: 'Excellente économie pour la route sinueuse du lac.' },
        nyungwe: { rating: 3, textEn: 'Feasible on paved lanes, but lacks AWD safety for wet rain slopes.', textFr: 'Faisable sur asphalte, mais manque d\'AWD sur chaussée de forêt humide.' }
      }
    },
    {
      id: 'toyota_prius',
      name: 'Toyota Prius (Hybrid)',
      fuelType: 'hybrid',
      consumption: '4.5 L / 100km',
      consVal: 4.5,
      unit: 'L',
      suitability: {
        musanze: { rating: 4, textEn: 'Very economical on the main roads. High reliability.', textFr: 'Ultra-économique sur les routes nationales. Très fiable.' },
        akagera: { rating: 1.5, textEn: 'NOT recommended for savannah due to ground clearance limitations.', textFr: 'Déconseillé pour la savane en raison de la garde au sol.' },
        lake_kivu: { rating: 4.5, textEn: 'Exceptional mileage on winding coastal highways.', textFr: 'Consommation exceptionnelle sur les routes côtières du lac.' },
        nyungwe: { rating: 3.5, textEn: 'Highly economical for the 440km round trip on paved routes.', textFr: 'Très économique pour les 440 km aller-retour goudronnés.' }
      }
    },
    {
      id: 'toyota_rav4',
      name: 'Toyota RAV4 AWD',
      fuelType: 'petrol',
      consumption: '7.5 L / 100km',
      consVal: 7.5,
      unit: 'L',
      suitability: {
        musanze: { rating: 5, textEn: 'Ideal compact SUV for high altitudes and muddy trail access.', textFr: 'SUV idéal pour la haute altitude et les accès boueux.' },
        akagera: { rating: 4.5, textEn: 'Excellent AWD clearance. Perfect for standard safari loops.', textFr: 'Excellente garde au sol et AWD. Idéal pour les boucles classiques.' },
        lake_kivu: { rating: 5, textEn: 'Spacious, comfortable, and stable on mountain curves.', textFr: 'Spacieux, confortable et très stable dans les virages serrés.' },
        nyungwe: { rating: 5, textEn: 'Active AWD provides reassuring traction on wet winding asphalt.', textFr: 'L\'AWD actif offre une motricité rassurante sur chaussée humide.' }
      }
    },
    {
      id: 'kia_sorento',
      name: 'KIA Sorento AWD (7-Seater)',
      fuelType: 'diesel',
      consumption: '8.5 L / 100km',
      consVal: 8.5,
      unit: 'L',
      suitability: {
        musanze: { rating: 5, textEn: 'Ultimate luxury and room for trekking gear and families.', textFr: 'Luxe absolu et grand espace pour le matériel et les familles.' },
        akagera: { rating: 5, textEn: 'The absolute king of safari. Raised cabin, robust 4x4, full views.', textFr: 'Le roi incontesté du safari. Cabine surélevée, 4x4 robuste, vue panoramique.' },
        lake_kivu: { rating: 5, textEn: 'Superb travel comfort for larger groups and heavy luggage.', textFr: 'Superbe confort de voyage pour les groupes et gros bagages.' },
        nyungwe: { rating: 5, textEn: 'Heavy chassis and intelligent AWD offer absolute security in wet fog.', textFr: 'Châssis lourd et AWD intelligent offrant une sécurité totale.' }
      }
    },
    {
      id: 'volkswagen_id4',
      name: 'Volkswagen ID.4 (Electric)',
      fuelType: 'electric',
      consumption: '17 kWh / 100km',
      consVal: 17,
      unit: 'kWh',
      suitability: {
        musanze: { rating: 4.5, textEn: 'Silent and powerful electric climbs. Plenty of charge for 220km RT.', textFr: 'Montées silencieuses et puissantes. Autonomie large pour les 220 km AR.' },
        akagera: { rating: 2, textEn: 'Ecological, but lack of charging hubs inside park limits.', textFr: 'Écologique mais absence de bornes de recharge dans le parc.' },
        lake_kivu: { rating: 5, textEn: 'Silent luxurious cruiser. Panoramic roof enhances lakeside scenic drives.', textFr: 'Cruiser silencieux et luxueux. Toit panoramique idéal pour le lac.' },
        nyungwe: { rating: 3.5, textEn: 'Feasible with mid-trip charge plan. Excellent energy regen on descents.', textFr: 'Faisable avec un plan de recharge à mi-chemin. Excellente régénération.' }
      }
    }
  ];

  const currentDest = DESTINATIONS_PLANNER.find(d => d.id === selectedDestId) || DESTINATIONS_PLANNER[0];
  const currentSimVehicle = SIMULATOR_VEHICLES.find(v => v.id === selectedVehicleId) || SIMULATOR_VEHICLES[2];

  // Calculations
  const roundTripDistance = currentDest.distanceKm * 2;
  
  // Fuel / energy price
  // Petrol / Diesel = 1630 RWF/L
  // Electricity = 250 RWF/kWh
  const fuelRate = 1630;
  const electricRate = 250;

  const calculateCost = () => {
    if (currentSimVehicle.fuelType === 'electric') {
      const totalKwh = (roundTripDistance * currentSimVehicle.consVal) / 100;
      return Math.round(totalKwh * electricRate);
    } else {
      const totalLiters = (roundTripDistance * currentSimVehicle.consVal) / 100;
      return Math.round(totalLiters * fuelRate);
    }
  };

  const estimatedFuelCost = calculateCost();

  const handleBookSelectedRoute = () => {
    // Find the vehicle from standard vehicles array to match
    const matchingCar = VEHICLES.find(v => v.id === selectedVehicleId);
    if (matchingCar && onSelectVehicle) {
      onSelectVehicle(matchingCar);
    } else {
      // Fallback scroll to booking section
      document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentSuitability = (currentSimVehicle.suitability as any)[currentDest.id] || { rating: 4, textEn: '', textFr: '' };

  return (
    <section id="guides" className="py-16 bg-gray-50 dark:bg-slate-900/40 border-t border-b border-gray-150 dark:border-slate-850 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto" id="guides-section-header">
          <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 dark:text-yellow-400 block mb-2 font-mono">
            ★ {currentLang === 'en' ? 'INTERACTIVE TRAVEL PLANNER' : 'PLANIFICATEUR D\'ITINÉRAIRE INTERACTIF'}
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-gray-900 dark:text-white tracking-tight uppercase leading-none">
            {currentLang === 'en' 
              ? 'Explore Rwanda & Simulate Your Travel Costs' 
              : 'Explorez le Rwanda et Simulez vos Frais de Route'}
          </h2>
          <p className="text-gray-550 dark:text-gray-400 mt-4 text-xs sm:text-sm font-medium leading-relaxed">
            {currentLang === 'en'
              ? 'Select an adventure, pair it with any vehicle from our fleet, and view dynamic terrain suitability ratings and exact estimated fuel costs instantly.'
              : 'Choisissez une aventure, associez-la avec un véhicule de notre flotte, et visualisez instantanément la compatibilité du terrain et l\'estimation des frais de carburant.'}
          </p>
        </div>

        {/* 1. Adventure Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2" id="adventure-tabs">
          {DESTINATIONS_PLANNER.map((dest) => {
            const isActive = dest.id === selectedDestId;
            return (
              <button
                key={dest.id}
                onClick={() => setSelectedDestId(dest.id)}
                className={`px-5 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center space-x-2 border cursor-pointer ${
                  isActive 
                    ? 'bg-blue-600 dark:bg-yellow-400 text-white dark:text-slate-950 border-blue-600 dark:border-yellow-400 shadow-md transform scale-[1.01]' 
                    : 'bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-850 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-slate-800'
                }`}
              >
                <Compass className={`h-4 w-4 ${isActive ? 'animate-spin-slow' : ''}`} />
                <span>{currentLang === 'en' ? dest.titleEn.split(' ')[0] : dest.titleFr.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* 2. Main Planner Interface (Split layout: Left Itinerary, Right Interactive Simulator) */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch" id="planner-main-grid">
          
          {/* Left Panel: Selected Itinerary & Highlights */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-gray-150 dark:border-slate-800/80 overflow-hidden shadow-sm flex flex-col justify-between">
            <div>
              {/* Cover Image */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-slate-950">
                <img 
                  src={currentDest.image} 
                  alt={currentLang === 'en' ? currentDest.titleEn : currentDest.titleFr} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white space-y-0.5">
                  <span className="text-[9px] font-bold tracking-widest text-blue-400 dark:text-yellow-400 uppercase font-mono block">
                    {currentLang === 'en' ? 'SELECTED EXPEDITION' : 'EXPÉDITION SÉLECTIONNÉE'}
                  </span>
                  <h3 className="font-sans font-bold text-lg tracking-tight">
                    {currentLang === 'en' ? currentDest.titleEn : currentDest.titleFr}
                  </h3>
                </div>
              </div>

              {/* Itinerary Specs row */}
              <div className="grid grid-cols-2 border-b border-gray-100 dark:border-slate-800/85 divide-x divide-gray-100 dark:divide-slate-800/85 text-center bg-gray-50/50 dark:bg-slate-950/20 py-3">
                <div>
                  <span className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase block mb-0.5">
                    {currentLang === 'en' ? 'ROUND TRIP' : 'ALLER-RETOUR'}
                  </span>
                  <span className="text-xs font-mono font-bold text-gray-900 dark:text-white flex items-center justify-center space-x-1">
                    <Milestone className="h-3.5 w-3.5 text-blue-600 dark:text-yellow-400 shrink-0" />
                    <span>{roundTripDistance} km</span>
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase block mb-0.5">
                    {currentLang === 'en' ? 'DRIVE TIME' : 'TEMPS DE ROUTE'}
                  </span>
                  <span className="text-xs font-mono font-bold text-gray-900 dark:text-white flex items-center justify-center space-x-1">
                    <Clock className="h-3.5 w-3.5 text-blue-600 dark:text-yellow-400 shrink-0" />
                    <span>{currentLang === 'en' ? `${currentDest.timeEn} (x2)` : `${currentDest.timeFr} (x2)`}</span>
                  </span>
                </div>
              </div>

              {/* Day Highlights Timeline */}
              <div className="p-6 space-y-4">
                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block">
                  {currentLang === 'en' ? 'RECOMMENDED TIMELINE' : 'SUGGESTION DE CHRONOLOGIE'}
                </span>
                
                <div className="space-y-3 relative before:absolute before:inset-y-1 before:left-2 before:w-0.5 before:bg-blue-100 dark:before:bg-slate-800">
                  {(currentLang === 'en' ? currentDest.itineraryEn : currentDest.itineraryFr).map((step, idx) => (
                    <div key={idx} className="relative pl-6 space-y-0.5 text-left">
                      <span className="absolute left-1 top-1.5 h-2 w-2 rounded-full bg-blue-600 dark:bg-yellow-400" />
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                        {step.title}
                      </h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-450 leading-relaxed font-normal">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Essential Tips Footer */}
            <div className="p-6 bg-slate-50 dark:bg-slate-950/40 border-t border-gray-100 dark:border-slate-800/60 rounded-b-3xl">
              <span className="text-[9px] font-bold text-blue-800 dark:text-yellow-450 uppercase tracking-widest block mb-2">
                {currentLang === 'en' ? 'LOCAL PRO ROAD TIPS' : 'CONSEILS ROUTIERS'}
              </span>
              <ul className="space-y-1.5 text-[11px] text-gray-600 dark:text-gray-400 font-medium">
                {(currentLang === 'en' ? currentDest.tipsEn : currentDest.tipsFr).map((tip, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-blue-600 dark:text-yellow-400 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Panel: Interactive Cost & Vehicle Simulator */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-gray-150 dark:border-slate-800/80 p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
            
            <div className="space-y-6">
              {/* Header */}
              <div className="border-b border-gray-100 dark:border-slate-800/80 pb-4">
                <span className="text-[10px] font-bold text-blue-600 dark:text-yellow-400 uppercase tracking-widest block mb-1">
                  {currentLang === 'en' ? 'FLIGHT & DRIVE SIMULATOR' : 'SIMULATEUR DE COMPATIBILITÉ & COÛTS'}
                </span>
                <h3 className="font-sans font-extrabold text-xl text-gray-900 dark:text-white">
                  {currentLang === 'en' ? 'Match Vehicle with Terrain' : 'Associez un Véhicule au Terrain'}
                </h3>
              </div>

              {/* Vehicle Picker inside the Simulator */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block">
                  {currentLang === 'en' ? '1. Select a vehicle model' : '1. Sélectionnez un modèle de véhicule'}
                </label>
                
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {SIMULATOR_VEHICLES.map((vehicle) => {
                    const isSelected = vehicle.id === selectedVehicleId;
                    return (
                      <button
                        key={vehicle.id}
                        type="button"
                        onClick={() => setSelectedVehicleId(vehicle.id)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between h-20 ${
                          isSelected
                            ? 'bg-blue-50/50 dark:bg-slate-950 border-blue-600 dark:border-yellow-400 text-blue-700 dark:text-yellow-400 font-bold scale-[1.02] shadow-xs'
                            : 'bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-850/80 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-slate-800/80 font-semibold'
                        }`}
                      >
                        <Car className={`h-4.5 w-4.5 ${isSelected ? 'text-blue-600 dark:text-yellow-400' : 'text-gray-400'}`} />
                        <span className="text-[10px] uppercase tracking-wider block truncate w-full mt-1.5">{vehicle.name.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Compatibility & Rating Card */}
              <div className="bg-gray-50 dark:bg-slate-950/40 border border-gray-150 dark:border-slate-850 rounded-2xl p-4 sm:p-5 space-y-4">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-gray-100 dark:border-slate-800/60">
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-bold text-gray-450 uppercase block">
                      {currentLang === 'en' ? 'TERRAIN COMPATIBILITY' : 'COMPATIBILITÉ TERRAIN'}
                    </span>
                    {currentSuitability.rating < 3 ? (
                      <span className="inline-flex items-center space-x-1 text-[8.5px] font-black uppercase text-red-600 bg-red-50 dark:bg-red-950/40 px-1.5 py-0.5 rounded-sm">
                        <AlertTriangle className="h-3 w-3 shrink-0" />
                        <span>{currentLang === 'en' ? 'RISK' : 'DANGER'}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 text-[8.5px] font-black uppercase text-green-600 bg-green-50 dark:bg-green-950/40 px-1.5 py-0.5 rounded-sm">
                        <Check className="h-3 w-3 shrink-0" />
                        <span>{currentLang === 'en' ? 'OK' : 'SÛR'}</span>
                      </span>
                    )}
                  </div>

                  {/* Stars rating */}
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((starVal) => {
                      const isFilled = starVal <= currentSuitability.rating;
                      const isHalf = starVal - 0.5 === currentSuitability.rating;
                      return (
                        <Star 
                          key={starVal} 
                          className={`h-4 w-4 ${
                            isFilled 
                              ? 'text-amber-400 fill-amber-400' 
                              : isHalf 
                                ? 'text-amber-400 fill-amber-400 opacity-80' 
                                : 'text-gray-200 dark:text-gray-850'
                          }`} 
                        />
                      );
                    })}
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-250 ml-1">
                      {currentSuitability.rating}/5
                    </span>
                  </div>
                </div>

                {/* Compatibility text and warnings */}
                <div className="space-y-2">
                  <p className="text-[11.5px] text-gray-750 dark:text-gray-300 leading-relaxed font-medium">
                    {currentLang === 'en' ? currentSuitability.textEn : currentSuitability.textFr}
                  </p>
                  
                  <div className="flex items-start space-x-2 text-[10.5px] text-gray-500 dark:text-gray-400">
                    <Info className="h-4 w-4 text-blue-600 dark:text-yellow-400 shrink-0 mt-0.5" />
                    <span className="font-semibold leading-relaxed">
                      {currentLang === 'en' 
                        ? `Route terrain profile: ${currentDest.terrainEn}`
                        : `Profil terrain de la route : ${currentDest.terrainFr}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dynamic Fuel & Energy cost calculator widgets */}
              <div className="grid sm:grid-cols-3 gap-3">
                {/* Consumption */}
                <div className="bg-slate-50 dark:bg-slate-950/20 border border-gray-100 dark:border-slate-800 p-3 rounded-xl flex items-center space-x-3 text-left">
                  <div className="p-2 bg-blue-50 dark:bg-slate-900 rounded-lg text-blue-600 dark:text-yellow-400">
                    <Gauge className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[8.5px] font-bold text-gray-400 dark:text-gray-500 uppercase block leading-none mb-1">
                      {currentLang === 'en' ? 'CONSUMPTION' : 'CONSOMMATION'}
                    </span>
                    <span className="text-xs font-mono font-black text-gray-900 dark:text-white leading-none">
                      {currentSimVehicle.consumption}
                    </span>
                  </div>
                </div>

                {/* Fuel Volume */}
                <div className="bg-slate-50 dark:bg-slate-950/20 border border-gray-100 dark:border-slate-800 p-3 rounded-xl flex items-center space-x-3 text-left">
                  <div className="p-2 bg-blue-50 dark:bg-slate-900 rounded-lg text-blue-600 dark:text-yellow-400">
                    <Fuel className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[8.5px] font-bold text-gray-400 dark:text-gray-500 uppercase block leading-none mb-1">
                      {currentSimVehicle.fuelType === 'electric' ? 'EST. ENERGY' : 'EST. FUEL VOLUME'}
                    </span>
                    <span className="text-xs font-mono font-black text-gray-900 dark:text-white leading-none">
                      {Math.round((roundTripDistance * currentSimVehicle.consVal) / 100)} {currentSimVehicle.unit}
                    </span>
                  </div>
                </div>

                {/* Fuel Price Cost */}
                <div className="bg-blue-50/20 dark:bg-slate-950/50 border border-blue-100/40 dark:border-slate-800 p-3 rounded-xl flex items-center space-x-3 text-left">
                  <div className="p-2 bg-blue-50 dark:bg-slate-900 rounded-lg text-green-600 dark:text-green-400">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[8.5px] font-bold text-gray-400 dark:text-gray-500 uppercase block leading-none mb-1">
                      {currentLang === 'en' ? 'EST. DRIVE COST' : 'COÛT ESTIMÉ ROUTE'}
                    </span>
                    <span className="text-xs font-mono font-black text-green-600 dark:text-green-400 leading-none">
                      {estimatedFuelCost.toLocaleString('fr-FR')} RWF
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Booking action for selected Route package */}
            <div className="bg-blue-950 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-transparent dark:border-slate-800 shadow-lg mt-4">
              <div className="text-left space-y-1">
                <span className="text-[9px] font-bold text-blue-400 dark:text-yellow-450 uppercase tracking-widest block">
                  {currentLang === 'en' ? 'TAILOR-MADE PACKAGE' : 'FORMULE SÛRE COMPLÈTE'}
                </span>
                <p className="text-xs font-bold leading-normal">
                  {currentLang === 'en' 
                    ? `Reserve the ${currentSimVehicle.name} for your ${currentDest.titleEn.split(' ')[0]} expedition.`
                    : `Réservez la ${currentSimVehicle.name} pour votre expédition aux ${currentDest.titleFr.split(' ')[0]}.`}
                </p>
                <span className="text-[10px] text-blue-200/80 block">
                  {currentLang === 'en'
                    ? 'Includes local routing assistance + free replacement vehicle guarantees.'
                    : 'Inclut l\'assistance d\'itinéraire locale + garanties de véhicule de remplacement.'}
                </span>
              </div>

              <button
                type="button"
                onClick={handleBookSelectedRoute}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-slate-950 font-black px-6 py-3 rounded-xl text-[10.5px] tracking-wider uppercase transition-all shadow-md shrink-0 flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>{currentLang === 'en' ? 'Load & Book' : 'Sélectionner & Réserver'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
