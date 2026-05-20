import { useState } from 'react';
import { Icon } from '@iconify/react';
import { tokens } from '../../tokens';
import { S } from '../../strings';
import PageWrapper from '../shared/PageWrapper';
import ProgressBar from '../shared/ProgressBar';
import Card from '../shared/Card';

interface Props {
  athleteName: string;
  onComplete: () => void;
  onBack: () => void;
}

const TOTAL_STEPS = 5;

type CycleOption = 'Regular' | 'Irregular' | 'HormonalContraception' | 'PreferNotToSay';
type TrainingLevel = 'Recreational' | 'Club' | 'Semi-Pro' | 'Elite';
type SleepConsistency = 'Pretty consistent' | 'Varies a lot' | 'Hard to say';

interface OnboardingData {
  cycleRegularity?: CycleOption;
  trainingLevel?: TrainingLevel;
  injuryHistory?: boolean;
  sleepQuality?: number;
  sleepConsistency?: SleepConsistency;
}

function ChoiceCard({ label, selected, onSelect, icon }: {
  label: string; selected: boolean; onSelect: () => void; icon?: string;
}) {
  return (
    <div
      onClick={onSelect}
      style={{
        padding: `${tokens.space.md} ${tokens.space.lg}`,
        borderRadius: tokens.radius.lg,
        border: `1.5px solid ${selected ? '#3D9B6B' : 'rgba(0,0,0,0.08)'}`,
        background: selected ? 'rgba(61,155,107,0.07)' : 'rgba(255,255,255,0.70)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: tokens.space.md,
        transition: 'all 0.18s ease',
        marginBottom: tokens.space.sm,
      }}
    >
      {icon && <Icon icon={icon} width={20} height={20} color={selected ? '#3D9B6B' : tokens.color.textSecondary} />}
      <span style={{
        fontSize: tokens.font.md,
        fontWeight: selected ? tokens.font.semibold : tokens.font.regular,
        color: selected ? '#2D7A52' : tokens.color.textPrimary,
      }}>
        {label}
      </span>
      {selected && <Icon icon="ph:check-circle-fill" width={18} color="#3D9B6B" style={{ marginLeft: 'auto' }} />}
    </div>
  );
}

