import { useState } from 'react';
import { Icon } from '@iconify/react';
import { tokens } from '../../tokens';
import { S } from '../../strings';
import type { LoadScore, SessionOutcome } from '../../types';
import PageWrapper from '../../components/shared/PageWrapper';
import Card from '../../components/shared/Card';
import BackButton from '../../components/shared/BackButton';
import { DirectionBadge } from '../../components/shared/Badge';

interface Props {
  athleteName: string;
  loadScore: LoadScore;
  onSubmit: (outcome: SessionOutcome) => void;
  onBack: () => void;
}

type OutcomeValue = 'Easier' | 'AsExpected' | 'Harder';

const outcomeConfig: { value: OutcomeValue; label: string; icon: string; color: string; bg: string }[] = [
  { value: 'Easier', label: S.sessionEasier, icon: 'ph:arrow-down-left', color: '#2060A0', bg: 'rgba(45,123,184,0.08)' },
  { value: 'AsExpected', label: S.sessionAsExpected, icon: 'ph:equals', color: '#2D7A52', bg: 'rgba(61,155,107,0.08)' },
  { value: 'Harder', label: S.sessionHarder, icon: 'ph:arrow-up-right', color: '#B07A10', bg: 'rgba(181,134,10,0.10)' },
];

export default function SessionOutcomeCapture({ athleteName, loadScore, onSubmit, onBack }: Props) {
  const [selected, setSelected] = useState<OutcomeValue | null>(null);
  const [reflections, setReflections] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleReflection = (tag: string) => {
    setReflections(r => r.includes(tag) ? r.filter(t => t !== tag) : [...r, tag]);
  };

  const handleSubmit = () => {
    if (!selected) return;
    onSubmit({
      sessionId: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
      outcome: selected,
      reflections,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <PageWrapper maxWidth="460px">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', gap: tokens.space['2xl'] }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'rgba(61,155,107,0.10)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon icon="ph:check-circle" width={36} color={tokens.color.statusMaintain} />
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: tokens.font.bold, color: tokens.color.textPrimary, marginBottom: tokens.space.sm }}>
              {S.sessionReflectionSaved}
            </div>
            <div style={{ fontSize: tokens.font.md, color: tokens.color.textSecondary, lineHeight: '1.6', maxWidth: '300px' }}>
              {S.sessionConfirmation}
            </div>
          </div>
          <button
            onClick={onBack}
            style={{
              padding: `${tokens.space.md} ${tokens.space['2xl']}`,
              background: 'rgba(255,255,255,0.80)',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: tokens.radius.full,
              color: tokens.color.textPrimary, fontSize: tokens.font.md, fontWeight: tokens.font.semibold,
              cursor: 'pointer', fontFamily: tokens.font.family,
            }}
          >
            {S.sessionDone}
          </button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper maxWidth="460px">
      <div style={{ marginBottom: tokens.space.lg }}>
        <BackButton onClick={onBack} />
      </div>

      <div style={{ marginBottom: tokens.space['2xl'] }}>
        <div style={{ fontSize: '22px', fontWeight: tokens.font.bold, color: tokens.color.textPrimary, marginBottom: tokens.space.sm }}>
          {S.sessionHeading}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.sm, flexWrap: 'wrap' }}>
          <span style={{ fontSize: tokens.font.sm, color: tokens.color.textSecondary }}>{S.todaysContextSuggested}</span>
          <DirectionBadge direction={loadScore.direction} size="sm" />
        </div>
      </div>

      {/* Outcome selection */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.sm, marginBottom: tokens.space.xl }}>
        {outcomeConfig.map(opt => (
          <Card
            key={opt.value}
            onClick={() => setSelected(opt.value)}
            padding={tokens.space.lg}
            style={{
              border: selected === opt.value ? `1.5px solid ${opt.color}` : '1px solid rgba(255,255,255,0.4)',
              background: selected === opt.value ? opt.bg : tokens.card.background,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.md }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: selected === opt.value ? opt.bg : 'rgba(0,0,0,0.04)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon icon={opt.icon} width={20} color={selected === opt.value ? opt.color : tokens.color.textMuted} />
              </div>
              <span style={{
                fontSize: tokens.font.md,
                fontWeight: selected === opt.value ? tokens.font.semibold : tokens.font.regular,
                color: selected === opt.value ? opt.color : tokens.color.textPrimary,
              }}>
                {opt.label}
              </span>
              {selected === opt.value && <Icon icon="ph:check-circle-fill" width={18} color={opt.color} style={{ marginLeft: 'auto' }} />}
            </div>
          </Card>
        ))}
      </div>

      {/* Reflection tags (only if Harder) */}
      {selected === 'Harder' && (
        <Card style={{ marginBottom: tokens.space.xl }} padding={tokens.space.lg}>
          <div style={{ fontSize: tokens.font.sm, fontWeight: tokens.font.medium, color: tokens.color.textSecondary, marginBottom: tokens.space.md }}>
            {S.sessionReflectionHeading}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: tokens.space.sm }}>
            {S.sessionReflections.map(tag => (
              <button
                key={tag}
                onClick={() => toggleReflection(tag)}
                style={{
                  padding: '6px 14px',
                  borderRadius: tokens.radius.full,
                  border: `1.5px solid ${reflections.includes(tag) ? '#B07A10' : 'rgba(0,0,0,0.08)'}`,
                  background: reflections.includes(tag) ? 'rgba(181,134,10,0.08)' : 'rgba(255,255,255,0.70)',
                  color: reflections.includes(tag) ? '#96680A' : tokens.color.textSecondary,
                  fontSize: tokens.font.sm,
                  fontWeight: reflections.includes(tag) ? tokens.font.semibold : tokens.font.regular,
                  cursor: 'pointer', fontFamily: tokens.font.family,
                  transition: 'all 0.18s',
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </Card>
      )}

      <button
        onClick={handleSubmit}
        disabled={!selected}
        style={{
          width: '100%', padding: `${tokens.space.md} ${tokens.space.xl}`,
          background: selected ? 'linear-gradient(135deg, #3D9B6B 0%, #4FA3C7 100%)' : 'rgba(0,0,0,0.08)',
          border: 'none', borderRadius: tokens.radius.full,
          color: selected ? '#fff' : tokens.color.textMuted,
          fontSize: tokens.font.md, fontWeight: tokens.font.semibold,
          cursor: selected ? 'pointer' : 'not-allowed',
          fontFamily: tokens.font.family,
          boxShadow: selected ? '0 2px 12px rgba(61,155,107,0.22)' : 'none',
        }}
      >
        {S.sessionSubmit}
      </button>
    </PageWrapper>
  );
}
