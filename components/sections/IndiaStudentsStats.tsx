"use client";

import React, { useEffect, useState, memo } from 'react';
// Dynamic import will be handled in useEffect

interface Student {
  id: string;
  name: string;
  institute: string;
  program: string;
  city: string;
  pinCode: string;
  coordinates: [number, number];
}

interface IndiaStudentsStatsProps {
  className?: string;
}

const IndiaStudentsStats = memo(function IndiaStudentsStats({ 
  className = "" 
}: IndiaStudentsStatsProps) {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCities: 0,
    topCities: [] as { city: string; count: number }[],
    programs: new Set<string>(),
    institutes: new Set<string>()
  });

  useEffect(() => {
    const fetchLearnersData = async () => {
      try {
        const response = await fetch('/api/learners');
        if (response.ok) {
          const data = await response.json();

          // Use the stats from the API response
          setStats({
            totalStudents: data.stats.totalStudents,
            totalCities: data.stats.totalCities,
            topCities: data.stats.topCities,
            programs: data.stats.programs,
            institutes: data.stats.institutes
          });
        } else {
          console.error('Failed to fetch learners data');
          // Set default empty stats
          setStats({
            totalStudents: 0,
            totalCities: 0,
            topCities: [],
            programs: new Set(),
            institutes: new Set()
          });
        }
      } catch (error) {
        console.error('Error fetching learners data:', error);
        // Set default empty stats
        setStats({
          totalStudents: 0,
          totalCities: 0,
          topCities: [],
          programs: new Set(),
          institutes: new Set()
        });
      }
    };

    fetchLearnersData();
  }, []);

  return (
    <div className={`bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Students */}
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {stats.totalStudents}
          </div>
          <div className="text-sm text-gray-600">Total Students</div>
        </div>

        {/* Cities Represented */}
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-1">
            {stats.totalCities}
          </div>
          <div className="text-sm text-gray-600">Cities Across India</div>
        </div>

        {/* Programs Offered */}
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600 mb-1">
            {stats.programs.size}
          </div>
          <div className="text-sm text-gray-600">Program Types</div>
        </div>

        {/* Institutes */}
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-600 mb-1">
            {stats.institutes.size}
          </div>
          <div className="text-sm text-gray-600">Partner Institutes</div>
        </div>
      </div>

      {/* Top Cities */}
      {stats.topCities.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Top Cities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {stats.topCities.map(({ city, count }) => (
              <div key={city} className="bg-white rounded-lg p-3 text-center shadow-sm">
                <div className="font-medium text-gray-800">{city}</div>
                <div className="text-sm text-blue-600 font-semibold">{count} students</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default IndiaStudentsStats;
