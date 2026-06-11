import { useState } from 'react';
import { Icon } from '@iconify/react';
import { tokens } from '../../tokens';
import { S } from '../../strings';
import type { CoachAthleteView, DifferentDecision, DifferentDecisionReason } from '../../types';
import PageWrapper from '../../components/shared/PageWrapper';
import BackButton from '../../components/shared/BackButton';
import Card from '../../components/shared/Card';
import { DirectionBadge } from '../../components/shared/Badge';

interface Props {
  athlete: CoachAthleteView;
  onSubmit: (decision: DifferentDecision) => void;
  onBack: () => void;
}

const REASONS: DifferentDecisionReason[] = [
  'Tactical preparation',
  'Match preparation',
  'Athlete historically responds well',
  'Limited squad availability',
  'Coaching judgement',
  'Return-to-play progression',
  'Other',
];

export default function DifferentDecisionFlow({ athlete, onSubmit, onBack }: Props) {
  const [selectedReason, setSelectedReason] = useState<DifferentDecisionReason | null>(null);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [confirmHovered, setConfirmHovered] = useState(false);

  const handleSubmit = () => {
    if (!selectedReason || !athlete.direction) return;
    const decision: DifferentDecision = {
      id: crypto.randomUUID(),
      athleteId: athlete.athleteId,
      date: new Date().toISOString().split('T')[0],
      reason: selectedReason,
      notes: notes.trim() || undefined,
      originalDirection: athlete.direction,
    };
    onSubmit(decision);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <PageWrapper maxWidth="460px">
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', minHeight: '60vh', textAlign: 'center',
          gap: tokens.space['2xl'],
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'rgba(181,134,10,0.10)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon icon="ph:note-pencil" width={36} color="#96680A" />
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: tokens.font.bold, color: tokens.color.textPrimary, marginBottom: tokens.space.sm }}>
              {S.differentDecisionSuccessHeading}
            </div>
            <div style={{ fontSize: tokens.font.md, color: tokens.color.textSecondary, lineHeight: '1.6', maxWidth: '320px' }}>
              {S.differentDecisionSuccessBody}
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
              display: 'flex', alignItems: 'center', gap: tokens.space.sm,
            }}
          >
            {S.differentDecisionReturnButton(athlete.name)}
          </button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper maxWidth="460px">
      <div style={{ marginBottom: tokens.space.lg }}>
        <BackButton onClick={onBack} label={athlete.name} />
      </div>

      <div style={{ marginBottom: tokens.space['2xl'] }}>
        <div style={{ fontSize: '22px', fontWeight: tokens.font.bold, color: tokens.color.textPrimary, marginBottom: tokens.space.sm }}>
          {S.differentDecisionHeading}
        </div>
        {athlete.direction && (
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.sm, flexWrap: 'wrap' }}>
            <span style={{ fontSize: tokens.font.sm, color: tokens.color.textSecondary }}>Today's context suggested:</span>
            <DirectionBadge direction={athlete.direction} size="sm" />
          </div>
        )}
      </div>

      {/* Reason selection */}
      <Card style={{ marginBottom: tokens.space.lg }} padding={tokens.space.lg}>
        <div style={{ fontSize: tokens.font.sm, fontWeight: tokens.font.semibold, color: tokens.color.textPrimary, marginBottom: tokens.space.md }}>
          {S.differentDecisionReasonLabel}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: tokens.space.sm }}>
          {REASONS.map(reason => {
            const isSelected = selectedReason === reason;
            return (
              <button
                key={reason}
                onClick={() => setSelectedReason(reason)}
                style={{
                  padding: '7px 14px',
                  borderRadius: tokens.radius.full,
                  border: `1.5px solid ${isSelected ? '#96680A' : 'rgba(0,0,0,0.08)'}`,
                  background: isSelected ? 'rgba(181,134,10,0.09)' : 'rgba(255,255,255,0.70)',
                  color: isSelected ? '#96680A' : tokens.color.textSecondary,
                  fontSize: tokens.font.sm,
                  fontWeight: isSelected ? tokens.font.semibold : tokens.font.regular,
                  cursor: 'pointer', fontFamily: tokens.font.family,
                  transition: 'all 0.18s',
                  display: 'flex', alignItems: 'center', gap: '5px',
                }}
              >
                {isSelected && <Icon icon="ph:check" width={12} />}
                {reason}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Notes */}
      <Card style={{ marginBottom: tokens.space['2xl'] }} padding={tokens.space.lg}>
        <div style={{ fontSize: tokens.font.sm, fontWeight: tokens.font.semibold, color: tokens.color.textPrimary, marginBottom: tokens.space.sm }}>
          {S.differentDecisionNotesLabel}
        </div>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder={S.differentDecisionNotesPlaceholder}
          rows={3}
          style={{
            width: '100%',
            padding: tokens.space.md,
            background: 'rgba(0,0,0,0.02)',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: tokens.radius.md,
            fontSize: tokens.font.md,
            color: tokens.color.textPrimary,
            fontFamily: tokens.font.family,
            lineHeight: '1.5',
            outline: 'none',
            boxSizing: 'border-box',
          }}
          onFocus={e => (e.currentTarget.style.border = '1px solid rgba(181,134,10,0.35)')}
          onBlur={e => (e.currentTarget.style.border = '1px solid rgba(0,0,0,0.08)')}
        />
      </Card>

      <button
        onClick={handleSubmit}
        disabled={!selectedReason}
        onMouseEnter={() => selectedReason && setConfirmHovered(true)}
        onMouseLeave={() => setConfirmHovered(false)}
        style={{
          width: '100%', padding: `${tokens.space.md} ${tokens.space.xl}`,
          background: selectedReason
            ? confirmHovered ? 'rgba(181,134,10,0.16)' : 'rgba(181,134,10,0.10)'
            : 'rgba(0,0,0,0.06)',
          border: selectedReason ? '1px solid rgba(181,134,10,0.22)' : '1px solid transparent',
          borderRadius: tokens.radius.full,
          color: selectedReason ? '#96680A' : tokens.color.textMuted,
          fontSize: tokens.font.md, fontWeight: tokens.font.semibold,
          cursor: selectedReason ? 'pointer' : 'not-allowed',
          fontFamily: tokens.font.family,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: tokens.space.sm,
          transition: 'background 0.18s',
          outline: 'none',
        }}
      >
        <Icon icon="ph:check" width={16} />
        {S.differentDecisionConfirm}
      </button>
    </PageWrapper>
  );
}
