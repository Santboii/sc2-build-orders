'use client';

import { useState } from 'react';
import { getUnitData } from '@/data/unitData';
import { getIconForAction } from '@/utils/icons';

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
