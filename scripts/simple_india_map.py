import matplotlib.pyplot as plt
import json
from matplotlib.patches import Rectangle

# Load student data
with open('data/learners.json', 'r') as f:
    students = json.load(f)

# Create figure
fig, ax = plt.subplots(figsize=(12, 8))

# India bounds
ax.set_xlim(68, 97.5)  # Longitude bounds
ax.set_ylim(6.5, 37.5)  # Latitude bounds

# Add India outline
india_outline = Rectangle((68, 6.5), 29.5, 31, linewidth=3, edgecolor='blue', 
                         facecolor='lightblue', alpha=0.2)
ax.add_patch(india_outline)

# Group students by city
cities = {}
for student in students:
    city = student['city']
    if city not in cities:
        cities[city] = {
            'lat': student['coordinates'][1],
            'lng': student['coordinates'][0],
            'students': [],
            'pin_codes': set()
        }
    cities[city]['students'].append(student)
    cities[city]['pin_codes'].add(student['pinCode'])

# Plot each city
colors = ['red', 'blue', 'green', 'orange', 'purple', 'brown']
for i, (city, data) in enumerate(cities.items()):
    student_count = len(data['students'])
    
    # Plot city marker
    ax.scatter(data['lng'], data['lat'], 
              s=student_count * 300,  # Size based on student count
              c=colors[i % len(colors)], 
              alpha=0.8, 
              edgecolors='white', 
              linewidth=3)
    
    # Add detailed city label with all pin codes
    pin_codes_list = sorted(data['pin_codes'])
    pin_codes_str = '\n'.join([f"Pin: {pin}" for pin in pin_codes_list])
    
    ax.annotate(f"{city}\nStudents: {student_count}\n{pin_codes_str}", 
                (data['lng'], data['lat']), 
                xytext=(15, 15), textcoords='offset points',
                fontsize=10, ha='left', va='bottom',
                bbox=dict(boxstyle='round,pad=0.8', facecolor='white', 
                         alpha=0.95, edgecolor='gray', linewidth=1),
                arrowprops=dict(arrowstyle='->', connectionstyle='arc3,rad=0.1',
                              color='gray', linewidth=1))

# Add title
ax.set_title('Student Distribution Across India\nWith Pin Codes', 
             fontsize=18, fontweight='bold', pad=20)

# Add grid
ax.grid(True, alpha=0.3, linestyle='--')

# Add statistics
total_students = len(students)
total_cities = len(cities)
stats_text = f"Total Students: {total_students}\nTotal Cities: {total_cities}"
ax.text(0.02, 0.98, stats_text, transform=ax.transAxes, 
        fontsize=14, verticalalignment='top',
        bbox=dict(boxstyle='round', facecolor='yellow', alpha=0.8))

# Set aspect ratio
ax.set_aspect('equal', adjustable='box')

plt.tight_layout()
plt.savefig('public/india_simple_map.png', dpi=300, bbox_inches='tight')
plt.show()

print(f"Simple India map saved as india_simple_map.png")
print(f"Total students: {total_students}")
print(f"Total cities: {total_cities}")

# Print detailed pin code information
print("\nDetailed Pin Code Information:")
for city, data in cities.items():
    print(f"\n{city} ({len(data['students'])} students):")
    for student in data['students']:
        print(f"  - {student['name']}: Pin {student['pinCode']} ({student['institute']})")
