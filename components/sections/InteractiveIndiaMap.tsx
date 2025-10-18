"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg"><div className="animate-spin rounded-full h-8 w-8 border-b-4 border-blue-600"></div></div>
});
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// No manual Leaflet JS injection — react-leaflet bundles Leaflet

const InteractiveIndiaMap = () => {
  const [mounted, setMounted] = useState(false);
  const [mapInstance, setMapInstance] = useState<any>(null);
  interface Student { coordinates?: [number, number]; }
  const [clusters, setClusters] = useState<Array<{
    lat: number;
    lng: number;
    count: number;
    students: Student[] & any[];
  }>>([]);

  useEffect(() => {
    setMounted(true);
    // Trigger size invalidation after first paint
    setTimeout(() => {
      if (mapInstance && typeof mapInstance.invalidateSize === 'function') {
        mapInstance.invalidateSize();
      }
    }, 200);
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
          const students: Student[] = Array.isArray(data?.students) ? data.students : [];
          const coords: [number, number][] = students
            .map(s => s.coordinates)
            .filter((c: any): c is [number, number] => Array.isArray(c) && c.length === 2 && typeof c[0] === 'number' && typeof c[1] === 'number');

          // Build simple grid-based clusters
          const gridSize = 0.3; // degrees grid
          const gridKey = (lat: number, lng: number) => `${Math.round(lat / gridSize)}_${Math.round(lng / gridSize)}`;
          const grid: Record<string, { latSum: number; lngSum: number; count: number; students: any[] }>= {};
          students.forEach((s: any) => {
            if (!s.coordinates) return;
            const [lat, lng] = s.coordinates as [number, number];
            if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
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
        whenReady={(e: any) => {
          const map = e.target || e;
          setMapInstance(map);
          setTimeout(() => map.invalidateSize(), 50);
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

        {/* Render clustered markers */}
        {clusters.map((c, idx) => {
          const isCluster = c.count > 1;
          const size = 24 + Math.min(24, c.count * 2);
          const icon = L.divIcon({
            html: isCluster
              ? `<div style="background:#2563eb;color:#fff;border-radius:9999px;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;font-weight:600;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.25)">${c.count}</div>`
              : `<div style="background:#10b981;border:2px solid #fff;border-radius:9999px;width:14px;height:14px;box-shadow:0 2px 6px rgba(0,0,0,0.25)"></div>`,
            className: 'cluster-marker',
            iconSize: [size, size],
            iconAnchor: [size / 2, size / 2]
          });
          const first = c.students[0] || {};
          return (
            <Marker key={idx} position={[c.lat, c.lng]} icon={icon}>
              {!isCluster && (
                <Popup>
                  <div style={{ minWidth: 200 }}>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>{first.name || 'Student'}</div>
                    <div style={{ color: '#374151' }}>{first.institute || 'Institute'}</div>
                    <div style={{ color: '#4b5563' }}>{first.program || 'Program'}</div>
                    <div style={{ color: '#6b7280', marginTop: 6 }}>PIN: {first.pinCode || '—'}</div>
                  </div>
                </Popup>
              )}
              {isCluster && (
                <Popup>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 6 }}>{c.count} students nearby</div>
                    <ul style={{ maxHeight: 180, overflowY: 'auto', paddingLeft: 16 }}>
                      {c.students.slice(0, 10).map((s: any, i: number) => (
                        <li key={i} style={{ marginBottom: 4 }}>
                          <span style={{ fontWeight: 600 }}>{s.name || `Student ${i+1}`}</span> — {s.institute || 'Institute'} ({s.program || 'Program'})
                        </li>
                      ))}
                    </ul>
                    {c.students.length > 10 && <div style={{ color: '#6b7280', marginTop: 4 }}>+{c.students.length - 10} more…</div>}
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
