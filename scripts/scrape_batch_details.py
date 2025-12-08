import requests
from bs4 import BeautifulSoup
import sys
import json
import re
import time

def scrape_build_details(url):
    headers = {
        'User-Agent': 'Mozilla/5.0'
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        # Handle 429 or errors
        if response.status_code != 200:
            print(f"Failed to fetch {url}: {response.status_code}")
            return None
            
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # 1. Metadata
        title_tag = soup.find('h1')
        full_title = title_tag.get_text(strip=True) if title_tag else "Unknown Build"
        
        # Extract Matchup from title "Title (Matchup Style)"
        matchup = "PvX" # Default
        build_type = "Economic"
        
        # Pattern: Name (Matchup Type)
        m = re.search(r'\(([^)]+)\)$', full_title)
        if m:
            meta_part = m.group(1).split()
            if len(meta_part) > 0:
                matchup = meta_part[0]
            if len(meta_part) > 1:
                build_type = " ".join(meta_part[1:])
        
        name = re.sub(r'\s*\([^)]+\)$', '', full_title).strip()
        
        # Infer properties
        race = 'Protoss'
        vs_race = 'Protoss'
        if matchup:
            if matchup.startswith('P'): race = 'Protoss'
            elif matchup.startswith('T'): race = 'Terran'
            elif matchup.startswith('Z'): race = 'Zerg'
            
            if matchup.endswith('P'): vs_race = 'Protoss'
            elif matchup.endswith('T'): vs_race = 'Terran'
            elif matchup.endswith('Z'): vs_race = 'Zerg'
        
        # Author / Difficulty / Description
        author = "Unknown"
        difficulty = "Intermediate" # Default
        description = ""
        
        # Spawning tool usually lists details in a ul/li or similar
        # Based on previous reading: "Created by: sc2ool" in text
        # We can just search text
        text = soup.get_text()
        m_author = re.search(r'Created by:\s*([^\n]+)', text)
        if m_author: author = m_author.group(1).strip()
        
        # Description is often under an h3 Description
        # We'll skip complex description scraping for now as it's unstructured HTML
        
        # SALT
        salt_encoding = None
        salt_container = soup.find(class_='salt-encoding')
        if salt_container:
           if salt_container.name in ['input', 'textarea']:
               salt_encoding = salt_container.get('value') or salt_container.get_text()
           else:
               salt_encoding = salt_container.get_text()
        
        if not salt_encoding:
             match = re.search(r'\$\d+\|spawningtool\.com\|\|[A-Za-z0-9+/=?!@#$%^&*()<>:;"\',.\-\[\]_ ]+', response.text)
             if match: salt_encoding = match.group(0)

        # Steps
        steps = []
        build_table = soup.find('table', class_='build-table')
        if build_table:
            rows = build_table.find_all('tr')
            for row in rows:
                cols = row.find_all('td')
                if len(cols) >= 3:
                    supply_text = cols[0].get_text(strip=True)
                    time_text = cols[1].get_text(strip=True)
                    action_text = cols[2].get_text(strip=True)
                    
                    supply_digits = re.sub(r'[^\d]', '', supply_text)
                    if supply_digits and action_text:
                         steps.append({
                            'supply': int(supply_digits),
                            'timing': time_text,
                            'action': action_text
                        })
        
        return {
            'name': name,
            'race': race,
            'vsRace': vs_race,
            'matchup': matchup,
            'difficulty': difficulty,
            'buildType': build_type,
            'playStyle': "Imported from Spawning Tool",
            'goals': [],
            'steps': steps,
            'saltEncoding': salt_encoding,
            'spawningToolUrl': url,
            'author': author,
            'patch': '5.0.14' # Assume recent
        }

    except Exception as e:
        print(f"Error {url}: {e}")
        return None

if __name__ == "__main__":
    # Load inputs
    def load_json_with_header(filename):
        with open(filename, 'r') as f:
            content = f.read()
            # Find start of JSON list
            start = content.find('[')
            if start != -1:
                return json.loads(content[start:])
            return []

    matches = load_json_with_header('build_matches.json')
    available = load_json_with_header('available_builds.json')
        
    url_to_id = {m['url']: m['id'] for m in matches if m['score'] > 0.65} # Threshold for override
    
    # Process all available
    results = []
    seen = set()
    
    print(f"Scraping {len(available)} builds...")
    
    for i, item in enumerate(available):
        url = item['url']
        if url in seen: continue
        seen.add(url)
        
        # Decide ID
        if url in url_to_id:
            b_id = url_to_id[url]
        else:
            # Generate ID from Spawning Tool slug: /build/12345/ -> 12345
            # Or use name slug. Let's use name-slug for readability if possible, or build-id
            # Existing ids are like 'pvz-benchmark'.
            # Spawning tool ID is unique.
            sp_id = url.strip('/').split('/')[-1]
            slug = item['name'].lower().replace(' ', '-').replace('/', '-').replace('(', '').replace(')', '')
            slug = re.sub(r'-+', '-', slug)
            b_id = f"{slug}-{sp_id}"
            
        print(f"[{i+1}/{len(available)}] {b_id}...", end='', flush=True)
        
        data = scrape_build_details(url)
        if data:
            data['id'] = b_id
            # Preserve original ID if it was a match?
            # Yes, if matches, we use the match ID.
            results.append(data)
            print(" Done")
        else:
            print(" Failed")
            
        time.sleep(0.5) # Be nice
        
    with open('scraped_builds_full.json', 'w') as f:
        json.dump(results, f, indent=2)
