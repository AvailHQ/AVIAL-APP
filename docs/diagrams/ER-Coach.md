# ER-Coach Diagram Notes

Source diagram:

<img src='/docs/diagrams/img/ER-Coach.png' />

```text
docs/diagrams/img/ER-Coach.png
```

This document explains the coach-perspective ER diagram as a backend implementation reference.

Shared entity definitions live in:

```text
docs/diagrams/ER-Shared.md
```

Use `ER-Shared.md` as the source of truth for shared entities such as `USER`, `TEAMS`, `USER_TEAM`, `LOAD_SCORE`, `MODEL_VERSION`, `TRAINING_SESSION`, `TRAINING_SESSION_ATHLETE`, and `AVAILABILITY_EVENT`.

## Core Boundary

The coach-side data model must preserve AVAIL's privacy boundary.

Coach-facing services may consume:

- `COACH_VIEW`
- `COACH_DIFFERENT_DECISION_RECORD`
- `TRAINING_SESSION`
- `TRAINING_SESSION_ATHLETE`
- `AVAILABILITY_EVENT`, with restricted operational content
- `AUDIT_LOG`, for governance and access tracking

Coach-facing services must not read restricted athlete-owned tables directly, including:

- `ATHLETE_PROFILE`
- `ATHLETE_DAILY_CHECKIN`
- `CYCLE_LOG`
- `WEARABLE_SIGNAL`
- `ATHLETE_CONTEXT_STATE`
- `WELFARE_FLAG`
- raw `SESSION_OUTCOME`

Coach flow:

```text
coach membership
  -> sanitized coach view
  -> training session
  -> session athlete
  -> different decision
  -> audit log
```

## Diagram Color Categories

| Color | Meaning |
| --- | --- |
| Blue | Coach-owned / coach-facing data |
| Yellow | Data processing related |
| Red | Privacy / governance related |
| Green | Junction / associative entity |
| White | Identity, team, session, or shared reference data |

## Shared Entities Referenced

Do not redefine these entities in this file. Their columns, enum values, core relationships, and index guidance are maintained in `ER-Shared.md`.

| Entity | Coach-side role |
| --- | --- |
| `USER` | Represents coach/staff users and athlete users referenced by coach-facing records. |
| `TEAMS` | Defines the team/squad context for coach views and sessions. |
| `USER_TEAM` | Defines coach and athlete team membership. |
| `MODEL_VERSION` | Internal model registry for score provenance. |
| `LOAD_SCORE` | Internal source for sanitized coach context. Coach APIs should not expose the raw/internal score object directly. |
| `LOAD_SCORE_GENERATION_LOG` | Internal model-run provenance. |
| `TRAINING_SESSION` | Coach-created team session. |
| `TRAINING_SESSION_ATHLETE` | Athlete-session association used for final direction and different-decision context. |
| `AVAILABILITY_EVENT` | Operational availability event; must not contain raw sensitive athlete inputs. |

## Coach-Specific Entity Columns And Types

### COACH_VIEW

Sanitized coach-facing context snapshot. This is the data a coach is allowed to see. It is not a log of whether the coach actually viewed it; access events belong in `AUDIT_LOG`.

`source_score_id` is a provenance reference to the internal source score. It does not need to be implemented as a strict FK in the coach-facing schema.

| Column | Type | Notes |
| --- | --- | --- |
| `coach_view_id` | `int` | Primary key. |
| `viewer_id` | `int` | Reference to `USER.user_id`; coach/staff user who can view this snapshot. |
| `user_id` | `int` | Reference to `USER.user_id`; athlete user. |
| `team_id` | `int` | Reference to `TEAMS.team_id`. |
| `load_score` | `int` | Sanitized score value shown to coach. |
| `source_score_id` | `int nullable` | Provenance reference to source `LOAD_SCORE`; not required as strict FK. |
| `load_direction` | `enum` | `increase`, `maintain`, `reduce`, `recovery_focus`. |
| `confidence_level` | `enum` | `high`, `medium`, `low`, `very_low`. |
| `trend_summary` | `varchar` | Coach-safe summary of recent trend. |
| `priority_state` | `enum` | `requires_attention`, `stable_context`, `pending_checkin`, `context_unavailable`, `low_confidence`. |
| `context_available` | `boolean` | Whether context is available for coach view. |
| `generated_at` | `datetime` | Snapshot generation timestamp. |

