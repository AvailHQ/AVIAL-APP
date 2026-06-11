# CoachAthleteDetail

Component: `avail-prototype/src/pages/coach/CoachAthleteDetail.tsx`

> Written retroactively to document the implemented Milestone 1 prototype behaviour.

## Purpose

Single-athlete context view for the coach: today's Load Score with confidence, the 7-day pattern, and the athlete's different-decision history.

## User

Coach only. Receives one `CoachAthleteView` plus that athlete's `DifferentDecision` records.

## Content

- **Required framing banner**: "Today's physiological context — use alongside your professional judgement."
- Athlete header (avatar, name, sport · position).
- If context unavailable: a single neutral card — "Context unavailable" with "This athlete has chosen not to share their physiological context with coaching staff at this time." Nothing else renders.
- Otherwise:
  - Score card: `LoadScoreRing`, direction badge, confidence badge, trend badge, context summary, context dimensions panel.
  - Pending check-in note when today's check-in is missing ("Score shown is based on recent patterns.").
  - 7-day pattern card (`TrendChart`).
  - Previous different decisions list (or empty-state copy).
  - CTA: "I'm making a different decision".

## Behaviour

- CTA opens DifferentDecisionFlow for this athlete.
- Back returns to the coach dashboard.

## Privacy and Copy Constraints

- No raw check-in, cycle, onboarding, or welfare data — `CoachAthleteView` only.
- The unavailable state must not hint at a reason ("chosen not to share … at this time" is the approved phrasing).
- The CTA must never be labelled "Override".

## Acceptance Criteria

- Consent-off athlete sees only the unavailable card.
- Confidence appears beside the score.
- Different-decision history renders for this athlete only.
