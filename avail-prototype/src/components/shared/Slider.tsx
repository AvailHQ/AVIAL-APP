import { tokens } from '../../tokens';

interface SliderProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  lowLabel?: string;
  highLabel?: string;
  icon?: React.ReactNode;
}

export default function Slider({
  label,
  value,
  onChange,
  min = 1,
  max = 5,
  lowLabel,
  highLabel,
  icon,
}: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div style={{ marginBottom: tokens.space.xl }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: tokens.space.sm }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.sm }}>
          {icon && <span style={{ display: 'flex', color: tokens.color.textSecondary }}>{icon}</span>}
          <span style={{ fontSize: tokens.font.md, fontWeight: tokens.font.medium, color: tokens.color.textPrimary }}>
            {label}
          </span>
        </div>
        <span style={{
          fontSize: tokens.font.sm,
          fontWeight: tokens.font.semibold,
          color: '#3D9B6B',
          background: 'rgba(61,155,107,0.10)',
          padding: '2px 10px',
          borderRadius: tokens.radius.full,
          minWidth: '32px',
          textAlign: 'center',
        }}>
          {value}
        </span>
      </div>

      <div style={{ position: 'relative' }}>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{
            width: '100%',
            background: `linear-gradient(to right, #3D9B6B ${pct}%, rgba(0,0,0,0.10) ${pct}%)`,
          }}
        />
      </div>

      {(lowLabel || highLabel) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
          <span style={{ fontSize: tokens.font.xs, color: tokens.color.textMuted }}>{lowLabel}</span>
          <span style={{ fontSize: tokens.font.xs, color: tokens.color.textMuted }}>{highLabel}</span>
        </div>
      )}
    </div>
  );
}
