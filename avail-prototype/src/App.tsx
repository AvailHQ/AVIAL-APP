import { useState, useMemo } from 'react';
import type { AppState, AppView, DailyCheckIn as DailyCheckInData, ConsentState, SessionOutcome, DifferentDecision } from './types';
import { ATHLETES, LOAD_SCORES, INITIAL_CONSENT, COACH_DASHBOARD_ORDER, PENDING_CHECK_IN_IDS } from './mockData';
import { buildCoachView } from './utils/coachView';
import { tokens } from './tokens';
import { S } from './strings';

import Login from './pages/Login';
import OnboardingFlow from './pages/athlete/OnboardingFlow';
import AthleteDashboard from './pages/athlete/AthleteDashboard';
import DailyCheckIn from './pages/athlete/DailyCheckIn';
import SessionOutcomeCapture from './pages/athlete/SessionOutcomeCapture';
import ConsentSettings from './pages/athlete/ConsentSettings';
import CoachDashboard from './pages/coach/CoachDashboard';
import CoachAthleteDetail from './pages/coach/CoachAthleteDetail';
import DifferentDecisionFlow from './pages/coach/DifferentDecisionFlow';

const initialState: AppState = {
  currentView: 'role-select',
  activeAthleteId: 'maya-chen',
  selectedCoachAthleteId: null,
  athletes: ATHLETES,
  checkIns: {},
  loadScores: LOAD_SCORES,
  consent: INITIAL_CONSENT,
  sessionOutcomes: {},
  differentDecisions: [],
  checkInSubmittedToday: false,
  onboardingComplete: {
    'maya-chen': true,
    'sofia-rodriguez': true,
    'priya-sharma': true,
    'emma-thompson': true,
    'aisha-okafor': true,
    'zoe-mitchell': true,
    'chloe-williams': true,
  },
};

