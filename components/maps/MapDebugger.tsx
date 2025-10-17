"use client";
import React, { useState } from 'react';
import Image from 'next/image';

import { EnrolledStudent } from "@/types";

interface MapDebuggerProps {
  students: EnrolledStudent[];
  mapSrc?: string;
}

// Interactive coordinate editor
const MapDebugger = ({ students, mapSrc = "/india-map-border.svg" }: MapDebuggerProps) => {
  const [coordinates, setCoordinates] = useState({
    Jaipur: { top: 30, left: 35 }, // FIXED: Moved to Rajasthan (North-West)
    Rourkela: { top: 40, left: 70 },
    Bengaluru: { top: 72, left: 46 },
    Hyderabad: { top: 55, left: 50 },
    Bhilwara: { top: 32, left: 36 }, // Close to Jaipur in Rajasthan
    Delhi: { top: 20, left: 40 }, // Moved left to North India
    Mumbai: { top: 45, left: 25 }, // Moved left to West India
    Chennai: { top: 75, left: 65 },
    Kolkata: { top: 32, left: 72 },
    Pune: { top: 42, left: 28 }, // Moved left to West India
  });

  const [selectedCity, setSelectedCity] = useState<string>('Jaipur');
  const [isDragging, setIsDragging] = useState(false);

  // Group students by city
  const byCity: Record<string, EnrolledStudent[]> = {};
  students.forEach((s) => {
    const city = (s.city || "Unknown").trim();
    if (!byCity[city]) byCity[city] = [];
    byCity[city].push(s);
  });

  const handleMouseDown = (city: string) => {
    setSelectedCity(city);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setCoordinates(prev => ({
      ...prev,
      [selectedCity]: { top: Math.max(0, Math.min(100, y)), left: Math.max(0, Math.min(100, x)) }
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const copyCoordinates = () => {
    const coordString = Object.entries(coordinates)
      .map(([city, pos]) => `${city}: { top: ${pos.top.toFixed(0)}, left: ${pos.left.toFixed(0)} }`)
      .join(',\n    ');
    
    navigator.clipboard.writeText(coordString);
    alert('Coordinates copied to clipboard!');
  };

  return (
    <div className="bg-white p-6 rounded-lg border">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Map Pin Position Debugger</h3>
        <p className="text-sm text-gray-600 mb-4">
          Click and drag pins to adjust their positions. Copy the coordinates when you&apos;re satisfied.
        </p>
        
        <div className="flex gap-2 mb-4">
          <button
            onClick={copyCoordinates}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            Copy Coordinates
          </button>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-3 py-1 border rounded text-sm"
          >
            {Object.keys(coordinates).map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map with draggable pins */}
        <div className="relative">
          <div 
            className="relative w-full border rounded-lg overflow-hidden"
            style={{ aspectRatio: '1/1' }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <Image 
              src={mapSrc} 
              width={600} 
              height={600} 
              alt="India map for debugging" 
              className="w-full h-full object-contain" 
            />
            
            {/* Draggable pins */}
            {Object.entries(coordinates).map(([city, pos]) => (
              <div
                key={city}
                className={`absolute cursor-move select-none ${
                  selectedCity === city ? 'z-20' : 'z-10'
                }`}
                style={{ 
                  top: `${pos.top}%`, 
                  left: `${pos.left}%`, 
                  transform: "translate(-50%, -50%)" 
                }}
                onMouseDown={() => handleMouseDown(city)}
              >
                <div className={`relative ${
                  selectedCity === city ? 'scale-125' : 'scale-100'
                } transition-transform`}>
                  <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow-lg" />
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-1 py-0.5 rounded whitespace-nowrap">
                    {city}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coordinate display */}
        <div className="space-y-4">
          <h4 className="font-medium">Current Coordinates:</h4>
          <div className="bg-gray-50 p-3 rounded text-sm font-mono">
            {Object.entries(coordinates).map(([city, pos]) => (
              <div key={city} className="flex justify-between">
                <span className={selectedCity === city ? 'font-bold text-blue-600' : ''}>
                  {city}:
                </span>
                <span className={selectedCity === city ? 'font-bold text-blue-600' : ''}>
                  {pos.top.toFixed(0)}%, {pos.left.toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
          
          <div className="text-xs text-gray-500">
            <p><strong>Instructions:</strong></p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Click on a pin to select it</li>
              <li>Drag the pin to adjust position</li>
              <li>Use the dropdown to select different cities</li>
              <li>Copy coordinates when satisfied</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapDebugger;
