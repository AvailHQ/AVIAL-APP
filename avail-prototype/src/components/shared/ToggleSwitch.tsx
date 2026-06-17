import { tokens } from '../../tokens';

interface ToggleSwitchProps {
  on: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}

export default function ToggleSwitch({ on, onChange, label, description }: ToggleSwitchProps) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: tokens.space.lg,
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        padding: 0,
        width: '100%',
        textAlign: 'left',
        fontFamily: tokens.font.family,
        outline: 'none',
        borderRadius: tokens.radius.sm,
      }}
      onFocus={e => { e.currentTarget.style.boxShadow = '0 0 0 2px rgba(61,155,107,0.4)'; }}
      onBlur={e => { e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div>
        <div style={{ fontSize: tokens.font.md, fontWeight: tokens.font.medium, color: tokens.color.textPrimary, marginBottom: description ? '4px' : 0 }}>
          {label}
        </div>
        {description && (
          <div style={{ fontSize: tokens.font.sm, color: tokens.color.textSecondary, lineHeight: '1.5' }}>
            {description}
          </div>
        )}
      </div>

      <div
        aria-hidden="true"
        style={{
          flexShrink: 0,
          width: '48px',
          height: '28px',
          borderRadius: '14px',
          background: on ? tokens.color.brandGreen : 'rgba(0,0,0,0.14)',
          position: 'relative',
          transition: 'background 0.2s ease',
          marginTop: '2px',
        }}
      >
        <div style={{
          position: 'absolute',
          top: '3px',
          left: on ? '23px' : '3px',
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          background: '#FFFFFF',
          boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
          transition: 'left 0.2s ease',
        }} />
      </div>
    </button>
  );
}
