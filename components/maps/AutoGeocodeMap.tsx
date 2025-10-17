"use client";
import React, { useEffect, useState, memo } from 'react';
import { MapContainer, Marker, Popup, Tooltip, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { EnrolledStudent } from "@/types";
import { GeocodingService, GeocodeResult, FALLBACK_COORDINATES } from '@/lib/geocoding';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface AutoGeocodeMapProps {
  students: EnrolledStudent[];
  height?: string;
  className?: string;
}

interface StudentLocation extends EnrolledStudent {
  coordinates: [number, number];
  geocodeResult?: GeocodeResult;
}

const AutoGeocodeMap = memo(function AutoGeocodeMap({ 
  students, 
  height = "500px", 
  className = "" 
}: AutoGeocodeMapProps) {
  const [studentLocations, setStudentLocations] = useState<StudentLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  useEffect(() => {
    const processStudents = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const locations: StudentLocation[] = [];
        
        // Group students by location (PIN code or city)
        const byLocation: Record<string, EnrolledStudent[]> = {};
        students.forEach((s) => {
          const location = s.pinCode || s.city || "Unknown";
          if (!byLocation[location]) byLocation[location] = [];
          byLocation[location].push(s);
        });

        // Geocode each unique location
        const uniqueLocations = Object.keys(byLocation);
        setProgress({ current: 0, total: uniqueLocations.length });
        
        const geocodeResults = await GeocodingService.batchGeocode(uniqueLocations);

        // Process results
        for (const [location, locationStudents] of Object.entries(byLocation)) {
          let coordinates: [number, number] | null = null;
          let geocodeResult: GeocodeResult | undefined;

          // Try geocoded result first
          const geocoded = geocodeResults.get(location);
          if (geocoded) {
            coordinates = [geocoded.lat, geocoded.lng];
            geocodeResult = geocoded;
          } else {
            // Try fallback coordinates for known cities
            const fallbackKey = Object.keys(FALLBACK_COORDINATES).find(
              key => key.toLowerCase() === location.toLowerCase()
            );
            if (fallbackKey) {
              coordinates = FALLBACK_COORDINATES[fallbackKey];
            }
          }

          if (coordinates) {
            // Add all students from this location with the same coordinates
            locationStudents.forEach(student => {
              locations.push({
                ...student,
                coordinates,
                geocodeResult
              });
            });
          } else {
            console.warn(`Could not geocode location: ${location}`);
          }
        }

        setStudentLocations(locations);
      } catch (err) {
        console.error('Error processing students:', err);
        setError('Failed to load map data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (students.length > 0) {
      processStudents();
    } else {
      setLoading(false);
    }
  }, [students]);

  if (loading) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}
        style={{ height }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Loading map data...</p>
          {progress.total > 0 && (
            <div className="mt-2">
              <div className="w-48 bg-gray-200 rounded-full h-2 mx-auto">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(progress.current / progress.total) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {progress.current} of {progress.total} locations processed
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className={`flex items-center justify-center bg-red-50 rounded-lg ${className}`}
        style={{ height }}
      >
        <div className="text-center text-red-600">
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (studentLocations.length === 0) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}
        style={{ height }}
      >
        <div className="text-center text-gray-600">
          <p className="text-sm">No student locations to display</p>
        </div>
      </div>
    );
  }

  // India-only map bounds and center
  const indiaCenter: [number, number] = [22.5937, 78.9629]; // Center of India
  const indiaBounds: [[number, number], [number, number]] = [
    [6.0, 68.0], // Southwest corner
    [37.0, 98.0]  // Northeast corner
  ];

  return (
    <div className={className} style={{ height }}>
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
        className="rounded-lg"
      >
            {/* India boundary - accurate coordinates */}
            <GeoJSON
              data={{
                type: "FeatureCollection",
                features: [{
                  type: "Feature",
                  properties: { name: "India" },
                  geometry: {
                    type: "Polygon",
                    coordinates: [[
                      [68.17665, 7.96553],
                      [68.8426, 8.89279],
                      [69.858, 9.53106],
                      [70.823, 10.867],
                      [71.7777, 11.667],
                      [72.826, 12.741],
                      [73.978, 13.595],
                      [74.443, 14.617],
                      [75.396, 15.473],
                      [76.362, 16.36],
                      [77.274, 17.019],
                      [78.015, 17.881],
                      [78.885, 18.676],
                      [79.736, 19.51],
                      [80.568, 20.268],
                      [81.232, 21.014],
                      [82.033, 21.725],
                      [83.189, 22.305],
                      [84.326, 22.804],
                      [85.18, 23.207],
                      [86.558, 24.06],
                      [87.635, 24.572],
                      [88.084, 24.501],
                      [88.699, 24.866],
                      [88.931, 25.238],
                      [89.355, 25.965],
                      [89.831, 26.449],
                      [90.373, 26.875],
                      [91.217, 26.808],
                      [92.033, 26.838],
                      [92.684, 26.451],
                      [93.419, 26.633],
                      [94.174, 26.086],
                      [94.867, 26.548],
                      [95.155, 26.001],
                      [95.125, 25.168],
                      [95.298, 24.785],
                      [96.006, 24.539],
                      [96.478, 24.02],
                      [97.327, 23.956],
                      [97.402, 23.16],
                      [98.672, 24.063],
                      [97.869, 23.69],
                      [97.05, 22.95],
                      [96.416, 21.558],
                      [95.369, 21.143],
                      [94.377, 20.447],
                      [93.913, 19.81],
                      [93.078, 19.045],
                      [92.584, 18.281],
                      [91.468, 17.878],
                      [90.587, 17.626],
                      [89.702, 17.396],
                      [88.529, 17.202],
                      [87.361, 17.016],
                      [86.499, 16.589],
                      [85.060, 15.957],
                      [83.941, 15.791],
                      [82.192, 15.115],
                      [80.324, 13.991],
                      [78.885, 12.740],
                      [77.941, 11.641],
                      [76.593, 10.299],
                      [75.746, 9.152],
                      [74.864, 8.301],
                      [73.712, 7.798],
                      [72.705, 8.368],
                      [71.061, 8.933],
                      [70.262, 8.565],
                      [69.164, 8.048],
                      [68.17665, 7.96553]
                    ]]
                  }
                }]
              } as GeoJSON.FeatureCollection}
              style={{
                fillColor: 'transparent',
                fillOpacity: 0,
                color: '#2563eb',
                weight: 2,
                opacity: 1
              }}
            />
        
        {studentLocations.map((student, index) => (
          <Marker key={`${student.id}-${index}`} position={student.coordinates}>
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-gray-900">{student.institute}</h3>
                <p className="text-sm text-gray-600">{student.program}</p>
                {student.geocodeResult && (
                  <div className="mt-2 text-xs text-gray-500">
                    <p><strong>Location:</strong> {student.geocodeResult.city}, {student.geocodeResult.state}</p>
                    {student.pinCode && <p><strong>PIN Code:</strong> {student.pinCode}</p>}
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* City Statistics Markers */}
        {Array.from(new Set(studentLocations.map(s => s.geocodeResult?.city || s.city))).map(city => {
          const cityStudents = studentLocations.filter(s => (s.geocodeResult?.city || s.city) === city);
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

export default AutoGeocodeMap;
