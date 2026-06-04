# AVAIL Workflow And CI/CD Rules

This file defines the standard development workflow for AVAIL from ticket creation through review, CI, merge, staging deployment, and feedback.

Use this alongside:

```text
docs/dev/development_log.md
docs/dev/agile_delivery_rules.md
docs/dev/product_boundaries.md
docs/dev/data_privacy_rules.md
docs/dev/copy_language_rules.md
docs/dev/milestone.md
```

## Core Workflow

Before starting work, Codex, cc, and other AI agents should read the most recent entries in `docs/dev/development_log.md` and do a lightweight handoff check:

- Check whether the logged work appears complete in the repository.
- Note any obvious missing follow-ups, contradictions, or incomplete actions.
- Then proceed with the requested task.

This is a recent-log check, not a full project audit.

AVAIL work should move through this flow:

```text
Ticket
  -> Branch
  -> Develop feature or document
  -> Local build/test
  -> Codex/CC review
  -> Fix issues and add tests
  -> Local build/test again
  -> Push to GitHub
  -> GitHub Actions test + build
  -> PR review
  -> Merge
  -> Deploy to preview or staging
  -> Demo and collect feedback
```

Passing tests is required, but not sufficient. AVAIL changes must also pass product, privacy, consent, copy, and confidence checks.

## Ticket To Branch

Every meaningful change should start from a ticket.

The ticket should define:

- Scope
- User role or system area
- Acceptance criteria
- Privacy and consent checks
- Copy-language checks
- Confidence or uncertainty checks, if Load Score or context is involved
- Test/build expectations

Branch naming should be simple and traceable:

```text
feature/coach-squad-context
fix/consent-unavailable-copy
docs/agile-delivery-rules
test/playwright-smoke-flows
supabase/consent-audit-slice
```

## Local Checks Before Review

Run local checks before asking Codex, CC, or another reviewer to inspect the work.

For the current prototype:

```powershell
cd avail-prototype
npm.cmd run build
```

When tests are added, local checks should expand to:

```powershell
npm.cmd run build
npm.cmd run test
npm.cmd run test:e2e
```

Use `npm.cmd` on this Windows machine unless the shell is configured to allow `npm`.

## Codex And CC Review

After local checks, use Codex/CC review for:

- Product boundary compliance
- Coach privacy boundary
- Consent behavior
- Copy-language compliance
- Confidence and uncertainty handling
- React maintainability
- UI and accessibility
- Test gaps

Review should happen before merge, not after deployment.

Recommended review focus:

```text
Does coach-facing code receive only sanitized data?
Does consent-off show Context unavailable without exposing why?
Does copy avoid diagnosis, prediction, prevention, prescription, fertility, symptom, and medical framing?
Is confidence visible where context or Load Score is shown?
Do tests cover the changed workflow or privacy boundary?
```

## Testing Responsibilities

Use different test types for different risks.

| Test type | Use for | Do not use for |
| --- | --- | --- |
| Build/typecheck | Broken TypeScript, bundling failures | Privacy proof by itself |
| Unit tests | Pure functions, transforms, helpers | Full browser workflows |
| Privacy transform tests | `CoachAthleteView`, consent filtering, forbidden fields | Visual layout |
| Copy audit scripts | Banned user-facing language | Product judgement by itself |
| Playwright | Critical web workflows and browser-visible privacy checks | SQL/RLS logic or every small component |
| Supabase integration tests | RLS, RPC, Edge Functions, migrations | UI layout |

## Playwright Rule

AVAIL should use Playwright for web/prototype/coach-dashboard smoke tests, not for every component.

Current prototype Playwright tests should cover:

- App loads and role select appears
- Athlete can submit daily check-in
- Coach dashboard opens
- Consent-off athlete shows `Context unavailable`
- Coach different-decision flow opens and submits

Playwright should also check browser-visible privacy and product framing:

- Coach screens show required professional judgement framing
- Confidence is visible for available context
- Coach screens do not display raw cycle, check-in, welfare, or private reflection details

