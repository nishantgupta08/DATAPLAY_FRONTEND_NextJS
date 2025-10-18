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
const CircleMarker = dynamic(() => import('react-leaflet').then(mod => mod.CircleMarker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const Tooltip = dynamic(() => import('react-leaflet').then(mod => mod.Tooltip), { ssr: false });

// No manual Leaflet JS injection — react-leaflet bundles Leaflet

const InteractiveIndiaMap = () => {
  const [mounted, setMounted] = useState(false);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [leafletLib, setLeafletLib] = useState<any>(null);
  interface Student { coordinates?: [number, number]; }
  const [clusters, setClusters] = useState<Array<{
    lat: number;
    lng: number;
    count: number;
    students: Student[] & any[];
  }>>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Dynamically load Leaflet only on client to avoid SSR issues
    (async () => {
      try {
        const mod = await import('leaflet');
        setLeafletLib((mod as any).default ?? mod);
      } catch {
        // ignore
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
      if (mapInstance && typeof mapInstance.invalidateSize === 'function') {
        mapInstance.invalidateSize();
      }
    }, 200);
    return () => window.removeEventListener('resize', detect);
  }, [mapInstance]);

  // Invalidate size when map instance becomes available (first render)
  useEffect(() => {
    if (mapInstance && typeof mapInstance.invalidateSize === 'function') {
      setTimeout(() => mapInstance.invalidateSize(), 100);
    }
  }, [mapInstance]);

  // Once map is ready, compute bounds from learners API
  useEffect(() => {
    const computeBounds = async () => {
      if (!mapInstance) return;
      try {
        const res = await fetch('/api/learners');
        if (res.ok) {
          const data = await res.json();
          console.log('API response:', data);
          const students: Student[] = Array.isArray(data?.students) ? data.students : [];
          console.log('Students loaded:', students.length);
          console.log('Sample student:', students[0]);
          const coords: [number, number][] = students
            .map(s => s.coordinates)
            .filter((c: any): c is [number, number] => Array.isArray(c) && c.length === 2 && typeof c[0] === 'number' && typeof c[1] === 'number');
          console.log('Valid coordinates found:', coords.length);

          // Build simple grid-based clusters
          console.log('Processing students for clustering:', students.length);
          const gridSize = 0.3; // degrees grid
          const gridKey = (lat: number, lng: number) => `${Math.round(lat / gridSize)}_${Math.round(lng / gridSize)}`;
          const grid: Record<string, { latSum: number; lngSum: number; count: number; students: any[] }>= {};
          students.forEach((s: any, index) => {
            if (!s.coordinates) {
              console.log(`Student ${index} has no coordinates:`, s);
              return;
            }
            const [lat, lng] = s.coordinates as [number, number];
            if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
              console.log(`Student ${index} has invalid coordinates:`, s.coordinates);
              return;
            }
            const key = gridKey(lat, lng);
            if (!grid[key]) grid[key] = { latSum: 0, lngSum: 0, count: 0, students: [] };
            grid[key].latSum += lat;
            grid[key].lngSum += lng;
            grid[key].count += 1;
            grid[key].students.push(s);
            console.log(`Added student ${index} to grid key ${key}:`, { lat, lng });
          });
          const newClusters = Object.values(grid).map(g => ({
            lat: g.latSum / g.count,
            lng: g.lngSum / g.count,
            count: g.count,
            students: g.students
          }));
          console.log('Generated clusters:', newClusters.length, newClusters);
          setClusters(newClusters);
          if (coords.length) {
            let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;
            coords.forEach(([lat, lng]) => {
              if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
              minLat = Math.min(minLat, lat);
              maxLat = Math.max(maxLat, lat);
              minLng = Math.min(minLng, lng);
              maxLng = Math.max(maxLng, lng);
            });
            if (minLat <= maxLat && minLng <= maxLng) {
              const bounds: any = [[minLat, minLng], [maxLat, maxLng]];
              mapInstance.fitBounds(bounds, { padding: [24, 24] });
              mapInstance.invalidateSize();
              // Lock zoom level
              const z = mapInstance.getZoom();
              if (typeof mapInstance.setMinZoom === 'function' && typeof mapInstance.setMaxZoom === 'function') {
                mapInstance.setMinZoom(z);
                mapInstance.setMaxZoom(z);
              }
              return;
            }
          }
        }
      } catch {}
      // Fallback to India bounds
      const INDIA_BOUNDS: any = [[6.0, 68.0], [37.0, 97.0]];
      mapInstance.fitBounds(INDIA_BOUNDS, { padding: [24, 24] });
      mapInstance.invalidateSize();
      const z = mapInstance.getZoom();
      if (typeof mapInstance.setMinZoom === 'function' && typeof mapInstance.setMaxZoom === 'function') {
        mapInstance.setMinZoom(z);
        mapInstance.setMaxZoom(z);
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
        zoom={4}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        boxZoom={false}
        keyboard={false}
        dragging={true}
        zoomControl={false}
        attributionControl={true}
        whenReady={() => {
          // @ts-ignore
          const map = (window as any)?.L?.map?.instances?.[0] || null;
          if (map) {
            setMapInstance(map);
            setTimeout(() => map.invalidateSize(), 50);
          }
        }}
        className="h-full w-full"
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={18}
          minZoom={1}
          errorTileUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI/hxaBcwAAAABJRU5ErkJggg=="
          detectRetina={true}
        />

        {/* Debug info */}
        {clusters.length === 0 && (
          <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(255,255,255,0.9)', padding: '8px', borderRadius: '4px', fontSize: '12px', zIndex: 1000 }}>
            No markers found. Clusters: {clusters.length}
          </div>
        )}
        
        {/* Render clustered markers with mobile: always visible tooltip; desktop: show on hover */}
        {clusters.map((c, idx) => {
          const isCluster = c.count > 1;
          const first = c.students[0] || {};
          
          // Use default Leaflet markers for now to ensure they display
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
                        {c.students.slice(0, 10).map((s: any, i: number) => (
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
                      {c.students.slice(0, 12).map((s: any, i: number) => (
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
