import { EventDetails } from '@/src/types/invitation';

/**
 * Event details for Ahmed & Nada's engagement party
 */
export const EVENT_DETAILS: EventDetails = {
  groomName: 'Ahmed',
  groomNameArabic: 'أحمد',
  brideName: 'Nada',
  brideNameArabic: 'ندى',
  eventType: 'Engagement Party',
  eventTypeArabic: 'خطوبة',
  eventDate: new Date('2026-07-16T18:00:00'),
  venueName: 'Cove',
  venueLocation: 'Mansoura, Egypt - Overlooking the Nile',
  venueCoordinates: {
    lat: 31.0409, // Mansoura coordinates
    lng: 31.3785,
  },
  googleMapsUrl: 'https://maps.google.com/?q=31.0409,31.3785',
};

/**
 * Premium color palette
 */
export const COLORS = {
  cream: '#FDFBF7',
  gold: '#C5A059',
  goldDark: '#9B7E3F',
  rose: '#E8C5C8',
  burgundy: '#800020',
  creamDark: '#F5F1E8',
} as const;

/**
 * Animation durations (in seconds)
 */
export const ANIMATION_DURATIONS = {
  envelopeOpen: 1.2,
  cardSlideOut: 0.8,
  mazeTransition: 0.6,
  textReveal: 0.8,
  numberTicker: 0.5,
  hoverEffect: 0.3,
} as const;

/**
 * Breakpoints
 */
export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
} as const;
