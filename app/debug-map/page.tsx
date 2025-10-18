// Debug Map Page
// Helps debug why pin points are not appearing on the map

'use client';

import MapDebugger from '@/components/debug/MapDebugger';
import InteractiveIndiaMap from '@/components/sections/InteractiveIndiaMap';

export default function DebugMapPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Map Debug Page</h1>

        {/* Debug Information */}
        <div className="mb-8">
          <MapDebugger />
        </div>

        {/* Map Component */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Interactive Map</h2>
          <div className="h-96 bg-white rounded-lg shadow-lg overflow-hidden">
            <InteractiveIndiaMap />
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Debug Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Check the &quot;API Response&quot; section above to see if the /api/learners endpoint is working</li>
            <li>Verify that &quot;Students Data&quot; shows the correct number of students with coordinates</li>
            <li>Ensure &quot;Valid Coordinates&quot; contains the coordinate pairs</li>
            <li>Check that &quot;Clusters&quot; are being generated from the student data</li>
            <li>Look for any errors in the &quot;Errors&quot; section</li>
            <li>Compare the debug data with what you see (or don&apos;t see) on the map below</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
