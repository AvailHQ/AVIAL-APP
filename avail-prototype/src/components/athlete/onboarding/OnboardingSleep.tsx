import { tokens } from '../../../tokens';
import { S } from '../../../strings';
import type { SleepConsistency, OnboardingData } from './OnboardingTypes';
import ChoiceCard from './ChoiceCard';

interface Props {
  data: OnboardingData;
  onChange: (update: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const SLEEP_HOURS: { label: string; value: number }[] = [
  { label: S.onboardingSleepHoursOptions[0], value: 1 },
  { label: S.onboardingSleepHoursOptions[1], value: 2 },
  { label: S.onboardingSleepHoursOptions[2], value: 3 },
  { label: S.onboardingSleepHoursOptions[3], value: 4 },
];

const CONSISTENCY_OPTIONS: SleepConsistency[] = ['Pretty consistent', 'Varies a lot', 'Hard to say'];

export default function OnboardingSleep({ data, onChange, onNext }: Props) {
  const canContinue = data.sleepQuality !== undefined && data.sleepConsistency !== undefined;

  return (
    <div>
      <div style={{ fontSize: '22px', fontWeight: tokens.font.bold, color: tokens.color.textPrimary, marginBottom: tokens.space.sm }}>
        {S.onboardingSleepHeading}
      </div>
      <div style={{ fontSize: tokens.font.md, color: tokens.color.textSecondary, marginBottom: tokens.space['2xl'], lineHeight: '1.5' }}>
        {S.onboardingSleepBody}
      </div>

      <div style={{ marginBottom: tokens.space.lg }}>
        <div style={{ fontSize: tokens.font.sm, color: tokens.color.textMuted, marginBottom: tokens.space.md, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
          {S.onboardingSleepHoursLabel}
        </div>
        <div style={{ display: 'flex', gap: tokens.space.sm, flexWrap: 'wrap' }}>
          {SLEEP_HOURS.map(h => (
            <button
              key={h.value}
              onClick={() => onChange({ sleepQuality: h.value })}
              style={{
                padding: '6px 14px', borderRadius: tokens.radius.full,
                border: `1.5px solid ${data.sleepQuality === h.value ? '#3D9B6B' : 'rgba(0,0,0,0.08)'}`,
                background: data.sleepQuality === h.value ? 'rgba(61,155,107,0.07)' : 'rgba(255,255,255,0.70)',
                cursor: 'pointer', fontSize: tokens.font.sm, fontWeight: tokens.font.medium,
                color: data.sleepQuality === h.value ? '#2D7A52' : tokens.color.textPrimary,
                transition: 'all 0.18s',
                fontFamily: tokens.font.family,
                outline: 'none',
              }}
              onFocus={e => { e.currentTarget.style.boxShadow = '0 0 0 2px rgba(61,155,107,0.4)'; }}
              onBlur={e => { e.currentTarget.style.boxShadow = 'none'; }}
            >
              {h.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ fontSize: tokens.font.sm, color: tokens.color.textMuted, marginBottom: tokens.space.md, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
        {S.onboardingSleepConsistencyLabel}
      </div>
      {CONSISTENCY_OPTIONS.map(opt => (
        <ChoiceCard
          key={opt}
          label={opt}
          selected={data.sleepConsistency === opt}
          onSelect={() => onChange({ sleepConsistency: opt })}
        />
      ))}

      <button
        onClick={onNext}
        disabled={!canContinue}
        style={{
          width: '100%', marginTop: tokens.space.lg,
          padding: `${tokens.space.md} ${tokens.space.xl}`,
          background: canContinue ? 'linear-gradient(135deg, #3D9B6B 0%, #4FA3C7 100%)' : 'rgba(0,0,0,0.08)',
          border: 'none', borderRadius: tokens.radius.full,
          color: canContinue ? '#fff' : tokens.color.textMuted,
          fontSize: tokens.font.md, fontWeight: tokens.font.semibold,
          cursor: canContinue ? 'pointer' : 'not-allowed',
          fontFamily: tokens.font.family,
        }}
      >
        {S.onboardingNext}
      </button>
    </div>
  );
}
