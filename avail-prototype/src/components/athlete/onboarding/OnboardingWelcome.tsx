import { Icon } from '@iconify/react';
import { tokens } from '../../../tokens';
import { S } from '../../../strings';

interface Props {
  firstName: string;
  onNext: () => void;
}

export default function OnboardingWelcome({ firstName: _firstName, onNext }: Props) {
  return (
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
        onClick={onNext}
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
  );
}
