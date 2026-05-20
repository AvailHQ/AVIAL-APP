# DESIGN.md — Avail Design System & UX Philosophy

# Avail — Design System

Version 1.0 (MVP Prototype)

---

# 1. Core Design Philosophy

Avail should feel like:

- calm
- intelligent
- adaptive
- trustworthy
- emotionally aware
- performance-oriented

The product should NOT feel:

- clinical
- medical
- invasive
- surveillance-heavy
- hyper-optimized
- masculine sports-tech
- over-quantified

---

# 2. Design Identity

## Design Direction

Avail is:

> Calm Performance Intelligence

The UI should communicate:

- contextual awareness
- adaptive understanding
- emotional safety
- operational clarity

The product should feel like:

> “a system that understands context”

not:

> “a system that measures the athlete”

---

# 3. Visual Inspiration

## Primary Inspirations

### Oura

https://ouraring.com

Use for:

- calm health aesthetics
- contextual summaries
- emotional softness
- whitespace
- minimalism

Do NOT copy:

- sleep-centric design
- wellness-heavy language

---

### Linear

https://linear.app

Use for:

- smooth transitions
- subtle professional precision
- clean hierarchy
- interaction quality

---

### Notion

https://notion.so

Use for:

- layered information architecture
- expandable detail
- information calmness

---

### Apple Health

https://apple.com/ios/health

Use for:

- card hierarchy
- typography
- clean information presentation

Do NOT make the app feel medical.

---

### Headspace

https://headspace.com

Use for:

- emotionally supportive tone
- non-judgmental language
- calm interaction feeling

Do NOT make the app feel like therapy software.

---

# 4. Brand Personality

## Emotional Tone

The system should feel:

- composed
- observant
- calm
- adaptive
- quietly intelligent

NOT:

- aggressive
- alarmist
- emotionally manipulative
- robotic
- overconfident

---

# 5. Color System

## Primary Gradient

```css
linear-gradient(45deg, #6FBF9E 0%, #4FA3C7 100%)
```

Meaning:

- calm performance
- adaptive intelligence
- trust
- modern femininity without “pink wellness”

---

## Primary Colors

| Role                 | Color                  |
| -------------------- | ---------------------- |
| Gradient Start       | #6FBF9E                |
| Gradient End         | #4FA3C7                |
| Primary Background   | #F7FAF8                |
| Secondary Background | #F4F8FA                |
| Card Background      | rgba(255,255,255,0.78) |
| Primary Text         | #1B1F23                |
| Secondary Text       | #64707D                |
| Border               | rgba(0,0,0,0.06)       |

---

## Status Colors

### Stable

Soft teal/blue

### Attention

Soft warm amber

### Low Confidence

Muted neutral gray-blue

### Avoid

- harsh red
- warning red
- neon colors
- aggressive sports colors

---

# 6. Typography

## Primary Font

### Preferred

SF Pro Display

### Fallback

Inter

---

## Typography Style

Use:

- readable hierarchy
- generous spacing
- soft contrast
- lightweight modern typography

Avoid:

- futuristic fonts
- cyberpunk fonts
- gym-tech typography
- sci-fi aesthetics

---

# 7. Spacing & Layout

## Design Principle

The interface should breathe.

Whitespace is a core design element.

---

## Layout Style

Use:

- large spacing
- layered cards
- soft grouping
- minimal density

Avoid:

- crowded dashboards
- enterprise-style tables
- sports analytics overload

---

# 8. Card Design

## Card Philosophy

Cards should feel:

- soft
- floating
- contextual
- approachable

---

## Card Style

```css
background: rgba(255, 255, 255, 0.78);
backdrop-filter: blur(18px);
border: 1px solid rgba(255, 255, 255, 0.3);
border-radius: 24px;
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
```

---

# 9. Motion Design

## Motion Philosophy

Motion should feel:

- adaptive
- slow
- contextual
- calm

NOT:

- sporty
- flashy
- gamified
- energetic

---

## Recommended Motion

Use:

- subtle fades
- soft transitions
- gradient breathing
- smooth contextual updates
- gentle hover movement

Avoid:

