// Application constants and configuration

export const APP_CONFIG = {
  name: 'Dataplay',
  description: 'Data Science Learning Platform',
  url: 'https://dataplay.co.in',
  version: '1.0.0',
} as const;

export const API_ENDPOINTS = {
  mentor: '/api/mentor',
} as const;

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/company/dataplay',
  twitter: 'https://twitter.com/dataplay',
  youtube: 'https://youtube.com/@dataplay',
  discord: 'https://discord.gg/dataplay',
} as const;

export const MAP_CONFIG = {
  defaultCenter: [20.5937, 78.9629] as [number, number], // India center
  defaultZoom: 5,
  fallbackCoordinates: [20.5937, 78.9629] as [number, number],
} as const;

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const ANIMATION_DURATION = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
} as const;
