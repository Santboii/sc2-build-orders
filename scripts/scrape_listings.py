import requests
from bs4 import BeautifulSoup
import sys
import json
import re

def scrape_listing(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
    }
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        builds = []
        # Finding the main table rows for builds. 
        # Spawning Tool usually has a table with class 'table' or similar in the listing.
        # It seems to be standard bootstrap table.
        
        # Look for links that match /build/12345/
        links = soup.find_all('a', href=re.compile(r'^/build/\d+/$'))
        
        for link in links:
            build_url = f"https://lotv.spawningtool.com{link['href']}"
            build_name = link.get_text(strip=True)
            
            # Filter out empty or "View" links if any
            if not build_name:
                continue
                
            # Filter out comments/ratings if they link to the same place, usually the main link is the title.
            # We can check parent tag. The title is usually in a td.
            
            builds.append({
                'name': build_name,
                'url': build_url,
                'id': link['href'].strip('/').split('/')[-1]
            })
            
        return builds
        
    except Exception as e:
        print(f"Error scraping {url}: {e}", file=sys.stderr)
        return []

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scrape_listings.py <url1> <url2> ...")
        sys.exit(1)
        
    all_builds = []
    for url in sys.argv[1:]:
        print(f"Scraping {url}...", file=sys.stderr)
        builds = scrape_listing(url)
        all_builds.extend(builds)
    
    # Deduplicate by URL
    seen_urls = set()
    unique_builds = []
    for b in all_builds:
        if b['url'] not in seen_urls:
            unique_builds.append(b)
            seen_urls.add(b['url'])
            
    print(json.dumps(unique_builds, indent=2))
