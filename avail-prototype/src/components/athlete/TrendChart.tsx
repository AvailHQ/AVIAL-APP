import { trendColor } from '../../tokens';
import type { Trend, TrendPoint } from '../../types';

interface Props {
  history: TrendPoint[];
  trend: Trend;
  width?: number;
  height?: number;
}

export default function TrendChart({ history, trend, width = 280, height = 64 }: Props) {
  const color = trendColor(trend);
  const pad = { top: 8, bottom: 20, left: 8, right: 8 };
  const w = width - pad.left - pad.right;
  const h = height - pad.top - pad.bottom;

  const validScores = history.map(p => p.score).filter((s): s is number => s !== null);
  if (validScores.length === 0) {
    return (
      <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9AA3AD', fontSize: '12px' }}>
        No trend data available
      </div>
    );
  }

  const minScore = Math.min(...validScores) - 5;
  const maxScore = Math.max(...validScores) + 5;
  const range = maxScore - minScore || 10;

  const xStep = w / (history.length - 1);

  const toX = (i: number) => pad.left + i * xStep;
  const toY = (s: number) => pad.top + h - ((s - minScore) / range) * h;

  // Build connected polyline segments (split at null gaps)
  const segments: string[][] = [];
  let current: string[] = [];
  history.forEach((p, i) => {
    if (p.score !== null) {
      current.push(`${toX(i)},${toY(p.score)}`);
    } else {
      if (current.length > 1) segments.push(current);
      current = [];
    }
  });
  if (current.length > 1) segments.push(current);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* Gap indicators */}
      {history.map((p, i) => p.score === null && i > 0 && i < history.length - 1 ? (
        <line
          key={`gap-${i}`}
          x1={toX(i - 0.5)} y1={pad.top + h / 2}
          x2={toX(i + 0.5)} y2={pad.top + h / 2}
          stroke={color}
          strokeWidth={1.5}
          strokeDasharray="3,3"
          opacity={0.3}
        />
      ) : null)}

      {/* Line segments */}
      {segments.map((seg, si) => (
        <polyline
          key={si}
          points={seg.join(' ')}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.75}
        />
      ))}

      {/* Data points */}
      {history.map((p, i) => p.score !== null ? (
        <circle
          key={i}
          cx={toX(i)}
          cy={toY(p.score)}
          r={i === history.length - 1 ? 4 : 3}
          fill={i === history.length - 1 ? color : 'white'}
          stroke={color}
          strokeWidth={i === history.length - 1 ? 0 : 1.5}
          opacity={i === history.length - 1 ? 1 : 0.65}
        />
      ) : (
        <circle
          key={i}
          cx={toX(i)}
          cy={pad.top + h / 2}
          r={2}
          fill="none"
          stroke={color}
          strokeWidth={1}
          opacity={0.25}
        />
      ))}

      {/* Day labels */}
      {history.map((p, i) => (
        <text
          key={`lbl-${i}`}
          x={toX(i)}
          y={height - 2}
          textAnchor="middle"
          fontSize={9}
          fill="#9AA3AD"
          fontFamily="-apple-system, sans-serif"
        >
          {p.day.slice(0, 1)}
        </text>
      ))}
    </svg>
  );
}
