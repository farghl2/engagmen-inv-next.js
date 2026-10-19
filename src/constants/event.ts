import { EventDetails } from '@/src/types/invitation';

/**
 * Event details for Mohamed & Aya's wedding party
 */
export const EVENT_DETAILS: EventDetails = {
  groomName: 'Mohamed',
  groomNameArabic: 'محمد',
  brideName: 'Aya',
  brideNameArabic: 'آيه',
  eventType: 'Wedding Celebration',
  eventTypeArabic: 'زفاف',
  eventDate: new Date('2026-10-24T21:00:00'),
  venueName: 'The Royal Hall',
  venueLocation: 'Girga, Sohag, Egypt',
  venueCoordinates: {
    lat: 26.3481769,
    lng: 31.8891811,
  },
  googleMapsUrl: 'https://maps.app.goo.gl/jsmBkfSrqB3dGZHS9',
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
