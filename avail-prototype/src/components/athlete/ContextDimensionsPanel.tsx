import { useState } from 'react';
import { Icon } from '@iconify/react';
import { tokens } from '../../tokens';
import type { ContextDimension } from '../../types';

interface Props {
  dimensions: ContextDimension[];
}

const arrowIcon = (arrow: 'up' | 'down' | 'stable') => {
  if (arrow === 'up') return 'ph:arrow-up';
  if (arrow === 'down') return 'ph:arrow-down';
  return 'ph:minus';
};

const arrowColor = (arrow: 'up' | 'down' | 'stable') => {
  if (arrow === 'up') return tokens.color.statusMaintain;
  if (arrow === 'down') return tokens.color.statusReduce;
  return tokens.color.textMuted;
};

export default function ContextDimensionsPanel({ dimensions }: Props) {
  const [expanded, setExpanded] = useState(false);

  if (dimensions.length === 0) return null;

  return (
    <div>
      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          background: 'none', border: 'none', padding: '8px 0',
          display: 'flex', alignItems: 'center', gap: '6px',
          color: tokens.color.textSecondary, fontSize: tokens.font.sm,
          fontWeight: tokens.font.medium, cursor: 'pointer',
          fontFamily: tokens.font.family, width: '100%',
        }}
      >
        <Icon icon={expanded ? 'ph:caret-up' : 'ph:caret-down'} width={14} />
        {expanded ? 'Hide context dimensions' : 'View context dimensions'}
      </button>

      {expanded && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.sm, marginTop: tokens.space.xs }}>
          {dimensions.map(dim => (
            <div
              key={dim.label}
              style={{
                display: 'flex', alignItems: 'center', gap: tokens.space.md,
                padding: `${tokens.space.sm} ${tokens.space.md}`,
                background: 'rgba(255,255,255,0.55)',
                borderRadius: tokens.radius.md,
                border: '1px solid rgba(0,0,0,0.05)',
              }}
            >
              <Icon
                icon={arrowIcon(dim.arrow)}
                width={14}
                color={arrowColor(dim.arrow)}
                style={{ flexShrink: 0 }}
              />
              <span style={{ fontSize: tokens.font.sm, fontWeight: tokens.font.medium, color: tokens.color.textPrimary, flex: 1 }}>
                {dim.label}
              </span>
              <span style={{ fontSize: tokens.font.xs, color: tokens.color.textSecondary }}>
                {dim.detail}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
