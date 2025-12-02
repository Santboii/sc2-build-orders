import os
import requests
import re

# Define the upgrades and their URLs (from upgradesData.ts)
upgrades = {
    'metabolic_boost': 'https://static.wikia.nocookie.net/starcraft/images/1/16/MetabolicBoost_SC2_Zergling.png/revision/latest',
    'adrenal_glands': 'https://static.wikia.nocookie.net/starcraft/images/8/80/AdrenalGlands_SC2_Game1.png/revision/latest',
    'melee_attacks_1': 'https://static.wikia.nocookie.net/starcraft/images/8/85/SC2ZergMelee.jpg/revision/latest',
    'melee_attacks_2': 'https://static.wikia.nocookie.net/starcraft/images/8/85/SC2ZergMelee.jpg/revision/latest',
    'melee_attacks_3': 'https://static.wikia.nocookie.net/starcraft/images/8/85/SC2ZergMelee.jpg/revision/latest',
    'missile_attacks_1': 'https://static.wikia.nocookie.net/starcraft/images/0/0d/SC2_ZergMissileWeap.gif/revision/latest',
    'missile_attacks_2': 'https://static.wikia.nocookie.net/starcraft/images/0/0d/SC2_ZergMissileWeap.gif/revision/latest',
    'missile_attacks_3': 'https://static.wikia.nocookie.net/starcraft/images/0/0d/SC2_ZergMissileWeap.gif/revision/latest',
    'ground_carapace_1': 'https://static.wikia.nocookie.net/starcraft/images/d/d4/SC2_ZergGrndCara.gif/revision/latest',
    'ground_carapace_2': 'https://static.wikia.nocookie.net/starcraft/images/d/d4/SC2_ZergGrndCara.gif/revision/latest',
    'ground_carapace_3': 'https://static.wikia.nocookie.net/starcraft/images/d/d4/SC2_ZergGrndCara.gif/revision/latest',
    'grooved_spines': 'https://static.wikia.nocookie.net/starcraft/images/7/79/GroovedSpines_SC2_Icon1.jpg/revision/latest',
    'muscular_augments': 'https://static.wikia.nocookie.net/starcraft/images/a/af/SC2_Zagara_AC_-_MassFrenzy.png/revision/latest',
    'stim_pack': 'https://static.wikia.nocookie.net/starcraft/images/f/fd/SC2StimPack.jpg/revision/latest',
    'combat_shield': 'https://static.wikia.nocookie.net/starcraft/images/4/44/SC2MarineShield.jpg/revision/latest',
    'infantry_weapons_1': 'https://static.wikia.nocookie.net/starcraft/images/2/2e/SC2_TerrInfWeap.gif/revision/latest',
    'infantry_weapons_2': 'https://static.wikia.nocookie.net/starcraft/images/2/2e/SC2_TerrInfWeap.gif/revision/latest',
    'infantry_weapons_3': 'https://static.wikia.nocookie.net/starcraft/images/2/2e/SC2_TerrInfWeap.gif/revision/latest',
    'infantry_armor_1': 'https://static.wikia.nocookie.net/starcraft/images/d/d7/SC2_TerrInfArm.gif/revision/latest',
    'infantry_armor_2': 'https://static.wikia.nocookie.net/starcraft/images/d/d7/SC2_TerrInfArm.gif/revision/latest',
    'infantry_armor_3': 'https://static.wikia.nocookie.net/starcraft/images/d/d7/SC2_TerrInfArm.gif/revision/latest',
}

# Directory to save images
save_dir = 'public/images/upgrades'
os.makedirs(save_dir, exist_ok=True)

def download_image(name, url):
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        # Determine extension from URL or content type, default to .jpg if unknown
        ext = '.jpg'
        if '.png' in url.lower():
            ext = '.png'
        elif '.gif' in url.lower():
            ext = '.gif'
            
        filename = f"{name}{ext}"
        filepath = os.path.join(save_dir, filename)
        
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(1024):
                f.write(chunk)
        
        print(f"Downloaded {name} to {filepath}")
        return f"/images/upgrades/{filename}"
        
    except Exception as e:
        print(f"Failed to download {name}: {e}")
        return None

# Download all images
for name, url in upgrades.items():
    download_image(name, url)

print("Download complete!")
