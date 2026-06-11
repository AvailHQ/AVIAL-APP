import { Icon } from '@iconify/react';
import { tokens } from '../../tokens';

export interface MetricCardProps {
  value: number;
  label: string;
  color: string;
  bg: string;
  border: string;
  icon: string;
}

export default function MetricCard({ value, label, color, bg, border, icon }: MetricCardProps) {
  return (
    <div style={{
      flex: '1 1 120px',
      padding: `${tokens.space.lg} ${tokens.space.lg}`,
      background: bg,
      border: `1px solid ${border}`,
      borderRadius: tokens.radius.lg,
      display: 'flex',
      flexDirection: 'column',
      gap: tokens.space.xs,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{
          fontSize: '32px',
          fontWeight: tokens.font.bold,
          color,
          lineHeight: 1,
        }}>
          {value}
        </div>
        <Icon icon={icon} width={18} color={color} style={{ opacity: 0.6 }} />
      </div>
      <div style={{
        fontSize: tokens.font.xs,
        fontWeight: tokens.font.semibold,
        color,
        opacity: 0.8,
        lineHeight: 1.3,
      }}>
        {label}
      </div>
    </div>
  );
}
