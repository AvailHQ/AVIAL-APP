import { useState } from 'react';
import { Icon } from '@iconify/react';
import { tokens, directionColors } from '../../tokens';
import { S } from '../../strings';
import type { CoachAthleteView } from '../../types';
import { ConfidenceBadge, TrendBadge } from '../shared/Badge';
import Avatar from '../shared/Avatar';

interface Props {
  athlete: CoachAthleteView;
  onClick: () => void;
}

export default function AthleteListRow({ athlete, onClick }: Props) {
  const { text: dirColor } = directionColors(athlete.direction);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const boxShadow = focused
    ? '0 0 0 2px rgba(79,163,199,0.5)'
    : hovered
    ? '0 2px 12px rgba(0,0,0,0.05)'
    : 'none';

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: tokens.space.md,
        padding: `${tokens.space.md} ${tokens.space.lg}`,
        background: hovered ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.60)',
        borderRadius: tokens.radius.md,
        border: '1px solid rgba(255,255,255,0.4)',
        cursor: 'pointer',
        transition: 'background 0.15s, box-shadow 0.15s',
        marginBottom: tokens.space.sm,
        width: '100%',
        textAlign: 'left',
        fontFamily: tokens.font.family,
        outline: 'none',
        boxShadow,
      }}
    >
      {/* Avatar */}
      <Avatar
        initials={athlete.avatarInitials}
        avatarPosition={athlete.avatarPosition}
        size={36}
        unavailable={athlete.contextUnavailable}
      />

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
            {S.directionLabel(athlete.direction)}
          </span>

          {/* Confidence */}
          <ConfidenceBadge confidence={athlete.confidence} size="sm" />

          {/* Trend */}
          <TrendBadge trend={athlete.trend} size="sm" />
        </div>
      )}

      {/* Chevron */}
      <Icon icon="ph:caret-right" width={14} color={tokens.color.textMuted} style={{ flexShrink: 0 }} />
    </button>
  );
}
