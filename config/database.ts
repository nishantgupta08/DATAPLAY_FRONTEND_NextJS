// Database configuration
export const DATABASE_CONFIG = {
  url: process.env.DATABASE_URL,
  maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '10'),
  connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT || '30000'),
} as const;
