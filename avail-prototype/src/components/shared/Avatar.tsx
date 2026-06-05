import { tokens } from '../../tokens';

interface Props {
  initials: string;
  avatarPosition?: string;  // CSS background-position in the squad.jpg sprite
  size?: number;
  unavailable?: boolean;
}

const SQUAD_IMG = '/athletes/squad.jpg';

// 3-column × 2-row sprite sheet
// background-size must be 300% × 200% to map each cell to the display size
const SPRITE_BG_SIZE = '300% 200%';

export default function Avatar({ initials, avatarPosition, size = 36, unavailable = false }: Props) {
  const hasPhoto = !!avatarPosition && !unavailable;

  const baseStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    overflow: 'hidden',
  };

  if (unavailable) {
    return (
      <div style={{
        ...baseStyle,
        background: 'rgba(154,163,173,0.15)',
        color: tokens.color.unavailable,
        fontSize: size * 0.33,
        fontWeight: tokens.font.bold,
      }}>
        {initials}
      </div>
    );
  }

  if (hasPhoto) {
    return (
      <div style={{
        ...baseStyle,
        backgroundImage: `url(${SQUAD_IMG})`,
        backgroundSize: SPRITE_BG_SIZE,
        backgroundPosition: avatarPosition,
        backgroundRepeat: 'no-repeat',
      }} />
    );
  }

  // Initials fallback (Chloe Williams or any athlete without a photo)
  return (
    <div style={{
      ...baseStyle,
      background: 'linear-gradient(135deg, #3D9B6B, #4FA3C7)',
      color: '#fff',
      fontSize: size * 0.33,
      fontWeight: tokens.font.bold,
      letterSpacing: '0.02em',
    }}>
      {initials}
    </div>
  );
}
