# ER Shared Entity Notes

Shared source diagrams:

<img src='/docs/diagrams/img/ER-Athlete.png' />

<img src='/docs/diagrams/img/ER-Coach.png' />

```text
docs/diagrams/img/ER-Athlete.png
docs/diagrams/img/ER-Coach.png
```

This document is the shared schema reference for entities that appear in both athlete-side and coach-side ER diagrams.

Use this file as the single source of truth for shared entity columns, types, enum values, core relationships, and index guidance. Perspective-specific documents should reference this file instead of redefining these entities.

## Shared Entities

- `USER`
- `TEAMS`
- `USER_TEAM`
- `MODEL_VERSION`
- `LOAD_SCORE`
- `LOAD_SCORE_GENERATION_LOG`
- `TRAINING_SESSION`
- `TRAINING_SESSION_ATHLETE`
- `AVAILABILITY_EVENT`

## Index Guidance

The indexes below are split into two groups:

- **Required constraints / indexes**: primary keys, foreign keys, unique constraints, and business-critical integrity rules.
- **Optional query-driven indexes**: add only when the backend has a known query pattern or performance need.

Do not add indexes to make coach access to restricted athlete-owned tables easier. Coach-facing workflows should use sanitized read models and operational records.

## Entity Columns, Relationships, And Indexes

### USER

Central identity table. A user may be an athlete, coach, staff member, admin, physio, or sport scientist depending on team membership.

| Column | Type | Notes |
| --- | --- | --- |
| `user_id` | `int` | Primary key. |
| `first_name` | `varchar` | User first name. |
| `last_name` | `varchar` | User last name. |
| `email` | `varchar` | Should be unique. |
| `phone` | `varchar` | Use string, not int. |
| `account_status` | `enum` | `active`, `onboarding`, `suspended`, `inactive`, `archived`. |
| `created_at` | `datetime` | Account creation timestamp. |

Relationships:

| Relationship | Cardinality | Notes |
| --- | ---: | --- |
| `USER` -> `USER_TEAM` | 1:M | User can belong to multiple teams. |
| `USER(coach)` -> `TRAINING_SESSION` | 1:M | Coach can create many sessions. |
| `USER(athlete)` -> `LOAD_SCORE` | 1:M | Athlete can have many generated load scores. |
| `USER(athlete)` -> `TRAINING_SESSION_ATHLETE` | 1:M | Athlete can be attached to many sessions. |
| `USER(athlete)` -> `AVAILABILITY_EVENT` | 1:M | Athlete can have many availability events. |
| `USER(coach/staff)` -> `AVAILABILITY_EVENT` | 1:M | Coach/staff can report many availability events. |

Required constraints / indexes:

- PK: `user_id`
- Unique: `email`

Optional query-driven indexes:

- Index: `account_status`

### TEAMS

Represents a club/team/squad context.

| Column | Type | Notes |
| --- | --- | --- |
| `team_id` | `int` | Primary key. |
| `primary_sport_id` | `int` | FK to `SPORTS.sport_id`; team's primary sport. |
| `team_name` | `varchar` | Team/squad name. |
| `level` | `enum` | `university`, `semi_pro`, `professional`, `elite`. |
| `join_time` | `datetime` | Team onboarding/join date in AVAIL. |
| `country` | `varchar` | Country code or country name. |
| `created_at` | `datetime` | Row creation timestamp. |

Relationships:

| Relationship | Cardinality | Notes |
| --- | ---: | --- |
| `TEAMS` -> `USER_TEAM` | 1:M | Team has many users through memberships. |
| `TEAMS` -> `TRAINING_SESSION` | 1:M | Team has many training sessions. |
| `TEAMS` -> `TRAINING_SESSION_ATHLETE` | indirect | Use `TRAINING_SESSION -> TRAINING_SESSION_ATHLETE`. |
| `TEAMS` -> `AVAILABILITY_EVENT` | 1:M | Availability events are team-scoped. |
| `SPORTS` -> `TEAMS` | 1:M | A sport can be primary sport for many teams. |

Required constraints / indexes:

- PK: `team_id`
- FK: `primary_sport_id`

Optional query-driven indexes:

- Index: `primary_sport_id`
- Index: `(team_name, country)`

### USER_TEAM

Associative entity between `USER` and `TEAMS`. Also stores a user's role within a team.

| Column | Type | Notes |
| --- | --- | --- |
| `user_team_id` | `int` | Primary key. |
| `user_id` | `int` | FK to `USER.user_id`. |
| `team_id` | `int` | FK to `TEAMS.team_id`. |
| `role_in_team` | `enum` | `athlete`, `coach`, `staff`, `admin`, `physio`, `sport_scientist`. |
| `join_at` | `datetime` | Membership start timestamp. |
| `leave_at` | `datetime nullable` | Membership end timestamp. |
| `is_active` | `boolean` | Whether this membership is currently active. |

Relationships:

