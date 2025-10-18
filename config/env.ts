// Environment configuration
export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.dataplay.co.in',
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  ANALYTICS_ID: process.env.ANALYTICS_ID,
} as const;

export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';
