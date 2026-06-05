import { tokens } from '../../../tokens';
import { S } from '../../../strings';
import type { CycleOption, OnboardingData } from './OnboardingTypes';
import ChoiceCard from './ChoiceCard';

interface Props {
  data: OnboardingData;
  onChange: (update: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const CYCLE_OPTIONS: { value: CycleOption; label: string; icon: string }[] = [
  { value: 'Regular', label: 'Generally regular', icon: 'ph:calendar-check' },
  { value: 'Irregular', label: 'Varies quite a bit', icon: 'ph:calendar-dots' },
  { value: 'HormonalContraception', label: 'I use hormonal contraception', icon: 'ph:first-aid' },
  { value: 'PreferNotToSay', label: S.onboardingSkip, icon: 'ph:eye-slash' },
];

export default function OnboardingCycle({ data, onChange, onNext }: Props) {
  return (
    <div>
      <div style={{ fontSize: '22px', fontWeight: tokens.font.bold, color: tokens.color.textPrimary, marginBottom: tokens.space.sm }}>
        {S.onboardingCycleHeading}
      </div>
      <div style={{ fontSize: tokens.font.md, color: tokens.color.textSecondary, marginBottom: tokens.space['2xl'], lineHeight: '1.5' }}>
        {S.onboardingCycleBody}
      </div>
      {CYCLE_OPTIONS.map(opt => (
        <ChoiceCard
          key={opt.value}
          label={opt.label}
          icon={opt.icon}
          selected={data.cycleRegularity === opt.value}
          onSelect={() => onChange({ cycleRegularity: opt.value })}
        />
      ))}
      <button
        onClick={onNext}
        disabled={!data.cycleRegularity}
        style={{
          width: '100%', marginTop: tokens.space.lg,
          padding: `${tokens.space.md} ${tokens.space.xl}`,
          background: data.cycleRegularity ? 'linear-gradient(135deg, #3D9B6B 0%, #4FA3C7 100%)' : 'rgba(0,0,0,0.08)',
          border: 'none', borderRadius: tokens.radius.full,
          color: data.cycleRegularity ? '#fff' : tokens.color.textMuted,
          fontSize: tokens.font.md, fontWeight: tokens.font.semibold,
          cursor: data.cycleRegularity ? 'pointer' : 'not-allowed', fontFamily: tokens.font.family,
        }}
      >
        {S.onboardingNext}
      </button>
    </div>
  );
}
