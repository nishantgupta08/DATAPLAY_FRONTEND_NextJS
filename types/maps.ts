// Map related types
export type EnrolledStudent = { 
  id: string; 
  institute: string; 
  program: string; 
  city?: string;
  pinCode?: string;
  postalCode?: string;
  coordinates?: [number, number]; // [lat, lng]
};

export interface GeocodeResult {
  lat: number;
  lng: number;
  address: string;
  city: string;
  state: string;
}

export interface PinCodeLocation {
  pinCode: string;
  city: string;
  state: string;
  coordinates: [number, number]; // [lat, lng]
}
