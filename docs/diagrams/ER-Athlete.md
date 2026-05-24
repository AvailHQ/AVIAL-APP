# ER-Athlete Diagram Notes

Source diagram:
<img src='/docs/diagrams/img/ER-Athlete.png' />

```text
docs/diagrams/img/ER-Athlete.png
```

This document explains the athlete-perspective ER diagram as a backend implementation reference.

The diagram is not only a user journey diagram. It includes athlete-owned data, training participation, model outputs, privacy/governance records, and supporting reference tables needed to build the athlete-side data model safely.

## Core Boundary

Coach-facing services must not read athlete-owned restricted tables directly.

Restricted athlete data should flow through internal processing and privacy/consent checks before anything is made available to coach-facing views.

```text
athlete-owned data
  -> internal model / context processing
  -> privacy and consent boundary
  -> sanitized coach-facing output
```

Athlete-owned restricted tables include:

- `ATHLETE_PROFILE`
- `ATHLETE_DAILY_CHECKIN`
- `CYCLE_LOG`
- `SESSION_OUTCOME`
- `WEARABLE_SIGNAL`
- `WELFARE_FLAG`

## Diagram Color Categories

| Color  | Meaning                                           |
| ------ | ------------------------------------------------- |
| Purple | Athlete-owned data                                |
| Yellow | Data processing related                           |
| Red    | Privacy / governance related                      |
| Green  | Junction / associative entity                     |
| White  | Identity, team, sport, session, or reference data |

## Entity Relationships

### USER

Central identity table. A user may be an athlete, coach, staff member, admin, physio, or sport scientist depending on `USER_TEAM.Role_In_Team`.

Relationships:

| Relationship                         | Cardinality | Notes                                                      |
| ------------------------------------ | ----------: | ---------------------------------------------------------- |
| `USER` -> `USER_TEAM`                |         1:M | A user can belong to multiple teams.                       |
| `USER` -> `ATHLETE_PROFILE`          |      1:0..1 | Athlete users have one athlete profile.                    |
| `USER` -> `ATHLETE_DAILY_CHECKIN`    |         1:M | Athlete can submit many check-ins.                         |
| `USER` -> `CYCLE_LOG`                |         1:M | Athlete can have many cycle records.                       |
| `USER` -> `ATHLETE_SPORT_BACKGROUND` |         1:M | Athlete can have multiple sport backgrounds over time.     |
| `USER` -> `LOAD_SCORE`               |         1:M | Athlete can have many generated load scores.               |
| `USER` -> `ATHLETE_CONTEXT_STATE`    |         1:M | Historical/context states over time.                       |
| `USER` -> `TRAINING_SESSION_ATHLETE` |         1:M | Athlete can be attached to many sessions.                  |
| `USER` -> `SESSION_OUTCOME`          |    indirect | Use `SESSION_OUTCOME -> TRAINING_SESSION_ATHLETE -> USER`. |
| `USER` -> `WEARABLE_CONNECTION`      |         1:M | Athlete can connect multiple devices.                      |
| `USER` -> `WEARABLE_SIGNAL`          |         1:M | Denormalized convenience relationship.                     |
| `USER` -> `NOTIFICATION`             |         1:M | Athlete receives many notifications.                       |
| `USER` -> `CONSENT_RECORD`           |         1:M | Athlete can grant/withdraw consent many times.             |
| `USER` -> `WELFARE_FLAG`             |         1:M | Athlete can have restricted welfare flags.                 |
| `USER` -> `AVAILABILITY_EVENT`       |         1:M | Athlete can have many availability events.                 |

Recommended indexes:

- PK: `user_id`
- Unique: `email`
- Index: `account_status`

### TEAMS

Represents a club/team/squad context.

Relationships:

| Relationship                    | Cardinality | Notes                                        |
| ------------------------------- | ----------: | -------------------------------------------- |
| `TEAMS` -> `USER_TEAM`          |         1:M | A team has many users through memberships.   |
| `TEAMS` -> `TRAINING_SESSION`   |         1:M | A team has many training sessions.           |
| `TEAMS` -> `AVAILABILITY_EVENT` |         1:M | Availability events are team-scoped.         |
| `SPORTS` -> `TEAMS`             |         1:M | A sport can be primary sport for many teams. |

