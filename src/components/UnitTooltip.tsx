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
    const unitData = getUnitData(action);
    const fallbackIcon = getIconForAction(action);

    // Size mappings
    const sizeMap = {
        small: '24px',
        medium: '32px',
        large: '48px'
    };

    const emojiSizeMap = {
        small: '1rem',
        medium: '1.25rem',
        large: '3rem'
    };

    // If no unit data, return null
    if (!unitData) {
        return null;
    }

    return (
        <div className="unit-tooltip-container" style={{ display: 'inline-block', position: 'relative' }}>
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

            {/* Show loading placeholder if image hasn't loaded yet */}
            {!imageLoaded && !imageError && (
                <div style={{
                    width: sizeMap[size],
                    height: sizeMap[size],
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '4px'
                }} />
            )}

            {showTooltip && imageLoaded && (
                <div className="unit-tooltip-content">
                    <div className="unit-tooltip-header">
                        <img
                            src={unitData.imageUrl}
                            alt={unitData.name}
                            style={{
                                width: '48px',
                                height: '48px',
                                objectFit: 'contain',
                                marginRight: '12px'
                            }}
                        />
                        <div>
                            <div className="unit-tooltip-name">{unitData.name}</div>
                            <div className="unit-tooltip-type">
                                {unitData.race} {unitData.type === 'unit' ? 'Unit' : unitData.type === 'building' ? 'Building' : 'Upgrade'}
                            </div>
                        </div>
                    </div>
                    <div className="unit-tooltip-description">{unitData.description}</div>
                </div>
            )}
        </div>
    );
}
