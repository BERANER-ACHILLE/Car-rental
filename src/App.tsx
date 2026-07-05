import React, { useState, useEffect } from 'react';
import { 
  Compass, MapPin, ShieldCheck, Heart, Star, 
  HelpCircle, Car, ArrowRight, Award, MessageSquare, Scale, Plus, Send, Eye
} from 'lucide-react';
import { Language, Vehicle } from './types';
import { TRANSLATIONS, TESTIMONIALS } from './data';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Fleet from './components/Fleet';
import BookingForm from './components/BookingForm';
import Guides from './components/Guides';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import CompareVehicles from './components/CompareVehicles';
import VehicleDetailsModal from './components/VehicleDetailsModal';
import AuthModal from './components/AuthModal';
import { auth, db } from './lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function App() {
  // 1. Theme state: Support both Dark Mode and Light Mode opposites as requested
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  const [currentLang, setLang] = useState<Language>('fr'); // Default to French matches user screenshots
  const [currency, setCurrency] = useState<'RWF' | 'USD'>('RWF');
  const [selectedCar, setSelectedCar] = useState<Vehicle | null>(null);
  const [searchData, setSearchData] = useState<{
    pickup: string;
    dropoff: string;
    pickupDate: string;
    dropoffDate: string;
    category: string;
  } | null>(null);

  // 2. Interactive user-submitted review state
  const [reviews, setReviews] = useState(TESTIMONIALS);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewRole, setNewReviewRole] = useState('Client Vérifié');
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // 3. Vehicle side-by-side comparison state
  const [compareList, setCompareList] = useState<Vehicle[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // 4. Detailed spec modal state
  const [detailCar, setDetailCar] = useState<Vehicle | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Firebase Auth states
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const t = TRANSLATIONS[currentLang];

  // Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
          } else {
            setUserProfile(null);
          }
        } catch (error) {
          console.error("Error retrieving user profile from Firestore:", error);
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out user:", error);
    }
  };

  // Apply dark class to body/document for perfect tailwind targeting
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleSearch = (data: {
    pickup: string;
    dropoff: string;
    pickupDate: string;
    dropoffDate: string;
    category: string;
  }) => {
    setSearchData(data);
  };

  const handleSelectCar = (car: Vehicle) => {
    setSelectedCar(car);
    setTimeout(() => {
      document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleBookingReset = () => {
    setSelectedCar(null);
    setSearchData(null);
  };

  const handleOpenBooking = () => {
    document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Compare deck functions
  const handleToggleCompare = (car: Vehicle) => {
    setCompareList(prev => {
      if (prev.some(c => c.id === car.id)) {
        return prev.filter(c => c.id !== car.id);
      }
      if (prev.length >= 3) {
        return prev; // Max 3 vehicles
      }
      return [...prev, car];
    });
  };

  const handleRemoveCompare = (carId: string) => {
    setCompareList(prev => prev.filter(c => c.id !== carId));
  };

  const handleClearCompare = () => {
    setCompareList([]);
  };

  // View Specifications Modal handler
  const handleViewDetails = (car: Vehicle) => {
    setDetailCar(car);
    setIsDetailOpen(true);
  };

  // Add customized client review
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewText.trim()) return;

    const reviewObj = {
      id: 'custom_' + Date.now(),
      name: newReviewName,
      role: newReviewRole,
      roleFr: newReviewRole === 'Client Vérifié' ? 'Client Vérifié' : newReviewRole,
      text: `"${newReviewText}"`,
      textFr: `"${newReviewText}"`,
      rating: newReviewRating,
      avatar: ''
    };

    setReviews(prev => [reviewObj, ...prev]);
    setReviewSubmitted(true);
    setNewReviewName('');
    setNewReviewText('');
    setNewReviewRating(5);
    
    setTimeout(() => {
      setReviewSubmitted(false);
      setIsReviewFormOpen(false);
    }, 3000);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-350 bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100`} id="app-root">
      
      {/* 1. Header Navigation - featuring custom logo & Sun/Moon switch */}
      <Navbar
        currentLang={currentLang}
        setLang={setLang}
        currency={currency}
        setCurrency={setCurrency}
        onOpenBooking={handleOpenBooking}
        theme={theme}
        toggleTheme={toggleTheme}
        user={user}
        userProfile={userProfile}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* 2. Hero search banner */}
      <Hero 
        currentLang={currentLang} 
        currency={currency}
        onSearch={handleSearch} 
      />

      {/* 3. "Conçu pour la mobilité du Rwanda." value props section */}
      <section className="bg-white dark:bg-slate-900/60 py-20 border-b border-gray-100 dark:border-slate-800 transition-colors" id="value-props">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center max-w-3xl mx-auto">
            <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 dark:text-yellow-400 block mb-2.5 font-mono">
              ★ POURQUOI FLEXIRENT
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-gray-950 dark:text-white tracking-tight uppercase leading-tight">
              {t.featuresTitle}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 lg:gap-10">
            
            {/* Value prop 1 */}
            <div className="flex items-start space-x-5 p-6 hover:bg-gray-50/65 dark:hover:bg-slate-800/30 rounded-2xl border border-transparent hover:border-gray-100 dark:hover:border-slate-800/60 transition-all duration-300" id="prop-1">
              <span className="inline-flex p-3.5 bg-blue-50 dark:bg-slate-800/80 text-blue-600 dark:text-yellow-400 rounded-xl shrink-0 shadow-xs">
                <MapPin className="h-5.5 w-5.5" />
              </span>
              <div>
                <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wide">{t.unlimitedMileage}</h4>
                <p className="text-xs text-gray-550 dark:text-gray-400 mt-1.5 leading-relaxed font-medium">{t.unlimitedMileageDesc}</p>
              </div>
            </div>

            {/* Value prop 2 */}
            <div className="flex items-start space-x-5 p-6 hover:bg-gray-50/65 dark:hover:bg-slate-800/30 rounded-2xl border border-transparent hover:border-gray-100 dark:hover:border-slate-800/60 transition-all duration-300" id="prop-2">
              <span className="inline-flex p-3.5 bg-blue-50 dark:bg-slate-800/80 text-blue-600 dark:text-yellow-400 rounded-xl shrink-0 shadow-xs">
                <ShieldCheck className="h-5.5 w-5.5" />
              </span>
              <div>
                <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wide">{t.newFleet}</h4>
                <p className="text-xs text-gray-550 dark:text-gray-400 mt-1.5 leading-relaxed font-medium">{t.newFleetDesc}</p>
              </div>
            </div>

            {/* Value prop 3 */}
            <div className="flex items-start space-x-5 p-6 hover:bg-gray-50/65 dark:hover:bg-slate-800/30 rounded-2xl border border-transparent hover:border-gray-100 dark:hover:border-slate-800/60 transition-all duration-300" id="prop-3">
              <span className="inline-flex p-3.5 bg-blue-50 dark:bg-slate-800/80 text-blue-600 dark:text-yellow-400 rounded-xl shrink-0 shadow-xs">
                <Award className="h-5.5 w-5.5" />
              </span>
              <div>
                <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wide">{t.customerService}</h4>
                <p className="text-xs text-gray-550 dark:text-gray-400 mt-1.5 leading-relaxed font-medium">{t.customerServiceDesc}</p>
              </div>
            </div>

            {/* Value prop 4 */}
            <div className="flex items-start space-x-5 p-6 hover:bg-gray-50/65 dark:hover:bg-slate-800/30 rounded-2xl border border-transparent hover:border-gray-100 dark:hover:border-slate-800/60 transition-all duration-300" id="prop-4">
              <span className="inline-flex p-3.5 bg-blue-50 dark:bg-slate-800/80 text-blue-600 dark:text-yellow-400 rounded-xl shrink-0 shadow-xs">
                <MessageSquare className="h-5.5 w-5.5" />
              </span>
              <div>
                <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wide">{t.noHiddenFees}</h4>
                <p className="text-xs text-gray-550 dark:text-gray-400 mt-1.5 leading-relaxed font-medium">{t.noHiddenFeesDesc}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Fleet selection Showcase */}
      <Fleet
        currentLang={currentLang}
        currency={currency}
        onSelectCar={handleSelectCar}
        selectedCarId={selectedCar?.id}
        onViewDetails={handleViewDetails}
        compareList={compareList}
        onToggleCompare={handleToggleCompare}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* 5. "Trois étapes. Pas de centre d'appels." section */}
      <section className="bg-white dark:bg-slate-900/60 py-20 border-t border-gray-100 dark:border-slate-800" id="steps-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center max-w-3xl mx-auto">
            <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 dark:text-yellow-400 block mb-2.5 font-mono">
              ★ COMMENT ÇA MARCHE
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-gray-950 dark:text-white tracking-tight uppercase leading-tight">
              {currentLang === 'en' ? 'Three steps. No call centers.' : 'Trois étapes. Pas de centre d\'appels.'}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
            {/* Step 1 */}
            <div className="space-y-4 p-6 rounded-2xl bg-slate-50/40 dark:bg-slate-900/40 border border-gray-100 dark:border-slate-850 hover:bg-slate-50/80 dark:hover:bg-slate-900/60 transition-all duration-300 shadow-xs relative group">
              <span className="absolute -top-4 -left-3 text-4xl font-display font-black text-blue-600/10 dark:text-yellow-400/10 group-hover:scale-110 transition-transform select-none">01</span>
              <div className="text-[9px] font-mono font-black text-blue-600 dark:text-yellow-400 uppercase tracking-widest bg-blue-50 dark:bg-yellow-400/15 px-3 py-1 rounded-md inline-block">Étape 01</div>
              <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-wide">{currentLang === 'en' ? 'Choose' : 'Choisissez'}</h3>
              <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed font-medium">
                {currentLang === 'en' 
                  ? 'Browse the fleet, filter by category and budget. Select your vehicle.' 
                  : 'Parcourez la flotte, filtrez par catégorie et budget. Sélectionnez votre véhicule.'}
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-4 p-6 rounded-2xl bg-slate-50/40 dark:bg-slate-900/40 border border-gray-100 dark:border-slate-850 hover:bg-slate-50/80 dark:hover:bg-slate-900/60 transition-all duration-300 shadow-xs relative group">
              <span className="absolute -top-4 -left-3 text-4xl font-display font-black text-blue-600/10 dark:text-yellow-400/10 group-hover:scale-110 transition-transform select-none">02</span>
              <div className="text-[9px] font-mono font-black text-blue-600 dark:text-yellow-400 uppercase tracking-widest bg-blue-50 dark:bg-yellow-400/15 px-3 py-1 rounded-md inline-block">Étape 02</div>
              <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-wide">{currentLang === 'en' ? 'Book Online' : 'Réservez en ligne'}</h3>
              <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed font-medium">
                {currentLang === 'en' 
                  ? 'Enter your dates, select your insurance package. Two minutes.' 
                  : 'Saisissez vos dates, sélectionnez votre formule d\'assurance. Deux minutes.'}
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-4 p-6 rounded-2xl bg-slate-50/40 dark:bg-slate-900/40 border border-gray-100 dark:border-slate-850 hover:bg-slate-50/80 dark:hover:bg-slate-900/60 transition-all duration-300 shadow-xs relative group">
              <span className="absolute -top-4 -left-3 text-4xl font-display font-black text-blue-600/10 dark:text-yellow-400/10 group-hover:scale-110 transition-transform select-none">03</span>
              <div className="text-[9px] font-mono font-black text-blue-600 dark:text-yellow-400 uppercase tracking-widest bg-blue-50 dark:bg-yellow-400/15 px-3 py-1 rounded-md inline-block">Étape 03</div>
              <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-wide">{currentLang === 'en' ? 'Drive' : 'Roulez'}</h3>
              <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed font-medium">
                {currentLang === 'en' 
                  ? 'Delivery to your door, vehicle walk-around, hand over the keys.' 
                  : 'Livraison à votre porte, présentation du véhicule, remise des clés.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Service Guarantees & Peace of Mind Section */}
      <section className="bg-slate-50 dark:bg-slate-950 py-16" id="service-guarantees">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-950 dark:bg-slate-900/40 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-transparent dark:border-slate-800">
            {/* Ambient graphical background */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-800/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-900/40 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10 space-y-8">
              <div className="max-w-2xl space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 dark:text-yellow-400">
                  {currentLang === 'en' ? "OUR PREMIUM SERVICES" : "NOS SERVICES PREMIUM"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {currentLang === 'en' ? 'Drive with absolute peace of mind.' : 'Roulez en toute tranquillité d\'esprit.'}
                </h2>
                <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
                  {currentLang === 'en' 
                    ? 'Our dedicated premium customer service is there for you at every milestone of your journey in Rwanda.' 
                    : 'Notre service client premium vous accompagne à chaque étape de votre voyage au Rwanda.'}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 pt-4">
                {/* 24/7 Support Card */}
                <div className="bg-blue-900/40 dark:bg-slate-950/50 border border-blue-800/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
                  <span className="inline-block bg-blue-800 dark:bg-slate-800 text-blue-200 dark:text-yellow-400 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm">
                    {currentLang === 'en' ? 'ROADSIDE ASSISTANCE' : 'ASSISTANCE ROUTIÈRE'}
                  </span>
                  <h3 className="text-xl font-bold">{currentLang === 'en' ? '24/7 Roadside Assistance' : 'Assistance Routière 24h/7'}</h3>
                  <p className="text-xs text-blue-200/80 leading-relaxed">
                    {currentLang === 'en'
                      ? 'Drive with total peace of mind. Our local support team and mechanics are on standby 24/7 to assist you anywhere in Rwanda.'
                      : 'Roulez l\'esprit tranquille. Notre équipe locale et nos mécaniciens sont disponibles 24h/24 et 7j/7 pour vous aider partout au Rwanda.'}
                  </p>
                </div>

                {/* Direct support Card */}
                <div className="bg-blue-900/40 dark:bg-slate-950/50 border border-blue-800/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
                  <span className="inline-block bg-blue-800 dark:bg-slate-800 text-blue-200 dark:text-yellow-400 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm">
                    {currentLang === 'en' ? 'DIRECT CHAT' : 'SUPPORT DIRECT'}
                  </span>
                  <h3 className="text-xl font-bold">{currentLang === 'en' ? 'Real Humans on WhatsApp' : 'Vraies personnes sur WhatsApp'}</h3>
                  <p className="text-xs text-blue-200/80 leading-relaxed">
                    {currentLang === 'en'
                      ? 'Delivery to your door, dynamic vehicle walk-through, and immediate key handover. Reach us 7 days a week directly via WhatsApp.'
                      : 'Livraison à votre porte, présentation du véhicule, remise des clés. Contactez-nous 7j/7 directement sur WhatsApp pour toute question.'}
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={handleOpenBooking}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-3 rounded-full transition-all cursor-pointer"
                >
                  {currentLang === 'en' ? 'View the fleet' : 'Voir la flotte'}
                </button>
                <a
                  href="https://wa.me/250780097079"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-900/60 hover:bg-blue-900 border border-blue-800 text-white text-xs font-bold px-6 py-3 rounded-full inline-flex items-center space-x-2 transition-all"
                >
                  <span>{currentLang === 'en' ? 'Talk to us' : 'Nous parler'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Pricing calculator & checkout step-by-step form */}
      <BookingForm
        selectedCar={selectedCar}
        currentLang={currentLang}
        currency={currency}
        searchData={searchData}
        onBookingReset={handleBookingReset}
        user={user}
        userProfile={userProfile}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* 8. Travel guidelines for Rwanda */}
      <Guides 
        currentLang={currentLang} 
        onSelectVehicle={handleSelectCar}
      />

      {/* 9. Interactive Customer Testimonials */}
      <section className="py-20 bg-white dark:bg-slate-900/30 border-b border-gray-100 dark:border-slate-800 transition-colors" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6" id="testimonials-header">
            <div>
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 dark:text-yellow-400 block mb-2.5 font-mono">
                ★ AVIS & EXPÉRIENCES
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight uppercase leading-none">
                {t.testimonialsTitle}
              </h2>
              <p className="text-gray-500 dark:text-gray-405 text-xs sm:text-sm mt-3 font-medium leading-relaxed max-w-xl">{t.testimonialsSubtitle}</p>
            </div>

            <button
              onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-slate-950 font-black tracking-widest text-[10px] py-3.5 px-6 rounded-xl uppercase shadow-md hover:shadow-lg cursor-pointer inline-flex items-center space-x-2 shrink-0 self-start md:self-auto transition-all hover:translate-y-[-1px] active:translate-y-[1px]"
            >
              <Plus className="h-4 w-4" />
              <span>{currentLang === 'en' ? 'Share Experience' : 'Laisser un avis'}</span>
            </button>
          </div>

          {/* Collapsible Interactive Review Submission Form */}
          {isReviewFormOpen && (
            <div className="bg-slate-50 dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-gray-150 dark:border-slate-800/85 max-w-xl mx-auto space-y-4 shadow-xl">
              <h4 className="font-black text-xs text-gray-900 dark:text-white uppercase tracking-wider">
                {currentLang === 'en' ? 'Submit Your Verified Review' : 'Donnez votre avis vérifié'}
              </h4>
              
              {reviewSubmitted ? (
                <div className="text-center py-8 space-y-2 text-green-600 dark:text-green-400 animate-fade-in">
                  <ShieldCheck className="h-10 w-10 mx-auto animate-pulse" />
                  <p className="text-xs font-bold">{currentLang === 'en' ? 'Review Logged Successfully!' : 'Votre avis a été enregistré !'}</p>
                  <p className="text-[10px] text-gray-400">{currentLang === 'en' ? 'Thank you for choosing FlexiRent Rwanda.' : 'Merci pour votre confiance.'}</p>
                </div>
              ) : (
                <form onSubmit={handleAddReview} className="space-y-4 text-xs font-semibold text-gray-700 dark:text-gray-300">
                  
                  {/* Rating Stars Selection */}
                  <div className="space-y-1.5">
                    <label className="block">{currentLang === 'en' ? 'Your Rating' : 'Votre note'}</label>
                    <div className="flex space-x-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReviewRating(star)}
                          className="p-1 cursor-pointer transition-transform hover:scale-110"
                        >
                          <Star className={`h-5 w-5 ${star <= newReviewRating ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-750'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input fields row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label>{currentLang === 'en' ? 'Full Name' : 'Nom Complet'}</label>
                      <input
                        type="text"
                        value={newReviewName}
                        onChange={(e) => setNewReviewName(e.target.value)}
                        placeholder="e.g. Achille Ebang"
                        className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 p-3 rounded-xl font-medium text-gray-850 dark:text-white focus:outline-hidden"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label>{currentLang === 'en' ? 'Your Status' : 'Votre statut'}</label>
                      <input
                        type="text"
                        value={newReviewRole}
                        onChange={(e) => setNewReviewRole(e.target.value)}
                        placeholder="e.g. Visiteur au Rwanda / Résident"
                        className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 p-3 rounded-xl font-medium text-gray-855 dark:text-white focus:outline-hidden"
                        required
                      />
                    </div>
                  </div>

                  {/* Message box */}
                  <div className="space-y-1">
                    <label>{currentLang === 'en' ? 'Your Review' : 'Votre commentaire'}</label>
                    <textarea
                      rows={3}
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      placeholder={currentLang === 'en' ? 'Share your delivery, clean car, or WhatsApp checkout details...' : 'Racontez la livraison, l’état du véhicule ou le suivi WhatsApp...'}
                      className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 p-3 rounded-xl font-medium text-gray-855 dark:text-white focus:outline-hidden resize-none"
                      required
                    />
                  </div>

                  {/* Submit review */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black tracking-widest py-3.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer text-xs uppercase shadow-md"
                  >
                    <Send className="h-3 w-3" />
                    <span>{currentLang === 'en' ? 'Submit Verified Review' : 'Publier l’avis'}</span>
                  </button>

                </form>
              )}
            </div>
          )}

          {/* Testimonials Display Grid */}
          <div className="grid md:grid-cols-3 gap-8" id="testimonials-grid">
            {reviews.map((test) => (
              <div 
                key={test.id} 
                className="bg-slate-50/45 dark:bg-slate-900/30 rounded-3xl p-7 border border-gray-150 dark:border-slate-800/80 flex flex-col justify-between space-y-6 hover:shadow-lg hover:border-gray-250 dark:hover:border-slate-700 transition-all duration-300"
                id={`testimonial-card-${test.id}`}
              >
                <div className="space-y-4">
                  {/* Rating stars */}
                  <div className="flex text-amber-400 space-x-0.5 animate-pulse">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium italic">
                    {currentLang === 'en' ? test.text : test.textFr}
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t border-gray-150 dark:border-slate-850">
                  <div className="h-9 w-9 rounded-xl bg-blue-50 dark:bg-slate-800/60 text-blue-600 dark:text-yellow-400 font-black flex items-center justify-center text-xs shadow-inner">
                    {test.name[0]}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wide">{test.name}</h4>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider font-mono">
                      {currentLang === 'en' ? test.role : test.roleFr}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. FAQ Accordion */}
      <FAQ 
        currentLang={currentLang} 
      />

      {/* 11. Global footer section */}
      <Footer 
        currentLang={currentLang} 
      />

      {/* 12. Floating Comparison notification bar when items added */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white rounded-full px-5 py-3 shadow-2xl border border-slate-800 flex items-center space-x-4 animate-bounce">
          <div className="flex items-center space-x-2">
            <Scale className="h-4 w-4 text-yellow-400" />
            <span className="text-xs font-bold">
              {currentLang === 'en' 
                ? `${compareList.length} Selected` 
                : `${compareList.length} Sélectionné(s)`}
            </span>
          </div>
          <button
            onClick={() => setIsCompareOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase px-3.5 py-1.5 rounded-full tracking-wider transition-colors cursor-pointer inline-flex items-center gap-1"
          >
            <Eye className="h-3 w-3" />
            <span>{currentLang === 'en' ? 'Compare' : 'Comparer'}</span>
          </button>
        </div>
      )}

      {/* 13. Dynamic Comparison Sliding Drawer overlay */}
      <CompareVehicles
        currentLang={currentLang}
        currency={currency}
        compareList={compareList}
        onRemove={handleRemoveCompare}
        onClear={handleClearCompare}
        onSelectCar={handleSelectCar}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
      />

      {/* 14. Dynamic Specifications sheet detail modal overlay */}
      <VehicleDetailsModal
        car={detailCar}
        currentLang={currentLang}
        currency={currency}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onSelectCar={handleSelectCar}
      />

      {/* 15. Authentication Dialog */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentLang={currentLang}
      />

    </div>
  );
}
