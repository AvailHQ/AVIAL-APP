import { Icon } from '@iconify/react';
import { tokens } from '../../tokens';
import { S } from '../../strings';
import type { CoachAthleteView } from '../../types';
import PageWrapper from '../shared/PageWrapper';
import BackButton from '../shared/BackButton';
import PrioritySection from './PrioritySection';

interface Props {
  athletes: CoachAthleteView[];
  onSelectAthlete: (id: string) => void;
  onBack: () => void;
}

export default function CoachDashboard({ athletes, onSelectAthlete, onBack }: Props) {
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

  const attention = athletes.filter(a => a.priorityState === 'Requires Attention');
  const pending = athletes.filter(a => a.priorityState === 'Pending Check-In');
  const stable = athletes.filter(a => a.priorityState === 'Stable Context');
  const unavailable = athletes.filter(a => a.priorityState === 'Context Unavailable');

  return (
    <PageWrapper maxWidth="680px" paddingBottom="80px">
      <div style={{ marginBottom: tokens.space.lg }}>
        <BackButton onClick={onBack} label="Switch role" />
      </div>

      {/* Header */}
      <div style={{ marginBottom: tokens.space.xl }}>
        <div style={{ fontSize: '24px', fontWeight: tokens.font.bold, color: tokens.color.textPrimary, marginBottom: '4px' }}>
          {S.coachDashboardHeading}
        </div>
        <div style={{ fontSize: tokens.font.sm, color: tokens.color.textSecondary }}>{today}</div>
      </div>

      {/* Persistent framing — required by prototype_scope.md */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: tokens.space.sm,
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

      {/* Squad summary chips */}
      <div style={{ display: 'flex', gap: tokens.space.sm, flexWrap: 'wrap', marginBottom: tokens.space['2xl'] }}>
        {[
          { label: `${athletes.length} athletes`, icon: 'ph:users', color: tokens.color.textSecondary },
          { label: `${attention.length} require attention`, icon: 'ph:warning', color: '#96680A' },
          { label: `${stable.length} stable`, icon: 'ph:check-circle', color: tokens.color.statusMaintain },
          { label: `${pending.length} pending`, icon: 'ph:clock', color: tokens.color.statusIncrease },
        ].map(chip => (
          <div key={chip.label} style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            padding: '4px 12px',
            background: 'rgba(255,255,255,0.65)',
            borderRadius: tokens.radius.full,
            border: '1px solid rgba(0,0,0,0.06)',
            fontSize: tokens.font.xs,
            color: chip.color,
            fontWeight: tokens.font.medium,
          }}>
            <Icon icon={chip.icon} width={12} />
            {chip.label}
          </div>
        ))}
      </div>

      {/* Column headers (for wider screens) */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: tokens.space.md,
        padding: `0 ${tokens.space.lg}`,
        marginBottom: tokens.space.sm,
      }}>
        <div style={{ flex: 1, paddingLeft: '52px', fontSize: tokens.font.xs, color: tokens.color.textMuted, fontWeight: tokens.font.semibold, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
          Athlete
        </div>
        <div style={{ display: 'flex', gap: tokens.space.md, flexShrink: 0 }}>
          <span style={{ fontSize: tokens.font.xs, color: tokens.color.textMuted, fontWeight: tokens.font.semibold, textTransform: 'uppercase', letterSpacing: '0.07em', minWidth: '32px', textAlign: 'right' }}>Score</span>
          <span style={{ fontSize: tokens.font.xs, color: tokens.color.textMuted, fontWeight: tokens.font.semibold, textTransform: 'uppercase', letterSpacing: '0.07em', minWidth: '80px' }}>Direction</span>
          <span style={{ fontSize: tokens.font.xs, color: tokens.color.textMuted, fontWeight: tokens.font.semibold, textTransform: 'uppercase', letterSpacing: '0.07em', minWidth: '64px' }}>Confidence</span>
          <span style={{ fontSize: tokens.font.xs, color: tokens.color.textMuted, fontWeight: tokens.font.semibold, textTransform: 'uppercase', letterSpacing: '0.07em', minWidth: '72px' }}>Trend</span>
        </div>
        <div style={{ width: '14px' }} />
      </div>

      {/* Priority sections */}
      <PrioritySection
        title={S.coachPriorityAttention}
        athletes={attention}
        onSelect={onSelectAthlete}
        accentColor="#96680A"
      />
      <PrioritySection
        title={S.coachPriorityPending}
        athletes={pending}
        onSelect={onSelectAthlete}
        accentColor={tokens.color.statusIncrease}
      />
      <PrioritySection
        title={S.coachPriorityStable}
        athletes={stable}
        onSelect={onSelectAthlete}
        accentColor={tokens.color.statusMaintain}
      />
      <PrioritySection
        title={S.coachPriorityUnavailable}
        athletes={unavailable}
        onSelect={onSelectAthlete}
        defaultCollapsed={true}
        accentColor={tokens.color.unavailable}
      />
    </PageWrapper>
  );
}
