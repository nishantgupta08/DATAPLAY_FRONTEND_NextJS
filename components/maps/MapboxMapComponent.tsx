"use client";

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

interface MapboxMapComponentProps {
  featuredCities: string[];
  showPinCodes: boolean;
  cityStats: any;
  totalStats: any;
  onPinClick: (city: string) => void;
  selectedCity: string | null;
  showStudentModal: boolean;
  setShowStudentModal: (show: boolean) => void;
  selectedCityStudents: any[];
}

// Real latitude and longitude coordinates for major Indian cities
const CITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  "Jaipur": { lat: 26.9124, lng: 75.7873 },
  "Bengaluru": { lat: 12.9716, lng: 77.5946 },
  "Hyderabad": { lat: 17.3850, lng: 78.4867 },
  "Delhi": { lat: 28.7041, lng: 77.1025 },
  "Mumbai": { lat: 19.0760, lng: 72.8777 },
  "Chennai": { lat: 13.0827, lng: 80.2707 },
  "Kolkata": { lat: 22.5726, lng: 88.3639 },
  "Pune": { lat: 18.5204, lng: 73.8567 },
  "Ahmedabad": { lat: 23.0225, lng: 72.5714 },
  "Kochi": { lat: 9.9312, lng: 76.2673 }
};

export default function MapboxMapComponent({
  featuredCities,
  showPinCodes,
  cityStats,
  totalStats,
  onPinClick,
  selectedCity,
  showStudentModal,
  setShowStudentModal,
  selectedCityStudents
}: MapboxMapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Set Mapbox access token
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

    // Initialize map with a basic style
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'osm': {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '&copy; OpenStreetMap contributors'
          }
        },
        layers: [
          {
            id: 'osm',
            type: 'raster',
            source: 'osm'
          }
        ]
      },
      center: [78.9629, 20.5937], // Center of India
      zoom: 5,
      minZoom: 4,
      maxZoom: 7
    });

    // Add markers when map loads
    map.current.on('load', () => {
      if (!map.current) return;

      // Clear existing markers
      markers.current.forEach(marker => marker.remove());
      markers.current = [];

      // Add markers for each city
      featuredCities.forEach(city => {
        const cityInfo = CITY_COORDINATES[city];
        const stats = cityStats[city];

        if (!cityInfo || !stats || !map.current) return;

        // Create marker element
        const markerEl = document.createElement('div');
        markerEl.className = 'w-8 h-8 bg-red-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:scale-110 transition-transform';
        markerEl.style.fontSize = `${Math.max(10, 15 + stats.count * 0.5)}px`;
        markerEl.textContent = stats.count.toString();

        // Add click handler
        markerEl.addEventListener('click', () => onPinClick(city));

        // Create marker
        const marker = new mapboxgl.Marker(markerEl)
          .setLngLat([cityInfo.lng, cityInfo.lat])
          .addTo(map.current);

        markers.current.push(marker);
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [featuredCities, cityStats, onPinClick]);

  return (
    <>
      <div ref={mapContainer} className="w-full h-full rounded-2xl" />

      {/* Fade overlay to darken all boundaries except India */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% 50%, transparent 0%, transparent 30%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.7) 100%)
          `
        }}
      />

      {/* Enhanced India boundary overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-15"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% 50%, 
              transparent 0%, 
              transparent 25%, 
              rgba(0,0,0,0.1) 30%, 
              rgba(0,0,0,0.2) 35%, 
              transparent 40%, 
              transparent 100%
            )
          `
        }}
      />

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg z-20">
        <h4 className="font-semibold text-sm text-gray-800 mb-2">Legend</h4>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <div className="h-3 w-3 rounded-full bg-red-600" />
          <span>Featured Cities</span>
        </div>
        {showPinCodes && (
          <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
            <div className="h-3 w-3 rounded bg-blue-100 border border-blue-800" />
            <span>Pin Codes</span>
          </div>
        )}
      </div>

      {/* Stats Summary */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg z-20">
        <h4 className="font-semibold text-sm text-gray-800 mb-2">Statistics</h4>
        <div className="space-y-1 text-xs text-gray-600">
          <div className="flex justify-between gap-4">
            <span>Total Students:</span>
            <span className="font-medium">{totalStats.totalStudents}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>Cities:</span>
            <span className="font-medium">{totalStats.totalCities}</span>
          </div>
          {showPinCodes && (
            <div className="flex justify-between gap-4">
              <span>Pin Codes:</span>
              <span className="font-medium">{totalStats.totalPincodes}</span>
            </div>
          )}
        </div>
      </div>

      {/* Student Details Modal */}
      {showStudentModal && selectedCity && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  Students in {selectedCity}
                </h3>
                <button
                  onClick={() => setShowStudentModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-4 max-h-[60vh] overflow-y-auto">
              <div className="grid gap-3">
                {selectedCityStudents.map((student, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{student.name}</h4>
                        <p className="text-sm text-gray-600">Pin Code: {student.pinCode}</p>
                        <p className="text-sm text-gray-600">City: {student.city}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
