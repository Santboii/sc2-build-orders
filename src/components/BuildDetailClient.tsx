'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Play, Pause, SkipBack, SkipForward, ExternalLink, Target, AlertTriangle, Clock, RotateCcw, Swords, ShieldAlert, Copy } from 'lucide-react';
import UnitTooltip from '@/components/UnitTooltip';
import StarBackground from '@/components/StarBackground';

const parseTimingToSeconds = (timing: string | undefined): number => {
    if (!timing) return 0;
    const parts = timing.split(':');
    if (parts.length === 2) {
        const minutes = parseInt(parts[0], 10);
        const seconds = parseInt(parts[1], 10);
        return minutes * 60 + seconds;
    }
    return 0;
};

const consolidateSteps = (steps: any[]) => {
    if (!steps || steps.length === 0) return [];
    const consolidated = [];
    let current = { ...steps[0], count: 1 };
    for (let i = 1; i < steps.length; i++) {
        if (steps[i].action === current.action && steps[i].notes === current.notes) {
            current.count++;
        } else {
            consolidated.push(current);
            current = { ...steps[i], count: 1 };
        }
    }
    consolidated.push(current);
    return consolidated;
};

interface BuildDetailClientProps {
    build: any;
    raceParam: string;
}

export default function BuildDetailClient({ build, raceParam }: BuildDetailClientProps) {
    const [studyMode, setStudyMode] = useState(false);
    const [followAlongMode, setFollowAlongMode] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const [isFollowAlongActive, setIsFollowAlongActive] = useState(false);
    const [isFollowAlongPaused, setIsFollowAlongPaused] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const startTimeRef = useRef<number | null>(null);
    const pausedTimeRef = useRef<number>(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const followAlongSectionRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        if (!isFollowAlongActive || isFollowAlongPaused || !build) return;
        intervalRef.current = setInterval(() => {
            const now = Date.now();
            const elapsed = Math.floor((now - (startTimeRef.current || now) + pausedTimeRef.current) / 1000);
            setElapsedTime(elapsed);
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
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isFollowAlongActive, isFollowAlongPaused, currentStep, build]);

    useEffect(() => {
        if (followAlongMode && followAlongSectionRef.current) {
            followAlongSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [followAlongMode]);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const startFollowAlong = () => {
        setIsFollowAlongActive(true);
        setIsFollowAlongPaused(false);
        startTimeRef.current = Date.now();
        pausedTimeRef.current = 0;
        setElapsedTime(0);
        setCurrentStep(0);
        setFollowAlongMode(true);
        setStudyMode(false);
    };

    const pauseFollowAlong = () => {
        setIsFollowAlongPaused(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const resumeFollowAlong = () => {
        setIsFollowAlongPaused(false);
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
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const exitFollowAlong = () => {
        resetFollowAlong();
        setFollowAlongMode(false);
    };

    const nextStep = () => {
        if (currentStep < build.steps.length - 1) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const race = build.race;

    const getRaceTheme = () => {
        if (race === 'Terran') return {
            primary: 'var(--terran-primary)',
            secondary: 'var(--terran-secondary)',
            glow: 'var(--terran-glow)',
            gradient: 'linear-gradient(135deg, var(--terran-primary), var(--terran-secondary))',
            bg: 'radial-gradient(circle at 50% 0%, rgba(14, 165, 233, 0.15) 0%, transparent 70%), radial-gradient(ellipse at bottom, rgba(14, 165, 233, 0.2) 0%, #0a0a0f 100%)',
            textGradient: 'linear-gradient(135deg, white, var(--terran-primary))'
        };
        if (race === 'Protoss') return {
            primary: 'var(--protoss-primary)',
            secondary: 'var(--protoss-secondary)',
            glow: 'var(--protoss-glow)',
            gradient: 'linear-gradient(135deg, var(--protoss-primary), var(--protoss-secondary))',
            bg: 'radial-gradient(circle at 50% 0%, rgba(245, 158, 11, 0.15) 0%, transparent 70%), radial-gradient(ellipse at bottom, rgba(245, 158, 11, 0.2) 0%, #0a0a0f 100%)',
            textGradient: 'linear-gradient(135deg, white, var(--protoss-primary))'
        };
        return {
            primary: 'var(--zerg-primary)',
            secondary: 'var(--zerg-secondary)',
            glow: 'var(--zerg-glow)',
            gradient: 'linear-gradient(135deg, var(--zerg-primary), var(--zerg-secondary))',
            bg: 'radial-gradient(circle at 50% 0%, rgba(168, 85, 247, 0.15) 0%, transparent 70%), radial-gradient(ellipse at bottom, rgba(168, 85, 247, 0.2) 0%, #0a0a0f 100%)',
            textGradient: 'linear-gradient(135deg, white, var(--zerg-primary))'
        };
    };

    const theme = getRaceTheme();

    return (
        <>
            {/* Background Layers: Gradient first, then Stars */}
            <div style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -2,
                background: theme.bg, overflow: 'hidden'
            }} />
            <StarBackground />

            <div className="container" style={{ padding: 'var(--spacing-2xl) var(--spacing-lg)', maxWidth: '1100px', position: 'relative', zIndex: 1 }}>

                {/* Independent Breadcrumbs */}
                <nav style={{ marginBottom: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <Link href={`/${raceParam}`} style={{ color: 'var(--text-secondary)' }}>{race}</Link> / <span style={{ color: theme.primary, fontWeight: 'bold' }}>{build.name}</span>
                </nav>

                {/* Unified Main Card Wrapper */}
                <div className="card" style={{ padding: '30px', marginBottom: '30px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>

                    {/* Top Header Section */}
                    <div style={{ marginBottom: '30px' }}>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                            <div style={{ flex: 1, minWidth: '300px' }}>
                                <h1 style={{ marginBottom: '15px', fontSize: '2rem', fontWeight: 800, background: theme.textGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{build.name}</h1>

                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '15px' }}>
                                    <span className={`badge badge-${build.difficulty.toLowerCase()}`}>{build.difficulty}</span>
                                    <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>{build.matchup}</span>
                                    <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>{build.buildType}</span>
                                </div>

                                {build.author && build.author !== 'Unknown' && (
                                    <div style={{ marginBottom: '15px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                        By <span style={{ color: theme.primary }}>{build.author}</span> • Patch {build.patch || '5.0.11'}
                                    </div>
                                )}

                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                    {build.videoUrl && (
                                        <a href={build.videoUrl} target="_blank" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                                            <ExternalLink size={14} /> Watch Video Guide
                                        </a>
                                    )}

                                    {build.saltEncoding && (
                                        <button
                                            onClick={() => navigator.clipboard.writeText(build.saltEncoding)}
                                            className="btn-secondary"
                                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
                                        >
                                            <Copy size={14} /> Copy SALT Encoding
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'flex-start' }}>
                                <button
                                    onClick={followAlongMode ? exitFollowAlong : startFollowAlong}
                                    className="btn-primary"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        background: theme.gradient,
                                        boxShadow: `0 0 20px ${theme.glow}`,
                                        padding: '12px 20px',
                                        whiteSpace: 'nowrap',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Clock size={18} /> {followAlongMode ? 'Exit Follow Along' : 'Play Along'}
                                </button>
                                <button
                                    onClick={() => setStudyMode(!studyMode)}
                                    className="btn-secondary"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        padding: '12px 20px',
                                        whiteSpace: 'nowrap',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {studyMode ? <Pause size={18} /> : <Play size={18} />} {studyMode ? 'Exit Study Mode' : 'Enter Study Mode'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Info Grid - 2x2 Layout within Main Card */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>

                        {/* Play Style */}
                        <div style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.08)', border: 'none', borderRadius: 'var(--radius-md)' }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: theme.primary, fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Play Style
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>{build.playStyle}</p>
                        </div>

                        {/* Strategic Goals */}
                        <div style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.08)', border: 'none', borderRadius: 'var(--radius-md)' }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: theme.primary, fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                <Target size={16} /> Strategic Goals
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {build.goals?.map((g: string, i: number) => (
                                    <li key={i} style={{ marginBottom: '8px', display: 'flex', alignItems: 'baseline', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                        <span style={{ color: theme.primary }}>→</span> {g}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Counters - Green Tint Background */}
                        <div style={{ padding: '24px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 'var(--radius-md)' }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--accent-success)', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                <Swords size={16} /> Counters
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {build.counters?.length > 0 ? build.counters.map((c: string, i: number) => (
                                    <li key={i} style={{ marginBottom: '8px', display: 'flex', alignItems: 'baseline', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                        <span style={{ color: 'var(--accent-success)' }}>•</span> {c}
                                    </li>
                                )) : (
                                    <li style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No specific counters listed.</li>
                                )}
                            </ul>
                        </div>

                        {/* Weaknesses - Red Tint Background */}
                        <div style={{ padding: '24px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 'var(--radius-md)' }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--accent-error)', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                <ShieldAlert size={16} /> Weaknesses
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {build.weaknesses?.length > 0 ? build.weaknesses.map((w: string, i: number) => (
                                    <li key={i} style={{ marginBottom: '8px', display: 'flex', alignItems: 'baseline', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                        <span style={{ color: 'var(--accent-error)' }}>•</span> {w}
                                    </li>
                                )) : (
                                    <li style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No specific weaknesses listed.</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Build Steps Section */}
                {followAlongMode ? (
                    <div className="card" ref={followAlongSectionRef}>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <h2 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '10px' }}>Elapsed Time</h2>
                            <div style={{ fontSize: '3.5rem', fontFamily: 'monospace', fontWeight: '800', color: theme.primary, lineHeight: 1, textShadow: `0 0 30px ${theme.glow}` }}>
                                {formatTime(elapsedTime)}
                            </div>

                            {/* Controls */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
                                <button
                                    onClick={resetFollowAlong}
                                    className="btn"
                                    style={{
                                        color: 'var(--text-muted)',
                                        background: 'transparent',
                                        padding: '10px',
                                        cursor: 'pointer'
                                    }}
                                    title="Reset Timer"
                                >
                                    <RotateCcw size={18} />
                                </button>

                                <button
                                    onClick={isFollowAlongPaused ? resumeFollowAlong : pauseFollowAlong}
                                    className="btn"
                                    style={{
                                        background: theme.gradient,
                                        color: 'white',
                                        padding: '12px 32px',
                                        borderRadius: '100px',
                                        boxShadow: `0 0 30px ${theme.glow}`,
                                        fontSize: '1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                    }}
                                >
                                    {isFollowAlongPaused ? <Play size={20} fill="currentColor" /> : <Pause size={20} fill="currentColor" />}
                                    {isFollowAlongPaused ? 'Resume' : 'Pause'}
                                </button>

                                <div style={{ width: '38px' }}></div> {/* Spacer to balance Reset button (18px icon + 20px padding) */}
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '600px', margin: '0 auto' }}>

                            {/* Recent History (Last 2 steps) */}
                            {currentStep > 0 && build.steps.slice(Math.max(0, currentStep - 2), currentStep).map((step: any, i: number) => (
                                <div key={i} style={{
                                    padding: '15px 20px',
                                    border: '1px solid var(--border-subtle)',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '15px',
                                    opacity: 0.5,
                                    filter: 'grayscale(0.5)'
                                }}>
                                    <span style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>{step.timing || formatTime(parseTimingToSeconds(step.timing))}</span>
                                    <span style={{ fontWeight: 'bold', color: 'var(--text-secondary)' }}>{step.action}</span>
                                    {step.notes && <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>— {step.notes}</span>}
                                </div>
                            ))}

                            {/* Current Step */}
                            <div style={{
                                padding: '30px',
                                background: `linear-gradient(135deg, ${theme.glow}, transparent)`,
                                border: `2px solid ${theme.primary}`,
                                borderRadius: 'var(--radius-lg)',
                                textAlign: 'center',
                                boxShadow: `0 0 20px ${theme.glow}`,
                                transform: 'scale(1.02)',
                                margin: '20px 0'
                            }}>
                                <h3 style={{ color: theme.primary, marginBottom: '10px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Current Step ({currentStep + 1} / {build.steps.length})</h3>
                                <div style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '15px', color: 'white' }}>
                                    <UnitTooltip action={build.steps[currentStep].action} size="large" /> {build.steps[currentStep].action}
                                </div>
                                <div style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                    {build.steps[currentStep].notes || "—"}
                                </div>
                                <div style={{ marginTop: '15px', fontSize: '2rem', fontFamily: 'monospace', fontWeight: 'bold', color: theme.primary }}>
                                    {build.steps[currentStep].supply} <span style={{ fontSize: '1rem', opacity: 0.7 }}>SUPPLY</span>
                                </div>
                            </div>

                            {/* Coming Up */}
                            {currentStep < build.steps.length - 1 && (
                                <div style={{ marginTop: '10px', opacity: 0.7 }}>
                                    <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '10px', textAlign: 'center' }}>Coming Up</h4>
                                    {build.steps.slice(currentStep + 1, currentStep + 4).map((step: any, i: number) => (
                                        <div key={i} style={{
                                            padding: '15px 20px',
                                            borderBottom: '1px solid var(--border-subtle)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '20px',
                                            color: 'var(--text-secondary)'
                                        }}>
                                            <span style={{ fontFamily: 'monospace', minWidth: '50px' }}>{step.timing || formatTime(parseTimingToSeconds(step.timing))}</span>
                                            <strong style={{ minWidth: '30px' }}>{step.supply}</strong>
                                            <span>{step.action}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
                        <div style={{ padding: '20px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)' }}>
                            <h2 style={{ color: theme.primary, margin: 0, fontSize: '1.5rem' }}>Build Order Steps</h2>
                        </div>

                        <div style={{ overflowX: 'auto', padding: '0' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                        <th style={{ padding: '16px 24px', textAlign: 'left', width: '80px', textTransform: 'capitalize' }}>Supply</th>
                                        <th style={{ padding: '16px 24px', textAlign: 'left', width: '80px', textTransform: 'capitalize' }}>Time</th>
                                        <th style={{ padding: '16px 24px', textAlign: 'left', textTransform: 'capitalize' }}>Action</th>
                                        <th style={{ padding: '16px 24px', textAlign: 'left', textTransform: 'capitalize' }}>Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {consolidateSteps(build.steps).map((step: any, idx: number) => (
                                        <tr key={idx}
                                            className="tr-hover"
                                            style={{ borderBottom: '1px solid var(--border-subtle)', background: idx === currentStep && studyMode ? 'var(--bg-hover)' : 'transparent', transition: 'background-color 0.1s' }}
                                        >
                                            <td style={{ padding: '16px 24px', color: theme.primary, fontWeight: '800', fontSize: '1.1rem' }}>{step.supply}</td>
                                            <td style={{ padding: '16px 24px', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{step.timing || '-'}</td>
                                            <td style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '500' }}>
                                                <UnitTooltip action={step.action} size="medium" />
                                                <span>{step.action} {step.count > 1 && <span style={{ opacity: 0.7, marginLeft: '4px' }}>x{step.count}</span>}</span>
                                            </td>
                                            <td style={{ padding: '16px 24px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{step.notes || "—"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Transitions Section */}
                        {build.transitions && (
                            <div style={{ padding: '24px', background: 'var(--bg-tertiary)', borderTop: '1px solid var(--border-subtle)' }}>
                                <h3 style={{ fontSize: '1.1rem', color: theme.primary, marginBottom: '10px' }}>Transitions</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>{build.transitions}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

        </>
    );
}
