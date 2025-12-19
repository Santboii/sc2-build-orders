export const unitCosts: Record<string, { minerals: number; gas: number }> = {
    // Terran Units
    'SCV': { minerals: 50, gas: 0 },
    'Marine': { minerals: 50, gas: 0 },
    'Marauder': { minerals: 100, gas: 25 },
    'Reaper': { minerals: 50, gas: 50 },
    'Ghost': { minerals: 150, gas: 125 },
    'Hellion': { minerals: 100, gas: 0 },
    'Hellbat': { minerals: 100, gas: 0 }, // Transform is free usually, but building from factory is 100/0
    'Widow Mine': { minerals: 75, gas: 25 },
    'Siege Tank': { minerals: 150, gas: 125 },
    'Cyclone': { minerals: 150, gas: 100 },
    'Thor': { minerals: 300, gas: 200 },
    'Viking': { minerals: 150, gas: 75 },
    'Medivac': { minerals: 100, gas: 100 },
    'Liberator': { minerals: 150, gas: 150 },
    'Raven': { minerals: 100, gas: 200 }, // Changed in patches, check current? Usually 100/200 or 100/150. LotV is 100/200.
    'Banshee': { minerals: 150, gas: 100 },
    'Battlecruiser': { minerals: 400, gas: 300 },

    // Terran Buildings
    'Command Center': { minerals: 400, gas: 0 },
    'Orbital Command': { minerals: 150, gas: 0 }, // Upgrade cost
    'Planetary Fortress': { minerals: 150, gas: 150 }, // Upgrade cost
    'Supply Depot': { minerals: 100, gas: 0 },
    'Refinery': { minerals: 75, gas: 0 },
    'Barracks': { minerals: 150, gas: 0 },
    'Engineering Bay': { minerals: 125, gas: 0 },
    'Bunker': { minerals: 100, gas: 0 },
    'Missile Turret': { minerals: 100, gas: 0 },
    'Sensor Tower': { minerals: 125, gas: 100 },
    'Factory': { minerals: 150, gas: 100 },
    'Ghost Academy': { minerals: 150, gas: 50 },
    'Armory': { minerals: 150, gas: 100 },
    'Starport': { minerals: 150, gas: 100 },
    'Fusion Core': { minerals: 150, gas: 150 },
    'Tech Lab': { minerals: 50, gas: 25 },
    'Reactor': { minerals: 50, gas: 50 },
    'Barracks Tech Lab': { minerals: 50, gas: 25 },
    'Barracks Reactor': { minerals: 50, gas: 50 },
    'Factory Tech Lab': { minerals: 50, gas: 25 },
    'Factory Reactor': { minerals: 50, gas: 50 },
    'Starport Tech Lab': { minerals: 50, gas: 25 },
    'Starport Reactor': { minerals: 50, gas: 50 },

    // Zerg Units
    'Drone': { minerals: 50, gas: 0 },
    'Queen': { minerals: 150, gas: 0 },
    'Zergling': { minerals: 50, gas: 0 }, // Special handling for count/2
    'Baneling': { minerals: 25, gas: 25 }, // Morph cost
    'Roach': { minerals: 75, gas: 25 },
    'Ravager': { minerals: 25, gas: 75 }, // Morph cost
    'Hydralisk': { minerals: 100, gas: 50 },
    'Lurker': { minerals: 50, gas: 100 }, // Morph cost from Hydra
    'Infestor': { minerals: 100, gas: 150 },
    'Swarm Host': { minerals: 100, gas: 75 },
    'Ultralisk': { minerals: 300, gas: 200 },
    'Overlord': { minerals: 100, gas: 0 },
    'Overseer': { minerals: 50, gas: 50 }, // Morph cost
    'Mutalisk': { minerals: 100, gas: 100 },
    'Corruptor': { minerals: 150, gas: 100 },
    'Brood Lord': { minerals: 150, gas: 150 }, // Morph cost from Corruptor
    'Viper': { minerals: 100, gas: 200 },

    // Zerg Buildings
    'Hatchery': { minerals: 300, gas: 0 },
    'Lair': { minerals: 150, gas: 100 }, // Upgrade
    'Hive': { minerals: 200, gas: 150 }, // Upgrade
    'Extractor': { minerals: 25, gas: 0 }, // Drone cost (50) returned in Zerg building logic? No, Zerg buildings consume drone.
    // Standard notation usually implies the cost of the building ITSELF, excluding the drone.
    // Hatchery is 300. (Plus drone 50 = 350 assets). But you need 300 in bank.
    // Extractor is 25.
    'Spawning Pool': { minerals: 200, gas: 0 },
    'Evolution Chamber': { minerals: 75, gas: 0 },
    'Spine Crawler': { minerals: 100, gas: 0 },
    'Spore Crawler': { minerals: 75, gas: 0 },
    'Roach Warren': { minerals: 150, gas: 0 },
    'Baneling Nest': { minerals: 100, gas: 50 },
    'Hydralisk Den': { minerals: 100, gas: 100 },
    'Lurker Den': { minerals: 100, gas: 150 }, // Upgrade? Or building? Lurker Den is morphed from Hydra Den. Cost 100/150.
    'Spire': { minerals: 200, gas: 200 },
    'Greater Spire': { minerals: 100, gas: 150 }, // Upgrade
    'Infestation Pit': { minerals: 100, gas: 100 },
    'Ultralisk Cavern': { minerals: 150, gas: 200 },
    'Nydus Network': { minerals: 150, gas: 200 },
    'Nydus Worm': { minerals: 50, gas: 50 },

    // Protoss Units
    'Probe': { minerals: 50, gas: 0 },
    'Zealot': { minerals: 100, gas: 0 },
    'Stalker': { minerals: 125, gas: 50 },
    'Sentry': { minerals: 50, gas: 100 },
    'Adept': { minerals: 100, gas: 25 },
    'High Templar': { minerals: 50, gas: 150 },
    'Dark Templar': { minerals: 125, gas: 125 },
    'Archon': { minerals: 0, gas: 0 }, // Merge
    'Observer': { minerals: 25, gas: 75 },
    'Warp Prism': { minerals: 200, gas: 0 },
    'Immortal': { minerals: 275, gas: 100 },
    'Colossus': { minerals: 300, gas: 200 },
    'Disruptor': { minerals: 150, gas: 150 },
    'Phoenix': { minerals: 150, gas: 100 },
    'Void Ray': { minerals: 250, gas: 150 },
    'Oracle': { minerals: 150, gas: 150 },
    'Tempest': { minerals: 250, gas: 175 },
    'Carrier': { minerals: 350, gas: 250 },
    'Mothership': { minerals: 400, gas: 400 },

    // Protoss Buildings
    'Nexus': { minerals: 400, gas: 0 },
    'Pylon': { minerals: 100, gas: 0 },
    'Assimilator': { minerals: 75, gas: 0 },
    'Gateway': { minerals: 150, gas: 0 },
    'Warp Gate': { minerals: 0, gas: 0 }, // Transformation
    'Forge': { minerals: 150, gas: 0 },
    'Cybernetics Core': { minerals: 150, gas: 0 },
    'Photon Cannon': { minerals: 150, gas: 0 },
    'Shield Battery': { minerals: 100, gas: 0 },
    'Robotics Facility': { minerals: 150, gas: 100 },
    'Stargate': { minerals: 150, gas: 150 },
    'Twilight Council': { minerals: 150, gas: 100 },
    'Robotics Bay': { minerals: 150, gas: 150 },
    'Fleet Beacon': { minerals: 300, gas: 200 },
    'Templar Archives': { minerals: 150, gas: 200 },
    'Dark Shrine': { minerals: 150, gas: 150 },

    // Upgrades (Common ones found in buildOrders.ts)
    'Stimpack': { minerals: 100, gas: 100 },
    'Combat Shield': { minerals: 100, gas: 100 },
    'Concussive Shells': { minerals: 50, gas: 50 },
    'Terran Infantry Weapons Level 1': { minerals: 100, gas: 100 },
    'Terran Infantry Armor Level 1': { minerals: 100, gas: 100 },
    'Protoss Ground Weapons Level 1': { minerals: 100, gas: 100 },
    'Protoss Ground Weapons Level 2': { minerals: 150, gas: 150 },
    'Warp Gate Research': { minerals: 50, gas: 50 }, // "Warp Gate" action usually implies the building, but if it's research?
    // In buildOrders.ts, "Warp Gate" is listed as an action. Usually means "Convert Gateway to Warp Gate" or "Finish Research". 
    // If it's the research "Warp Gate", cost is 50/50. 
    // If it's the building "Warp Gate", cost is 0 (transform).
    // Context clues: early game "Warp Gate" is research.
    'Blink': { minerals: 150, gas: 150 },
    'Charge': { minerals: 100, gas: 100 },
    'Psionic Storm': { minerals: 200, gas: 200 },
    'Metabolic Boost': { minerals: 100, gas: 100 }, // Zergling speed
    'Glial Reconstitution': { minerals: 100, gas: 100 }, // Roach speed
    'Zerg Missile Weapons Level 1': { minerals: 100, gas: 100 },
};
