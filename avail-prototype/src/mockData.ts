import type {
  AthleteProfile,
  LoadScore,
  ConsentState,
  CoachAthleteView,
  PriorityState,
} from './types';

export const ATHLETES: AthleteProfile[] = [
  {
    id: 'maya-chen',
    name: 'Maya Chen',
    sport: 'Football',
    position: 'Midfielder',
    avatarInitials: 'MC',
    cycleRegularity: 'Regular',
    trainingBackground: 'Elite',
    sleepVariability: 'Low',
    onboardingComplete: true,
  },
  {
    id: 'sofia-rodriguez',
    name: 'Sofia Rodriguez',
    sport: 'Football',
    position: 'Forward',
    avatarInitials: 'SR',
    cycleRegularity: 'Irregular',
    trainingBackground: 'Elite',
    sleepVariability: 'Moderate',
    onboardingComplete: true,
  },
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    sport: 'Football',
    position: 'Defender',
    avatarInitials: 'PS',
    cycleRegularity: 'Regular',
    trainingBackground: 'Semi-Pro',
    sleepVariability: 'Moderate',
    onboardingComplete: true,
  },
  {
    id: 'emma-thompson',
    name: 'Emma Thompson',
    sport: 'Football',
    position: 'Goalkeeper',
    avatarInitials: 'ET',
    cycleRegularity: 'Regular',
    trainingBackground: 'Elite',
    sleepVariability: 'Low',
    onboardingComplete: true,
  },
  {
    id: 'aisha-okafor',
    name: 'Aisha Okafor',
    sport: 'Football',
    position: 'Midfielder',
    avatarInitials: 'AO',
    cycleRegularity: 'Regular',
    trainingBackground: 'Elite',
    sleepVariability: 'Low',
    onboardingComplete: true,
  },
  {
    id: 'zoe-mitchell',
    name: 'Zoe Mitchell',
    sport: 'Football',
    position: 'Defender',
    avatarInitials: 'ZM',
    cycleRegularity: 'HormonalContraception',
    trainingBackground: 'Elite',
    sleepVariability: 'Low',
    onboardingComplete: true,
  },
  {
    id: 'chloe-williams',
    name: 'Chloe Williams',
    sport: 'Football',
    position: 'Forward',
    avatarInitials: 'CW',
    cycleRegularity: 'Regular',
    trainingBackground: 'Semi-Pro',
    sleepVariability: 'High',
    onboardingComplete: true,
  },
];