Recommended indexes:

- PK: `team_id`
- Index: `primary_sport_id`
- Index: `(team_name, country)`

### USER_TEAM

Associative entity between `USER` and `TEAMS`. Also stores a user's role within a team.

Relationships:

| Relationship           | Cardinality | Notes                                    |
| ---------------------- | ----------: | ---------------------------------------- |
| `USER` -> `USER_TEAM`  |         1:M | User may have multiple team memberships. |
| `TEAMS` -> `USER_TEAM` |         1:M | Team may have many members.              |

Recommended indexes:

- PK: `user_team_id`
- Unique: `(user_id, team_id, role_in_team, join_at)`
- Index: `user_id`
- Index: `team_id`
- Index: `(team_id, role_in_team, is_active)`
- Index: `(user_id, is_active)`

### SPORTS

Reference table for sports.

Relationships:

| Relationship                           | Cardinality | Notes                                        |
| -------------------------------------- | ----------: | -------------------------------------------- |
| `SPORTS` -> `SPORT_POSITION`           |         1:M | A sport can have many positions.             |
| `SPORTS` -> `TEAMS`                    |         1:M | A sport can be primary sport for many teams. |
| `SPORTS` -> `ATHLETE_SPORT_BACKGROUND` |         1:M | Athlete background references a sport.       |

Recommended indexes:

- PK: `sport_id`
- Unique: `sport_name`
- Index: `sport_category`

### SPORT_POSITION

Reference table for positions within a sport.

Relationships:

| Relationship                                   | Cardinality | Notes                                              |
| ---------------------------------------------- | ----------: | -------------------------------------------------- |
| `SPORTS` -> `SPORT_POSITION`                   |         1:M | Position belongs to one sport.                     |
| `SPORT_POSITION` -> `ATHLETE_SPORT_BACKGROUND` |         1:M | Many athlete backgrounds can reference a position. |

Recommended indexes:

- PK: `sport_position_id`
- Index: `sport_id`
- Unique: `(sport_id, position_name)`

### ATHLETE_SPORT_BACKGROUND

Associative entity connecting an athlete to sport and position history.

Relationships:

| Relationship                                   | Cardinality | Notes                                               |
| ---------------------------------------------- | ----------: | --------------------------------------------------- |
| `USER` -> `ATHLETE_SPORT_BACKGROUND`           |         1:M | Athlete can have multiple sport background records. |
| `SPORTS` -> `ATHLETE_SPORT_BACKGROUND`         |         1:M | Many athlete backgrounds can reference a sport.     |
| `SPORT_POSITION` -> `ATHLETE_SPORT_BACKGROUND` |         1:M | Position can be nullable if unknown/not applicable. |

Recommended indexes:

- PK: `user_sport_id`
- Index: `user_id`
- Index: `sport_id`
- Index: `sport_position_id`
- Index: `(user_id, is_primary)`
- Index: `(user_id, start_date, end_date)`

### ATHLETE_PROFILE

Athlete-owned restricted onboarding/baseline profile.

This table contains sensitive data. Coach-facing services must not query it directly.

Relationships:

| Relationship                | Cardinality | Notes                                        |
| --------------------------- | ----------: | -------------------------------------------- |
| `USER` -> `ATHLETE_PROFILE` |      1:0..1 | Only athlete users should have this profile. |

Recommended indexes:

- PK: `profile_id`
- Unique: `user_id`
- Index: `completed_at`

Do not add coach-facing indexes for sensitive fields such as `contraception_type`, `diagnosed_condition`, `reds_history`, `ethnicity_text`, or `neurodivergent_profile`.

### CYCLE_LOG

Athlete-owned restricted cycle history.

Coach-facing services must not query this table directly.

Relationships:

| Relationship                           | Cardinality | Notes                                       |
| -------------------------------------- | ----------: | ------------------------------------------- |
| `USER` -> `CYCLE_LOG`                  |         1:M | Athlete can have many cycle records.        |
| `CYCLE_LOG` -> `ATHLETE_DAILY_CHECKIN` |      1:0..M | Check-ins may optionally reference a cycle. |

