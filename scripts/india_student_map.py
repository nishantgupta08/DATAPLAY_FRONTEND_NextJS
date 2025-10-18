import matplotlib.pyplot as plt
import numpy as np
import json
import pandas as pd
from matplotlib.patches import Polygon
import seaborn as sns

# Load student data
with open('data/learners.json', 'r') as f:
    students = json.load(f)

# Create figure with India focus
fig, ax = plt.subplots(figsize=(14, 10))

# India bounds
ax.set_xlim(68, 97.5)  # Longitude bounds
ax.set_ylim(6.5, 37.5)  # Latitude bounds

# Create India outline (simplified)
india_coords = [
    (68.17665, 7.96553), (68.8426, 8.89279), (69.858, 9.53106), (70.823, 10.867),
    (71.7777, 11.667), (72.826, 12.741), (73.978, 13.595), (74.443, 14.617),
    (75.396, 15.473), (76.362, 16.36), (77.274, 17.019), (78.015, 17.881),
    (78.885, 18.676), (79.736, 19.51), (80.568, 20.268), (81.232, 21.014),
    (82.033, 21.725), (83.189, 22.305), (84.326, 22.804), (85.18, 23.207),
    (86.558, 24.06), (87.635, 24.572), (88.084, 24.501), (88.699, 24.866),
    (88.931, 25.238), (89.355, 25.965), (89.831, 26.449), (90.373, 26.875),
    (91.217, 26.808), (92.033, 26.838), (92.684, 26.451), (93.419, 26.633),
    (94.174, 26.086), (94.867, 26.548), (95.155, 26.001), (95.125, 25.168),
    (95.298, 24.785), (96.006, 24.539), (96.478, 24.02), (97.327, 23.956),
    (97.402, 23.16), (98.672, 24.063), (97.869, 23.69), (97.05, 22.95),
    (96.416, 21.558), (95.369, 21.143), (94.377, 20.447), (93.913, 19.81),
    (93.078, 19.045), (92.584, 18.281), (91.468, 17.878), (90.587, 17.626),
    (89.702, 17.396), (88.529, 17.202), (87.361, 17.016), (86.499, 16.589),
    (85.060, 15.957), (83.941, 15.791), (82.192, 15.115), (80.324, 13.991),
    (78.885, 12.740), (77.941, 11.641), (76.593, 10.299), (75.746, 9.152),
    (74.864, 8.301), (73.712, 7.798), (72.705, 8.368), (71.061, 8.933),
    (70.262, 8.565), (69.164, 8.048), (68.17665, 7.96553)
]

# Draw India outline
india_polygon = Polygon(india_coords, facecolor='lightblue', alpha=0.3, 
                       edgecolor='blue', linewidth=2)
ax.add_patch(india_polygon)

# Group students by city
cities = {}
for student in students:
    city = student['city']
    if city not in cities:
        cities[city] = {
            'lat': student['coordinates'][1],  # Latitude is second coordinate
            'lng': student['coordinates'][0],  # Longitude is first coordinate
            'students': [],
            'pin_codes': set()
        }
    cities[city]['students'].append(student)
    cities[city]['pin_codes'].add(student['pinCode'])

# Plot each city with students
colors = plt.cm.Set3(np.linspace(0, 1, len(cities)))
for i, (city, data) in enumerate(cities.items()):
    student_count = len(data['students'])
    
    # Plot city marker
    ax.scatter(data['lng'], data['lat'], 
              s=student_count * 200,  # Size based on student count
              c=[colors[i]], 
              alpha=0.8, 
              edgecolors='white', 
              linewidth=2,
              label=f"{city} ({student_count})")
    
    # Add city label with pin codes
    pin_codes_str = ', '.join(sorted(data['pin_codes']))
    ax.annotate(f"{city}\nPin: {pin_codes_str}\nStudents: {student_count}", 
                (data['lng'], data['lat']), 
                xytext=(10, 10), textcoords='offset points',
                fontsize=9, ha='left', va='bottom',
                bbox=dict(boxstyle='round,pad=0.5', facecolor='white', 
                         alpha=0.9, edgecolor='gray'),
                arrowprops=dict(arrowstyle='->', connectionstyle='arc3,rad=0'))

# Add title and labels
ax.set_title('Student Distribution Across India\n(Pin Codes and Student Count)', 
             fontsize=16, fontweight='bold', pad=20)
ax.set_xlabel('Longitude', fontsize=12)
ax.set_ylabel('Latitude', fontsize=12)

# Add grid
ax.grid(True, alpha=0.3, linestyle='--')

# Add legend
ax.legend(bbox_to_anchor=(1.05, 1), loc='upper left', fontsize=10)

# Add statistics text
total_students = len(students)
total_cities = len(cities)
stats_text = f"Total Students: {total_students}\nTotal Cities: {total_cities}"
ax.text(0.02, 0.98, stats_text, transform=ax.transAxes, 
        fontsize=12, verticalalignment='top',
        bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.8))

# Set aspect ratio
ax.set_aspect('equal', adjustable='box')

plt.tight_layout()
plt.savefig('public/india_students_map.png', dpi=300, bbox_inches='tight')
plt.show()

print(f"India student map saved as india_students_map.png")
print(f"Total students: {total_students}")
print(f"Total cities: {total_cities}")
print("\nCity-wise distribution:")
for city, data in cities.items():
    print(f"{city}: {len(data['students'])} students, Pin codes: {sorted(data['pin_codes'])}")
