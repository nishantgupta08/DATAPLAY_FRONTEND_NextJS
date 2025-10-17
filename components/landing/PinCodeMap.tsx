"use client";
import React, { useEffect, useState, memo } from 'react';

import { EnrolledStudent } from "@/types";

interface PinCodeMapProps {
  students: EnrolledStudent[];
  height?: string;
  className?: string;
  apiKey?: string;
}

// Google Maps Geocoding API for PIN codes
const geocodePinCode = async (pinCode: string, apiKey: string): Promise<[number, number] | null> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(pinCode + ', India')}&key=${apiKey}`
    );
    const data = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return [location.lat, location.lng];
    }
  } catch (error) {
    console.warn(`Failed to geocode PIN code ${pinCode}:`, error);
  }
  
  return null;
};

// Free alternative using OpenStreetMap Nominatim
const geocodePinCodeFree = async (pinCode: string): Promise<[number, number] | null> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(pinCode + ', India')}&limit=1`
    );
    const data = await response.json();
    
    if (data && data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
  } catch (error) {
    console.warn(`Failed to geocode PIN code ${pinCode}:`, error);
  }
  
  return null;
};

// Fallback coordinates for major Indian cities (if geocoding fails)
const cityCoordinates: Record<string, [number, number]> = {
  'Jaipur': [26.9124, 75.7873],
  'Rourkela': [22.2604, 84.8536],
  'Bengaluru': [12.9716, 77.5946],
  'Hyderabad': [17.3850, 78.4867],
  'Delhi': [28.7041, 77.1025],
  'Mumbai': [19.0760, 72.8777],
  'Chennai': [13.0827, 80.2707],
  'Kolkata': [22.5726, 88.3639],
  'Pune': [18.5204, 73.8567],
};

const PinCodeMap = memo(function PinCodeMap({ 
  students, 
  height = "500px", 
  className = "",
  apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
}: PinCodeMapProps) {
  const [studentLocations, setStudentLocations] = useState<Array<EnrolledStudent & { coordinates: [number, number] }>>([]);
  const [loading, setLoading] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const processStudents = async () => {
      setLoading(true);
      const locations: Array<EnrolledStudent & { coordinates: [number, number] }> = [];
      
      // Group students by location (PIN code or city)
      const byLocation: Record<string, EnrolledStudent[]> = {};
      students.forEach((s) => {
        const location = s.pinCode || s.city || "Unknown";
        if (!byLocation[location]) byLocation[location] = [];
        byLocation[location].push(s);
      });

      // Get coordinates for each location
      for (const [location, locationStudents] of Object.entries(byLocation)) {
        let coordinates: [number, number] | null = null;
        
        // Try PIN code geocoding first
        if (location.match(/^\d{6}$/)) { // Indian PIN code format
          if (apiKey) {
            coordinates = await geocodePinCode(location, apiKey);
          } else {
            coordinates = await geocodePinCodeFree(location);
          }
        } else {
          // Try city geocoding
          if (cityCoordinates[location]) {
            coordinates = cityCoordinates[location];
          } else if (apiKey) {
            coordinates = await geocodePinCode(location, apiKey);
          } else {
            coordinates = await geocodePinCodeFree(location);
          }
        }
        
        if (coordinates) {
          // Add all students from this location with the same coordinates
          locationStudents.forEach(student => {
            locations.push({
              ...student,
              coordinates
            });
          });
        }
      }
      
      setStudentLocations(locations);
      setLoading(false);
    };

    processStudents();
  }, [students, apiKey]);

  useEffect(() => {
    // Load Google Maps API
    if (apiKey && !mapLoaded) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setMapLoaded(true);
      document.head.appendChild(script);
    }
  }, [apiKey, mapLoaded]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`} style={{ height }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading map with PIN codes...</p>
        </div>
      </div>
    );
  }

  if (studentLocations.length === 0) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`} style={{ height }}>
        <div className="text-center text-gray-500">
          <p className="text-lg font-medium">No learners yet</p>
          <p className="text-sm">Be the first to join!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-lg overflow-hidden border border-gray-200 ${className}`} style={{ height }}>
      <div 
        id="pin-code-map" 
        style={{ height: '100%', width: '100%' }}
        data-locations={JSON.stringify(studentLocations)}
        data-api-key={apiKey}
      />
    </div>
  );
});

export default PinCodeMap;
