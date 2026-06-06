import { useState } from 'react';
import { Icon } from '@iconify/react';
import Avatar from '../shared/Avatar';
import { tokens } from '../../tokens';
import { S } from '../../strings';
import type { CoachAthleteView, DifferentDecision } from '../../types';
import PageWrapper from '../shared/PageWrapper';
import BackButton from '../shared/BackButton';
import Card from '../shared/Card';
import { DirectionBadge, ConfidenceBadge, TrendBadge } from '../shared/Badge';
import LoadScoreRing from '../shared/LoadScoreRing';
import TrendChart from '../shared/TrendChart';
import ContextDimensionsPanel from '../shared/ContextDimensionsPanel';

interface Props {
  athlete: CoachAthleteView;
  differentDecisions: DifferentDecision[];
  onDifferentDecision: () => void;
  onBack: () => void;
}

export default function CoachAthleteDetail({ athlete, differentDecisions, onDifferentDecision, onBack }: Props) {
  const [decisionHovered, setDecisionHovered] = useState(false);

  return (
    <PageWrapper maxWidth="560px" paddingBottom="80px">
      <div style={{ marginBottom: tokens.space.lg }}>
        <BackButton onClick={onBack} label={S.coachDetailBack} />
      </div>

      {/* Persistent framing */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: tokens.space.sm,
        padding: `${tokens.space.sm} ${tokens.space.md}`,
        background: 'rgba(79,163,199,0.07)',
        border: '1px solid rgba(79,163,199,0.15)',
        borderRadius: tokens.radius.md,
        marginBottom: tokens.space.xl,
      }}>
        <Icon icon="ph:info" width={14} color={tokens.color.statusIncrease} style={{ marginTop: '2px', flexShrink: 0 }} />
        <span style={{ fontSize: tokens.font.sm, color: tokens.color.statusIncrease, lineHeight: '1.5' }}>
          {S.coachFraming}
        </span>
      </div>

      {/* Athlete header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.md, marginBottom: tokens.space['2xl'] }}>
        <Avatar
          initials={athlete.avatarInitials}
          avatarPosition={athlete.avatarPosition}
          objectPosition={athlete.avatarObjectPosition}
          size={48}
          unavailable={athlete.contextUnavailable}
        />
        <div>
          <div style={{ fontSize: '20px', fontWeight: tokens.font.bold, color: tokens.color.textPrimary }}>{athlete.name}</div>
          <div style={{ fontSize: tokens.font.sm, color: tokens.color.textSecondary }}>{athlete.sport} · {athlete.position}</div>
        </div>
      </div>

      {/* Context unavailable state */}
      {athlete.contextUnavailable && (
        <Card padding={tokens.space.xl}>
          <div style={{ textAlign: 'center', padding: `${tokens.space.xl} 0` }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: tokens.color.unavailableBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <Icon icon="ph:shield-slash" width={24} color={tokens.color.unavailable} />
            </div>
            <div style={{ fontSize: tokens.font.lg, fontWeight: tokens.font.semibold, color: tokens.color.textMuted, marginBottom: tokens.space.sm }}>
              {S.contextUnavailable}
            </div>
            <div style={{ fontSize: tokens.font.md, color: tokens.color.textMuted, lineHeight: '1.6', maxWidth: '320px', margin: '0 auto' }}>
              {S.coachUnavailableMessage}
            </div>
          </div>
        </Card>
      )}

      {/* Full context view */}
      {!athlete.contextUnavailable && athlete.loadScore !== null && athlete.direction && athlete.confidence && athlete.trend && (
        <>
          {/* Pending check-in note */}
          {athlete.pendingCheckIn && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: tokens.space.sm,
              padding: `${tokens.space.sm} ${tokens.space.lg}`,
              background: 'rgba(45,123,184,0.07)',
              border: '1px solid rgba(45,123,184,0.15)',
              borderRadius: tokens.radius.md,
              marginBottom: tokens.space.lg,
            }}>
              <Icon icon="ph:clock" width={14} color={tokens.color.statusIncrease} />
              <span style={{ fontSize: tokens.font.sm, color: tokens.color.statusIncrease }}>{S.coachPendingCheckInNote}</span>
            </div>
          )}

          {/* Score + badges */}
          <Card style={{ marginBottom: tokens.space.lg }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: tokens.space.xl, paddingBottom: tokens.space.sm }}>
              <LoadScoreRing
                score={athlete.loadScore}
                label={athlete.loadLabel ?? ''}
                direction={athlete.direction}
                size={140}
              />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: tokens.space.sm, width: '100%' }}>
                <DirectionBadge direction={athlete.direction} />
                <div style={{ display: 'flex', gap: tokens.space.sm, flexWrap: 'wrap', justifyContent: 'center' }}>
                  <ConfidenceBadge confidence={athlete.confidence} size="sm" />
                  <TrendBadge trend={athlete.trend} size="sm" />
                </div>
              </div>
              {athlete.contextSummary && (
                <div style={{
                  fontSize: tokens.font.md,
                  color: tokens.color.textSecondary,
                  lineHeight: '1.6',
                  textAlign: 'center',
                  padding: `0 ${tokens.space.sm}`,
                }}>
                  {athlete.contextSummary}
                </div>
              )}
              <ContextDimensionsPanel dimensions={athlete.dimensions} />
            </div>
          </Card>

          {/* 7-day trend */}
          <Card style={{ marginBottom: tokens.space.lg }} padding={tokens.space.lg}>
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.sm, marginBottom: tokens.space.md }}>
              <Icon icon="ph:chart-line" width={15} color={tokens.color.textSecondary} />
              <span style={{ fontSize: tokens.font.sm, fontWeight: tokens.font.semibold, color: tokens.color.textPrimary }}>
                {S.coachTrendLabel}
              </span>
              <TrendBadge trend={athlete.trend} size="sm" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <TrendChart history={athlete.trendHistory} trend={athlete.trend} width={380} height={72} />
            </div>
          </Card>

          {/* Previous different decisions */}
          <Card style={{ marginBottom: tokens.space.xl }} padding={tokens.space.lg}>
            <div style={{ fontSize: tokens.font.sm, fontWeight: tokens.font.semibold, color: tokens.color.textPrimary, marginBottom: tokens.space.md }}>
              {S.coachPreviousDecisions}
            </div>
            {differentDecisions.length === 0 ? (
              <div style={{ fontSize: tokens.font.sm, color: tokens.color.textMuted }}>{S.coachNoPreviousDecisions}</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.sm }}>
                {differentDecisions.map(d => (
                  <div key={d.id} style={{
                    padding: tokens.space.md,
                    background: 'rgba(181,134,10,0.05)',
                    borderRadius: tokens.radius.md,
                    border: '1px solid rgba(181,134,10,0.12)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: tokens.font.sm, fontWeight: tokens.font.medium, color: tokens.color.textPrimary }}>{d.reason}</span>
                      <span style={{ fontSize: tokens.font.xs, color: tokens.color.textMuted }}>{d.date}</span>
                    </div>
                    {d.notes && <div style={{ fontSize: tokens.font.sm, color: tokens.color.textSecondary }}>{d.notes}</div>}
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* I'm making a different decision CTA */}
          <button
            onClick={onDifferentDecision}
            onMouseEnter={() => setDecisionHovered(true)}
            onMouseLeave={() => setDecisionHovered(false)}
            style={{
              width: '100%', padding: `${tokens.space.md} ${tokens.space.xl}`,
              background: decisionHovered ? 'rgba(181,134,10,0.13)' : 'rgba(181,134,10,0.08)',
              border: '1px solid rgba(181,134,10,0.20)',
              borderRadius: tokens.radius.full,
              color: '#96680A', fontSize: tokens.font.md, fontWeight: tokens.font.semibold,
              cursor: 'pointer', fontFamily: tokens.font.family,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: tokens.space.sm,
              transition: 'background 0.18s',
              outline: 'none',
            }}
          >
            <Icon icon="ph:note-pencil" width={16} />
            {S.differentDecisionHeading}
          </button>
        </>
      )}
    </PageWrapper>
  );
}
