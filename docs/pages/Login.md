# Login (Role Selection)

Component: `avail-prototype/src/pages/Login.tsx`

> Written retroactively to document the implemented Milestone 1 prototype behaviour.

## Purpose

Entry screen for the prototype. Lets a demo user enter the app as a selected athlete or as the coach. No real authentication exists in Milestone 1.

## Users

Both roles (pre-selection).

## Content

- AVAIL wordmark and tagline ("Physiological context for women's sport").
- Athlete card: an athlete selector (dropdown list of the mock squad with avatars, sport, and position) and an "Athlete View" button.
- Coach card: a short description and a "Coach View" button.

## Behaviour

- Selecting an athlete and pressing "Athlete View" routes to that athlete's dashboard, or to onboarding if the athlete has not completed onboarding.
- Pressing "Coach View" routes to the coach dashboard.
- Athlete selector is keyboard-focusable with visible focus states.

## Privacy and Copy Constraints

- All user-visible strings come from `strings.ts` (`S.roleSelect*`, `S.roleAthlete`, `S.roleCoach`).
- The screen makes no medical, diagnostic, or predictive claims.

## Acceptance Criteria

- Both role paths are reachable.
- Athlete selection persists into the athlete session.
- No raw athlete data beyond name, sport, position, and avatar appears on this screen.
