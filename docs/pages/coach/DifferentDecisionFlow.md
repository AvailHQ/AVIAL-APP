# DifferentDecisionFlow

Component: `avail-prototype/src/pages/coach/DifferentDecisionFlow.tsx`

> Written retroactively to document the implemented Milestone 1 prototype behaviour.

## Purpose

Lets a coach log that they are choosing a different approach than today's context suggested — without judgement and without the system framing it as overriding or non-compliance. The log is a calibration and accountability signal, not a control mechanism.

## User

Coach only. Receives one `CoachAthleteView`.

## Content

- Heading "I'm making a different decision" with today's suggested direction shown as a badge.
- Reason chips (single-select): Tactical preparation / Match preparation / Athlete historically responds well / Limited squad availability / Coaching judgement / Return-to-play progression / Other.
- Optional free-text operational notes.
- "Confirm" button (disabled until a reason is selected).
- Success state: "Decision logged." with "This has been recorded alongside today's contextual estimate." and a return button.

## Behaviour

- Submitting stores a `DifferentDecision` (generated id, athlete id, date, reason, notes, original direction) and shows the success state.
- The decision then appears in CoachAthleteDetail's history.

## Privacy and Copy Constraints

- Never use "override" or any compliance framing.
- The flow records the coach's reasoning; it does not warn, score, or push back.
- Notes placeholder steers toward operational context, not athlete judgement.

## Acceptance Criteria

- Confirm disabled without a reason.
- Logged decision appears in the athlete's detail view in the same session.
- Original suggested direction is stored with the decision.
