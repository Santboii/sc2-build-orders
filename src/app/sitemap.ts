import { MetadataRoute } from 'next';
import { buildOrders } from '@/data/buildOrders';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sc2builds.com';

    // Home page
    const routes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0
        }
    ];

    // Race pages
    const races = ['terran', 'protoss', 'zerg'];
    races.forEach(race => {
        routes.push({
            url: `${baseUrl}/${race}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9
        });
    });

    // Individual build order pages
    buildOrders.forEach(build => {
        routes.push({
            url: `${baseUrl}/${build.race.toLowerCase()}/${build.id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8
        });
    });

    return routes;
}
