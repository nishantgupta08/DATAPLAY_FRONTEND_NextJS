import plotly.graph_objects as go
import plotly.express as px
import json
import pandas as pd

# Load student data
with open('data/learners.json', 'r') as f:
    students = json.load(f)

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

# Create DataFrame for plotting
df = pd.DataFrame([
    {
        'city': city,
        'lat': data['lat'],
        'lng': data['lng'],
        'student_count': len(data['students']),
        'pin_codes': ', '.join(sorted(data['pin_codes'])),
        'students': [f"{s['name']} (Pin: {s['pinCode']})" for s in data['students']]
    }
    for city, data in cities.items()
])

# Create beautiful Plotly map
fig = go.Figure()

# Add scatter plot for cities
fig.add_trace(go.Scattermap(
    lat=df['lat'],
    lon=df['lng'],
    mode='markers+text',
    marker=dict(
        size=df['student_count'] * 15,
        color=df['student_count'],
        colorscale='Viridis',
        showscale=True,
        colorbar=dict(title="Student Count")
    ),
    text=df['city'],
    textposition="top center",
    textfont=dict(size=12, color='black'),
    hovertemplate=
    "<b>%{text}</b><br>" +
    "Students: %{marker.size}<br>" +
    "Pin Codes: %{customdata[0]}<br>" +
    "<extra></extra>",
    customdata=df[['pin_codes', 'students']]
))

# Update layout for India focus
fig.update_layout(
    title=dict(
        text="<b>Student Distribution Across India</b><br><sub>Interactive Map with Pin Codes</sub>",
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
    text=f"<b>Total Students:</b> {len(students)}<br><b>Total Cities:</b> {len(cities)}",
    showarrow=False,
    bgcolor="rgba(255,255,255,0.8)",
    bordercolor="black",
    borderwidth=1,
    font=dict(size=12)
)

# Save as HTML
fig.write_html('public/india_plotly_map.html')

# Also save as static image
fig.write_image('public/india_plotly_map.png', width=1000, height=700, scale=2)

print("Beautiful Plotly India map saved as:")
print("- india_plotly_map.html (interactive)")
print("- india_plotly_map.png (static image)")
print(f"Total students: {len(students)}")
print(f"Total cities: {len(cities)}")

# Print detailed information
print("\nCity-wise distribution:")
for city, data in cities.items():
    print(f"\n{city} ({len(data['students'])} students):")
    for student in data['students']:
        print(f"  - {student['name']}: Pin {student['pinCode']} ({student['institute']})")
