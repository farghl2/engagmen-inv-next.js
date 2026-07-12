/**
 * Type definitions for the engagement invitation website
 */

export type FlowState = 'envelope' | 'maze' | 'landing';

export interface EventDetails {
  groomName: string;
  groomNameArabic: string;
  brideName: string;
  brideNameArabic: string;
  eventType: string;
  eventTypeArabic: string;
  eventDate: Date;
  venueName: string;
  venueLocation: string;
  venueCoordinates: {
    lat: number;
    lng: number;
  };
  googleMapsUrl: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface MazeCell {
  row: number;
  col: number;
  isWall: boolean;
  isStart?: boolean;
  isEnd?: boolean;
}

export interface RSVPFormData {
  name: string;
  phone: string;
  email?: string;
  attendees: number;
  message?: string;
}

export interface AudioContextState {
  isPlaying: boolean;
  isUnlocked: boolean;
}
