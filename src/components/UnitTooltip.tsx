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

    // If no unit data or image failed/not loaded yet, show emoji
    if (!unitData || imageError || !unitData.imageUrl) {
        return fallbackIcon ? (
            <span style={{ fontSize: emojiSizeMap[size] }}>
                {fallbackIcon}
            </span>
        ) : null;
    }

    return (
        <div className="unit-tooltip-container" style={{ display: 'inline-block', position: 'relative' }}>
            {/* Show emoji while image is loading */}
            {!imageLoaded && fallbackIcon && (
                <span style={{ fontSize: emojiSizeMap[size] }}>
                    {fallbackIcon}
                </span>
            )}

            <img
                src={unitData.imageUrl}
                alt={unitData.name}
                style={{
                    width: sizeMap[size],
                    height: sizeMap[size],
                    objectFit: 'contain',
                    verticalAlign: 'middle',
                    imageRendering: 'crisp-edges',
                    display: imageLoaded ? 'inline-block' : 'none'
                }}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                    setImageError(true);
                    setImageLoaded(false);
                }}
            />

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