Relationships:

| Relationship | Cardinality | Notes |
| --- | ---: | --- |
| `USER(coach)` -> `COACH_VIEW` | 1:M | Via `viewer_id`. |
| `USER(athlete)` -> `COACH_VIEW` | 1:M | Via `user_id`. |
| `TEAMS` -> `COACH_VIEW` | 1:M | Team-scoped coach context. |
| `COACH_VIEW` -> `COACH_DIFFERENT_DECISION_RECORD` | 1:M | Coach can make different decisions from a view. |
| `COACH_VIEW` -> `AUDIT_LOG` | 1:M | Access can be audited through resource type/id. |

Required constraints / indexes:

- PK: `coach_view_id`
- Reference: `viewer_id`
- Reference: `user_id`
- Reference: `team_id`
- Check: `load_score` between 0 and 100 when `context_available = true`.

Optional query-driven indexes:

- Index: `(viewer_id, team_id, generated_at)`
- Index: `(team_id, priority_state, generated_at)`
- Index: `(user_id, team_id, generated_at)`
- Index: `(context_available, generated_at)`

Implementation notes:

- `COACH_VIEW` must not contain raw cycle logs, period flags, raw check-in values, contraception details, diagnosed conditions, RED-S details, ethnicity, neurodivergent profile, raw wearable signals, or welfare trigger details.
- If consent is withdrawn, the next coach-facing generation/request should produce `context_available = false` or no accessible context, depending on API design.
- Use neutral coach-facing unavailable language such as `Context unavailable`.

### COACH_DIFFERENT_DECISION_RECORD

Records when a coach makes a different decision from the contextual direction shown in `COACH_VIEW`.

Use "different decision" semantics. Do not name this entity or fields with "override" in implementation, because that implies the system is the source of coaching authority.

| Column | Type | Notes |
| --- | --- | --- |
| `decision_id` | `int` | Primary key. |
| `user_id` | `int` | Reference to `USER.user_id`; coach user. |
| `coach_view_id` | `int` | Reference to `COACH_VIEW.coach_view_id`. |
| `session_athlete_id` | `int` | Reference to `TRAINING_SESSION_ATHLETE.session_athlete_id`. |
| `context_direction` | `enum` | `increase`, `maintain`, `reduce`, `recovery_focus`, `context_unavailable`. |
| `coach_decision` | `enum` | `increase`, `maintain`, `reduce`, `recovery_focus`, `not_available`, `modified_participation`. |
| `decision_reason` | `text` | Coach's operational reason. |
| `decided_at` | `datetime` | Decision timestamp. |

Relationships:

| Relationship | Cardinality | Notes |
| --- | ---: | --- |
| `USER(coach)` -> `COACH_DIFFERENT_DECISION_RECORD` | 1:M | Coach can record many different decisions. |
| `COACH_VIEW` -> `COACH_DIFFERENT_DECISION_RECORD` | 1:M | Decision is based on sanitized coach context. |
| `TRAINING_SESSION_ATHLETE` -> `COACH_DIFFERENT_DECISION_RECORD` | 1:0..M | Athlete-session may have zero or more decision records. |

Required constraints / indexes:

- PK: `decision_id`
- Reference: `user_id`
- Reference: `coach_view_id`
- Reference: `session_athlete_id`

Optional query-driven indexes:

- Index: `(user_id, decided_at)`
- Index: `(coach_view_id, decided_at)`
- Index: `(session_athlete_id, decided_at)`

Implementation notes:

- `decision_reason` should capture operational reasoning, not sensitive athlete-owned raw details.
- `TRAINING_SESSION_ATHLETE.final_direction` can store the final applied direction; this record stores the decision event and reason.

### AUDIT_LOG

Governance log for coach-facing access to sanitized views or operational data.

Audit logs should not contain raw sensitive values.

| Column | Type | Notes |
| --- | --- | --- |
| `log_id` | `int` | Primary key. |
| `user_id` | `int` | Actor user, usually coach/staff. |
| `target_user_id` | `int nullable` | Target athlete user, nullable for non-athlete resources. |
| `action` | `enum` | `view`, `generate`, `create`, `update`, `export`, `access_denied`. |
| `resource_type` | `varchar` | Example: `coach_view`, `training_session`, `availability_event`, `different_decision`. |
| `resource_id` | `int` | ID of accessed resource. |
| `purpose` | `text` | Purpose or route/context for access. |
| `ip_address` | `varchar` | Request IP address or trusted proxy value. |
| `accessed_at` | `datetime` | Access timestamp. |
| `consent_state_at_access` | `enum` | `granted`, `denied`, `unavailable`, `not_required`, `unknown`. |
| `access_result` | `enum` | `success`, `denied`. |