Recommended indexes:

- PK: `cycle_id`
- Index: `user_id`
- Index: `(user_id, cycle_start)`
- Index: `(user_id, cycle_end)`
- Index: `(user_id, is_retroactive)`

### ATHLETE_DAILY_CHECKIN

Athlete-owned restricted daily input table.

This table contains period flags and mental readiness. Coach-facing services must not query it directly.

Relationships:

| Relationship                                 |      Cardinality | Notes                                                          |
| -------------------------------------------- | ---------------: | -------------------------------------------------------------- |
| `USER` -> `ATHLETE_DAILY_CHECKIN`            |              1:M | Athlete can submit many check-ins.                             |
| `CYCLE_LOG` -> `ATHLETE_DAILY_CHECKIN`       |           1:0..M | `cycle_id` is nullable.                                        |
| `ATHLETE_DAILY_CHECKIN` -> `LOAD_SCORE`      | 1:0..1 or 1:0..M | MVP should prefer 1:0..1; model logs track generation details. |
| `ATHLETE_DAILY_CHECKIN` -> `SESSION_OUTCOME` |           1:0..M | `checkin_id` in outcome is nullable.                           |

Recommended indexes:

- PK: `checkin_id`
- Index: `user_id`
- Index: `cycle_id`
- Unique or partial unique: `(user_id, checkin_date)` if one check-in per athlete per day is required
- Index: `(user_id, submitted_at)`

### MODEL_VERSION

Internal model version registry.

Relationships:

| Relationship                                   | Cardinality | Notes                                                 |
| ---------------------------------------------- | ----------: | ----------------------------------------------------- |
| `MODEL_VERSION` -> `LOAD_SCORE`                |         1:M | Many scores can be generated by one model version.    |
| `MODEL_VERSION` -> `LOAD_SCORE_GENERATION_LOG` |         1:M | Many generation logs can reference one model version. |
| `MODEL_VERSION` -> `ATHLETE_CONTEXT_STATE`     |         1:M | Context states should record model version used.      |

Recommended indexes:

- PK: `version_id`
- Unique: `version_tag`
- Index: `is_current_use`
- Index: `deployed_at`

### LOAD_SCORE

Internal contextual output for an athlete.

`LOAD_SCORE` may be generated from a check-in, estimated from recent patterns, or regenerated by later model logic. It should include uncertainty through `confidence_level`.

Relationships:

| Relationship                                |        Cardinality | Notes                                                                       |
| ------------------------------------------- | -----------------: | --------------------------------------------------------------------------- |
| `USER` -> `LOAD_SCORE`                      |                1:M | Athlete can have many load scores.                                          |
| `ATHLETE_DAILY_CHECKIN` -> `LOAD_SCORE`     |   1:0..1 or 1:0..M | `checkin_id` should be nullable if score can be estimated without check-in. |
| `MODEL_VERSION` -> `LOAD_SCORE`             |                1:M | Score records model version used.                                           |
| `LOAD_SCORE` -> `LOAD_SCORE_GENERATION_LOG` |      1:0..1 or 1:M | Use 1:M if regeneration attempts are retained.                              |
| `LOAD_SCORE` -> `TRAINING_SESSION_ATHLETE`  |                1:M | Same score may inform more than one athlete-session.                        |
| `LOAD_SCORE` -> `SESSION_OUTCOME`           | indirect preferred | Prefer `SESSION_OUTCOME -> TRAINING_SESSION_ATHLETE -> LOAD_SCORE`.         |

Recommended indexes:

- PK: `score_id`
- Index: `user_id`
- Index: `checkin_id`
- Index: `version_id`
- Index: `(user_id, generated_at)`
- Index: `(user_id, confidence_level, generated_at)`

### LOAD_SCORE_GENERATION_LOG

Internal generation/provenance log for Load Score creation.

Recommended naming for future migration:

```text
MODEL_RUN
```

Relationships:

