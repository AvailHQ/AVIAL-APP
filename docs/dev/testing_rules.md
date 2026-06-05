# AVAIL Testing Rules

Version 1.0

This file defines how AVAIL should test product behavior, privacy boundaries, copy safety, frontend workflows, and future Supabase pilot infrastructure.

Use this alongside:

```text
docs/dev/development_log.md
docs/dev/agile_delivery_rules.md
docs/dev/workflow_ci_cd_rules.md
docs/dev/product_boundaries.md
docs/dev/data_privacy_rules.md
docs/dev/copy_language_rules.md
docs/dev/milestone.md
```

## Core Testing Principle

AVAIL tests should protect the product's trust boundary.

Testing should verify that:

- The app builds and core workflows run.
- Coach-facing surfaces receive sanitized data only.
- Consent-off behavior returns neutral unavailable states.
- Confidence and uncertainty are visible where context is shown.
- User-facing language does not drift into diagnosis, prediction, prevention, prescription, fertility, symptom, or medical framing.
- Supabase access policies preserve athlete-owned data boundaries when backend work begins.

Tests do not replace product, privacy, legal, security, or expert review.

## Current Stage

Current stage:

```text
Milestone 1 - Pure Frontend Prototype
```

The current prototype is mock-data-only. Testing should focus on:

- TypeScript/build correctness
- Privacy transform behavior
- Critical browser workflows
- Copy-language audit
- Responsive smoke checks where practical

Do not add backend, database, auth, real model, wearable, or real athlete-data tests during the pure frontend prototype stage.

## Test Layers

Use test layers for different risks:

| Layer | Primary purpose |
| --- | --- |
| Build/typecheck | Ensure TypeScript and Vite output are valid. |
| Unit tests | Verify pure functions, transforms, helpers, and data shaping. |
| Privacy transform tests | Ensure coach-facing shapes exclude restricted athlete-owned fields. |
| Copy audit | Catch banned or risky user-facing language. |
| Playwright smoke tests | Verify critical web workflows in a real browser. |
| Supabase integration tests | Verify RLS, migrations, RPC, Edge Functions, consent, and audit behavior. |

## Build And Typecheck

For the current prototype, the minimum local check is:

```bash
cd avail-prototype
npm run build
```

On Windows PowerShell, replace `npm` with `npm.cmd` if execution policy blocks `npm.ps1`. Prefer Git Bash or WSL on Windows to keep commands consistent with CI.

Build must pass before meaningful review or merge.

Build passing is not enough if the change touches:

- Coach-facing data
- Consent behavior
- Load Score or confidence display
- User-facing product language
- Supabase schema or access policies

## Unit Test Rules

Use unit tests for:

- Pure helper functions
- Data transforms
- Direction, confidence, trend, and priority mapping
- Consent filtering
- Copy audit helpers
- Future rule-based Load Score logic

Do not use unit tests as the only proof for full user workflows.

## Privacy Transform Tests

Privacy transform tests are required once a coach-facing transform, mock API, real API, or Supabase function is introduced or changed.

These tests should verify:

- Coach-facing code receives only `CoachAthleteView` or the future sanitized equivalent.
- Consent-off athletes return `Context unavailable`.
- Raw cycle data is absent.
- Raw check-in values are absent.
- Sensitive onboarding answers are absent.
- Private reflections are absent.
- Welfare details are absent.
- Raw wearable signals are absent.
- Detailed contraception status is absent.
- Mental readiness raw history is absent.

For the current prototype, the main transform to protect is:

```text
buildCoachView(...)
```

Future backend equivalents must follow the same boundary.

## Copy Audit Rules

Changed user-facing implementation should be checked for banned or risky product language.

Search changed UI, mock data, API messages, test fixtures, and comments for:

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

Some banned terms may appear in documentation that defines prohibited language. They should not appear in user-facing product implementation unless explicitly reviewed.

Safe AVAIL language includes:

```text
physiological context
today's context
load tolerance estimate
context suggests
confidence
recent pattern
different decision
use alongside your professional judgement
```

## Playwright Rules

Use Playwright for web/prototype/coach-dashboard smoke tests.

Current prototype Playwright v1 scope:

