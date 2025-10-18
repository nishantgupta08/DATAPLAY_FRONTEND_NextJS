"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg"><div className="animate-spin rounded-full h-8 w-8 border-b-4 border-blue-600"></div></div>
});
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const Tooltip = dynamic(() => import('react-leaflet').then(mod => mod.Tooltip), { ssr: false });

const InteractiveIndiaMap = () => {
  const [mounted, setMounted] = useState(false);
  // NOTE: Typing `mapInstance` as `any` or a more specific Leaflet type (if available) is safer than `unknown` here
  const [mapInstance, setMapInstance] = useState<any>(null); // Changed type to any for simplicity here
  const [leafletLib, setLeafletLib] = useState<unknown>(null);

  interface Student {
    coordinates?: [number, number];
    institute?: string;
    name?: string;
    program?: string;
    city?: string;
    pinCode?: string;
  }
  const [clusters, setClusters] = useState<Array<{
    lat: number;
    lng: number;
    count: number;
    students: Student[];
  }>>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Dynamically load Leaflet only on client to avoid SSR issues
    (async () => {
      try {
        const mod = await import('leaflet');
        const L = mod.default ?? mod;
        setLeafletLib(L);

        // Fix for default markers in Next.js (Crucial for marker visibility!)
        delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        console.log('🗺️ Leaflet loaded successfully');
      } catch (error) {
        console.error('❌ Failed to load Leaflet:', error);
      }
    })();

    // Detect mobile: coarse pointer or narrow viewport
    const detect = () => {
      const coarse = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
      const narrow = typeof window !== 'undefined' && window.innerWidth < 768;
      setIsMobile(Boolean(coarse || narrow));
    };
    detect();
    window.addEventListener('resize', detect);

    // Trigger size invalidation after first paint
    setTimeout(() => {
      if (mapInstance && typeof mapInstance === 'object' && mapInstance !== null && 'invalidateSize' in mapInstance && typeof mapInstance.invalidateSize === 'function') {
        mapInstance.invalidateSize();
      }
    }, 200);
    return () => window.removeEventListener('resize', detect);
  }, [mapInstance]);

  // Once map is ready, compute bounds from learners API
  useEffect(() => {
    const computeBounds = async () => {
      if (!mapInstance) return;
      try {
        const res = await fetch('/api/learners');
        console.log('🗺️ Map Debug - API Response status:', res.status, res.ok);
        if (res.ok) {
          const data = await res.json();
          const students: Student[] = Array.isArray(data?.students) ? data.students : [];
          console.log('🗺️ Map Debug - Students parsed:', students.length, 'students');

          const coords: [number, number][] = students
            .map(s => s.coordinates)
            .filter((c: unknown): c is [number, number] => Array.isArray(c) && c.length === 2 && typeof c[0] === 'number' && typeof c[1] === 'number');

          // Build simple grid-based clusters
          const gridSize = 0.3; // degrees grid
          const gridKey = (lat: number, lng: number) => `${Math.round(lat / gridSize)}_${Math.round(lng / gridSize)}`;
          const grid: Record<string, { latSum: number; lngSum: number; count: number; students: Student[] }> = {};

          students.forEach((s: Student) => {
            if (!s.coordinates) {
              return;
            }
            const [lat, lng] = s.coordinates as [number, number];
            if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
              return;
            }
            const key = gridKey(lat, lng);
            if (!grid[key]) grid[key] = { latSum: 0, lngSum: 0, count: 0, students: [] };
            grid[key].latSum += lat;
            grid[key].lngSum += lng;
            grid[key].count += 1;
            grid[key].students.push(s);
          });

          const newClusters = Object.values(grid).map(g => ({
            lat: g.latSum / g.count,
            lng: g.lngSum / g.count,
            count: g.count,
            students: g.students
          }));

          console.log('🗺️ Map Debug - Clusters generated:', {
            totalStudents: students.length,
            validCoordinates: coords.length,
            clustersGenerated: newClusters.length,
          });
          setClusters(newClusters);

          // Always focus on India bounds
          const INDIA_BOUNDS: [[number, number], [number, number]] = [[6.0, 68.0], [37.0, 97.0]];
          mapInstance.fitBounds(INDIA_BOUNDS, { padding: [24, 24] });
          mapInstance.invalidateSize();

          //Aggressive zoom locking. This was likely causing the visibility issue.
          // mapInstance.setMinZoom(z);
          // mapInstance.setMaxZoom(z);

          // ✅ Keep: Disable all zoom interactions
          mapInstance.scrollWheelZoom.disable();
          mapInstance.doubleClickZoom.disable();
          mapInstance.touchZoom.disable();
          mapInstance.boxZoom.disable();
          mapInstance.keyboard.disable();

        }
      } catch (error) {
        console.error('🗺️ Map Debug - API Error:', error);
      }
    };
    computeBounds();
  }, [mapInstance]);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        boxZoom={false}
        keyboard={false}
        dragging={false}
        zoomControl={false}
        attributionControl={true}
        // REMOVED: maxZoom={5} and minZoom={5} from MapContainer. 
        // We let fitBounds calculate the best view, and rely on the TileLayer to enforce the 5 boundary.
        whenReady={(map) => {
          // You can also use map.target directly if mapInstance is typed correctly, 
          // but sticking to your original logic for setting mapInstance:
          setMapInstance(map.target);
          setTimeout(() => {
            if (map.target && 'invalidateSize' in map.target && typeof map.target.invalidateSize === 'function') {
              map.target.invalidateSize();
            }
          }, 50);
        }}
        className="h-full w-full"
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={5}
          minZoom={5}
          errorTileUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI/hxaBcwAAAABJRU5ErkJggg=="
          detectRetina={true}
        />

        {/* Debug info */}
        <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(255,255,255,0.9)', padding: '8px', borderRadius: '4px', fontSize: '12px', zIndex: 1000 }}>
          <div>Clusters: {clusters.length}</div>
          <div>Map Instance: {mapInstance ? 'Ready' : 'Not Ready'}</div>
          <div>Mounted: {mounted ? 'Yes' : 'No'}</div>
          {clusters.length > 0 && (
            <div>First cluster: [{clusters[0]?.lat?.toFixed(4)}, {clusters[0]?.lng?.toFixed(4)}] ({clusters[0]?.count} students)</div>
          )}
          <div>Total markers to render: {clusters.length}</div>
          {clusters.length === 0 && <div style={{ color: 'red' }}>⚠️ No markers found!</div>}
        </div>

        {/* Render clustered markers */}
        {clusters.map((c, idx) => {
          const isCluster = c.count > 1;
          const first = c.students[0] || {};

          // console.log(`🗺️ Rendering marker ${idx}:`, { lat: c.lat, lng: c.lng, count: c.count });

          // Using default Leaflet markers (icon fix applied in useEffect)
          return (
            <Marker key={idx} position={[c.lat, c.lng]}>
              <Tooltip permanent={isMobile} direction="top" offset={[0, -20]} opacity={1} sticky={!isMobile}>
                {isCluster ? (
                  isMobile ? (
                    // Mobile: minimal label with one sample institute
                    <div>
                      <div style={{ fontWeight: 600 }}>{c.count} students nearby</div>
                      {first?.institute && <div style={{ color: '#374151' }}>{first.institute}</div>}
                    </div>
                  ) : (
                    // Desktop: list nearby college names only (no heading)
                    <div style={{ minWidth: 240, maxWidth: 320 }}>
                      <div style={{ marginBottom: 0 }} />
                      <ul style={{ maxHeight: 200, overflowY: 'auto', paddingLeft: 16, margin: 0 }}>
                        {c.students.slice(0, 10).map((s: Student, i: number) => (
                          <li key={i} style={{ marginBottom: 4 }}>
                            {s.institute || 'Institute'}
                          </li>
                        ))}
                      </ul>
                      {c.students.length > 10 && (
                        <div style={{ color: '#6b7280', marginTop: 4 }}>+{c.students.length - 10} more…</div>
                      )}
                    </div>
                  )
                ) : (
                  // Single marker: show only the college name
                  <div style={{ minWidth: 200 }}>
                    {first?.institute && <div style={{ fontWeight: 700 }}>{first.institute}</div>}
                  </div>
                )}
              </Tooltip>
              {!isCluster && (
                <Popup>
                  <div style={{ minWidth: 200 }}>
                    <div style={{ fontWeight: 700 }}>{first.institute || 'Institute'}</div>
                  </div>
                </Popup>
              )}
              {isCluster && (
                <Popup>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: 6 }}>Colleges nearby</div>
                    <ul style={{ maxHeight: 180, overflowY: 'auto', paddingLeft: 16 }}>
                      {c.students.slice(0, 12).map((s: Student, i: number) => (
                        <li key={i} style={{ marginBottom: 4 }}>
                          {s.institute || 'Institute'}
                        </li>
                      ))}
                    </ul>
                    {c.students.length > 12 && <div style={{ color: '#6b7280', marginTop: 4 }}>+{c.students.length - 12} more…</div>}
                  </div>
                </Popup>
              )}
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default InteractiveIndiaMap;