import { Icon } from '@iconify/react';
import { tokens, directionColors, confidenceColor, trendColor } from '../../tokens';
import type { CoachAthleteView } from '../../types';

interface Props {
  athlete: CoachAthleteView;
  onClick: () => void;
}

export default function AthleteListRow({ athlete, onClick }: Props) {
  const { text: dirColor } = directionColors(athlete.direction);

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: tokens.space.md,
        padding: `${tokens.space.md} ${tokens.space.lg}`,
        background: 'rgba(255,255,255,0.60)',
        borderRadius: tokens.radius.md,
        border: '1px solid rgba(255,255,255,0.4)',
        cursor: 'pointer',
        transition: 'background 0.15s, box-shadow 0.15s',
        marginBottom: tokens.space.sm,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.82)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.60)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '';
      }}
    >
      {/* Avatar */}
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        background: athlete.contextUnavailable
          ? 'rgba(154,163,173,0.15)'
          : 'linear-gradient(135deg, #3D9B6B, #4FA3C7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: athlete.contextUnavailable ? tokens.color.unavailable : '#fff',
        fontSize: '12px', fontWeight: tokens.font.bold, flexShrink: 0,
      }}>
        {athlete.avatarInitials}
      </div>

      {/* Name + position */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: tokens.font.md,
          fontWeight: tokens.font.semibold,
          color: athlete.contextUnavailable ? tokens.color.textMuted : tokens.color.textPrimary,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {athlete.name}
        </div>
        <div style={{ fontSize: tokens.font.xs, color: tokens.color.textMuted }}>{athlete.position}</div>
      </div>

      {/* Context unavailable */}
      {athlete.contextUnavailable && (
        <span style={{
          padding: '3px 10px',
          borderRadius: tokens.radius.full,
          fontSize: tokens.font.xs,
          fontWeight: tokens.font.medium,
          color: tokens.color.unavailable,
          background: tokens.color.unavailableBg,
          border: '1px solid rgba(154,163,173,0.15)',
          whiteSpace: 'nowrap',
        }}>
          Context unavailable
        </span>
      )}

      {/* Pending check-in */}
      {!athlete.contextUnavailable && athlete.pendingCheckIn && (
        <span style={{
          padding: '3px 10px',
          borderRadius: tokens.radius.full,
          fontSize: tokens.font.xs,
          fontWeight: tokens.font.medium,
          color: tokens.color.statusIncrease,
          background: tokens.color.statusIncreaseBg,
          whiteSpace: 'nowrap',
        }}>
          Pending check-in
        </span>
      )}

      {/* Data columns */}
      {!athlete.contextUnavailable && !athlete.pendingCheckIn && athlete.loadScore !== null && (
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.md, flexShrink: 0 }}>
          {/* Load score */}
          <div style={{ textAlign: 'right', minWidth: '32px' }}>
            <div style={{
              fontSize: tokens.font.lg,
              fontWeight: tokens.font.bold,
              color: dirColor,
              lineHeight: 1,
            }}>
              {athlete.loadScore}
            </div>
          </div>

          {/* Direction */}
          <span style={{
            padding: '3px 10px',
            borderRadius: tokens.radius.full,
            fontSize: tokens.font.xs,
            fontWeight: tokens.font.semibold,
            color: dirColor,
            background: directionColors(athlete.direction).bg,
            whiteSpace: 'nowrap',
          }}>
            {athlete.direction}
          </span>

          {/* Confidence */}
          <span style={{
            padding: '3px 8px',
            borderRadius: tokens.radius.full,
            fontSize: tokens.font.xs,
            color: confidenceColor(athlete.confidence),
            background: confidenceColor(athlete.confidence) + '18',
            whiteSpace: 'nowrap',
          }}>
            {athlete.confidence}
          </span>

          {/* Trend */}
          <span style={{
            display: 'flex', alignItems: 'center', gap: '3px',
            fontSize: tokens.font.xs,
            color: trendColor(athlete.trend),
            whiteSpace: 'nowrap',
          }}>
            {athlete.trend === 'Improving' ? <Icon icon="ph:arrow-up" width={10} /> : athlete.trend === 'Declining' ? <Icon icon="ph:arrow-down" width={10} /> : <Icon icon="ph:minus" width={10} />}
            {athlete.trend}
          </span>
        </div>
      )}

      {/* Chevron */}
      <Icon icon="ph:caret-right" width={14} color={tokens.color.textMuted} style={{ flexShrink: 0 }} />
    </div>
  );
}
