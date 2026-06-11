import { useState } from 'react';
import { Icon } from '@iconify/react';
import { tokens } from '../../tokens';
import { S } from '../../strings';
import type { DailyCheckIn as DailyCheckInType, CycleUpdate } from '../../types';
import PageWrapper from '../../components/shared/PageWrapper';
import Card from '../../components/shared/Card';
import BackButton from '../../components/shared/BackButton';
import Slider from '../../components/shared/Slider';

interface Props {
  athleteName: string;
  onSubmit: (data: DailyCheckInType) => void;
  onBack: () => void;
}

export default function DailyCheckIn({ athleteName, onSubmit, onBack }: Props) {
  const [sleepQuality, setSleepQuality] = useState(3);
  const [fatigue, setFatigue] = useState(3);
  const [soreness, setSoreness] = useState(3);
  const [mentalReadiness, setMentalReadiness] = useState(3);
  const [cycleUpdate, setCycleUpdate] = useState<CycleUpdate>('NothingToReport');

  const handleSubmit = () => {
    onSubmit({
      date: new Date().toISOString().split('T')[0],
      sleepQuality,
      fatigue,
      soreness,
      mentalReadiness,
      cycleUpdate,
    });
  };

  const cycleOptions: { value: CycleUpdate; label: string }[] = [
    { value: 'NothingToReport', label: S.checkInCycleNothing },
    { value: 'PeriodStarted', label: S.checkInCyclePeriodStarted },
    { value: 'PeriodEnded', label: S.checkInCyclePeriodEnded },
  ];

  return (
    <PageWrapper maxWidth="460px">
      <div style={{ marginBottom: tokens.space.lg }}>
        <BackButton onClick={onBack} />
      </div>

      <div style={{ marginBottom: tokens.space['2xl'] }}>
        <div style={{ fontSize: '22px', fontWeight: tokens.font.bold, color: tokens.color.textPrimary, marginBottom: '4px' }}>
          {S.checkInHeading}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: tokens.color.textSecondary, fontSize: tokens.font.sm }}>
          <Icon icon="ph:timer" width={14} />
          {S.checkInSubheading}
        </div>
      </div>

      <Card style={{ marginBottom: tokens.space.lg }}>
        <Slider
          label={S.checkInSleepLabel}
          value={sleepQuality}
          onChange={setSleepQuality}
          lowLabel="Difficult"
          highLabel="Restful"
          icon={<Icon icon="ph:moon" width={16} />}
        />
        <Slider
          label={S.checkInFatigueLabel}
          value={fatigue}
          onChange={setFatigue}
          lowLabel="Very tired"
          highLabel="Full of energy"
          icon={<Icon icon="ph:lightning" width={16} />}
        />
        <Slider
          label={S.checkInSorenessLabel}
          value={soreness}
          onChange={setSoreness}
          lowLabel="Very sore"
          highLabel="Feeling good"
          icon={<Icon icon="ph:heartbeat" width={16} />}
        />
        <Slider
          label={S.checkInMentalLabel}
          value={mentalReadiness}
          onChange={setMentalReadiness}
          lowLabel="Low"
          highLabel="High"
          icon={<Icon icon="ph:brain" width={16} />}
        />
      </Card>

      {/* Cycle update */}
      <Card style={{ marginBottom: tokens.space['2xl'] }} padding={tokens.space.lg}>
        <div style={{ fontSize: tokens.font.sm, fontWeight: tokens.font.medium, color: tokens.color.textSecondary, marginBottom: tokens.space.md }}>
          {S.checkInCycleLabel}
        </div>
        <div style={{ display: 'flex', gap: tokens.space.sm, flexWrap: 'wrap' }}>
          {cycleOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setCycleUpdate(opt.value)}
              style={{
                padding: `${tokens.space.sm} ${tokens.space.md}`,
                borderRadius: tokens.radius.full,
                border: `1.5px solid ${cycleUpdate === opt.value ? '#3D9B6B' : 'rgba(0,0,0,0.08)'}`,
                background: cycleUpdate === opt.value ? 'rgba(61,155,107,0.08)' : 'rgba(255,255,255,0.70)',
                color: cycleUpdate === opt.value ? '#2D7A52' : tokens.color.textSecondary,
                fontSize: tokens.font.sm,
                fontWeight: cycleUpdate === opt.value ? tokens.font.semibold : tokens.font.regular,
                cursor: 'pointer',
                fontFamily: tokens.font.family,
                transition: 'all 0.18s',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Card>

      <button
        onClick={handleSubmit}
        style={{
          width: '100%', padding: `${tokens.space.md} ${tokens.space.xl}`,
          background: 'linear-gradient(135deg, #3D9B6B 0%, #4FA3C7 100%)',
          border: 'none', borderRadius: tokens.radius.full,
          color: '#fff', fontSize: tokens.font.md, fontWeight: tokens.font.semibold,
          cursor: 'pointer', fontFamily: tokens.font.family,
          boxShadow: '0 2px 12px rgba(61,155,107,0.22)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: tokens.space.sm,
        }}
      >
        <Icon icon="ph:check" width={16} />
        {S.checkInSubmit}
      </button>
    </PageWrapper>
  );
}
