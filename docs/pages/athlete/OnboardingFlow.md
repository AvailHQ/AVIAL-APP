# OnboardingFlow

Component: `avail-prototype/src/pages/athlete/OnboardingFlow.tsx`
Step components: `avail-prototype/src/components/athlete/onboarding/`

> Written retroactively to document the implemented Milestone 1 prototype behaviour.

## Purpose

First-run flow that collects the minimum baseline an athlete needs for an initial context estimate, while establishing the product's tone: "a system that gradually understands the athlete".

## User

Athlete only. All onboarding answers are private to the athlete.

## Content — 5 Steps

1. **Welcome** (`OnboardingWelcome`) — "Hi, I'm Avail." introduction.
2. **Cycle** (`OnboardingCycle`) — cycle regularity (Regular / Irregular / Unknown / Hormonal contraception), with a "Prefer not to say" skip and the privacy note "Your cycle information is never shared with your coach or anyone else."
3. **Training** (`OnboardingTraining`) — training level and physical history question.
4. **Sleep** (`OnboardingSleep`) — average hours and consistency.
5. **Confirm** (`OnboardingConfirm`) — summary of what Avail will use, then "Start using Avail".

A progress bar and "Step N of 5" label appear throughout; Back navigates one step (or to role select from step 1).

## Behaviour

- Completing the flow marks the athlete as onboarded and routes to the athlete dashboard.
- Each step stores partial `OnboardingData` in local state only (Milestone 1).

## Privacy and Copy Constraints

- Cycle and physical-history answers must never appear in any coach view.
- Every sensitive question offers a skip ("Prefer not to say").
- No fertility, symptom, or medical framing anywhere in the flow.

## Acceptance Criteria

- Flow can be completed end to end and lands on the dashboard.
- Skipping sensitive questions still allows completion.
- Onboarding answers are absent from `CoachAthleteView`.
