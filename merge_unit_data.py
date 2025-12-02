import json
import re

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
desc_pattern = re.compile(r"^(\s*description:\s*['\"])([^'\"]*)(['\"],?)")

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
            print(f"Matched {key} with {current_scraped_data['name']}")
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
            new_url = current_scraped_data['imageUrl']
            new_lines.append(f"{prefix}{new_url}{suffix}\n")
            continue
            
        # Check for description
        desc_match = desc_pattern.match(line)
        if desc_match:
            prefix = desc_match.group(1)
            suffix = desc_match.group(3)
            new_desc = current_scraped_data['description'].replace("'", "\\'")
            new_lines.append(f"{prefix}{new_desc}{suffix}\n")
            updated_count += 1
            continue
            
    # Check for end of block (heuristic: line with just closing brace and comma)
    if re.match(r"^\s*},?", line):
        current_key = None
        current_scraped_data = None
    
    new_lines.append(line)

print(f"Updated {updated_count} fields (approx {updated_count//2} units)")

with open('src/data/unitData.ts', 'w') as f:
    f.writelines(new_lines)
