// PIN Code to Coordinates conversion utilities

export interface PinCodeLocation {
  pinCode: string;
  city: string;
  state: string;
  coordinates: [number, number]; // [lat, lng]
}

// Free Indian postal code API service
export const getPinCodeLocation = async (pinCode: string): Promise<PinCodeLocation | null> => {
  try {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pinCode}`);
    const data = await response.json();
    
    if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice) {
      const postOffice = data[0].PostOffice[0];
      const city = postOffice.Name;
      const state = postOffice.State;
      
      // Get coordinates for the city
      const coordinates = await geocodeCity(city, state);
      
      if (coordinates) {
        return {
          pinCode,
          city,
          state,
          coordinates
        };
      }
    }
  } catch (error) {
    console.warn(`Failed to get location for PIN code ${pinCode}:`, error);
  }
  
  return null;
};

// Geocode city using OpenStreetMap (free)
const geocodeCity = async (city: string, state: string): Promise<[number, number] | null> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city + ', ' + state + ', India')}&limit=1`
    );
    const data = await response.json();
    
    if (data && data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
  } catch (error) {
    console.warn(`Failed to geocode city ${city}:`, error);
  }
  
  return null;
};

// Batch process multiple PIN codes
export const processPinCodes = async (pinCodes: string[]): Promise<PinCodeLocation[]> => {
  const locations: PinCodeLocation[] = [];
  
  // Process in batches to avoid rate limiting
  const batchSize = 5;
  for (let i = 0; i < pinCodes.length; i += batchSize) {
    const batch = pinCodes.slice(i, i + batchSize);
    const batchPromises = batch.map(pinCode => getPinCodeLocation(pinCode));
    const batchResults = await Promise.all(batchPromises);
    
    batchResults.forEach(result => {
      if (result) locations.push(result);
    });
    
    // Add delay between batches to respect rate limits
    if (i + batchSize < pinCodes.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  return locations;
};

// Validate Indian PIN code format
export const isValidPinCode = (pinCode: string): boolean => {
  return /^\d{6}$/.test(pinCode);
};

// Get PIN code from address string (basic extraction)
export const extractPinCode = (address: string): string | null => {
  const match = address.match(/\b\d{6}\b/);
  return match ? match[0] : null;
};
