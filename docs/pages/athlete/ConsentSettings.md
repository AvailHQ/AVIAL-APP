# ConsentSettings

Component: `avail-prototype/src/pages/athlete/ConsentSettings.tsx`

> Written retroactively to document the implemented Milestone 1 prototype behaviour.

## Purpose

Gives the athlete direct control over whether their context is shared with coaching staff. Consent is a first-class product feature, not a settings afterthought.

## User

Athlete only.

## Content

- Heading "Your data, your control" with subheading "You decide what's shared with your coaching staff."
- Single toggle: "Share context with coaching staff", with state-dependent description of exactly what is and is not visible.
- "What your coach can see" list: Load Score, direction, confidence, high-level trend (visible when sharing); check-in details, cycle logs, personal reflections (always "Never shared").
- Privacy commitment note: raw data is never shared with anyone, including coaching staff.
- Transient "Settings saved" confirmation on change.

## Behaviour

- Toggling updates `ConsentState` immediately; the coach view reflects the change in the same session.
- Turning sharing off causes the coach to see "Context unavailable" with no reason given.

## Privacy and Copy Constraints

- Copy must preserve athlete agency; never "refused", "non-compliant", or guilt-inducing framing.
- The off-state description tells the athlete what the coach will see ("Context unavailable") and that they can change it any time.

## Acceptance Criteria

- Toggle change is reflected in the coach dashboard within the same session.
- The never-shared list is accurate to the implemented `buildCoachView` firewall.
