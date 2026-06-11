import { tokens } from '../../../tokens';
import { S } from '../../../strings';
import type { TrainingLevel, OnboardingData } from './OnboardingTypes';
import ChoiceCard from './ChoiceCard';

interface Props {
  data: OnboardingData;
  onChange: (update: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const TRAINING_OPTIONS: { value: TrainingLevel; label: string }[] = [
  { value: 'Recreational', label: S.onboardingTrainingRecreational },
  { value: 'Club', label: S.onboardingTrainingClub },
  { value: 'Semi-Pro', label: S.onboardingTrainingSemiPro },
  { value: 'Elite', label: S.onboardingTrainingElite },
];

const PHYSICAL_HISTORY_OPTIONS = [
  { v: false, l: S.onboardingPhysicalHistoryNone },
  { v: true, l: S.onboardingPhysicalHistorySome },
];

export default function OnboardingTraining({ data, onChange, onNext }: Props) {
  const canContinue = data.trainingLevel !== undefined && data.physicalHistory !== undefined;

  return (
    <div>
      <div style={{ fontSize: '22px', fontWeight: tokens.font.bold, color: tokens.color.textPrimary, marginBottom: tokens.space.sm }}>
        {S.onboardingTrainingHeading}
      </div>
      <div style={{ fontSize: tokens.font.sm, color: tokens.color.textMuted, marginBottom: tokens.space.lg, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
        {S.onboardingTrainingLevelLabel}
      </div>
      {TRAINING_OPTIONS.map(opt => (
        <ChoiceCard
          key={opt.value}
          label={opt.label}
          selected={data.trainingLevel === opt.value}
          onSelect={() => onChange({ trainingLevel: opt.value })}
        />
      ))}

      <div style={{ marginTop: tokens.space.xl, fontSize: tokens.font.sm, color: tokens.color.textMuted, marginBottom: tokens.space.md, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
        {S.onboardingPhysicalHistoryLabel}
      </div>
      <div style={{ display: 'flex', gap: tokens.space.sm }}>
        {PHYSICAL_HISTORY_OPTIONS.map(opt => (
          <button
            key={String(opt.v)}
            onClick={() => onChange({ physicalHistory: opt.v })}
            style={{
              flex: 1, padding: `${tokens.space.sm} ${tokens.space.md}`,
              borderRadius: tokens.radius.md,
              border: `1.5px solid ${data.physicalHistory === opt.v ? tokens.color.brandGreen : 'rgba(0,0,0,0.08)'}`,
              background: data.physicalHistory === opt.v ? 'rgba(61,155,107,0.07)' : 'rgba(255,255,255,0.70)',
              cursor: 'pointer', textAlign: 'center',
              fontSize: tokens.font.sm, fontWeight: data.physicalHistory === opt.v ? tokens.font.semibold : tokens.font.regular,
              color: data.physicalHistory === opt.v ? tokens.color.statusMaintain : tokens.color.textPrimary,
              transition: 'all 0.18s',
              fontFamily: tokens.font.family,
              outline: 'none',
            }}
            onFocus={e => { e.currentTarget.style.boxShadow = '0 0 0 2px rgba(61,155,107,0.4)'; }}
            onBlur={e => { e.currentTarget.style.boxShadow = 'none'; }}
          >
            {opt.l}
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!canContinue}
        style={{
          width: '100%', marginTop: tokens.space.xl,
          padding: `${tokens.space.md} ${tokens.space.xl}`,
          background: canContinue ? tokens.color.brandGradient : 'rgba(0,0,0,0.08)',
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
