# AVAIL Agile Delivery Rules

This file defines how AVAIL should use agile delivery from prototype through pilot readiness.

AVAIL should use lightweight agile iteration with explicit product, privacy, consent, copy, and confidence gates. Agile delivery is a way to reduce risk through small validated increments. It is not permission to skip AVAIL's milestone roadmap or privacy boundaries.

## Core Delivery Principle

Build AVAIL in small, reviewable increments.

Each iteration should answer:

- What is the smallest useful product increment?
- Which user workflow does it improve?
- How will we verify it works?
- Does it preserve athlete agency and consent?
- Does it keep coach-facing data sanitized?
- Does it avoid medical, injury prediction, fertility, symptom-tracking, performance prediction, and training prescription drift?

## Delivery Model

Use:

```text
agile sprint delivery
  + milestone gates
  + AVAIL product/privacy review
```

Do not use agile as:

- A reason to build backend before prototype boundaries are stable
- A reason to collect real athlete data before review gates are complete
- A reason to ship coach access without sanitized read models
- A reason to defer consent, audit, or copy-language checks

## Sprint Length

Recommended sprint lengths:

| Stage | Sprint length | Notes |
| --- | ---: | --- |
| Pure frontend prototype | 1 week | Keep changes small and demoable. |
| Prototype hardening | 1 week | Review-heavy iteration. |
| Frontend architecture decision | 1 week | Mostly documentation and structure decisions. |
| Supabase pilot backend | 1-2 weeks | Slice by data boundary and workflow. |
| Pilot readiness | 1 week | Review, walkthrough, and risk reduction cycles. |

Shorter is acceptable when working on narrow fixes. Longer sprints should be avoided unless there is a clear integration reason.

## Sprint Flow

Each sprint should follow this flow:

```text
1. Select a narrow sprint goal
2. Define acceptance criteria
3. Implement or document the increment
4. Run build/test/review checks
5. Demo or walkthrough the increment
6. Record findings and next actions
```

Every sprint must produce one of:

- Working prototype behavior
- Production-like foundation work
- A reviewed technical document
- A schema/API slice
- A review finding and fix set

Avoid sprints that only produce broad exploration with no decision, artifact, or review result.

## Milestone Gates

The existing milestone roadmap remains the delivery backbone:

```text
docs/dev/milestone.md
```

Do not move to the next milestone unless the current milestone's acceptance criteria are met or the exception is explicitly documented.

Important gates:

- Do not move from prototype to production-like frontend until prototype privacy and copy issues are reviewed.
- Do not start real backend data collection until consent and coach-view boundaries are documented.
- Do not expose Supabase tables to coach users until RLS and sanitized access paths are implemented.
- Do not use real athlete data before security, legal, and expert review gates.

## Ticket Format

Write implementation tickets in this format:

```text
As a [role],
I want [capability],
so that [product outcome].

Acceptance criteria:
- Functional criteria
- Privacy criteria
- Consent criteria
- Copy-language criteria
- Confidence/uncertainty criteria
- Build/test criteria
```

Example:

```text
As a coach,
I want to view a squad context list,
so that I can prepare for a session without seeing raw athlete data.

Acceptance criteria:
- Coach UI receives only sanitized coach-view data.
- Consent-off athletes show Context unavailable.
- No raw check-in, cycle, wearable, profile, or welfare fields are returned.
- Confidence is visible for every available context state.
- Coach framing says: Today's physiological context - use alongside your professional judgement.
- Build passes.
```

## Definition Of Ready

A ticket is ready to build only when:

- The user role is clear.
- The workflow or screen is clear.
- The data source is known: mock data, Supabase, or future service.
- Coach-facing data shape is known if the feature touches coach workflows.
- Consent behavior is known if athlete data is involved.
- The acceptance criteria include product-boundary and privacy checks.
- The task is small enough to complete and review in one sprint.

If a ticket touches raw athlete data, coach access, consent, or model output, it must reference the relevant rules:

```text
docs/dev/product_boundaries.md
docs/dev/data_privacy_rules.md
docs/dev/copy_language_rules.md
docs/diagrams/ER-Shared.md
docs/diagrams/ER-Athlete.md
docs/diagrams/ER-Coach.md
```

## Definition Of Done

A ticket is done only when:

- The requested behavior or document exists.
- Build or relevant checks pass, when code changed.
- Coach-facing code cannot access restricted athlete-owned data.
- Consent-off behavior is neutral and does not reveal why context is unavailable.
- Confidence or uncertainty is visible where Load Score or context is shown.
- User-facing language follows AVAIL copy rules.
- Any new schema/API shape follows the ER documentation.
- New risks or deferred decisions are documented.

For code changes, "works locally" is not enough if privacy or product-boundary checks were skipped.

