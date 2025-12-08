import requests
from bs4 import BeautifulSoup
import sys
import json
import re

def scrape_spawning_tool(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
    }
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        build_table = soup.find('table', class_='build-table')
        if not build_table:
            print(f"Error: Could not find build table in {url}", file=sys.stderr)
            return None
            
        # Try to find SALT encoding
        salt_encoding = None
        # content is often in a textarea that might be hidden or shown via JS
        # checking for common container classes or ids
        salt_container = soup.find(class_='salt-encoding')
        if salt_container:
            if salt_container.name == 'input' or salt_container.name == 'textarea':
                salt_encoding = salt_container.get('value') or salt_container.get_text()
            else:
                salt_encoding = salt_container.get_text()
        
        # Fallback: look for the specific pattern in the raw text if not found in DOM
        if not salt_encoding:
            # simple regex for the salt format based on user example
            match = re.search(r'\$\d+\|spawningtool\.com\|\|[A-Za-z0-9+/=?!@#$%^&*()<>:;"\',.\-\[\]_ ]+', response.text)
            if match:
                salt_encoding = match.group(0)

        steps = []
        rows = build_table.find_all('tr')
        
        for row in rows:
            cols = row.find_all('td')
            if len(cols) >= 4:
                supply_text = cols[0].get_text(strip=True)
                time_text = cols[1].get_text(strip=True)
                action_text = cols[2].get_text(strip=True)
                
                # Clean up supply (remove + if present)
                supply = re.sub(r'[^\d]', '', supply_text)
                
                if supply and action_text:
                    steps.append({
                        'supply': int(supply),
                        'timing': time_text,
                        'action': action_text
                    })
                    
        return {
            'saltEncoding': salt_encoding,
            'steps': steps
        }
        
    except Exception as e:
        print(f"Error scraping {url}: {e}", file=sys.stderr)
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scrape_timings.py <url>")
        sys.exit(1)
        
    url = sys.argv[1]
    result = scrape_spawning_tool(url)
    
    if result:
        print(json.dumps(result, indent=2))
    else:
        sys.exit(1)
