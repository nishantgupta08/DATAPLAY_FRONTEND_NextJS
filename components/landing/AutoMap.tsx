"use client";
import React, { useEffect, useState, memo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

import { EnrolledStudent } from "@/types";

interface AutoMapProps {
  students: EnrolledStudent[];
  height?: string;
  className?: string;
}

// Geocoding service to convert city names to coordinates
const geocodeCity = async (city: string): Promise<[number, number] | null> => {
  // Using a free geocoding service (you can replace with Google Maps API for better accuracy)
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city + ', India')}&limit=1`
    );
    const data = await response.json();
    
    if (data && data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
  } catch (error) {
    console.warn(`Failed to geocode ${city}:`, error);
  }
  
  return null;
};

// Predefined coordinates for major Indian cities - adjusted for better positioning
const cityCoordinates: Record<string, [number, number]> = {
  'Jaipur': [26.9124, 75.7873], // Rajasthan - North India
  'Rourkela': [22.2604, 84.8536], // Odisha - East India
  'Bengaluru': [12.9716, 77.5946], // Karnataka - South India
  'Hyderabad': [17.3850, 78.4867], // Telangana - South-Central India
  'Bhilwara': [25.3463, 74.6364], // Rajasthan - near Jaipur
  'Delhi': [28.7041, 77.1025], // National Capital
  'Mumbai': [19.0760, 72.8777], // Maharashtra - West India
  'Chennai': [13.0827, 80.2707], // Tamil Nadu - South India
  'Kolkata': [22.5726, 88.3639], // West Bengal - East India
  'Pune': [18.5204, 73.8567], // Maharashtra - West India
};

const AutoMap = memo(function AutoMap({ 
  students, 
  height = "400px", 
  className = "" 
}: AutoMapProps) {
  const [studentLocations, setStudentLocations] = useState<Array<EnrolledStudent & { coordinates: [number, number] }>>([]);
  const [loading, setLoading] = useState(true);

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
        } else {
          // Fallback to geocoding
          coordinates = await geocodeCity(city);
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
  }, [students]);

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

  // India bounds and center
  const indiaCenter: [number, number] = [20.5937, 78.9629]; // Center of India
  const indiaBounds: [[number, number], [number, number]] = [
    [6.4627, 68.1097], // Southwest corner (Kanyakumari, Kerala)
    [35.5087, 97.3954]  // Northeast corner (Ladakh, Arunachal Pradesh)
  ];

  return (
    <div className={`rounded-lg overflow-hidden border border-gray-200 ${className}`} style={{ height }}>
      <MapContainer
        center={indiaCenter}
        zoom={5}
        maxBounds={indiaBounds}
        maxBoundsViscosity={1.0}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        boxZoom={false}
        keyboard={false}
        dragging={false}
        style={{ height: '100%', width: '100%' }}
      >
            {/* Use CartoDB Positron - clean, minimal map without city labels */}
            <TileLayer
              attribution='&copy; OpenStreetMap contributors &copy; CARTO'
              url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
            />
        
        {studentLocations.map((student) => (
          <Marker key={student.id} position={student.coordinates}>
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-gray-900">{student.city}</h3>
                <p className="text-sm text-gray-600">{student.institute}</p>
                <p className="text-xs text-gray-500">{student.program}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* City Statistics Markers */}
        {Array.from(new Set(studentLocations.map(s => s.city))).map(city => {
          const cityStudents = studentLocations.filter(s => s.city === city);
          const cityCoordinates = cityStudents[0]?.coordinates;
          const colleges = Array.from(new Set(cityStudents.map(s => s.institute)));
          
          if (!cityCoordinates) return null;
          
          // Add deterministic offset based on city name to prevent overlapping markers
          const cityHash = (city || 'Unknown').split('').reduce((a, b) => a + b.charCodeAt(0), 0);
          const offsetLat = (cityHash % 10 - 5) * 0.002; // Offset between -0.01 and 0.01
          const offsetLng = ((cityHash * 7) % 10 - 5) * 0.002;
          const offsetCoordinates: [number, number] = [
            cityCoordinates[0] + offsetLat,
            cityCoordinates[1] + offsetLng
          ];
          
          return (
            <Marker key={`city-${city}`} position={offsetCoordinates}>
              {/* Desktop: Hover tooltip */}
              <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false} className="hidden md:block">
                <div className="p-3 min-w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{city}</h3>
                  <div className="mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {cityStudents.length} learner{cityStudents.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Colleges ({colleges.length}):</h4>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {colleges.map((college, idx) => (
                        <div key={idx} className="text-xs text-gray-600 bg-gray-50 p-1 rounded">
                          {college}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Tooltip>
              
              {/* Mobile: Click popup */}
              <Popup className="md:hidden">
                <div className="p-3 min-w-[200px] bg-white">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{city}</h3>
                  <div className="mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {cityStudents.length} learner{cityStudents.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Colleges ({colleges.length}):</h4>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {colleges.map((college, idx) => (
                        <div key={idx} className="text-xs text-gray-600 bg-gray-50 p-1 rounded">
                          {college}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
});

export default AutoMap;