export const LOAD_SCORES: Record<string, LoadScore> = {
  'maya-chen': {
    value: 78,
    label: 'Good Load Tolerance',
    direction: 'Maintain',
    confidence: 'High',
    trend: 'Stable',
    trendHistory: [
      { day: 'Mon', score: 75 },
      { day: 'Tue', score: 77 },
      { day: 'Wed', score: 74 },
      { day: 'Thu', score: 76 },
      { day: 'Fri', score: 78 },
      { day: 'Sat', score: 79 },
      { day: 'Sun', score: 78 },
    ],
    contextSummary: "Your recent context looks stable. Today's pattern is consistent with your established baseline.",
    dimensions: [
      { label: 'Recovery Capacity', arrow: 'stable', detail: 'Within your normal range' },
      { label: 'Fatigue Sensitivity', arrow: 'stable', detail: 'No notable shift from baseline' },
      { label: 'Sleep Stability', arrow: 'up', detail: 'Slightly better than recent average' },
      { label: 'Context Impact', arrow: 'stable', detail: 'Minimal variation today' },
    ],
  },
  'sofia-rodriguez': {
    value: 52,
    label: 'Reduced Load Tolerance',
    direction: 'Reduce',
    confidence: 'Medium',
    trend: 'Declining',
    trendHistory: [
      { day: 'Mon', score: 71 },
      { day: 'Tue', score: 67 },
      { day: 'Wed', score: 63 },
      { day: 'Thu', score: 59 },
      { day: 'Fri', score: 55 },
      { day: 'Sat', score: 53 },
      { day: 'Sun', score: 52 },
    ],
    contextSummary: "Today's context suggests reduced load tolerance compared to recent sessions. A gradual reduction in training intensity may be worth considering.",
    dimensions: [
      { label: 'Recovery Capacity', arrow: 'down', detail: 'Below recent baseline' },
      { label: 'Fatigue Sensitivity', arrow: 'up', detail: 'Higher than typical' },
      { label: 'Sleep Stability', arrow: 'down', detail: 'Disrupted over past few days' },
      { label: 'Context Impact', arrow: 'down', detail: 'Moderate contextual strain' },
    ],
  },
  'priya-sharma': {
    value: 64,
    label: 'Moderate Load Tolerance',
    direction: 'Maintain',
    confidence: 'Low',
    trend: 'Stable',
    trendHistory: [
      { day: 'Mon', score: 66 },
      { day: 'Tue', score: null },
      { day: 'Wed', score: null },
      { day: 'Thu', score: 63 },
      { day: 'Fri', score: null },
      { day: 'Sat', score: 64 },
      { day: 'Sun', score: 64 },
    ],
    contextSummary: "Estimated from recent patterns. Confidence is lower due to missed check-ins this week. We are working with less data than usual.",
    dimensions: [
      { label: 'Recovery Capacity', arrow: 'stable', detail: 'Estimated from recent history' },
      { label: 'Fatigue Sensitivity', arrow: 'stable', detail: 'Based on available data' },
      { label: 'Sleep Stability', arrow: 'stable', detail: 'Insufficient recent data' },
      { label: 'Context Impact', arrow: 'stable', detail: 'Low confidence estimate' },
    ],
  },
  'emma-thompson': {
    value: 71,
    label: 'Good Load Tolerance',
    direction: 'Maintain',
    confidence: 'Medium',
    trend: 'Stable',
    trendHistory: [
      { day: 'Mon', score: 68 },
      { day: 'Tue', score: 70 },
      { day: 'Wed', score: 72 },
      { day: 'Thu', score: 71 },
      { day: 'Fri', score: 70 },
      { day: 'Sat', score: 71 },
      { day: 'Sun', score: null },
    ],
    contextSummary: "Context is awaiting check-in. Score shown is based on recent patterns.",
    dimensions: [
      { label: 'Recovery Capacity', arrow: 'stable', detail: 'Based on recent sessions' },
      { label: 'Fatigue Sensitivity', arrow: 'stable', detail: 'No notable shift' },
      { label: 'Sleep Stability', arrow: 'stable', detail: 'Consistent recent pattern' },
      { label: 'Context Impact', arrow: 'stable', detail: "Awaiting today's input" },
    ],
  },
  'aisha-okafor': {
    value: 0,
    label: '',
    direction: 'Maintain',
    confidence: 'High',
    trend: 'Stable',
    trendHistory: [],
    contextSummary: '',
    dimensions: [],
  },
  'zoe-mitchell': {
    value: 74,
    label: 'Good Load Tolerance',
    direction: 'Maintain',
    confidence: 'Medium',
    trend: 'Improving',
    trendHistory: [
      { day: 'Mon', score: 62 },
      { day: 'Tue', score: 65 },
      { day: 'Wed', score: 67 },
      { day: 'Thu', score: 69 },
      { day: 'Fri', score: 71 },
      { day: 'Sat', score: 73 },
      { day: 'Sun', score: 74 },
    ],
    contextSummary: "Recovery trend has been improving over the past week. Today's context looks positive compared to recent baseline.",
    dimensions: [
      { label: 'Recovery Capacity', arrow: 'up', detail: 'Improving week-on-week' },
      { label: 'Fatigue Sensitivity', arrow: 'down', detail: 'Lower than recent peak' },
      { label: 'Sleep Stability', arrow: 'up', detail: 'Consistently better this week' },
      { label: 'Context Impact', arrow: 'up', detail: 'Positive contextual shift' },
    ],
  },
  'chloe-williams': {
    value: 44,
    label: 'Reduced Load Tolerance',
    direction: 'Recovery Focus',
    confidence: 'Medium',
    trend: 'Declining',
    trendHistory: [
      { day: 'Mon', score: 63 },
      { day: 'Tue', score: 59 },
      { day: 'Wed', score: 55 },
      { day: 'Thu', score: 51 },
      { day: 'Fri', score: 48 },
      { day: 'Sat', score: 46 },
      { day: 'Sun', score: 44 },
    ],
    contextSummary: "Today's context suggests prioritising recovery. There has been a sustained decline over the past week that warrants attention.",
    dimensions: [
      { label: 'Recovery Capacity', arrow: 'down', detail: 'Significantly reduced' },
      { label: 'Fatigue Sensitivity', arrow: 'up', detail: 'Elevated and increasing' },
      { label: 'Sleep Stability', arrow: 'down', detail: 'Disrupted pattern this week' },
      { label: 'Context Impact', arrow: 'down', detail: 'High contextual load' },
    ],
  },
};

