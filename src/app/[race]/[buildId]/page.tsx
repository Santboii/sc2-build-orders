'use client';

import { use, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, ExternalLink, Target, AlertTriangle, Clock, RotateCcw } from 'lucide-react';
import { getBuildOrderById } from '@/data/buildOrders';
import UnitTooltip from '@/components/UnitTooltip';

// Helper function to parse timing string (e.g., "0:17", "1:30") to seconds
const parseTimingToSeconds = (timing: string): number => {
    const parts = timing.split(':');
    if (parts.length === 2) {
        const minutes = parseInt(parts[0], 10);
        const seconds = parseInt(parts[1], 10);
        return minutes * 60 + seconds;
    }
    return 0;
};

export default function BuildOrderPage({ params }: { params: Promise<{ race: string; buildId: string }> }) {
    const { race: raceParam, buildId } = use(params);
    const build = getBuildOrderById(buildId);
    const [studyMode, setStudyMode] = useState(false);
    const [followAlongMode, setFollowAlongMode] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    // Follow Along state
    const [isFollowAlongActive, setIsFollowAlongActive] = useState(false);
    const [isFollowAlongPaused, setIsFollowAlongPaused] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0); // in seconds
    const startTimeRef = useRef<number | null>(null);
    const pausedTimeRef = useRef<number>(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const followAlongSectionRef = useRef<HTMLDivElement>(null);

    // Keyboard navigation for study mode
    useEffect(() => {
        if (!studyMode) return;

        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' && currentStep < (build?.steps.length || 0) - 1) {
                setCurrentStep(prev => prev + 1);
            } else if (e.key === 'ArrowLeft' && currentStep > 0) {
                setCurrentStep(prev => prev - 1);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [studyMode, currentStep, build]);

    // Follow Along timer
    useEffect(() => {
        if (!isFollowAlongActive || isFollowAlongPaused || !build) return;

        intervalRef.current = setInterval(() => {
            const now = Date.now();
            const elapsed = Math.floor((now - (startTimeRef.current || now) + pausedTimeRef.current) / 1000);
            setElapsedTime(elapsed);

            // Auto-advance to next step based on timing
            const nextStepIndex = currentStep + 1;
            if (nextStepIndex < build.steps.length) {
                const nextStep = build.steps[nextStepIndex];
                if (nextStep.timing) {
                    const nextStepTime = parseTimingToSeconds(nextStep.timing);
                    if (elapsed >= nextStepTime) {
                        setCurrentStep(nextStepIndex);
                    }
                }
            }
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isFollowAlongActive, isFollowAlongPaused, currentStep, build]);

    // Format seconds to MM:SS
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Follow Along controls
    const startFollowAlong = () => {
        setIsFollowAlongActive(true);
        setIsFollowAlongPaused(false);
        startTimeRef.current = Date.now();
        pausedTimeRef.current = 0;
        setElapsedTime(0);
        setCurrentStep(0);
        setFollowAlongMode(true);
        setStudyMode(false);

        // Scroll to Follow Along section
        setTimeout(() => {
            followAlongSectionRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    };

    const pauseFollowAlong = () => {
        setIsFollowAlongPaused(true);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    const resumeFollowAlong = () => {
        setIsFollowAlongPaused(false);
        const pauseDuration = Date.now() - (startTimeRef.current || Date.now());
        pausedTimeRef.current = elapsedTime * 1000;
        startTimeRef.current = Date.now();
    };

    const resetFollowAlong = () => {
        setIsFollowAlongActive(false);
        setIsFollowAlongPaused(false);
        setElapsedTime(0);
        setCurrentStep(0);
        startTimeRef.current = null;
        pausedTimeRef.current = 0;
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    const exitFollowAlong = () => {
        resetFollowAlong();
        setFollowAlongMode(false);
    };

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

    const race = build.race;

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

    const nextStep = () => {
        if (currentStep < build.steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
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
                maxWidth: '1100px'
            }}>
                {/* Breadcrumbs */}
                <nav style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)',
                    marginBottom: 'var(--spacing-xl)',
                    fontSize: '0.9375rem',
                    color: 'var(--text-secondary)'
                }}>
                    <Link href={`/${raceParam}`} style={{
                        color: 'var(--text-secondary)',
                        transition: 'color var(--transition-fast)'
                    }} onMouseEnter={(e) => e.currentTarget.style.color = getRaceColor()}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                        {race}
                    </Link>
                    <span>/</span>
                    <span style={{ color: getRaceColor(), fontWeight: 600 }}>{build.name}</span>
                </nav>

                {/* Title Section */}
                <div className="card" style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: 'var(--spacing-lg)',
                        marginBottom: 'var(--spacing-lg)',
                        flexWrap: 'wrap'
                    }}>
                        <div style={{ flex: 1, minWidth: '300px' }}>
                            <h1 style={{
                                fontSize: '2.5rem',
                                fontWeight: 800,
                                marginBottom: 'var(--spacing-md)',
                                background: getRaceGradient(),
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                {build.name}
                            </h1>

                            <div style={{
                                display: 'flex',
                                gap: 'var(--spacing-sm)',
                                flexWrap: 'wrap',
                                marginBottom: 'var(--spacing-md)'
                            }}>
                                <span className={`badge badge-${build.difficulty.toLowerCase()}`}>
                                    {build.difficulty}
                                </span>
                                <span style={{
                                    padding: 'var(--spacing-xs) var(--spacing-sm)',
                                    background: 'var(--bg-tertiary)',
                                    borderRadius: 'var(--radius-sm)',
                                    fontSize: '0.75rem',
                                    fontWeight: 600
                                }}>
                                    {build.matchup}
                                </span>
                                <span style={{
                                    padding: 'var(--spacing-xs) var(--spacing-sm)',
                                    background: 'var(--bg-tertiary)',
                                    borderRadius: 'var(--radius-sm)',
                                    fontSize: '0.75rem',
                                    fontWeight: 600
                                }}>
                                    {build.buildType}
                                </span>
                            </div>

                            {build.author && (
                                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-sm)' }}>
                                    By <span style={{ color: getRaceColor(), fontWeight: 600 }}>{build.author}</span>
                                    {build.patch && <span> • Patch {build.patch}</span>}
                                </p>
                            )}

                            {build.videoUrl && (
                                <a href={build.videoUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-sm)',
                                    fontSize: '0.875rem',
                                    marginTop: 'var(--spacing-sm)',
                                    padding: 'var(--spacing-sm) var(--spacing-lg)'
                                }}>
                                    <ExternalLink size={16} />
                                    <span>Watch Video Guide</span>
                                </a>
                            )}
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: 'var(--spacing-md)',
                            flexWrap: 'wrap'
                        }}>
                            <button
                                onClick={() => {
                                    if (!followAlongMode) {
                                        startFollowAlong();
                                    } else {
                                        exitFollowAlong();
                                    }
                                }}
                                className="btn-primary"
                                style={{
                                    fontSize: '1rem',
                                    padding: 'var(--spacing-md) var(--spacing-xl)',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-sm)',
                                    opacity: studyMode ? 0.5 : 1
                                }}
                                disabled={studyMode}
                            >
                                <Clock size={20} />
                                <span>{followAlongMode ? 'Exit Follow Along' : 'Start Follow Along'}</span>
                            </button>

                            <button
                                onClick={() => {
                                    setStudyMode(!studyMode);
                                    if (followAlongMode) exitFollowAlong();
                                }}
                                className="btn-secondary"
                                style={{
                                    fontSize: '1rem',
                                    padding: 'var(--spacing-md) var(--spacing-xl)',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-sm)',
                                    opacity: followAlongMode ? 0.5 : 1
                                }}
                                disabled={followAlongMode}
                            >
                                {studyMode ? <Pause size={20} /> : <Play size={20} />}
                                <span>{studyMode ? 'Exit Study Mode' : 'Enter Study Mode'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Play Style & Strategic Info */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: 'var(--spacing-lg)',
                        marginBottom: 'var(--spacing-lg)'
                    }}>
                        {/* Play Style */}
                        <div style={{
                            padding: 'var(--spacing-lg)',
                            background: 'var(--bg-tertiary)',
                            borderRadius: 'var(--radius-md)',
                            border: `1px solid ${getRaceColor()}20`
                        }}>
                            <h3 style={{
                                fontWeight: 700,
                                marginBottom: 'var(--spacing-md)',
                                color: getRaceColor(),
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                fontSize: '0.875rem'
                            }}>
                                Play Style
                            </h3>
                            <p style={{
                                color: 'var(--text-primary)',
                                lineHeight: 1.7,
                                fontSize: '0.9375rem'
                            }}>
                                {build.playStyle}
                            </p>
                        </div>

                        {/* Strategic Goals */}
                        <div style={{
                            padding: 'var(--spacing-lg)',
                            background: 'var(--bg-tertiary)',
                            borderRadius: 'var(--radius-md)',
                            border: `1px solid ${getRaceColor()}20`
                        }}>
                            <h3 style={{
                                fontWeight: 700,
                                marginBottom: 'var(--spacing-md)',
                                color: getRaceColor(),
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                fontSize: '0.875rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-xs)'
                            }}>
                                <Target size={16} />
                                Strategic Goals
                            </h3>
                            <ul style={{
                                listStyle: 'none',
                                display: 'grid',
                                gap: 'var(--spacing-sm)',
                                padding: 0,
                                margin: 0
                            }}>
                                {build.goals.map((goal, idx) => (
                                    <li key={idx} style={{
                                        paddingLeft: 'var(--spacing-md)',
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.9375rem',
                                        lineHeight: 1.6,
                                        position: 'relative'
                                    }}>
                                        <span style={{
                                            position: 'absolute',
                                            left: 0,
                                            color: getRaceColor(),
                                            fontWeight: 600
                                        }}>→</span>
                                        {goal}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Counters & Weaknesses */}
                    {((build.counters && build.counters.length > 0) || (build.weaknesses && build.weaknesses.length > 0)) && (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: 'var(--spacing-lg)',
                            marginBottom: 'var(--spacing-lg)'
                        }}>
                            {build.counters && build.counters.length > 0 && (
                                <div style={{
                                    padding: 'var(--spacing-lg)',
                                    background: 'rgba(16, 185, 129, 0.05)',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid rgba(16, 185, 129, 0.2)'
                                }}>
                                    <h4 style={{
                                        fontSize: '0.875rem',
                                        fontWeight: 700,
                                        marginBottom: 'var(--spacing-md)',
                                        color: 'var(--accent-success)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>
                                        ✓ Counters
                                    </h4>
                                    <ul style={{
                                        fontSize: '0.9375rem',
                                        color: 'var(--text-secondary)',
                                        listStyle: 'none',
                                        padding: 0,
                                        margin: 0,
                                        display: 'grid',
                                        gap: 'var(--spacing-xs)'
                                    }}>
                                        {build.counters.map((counter, idx) => (
                                            <li key={idx} style={{
                                                paddingLeft: 'var(--spacing-md)',
                                                position: 'relative',
                                                lineHeight: 1.6
                                            }}>
                                                <span style={{
                                                    position: 'absolute',
                                                    left: 0,
                                                    color: 'var(--accent-success)'
                                                }}>•</span>
                                                {counter}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {build.weaknesses && build.weaknesses.length > 0 && (
                                <div style={{
                                    padding: 'var(--spacing-lg)',
                                    background: 'rgba(239, 68, 68, 0.05)',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid rgba(239, 68, 68, 0.2)'
                                }}>
                                    <h4 style={{
                                        fontSize: '0.875rem',
                                        fontWeight: 700,
                                        marginBottom: 'var(--spacing-md)',
                                        color: 'var(--accent-error)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--spacing-xs)'
                                    }}>
                                        <AlertTriangle size={14} />
                                        Weaknesses
                                    </h4>
                                    <ul style={{
                                        fontSize: '0.9375rem',
                                        color: 'var(--text-secondary)',
                                        listStyle: 'none',
                                        padding: 0,
                                        margin: 0,
                                        display: 'grid',
                                        gap: 'var(--spacing-xs)'
                                    }}>
                                        {build.weaknesses.map((weakness, idx) => (
                                            <li key={idx} style={{
                                                paddingLeft: 'var(--spacing-md)',
                                                position: 'relative',
                                                lineHeight: 1.6
                                            }}>
                                                <span style={{
                                                    position: 'absolute',
                                                    left: 0,
                                                    color: 'var(--accent-error)'
                                                }}>•</span>
                                                {weakness}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Follow Along Mode */}
                {followAlongMode ? (
                    <div className="card" ref={followAlongSectionRef}>
                        {/* Timer and Controls */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 'var(--spacing-2xl)',
                            flexWrap: 'wrap',
                            gap: 'var(--spacing-lg)'
                        }}>
                            {/* Game Timer */}
                            <div style={{
                                fontSize: '4rem',
                                fontWeight: 800,
                                background: getRaceGradient(),
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                fontFamily: 'monospace',
                                letterSpacing: '0.05em'
                            }}>
                                {formatTime(elapsedTime)}
                            </div>

                            {/* Controls */}
                            <div style={{
                                display: 'flex',
                                gap: 'var(--spacing-sm)',
                                alignItems: 'center'
                            }}>
                                {!isFollowAlongActive ? (
                                    <button
                                        onClick={startFollowAlong}
                                        className="btn-primary"
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 'var(--spacing-sm)',
                                            padding: 'var(--spacing-md) var(--spacing-lg)'
                                        }}
                                    >
                                        <Play size={20} />
                                        <span>Start</span>
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={isFollowAlongPaused ? resumeFollowAlong : pauseFollowAlong}
                                            className="btn-secondary"
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: 'var(--spacing-sm)',
                                                padding: 'var(--spacing-md) var(--spacing-lg)'
                                            }}
                                        >
                                            {isFollowAlongPaused ? <Play size={20} /> : <Pause size={20} />}
                                            <span>{isFollowAlongPaused ? 'Resume' : 'Pause'}</span>
                                        </button>
                                        <button
                                            onClick={resetFollowAlong}
                                            className="btn-secondary"
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: 'var(--spacing-md)'
                                            }}
                                        >
                                            <RotateCcw size={20} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Current Step */}
                        <div style={{
                            padding: 'var(--spacing-2xl)',
                            background: getRaceGradient(),
                            borderRadius: 'var(--radius-lg)',
                            marginBottom: 'var(--spacing-xl)',
                            color: 'white',
                            boxShadow: `0 0 30px ${getRaceColor()}40`
                        }}>
                            <div style={{
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                marginBottom: 'var(--spacing-sm)',
                                opacity: 0.9
                            }}>
                                Current Step
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-lg)',
                                marginBottom: 'var(--spacing-md)'
                            }}>
                                <div style={{
                                    fontSize: '3rem',
                                    fontWeight: 800,
                                    fontFamily: 'monospace'
                                }}>
                                    {build.steps[currentStep].supply}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{
                                        fontSize: '1.75rem',
                                        fontWeight: 700,
                                        marginBottom: 'var(--spacing-xs)'
                                    }}>
                                        {build.steps[currentStep].action}
                                    </div>
                                    {build.steps[currentStep].timing && (
                                        <div style={{
                                            fontSize: '1.125rem',
                                            opacity: 0.9
                                        }}>
                                            @ {build.steps[currentStep].timing}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {build.steps[currentStep].notes && (
                                <div style={{
                                    fontSize: '1rem',
                                    fontStyle: 'italic',
                                    opacity: 0.9,
                                    padding: 'var(--spacing-md)',
                                    background: 'rgba(255,255,255,0.1)',
                                    borderRadius: 'var(--radius-md)'
                                }}>
                                    💡 {build.steps[currentStep].notes}
                                </div>
                            )}
                        </div>

                        {/* Upcoming Steps Preview */}
                        {currentStep < build.steps.length - 1 && (
                            <div>
                                <h3 style={{
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    marginBottom: 'var(--spacing-md)',
                                    color: 'var(--text-secondary)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
                                    Coming Up
                                </h3>
                                <div style={{
                                    display: 'grid',
                                    gap: 'var(--spacing-sm)'
                                }}>
                                    {build.steps.slice(currentStep + 1, currentStep + 4).map((step, idx) => (
                                        <div key={idx} style={{
                                            padding: 'var(--spacing-md)',
                                            background: 'var(--bg-tertiary)',
                                            borderRadius: 'var(--radius-md)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 'var(--spacing-md)',
                                            opacity: 0.7,
                                            border: `1px solid ${getRaceColor()}20`
                                        }}>
                                            <span style={{
                                                fontWeight: 700,
                                                color: getRaceColor(),
                                                minWidth: '50px',
                                                fontSize: '1.125rem'
                                            }}>
                                                {step.supply}
                                            </span>
                                            <div style={{ flex: 1 }}>
                                                <div style={{
                                                    fontWeight: 600,
                                                    marginBottom: 'var(--spacing-xs)'
                                                }}>
                                                    {step.action}
                                                </div>
                                                {step.timing && (
                                                    <div style={{
                                                        fontSize: '0.875rem',
                                                        color: 'var(--text-muted)'
                                                    }}>
                                                        @ {step.timing}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : !studyMode ? (
                    <div className="card">
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            marginBottom: 'var(--spacing-lg)',
                            color: getRaceColor()
                        }}>
                            Build Order Steps
                        </h2>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{
                                width: '100%',
                                borderCollapse: 'collapse'
                            }}>
                                <thead>
                                    <tr style={{
                                        borderBottom: '2px solid var(--border-medium)',
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.875rem',
                                        fontWeight: 600
                                    }}>
                                        <th style={{ padding: 'var(--spacing-sm)', textAlign: 'left', width: '80px' }}>Supply</th>
                                        <th style={{ padding: 'var(--spacing-sm)', textAlign: 'left' }}>Action</th>
                                        <th style={{ padding: 'var(--spacing-sm)', textAlign: 'left' }}>Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {build.steps.map((step, idx) => (
                                        <tr key={idx} style={{
                                            borderBottom: '1px solid var(--border-subtle)',
                                            transition: 'background var(--transition-fast)'
                                        }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                        >
                                            <td style={{
                                                padding: 'var(--spacing-md) var(--spacing-sm)',
                                                fontWeight: 700,
                                                fontSize: '1.125rem',
                                                color: getRaceColor()
                                            }}>
                                                {step.supply}
                                            </td>
                                            <td style={{
                                                padding: 'var(--spacing-md) var(--spacing-sm)',
                                                fontWeight: 600,
                                                color: 'var(--text-primary)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 'var(--spacing-sm)'
                                            }}>
                                                <UnitTooltip action={step.action} size="medium" />
                                                <span>
                                                    {step.action}
                                                    {step.timing && (
                                                        <span style={{
                                                            marginLeft: 'var(--spacing-sm)',
                                                            fontSize: '0.75rem',
                                                            color: 'var(--text-muted)',
                                                            fontWeight: 400
                                                        }}>
                                                            {step.timing}
                                                        </span>
                                                    )}
                                                </span>
                                            </td>
                                            <td style={{
                                                padding: 'var(--spacing-md) var(--spacing-sm)',
                                                color: 'var(--text-secondary)',
                                                fontSize: '0.875rem'
                                            }}>
                                                {step.notes || '—'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {build.transitions && (
                            <div style={{
                                marginTop: 'var(--spacing-xl)',
                                padding: 'var(--spacing-lg)',
                                background: 'var(--bg-tertiary)',
                                borderRadius: 'var(--radius-md)'
                            }}>
                                <h3 style={{
                                    fontSize: '1.125rem',
                                    fontWeight: 700,
                                    marginBottom: 'var(--spacing-sm)',
                                    color: getRaceColor()
                                }}>
                                    Transitions
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                    {build.transitions}
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Study Mode */
                    <div className="card">
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 'var(--spacing-xl)',
                            flexWrap: 'wrap',
                            gap: 'var(--spacing-md)'
                        }}>
                            <h2 style={{
                                fontSize: '1.5rem',
                                fontWeight: 700,
                                color: getRaceColor()
                            }}>
                                Study Mode
                            </h2>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-sm)'
                            }}>
                                <button
                                    onClick={prevStep}
                                    disabled={currentStep === 0}
                                    className="btn-secondary"
                                    style={{
                                        opacity: currentStep === 0 ? 0.5 : 1,
                                        cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 'var(--spacing-md)'
                                    }}
                                >
                                    <SkipBack size={20} />
                                </button>

                                <span style={{
                                    padding: 'var(--spacing-sm) var(--spacing-md)',
                                    background: 'var(--bg-tertiary)',
                                    borderRadius: 'var(--radius-md)',
                                    fontWeight: 600,
                                    fontSize: '0.9375rem'
                                }}>
                                    Step {currentStep + 1} / {build.steps.length}
                                </span>

                                <button
                                    onClick={nextStep}
                                    disabled={currentStep === build.steps.length - 1}
                                    className="btn-secondary"
                                    style={{
                                        opacity: currentStep === build.steps.length - 1 ? 0.5 : 1,
                                        cursor: currentStep === build.steps.length - 1 ? 'not-allowed' : 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 'var(--spacing-md)'
                                    }}
                                >
                                    <SkipForward size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Current Step Display */}
                        <div style={{
                            padding: 'var(--spacing-2xl)',
                            background: getRaceGradient(),
                            borderRadius: 'var(--radius-lg)',
                            marginBottom: 'var(--spacing-xl)',
                            textAlign: 'center',
                            color: 'white'
                        }}>
                            <div style={{
                                fontSize: '4rem',
                                fontWeight: 800,
                                marginBottom: 'var(--spacing-md)'
                            }}>
                                {build.steps[currentStep].supply}
                            </div>
                            <div style={{
                                marginBottom: 'var(--spacing-md)',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <UnitTooltip action={build.steps[currentStep].action} size="large" />
                            </div>
                            <div style={{
                                fontSize: '1.5rem',
                                fontWeight: 600,
                                marginBottom: 'var(--spacing-sm)'
                            }}>
                                {build.steps[currentStep].action}
                            </div>
                            {build.steps[currentStep].timing && (
                                <div style={{
                                    fontSize: '1rem',
                                    opacity: 0.9,
                                    marginBottom: 'var(--spacing-sm)'
                                }}>
                                    {build.steps[currentStep].timing}
                                </div>
                            )}
                            {build.steps[currentStep].notes && (
                                <div style={{
                                    fontSize: '1rem',
                                    opacity: 0.9,
                                    fontStyle: 'italic'
                                }}>
                                    {build.steps[currentStep].notes}
                                </div>
                            )}
                        </div>

                        {/* Previous Steps (Dimmed) */}
                        {currentStep > 0 && (
                            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                <h3 style={{
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    color: 'var(--text-muted)',
                                    marginBottom: 'var(--spacing-sm)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
                                    Previous Steps
                                </h3>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 'var(--spacing-xs)',
                                    opacity: 0.5
                                }}>
                                    {build.steps.slice(0, currentStep).map((step, idx) => (
                                        <div key={idx} style={{
                                            padding: 'var(--spacing-sm)',
                                            background: 'var(--bg-tertiary)',
                                            borderRadius: 'var(--radius-sm)',
                                            fontSize: '0.875rem',
                                            display: 'flex',
                                            gap: 'var(--spacing-md)',
                                            alignItems: 'center'
                                        }}>
                                            <span style={{ fontWeight: 700, color: getRaceColor(), minWidth: '40px' }}>
                                                {step.supply}
                                            </span>
                                            <UnitTooltip action={step.action} size="small" />
                                            <span>{step.action}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Keyboard Shortcuts */}
                        <div style={{
                            padding: 'var(--spacing-md)',
                            background: 'var(--bg-tertiary)',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '0.75rem',
                            color: 'var(--text-muted)',
                            textAlign: 'center'
                        }}>
                            💡 Tip: Use arrow keys to navigate • ← Previous • → Next
                        </div>
                    </div>
                )
                }
            </div >
        </>
    );
}
