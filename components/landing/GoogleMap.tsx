"use client";
import React, { useEffect, useState, memo } from 'react';

import { EnrolledStudent } from "@/types";

interface GoogleMapProps {
  students: EnrolledStudent[];
  height?: string;
  className?: string;
  apiKey?: string;
}

// Geocoding function using Google Maps API
const geocodeWithGoogle = async (address: string, apiKey: string): Promise<[number, number] | null> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
    );
    const data = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return [location.lat, location.lng];
    }
  } catch (error) {
    console.warn(`Failed to geocode ${address}:`, error);
  }
  
  return null;
};

// Fallback coordinates for major Indian cities
const cityCoordinates: Record<string, [number, number]> = {
  'Jaipur': [26.9124, 75.7873],
  'Rourkela': [22.2604, 84.8536],
  'Bengaluru': [12.9716, 77.5946],
  'Hyderabad': [17.3850, 78.4867],
  'Bhilwara': [25.3463, 74.6364],
  'Delhi': [28.7041, 77.1025],
  'Mumbai': [19.0760, 72.8777],
  'Chennai': [13.0827, 80.2707],
  'Kolkata': [22.5726, 88.3639],
  'Pune': [18.5204, 73.8567],
};

const GoogleMap = memo(function GoogleMap({ 
  students, 
  height = "400px", 
  className = "",
  apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
}: GoogleMapProps) {
  const [studentLocations, setStudentLocations] = useState<Array<EnrolledStudent & { coordinates: [number, number] }>>([]);
  const [loading, setLoading] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const processStudents = async () => {
      setLoading(true);
      const locations: Array<EnrolledStudent & { coordinates: [number, number] }> = [];
      
      // Group students by city
      const byCity: Record<string, EnrolledStudent[]> = {};
      students.forEach((s) => {
        const city = (s.city || "Unknown").trim();
        if (!byCity[city]) byCity[city] = [];
        byCity[city].push(s);
      });

      // Get coordinates for each city
      for (const [city, cityStudents] of Object.entries(byCity)) {
        let coordinates: [number, number] | null = null;
        
        // First try predefined coordinates
        if (cityCoordinates[city]) {
          coordinates = cityCoordinates[city];
        } else if (apiKey) {
          // Use Google Maps geocoding for better accuracy
          coordinates = await geocodeWithGoogle(`${city}, India`, apiKey);
        }
        
        if (coordinates) {
          // Add all students from this city with the same coordinates
          cityStudents.forEach(student => {
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
          <p className="text-gray-600">Loading map...</p>
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

  if (!apiKey) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`} style={{ height }}>
        <div className="text-center text-gray-500">
          <p className="text-lg font-medium">Google Maps API Key Required</p>
          <p className="text-sm">Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-lg overflow-hidden border border-gray-200 ${className}`} style={{ height }}>
      <div 
        id="google-map" 
        style={{ height: '100%', width: '100%' }}
        data-locations={JSON.stringify(studentLocations)}
      />
    </div>
  );
});

export default GoogleMap;
