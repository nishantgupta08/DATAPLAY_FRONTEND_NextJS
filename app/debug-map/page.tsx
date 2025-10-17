"use client";
import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import map components to prevent SSR issues
const MapDebugger = dynamic(() => import('@/components/maps/MapDebugger'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
});

const IndiaLearnersMap = dynamic(() => import('@/components/maps/IndiaLearnersMap'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
});

// Test data with students from different cities
const TEST_STUDENTS = [
  { id: "1", institute: "Jagannath University", program: "BTech", city: "Jaipur" },
  { id: "2", institute: "NIT Rourkela", program: "MSc", city: "Rourkela" },
  { id: "3", institute: "IIIT Bangalore", program: "PG Diploma", city: "Bengaluru" },
  { id: "4", institute: "IIT Hyderabad", program: "MTech", city: "Hyderabad" },
  { id: "5", institute: "Bhilwara College", program: "B.E", city: "Bhilwara" },
];

export default function DebugMapPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-7xl px-4">
        <h1 className="text-3xl font-bold mb-8">Map Pin Position Debugger</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Debugger */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Interactive Position Editor</h2>
            <MapDebugger students={TEST_STUDENTS} />
          </div>
          
          {/* Current Map */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Current Map Implementation</h2>
            <IndiaLearnersMap students={TEST_STUDENTS} />
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">How to use:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
            <li>Use the interactive editor on the left to drag pins to correct positions</li>
            <li>Click &quot;Copy Coordinates&quot; when you&apos;re satisfied with the positions</li>
            <li>Paste the coordinates into the IndiaLearnersMap component</li>
            <li>Check the map on the right to see the updated positions</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
