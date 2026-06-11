import { tokens, directionColors, confidenceColor, trendColor } from '../../tokens';
import { S } from '../../strings';
import type { Direction, Confidence, Trend } from '../../types';

interface BadgeProps {
  label: string;
  color: string;
  bg: string;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}

export function Badge({ label, color, bg, size = 'md', style }: BadgeProps) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: size === 'sm' ? '2px 8px' : '4px 12px',
      borderRadius: tokens.radius.full,
      fontSize: size === 'sm' ? tokens.font.xs : tokens.font.sm,
      fontWeight: tokens.font.semibold,
      color,
      background: bg,
      letterSpacing: '0.01em',
      whiteSpace: 'nowrap',
      ...style,
    }}>
      {label}
    </span>
  );
}

export function DirectionBadge({ direction, size }: { direction: Direction | null; size?: 'sm' | 'md' }) {
  const c = directionColors(direction);
  return <Badge label={S.directionLabel(direction)} color={c.text} bg={c.bg} size={size} />;
}

export function ConfidenceBadge({ confidence, size }: { confidence: Confidence | null; size?: 'sm' | 'md' }) {
  const color = confidenceColor(confidence);
  const label = S.confidence(confidence);
  return (
    <Badge
      label={label}
      color={color}
      bg={color + '18'}
      size={size}
    />
  );
}

export function TrendBadge({ trend, size }: { trend: Trend | null; size?: 'sm' | 'md' }) {
  const color = trendColor(trend);
  const arrow = trend === 'Improving' ? '↑' : trend === 'Declining' ? '↓' : '→';
  const label = trend ? `${arrow} ${trend}` : '—';
  return (
    <Badge
      label={label}
      color={color}
      bg={color + '15'}
      size={size}
    />
  );
}

export function PriorityBadge({ state }: { state: string }) {
  const styles: Record<string, { color: string; bg: string }> = {
    'Requires Attention': { color: '#96680A', bg: 'rgba(181,134,10,0.10)' },
    'Stable Context':     { color: tokens.color.statusMaintain, bg: tokens.color.statusMaintainBg },
    'Pending Check-In':   { color: tokens.color.statusIncrease, bg: tokens.color.statusIncreaseBg },
    'Context Unavailable':{ color: tokens.color.unavailable, bg: tokens.color.unavailableBg },
  };
  const s = styles[state] ?? { color: tokens.color.textMuted, bg: 'transparent' };
  return <Badge label={state} color={s.color} bg={s.bg} size="sm" />;
}
