import pandas as pd  # pyright: ignore[reportMissingImports]
import plotly.express as px  # pyright: ignore[reportMissingImports]

# --- Sample Student Data ---
students = [
  {"id": "1", "name": "Student 1", "institute": "Jagannath University", "program": "BTech", "city": "Jaipur", "pinCode": "341533"},
  {"id": "2", "name": "Student 2", "institute": "Post Graduate Programs in Data Science and Analytics", "program": "BTech", "city": "Delhi", "pinCode": "322023"},
  {"id": "3", "name": "Student 3", "institute": "NIT Rourkela", "program": "MSc", "city": "Rourkela", "pinCode": "751030"},
  {"id": "4", "name": "Student 4", "institute": "Poornima College of Engineering", "program": "BTech", "city": "Jaipur", "pinCode": "302031"},
  {"id": "5", "name": "Student 5", "institute": "Dr BR Ambedkar Open University", "program": "BA", "city": "Hyderabad", "pinCode": "500035"},
  {"id": "6", "name": "Student 6", "institute": "MBM", "program": "B.E", "city": "Jodhpur", "pinCode": "311001"},
  {"id": "7", "name": "Student 7", "institute": "IIIT Bangalore", "program": "PG Diploma", "city": "Bangalore", "pinCode": "700118"},
  {"id": "8", "name": "Student 8", "institute": "Rajasthan University, CS & IT Department", "program": "M.Sc IT", "city": "Jaipur", "pinCode": "302034"},
  {"id": "9", "name": "Student 9", "institute": "Engineering College", "program": "BTech", "city": "Jaipur", "pinCode": "302021"},
  {"id": "10", "name": "Student 10", "institute": "RCEW", "program": "MTech", "city": "Jaipur", "pinCode": "302034"},
  {"id": "11", "name": "Student 11", "institute": "SBCET", "program": "BTech", "city": "Jaipur", "pinCode": "302012"},
  {"id": "12", "name": "Student 12", "institute": "Sri Balaji College of Engineering and Technology", "program": "BTech", "city": "Jaipur", "pinCode": "302012"},
  {"id": "13", "name": "Student 13", "institute": "Maharishi Arvind School of Management Studies", "program": "BCA", "city": "Jaipur", "pinCode": "302012"}
]

# --- Approx city coordinates (latitude, longitude) ---
city_coords = {
    "Jaipur": [26.9124, 75.7873],
    "Delhi": [28.7041, 77.1025],
    "Rourkela": [22.2492, 84.9016],
    "Hyderabad": [17.3850, 78.4867],
    "Jodhpur": [26.2389, 73.0243],
    "Bangalore": [12.9716, 77.5946]
}

# --- Convert to DataFrame ---
df = pd.DataFrame(students)
df['lat'] = df['city'].map(lambda x: city_coords[x][0])
df['lon'] = df['city'].map(lambda x: city_coords[x][1])

# --- Aggregate student counts per city ---
city_summary = df.groupby(['city', 'lat', 'lon']).size().reset_index(name='count')

# --- Create Map Visualization ---
fig = px.scatter_geo(
    city_summary,
    lat='lat',
    lon='lon',
    size='count',
    text='city',
    hover_name='city',
    hover_data={'count': True, 'lat': False, 'lon': False},
    projection='natural earth',
    title='📍 Distribution of Learners Across India'
)

# Focus on India region
fig.update_geos(
    scope='asia',
    showcountries=True,
    countrycolor='Black',
    fitbounds="locations",
    center=dict(lat=22.9734, lon=78.6569),
    lonaxis_range=[68, 97],
    lataxis_range=[6, 37]
)

fig.update_traces(marker=dict(color='royalblue', opacity=0.8, line=dict(width=1, color='white')))
fig.update_layout(title_x=0.5, title_font=dict(size=22))

# Save the map as HTML and PNG
fig.write_html('../public/india_plotly_try.html')
fig.write_image('../public/india_plotly_try.png', width=1000, height=700, scale=2)

print("Map saved as:")
print("- public/india_plotly_try.html (interactive)")
print("- public/india_plotly_try.png (static)")
print(f"Total students: {len(students)}")
print(f"Total cities: {len(city_summary)}")
