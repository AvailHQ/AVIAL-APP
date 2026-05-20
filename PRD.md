AVAIL — Pilot MVP PRD
Version 1.0 (Draft)

1. Product Overview
   Product Name

Avail — Athlete Variability and Availability Intelligence Layer

One-Line Description

Avail is a physiological context platform for women’s sport that provides coaches with structured pre-session load intelligence based on individual athlete variability.

Current Stage

Pilot MVP

Core Objective

Validate whether structured physiological context improves pre-session load decisions and athlete availability in women’s sport environments.

2. Product Philosophy
   What Avail IS
   A contextual load intelligence platform
   A physiological interpretation layer
   A pre-session decision-support system
   A longitudinal contextual adaptation system
   A human-centered adaptive intelligence system
   What Avail IS NOT
   Not a medical device
   Not a fertility tracker
   Not a symptom tracker
   Not an injury prediction system
   Not a performance prediction AI
   Not a full coaching operations platform
   Not a wearable replacement
   Core Product Philosophy

Avail does not attempt to replace coach judgement.

Instead, it surfaces physiological context before training decisions are made.

The system is designed to:

support interpretation
improve contextual awareness
adapt over time
communicate uncertainty honestly
Emotional Design Principle

The product should feel like:

“a system that gradually understands the athlete”

not:

“a system that monitors the athlete”

3. MVP Positioning
   Product Positioning

Avail is not an all-in-one coaching platform.

Instead, it acts as a contextual interpretation layer that integrates into existing training decision workflows.

Key Strategic Position

The product contextualises training decisions.

It does not prescribe training.

Core Differentiation

The system focuses on:

contextual interpretation
physiological variability
adaptive understanding
uncertainty-aware estimation

rather than:

generic readiness scoring
raw biometrics
optimization claims 4. Core MVP Goal
MVP Validation Goal

Validate whether contextual physiological interpretation provides operational value in pre-session coaching decisions.

MVP DOES NOT Attempt To Validate
injury prediction
medical accuracy
performance prediction
advanced personalization
biomarker science
AI autonomy 5. User Roles
Athlete
Athlete Can
complete onboarding
submit daily check-ins
manage consent settings
view personal context trends
view contextual summaries
submit session reflections
understand how context influenced decisions
Athlete Cannot
access coach dashboards
access other athlete data
access tactical planning
access private staff notes
Coach
Coach Can
view contextual estimates
view Load Scores
view confidence levels
view trend summaries
view priority flags
override contextual suggestions
log operational reasoning
Coach Cannot
access raw cycle logs
access raw symptom history
access private athlete reflections
access sensitive physiological detail
access athlete consent controls 6. Athlete Experience Philosophy
Core Emotional Goal

Athletes should feel:

understood
supported
contextually recognized

not:

monitored
evaluated
medically tracked
Product Tone

The system should communicate using:

calm intelligence
human-readable interpretation
contextual language

rather than:

technical terminology
medical language
scientific jargon
Good Example Language
“Your recent recovery trend looks more stable today.”
“Today’s context suggests slightly reduced recovery capacity.”
“We’re still learning your patterns.”
Bad Example Language
“Autonomic suppression detected.”
“Luteal phase modulation.”
“HRV threshold deviation.” 7. Athlete Daily Experience Loop
Step 1 — Notification

Example:

“Today’s context update is ready.”

Step 2 — Open App

Athlete sees:

current contextual overview
load tolerance estimate
confidence state
trend interpretation
Step 3 — Daily Check-In

CTA:

“Update Today’s Context”

not:

“Submit wellness form”

Step 4 — Immediate Feedback

System updates contextual interpretation immediately.

Example:

“Recovery trend improving compared to recent baseline.”

Step 5 — Reinforcement

Athlete should understand:

their input matters
the system adapts over time
coaching context can change based on their input 8. Athlete Onboarding
Goal

Initialize athlete baseline context state.

MVP Inputs
cycle regularity
hormonal contraception
training background
injury history
sleep variability
optional wearable connections
Output
baseline contextual profile
initial confidence state
contextual initialization 9. Daily Check-In System
Core Inputs
Input Scale
Sleep Quality 1–5
Fatigue 1–5
Soreness 1–5
Mental Readiness 1–5
Period Started/Ended Binary
Core Design Principle

Check-ins must:

take under 60 seconds
feel lightweight
avoid medical framing
avoid emotional burden 10. Relative Load Tolerance Definition
Definition

Relative Load Tolerance represents the estimated amount of training stress an athlete is likely to tolerate on a given day based on their current physiological context.

The system does not predict performance or injury.

Instead, it provides contextual interpretation before training decisions are made.

11. Load Score Structure
    Primary Output
    Load Score

Example:

72 — Moderate Load Tolerance
Confidence

Example:

Confidence: Medium
Direction Layer

Possible outputs:

Increase
Maintain
Reduce
Recovery Focus
Secondary Context Layer

Expandable contextual dimensions.

Examples:

Recovery Capacity ↓
Fatigue Sensitivity ↑
Sleep Stability →
Context Impact: Moderate 12. Confidence Architecture
Confidence Is A Core Feature

Confidence represents estimation reliability.

It is not decorative UI.

Confidence Sources
Data Completeness
check-ins
missing fields
wearable sync
Historical Depth
onboarding duration
contextual history
completed cycles
Pattern Stability
variance
contextual consistency
conflicting signals
Estimation Reliance
fallback estimation usage
inferred contextual states
Confidence Levels
High
Medium
Low
Very Low 13. Persistent Athlete Context State
Core Principle

The system maintains a continuously updated athlete contextual state.

The Load Score is generated from this evolving state rather than isolated daily inputs.

State Variables
Rolling Fatigue

