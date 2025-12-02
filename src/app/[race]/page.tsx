'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Filter, Play } from 'lucide-react';
import { getBuildOrdersByRace, getMatchupsForRace } from '@/data/buildOrders';
import { Race, Matchup } from '@/types';

export default function RacePage({ params }: { params: Promise<{ race: string }> }) {
    const { race: raceParam } = use(params);
    const race = (raceParam.charAt(0).toUpperCase() + raceParam.slice(1)) as Race;
    const [selectedMatchup, setSelectedMatchup] = useState<Matchup | 'all'>('all');

    const builds = getBuildOrdersByRace(race);
    const matchups = getMatchupsForRace(race);

    const filteredBuilds = selectedMatchup === 'all'
        ? builds
        : builds.filter(build => build.matchup === selectedMatchup);

    // Get race color
    const getRaceColor = () => {
        if (race === 'Terran') return 'var(--terran-primary)';
        if (race === 'Protoss') return 'var(--protoss-primary)';
        return 'var(--zerg-primary)';
    };

    const getRaceGradient = () => {
        if (race === 'Terran') return 'linear-gradient(135deg, var(--terran-primary), var(--terran-secondary))';
        if (race === 'Protoss') return 'linear-gradient(135deg, var(--protoss-primary), var(--protoss-secondary))';
        return 'linear-gradient(135deg, var(--zerg-primary), var(--zerg-secondary))';
    };

    const getRaceBackgroundGradient = () => {
        if (race === 'Terran') return 'radial-gradient(ellipse at bottom, #1a2f3f 0%, #090a0f 100%)';
        if (race === 'Protoss') return 'radial-gradient(ellipse at bottom, #3f2a1a 0%, #090a0f 100%)';
        return 'radial-gradient(ellipse at bottom, #2a1a3f 0%, #090a0f 100%)';
    };

    const getWhiteToRaceGradient = () => {
        if (race === 'Terran') return 'linear-gradient(135deg, white, var(--terran-primary))';
        if (race === 'Protoss') return 'linear-gradient(135deg, white, var(--protoss-primary))';
        return 'linear-gradient(135deg, white, var(--zerg-primary))';
    };

    return (
        <>
            {/* Themed Background */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                background: getRaceBackgroundGradient(),
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    width: '2px',
                    height: '2px',
                    background: 'white',
                    boxShadow: '0 0 10px white, 10vw 10vh 0 1px white, 20vw 20vh 0 0 white, 30vw 5vh 0 1px white, 40vw 30vh 0 0 white, 50vw 15vh 0 1px white, 60vw 40vh 0 0 white, 70vw 25vh 0 1px white, 80vw 50vh 0 0 white, 90vw 10vh 0 1px white, 5vw 60vh 0 0 white, 15vw 70vh 0 1px white, 25vw 80vh 0 0 white, 35vw 90vh 0 1px white, 45vw 55vh 0 0 white, 55vw 65vh 0 1px white, 65vw 75vh 0 0 white, 75vw 85vh 0 1px white, 85vw 95vh 0 0 white, 95vw 5vh 0 1px white',
                    opacity: 0.5
                }} />
                <div style={{
                    position: 'absolute',
                    width: '3px',
                    height: '3px',
                    background: 'white',
                    boxShadow: '10vw 80vh 0 1px white, 20vw 10vh 0 0 white, 30vw 90vh 0 1px white, 40vw 20vh 0 0 white, 50vw 70vh 0 1px white, 60vw 30vh 0 0 white, 70vw 60vh 0 1px white, 80vw 40vh 0 0 white, 90vw 50vh 0 1px white, 5vw 15vh 0 0 white, 15vw 25vh 0 1px white, 25vw 35vh 0 0 white, 35vw 45vh 0 1px white, 45vw 55vh 0 0 white, 55vw 65vh 0 1px white, 65vw 75vh 0 0 white, 75vw 85vh 0 1px white, 85vw 95vh 0 0 white, 95vw 5vh 0 1px white',
                    opacity: 0.3,
                    animation: 'twinkle 5s infinite'
                }} />
            </div>

            <div className="container" style={{
                padding: 'var(--spacing-2xl) var(--spacing-lg)',
                minHeight: 'calc(100vh - 200px)'
            }}>
                {/* Race Icon */}
                <div style={{
                    marginBottom: 'var(--spacing-xl)'
                }}>
                    <img
                        src={`/images/logos/${race.toLowerCase()}_logo.png`}
                        alt={race}
                        style={{
                            width: '48px',
                            height: '48px',
                            filter: 'brightness(0) invert(1)'
                        }}
                    />
                </div>

                {/* Header */}
                <div style={{
                    marginBottom: 'var(--spacing-2xl)'
                }}>
                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: 800,
                        marginBottom: 'var(--spacing-md)',
                        background: getWhiteToRaceGradient(),
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        {race} Build Orders
                    </h1>

                    <p style={{
                        fontSize: '1.125rem',
                        color: 'var(--text-secondary)',
                        marginBottom: 'var(--spacing-xl)'
                    }}>
                        {builds.length} build orders available • Patch 5.0.11
                    </p>

                    {/* Matchup Filter */}
                    <div style={{
                        display: 'flex',
                        gap: 'var(--spacing-sm)',
                        flexWrap: 'wrap',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-sm)',
                            color: 'var(--text-secondary)',
                            fontSize: '0.9375rem',
                            fontWeight: 600
                        }}>
                            <Filter size={18} />
                            Filter by matchup:
                        </div>

                        <button
                            onClick={() => setSelectedMatchup('all')}
                            className={selectedMatchup === 'all' ? 'btn-primary' : 'btn-secondary'}
                            style={{
                                fontSize: '0.875rem',
                                padding: 'var(--spacing-xs) var(--spacing-md)'
                            }}
                        >
                            All
                        </button>

                        {matchups.map(matchup => (
                            <button
                                key={matchup}
                                onClick={() => setSelectedMatchup(matchup)}
                                className={selectedMatchup === matchup ? 'btn-primary' : 'btn-secondary'}
                                style={{
                                    fontSize: '0.875rem',
                                    padding: 'var(--spacing-xs) var(--spacing-md)'
                                }}
                            >
                                {matchup}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Build Orders Grid */}
                {filteredBuilds.length === 0 ? (
                    <div className="card" style={{
                        textAlign: 'center',
                        padding: 'var(--spacing-2xl)',
                        color: 'var(--text-muted)'
                    }}>
                        <p>No build orders found for this matchup.</p>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                        gap: 'var(--spacing-lg)'
                    }}>
                        {filteredBuilds.map(build => (
                            <Link
                                key={build.id}
                                href={`/${raceParam}/${build.id}`}
                                className="card card-interactive"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 'var(--spacing-md)'
                                }}
                            >
                                {/* Header */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    gap: 'var(--spacing-sm)'
                                }}>
                                    <h3 style={{
                                        fontSize: '1.25rem',
                                        fontWeight: 700,
                                        background: getWhiteToRaceGradient(),
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        flex: 1
                                    }}>
                                        {build.name}
                                    </h3>

                                    <span className={`badge badge-${build.difficulty.toLowerCase()}`}>
                                        {build.difficulty}
                                    </span>
                                </div>

                                {/* Matchup & Type */}
                                <div style={{
                                    display: 'flex',
                                    gap: 'var(--spacing-sm)',
                                    fontSize: '0.875rem',
                                    color: 'var(--text-secondary)'
                                }}>
                                    <span style={{
                                        padding: 'var(--spacing-xs) var(--spacing-sm)',
                                        background: 'var(--bg-tertiary)',
                                        borderRadius: 'var(--radius-sm)',
                                        fontWeight: 600
                                    }}>
                                        {build.matchup}
                                    </span>
                                    <span style={{
                                        padding: 'var(--spacing-xs) var(--spacing-sm)',
                                        background: 'var(--bg-tertiary)',
                                        borderRadius: 'var(--radius-sm)'
                                    }}>
                                        {build.buildType}
                                    </span>
                                </div>

                                {/* Description */}
                                <p style={{
                                    fontSize: '0.9375rem',
                                    color: 'var(--text-secondary)',
                                    lineHeight: 1.6,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>
                                    {build.playStyle}
                                </p>

                                {/* Author */}
                                {build.author && (
                                    <div style={{
                                        fontSize: '0.875rem',
                                        color: 'var(--text-muted)',
                                        marginTop: 'auto'
                                    }}>
                                        By <span style={{ color: getRaceColor(), fontWeight: 600 }}>{build.author}</span>
                                    </div>
                                )}

                                {/* View Button */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-sm)',
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    color: getRaceColor(),
                                    marginTop: 'var(--spacing-sm)'
                                }}>
                                    <Play size={16} />
                                    View Build Order
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
