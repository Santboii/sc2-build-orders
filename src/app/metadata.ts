import { Metadata } from 'next';
import { buildOrders } from '@/data/buildOrders';
import { BuildOrder, BuildOrderStep } from '@/types';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sc2builds.com';
const siteName = 'SC2 Build Order Trainer';
const siteDescription = 'Master StarCraft 2 with pro-level build orders for Terran, Protoss, and Zerg. Study builds from top players like Clem, MaxPax, Serral, and more.';

export const defaultMetadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: `${siteName} - Master StarCraft 2 Strategies`,
        template: `%s | ${siteName}`
    },
    description: siteDescription,
    keywords: [
        'StarCraft 2',
        'SC2',
        'build orders',
        'Terran builds',
        'Protoss builds',
        'Zerg builds',
        'pro builds',
        'Clem',
        'MaxPax',
        'Serral',
        'uThermal',
        'PiG',
        'RTS strategy',
        'esports',
        'gaming guide'
    ],
    authors: [{ name: 'SC2 Build Order Trainer' }],
    creator: 'SC2 Build Order Trainer',
    publisher: 'SC2 Build Order Trainer',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteUrl,
        siteName,
        title: `${siteName} - Master StarCraft 2 Strategies`,
        description: siteDescription,
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'SC2 Build Order Trainer'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: `${siteName} - Master StarCraft 2 Strategies`,
        description: siteDescription,
        images: ['/images/og-image.jpg'],
        creator: '@sc2builds'
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1
        }
    },
    verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    }
};

export function generateRaceMetadata(race: 'Terran' | 'Protoss' | 'Zerg'): Metadata {
    const raceBuilds = buildOrders.filter((b: BuildOrder) => b.race === race);
    const buildCount = raceBuilds.length;

    const raceDescriptions = {
        Terran: `Explore ${buildCount} Terran build orders for StarCraft 2. Master bio, mech, and air strategies with builds from Clem, uThermal, and other top players.`,
        Protoss: `Discover ${buildCount} Protoss build orders for StarCraft 2. Learn gateway, robo, and stargate builds from MaxPax, herO, and pro players.`,
        Zerg: `Study ${buildCount} Zerg build orders for StarCraft 2. Perfect your macro with builds from Serral, Reynor, and top Zerg players.`
    };

    return {
        title: `${race} Build Orders`,
        description: raceDescriptions[race],
        openGraph: {
            title: `${race} Build Orders | ${siteName}`,
            description: raceDescriptions[race],
            url: `${siteUrl}/${race.toLowerCase()}`,
            images: [
                {
                    url: `/images/races/${race.toLowerCase()}.jpg`,
                    width: 1200,
                    height: 630,
                    alt: `${race} Build Orders`
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: `${race} Build Orders | ${siteName}`,
            description: raceDescriptions[race],
            images: [`/images/races/${race.toLowerCase()}.jpg`]
        }
    };
}

export function generateBuildMetadata(buildId: string): Metadata {
    const build = buildOrders.find((b: BuildOrder) => b.id === buildId);

    if (!build) {
        return defaultMetadata;
    }

    const title = `${build.name} - ${build.race} ${build.matchup}`;
    const description = `${build.playStyle} Learn this ${build.difficulty.toLowerCase()} ${build.buildType.toLowerCase()} build for ${build.race} vs ${build.vsRace}. ${build.author ? `By ${build.author}.` : ''}`;

    return {
        title,
        description,
        keywords: [
            build.name,
            build.race,
            build.matchup,
            build.buildType,
            build.difficulty,
            ...(build.author ? [build.author] : []),
            'StarCraft 2',
            'build order',
            'strategy guide'
        ],
        openGraph: {
            title: `${title} | ${siteName}`,
            description,
            url: `${siteUrl}/${build.race.toLowerCase()}/${buildId}`,
            type: 'article',
            images: [
                {
                    url: `/images/races/${build.race.toLowerCase()}.jpg`,
                    width: 1200,
                    height: 630,
                    alt: build.name
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} | ${siteName}`,
            description,
            images: [`/images/races/${build.race.toLowerCase()}.jpg`]
        }
    };
}

export function generateBuildStructuredData(buildId: string) {
    const build = buildOrders.find((b: BuildOrder) => b.id === buildId);

    if (!build) return null;

    return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: build.name,
        description: build.playStyle,
        step: build.steps.map((step: BuildOrderStep, index: number) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: `${step.supply} Supply: ${step.action}`,
            text: step.notes || step.action,
            itemListElement: {
                '@type': 'HowToDirection',
                text: `At ${step.supply} supply, ${step.action}${step.timing ? ` (${step.timing})` : ''}`
            }
        })),
        totalTime: 'PT10M',
        tool: {
            '@type': 'VideoGame',
            name: 'StarCraft II',
            publisher: {
                '@type': 'Organization',
                name: 'Blizzard Entertainment'
            }
        }
    };
}

export function generateBreadcrumbStructuredData(race: string, buildName?: string) {
    const items = [
        {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl
        },
        {
            '@type': 'ListItem',
            position: 2,
            name: `${race} Builds`,
            item: `${siteUrl}/${race.toLowerCase()}`
        }
    ];

    if (buildName) {
        items.push({
            '@type': 'ListItem',
            position: 3,
            name: buildName,
            item: `${siteUrl}/${race.toLowerCase()}/${buildName}`
        });
    }

    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items
    };
}
