# CoachDashboard

Component: `avail-prototype/src/pages/coach/CoachDashboard.tsx`
Supporting components: `components/coach/PrioritySection.tsx`, `AthleteListRow.tsx`, `AthleteCard.tsx`

> Written retroactively to document the implemented Milestone 1 prototype behaviour.

## Purpose

The coach's pre-session squad scan. Must be readable in under a minute before training: who needs attention, who is stable, who hasn't checked in, and whose context is unavailable.

## User

Coach only. Receives a list of `CoachAthleteView` built by `buildCoachView()` — never raw athlete data.

## Content

- Heading "Squad Context" with today's date.
- **Required framing banner** (always visible): "Today's physiological context — use alongside your professional judgement."
- Four metric cards: Requires Attention / Stable Context / Pending Check-In / Context Unavailable counts.
- Squad Load Overview: horizontal bar per athlete (0–100), coloured by direction; striped placeholder for pending check-in; neutral track for unavailable.
- Squad list with card/list view toggle:
  - **List view**: collapsible priority sections (attention → pending → stable → unavailable, unavailable collapsed by default), each row showing avatar, name, position, score, direction badge, confidence badge, trend badge.
  - **Card view**: grid of athlete cards with score ring, direction, confidence, and trend.

## Behaviour

- Selecting any athlete opens CoachAthleteDetail.
- Consent-off athletes appear as "Context unavailable" with muted styling and no explanation of why.
- Priority grouping is derived in `buildCoachView` (low confidence, Recovery Focus direction, or declining + low score → Requires Attention).

## Privacy and Copy Constraints

- Only `CoachAthleteView` fields may be rendered.
- Confidence must be visible wherever a Load Score is shown.
- The dashboard surfaces context, never instructions; no alerting or alarmist styling.

## Acceptance Criteria

- Framing banner present.
- Consent-off athlete shows "Context unavailable" with no reason.
- Counts match the section contents.
- Both view modes work and are keyboard-accessible.