| Relationship                                   | Cardinality | Notes                                          |
| ---------------------------------------------- | ----------: | ---------------------------------------------- |
| `LOAD_SCORE` -> `LOAD_SCORE_GENERATION_LOG`    |      1:0..M | One score may have generation/provenance logs. |
| `MODEL_VERSION` -> `LOAD_SCORE_GENERATION_LOG` |         1:M | Logs record model version.                     |

Recommended indexes:

- PK: `model_run_id`
- Index: `score_id`
- Index: `model_version_id`
- Index: `generated_at`
- Index: `(score_id, generated_at)`

Implementation note:

`input_completeness_state` should be an enum rather than a boolean.

Suggested values:

```text
complete
partial
limited
estimated
unavailable
```

### ATHLETE_CONTEXT_STATE

Internal rolling context state for an athlete.

This table includes sensitive inferred context such as `cycle_phase_inferred`; coach-facing services must not query it directly.

Relationships:

| Relationship                               | Cardinality | Notes                                          |
| ------------------------------------------ | ----------: | ---------------------------------------------- |
| `USER` -> `ATHLETE_CONTEXT_STATE`          |         1:M | Athlete can have many state records over time. |
| `MODEL_VERSION` -> `ATHLETE_CONTEXT_STATE` |         1:M | State records model version used.              |

Recommended indexes:

- PK: `state_id`
- Index: `user_id`
- Index: `model_version_id`
- Index: `(user_id, last_updated)`
- Index: `(user_id, confidence_state, last_updated)`

Implementation note:

Use `model_version_id`, not `model_version`, for consistency with `MODEL_VERSION.version_id`.

### TRAINING_SESSION

Team-level training session created by a coach.

Relationships:

| Relationship                                     | Cardinality | Notes                                                |
| ------------------------------------------------ | ----------: | ---------------------------------------------------- |
| `TEAMS` -> `TRAINING_SESSION`                    |         1:M | Team has many sessions.                              |
| `USER(coach)` -> `TRAINING_SESSION`              |         1:M | Coach can create many sessions.                      |
| `TRAINING_SESSION` -> `TRAINING_SESSION_ATHLETE` |         1:M | Session includes many athletes.                      |
| `TRAINING_SESSION` -> `AVAILABILITY_EVENT`       |      1:0..M | Availability event may optionally reference session. |

Recommended indexes:

- PK: `session_id`
- Index: `team_id`
- Index: `created_by`
- Index: `(team_id, training_session_date)`
- Index: `(created_by, training_session_date)`

### TRAINING_SESSION_ATHLETE

Associative entity between a training session and athlete. Stores session-specific athlete planning and participation data.

Relationships:

| Relationship                                     | Cardinality | Notes                                         |
| ------------------------------------------------ | ----------: | --------------------------------------------- |
| `TRAINING_SESSION` -> `TRAINING_SESSION_ATHLETE` |         1:M | Session has many athlete rows.                |
| `USER(athlete)` -> `TRAINING_SESSION_ATHLETE`    |         1:M | Athlete can appear in many sessions.          |
| `LOAD_SCORE` -> `TRAINING_SESSION_ATHLETE`       |         1:M | Score used as pre-session context.            |
| `TRAINING_SESSION_ATHLETE` -> `SESSION_OUTCOME`  |      1:0..1 | Athlete may submit one outcome for a session. |

Recommended indexes:

- PK: `session_athlete_id`
- Unique: `(session_id, user_id)`
- Index: `session_id`
- Index: `user_id`
- Index: `score_id`
- Index: `(user_id, session_id)`
- Index: `(session_id, actual_participation_status)`

### SESSION_OUTCOME

Athlete-owned post-session feedback. Used as a calibration signal.

This table should connect to `TRAINING_SESSION_ATHLETE` instead of duplicating `session_id` and `user_id`.

Relationships:

| Relationship                                    |        Cardinality | Notes                                                  |
| ----------------------------------------------- | -----------------: | ------------------------------------------------------ |
| `TRAINING_SESSION_ATHLETE` -> `SESSION_OUTCOME` |             1:0..1 | One outcome per athlete-session.                       |
| `ATHLETE_DAILY_CHECKIN` -> `SESSION_OUTCOME`    |             1:0..M | Optional connection to same-day check-in.              |
| `LOAD_SCORE` -> `SESSION_OUTCOME`               | indirect preferred | Use `TRAINING_SESSION_ATHLETE.score_id` when possible. |

