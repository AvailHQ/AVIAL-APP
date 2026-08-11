# ConsentSettings

Component: `avail-prototype/src/pages/athlete/ConsentSettings.tsx`

> Written retroactively to document the implemented Milestone 1 prototype behaviour.

## Purpose

Gives the athlete direct control over whether their context is shared with coaching staff. Consent is a first-class product feature, not a settings afterthought.

## User

Athlete only.

## Content

- Heading "Your data, your control" with subheading "You decide what's shared with your coaching staff."
- Main toggle: "Share context with coaching staff", with state-dependent description of exactly what is visible.
- Independent review permissions for raw check-in data and cycle data. Both default to off.
- A separate data-input control for opting into wearable data and selecting Apple Watch, Garmin, WHOOP, Oura Ring, Fitbit, Polar, or another device.
- "What your coach can see" list reflects high-level context sharing and the two granular review permissions; personal reflections are always private.
- Privacy commitment note explains that only explicitly authorised data can be reviewed by coaching staff.
- Transient "Settings saved" confirmation on change.

## Behaviour

- Toggling updates `ConsentState` immediately; the coach view reflects the change in the same session.
- Turning sharing off causes the coach to see "Context unavailable" with no reason given.
- Raw check-in and cycle review permissions are stored independently from high-level context sharing.
- Wearable input settings are stored per athlete and do not grant coach access to raw wearable data.

## Privacy and Copy Constraints

- Copy must preserve athlete agency; never "refused", "non-compliant", or guilt-inducing framing.
- The off-state description tells the athlete what the coach will see ("Context unavailable") and that they can change it any time.

## Acceptance Criteria

- Toggle change is reflected in the coach dashboard within the same session.
- Raw check-in and cycle review permissions can be changed independently and persist in app state.
- Raw values remain outside `CoachAthleteView`; a future authorised data-access path must enforce these permissions server-side.
