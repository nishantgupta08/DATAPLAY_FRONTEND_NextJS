"use client";

import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import learnersData from "@/data/learners.json";

// Dynamically import the entire map component to avoid SSR issues
const MapboxMap = dynamic(() => import('./MapboxMapComponent'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  )
});

interface IndiaMapboxMapProps {
  featuredCities?: string[];
  showPinCodes?: boolean;
  className?: string;
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

export default function IndiaMapboxMap({
  featuredCities = ["Jaipur", "Bengaluru", "Hyderabad"],
  showPinCodes = true,
  className = ""
}: IndiaMapboxMapProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);

  // Calculate student statistics for each city
  const cityStats = useMemo(() => {
    const stats: Record<string, { count: number; pincodes: Set<string>; students: typeof learnersData }> = {};

    learnersData.forEach(student => {
      if (featuredCities.includes(student.city)) {
        if (!stats[student.city]) {
          stats[student.city] = {
            count: 0,
            pincodes: new Set(),
            students: []
          };
        }
        stats[student.city].count++;
        stats[student.city].pincodes.add(student.pinCode);
        stats[student.city].students.push(student);
      }
    });

    return stats;
  }, [featuredCities]);

  // Calculate total statistics
  const totalStats = useMemo(() => {
    const totalStudents = Object.values(cityStats).reduce((sum, stats) => sum + stats.count, 0);
    const totalCities = Object.keys(cityStats).length;
    const allPincodes = new Set();
    Object.values(cityStats).forEach(stats => {
      stats.pincodes.forEach(pincode => allPincodes.add(pincode));
    });

    return {
      totalStudents,
      totalCities,
      totalPincodes: allPincodes.size
    };
  }, [cityStats]);

  const handlePinClick = (city: string) => {
    setSelectedCity(city);
    setShowStudentModal(true);
  };

  // Get students for selected city
  const selectedCityStudents = useMemo(() => {
    if (!selectedCity) return [];
    return cityStats[selectedCity]?.students || [];
  }, [selectedCity, cityStats]);

  return (
    <div className={`relative ${className}`}>
      {/* Mapbox Map */}
      <div 
        className="bg-white rounded-2xl shadow-xl overflow-hidden" 
        style={{ 
          height: '700px', 
          width: '100%',
          filter: 'contrast(1.2) brightness(1.1)'
        }}
      >
        <MapboxMap
          featuredCities={featuredCities}
          showPinCodes={showPinCodes}
          cityStats={cityStats}
          totalStats={totalStats}
          onPinClick={handlePinClick}
          selectedCity={selectedCity}
          showStudentModal={showStudentModal}
          setShowStudentModal={setShowStudentModal}
          selectedCityStudents={selectedCityStudents}
        />
      </div>
    </div>
  );
}
