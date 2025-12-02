import requests
import os

# Ensure directory exists
output_dir = "public/images/logos"
os.makedirs(output_dir, exist_ok=True)

logos = {
    "terran": "https://static.thenounproject.com/png/terran-icon-2343541-512.png",
    "zerg": "https://static.thenounproject.com/png/zerg-icon-2343543-512.png",
    "protoss": "https://static.thenounproject.com/png/protoss-icon-2343537-512.png"
}

for race, url in logos.items():
    filename = f"{race}_logo.png"
    filepath = os.path.join(output_dir, filename)
    
    print(f"Downloading {race} -> {filename}...")
    
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(url, headers=headers, stream=True, timeout=10)
        response.raise_for_status()
        
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        print(f"Successfully downloaded {filename}")
        
    except Exception as e:
        print(f"Error downloading {race}: {e}")
