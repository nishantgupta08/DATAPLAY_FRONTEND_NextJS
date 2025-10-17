"use client";

import React, { useState } from "react";
import IndiaCitiesMap from "../maps/IndiaCitiesMap";
import learnersData from "@/data/learners.json";

export default function IndiaLocationsSection() {
  const [selectedCities, setSelectedCities] = useState<string[]>([
    "Jaipur",
    "Bengaluru",
    "Hyderabad"
  ]);

  const [showPinCodes, setShowPinCodes] = useState(true);

  const availableCities = [
    { name: "Jaipur", pincode: "302001" },
    { name: "Bengaluru", pincode: "560001" },
    { name: "Delhi", pincode: "110001" },
    { name: "Mumbai", pincode: "400001" },
    { name: "Hyderabad", pincode: "500001" },
    { name: "Pune", pincode: "411001" },
    { name: "Ahmedabad", pincode: "380001" },
    { name: "Kolkata", pincode: "700001" },
    { name: "Chennai", pincode: "600001" },
    { name: "Surat", pincode: "395001" }
  ];

  const handleCityToggle = (cityName: string) => {
    setSelectedCities(prev =>
      prev.includes(cityName)
        ? prev.filter(city => city !== cityName)
        : [...prev, cityName]
    );
  };

  return (
    <section className="relative py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            DataPlay Students Across
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}India
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover where our students are located across major Indian cities.
            Click on the pins to see pin codes and student statistics.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={showPinCodes}
                onChange={(e) => setShowPinCodes(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Show Pin Codes
            </label>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Featured Cities:</span>
            <div className="flex flex-wrap gap-2">
              {availableCities.slice(0, 6).map(city => (
                <button
                  key={city.name}
                  onClick={() => handleCityToggle(city.name)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedCities.includes(city.name)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Map Component */}
        <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
          <IndiaCitiesMap
            featuredCities={selectedCities}
            showPinCodes={showPinCodes}
            className="w-full"
          />
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {selectedCities.length}
            </div>
            <div className="text-gray-600 font-medium">Featured Cities</div>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {availableCities.length}
            </div>
            <div className="text-gray-600 font-medium">Total Cities Available</div>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {learnersData.length}+
            </div>
            <div className="text-gray-600 font-medium">Students Enrolled</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Join Our Growing Community</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Be part of DataPlay&apos;s expanding network across India.
              Join students from {availableCities.length}+ cities learning data science together.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
              Find Your City
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
