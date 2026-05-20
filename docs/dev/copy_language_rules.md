# AVAIL Copy And Language Rules

This file defines the language rules for AVAIL product copy, UI labels, API messages, mock data, tests, comments, documentation, and external-facing implementation artifacts.

## Core Language Principle

AVAIL uses calm contextual language.

The product provides physiological context for human decision-making.

It does not diagnose, predict, prescribe, or guarantee outcomes.

## Preferred Vocabulary

Use these terms:

- Physiological context
- Today's context
- Contextual interpretation
- Load Score
- Load tolerance estimate
- Context suggests
- Confidence
- Confidence level
- Recent pattern
- Trend
- Structured context
- Pre-session context
- Calibration signal
- Session outcome
- Different decision
- Use alongside your professional judgement
- Still learning your patterns

## Banned Vocabulary

Do not use these terms in UI, mock data, tests, comments, code identifiers, docs, or API messages unless quoting this banned list:

- Injury prediction
- Injury prevention
- Prevents injury
- Reduces injury risk
- Injury risk score
- Diagnosis
- Diagnoses
- Medical advice
- Clinical recommendation
- Medical recommendation
- Treatment
- Treats
- Fertility tracking
- Fertility tracker
- Period tracker
- Symptom tracker
- Performance prediction
- Performance forecast
- Predicts performance
- Recommendation
- Recommended training
- Prescribes training
- Guarantees availability
- Ensures performance
- Eliminates overtraining
- Override
- Non-compliant
- Refused

## Coach-Facing Copy

Required persistent coach framing:

```text
Today's physiological context - use alongside your professional judgement.
```

Direction labels must use:

```text
Context suggests: Maintain
Context suggests: Reduce
Context suggests: Recovery focus
Context suggests: Increase
```

Do not use:

```text
Recommendation: Reduce
Recommended action
Training prescription
You should reduce
```

Coach different-decision action:

```text
I'm making a different decision
```

Do not use:

```text
Override
Override recommendation
Reject recommendation
```

## Athlete-Facing Copy

Athlete copy should feel supportive, lightweight, and non-clinical.

Good examples:

```text
Your recent recovery trend looks steadier today.
Today's context suggests slightly reduced load tolerance.
We're still learning your patterns.
Your input helped update today's context.
Update Today's Context
Log session outcome
```

Avoid:

```text
Submit wellness form
Symptoms detected
Medical alert
High injury risk
You should change training
Cycle abnormality detected
```

## Consent Copy

Consent copy must preserve athlete agency without exposing athlete choices to the coach.

Athlete-facing copy may explain controls clearly:

```text
You control what coaching staff can see.
You can change sharing at any time.
Your raw cycle information is never shown to your coach.
```

Coach-facing unavailable copy must be neutral:

```text
Context unavailable
Context unavailable for coaching view.
```

Do not write:

```text
Athlete did not consent.
Athlete refused sharing.
Athlete opted out.
Athlete is non-compliant.
```

## Confidence Copy

Confidence is an estimation reliability signal.

Use:

```text
Confidence: High
Confidence: Medium
Confidence: Low
Confidence: Very Low
Estimated from recent patterns
Limited recent data
Still learning this athlete's patterns
```

Do not imply certainty when confidence is low.

Avoid:

```text
Accurate prediction
Confirmed state
Reliable diagnosis
Guaranteed result
```

## Welfare Copy

Welfare-related copy must be calm and non-diagnostic.

Good athlete-facing pattern:

```text
Your energy and recovery patterns have been lower than usual for a while. It might be worth a conversation with your medical team.
```

Good mental readiness pattern:

```text
We've noticed your readiness scores have been low for a few days. How are you doing beyond training?
```

Do not use:

```text
RED-S detected
Mental health alert
Clinical warning
You may have a disorder
Coach has been notified
```

## Code Identifier Rules

Code identifiers should follow product language rules.

Prefer:

```text
direction
loadDirection
contextSuggestion
differentDecision
confidenceLevel
contextUnavailable
coachView
```

Avoid:

```text
recommendation
injuryRisk
diagnosis
medicalAlert
override
nonCompliant
```

If a third-party API or library forces a problematic term, isolate it behind a local AVAIL-safe abstraction.

## Search Audit

Before merging, search the changed files for banned terms.

Suggested checks:

```text
injury
prediction
prevention
diagnosis
medical advice
clinical
fertility
symptom
recommendation
override
non-compliant
refused
```

Some terms may appear in product-boundary documentation or banned-word lists. They should not appear in user-facing product implementation.

## Review Questions

Before merging copy or UI changes, ask:

- Does the copy imply diagnosis, prediction, prevention, or prescription?
- Does coach copy preserve professional judgement?
- Does athlete copy feel supportive rather than monitored?
- Does consent copy avoid exposing opt-out status to coaches?
- Does low confidence copy communicate uncertainty clearly?
- Are banned words absent from user-facing implementation?
