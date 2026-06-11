import { useState } from 'react';
import { Icon } from '@iconify/react';
import { tokens } from '../tokens';
import { S } from '../strings';
import type { AthleteProfile } from '../types';
import Card from '../components/shared/Card';
import Avatar from '../components/shared/Avatar';

interface Props {
  athletes: AthleteProfile[];
  activeAthleteId: string;
  onAthleteSelect: (id: string) => void;
  onCoach: () => void;
}

export default function RoleSelect({ athletes, activeAthleteId, onAthleteSelect, onCoach }: Props) {
  const [selectedAthlete, setSelectedAthlete] = useState(activeAthleteId);
  const [showAthleteList, setShowAthleteList] = useState(false);

  const active = athletes.find(a => a.id === selectedAthlete) ?? athletes[0];

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: `${tokens.space['3xl']} ${tokens.space.lg} 80px`,
    }}>
      <div style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: tokens.space['3xl'] }}>

        {/* Wordmark */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '38px',
            fontWeight: tokens.font.bold,
            letterSpacing: '0.12em',
            color: tokens.color.textPrimary,
            marginBottom: tokens.space.sm,
          }}>
            {S.roleSelectHeading}
          </div>
          <div style={{ fontSize: tokens.font.md, color: tokens.color.textSecondary }}>
            {S.roleSelectSubheading}
          </div>
        </div>

        {/* Athlete card */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: tokens.space.md }}>
          <Card style={{ padding: tokens.space.lg }}>
            <div style={{ marginBottom: tokens.space.md }}>
              <div style={{ fontSize: tokens.font.sm, color: tokens.color.textMuted, fontWeight: tokens.font.medium, marginBottom: tokens.space.sm, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {S.loginAthleteSection}
              </div>
              <button
                onClick={() => setShowAthleteList(!showAthleteList)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: tokens.space.md,
                  padding: `${tokens.space.sm} ${tokens.space.md}`,
                  background: 'rgba(0,0,0,0.03)',
                  borderRadius: tokens.radius.md,
                  cursor: 'pointer',
                  border: '1px solid rgba(0,0,0,0.06)',
                  width: '100%',
                  textAlign: 'left',
                  fontFamily: tokens.font.family,
                  outline: 'none',
                }}
                onFocus={e => { e.currentTarget.style.boxShadow = '0 0 0 2px rgba(79,163,199,0.4)'; }}
                onBlur={e => { e.currentTarget.style.boxShadow = 'none'; }}
              >
                <Avatar initials={active.avatarInitials} avatarCrop={active.avatarCrop} size={36} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: tokens.font.md, fontWeight: tokens.font.semibold, color: tokens.color.textPrimary }}>{active.name}</div>
                  <div style={{ fontSize: tokens.font.sm, color: tokens.color.textSecondary }}>{active.sport} · {active.position}</div>
                </div>
                <Icon icon="ph:caret-down" width={16} height={16} color={tokens.color.textMuted} style={{ transform: showAthleteList ? 'rotate(180deg)' : '', transition: 'transform 0.2s' }} />
              </button>

              {showAthleteList && (
                <div style={{
                  marginTop: tokens.space.xs,
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: tokens.radius.md,
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.9)',
                }}>
                  {athletes.map(a => (
                    <button
                      key={a.id}
                      onClick={() => { setSelectedAthlete(a.id); setShowAthleteList(false); }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: tokens.space.md,
                        padding: `${tokens.space.sm} ${tokens.space.md}`,
                        cursor: 'pointer',
                        background: a.id === selectedAthlete ? 'rgba(61,155,107,0.06)' : 'transparent',
                        border: 'none',
                        borderBottom: '1px solid rgba(0,0,0,0.04)',
                        transition: 'background 0.15s',
                        width: '100%',
                        textAlign: 'left',
                        fontFamily: tokens.font.family,
                        outline: 'none',
                      }}
                      onFocus={e => { e.currentTarget.style.background = 'rgba(61,155,107,0.06)'; }}
                      onBlur={e => { e.currentTarget.style.background = a.id === selectedAthlete ? 'rgba(61,155,107,0.06)' : 'transparent'; }}
                    >
                      <Avatar initials={a.avatarInitials} avatarCrop={a.avatarCrop} size={30} />
                      <div>
                        <div style={{ fontSize: tokens.font.sm, fontWeight: tokens.font.medium, color: tokens.color.textPrimary }}>{a.name}</div>
                        <div style={{ fontSize: tokens.font.xs, color: tokens.color.textMuted }}>{a.position}</div>
                      </div>
                      {a.id === selectedAthlete && <Icon icon="ph:check" width={14} color={tokens.color.statusMaintain} style={{ marginLeft: 'auto' }} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => onAthleteSelect(selectedAthlete)}
              style={{
                width: '100%',
                padding: `${tokens.space.md} ${tokens.space.xl}`,
                background: tokens.color.brandGradient,
                border: 'none',
                borderRadius: tokens.radius.full,
                color: '#fff',
                fontSize: tokens.font.md,
                fontWeight: tokens.font.semibold,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: tokens.space.sm,
                fontFamily: tokens.font.family,
                boxShadow: tokens.color.brandShadow,
              }}
            >
              <Icon icon="ph:user" width={16} height={16} />
              {S.roleAthlete}
            </button>
          </Card>

          {/* Coach card */}
          <Card style={{ padding: tokens.space.lg }}>
            <div style={{ marginBottom: tokens.space.md }}>
              <div style={{ fontSize: tokens.font.sm, color: tokens.color.textMuted, fontWeight: tokens.font.medium, marginBottom: tokens.space.xs, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {S.loginCoachSection}
              </div>
              <div style={{ fontSize: tokens.font.sm, color: tokens.color.textSecondary }}>
                {S.roleCoachDesc}
              </div>
            </div>

            <button
              onClick={onCoach}
              style={{
                width: '100%',
                padding: `${tokens.space.md} ${tokens.space.xl}`,
                background: 'rgba(255,255,255,0.80)',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: tokens.radius.full,
                color: tokens.color.textPrimary,
                fontSize: tokens.font.md,
                fontWeight: tokens.font.semibold,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: tokens.space.sm,
                fontFamily: tokens.font.family,
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }}
            >
              <Icon icon="ph:clipboard-text" width={16} height={16} />
              {S.roleCoach}
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}
