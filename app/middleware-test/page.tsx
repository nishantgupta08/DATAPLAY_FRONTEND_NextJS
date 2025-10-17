"use client";

import { useEffect, useState } from 'react';

export default function MiddlewareTestPage() {
  const [headers, setHeaders] = useState<Record<string, string>>({});
  const [youtubeTest, setYoutubeTest] = useState<string>('');

  useEffect(() => {
    // Test if we can fetch YouTube content
    const testYouTube = async () => {
      try {
        await fetch('https://www.youtube.com/embed/Eq_kHFBaoe0', {
          mode: 'no-cors'
        });
        setYoutubeTest('YouTube accessible: Yes');
      } catch (error) {
        setYoutubeTest('YouTube accessible: No - ' + (error as Error).message);
      }
    };

    testYouTube();

    // Get current headers (this won't work in client-side, but shows the concept)
    setHeaders({
      'User-Agent': navigator.userAgent,
      'Current URL': window.location.href,
      'Protocol': window.location.protocol,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Middleware Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* YouTube Test */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">YouTube Access Test</h2>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">{youtubeTest}</p>
            </div>
            
            {/* Direct iframe test */}
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Direct iframe Test</h3>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/Eq_kHFBaoe0?si=RReygUU9r968XBVO"
                  title="Middleware Test Video"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Headers Info */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Request Information</h2>
            <div className="space-y-2 text-sm">
              {Object.entries(headers).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="font-medium text-gray-600">{key}:</span>
                  <span className="text-gray-800 font-mono text-xs break-all">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Headers Test */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Security Headers Test</h2>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-800 mb-2">
              <strong>Note:</strong> This page tests if the middleware allows YouTube embeds.
            </p>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>✅ X-Frame-Options: Removed (allows iframes)</li>
              <li>✅ CSP frame-src: Allows YouTube domains</li>
              <li>✅ CSP script-src: Allows YouTube scripts</li>
              <li>✅ CSP connect-src: Allows YouTube connections</li>
            </ul>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-green-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-green-800">Test Instructions</h2>
          <div className="text-sm text-green-700 space-y-2">
            <p>1. <strong>Check if the video loads</strong> - If it shows a loading spinner or error, the middleware is still blocking it</p>
            <p>2. <strong>Check browser console</strong> - Look for CSP or frame-related errors</p>
            <p>3. <strong>Check Network tab</strong> - See if YouTube requests are being blocked</p>
            <p>4. <strong>Test on different pages</strong> - Visit /youtube-test to test the optimized components</p>
          </div>
        </div>
      </div>
    </div>
  );
}
