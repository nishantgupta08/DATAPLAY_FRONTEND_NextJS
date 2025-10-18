import plotly.graph_objects as go
import plotly.express as px
import json
import pandas as pd
import requests
import time

# Pin code to coordinates mapping (approximate)
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
    """Get coordinates from pin code using mapping or geocoding"""
    if pincode in PIN_CODE_COORDS:
        return PIN_CODE_COORDS[pincode]
    
    # Fallback: try to geocode using a simple approach
    # For now, return a default coordinate
    return [22.9734, 78.6569]  # Center of India

# Load student data
with open('data/learners.json', 'r') as f:
    students = json.load(f)

# Process students with pin code coordinates
processed_students = []
for student in students:
    pincode = student['pinCode']
    lat, lng = get_coordinates_from_pincode(pincode)
    
    processed_students.append({
        'id': student['id'],
        'name': student['name'],
        'institute': student['institute'],
        'program': student['program'],
        'city': student['city'],
        'pinCode': pincode,
        'lat': lat,
        'lng': lng
    })

# Group students by pin code (more granular than city)
pin_groups = {}
for student in processed_students:
    pin_code = student['pinCode']
    if pin_code not in pin_groups:
        pin_groups[pin_code] = {
            'lat': student['lat'],
            'lng': student['lng'],
            'city': student['city'],
            'students': [],
            'pin_code': pin_code
        }
    pin_groups[pin_code]['students'].append(student)

# Create DataFrame for plotting
df = pd.DataFrame([
    {
        'pin_code': pin_code,
        'city': data['city'],
        'lat': data['lat'],
        'lng': data['lng'],
        'student_count': len(data['students']),
        'students': [f"{s['name']} ({s['institute']})" for s in data['students']]
    }
    for pin_code, data in pin_groups.items()
])

# Create beautiful Plotly map
fig = go.Figure()

# Add scatter plot for pin codes
fig.add_trace(go.Scattermap(
    lat=df['lat'],
    lon=df['lng'],
    mode='markers+text',
    marker=dict(
        size=df['student_count'] * 20,
        color=df['student_count'],
        colorscale='Viridis',
        showscale=True,
        colorbar=dict(title="Student Count")
    ),
    text=df['pin_code'],
    textposition="top center",
    textfont=dict(size=10, color='black'),
    hovertemplate=
    "<b>Pin Code: %{text}</b><br>" +
    "<b>City: %{customdata[0]}</b><br>" +
    "Students: %{marker.size}<br>" +
    "Details: %{customdata[1]}<br>" +
    "<extra></extra>",
    customdata=df[['city', 'students']]
))

# Update layout for India focus
fig.update_layout(
    title=dict(
        text="<b>Student Distribution by Pin Code Across India</b><br><sub>Interactive Map with Pin Code Coordinates</sub>",
        x=0.5,
        font=dict(size=20)
    ),
    mapbox=dict(
        style="open-street-map",
        center=dict(lat=22.9734, lon=78.6569),
        zoom=4.5,
        bounds=dict(
            west=68.0,
            east=97.5,
            south=6.5,
            north=37.5
        )
    ),
    width=1000,
    height=700,
    margin=dict(l=0, r=0, t=50, b=0)
)

# Add annotations for statistics
fig.add_annotation(
    x=0.02, y=0.98,
    xref="paper", yref="paper",
    text=f"<b>Total Students:</b> {len(processed_students)}<br><b>Total Pin Codes:</b> {len(pin_groups)}<br><b>Total Cities:</b> {len(set(s['city'] for s in processed_students))}",
    showarrow=False,
    bgcolor="rgba(255,255,255,0.8)",
    bordercolor="black",
    borderwidth=1,
    font=dict(size=12)
)

# Save as HTML
fig.write_html('public/india_plotly_pincode.html')

# Also save as static image
fig.write_image('public/india_plotly_pincode.png', width=1000, height=700, scale=2)

print("Pin Code-based Plotly India map saved as:")
print("- india_plotly_pincode.html (interactive)")
print("- india_plotly_pincode.png (static image)")
print(f"Total students: {len(processed_students)}")
print(f"Total pin codes: {len(pin_groups)}")

# Print detailed information
print("\nPin Code-wise distribution:")
for pin_code, data in pin_groups.items():
    print(f"\nPin Code {pin_code} - {data['city']} ({len(data['students'])} students):")
    for student in data['students']:
        print(f"  - {student['name']}: {student['institute']} ({student['program']})")