- bounce animations
- hard transitions
- aggressive movement
- gamified interactions

---

# 10. Athlete Experience Design

## Core Emotional Goal

Athletes should feel:

> “understood”

NOT:

> “tracked”

---

## Athlete Home Screen Philosophy

The athlete home screen should feel:

- calm
- supportive
- adaptive
- reflective

NOT:

- overwhelming
- data-heavy
- quantified

---

## Athlete Home Structure

### Primary Card

```txt
Today's Context
72 — Moderate Load Tolerance

Recovery trend stable
Confidence: Medium
```

---

## CTA Language

GOOD:

- Update Today’s Context
- Reflect on Today’s Session
- Today’s Context Updated

BAD:

- Submit wellness form
- Log symptoms
- Complete monitoring

---

# 11. Coach Dashboard Design

## Core Principle

The dashboard is:

> attention prioritization

NOT:

> raw data visualization

---

## Dashboard Structure

### Requires Attention

Highest priority contextual changes

### Stable Context

Expected patterns

### Pending Check-In

Missing recent contextual updates

---

## Important UX Rule

Avoid:

- red alert systems
- risk-heavy visuals
- “problem athlete” framing

---

# 12. Human-Centered Language Rules

## Core Principle

All outputs must be:

- human-readable
- emotionally understandable
- context-aware

NOT:

- scientific jargon
- physiological terminology
- machine-readable language

---

## Good Language Examples

### Athlete

- “Your recovery trend looks more stable today.”
- “We’re still learning your patterns.”
- “Today’s context suggests slightly reduced recovery capacity.”

### Coach

- “Recent context suggests reduced tolerance to high training load.”
- “Confidence reduced due to limited recent input data.”

---

## Bad Language Examples

- “Autonomic suppression detected”
- “Luteal phase modulation”
- “HRV threshold deviation”
- “Endocrine variability”

---

# 13. Confidence UX

## Important Principle

Confidence is:

- a core product feature
- a trust mechanism
- an uncertainty communication layer

Confidence should NOT feel:

- technical
- mathematical
- robotic

---

## Good Messaging

- “We’re still learning your patterns.”
- “Estimated from recent context history.”
- “Recent patterns appear less stable than usual.”

---

# 14. Privacy & Trust Design

## Important Principle

The UI must constantly reinforce:

- athlete agency
- contextual understanding
- controlled visibility
- trust

---

## Coaches Must NEVER See

- raw cycle logs
- detailed physiological data
- symptom tracking
- private reflections

---

## Athlete Visibility

Athletes should understand:

- when context influenced decisions
- when coaching context modified suggestions
- what information is shared

---

# 15. Design Constraints

## Avoid Making The Product Feel Like:

- a fertility app
- a symptom tracker
- a medical platform
- a surveillance system
- a quantified-self dashboard

---

## Avoid:

- giant charts everywhere
- sports science jargon
- excessive data density
- clinical forms
- “female body as risk object”

---

# 16. MVP UI Priorities

The MVP should prioritize:

1. emotional trust
2. workflow clarity
3. contextual understanding
4. calm intelligence
5. operational simplicity

NOT:

- feature density
- advanced analytics
- sports science complexity
- visual overload

---

# 17. Final Design Goal

Avail should become:

> the first emotionally intelligent performance system aesthetic

The product should feel:

- adaptive
- trustworthy
- composed
- modern
- human-centered
- quietly intelligent

# Data Rules

Use carefully designed mock data only.

The prototype should simulate believable athlete context patterns while remaining entirely fictional.

Mock data may include:

- fictional athlete profiles
- contextual Load Scores
- Confidence states
- recovery trend summaries
- contextual insight cards
- session reflection examples
- coach override examples
- trend history visualizations

The purpose of the data is to demonstrate:

- contextual interpretation
- information hierarchy
- emotional UX
- trust architecture
- adaptive system behavior

The prototype must NOT:

- connect to real APIs
- use real athlete information
- persist user data
- simulate real medical accuracy
- implement backend storage

All prototype data should remain static or locally mocked.

---

# Load Score Rules

The prototype may display contextual estimates such as:

