"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import { EnrolledStudent } from "@/types";
import CacheManager from '@/components/maps/CacheManager';
import learnersData from '../assets/learners.json';

// Dynamically import the map component to prevent SSR issues
const AutoGeocodeMap = dynamic(() => import('@/components/maps/AutoGeocodeMap'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
});

// Use data from JSON file
const TEST_STUDENTS: EnrolledStudent[] = learnersData as EnrolledStudent[];

export default function GeocodingDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Automatic PIN Code Geocoding Demo</h1>
          <p className="text-lg text-gray-600 mb-4">
            This map automatically geocodes PIN codes to their exact locations using OpenStreetMap&apos;s Nominatim service.
            No predefined coordinates needed!
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Features:</h3>
            <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
              <li>Automatic PIN code to coordinates conversion</li>
              <li>Real-time geocoding using OpenStreetMap</li>
              <li>Fallback coordinates for major cities</li>
              <li>Interactive map with detailed popups</li>
              <li>Rate limiting to respect API limits</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Student Locations Across India</h2>
          <AutoGeocodeMap students={TEST_STUDENTS} height="600px" />
        </div>
        
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Test Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEST_STUDENTS.map((student) => (
              <div key={student.id} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900">{student.institute}</h4>
                <p className="text-sm text-gray-600">{student.program}</p>
                <p className="text-sm text-gray-500">{student.city}</p>
                <p className="text-xs text-blue-600 font-mono">{student.pinCode}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Cache Manager */}
      <CacheManager />
    </div>
  );
}
