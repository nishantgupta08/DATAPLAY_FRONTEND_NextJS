import axios from 'axios';
import { CachedGeocodingService } from './geocodingCache';

export interface GeocodeResult {
  lat: number;
  lng: number;
  address: string;
  city: string;
  state: string;
}

/**
 * Geocoding service using OpenStreetMap Nominatim API
 * Free service that works well for Indian PIN codes
 */
export class GeocodingService {
  private static readonly NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
  private static readonly RATE_LIMIT_DELAY = 1000; // 1 second delay between requests
  private static lastRequestTime = 0;

  /**
   * Geocode a PIN code to get coordinates (with caching)
   */
  static async geocodePinCode(pinCode: string): Promise<GeocodeResult | null> {
    return CachedGeocodingService.geocode(pinCode, async () => {
      try {
        // Rate limiting
        const now = Date.now();
        const timeSinceLastRequest = now - this.lastRequestTime;
        if (timeSinceLastRequest < this.RATE_LIMIT_DELAY) {
          await new Promise(resolve => setTimeout(resolve, this.RATE_LIMIT_DELAY - timeSinceLastRequest));
        }
        this.lastRequestTime = Date.now();

        const response = await axios.get(this.NOMINATIM_URL, {
          params: {
            q: `${pinCode}, India`,
            format: 'json',
            addressdetails: 1,
            limit: 1,
            countrycodes: 'in'
          },
          headers: {
            'User-Agent': 'DataPlay-Frontend/1.0'
          }
        });

        if (response.data && response.data.length > 0) {
          const result = response.data[0];
          return {
            lat: parseFloat(result.lat),
            lng: parseFloat(result.lon),
            address: result.display_name,
            city: result.address?.city || result.address?.town || result.address?.village || 'Unknown',
            state: result.address?.state || 'Unknown'
          };
        }

        return null;
      } catch (error) {
        console.error('Geocoding error:', error);
        return null;
      }
    });
  }

  /**
   * Geocode a city name to get coordinates (with caching)
   */
  static async geocodeCity(cityName: string): Promise<GeocodeResult | null> {
    return CachedGeocodingService.geocode(cityName, async () => {
      try {
        // Rate limiting
        const now = Date.now();
        const timeSinceLastRequest = now - this.lastRequestTime;
        if (timeSinceLastRequest < this.RATE_LIMIT_DELAY) {
          await new Promise(resolve => setTimeout(resolve, this.RATE_LIMIT_DELAY - timeSinceLastRequest));
        }
        this.lastRequestTime = Date.now();

        const response = await axios.get(this.NOMINATIM_URL, {
          params: {
            q: `${cityName}, India`,
            format: 'json',
            addressdetails: 1,
            limit: 1,
            countrycodes: 'in'
          },
          headers: {
            'User-Agent': 'DataPlay-Frontend/1.0'
          }
        });

        if (response.data && response.data.length > 0) {
          const result = response.data[0];
          return {
            lat: parseFloat(result.lat),
            lng: parseFloat(result.lon),
            address: result.display_name,
            city: result.address?.city || result.address?.town || result.address?.village || cityName,
            state: result.address?.state || 'Unknown'
          };
        }

        return null;
      } catch (error) {
        console.error('Geocoding error:', error);
        return null;
      }
    });
  }

  /**
   * Batch geocode multiple locations (with caching)
   */
  static async batchGeocode(locations: string[]): Promise<Map<string, GeocodeResult>> {
    return CachedGeocodingService.batchGeocode(locations, async (location) => {
      // Try PIN code geocoding first
      if (/^\d{6}$/.test(location)) {
        return await this.geocodePinCode(location);
      } else {
        // Try city geocoding
        return await this.geocodeCity(location);
      }
    });
  }
}

/**
 * Fallback coordinates for major Indian cities
 * Used when geocoding fails
 */
export const FALLBACK_COORDINATES: Record<string, [number, number]> = {
  'Delhi': [28.7041, 77.1025],
  'Mumbai': [19.0760, 72.8777],
  'Bangalore': [12.9716, 77.5946],
  'Chennai': [13.0827, 80.2707],
  'Kolkata': [22.5726, 88.3639],
  'Hyderabad': [17.3850, 78.4867],
  'Pune': [18.5204, 73.8567],
  'Jaipur': [26.9124, 75.7873],
  'Ahmedabad': [23.0225, 72.5714],
  'Kochi': [9.9312, 76.2673],
  'Bhubaneswar': [20.2961, 85.8245],
  'Indore': [22.7196, 75.8577],
  'Bhopal': [23.2599, 77.4126],
  'Visakhapatnam': [17.6868, 83.2185],
  'Vadodara': [22.3072, 73.1812],
  'Ludhiana': [30.9010, 75.8573],
  'Nashik': [19.9975, 73.7898],
  'Faridabad': [28.4089, 77.3178],
  'Meerut': [28.9845, 77.7064],
  'Rajkot': [22.3039, 70.8022]
};
