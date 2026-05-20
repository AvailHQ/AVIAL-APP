import type { Direction, Confidence, Trend } from './types';

export const tokens = {
  color: {
    bgRadial: `
      radial-gradient(circle at top left, rgba(111,191,158,0.08), transparent 40%),
      radial-gradient(circle at bottom right, rgba(79,163,199,0.08), transparent 40%),
      linear-gradient(180deg, #F7FAF8 0%, #F4F8FA 100%)
    `,
    textPrimary: '#1B1F23',
    textSecondary: '#64707D',
    textMuted: '#9AA3AD',

    statusMaintain: '#2D7A52',
    statusMaintainBg: 'rgba(61,155,107,0.10)',
    statusReduce: '#B07A10',
    statusReduceBg: 'rgba(181,134,10,0.12)',
    statusRecovery: '#6B4FA8',
    statusRecoveryBg: 'rgba(124,92,191,0.10)',
    statusIncrease: '#2060A0',
    statusIncreaseBg: 'rgba(45,123,184,0.10)',

    confidenceHigh: '#2D7A52',
    confidenceMedium: '#B07A10',
    confidenceLow: '#7A8796',
    confidenceVeryLow: '#A05830',

    trendImproving: '#2D7A52',
    trendStable: '#64707D',
    trendDeclining: '#B07A10',

    border: 'rgba(255,255,255,0.4)',
    borderSubtle: 'rgba(0,0,0,0.06)',
    accent: '#4FA3C7',
    greenAccent: '#6FBF9E',

    unavailable: '#9AA3AD',
    unavailableBg: 'rgba(154,163,173,0.08)',

    white: '#FFFFFF',
    surface: 'rgba(255,255,255,0.72)',
  },

  card: {
    background: 'rgba(255,255,255,0.72)',
    backdropFilter: 'blur(18px)',
    border: '1px solid rgba(255,255,255,0.4)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)',
    borderRadius: '16px',
  },

  font: {
    family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    xs: '11px',
    sm: '13px',
    md: '15px',
    lg: '17px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  space: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    section: '40px',
  },

  radius: {
    sm: '6px',
    md: '10px',
    lg: '16px',
    xl: '20px',
    full: '9999px',
  },
} as const;

export function directionColors(direction: Direction | null) {
  switch (direction) {
    case 'Maintain':       return { text: tokens.color.statusMaintain,  bg: tokens.color.statusMaintainBg };
    case 'Reduce':         return { text: tokens.color.statusReduce,    bg: tokens.color.statusReduceBg };
    case 'Recovery Focus': return { text: tokens.color.statusRecovery,  bg: tokens.color.statusRecoveryBg };
    case 'Increase':       return { text: tokens.color.statusIncrease,  bg: tokens.color.statusIncreaseBg };
    default:               return { text: tokens.color.unavailable,     bg: tokens.color.unavailableBg };
  }
}

export function confidenceColor(confidence: Confidence | null): string {
  switch (confidence) {
    case 'High':     return tokens.color.confidenceHigh;
    case 'Medium':   return tokens.color.confidenceMedium;
    case 'Low':      return tokens.color.confidenceLow;
    case 'Very Low': return tokens.color.confidenceVeryLow;
    default:         return tokens.color.unavailable;
  }
}

export function trendColor(trend: Trend | null): string {
  switch (trend) {
    case 'Improving': return tokens.color.trendImproving;
    case 'Stable':    return tokens.color.trendStable;
    case 'Declining': return tokens.color.trendDeclining;
    default:          return tokens.color.unavailable;
  }
}
