import { Icon } from '@iconify/react';
import { tokens } from '../../../tokens';

interface Props {
  label: string;
  selected: boolean;
  onSelect: () => void;
  icon?: string;
}

export default function ChoiceCard({ label, selected, onSelect, icon }: Props) {
  return (
    <button
      onClick={onSelect}
      style={{
        width: '100%',
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
        textAlign: 'left',
        fontFamily: tokens.font.family,
        outline: 'none',
        boxShadow: 'none',
      }}
      onFocus={e => { e.currentTarget.style.boxShadow = '0 0 0 2px rgba(61,155,107,0.4)'; }}
      onBlur={e => { e.currentTarget.style.boxShadow = 'none'; }}
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
    </button>
  );
}
