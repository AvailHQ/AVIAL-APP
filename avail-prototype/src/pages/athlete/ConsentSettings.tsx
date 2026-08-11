import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { tokens } from '../../tokens';
import { S } from '../../strings';
import type { ConsentState, WearableDeviceType, WearableSettings } from '../../types';
import PageWrapper from '../../components/shared/PageWrapper';
import Card from '../../components/shared/Card';
import BackButton from '../../components/shared/BackButton';
import ToggleSwitch from '../../components/shared/ToggleSwitch';

interface Props {
  athleteName: string;
  consentState: ConsentState;
  wearableSettings: WearableSettings;
  onUpdate: (newConsent: ConsentState) => void;
  onWearableUpdate: (settings: WearableSettings) => void;
  onBack: () => void;
}

const wearableDeviceTypes: WearableDeviceType[] = [
  'Apple Watch',
  'Garmin',
  'WHOOP',
  'Oura Ring',
  'Fitbit',
  'Polar',
  'Other',
];

export default function ConsentSettings({ consentState, wearableSettings, onUpdate, onWearableUpdate, onBack }: Props) {
  const [sharing, setSharing] = useState(consentState.sharingWithCoach);
  const [rawDataReview, setRawDataReview] = useState(consentState.allowCoachRawDataReview);
  const [cycleDataReview, setCycleDataReview] = useState(consentState.allowCoachCycleDataReview);
  const [wearableEnabled, setWearableEnabled] = useState(wearableSettings.enabled);
  const [wearableDevice, setWearableDevice] = useState<WearableDeviceType | null>(wearableSettings.deviceType);
  const [saved, setSaved] = useState(false);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    };
  }, []);

  const saveConsent = (updates: Partial<ConsentState>) => {
    setSaved(true);
    onUpdate({
      ...consentState,
      sharingWithCoach: sharing,
      allowCoachRawDataReview: rawDataReview,
      allowCoachCycleDataReview: cycleDataReview,
      ...updates,
      lastUpdated: new Date().toISOString().split('T')[0],
    });
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    savedTimerRef.current = setTimeout(() => setSaved(false), 2000);
  };

  const handleSharingToggle = (value: boolean) => {
    setSharing(value);
    saveConsent({ sharingWithCoach: value });
  };

  const handleRawDataReviewToggle = (value: boolean) => {
    setRawDataReview(value);
    saveConsent({ allowCoachRawDataReview: value });
  };

  const handleCycleDataReviewToggle = (value: boolean) => {
    setCycleDataReview(value);
    saveConsent({ allowCoachCycleDataReview: value });
  };

  const handleWearableToggle = (value: boolean) => {
    setWearableEnabled(value);
    onWearableUpdate({ ...wearableSettings, enabled: value, deviceType: wearableDevice });
  };

  const handleWearableDeviceChange = (value: WearableDeviceType) => {
    setWearableDevice(value);
    onWearableUpdate({ ...wearableSettings, enabled: wearableEnabled, deviceType: value });
  };

  return (
    <PageWrapper maxWidth="460px">
      <div style={{ marginBottom: tokens.space.lg }}>
        <BackButton onClick={onBack} />
      </div>

      <div style={{ marginBottom: tokens.space['2xl'] }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.sm, marginBottom: tokens.space.xs }}>
          <Icon icon="ph:shield-check" width={22} color={tokens.color.statusMaintain} />
          <div style={{ fontSize: '22px', fontWeight: tokens.font.bold, color: tokens.color.textPrimary }}>
            {S.consentHeading}
          </div>
        </div>
        <div style={{ fontSize: tokens.font.md, color: tokens.color.textSecondary, lineHeight: '1.5' }}>
          {S.consentSubheading}
        </div>
      </div>

      {/* Main toggle */}
      <Card style={{ marginBottom: tokens.space.lg }}>
        <ToggleSwitch
          on={sharing}
          onChange={handleSharingToggle}
          label={S.consentToggleLabel}
          description={sharing ? S.consentOnDescription : S.consentOffDescription}
        />

        {saved && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            marginTop: tokens.space.md,
            padding: `${tokens.space.xs} ${tokens.space.sm}`,
            background: 'rgba(61,155,107,0.08)',
            borderRadius: tokens.radius.sm,
          }}>
            <Icon icon="ph:check" width={14} color={tokens.color.statusMaintain} />
            <span style={{ fontSize: tokens.font.sm, color: tokens.color.statusMaintain, fontWeight: tokens.font.medium }}>
              {S.consentSaved}
            </span>
          </div>
        )}
      </Card>

      <Card style={{ marginBottom: tokens.space.lg }} padding={tokens.space.lg}>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.sm, marginBottom: tokens.space.lg }}>
          <Icon icon="ph:watch" width={17} color={tokens.color.textSecondary} />
          <div style={{ fontSize: tokens.font.sm, fontWeight: tokens.font.semibold, color: tokens.color.textPrimary }}>
            {S.dataInputsHeading}
          </div>
        </div>
        <ToggleSwitch
          on={wearableEnabled}
          onChange={handleWearableToggle}
          label={S.wearableToggleLabel}
          description={S.wearableToggleDescription}
        />

        {wearableEnabled && (
          <div style={{ marginTop: tokens.space.lg }}>
            <label
              htmlFor="wearable-device"
              style={{ display: 'block', fontSize: tokens.font.sm, fontWeight: tokens.font.medium, color: tokens.color.textPrimary, marginBottom: tokens.space.xs }}
            >
              {S.wearableDeviceLabel}
            </label>
            <div style={{ position: 'relative' }}>
              <select
                id="wearable-device"
                value={wearableDevice ?? ''}
                onChange={event => handleWearableDeviceChange(event.target.value as WearableDeviceType)}
                style={{
                  width: '100%',
                  minHeight: '44px',
                  padding: `0 40px 0 ${tokens.space.md}`,
                  border: '1px solid rgba(0,0,0,0.12)',
                  borderRadius: tokens.radius.sm,
                  background: 'rgba(255,255,255,0.82)',
                  color: wearableDevice ? tokens.color.textPrimary : tokens.color.textMuted,
                  fontSize: tokens.font.md,
                  fontFamily: tokens.font.family,
                  appearance: 'none',
                }}
              >
                <option value="" disabled>{S.wearableDevicePlaceholder}</option>
                {wearableDeviceTypes.map(device => <option key={device} value={device}>{device}</option>)}
              </select>
              <Icon
                icon="ph:caret-down"
                width={16}
                color={tokens.color.textMuted}
                style={{ position: 'absolute', right: tokens.space.md, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginTop: tokens.space.sm }}>
              <Icon icon="ph:lock-simple" width={14} color={tokens.color.textMuted} style={{ marginTop: '2px', flexShrink: 0 }} />
              <span style={{ fontSize: tokens.font.xs, color: tokens.color.textMuted, lineHeight: '1.45' }}>
                {S.wearablePrivacyNote}
              </span>
            </div>
          </div>
        )}
      </Card>

      <Card style={{ marginBottom: tokens.space.lg }} padding={tokens.space.lg}>
        <div style={{ fontSize: tokens.font.sm, fontWeight: tokens.font.semibold, color: tokens.color.textPrimary, marginBottom: tokens.space.lg }}>
          {S.consentReviewHeading}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.lg }}>
          <ToggleSwitch
            on={rawDataReview}
            onChange={handleRawDataReviewToggle}
            label={S.consentRawDataToggleLabel}
            description={S.consentRawDataDescription}
          />
          <div style={{ height: '1px', background: 'rgba(0,0,0,0.07)' }} />
          <ToggleSwitch
            on={cycleDataReview}
            onChange={handleCycleDataReviewToggle}
            label={S.consentCycleDataToggleLabel}
            description={S.consentCycleDataDescription}
          />
        </div>
      </Card>

      {/* What coaches can see */}
      <Card style={{ marginBottom: tokens.space.lg }} padding={tokens.space.lg}>
        <div style={{ fontSize: tokens.font.sm, fontWeight: tokens.font.semibold, color: tokens.color.textPrimary, marginBottom: tokens.space.md }}>
          {S.consentVisibilityHeading}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.sm }}>
          {[
            { label: S.consentItemLoadScore, icon: 'ph:gauge', visible: sharing },
            { label: S.consentItemDirection, icon: 'ph:arrow-right', visible: sharing },
            { label: S.consentItemConfidence, icon: 'ph:chart-bar', visible: sharing },
            { label: S.consentItemTrend, icon: 'ph:chart-line-up', visible: sharing },
            { label: S.consentItemCheckIns, icon: 'ph:note', visible: rawDataReview, reviewPermission: true },
            { label: S.consentItemCycleLogs, icon: 'ph:calendar', visible: cycleDataReview, reviewPermission: true },
            { label: S.consentItemReflections, icon: 'ph:chat-text', visible: false, reviewPermission: false },
          ].map(item => (
            <div key={item.label} style={{
              display: 'flex', alignItems: 'center', gap: tokens.space.md,
              opacity: !item.reviewPermission && !sharing && item.visible ? 0.4 : 1,
            }}>
              <Icon
                icon={item.visible && (item.reviewPermission || sharing) ? 'ph:check-circle' : 'ph:x-circle'}
                width={16}
                color={item.visible && (item.reviewPermission || sharing) ? tokens.color.statusMaintain : '#9AA3AD'}
              />
              <Icon icon={item.icon} width={14} color={tokens.color.textMuted} />
              <span style={{ fontSize: tokens.font.sm, color: tokens.color.textSecondary, flex: 1 }}>{item.label}</span>
              <span style={{
                fontSize: tokens.font.xs,
                color: item.visible && (item.reviewPermission || sharing) ? tokens.color.statusMaintain : tokens.color.textMuted,
                fontWeight: tokens.font.medium,
              }}>
                {item.visible && item.reviewPermission
                  ? S.consentReviewAllowed
                  : item.visible && sharing
                    ? S.consentVisible
                    : item.reviewPermission
                      ? S.consentHidden
                      : S.consentNeverShared}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Privacy commitment */}
      <div style={{
        display: 'flex', gap: tokens.space.sm, alignItems: 'flex-start',
        padding: tokens.space.md,
        background: 'rgba(61,155,107,0.05)',
        borderRadius: tokens.radius.md,
        border: '1px solid rgba(61,155,107,0.12)',
      }}>
        <Icon icon="ph:lock-simple" width={16} color={tokens.color.statusMaintain} style={{ marginTop: '2px', flexShrink: 0 }} />
        <span style={{ fontSize: tokens.font.sm, color: tokens.color.textSecondary, lineHeight: '1.5' }}>
          {S.consentPrivacyNote}
        </span>
      </div>
    </PageWrapper>
  );
}
