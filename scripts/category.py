import json
import glob


def add_category_to_geojson(file):

    # Open the GeoJSON file
    with open(file, 'r') as f:
        data = json.load(f)

    # Add "category": "cafe" to each feature's properties
    for feature in data['features']:
        feature['properties']['category'] = 'cafe'

    # Write the updated GeoJSON back to the file
    with open(file, 'w') as f:
        json.dump(data, f, indent=2)

    print('Successfully added "category": "cafe" to all features')

# travel on *.geojson file in data folder
for file in glob.glob('data/*.geojson'):
    add_category_to_geojson(file)