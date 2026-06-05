import type {
  AthleteProfile,
  LoadScore,
  ConsentState,
  CoachAthleteView,
  PriorityState,
} from '../types';

// Privacy firewall — the ONLY place CoachAthleteView is constructed.
// Coach components must never receive AthleteProfile or raw LoadScore directly.
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
