import { Icon } from '@iconify/react';
import { tokens } from '../../../tokens';
import { S } from '../../../strings';
import type { OnboardingData } from './OnboardingTypes';
import Card from '../../shared/Card';

interface Props {
  data: OnboardingData;
  onComplete: () => void;
}

export default function OnboardingConfirm({ data, onComplete }: Props) {
  const cycleDisplay =
    data.cycleRegularity === 'HormonalContraception' ? S.onboardingConfirmHCDisplay :
    data.cycleRegularity === 'PreferNotToSay' ? S.onboardingConfirmNotShared :
    data.cycleRegularity ?? '—';

  const summaryRows = [
    { icon: 'ph:calendar', label: S.onboardingConfirmCycleLabel, value: cycleDisplay },
    { icon: 'ph:barbell', label: S.onboardingTrainingLevelLabel, value: data.trainingLevel ?? '—' },
    { icon: 'ph:moon', label: S.onboardingConfirmSleepLabel, value: data.sleepConsistency ?? '—' },
  ];

  return (
    <div>
      <div style={{ fontSize: '22px', fontWeight: tokens.font.bold, color: tokens.color.textPrimary, marginBottom: tokens.space.sm }}>
        {S.onboardingConfirmHeading}
      </div>
      <div style={{ fontSize: tokens.font.md, color: tokens.color.textSecondary, marginBottom: tokens.space['2xl'], lineHeight: '1.5' }}>
        {S.onboardingConfirmBody}
      </div>

      <Card style={{ marginBottom: tokens.space.lg }} padding={tokens.space.lg}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.md }}>
          {summaryRows.map(row => (
            <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: tokens.space.md }}>
              <Icon icon={row.icon} width={18} color={tokens.color.greenAccent} />
              <span style={{ fontSize: tokens.font.sm, color: tokens.color.textSecondary, flex: 1 }}>{row.label}</span>
              <span style={{ fontSize: tokens.font.sm, fontWeight: tokens.font.semibold, color: tokens.color.textPrimary }}>{row.value}</span>
            </div>
          ))}
        </div>
      </Card>

      <div style={{
        display: 'flex', gap: tokens.space.sm, alignItems: 'flex-start',
        padding: tokens.space.md,
        background: 'rgba(61,155,107,0.06)',
        borderRadius: tokens.radius.md,
        marginBottom: tokens.space['2xl'],
      }}>
        <Icon icon="ph:lock-simple" width={16} color={tokens.color.statusMaintain} style={{ marginTop: '2px', flexShrink: 0 }} />
        <span style={{ fontSize: tokens.font.sm, color: tokens.color.textSecondary, lineHeight: '1.5' }}>
          {S.onboardingPrivacyNote}
        </span>
      </div>

      <button
        onClick={onComplete}
        style={{
          width: '100%', padding: `${tokens.space.md} ${tokens.space.xl}`,
          background: tokens.color.brandGradient,
          border: 'none', borderRadius: tokens.radius.full,
          color: '#fff', fontSize: tokens.font.md, fontWeight: tokens.font.semibold,
          cursor: 'pointer', fontFamily: tokens.font.family,
          boxShadow: tokens.color.brandShadow,
        }}
      >
        {S.onboardingComplete}
      </button>
    </div>
  );
}
