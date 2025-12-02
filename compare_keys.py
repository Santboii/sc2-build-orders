import json
import re

# Read scraped data
with open('scraped_units.json', 'r') as f:
    scraped_units = json.load(f)

# Read existing unitData.ts
with open('src/data/unitData.ts', 'r') as f:
    content = f.read()

# Extract keys from unitData.ts using regex
# Pattern: 'Key': { or "Key": {
existing_keys = re.findall(r"['\"]([^'\"]+)['\"]\s*:\s*{", content)

print(f"Existing keys: {len(existing_keys)}")
print(f"Scraped keys: {len(scraped_units)}")

missing_in_scraped = [k for k in existing_keys if k not in scraped_units]
print(f"Missing in scraped: {len(missing_in_scraped)}")
for k in missing_in_scraped:
    print(f" - {k}")

extra_in_scraped = [k for k in scraped_units if k not in existing_keys]
print(f"Extra in scraped: {len(extra_in_scraped)}")
# for k in extra_in_scraped:
#     print(f" + {k}")
