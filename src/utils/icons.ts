// Icon mapping for SC2 units and structures
// Using emoji/unicode symbols to avoid copyright issues

export const iconMap: Record<string, string> = {
    // === TERRAN ===
    // Buildings
    'Supply Depot': '📦',
    'Barracks': '🏭',
    'Factory': '🏗️',
    'Starport': '✈️',
    'Command Center': '🏛️',
    'Orbital Command': '🛰️',
    'Engineering Bay': '🔧',
    'Armory': '🛡️',
    'Tech Lab': '🔬',
    'Reactor': '⚡',
    'Bunker': '🏰',
    'Missile Turret': '🎯',
    'Sensor Tower': '📡',
    'Fusion Core': '⚛️',
    'Ghost Academy': '👻',

    // Units
    'Marine': '⚔️',
    'Marauder': '💪',
    'Reaper': '🗡️',
    'Ghost': '👤',
    'Hellion': '🔥',
    'Hellbat': '🔥',
    'Siege Tank': '🚜',
    'Thor': '🤖',
    'Widow Mine': '💣',
    'Cyclone': '🎯',
    'Viking': '✈️',
    'Medivac': '🚁',
    'Liberator': '🛩️',
    'Raven': '🦅',
    'Banshee': '👻',
    'Battlecruiser': '🚀',

    // Upgrades
    'Stim Pack': '💉',
    'Combat Shield': '🛡️',
    'Concussive Shells': '💥',
    'Infantry Weapons': '⚔️',
    'Infantry Armor': '🛡️',
    'Vehicle Weapons': '🔫',
    'Vehicle Armor': '🛡️',
    'Ship Weapons': '🚀',
    'Ship Armor': '🛡️',

    // === PROTOSS ===
    // Buildings
    'Pylon': '⚡',
    'Gateway': '🚪',
    'Cybernetics Core': '💻',
    'Nexus': '🏛️',
    'Forge': '⚒️',
    'Twilight Council': '🌙',
    'Templar Archives': '📚',
    'Dark Shrine': '🌑',
    'Robotics Facility': '🤖',
    'Robotics Bay': '🏗️',
    'Stargate': '⭐',
    'Fleet Beacon': '🔱',
    'Photon Cannon': '💡',
    'Shield Battery': '🔋',

    // Units
    'Probe': '⛏️',
    'Zealot': '⚔️',
    'Stalker': '🦾',
    'Sentry': '👁️',
    'Adept': '🗡️',
    'High Templar': '⚡',
    'Dark Templar': '🗡️',
    'Archon': '🔮',
    'Observer': '👁️',
    'Warp Prism': '🚁',
    'Immortal': '🛡️',
    'Colossus': '🦿',
    'Disruptor': '💥',
    'Phoenix': '🦅',
    'Void Ray': '🔫',
    'Oracle': '🔮',
    'Tempest': '🌩️',
    'Carrier': '🚀',
    'Mothership': '👑',

    // Upgrades & Research
    'Warpgate Research': '🌀',
    'Warpgate': '🌀',
    'Charge': '⚡',
    'Blink': '✨',
    'Ground Weapons': '⚔️',
    'Ground Armor': '🛡️',
    'Shields': '🛡️',
    'Air Weapons': '🚀',
    'Air Armor': '🛡️',
    'Psionic Storm': '⚡',

    // === ZERG ===
    // Buildings
    'Hatchery': '🥚',
    'Lair': '🏠',
    'Hive': '🏰',
    'Spawning Pool': '🌊',
    'Roach Warren': '🕳️',
    'Baneling Nest': '💣',
    'Hydralisk Den': '🐍',
    'Spire': '🗼',
    'Greater Spire': '🗼',
    'Infestation Pit': '🦠',
    'Ultralisk Cavern': '🦏',
    'Nydus Network': '🕳️',
    'Evolution Chamber': '🧬',
    'Spine Crawler': '🦂',
    'Spore Crawler': '🍄',
    'Extractor': '⛽',

    // Units
    'Drone': '⛏️',
    'Overlord': '👁️',
    'Overseer': '👁️',
    'Queen': '👑',
    'Zergling': '🦎',
    'Baneling': '💣',
    'Roach': '🪳',
    'Ravager': '💥',
    'Hydralisk': '🐍',
    'Lurker': '🦂',
    'Infestor': '🦠',
    'Swarm Host': '🐛',
    'Ultralisk': '🦏',
    'Mutalisk': '🦇',
    'Corruptor': '🦠',
    'Brood Lord': '👑',
    'Viper': '🐍',

    // Upgrades
    'Zergling Speed': '⚡',
    'Metabolic Boost': '⚡',
    'Adrenal Glands': '💉',
    'Melee Attacks': '⚔️',
    'Missile Attacks': '🔫',
    'Ground Carapace': '🛡️',
    'Flyer Attacks': '🚀',
    'Flyer Carapace': '🛡️',

    // === GENERIC ===
    'Assimilator': '⛽',
    'Refinery': '⛽',
    'Attack': '⚔️',
    'Push': '⚔️',
    'Expand': '🏛️',
    'Scout': '👁️',
    'Harass': '💥',
    'Defend': '🛡️',
};

// Helper function to get icon for an action
export function getIconForAction(action: string): string | undefined {
    // Try exact match first
    if (iconMap[action]) {
        return iconMap[action];
    }

    // Try partial match (e.g., "Barracks x2" should match "Barracks")
    for (const [key, icon] of Object.entries(iconMap)) {
        if (action.includes(key)) {
            return icon;
        }
    }

    return undefined;
}
