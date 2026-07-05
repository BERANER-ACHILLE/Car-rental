import React, { useState, useEffect } from 'react';
import { 
  Calendar, MapPin, Calculator, Shield, HelpCircle, 
  CheckCircle, Loader2, Phone, Mail, 
  User, CreditCard, ChevronRight, CheckCircle2, ChevronDown, Check, Scale
} from 'lucide-react';
import { Vehicle, Language } from '../types';
import { TRANSLATIONS, LOCATIONS } from '../data';
import MapVisualizer from './MapVisualizer';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

interface BookingFormProps {
  selectedCar: Vehicle | null;
  currentLang: Language;
  currency: 'RWF' | 'USD';
  searchData: {
    pickup: string;
    dropoff: string;
    pickupDate: string;
    dropoffDate: string;
    category: string;
  } | null;
  onBookingReset: () => void;
  user: any;
  userProfile: any;
  onOpenAuth: () => void;
}

export default function BookingForm({
  selectedCar,
  currentLang,
  currency,
  searchData,
  onBookingReset,
  user,
  userProfile,
  onOpenAuth,
}: BookingFormProps) {
  const t = TRANSLATIONS[currentLang];

  // 1. Wizard Multi-Step Flow States
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Booking details states
  const [pickupLocation, setPickupLocation] = useState('kigali_airport');
  const [dropoffLocation, setDropoffLocation] = useState('kigali_airport');
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');

  // Add-on states
  const [withDriver, setWithDriver] = useState(false);
  const [gps, setGps] = useState(false);
  const [insurance, setInsurance] = useState(false);

  // Renter info states
  const [renterName, setRenterName] = useState('');
  const [renterEmail, setRenterEmail] = useState('');
  const [renterPhone, setRenterPhone] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');

  // UI Flow states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');

  // Pre-fill fields if user is authenticated
  useEffect(() => {
    if (user) {
      if (userProfile?.fullName) {
        setRenterName(userProfile.fullName);
      } else if (user.displayName) {
        setRenterName(user.displayName);
      }
      if (user.email) {
        setRenterEmail(user.email);
      }
      if (userProfile?.phone) {
        setRenterPhone(userProfile.phone);
      }
    } else {
      setRenterName('');
      setRenterEmail('');
      setRenterPhone('');
    }
  }, [user, userProfile]);



  // Sync with search data from Hero when it changes
  useEffect(() => {
    if (searchData) {
      setPickupLocation(searchData.pickup);
      setDropoffLocation(searchData.dropoff);
      setPickupDate(searchData.pickupDate);
      setDropoffDate(searchData.dropoffDate);
    } else {
      // Set default dates if no active search
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const fiveDaysLater = new Date();
      fiveDaysLater.setDate(tomorrow.getDate() + 6);
      
      const formatDate = (d: Date) => d.toISOString().split('T')[0];
      setPickupDate(formatDate(tomorrow));
      setDropoffDate(formatDate(fiveDaysLater));
    }
  }, [searchData]);

  // Calculate rental duration in days
  const calculateDays = () => {
    if (!pickupDate || !dropoffDate) return 1;
    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 0 ? 1 : diffDays;
  };

  const days = calculateDays();

  // Price calculations
  const getDailyRate = () => {
    if (!selectedCar) return 0;
    return currency === 'RWF' ? selectedCar.pricePerDayRwf : selectedCar.pricePerDayUsd;
  };

  const getAddonsDailyRate = () => {
    let rate = 0;
    if (currency === 'RWF') {
      if (withDriver) rate += 25000;
      if (gps) rate += 5000;
      if (insurance) rate += 10000;
    } else {
      if (withDriver) rate += 20;
      if (gps) rate += 4;
      if (insurance) rate += 8;
    }
    return rate;
  };

  const getDeliveryFees = () => {
    const pickupLocObj = LOCATIONS.find(l => l.id === pickupLocation);
    const dropoffLocObj = LOCATIONS.find(l => l.id === dropoffLocation);
    
    const fee1 = pickupLocObj ? (currency === 'RWF' ? pickupLocObj.feeRwf : pickupLocObj.feeUsd) : 0;
    const fee2 = dropoffLocObj ? (currency === 'RWF' ? dropoffLocObj.feeRwf : dropoffLocObj.feeUsd) : 0;
    
    return fee1 + fee2;
  };

  const basePriceTotal = getDailyRate() * days;
  const addonsTotal = getAddonsDailyRate() * days;
  const deliveryTotal = getDeliveryFees();

  const grandTotal = basePriceTotal + addonsTotal + deliveryTotal;

  const formatPrice = (val: number) => {
    if (currency === 'RWF') {
      return val.toLocaleString('fr-FR') + ' RF';
    } else {
      return '$' + val;
    }
  };

  const getWhatsAppLink = () => {
    if (!selectedCar) return '#';
    const pickupLocObj = LOCATIONS.find(l => l.id === pickupLocation);
    const dropoffLocObj = LOCATIONS.find(l => l.id === dropoffLocation);
    const pickupLocName = pickupLocObj ? (currentLang === 'en' ? pickupLocObj.name : pickupLocObj.nameFr) : pickupLocation;
    const dropoffLocName = dropoffLocObj ? (currentLang === 'en' ? dropoffLocObj.name : dropoffLocObj.nameFr) : dropoffLocation;

    const message = currentLang === 'en'
      ? `Hello FlexiRent! I would like to finalize my car rental reservation request:
• Vehicle: ${selectedCar.name.toUpperCase()}
• Reference: ${voucherCode}
• Period: From ${pickupDate} to ${dropoffDate} (${days} ${days === 1 ? 'day' : 'days'})
• Pick-up Location: ${pickupLocName}
• Drop-off Location: ${dropoffLocName}
• Driver Option: ${withDriver ? 'Yes (+Chauffeur)' : 'No (Independent)'}
• GPS Unit: ${gps ? 'Yes' : 'No'}
• Collision Waiver: ${insurance ? 'Yes' : 'No'}
• Renter Name: ${renterName}
• Phone: ${renterPhone}
• Email: ${renterEmail}
• License/Passport: ${licenseNumber}
• Estimated Total: ${formatPrice(grandTotal)}`
      : `Bonjour FlexiRent ! Je souhaite finaliser ma demande de réservation de location de voiture :
• Véhicule : ${selectedCar.name.toUpperCase()}
• Référence : ${voucherCode}
• Période : Du ${pickupDate} au ${dropoffDate} (${days} ${days === 1 ? 'jour' : 'jours'})
• Lieu de départ : ${pickupLocName}
• Lieu de restitution : ${dropoffLocName}
• Option Chauffeur : ${withDriver ? 'Oui' : 'Non (Sans chauffeur)'}
• Option GPS : ${gps ? 'Oui' : 'Non'}
• Rachat de franchise : ${insurance ? 'Oui' : 'Non'}
• Nom complet : ${renterName}
• Tél : ${renterPhone}
• Email : ${renterEmail}
• Permis/Passeport : ${licenseNumber}
• Total Estimé : ${formatPrice(grandTotal)}`;

    return `https://wa.me/250780097079?text=${encodeURIComponent(message)}`;
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCar) return;

    // Verify contact info is valid
    if (!renterName.trim() || !renterEmail.trim() || !renterPhone.trim() || !licenseNumber.trim()) {
      setCurrentStep(3);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const randNum = Math.floor(1000 + Math.random() * 9000);
      const generatedCode = `FLX-2026-${randNum}`;
      
      const bookingPayload: any = {
        vehicleId: selectedCar.id,
        pickupDate,
        dropoffDate,
        pickupLocation,
        dropoffLocation,
        withDriver,
        gps,
        insurance,
        renterName,
        renterEmail,
        renterPhone,
        licenseNumber,
        totalPrice: grandTotal,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      if (user) {
        bookingPayload.userId = user.uid;
      }

      // Record request to Firestore
      await addDoc(collection(db, 'bookings'), bookingPayload);

      setVoucherCode(generatedCode);
      setIsSuccess(true);
    } catch (error) {
      console.error("Error creating booking document: ", error);
      // Fallback for resilient offline experience
      const randNum = Math.floor(1000 + Math.random() * 9000);
      setVoucherCode(`FLX-2026-${randNum}`);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setIsSuccess(false);
    setVoucherCode('');
    setCurrentStep(1);
    onBookingReset();
  };

  // If Booking submitted successfully, render dynamic Receipt Voucher
  if (isSuccess && selectedCar) {
    return (
      <section id="booking-invoice" className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-gray-150 dark:border-slate-800/80 overflow-hidden" id="booking-receipt-card">
            
            {/* Header Voucher */}
            <div className="bg-blue-600 dark:bg-slate-950 text-white p-8 text-center relative border-b border-dashed border-blue-500 dark:border-slate-850">
              <div className="absolute top-4 right-4 bg-white/10 dark:bg-yellow-400/20 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase text-white dark:text-yellow-400 font-bold">
                {currentLang === 'en' ? 'REQUEST CONFIRMED' : 'DEMANDE VALIDÉE'}
              </div>
              <div className="inline-flex items-center justify-center p-3.5 bg-white dark:bg-slate-900 text-blue-600 dark:text-yellow-400 rounded-full mb-4 shadow-lg">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold font-sans tracking-tight" id="receipt-header-title">
                {t.bookingSuccess}
              </h2>
              <p className="text-blue-100 dark:text-gray-400 text-xs sm:text-sm mt-2 max-w-lg mx-auto leading-relaxed">
                {t.bookingSuccessDesc}
              </p>
            </div>

            {/* Voucher Details */}
            <div className="p-8 space-y-8">
              
              {/* Reference & Car banner */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 dark:bg-slate-950/40 rounded-2xl border border-gray-150 dark:border-slate-850 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-0.5">
                    {t.referenceCode}
                  </span>
                  <span className="text-xl font-mono font-bold text-blue-600 dark:text-yellow-400" id="receipt-ref-code">
                    {voucherCode}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedCar.image}
                    alt={selectedCar.name}
                    className="h-12 w-20 object-cover rounded-lg border border-gray-100 dark:border-slate-800"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold block uppercase">
                      {t.selectedCar}
                    </span>
                    <span className="text-sm font-extrabold text-gray-900 dark:text-white capitalize">
                      {selectedCar.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Booking Specifications */}
              <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-700 dark:text-gray-300">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center space-x-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-yellow-400" />
                    <span>{currentLang === 'en' ? 'Rental Period' : 'Période de Location'}</span>
                  </h4>
                  <div className="space-y-2.5 text-xs font-semibold">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-blue-600 dark:text-yellow-400 shrink-0" />
                      <span><strong>{currentLang === 'en' ? 'Pick-up' : 'Début'}:</strong> {pickupDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500 shrink-0" />
                      <span><strong>{currentLang === 'en' ? 'Drop-off' : 'Fin'}:</strong> {dropoffDate}</span>
                    </div>
                    <p className="text-[11px] text-blue-700 dark:text-yellow-400 font-bold bg-blue-50 dark:bg-yellow-400/10 px-2.5 py-1 rounded-md inline-block">
                      {days} {days === 1 ? t.day : t.days}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center space-x-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-yellow-400" />
                    <span>{currentLang === 'en' ? 'Locations' : 'Lieux'}</span>
                  </h4>
                  <div className="space-y-2.5 text-xs font-semibold">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-blue-600 dark:text-yellow-400 shrink-0" />
                      <span className="truncate">
                        <strong>{currentLang === 'en' ? 'Pick-up' : 'Départ'}:</strong> {
                          LOCATIONS.find(l => l.id === pickupLocation)?.[currentLang === 'en' ? 'name' : 'nameFr']
                        }
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500 shrink-0" />
                      <span className="truncate">
                        <strong>{currentLang === 'en' ? 'Drop-off' : 'Restit.'}:</strong> {
                          LOCATIONS.find(l => l.id === dropoffLocation)?.[currentLang === 'en' ? 'name' : 'nameFr']
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-dashed border-gray-150 dark:border-slate-800" />

              {/* Pricing Breakdown */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  {currentLang === 'en' ? 'Invoice Summary' : 'Détail de la Facture'}
                </h4>
                <div className="space-y-2.5 text-xs font-semibold text-gray-600 dark:text-gray-350">
                  <div className="flex justify-between">
                    <span>{t.basePrice} ({formatPrice(getDailyRate())} × {days} {days === 1 ? t.day : t.days})</span>
                    <span className="font-mono">{formatPrice(basePriceTotal)}</span>
                  </div>
                  
                  {addonsTotal > 0 && (
                    <div className="flex justify-between">
                      <span>{t.options}</span>
                      <span className="font-mono text-gray-800 dark:text-white">+{formatPrice(addonsTotal)}</span>
                    </div>
                  )}

                  {deliveryTotal > 0 && (
                    <div className="flex justify-between">
                      <span>{t.deliveryFee}</span>
                      <span className="font-mono text-gray-800 dark:text-white">+{formatPrice(deliveryTotal)}</span>
                    </div>
                  )}



                  <div className="flex justify-between text-sm font-extrabold text-gray-900 dark:text-white pt-3 border-t border-gray-100 dark:border-slate-850">
                    <span>{t.totalAmount}</span>
                    <span className="text-blue-600 dark:text-yellow-400 font-mono text-base">{formatPrice(grandTotal)}</span>
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 italic">
                  * {t.vatIncluded}
                </p>
              </div>

              <hr className="border-gray-150 dark:border-slate-800" />

              {/* Customer Contact Card */}
              <div className="bg-gray-50 dark:bg-slate-950/60 rounded-xl p-4 border border-gray-100 dark:border-slate-850 space-y-2">
                <h5 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">{currentLang === 'en' ? 'Renter Contact' : 'Contacts du Locataire'}</h5>
                <div className="grid sm:grid-cols-2 gap-2.5 text-xs text-gray-600 dark:text-gray-400 font-medium">
                  <p><strong>{currentLang === 'en' ? 'Name' : 'Nom'}:</strong> {renterName}</p>
                  <p><strong>{currentLang === 'en' ? 'Phone' : 'Tél'}:</strong> {renterPhone}</p>
                  <p className="truncate"><strong>Email:</strong> {renterEmail}</p>
                  <p><strong>{currentLang === 'en' ? 'License' : 'Permis'}:</strong> {licenseNumber}</p>
                </div>
              </div>

              {/* WhatsApp confirmation CTA */}
              <div className="text-center space-y-3 pb-6 pt-2 border-t border-gray-100 dark:border-slate-800/80">
                <p className="text-[11px] text-gray-550 dark:text-gray-400 max-w-md mx-auto leading-relaxed font-semibold">
                  {currentLang === 'en'
                    ? 'To instantly finalize delivery and key handover, click the button below to send your details directly to our WhatsApp coordinator.'
                    : 'Pour finaliser instantanément la livraison et la remise des clés, cliquez ci-dessous pour transmettre vos détails à notre coordinateur WhatsApp.'}
                </p>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center space-x-2 w-full sm:w-auto bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-black px-8 py-4 rounded-xl text-xs tracking-wider uppercase shadow-md transition-all transform hover:scale-[1.01] cursor-pointer"
                >
                  <Phone className="h-4 w-4" />
                  <span>{currentLang === 'en' ? 'Finalize on WhatsApp' : 'Finaliser sur WhatsApp'}</span>
                </a>
              </div>

              {/* Print and back actions */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2 border-t border-gray-150 dark:border-slate-800">
                <button
                  onClick={() => window.print()}
                  className="bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  {currentLang === 'en' ? 'Print Voucher' : 'Imprimer le Reçu'}
                </button>
                <button
                  onClick={handleResetForm}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-slate-950 px-6 py-3 rounded-xl text-xs font-bold tracking-wider uppercase shadow-md transition-all cursor-pointer"
                >
                  {t.backToHome}
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>
    );
  }

  // Active form section
  return (
    <section id="booking-section" className="py-16 bg-gray-50 dark:bg-slate-950/30 border-t border-gray-100 dark:border-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 dark:text-yellow-400 block mb-2.5 font-mono">
            ★ {currentLang === 'en' ? 'RESERVATION SERVICE' : 'SERVICE DE RÉSERVATION'}
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-gray-900 dark:text-white tracking-tight uppercase leading-none" id="booking-section-title">
            {currentLang === 'en' ? 'Complete Your Reservation' : 'Finalisez Votre Réservation'}
          </h2>
          <p className="text-gray-555 dark:text-gray-400 mt-4 text-xs sm:text-sm font-medium leading-relaxed">
            {currentLang === 'en' 
              ? 'Calculate your precise rental costs instantly. No credit card required to submit booking requests.' 
              : 'Calculez instantanément vos frais de location réels. Aucun paiement immédiat requis pour soumettre la demande.'}
          </p>
        </div>

        {/* Form Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Input Form with Multi-step Progress indicators */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800/80 shadow-xs p-6 sm:p-8 space-y-6">
              
              {!selectedCar ? (
                // Warn to select a car first
                <div className="text-center py-12 space-y-4 animate-fade-in" id="select-car-prompt">
                  <div className="inline-flex p-4 bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-yellow-400 rounded-full">
                    <Calculator className="h-8 w-8" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    {currentLang === 'en' ? 'No Car Selected Yet' : 'Aucun véhicule sélectionné'}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    {t.selectCarToProceed}
                  </p>
                  <button
                    onClick={() => {
                      const fleetSec = document.getElementById('fleet');
                      if (fleetSec) fleetSec.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-slate-950 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-xs cursor-pointer"
                  >
                    {currentLang === 'en' ? 'Go to Fleet Grid' : 'Voir la Flotte'}
                  </button>
                </div>
              ) : (
                // Selected Car Booking Inputs form with Wizard layout
                <div className="space-y-6" id="booking-calculation-form">
                  
                  {/* Progress Stepper Bar */}
                  <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-gray-100 dark:border-slate-850" id="wizard-progress-stepper">
                    <div className="flex items-center space-x-2">
                      <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        currentStep >= 1 ? 'bg-blue-600 dark:bg-yellow-400 text-white dark:text-slate-950' : 'bg-gray-200 dark:bg-slate-850 text-gray-500'
                      }`}>
                        {currentStep > 1 ? '✓' : '1'}
                      </span>
                      <span className={`text-[10px] font-bold tracking-wider uppercase hidden sm:inline ${currentStep === 1 ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                        {currentLang === 'en' ? 'Dates & Map' : 'Dates & Carte'}
                      </span>
                    </div>

                    <div className="h-px bg-gray-200 dark:bg-slate-800 flex-1 mx-3" />

                    <div className="flex items-center space-x-2">
                      <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        currentStep >= 2 ? 'bg-blue-600 dark:bg-yellow-400 text-white dark:text-slate-950' : 'bg-gray-200 dark:bg-slate-850 text-gray-400'
                      }`}>
                        {currentStep > 2 ? '✓' : '2'}
                      </span>
                      <span className={`text-[10px] font-bold tracking-wider uppercase hidden sm:inline ${currentStep === 2 ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                        {t.options}
                      </span>
                    </div>

                    <div className="h-px bg-gray-200 dark:bg-slate-800 flex-1 mx-3" />

                    <div className="flex items-center space-x-2">
                      <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        currentStep >= 3 ? 'bg-blue-600 dark:bg-yellow-400 text-white dark:text-slate-950' : 'bg-gray-200 dark:bg-slate-850 text-gray-400'
                      }`}>
                        3
                      </span>
                      <span className={`text-[10px] font-bold tracking-wider uppercase hidden sm:inline ${currentStep === 3 ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                        {currentLang === 'en' ? 'Contact' : 'Contact'}
                      </span>
                    </div>
                  </div>

                  {/* Selected Car Confirmation Banner */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-blue-50/40 dark:bg-slate-950/40 rounded-xl border border-blue-100/50 dark:border-slate-850 gap-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={selectedCar.image} 
                        alt={selectedCar.name} 
                        className="w-16 h-12 object-cover rounded-lg border border-white dark:border-slate-800 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <span className="text-[9px] font-bold text-blue-800 dark:text-yellow-400 uppercase tracking-widest block">
                          {currentLang === 'en' ? 'VEHICLE SELECTED' : 'VÉHICULE SELECTIONNÉ'}
                        </span>
                        <h4 className="font-sans font-bold text-sm text-gray-900 dark:text-white capitalize">
                          {selectedCar.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-mono font-bold">
                          {formatPrice(getDailyRate())} / {t.day}
                        </p>
                      </div>
                    </div>


                  </div>

                  {/* STEP 1: Dates & Lieux with vector interactive map */}
                  {currentStep === 1 && (
                    <div className="space-y-4 animate-fade-in" id="step-1-container">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xs font-bold text-gray-450 dark:text-gray-400 uppercase tracking-wider">
                          {currentLang === 'en' ? 'Step 1: Rental Locations & Period' : 'Étape 1 : Dates & Lieux de livraison'}
                        </h3>
                        <span className="text-[10px] text-gray-400 font-mono font-bold">{currentLang === 'en' ? 'Haptic sound active' : 'Sons haptiques actifs'}</span>
                      </div>

                      {/* Map Visualizer for pickup location selection */}
                      <MapVisualizer
                        currentLang={currentLang}
                        selectedId={pickupLocation}
                        onChange={(id) => {
                          setPickupLocation(id);
                        }}
                        label={currentLang === 'en' ? 'Delivery / Pickup Location on Map' : 'Lieu de Livraison sur la Carte'}
                        currency={currency}
                      />

                      <div className="grid sm:grid-cols-2 gap-4">
                        {/* Dropoff Location select */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-650 dark:text-gray-400 flex items-center space-x-1">
                            <MapPin className="h-3.5 w-3.5 text-blue-500" />
                            <span>{t.dropoff}</span>
                          </label>
                          <select
                            value={dropoffLocation}
                            onChange={(e) => {
                              setDropoffLocation(e.target.value);
                            }}
                            className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-gray-850 dark:text-white focus:outline-hidden"
                            id="form-dropoff-loc"
                          >
                            {LOCATIONS.map(l => (
                              <option key={l.id} value={l.id}>
                                {currentLang === 'en' ? l.name : l.nameFr} {l.feeRwf > 0 ? `(+${formatPrice(l.feeRwf)})` : ''}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Rental duration info */}
                        <div className="bg-slate-50 dark:bg-slate-950/40 border border-gray-150 dark:border-slate-800 rounded-xl p-3 flex flex-col justify-center text-xs text-gray-500">
                          <span className="font-bold text-gray-700 dark:text-gray-400">{currentLang === 'en' ? 'Rental Period Info' : 'Période estimée'}</span>
                          <p className="mt-0.5 text-[11px] leading-relaxed">{currentLang === 'en' ? 'Pickup dates must be set in advance. Free cancellation up to 48 hours.' : 'Dates modifiables à tout moment. Annulation gratuite sous 48h.'}</p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        {/* Pickup Date */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-650 dark:text-gray-400 flex items-center space-x-1">
                            <Calendar className="h-3.5 w-3.5 text-blue-500" />
                            <span>{t.pickupDate}</span>
                          </label>
                          <input
                            type="date"
                            value={pickupDate}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => {
                              setPickupDate(e.target.value);
                            }}
                            className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-gray-800 dark:text-white focus:outline-hidden"
                            id="form-pickup-date"
                            required
                          />
                        </div>

                        {/* Dropoff Date */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-650 dark:text-gray-400 flex items-center space-x-1">
                            <Calendar className="h-3.5 w-3.5 text-gray-400" />
                            <span>{t.dropoffDate}</span>
                          </label>
                          <input
                            type="date"
                            value={dropoffDate}
                            min={pickupDate}
                            onChange={(e) => {
                              setDropoffDate(e.target.value);
                            }}
                            className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-gray-800 dark:text-white focus:outline-hidden"
                            id="form-dropoff-date"
                            required
                          />
                        </div>
                      </div>

                      {/* Next wizard trigger */}
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-full bg-blue-600 dark:bg-yellow-400 hover:bg-blue-700 dark:hover:bg-yellow-500 text-white dark:text-slate-950 font-bold py-3.5 rounded-xl text-xs tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
                      >
                        <span>{currentLang === 'en' ? 'Continue (Extras & Driver)' : 'Suivant (Chauffeur & Options)'}</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  {/* STEP 2: Chauffeur & Options */}
                  {currentStep === 2 && (
                    <div className="space-y-4 animate-fade-in" id="step-2-container">
                      <h3 className="text-xs font-bold text-gray-450 dark:text-gray-400 uppercase tracking-wider">
                        {currentLang === 'en' ? 'Step 2: Add-on Services' : 'Étape 2 : Chauffeur & Options'}
                      </h3>

                      <div className="space-y-3" id="form-addons-list">
                        {/* Driver add-on */}
                        <label className="flex items-start space-x-3 p-3.5 bg-gray-50 dark:bg-slate-950/40 hover:bg-gray-100/50 dark:hover:bg-slate-850/50 rounded-xl border border-gray-200/50 dark:border-slate-800 cursor-pointer transition-all select-none">
                          <input
                            type="checkbox"
                            checked={withDriver}
                            onChange={() => {
                              setWithDriver(!withDriver);
                            }}
                            className="h-4 w-4 rounded-sm text-blue-600 dark:text-yellow-400 border-gray-300 dark:border-slate-700 mt-0.5"
                            id="checkbox-driver"
                          />
                          <div>
                            <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{t.withDriverOpt}</p>
                            <p className="text-[10.5px] text-gray-500 dark:text-gray-400 mt-0.5">
                              {currentLang === 'en' 
                                ? 'Highly recommended for complex Akagera safari tracking or corporate tours.'
                                : 'Recommandé pour les safaris à l\'Akagera ou les délégations professionnelles.'}
                            </p>
                          </div>
                        </label>

                        {/* GPS add-on */}
                        <label className="flex items-start space-x-3 p-3.5 bg-gray-50 dark:bg-slate-950/40 hover:bg-gray-100/50 dark:hover:bg-slate-850/50 rounded-xl border border-gray-200/50 dark:border-slate-800 cursor-pointer transition-all select-none">
                          <input
                            type="checkbox"
                            checked={gps}
                            onChange={() => {
                              setGps(!gps);
                            }}
                            className="h-4 w-4 rounded-sm text-blue-600 dark:text-yellow-400 border-gray-300 dark:border-slate-700 mt-0.5"
                            id="checkbox-gps"
                          />
                          <div>
                            <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{t.gpsOpt}</p>
                            <p className="text-[10.5px] text-gray-500 dark:text-gray-400 mt-0.5">
                              {currentLang === 'en'
                                ? 'Pre-loaded offline map system of Rwanda to guide you through mountains and forests.'
                                : 'Système de cartes routières hors-ligne préchargé pour s\'orienter sans réseau mobile.'}
                            </p>
                          </div>
                        </label>

                        {/* Super Insurance add-on */}
                        <label className="flex items-start space-x-3 p-3.5 bg-gray-50 dark:bg-slate-950/40 hover:bg-gray-100/50 dark:hover:bg-slate-850/50 rounded-xl border border-gray-200/50 dark:border-slate-800 cursor-pointer transition-all select-none">
                          <input
                            type="checkbox"
                            checked={insurance}
                            onChange={() => {
                              setInsurance(!insurance);
                            }}
                            className="h-4 w-4 rounded-sm text-blue-600 dark:text-yellow-400 border-gray-300 dark:border-slate-700 mt-0.5"
                            id="checkbox-insurance"
                          />
                          <div>
                            <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{t.insuranceOpt}</p>
                            <p className="text-[10.5px] text-gray-500 dark:text-gray-400 mt-0.5">
                              {currentLang === 'en'
                                ? 'Waives all financial responsibilities in case of minor cosmetic vehicle damages.'
                                : 'Exonère de toute responsabilité financière en cas d\'égratignures mineures.'}
                            </p>
                          </div>
                        </label>
                      </div>

                      {/* Navigation buttons */}
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-gray-700 dark:text-gray-200 font-bold py-3.5 rounded-xl text-xs tracking-wider uppercase transition-colors cursor-pointer text-center"
                        >
                          {currentLang === 'en' ? 'Back' : 'Retour'}
                        </button>
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="bg-blue-600 dark:bg-yellow-400 hover:bg-blue-700 dark:hover:bg-yellow-500 text-white dark:text-slate-950 font-bold py-3.5 rounded-xl text-xs tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center space-x-1"
                        >
                          <span>{currentLang === 'en' ? 'Continue' : 'Suivant'}</span>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Coordonnées & Validation */}
                  {currentStep === 3 && (
                    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in" id="step-3-container">
                      <h3 className="text-xs font-bold text-gray-450 dark:text-gray-400 uppercase tracking-wider">
                        {currentLang === 'en' ? 'Step 3: Contact Details & Validation' : 'Étape 3 : Coordonnées & Devis'}
                      </h3>

                      {!user && (
                        <div className="p-3 bg-blue-50/50 dark:bg-slate-900 border border-blue-100/50 dark:border-slate-800 rounded-xl text-xs flex items-center justify-between text-blue-800 dark:text-yellow-400 font-medium transition-all">
                          <span className="text-[10.5px] leading-relaxed max-w-[70%] text-left">
                            {currentLang === 'en' 
                              ? 'Have an account? Log in to auto-fill your contact details.' 
                              : 'Déjà inscrit ? Connectez-vous pour remplir automatiquement vos coordonnées.'}
                          </span>
                          <button
                            type="button"
                            onClick={onOpenAuth}
                            className="bg-blue-600 dark:bg-yellow-400 hover:bg-blue-700 dark:hover:bg-yellow-500 text-white dark:text-slate-950 font-bold px-3 py-1.5 rounded-lg text-[10px] uppercase transition-colors shrink-0 cursor-pointer"
                          >
                            {currentLang === 'en' ? 'Login' : 'Connexion'}
                          </button>
                        </div>
                      )}

                      <div className="grid sm:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-650 dark:text-gray-400 flex items-center space-x-1">
                            <User className="h-3.5 w-3.5 text-gray-400" />
                            <span>{t.fullName}</span>
                          </label>
                          <input
                            type="text"
                            value={renterName}
                            onChange={(e) => setRenterName(e.target.value)}
                            placeholder="Achille Ebang"
                            className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-medium text-gray-850 dark:text-white focus:outline-hidden"
                            id="input-renter-name"
                            required
                          />
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-650 dark:text-gray-400 flex items-center space-x-1">
                            <Mail className="h-3.5 w-3.5 text-gray-400" />
                            <span>{t.emailAddress}</span>
                          </label>
                          <input
                            type="email"
                            value={renterEmail}
                            onChange={(e) => setRenterEmail(e.target.value)}
                            placeholder="name@example.com"
                            className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-medium text-gray-850 dark:text-white focus:outline-hidden"
                            id="input-renter-email"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        {/* Phone */}
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-650 dark:text-gray-400 flex items-center space-x-1">
                            <Phone className="h-3.5 w-3.5 text-gray-400" />
                            <span>{t.phoneNumber}</span>
                          </label>
                          <input
                            type="tel"
                            value={renterPhone}
                            onChange={(e) => setRenterPhone(e.target.value)}
                            placeholder="+250 780 097 079"
                            className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-medium text-gray-850 dark:text-white focus:outline-hidden"
                            id="input-renter-phone"
                            required
                          />
                        </div>

                        {/* License */}
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-650 dark:text-gray-400 flex items-center space-x-1">
                            <CreditCard className="h-3.5 w-3.5 text-gray-400" />
                            <span>{t.licenseNo}</span>
                          </label>
                          <input
                            type="text"
                            value={licenseNumber}
                            onChange={(e) => setLicenseNumber(e.target.value)}
                            placeholder="DL-90210"
                            className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-medium text-gray-850 dark:text-white focus:outline-hidden"
                            id="input-renter-license"
                            required
                          />
                        </div>
                      </div>

                      {/* Navigation and submit buttons */}
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-gray-700 dark:text-gray-200 font-bold py-3.5 rounded-xl text-xs tracking-wider uppercase transition-colors cursor-pointer text-center"
                        >
                          {currentLang === 'en' ? 'Back' : 'Retour'}
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-blue-600 dark:bg-yellow-400 hover:bg-blue-700 dark:hover:bg-yellow-500 text-white dark:text-slate-950 font-bold py-3.5 rounded-xl text-xs tracking-wider uppercase shadow-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer disabled:opacity-50"
                          id="confirm-booking-submit"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>{t.submitting}</span>
                            </>
                          ) : (
                            <>
                              <span>{t.confirmBooking}</span>
                              <CheckCircle2 className="h-4 w-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}

                </div>
              )}

            </div>
          </div>

          {/* Dynamic Invoice Summary Calculator Panel (Right Side on Desktop) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-md p-6 sm:p-8" id="calculator-panel">
              <div className="flex items-center space-x-2 mb-6 pb-4 border-b border-gray-100 dark:border-slate-850">
                <Calculator className="h-5 w-5 text-blue-600 dark:text-yellow-400 animate-pulse" />
                <h3 className="text-base font-extrabold text-gray-900 dark:text-white tracking-tight">
                  {t.bookingDetails}
                </h3>
              </div>

              {selectedCar ? (
                // Selected Car Pricing Panel
                <div className="space-y-6" id="invoice-bill">
                  
                  {/* Duration Detail */}
                  <div className="flex justify-between items-center bg-gray-50 dark:bg-slate-950 p-4 rounded-xl border border-transparent dark:border-slate-850">
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">{t.duration}</span>
                    <span className="text-xs font-bold text-blue-800 dark:text-yellow-400 bg-blue-50 dark:bg-yellow-400/10 px-3 py-1 rounded-lg">
                      {days} {days === 1 ? t.day : t.days}
                    </span>
                  </div>

                  {/* Line Items */}
                  <div className="space-y-3.5 text-xs font-medium text-gray-600 dark:text-gray-300">
                    {/* Base car calculation */}
                    <div className="flex justify-between">
                      <span className="capitalize text-gray-700 dark:text-gray-300">{selectedCar.name} ({formatPrice(getDailyRate())} × {days} {days === 1 ? t.day : t.days})</span>
                      <span className="font-mono font-bold text-gray-850 dark:text-white">{formatPrice(basePriceTotal)}</span>
                    </div>

                    {/* Driver item */}
                    {withDriver && (
                      <div className="flex justify-between">
                        <span>{currentLang === 'en' ? 'Professional Chauffeur' : 'Chauffeur Professionnel'} ({currency === 'RWF' ? '25,000 RF' : '$20'} × {days} {days === 1 ? t.day : t.days})</span>
                        <span className="font-mono font-bold text-gray-800 dark:text-yellow-400">+{formatPrice((currency === 'RWF' ? 25000 : 20) * days)}</span>
                      </div>
                    )}

                    {/* GPS item */}
                    {gps && (
                      <div className="flex justify-between">
                        <span>{currentLang === 'en' ? 'Offline GPS unit' : 'Unité de Navigation GPS'} ({currency === 'RWF' ? '5,000 RF' : '$4'} × {days} {days === 1 ? t.day : t.days})</span>
                        <span className="font-mono font-bold text-gray-800 dark:text-yellow-400">+{formatPrice((currency === 'RWF' ? 5000 : 4) * days)}</span>
                      </div>
                    )}

                    {/* Insurance item */}
                    {insurance && (
                      <div className="flex justify-between">
                        <span>{currentLang === 'en' ? 'Collision Waiver' : 'Rachat de franchise'} ({currency === 'RWF' ? '10,000 RF' : '$8'} × {days} {days === 1 ? t.day : t.days})</span>
                        <span className="font-mono font-bold text-gray-800 dark:text-yellow-400">+{formatPrice((currency === 'RWF' ? 10000 : 8) * days)}</span>
                      </div>
                    )}

                    {/* Delivery items */}
                    {deliveryTotal > 0 && (
                      <div className="flex justify-between">
                        <span>{t.deliveryFee}</span>
                        <span className="font-mono font-bold text-gray-850 dark:text-white">+{formatPrice(deliveryTotal)}</span>
                      </div>
                    )}



                    <hr className="border-gray-100 dark:border-slate-850 my-4" />

                    {/* Total */}
                    <div className="flex justify-between items-baseline text-base font-extrabold text-gray-900 dark:text-white pt-2">
                      <span>{t.totalAmount}</span>
                      <span className="text-xl text-blue-600 dark:text-yellow-400 font-mono" id="invoice-grand-total">
                        {formatPrice(grandTotal)}
                      </span>
                    </div>

                    <div className="p-3 bg-blue-50/40 dark:bg-slate-950/60 rounded-xl border border-blue-100/30 dark:border-slate-850 flex items-start space-x-2 mt-4">
                      <Shield className="h-4.5 w-4.5 text-blue-600 dark:text-yellow-400 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-blue-900 dark:text-gray-400 leading-relaxed font-normal">
                        {t.vatIncluded}
                      </p>
                    </div>

                  </div>
                </div>
              ) : (
                // Placeholder when no vehicle selected yet
                <div className="text-center py-16 space-y-3 text-gray-400 dark:text-gray-500">
                  <Calculator className="h-10 w-10 mx-auto text-gray-300 dark:text-slate-800 stroke-1" />
                  <p className="text-xs">{t.selectCarToProceed}</p>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
