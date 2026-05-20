import { tokens } from '../../tokens';

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  padding?: string;
}

export default function Card({ children, style, onClick, padding }: CardProps) {
  const base: React.CSSProperties = {
    background: tokens.card.background,
    backdropFilter: tokens.card.backdropFilter,
    WebkitBackdropFilter: tokens.card.backdropFilter,
    border: tokens.card.border,
    boxShadow: tokens.card.boxShadow,
    borderRadius: tokens.card.borderRadius,
    padding: padding ?? tokens.space.xl,
    transition: onClick ? 'transform 0.15s ease, box-shadow 0.15s ease' : undefined,
    cursor: onClick ? 'pointer' : undefined,
    ...style,
  };

  return (
    <div
      style={base}
      onClick={onClick}
      onMouseEnter={e => {
        if (onClick) {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-1px)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 28px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04)';
        }
      }}
      onMouseLeave={e => {
        if (onClick) {
          (e.currentTarget as HTMLDivElement).style.transform = '';
          (e.currentTarget as HTMLDivElement).style.boxShadow = tokens.card.boxShadow;
        }
      }}
    >
      {children}
    </div>
  );
}
