export interface Vehicle {
  id: string;
  name: string;
  type: '4x4' | 'suv' | 'sedan' | 'luxury' | 'van';
  image: string;
  pricePerDayRwf: number;
  pricePerDayUsd: number;
  transmission: 'automatic' | 'manual' | 'automatique' | 'manuelle';
  fuel: 'petrol' | 'diesel' | 'essence' | 'gazole' | 'electric' | 'hybrid';
  seats: number;
  suitcases: number;
  features: string[];
  featuresFr: string[];
  recommendedFor: string;
  recommendedForFr: string;
  rating: number;
  reviewsCount: number;
}

export interface BookingDetails {
  carId: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
  withDriver: boolean;
  gps: boolean;
  insurance: boolean;
  renterName: string;
  renterEmail: string;
  renterPhone: string;
  licenseNumber: string;
}

export interface LocationInfo {
  id: string;
  name: string;
  nameFr: string;
  feeRwf: number;
  feeUsd: number;
}

export interface FAQItem {
  id: string;
  question: string;
  questionFr: string;
  answer: string;
  answerFr: string;
}

export interface DestinationGuide {
  id: string;
  title: string;
  titleFr: string;
  description: string;
  descriptionFr: string;
  distance: string;
  recommendedVehicle: string;
  image: string;
}

export type Language = 'en' | 'fr';
