# AVAIL Product Boundaries

This file defines hard product boundaries for AVAIL development. These rules apply to frontend, backend, model logic, mock data, tests, seed data, UI copy, API responses, and documentation written for implementation.

## Core Positioning

AVAIL is a physiological context layer for women's sport.

It surfaces structured pre-session context so coaches can make more informed training load decisions.

AVAIL supports interpretation. It does not prescribe training.

The coach remains the final decision-maker. The athlete remains the owner of her data.

## What AVAIL Is

- A contextual load intelligence platform
- A physiological interpretation layer
- A pre-session decision-support system
- A longitudinal contextual adaptation system
- A human-centered athlete context product
- A system that communicates uncertainty honestly

## What AVAIL Is Not

AVAIL must never be built, described, or implemented as:

- A medical device
- A diagnostic tool
- A treatment tool
- A fertility tracker
- A period tracking app
- A symptom tracker
- An injury prediction system
- An injury prevention system
- A performance prediction system
- A coaching automation system
- A replacement for coach judgement
- A replacement for medical staff
- A wearable replacement
- A general wellness app

## Decision Boundary

AVAIL may provide:

- Load Score
- Load Direction
- Confidence level
- Contextual trend summary
- Structured context dimensions
- Session outcome calibration
- Coach different-decision logging

AVAIL must not provide:

- Medical diagnosis
- Medical advice
- Clinical recommendation
- Injury risk prediction
- Injury prevention claims
- Performance forecasts
- Automated training prescriptions
- Direct instructions to coaches
- Direct instructions to athletes to alter training

## Load Score Boundary

The Load Score represents estimated relative load tolerance based on current physiological context.

It is not:

- A performance score
- A health score
- A medical score
- An injury risk score
- A readiness guarantee
- A command to change training

The Load Score must always be paired with confidence or uncertainty context.

## Coach Authority Rule

Coach-facing views must make clear that AVAIL provides context for professional judgement.

Required coach framing:

```text
Today's physiological context - use alongside your professional judgement.
```

Coach actions should use:

```text
I'm making a different decision
```

Do not use:

```text
Override
```

The word "override" implies the system was the source of truth. AVAIL is not the source of coaching authority.

## Athlete Agency Rule

Athletes must feel:

- Understood
- Supported
- Contextually recognized
- In control

Athletes must not feel:

- Monitored
- Judged
- Diagnosed
- Penalized
- Medically tracked
- Scored as good or bad

Athlete-facing experiences must provide value back to the athlete, not just extract data for the coach.

## Welfare Protocol Boundary

Welfare-related patterns, including RED-S-related signals or sustained low mental readiness patterns, must not be treated as diagnosis.

These features may:

- Reduce confidence
- Trigger conservative context handling
- Prompt the athlete with calm signposting
- Route a minimal welfare flag to medical staff only when consent allows

These features must not:

- Notify the coach with the reason
- Show sensitive details to performance staff
- Diagnose RED-S or mental health conditions
- Generate alarming medical alerts
- Prevent normal app usage

## MVP Boundary

The MVP should validate whether structured physiological context improves pre-session coaching decisions and athlete availability awareness.

The MVP does not validate:

- Medical accuracy
- Injury prediction
- Performance prediction
- Advanced personalization
- Biomarker science
- Autonomous AI decision-making

## Implementation Review Questions

Before merging any feature, ask:

- Does this make AVAIL look like a medical, injury prediction, or fertility product?
- Does this imply the system is telling the coach what to do?
- Does this expose more athlete detail than the coach needs?
- Does this communicate uncertainty honestly?
- Does this preserve athlete agency and consent?
- Does this provide athlete value, not only coach value?
- Does this avoid prohibited product claims?
