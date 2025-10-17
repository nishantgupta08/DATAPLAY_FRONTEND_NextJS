"use client";

import YouTubeVideo from "@/components/ui/YouTubeVideo";
import YouTubeDebug from "@/components/debug/YouTubeDebug";

export default function YouTubeTestPage() {
  const testVideos = [
    {
      title: "Main Video",
      url: "https://www.youtube.com/embed/Eq_kHFBaoe0?si=RReygUU9r968XBVO"
    },
    {
      title: "Testimonial Video 1", 
      url: "https://www.youtube.com/embed/0z0sKK3050M"
    },
    {
      title: "Testimonial Video 2",
      url: "https://www.youtube.com/embed/8zdIhzvzjdk?si=3AB3iRXiM2DrMJI3"
    },
    {
      title: "Testimonial Video 3",
      url: "https://www.youtube.com/embed/BgS_40tcL3Y?si=2nW8aqaq6h75vm1d"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">YouTube Video Test</h1>
        
        <div className="grid grid-cols-1 gap-8">
          {testVideos.map((video, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">{video.title}</h2>
              
              {/* Debug Version */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3 text-blue-600">Debug Version</h3>
                <YouTubeDebug src={video.url} title={video.title} />
              </div>
              
              {/* Optimized Version */}
              <div>
                <h3 className="text-lg font-medium mb-3 text-green-600">Optimized Version</h3>
                <div className="aspect-video">
                  <YouTubeVideo
                    src={video.url}
                    title={video.title}
                    className="w-full h-full rounded-lg"
                    width={560}
                    height={315}
                    controls={true}
                    autoplay={false}
                    muted={false}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Debug Information</h3>
          <div className="space-y-2 text-sm">
            <p><strong>User Agent:</strong> {typeof window !== 'undefined' ? window.navigator.userAgent : 'Server-side'}</p>
            <p><strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'Server-side'}</p>
            <p><strong>Video URLs:</strong></p>
            <ul className="ml-4 space-y-1">
              {testVideos.map((video, index) => (
                <li key={index} className="font-mono text-xs break-all">
                  {index + 1}. {video.url}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
