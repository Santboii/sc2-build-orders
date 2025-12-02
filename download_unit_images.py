import json
import os
import requests
import re
from urllib.parse import urlparse

# Ensure directory exists
output_dir = "public/images/units"
os.makedirs(output_dir, exist_ok=True)

# Load scraped data
with open('scraped_units.json', 'r') as f:
    units = json.load(f)

print(f"Found {len(units)} units to process.")

downloaded_count = 0
errors = []

for name, data in units.items():
    url = data.get('imageUrl')
    if not url:
        print(f"Skipping {name}: No URL")
        continue

    # Clean name for filename (remove special chars, spaces to underscores if needed, but keeping it simple for now)
    # The user wants consistent naming. Let's use the key name but sanitized.
    safe_name = re.sub(r'[^a-zA-Z0-9_-]', '', name.replace(' ', '_'))
    
    # Determine extension from URL or default to .jpg
    path = urlparse(url).path
    ext = os.path.splitext(path)[1]
    if not ext:
        ext = '.jpg'
    
    filename = f"{safe_name}{ext}"
    filepath = os.path.join(output_dir, filename)
    
    print(f"Downloading {name} -> {filename}...")
    
    try:
        response = requests.get(url, stream=True, timeout=10)
        response.raise_for_status()
        
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        downloaded_count += 1
        
    except Exception as e:
        print(f"Error downloading {name}: {e}")
        errors.append(name)

print(f"Finished. Downloaded {downloaded_count} images.")
if errors:
    print(f"Failed to download: {errors}")
