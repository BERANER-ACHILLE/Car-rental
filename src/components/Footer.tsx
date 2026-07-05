import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';
import Logo from './Logo';

interface FooterProps {
  currentLang: Language;
}

export default function Footer({ currentLang }: FooterProps) {
  const t = TRANSLATIONS[currentLang];

  return (
    <footer className="bg-slate-950 text-gray-400 py-16 border-t border-slate-900" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content Grid matching Screenshot 2 layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand Intro Column */}
          <div className="md:col-span-5 space-y-4" id="footer-brand-col">
            <Logo className="h-10 text-white" showText={true} textColor="text-white" />
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm font-normal">
              {currentLang === 'en'
                ? 'Independent car rentals across Rwanda. From a weekend Volcanoes getaway to an extended Kigali corporate mission.'
                : 'Location de voitures en toute autonomie à travers le Rwanda. D\'une escapade aux Volcans à une mission de plusieurs mois à Kigali.'}
            </p>
          </div>

          {/* Explorer Links Column */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">
              {currentLang === 'en' ? 'EXPLORE' : 'EXPLORER'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-blue-500 transition-colors text-left">
                  {currentLang === 'en' ? 'Our Fleet' : 'Flotte'}
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-blue-500 transition-colors text-left">
                  {currentLang === 'en' ? 'Long term' : 'Longue durée'}
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('guides')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-blue-500 transition-colors text-left">
                  {currentLang === 'en' ? 'Tourism packages' : 'Forfaits tourisme'}
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('service-guarantees')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-blue-500 transition-colors text-left">
                  {currentLang === 'en' ? 'Premium services' : 'Services premium'}
                </button>
              </li>
            </ul>
          </div>

          {/* Society Links Column */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">
              {currentLang === 'en' ? 'COMPANY' : 'SOCIÉTÉ'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-blue-500 transition-colors text-left">
                  {currentLang === 'en' ? 'About us' : 'À propos'}
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('faqs')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-blue-500 transition-colors text-left">
                  Contact
                </button>
              </li>
              <li>
                <button className="hover:text-blue-500 transition-colors text-left cursor-not-allowed">
                  CGV
                </button>
              </li>
              <li>
                <button className="hover:text-blue-500 transition-colors text-left cursor-not-allowed">
                  {currentLang === 'en' ? 'Privacy policy' : 'Confidentialité'}
                </button>
              </li>
            </ul>
          </div>

          {/* Visit / Contact Details Column matches Screenshot 2 exactly */}
          <div className="md:col-span-3 space-y-3 text-xs" id="footer-contact-col">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">
              {currentLang === 'en' ? 'VISIT US' : 'VISITER'}
            </h4>
            <div className="space-y-2 text-slate-500 font-medium">
              <a href="tel:+250780097079" className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                <Phone className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                <span>+250 780 097 079</span>
              </a>
              <a href="mailto:info.flexirentrw@gmail.com" className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                <Mail className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                <span className="truncate">info.flexirentrw@gmail.com</span>
              </a>
              <a href="https://wa.me/250780097079" target="_blank" rel="noreferrer" className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                <MessageSquare className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                <span>wa.me/250780097079</span>
              </a>
              <div className="flex items-center space-x-2">
                <Clock className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                <span>{currentLang === 'en' ? 'Mon-Sun: 7h-22h' : 'Lun–Dim: 7h–22h'}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Location matches Screenshot 2 exactly */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-600 gap-4" id="footer-bottom">
          <div className="flex items-center space-x-1 font-mono">
            <span>© 2026 FlexiRent Ltd. Fait à Kigali.</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-3.5 w-3.5 text-blue-500" />
            <span>Kigali, Rwanda</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