export default function OnboardingFlow({ athleteName, onComplete, onBack }: Props) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({});

  const firstName = athleteName.split(' ')[0];

  const next = () => {
    if (step < TOTAL_STEPS - 1) setStep(s => s + 1);
    else onComplete();
  };
  const back = () => {
    if (step === 0) onBack();
    else setStep(s => s - 1);
  };

  return (
    <PageWrapper maxWidth="460px">
      {/* Header */}
      <div style={{ marginBottom: tokens.space['2xl'] }}>
        <button onClick={back} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '6px', color: tokens.color.textSecondary, fontSize: tokens.font.sm, cursor: 'pointer', padding: '0 0 16px', fontFamily: tokens.font.family }}>
          <Icon icon="ph:arrow-left" width={16} />
          {step === 0 ? 'Back' : S.onboardingBack}
        </button>
        <ProgressBar steps={TOTAL_STEPS} current={step} />
        <div style={{ marginTop: tokens.space.xs, fontSize: tokens.font.xs, color: tokens.color.textMuted }}>
          {S.onboardingProgress(step + 1, TOTAL_STEPS)}
        </div>
      </div>

      {/* Step 0: Welcome */}
      {step === 0 && (
        <div>
          <div style={{ fontSize: '28px', fontWeight: tokens.font.bold, color: tokens.color.textPrimary, marginBottom: tokens.space.md, lineHeight: '1.2' }}>
            {S.onboardingWelcomeHeading}
          </div>
          <div style={{ fontSize: tokens.font.lg, color: tokens.color.textSecondary, lineHeight: '1.6', marginBottom: tokens.space['3xl'] }}>
            {S.onboardingWelcomeBody}
          </div>
          <div style={{ display: 'flex', gap: tokens.space.md, flexWrap: 'wrap', marginBottom: tokens.space['2xl'] }}>
            {[
              { icon: 'ph:chart-line-up', label: 'Physiological context' },
              { icon: 'ph:lock-simple', label: 'Your data stays yours' },
              { icon: 'ph:arrow-circle-right', label: 'Adapts over time' },
            ].map(item => (
              <div key={item.label} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '6px 12px',
                background: 'rgba(255,255,255,0.72)',
                borderRadius: tokens.radius.full,
                border: '1px solid rgba(0,0,0,0.06)',
                fontSize: tokens.font.sm, color: tokens.color.textSecondary,
              }}>
                <Icon icon={item.icon} width={14} color={tokens.color.greenAccent} />
                {item.label}
              </div>
            ))}
          </div>
          <button
            onClick={next}
            style={{
              width: '100%', padding: `${tokens.space.md} ${tokens.space.xl}`,
              background: 'linear-gradient(135deg, #3D9B6B 0%, #4FA3C7 100%)',
              border: 'none', borderRadius: tokens.radius.full,
              color: '#fff', fontSize: tokens.font.md, fontWeight: tokens.font.semibold,
              cursor: 'pointer', fontFamily: tokens.font.family,
              boxShadow: '0 2px 12px rgba(61,155,107,0.22)',
            }}
          >
            {S.onboardingWelcomeCta}
          </button>
        </div>
      )}

      {/* Step 1: Cycle */}
      {step === 1 && (
        <div>
          <div style={{ fontSize: '22px', fontWeight: tokens.font.bold, color: tokens.color.textPrimary, marginBottom: tokens.space.sm }}>
            {S.onboardingCycleHeading}
          </div>
          <div style={{ fontSize: tokens.font.md, color: tokens.color.textSecondary, marginBottom: tokens.space['2xl'], lineHeight: '1.5' }}>
            {S.onboardingCycleBody}
          </div>
          {([
            { value: 'Regular', label: 'Generally regular', icon: 'ph:calendar-check' },
            { value: 'Irregular', label: 'Varies quite a bit', icon: 'ph:calendar-dots' },
            { value: 'HormonalContraception', label: 'I use hormonal contraception', icon: 'ph:first-aid' },
            { value: 'PreferNotToSay', label: 'Prefer not to say', icon: 'ph:eye-slash' },
          ] as { value: CycleOption; label: string; icon: string }[]).map(opt => (
            <ChoiceCard
              key={opt.value}
              label={opt.label}
              icon={opt.icon}
              selected={data.cycleRegularity === opt.value}
              onSelect={() => setData(d => ({ ...d, cycleRegularity: opt.value }))}
            />
          ))}
          <button
            onClick={next}
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
      )}

      {/* Step 2: Training */}
      {step === 2 && (
        <div>
          <div style={{ fontSize: '22px', fontWeight: tokens.font.bold, color: tokens.color.textPrimary, marginBottom: tokens.space.sm }}>
            {S.onboardingTrainingHeading}
          </div>
          <div style={{ fontSize: tokens.font.sm, color: tokens.color.textMuted, marginBottom: tokens.space.lg, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
            Training level
          </div>
          {([
            { value: 'Recreational', label: 'Recreational' },
            { value: 'Club', label: 'Club level' },
            { value: 'Semi-Pro', label: 'Semi-professional' },
            { value: 'Elite', label: 'Professional / Elite' },
          ] as { value: TrainingLevel; label: string }[]).map(opt => (
            <ChoiceCard
              key={opt.value}
              label={opt.label}
              selected={data.trainingLevel === opt.value}
              onSelect={() => setData(d => ({ ...d, trainingLevel: opt.value }))}
            />
          ))}
          <div style={{ marginTop: tokens.space.xl, fontSize: tokens.font.sm, color: tokens.color.textMuted, marginBottom: tokens.space.md, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
            Previous injuries to be aware of?
          </div>
          <div style={{ display: 'flex', gap: tokens.space.sm }}>
            {[{ v: false, l: 'None significant' }, { v: true, l: 'Yes, some history' }].map(opt => (
              <div
                key={String(opt.v)}
                onClick={() => setData(d => ({ ...d, injuryHistory: opt.v }))}
                style={{
                  flex: 1, padding: `${tokens.space.sm} ${tokens.space.md}`,
                  borderRadius: tokens.radius.md,
                  border: `1.5px solid ${data.injuryHistory === opt.v ? '#3D9B6B' : 'rgba(0,0,0,0.08)'}`,
                  background: data.injuryHistory === opt.v ? 'rgba(61,155,107,0.07)' : 'rgba(255,255,255,0.70)',
                  cursor: 'pointer', textAlign: 'center',
                  fontSize: tokens.font.sm, fontWeight: data.injuryHistory === opt.v ? tokens.font.semibold : tokens.font.regular,
                  color: data.injuryHistory === opt.v ? '#2D7A52' : tokens.color.textPrimary,
                  transition: 'all 0.18s',
                }}
              >
                {opt.l}
              </div>
            ))}
          </div>
          <button
            onClick={next}
            disabled={!data.trainingLevel || data.injuryHistory === undefined}
            style={{
              width: '100%', marginTop: tokens.space.xl,
              padding: `${tokens.space.md} ${tokens.space.xl}`,
              background: (data.trainingLevel && data.injuryHistory !== undefined) ? 'linear-gradient(135deg, #3D9B6B 0%, #4FA3C7 100%)' : 'rgba(0,0,0,0.08)',
              border: 'none', borderRadius: tokens.radius.full,
              color: (data.trainingLevel && data.injuryHistory !== undefined) ? '#fff' : tokens.color.textMuted,
              fontSize: tokens.font.md, fontWeight: tokens.font.semibold,
              cursor: (data.trainingLevel && data.injuryHistory !== undefined) ? 'pointer' : 'not-allowed',
              fontFamily: tokens.font.family,
            }}
          >
            {S.onboardingNext}
          </button>
        </div>
      )}

      {/* Step 3: Sleep */}
      {step === 3 && (
        <div>
          <div style={{ fontSize: '22px', fontWeight: tokens.font.bold, color: tokens.color.textPrimary, marginBottom: tokens.space.sm }}>
            {S.onboardingSleepHeading}
          </div>
          <div style={{ fontSize: tokens.font.md, color: tokens.color.textSecondary, marginBottom: tokens.space['2xl'], lineHeight: '1.5' }}>
            {S.onboardingSleepBody}
          </div>
          <div style={{ marginBottom: tokens.space.lg }}>
            <div style={{ fontSize: tokens.font.sm, color: tokens.color.textMuted, marginBottom: tokens.space.md, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              Average hours per night
            </div>
            <div style={{ display: 'flex', gap: tokens.space.sm, flexWrap: 'wrap' }}>
              {['Less than 6', '6–7 hours', '7–8 hours', '8+ hours'].map(h => (
                <div
                  key={h}
                  onClick={() => setData(d => ({ ...d, sleepQuality: ['Less than 6', '6–7 hours', '7–8 hours', '8+ hours'].indexOf(h) + 1 }))}
                  style={{
                    padding: '6px 14px', borderRadius: tokens.radius.full,
                    border: `1.5px solid ${data.sleepQuality === (['Less than 6', '6–7 hours', '7–8 hours', '8+ hours'].indexOf(h) + 1) ? '#3D9B6B' : 'rgba(0,0,0,0.08)'}`,
                    background: data.sleepQuality === (['Less than 6', '6–7 hours', '7–8 hours', '8+ hours'].indexOf(h) + 1) ? 'rgba(61,155,107,0.07)' : 'rgba(255,255,255,0.70)',
                    cursor: 'pointer', fontSize: tokens.font.sm, fontWeight: tokens.font.medium,
                    color: data.sleepQuality === (['Less than 6', '6–7 hours', '7–8 hours', '8+ hours'].indexOf(h) + 1) ? '#2D7A52' : tokens.color.textPrimary,
                    transition: 'all 0.18s',
                  }}
                >
                  {h}
                </div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: tokens.font.sm, color: tokens.color.textMuted, marginBottom: tokens.space.md, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
            How consistent is it?
          </div>
          {(['Pretty consistent', 'Varies a lot', 'Hard to say'] as SleepConsistency[]).map(opt => (
            <ChoiceCard
              key={opt}
              label={opt}
              selected={data.sleepConsistency === opt}
              onSelect={() => setData(d => ({ ...d, sleepConsistency: opt }))}
            />
          ))}
          <button
            onClick={next}
            disabled={!data.sleepQuality || !data.sleepConsistency}
            style={{
              width: '100%', marginTop: tokens.space.lg,
              padding: `${tokens.space.md} ${tokens.space.xl}`,
              background: (data.sleepQuality && data.sleepConsistency) ? 'linear-gradient(135deg, #3D9B6B 0%, #4FA3C7 100%)' : 'rgba(0,0,0,0.08)',
              border: 'none', borderRadius: tokens.radius.full,
              color: (data.sleepQuality && data.sleepConsistency) ? '#fff' : tokens.color.textMuted,
              fontSize: tokens.font.md, fontWeight: tokens.font.semibold,
              cursor: (data.sleepQuality && data.sleepConsistency) ? 'pointer' : 'not-allowed',
              fontFamily: tokens.font.family,
            }}
          >
            {S.onboardingNext}
          </button>
        </div>
      )}

      {/* Step 4: Confirm */}
      {step === 4 && (
        <div>
          <div style={{ fontSize: '22px', fontWeight: tokens.font.bold, color: tokens.color.textPrimary, marginBottom: tokens.space.sm }}>
            {S.onboardingConfirmHeading}
          </div>
          <div style={{ fontSize: tokens.font.md, color: tokens.color.textSecondary, marginBottom: tokens.space['2xl'], lineHeight: '1.5' }}>
            {S.onboardingConfirmBody}
          </div>

          <Card style={{ marginBottom: tokens.space.lg }} padding={tokens.space.lg}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.md }}>
              {[
                { icon: 'ph:calendar', label: 'Cycle context', value: data.cycleRegularity === 'HormonalContraception' ? 'Hormonal contraception' : data.cycleRegularity === 'PreferNotToSay' ? 'Not shared' : data.cycleRegularity ?? '—' },
                { icon: 'ph:barbell', label: 'Training level', value: data.trainingLevel ?? '—' },
                { icon: 'ph:moon', label: 'Sleep pattern', value: data.sleepConsistency ?? '—' },
              ].map(row => (
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
              background: 'linear-gradient(135deg, #3D9B6B 0%, #4FA3C7 100%)',
              border: 'none', borderRadius: tokens.radius.full,
              color: '#fff', fontSize: tokens.font.md, fontWeight: tokens.font.semibold,
              cursor: 'pointer', fontFamily: tokens.font.family,
              boxShadow: '0 2px 12px rgba(61,155,107,0.22)',
            }}
          >
            {S.onboardingComplete}
          </button>
        </div>
      )}
    </PageWrapper>
  );
}
