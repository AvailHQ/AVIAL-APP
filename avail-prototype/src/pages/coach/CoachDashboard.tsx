import { useState } from 'react';
import { Icon } from '@iconify/react';
import { tokens } from '../../tokens';
import { S } from '../../strings';
import type { CoachAthleteView } from '../../types';
import PageWrapper from '../../components/shared/PageWrapper';
import BackButton from '../../components/shared/BackButton';
import PrioritySection from '../../components/coach/PrioritySection';
import AthleteCard from '../../components/coach/AthleteCard';
import MetricCard from '../../components/coach/MetricCard';
import type { MetricCardProps } from '../../components/coach/MetricCard';
import SquadOverviewRow from '../../components/coach/SquadOverviewRow';

interface Props {
  athletes: CoachAthleteView[];
  onSelectAthlete: (id: string) => void;
  onBack: () => void;
}

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
      color: tokens.color.statusAttention,
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

        {/* Scale labels — hidden on narrow screens where the axis has no room */}
        <div
          className="squad-scale-labels"
          style={{
            display: 'flex',
            paddingLeft: '152px',
            paddingRight: '80px',
            marginBottom: tokens.space.xs,
          }}
        >
          <style>{`
            @media (max-width: 540px) { .squad-scale-labels { display: none !important; } }
          `}</style>
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
