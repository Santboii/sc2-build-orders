import requests
import os

# Ensure directory exists
output_dir = "public/images/races"
os.makedirs(output_dir, exist_ok=True)

images = {
    "zerg": "https://liquipedia.net/commons/images/2/26/Hydralisk_SC1_Art2.jpg",
    "terran": "https://liquipedia.net/commons/images/6/69/Marine_SC1_Art3.jpg",
    "protoss": "https://liquipedia.net/commons/images/5/52/Zealot_SC1_Art1.jpg"
}

for race, url in images.items():
    filename = f"{race}.jpg"
    filepath = os.path.join(output_dir, filename)
    
    print(f"Downloading {race} -> {filename}...")
    
    try:
        # User-Agent might be needed for some sites
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(url, headers=headers, stream=True, timeout=10)
        response.raise_for_status()
        
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        print(f"Successfully downloaded {filename}")
        
    except Exception as e:
        print(f"Error downloading {race}: {e}")
