import { Vehicle, LocationInfo, FAQItem, DestinationGuide } from './types';

export const LOCATIONS: LocationInfo[] = [
  { id: 'kigali_airport', name: 'Kigali International Airport (KGL)', nameFr: 'Aéroport de Kigali', feeRwf: 0, feeUsd: 0 },
  { id: 'kigali_downtown', name: 'Downtown Kigali / Hotel Delivery', nameFr: 'Kigali (Hôtel, Bureau ou Domicile)', feeRwf: 0, feeUsd: 0 },
  { id: 'musanze', name: 'Musanze / Ruhengeri Delivery', nameFr: 'Musanze', feeRwf: 25000, feeUsd: 20 },
  { id: 'gisenyi', name: 'Gisenyi / Rubavu Delivery', nameFr: 'Gisenyi / Rubavu', feeRwf: 35000, feeUsd: 30 }
];

export const VEHICLES: Vehicle[] = [
  {
    id: 'volkswagen_id4',
    name: 'volkswagen',
    type: 'suv',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=600', // Electric SUV style
    pricePerDayRwf: 80000,
    pricePerDayUsd: 65,
    transmission: 'automatic',
    fuel: 'electric',
    seats: 5,
    suitcases: 3,
    features: ['100% Electric', 'Panoramic Roof', 'Touch Screen', 'Camera 360', 'Leather Interior'],
    featuresFr: ['100% Électrique', 'Toit panoramique', 'Écran tactile', 'Caméra 360', 'Intérieur Cuir'],
    recommendedFor: 'Silent, premium and ecological city driving and paved roads around Kigali.',
    recommendedForFr: 'Conduite silencieuse, premium et écologique à Kigali et sur les routes goudronnées.',
    rating: 4.9,
    reviewsCount: 142
  },
  {
    id: 'kia_sorento',
    name: 'KIA SORENTO',
    type: 'suv',
    image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=600', // Luxury Mid-size SUV
    pricePerDayRwf: 70000,
    pricePerDayUsd: 55,
    transmission: 'automatic',
    fuel: 'diesel',
    seats: 7,
    suitcases: 4,
    features: ['7 Seats', 'Smart AWD', 'Leather Seats', 'Rear Camera', 'Active Safety'],
    featuresFr: ['7 Places', 'AWD Intelligent', 'Sièges Cuir', 'Caméra de recul', 'Sécurité Active'],
    recommendedFor: 'Family trips, groups, and long comfortable journeys across Rwanda.',
    recommendedForFr: 'Voyages en famille, groupes et longs trajets confortables à travers le Rwanda.',
    rating: 4.8,
    reviewsCount: 86
  },
  {
    id: 'toyota_prius',
    name: 'Toyota prius',
    type: 'sedan',
    image: 'https://images.unsplash.com/photo-1594070319944-7c0cbebb6f58?auto=format&fit=crop&q=80&w=600', // Hybrid sedan
    pricePerDayRwf: 40000,
    pricePerDayUsd: 32,
    transmission: 'automatic',
    fuel: 'hybrid',
    seats: 5,
    suitcases: 2,
    features: ['Hybrid System', 'Ultra Fuel Efficient', 'Compact Parking', 'Keyless Entry', 'Bluetooth'],
    featuresFr: ['Moteur Hybride', 'Consommation minime', 'Parking facile', 'Démarrage sans clé', 'Bluetooth'],
    recommendedFor: 'Kigali daily commutes and highly economical budget traveling.',
    recommendedForFr: 'Déplacements quotidiens à Kigali et trajets ultra-économiques.',
    rating: 4.7,
    reviewsCount: 104
  },
  {
    id: 'toyota_rav4',
    name: 'Toyota RAV4 AWD',
    type: 'suv',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600', // SUV
    pricePerDayRwf: 45000,
    pricePerDayUsd: 36,
    transmission: 'automatic',
    fuel: 'petrol',
    seats: 5,
    suitcases: 3,
    features: ['All-Wheel Drive', 'High Ground Clearance', 'Large Trunk', 'Very Reliable', 'A/C'],
    featuresFr: ['Transmission intégrale', 'Garde au sol élevée', 'Grand coffre', 'Très fiable', 'Climatisation'],
    recommendedFor: 'Excursions to Musanze, Lake Kivu, and smooth independent travel.',
    recommendedForFr: 'Excursions à Musanze, au Lac Kivu et trajets confortables en autonomie.',
    rating: 4.9,
    reviewsCount: 158
  },
  {
    id: 'toyota_corolla',
    name: 'Toyota Corolla',
    type: 'sedan',
    image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?auto=format&fit=crop&q=80&w=600', // Sedan
    pricePerDayRwf: 30000,
    pricePerDayUsd: 24,
    transmission: 'automatic',
    fuel: 'petrol',
    seats: 5,
    suitcases: 2,
    features: ['Compact & Practical', 'Air Conditioning', 'Highly Reliable', 'Excellent fuel economy', 'USB Charger'],
    featuresFr: ['Compacte & Pratique', 'Climatisation', 'Grande Fiabilité', 'Très économique', 'Chargeur USB'],
    recommendedFor: 'Perfect, simple, and affordable city driving in Kigali.',
    recommendedForFr: 'Parfaite pour une conduite simple et abordable à Kigali.',
    rating: 4.6,
    reviewsCount: 74
  }
];

