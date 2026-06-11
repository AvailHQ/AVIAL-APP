import { useState } from 'react';
import { Icon } from '@iconify/react';
import { tokens, directionColors, confidenceColor } from '../../tokens';
import Avatar from '../../components/shared/Avatar';
import { S } from '../../strings';
import type { CoachAthleteView } from '../../types';
import PageWrapper from '../../components/shared/PageWrapper';
import BackButton from '../../components/shared/BackButton';
import PrioritySection from '../../components/coach/PrioritySection';
import AthleteCard from '../../components/coach/AthleteCard';

interface Props {
  athletes: CoachAthleteView[];
  onSelectAthlete: (id: string) => void;
  onBack: () => void;
}

// ── Metric card ──────────────────────────────────────────────────────────────

interface MetricCardProps {
  value: number;
  label: string;
  color: string;
  bg: string;
  border: string;
  icon: string;
}

function MetricCard({ value, label, color, bg, border, icon }: MetricCardProps) {
  return (
    <div style={{
      flex: '1 1 120px',
      padding: `${tokens.space.lg} ${tokens.space.lg}`,
      background: bg,
      border: `1px solid ${border}`,
      borderRadius: tokens.radius.lg,
      display: 'flex',
      flexDirection: 'column',
      gap: tokens.space.xs,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{
          fontSize: '32px',
          fontWeight: tokens.font.bold,
          color,
          lineHeight: 1,
        }}>
          {value}
        </div>
        <Icon icon={icon} width={18} color={color} style={{ opacity: 0.6 }} />
      </div>
      <div style={{
        fontSize: tokens.font.xs,
        fontWeight: tokens.font.semibold,
        color,
        opacity: 0.8,
        lineHeight: 1.3,
      }}>
        {label}
      </div>
    </div>
  );
}

// ── Squad overview row ────────────────────────────────────────────────────────

interface OverviewRowProps {
  athlete: CoachAthleteView;
}

function SquadOverviewRow({ athlete }: OverviewRowProps) {
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

// ── Main dashboard ────────────────────────────────────────────────────────────

type ViewMode = 'list' | 'card';

export default function CoachDashboard({ athletes, onSelectAthlete, onBack }: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

  const attention   = athletes.filter(a => a.priorityState === 'Requires Attention');
  const pending     = athletes.filter(a => a.priorityState === 'Pending Check-In');
  const stable      = athletes.filter(a => a.priorityState === 'Stable Context');
  const unavailable = athletes.filter(a => a.priorityState === 'Context Unavailable');

  // Overview order: attention → pending → stable → unavailable
  const overviewOrder = [...attention, ...pending, ...stable, ...unavailable];

  const metricCards: MetricCardProps[] = [
    {
      value: attention.length,
      label: 'Requires Attention',
      color: '#96680A',
      bg: 'rgba(181,134,10,0.07)',
      border: 'rgba(181,134,10,0.18)',
      icon: 'ph:warning',
    },
    {
      value: stable.length,
      label: 'Stable Context',
      color: tokens.color.statusMaintain,
      bg: 'rgba(61,155,107,0.07)',
      border: 'rgba(61,155,107,0.18)',
      icon: 'ph:check-circle',
    },
    {
      value: pending.length,
      label: 'Pending Check-In',
      color: tokens.color.statusIncrease,
      bg: 'rgba(45,123,184,0.07)',
      border: 'rgba(45,123,184,0.15)',
      icon: 'ph:clock',
    },
    {
      value: unavailable.length,
      label: 'Context Unavailable',
      color: tokens.color.unavailable,
      bg: tokens.color.unavailableBg,
      border: 'rgba(154,163,173,0.15)',
      icon: 'ph:shield-slash',
    },
  ];

  return (
    <PageWrapper maxWidth="680px" paddingBottom="80px">
      <div style={{ marginBottom: tokens.space.lg }}>
        <BackButton onClick={onBack} label={S.switchRole} />
      </div>

      {/* Header */}
      <div style={{ marginBottom: tokens.space.xl }}>
        <div style={{ fontSize: '24px', fontWeight: tokens.font.bold, color: tokens.color.textPrimary, marginBottom: '4px' }}>
          {S.coachDashboardHeading}
        </div>
        <div style={{ fontSize: tokens.font.sm, color: tokens.color.textSecondary }}>{today}</div>
      </div>

      {/* Persistent framing */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: tokens.space.sm,
        padding: `${tokens.space.md} ${tokens.space.lg}`,
        background: 'rgba(79,163,199,0.07)',
        border: '1px solid rgba(79,163,199,0.18)',
        borderRadius: tokens.radius.md,
        marginBottom: tokens.space['2xl'],
      }}>
        <Icon icon="ph:info" width={16} color={tokens.color.statusIncrease} style={{ marginTop: '1px', flexShrink: 0 }} />
        <span style={{ fontSize: tokens.font.sm, color: tokens.color.statusIncrease, lineHeight: '1.5', fontWeight: tokens.font.medium }}>
          {S.coachFraming}
        </span>
      </div>

      {/* Metric cards */}
      <div style={{ display: 'flex', gap: tokens.space.md, flexWrap: 'wrap', marginBottom: tokens.space['2xl'] }}>
        {metricCards.map(card => (
          <MetricCard key={card.label} {...card} />
        ))}
      </div>

      {/* Squad overview chart */}
      <div style={{
        background: tokens.card.background,
        backdropFilter: tokens.card.backdropFilter,
        border: tokens.card.border,
        borderRadius: tokens.card.borderRadius,
        boxShadow: tokens.card.boxShadow,
        padding: tokens.space['2xl'],
        marginBottom: tokens.space['2xl'],
      }}>
        {/* Chart header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: tokens.space.lg,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.sm }}>
            <Icon icon="ph:chart-bar-horizontal" width={16} color={tokens.color.textSecondary} />
            <span style={{ fontSize: tokens.font.sm, fontWeight: tokens.font.semibold, color: tokens.color.textPrimary }}>
              {S.squadOverviewHeading}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.sm }}>
            {[
              { color: tokens.color.statusMaintain, label: S.legendMaintain },
              { color: tokens.color.statusReduce, label: S.legendReduce },
              { color: tokens.color.statusRecovery, label: S.legendRecovery },
            ].map(l => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: l.color, opacity: 0.75 }} />
                <span style={{ fontSize: tokens.font.xs, color: tokens.color.textMuted }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scale labels */}
        <div style={{
          display: 'flex',
          paddingLeft: '152px',
          paddingRight: '80px',
          marginBottom: tokens.space.xs,
        }}>
          {[0, 25, 50, 75, 100].map(n => (
            <div key={n} style={{
              flex: n === 0 ? 0 : 1,
              fontSize: '10px',
              color: tokens.color.textMuted,
              textAlign: n === 0 ? 'left' : 'right',
            }}>
              {n}
            </div>
          ))}
        </div>

        {/* Athlete rows */}
        <div>
          {overviewOrder.map(athlete => (
            <SquadOverviewRow key={athlete.athleteId} athlete={athlete} />
          ))}
        </div>
      </div>

      {/* View toggle + section header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: tokens.space.lg,
      }}>
        <span style={{
          fontSize: tokens.font.xs, fontWeight: tokens.font.bold,
          color: tokens.color.textMuted,
          textTransform: 'uppercase', letterSpacing: '0.08em',
        }}>
          {S.squadSectionLabel}
        </span>
        <div style={{
          display: 'flex',
          background: 'rgba(255,255,255,0.65)',
          border: '1px solid rgba(0,0,0,0.07)',
          borderRadius: tokens.radius.md,
          overflow: 'hidden',
        }}>
          {(['list', 'card'] as ViewMode[]).map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                padding: '6px 10px',
                border: 'none',
                background: viewMode === mode ? 'rgba(79,163,199,0.12)' : 'transparent',
                color: viewMode === mode ? tokens.color.statusIncrease : tokens.color.textMuted,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center',
                transition: 'background 0.15s',
                outline: 'none',
              }}
              onFocus={e => { e.currentTarget.style.boxShadow = '0 0 0 2px rgba(79,163,199,0.35)'; }}
              onBlur={e => { e.currentTarget.style.boxShadow = 'none'; }}
            >
              <Icon
                icon={mode === 'list' ? 'ph:list' : 'ph:grid-four'}
                width={16}
              />
            </button>
          ))}
        </div>
      </div>

      {/* List view */}
      {viewMode === 'list' && (
        <>
          <div
            className="coach-col-headers"
            style={{ display: 'flex', alignItems: 'center', gap: tokens.space.md, padding: `0 ${tokens.space.lg}`, marginBottom: tokens.space.sm }}
          >
            <style>{`
              @media (max-width: 540px) { .coach-col-headers { display: none !important; } }
            `}</style>
            <div style={{ flex: 1, paddingLeft: '52px', fontSize: tokens.font.xs, color: tokens.color.textMuted, fontWeight: tokens.font.semibold, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              {S.colAthlete}
            </div>
            <div style={{ display: 'flex', gap: tokens.space.md, flexShrink: 0 }}>
              <span style={{ fontSize: tokens.font.xs, color: tokens.color.textMuted, fontWeight: tokens.font.semibold, textTransform: 'uppercase', letterSpacing: '0.07em', minWidth: '32px', textAlign: 'right' }}>{S.colScore}</span>
              <span style={{ fontSize: tokens.font.xs, color: tokens.color.textMuted, fontWeight: tokens.font.semibold, textTransform: 'uppercase', letterSpacing: '0.07em', minWidth: '80px' }}>{S.colContext}</span>
              <span style={{ fontSize: tokens.font.xs, color: tokens.color.textMuted, fontWeight: tokens.font.semibold, textTransform: 'uppercase', letterSpacing: '0.07em', minWidth: '64px' }}>{S.colConfidence}</span>
              <span style={{ fontSize: tokens.font.xs, color: tokens.color.textMuted, fontWeight: tokens.font.semibold, textTransform: 'uppercase', letterSpacing: '0.07em', minWidth: '72px' }}>{S.colTrend}</span>
            </div>
            <div style={{ width: '14px' }} />
          </div>
          <PrioritySection title={S.coachPriorityAttention} athletes={attention} onSelect={onSelectAthlete} accentColor="#96680A" />
          <PrioritySection title={S.coachPriorityPending} athletes={pending} onSelect={onSelectAthlete} accentColor={tokens.color.statusIncrease} />
          <PrioritySection title={S.coachPriorityStable} athletes={stable} onSelect={onSelectAthlete} accentColor={tokens.color.statusMaintain} />
          <PrioritySection title={S.coachPriorityUnavailable} athletes={unavailable} onSelect={onSelectAthlete} defaultCollapsed={true} accentColor={tokens.color.unavailable} />
        </>
      )}

      {/* Card view */}
      {viewMode === 'card' && (
        <>
          <style>{`
            .athlete-card-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 12px;
            }
            @media (min-width: 560px) {
              .athlete-card-grid { grid-template-columns: repeat(3, 1fr); }
            }
          `}</style>
          <div className="athlete-card-grid">
            {overviewOrder.map(athlete => (
              <AthleteCard
                key={athlete.athleteId}
                athlete={athlete}
                onClick={() => onSelectAthlete(athlete.athleteId)}
              />
            ))}
          </div>
        </>
      )}
    </PageWrapper>
  );
}