Avoid:

- Snapshotting large UI pages
- Testing implementation details
- Creating E2E tests for every static card
- Treating Playwright as a replacement for privacy transform tests

## GitHub Actions CI

For the current prototype, GitHub Actions should initially run:

```text
npm ci
npm run build
```

Once tests are added, CI should run:

```text
npm ci
npm run build
npm run test
npm run test:e2e
copy/privacy audit
```

CI should fail when:

- TypeScript or build fails
- Unit tests fail
- Playwright smoke tests fail
- Banned user-facing language is introduced
- Privacy transform tests show restricted fields in coach-facing shapes

CI passing does not override human review for AVAIL boundaries.

## Supabase CI

When Supabase pilot work starts, CI should add checks for:

- Migration validity
- Required constraints
- RLS policy behavior
- Consent withdrawal behavior
- Coach access denial to restricted athlete-owned tables
- Audit log creation for coach-facing context access
- Sanitized `coach_view` response shape

Supabase tests should verify that coach users cannot directly read:

- `athlete_profile`
- `athlete_daily_checkin`
- `cycle_log`
- `wearable_signal`
- `athlete_context_state`
- `athlete_context_state_history`
- `welfare_flag`
- raw `session_outcome`

## Deployment Environments

Use environments in this order:

```text
local
  -> preview
  -> staging
  -> production
```

Definitions:

- `local`: developer machine. No real athlete data.
- `preview`: temporary deployment for a branch or PR. No real athlete data.
- `staging`: stable pre-production environment for demos, QA, and pilot rehearsal. Use test data.
- `production`: real user environment. Only allowed after required pilot gates.

## Deployment Targets

Recommended targets by app type:

| App area | Preview/staging target | Production target |
| --- | --- | --- |
| Current web prototype | Vercel preview/staging | Not production-critical |
| Coach dashboard | Vercel | Vercel production |
| Athlete mobile iOS | TestFlight | App Store, later |
| Athlete mobile Android | Firebase App Distribution | Play Store, later |
| Supabase backend | Supabase staging project | Supabase production project |

Do not connect real pilot athlete data to preview deployments.

## CD Rules

Continuous deployment should be staged.

Current prototype:

```text
CI required.
CD optional to preview/staging.
```

Supabase pilot:

```text
CI required.
Deploy migrations and Edge Functions to staging first.
Production deploy requires manual approval.
```

Real pilot:

```text
No automatic production deploy for sensitive backend changes.
Manual approval required.
Rollback plan required.
Audit and RLS checks required.
```

## Merge Rules

A PR can merge only when:

- Ticket acceptance criteria are satisfied.
- Local checks have passed.
- GitHub Actions checks pass.
- Product/privacy/copy review issues are resolved or explicitly deferred.
- Coach-facing access remains sanitized.
- Consent behavior is correct.
- Documentation is updated if workflow, schema, API, or product behavior changed.

Do not merge only because the UI looks correct.

## Demo Rules

After merge and staging deployment, demo the actual workflow.

For frontend prototype or coach web:

- Athlete path
- Coach path
- Consent-off state
- Low-confidence state
- Different-decision flow, if touched

For Supabase/backend:

- Allowed reads/writes by role
- Denied coach access to restricted tables
- Consent withdrawal result
- Sanitized coach response
- Audit log entry

## Production Gate

Before production or real pilot data:

- Supabase RLS must be reviewed.
- Coach access must be restricted to sanitized outputs.
- Consent withdrawal must affect the next coach-facing request.
- Audit logging must exist for coach-facing context access.
- Product copy must be reviewed.
- Security, legal, and expert review gates from `docs/dev/milestone.md` must be satisfied.

## Final Rule

AVAIL workflow should optimize for safe, reviewable progress.

The standard is:

```text
feature built
  -> tests pass
  -> product/privacy review passes
  -> CI passes
  -> merge
  -> staging deploy
  -> demo
```

Not:

```text
tests pass
  -> automatically safe to merge
```
