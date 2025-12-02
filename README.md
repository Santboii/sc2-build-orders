# SC2 Build Orders

A modern web application for learning and practicing StarCraft 2 build orders. Features pro-level builds from top players like Clem, MaxPax, Serral, and more.

## Features

- **Race-specific Build Orders** - Browse builds for Terran, Protoss, and Zerg
- **Matchup Filtering** - Filter builds by matchup (TvP, ZvT, PvZ, etc.)
- **Study Mode** - Step through builds one action at a time with keyboard navigation
- **Follow Along Mode** - Real-time timer to practice builds in sync with your games
- **Unit Tooltips** - Hover over units/buildings for detailed information and images
- **Pro Player Builds** - Curated builds from top players including:
  - Clem, uThermal (Terran)
  - MaxPax, ShaDoWn (Protoss)
  - Serral, PiG (Zerg)
- **Current Meta** - Builds updated for patch 5.0.11

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Santboii/sc2-build-orders.git
   cd sc2-build-orders
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router
- **Language**: TypeScript
- **UI**: React 19
- **Icons**: [Lucide React](https://lucide.dev)
- **Styling**: CSS with CSS Variables

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page with race selection
│   └── [race]/            # Dynamic race routes
│       ├── page.tsx       # Build order list for a race
│       └── [buildId]/     # Individual build order pages
│           └── page.tsx   # Build order detail with study/follow modes
├── components/            # Reusable React components
│   └── UnitTooltip.tsx   # Unit/building info tooltips
├── data/                  # Static data
│   ├── buildOrders.ts    # All build order definitions
│   └── unitData.ts       # Unit/building information
├── types/                 # TypeScript type definitions
│   └── index.ts          # Race, Matchup, BuildOrder types
└── utils/                 # Utility functions
public/
└── images/               # Static assets
    ├── logos/            # Race logos
    ├── races/            # Race artwork
    └── units/            # Unit/building images
```

## Build Orders Included

The application includes build orders across all matchups:

### Terran
- Clem's Mine Drop into Bio Push (TvP)
- 3 Rax All-In by uThermal (TvT)
- Marine/Tank Push (TvZ)
- 2-1-1 Standard (TvT)

### Protoss
- +1 Chargelot/Archon into Disruptor (PvZ)
- Blink Stalker/Prism/Sentry by MaxPax (PvP)
- Immortal All-In by ShaDoWn (PvT)
- PvZ Benchmark (PvZ)
- Two Base Archon/Immortal Timing (PvP)

### Zerg
- PiG Ling/Bane (ZvT)
- 16 Pool Roach All-In (ZvP)
- Hatch First Macro (ZvZ)
- Muta/Ling/Bane (ZvT)
- Roach/Ravager Timing (ZvP)
- 12 Pool Aggression (ZvZ)

## Contributing

Contributions are welcome! Feel free to:

- Add new build orders
- Update existing builds for new patches
- Improve the UI/UX
- Fix bugs or typos

## License

This project is open source. StarCraft 2 and all related assets are trademarks of Blizzard Entertainment.
