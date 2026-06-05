export type CycleOption = 'Regular' | 'Irregular' | 'HormonalContraception' | 'PreferNotToSay';
export type TrainingLevel = 'Recreational' | 'Club' | 'Semi-Pro' | 'Elite';
export type SleepConsistency = 'Pretty consistent' | 'Varies a lot' | 'Hard to say';

export interface OnboardingData {
  cycleRegularity?: CycleOption;
  trainingLevel?: TrainingLevel;
  injuryHistory?: boolean;
  sleepQuality?: number;
  sleepConsistency?: SleepConsistency;
}
