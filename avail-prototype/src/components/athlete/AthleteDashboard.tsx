import { Icon } from '@iconify/react';
import { tokens, trendColor } from '../../tokens';
import { S } from '../../strings';
import type { AthleteProfile, LoadScore } from '../../types';
import PageWrapper from '../shared/PageWrapper';
import Card from '../shared/Card';
import BackButton from '../shared/BackButton';
import { DirectionBadge, ConfidenceBadge, TrendBadge } from '../shared/Badge';
import LoadScoreRing from './LoadScoreRing';
import TrendChart from './TrendChart';
import ContextDimensionsPanel from './ContextDimensionsPanel';

interface Props {
  athlete: AthleteProfile;
  loadScore: LoadScore;
  checkInSubmittedToday: boolean;
  onCheckIn: () => void;
  onSessionOutcome: () => void;
  onConsentSettings: () => void;
  onBack: () => void;
}

export default function AthleteDashboard({
  athlete,
  loadScore,
  checkInSubmittedToday,
  onCheckIn,
  onSessionOutcome,
  onConsentSettings,
  onBack,
}: Props) {
  const firstName = athlete.name.split(' ')[0];
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <PageWrapper maxWidth="480px">
      <div style={{ marginBottom: tokens.space.lg }}>
        <BackButton onClick={onBack} label="Switch role" />
      </div>

      {/* Greeting */}
      <div style={{ marginBottom: tokens.space['2xl'] }}>
        <div style={{ fontSize: '24px', fontWeight: tokens.font.bold, color: tokens.color.textPrimary, marginBottom: '2px' }}>
          {greeting}, {firstName}.
        </div>
        <div style={{ fontSize: tokens.font.sm, color: tokens.color.textSecondary }}>{today}</div>
      </div>

      {/* Post check-in banner */}
      {checkInSubmittedToday && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: tokens.space.sm,
          padding: `${tokens.space.sm} ${tokens.space.lg}`,
          background: 'rgba(61,155,107,0.08)',
          border: '1px solid rgba(61,155,107,0.18)',
          borderRadius: tokens.radius.md,
          marginBottom: tokens.space.lg,
        }}>
          <Icon icon="ph:check-circle" width={16} color={tokens.color.statusMaintain} />
          <span style={{ fontSize: tokens.font.sm, color: tokens.color.statusMaintain, fontWeight: tokens.font.medium }}>
            {S.checkInBannerSuccess}
          </span>
        </div>
      )}

      {/* Main context card */}
      <Card style={{ marginBottom: tokens.space.lg }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: tokens.space.xl, paddingBottom: tokens.space.md }}>
          <LoadScoreRing
            score={loadScore.value}
            label={loadScore.label}
            direction={loadScore.direction}
            size={156}
          />

          {/* Direction + badges */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: tokens.space.sm, width: '100%' }}>
            <DirectionBadge direction={loadScore.direction} />
            <div style={{ display: 'flex', gap: tokens.space.sm, flexWrap: 'wrap', justifyContent: 'center' }}>
              <ConfidenceBadge confidence={loadScore.confidence} size="sm" />
              <TrendBadge trend={loadScore.trend} size="sm" />
            </div>
          </div>

          {/* Context summary */}
          <div style={{
            fontSize: tokens.font.md,
            color: tokens.color.textSecondary,
            lineHeight: '1.6',
            textAlign: 'center',
            padding: `0 ${tokens.space.sm}`,
          }}>
            {loadScore.contextSummary}
          </div>

          <ContextDimensionsPanel dimensions={loadScore.dimensions} />
        </div>
      </Card>

      {/* 7-day trend card */}
      <Card style={{ marginBottom: tokens.space.lg }} padding={tokens.space.lg}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: tokens.space.md }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.sm }}>
            <Icon icon="ph:chart-line" width={16} color={tokens.color.textSecondary} />
            <span style={{ fontSize: tokens.font.sm, fontWeight: tokens.font.semibold, color: tokens.color.textPrimary }}>
              {S.dashboardTrendLabel}
            </span>
          </div>
          <TrendBadge trend={loadScore.trend} size="sm" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <TrendChart history={loadScore.trendHistory} trend={loadScore.trend} width={320} height={72} />
        </div>
      </Card>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.sm, marginBottom: tokens.space.lg }}>
        <button
          onClick={onCheckIn}
          style={{
            width: '100%', padding: `${tokens.space.md} ${tokens.space.xl}`,
            background: checkInSubmittedToday ? 'rgba(61,155,107,0.08)' : 'linear-gradient(135deg, #3D9B6B 0%, #4FA3C7 100%)',
            border: checkInSubmittedToday ? '1px solid rgba(61,155,107,0.18)' : 'none',
            borderRadius: tokens.radius.full,
            color: checkInSubmittedToday ? tokens.color.statusMaintain : '#fff',
            fontSize: tokens.font.md, fontWeight: tokens.font.semibold,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: tokens.space.sm,
            fontFamily: tokens.font.family,
            boxShadow: checkInSubmittedToday ? 'none' : '0 2px 12px rgba(61,155,107,0.22)',
          }}
        >
          <Icon icon="ph:pencil-simple" width={16} />
          {checkInSubmittedToday ? 'Update context again' : S.dashboardCheckInCta}
        </button>

        <button
          onClick={onSessionOutcome}
          style={{
            width: '100%', padding: `${tokens.space.md} ${tokens.space.xl}`,
            background: 'rgba(255,255,255,0.80)',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: tokens.radius.full,
            color: tokens.color.textPrimary, fontSize: tokens.font.md, fontWeight: tokens.font.semibold,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: tokens.space.sm,
            fontFamily: tokens.font.family,
          }}
        >
          <Icon icon="ph:lightning" width={16} />
          {S.dashboardSessionCta}
        </button>
      </div>

      {/* Consent settings link */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={onConsentSettings}
          style={{
            background: 'none', border: 'none',
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            color: tokens.color.textMuted, fontSize: tokens.font.sm,
            cursor: 'pointer', fontFamily: tokens.font.family,
            padding: '4px',
          }}
        >
          <Icon icon="ph:shield-check" width={14} />
          {S.dashboardConsentLink}
        </button>
      </div>
    </PageWrapper>
  );
}
