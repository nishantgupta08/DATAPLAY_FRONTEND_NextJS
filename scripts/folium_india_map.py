import folium
import json
from folium import plugins

# Load student data
with open('data/learners.json', 'r') as f:
    students = json.load(f)

# Create India-focused map
india_map = folium.Map(
    location=[22.9734, 78.6569],  # Center of India
    zoom_start=5,
    tiles='OpenStreetMap'
)

# Add India boundary (simplified)
india_bounds = [
    [6.5, 68.0],   # Southwest
    [37.5, 97.5]   # Northeast
]

# Fit map to India bounds
india_map.fit_bounds(india_bounds)

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

# Add markers for each city
colors = ['red', 'blue', 'green', 'orange', 'purple', 'darkred']
for i, (city, data) in enumerate(cities.items()):
    student_count = len(data['students'])
    
    # Create popup content
    popup_content = f"""
    <div style="width: 300px;">
        <h3 style="color: {colors[i % len(colors)]}; margin-bottom: 10px;">{city}</h3>
        <p><strong>Students:</strong> {student_count}</p>
        <p><strong>Pin Codes:</strong> {', '.join(sorted(data['pin_codes']))}</p>
        <hr>
        <h4>Student Details:</h4>
    """
    
    for student in data['students']:
        popup_content += f"""
        <div style="margin: 5px 0; padding: 5px; background: #f0f0f0; border-radius: 3px;">
            <strong>{student['name']}</strong><br>
            <small>Pin: {student['pinCode']}</small><br>
            <small>{student['institute']}</small><br>
            <small>{student['program']}</small>
        </div>
        """
    
    popup_content += "</div>"
    
    # Add marker
    folium.Marker(
        [data['lat'], data['lng']],
        popup=folium.Popup(popup_content, max_width=350),
        tooltip=f"{city} ({student_count} students)",
        icon=folium.Icon(
            color=colors[i % len(colors)],
            icon='info-sign',
            icon_size=(20, 20)
        )
    ).add_to(india_map)

# Add heatmap layer
heat_data = [[data['lat'], data['lng'], len(data['students'])] for data in cities.values()]
plugins.HeatMap(heat_data, name='Student Density Heatmap').add_to(india_map)

# Add layer control
folium.LayerControl().add_to(india_map)

# Add title
title_html = '''
             <h3 align="center" style="font-size:20px"><b>Student Distribution Across India</b></h3>
             '''
india_map.get_root().html.add_child(folium.Element(title_html))

# Save map
india_map.save('public/india_folium_map.html')

print("Interactive India map saved as india_folium_map.html")
print(f"Total students: {len(students)}")
print(f"Total cities: {len(cities)}")
