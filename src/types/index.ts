export type Race = 'Terran' | 'Protoss' | 'Zerg';
export type Matchup = 'TvT' | 'TvP' | 'TvZ' | 'TvX' | 'PvP' | 'PvT' | 'PvZ' | 'PvX' | 'ZvZ' | 'ZvT' | 'ZvP' | 'ZvX';
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type BuildType = 'Economic' | 'Timing Attack' | 'All-In' | 'Cheese' | 'Defensive';

export interface BuildOrderStep {
  supply: number;           // e.g., 14, 16, 18
  action: string;           // e.g., "Supply Depot", "Barracks"
  icon?: string;            // e.g., "🏭", "⚔️" - emoji/unicode symbol
  notes?: string;           // Optional tactical notes
  timing?: string;          // e.g., "@100% Barracks", "@6:15"
}

export interface BuildOrder {
  id: string;
  name: string;             // e.g., "2-1-1 Marine Push"
  race: Race;
  vsRace: Race;             // Opponent's race
  matchup: Matchup;
  difficulty: Difficulty;
  buildType: BuildType;
  playStyle: string;        // Detailed description
  goals: string[];          // Strategic objectives
  steps: BuildOrderStep[];
  transitions?: string;     // Mid/late game transitions
  counters?: string[];      // What this build counters
  weaknesses?: string[];    // Vulnerabilities
  author?: string;          // Pro player or source
  patch?: string;           // Game version
  videoUrl?: string;        // YouTube guide
}
