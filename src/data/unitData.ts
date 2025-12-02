// SC2 Unit and Building Data
// Images sourced from StarCraft Fandom Wiki
// Copyright: Blizzard Entertainment

export interface UnitData {
    name: string;
    imageUrl: string;
    description: string;
    race: 'Terran' | 'Protoss' | 'Zerg' | 'Neutral';
    type: 'unit' | 'building' | 'upgrade';
}

export const unitDatabase: Record<string, UnitData> = {
    // ============================================================================
    // TERRAN UNITS
    // ============================================================================
    'SCV': {
        name: 'SCV',
        imageUrl: '/images/units/SCV.jpg',
        description: 'The builder and resource gatherer of the terran race. Its Repair ability can be set to "autocast".',
        race: 'Terran',
        type: 'unit'
    },
    'Marine': {
        name: 'Marine',
        imageUrl: '/images/units/Marine.jpg',
        description: 'The basic terran infantry, able to upgrade hit points with a shield.',
        race: 'Terran',
        type: 'unit'
    },
    'Marauder': {
        name: 'Marauder',
        imageUrl: '/images/units/Marauder.jpg',
        description: 'The replacement for the firebat.[10] Its attack slows enemy units and deals high damage against armored units.',
        race: 'Terran',
        type: 'unit'
    },
    'Reaper': {
        name: 'Reaper',
        imageUrl: '/images/units/Reaper.jpg',
        description: 'Exceptionally fast infantry that uses dual pistols, can jet pack up and down ledges and uses explosives against buildings.',
        race: 'Terran',
        type: 'unit'
    },
    'Ghost': {
        name: 'Ghost',
        imageUrl: '/images/units/Ghost.jpg',
        description: 'Stealth specialist with access to several powerful and different abilities than in StarCraft I.',
        race: 'Terran',
        type: 'unit'
    },
    'Hellion': {
        name: 'Hellion',
        imageUrl: '/images/units/Hellion.jpg',
        description: 'Formerly known as the jackal, this fast vehicle is armed with a flamethrower[8][9] suited for destroying masses of weaker units.',
        race: 'Terran',
        type: 'unit'
    },
    'Hellbat': {
        name: 'Hellbat',
        imageUrl: '/images/units/Hellbat.jpg',
        description: 'Transformable variant unit from the hellion, better equipped for close combat.',
        race: 'Terran',
        type: 'unit'
    },
    'Widow Mine': {
        name: 'Widow Mine',
        imageUrl: '/images/units/Widow_Mine.jpg',
        description: 'Mobile defensive unit, buries and launches missiles at foes.',
        race: 'Terran',
        type: 'unit'
    },
    'Siege Tank': {
        name: 'Siege Tank',
        imageUrl: '/images/units/Siege_Tank.jpg',
        description: 'Terran tank that can transform into a stationary \'siege cannon\' mode, allowing it to strike targets at a greater range.',
        race: 'Terran',
        type: 'unit'
    },
    'Thor': {
        name: 'Thor',
        imageUrl: '/images/units/Thor.jpg',
        description: 'This intimidating mechanical unit is named after the Norse god of thunder. Can deal splash damage to air units and fire powerful cannons at ground targets.',
        race: 'Terran',
        type: 'unit'
    },
    'Cyclone': {
        name: 'Cyclone',
        imageUrl: '/images/units/Cyclone.jpg',
        description: 'Mobile assault unit, armed with twin Typhoon missile pods that engage air and ground threats.',
        race: 'Terran',
        type: 'unit'
    },
    'Viking': {
        name: 'Viking',
        imageUrl: '/images/units/Viking.jpg',
        description: 'This terran vehicle can transform between a walking robot and a spacecraft.',
        race: 'Terran',
        type: 'unit'
    },
    'Medivac': {
        name: 'Medivac',
        imageUrl: '/images/units/Medivac.jpg',
        description: 'A dual-purpose unit combining the old dropship and the medic, it is capable of transporting ground units and healing infantry.',
        race: 'Terran',
        type: 'unit'
    },
    'Liberator': {
        name: 'Liberator',
        imageUrl: '/images/units/Liberator.jpg',
        description: 'Transformable medium-sized gunship, armed with anti-ground cannons after transforming into a stationary air platform.',
        race: 'Terran',
        type: 'unit'
    },
    'Raven': {
        name: 'Raven',
        imageUrl: '/images/units/Raven.jpg',
        description: 'Formerly known as the nighthawk, vulkan[11] and nomad, this air detector creates smaller independent munitions.[12]',
        race: 'Terran',
        type: 'unit'
    },
    'Banshee': {
        name: 'Banshee',
        imageUrl: '/images/units/Banshee.jpg',
        description: 'A cloak-capable gunship able to only attack ground-based targets.',
        race: 'Terran',
        type: 'unit'
    },
    'Battlecruiser': {
        name: 'Battlecruiser',
        imageUrl: '/images/units/Battlecruiser.jpg',
        description: 'The capital ship of the terran fleet, this powerful spacecraft is capable of firing a Yamato Cannon that deals large damage to a single target.',
        race: 'Terran',
        type: 'unit'
    },

    // ============================================================================
    // TERRAN BUILDINGS
    // ============================================================================
    'Command Center': {
        name: 'Command Center',
        imageUrl: '/images/units/Command_Center.jpg',
        description: 'Produces SCVs and serves as a drop off point for processing of minerals and gas. Has the ability to carry up to five SCVs and can upgrade to the powerfully armed planetary fortress or the ability oriented orbital command.',
        race: 'Terran',
        type: 'building'
    },
    'Orbital Command': {
        name: 'Orbital Command',
        imageUrl: '/images/units/Orbital_Command.jpg',
        description: 'This upgrade to the command center provides scanner sweeps to reveal troop movements through the fog of war and detect cloaked or burrowed units, summons MULEs, and can increase the supply generated by supply depots.',
        race: 'Terran',
        type: 'building'
    },
    'Planetary Fortress': {
        name: 'Planetary Fortress',
        imageUrl: '/images/units/Planetary_Fortress.jpg',
        description: 'This immobile upgrade of the command center grants it weapons to attack enemy ground units and a large boost to armor.',
        race: 'Terran',
        type: 'building'
    },
    'Supply Depot': {
        name: 'Supply Depot',
        imageUrl: '/images/units/Supply_Depot.jpg',
        description: 'Provides supply required for additional terran units and can submerge, enabling troops to walk over it. It is smaller than in StarCraft I and can be made into an important part of terran base defenses, preventing enemy units from walking past them. This ability is called Lower/Raise.',
        race: 'Terran',
        type: 'building'
    },
    'Refinery': {
        name: 'Refinery',
        imageUrl: '/images/units/Refinery.jpg',
        description: 'Refines vespene gas for collection by SCVs.',
        race: 'Terran',
        type: 'building'
    },
    'Barracks': {
        name: 'Barracks',
        imageUrl: '/images/units/Barracks.jpg',
        description: 'Produces terran infantry units.',
        race: 'Terran',
        type: 'building'
    },
    'Factory': {
        name: 'Factory',
        imageUrl: '/images/units/Factory.jpg',
        description: 'Produces terran vehicle units.',
        race: 'Terran',
        type: 'building'
    },
    'Starport': {
        name: 'Starport',
        imageUrl: '/images/units/Starport.jpg',
        description: 'Produces terran air units.',
        race: 'Terran',
        type: 'building'
    },
    'Engineering Bay': {
        name: 'Engineering Bay',
        imageUrl: '/images/units/Engineering_Bay.jpg',
        description: 'Upgrades infantry and buildings.',
        race: 'Terran',
        type: 'building'
    },
    'Armory': {
        name: 'Armory',
        imageUrl: '/images/units/Armory.jpg',
        description: 'Upgrades mechanical units.',
        race: 'Terran',
        type: 'building'
    },
    'Ghost Academy': {
        name: 'Ghost Academy',
        imageUrl: '/images/units/Ghost_Academy.jpg',
        description: 'This structure enables ghosts to be produced and provides researches for them. In addition, it stores nuclear missiles for launch.',
        race: 'Terran',
        type: 'building'
    },
    'Fusion Core': {
        name: 'Fusion Core',
        imageUrl: '/images/units/Fusion_Core.jpg',
        description: 'Formerly known as the anti-matter core[13] and the deep space relay, this structure allows production of battlecruisers and provides researches for them.',
        race: 'Terran',
        type: 'building'
    },
    'Bunker': {
        name: 'Bunker',
        imageUrl: '/images/units/Bunker.jpg',
        description: 'Provides protection for terran infantry.',
        race: 'Terran',
        type: 'building'
    },
    'Missile Turret': {
        name: 'Missile Turret',
        imageUrl: '/images/units/Missile_turret.jpg',
        description: 'Anti-air turret that fires two missiles at a time.',
        race: 'Terran',
        type: 'building'
    },
    'Sensor Tower': {
        name: 'Sensor Tower',
        imageUrl: '/images/units/Sensor_Tower.jpg',
        description: 'Can sense enemy units through the fog of war.',
        race: 'Terran',
        type: 'building'
    },
    'Tech Lab': {
        name: 'Tech Lab',
        imageUrl: '/images/units/Tech_Lab.jpg',
        description: 'Enables the production of "higher tech" units. For instance, adding a tech lab to a barracks will allow it to produce marauders, while adding one to a factory will enable it to build siege tanks. Upgrades marine combat shields and specific upgrades and special abilities for the hellion, siege tank, viking, banshee, medivac dropship, and raven.',
        race: 'Terran',
        type: 'building'
    },
    'Reactor': {
        name: 'Reactor',
        imageUrl: '/images/units/Reactor.jpg',
        description: 'Doubles the number of units produced from the building to which it is attached (for instance, adding one to a barracks will enable it to create two marines at the same time).',
        race: 'Terran',
        type: 'building'
    },

    // ============================================================================
    // PROTOSS UNITS
    // ============================================================================
    'Probe': {
        name: 'Probe',
        imageUrl: '/images/units/Probe.jpg',
        description: 'The builder of the protoss race. Gathers gas and minerals.',
        race: 'Protoss',
        type: 'unit'
    },
    'Zealot': {
        name: 'Zealot',
        imageUrl: '/images/units/Zealot.jpg',
        description: 'Melee unit with the ability to charge, allowing it to quickly close the distance between itself and an enemy unit.',
        race: 'Protoss',
        type: 'unit'
    },
    'Stalker': {
        name: 'Stalker',
        imageUrl: '/images/units/Stalker.jpg',
        description: 'A dragoon-like Nerazim unit, able to blink (short-range teleport) and deliver ranged attacks against air and ground units.',
        race: 'Protoss',
        type: 'unit'
    },
    'Sentry': {
        name: 'Sentry',
        imageUrl: '/images/units/Sentry.jpg',
        description: 'Formerly known as the disruptor,[1] and the nullifier before that.[2] A ground support unit.',
        race: 'Protoss',
        type: 'unit'
    },
    'Adept': {
        name: 'Adept',
        imageUrl: '/images/units/Adept.jpg',
        description: 'Ground-only ranged attack unit, armed with psionic transfer ability to teleport to nearby locations for harassment.',
        race: 'Protoss',
        type: 'unit'
    },
    'High Templar': {
        name: 'High Templar',
        imageUrl: '/images/units/High_Templar.jpg',
        description: 'A physically fragile unit with strong psychic abilities.',
        race: 'Protoss',
        type: 'unit'
    },
    'Dark Templar': {
        name: 'Dark Templar',
        imageUrl: '/images/units/Dark_Templar.jpg',
        description: 'A permanently cloaked stealth warrior.',
        race: 'Protoss',
        type: 'unit'
    },
    'Archon': {
        name: 'Archon',
        imageUrl: '/images/units/Archon.jpg',
        description: 'Created by merging two templar units, the archon is a powerful melee unit with a very durable force shield and a strong energy-based attack.',
        race: 'Protoss',
        type: 'unit'
    },
    'Observer': {
        name: 'Observer',
        imageUrl: '/images/units/Observer.jpg',
        description: 'A cloaking air unit that functions as a detector.',
        race: 'Protoss',
        type: 'unit'
    },
    'Warp Prism': {
        name: 'Warp Prism',
        imageUrl: '/images/units/Warp_Prism.jpg',
        description: 'Formerly known as the phase prism,[4] the warp prism is a dual-purpose unit, able to transport units or to create a warp matrix field like the pylon.',
        race: 'Protoss',
        type: 'unit'
    },
    'Immortal': {
        name: 'Immortal',
        imageUrl: '/images/units/Immortal.jpg',
        description: 'Dragoon-like walker with a strong defense against powerful attacks, but vulnerable to weaker attacks.',
        race: 'Protoss',
        type: 'unit'
    },
    'Colossus': {
        name: 'Colossus',
        imageUrl: '/images/units/Colossus.jpg',
        description: 'The large quad-legged vehicle fires lasers in a splash pattern well-suited to destroying swarms of weaker units. This unit can also traverse differences in terrain height due to its long legs, and will appear to step over ledges and other obstacles due to the inverse kinematics system.',
        race: 'Protoss',
        type: 'unit'
    },
    'Disruptor': {
        name: 'Disruptor',
        imageUrl: '/images/units/Disruptor.jpg',
        description: 'Light ground mechanized support unit, armed with energy spikes to wreak havoc against swaths of ground forces.',
        race: 'Protoss',
        type: 'unit'
    },
    'Phoenix': {
        name: 'Phoenix',
        imageUrl: '/images/units/Phoenix.jpg',
        description: 'An aerial fighter with an anti-gravity ability that lifts ground units into the air.',
        race: 'Protoss',
        type: 'unit'
    },
    'Void Ray': {
        name: 'Void Ray',
        imageUrl: '/images/units/Void_Ray.jpg',
        description: 'Formerly known as the warp ray,[3] this flying unit deals damage with a blue energy beam that does more damage as it focuses on the same target. Good against heavily armored targets like buildings, weak against small arms fire.',
        race: 'Protoss',
        type: 'unit'
    },
    'Oracle': {
        name: 'Oracle',
        imageUrl: '/images/units/Oracle.jpg',
        description: 'A light, psionic, support and harassment ship. Can grant vision and harass light units and workers with its pulsar beam.',
        race: 'Protoss',
        type: 'unit'
    },
    'Tempest': {
        name: 'Tempest',
        imageUrl: '/images/units/Tempest.jpg',
        description: 'A long-range capital ship that excels at taking down massive units.',
        race: 'Protoss',
        type: 'unit'
    },
    'Carrier': {
        name: 'Carrier',
        imageUrl: '/images/units/Carrier.jpg',
        description: 'A powerful air unit. Carriers do not have their own attacks but create interceptors to fight for them.',
        race: 'Protoss',
        type: 'unit'
    },
    'Mothership': {
        name: 'Mothership',
        imageUrl: '/images/units/Mothership.jpg',
        description: 'A powerful flying unit that consumes a high amount of resources to produce. It has powerful special abilities.',
        race: 'Protoss',
        type: 'unit'
    },

    // ============================================================================
    // PROTOSS BUILDINGS
    // ============================================================================
    'Nexus': {
        name: 'Nexus',
        imageUrl: '/images/units/Nexus.jpg',
        description: 'Produces probes and is the place that all minerals and gas are dropped off at to be processed. Also produces the mothership.',
        race: 'Protoss',
        type: 'building'
    },
    'Pylon': {
        name: 'Pylon',
        imageUrl: '/images/units/Pylon.jpg',
        description: 'The protoss supply building; it produces a radius of energy that is a requisite for the placement of most other protoss structures.',
        race: 'Protoss',
        type: 'building'
    },
    'Assimilator': {
        name: 'Assimilator',
        imageUrl: '/images/units/Assimilator.jpg',
        description: 'Allows probes to harvest vespene gas from geysers.',
        race: 'Protoss',
        type: 'building'
    },
    'Gateway': {
        name: 'Gateway',
        imageUrl: '/images/units/Gateway.jpg',
        description: 'Warps in the zealot, the stalker, the sentry, the high templar, and the dark templar.',
        race: 'Protoss',
        type: 'building'
    },
    'Warp Gate': {
        name: 'Warp Gate',
        imageUrl: '/images/units/Warp_Gate.jpg',
        description: 'The gateway has the ability to transform into a warp gate, which can warp-in units at any spot within the psionic matrix.',
        race: 'Protoss',
        type: 'building'
    },
    'Cybernetics Core': {
        name: 'Cybernetics Core',
        imageUrl: '/images/units/Cybernetics_Core.jpg',
        description: 'Allows for the warping in of stalkers and sentries. Also allows research of weapon and armor upgrades for air units.',
        race: 'Protoss',
        type: 'building'
    },
    'Forge': {
        name: 'Forge',
        imageUrl: '/images/units/Forge.jpg',
        description: 'Allows the construction of photon cannons and research of Protoss ground unit upgrades.',
        race: 'Protoss',
        type: 'building'
    },
    'Twilight Council': {
        name: 'Twilight Council',
        imageUrl: '/images/units/Twilight_Council.jpg',
        description: 'Contains upgrades for stalkers and zealots.',
        race: 'Protoss',
        type: 'building'
    },
    'Templar Archives': {
        name: 'Templar Archives',
        imageUrl: '/images/units/Templar_Archives.jpg',
        description: 'Allows the high templar unit to be warped in.',
        race: 'Protoss',
        type: 'building'
    },
    'Dark Shrine': {
        name: 'Dark Shrine',
        imageUrl: '/images/units/Dark_Shrine.jpg',
        description: 'Formerly known as the dark obelisk,[5] it allows dark templar to be warped in.',
        race: 'Protoss',
        type: 'building'
    },
    'Robotics Facility': {
        name: 'Robotics Facility',
        imageUrl: '/images/units/Robotics_Facility.jpg',
        description: 'Warps in the warp prism, observer, colossus, and immortal.',
        race: 'Protoss',
        type: 'building'
    },
    'Robotics Bay': {
        name: 'Robotics Bay',
        imageUrl: '/images/units/Robotics_Bay.jpg',
        description: 'Formerly known as the null circuit,[6][7] this structure enables a robotics facility to produce colossi and contains upgrades for observers and warp prisms.',
        race: 'Protoss',
        type: 'building'
    },
    'Stargate': {
        name: 'Stargate',
        imageUrl: '/images/units/Stargate.jpg',
        description: 'Warps in the phoenix, void ray and carrier.',
        race: 'Protoss',
        type: 'building'
    },
    'Fleet Beacon': {
        name: 'Fleet Beacon',
        imageUrl: '/images/units/Fleet_Beacon.jpg',
        description: 'Allows the carrier and the mothership to be warped in.',
        race: 'Protoss',
        type: 'building'
    },
    'Photon Cannon': {
        name: 'Photon Cannon',
        imageUrl: '/images/units/Photon_Cannon.jpg',
        description: 'A defensive structure with a ranged attack effective against ground and air units.',
        race: 'Protoss',
        type: 'building'
    },
    'Shield Battery': {
        name: 'Shield Battery',
        imageUrl: '/images/units/Shield_Battery.jpg',
        description: 'Recharges the shields of protoss units and defensive structures.',
        race: 'Protoss',
        type: 'building'
    },

    // ============================================================================
    // ZERG UNITS
    // ============================================================================
    'Drone': {
        name: 'Drone',
        imageUrl: '/images/units/Drone.jpg',
        description: 'Harvests resources and spawns structures. Is sacrificed when creating new structures.',
        race: 'Zerg',
        type: 'unit'
    },
    'Overlord': {
        name: 'Overlord',
        imageUrl: '/images/units/Overlord.jpg',
        description: 'Produces control and is no longer a detector like the StarCraft I version.',
        race: 'Zerg',
        type: 'unit'
    },
    'Overseer': {
        name: 'Overseer',
        imageUrl: '/images/units/Overseer.jpg',
        description: 'A spellcaster evolution of the overlord. Works as a detector and has numerous special abilities.',
        race: 'Zerg',
        type: 'unit'
    },
    'Queen': {
        name: 'Queen',
        imageUrl: '/images/units/Queen.jpg',
        description: 'The new queen is very different than its StarCraft I counterpart, being a powerful attacking ground dwelling support unit ideal for zerg defense.',
        race: 'Zerg',
        type: 'unit'
    },
    'Zergling': {
        name: 'Zergling',
        imageUrl: '/images/units/Zergling.jpg',
        description: 'Fast but weak melee attacker ideal for swarming attacks in large numbers.',
        race: 'Zerg',
        type: 'unit'
    },
    'Baneling': {
        name: 'Baneling',
        imageUrl: '/images/units/Baneling.jpg',
        description: 'This green rolling unit is mutated from the zergling. It has a huge suicidal attack. A huge swarm of banelings will create devastating results to an enemy\'s base.',
        race: 'Zerg',
        type: 'unit'
    },
    'Roach': {
        name: 'Roach',
        imageUrl: '/images/units/Roach.jpg',
        description: 'Exceptionally tough short ranged unit able to quickly regenerate and move while burrowed.',
        race: 'Zerg',
        type: 'unit'
    },
    'Ravager': {
        name: 'Ravager',
        imageUrl: '/images/units/Ravager.jpg',
        description: 'An artillery unit that evolves from the roach. Can use corrosive bile to destroy force fields and hit clumps of units at range.',
        race: 'Zerg',
        type: 'unit'
    },
    'Hydralisk': {
        name: 'Hydralisk',
        imageUrl: '/images/units/Hydralisk.jpg',
        description: 'Basic ranged attacker of the zerg swarm.',
        race: 'Zerg',
        type: 'unit'
    },
    'Lurker': {
        name: 'Lurker',
        imageUrl: '/images/units/Lurker.jpg',
        description: 'A long ranged siege unit that evolves from the hydralisk. Must burrow to attack, but does damage in a line.',
        race: 'Zerg',
        type: 'unit'
    },
    'Infestor': {
        name: 'Infestor',
        imageUrl: '/images/units/Infestor.jpg',
        description: 'Zerg spellcaster. Provides ground support and can move while burrowed.',
        race: 'Zerg',
        type: 'unit'
    },
    'Swarm Host': {
        name: 'Swarm Host',
        imageUrl: '/images/units/Swarm_Host.jpg',
        description: 'Siege unit, spawns timed locusts to send at targets.',
        race: 'Zerg',
        type: 'unit'
    },
    'Ultralisk': {
        name: 'Ultralisk',
        imageUrl: '/images/units/Ultralisk.jpg',
        description: 'Massive zerg melee attacker able to deal splash damage with its melee attack. Also has a headbut attack against buildings. Other differences from its StarCraft I counterpart are it now having four kaiser blades instead of two, and its ability to burrow.',
        race: 'Zerg',
        type: 'unit'
    },
    'Mutalisk': {
        name: 'Mutalisk',
        imageUrl: '/images/units/Mutalisk.jpg',
        description: 'The basic air offensive unit of the zerg with high movement speed.',
        race: 'Zerg',
        type: 'unit'
    },
    'Corruptor': {
        name: 'Corruptor',
        imageUrl: '/images/units/Corruptor.jpg',
        description: 'Attacks and "corrupts" other air units, increasing damage taken.',
        race: 'Zerg',
        type: 'unit'
    },
    'Brood Lord': {
        name: 'Brood Lord',
        imageUrl: '/images/units/Brood_lord.jpg',
        description: 'High hit point aerial ground attacker which replaced the swarm guardian, evolving from the corruptor.',
        race: 'Zerg',
        type: 'unit'
    },
    'Viper': {
        name: 'Viper',
        imageUrl: '/images/units/Viper.jpg',
        description: 'Aerial support unit, able to blind groups of ranged units and abduct enemy units to its position.',
        race: 'Zerg',
        type: 'unit'
    },

    // ============================================================================
    // ZERG BUILDINGS
    // ============================================================================
    'Hatchery': {
        name: 'Hatchery',
        imageUrl: '/images/units/Hatchery.jpg',
        description: 'Spawns larvae to be morphed into other zerg strains, generates creep and digests minerals and gas into a usable form. The queen is spawned directly from the hatchery.',
        race: 'Zerg',
        type: 'building'
    },
    'Lair': {
        name: 'Lair',
        imageUrl: '/images/units/Lair.jpg',
        description: 'Upgrade of the hatchery giving access to more advanced buildings and providing upgrades for overlords and overseers.',
        race: 'Zerg',
        type: 'building'
    },
    'Hive': {
        name: 'Hive',
        imageUrl: '/images/units/Hive.jpg',
        description: 'Upgrade of the lair giving access to the most advanced buildings.',
        race: 'Zerg',
        type: 'building'
    },
    'Extractor': {
        name: 'Extractor',
        imageUrl: '/images/units/Extractor.jpg',
        description: 'Allows drones to extract vespene gas.',
        race: 'Zerg',
        type: 'building'
    },
    'Spawning Pool': {
        name: 'Spawning Pool',
        imageUrl: '/images/units/Spawning_Pool.jpg',
        description: 'Required for production of zerglings and queens and researches zergling upgrades.',
        race: 'Zerg',
        type: 'building'
    },
    'Roach Warren': {
        name: 'Roach Warren',
        imageUrl: '/images/units/Roach_Warren.jpg',
        description: 'Enables production of roaches and researches roach upgrades.',
        race: 'Zerg',
        type: 'building'
    },
    'Baneling Nest': {
        name: 'Baneling Nest',
        imageUrl: '/images/units/Baneling_Nest.jpg',
        description: 'Required for baneling production and researches baneling upgrades.',
        race: 'Zerg',
        type: 'building'
    },
    'Hydralisk Den': {
        name: 'Hydralisk Den',
        imageUrl: '/images/units/Hydralisk_Den.jpg',
        description: 'Required for the production of hydralisks and researches hydralisk upgrades.',
        race: 'Zerg',
        type: 'building'
    },
    'Spire': {
        name: 'Spire',
        imageUrl: '/images/units/Spire.jpg',
        description: 'Required to produce mutalisks and corruptors and provides upgrades for aerial units.',
        race: 'Zerg',
        type: 'building'
    },
    'Greater Spire': {
        name: 'Greater Spire',
        imageUrl: '/images/units/Greater_Spire.jpg',
        description: 'Upgrade of the spire, enables production of brood lords.',
        race: 'Zerg',
        type: 'building'
    },
    'Infestation Pit': {
        name: 'Infestation Pit',
        imageUrl: '/images/units/Infestation_Pit.jpg',
        description: 'Enables creation of infestors and researches infestor upgrades.',
        race: 'Zerg',
        type: 'building'
    },
    'Ultralisk Cavern': {
        name: 'Ultralisk Cavern',
        imageUrl: '/images/units/Ultralisk_Cavern.jpg',
        description: 'Required to produce ultralisks and researches ultralisk upgrades.',
        race: 'Zerg',
        type: 'building'
    },
    'Nydus Network': {
        name: 'Nydus Network',
        imageUrl: '/images/units/Nydus_Network.jpg',
        description: 'Enables creation of nydus worms and acts as an entrance to the nydus transport system.',
        race: 'Zerg',
        type: 'building'
    },
    'Evolution Chamber': {
        name: 'Evolution Chamber',
        imageUrl: '/images/units/Evolution_Chamber.jpg',
        description: 'Provides basic upgrades for the zerg ground units.',
        race: 'Zerg',
        type: 'building'
    },
    'Spine Crawler': {
        name: 'Spine Crawler',
        imageUrl: '/images/units/Spine_Crawler.jpg',
        description: 'A mobile creep-bound defensive structure that attacks ground units.',
        race: 'Zerg',
        type: 'building'
    },
    'Spore Crawler': {
        name: 'Spore Crawler',
        imageUrl: '/images/units/Spore_Crawler.jpg',
        description: 'A mobile creep-bound anti-air defensive structure.',
        race: 'Zerg',
        type: 'building'
    },

    // ============================================================================
    // COMMON UPGRADES & ACTIONS
    // ============================================================================
    'Stim Pack': {
        name: 'Stim Pack',
        imageUrl: 'https://static.wikia.nocookie.net/starcraft/images/6/6e/StimPack_SC2_Icon1.jpg',
        description: 'Marine/Marauder ability. Increases attack and movement speed at the cost of HP.',
        race: 'Terran',
        type: 'upgrade'
    },
    'Combat Shield': {
        name: 'Combat Shield',
        imageUrl: 'https://static.wikia.nocookie.net/starcraft/images/f/f8/CombatShield_SC2_Icon1.jpg',
        description: 'Increases Marine HP from 45 to 55.',
        race: 'Terran',
        type: 'upgrade'
    },
    'Concussive Shells': {
        name: 'Concussive Shells',
        imageUrl: 'https://static.wikia.nocookie.net/starcraft/images/5/59/ConcussiveShells_SC2_Icon1.jpg',
        description: 'Marauder attacks slow enemy movement speed.',
        race: 'Terran',
        type: 'upgrade'
    },
    'Charge': {
        name: 'Charge',
        imageUrl: 'https://static.wikia.nocookie.net/starcraft/images/1/19/Charge_SC2_Icon1.jpg',
        description: 'Zealots gain ability to charge at enemies for increased speed.',
        race: 'Protoss',
        type: 'upgrade'
    },
    'Blink': {
        name: 'Blink',
        imageUrl: 'https://static.wikia.nocookie.net/starcraft/images/c/c7/Blink_SC2_Icon1.jpg',
        description: 'Stalkers gain ability to teleport short distances.',
        race: 'Protoss',
        type: 'upgrade'
    },
    'Warpgate Research': {
        name: 'Warpgate Research',
        imageUrl: 'https://static.wikia.nocookie.net/starcraft/images/1/14/WarpGate_SC2_Icon1.jpg',
        description: 'Allows Gateways to transform into Warp Gates for instant unit production.',
        race: 'Protoss',
        type: 'upgrade'
    },
    'Zergling Speed': {
        name: 'Zergling Speed',
        imageUrl: 'https://static.wikia.nocookie.net/starcraft/images/9/9b/MetabolicBoost_SC2_Icon1.jpg',
        description: 'Metabolic Boost. Increases Zergling movement speed significantly.',
        race: 'Zerg',
        type: 'upgrade'
    },
    'Metabolic Boost': {
        name: 'Metabolic Boost',
        imageUrl: 'https://static.wikia.nocookie.net/starcraft/images/9/9b/MetabolicBoost_SC2_Icon1.jpg',
        description: 'Increases Zergling movement speed significantly.',
        race: 'Zerg',
        type: 'upgrade'
    }
};

// Helper function to get unit data by name
export function getUnitData(actionName: string): UnitData | undefined {
    // Try exact match first
    if (unitDatabase[actionName]) {
        return unitDatabase[actionName];
    }

    // Try partial match (e.g., "Barracks x2" should match "Barracks")
    for (const [key, data] of Object.entries(unitDatabase)) {
        if (actionName.includes(key)) {
            return data;
        }
    }

    return undefined;
}

// Helper to get all units for a race
export function getUnitsByRace(race: 'Terran' | 'Protoss' | 'Zerg'): UnitData[] {
    return Object.values(unitDatabase).filter(unit => unit.race === race);
}
