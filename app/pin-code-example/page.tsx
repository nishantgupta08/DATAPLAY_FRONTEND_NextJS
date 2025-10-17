"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import learnersData from '../../data/learners.json';
import { EnrolledStudent } from "@/types";

// Dynamically import map components to prevent SSR issues
const LeafletPinCodeMap = dynamic(() => import('@/components/maps/LeafletPinCodeMap'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
});

const PinCodeMap = dynamic(() => import('@/components/maps/PinCodeMap'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
});

// Use data from JSON file
const STUDENTS_WITH_PIN_CODES: EnrolledStudent[] = learnersData as EnrolledStudent[];

export default function PinCodeExamplePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-7xl px-4">
        <h1 className="text-3xl font-bold mb-8">PIN Code to Map Position Demo</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Free Solution - React Leaflet */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Free Solution (React Leaflet)</h2>
            <p className="text-sm text-gray-600 mb-4">
              Uses free OpenStreetMap geocoding. No API key required.
            </p>
            <LeafletPinCodeMap 
              students={STUDENTS_WITH_PIN_CODES} 
              height="400px"
              className="w-full"
            />
          </div>
          
          {/* Google Maps Solution */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Google Maps Solution</h2>
            <p className="text-sm text-gray-600 mb-4">
              Most accurate for Indian PIN codes. Requires Google Maps API key.
            </p>
            <PinCodeMap 
              students={STUDENTS_WITH_PIN_CODES} 
              height="400px"
              className="w-full"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-4">How to Use PIN Codes:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">1. Update Your Student Data:</h4>
              <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
{`const students = [
  { 
    id: "1", 
    institute: "Jagannath University", 
    program: "BTech", 
    city: "Jaipur", 
    pinCode: "302001" // Add PIN code
  },
  // ... more students
];`}
              </pre>
            </div>
            
            <div>
              <h4 className="font-medium text-blue-800 mb-2">2. Use the Component:</h4>
              <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
{`import LeafletPinCodeMap from '@/components/maps/LeafletPinCodeMap';

<LeafletPinCodeMap 
  students={students} 
  height="500px"
/>`}
              </pre>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-900 mb-2">Benefits of PIN Code Mapping:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-green-800">
            <li>✅ <strong>Automatic positioning</strong> - No manual coordinates needed</li>
            <li>✅ <strong>Accurate locations</strong> - PIN codes are very precise</li>
            <li>✅ <strong>Works for all Indian cities</strong> - Not just major ones</li>
            <li>✅ <strong>Free solution available</strong> - No API costs</li>
            <li>✅ <strong>Easy to implement</strong> - Just add PIN codes to your data</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