- App loads and role select appears.
- Athlete can open the athlete flow.
- Athlete can submit daily check-in.
- Coach dashboard opens.
- Consent-off athlete shows `Context unavailable`.
- Coach athlete detail opens.
- Coach different-decision flow opens and submits.

Playwright should also check:

- Required coach framing appears.
- Confidence is visible for available context.
- Low-confidence state is visible.
- Coach screens do not display obvious raw restricted data labels.

Avoid:

- Large snapshot tests.
- E2E tests for every static card.
- Tests that depend on fragile animation timing.
- Testing implementation details instead of user-visible behavior.
- Treating Playwright as a replacement for privacy transform tests.

## Responsive Smoke Checks

For meaningful UI changes, check at least:

- Desktop width
- Mobile width

The goal is to catch broken navigation, unreadable text, overlapping controls, or unusable forms.

Do not overbuild visual regression testing before the prototype interaction model is stable.

## Supabase Pilot Test Rules

When Supabase pilot backend work starts, tests must verify access boundaries before pilot use.

Supabase tests should cover:

- Migration validity.
- Required constraints.
- Athlete can access her own allowed data.
- Coach cannot directly read restricted athlete-owned tables.
- Coach can read only sanitized coach-facing output.
- Consent withdrawal affects the next coach-facing request.
- Audit log is created when coach-facing context is generated or viewed.
- RLS denies unauthorized team access.
- Edge Functions or RPC return safe response shapes.

Restricted athlete-owned tables include:

- `athlete_profile`
- `athlete_daily_checkin`
- `cycle_log`
- `wearable_signal`
- `athlete_context_state`
- `athlete_context_state_history`
- `welfare_flag`
- raw `session_outcome`

Coach-facing output should use sanitized structures such as:

- `coach_view`
- RPC response
- Edge Function response

Do not rely on frontend hiding as a privacy control.

## CI Expectations

Initial GitHub Actions CI for the current prototype should run:

```text
npm ci
npm run build
```

After tests are added, CI should expand to:

```text
npm ci
npm run build
npm run test
npm run test:e2e
copy/privacy audit
```

Supabase pilot CI should later add:

```text
migration validation
RLS tests
consent tests
audit-log tests
coach-view response tests
```

## What Not To Over-Test

Do not spend early prototype time on:

- E2E tests for every visual card.
- Snapshotting entire pages.
- Complex visual regression suites.
- Testing static copy in every component when a copy audit covers the risk.
- Mocking real backend behavior before the Supabase slice is defined.
- Testing implementation details that will change during prototype hardening.

Testing should reduce delivery risk. It should not freeze the prototype before the product workflow is stable.

## Minimum Test Expectations By Milestone

| Milestone | Minimum expectation |
| --- | --- |
| Milestone 1 - Pure Frontend Prototype | Build passes; manual walkthrough; initial privacy/copy review. |
| Milestone 2 - Prototype Hardening | Build passes; privacy transform tests; Playwright smoke tests for core flows. |
| Milestone 3 - Frontend Architecture Decision | Documented test strategy for chosen frontend architecture. |
| Milestone 4 - Production-Like Frontend Foundation | Unit tests, smoke E2E, copy/privacy audit in CI. |
| Milestone 5 - Backend/API Architecture | API contract tests and sanitized response tests. |
| Milestone 6 - Data Model And Persistence | Supabase migration, constraint, RLS, and access-boundary tests. |
| Milestone 7 - MVP Load Score And Confidence Logic | Rule/model tests for score, confidence, missing data, and uncertainty behavior. |
| Milestone 8 - Pilot Workflow Readiness | End-to-end pilot workflow tests across frontend and staging backend. |

## Review Questions

Before accepting test coverage for a ticket, ask:

- Does the test cover the actual product or privacy risk?
- Does coach-facing code remain restricted to sanitized data?
- Does the test prove consent-off behavior where relevant?
- Does the test check confidence or uncertainty where context is shown?
- Does the test avoid brittle implementation details?
- Are Playwright tests limited to critical workflows?
- Are Supabase tests checking RLS and access denial, not only happy paths?

## Final Rule

AVAIL testing should prioritize trust-critical behavior:

```text
coach privacy
  + consent
  + confidence
  + product language
  + critical workflows
```

More tests are useful only when they reduce real product, privacy, or delivery risk.