Relationships:

| Relationship | Cardinality | Notes |
| --- | ---: | --- |
| `USER(actor)` -> `AUDIT_LOG` | 1:M | Actor can create many audit entries. |
| `USER(athlete)` -> `AUDIT_LOG` | 1:0..M | Target athlete is nullable. |
| `COACH_VIEW` -> `AUDIT_LOG` | 1:M | Via `resource_type = coach_view` and `resource_id = coach_view_id`. |

Required constraints / indexes:

- PK: `log_id`
- Reference: `user_id`
- Nullable reference: `target_user_id`

Optional query-driven indexes:

- Index: `(user_id, accessed_at)`
- Index: `(target_user_id, accessed_at)`
- Index: `(resource_type, resource_id)`
- Index: `(access_result, accessed_at)`

Implementation notes:

- Store access metadata, not sensitive payloads.
- Use audit records for coach view access, denied access, and generation of sanitized coach-facing context.
- If consent is denied or unavailable, record `access_result = denied` and the relevant `consent_state_at_access`.

## Coach Flow Relationships

These are the main coach-side relationships to preserve in implementation:

| Relationship | Cardinality | Notes |
| --- | ---: | --- |
| `USER(coach)` -> `USER_TEAM` | 1:M | Coach belongs to one or more teams through memberships. |
| `TEAMS` -> `USER_TEAM` | 1:M | Team has many users, including coaches and athletes. |
| `USER(coach)` -> `COACH_VIEW` | 1:M | Coach can have many sanitized athlete-context snapshots. |
| `USER(athlete)` -> `COACH_VIEW` | 1:M | Athlete can appear in many coach views across teams/viewers/time. |
| `TEAMS` -> `COACH_VIEW` | 1:M | Coach view is team-scoped. |
| `TEAMS` -> `TRAINING_SESSION` | 1:M | Coach creates sessions within a team. |
| `TRAINING_SESSION` -> `TRAINING_SESSION_ATHLETE` | 1:M | Session contains many athlete rows. |
| `USER(athlete)` -> `TRAINING_SESSION_ATHLETE` | 1:M | Athlete can participate in many sessions. |
| `COACH_VIEW` -> `COACH_DIFFERENT_DECISION_RECORD` | 1:M | Decisions are based on sanitized context snapshots. |
| `TRAINING_SESSION_ATHLETE` -> `COACH_DIFFERENT_DECISION_RECORD` | 1:0..M | Decision can be tied to an athlete-session. |
| `USER(coach)` -> `AUDIT_LOG` | 1:M | Coach access should be audited. |

## Access Rules

| Data Area | Coach-facing direct access? | Notes |
| --- | ---: | --- |
| `COACH_VIEW` | Yes | Sanitized context snapshot. |
| `COACH_DIFFERENT_DECISION_RECORD` | Yes | Coach-owned operational decision record. |
| `TRAINING_SESSION` | Yes | Team operational session. |
| `TRAINING_SESSION_ATHLETE` | Yes | Operational athlete-session record; no raw sensitive inputs. |
| `AVAILABILITY_EVENT` | Yes, restricted | Must not include raw sensitive athlete details. |
| `AUDIT_LOG` | Admin/governance only | Not general coach dashboard data. |
| `LOAD_SCORE` | Internal only | Coach-facing clients should use sanitized values in `COACH_VIEW`. |
| Athlete-owned restricted tables | No | Use sanitized output only. |

## Agent Implementation Rules

- Use `snake_case` table and column names in implementation.
- Do not implement coach APIs that query restricted athlete-owned tables directly.
- Do not expose hidden-but-present sensitive fields in coach-facing response shapes.
- Treat `COACH_VIEW.source_score_id` as provenance reference, not a required strict FK.
- Treat `AUDIT_LOG.resource_type/resource_id` as a polymorphic resource reference.
- Use `different_decision` naming, not `override`.
- Avoid `recommendation` language in schema/API names; use `context_direction`, `load_direction`, or `coach_decision`.
- Audit coach-facing access to sanitized context.
