import React from 'react';

/**
 * MultiColorDivider – a reusable horizontal border with color segments.
 *
 * Props:
 * - segments: Array<{ color: string; portion: number }>
 *     portion values are relative (they will be normalized). Defaults match the image provided.
 * - height: number (px) – thickness of the divider (default 6)
 * - rounded: boolean – whether to slightly round the corners (default false)
 * - className: string – optional extra classes for the outer wrapper
 *
 * Example usage:
 *   <MultiColorDivider />
 *   <MultiColorDivider height={4} />
 *   <MultiColorDivider segments={[
 *     { color: "#06B6D4", portion: 0.20 },
 *     { color: "#6B21A8", portion: 0.18 },
 *     { color: "#F59E0B", portion: 0.57 },
 *     { color: "#E11D48", portion: 0.05 },
 *   ]} />
 */
export default function MultiColorDivider({
  segments = [
    { color: '#06B6D4', portion: 0.2 }, // cyan (start)
    { color: '#6B21A8', portion: 0.18 }, // purple
    { color: '#F59E0B', portion: 0.57 }, // orange (long middle)
    { color: '#E11D48', portion: 0.05 }, // pink (end)
  ],
  height = 6,
  rounded = false,
  className = '',
}) {
  // Normalize the portions to 100%
  const total =
    segments.reduce((acc, s) => acc + (Number(s.portion) || 0), 0) || 1;
  const normalized = segments.map((s) => ({
    color: s.color,
    width: `${(Number(s.portion) / total) * 100}%`,
  }));

  return (
    <div className={`w-full ${className}`} aria-label="multi-color-divider">
      <div
        className={`flex w-full ${rounded ? 'rounded-full overflow-hidden' : ''}`}
        style={{ height: `${height}px` }}
      >
        {normalized.map((seg, i) => (
          <div key={i} style={{ width: seg.width, background: seg.color }} />
        ))}
      </div>
    </div>
  );
}
