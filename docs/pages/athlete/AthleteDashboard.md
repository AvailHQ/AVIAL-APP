# AthleteDashboard

Component: `avail-prototype/src/pages/athlete/AthleteDashboard.tsx`

> Written retroactively to document the implemented Milestone 1 prototype behaviour.

## Purpose

The athlete's home screen. Shows the athlete their own full physiological context for today: Load Score, direction, confidence, trend, contextual summary, and context dimensions.

## User

Athlete only. Receives the raw `AthleteProfile` and `LoadScore` — this is the athlete's own data, so no coach firewall applies.

## Content

- Time-of-day greeting with first name and today's date.
- Post check-in confirmation banner (shown after submitting a daily check-in).
- Main context card: `LoadScoreRing` (score + label), `DirectionBadge` ("Context suggests: …"), `ConfidenceBadge`, `TrendBadge`, contextual summary text, expandable `ContextDimensionsPanel`.
- 7-day trend card (`TrendChart` with trend badge).
- Primary action: "Update Today's Context" (changes to "Update context again" after submission).
- Secondary action: "Log session outcome".
- Footer link: "Manage your data settings" (consent settings).

## Behaviour

- Check-in CTA navigates to DailyCheckIn; session CTA to SessionOutcomeCapture; settings link to ConsentSettings.
- Back button returns to role selection.

## Privacy and Copy Constraints

- Confidence must always be displayed alongside the Load Score.
- Direction copy uses "Context suggests: Maintain / Reduce / Recovery Focus / Increase".
- Tone is supportive and calm; the screen must never instruct the athlete to change training.

## Acceptance Criteria

- Score, direction, confidence, and trend all render for an athlete with data.
- Check-in banner appears only after a same-session check-in.
- All three navigation actions work.
