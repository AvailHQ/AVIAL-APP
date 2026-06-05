import { tokens, directionColors, confidenceColor, trendColor } from '../../tokens';
import { S } from '../../strings';
import type { CoachAthleteView } from '../../types';
import { DirectionBadge, ConfidenceBadge, TrendBadge } from '../shared/Badge';

interface Props {
  athlete: CoachAthleteView;
  onClick: () => void;
}

// SVG ring around avatar — coloured by direction, filled by load score
function ScoreRing({
  score,
  direction,
  size = 72,
  strokeWidth = 4,
}: {
  score: number | null;
  direction: CoachAthleteView['direction'];
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const fill = score !== null ? (score / 100) * circumference : 0;
  const { text: ringColor } = directionColors(direction);
  const trackColor = 'rgba(0,0,0,0.07)';

  return (
    <svg width={size} height={size} style={{ position: 'absolute', top: 0, left: 0 }}>
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={trackColor}
        strokeWidth={strokeWidth}
      />
      {/* Progress */}
      {score !== null && (
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${fill} ${circumference}`}
          strokeDashoffset={circumference / 4}  // start at top
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.5s ease', opacity: 0.8 }}
        />
      )}
    </svg>
  );
}

export default function AthleteCard({ athlete, onClick }: Props) {
  const { text: dirColor } = directionColors(athlete.direction);
  const isUnavailable = athlete.contextUnavailable;
  const isPending = athlete.pendingCheckIn && !isUnavailable;
  const hasScore = !isUnavailable && !isPending && athlete.loadScore !== null;

  return (
    <button
      onClick={onClick}
      style={{
        background: tokens.card.background,
        backdropFilter: tokens.card.backdropFilter,
        border: tokens.card.border,
        borderRadius: tokens.card.borderRadius,
        boxShadow: tokens.card.boxShadow,
        padding: tokens.space['2xl'],
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: tokens.space.md,
        cursor: 'pointer',
        textAlign: 'center',
        width: '100%',
        fontFamily: tokens.font.family,
        outline: 'none',
        transition: 'box-shadow 0.18s, transform 0.18s',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = tokens.card.boxShadow;
        e.currentTarget.style.transform = 'translateY(0)';
      }}
      onFocus={e => {
        e.currentTarget.style.boxShadow = `0 0 0 2px rgba(79,163,199,0.45)`;
      }}
      onBlur={e => {
        e.currentTarget.style.boxShadow = tokens.card.boxShadow;
      }}
    >
      {/* Priority indicator stripe — top edge */}
      {!isUnavailable && !isPending && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '3px',
          background: hasScore ? dirColor : tokens.color.unavailable,
          opacity: 0.6,
          borderRadius: `${tokens.card.borderRadius} ${tokens.card.borderRadius} 0 0`,
        }} />
      )}

      {/* Avatar + ring */}
      <div style={{ position: 'relative', width: 72, height: 72, flexShrink: 0 }}>
        <ScoreRing
          score={hasScore ? athlete.loadScore : null}
          direction={athlete.direction}
        />
        <div style={{
          position: 'absolute',
          top: 6, left: 6,
          width: 60, height: 60,
          borderRadius: '50%',
          background: isUnavailable
            ? 'rgba(154,163,173,0.15)'
            : 'linear-gradient(135deg, #3D9B6B, #4FA3C7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: isUnavailable ? tokens.color.unavailable : '#fff',
          fontSize: '18px', fontWeight: tokens.font.bold,
        }}>
          {athlete.avatarInitials}
        </div>
      </div>

      {/* Name + position */}
      <div>
        <div style={{
          fontSize: tokens.font.lg,
          fontWeight: tokens.font.bold,
          color: isUnavailable ? tokens.color.textMuted : tokens.color.textPrimary,
          marginBottom: '2px',
          lineHeight: 1.2,
        }}>
          {athlete.name}
        </div>
        <div style={{ fontSize: tokens.font.xs, color: tokens.color.textMuted }}>
          {athlete.position}
        </div>
      </div>

      {/* Score */}
      {hasScore && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          <div style={{
            fontSize: '36px',
            fontWeight: tokens.font.bold,
            color: dirColor,
            lineHeight: 1,
          }}>
            {athlete.loadScore}
          </div>
          <div style={{ fontSize: tokens.font.xs, color: tokens.color.textSecondary }}>
            {athlete.loadLabel}
          </div>
        </div>
      )}

      {/* Unavailable state */}
      {isUnavailable && (
        <div style={{
          fontSize: tokens.font.sm, color: tokens.color.textMuted,
          padding: `${tokens.space.sm} ${tokens.space.md}`,
          background: tokens.color.unavailableBg,
          borderRadius: tokens.radius.full,
          fontWeight: tokens.font.medium,
        }}>
          {S.contextUnavailable}
        </div>
      )}

      {/* Pending state */}
      {isPending && (
        <div style={{
          fontSize: tokens.font.sm, color: tokens.color.statusIncrease,
          padding: `${tokens.space.sm} ${tokens.space.md}`,
          background: 'rgba(45,123,184,0.08)',
          borderRadius: tokens.radius.full,
          fontWeight: tokens.font.medium,
        }}>
          Pending check-in
        </div>
      )}

      {/* Direction + badges */}
      {hasScore && athlete.direction && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: tokens.space.xs, width: '100%' }}>
          <span style={{ whiteSpace: 'normal', textAlign: 'center' }}>
            <DirectionBadge direction={athlete.direction} size="sm" />
          </span>
          <div style={{ display: 'flex', gap: tokens.space.xs, justifyContent: 'center', flexWrap: 'wrap' }}>
            <ConfidenceBadge confidence={athlete.confidence} size="sm" />
            <TrendBadge trend={athlete.trend} size="sm" />
          </div>
        </div>
      )}
    </button>
  );
}
