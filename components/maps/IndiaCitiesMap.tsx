"use client";

import React, { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import learnersData from "@/data/learners.json";
import "leaflet/dist/leaflet.css";

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

interface IndiaCitiesMapProps {
  featuredCities?: string[];
  showPinCodes?: boolean;
  className?: string;
}

// Real latitude and longitude coordinates for major Indian cities
const CITY_COORDINATES: Record<string, { pincode: string; lat: number; lng: number; students: number }> = {
  "Delhi": {
    pincode: "110001",
    lat: 28.6139,
    lng: 77.2090,
    students: 0 // Will be calculated from data
  },
  "Jaipur": {
    pincode: "302001",
    lat: 26.9124,
    lng: 75.7873,
    students: 0 // Will be calculated from data
  },
  "Bengaluru": {
    pincode: "560001",
    lat: 12.9716,
    lng: 77.5946,
    students: 0 // Will be calculated from data
  },
  "Mumbai": {
    pincode: "400001",
    lat: 19.0760,
    lng: 72.8777,
    students: 0 // Will be calculated from data
  },
  "Hyderabad": {
    pincode: "500001",
    lat: 17.3850,
    lng: 78.4867,
    students: 0 // Will be calculated from data
  },
  "Pune": {
    pincode: "411001",
    lat: 18.5204,
    lng: 73.8567,
    students: 0 // Will be calculated from data
  },
  "Ahmedabad": {
    pincode: "380001",
    lat: 23.0225,
    lng: 72.5714,
    students: 0 // Will be calculated from data
  },
  "Kolkata": {
    pincode: "700001",
    lat: 22.5726,
    lng: 88.3639,
    students: 0 // Will be calculated from data
  },
  "Chennai": {
    pincode: "600001",
    lat: 13.0827,
    lng: 80.2707,
    students: 0 // Will be calculated from data
  },
  "Surat": {
    pincode: "395001",
    lat: 21.1702,
    lng: 72.8311,
    students: 0 // Will be calculated from data
  }
};

export default function IndiaCitiesMap({
  featuredCities = ["Jaipur", "Bengaluru", "Hyderabad"],
  showPinCodes = true,
  className = ""
}: IndiaCitiesMapProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Fix for default markers in Leaflet - only on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('leaflet').then((L) => {
        // Fix for default markers in Leaflet
        delete (L.default.Icon.Default.prototype as any)._getIconUrl;
        L.default.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        });
      });
    }
  }, []);

  // Set map loaded after a delay to ensure dynamic imports are ready
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Calculate student statistics for each city
  const cityStats = useMemo(() => {
    const stats: Record<string, { count: number; pincodes: Set<string>; students: typeof learnersData }> = {};

    learnersData.forEach(student => {
      if (featuredCities.includes(student.city)) {
        if (!stats[student.city]) {
          stats[student.city] = { count: 0, pincodes: new Set(), students: [] };
        }
        stats[student.city].count++;
        stats[student.city].pincodes.add(student.pinCode);
        stats[student.city].students.push(student);
      }
    });

    return stats;
  }, [featuredCities]);

  // Get students for selected city
  const selectedCityStudents = useMemo(() => {
    if (!selectedCity) return [];
    return cityStats[selectedCity]?.students || [];
  }, [selectedCity, cityStats]);

  // Handle pin click
  const handlePinClick = (city: string) => {
    setSelectedCity(city);
    setShowStudentModal(true);
  };


  return (
    <div className={`relative ${className}`}>
      {/* Leaflet Map */}
      <div 
        className="bg-white rounded-2xl shadow-xl overflow-hidden" 
        style={{ 
          height: '700px', 
          width: '100%',
          filter: 'contrast(1.2) brightness(1.1)'
        }}
      >
        {!isMapLoaded ? (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-600">Loading India map...</p>
              <p className="text-xs text-gray-500 mt-2">Please wait while the map loads</p>
            </div>
          </div>
        ) : (
          <MapContainer
          center={[20.5937, 78.9629]} // Center of India
          zoom={5}
          minZoom={4}
          maxZoom={7}
          maxBounds={[
            [6.0, 68.0], // Southwest corner of India
            [37.0, 97.0]  // Northeast corner of India
          ]}
          maxBoundsViscosity={1.0} // Strict bounds - prevents panning outside India
          style={{ height: '100%', width: '100%' }}
          className="rounded-2xl"
          zoomControl={true}
        >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      maxZoom={20}
                    />

            {/* City Markers */}
            {featuredCities.length > 0 ? (
              featuredCities.map(city => {
                const cityInfo = CITY_COORDINATES[city];
                const stats = cityStats[city];

                if (!cityInfo || !stats) return null;

                return (
                  <Marker
                    key={city}
                    position={[cityInfo.lat, cityInfo.lng]}
                    eventHandlers={{
                      click: () => handlePinClick(city)
                    }}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-semibold text-lg mb-2">{city}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {stats.count} students enrolled
                        </p>
                        {showPinCodes && (
                          <div className="mb-2">
                            <p className="text-xs font-medium text-gray-700 mb-1">Pin Codes:</p>
                            <div className="flex flex-wrap gap-1">
                              {Array.from(stats.pincodes).map(pincode => (
                                <span key={pincode} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                  {pincode}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        <button
                          onClick={() => handlePinClick(city)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                );
              })
            ) : (
              // Show a default marker in the center of India when no cities are selected
              <Marker position={[20.5937, 78.9629]}>
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold text-lg mb-2">India</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Select cities to view student locations
                    </p>
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>
        )}

        {/* Fade overlay to darken areas outside India */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `
              radial-gradient(ellipse 75% 55% at 50% 50%, 
                transparent 0%, 
                transparent 35%, 
                rgba(0,0,0,0.15) 50%, 
                rgba(0,0,0,0.3) 65%, 
                rgba(0,0,0,0.6) 85%, 
                rgba(0,0,0,0.8) 100%
              )
            `
          }}
        />

        {/* Enhanced India boundary highlight */}
        <div 
          className="absolute inset-0 pointer-events-none z-15"
          style={{
            background: `
              radial-gradient(ellipse 75% 55% at 50% 50%, 
                transparent 0%, 
                transparent 30%, 
                rgba(0,0,0,0.05) 35%, 
                rgba(0,0,0,0.1) 40%, 
                transparent 45%, 
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
              <span className="font-medium">
                {Object.values(cityStats).reduce((sum, stat) => sum + stat.count, 0)}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Cities:</span>
              <span className="font-medium">{featuredCities.length}</span>
            </div>
            {showPinCodes && (
              <div className="flex justify-between gap-4">
                <span>Pin Codes:</span>
                <span className="font-medium">
                  {Object.values(cityStats).reduce((sum, stat) => sum + stat.pincodes.size, 0)}
                </span>
              </div>
            )}
            {featuredCities.length === 0 && (
              <div className="text-xs text-gray-500 mt-2 italic">
                No cities selected - showing India map
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Student Details Modal */}
      {showStudentModal && selectedCity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Students in {selectedCity}
                </h2>
                <button
                  onClick={() => setShowStudentModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid gap-4">
                {selectedCityStudents.map((student) => (
                  <div key={student.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {student.institute}
                        </h3>
                        <p className="text-gray-600">{student.program}</p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {student.city} - {student.pinCode}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Student ID: {student.id}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