```txt
72 — Moderate Load Tolerance
Confidence: Medium
```

or:

```txt
Today's Context
Recovery trend stable
Confidence: High
```

However:

- the prototype must NOT implement a real scoring model
- the prototype must NOT simulate physiological accuracy
- the prototype must NOT imply medical certainty

All scores are illustrative prototype outputs only.

The purpose is to communicate:

- contextual interpretation
- confidence-aware estimation
- adaptive understanding
- human-readable insights

NOT scientific precision.

---

# Language Rules

## Core Principle

All product language must feel:

- human
- calm
- contextual
- emotionally intelligent
- performance-aware

The product should communicate:

> understanding

not:

> monitoring

---

## Preferred Language Examples

Use phrases such as:

- Today’s Context
- Load Tolerance
- Recovery Trend
- Confidence
- Context Updated
- Estimated from recent patterns
- We’re still learning your patterns
- Additional coaching context was applied
- Recovery stability appears lower today
- Recent context suggests reduced tolerance to high load

---

## Avoid Language Such As

- diagnosis
- symptoms
- endocrine suppression
- hormonal risk
- injury prevention
- injury prediction
- performance prediction
- medical recommendation
- hormonal tracking
- cycle monitoring
- raw phase labels
- “high-risk athlete”
- “non-compliant athlete”

The product must never feel:

- clinical
- invasive
- judgmental
- surveillance-oriented

---

# Coach Visibility Rules

## Coaches CAN See

- Load Score
- Confidence
- Direction
- contextual summaries
- recovery trend summaries
- squad priority buckets
- session context interpretation
- override workflow
- generalized contextual insights

---

## Coaches MUST NOT See

- raw cycle logs
- raw period data
- symptom tracking
- detailed physiological records
- private athlete reflections
- sensitive health notes
- mental health journaling
- detailed contextual history beyond intended interpretation layer

---

# Athlete Visibility Rules

## Athletes CAN See

- personal context overview
- confidence state
- contextual trend summaries
- consent settings
- visibility settings
- what data is shared
- when context influenced session planning
- generalized coaching context categories
- personal recovery trends

---

## Athletes MUST NOT See

- private staff notes
- tactical planning details
- coach-only operational reasoning
- other athlete data
- comparative squad ranking

---

# Visual Direction

Follow `DESIGN.md`.

The prototype should feel:

- calm
- adaptive
- modern
- trustworthy
- emotionally intelligent
- human-centered
- premium
- performance-oriented

The visual system should communicate:

> calm intelligence

rather than:

> aggressive optimization

---

## The Prototype Must NOT Feel

- clinical
- hospital-like
- invasive
- cold
- surveillance-heavy
- data-obsessed
- over-quantified
- like a menstrual tracking app
- like a generic fitness dashboard

---

# Prototype Constraints

Do NOT add features outside the prototype scope.

The purpose is to validate:

- workflow clarity
- emotional trust
- contextual understanding
- interaction hierarchy
- product positioning

NOT technical completeness.

---

## Do NOT Build

- authentication systems
- real onboarding persistence
- backend APIs
- production databases
- real consent storage
- real notifications
- wearable integrations
- payment systems
- admin portals
- AI chat systems
- medical alert systems
- injury analytics
- training planning software
- full athlete management systems
- real scoring logic
- machine learning systems

---

# Success Criteria

The prototype succeeds if a viewer can clearly understand:

1. What Avail is
2. Why athletes would engage with it
3. Why coaches would use it
4. What Load Score and Confidence represent
5. How contextual interpretation works
6. How athlete trust is protected
7. How sensitive information is abstracted
8. How the product avoids invasive tracking feelings
9. How the system feels adaptive rather than judgmental
10. How contextual awareness influences training interpretation

---

# Final Instruction For CC

Build only a frontend interaction prototype.

Prioritize:

- workflow clarity
- emotional trust
- contextual interpretation
- calm intelligence
- visual quality
- human-readable UX
- interaction smoothness
- clickable flow quality

Do NOT prioritize:

- technical infrastructure
- backend architecture
- production implementation
- real physiological modeling
- real AI systems
- database completeness
- advanced analytics
- engineering optimization
