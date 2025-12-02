export interface Upgrade {
    id: string;
    name: string;
    race: 'Terran' | 'Protoss' | 'Zerg';
    category: 'Attack' | 'Armor' | 'Speed' | 'Ability' | 'Other';
    description: string;
    affectedUnits: string[];
    effect: string;
    researchedAt: string;
    requirements?: string[];
    mineralCost: number;
    gasCost: number;
    researchTime: number; // in seconds
    icon?: string;
}

export const upgrades: Upgrade[] = [
    // ============================================================================
    // ZERG UPGRADES
    // ============================================================================
    {
        id: 'metabolic-boost',
        name: 'Metabolic Boost',
        race: 'Zerg',
        category: 'Speed',
        description: 'Increases zergling movement speed. The zerglings "grow wings".',
        affectedUnits: ['Zergling'],
        effect: 'Increases movement speed from 2.95 to 4.13',
        researchedAt: 'Spawning Pool',
        requirements: [],
        mineralCost: 100,
        gasCost: 100,
        researchTime: 79,
        icon: '/images/upgrades/metabolic_boost.png'
    },
    {
        id: 'adrenal-glands',
        name: 'Adrenal Glands',
        race: 'Zerg',
        category: 'Speed',
        description: 'Increases zergling attack rate to 0.35.',
        affectedUnits: ['Zergling'],
        effect: 'Increases attack speed by 40%',
        researchedAt: 'Spawning Pool',
        requirements: ['Hive'],
        mineralCost: 200,
        gasCost: 200,
        researchTime: 100,
        icon: '/images/upgrades/adrenal_glands.png'
    },
    {
        id: 'melee-attacks-1',
        name: 'Melee Attacks Level 1',
        race: 'Zerg',
        category: 'Attack',
        description: 'Increases attack damage for zerg melee units.',
        affectedUnits: ['Zergling', 'Baneling', 'Ultralisk', 'Broodling'],
        effect: '+1 damage for Zerglings and Broodlings, +2 base damage and +5 building damage for Banelings, +3 damage for Ultralisks',
        researchedAt: 'Evolution Chamber',
        requirements: [],
        mineralCost: 100,
        gasCost: 100,
        researchTime: 114,
        icon: '/images/upgrades/melee_attacks_1.jpg'
    },
    {
        id: 'melee-attacks-2',
        name: 'Melee Attacks Level 2',
        race: 'Zerg',
        category: 'Attack',
        description: 'Increases attack damage for zerg melee units.',
        affectedUnits: ['Zergling', 'Baneling', 'Ultralisk', 'Broodling'],
        effect: '+2 damage for Zerglings and Broodlings, +4 base damage and +10 building damage for Banelings, +6 damage for Ultralisks',
        researchedAt: 'Evolution Chamber',
        requirements: ['Lair', 'Melee Attacks Level 1'],
        mineralCost: 175,
        gasCost: 175,
        researchTime: 136,
        icon: '/images/upgrades/melee_attacks_2.jpg'
    },
    {
        id: 'melee-attacks-3',
        name: 'Melee Attacks Level 3',
        race: 'Zerg',
        category: 'Attack',
        description: 'Increases attack damage for zerg melee units.',
        affectedUnits: ['Zergling', 'Baneling', 'Ultralisk', 'Broodling'],
        effect: '+3 damage for Zerglings and Broodlings, +6 base damage and +15 building damage for Banelings, +9 damage for Ultralisks',
        researchedAt: 'Evolution Chamber',
        requirements: ['Hive', 'Melee Attacks Level 2'],
        mineralCost: 250,
        gasCost: 250,
        researchTime: 157,
        icon: '/images/upgrades/melee_attacks_3.jpg'
    },
    {
        id: 'missile-attacks-1',
        name: 'Missile Attacks Level 1',
        race: 'Zerg',
        category: 'Attack',
        description: 'Increases attack damage for zerg ranged units.',
        affectedUnits: ['Hydralisk', 'Queen', 'Roach', 'Ravager', 'Lurker', 'Locust'],
        effect: '+1 damage for Queens, Hydralisks and Locusts, +2 damage for Roaches and Ravagers, +2 base damage and +1 bonus damage for Lurkers',
        researchedAt: 'Evolution Chamber',
        requirements: [],
        mineralCost: 100,
        gasCost: 100,
        researchTime: 114,
        icon: '/images/upgrades/missile_attacks_1.gif'
    },
    {
        id: 'missile-attacks-2',
        name: 'Missile Attacks Level 2',
        race: 'Zerg',
        category: 'Attack',
        description: 'Increases attack damage for zerg ranged units.',
        affectedUnits: ['Hydralisk', 'Queen', 'Roach', 'Ravager', 'Lurker', 'Locust'],
        effect: '+2 damage for Queens, Hydralisks and Locusts, +4 damage for Roaches and Ravagers, +4 base damage and +2 bonus damage for Lurkers',
        researchedAt: 'Evolution Chamber',
        requirements: ['Lair', 'Missile Attacks Level 1'],
        mineralCost: 175,
        gasCost: 175,
        researchTime: 136,
        icon: '/images/upgrades/missile_attacks_2.gif'
    },
    {
        id: 'missile-attacks-3',
        name: 'Missile Attacks Level 3',
        race: 'Zerg',
        category: 'Attack',
        description: 'Increases attack damage for zerg ranged units.',
        affectedUnits: ['Hydralisk', 'Queen', 'Roach', 'Ravager', 'Lurker', 'Locust'],
        effect: '+3 damage for Queens, Hydralisks and Locusts, +6 damage for Roaches and Ravagers, +6 base damage and +3 bonus damage for Lurkers',
        researchedAt: 'Evolution Chamber',
        requirements: ['Hive', 'Missile Attacks Level 2'],
        mineralCost: 250,
        gasCost: 250,
        researchTime: 157,
        icon: '/images/upgrades/missile_attacks_3.gif'
    },
    {
        id: 'ground-carapace-1',
        name: 'Ground Carapace Level 1',
        race: 'Zerg',
        category: 'Armor',
        description: 'Increases armor for all zerg ground units.',
        affectedUnits: ['Zergling', 'Hydralisk', 'Roach', 'Baneling', 'Ultralisk', 'Queen', 'Ravager', 'Lurker', 'Infestor', 'Swarm Host'],
        effect: '+1 armor',
        researchedAt: 'Evolution Chamber',
        requirements: [],
        mineralCost: 150,
        gasCost: 150,
        researchTime: 114,
        icon: '/images/upgrades/ground_carapace_1.gif'
    },
    {
        id: 'ground-carapace-2',
        name: 'Ground Carapace Level 2',
        race: 'Zerg',
        category: 'Armor',
        description: 'Increases armor for all zerg ground units.',
        affectedUnits: ['Zergling', 'Hydralisk', 'Roach', 'Baneling', 'Ultralisk', 'Queen', 'Ravager', 'Lurker', 'Infestor', 'Swarm Host'],
        effect: '+2 armor',
        researchedAt: 'Evolution Chamber',
        requirements: ['Lair', 'Ground Carapace Level 1'],
        mineralCost: 225,
        gasCost: 225,
        researchTime: 136,
        icon: '/images/upgrades/ground_carapace_2.gif'
    },
    {
        id: 'ground-carapace-3',
        name: 'Ground Carapace Level 3',
        race: 'Zerg',
        category: 'Armor',
        description: 'Increases armor for all zerg ground units.',
        affectedUnits: ['Zergling', 'Hydralisk', 'Roach', 'Baneling', 'Ultralisk', 'Queen', 'Ravager', 'Lurker', 'Infestor', 'Swarm Host'],
        effect: '+3 armor',
        researchedAt: 'Evolution Chamber',
        requirements: ['Hive', 'Ground Carapace Level 2'],
        mineralCost: 300,
        gasCost: 300,
        researchTime: 157,
        icon: '/images/upgrades/ground_carapace_3.gif'
    },
    {
        id: 'grooved-spines',
        name: 'Grooved Spines',
        race: 'Zerg',
        category: 'Other',
        description: 'Increases hydralisk range by 1.',
        affectedUnits: ['Hydralisk'],
        effect: '+1 range (from 5 to 6)',
        researchedAt: 'Hydralisk Den',
        requirements: [],
        mineralCost: 100,
        gasCost: 100,
        researchTime: 71,
        icon: '/images/upgrades/grooved_spines.jpg'
    },
    {
        id: 'muscular-augments',
        name: 'Muscular Augments',
        race: 'Zerg',
        category: 'Speed',
        description: 'Increases hydralisk movement speed.',
        affectedUnits: ['Hydralisk'],
        effect: 'Increases movement speed by 0.74 on creep and 0.98 off creep',
        researchedAt: 'Hydralisk Den',
        requirements: ['Lair'],
        mineralCost: 100,
        gasCost: 100,
        researchTime: 71,
        icon: '/images/upgrades/muscular_augments.png'
    },

    // ============================================================================
    // TERRAN UPGRADES
    // ============================================================================
    {
        id: 'stim-pack',
        name: 'Stim Pack',
        race: 'Terran',
        category: 'Ability',
        description: 'Enables affected infantry to attack and move 50% more quickly.',
        affectedUnits: ['Marine', 'Marauder'],
        effect: '+50% attack speed and movement speed for 11 seconds, costs 10 HP',
        researchedAt: 'Tech Lab (Barracks)',
        requirements: [],
        mineralCost: 100,
        gasCost: 100,
        researchTime: 121,
        icon: '/images/upgrades/stim_pack.jpg'
    },
    {
        id: 'combat-shield',
        name: 'Combat Shield',
        race: 'Terran',
        category: 'Other',
        description: 'Increases the hit points of marines by 10. The marine model changes to have a shield attached to the left shoulderguard.',
        affectedUnits: ['Marine'],
        effect: '+10 HP (from 45 to 55)',
        researchedAt: 'Tech Lab (Barracks)',
        requirements: [],
        mineralCost: 100,
        gasCost: 100,
        researchTime: 79,
        icon: '/images/upgrades/combat_shield.jpg'
    },
    {
        id: 'infantry-weapons-1',
        name: 'Infantry Weapons Level 1',
        race: 'Terran',
        category: 'Attack',
        description: 'Increases attack damage for terran infantry units.',
        affectedUnits: ['Marine', 'Reaper', 'Marauder', 'Ghost'],
        effect: '+1 damage for Marines and Reapers, +1 base damage and +1 bonus damage for Marauders and Ghosts',
        researchedAt: 'Engineering Bay',
        requirements: [],
        mineralCost: 100,
        gasCost: 100,
        researchTime: 114,
        icon: '/images/upgrades/infantry_weapons_1.gif'
    },
    {
        id: 'infantry-weapons-2',
        name: 'Infantry Weapons Level 2',
        race: 'Terran',
        category: 'Attack',
        description: 'Increases attack damage for terran infantry units.',
        affectedUnits: ['Marine', 'Reaper', 'Marauder', 'Ghost'],
        effect: '+2 damage for Marines and Reapers, +2 base damage and +2 bonus damage for Marauders and Ghosts',
        researchedAt: 'Engineering Bay',
        requirements: ['Armory', 'Infantry Weapons Level 1'],
        mineralCost: 175,
        gasCost: 175,
        researchTime: 136,
        icon: '/images/upgrades/infantry_weapons_2.gif'
    },
    {
        id: 'infantry-weapons-3',
        name: 'Infantry Weapons Level 3',
        race: 'Terran',
        category: 'Attack',
        description: 'Increases attack damage for terran infantry units.',
        affectedUnits: ['Marine', 'Reaper', 'Marauder', 'Ghost'],
        effect: '+3 damage for Marines and Reapers, +3 base damage and +3 bonus damage for Marauders and Ghosts',
        researchedAt: 'Engineering Bay',
        requirements: ['Armory', 'Infantry Weapons Level 2'],
        mineralCost: 250,
        gasCost: 250,
        researchTime: 157,
        icon: '/images/upgrades/infantry_weapons_3.gif'
    },
    {
        id: 'infantry-armor-1',
        name: 'Infantry Armor Level 1',
        race: 'Terran',
        category: 'Armor',
        description: 'Increases armor for terran infantry units.',
        affectedUnits: ['Marine', 'Reaper', 'Marauder', 'Ghost', 'SCV', 'Firebat', 'Medic', 'Spectre'],
        effect: '+1 armor',
        researchedAt: 'Engineering Bay',
        requirements: [],
        mineralCost: 100,
        gasCost: 100,
        researchTime: 114,
        icon: '/images/upgrades/infantry_armor_1.gif'
    },
    {
        id: 'infantry-armor-2',
        name: 'Infantry Armor Level 2',
        race: 'Terran',
        category: 'Armor',
        description: 'Increases armor for terran infantry units.',
        affectedUnits: ['Marine', 'Reaper', 'Marauder', 'Ghost', 'SCV', 'Firebat', 'Medic', 'Spectre'],
        effect: '+2 armor',
        researchedAt: 'Engineering Bay',
        requirements: ['Armory', 'Infantry Armor Level 1'],
        mineralCost: 175,
        gasCost: 175,
        researchTime: 136,
        icon: '/images/upgrades/infantry_armor_2.gif'
    },
    {
        id: 'infantry-armor-3',
        name: 'Infantry Armor Level 3',
        race: 'Terran',
        category: 'Armor',
        description: 'Increases armor for terran infantry units.',
        affectedUnits: ['Marine', 'Reaper', 'Marauder', 'Ghost', 'SCV', 'Firebat', 'Medic', 'Spectre'],
        effect: '+3 armor',
        researchedAt: 'Engineering Bay',
        requirements: ['Armory', 'Infantry Armor Level 2'],
        mineralCost: 250,
        gasCost: 250,
        researchTime: 157,
        icon: '/images/upgrades/infantry_armor_3.gif'
    }
];

// Helper functions
export function getUpgradesByRace(race: 'Terran' | 'Protoss' | 'Zerg'): Upgrade[] {
    return upgrades.filter(upgrade => upgrade.race === race);
}

export function getUpgradesByUnit(unitName: string): Upgrade[] {
    return upgrades.filter(upgrade =>
        upgrade.affectedUnits.some(unit =>
            unit.toLowerCase() === unitName.toLowerCase()
        )
    );
}

export function getUpgradeById(id: string): Upgrade | undefined {
    return upgrades.find(upgrade => upgrade.id === id);
}

export function getUpgradesByCategory(category: Upgrade['category']): Upgrade[] {
    return upgrades.filter(upgrade => upgrade.category === category);
}
