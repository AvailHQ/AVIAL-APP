import { useState } from 'react';
import { Icon } from '@iconify/react';
import { tokens } from '../../tokens';
import { S } from '../../strings';
import type { ConsentState } from '../../types';
import PageWrapper from '../shared/PageWrapper';
import Card from '../shared/Card';
import BackButton from '../shared/BackButton';
import ToggleSwitch from '../shared/ToggleSwitch';

interface Props {
  athleteName: string;
  consentState: ConsentState;
  onUpdate: (newConsent: ConsentState) => void;
  onBack: () => void;
}

export default function ConsentSettings({ athleteName, consentState, onUpdate, onBack }: Props) {
  const [sharing, setSharing] = useState(consentState.sharingWithCoach);
  const [saved, setSaved] = useState(false);

  const handleToggle = (value: boolean) => {
    setSharing(value);
    setSaved(true);
    onUpdate({
      ...consentState,
      sharingWithCoach: value,
      lastUpdated: new Date().toISOString().split('T')[0],
    });
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <PageWrapper maxWidth="460px">
      <div style={{ marginBottom: tokens.space.lg }}>
        <BackButton onClick={onBack} />
      </div>

      <div style={{ marginBottom: tokens.space['2xl'] }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.sm, marginBottom: tokens.space.xs }}>
          <Icon icon="ph:shield-check" width={22} color={tokens.color.statusMaintain} />
          <div style={{ fontSize: '22px', fontWeight: tokens.font.bold, color: tokens.color.textPrimary }}>
            {S.consentHeading}
          </div>
        </div>
        <div style={{ fontSize: tokens.font.md, color: tokens.color.textSecondary, lineHeight: '1.5' }}>
          You decide what's shared with your coaching staff.
        </div>
      </div>

      {/* Main toggle */}
      <Card style={{ marginBottom: tokens.space.lg }}>
        <ToggleSwitch
          on={sharing}
          onChange={handleToggle}
          label={S.consentToggleLabel}
          description={sharing ? S.consentOnDescription : S.consentOffDescription}
        />

        {saved && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            marginTop: tokens.space.md,
            padding: `${tokens.space.xs} ${tokens.space.sm}`,
            background: 'rgba(61,155,107,0.08)',
            borderRadius: tokens.radius.sm,
          }}>
            <Icon icon="ph:check" width={14} color={tokens.color.statusMaintain} />
            <span style={{ fontSize: tokens.font.sm, color: tokens.color.statusMaintain, fontWeight: tokens.font.medium }}>
              {S.consentSaved}
            </span>
          </div>
        )}
      </Card>

      {/* What coaches can see */}
      <Card style={{ marginBottom: tokens.space.lg }} padding={tokens.space.lg}>
        <div style={{ fontSize: tokens.font.sm, fontWeight: tokens.font.semibold, color: tokens.color.textPrimary, marginBottom: tokens.space.md }}>
          What your coach can see
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.sm }}>
          {[
            { label: 'Load Score', icon: 'ph:gauge', visible: sharing },
            { label: 'Load direction', icon: 'ph:arrow-right', visible: sharing },
            { label: 'Confidence level', icon: 'ph:chart-bar', visible: sharing },
            { label: 'High-level trend', icon: 'ph:chart-line-up', visible: sharing },
            { label: 'Check-in details', icon: 'ph:note', visible: false },
            { label: 'Cycle logs', icon: 'ph:calendar', visible: false },
            { label: 'Personal reflections', icon: 'ph:chat-text', visible: false },
          ].map(item => (
            <div key={item.label} style={{
              display: 'flex', alignItems: 'center', gap: tokens.space.md,
              opacity: !sharing && item.visible ? 0.4 : 1,
            }}>
              <Icon
                icon={item.visible && sharing ? 'ph:check-circle' : item.visible ? 'ph:check-circle' : 'ph:x-circle'}
                width={16}
                color={item.visible && sharing ? tokens.color.statusMaintain : item.visible ? tokens.color.textMuted : '#9AA3AD'}
              />
              <Icon icon={item.icon} width={14} color={tokens.color.textMuted} />
              <span style={{ fontSize: tokens.font.sm, color: tokens.color.textSecondary, flex: 1 }}>{item.label}</span>
              <span style={{
                fontSize: tokens.font.xs,
                color: (item.visible && sharing) ? tokens.color.statusMaintain : tokens.color.textMuted,
                fontWeight: tokens.font.medium,
              }}>
                {item.visible && sharing ? 'Visible' : item.visible ? 'Hidden' : 'Never shared'}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Privacy commitment */}
      <div style={{
        display: 'flex', gap: tokens.space.sm, alignItems: 'flex-start',
        padding: tokens.space.md,
        background: 'rgba(61,155,107,0.05)',
        borderRadius: tokens.radius.md,
        border: '1px solid rgba(61,155,107,0.12)',
      }}>
        <Icon icon="ph:lock-simple" width={16} color={tokens.color.statusMaintain} style={{ marginTop: '2px', flexShrink: 0 }} />
        <span style={{ fontSize: tokens.font.sm, color: tokens.color.textSecondary, lineHeight: '1.5' }}>
          {S.consentPrivacyNote}
        </span>
      </div>
    </PageWrapper>
  );
}
