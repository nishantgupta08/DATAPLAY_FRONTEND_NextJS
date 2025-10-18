/**
 * Utility to parse learners.txt and convert to JSON format
 * Used by Next.js API routes and components
 */

export interface Student {
  id: string;
  name: string;
  institute: string;
  program: string;
  city: string;
  pinCode: string;
  coordinates: [number, number];
}

// Pin code to coordinates mapping
const PIN_CODE_COORDS: Record<string, [number, number]> = {
  "341533": [26.9124, 75.7873],  // Jaipur
  "322023": [28.7041, 77.1025],  // Delhi
  "751030": [22.2492, 84.9016],  // Rourkela
  "302031": [26.9124, 75.7873],  // Jaipur
  "500035": [17.3850, 78.4867],  // Hyderabad
  "311001": [26.2389, 73.0243],  // Jodhpur
  "700118": [12.9716, 77.5946],  // Bangalore
  "302034": [26.9124, 75.7873],  // Jaipur
  "302021": [26.9124, 75.7873],  // Jaipur
  "302012": [26.9124, 75.7873],  // Jaipur
};

const CITY_MAP: Record<string, string> = {
  "341533": "Jaipur",
  "322023": "Delhi",
  "751030": "Rourkela",
  "302031": "Jaipur",
  "500035": "Hyderabad",
  "311001": "Jodhpur",
  "700118": "Bangalore",
  "302034": "Jaipur",
  "302021": "Jaipur",
  "302012": "Jaipur",
};

/**
 * Get coordinates from pin code
 */
export function getCoordinatesFromPincode(pincode: string): [number, number] {
  return PIN_CODE_COORDS[pincode] || [22.9734, 78.6569]; // Default to center of India
}

/**
 * Get city name from pin code
 */
export function getCityFromPincode(pincode: string): string {
  return CITY_MAP[pincode] || "Unknown";
}

/**
 * Parse a single line from learners.txt
 * Format: pincode<TAB>institute<TAB>program
 */
export function parseLearnerLine(line: string, index: number): Student | null {
  const trimmedLine = line.trim();
  if (!trimmedLine) return null;

  // Split by tab character
  const parts = trimmedLine.split('\t');
  if (parts.length < 3) return null;

  const pincode = parts[0].trim();
  const institute = parts[1].trim();
  const program = parts[2].trim();

  if (!pincode || !institute || !program) return null;

  const coordinates = getCoordinatesFromPincode(pincode);
  const city = getCityFromPincode(pincode);

  return {
    id: String(index + 1),
    name: `Student ${index + 1}`,
    institute,
    program,
    city,
    pinCode: pincode,
    coordinates
  };
}

/**
 * Parse learners.txt content and return array of students
 */
export function parseLearnersTxt(content: string): Student[] {
  const lines = content.split('\n');
  const students: Student[] = [];

  lines.forEach((line, index) => {
    const student = parseLearnerLine(line, index);
    if (student) {
      students.push(student);
    }
  });

  return students;
}

/**
 * Convert learners.txt to JSON format for frontend consumption
 */
export function convertLearnersTxtToJson(content: string): string {
  const students = parseLearnersTxt(content);
  return JSON.stringify(students, null, 2);
}

/**
 * Get statistics from parsed students data
 */
export function getLearnersStats(students: Student[]) {
  const stats = {
    totalStudents: students.length,
    totalCities: new Set(students.map(s => s.city)).size,
    topCities: [] as { city: string; count: number }[],
    programs: new Set<string>(),
    institutes: new Set<string>()
  };

  // Count by city
  const cityCount: Record<string, number> = {};
  students.forEach(student => {
    cityCount[student.city] = (cityCount[student.city] || 0) + 1;
    stats.programs.add(student.program);
    stats.institutes.add(student.institute);
  });

  // Convert to array and sort by count
  stats.topCities = Object.entries(cityCount)
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count);

  return stats;
}
