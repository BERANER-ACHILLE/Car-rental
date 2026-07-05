import React from 'react';
import { MapPin, Check, Info, Shield, HelpCircle } from 'lucide-react';
import { LocationInfo, Language } from '../types';
import { LOCATIONS } from '../data';

interface MapVisualizerProps {
  currentLang: Language;
  selectedId: string;
  onChange: (id: string) => void;
  label: string;
  currency: 'RWF' | 'USD';
}

export default function MapVisualizer({
  currentLang,
  selectedId,
  onChange,
  label,
  currency,
}: MapVisualizerProps) {
  const formatPrice = (val: number) => {
    if (currency === 'RWF') {
      return val.toLocaleString('fr-FR') + ' RF';
    } else {
      return '$' + val;
    }
  };

  // Coordinates for placing pins on our custom styled SVG map of Rwanda (100x70 grid)
  const mapNodes = [
    {
      id: 'kigali_airport',
      labelEn: 'Kigali International Airport',
      labelFr: 'Aéroport de Kigali (KGL)',
      descEn: 'Free delivery directly at terminal exit.',
      descFr: 'Livraison gratuite à la sortie du terminal.',
      x: 52,
      y: 42,
      fee: 0,
    },
    {
      id: 'kigali_downtown',
      labelEn: 'Kigali Downtown / Hotels',
      labelFr: 'Kigali (Hôtel / Bureau / Domicile)',
      descEn: 'Free custom delivery to any hotel in Kigali.',
      descFr: 'Livraison gratuite à votre hôtel ou résidence.',
      x: 46,
      y: 40,
      fee: 0,
    },
    {
      id: 'musanze',
      labelEn: 'Musanze / Ruhengeri',
      labelFr: 'Musanze (Porte des Volcans)',
      descEn: 'Northern Province. Gateway to Volcanoes gorilla treks.',
      descFr: 'Province du Nord. Idéal pour les gorilles de montagne.',
      x: 34,
      y: 20,
      fee: 25000,
    },
    {
      id: 'gisenyi',
      labelEn: 'Gisenyi / Rubavu (Lake Kivu)',
      labelFr: 'Gisenyi / Rubavu (Lac Kivu)',
      descEn: 'Western Province. Lakeside resort beach delivery.',
      descFr: 'Province de l’Ouest. Station balnéaire au bord du lac.',
      x: 18,
      y: 28,
      fee: 35000,
    },
  ];

  const activeNode = mapNodes.find((n) => n.id === selectedId);

  return (
    <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-4 border border-gray-150 dark:border-slate-800 space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center space-x-1.5">
          <MapPin className="h-4 w-4 text-blue-600 dark:text-yellow-400" />
          <span>{label}</span>
        </label>
        {activeNode && (
          <span className="text-[10px] font-semibold text-blue-700 dark:text-yellow-400 bg-blue-50 dark:bg-yellow-400/10 px-2 py-0.5 rounded-sm">
            {activeNode.fee === 0 
              ? (currentLang === 'en' ? 'Free Delivery' : 'Livraison Gratuite') 
              : `+${formatPrice(currency === 'RWF' ? activeNode.fee : (activeNode.fee === 25000 ? 20 : 30))}`}
          </span>
        )}
      </div>

      {/* Styled Responsive Vector Interactive Map Frame */}
      <div className="relative aspect-[100/70] bg-blue-500/5 dark:bg-slate-950/40 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-800/80 p-1 flex items-center justify-center">
        
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />

        {/* Dynamic Map Lines */}
        <svg
          viewBox="0 0 100 70"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {/* Main roads representing connection routes from Kigali to Northern and Western cities */}
          {/* Kigali to Musanze route */}
          <path
            d="M 46 40 Q 42 28 34 20"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeDasharray="2 3"
            className="opacity-60 dark:stroke-yellow-500"
          />
          {/* Musanze to Gisenyi route */}
          <path
            d="M 34 20 Q 24 22 18 28"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeDasharray="2 3"
            className="opacity-40 dark:stroke-yellow-500"
          />
          {/* Kigali to Gisenyi route */}
          <path
            d="M 46 40 Q 30 42 18 28"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeDasharray="2 3"
            className="opacity-40 dark:stroke-yellow-500"
          />

          {/* Theoretical Lake Kivu outline */}
          <path
            d="M 12 20 Q 14 30 16 38 Q 14 46 10 52 Q 8 40 10 26 Z"
            fill="#eff6ff"
            className="dark:fill-slate-900/40 opacity-70"
            stroke="#93c5fd"
            strokeWidth="0.5"
          />
        </svg>

        {/* Render Interactive Nodes */}
        {mapNodes.map((node) => {
          const isSelected = node.id === selectedId;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => onChange(node.id)}
              className="absolute group/pin transition-all duration-300"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              title={currentLang === 'en' ? node.labelEn : node.labelFr}
            >
              {/* Outer Pulsing Effect */}
              <span className={`absolute -inset-2.5 rounded-full transition-all duration-300 ${
                isSelected 
                  ? 'bg-blue-600/20 dark:bg-yellow-400/20 animate-ping' 
                  : 'group-hover/pin:bg-gray-400/20'
              }`} />

              {/* Pin Icon and Dot */}
              <div className={`relative flex items-center justify-center p-1.5 rounded-full shadow-md border transition-all duration-300 ${
                isSelected 
                  ? 'bg-blue-600 text-white border-blue-500 scale-110' 
                  : 'bg-white text-gray-600 hover:text-blue-600 border-gray-200 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300 dark:hover:text-yellow-400'
              }`}>
                {isSelected ? (
                  <Check className="h-3 w-3 stroke-[3px]" />
                ) : (
                  <MapPin className="h-3.5 w-3.5" />
                )}
              </div>

              {/* Mini Tooltip */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-950 text-white text-[9px] font-bold px-2 py-1 rounded-sm shadow-lg border border-slate-800 scale-0 group-hover/pin:scale-100 transition-transform z-30">
                {currentLang === 'en' ? node.labelEn : node.labelFr}
              </div>
            </button>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xs text-[8px] font-mono font-bold text-gray-500 dark:text-gray-400 p-1.5 rounded-sm border border-gray-100 dark:border-slate-800/80 flex flex-col space-y-1">
          <div className="flex items-center space-x-1">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-yellow-400 inline-block" />
            <span>KIGALI HUB</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-400 inline-block" />
            <span>PROVINCES (+FEE)</span>
          </div>
        </div>
      </div>

      {/* Selected Node Details view */}
      {activeNode && (
        <div className="bg-white dark:bg-slate-950/40 p-3 rounded-xl border border-gray-100 dark:border-slate-800/60 flex items-start space-x-3 text-xs">
          <div className="p-2 bg-blue-50 dark:bg-slate-900 rounded-lg text-blue-600 dark:text-yellow-400 shrink-0">
            <Info className="h-4 w-4" />
          </div>
          <div className="space-y-0.5">
            <h5 className="font-bold text-gray-900 dark:text-white capitalize">
              {currentLang === 'en' ? activeNode.labelEn : activeNode.labelFr}
            </h5>
            <p className="text-gray-500 dark:text-gray-400 text-[11px] leading-relaxed">
              {currentLang === 'en' ? activeNode.descEn : activeNode.descFr}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