export const INITIAL_CONSENT: Record<string, ConsentState> = {
  'maya-chen':      { athleteId: 'maya-chen',      sharingWithCoach: true,  lastUpdated: '2026-05-19' },
  'sofia-rodriguez':{ athleteId: 'sofia-rodriguez', sharingWithCoach: true,  lastUpdated: '2026-05-19' },
  'priya-sharma':   { athleteId: 'priya-sharma',   sharingWithCoach: true,  lastUpdated: '2026-05-18' },
  'emma-thompson':  { athleteId: 'emma-thompson',  sharingWithCoach: true,  lastUpdated: '2026-05-19' },
  'aisha-okafor':   { athleteId: 'aisha-okafor',   sharingWithCoach: false, lastUpdated: '2026-05-17' },
  'zoe-mitchell':   { athleteId: 'zoe-mitchell',   sharingWithCoach: true,  lastUpdated: '2026-05-19' },
  'chloe-williams': { athleteId: 'chloe-williams', sharingWithCoach: true,  lastUpdated: '2026-05-19' },
};

// Privacy firewall — the ONLY place CoachAthleteView is constructed.
// Coach components never receive AthleteProfile or raw LoadScore.
export function buildCoachView(
  athleteId: string,
  consent: Record<string, ConsentState>,
  loadScores: Record<string, LoadScore>,
  athletes: AthleteProfile[],
): CoachAthleteView {
  const athlete = athletes.find(a => a.id === athleteId)!;
  const consentState = consent[athleteId];
  const score = loadScores[athleteId];
  const contextUnavailable = !consentState?.sharingWithCoach;
  const pendingCheckIn = athleteId === 'emma-thompson';

  if (contextUnavailable) {
    return {
      athleteId,
      name: athlete.name,
      avatarInitials: athlete.avatarInitials,
      sport: athlete.sport,
      position: athlete.position,
      loadScore: null,
      loadLabel: null,
      direction: null,
      confidence: null,
      trend: null,
      priorityState: 'Context Unavailable',
      contextSummary: null,
      trendHistory: [],
      dimensions: [],
      contextUnavailable: true,
      pendingCheckIn: false,
    };
  }

  let priorityState: PriorityState = 'Stable Context';
  if (pendingCheckIn) {
    priorityState = 'Pending Check-In';
  } else if (
    score.confidence === 'Low' ||
    score.confidence === 'Very Low' ||
    score.direction === 'Recovery Focus' ||
    (score.trend === 'Declining' && score.value < 55)
  ) {
    priorityState = 'Requires Attention';
  }

  return {
    athleteId,
    name: athlete.name,
    avatarInitials: athlete.avatarInitials,
    sport: athlete.sport,
    position: athlete.position,
    loadScore: score.value,
    loadLabel: score.label,
    direction: score.direction,
    confidence: score.confidence,
    trend: score.trend,
    priorityState,
    contextSummary: score.contextSummary,
    trendHistory: score.trendHistory,
    dimensions: score.dimensions,
    contextUnavailable: false,
    pendingCheckIn,
  };
}

// Ordered for coach dashboard display
export const COACH_DASHBOARD_ORDER = [
  'chloe-williams',
  'sofia-rodriguez',
  'priya-sharma',
  'emma-thompson',
  'maya-chen',
  'zoe-mitchell',
  'aisha-okafor',
];
