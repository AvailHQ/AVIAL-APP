import { tokens, directionColors, confidenceColor } from '../../tokens';
import { S } from '../../strings';
import type { CoachAthleteView } from '../../types';
import Avatar from '../shared/Avatar';

interface Props {
  athlete: CoachAthleteView;
}

export default function SquadOverviewRow({ athlete }: Props) {
  const isUnavailable = athlete.contextUnavailable;
  const isPending = athlete.pendingCheckIn;
  const hasScore = athlete.loadScore !== null && !isUnavailable && !isPending;

  const { text: barColor } = directionColors(athlete.direction);
  const barWidth = hasScore ? `${athlete.loadScore}%` : '0%';

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: tokens.space.md,
      padding: `${tokens.space.sm} 0`,
      borderBottom: `1px solid rgba(0,0,0,0.04)`,
    }}>
      {/* Avatar */}
      <Avatar
        initials={athlete.avatarInitials}
        avatarCrop={athlete.avatarCrop}
        size={28}
        unavailable={isUnavailable}
      />

      {/* Name */}
      <div style={{
        width: '108px', flexShrink: 0,
        fontSize: tokens.font.sm,
        fontWeight: tokens.font.medium,
        color: isUnavailable ? tokens.color.textMuted : tokens.color.textPrimary,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        {athlete.name}
      </div>

      {/* Bar track */}
      <div style={{
        flex: 1,
        height: '8px',
        background: 'rgba(0,0,0,0.06)',
        borderRadius: tokens.radius.full,
        overflow: 'hidden',
        position: 'relative',
      }}>
        {hasScore && (
          <div style={{
            height: '100%',
            width: barWidth,
            background: barColor,
            borderRadius: tokens.radius.full,
            opacity: 0.75,
            transition: 'width 0.4s ease',
          }} />
        )}
        {isPending && (
          <div style={{
            height: '100%',
            width: '60%',
            background: `repeating-linear-gradient(
              90deg,
              rgba(45,123,184,0.25) 0px,
              rgba(45,123,184,0.25) 8px,
              transparent 8px,
              transparent 14px
            )`,
            borderRadius: tokens.radius.full,
          }} />
        )}
        {isUnavailable && (
          <div style={{
            height: '100%',
            width: '100%',
            background: 'rgba(154,163,173,0.12)',
            borderRadius: tokens.radius.full,
          }} />
        )}
      </div>

      {/* Score / state label — confidence must accompany the score */}
      <div style={{
        width: '72px', flexShrink: 0, textAlign: 'right',
        fontSize: tokens.font.xs, fontWeight: tokens.font.semibold,
        color: hasScore ? barColor : tokens.color.textMuted,
      }}>
        {hasScore ? (
          <>
            <div>{athlete.loadScore}</div>
            <div style={{
              fontSize: '10px',
              fontWeight: tokens.font.medium,
              color: confidenceColor(athlete.confidence),
            }}>
              {athlete.confidence}
            </div>
          </>
        ) : isPending ? S.pendingShort : '—'}
      </div>
    </div>
  );
}
