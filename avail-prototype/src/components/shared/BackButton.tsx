import { Icon } from '@iconify/react';
import { tokens } from '../../tokens';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export default function BackButton({ onClick, label = 'Back' }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        background: 'none',
        border: 'none',
        padding: '6px 0',
        color: tokens.color.textSecondary,
        fontSize: tokens.font.sm,
        fontWeight: tokens.font.medium,
        cursor: 'pointer',
        fontFamily: tokens.font.family,
        transition: 'color 0.15s ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.color = tokens.color.textPrimary)}
      onMouseLeave={e => (e.currentTarget.style.color = tokens.color.textSecondary)}
    >
      <Icon icon="ph:arrow-left" width={16} height={16} />
      {label}
    </button>
  );
}