| Relationship | Cardinality | Notes |
| --- | ---: | --- |
| `USER` -> `USER_TEAM` | 1:M | User may have multiple team memberships. |
| `TEAMS` -> `USER_TEAM` | 1:M | Team may have many members. |

Required constraints / indexes:

- PK: `user_team_id`
- FK: `user_id`
- FK: `team_id`
- Unique optional business rule: `(user_id, team_id, role_in_team, join_at)` if historical memberships are retained.

Optional query-driven indexes:

- Index: `user_id`
- Index: `team_id`
- Index: `(team_id, role_in_team, is_active)`
- Index: `(user_id, is_active)`

### MODEL_VERSION

Internal model version registry.

| Column | Type | Notes |
| --- | --- | --- |
| `version_id` | `int` | Primary key. |
| `version_tag` | `varchar` | Example: `1.0.2`. |
| `deployed_at` | `datetime` | Deployment timestamp. |
| `is_current_use` | `boolean` | Whether this is current production/default model version. |
| `change_log` | `text` | Summary of model changes. |

Relationships:

| Relationship | Cardinality | Notes |
| --- | ---: | --- |
| `MODEL_VERSION` -> `LOAD_SCORE` | 1:M | Many scores can be generated by one model version. |
| `MODEL_VERSION` -> `LOAD_SCORE_GENERATION_LOG` | 1:M | Many generation logs can reference one model version. |

Required constraints / indexes:

- PK: `version_id`
- Unique: `version_tag`

Optional query-driven indexes:

- Index: `is_current_use`
- Index: `deployed_at`

### LOAD_SCORE

Internal contextual output for an athlete. Coach-facing APIs should consume sanitized outputs, not raw/internal score records directly.

| Column | Type | Notes |
| --- | --- | --- |
| `score_id` | `int` | Primary key. |
| `user_id` | `int` | FK to `USER.user_id`; athlete user. |
| `checkin_id` | `int nullable` | Optional reference to athlete check-in. |
| `version_id` | `int` | FK to `MODEL_VERSION.version_id`. |
| `score_value` | `int` | 0-100 relative load tolerance estimate. |
| `confidence_level` | `enum` | `high`, `medium`, `low`, `very_low`. |
| `context_summary` | `text` | Human-readable internal/context summary. |
| `is_personalised` | `boolean` | Whether personalised logic was used. |
| `generated_at` | `datetime` | Score generation timestamp. |

Relationships:

| Relationship | Cardinality | Notes |
| --- | ---: | --- |
| `USER(athlete)` -> `LOAD_SCORE` | 1:M | Athlete can have many load scores. |
| `MODEL_VERSION` -> `LOAD_SCORE` | 1:M | Score records model version used. |
| `LOAD_SCORE` -> `LOAD_SCORE_GENERATION_LOG` | 1:0..M | Use 1:M if generation attempts are retained. |
| `LOAD_SCORE` -> `TRAINING_SESSION_ATHLETE` | 1:M | Same score may inform more than one athlete-session. |

Required constraints / indexes:

- PK: `score_id`
- FK: `user_id`
- FK: `version_id`
- Check: `score_value` between 0 and 100.

Optional query-driven indexes:

- Index: `checkin_id`
- Index: `(user_id, generated_at)`
- Index: `(user_id, confidence_level, generated_at)`

### LOAD_SCORE_GENERATION_LOG

Internal generation/provenance log for Load Score creation.

Recommended future name:

```text
MODEL_RUN
```

| Column | Type | Notes |
| --- | --- | --- |
| `model_run_id` | `int` | Primary key. |
| `score_id` | `int` | FK/reference to `LOAD_SCORE.score_id`. |
| `model_version_id` | `int` | FK/reference to `MODEL_VERSION.version_id`. |
| `input_completeness_state` | `enum` | `complete`, `partial`, `limited`, `estimated`, `unavailable`. |
| `estimation_used` | `boolean` | Whether fallback/estimation logic was used. |
| `missing_data_categories` | `text` | Comma-separated or JSON list of missing categories. |
| `confidence_reason` | `text` | Why the confidence level was assigned. |
| `generated_at` | `datetime` | Model run timestamp. |

Relationships:

| Relationship | Cardinality | Notes |
| --- | ---: | --- |
| `LOAD_SCORE` -> `LOAD_SCORE_GENERATION_LOG` | 1:0..M | One score may have generation/provenance logs. |
| `MODEL_VERSION` -> `LOAD_SCORE_GENERATION_LOG` | 1:M | Logs record model version. |

Required constraints / indexes:

- PK: `model_run_id`
- FK/reference: `score_id`
- FK/reference: `model_version_id`

Optional query-driven indexes:

- Index: `generated_at`
- Index: `(score_id, generated_at)`

### TRAINING_SESSION

Team-level training session created by a coach.

