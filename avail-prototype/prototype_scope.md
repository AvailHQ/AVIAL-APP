# AVAIL Prototype Scope

## Goal

Build a pure frontend React prototype for AVAIL: Athlete Variability and Availability Intelligence Layer.

The prototype should demonstrate the core athlete and coach experience using mock data only. It should feel like a calm physiological context product for women's sport, not a medical app, fertility tracker, generic wellness app, or high-pressure analytics dashboard.

## Prototype Type

- Pure frontend only
- React-based implementation
- Mock data only
- No backend integration
- No real authentication
- No database
- No real model service
- No wearable API integration
- No production security implementation

The prototype may simulate state transitions locally, but all data should be hardcoded or client-side mock state.

## Product Positioning

AVAIL provides physiological context before training decisions are made.

The product supports interpretation. It does not prescribe training.

The coach remains the final decision-maker. The athlete remains the owner of their data.

## Non-Goals

Do not build:

- A medical dashboard
- A fertility tracker
- A period tracking app
- A symptom tracker
- An injury prediction tool
- A performance prediction tool
- A generic wellness tracker
- A marketing landing page
- A full coaching operations platform

The first screen should be the usable prototype experience, not a sales page.

## Required Prototype Screens

### Athlete Experience

Include:

- Athlete onboarding
- Daily check-in
- Athlete dashboard
- Session outcome capture
- Consent settings

Athlete onboarding should feel like a short guided conversation, not a clinical form.

Daily check-in should feel lightweight and completable in under 60 seconds.

The athlete dashboard should give the athlete value back through context, trends, and clear feedback. It should not feel like the athlete is being monitored.

### Coach Experience

Include:

- Coach team dashboard
- Athlete contextual detail view
- Coach different-decision logging
- Pending check-in / unavailable states

The coach dashboard should show structured context only:

- Load Score
- Load Direction
- Confidence
- Trend summary
- Priority state
- Different-decision logging

The coach dashboard must not expose sensitive raw athlete data.

## Suggested Navigation

The prototype can use simple tabs or segmented navigation for:

- Athlete
- Coach
- Consent

Navigation should make it easy to inspect the full product loop without requiring login.

## Core Product Loop To Demonstrate

The prototype should make this loop visible:

1. Athlete completes onboarding.
2. Athlete submits daily check-in.
3. System updates contextual interpretation.
4. Athlete sees calm contextual feedback.
5. Coach sees structured pre-session context.
6. Coach can make a different decision and log why.
7. Athlete completes session outcome capture.
8. Outcome becomes a calibration signal.

## Required Mock Data

Use a small squad of mock athletes.

Include varied states:

- Stable context
- Reduced load tolerance
- Low confidence
- Pending check-in
- Data unavailable due to consent
- Recent trend improving
- Recent trend declining

Mock athletes should have realistic names and sport context, but no real athlete identities.

## Language Rules

Use calm contextual language.

The product provides physiological context, not recommendations, diagnoses, or predictions.

### Preferred Language

Use:

- Physiological context
- Today's context
- Load tolerance estimate
- Context suggests
- Confidence
- Trend
- Recent pattern
- Still learning your patterns
- Use alongside your professional judgement
- Different decision

### Avoid / Never Use

Do not use:

- Injury prediction
- Injury prevention
- Prevents injury
- Reduces injury risk
- Diagnosis
- Medical advice
- Clinical recommendation
- Fertility tracking
- Symptom tracker
- Performance prediction
- Recommendation
- Prescribes training
- Guarantees availability
- Ensures performance

### Coach Dashboard Required Framing

The coach dashboard should include persistent framing:

```text
Today's physiological context - use alongside your professional judgement.
```

Load direction labels should be phrased as:

```text
Context suggests: Maintain
Context suggests: Reduce
Context suggests: Recovery focus
Context suggests: Increase
```

Do not label these as recommendations.

The coach action should be:

```text
I'm making a different decision
```

Do not label this action as "Override".

## Privacy And Consent Rules

Consent is structural, not decorative.

Athlete data sharing is controlled by the athlete. Coach views must respect consent state.

### Coach Must Never See

- Raw cycle logs
- Period start/end dates
- Raw symptom history
- Private athlete reflections
- Diagnosed conditions
- RED-S details
- Mental health pattern details
- Ethnicity
- Neurodivergent profile
- Detailed contraception status
- Sensitive onboarding answers

### Coach May See

- Load Score
- Direction
- Confidence level
- High-level trend summary
- Structured priority state
- Whether data is unavailable

### Opt-Out State

If an athlete has not consented or has withdrawn consent, the coach dashboard should show a neutral unavailable state.

Use language like:

```text
Context unavailable
```

Do not show:

- Non-compliant
- Refused
- Did not consent
- Missing because athlete opted out

## Confidence Rules

Confidence is a core feature, not decoration.

Represent confidence clearly as:

- High
- Medium
- Low
- Very Low, if needed

Confidence should visually matter. Low confidence should be obvious without being alarming.

Low confidence can be caused by:

- Missing check-ins
- Limited history
- Estimated data
- Conflicting signals
- Consent-limited data

Never make the system look more certain than it is.

## Athlete Experience Tone

The athlete should feel:

- Understood
- Supported
- Contextually recognized
- In control

The athlete should not feel:

- Monitored
- Judged
- Diagnosed
- Medically tracked
- Scored as good or bad

Good example copy:

```text
Your recent recovery trend looks steadier today.
Today's context suggests slightly reduced load tolerance.
We're still learning your patterns.
Your input helped update today's context.
```

Bad example copy:

```text
Autonomic suppression detected.
Luteal phase modulation.
High injury risk.
You should reduce training.
Medical alert.
```

## Coach Experience Tone

The coach experience should be operational, calm, and fast to scan.

It should support:

- Morning review
- Pre-session planning
- Identifying athletes needing attention
- Logging a different decision

It should not feel like the system is telling the coach what to do.

## Visual Design Direction

The visual style should be:

- Calm
- Light
- Precise
- Human
- Premium but restrained
- Softly clinical without feeling medical

Avoid:

- Dark trading-desk dashboards
- Aggressive red warning states
- Overly decorative marketing sections
- Purple/blue SaaS gradients dominating the page
- Heavy black text
- Dense medical tables
- Alarmist alert styling

# Background System

## Main App Background

Use a soft vertical gradient for the main application background:

```css
background: linear-gradient(
  180deg,
  #F7FAF8 0%,
  #F4F8FA 100%
);
```

This keeps the top slightly warmer and the bottom slightly cooler, while staying aligned with the primary gradient direction.

For the page-level background, add a very subtle gradient glow:

```css
background:
  radial-gradient(
    circle at top left,
    rgba(111,191,158,0.08),
    transparent 40%
  ),
  radial-gradient(
    circle at bottom right,
    rgba(79,163,199,0.08),
    transparent 40%
  ),
  linear-gradient(
    180deg,
    #F7FAF8 0%,
    #F4F8FA 100%
  );
```

## Cards

Cards should use a soft translucent surface:

```css
background: rgba(255,255,255,0.72);
backdrop-filter: blur(18px);
```

Use a light glass-style border:

```css
border: 1px solid rgba(255,255,255,0.4);
```

Use a restrained shadow:

```css
box-shadow:
  0 4px 20px rgba(0,0,0,0.04),
  0 1px 2px rgba(0,0,0,0.03);
```

## Text Color

Avoid pure black text.

Do not use:

```css
#000000
```

Recommended text colors:

```css
/* Primary text */
#1B1F23

/* Secondary text */
#64707D
```

The product should feel like a calm contextual environment, not a high-contrast data dashboard.