export const DESTINATIONS: DestinationGuide[] = [
  {
    id: 'akagera',
    title: 'Akagera National Park',
    titleFr: 'Parc National de l\'Akagera',
    description: 'Eastern Rwanda. Savannah landscape home to the Big Five (lions, rhinos, elephants, leopards, and buffaloes). Requires high clearance SUV/4x4 vehicles.',
    descriptionFr: 'Est du Rwanda. Paysage de savane abritant les "Big Five" (lions, rhinos, éléphants, léopards, buffles). Nécessite un véhicule surélevé.',
    distance: '135 km from Kigali (~2.5h)',
    recommendedVehicle: 'KIA SORENTO / Toyota RAV4',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'musanze',
    title: 'Volcanoes National Park',
    titleFr: 'Parc National des Volcans (Musanze)',
    description: 'Northern Rwanda. Famous home of the endangered mountain gorillas, golden monkeys, and the majestic Virunga volcanoes.',
    descriptionFr: 'Nord du Rwanda. Célèbre refuge des gorilles de montagne, singes dorés et majestueux volcans des Virunga.',
    distance: '110 km from Kigali (~2h)',
    recommendedVehicle: 'Toyota RAV4 / KIA SORENTO',
    image: 'https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'lake_kivu',
    title: 'Lake Kivu (Gisenyi / Rubavu)',
    titleFr: 'Lac Kivu (Gisenyi / Rubavu)',
    description: 'Western Rwanda. One of the African Great Lakes, perfect for dynamic lakeside holidays, kayaking, boat trips, and scenic adventures.',
    descriptionFr: 'Ouest du Rwanda. L\'un des Grands Lacs d\'Afrique, idéal pour des vacances au bord du lac, du kayak et des trajets panoramiques.',
    distance: '160 km from Kigali (~3h)',
    recommendedVehicle: 'Toyota RAV4 / Volkswagen ID.4',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=400'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'license',
    question: 'Do I need an international driving license?',
    questionFr: 'Faut-il un permis international ?',
    answer: 'A national driving license valid in Rwanda for over 2 years is sufficient. An International Driving Permit (IDP) is recommended but not mandatory.',
    answerFr: 'Un permis national valide au Rwanda depuis plus de 2 ans suffit. Le permis international est recommandé mais pas obligatoire.'
  },
  {
    id: 'price_includes',
    question: 'What is included in the price?',
    questionFr: 'Que comprend le prix ?',
    answer: 'Rentals include unlimited mileage, comprehensive insurance with franchise, 24/7 roadside assistance, and free delivery in Kigali (airport, hotel, office, or home).',
    answerFr: 'La location comprend le kilométrage illimité, l\'assurance tous risques avec franchise, l\'assistance 24h/24 et la livraison gratuite à Kigali (aéroport ou hôtel).'
  },
  {
    id: 'delivery_where',
    question: 'Where can you deliver the vehicle?',
    questionFr: 'Où pouvez-vous livrer la voiture ?',
    answer: 'We deliver for free anywhere in Kigali: airport, hotel, office, or home. We can also deliver to Musanze or Rubavu (Gisenyi) with a delivery fee.',
    answerFr: 'Nous livrons gratuitement partout à Kigali : aéroport, hôtel, bureau ou domicile. Nous pouvons aussi livrer à Musanze ou Rubavu (avec frais).'
  },
  {
    id: 'late_return',
    question: 'What happens in case of a late return?',
    questionFr: 'Que se passe-t-il en cas de retour tardif ?',
    answer: 'A grace period of 1 hour is allowed. Beyond this, a minor hourly fee or an additional rental day may be calculated.',
    answerFr: 'Une tolérance d\'une heure est accordée. Au-delà, un tarif horaire ou une journée supplémentaire pourra être appliqué.'
  },
  {
    id: 'payment_methods',
    question: 'How do I pay?',
    questionFr: 'Comment payer ?',
    answer: 'You can pay in cash (RWF, USD, EUR), via Mobile Money (MoMo), or credit card. No advance payment is required before your booking is verified and confirmed.',
    answerFr: 'Vous pouvez payer en espèces (RWF, USD, EUR), par Mobile Money (MoMo), ou par carte bancaire. Aucun paiement requis avant confirmation.'
  }
];

