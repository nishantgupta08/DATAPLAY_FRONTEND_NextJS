import React from 'react';

// Main App component
const App = () => {
    return (
        <div className="bg-[#f7f9fc] font-sans min-h-screen p-4 md:p-8">
            {/* Container for main content and sidebar */}
            <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Content Area */}
                <div className="lg:col-span-2">
                    {/* Breadcrumbs */}
                    <div className="text-sm text-gray-500 mb-4">
                        <span className="text-gray-400">Home &gt;</span> Data Engineering
                    </div>

                    {/* Main Course Info Section */}
                    <div className="bg-white rounded-xl shadow-md p-6 mb-8 lg:p-10">
                        <h1 className="text-4xl font-bold text-[#1a2d59] mb-4">Data Engineering</h1>
                        <p className="text-gray-600 mb-4">
                            This comprehensive program takes you on a transformative learning journey, equipping you with a wide range of skills and expertise to tackle the most complex data challenges in today&apos;s data-driven world.
                        </p>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                            <span className="flex items-center text-yellow-400">
                                {'★'.repeat(5)}
                            </span>
                            <span className="ml-2 font-medium">1,292 Reviews</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-500">Instructor:</span>
                            <span className="ml-2 font-medium text-[#1a2d59] hover:underline cursor-pointer">Dr. Robin Malviya</span>
                        </div>
                    </div>

                    {/* Course Content Section */}
                    <div className="bg-white rounded-xl shadow-md p-6 lg:p-10">
                        <h2 className="text-2xl font-bold text-[#1a2d59] mb-6">Course Content</h2>
                        <div className="space-y-4">
                            {[
                                "Introduction to Data Engineering",
                                "Databases and Sql Fundamentals",
                                "Data warehousing - Snowflake",
                                "Programming for data engineering",
                                "Hadoop Eco system",
                                "Apache spark fundamentals and pyspark"
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 bg-[#eef3fb] rounded-lg cursor-pointer transition-colors duration-200 hover:bg-[#d8e0f0]"
                                >
                                    <span className="text-lg font-medium text-[#1a2d59]">{item}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Top Card */}
                    <div className="bg-white rounded-xl shadow-md p-6 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 text-white bg-red-500 text-sm font-semibold rounded-bl-lg">
                            100%
                        </div>
                        <div className="flex justify-center mb-4">
                            <img
                                src="https://placehold.co/120x120/E2E8F0/1A202C?text=Instructor"
                                alt="Instructor"
                                className="rounded-full w-24 h-24 border-4 border-white shadow-lg"
                            />
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                                LaunchPad
                            </span>
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">
                                DS Essentials
                            </span>
                        </div>
                        <div className="text-[#1a2d59] font-semibold text-lg">Flexible Schedule</div>
                    </div>

                    {/* Video Card */}
                    <div className="bg-white rounded-xl shadow-md p-2 relative">
                        <div className="relative w-full h-auto pb-[56.25%] overflow-hidden rounded-lg">
                            <img
                                src="https://placehold.co/600x400/000000/FFFFFF?text=edureka!"
                                alt="Video Thumbnail"
                                className="absolute top-0 left-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <div className="flex flex-col items-center text-white p-4">
                                    <span className="text-xl font-bold">edureka!</span>
                                    <h3 className="text-3xl font-extrabold text-center mt-2">DATA SCIENCE FULL COURSE IN 10 HOURS</h3>
                                </div>
                                <div className="absolute bottom-4 right-4 text-white text-3xl font-bold bg-black bg-opacity-50 px-3 py-1 rounded-full">3</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="container mx-auto max-w-7xl mt-12 mb-8">
                <h2 className="text-3xl font-bold text-[#1a2d59] mb-6">What people are saying</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center relative">
                            <img
                                src="https://placehold.co/100x100/D1D5DB/4B5563?text=Profile"
                                alt="Testimonial"
                                className="w-20 h-20 rounded-full mx-auto -mt-16 border-4 border-white absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            />
                            <div className="mt-8">
                                <h3 className="text-xl font-bold text-[#1a2d59]">John Doe</h3>
                                <p className="text-gray-500 text-sm">Chief Executive Officer</p>
                                <p className="text-gray-600 text-sm mt-4">
                                    Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
