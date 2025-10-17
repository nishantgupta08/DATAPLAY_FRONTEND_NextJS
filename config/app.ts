// Application configuration
export const APP_CONFIG = {
  name: 'Dataplay',
  description: 'Data Science Learning Platform',
  version: '1.0.0',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://dataplay.co.in',
  environment: process.env.NODE_ENV || 'development',
} as const;

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.dataplay.co.in',
  timeout: 10000,
  retryAttempts: 3,
} as const;

export const FEATURE_FLAGS = {
  enableMaps: process.env.NEXT_PUBLIC_ENABLE_MAPS === 'true',
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  enableDebugMode: process.env.NODE_ENV === 'development',
} as const;
