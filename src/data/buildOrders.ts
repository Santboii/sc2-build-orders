import { BuildOrder, Race, Matchup } from '@/types';

export const buildOrders: BuildOrder[] = [
    // ============================================================================
    // TERRAN BUILD ORDERS
    // ============================================================================
    {
        id: 'clem-mine-drop-bio',
        name: "Clem's Mine Drop into Bio Push",
        race: 'Terran',
        vsRace: 'Protoss',
        matchup: 'TvP',
        difficulty: 'Advanced',
        buildType: 'Economic',
        playStyle: "Clem's standard mine drop into bio push. This build focuses on early harassment with widow mine drops to disrupt the Protoss economy while transitioning into a strong bio push with upgrades.",
        goals: [
            'Harass with widow mine drops',
            'Delay Protoss tech and expansions',
            'Build strong bio army with upgrades',
            'Execute timing push before Protoss gets too strong'
        ],
        steps: [
            { supply: 14, action: 'Supply Depot' },
            { supply: 16, action: 'Barracks' },
            { supply: 16, action: 'Refinery' },
            { supply: 19, action: 'Orbital Command', timing: '@100% Barracks' },
            { supply: 19, action: 'Reaper' },
            { supply: 20, action: 'Command Center (Natural)' },
            { supply: 20, action: 'Supply Depot' },
            { supply: 21, action: 'Factory' },
            { supply: 22, action: 'Refinery' },
            { supply: 24, action: 'Starport', timing: '@100% Factory' },
            { supply: 26, action: 'Widow Mine', timing: '@100% Factory' },
            { supply: 28, action: 'Medivac', timing: '@100% Starport' },
            { supply: 28, action: 'Engineering Bay' },
            { supply: 30, action: 'Barracks x2' },
            { supply: 32, action: 'Widow Mine Drop', notes: 'Load mines into Medivac and drop in mineral lines' },
            { supply: 36, action: 'Infantry Weapons Level 1', timing: '@100% Engineering Bay' },
            { supply: 40, action: 'Combat Shield' },
            { supply: 44, action: 'Stim Pack' },
            { supply: 50, action: 'Command Center (Third)' },
            { supply: 60, action: 'Barracks x2 (Total 5)' },
            { supply: 70, action: 'Push with Bio + Medivacs', notes: 'Attack with 3-1-1 timing' }
        ],
        transitions: 'Continue bio production, add more barracks, get +2 upgrades, and expand to fourth base',
        counters: ['Fast tech Protoss', 'Greedy expansions'],
        weaknesses: ['Strong early Stalker defense', 'Disruptor tech'],
        author: 'Clem',
        patch: '5.0.11',
        videoUrl: 'https://www.youtube.com/watch?v=358Arl8IInk'
    },
    {
        id: '3racks-uthermal',
        name: '3 Rax All-In (uThermal)',
        race: 'Terran',
        vsRace: 'Terran',
        matchup: 'TvT',
        difficulty: 'Beginner',
        buildType: 'All-In',
        playStyle: 'Aggressive 3-barracks all-in focused on overwhelming the opponent with early Marine production. This build sacrifices economy for military strength and aims to end the game quickly.',
        goals: [
            'Build 3 barracks quickly',
            'Mass Marines with Combat Shield',
            'Attack before opponent can defend',
            'Win with superior numbers'
        ],
        steps: [
            { supply: 14, action: 'Supply Depot' },
            { supply: 16, action: 'Barracks' },
            { supply: 16, action: 'Refinery' },
            { supply: 19, action: 'Orbital Command', timing: '@100% Barracks' },
            { supply: 19, action: 'Marine' },
            { supply: 20, action: 'Barracks x2' },
            { supply: 20, action: 'Supply Depot' },
            { supply: 22, action: 'Tech Lab on Barracks 1' },
            { supply: 24, action: 'Combat Shield', timing: '@100% Tech Lab' },
            { supply: 26, action: 'Supply Depot' },
            { supply: 28, action: 'Constant Marine Production', notes: 'Build Marines from all 3 barracks' },
            { supply: 32, action: 'Supply Depot' },
            { supply: 36, action: 'Attack!', notes: 'Move out with all Marines when Combat Shield finishes' }
        ],
        counters: ['Greedy expansions', 'Slow tank builds'],
        weaknesses: ['Early Bunker defense', 'Siege Tanks'],
        author: 'uThermal',
        patch: '5.0.11',
        videoUrl: 'https://www.youtube.com/watch?v=Z0szkUNWE8o'
    },

    // ============================================================================
    // PROTOSS BUILD ORDERS
    // ============================================================================
    {
        id: 'chargelot-archon-disruptor',
        name: '+1 Chargelot/Archon into Archon/Disruptor',
        race: 'Protoss',
        vsRace: 'Zerg',
        matchup: 'PvZ',
        difficulty: 'Beginner',
        buildType: 'Timing Attack',
        playStyle: 'Safe and powerful PvZ build that has been successful for years. Opens with gateway expand, gets early upgrades, and transitions into a strong Chargelot/Archon timing attack with the option to add Disruptors for late game.',
        goals: [
            'Expand safely with gateway defense',
            'Get +1 attack upgrade early',
            'Build strong Chargelot/Archon army',
            'Pressure Zerg before Hive tech',
            'Transition to Disruptors for late game'
        ],
        steps: [
            { supply: 14, action: 'Pylon' },
            { supply: 16, action: 'Gateway' },
            { supply: 17, action: 'Assimilator' },
            { supply: 20, action: 'Nexus (Natural)' },
            { supply: 20, action: 'Cybernetics Core' },
            { supply: 21, action: 'Pylon' },
            { supply: 22, action: 'Adept', timing: '@100% Gateway' },
            { supply: 23, action: 'Warpgate Research', timing: '@100% Cybernetics Core' },
            { supply: 26, action: 'Assimilator' },
            { supply: 27, action: 'Twilight Council' },
            { supply: 28, action: 'Gateway x2' },
            { supply: 30, action: 'Forge' },
            { supply: 32, action: 'Charge', timing: '@100% Twilight Council' },
            { supply: 33, action: 'Ground Weapons +1', timing: '@100% Forge' },
            { supply: 36, action: 'Gateway x2 (Total 5)' },
            { supply: 38, action: 'Pylon' },
            { supply: 40, action: 'Nexus (Third)' },
            { supply: 44, action: 'Assimilator x2' },
            { supply: 50, action: 'Warp in Zealots continuously' },
            { supply: 60, action: 'Dark Shrine (for Archons)' },
            { supply: 66, action: 'Robotics Facility' },
            { supply: 70, action: 'Attack with Chargelot/Archon', notes: 'Push when +1 finishes and you have 2-3 Archons' },
            { supply: 80, action: 'Robotics Bay', timing: 'After attack' },
            { supply: 85, action: 'Disruptors', notes: 'Add Disruptors for late game army' }
        ],
        transitions: 'Continue Chargelot/Archon/Disruptor production, add more gateways, get +2/+3 upgrades',
        counters: ['Roach timings', 'Greedy Zerg play'],
        weaknesses: ['Lurker tech', 'Nydus all-ins'],
        author: 'Joaco',
        patch: '5.0.11',
        videoUrl: 'https://www.youtube.com/watch?v=3Seqh9MyTkY'
    },
    {
        id: 'blink-stalker-maxpax',
        name: 'Blink Stalker/Prism/Sentry (MaxPax)',
        race: 'Protoss',
        vsRace: 'Protoss',
        matchup: 'PvP',
        difficulty: 'Intermediate',
        buildType: 'Timing Attack',
        playStyle: 'Mobile and aggressive PvP build using Blink Stalkers with Warp Prism and Sentries for force fields. This build focuses on map control and harassment while maintaining a strong defensive position.',
        goals: [
            'Get Blink quickly for mobility',
            'Use Warp Prism for harassment',
            'Control engagements with Sentries',
            'Maintain map control with Stalkers'
        ],
        steps: [
            { supply: 14, action: 'Pylon' },
            { supply: 16, action: 'Gateway' },
            { supply: 17, action: 'Assimilator' },
            { supply: 20, action: 'Nexus (Natural)' },
            { supply: 20, action: 'Cybernetics Core' },
            { supply: 22, action: 'Stalker', timing: '@100% Gateway' },
            { supply: 23, action: 'Warpgate Research', timing: '@100% Cybernetics Core' },
            { supply: 24, action: 'Assimilator' },
            { supply: 26, action: 'Twilight Council' },
            { supply: 27, action: 'Gateway x2' },
            { supply: 28, action: 'Pylon' },
            { supply: 30, action: 'Blink', timing: '@100% Twilight Council' },
            { supply: 32, action: 'Robotics Facility' },
            { supply: 36, action: 'Warp Prism', timing: '@100% Robotics' },
            { supply: 38, action: 'Gateway x2 (Total 5)' },
            { supply: 40, action: 'Assimilator x2' },
            { supply: 44, action: 'Warp in Stalkers + 2 Sentries' },
            { supply: 50, action: 'Harass with Prism', notes: 'Warp in units in opponent\'s base' },
            { supply: 56, action: 'Nexus (Third)' },
            { supply: 60, action: 'Continue Stalker production' }
        ],
        transitions: 'Add Robotics Bay for Colossus or transition to Disruptors',
        counters: ['Greedy tech builds', 'Robo-heavy compositions'],
        weaknesses: ['Strong Immortal defense', 'Archon drops'],
        author: 'MaxPax',
        patch: '5.0.11'
    },

    // ============================================================================
    // ZERG BUILD ORDERS
    // ============================================================================
    {
        id: 'pig-ling-bane',
        name: 'PiG Ling/Bane 2023',
        race: 'Zerg',
        vsRace: 'Terran',
        matchup: 'ZvT',
        difficulty: 'Beginner',
        buildType: 'Timing Attack',
        playStyle: 'Beginner-friendly Ling/Bane build from PiG\'s Bronze to GM series. Focuses on solid macro fundamentals with a Zergling/Baneling timing attack. Great for learning Zerg basics.',
        goals: [
            'Hatch first for economy',
            'Get Zergling speed quickly',
            'Build Banelings for attack',
            'Attack with Ling/Bane timing',
            'Transition to Roach/Hydra'
        ],
        steps: [
            { supply: 12, action: 'Overlord', notes: 'Scout with this Overlord' },
            { supply: 16, action: 'Hatchery (Natural)' },
            { supply: 18, action: 'Extractor' },
            { supply: 17, action: 'Spawning Pool' },
            { supply: 19, action: 'Overlord' },
            { supply: 20, action: 'Queen x2', timing: '@100% Spawning Pool', notes: 'One for each hatchery' },
            { supply: 20, action: 'Zergling Speed (Metabolic Boost)', timing: '@100% Spawning Pool' },
            { supply: 22, action: 'Overlord' },
            { supply: 26, action: 'Queen x2 (Total 4)' },
            { supply: 30, action: 'Hatchery (Third)' },
            { supply: 32, action: 'Extractor x2 (Total 3)' },
            { supply: 36, action: 'Baneling Nest' },
            { supply: 38, action: 'Overlord x2' },
            { supply: 44, action: 'Lair', timing: '@100% Baneling Nest' },
            { supply: 50, action: 'Zerglings x16', notes: 'Build Zerglings for attack' },
            { supply: 60, action: 'Morph 8 Banelings' },
            { supply: 66, action: 'Attack!', notes: 'Attack with Ling/Bane when speed finishes', timing: '@100% Zergling Speed' },
            { supply: 70, action: 'Roach Warren', notes: 'Start transition' },
            { supply: 80, action: 'Hydralisk Den', timing: '@100% Lair' }
        ],
        transitions: 'Transition to Roach/Hydra production, take fourth base, get upgrades',
        counters: ['Greedy Terran play', 'Fast third Command Center'],
        weaknesses: ['Bunker walls', 'Tank positioning'],
        author: 'PiG',
        patch: '5.0.11',
        videoUrl: 'https://www.youtube.com/watch?v=A9m2VsBPPvQ&t=8456s'
    },
    {
        id: 'roach-all-in-zvp',
        name: '16 Pool Roach All-In',
        race: 'Zerg',
        vsRace: 'Protoss',
        matchup: 'ZvP',
        difficulty: 'Intermediate',
        buildType: 'All-In',
        playStyle: 'Aggressive Roach all-in that hits before Protoss can get strong tech units. This build focuses on overwhelming the Protoss with mass Roaches before they can defend effectively.',
        goals: [
            'Get Roaches quickly',
            'Attack before Protoss tech',
            'Overwhelm with numbers',
            'Win before Immortals arrive'
        ],
        steps: [
            { supply: 12, action: 'Overlord' },
            { supply: 16, action: 'Spawning Pool' },
            { supply: 16, action: 'Hatchery (Natural)' },
            { supply: 17, action: 'Extractor' },
            { supply: 18, action: 'Overlord' },
            { supply: 19, action: 'Queen x2', timing: '@100% Spawning Pool' },
            { supply: 20, action: 'Zergling x4', notes: 'For defense and scouting' },
            { supply: 24, action: 'Overlord' },
            { supply: 26, action: 'Roach Warren' },
            { supply: 28, action: 'Extractor x2 (Total 3)' },
            { supply: 30, action: 'Overlord x2' },
            { supply: 32, action: 'Roaches (Continuous)', timing: '@100% Roach Warren', notes: 'Build Roaches non-stop' },
            { supply: 40, action: 'Overlord x2' },
            { supply: 50, action: 'Attack with Roaches', notes: 'Attack when you have 12-14 Roaches', timing: '@6:00' }
        ],
        counters: ['Greedy Protoss tech', 'Fast third Nexus'],
        weaknesses: ['Early Immortal defense', 'Strong wall-offs'],
        author: 'Serral',
        patch: '5.0.11'
    },
    {
        id: 'hatch-first-macro-zvz',
        name: 'Hatch First Macro (ZvZ)',
        race: 'Zerg',
        vsRace: 'Zerg',
        matchup: 'ZvZ',
        difficulty: 'Intermediate',
        buildType: 'Economic',
        playStyle: 'Greedy hatch-first opener in ZvZ that prioritizes economy over early aggression. Relies on good Queen and Spine Crawler defense to hold off early pressure while building a strong economy.',
        goals: [
            'Expand quickly for economy',
            'Defend with Queens and Spines',
            'Get Roach Warren for defense',
            'Outmacro opponent',
            'Transition to Roach/Hydra or Mutalisk'
        ],
        steps: [
            { supply: 12, action: 'Overlord' },
            { supply: 16, action: 'Hatchery (Natural)' },
            { supply: 18, action: 'Extractor' },
            { supply: 17, action: 'Spawning Pool' },
            { supply: 19, action: 'Overlord' },
            { supply: 20, action: 'Queen x2', timing: '@100% Spawning Pool' },
            { supply: 22, action: 'Spine Crawler x2', notes: 'Build at natural for defense' },
            { supply: 24, action: 'Overlord' },
            { supply: 26, action: 'Queen x2 (Total 4)' },
            { supply: 30, action: 'Roach Warren' },
            { supply: 32, action: 'Extractor x2 (Total 3)' },
            { supply: 36, action: 'Hatchery (Third)' },
            { supply: 38, action: 'Overlord x2' },
            { supply: 44, action: 'Lair' },
            { supply: 50, action: 'Roaches (as needed for defense)' },
            { supply: 60, action: 'Hydralisk Den or Spire', notes: 'Choose based on opponent' }
        ],
        transitions: 'Roach/Hydra for ground armies, Mutalisk for air control, or Lurkers for positional play',
        counters: ['Greedy Zerg play', 'Slow Roach builds'],
        weaknesses: ['12 Pool all-ins', 'Early Roach pressure'],
        patch: '5.0.11'
    },

    // ============================================================================
    // ADDITIONAL TERRAN BUILD ORDERS
    // ============================================================================
    {
        id: 'marine-tank-push-tvz',
        name: 'Marine/Tank Push',
        race: 'Terran',
        vsRace: 'Zerg',
        matchup: 'TvZ',
        difficulty: 'Intermediate',
        buildType: 'Timing Attack',
        playStyle: 'Classic Marine/Tank timing push that hits before Zerg can get Hive tech. Focuses on strong positioning with Siege Tanks while Marines provide DPS.',
        goals: [
            'Get Factory and Starport quickly',
            'Build Siege Tanks for defense and push',
            'Add Medivacs for healing',
            'Execute timing before Ultralisks'
        ],
        steps: [
            { supply: 14, action: 'Supply Depot' },
            { supply: 16, action: 'Barracks' },
            { supply: 16, action: 'Refinery' },
            { supply: 19, action: 'Orbital Command', timing: '@100% Barracks' },
            { supply: 19, action: 'Reaper' },
            { supply: 20, action: 'Command Center (Natural)' },
            { supply: 20, action: 'Supply Depot' },
            { supply: 21, action: 'Factory' },
            { supply: 22, action: 'Refinery' },
            { supply: 24, action: 'Starport', timing: '@100% Factory' },
            { supply: 26, action: 'Siege Tank', timing: '@100% Factory' },
            { supply: 28, action: 'Medivac', timing: '@100% Starport' },
            { supply: 30, action: 'Barracks x2' },
            { supply: 32, action: 'Siege Tank x2' },
            { supply: 36, action: 'Engineering Bay' },
            { supply: 40, action: 'Infantry Weapons +1' },
            { supply: 44, action: 'Stim Pack' },
            { supply: 50, action: 'Push with Marine/Tank', notes: 'Attack with 4-5 Tanks and Marines' }
        ],
        transitions: 'Add more Factories, get +2 upgrades, expand to third',
        counters: ['Greedy Zerg macro', 'Roach/Ravager timings'],
        weaknesses: ['Ling/Bane all-ins', 'Nydus attacks'],
        patch: '5.0.11'
    },
    {
        id: '2-1-1-tvt',
        name: '2-1-1 Standard (TvT)',
        race: 'Terran',
        vsRace: 'Terran',
        matchup: 'TvT',
        difficulty: 'Intermediate',
        buildType: 'Economic',
        playStyle: 'Standard 2-1-1 opener for TvT that provides flexibility. Gets Tanks for defense while building economy and transitioning to bio or mech based on opponent.',
        goals: [
            'Safe expansion with Tank defense',
            'Scout opponent strategy',
            'Maintain map control',
            'Transition based on opponent composition'
        ],
        steps: [
            { supply: 14, action: 'Supply Depot' },
            { supply: 16, action: 'Barracks' },
            { supply: 16, action: 'Refinery' },
            { supply: 19, action: 'Orbital Command', timing: '@100% Barracks' },
            { supply: 19, action: 'Reaper' },
            { supply: 20, action: 'Command Center (Natural)' },
            { supply: 20, action: 'Supply Depot' },
            { supply: 21, action: 'Factory' },
            { supply: 22, action: 'Refinery' },
            { supply: 24, action: 'Starport', timing: '@100% Factory' },
            { supply: 26, action: 'Siege Tank', timing: '@100% Factory' },
            { supply: 28, action: 'Medivac', timing: '@100% Starport' },
            { supply: 30, action: 'Barracks' },
            { supply: 32, action: 'Siege Tank' },
            { supply: 36, action: 'Engineering Bay' },
            { supply: 40, action: 'Stim Pack' },
            { supply: 44, action: 'Command Center (Third)' }
        ],
        transitions: 'Bio with Medivacs and Tanks, or transition to Mech with more Factories',
        counters: ['Greedy expansions', 'Air-heavy play'],
        weaknesses: ['Early Marine pressure', 'Banshee rush'],
        patch: '5.0.11'
    },

    // ============================================================================
    // ADDITIONAL PROTOSS BUILD ORDERS
    // ============================================================================
    {
        id: 'pvz-benchmark',
        name: 'PvZ Benchmark',
        race: 'Protoss',
        vsRace: 'Zerg',
        matchup: 'PvZ',
        difficulty: 'Beginner',
        buildType: 'Economic',
        playStyle: 'Standard macro-oriented PvZ build that focuses on solid fundamentals. Safe gateway expand into Stargate for Oracle harassment and map control.',
        goals: [
            'Expand safely',
            'Get Oracle for harassment',
            'Build strong gateway army',
            'Take third base quickly'
        ],
        steps: [
            { supply: 14, action: 'Pylon' },
            { supply: 16, action: 'Gateway' },
            { supply: 17, action: 'Assimilator' },
            { supply: 20, action: 'Nexus (Natural)' },
            { supply: 20, action: 'Cybernetics Core' },
            { supply: 22, action: 'Adept', timing: '@100% Gateway' },
            { supply: 23, action: 'Warpgate Research' },
            { supply: 26, action: 'Assimilator' },
            { supply: 27, action: 'Stargate' },
            { supply: 28, action: 'Gateway x2' },
            { supply: 30, action: 'Oracle', timing: '@100% Stargate' },
            { supply: 32, action: 'Pylon' },
            { supply: 36, action: 'Nexus (Third)' },
            { supply: 38, action: 'Forge' },
            { supply: 40, action: 'Gateway x2 (Total 5)' },
            { supply: 44, action: 'Twilight Council' },
            { supply: 50, action: 'Charge' }
        ],
        transitions: 'Add Robotics for Immortals/Disruptors, or more Stargates for air',
        counters: ['Roach timings', 'Greedy Zerg'],
        weaknesses: ['12 Pool all-ins', 'Nydus attacks'],
        patch: '5.0.11'
    },
    {
        id: '2base-archon-immortal-pvp',
        name: 'Two Base Archon/Immortal Timing',
        race: 'Protoss',
        vsRace: 'Protoss',
        matchup: 'PvP',
        difficulty: 'Advanced',
        buildType: 'Timing Attack',
        playStyle: 'Powerful two-base all-in with Archons and Immortals. Hits before opponent can get critical mass of units.',
        goals: [
            'Fast Robotics and Dark Shrine',
            'Build Immortals and Archons',
            'Attack at 2-base timing',
            'Overwhelm with powerful units'
        ],
        steps: [
            { supply: 14, action: 'Pylon' },
            { supply: 16, action: 'Gateway' },
            { supply: 17, action: 'Assimilator' },
            { supply: 20, action: 'Nexus (Natural)' },
            { supply: 20, action: 'Cybernetics Core' },
            { supply: 22, action: 'Stalker' },
            { supply: 23, action: 'Warpgate Research' },
            { supply: 24, action: 'Assimilator' },
            { supply: 26, action: 'Robotics Facility' },
            { supply: 27, action: 'Gateway x2' },
            { supply: 30, action: 'Immortal', timing: '@100% Robotics' },
            { supply: 32, action: 'Dark Shrine' },
            { supply: 36, action: 'Assimilator x2 (Total 4)' },
            { supply: 40, action: 'Warp in High Templars' },
            { supply: 44, action: 'Merge Archons' },
            { supply: 50, action: 'Attack with Archon/Immortal', notes: 'Push with 2-3 Immortals and 2-3 Archons' }
        ],
        counters: ['Greedy tech', 'Robo-heavy builds'],
        weaknesses: ['Early Stalker pressure', 'Strong Immortal defense'],
        patch: '5.0.11'
    },
    {
        id: 'immortal-allin-pvt',
        name: 'Immortal All-In (ShaDoWn)',
        race: 'Protoss',
        vsRace: 'Terran',
        matchup: 'PvT',
        difficulty: 'Advanced',
        buildType: 'All-In',
        playStyle: 'Aggressive Immortal-based all-in that hits Terran before they can get critical mass of Vikings or Liberators. Used by ShaDoWn vs HeRoMaRinE.',
        goals: [
            'Fast Robotics Facility',
            'Mass Immortals quickly',
            'Attack before air transition',
            'Break Terran defense'
        ],
        steps: [
            { supply: 14, action: 'Pylon' },
            { supply: 16, action: 'Gateway' },
            { supply: 17, action: 'Assimilator' },
            { supply: 20, action: 'Nexus (Natural)' },
            { supply: 20, action: 'Cybernetics Core' },
            { supply: 22, action: 'Stalker' },
            { supply: 23, action: 'Warpgate Research' },
            { supply: 24, action: 'Assimilator' },
            { supply: 26, action: 'Robotics Facility' },
            { supply: 27, action: 'Gateway x2' },
            { supply: 30, action: 'Immortal', timing: '@100% Robotics' },
            { supply: 32, action: 'Robotics Facility x2 (Total 3)' },
            { supply: 36, action: 'Assimilator x2 (Total 4)' },
            { supply: 40, action: 'Immortals (Continuous)' },
            { supply: 50, action: 'Warp Prism' },
            { supply: 60, action: 'Attack!', notes: 'Push with 6-8 Immortals and Warp Prism', timing: '@7:30' }
        ],
        counters: ['Greedy Terran play', 'Fast third base'],
        weaknesses: ['Bunker walls', 'Early Liberators'],
        author: 'ShaDoWn',
        patch: '5.0.11'
    },
    {
        id: 'grandmaster-pvz',
        name: 'Easy Build Order To Get Grandmaster League',
        race: 'Protoss',
        vsRace: 'Zerg',
        matchup: 'PvZ',
        difficulty: 'Beginner',
        buildType: 'Economic',
        playStyle: 'Simplified macro build designed for climbing ladder. Focuses on solid fundamentals with Chargelot/Archon composition.',
        goals: [
            'Simple and repeatable',
            'Strong macro foundation',
            'Chargelot/Archon army',
            'Easy to execute'
        ],
        steps: [
            { supply: 14, action: 'Pylon' },
            { supply: 16, action: 'Gateway' },
            { supply: 17, action: 'Assimilator' },
            { supply: 20, action: 'Nexus (Natural)' },
            { supply: 20, action: 'Cybernetics Core' },
            { supply: 22, action: 'Adept' },
            { supply: 23, action: 'Warpgate Research' },
            { supply: 26, action: 'Assimilator' },
            { supply: 27, action: 'Twilight Council' },
            { supply: 28, action: 'Gateway x2' },
            { supply: 30, action: 'Forge' },
            { supply: 32, action: 'Charge' },
            { supply: 33, action: 'Ground Weapons +1' },
            { supply: 36, action: 'Gateway x2 (Total 5)' },
            { supply: 40, action: 'Nexus (Third)' },
            { supply: 44, action: 'Dark Shrine' },
            { supply: 50, action: 'Warp in Zealots continuously' },
            { supply: 60, action: 'Archons from High Templars' }
        ],
        transitions: 'Continue Chargelot/Archon, add Disruptors or Storm',
        counters: ['Roach timings', 'Greedy Zerg'],
        weaknesses: ['Lurker tech', 'Nydus all-ins'],
        patch: '5.0.11'
    },

    // ============================================================================
    // ADDITIONAL ZERG BUILD ORDERS
    // ============================================================================
    {
        id: 'zvp-vs-stargate',
        name: 'ZvP vs Stargate',
        race: 'Zerg',
        vsRace: 'Protoss',
        matchup: 'ZvP',
        difficulty: 'Intermediate',
        buildType: 'Economic',
        playStyle: 'Defensive build designed to counter Protoss Stargate openings. Gets Queens and Spores for air defense while building economy.',
        goals: [
            'Defend against Oracle/Phoenix',
            'Get extra Queens for defense',
            'Build Spore Crawlers',
            'Transition to Roach/Hydra'
        ],
        steps: [
            { supply: 12, action: 'Overlord' },
            { supply: 16, action: 'Hatchery (Natural)' },
            { supply: 18, action: 'Extractor' },
            { supply: 17, action: 'Spawning Pool' },
            { supply: 19, action: 'Overlord' },
            { supply: 20, action: 'Queen x2', timing: '@100% Spawning Pool' },
            { supply: 22, action: 'Overlord' },
            { supply: 26, action: 'Queen x2 (Total 4)', notes: 'Extra Queens for air defense' },
            { supply: 28, action: 'Spore Crawler x2', notes: 'At each base' },
            { supply: 30, action: 'Hatchery (Third)' },
            { supply: 32, action: 'Extractor x2 (Total 3)' },
            { supply: 36, action: 'Roach Warren' },
            { supply: 40, action: 'Lair' },
            { supply: 44, action: 'Overlord x2' },
            { supply: 50, action: 'Hydralisk Den', timing: '@100% Lair' },
            { supply: 60, action: 'Roach/Hydra production' }
        ],
        transitions: 'Continue Roach/Hydra, add Lurkers or Vipers',
        counters: ['Oracle harassment', 'Phoenix openings'],
        weaknesses: ['Ground all-ins', 'Immortal pushes'],
        patch: '5.0.11'
    },
    {
        id: 'zvp-vs-twilight',
        name: 'ZvP vs Twilight',
        race: 'Zerg',
        vsRace: 'Protoss',
        matchup: 'ZvP',
        difficulty: 'Intermediate',
        buildType: 'Economic',
        playStyle: 'Response to Protoss Twilight Council openings. Prepares for Chargelot or Blink Stalker attacks while building economy.',
        goals: [
            'Scout Twilight Council',
            'Get Roach Warren for defense',
            'Build Roaches as needed',
            'Expand and drone'
        ],
        steps: [
            { supply: 12, action: 'Overlord' },
            { supply: 16, action: 'Hatchery (Natural)' },
            { supply: 18, action: 'Extractor' },
            { supply: 17, action: 'Spawning Pool' },
            { supply: 19, action: 'Overlord' },
            { supply: 20, action: 'Queen x2' },
            { supply: 22, action: 'Overlord' },
            { supply: 26, action: 'Queen x2 (Total 4)' },
            { supply: 28, action: 'Roach Warren', notes: 'Build when you scout Twilight' },
            { supply: 30, action: 'Hatchery (Third)' },
            { supply: 32, action: 'Extractor x2 (Total 3)' },
            { supply: 36, action: 'Lair' },
            { supply: 40, action: 'Roaches (as needed for defense)' },
            { supply: 44, action: 'Overlord x2' },
            { supply: 50, action: 'Hydralisk Den' },
            { supply: 60, action: 'Roach/Hydra army' }
        ],
        transitions: 'Add Lurkers for defense, or Vipers for late game',
        counters: ['Chargelot timings', 'Blink Stalker attacks'],
        weaknesses: ['Disruptor tech', 'Storm'],
        patch: '5.0.11'
    },
    {
        id: 'zvt-standard',
        name: 'ZvT Standard Macro',
        race: 'Zerg',
        vsRace: 'Terran',
        matchup: 'ZvT',
        difficulty: 'Beginner',
        buildType: 'Economic',
        playStyle: 'Standard macro-oriented ZvT build. Hatch first into Ling/Bane with transition to Roach/Hydra or Muta.',
        goals: [
            'Hatch first for economy',
            'Get Zergling speed',
            'Build Banelings for defense',
            'Transition based on Terran composition'
        ],
        steps: [
            { supply: 12, action: 'Overlord' },
            { supply: 16, action: 'Hatchery (Natural)' },
            { supply: 18, action: 'Extractor' },
            { supply: 17, action: 'Spawning Pool' },
            { supply: 19, action: 'Overlord' },
            { supply: 20, action: 'Queen x2' },
            { supply: 20, action: 'Zergling Speed' },
            { supply: 22, action: 'Overlord' },
            { supply: 26, action: 'Queen x2 (Total 4)' },
            { supply: 30, action: 'Hatchery (Third)' },
            { supply: 32, action: 'Extractor x2 (Total 3)' },
            { supply: 36, action: 'Baneling Nest' },
            { supply: 40, action: 'Lair' },
            { supply: 44, action: 'Overlord x2' },
            { supply: 50, action: 'Roach Warren or Spire', notes: 'Choose based on Terran' },
            { supply: 60, action: 'Hydralisk Den', timing: '@100% Lair' }
        ],
        transitions: 'Roach/Hydra vs bio, Muta/Ling/Bane vs mech',
        counters: ['Greedy Terran', 'Fast third CC'],
        weaknesses: ['Bunker rushes', 'Tank pushes'],
        patch: '5.0.11'
    },
    {
        id: '12pool-zvz',
        name: '12 Pool Aggression (ZvZ)',
        race: 'Zerg',
        vsRace: 'Zerg',
        matchup: 'ZvZ',
        difficulty: 'Beginner',
        buildType: 'Timing Attack',
        playStyle: 'Aggressive 12 Pool opener in ZvZ. Applies early pressure with Zerglings while expanding behind it.',
        goals: [
            'Early Spawning Pool',
            'Pressure with Zerglings',
            'Expand behind aggression',
            'Transition to Roaches'
        ],
        steps: [
            { supply: 12, action: 'Spawning Pool' },
            { supply: 12, action: 'Overlord' },
            { supply: 13, action: 'Extractor' },
            { supply: 14, action: 'Queen', timing: '@100% Spawning Pool' },
            { supply: 14, action: 'Zergling Speed' },
            { supply: 16, action: 'Zerglings x6' },
            { supply: 19, action: 'Hatchery (Natural)' },
            { supply: 20, action: 'Overlord' },
            { supply: 22, action: 'Queen' },
            { supply: 24, action: 'Overlord' },
            { supply: 26, action: 'Roach Warren' },
            { supply: 30, action: 'Extractor x2 (Total 3)' },
            { supply: 32, action: 'Overlord x2' },
            { supply: 36, action: 'Roaches', timing: '@100% Roach Warren' },
            { supply: 40, action: 'Hatchery (Third)' }
        ],
        transitions: 'Continue Roach production, add Hydras or Mutas',
        counters: ['Hatch first', 'Greedy play'],
        weaknesses: ['14 Pool with good defense', 'Spine Crawlers'],
        patch: '5.0.11'
    },
    {
        id: 'roach-ravager-zvp',
        name: 'Roach/Ravager Timing',
        race: 'Zerg',
        vsRace: 'Protoss',
        matchup: 'ZvP',
        difficulty: 'Intermediate',
        buildType: 'Timing Attack',
        playStyle: 'Mid-game Roach/Ravager timing that hits before Protoss gets strong splash damage. Uses Corrosive Bile to break forcefields and buildings.',
        goals: [
            'Fast Roach Warren',
            'Get Ravagers quickly',
            'Attack at 2-base timing',
            'Use Bile to break defenses'
        ],
        steps: [
            { supply: 12, action: 'Overlord' },
            { supply: 16, action: 'Hatchery (Natural)' },
            { supply: 18, action: 'Extractor' },
            { supply: 17, action: 'Spawning Pool' },
            { supply: 19, action: 'Overlord' },
            { supply: 20, action: 'Queen x2' },
            { supply: 22, action: 'Overlord' },
            { supply: 26, action: 'Roach Warren' },
            { supply: 28, action: 'Extractor x2 (Total 3)' },
            { supply: 30, action: 'Overlord x2' },
            { supply: 32, action: 'Lair' },
            { supply: 36, action: 'Roaches (Continuous)' },
            { supply: 40, action: 'Glial Reconstitution', timing: '@100% Lair', notes: 'Roach speed' },
            { supply: 44, action: 'Morph Ravagers', notes: 'Morph 4-6 Ravagers' },
            { supply: 50, action: 'Attack!', notes: 'Push with 12+ Roaches and 4-6 Ravagers', timing: '@7:00' }
        ],
        counters: ['Greedy Protoss', 'Fast third Nexus'],
        weaknesses: ['Immortal defense', 'Disruptors'],
        patch: '5.0.11'
    },
    {
        id: 'muta-ling-bane-zvt',
        name: 'Muta/Ling/Bane',
        race: 'Zerg',
        vsRace: 'Terran',
        matchup: 'ZvT',
        difficulty: 'Advanced',
        buildType: 'Economic',
        playStyle: 'Mobile and aggressive style using Mutalisks for harassment and Ling/Bane for engagements. Requires good multitasking.',
        goals: [
            'Get Spire quickly',
            'Harass with Mutalisks',
            'Control with Ling/Bane',
            'Deny Terran expansions'
        ],
        steps: [
            { supply: 12, action: 'Overlord' },
            { supply: 16, action: 'Hatchery (Natural)' },
            { supply: 18, action: 'Extractor' },
            { supply: 17, action: 'Spawning Pool' },
            { supply: 19, action: 'Overlord' },
            { supply: 20, action: 'Queen x2' },
            { supply: 20, action: 'Zergling Speed' },
            { supply: 22, action: 'Overlord' },
            { supply: 26, action: 'Queen x2 (Total 4)' },
            { supply: 30, action: 'Hatchery (Third)' },
            { supply: 32, action: 'Extractor x2 (Total 3)' },
            { supply: 36, action: 'Lair' },
            { supply: 38, action: 'Overlord x2' },
            { supply: 40, action: 'Spire', timing: '@100% Lair' },
            { supply: 44, action: 'Baneling Nest' },
            { supply: 50, action: 'Mutalisks', timing: '@100% Spire', notes: 'Build 8-12 Mutalisks' },
            { supply: 60, action: 'Harass with Mutas', notes: 'Attack mineral lines and Medivacs' }
        ],
        transitions: 'Continue Muta production, add Banelings for defense',
        counters: ['Mech play', 'Greedy Terran'],
        weaknesses: ['Marine/Widow Mine', 'Thors'],
        patch: '5.0.11'
    }
];

// Helper functions
export function getBuildOrdersByRace(race: Race): BuildOrder[] {
    return buildOrders.filter(build => build.race === race);
}

export function getBuildOrdersByMatchup(matchup: Matchup): BuildOrder[] {
    return buildOrders.filter(build => build.matchup === matchup);
}

export function getBuildOrderById(id: string): BuildOrder | undefined {
    return buildOrders.find(build => build.id === id);
}

export function getMatchupsForRace(race: Race): Matchup[] {
    const matchups: Matchup[] = [];
    if (race === 'Terran') matchups.push('TvT', 'TvP', 'TvZ');
    if (race === 'Protoss') matchups.push('PvP', 'PvT', 'PvZ');
    if (race === 'Zerg') matchups.push('ZvZ', 'ZvT', 'ZvP');
    return matchups;
}

export function formatSupply(supply: number): string {
    return `${supply}`;
}
