import { tokens } from '../../tokens';

interface ToggleSwitchProps {
  on: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}

export default function ToggleSwitch({ on, onChange, label, description }: ToggleSwitchProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: tokens.space.lg,
        cursor: 'pointer',
      }}
      onClick={() => onChange(!on)}
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
        style={{
          flexShrink: 0,
          width: '48px',
          height: '28px',
          borderRadius: '14px',
          background: on ? '#3D9B6B' : 'rgba(0,0,0,0.14)',
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
    </div>
  );
}
