# DailyCheckIn

Component: `avail-prototype/src/pages/athlete/DailyCheckIn.tsx`

> Written retroactively to document the implemented Milestone 1 prototype behaviour.

## Purpose

A ~30-second daily input flow where the athlete reports how they feel. This is the primary data habit loop of the product.

## User

Athlete only. Check-in answers are private to the athlete and are never shown to coaches.

## Content

- Heading "Update Today's Context" with "Takes about 30 seconds" subheading.
- Four 1–5 sliders: sleep quality, energy level, body feeling, mental readiness.
- Cycle update chips: "Nothing to report" (default) / "Period started" / "Period ended".
- Submit button: "Update context".

## Behaviour

- Submitting stores a `DailyCheckIn` record for today and returns to the athlete dashboard with a success banner.
- Back button returns to the dashboard without saving.

## Privacy and Copy Constraints

- Slider answers and cycle updates are raw athlete data — they must never reach a coach view or `CoachAthleteView`.
- Cycle question is framed neutrally ("Any cycle changes today?"); no fertility or symptom framing.
- Labels are calm and non-clinical (e.g. "Body feeling", not soreness scales with medical framing).

## Acceptance Criteria

- Check-in can be completed in under 30 seconds with defaults.
- Submission updates app state and the dashboard banner appears.
- No check-in field is present on any coach-facing object.
