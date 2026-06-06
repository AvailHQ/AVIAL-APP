import { tokens } from '../../tokens';
import type { AvatarCrop } from '../../types';

interface Props {
  initials: string;
  avatarCrop?: AvatarCrop;
  size?: number;
  unavailable?: boolean;
}

const SQUAD_IMG = '/athletes/squad.png';
const SQUAD_IMG_WIDTH = 1536;
const SQUAD_IMG_HEIGHT = 1024;

export default function Avatar({ initials, avatarCrop, size = 36, unavailable = false }: Props) {
  const hasPhoto = !!avatarCrop && !unavailable;
  const scale = avatarCrop ? size / avatarCrop.size : 1;
  const backgroundWidth = SQUAD_IMG_WIDTH * scale;
  const backgroundHeight = SQUAD_IMG_HEIGHT * scale;
  const backgroundX = avatarCrop ? size / 2 - avatarCrop.centerX * scale : 0;
  const backgroundY = avatarCrop ? size / 2 - avatarCrop.centerY * scale : 0;

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

  if (hasPhoto) {
    return (
      <div
        aria-hidden="true"
        style={{
          ...baseStyle,
          backgroundImage: `url(${SQUAD_IMG})`,
          backgroundSize: `${backgroundWidth}px ${backgroundHeight}px`,
          backgroundPosition: `${backgroundX}px ${backgroundY}px`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'rgba(255,255,255,0.72)',
        }}
      />
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
