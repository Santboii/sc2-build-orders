import re
import os

# Paths
unit_data_path = '/Users/danielgalvez/coding/sc2-build-orderer/src/data/unitData.ts'
url_list_path = '/tmp/all_sc2_images.txt'
output_path = '/Users/danielgalvez/coding/sc2-build-orderer/src/data/unitData_new.ts'

# Read URLs
# Note: The agent might not have access to read /tmp directly via python if sandboxed, 
# but let's try. If it fails, I'll cat the file content into the script.
try:
    with open(url_list_path, 'r') as f:
        urls = [line.strip() for line in f if line.strip()]
except Exception as e:
    print(f"Error reading url list: {e}")
    urls = []

def find_url(name, race_hint=None):
    name_clean = name.strip()
    name_no_spaces = name_clean.replace(' ', '').replace('-', '')
    name_underscores = name_clean.replace(' ', '_')
    
    # Special cases
    if name_clean == "Auto-Turret":
        # Auto-turret_SC2_Icon1.jpg
        patterns = ["Auto-turret_SC2_Icon1.jpg"]
    else:
        # Patterns to check in order of preference
        patterns = [
            f"Icon_{race_hint}_{name_underscores}.jpg" if race_hint else None,
            f"{name_no_spaces}_SC2_Icon1.jpg",
            f"{name_underscores}_SC2_Icon1.jpg",
            f"Icon_{name_underscores}.jpg",
            f"{name_no_spaces}.jpg"
        ]
    
    for url in urls:
        for pattern in patterns:
            if pattern and pattern.lower() in url.lower():
                return url
    return None

# Read unitData.ts
with open(unit_data_path, 'r') as f:
    content = f.readlines()

new_content = []
current_unit_name = None
current_race = None

i = 0
while i < len(content):
    line = content[i]
    
    # Check for unit key: 'Name': {
    match_key = re.search(r"^\s*'([^']+)'\s*:\s*{", line)
    if match_key:
        current_unit_name = match_key.group(1)
        # Look ahead for race
        current_race = None
        for j in range(i + 1, min(i + 20, len(content))):
            race_match = re.search(r"race:\s*'([^']+)'", content[j])
            if race_match:
                current_race = race_match.group(1)
                break
        
        new_content.append(line)
        i += 1
        continue
        
    # Check for imageUrl line
    match_url = re.search(r"^(\s*)imageUrl:\s*'([^']*)',", line)
    if match_url and current_unit_name:
        indent = match_url.group(1)
        
        # Find new URL
        new_url = find_url(current_unit_name, current_race)
        
        if new_url:
            new_content.append(f"{indent}imageUrl: '{new_url}',\n")
            print(f"Updated {current_unit_name} -> {new_url}")
        else:
            new_content.append(line)
            print(f"WARNING: No URL found for {current_unit_name}")
            
        i += 1
        continue
        
    new_content.append(line)
    i += 1

with open(output_path, 'w') as f:
    f.writelines(new_content)

print("Done generating new unitData.ts")
