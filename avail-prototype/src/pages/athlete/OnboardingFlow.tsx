import { useState } from 'react';
import { Icon } from '@iconify/react';
import { tokens } from '../../tokens';
import { S } from '../../strings';
import PageWrapper from '../../components/shared/PageWrapper';
import ProgressBar from '../../components/shared/ProgressBar';
import type { OnboardingData } from '../../components/athlete/onboarding/OnboardingTypes';
import OnboardingWelcome from '../../components/athlete/onboarding/OnboardingWelcome';
import OnboardingCycle from '../../components/athlete/onboarding/OnboardingCycle';
import OnboardingTraining from '../../components/athlete/onboarding/OnboardingTraining';
import OnboardingSleep from '../../components/athlete/onboarding/OnboardingSleep';
import OnboardingConfirm from '../../components/athlete/onboarding/OnboardingConfirm';

interface Props {
  athleteName: string;
  onComplete: () => void;
  onBack: () => void;
}

const TOTAL_STEPS = 5;

export default function OnboardingFlow({ athleteName, onComplete, onBack }: Props) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({});

  const firstName = athleteName.split(' ')[0];
  const next = () => setStep(s => s + 1);
  const back = () => {
    if (step === 0) onBack();
    else setStep(s => s - 1);
  };
  const update = (partial: Partial<OnboardingData>) =>
    setData(d => ({ ...d, ...partial }));

  return (
    <PageWrapper maxWidth="460px">
      {/* Header */}
      <div style={{ marginBottom: tokens.space['2xl'] }}>
        <button
          onClick={back}
          style={{
            background: 'none', border: 'none', display: 'flex', alignItems: 'center',
            gap: '6px', color: tokens.color.textSecondary, fontSize: tokens.font.sm,
            cursor: 'pointer', padding: '0 0 16px', fontFamily: tokens.font.family, outline: 'none',
          }}
          onFocus={e => { e.currentTarget.style.opacity = '0.7'; }}
          onBlur={e => { e.currentTarget.style.opacity = '1'; }}
        >
          <Icon icon="ph:arrow-left" width={16} />
          {step === 0 ? 'Back' : S.onboardingBack}
        </button>
        <ProgressBar steps={TOTAL_STEPS} current={step} />
        <div style={{ marginTop: tokens.space.xs, fontSize: tokens.font.xs, color: tokens.color.textMuted }}>
          {S.onboardingProgress(step + 1, TOTAL_STEPS)}
        </div>
      </div>

      {step === 0 && <OnboardingWelcome firstName={firstName} onNext={next} />}
      {step === 1 && <OnboardingCycle data={data} onChange={update} onNext={next} />}
      {step === 2 && <OnboardingTraining data={data} onChange={update} onNext={next} />}
      {step === 3 && <OnboardingSleep data={data} onChange={update} onNext={next} />}
      {step === 4 && <OnboardingConfirm data={data} onComplete={onComplete} />}
    </PageWrapper>
  );
}