| Column | Type | Notes |
| --- | --- | --- |
| `session_id` | `int` | Primary key. |
| `team_id` | `int` | FK to `TEAMS.team_id`. |
| `created_by` | `int` | FK to `USER.user_id`; coach user. |
| `training_session_date` | `datetime` | Session date/time. |
| `training_session_type` | `enum` | `recovery`, `technical`, `moderate_load`, `high_load`, `match_competition`, `gym_strength`. |
| `training_intensity` | `enum` | `low`, `moderate`, `high`, `very_high`. |

Relationships:

| Relationship | Cardinality | Notes |
| --- | ---: | --- |
| `TEAMS` -> `TRAINING_SESSION` | 1:M | Team has many sessions. |
| `USER(coach)` -> `TRAINING_SESSION` | 1:M | Coach can create many sessions. |
| `TRAINING_SESSION` -> `TRAINING_SESSION_ATHLETE` | 1:M | Session includes many athlete rows. |
| `TRAINING_SESSION` -> `AVAILABILITY_EVENT` | 1:0..M | Availability event may optionally reference session. |

Required constraints / indexes:

- PK: `session_id`
- FK: `team_id`
- FK: `created_by`

Optional query-driven indexes:

- Index: `(team_id, training_session_date)`
- Index: `(created_by, training_session_date)`

### TRAINING_SESSION_ATHLETE

Associative entity between a training session and athlete. Stores session-specific athlete planning and participation data.

| Column | Type | Notes |
| --- | --- | --- |
| `session_athlete_id` | `int` | Primary key. |
| `session_id` | `int` | FK to `TRAINING_SESSION.session_id`. |
| `user_id` | `int` | FK to `USER.user_id`; athlete user. |
| `score_id` | `int` | FK/reference to `LOAD_SCORE.score_id` used as pre-session context. |
| `planned_load_intensity` | `enum` | `low`, `moderate`, `high`, `very_high`. |
| `actual_participation_status` | `enum nullable` | `full`, `modified`, `partial`, `not_available`, `rested`, `unknown`. |
| `final_direction` | `enum` | `increase`, `maintain`, `reduce`, `recovery_focus`. |

Relationships:

| Relationship | Cardinality | Notes |
| --- | ---: | --- |
| `TRAINING_SESSION` -> `TRAINING_SESSION_ATHLETE` | 1:M | Session has many athlete rows. |
| `USER(athlete)` -> `TRAINING_SESSION_ATHLETE` | 1:M | Athlete can appear in many sessions. |
| `LOAD_SCORE` -> `TRAINING_SESSION_ATHLETE` | 1:M | Score used as pre-session context. |

Required constraints / indexes:

- PK: `session_athlete_id`
- FK: `session_id`
- FK: `user_id`
- FK/reference: `score_id`
- Unique: `(session_id, user_id)`

Optional query-driven indexes:

- Index: `(user_id, session_id)`
- Index: `(session_id, actual_participation_status)`

### AVAILABILITY_EVENT

Operational availability tracking event.

| Column | Type | Notes |
| --- | --- | --- |
| `event_id` | `int` | Primary key. |
| `user_id` | `int` | FK to `USER.user_id`; athlete user. |
| `team_id` | `int` | FK to `TEAMS.team_id`. |
| `reported_by` | `int` | FK to `USER.user_id`; coach/staff user. |
| `session_id` | `int nullable` | Optional FK to `TRAINING_SESSION.session_id`. |
| `event_type` | `enum` | `available`, `modified_training`, `partial_training`, `missed_session`, `illness`, `injury`, `return_to_play`, `other`. |
| `event_date` | `datetime` | Event date/time. |
| `return_date` | `datetime nullable` | Expected or actual return date. |
| `load_score_context` | `json` | Sanitized snapshot only; no raw sensitive athlete data. |
| `note` | `text` | Operational note; must avoid raw sensitive details. |

Relationships:

| Relationship | Cardinality | Notes |
| --- | ---: | --- |
| `USER(athlete)` -> `AVAILABILITY_EVENT` | 1:M | Athlete can have many events. |
| `TEAMS` -> `AVAILABILITY_EVENT` | 1:M | Events are team scoped. |
| `USER(coach/staff)` -> `AVAILABILITY_EVENT` | 1:M | Coach/staff may report many events. |
| `TRAINING_SESSION` -> `AVAILABILITY_EVENT` | 1:0..M | Session reference is nullable. |

Required constraints / indexes:

- PK: `event_id`
- FK: `user_id`
- FK: `team_id`
- FK: `reported_by`
- FK nullable: `session_id`

Optional query-driven indexes:

- Index: `(user_id, event_date)`
- Index: `(team_id, event_date)`
- Index: `event_type`

## Shared Implementation Rules

- Use `snake_case` table and column names in implementation.
- Avoid `recommendation` and `override` in AVAIL-owned schema/API names.
- Treat snapshot/provenance references differently from structural FK relationships when documented as such.
- Do not expose raw athlete-owned sensitive inputs through shared operational records.