Recommended indexes:

- PK: `outcome_id`
- Unique: `session_athlete_id`
- Index: `checkin_id`
- Index: `score_id` only if intentionally storing score snapshot on outcome
- Index: `submitted_at`

Implementation note:

If `SESSION_OUTCOME.score_id` is kept, define it as a snapshot/provenance field. Otherwise prefer:

```text
SESSION_OUTCOME -> TRAINING_SESSION_ATHLETE -> LOAD_SCORE
```

### WEARABLE_CONNECTION

Athlete-owned wearable connection metadata.

Relationships:

| Relationship                               | Cardinality | Notes                                          |
| ------------------------------------------ | ----------: | ---------------------------------------------- |
| `USER` -> `WEARABLE_CONNECTION`            |         1:M | Athlete can have multiple connections/devices. |
| `WEARABLE_CONNECTION` -> `WEARABLE_SIGNAL` |         1:M | Connection produces many signal records.       |

Recommended indexes:

- PK: `connection_id`
- Index: `user_id`
- Index: `(user_id, device_type, is_active)`
- Index: `last_sync_at`
- Unique optional: `(user_id, device_type)` for one active connection per device type

### WEARABLE_SIGNAL

Athlete-owned raw wearable signal table.

Coach-facing services must not query this table directly.

Relationships:

| Relationship                               | Cardinality | Notes                                  |
| ------------------------------------------ | ----------: | -------------------------------------- |
| `WEARABLE_CONNECTION` -> `WEARABLE_SIGNAL` |         1:M | Connection has many signal records.    |
| `USER` -> `WEARABLE_SIGNAL`                |         1:M | Denormalized convenience relationship. |

Recommended indexes:

- PK: `signal_id`
- Index: `connection_id`
- Index: `user_id`
- Index: `(user_id, recorded_date)`
- Index: `(connection_id, recorded_date)`
- Index: `synced_at`

Implementation note:

If both `user_id` and `connection_id` are stored, enforce consistency so `WEARABLE_SIGNAL.user_id` matches `WEARABLE_CONNECTION.user_id`.

### CONSENT_RECORD

Athlete-owned consent history.

Relationships:

| Relationship               | Cardinality | Notes                                          |
| -------------------------- | ----------: | ---------------------------------------------- |
| `USER` -> `CONSENT_RECORD` |         1:M | Athlete can grant/withdraw consent many times. |

Recommended indexes:

- PK: `consent_id`
- Index: `user_id`
- Index: `(user_id, consent_type, data_category)`
- Index: `(user_id, is_grant)`
- Index: `grant_at`
- Index: `withdrawn_at`

Implementation note:

Consider renaming `User_ID` to `user_id (athlete)` in diagrams and schema comments. Consent is granted by the athlete.

### WELFARE_FLAG

Restricted welfare pattern flag.

This table must not be available to coach-facing services. Welfare routing must follow athlete consent and medical-review rules.

Relationships:

| Relationship                     | Cardinality | Notes                                                                            |
| -------------------------------- | ----------: | -------------------------------------------------------------------------------- |
| `USER` -> `WELFARE_FLAG`         |         1:M | Athlete can have many welfare flags.                                             |
| `WELFARE_FLAG` -> `NOTIFICATION` |      1:0..M | Notifications may reference a welfare flag through polymorphic reference fields. |

Recommended indexes:

- PK: `flag_id`
- Index: `user_id`
- Index: `(user_id, flag_type, trigger_date)`
- Index: `(user_id, is_resolved)`
- Index: `medic_notified`
- Index: `resolved_at`

### NOTIFICATION

Athlete-facing notification/prompt table.

`reference_type` and `reference_id` are polymorphic references, not strict foreign keys.

Relationships:

