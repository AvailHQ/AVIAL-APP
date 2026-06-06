export type Direction = 'Maintain' | 'Reduce' | 'Recovery Focus' | 'Increase';
export type Confidence = 'High' | 'Medium' | 'Low' | 'Very Low';
export type Trend = 'Improving' | 'Stable' | 'Declining';
export type PriorityState =
  | 'Requires Attention'
  | 'Stable Context'
  | 'Pending Check-In'
  | 'Context Unavailable';

export type CycleUpdate = 'PeriodStarted' | 'PeriodEnded' | 'NothingToReport';

export type DifferentDecisionReason =
  | 'Tactical preparation'
  | 'Match preparation'
  | 'Athlete historically responds well'
  | 'Limited squad availability'
  | 'Coaching judgement'
  | 'Return-to-play progression'
  | 'Other';

export interface ContextDimension {
  label: string;
  arrow: 'up' | 'down' | 'stable';
  detail: string;
}

export interface TrendPoint {
  day: string;
  score: number | null;
}

export interface LoadScore {
  value: number;
  label: string;
  direction: Direction;
  confidence: Confidence;
  trend: Trend;
  trendHistory: TrendPoint[];
  contextSummary: string;
  dimensions: ContextDimension[];
}

export interface AthleteProfile {
  id: string;
  name: string;
  sport: string;
  position?: string;
  avatarInitials: string;
  avatarCrop?: AvatarCrop;
  cycleRegularity: 'Regular' | 'Irregular' | 'Unknown' | 'HormonalContraception';
  trainingBackground: 'Recreational' | 'Club' | 'Semi-Pro' | 'Elite';
  sleepVariability: 'Low' | 'Moderate' | 'High';
  onboardingComplete: boolean;
}

export interface DailyCheckIn {
  date: string;
  sleepQuality: number;
  fatigue: number;
  soreness: number;
  mentalReadiness: number;
  cycleUpdate: CycleUpdate;
}

export interface SessionOutcome {
  sessionId: string;
  date: string;
  outcome: 'Easier' | 'AsExpected' | 'Harder';
  reflections: string[];
  notes?: string;
}

export interface ConsentState {
  athleteId: string;
  sharingWithCoach: boolean;
  lastUpdated: string;
}

// The only shape passed to coach components — privacy firewall enforced in buildCoachView()
export interface CoachAthleteView {
  athleteId: string;
  name: string;
  avatarInitials: string;
  avatarCrop?: AvatarCrop;
  sport: string;
  position?: string;
  loadScore: number | null;
  loadLabel: string | null;
  direction: Direction | null;
  confidence: Confidence | null;
  trend: Trend | null;
  priorityState: PriorityState;
  contextSummary: string | null;
  trendHistory: TrendPoint[];
  dimensions: ContextDimension[];
  contextUnavailable: boolean;
  pendingCheckIn: boolean;
}

export interface AvatarCrop {
  centerX: number;
  centerY: number;
  size: number;
}

export interface DifferentDecision {
  id: string;
  athleteId: string;
  date: string;
  reason: DifferentDecisionReason;
  notes?: string;
  originalDirection: Direction;
}

export type AthleteView =
  | 'onboarding'
  | 'athlete-dashboard'
  | 'daily-checkin'
  | 'session-outcome'
  | 'consent-settings';

export type CoachView =
  | 'coach-dashboard'
  | 'coach-athlete-detail'
  | 'different-decision-flow';

export type AppView = 'role-select' | AthleteView | CoachView;

export interface AppState {
  currentView: AppView;
  activeAthleteId: string;
  selectedCoachAthleteId: string | null;
  athletes: AthleteProfile[];
  checkIns: Record<string, DailyCheckIn[]>;
  loadScores: Record<string, LoadScore>;
  consent: Record<string, ConsentState>;
  sessionOutcomes: Record<string, SessionOutcome[]>;
  differentDecisions: DifferentDecision[];
  checkInSubmittedToday: boolean;
  onboardingComplete: Record<string, boolean>;
}
