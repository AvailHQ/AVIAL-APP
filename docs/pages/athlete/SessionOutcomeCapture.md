# SessionOutcomeCapture

Component: `avail-prototype/src/pages/athlete/SessionOutcomeCapture.tsx`

> Written retroactively to document the implemented Milestone 1 prototype behaviour.

## Purpose

Post-session reflection that captures whether the session felt easier, as expected, or harder than the pre-session context suggested. This is the calibration signal for future model work.

## User

Athlete only. Reflections are private to the athlete.

## Content

- Heading "How did today's session feel?" with today's suggested direction shown as a badge.
- Three outcome options: "Easier than expected" / "About as expected" / "Harder than expected".
- If "Harder" is selected: optional reflection tags (physical fatigue, recovery, soreness, mental exhaustion, session intensity, other).
- Submit button: "Submit reflection".
- Confirmation state: "Reflection saved." with "Your reflection helps Avail understand your patterns better over time."

## Behaviour

- Submit stores a `SessionOutcome` with a generated session id and returns via "Done".
- Submit is disabled until an outcome is selected.

## Privacy and Copy Constraints

- Outcomes and reflection tags must never appear in coach views.
- Framing is reflective, not evaluative — the athlete is not scored or judged.

## Acceptance Criteria

- All three outcomes selectable; tags only appear for "Harder".
- Submission stores the outcome and shows the confirmation state.
- No outcome data is present on `CoachAthleteView`.