Accumulated recent fatigue context.

Recovery Trend

Short-term recovery direction.

Context Stability

Pattern consistency and volatility.

Confidence State

Current reliability of contextual interpretation.

Daily Update Flow
daily check-in
↓
update athlete context state
↓
generate contextual estimate
↓
produce load score + confidence 14. Personalization Architecture
Stage 1 — MVP

Population-informed baseline model.

All athletes use shared weighting structures.

Stage 2 — Adaptive Baselines

System learns athlete-specific normal ranges.

Stage 3 — Personal Weighting

Weights adapt gradually with sufficient historical data.

Stage 4 — Longitudinal Pattern Intelligence

Future personalized contextual modeling.

15. Missing Data & Estimation Logic
    Core Principle

The system may estimate contextual state from historical patterns when recent data is incomplete.

Estimation Sources
wearable signals
rolling averages
historical contextual trends
previous session outcomes
baseline state
Important Rule

Confidence decreases as estimation reliance increases.

Example
68 — Moderate Load Tolerance
Confidence: Low
Estimated from recent patterns 16. Human-Centered Interpretation Layer
Core Principle

All outputs must be translated into:

human-readable context
calm interpretation
understandable language

rather than:

raw physiological metrics
technical terminology
scientific jargon 17. Coach Dashboard Structure
Priority Buckets
Requires Attention

Examples:

significant contextual deviation
repeated hard sessions
low confidence estimates
contextual instability
Stable Context

Athletes within expected contextual range.

Pending Check-In

Athletes missing recent input.

18. Coach Workflow
    Primary Workflow Timing

Dashboard optimized for:

pre-session review
next-session planning
morning operational review
Coach Authority Principle

The coach remains the final decision-maker.

The system provides contextual interpretation only.

19. Coach Override System
    Override Definition

An override occurs when a coach intentionally chooses a different training direction than the contextual suggestion.

Override Inputs
Required

Override reason.

Optional

Alternative training action.

Example Reasons
tactical preparation
match preparation
athlete historically responds well
limited squad availability
coaching judgement
return-to-play progression
Core Principle

Overrides are stored as:

additional operational context

not:

model failure

20. Athlete Visibility & Agency
    Core Principle

Athletes should understand when their contextual input influenced training decisions.

Athlete Can See
contextual influence summaries
that an override occurred
general override category
Athlete Cannot See
private staff notes
tactical detail
confidential operational reasoning 21. Session Outcome Capture
Purpose

Capture calibration signals between:

contextual estimate
actual training experience
Primary Input

One-tap reflection:

Easier than expected
As expected
Harder than expected
Optional Reflection

If “Harder than expected”:

physical fatigue
recovery not fully there
soreness
mental exhaustion
session intensity
other
Core Principle

This is:

contextual reflection

not:

performance evaluation

22. Training Session Layer
    Core Principle

The system contextualises planned training load.

It does not prescribe training.

MVP Session Types
Recovery
Technical
Moderate Load
High Load
Match / Competition
Gym / Strength
Planned Load Intensity
Low
Moderate
High
Very High
Suggested Interpretation Examples
“Today’s context suggests reduced tolerance to repeated high-intensity work.”
“Consider monitoring recovery response more closely today.” 23. Wearable Integration Strategy
Core Principle

Wearables are optional enhancement layers.

They are not required system dependencies in MVP.

MVP Requirement

The platform must remain fully operational using athlete-reported context alone.

Future Signals
HRV
resting HR
sleep duration
skin temperature deviation
recovery metrics
strain/load metrics
Future Integration Targets
WHOOP
Oura
Garmin
Apple Health
Catapult
Kitman Labs 24. Data Architecture
Core Philosophy

The platform stores:

events
contextual states
interpretations
calibration signals
consent states

rather than isolated daily records.

Core Data Domains
Athlete Identity Layer

Authentication and ownership.

Physiological Input Layer

Contextual input history.

Athlete Context State Layer

Persistent contextual interpretation state.

Load Score History

Generated contextual estimates.

Coach Decision Layer

Overrides and operational context.

Session Outcome Layer

Calibration signals.

Consent Layer

Dynamic sharing permissions.

25. Consent Architecture
    Core Principles
    athlete owns data
    consent is dynamic
    consent can be withdrawn anytime
    coaches never see raw cycle data
    all access is logged
26. Failure States & Uncertainty Handling
    Core Principle

The system must communicate uncertainty honestly.

Failure State Examples
missing data
contextual instability
contradictory signals
prolonged inactivity
repeated calibration mismatch
Important Philosophy

The system should never simulate precision when uncertainty is high.

27. System Learning Loop
    Athlete context input
    ↓
    Contextual state update
    ↓
    Load tolerance estimate
    ↓
    Coach interpretation
    ↓
    Optional override
    ↓
    Training session
    ↓
    Session outcome reflection
    ↓
    Calibration signal
    ↓
    State adaptation
28. Technical Architecture
    Mobile App
    React Native
    Expo
    TypeScript
    Coach Dashboard
    Next.js
    Tailwind CSS
    shadcn/ui
    Backend
    Node.js API layer
    Database
    PostgreSQL
    Model Service
    Python FastAPI
29. Future Roadmap
    Phase 2
    wearable integrations
    adaptive baselines
    contextual trend learning
    Phase 3
    personalized weighting
    longitudinal adaptation modeling
    contextual intelligence evolution
    Phase 4
    advanced pattern recognition
    predictive calibration
    federation-level contextual insights
30. Final MVP Principle

Avail is not attempting to build:

autonomous coaching AI
medical performance prediction
universal physiological truth

Instead, the MVP is designed to build:

a human-centered contextual interpretation system that gradually adapts to athlete-specific patterns over time.