export default function App() {
  const [state, setState] = useState<AppState>(initialState);

  const navigate = (view: AppView) => setState(s => ({ ...s, currentView: view }));

  const handleAthleteLogin = (athleteId: string) => {
    const hasOnboarded = state.onboardingComplete[athleteId] ?? false;
    setState(s => ({
      ...s,
      activeAthleteId: athleteId,
      checkInSubmittedToday: false,
      currentView: hasOnboarded ? 'athlete-dashboard' : 'onboarding',
    }));
  };

  const handleOnboardingComplete = () => {
    setState(s => ({
      ...s,
      onboardingComplete: { ...s.onboardingComplete, [s.activeAthleteId]: true },
      currentView: 'athlete-dashboard',
    }));
  };

  const handleCheckInSubmit = (data: DailyCheckInData) => {
    setState(s => ({
      ...s,
      checkIns: {
        ...s.checkIns,
        [s.activeAthleteId]: [...(s.checkIns[s.activeAthleteId] ?? []), data],
      },
      checkInSubmittedToday: true,
      currentView: 'athlete-dashboard',
    }));
  };

  const handleSessionOutcomeSubmit = (outcome: SessionOutcome) => {
    setState(s => ({
      ...s,
      sessionOutcomes: {
        ...s.sessionOutcomes,
        [s.activeAthleteId]: [...(s.sessionOutcomes[s.activeAthleteId] ?? []), outcome],
      },
    }));
  };

  const handleConsentUpdate = (newConsent: ConsentState) => {
    setState(s => ({
      ...s,
      consent: { ...s.consent, [s.activeAthleteId]: newConsent },
    }));
  };

  const handleCoachSelectAthlete = (athleteId: string) => {
    setState(s => ({ ...s, selectedCoachAthleteId: athleteId, currentView: 'coach-athlete-detail' }));
  };

  const handleDifferentDecisionOpen = () => {
    navigate('different-decision-flow');
  };

  const handleDifferentDecisionSubmit = (decision: DifferentDecision) => {
    setState(s => ({ ...s, differentDecisions: [...s.differentDecisions, decision] }));
  };

  const appStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: tokens.color.bgRadial,
    fontFamily: tokens.font.family,
    color: tokens.color.textPrimary,
  };

  const { currentView, activeAthleteId, selectedCoachAthleteId } = state;

  const activeAthlete = state.athletes.find(a => a.id === activeAthleteId)!;
  const activeLoadScore = state.loadScores[activeAthleteId];
  const activeConsent = state.consent[activeAthleteId];

  const coachViews = useMemo(
    () => COACH_DASHBOARD_ORDER.map(id =>
      buildCoachView(id, state.consent, state.loadScores, state.athletes, PENDING_CHECK_IN_IDS)
    ),
    [state.consent, state.loadScores, state.athletes]
  );

  const selectedCoachView = useMemo(
    () => selectedCoachAthleteId
      ? buildCoachView(selectedCoachAthleteId, state.consent, state.loadScores, state.athletes, PENDING_CHECK_IN_IDS)
      : null,
    [selectedCoachAthleteId, state.consent, state.loadScores, state.athletes]
  );

  const athleteDecisions = selectedCoachAthleteId
    ? state.differentDecisions.filter(d => d.athleteId === selectedCoachAthleteId)
    : [];

  return (
    <div style={appStyle}>
      {currentView === 'role-select' && (
        <Login
          athletes={state.athletes}
          activeAthleteId={activeAthleteId}
          onAthleteSelect={handleAthleteLogin}
          onCoach={() => navigate('coach-dashboard')}
        />
      )}

      {currentView === 'onboarding' && (
        <OnboardingFlow
          athleteName={activeAthlete.name}
          onComplete={handleOnboardingComplete}
          onBack={() => navigate('role-select')}
        />
      )}

      {currentView === 'athlete-dashboard' && (
        <AthleteDashboard
          athlete={activeAthlete}
          loadScore={activeLoadScore}
          checkInSubmittedToday={state.checkInSubmittedToday}
          onCheckIn={() => navigate('daily-checkin')}
          onSessionOutcome={() => navigate('session-outcome')}
          onConsentSettings={() => navigate('consent-settings')}
          onBack={() => navigate('role-select')}
        />
      )}

      {currentView === 'daily-checkin' && (
        <DailyCheckIn
          athleteName={activeAthlete.name}
          onSubmit={handleCheckInSubmit}
          onBack={() => navigate('athlete-dashboard')}
        />
      )}

      {currentView === 'session-outcome' && (
        <SessionOutcomeCapture
          athleteName={activeAthlete.name}
          loadScore={activeLoadScore}
          onSubmit={handleSessionOutcomeSubmit}
          onBack={() => navigate('athlete-dashboard')}
        />
      )}

      {currentView === 'consent-settings' && (
        <ConsentSettings
          athleteName={activeAthlete.name}
          consentState={activeConsent}
          onUpdate={handleConsentUpdate}
          onBack={() => navigate('athlete-dashboard')}
        />
      )}

      {currentView === 'coach-dashboard' && (
        <CoachDashboard
          athletes={coachViews}
          onSelectAthlete={handleCoachSelectAthlete}
          onBack={() => navigate('role-select')}
        />
      )}

      {currentView === 'coach-athlete-detail' && selectedCoachView && (
        <CoachAthleteDetail
          athlete={selectedCoachView}
          differentDecisions={athleteDecisions}
          onDifferentDecision={handleDifferentDecisionOpen}
          onBack={() => navigate('coach-dashboard')}
        />
      )}

      {currentView === 'different-decision-flow' && selectedCoachView && (
        <DifferentDecisionFlow
          athlete={selectedCoachView}
          onSubmit={handleDifferentDecisionSubmit}
          onBack={() => navigate('coach-athlete-detail')}
        />
      )}

      {/* Demo info bar */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(27,31,35,0.85)',
        backdropFilter: 'blur(12px)',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        zIndex: 1000,
      }}>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {S.appName} Prototype
        </span>
        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px' }}>·</span>
        <button
          onClick={() => navigate('role-select')}
          style={{
            background: 'none', border: 'none', padding: '2px 8px',
            color: 'rgba(255,255,255,0.55)', fontSize: '11px', cursor: 'pointer',
            borderRadius: '4px',
          }}
        >
          ← Role Select
        </button>
        {(currentView === 'athlete-dashboard' || currentView === 'daily-checkin' || currentView === 'session-outcome' || currentView === 'consent-settings') && (
          <>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px' }}>·</span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>
              Viewing as: {activeAthlete.name}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
