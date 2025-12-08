import { getBuildOrderById } from '@/data/buildOrders';
import BuildDetailClient from '@/components/BuildDetailClient';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ race: string; buildId: string }> }) {
    const { race, buildId } = await params;
    const build = getBuildOrderById(buildId);

    if (!build) {
        return {
            title: 'Build Not Found - SC2 Build Order Trainer'
        };
    }

    return {
        title: `${build.name} (${race}) - SC2 Build Order Trainer`,
        description: `Learn the ${build.name} build order for ${race} in StarCraft 2. ${build.playStyle} style.`
    };
}

export default async function BuildOrderPage({ params }: { params: Promise<{ race: string; buildId: string }> }) {
    const { race: raceParam, buildId } = await params;
    const build = getBuildOrderById(buildId);

    if (!build) {
        return (
            <div className="container" style={{ padding: 'var(--spacing-2xl) var(--spacing-lg)' }}>
                <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-2xl)' }}>
                    <h2>Build Order Not Found</h2>
                    <Link href={`/${raceParam}`} className="btn-primary" style={{ marginTop: 'var(--spacing-lg)' }}>
                        Back to {raceParam.charAt(0).toUpperCase() + raceParam.slice(1)} Builds
                    </Link>
                </div>
            </div>
        );
    }

    return <BuildDetailClient build={build} raceParam={raceParam} />;
}
