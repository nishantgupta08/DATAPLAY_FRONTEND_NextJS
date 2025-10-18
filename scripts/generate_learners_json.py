#!/usr/bin/env python3
"""
Script to dynamically generate learners.json from learners.txt
"""

import json
import os

# Pin code to coordinates mapping (from existing scripts)
PIN_CODE_COORDS = {
    "341533": [26.9124, 75.7873],  # Jaipur
    "322023": [28.7041, 77.1025],  # Delhi
    "751030": [22.2492, 84.9016],  # Rourkela
    "302031": [26.9124, 75.7873],  # Jaipur
    "500035": [17.3850, 78.4867],  # Hyderabad
    "311001": [26.2389, 73.0243],  # Jodhpur
    "700118": [12.9716, 77.5946],  # Bangalore
    "302034": [26.9124, 75.7873],  # Jaipur
    "302021": [26.9124, 75.7873],  # Jaipur
    "302012": [26.9124, 75.7873],  # Jaipur
}

def get_coordinates_from_pincode(pincode):
    """Get coordinates from pin code using mapping"""
    return PIN_CODE_COORDS.get(pincode, [22.9734, 78.6569])  # Default to center of India

def get_city_from_pincode(pincode):
    """Get city name from pin code"""
    city_map = {
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
    }
    return city_map.get(pincode, "Unknown")

def parse_learners_txt():
    """Parse learners.txt and return list of student data"""
    students = []

    # Read the file
    txt_file = os.path.join(os.path.dirname(__file__), '..', 'data', 'learners.txt')

    if not os.path.exists(txt_file):
        print(f"Error: {txt_file} not found")
        return students

    with open(txt_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    for i, line in enumerate(lines, 1):
        line = line.strip()
        if not line:
            continue

        # Parse the line: pincode institute program
        parts = line.split('\t')
        if len(parts) >= 3:
            pincode = parts[0].strip()
            institute = parts[1].strip()
            program = parts[2].strip()

            # Get coordinates and city
            coordinates = get_coordinates_from_pincode(pincode)
            city = get_city_from_pincode(pincode)

            student = {
                "id": str(i),
                "name": f"Student {i}",
                "institute": institute,
                "program": program,
                "city": city,
                "pinCode": pincode,
                "coordinates": coordinates
            }

            students.append(student)
        else:
            print(f"Warning: Could not parse line {i}: {line}")

    return students

def create_learners_json():
    """Create learners.json from parsed data"""
    students = parse_learners_txt()

    if not students:
        print("No students found in learners.txt")
        return

    # Create data directory if it doesn't exist
    data_dir = os.path.join(os.path.dirname(__file__), '..', 'data')
    os.makedirs(data_dir, exist_ok=True)

    # Write JSON file
    json_file = os.path.join(data_dir, 'learners.json')

    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(students, f, indent=2, ensure_ascii=False)

    print(f"✅ Successfully created learners.json with {len(students)} students")
    print(f"📁 File saved to: {json_file}")

    # Print summary
    print("\n📊 Summary:")
    print(f"   Total students: {len(students)}")

    cities = {}
    programs = {}

    for student in students:
        city = student['city']
        program = student['program']

        cities[city] = cities.get(city, 0) + 1
        programs[program] = programs.get(program, 0) + 1

    print(f"   Cities: {', '.join([f'{city}({count})' for city, count in cities.items()])}")
    print(f"   Programs: {', '.join([f'{program}({count})' for program, count in programs.items()])}")

if __name__ == "__main__":
    create_learners_json()
