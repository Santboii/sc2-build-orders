'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import { getUnitData } from '@/data/unitData';
import { getIconForAction } from '@/utils/icons';
import { unitCosts } from '@/data/unitCosts';

interface UnitTooltipProps {
    action: string;
    size?: 'small' | 'medium' | 'large';
    showTooltip?: boolean;
}

export default function UnitTooltip({
    action,
    size = 'medium',
    showTooltip = true
}: UnitTooltipProps) {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showDescription, setShowDescription] = useState(false);

    // Test getUnitData
    const unitData = getUnitData(action);
    const fallbackIcon = getIconForAction(action);

    // Size mappings
    const sizeMap = {
        small: '24px',
        medium: '32px',
        large: '48px'
    };

    // If no unit data, return null
    if (!unitData) {
        return null;
    }

    return (
        <div
            className="unit-tooltip-container"
            style={{ display: 'inline-block', position: 'relative', cursor: 'help' }}
            onMouseEnter={() => setShowDescription(true)}
            onMouseLeave={() => setShowDescription(false)}
        >
            <img
                src={unitData.imageUrl}
                alt={unitData.name}
                style={{
                    width: sizeMap[size],
                    height: sizeMap[size],
                    objectFit: 'contain',
                    verticalAlign: 'middle',
                    imageRendering: 'crisp-edges',
                    opacity: imageLoaded ? 1 : 0,
                    transition: 'opacity 0.2s ease-in-out'
                }}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                    setImageError(true);
                    setImageLoaded(false);
                }}
            />

            {/* Tooltip Popup */}
            {showTooltip && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        marginBottom: '10px',
                        width: '250px',
                        background: 'rgba(15, 23, 42, 0.95)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '6px',
                        padding: '12px',
                        zIndex: 100,
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
                        opacity: showDescription ? 1 : 0,
                        visibility: showDescription ? 'visible' : 'hidden',
                        transition: 'opacity 0.2s, visibility 0.2s',
                        pointerEvents: 'none',
                        textAlign: 'left'
                    }}
                >
                    <div style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px', fontSize: '0.9rem' }}>{unitData.name}</div>

                    {unitCosts[unitData.name] && (
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '8px', fontSize: '0.8rem', fontWeight: 600, alignItems: 'center' }}>
                            {unitCosts[unitData.name].minerals > 0 && (
                                <span style={{ color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    {unitCosts[unitData.name].minerals}
                                    <div style={{ position: 'relative', width: '12px', height: '12px' }}>
                                        <Image src="/images/minerals.gif" alt="Minerals" fill style={{ objectFit: 'contain' }} />
                                    </div>
                                </span>
                            )}
                            {unitCosts[unitData.name].gas > 0 && (
                                <span style={{ color: '#4ade80', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    {unitCosts[unitData.name].gas}
                                    <div style={{ position: 'relative', width: '12px', height: '12px' }}>
                                        <Image src="/images/gas.gif" alt="Gas" fill style={{ objectFit: 'contain' }} />
                                    </div>
                                </span>
                            )}
                            {unitCosts[unitData.name].time > 0 && (
                                <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Clock size={12} />
                                    {unitCosts[unitData.name].time}s
                                </span>
                            )}
                        </div>
                    )}

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{unitData.description}</div>

                    {/* Tiny arrow */}
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        borderWidth: '6px',
                        borderStyle: 'solid',
                        borderColor: 'rgba(15, 23, 42, 0.95) transparent transparent transparent'
                    }} />
                </div>
            )}
        </div>
    );
}
