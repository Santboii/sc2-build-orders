import json
import re
import difflib
import sys

def find_matches():
    # Load available builds
    with open('available_builds.json', 'r') as f:
        available = json.load(f)
        
    # Parse buildOrders.ts to find missing URLs
    with open('src/data/buildOrders.ts', 'r') as f:
        content = f.read()
        
    # Rough parsing of TS objects to find those without spawningToolUrl
    # We look for { ... id: '...', ... } blocks
    # This is a bit hacky but sufficient if formatting is consistent
    
    # Split by "{" to get blocks, roughly
    # Actually, let's just use regex to find ids and names, and check if spawningToolUrl is in the vicinity?
    # No, that's hard.
    
    # Better approach: Iterate over the file line by line, detecting simple object boundaries.
    # Our file is well formatted.
    
    missing_builds = []
    
    # Regex to capture build objects
    # Assumes standard formatting: id: '...', name: '...', ...
    object_pattern = re.compile(r"\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',", re.DOTALL)
    
    # Find all matches in file
    # We need to check if propertiy string contains spawningToolUrl
    # Let's just split the file by "    }," which ends objects in our file
    chunks = content.split('    },')
    
    for chunk in chunks:
        id_match = re.search(r"id:\s*'([^']+)'", chunk)
        name_match = re.search(r"name:\s*'([^']+)'", chunk)
        
        if id_match and name_match:
            b_id = id_match.group(1)
            b_name = name_match.group(1)
            
            if "spawningToolUrl:" not in chunk:
                missing_builds.append({'id': b_id, 'name': b_name})

    print(f"Found {len(available)} available builds from Spawning Tool.")
    print(f"Found {len(missing_builds)} missing builds in buildOrders.ts.")
    
    matches = []
    used_indices = set()
    
    print("\nMatches found:")
    for mb in missing_builds:
        # Simple fuzzy match on name
        best_ratio = 0
        best_match = None
        best_index = -1
        
        for i, ab in enumerate(available):
            # Check match name vs name
            ratio = difflib.SequenceMatcher(None, mb['name'].lower(), ab['name'].lower()).ratio()
            
            # Boost if ID is in URL?
            # e.g. "hellion-reaper" in "hellion-reaper-vs-zerg"
            if mb['id'].replace('-', ' ') in ab['name'].lower():
                ratio += 0.3
                
            if ratio > best_ratio:
                best_ratio = ratio
                best_match = ab
                best_index = i
        
        if best_ratio > 0.4: # Threshold
            matches.append({
                'id': mb['id'],
                'current_name': mb['name'],
                'match_name': best_match['name'],
                'url': best_match['url'],
                'score': best_ratio
            })
            # unique check logic later
            
    print(json.dumps(matches, indent=2))

if __name__ == "__main__":
    find_matches()
