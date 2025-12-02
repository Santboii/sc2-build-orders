import json
import re
import os

# Read scraped data
with open('scraped_units.json', 'r') as f:
    scraped_units = json.load(f)

# Create a lookup map for case-insensitive matching
scraped_lookup = {k.lower(): v for k, v in scraped_units.items()}

# Read existing unitData.ts
with open('src/data/unitData.ts', 'r') as f:
    lines = f.readlines()

new_lines = []
current_key = None
current_scraped_data = None

key_pattern = re.compile(r"^\s*['\"]([^'\"]+)['\"]\s*:\s*{")
image_pattern = re.compile(r"^(\s*imageUrl:\s*['\"])([^'\"]*)(['\"],?)")

updated_count = 0

for line in lines:
    # Check for key start
    match = key_pattern.match(line)
    if match:
        key = match.group(1)
        current_key = key
        # Find corresponding scraped data
        if key in scraped_units:
            current_scraped_data = scraped_units[key]
        elif key.lower() in scraped_lookup:
            current_scraped_data = scraped_lookup[key.lower()]
        else:
            current_scraped_data = None
        
        new_lines.append(line)
        continue
    
    # If inside a block we want to update
    if current_key and current_scraped_data:
        # Check for imageUrl
        img_match = image_pattern.match(line)
        if img_match:
            prefix = img_match.group(1)
            suffix = img_match.group(3)
            
            # Construct local path
            # Logic must match download_unit_images.py: 
            # safe_name = re.sub(r'[^a-zA-Z0-9_-]', '', name.replace(' ', '_'))
            # But here we use the Key from scraped_units which is what we used to download.
            # Wait, download script used the key from scraped_units.
            # So if we matched 'Missile Turret' (ts) to 'Missile turret' (scraped),
            # the file is named 'Missile_turret.jpg' (based on scraped key).
            
            scraped_name = current_scraped_data['name'] # This is the key in scraped_units usually, or close to it.
            # Actually scraped_units keys ARE the names.
            # Let's find the key in scraped_units that corresponds to current_scraped_data
            # It's a bit circular but current_scraped_data IS the value.
            # We need the key used in download script.
            
            # In download script:
            # for name, data in units.items():
            #    safe_name = re.sub(r'[^a-zA-Z0-9_-]', '', name.replace(' ', '_'))
            
            # So we need to find the key in scraped_units.
            # We can find it by looking up which key gave us current_scraped_data
            # or just use the name from data if it matches the key.
            # In scraped_units.json, key usually equals name.
            
            scraped_key = current_scraped_data['name'] # This should be safe.
            safe_name = re.sub(r'[^a-zA-Z0-9_-]', '', scraped_key.replace(' ', '_'))
            
            # Extension: we assumed .jpg in download script if not present.
            # But wait, download script checked extension from URL.
            # We need to be careful.
            # Let's assume .jpg for now as most were .jpg.
            # Or better, check which file exists.
            
            local_filename = f"{safe_name}.jpg"
            # Check if png exists just in case
            if not os.path.exists(f"public/images/units/{local_filename}"):
                 if os.path.exists(f"public/images/units/{safe_name}.png"):
                     local_filename = f"{safe_name}.png"
            
            new_url = f"/images/units/{local_filename}"
            
            new_lines.append(f"{prefix}{new_url}{suffix}\n")
            updated_count += 1
            continue
            
    # Check for end of block
    if re.match(r"^\s*},?", line):
        current_key = None
        current_scraped_data = None
    
    new_lines.append(line)

print(f"Updated {updated_count} fields to local paths.")

with open('src/data/unitData.ts', 'w') as f:
    f.writelines(new_lines)
