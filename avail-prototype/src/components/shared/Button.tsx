import { tokens } from '../../tokens';

type Variant = 'primary' | 'secondary' | 'ghost' | 'amber';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: Variant;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
}

const variantStyles: Record<Variant, React.CSSProperties> = {
  primary: {
    background: 'linear-gradient(135deg, #3D9B6B 0%, #4FA3C7 100%)',
    color: '#FFFFFF',
    border: 'none',
    boxShadow: '0 2px 12px rgba(61,155,107,0.25)',
  },
  secondary: {
    background: 'rgba(255,255,255,0.80)',
    color: tokens.color.textPrimary,
    border: `1px solid ${tokens.color.borderSubtle}`,
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
  },
  ghost: {
    background: 'transparent',
    color: tokens.color.textSecondary,
    border: 'none',
    boxShadow: 'none',
  },
  amber: {
    background: 'rgba(181,134,10,0.10)',
    color: '#96680A',
    border: '1px solid rgba(181,134,10,0.20)',
    boxShadow: 'none',
  },
};

export default function Button({ label, onClick, variant = 'primary', disabled, fullWidth, style, icon }: ButtonProps) {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.space.sm,
    padding: `${tokens.space.md} ${tokens.space.xl}`,
    borderRadius: tokens.radius.full,
    fontSize: tokens.font.md,
    fontWeight: tokens.font.semibold,
    fontFamily: tokens.font.family,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'all 0.18s ease',
    width: fullWidth ? '100%' : undefined,
    letterSpacing: '0.01em',
    ...variantStyles[variant],
    ...style,
  };

  return (
    <button
      style={base}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      onMouseEnter={e => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.opacity = '0.88';
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
        }
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.opacity = disabled ? '0.45' : '1';
        (e.currentTarget as HTMLButtonElement).style.transform = '';
      }}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {label}
    </button>
  );
}
