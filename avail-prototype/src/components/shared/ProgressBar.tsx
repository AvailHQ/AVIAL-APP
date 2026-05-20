import { tokens } from '../../tokens';

interface ProgressBarProps {
  steps: number;
  current: number;
}

export default function ProgressBar({ steps, current }: ProgressBarProps) {
  return (
    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
      {Array.from({ length: steps }, (_, i) => (
        <div
          key={i}
          style={{
            height: '4px',
            flex: 1,
            borderRadius: tokens.radius.full,
            background: i < current
              ? '#3D9B6B'
              : i === current
              ? 'rgba(61,155,107,0.35)'
              : 'rgba(0,0,0,0.08)',
            transition: 'background 0.3s ease',
          }}
        />
      ))}
    </div>
  );
}
