import matplotlib.pyplot as plt
import numpy as np
import json
from matplotlib.patches import Rectangle
import seaborn as sns

# Load student data
with open('../data/learners.json', 'r') as f:
    students = json.load(f)

# Extract coordinates and counts
cities = {}
for student in students:
    city = student['city']
    if city not in cities:
        cities[city] = {
            'lat': student['coordinates'][0],
            'lng': student['coordinates'][1],
            'count': 0
        }
    cities[city]['count'] += 1

# Create figure
fig, ax = plt.subplots(figsize=(12, 8))
ax.set_xlim(68, 97.5)  # India longitude bounds
ax.set_ylim(6.5, 37.5)  # India latitude bounds

# Create density plot
lats = [cities[city]['lat'] for city in cities]
lngs = [cities[city]['lng'] for city in cities]
counts = [cities[city]['count'] for city in cities]

# Create scatter plot with size based on student count
scatter = ax.scatter(lngs, lats, s=[count*100 for count in counts], 
                    c=counts, cmap='Blues', alpha=0.7, edgecolors='white', linewidth=2)

# Add city labels
for city, data in cities.items():
    ax.annotate(f"{city}\n({data['count']})", 
                (data['lng'], data['lat']), 
                xytext=(5, 5), textcoords='offset points',
                fontsize=8, ha='left', va='bottom',
                bbox=dict(boxstyle='round,pad=0.3', facecolor='white', alpha=0.8))

# Add colorbar
cbar = plt.colorbar(scatter, ax=ax)
cbar.set_label('Number of Students', rotation=270, labelpad=20)

# Styling
ax.set_title('Student Distribution Across India', fontsize=16, fontweight='bold')
ax.set_xlabel('Longitude', fontsize=12)
ax.set_ylabel('Latitude', fontsize=12)
ax.grid(True, alpha=0.3)

# Add India outline (simplified)
india_outline = Rectangle((68, 6.5), 29.5, 31, linewidth=2, edgecolor='blue', 
                         facecolor='lightblue', alpha=0.1)
ax.add_patch(india_outline)

plt.tight_layout()
plt.savefig('../public/india_student_density.png', dpi=300, bbox_inches='tight')
plt.show()

print("Density map saved as india_student_density.png")
