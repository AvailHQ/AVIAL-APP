# AVAIL Data Privacy Rules

This file defines implementation rules for athlete data privacy, consent, and coach-facing data boundaries. These rules apply to frontend state, backend APIs, database schemas, model services, logs, seed data, mock data, tests, and analytics.

## Core Principle

Athlete data belongs to the athlete.

Consent is structural infrastructure, not UI decoration.

Coach-facing products receive structured context only. They must never receive raw sensitive athlete data.

## Consent Architecture

Consent happens directly between AVAIL and the athlete.

The club is not in the consent chain.

Consent must be:

- Explicit
- Granular where practical
- Withdrawable at any time
- Applied in real time
- Auditable

If consent is withdrawn, the next coach-facing request must stop returning that athlete's context.

## Coach Data Boundary

Coach-facing APIs, components, mock objects, and state must only receive a sanitized coach view.

Preferred pattern:

```text
raw athlete data -> privacy/consent layer -> CoachAthleteView -> coach UI
```

Coach UI must not directly consume raw athlete profile objects, raw check-ins, raw cycle data, raw onboarding answers, or private reflections.

## Coach May See

Coach-facing views may show:

- Athlete display name
- Sport / squad context
- Position or role
- Load Score
- Load Direction
- Confidence level
- Trend summary
- High-level context summary
- Structured dimensions such as recovery capacity, fatigue sensitivity, sleep stability, or context impact
- Pending check-in state
- Context unavailable state
- Coach different-decision history

## Coach Must Never See

Coach-facing views and APIs must never expose:

- Raw cycle logs
- Period start dates
- Period end dates
- Cycle phase labels inferred from raw logs
- Raw symptom history
- Private athlete reflections
- Sensitive onboarding answers
- Diagnosed conditions
- RED-S history or RED-S trigger detail
- Disordered eating history
- Mental health pattern details
- Mental readiness raw history
- Ethnicity
- Neurodivergent profile
- Detailed contraception status
- Energy availability answers
- Pain location details
- Free-text athlete notes unless explicitly designed for coach sharing

## Consent-Off State

If an athlete has not consented or has withdrawn consent, the coach-facing view must show a neutral unavailable state.

Use:

```text
Context unavailable
```

Acceptable expanded copy:

```text
Context unavailable for coaching view.
```

Do not use:

```text
Did not consent
Refused
Non-compliant
Opted out
Missing because athlete withdrew consent
```

The coach should not be told why context is unavailable.

## Raw Data Isolation

Raw sensitive athlete data should be isolated from coach-facing output data.

Implementation should prefer:

- Separate tables or storage domains for raw athlete inputs and coach-facing outputs
- Explicit transformation functions for coach views
- Consent checks before data access
- Audit logs for sensitive access
- No direct foreign-key-style convenience access from coach output to raw health data where avoidable

## API Rules

Coach-facing API responses must be designed as sanitized response shapes.

They must not include sensitive fields even if the frontend "does not display them."

Bad pattern:

```text
GET /coach/athletes returns full AthleteProfile and frontend hides sensitive fields
```

Good pattern:

```text
GET /coach/athletes returns CoachAthleteView only
```

Consent must be checked server-side before response construction.

Frontend checks are useful for UX but are not privacy controls.

## Model Service Rules

The model service may receive sensitive inputs required to generate context, but it should return only structured outputs:

- Load Score
- Direction
- Confidence
- Context dimensions
- Model version
- Explanation category where safe

The model service should not write directly to coach-accessible storage.

Every generated score should record:

- Model version
- Input completeness state
- Confidence state
- Whether estimation or fallback logic was used

## Audit Logging

Audit logs should record sensitive data access events.

At minimum, log:

- Actor
- Role
- Athlete ID
- Data category accessed
- Purpose or route
- Timestamp
- Consent state at access time
- Success or denial

Audit logs must not contain raw sensitive values unless absolutely required and legally reviewed.

## Welfare Data Handling

RED-S and mental readiness related patterns require stricter handling.

Coach must not see:

- Trigger reason
- Trigger details
- Athlete responses to welfare prompts
- Medical routing details

Coach may see only indirect effects where appropriate:

- Lower confidence
- General context unavailable state
- High-level non-sensitive context

Medical staff routing requires explicit athlete consent and should send minimal detail.

## Mock Data And Tests

Mock data must obey the same privacy boundaries as production data.

Do not create coach mock objects containing sensitive fields "for convenience."

Tests should include:

- Consent withdrawn returns context unavailable
- Coach view excludes raw cycle fields
- Coach view excludes sensitive onboarding fields
- Coach view excludes welfare details
- Frontend cannot access sensitive fields through coach props

## Implementation Review Questions

Before merging any data-related feature, ask:

- Can coach-facing code access raw sensitive data?
- Does any coach API return hidden-but-present sensitive fields?
- Does consent withdrawal affect the next request/render?
- Does unavailable copy reveal athlete consent status?
- Are welfare details isolated from coach views?
- Are audit logs recording access without leaking raw sensitive values?
- Is mock data respecting the same privacy contract as production data?
