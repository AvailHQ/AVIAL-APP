import { useState } from 'react';
import { Icon } from '@iconify/react';
import { tokens } from '../../tokens';
import type { CoachAthleteView } from '../../types';
import AthleteListRow from './AthleteListRow';

interface Props {
  title: string;
  athletes: CoachAthleteView[];
  onSelect: (id: string) => void;
  defaultCollapsed?: boolean;
  accentColor?: string;
}

export default function PrioritySection({ title, athletes, onSelect, defaultCollapsed = false, accentColor }: Props) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  if (athletes.length === 0) return null;

  const color = accentColor ?? tokens.color.textSecondary;

  return (
    <div style={{ marginBottom: tokens.space.xl }}>
      <button
        onClick={() => setCollapsed(c => !c)}
        style={{
          background: 'none', border: 'none', width: '100%',
          display: 'flex', alignItems: 'center', gap: tokens.space.sm,
          padding: `${tokens.space.sm} 0 ${tokens.space.md}`,
          cursor: 'pointer', fontFamily: tokens.font.family,
        }}
      >
        <span style={{
          fontSize: tokens.font.xs,
          fontWeight: tokens.font.bold,
          color,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>
          {title}
        </span>
        <span style={{
          fontSize: tokens.font.xs,
          fontWeight: tokens.font.semibold,
          color,
          background: color + '18',
          padding: '1px 8px',
          borderRadius: tokens.radius.full,
        }}>
          {athletes.length}
        </span>
        <Icon
          icon={collapsed ? 'ph:caret-right' : 'ph:caret-down'}
          width={12}
          color={tokens.color.textMuted}
          style={{ marginLeft: 'auto' }}
        />
      </button>

      {!collapsed && (
        <div>
          {athletes.map(a => (
            <AthleteListRow key={a.athleteId} athlete={a} onClick={() => onSelect(a.athleteId)} />
          ))}
        </div>
      )}
    </div>
  );
}