export const TRANSLATIONS = {
  en: {
    brandName: 'FlexiRent',
    tagline: 'Drive Rwanda at your own pace.',
    subtitle: 'A modern, carefully maintained fleet of sedans, SUVs, and 4x4s delivered directly to you in Kigali. Enjoy transparent pricing, straightforward booking, and reliable WhatsApp support.',
    searchCars: 'Check Availability',
    pickup: 'Pick-up Location',
    dropoff: 'Drop-off Location',
    pickupDate: 'Pick-up Date',
    dropoffDate: 'Drop-off Date',
    allCategories: 'All Vehicles',
    categories: {
      all: 'All',
      '4x4': '4x4 Vehicles',
      suv: 'SUVs & Crossovers',
      sedan: 'Sedans',
      luxury: 'Luxury & VIP',
      van: 'Touring Vans & Minibuses'
    },
    filterBy: 'Filter by Type',
    day: 'day',
    perDay: 'per day',
    bookNow: 'Book Now',
    bookingDetails: 'Booking Summary',
    selectedCar: 'Selected Vehicle',
    duration: 'Rental Duration',
    days: 'days',
    basePrice: 'Base Price',
    deliveryFee: 'Delivery / Remote Area Fee',
    totalAmount: 'Total Amount',
    vatIncluded: 'Includes 18% Rwanda VAT & Comprehensive Insurance',
    options: 'Additional Options',
    withDriverOpt: 'Add Professional Driver (+25,000 RWF / day)',
    gpsOpt: 'Add GPS Navigation Unit (+5,000 RWF / day)',
    insuranceOpt: 'Super Collision Damage Waiver (+10,000 RWF / day)',
    renterDetails: 'Renter Information',
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number (WhatsApp Preferred)',
    licenseNo: 'Driving License / Passport Number',
    confirmBooking: 'Confirm Reservation Request',
    submitting: 'Processing Booking...',
    bookingSuccess: 'Reservation Requested Successfully!',
    bookingSuccessDesc: 'Your request has been logged. Our booking manager will contact you on WhatsApp or Email within 15 minutes to coordinate key delivery and complete security verification.',
    referenceCode: 'Reference Code',
    guideTitle: 'Rwanda Travel Guide',
    guideSubtitle: 'Plan your epic safari adventure across the Land of a Thousand Hills.',
    faqTitle: 'Your questions, our answers.',
    faqSubtitle: 'Everything you need to know about driving and renting in Rwanda.',
    features: 'Key Features',
    recommended: 'Best For',
    reviews: 'reviews',
    close: 'Close',
    backToHome: 'Back to Home',
    testimonialsTitle: 'What our clients say.',
    testimonialsSubtitle: 'Loved by international safari travelers and Kigali local professionals.',
    currency: 'Currency',
    featuresTitle: 'Designed for Rwanda Mobility.',
    unlimitedMileage: 'Delivered, Not Picked Up',
    unlimitedMileageDesc: 'We bring the vehicle directly to your hotel, office, or Kigali Airport, as well as Musanze and Rubavu.',
    newFleet: 'Comprehensive Insurance Included',
    newFleetDesc: 'Complete coverage is included on every vehicle. No hidden clauses, no surprise deductibles.',
    customerService: '24/7 Roadside Assistance',
    customerServiceDesc: 'Drive with total peace of mind. Our local support team and mechanics are on standby 24/7 to assist you anywhere in Rwanda.',
    noHiddenFees: 'Real Humans on WhatsApp',
    noHiddenFeesDesc: 'Delivery to your door, dynamic vehicle walk-through, and immediate key handover. 7 days a week, 9am to 10pm.',
    selectCarToProceed: 'Please select a car to proceed with booking calculations.'
  },
  fr: {
    brandName: 'FlexiRent',
    tagline: 'Conduisez le Rwanda à votre rythme.',
    subtitle: 'Une flotte moderne et soigneusement entretenue de berlines, SUV et 4x4 livrée directement chez vous ou à l\'aéroport de Kigali. Profitez de tarifs clairs, de réservations simples et d\'une assistance humaine continue par WhatsApp.',
    searchCars: 'Vérifier disponibilité',
    pickup: 'Prise en charge',
    dropoff: 'Restitution',
    pickupDate: 'Date de départ',
    dropoffDate: 'Date de retour',
    allCategories: 'Tout véhicule',
    categories: {
      all: 'Tout',
      '4x4': 'Véhicules 4x4',
      suv: 'SUVs & Crossovers',
      sedan: 'Berlines',
      luxury: 'Luxe & Prestige',
      van: 'Vans & Minibus'
    },
    filterBy: 'Type de véhicule',
    day: 'jour',
    perDay: 'par jour',
    bookNow: 'Détails',
    bookingDetails: 'Résumé de la Réservation',
    selectedCar: 'Véhicule Sélectionné',
    duration: 'Durée de la Location',
    days: 'jours',
    basePrice: 'Tarif de Base',
    deliveryFee: 'Frais de Livraison / Distance',
    totalAmount: 'Montant Total',
    vatIncluded: 'Comprend la TVA de 18% et l\'assurance tous risques complète',
    options: 'Options Supplémentaires',
    withDriverOpt: 'Ajouter un Chauffeur Professionnel (+25 000 RWF / jour)',
    gpsOpt: 'Ajouter un GPS de Navigation (+5 000 RWF / jour)',
    insuranceOpt: 'Assurance Super Collision S.D.W (+10 000 RWF / jour)',
    renterDetails: 'Informations du Locataire',
    fullName: 'Nom Complet',
    emailAddress: 'Adresse Email',
    phoneNumber: 'Numéro de Téléphone (WhatsApp conseillé)',
    licenseNo: 'Numéro de Permis / Passeport',
    confirmBooking: 'Confirmer la Demande',
    submitting: 'Traitement de la demande...',
    bookingSuccess: 'Demande de Réservation Envoyée !',
    bookingSuccessDesc: 'Votre demande a été enregistrée avec succès. Notre responsable des réservations vous contactera sur WhatsApp ou par e-mail sous 15 minutes pour valider la livraison et finaliser le contrat.',
    referenceCode: 'Code de Référence',
    guideTitle: 'Guide de Voyage au Rwanda',
    guideSubtitle: 'Planifiez votre safari d\'exception à travers le pays des mille collines.',
    faqTitle: 'Vos questions, nos réponses.',
    faqSubtitle: 'Tout ce qu\'il faut savoir sur la conduite et la location de voitures au Rwanda.',
    features: 'Équipements Clés',
    recommended: 'Idéal Pour',
    reviews: 'avis',
    close: 'Fermer',
    backToHome: 'Retour à l\'Accueil',
    testimonialsTitle: 'Ce que disent nos clients.',
    testimonialsSubtitle: 'Apprécié par les touristes internationaux de safari et les professionnels locaux à Kigali.',
    currency: 'Devise',
    featuresTitle: 'Conçu pour la mobilité du Rwanda.',
    unlimitedMileage: 'Livrée, pas à retirer',
    unlimitedMileageDesc: 'Nous apportons la voiture à votre hôtel, bureau ou à l\'aéroport. À Kigali, Musanze et Rubavu.',
    newFleet: 'Assurance, sans astérisque',
    newFleetDesc: 'Couverture complète incluse sur chaque voiture. Pas d\'options cachées, pas de franchise surprise.',
    customerService: 'Assistance Routière 24h/7',
    customerServiceDesc: 'Roulez l\'esprit tranquille. Notre équipe locale et nos mécaniciens sont disponibles 24h/24 et 7j/7 pour vous aider partout au Rwanda.',
    noHiddenFees: 'Vraies personnes sur WhatsApp',
    noHiddenFeesDesc: 'Livraison à votre porte, présentation du véhicule, remise des clés. 7j/7, 9h-22h.',
    selectCarToProceed: 'Veuillez sélectionner un véhicule pour commencer les calculs de tarif.'
  }
};

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Aisha M.',
    role: 'Visiteur au Rwanda',
    roleFr: 'Visiteur au Rwanda',
    text: '"RAV4 récupérée à l\'aéroport, rendue à Musanze. La remise la plus fluide que j\'aie eue sur le continent."',
    textFr: '"RAV4 récupérée à l\'aéroport, rendue à Musanze. La remise la plus fluide que j\'aie eue sur le continent."',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 't2',
    name: 'James G.',
    role: 'Location longue durée (6 mois)',
    roleFr: 'Location longue durée (6 mois)',
    text: '"Je loue chez FlexiRent depuis six mois. Même Corolla, aucun souci, tarif mensuel correct. Ils l\'échangent même contre un SUV le week-end."',
    textFr: '"Je loue chez FlexiRent depuis six mois. Même Corolla, aucun souci, tarif mensuel correct. Ils l\'échangent même contre un SUV le week-end."',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 't3',
    name: 'Diane K.',
    role: 'Résidente de Kigali',
    roleFr: 'Résidente de Kigali',
    text: '"Réservée à 8h, clé en main à 9h20. Toute l\'équipe te suit sur WhatsApp. Louer à Kigali devient simple."',
    textFr: '"Réservée à 8h, clé en main à 9h20. Toute l\'équipe te suit sur WhatsApp. Louer à Kigali devient simple."',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150'
  }
];
