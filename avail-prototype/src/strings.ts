// All user-visible strings reviewed for language compliance per prototype_scope.md.
// Permitted: physiological context, today's context, load tolerance estimate, confidence,
//            trend, context suggests, use alongside professional judgement, different decision.
// Prohibited: injury prediction/prevention, recommendation, medical advice, fertility tracking,
//             symptom tracker, performance prediction, prescribes training, override.

export const S = {
  // App
  appName: "Avail",
  appTagline: "Physiological context for women's sport",

  // Role select
  roleSelectHeading: "AVAIL",
  roleSelectSubheading: "Physiological context for women's sport",
  roleAthlete: "Athlete View",
  roleCoach: "Coach View",
  roleAthleteDesc: "View your personal physiological context",
  roleCoachDesc: "View your squad's pre-session context",

  // Coach framing (required persistent text — must appear on all coach screens)
  coachFraming: "Today's physiological context — use alongside your professional judgement.",

  // Directions
  directionLabel: (d: string | null) => d ? `Context suggests: ${d}` : "Context unavailable",

  // Check-in
  checkInHeading: "Update Today's Context",
  checkInSubheading: "Takes about 30 seconds",
  checkInSubmit: "Update context",
  checkInSleepLabel: "Sleep quality",
  checkInFatigueLabel: "Energy level",
  checkInSorenessLabel: "Body feeling",
  checkInMentalLabel: "Mental readiness",
  checkInCycleLabel: "Any cycle changes today?",
  checkInCycleNothing: "Nothing to report",
  checkInCyclePeriodStarted: "Period started",
  checkInCyclePeriodEnded: "Period ended",
  checkInBannerSuccess: "Your input helped update today's context.",

  // Dashboard athlete
  dashboardCheckInCta: "Update Today's Context",
  dashboardSessionCta: "Log session outcome",
  dashboardConsentLink: "Manage your data settings",
  dashboardContextDimensionsExpand: "View context dimensions",
  dashboardContextDimensionsCollapse: "Hide context dimensions",
  dashboardTrendLabel: "7-day pattern",

  // Session outcome
  sessionHeading: "How did today's session feel?",
  sessionEasier: "Easier than expected",
  sessionAsExpected: "About as expected",
  sessionHarder: "Harder than expected",
  sessionReflectionHeading: "What contributed to that? (optional)",
  sessionReflections: [
    "Physical fatigue",
    "Recovery not fully there",
    "Soreness",
    "Mental exhaustion",
    "Session intensity",
    "Other",
  ],
  sessionSubmit: "Submit reflection",
  sessionConfirmation: "Your reflection helps Avail understand your patterns better over time.",
  sessionDone: "Done",

  // Consent
  consentHeading: "Your data, your control",
  consentToggleLabel: "Share context with coaching staff",
  consentOnDescription: "Your Load Score, direction, and confidence level are visible to your coaching staff. Your check-in details, cycle logs, and personal reflections are never shared.",
  consentOffDescription: "Your coaching staff will see \"Context unavailable\" for your profile. You can change this at any time.",
  consentPrivacyNote: "Avail will never share your raw check-in data, cycle logs, or personal reflections with anyone — including your coaching staff.",
  consentSaved: "Settings saved",

  // Coach dashboard
  coachDashboardHeading: "Squad Context",
  coachPriorityAttention: "Requires Attention",
  coachPriorityPending: "Pending Check-In",
  coachPriorityStable: "Stable Context",
  coachPriorityUnavailable: "Context Unavailable",

  // Coach athlete detail
  coachDetailBack: "Squad Context",
  coachUnavailableMessage: "This athlete has chosen not to share their physiological context with coaching staff at this time.",
  coachPendingCheckInNote: "Today's context is pending check-in. Score shown is based on recent patterns.",
  coachPreviousDecisions: "Previous different decisions",
  coachNoPreviousDecisions: "No different decisions logged for this athlete.",

  // Different decision flow
  differentDecisionHeading: "I'm making a different decision",
  differentDecisionReasonLabel: "What's your reason?",
  differentDecisionNotesLabel: "Add any operational context (optional)",
  differentDecisionNotesPlaceholder: "e.g. Tactical requirements, player feedback, squad constraints…",
  differentDecisionConfirm: "Confirm",
  differentDecisionSuccessHeading: "Decision logged.",
  differentDecisionSuccessBody: "This has been recorded alongside today's contextual estimate.",
  differentDecisionReturnButton: (name: string) => `Return to ${name}`,

  // Athlete dashboard
  checkInAgain: "Update context again",

  // Consent settings
  consentSubheading: "You decide what's shared with your coaching staff.",
  consentVisibilityHeading: "What your coach can see",

  // Session outcome
  sessionReflectionSaved: "Reflection saved.",

  // Onboarding inline labels
  onboardingTrainingLevelLabel: "Training level",
  onboardingPhysicalHistoryLabel: "Any physical history we should know about?",
  onboardingPhysicalHistoryNone: "None significant",
  onboardingPhysicalHistorySome: "Yes, some history",
  onboardingSleepHoursLabel: "Average hours per night",
  onboardingSleepConsistencyLabel: "How consistent is it?",

  // Coach athlete detail
  coachTrendLabel: "7-day pattern",

  // Context unavailable
  contextUnavailable: "Context unavailable",

  // Confidence labels
  confidence: (c: string | null) => c ? `Confidence: ${c}` : "Confidence unavailable",

  // Trend labels
  trend: (t: string | null) => t ?? "—",

  // Onboarding
  onboardingProgress: (step: number, total: number) => `Step ${step} of ${total}`,
  onboardingWelcomeHeading: "Hi, I'm Avail.",
  onboardingWelcomeBody: "I help provide physiological context before training. The more you check in, the better I understand your patterns.",
  onboardingWelcomeCta: "Let's get started",
  onboardingCycleHeading: "Tell us a little about your cycle",
  onboardingCycleBody: "This helps build a more accurate starting point. You can change this at any time.",
  onboardingTrainingHeading: "A bit about your training background",
  onboardingSleepHeading: "How's your sleep generally?",
  onboardingSleepBody: "Sleep is one of the most important inputs. Even a rough sense helps.",
  onboardingConfirmHeading: "You're ready to start.",
  onboardingConfirmBody: "Here's what Avail will use to build your starting context.",
  onboardingPrivacyNote: "Your cycle information is never shared with your coach or anyone else.",
  onboardingComplete: "Start using Avail",
  onboardingBack: "Back",
  onboardingNext: "Continue",
  onboardingSkip: "Prefer not to say",

  // Shared navigation chrome
  back: "Back",
  switchRole: "Switch role",

  // Greetings
  greetingMorning: "Good morning",
  greetingAfternoon: "Good afternoon",
  greetingEvening: "Good evening",

  // Shared context labels
  todaysContextSuggested: "Today's context suggested:",
  pendingCheckInBadge: "Pending check-in",
  pendingShort: "Pending",

  // Login section labels
  loginAthleteSection: "Athlete",
  loginCoachSection: "Coach",

  // Check-in slider scale labels
  checkInSleepLow: "Difficult",
  checkInSleepHigh: "Restful",
  checkInFatigueLow: "Very tired",
  checkInFatigueHigh: "Full of energy",
  checkInSorenessLow: "Very sore",
  checkInSorenessHigh: "Feeling good",
  checkInMentalLow: "Low",
  checkInMentalHigh: "High",

  // Consent visibility list
  consentItemLoadScore: "Load Score",
  consentItemDirection: "Load direction",
  consentItemConfidence: "Confidence level",
  consentItemTrend: "High-level trend",
  consentItemCheckIns: "Check-in details",
  consentItemCycleLogs: "Cycle logs",
  consentItemReflections: "Personal reflections",
  consentVisible: "Visible",
  consentHidden: "Hidden",
  consentNeverShared: "Never shared",

  // Coach dashboard chart and table
  squadOverviewHeading: "Squad Load Overview",
  squadSectionLabel: "Squad",
  legendMaintain: "Maintain",
  legendReduce: "Reduce",
  legendRecovery: "Recovery",
  colAthlete: "Athlete",
  colScore: "Score",
  colContext: "Context",
  colConfidence: "Confidence",
  colTrend: "Trend",

  // Onboarding option labels
  onboardingCycleRegular: "Generally regular",
  onboardingCycleIrregular: "Varies quite a bit",
  onboardingCycleHC: "I use hormonal contraception",
  onboardingTrainingRecreational: "Recreational",
  onboardingTrainingClub: "Club level",
  onboardingTrainingSemiPro: "Semi-professional",
  onboardingTrainingElite: "Professional / Elite",
  onboardingSleepHoursOptions: ["Less than 6", "6–7 hours", "7–8 hours", "8+ hours"],
  onboardingWelcomePills: ["Physiological context", "Your data stays yours", "Adapts over time"],
  onboardingConfirmCycleLabel: "Cycle context",
  onboardingConfirmSleepLabel: "Sleep pattern",
  onboardingConfirmHCDisplay: "Hormonal contraception",
  onboardingConfirmNotShared: "Not shared",

  // Demo info bar
  demoBarPrototype: "Prototype",
  demoBarRoleSelect: "← Role Select",
  demoBarViewingAs: "Viewing as:",
} as const;
