import { directionColors } from '../../tokens';
import type { Direction } from '../../types';

interface Props {
  score: number;
  label: string;
  direction: Direction;
  size?: number;
}

export default function LoadScoreRing({ score, label, direction, size = 160 }: Props) {
  const { text: strokeColor } = directionColors(direction);
  const radius = (size - 24) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(100, score)) / 100;
  const dashOffset = circumference * (1 - pct);
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background ring */}
        <circle
          cx={cx} cy={cy} r={radius}
          fill="none"
          stroke="rgba(0,0,0,0.07)"
          strokeWidth={10}
        />
        {/* Score ring */}
        <circle
          cx={cx} cy={cy} r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={10}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
        {/* Score number */}
        <text
          x={cx} y={cy - 8}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={size * 0.22}
          fontWeight="700"
          fill={strokeColor}
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        >
          {score}
        </text>
        {/* Label */}
        <text
          x={cx} y={cy + size * 0.14}
          textAnchor="middle"
          fontSize={size * 0.075}
          fill="#64707D"
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        >
          {label}
        </text>
      </svg>
    </div>
  );
}
