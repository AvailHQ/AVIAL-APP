import { tokens } from '../../tokens';

interface Props {
  initials: string;
  avatarPosition?: string;      // athlete id used as filename e.g. 'maya-chen'
  objectPosition?: string;      // CSS object-position to fine-tune face centering
  size?: number;
  unavailable?: boolean;
}

export default function Avatar({ initials, avatarPosition, objectPosition = 'center 35%', size = 36, unavailable = false }: Props) {
  const hasPhoto = !!avatarPosition && !unavailable;
  const src = hasPhoto ? `/athletes/${avatarPosition}.png` : null;

  const baseStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    flexShrink: 0,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

  if (src) {
    return (
      <div style={baseStyle}>
        <img
          src={src}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition,
          }}
        />
      </div>
    );
  }

  // Initials fallback
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
