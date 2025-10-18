/* eslint-disable @typescript-eslint/no-explicit-any */
// Map Debugger Component
// Helps debug why pin points are not appearing on the map

'use client';

import { useState, useEffect } from 'react';

interface Student {
  id: string;
  name: string;
  institute: string;
  program: string;
  city: string;
  pinCode: string;
  coordinates: [number, number];
}

interface DebugInfo {
  apiResponse: any;
  students: Student[];
  validCoordinates: [number, number][];
  clusters: Array<{
    lat: number;
    lng: number;
    count: number;
    students: Student[];
  }>;
  errors: string[];
}

export default function MapDebugger() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({
    apiResponse: null,
    students: [],
    validCoordinates: [],
    clusters: [],
    errors: []
  });
  const [loading, setLoading] = useState(false);

  const fetchAndDebug = async () => {
    setLoading(true);
    const errors: string[] = [];
    let apiResponse: any = null;
    let students: Student[] = [];
    let validCoordinates: [number, number][] = [];
    let clusters: Array<{
      lat: number;
      lng: number;
      count: number;
      students: Student[];
    }> = [];

    try {
      // Test API call
      console.log('🔍 Testing API call to /api/learners...');
      console.log('🔍 Current URL:', window.location.href);
      console.log('🔍 Fetch URL:', '/api/learners');

      const response = await fetch('/api/learners');
      console.log('🔍 API Response status:', response.status, response.ok);
      console.log('🔍 API Response headers:', Object.fromEntries(response.headers.entries()));

      // Test if response is readable
      if (!response.body) {
        console.error('🔍 Response body is null!');
        errors.push('Response body is null');
      }

      apiResponse = {
        status: response.status,
        ok: response.ok,
        statusText: response.statusText
      };

      if (!response.ok) {
        errors.push(`API call failed: ${response.status} ${response.statusText}`);
        throw new Error(`API call failed: ${response.status}`);
      }

      const data = await response.json();
      apiResponse.data = data;
      console.log('✅ API Response:', data);
      console.log('✅ API Response type:', typeof data);
      console.log('✅ API Response keys:', Object.keys(data));

      // Validate students data
      students = Array.isArray(data?.students) ? data.students : [];
      if (students.length === 0) {
        errors.push('No students found in API response');
      }

      // Extract and validate coordinates
      console.log('🔍 Validating coordinates for', students.length, 'students');
      students.forEach((s, i) => {
        console.log(`🔍 Student ${i}:`, {
          id: s.id,
          coordinates: s.coordinates,
          type: typeof s.coordinates,
          isArray: Array.isArray(s.coordinates),
          length: s.coordinates?.length
        });
      });

      validCoordinates = students
        .map(s => s.coordinates)
        .filter((c: unknown): c is [number, number] =>
          Array.isArray(c) &&
          c.length === 2 &&
          typeof c[0] === 'number' &&
          typeof c[1] === 'number' &&
          Number.isFinite(c[0]) &&
          Number.isFinite(c[1])
        );

      if (validCoordinates.length === 0) {
        errors.push('No valid coordinates found in student data');
      }

      // Build clusters (same logic as map component)
      const gridSize = 0.3;
      const gridKey = (lat: number, lng: number) => `${Math.round(lat / gridSize)}_${Math.round(lng / gridSize)}`;
      const grid: Record<string, { latSum: number; lngSum: number; count: number; students: Student[] }> = {};

      students.forEach((s: Student) => {
        if (!s.coordinates) {
          errors.push(`Student ${s.id} has no coordinates`);
          return;
        }
        const [lat, lng] = s.coordinates as [number, number];
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
          errors.push(`Student ${s.id} has invalid coordinates: [${lat}, ${lng}]`);
          return;
        }
        const key = gridKey(lat, lng);
        if (!grid[key]) grid[key] = { latSum: 0, lngSum: 0, count: 0, students: [] };
        grid[key].latSum += lat;
        grid[key].lngSum += lng;
        grid[key].count += 1;
        grid[key].students.push(s);
      });

      clusters = Object.values(grid).map(g => ({
        lat: g.latSum / g.count,
        lng: g.lngSum / g.count,
        count: g.count,
        students: g.students
      }));

      if (clusters.length === 0) {
        errors.push('No clusters generated from student data');
      }

      console.log('✅ Debug Results:', {
        studentsCount: students.length,
        validCoordinatesCount: validCoordinates.length,
        clustersCount: clusters.length,
        errors: errors.length
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      errors.push(`Error during debug: ${errorMessage}`);
      console.error('❌ Debug Error:', error);
    }

    setDebugInfo({
      apiResponse,
      students,
      validCoordinates,
      clusters,
      errors
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchAndDebug();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Map Debugger</h2>
        <button
          onClick={fetchAndDebug}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Debugging...' : 'Refresh Debug'}
        </button>
      </div>

      {/* API Response */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">API Response</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm overflow-auto max-h-40">
            {JSON.stringify(debugInfo.apiResponse, null, 2)}
          </pre>
        </div>
      </div>

      {/* Students Data */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Students Data ({debugInfo.students.length} students)</h3>
        <div className="bg-gray-100 p-4 rounded-lg max-h-60 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {debugInfo.students.map((student, index) => (
              <div key={student.id} className="bg-white p-3 rounded border">
                <div className="font-medium">Student {student.id}</div>
                <div className="text-sm text-gray-600">
                  <div>Institute: {student.institute}</div>
                  <div>City: {student.city}</div>
                  <div>Pin Code: {student.pinCode}</div>
                  <div>Coordinates: [{student.coordinates[0]}, {student.coordinates[1]}]</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Valid Coordinates */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Valid Coordinates ({debugInfo.validCoordinates.length} coordinates)</h3>
        <div className="bg-gray-100 p-4 rounded-lg max-h-40 overflow-auto">
          <pre className="text-sm">
            {JSON.stringify(debugInfo.validCoordinates, null, 2)}
          </pre>
        </div>
      </div>

      {/* Clusters */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Clusters ({debugInfo.clusters.length} clusters)</h3>
        <div className="bg-gray-100 p-4 rounded-lg max-h-40 overflow-auto">
          <pre className="text-sm">
            {JSON.stringify(debugInfo.clusters, null, 2)}
          </pre>
        </div>
      </div>

      {/* Errors */}
      {debugInfo.errors.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-red-600">Errors ({debugInfo.errors.length} errors)</h3>
          <div className="bg-red-50 p-4 rounded-lg">
            <ul className="list-disc list-inside text-red-700">
              {debugInfo.errors.map((error, index) => (
                <li key={index} className="mb-1">{error}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{debugInfo.students.length}</div>
            <div className="text-sm text-gray-600">Total Students</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{debugInfo.validCoordinates.length}</div>
            <div className="text-sm text-gray-600">Valid Coordinates</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{debugInfo.clusters.length}</div>
            <div className="text-sm text-gray-600">Clusters</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">{debugInfo.errors.length}</div>
            <div className="text-sm text-gray-600">Errors</div>
          </div>
        </div>
      </div>
    </div>
  );
}
