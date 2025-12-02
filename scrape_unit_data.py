import requests
from bs4 import BeautifulSoup
import json
import re

url = "https://starcraft.fandom.com/wiki/List_of_StarCraft_II_units"

def scrape_data():
    try:
        response = requests.get(url)
        response.raise_for_status()
    except Exception as e:
        print(f"Error fetching URL: {e}")
        return

    soup = BeautifulSoup(response.content, 'html.parser')
    
    units = {}
    current_race = None
    
    # The page content is in mw-parser-output
    content = soup.find('div', class_='mw-parser-output')
    if not content:
        print("Could not find content div")
        return

    # Iterate through elements to track race and find units
    # Debug: Find Medivac to see where it is
    medivac = soup.find('a', title='Medivac dropship')
    if medivac:
        print(f"DEBUG: Found Medivac link. Parent: {medivac.parent.name}, Grandparent: {medivac.parent.parent.name}")
        # Print a bit of context
        print(f"DEBUG: Context: {medivac.parent.parent.prettify()[:200]}...")
    else:
        print("DEBUG: Could not find Medivac link via soup.find")

    for element in content.children:
        if element.name == 'h2':
            headline = element.find('span', class_='mw-headline')
            if headline:
                text = headline.text.strip()
                if text in ['Terran', 'Protoss', 'Zerg']:
                    current_race = text
                    print(f"Found Race Section: {current_race}")
        
        if not current_race:
            continue
            
    # Iterate through headers and tables in order
    elements = soup.find_all(['h2', 'table'])
    
    print(f"DEBUG: Found {len(elements)} elements (h2 or table)")
    
    for element in elements:
        print(f"DEBUG: Processing element: {element.name}")
        
        if element.name == 'h2':
            headline = element.find('span', class_='mw-headline')
            if headline:
                text = headline.text.strip()
                if text in ['Terran', 'Protoss', 'Zerg']:
                    current_race = text
                    print(f"Found Race Section: {current_race}")
        
        if not current_race:
            continue
            
        if element.name == 'table':
            print(f"DEBUG: Found table under {current_race}")
            # Parse table
            rows = element.find_all('tr')
            print(f"DEBUG: Table has {len(rows)} rows")
            
            for row in rows:
                cells = row.find_all(['td', 'th'])
                if len(cells) < 3:
                    continue
                
                # Assume structure: [Image, Name, Description]
                # But sometimes it might be different headers.
                # Let's check if the first cell has an image and second has a link.
                
                img_cell = cells[0]
                name_cell = cells[1]
                desc_cell = cells[2]
                
                # 1. Extract Image
                image_url = None
                img_tags = img_cell.find_all('img')
                for img in img_tags:
                    # Prioritize data-src for lazy loaded images
                    src = img.get('data-src') or img.get('src')
                    if src:
                        image_url = src
                        break
                
                # 2. Extract Name
                name = None
                # Try b > a
                bold_tag = name_cell.find(['b', 'strong'])
                if bold_tag:
                    name_link = bold_tag.find('a')
                    if name_link:
                        name = name_link.text.strip()
                
                # Fallback for name: direct link
                if not name:
                    link = name_cell.find('a')
                    if link:
                        name = link.text.strip()

                # 3. Extract Description
                description = desc_cell.text.strip()
                # Clean up description
                description = re.sub(r'^[\s\-\:]+', '', description)
                description = ' '.join(description.split())

                if image_url and name:
                    # Clean up name
                    clean_name = name
                    if "Dropship" in name and "Medivac" in name:
                        clean_name = "Medivac"
                    
                    # Clean URL
                    image_url = re.sub(r'/scale-to-width-down/\d+', '', image_url)
                    
                    units[clean_name] = {
                        'name': clean_name,
                        'imageUrl': image_url,
                        'description': description,
                        'race': current_race,
                        'type': 'unit' 
                    }
                    print(f"Scraped: {clean_name} ({current_race})")

    # Also need to handle Buildings if they are listed separately or differently
    # The wiki page lists "Structures" under subheadings.
    # We might need to detect "Structures" h3/h4 to set type='building'
    
    # Let's refine the loop to handle type detection
    
    return units

# Run scraping
scraped_units = scrape_data()

# Now we need to merge this with our existing unitData keys
# We only want to update units that exist in our app, or maybe add new ones if useful.
# For now, let's just output what we found to a file so we can inspect/merge in TS.

if scraped_units:
    with open('scraped_units.json', 'w') as f:
        json.dump(scraped_units, f, indent=4)
    print(f"Saved {len(scraped_units)} units to scraped_units.json")
else:
    print("No units found.")