| Relationship                     | Cardinality | Notes                                           |
| -------------------------------- | ----------: | ----------------------------------------------- |
| `USER` -> `NOTIFICATION`         |         1:M | Athlete can receive many notifications.         |
| `WELFARE_FLAG` -> `NOTIFICATION` |      1:0..M | Via `reference_type/reference_id`, not hard FK. |
| Other entities -> `NOTIFICATION` |      1:0..M | Check-in reminders, low-confidence alerts, etc. |

Recommended indexes:

- PK: `notification_id`
- Index: `user_id`
- Index: `(user_id, if_read, created_at)`
- Index: `(reference_type, reference_id)`
- Index: `message_category`
- Index: `created_at`

### AVAILABILITY_EVENT

Operational availability tracking event.

This is more coach/operations-facing than athlete-owned, but appears in the athlete-related ERD because it references an athlete and may include score context.

Relationships:

| Relationship                               | Cardinality | Notes                          |
| ------------------------------------------ | ----------: | ------------------------------ |
| `USER(athlete)` -> `AVAILABILITY_EVENT`    |         1:M | Athlete can have many events.  |
| `TEAMS` -> `AVAILABILITY_EVENT`            |         1:M | Events are team scoped.        |
| `USER(coach)` -> `AVAILABILITY_EVENT`      |         1:M | Coach may report many events.  |
| `TRAINING_SESSION` -> `AVAILABILITY_EVENT` |      1:0..M | Session reference is nullable. |

Recommended indexes:

- PK: `event_id`
- Index: `user_id`
- Index: `team_id`
- Index: `reported_by`
- Index: `session_id`
- Index: `(user_id, event_date)`
- Index: `(team_id, event_date)`
- Index: `event_type`

Implementation note:

`load_score_context` is JSON snapshot data. It should not expose raw athlete-owned sensitive inputs.

## Recommended Backend Constraints

Use these constraints in addition to foreign keys:

- `ATHLETE_DAILY_CHECKIN.sleep_quality` between 1 and 5.
- `ATHLETE_DAILY_CHECKIN.fatigue_level` between 1 and 5.
- `ATHLETE_DAILY_CHECKIN.soreness_level` between 1 and 5.
- `ATHLETE_DAILY_CHECKIN.mental_readiness` between 1 and 5.
- `LOAD_SCORE.score_value` between 0 and 100.
- `TRAINING_SESSION_ATHLETE` should be unique on `(session_id, user_id)`.
- `SESSION_OUTCOME` should be unique on `session_athlete_id`.
- `ATHLETE_PROFILE.user_id` should be unique.
- `WEARABLE_SIGNAL.user_id` must match the user on the referenced `WEARABLE_CONNECTION`.

## Access Rules

Backend services should enforce the following boundaries:

| Data Area               | Coach-facing direct access? | Notes                                                                      |
| ----------------------- | --------------------------: | -------------------------------------------------------------------------- |
| `ATHLETE_PROFILE`       |                          No | Sensitive onboarding data.                                                 |
| `ATHLETE_DAILY_CHECKIN` |                          No | Raw mental readiness and period flags.                                     |
| `CYCLE_LOG`             |                          No | Raw cycle data.                                                            |
| `WEARABLE_SIGNAL`       |                          No | Raw wearable signals.                                                      |
| `ATHLETE_CONTEXT_STATE` |                          No | Contains inferred sensitive state.                                         |
| `WELFARE_FLAG`          |                          No | Restricted welfare data.                                                   |
| `LOAD_SCORE`            |               Internal only | Coach should receive sanitized derived fields through coach-facing output. |
| `SESSION_OUTCOME`       |        No direct raw access | Use only sanitized summaries where appropriate.                            |
| `AVAILABILITY_EVENT`    |             Yes, restricted | Operational event only; must not include raw sensitive details.            |

## Implementation Notes

- Prefer snake_case in the database schema even where the diagram currently uses mixed casing.
- Keep polymorphic references such as `NOTIFICATION.reference_type/reference_id` visually distinct from strict FK relationships.
- Treat green tables as junction / associative entities because they store relationship attributes, not only foreign keys.
- Do not optimize indexes for coach access to athlete-owned restricted data. Coach workflows should use sanitized output models.
- Add audit logging to coach-facing access paths, especially when coach-facing views are generated or viewed.