## Required Sprint Review Checks

Every sprint review should check:

- Product boundary compliance
- Coach privacy boundary
- Consent behavior
- Copy-language compliance
- Confidence and uncertainty handling
- Welfare data handling, if relevant
- Build/test status
- Responsive and accessibility status for UI work
- Supabase RLS and audit status for backend work
- Documentation updates

Use AVAIL-specific review before accepting meaningful prototype, coach, athlete-data, or backend changes.

## Supabase Pilot Iteration Rules

Supabase pilot work must be delivered in vertical slices. Do not try to implement the full ER model in one sprint.

Recommended order:

```text
1. Auth and membership slice
2. Consent and audit slice
3. Athlete check-in slice
4. Context state and Load Score output slice
5. Sanitized coach_view slice
6. Coach different-decision slice
7. Session outcome calibration slice
8. Pilot review and hardening slice
```

Each Supabase slice must include:

- Minimal tables from the ER docs
- Required constraints
- RLS policies
- Seed data that respects privacy boundaries
- One verified access path
- Audit logging where coach-facing context is generated or viewed

Do not create broad direct read access for coach users. Coach-facing clients should use sanitized views, RPC functions, or Edge Functions that return coach-safe fields only.

## Supabase Access Rules

Use existing ER documents as the schema source of truth.

Implementation may adapt names for Supabase conventions. For example, avoid a table named `user` if it conflicts with auth or SQL conventions; prefer a clear implementation name such as `app_user` while preserving the ER meaning.

Coach-facing Supabase access must follow:

```text
restricted athlete-owned tables
  -> internal processing / consent check
  -> sanitized coach_view
  -> coach dashboard
```

Restricted athlete-owned tables must not be directly readable by coach users, including:

- `athlete_profile`
- `athlete_daily_checkin`
- `cycle_log`
- `wearable_signal`
- `athlete_context_state`
- `athlete_context_state_history`
- `welfare_flag`
- raw `session_outcome`

Coach-facing output may use:

- `coach_view`
- `coach_different_decision_record`
- `training_session`
- `training_session_athlete`
- restricted `availability_event`
- admin/governance `audit_log`

## Prototype Iteration Rules

The current frontend prototype should remain mock-data-only until the project intentionally enters the Supabase pilot backend milestone.

Prototype sprints may improve:

- Athlete onboarding
- Daily check-in
- Athlete dashboard
- Consent settings
- Coach squad dashboard
- Coach athlete detail
- Different-decision logging
- Session outcome capture
- Responsiveness and accessibility
- Copy and confidence presentation

Prototype sprints must not add:

- Real authentication
- Real database persistence
- Real wearable integrations
- Real model service
- Real athlete data
- Medical, injury prediction, fertility, symptom-tracking, or training prescription features

## Sprint Backlog Prioritization

Prioritize work in this order:

1. Product and privacy guardrails
2. Core user workflow clarity
3. Consent and coach-view correctness
4. Confidence and uncertainty clarity
5. Founder/coach walkthrough quality
6. Production-like foundation
7. Backend persistence and integrations
8. Advanced model logic

If a feature increases risk without improving the current milestone's goal, defer it.

## Demo Rules

Each sprint demo should show the user workflow, not only code structure.

For prototype work, demo:

- Athlete path
- Coach path
- Consent-off state
- Low-confidence state
- Different-decision flow, if touched

For Supabase work, demo:

- Who can read/write which data
- What happens when consent is withdrawn
- What coach-facing response shape returns
- What audit records are written

## Retrospective Questions

At the end of each sprint, ask:

- What became clearer about AVAIL's product boundary?
- Did any implementation expose more athlete data than needed?
- Did any copy imply diagnosis, prediction, prevention, or prescription?
- Did confidence communicate uncertainty honestly?
- Did the sprint move the current milestone forward?
- What should be removed, deferred, or simplified next?

## Agent Usage Rules

When asking Codex, cc, or another agent to implement sprint work:

- Provide the sprint goal.
- Provide the relevant docs.
- Include acceptance criteria.
- State whether code changes are allowed.
- State whether Supabase/schema work is in scope.
- Require a build/test result for code changes.
- Require product/privacy/copy review for athlete-data or coach-facing work.

Recommended agent prompt pattern:

```text
Use docs/dev/agile_delivery_rules.md, docs/dev/product_boundaries.md,
docs/dev/data_privacy_rules.md, and docs/dev/copy_language_rules.md.

Sprint goal: [goal]
Scope: [allowed changes]
Out of scope: [explicit exclusions]
Acceptance criteria: [checks]
```

## Final Rule

AVAIL agile delivery should optimize for validated trust, not raw feature velocity.

Every increment should make the product clearer, safer, more usable, or more pilot-ready.
