import React, { useState } from 'react';
import { Languages, Menu, X, Sun, Moon, User, LogOut, LogIn } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';
import Logo from './Logo';

interface NavbarProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
  currency: 'RWF' | 'USD';
  setCurrency: (currency: 'RWF' | 'USD') => void;
  onOpenBooking: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  user: any;
  userProfile: any;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export default function Navbar({
  currentLang,
  setLang,
  currency,
  setCurrency,
  onOpenBooking,
  theme,
  toggleTheme,
  user,
  userProfile,
  onOpenAuth,
  onLogout,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-gray-100/80 dark:border-slate-800/80 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Component - fully responsive and matching yellow/blue branding */}
          <div 
            onClick={() => handleScrollTo('hero')} 
            className="cursor-pointer group"
            id="nav-logo-container"
          >
            <Logo />
          </div>

          {/* Desktop Navigation - responsive to light/dark themes */}
          <nav className="hidden md:flex space-x-6 items-center">
            <button 
              onClick={() => handleScrollTo('hero')} 
              className="text-xs font-bold text-gray-750 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors cursor-pointer"
            >
              {currentLang === 'en' ? 'Home' : 'Accueil'}
            </button>
            <button 
              onClick={() => handleScrollTo('fleet')} 
              className="text-xs font-bold text-gray-755 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors cursor-pointer"
            >
              {currentLang === 'en' ? 'Our vehicles' : 'Nos véhicules'}
            </button>
            <button 
              onClick={() => handleScrollTo('faqs')} 
              className="text-xs font-bold text-gray-755 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Control Actions (Dark Mode toggle, Currency, Languages, Reservation btn) */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Sun/Moon Toggle button - Rotating transition */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-yellow-400 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? (
                <Moon className="h-4.5 w-4.5 transition-transform duration-300 group-hover:rotate-45" />
              ) : (
                <Sun className="h-4.5 w-4.5 transition-transform duration-300 hover:rotate-90 text-yellow-400" />
              )}
            </button>

            {/* Currency toggle */}
            <div className="flex bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-full p-0.5 text-[10px]">
              <button
                onClick={() => setCurrency('RWF')}
                className={`px-2.5 py-1 font-mono font-bold rounded-full transition-all cursor-pointer ${
                  currency === 'RWF'
                    ? 'bg-blue-600 dark:bg-yellow-400 text-white dark:text-slate-950 shadow-xs'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-850 dark:hover:text-white'
                }`}
              >
                RF
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 font-mono font-bold rounded-full transition-all cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-blue-600 dark:bg-yellow-400 text-white dark:text-slate-950 shadow-xs'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-850 dark:hover:text-white'
                }`}
              >
                USD
              </button>
            </div>

            {/* Language toggle matches "EN | FR" style */}
            <div className="flex items-center space-x-1.5 text-xs font-bold text-gray-400">
              <button
                onClick={() => setLang('en')}
                className={`transition-colors cursor-pointer hover:text-blue-600 dark:hover:text-yellow-400 ${
                  currentLang === 'en' ? 'text-slate-800 dark:text-white' : 'text-gray-400 dark:text-slate-500'
                }`}
              >
                EN
              </button>
              <span>|</span>
              <button
                onClick={() => setLang('fr')}
                className={`transition-colors cursor-pointer hover:text-blue-600 dark:hover:text-yellow-400 ${
                  currentLang === 'fr' ? 'text-slate-800 dark:text-white' : 'text-gray-400 dark:text-slate-500'
                }`}
              >
                FR
              </button>
            </div>

            {/* User Profile / Login trigger */}
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1.5 bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-800 px-3 py-1.5 rounded-full text-xs font-bold transition-all">
                  <User className="h-3.5 w-3.5 text-blue-600 dark:text-yellow-400" />
                  <span className="max-w-[100px] truncate text-gray-700 dark:text-gray-300">
                    {userProfile?.fullName || user.displayName || 'User'}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="p-1.5 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-full transition-all cursor-pointer"
                  title={currentLang === 'en' ? 'Log Out' : 'Se déconnecter'}
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="border border-blue-600 dark:border-yellow-400 text-blue-600 dark:text-yellow-400 hover:bg-blue-50 dark:hover:bg-yellow-400/10 text-xs font-bold px-4 py-2 rounded-full transition-all cursor-pointer shadow-xs flex items-center space-x-1.5"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>{currentLang === 'en' ? 'Login' : 'Connexion'}</span>
              </button>
            )}

            {/* Pill-shaped Booking Button like in screenshot */}
            <button
              onClick={onOpenBooking}
              className="bg-blue-600 dark:bg-yellow-400 hover:bg-blue-700 dark:hover:bg-yellow-500 text-white dark:text-slate-950 text-xs font-bold px-4 py-2 rounded-full transition-all cursor-pointer shadow-xs"
            >
              {currentLang === 'en' ? 'Book' : 'Réserver'}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-2">
            
            {/* Quick Sun/Moon toggle for mobile */}
            <button
              onClick={toggleTheme}
              className="p-1.5 text-gray-500 dark:text-gray-400 rounded-md bg-gray-50 dark:bg-slate-900 border border-gray-150 dark:border-slate-800 cursor-pointer"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4 text-yellow-400" />
              )}
            </button>

            {/* Quick Lang swap for mobile screen */}
            <button
              onClick={() => setLang(currentLang === 'en' ? 'fr' : 'en')}
              className="bg-gray-50 dark:bg-slate-900 border border-gray-150 dark:border-slate-800 px-2.5 py-1.5 rounded-md text-[10px] font-bold text-gray-600 dark:text-gray-300 cursor-pointer"
            >
              {currentLang === 'en' ? 'FR' : 'EN'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-yellow-400 hover:bg-gray-50 dark:hover:bg-slate-900 rounded-lg cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800 px-4 py-4 space-y-3 shadow-md" id="mobile-drawer">
          <div className="space-y-1">
            <button
              onClick={() => handleScrollTo('hero')}
              className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-slate-900"
            >
              {currentLang === 'en' ? 'Home' : 'Accueil'}
            </button>
            <button
              onClick={() => handleScrollTo('fleet')}
              className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-slate-900"
            >
              {currentLang === 'en' ? 'Our vehicles' : 'Nos véhicules'}
            </button>
            <button
              onClick={() => handleScrollTo('faqs')}
              className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-slate-900"
            >
              Contact
            </button>
          </div>

          <hr className="border-gray-100 dark:border-slate-800" />

          {/* Currency selection row */}
          <div className="flex justify-between items-center px-3">
            <span className="text-xs text-gray-400 font-bold">CURRENCY</span>
            <div className="flex bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-full p-0.5 text-[10px]">
              <button
                onClick={() => {
                  setCurrency('RWF');
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1 font-mono font-bold rounded-full transition-all cursor-pointer ${
                  currency === 'RWF' 
                    ? 'bg-blue-600 dark:bg-yellow-400 text-white dark:text-slate-950' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                RF
              </button>
              <button
                onClick={() => {
                  setCurrency('USD');
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1 font-mono font-bold rounded-full transition-all cursor-pointer ${
                  currency === 'USD' 
                    ? 'bg-blue-600 dark:bg-yellow-400 text-white dark:text-slate-950' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                USD
              </button>
            </div>
          </div>

          {user ? (
            <div className="space-y-2 px-3 pt-1">
              <div className="flex items-center space-x-2 bg-blue-50/50 dark:bg-slate-900 border border-blue-100/50 dark:border-slate-800 p-2.5 rounded-xl">
                <User className="h-4 w-4 text-blue-600 dark:text-yellow-400" />
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                  {userProfile?.fullName || user.displayName || 'User'}
                </span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="w-full text-center border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>{currentLang === 'en' ? 'Log Out' : 'Se déconnecter'}</span>
              </button>
            </div>
          ) : (
            <div className="px-3 pt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full text-center border border-blue-600 dark:border-yellow-400 text-blue-600 dark:text-yellow-400 py-2.5 rounded-full text-xs font-bold flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <LogIn className="h-4 w-4" />
                <span>{currentLang === 'en' ? 'Log In / Register' : 'Connexion / Inscription'}</span>
              </button>
            </div>
          )}

          <div className="px-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full text-center bg-blue-600 dark:bg-yellow-400 text-white dark:text-slate-950 py-2.5 rounded-full text-xs font-bold cursor-pointer"
            >
              {currentLang === 'en' ? 'Reserve Now' : 'Réserver en Ligne'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
