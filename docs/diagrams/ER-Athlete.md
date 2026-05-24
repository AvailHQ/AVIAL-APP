# ER-Athlete Diagram Notes

Source diagram:
<img src='/docs/diagrams/img/ER-Athlete.png' />

```text
docs/diagrams/img/ER-Athlete.png
```

This document explains the athlete-perspective ER diagram as a backend implementation reference.

Shared entity definitions live in:

```text
docs/diagrams/ER-Shared.md
```

Use `ER-Shared.md` as the source of truth for shared entities such as `USER`, `TEAMS`, `USER_TEAM`, `MODEL_VERSION`, `LOAD_SCORE`, `LOAD_SCORE_GENERATION_LOG`, `TRAINING_SESSION`, `TRAINING_SESSION_ATHLETE`, and `AVAILABILITY_EVENT`.

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

## Context State, Score, And Model Run Relationship

The context-state relationship follows the PRD's persistent athlete context model. See `docs/PRD.md`, especially section 13, "Persistent Athlete Context State", which states that the system maintains a continuously updated athlete contextual state and that Load Score is generated from this evolving state rather than isolated daily inputs.

Use the entities this way:

```text
ATHLETE_CONTEXT_STATE
= current latest state for an athlete; at most one row per athlete; updated over time.

ATHLETE_CONTEXT_STATE_HISTORY
= immutable snapshot written whenever the athlete context state is updated.

LOAD_SCORE
= score/output generated from a specific context-state history snapshot.

LOAD_SCORE_GENERATION_LOG
= model-run/provenance record for how a score was generated, including input completeness, estimation use, missing data categories, and confidence reason.
```

Recommended flow:

```text
check-in / cycle log / wearable signals / session outcome
  -> update ATHLETE_CONTEXT_STATE
  -> write ATHLETE_CONTEXT_STATE_HISTORY snapshot
  -> generate LOAD_SCORE from state_history_id
  -> write LOAD_SCORE_GENERATION_LOG
```

This matters because `ATHLETE_CONTEXT_STATE` is mutable. Historical Load Scores need an immutable context basis, otherwise an old score would point at a current-state row whose values have since changed.

## Diagram Color Categories

| Color  | Meaning                                           |
| ------ | ------------------------------------------------- |
| Purple | Athlete-owned data                                |
| Yellow | Data processing related                           |
| Red    | Privacy / governance related                      |
| Green  | Junction / associative entity                     |
| White  | Identity, team, sport, session, or reference data |

## Index Guidance

The index lists in this document are design guidance, not an instruction to create every index on day one.

When implementing the backend schema, split indexes into:

```text
Required constraints / indexes
```

Use these for data integrity:

- Primary keys
- Foreign keys
- Unique constraints that enforce business rules
- Minimal indexes needed by required foreign-key relationships, depending on database engine

```text
Optional query-driven indexes
```

Use these only when the application has a known query pattern or performance need:

- Dashboard filtering
- Timeline queries
- Active membership lookups
- Recent check-in retrieval
- Model history lookup
- Reporting queries

Do not create indexes to make coach access to restricted athlete-owned data easier. Coach-facing workflows should use sanitized output/read models, not direct queries against athlete-owned restricted tables.

## Entity Columns And Types

These columns reflect the current `ER-Athlete.png` diagram and add recommended enum values for backend schema design. Use `snake_case` in implementation even where the diagram still uses mixed casing.

Shared entity columns and types are defined in `ER-Shared.md`. This section only defines athlete-specific entities and athlete-side reference tables.

### SPORTS Columns

| Column | Type | Notes |
| --- | --- | --- |
| `sport_id` | `int` | Primary key. |
| `sport_name` | `varchar` | Example: `Football`, `Swimming`, `Rugby`. |
| `sport_category` | `enum` | `team_field`, `team_court`, `endurance`, `strength_power`, `aquatic`, `individual`, `other`. |

### SPORT_POSITION Columns

| Column | Type | Notes |
| --- | --- | --- |
| `sport_position_id` | `int` | Primary key. |
| `sport_id` | `int` | FK to `SPORTS.sport_id`. |
| `position_name` | `varchar` | Sport-specific position name. |

### ATHLETE_SPORT_BACKGROUND Columns

| Column | Type | Notes |
| --- | --- | --- |
| `user_sport_id` | `int` | Primary key. |
| `user_id` | `int` | FK to `USER.user_id`; athlete user. |
| `sport_id` | `int` | FK to `SPORTS.sport_id`. |
| `sport_position_id` | `int nullable` | FK to `SPORT_POSITION.sport_position_id`; nullable when unknown or not applicable. |
| `year_of_experience` | `int` | Years of experience in this sport. |
| `is_primary` | `boolean` | Whether this is the athlete's primary sport background. |
| `start_date` | `datetime` | Start date for this background record. |
| `end_date` | `datetime nullable` | End date, nullable for current record. |

### ATHLETE_PROFILE Columns

This table contains restricted athlete-owned data.

| Column | Type | Notes |
| --- | --- | --- |
| `profile_id` | `int` | Primary key. |
| `user_id` | `int` | FK to `USER.user_id`; athlete user. Should be unique. |
| `cycle_regularity` | `enum` | `regular`, `irregular`, `absent`, `not_applicable`, `prefer_not_to_say`. |
| `contraception_type` | `enum` | `combined_pill_or_patch`, `progesterone_only`, `implant`, `hormonal_iud`, `non_hormonal`, `none`, `prefer_not_to_say`. |
| `diagnosed_condition` | `text` | Controlled multi-select text/JSON if needed. Suggested values: `dysmenorrhea`, `pcos`, `endometriosis`, `none`, `prefer_not_to_say`. |
| `reds_history` | `enum` | `yes`, `no`, `prefer_not_to_say`. |
| `training_years` | `enum` | `under_2`, `two_to_five`, `five_to_ten`, `ten_plus`. |
| `primary_training` | `enum` | `endurance_dominant`, `strength_dominant`, `mixed`, `technical`, `other`. |
| `weekly_hours` | `enum` | `under_5`, `five_to_ten`, `ten_to_fifteen`, `fifteen_plus`. |
| `dietary_pattern` | `enum` | `high_carbohydrate`, `plant_based`, `mixed_omnivore`, `high_protein`, `restricted`, `other`, `prefer_not_to_say`. |
| `ethnicity_text` | `text` | Restricted; use for athlete-controlled profile/dataset diversity only. |
| `neurodivergent_profile` | `enum` | `adhd`, `autism`, `both`, `neither`, `prefer_not_to_say`. |
| `sleep_sensitivity` | `enum` | `highly_variable`, `fairly_consistent`, `very_consistent`, `not_sure`. |
| `rpe_calibration` | `enum` | `underreport_effort`, `accurate`, `overreport_effort`, `not_sure`. |
| `energy_availability_concern` | `enum` | `rarely_fuelled`, `sometimes`, `usually_fine`, `prefer_not_to_say`. |
| `iron_supplementation` | `enum` | `currently_supplementing`, `previously_low`, `no`, `prefer_not_to_say`. |
| `completed_at` | `datetime` | Onboarding completion timestamp. |

### CYCLE_LOG Columns

This table contains restricted athlete-owned data.

| Column | Type | Notes |
| --- | --- | --- |
| `cycle_id` | `int` | Primary key. |
| `user_id` | `int` | FK to `USER.user_id`; athlete user. |
| `cycle_start` | `datetime` | Cycle start timestamp/date. |
| `cycle_end` | `datetime nullable` | Cycle end timestamp/date. |
| `cycle_length_days` | `int nullable` | Calculated length when enough data exists. |
| `is_retroactive` | `boolean` | Whether the athlete entered this after the fact. |
| `created_at` | `datetime` | Row creation timestamp. |

### ATHLETE_DAILY_CHECKIN Columns

This table contains restricted athlete-owned data.

| Column | Type | Notes |
| --- | --- | --- |
| `checkin_id` | `int` | Primary key. |
| `cycle_id` | `int nullable` | Optional FK to `CYCLE_LOG.cycle_id`. |
| `user_id` | `int` | FK to `USER.user_id`; athlete user. |
| `checkin_date` | `datetime` | Date/time of check-in. |
| `sleep_quality` | `int` | Scale 1-5. |
| `fatigue_level` | `int` | Scale 1-5. |
| `soreness_level` | `int` | Scale 1-5. |
| `mental_readiness` | `int` | Scale 1-5; performance framing only. |
| `submitted_at` | `datetime` | Submission timestamp. |

Period timing is stored in `CYCLE_LOG`, not duplicated on the daily check-in row.

### ATHLETE_CONTEXT_STATE Columns

Current rolling context state. This table contains restricted inferred context.

| Column | Type | Notes |
| --- | --- | --- |
| `state_id` | `int` | Primary key. |
| `user_id` | `int` | FK to `USER.user_id`; athlete user. Should be unique for current-state table. |
| `model_version_id` | `int` | FK to `MODEL_VERSION.version_id`. |
| `rolling_fatigue` | `float` | Internal rolling fatigue measure. |
| `recovery_trend` | `enum` | `improving`, `stable`, `declining`, `insufficient_data`. |
| `context_stability` | `float` | Internal stability score/measure. |
| `confidence_state` | `enum` | `high`, `medium`, `low`, `very_low`. |
| `cycle_phase_inferred` | `enum` | `menstrual`, `follicular`, `ovulatory`, `luteal`, `suppressed`, `irregular`, `unknown`, `not_applicable`. Restricted; not coach-facing. |
| `is_conservative_mode` | `boolean` | Whether conservative mode is active. |
| `last_updated` | `datetime` | Last state update timestamp. |

### ATHLETE_CONTEXT_STATE_HISTORY Columns

Immutable history of athlete context state snapshots. This table contains restricted inferred context and must not be coach-facing.

This entity is important because the PRD defines Load Score as generated from an evolving athlete context state rather than isolated daily inputs (`docs/PRD.md`, section 13, "Persistent Athlete Context State"). Since `ATHLETE_CONTEXT_STATE` stores the current state and is updated over time, this history table preserves the exact context snapshot that a historical `LOAD_SCORE` was based on.

| Column | Type | Notes |
| --- | --- | --- |
| `state_history_id` | `int` | Primary key. |
| `user_id` | `int` | FK to `USER.user_id`; athlete user. |
| `source_state_id` | `int` | FK to `ATHLETE_CONTEXT_STATE.state_id`; current-state row this snapshot was written from. |
| `model_version_id` | `int` | FK to `MODEL_VERSION.version_id`; model/rule version used when producing the snapshot. |
| `source_checkin_id` | `int nullable` | Optional FK to `ATHLETE_DAILY_CHECKIN.checkin_id` if a check-in contributed to this update. |
| `source_cycle_id` | `int nullable` | Optional FK to `CYCLE_LOG.cycle_id` if cycle data contributed to this update. |
| `source_session_outcome_id` | `int nullable` | Optional FK to `SESSION_OUTCOME.outcome_id` if session feedback contributed to this update. |
| `wearable_window_start` | `datetime nullable` | Start of wearable signal window used for this update, if applicable. |
| `wearable_window_end` | `datetime nullable` | End of wearable signal window used for this update, if applicable. |
| `source_summary` | `json nullable` | Minimal provenance summary of source categories used; do not store raw sensitive values unnecessarily. |
| `rolling_fatigue` | `float` | Snapshot of internal rolling fatigue measure. |
| `recovery_trend` | `enum` | `improving`, `stable`, `declining`, `insufficient_data`. |
| `context_stability` | `float` | Snapshot of internal stability score/measure. |
| `confidence_state` | `enum` | `high`, `medium`, `low`, `very_low`. |
| `cycle_phase_inferred` | `enum` | `menstrual`, `follicular`, `ovulatory`, `luteal`, `suppressed`, `irregular`, `unknown`, `not_applicable`. Restricted; not coach-facing. |
| `is_conservative_mode` | `boolean` | Whether conservative mode was active at snapshot time. |
| `snapshot_at` | `datetime` | Timestamp when the immutable snapshot was written. |

### SESSION_OUTCOME Columns

Athlete-owned post-session feedback.

| Column | Type | Notes |
| --- | --- | --- |
| `outcome_id` | `int` | Primary key. |
| `checkin_id` | `int nullable` | Optional FK to `ATHLETE_DAILY_CHECKIN.checkin_id`. |
| `session_athlete_id` | `int` | FK to `TRAINING_SESSION_ATHLETE.session_athlete_id`. |
| `score_id` | `int` | Optional snapshot/reference to score used at outcome time. Consider removing if `TRAINING_SESSION_ATHLETE.score_id` is source of truth. |
| `outcome` | `enum` | `easier_than_expected`, `as_expected`, `harder_than_expected`. |
| `if_different_reason` | `enum nullable` | Better name: `harder_than_expected_reason`. Suggested: `physical_fatigue`, `recovery_not_fully_there`, `soreness`, `mental_exhaustion`, `session_intensity`, `other`. |
| `submitted_at` | `datetime` | Submission timestamp. |

### WEARABLE_CONNECTION Columns

| Column | Type | Notes |
| --- | --- | --- |
| `connection_id` | `int` | Primary key. |
| `user_id` | `int` | FK to `USER.user_id`; athlete user. |
| `device_type` | `enum` | `oura`, `whoop`, `garmin`, `apple_health`, `catapult`, `kitman`, `manual_import`, `other`. |
| `oauth_token_hash` | `varchar` | Hashed/encrypted token reference, never raw token. |
| `token_expiry` | `datetime` | Token expiry timestamp. |
| `last_sync_at` | `datetime` | Last successful sync timestamp. |
| `is_active` | `boolean` | Whether connection is active. |

### WEARABLE_SIGNAL Columns

This table contains restricted athlete-owned raw wearable data.

| Column | Type | Notes |
| --- | --- | --- |
| `signal_id` | `int` | Primary key. |
| `connection_id` | `int` | FK to `WEARABLE_CONNECTION.connection_id`. |
| `user_id` | `int` | FK to `USER.user_id`; athlete user. |
| `device_type` | `enum` | Same options as `WEARABLE_CONNECTION.device_type`. |
| `hrv` | `float nullable` | Heart-rate variability. |
| `resting_hr` | `float nullable` | Resting heart rate. |
| `skin_temp_deviation` | `float nullable` | Skin temperature deviation. |
| `sleep_score` | `float nullable` | Device sleep score. |
| `sleep_duration` | `float nullable` | Sleep duration, preferably hours. |
| `readiness_score` | `float nullable` | Device readiness score. |
| `strain` | `float nullable` | Device strain/load measure. |
| `recorded_date` | `datetime` | Date/time signal was recorded by source. |
| `synced_at` | `datetime` | Date/time signal was synced into AVAIL. |

### CONSENT_RECORD Columns

Athlete-owned consent history.

| Column | Type | Notes |
| --- | --- | --- |
| `consent_id` | `int` | Primary key. |
| `user_id` | `int` | FK to `USER.user_id`; athlete user. |
| `consent_type` | `enum` | `coach_context_sharing`, `medical_welfare_flag`, `wearable_sync`, `model_training`, `anonymised_dataset`, `research_use`. |
| `data_category` | `enum` | `structured_context`, `daily_checkin`, `cycle_data`, `wearable_signal`, `session_outcome`, `welfare_flag`, `profile_baseline`, `availability_event`. |
| `purpose` | `text` | Purpose for consent. |
| `is_grant` | `boolean` | True for grant, false for withdrawal/denial event. |
| `grant_at` | `datetime` | Grant timestamp. |
| `withdrawn_at` | `datetime nullable` | Withdrawal timestamp. |
| `consent_version` | `varchar` | Version of consent wording/policy. |

### WELFARE_FLAG Columns

Restricted welfare pattern flag. Never coach-facing.

| Column | Type | Notes |
| --- | --- | --- |
| `flag_id` | `int` | Primary key. |
| `user_id` | `int` | FK to `USER.user_id`; athlete user. |
| `flag_type` | `enum` | `reds_pattern`, `wellbeing_pattern`, `low_energy_pattern`, `sustained_low_readiness`, `other`. |
| `trigger_date` | `datetime` | Trigger timestamp. |
| `signals_triggered` | `text` | Restricted description of triggered signals. |
| `athlete_response` | `enum` | `already_spoken_to_medical`, `would_like_to_speak`, `fine`, `not_sure`, `no_response`. |
| `response_at` | `datetime nullable` | Athlete response timestamp. |
| `medic_notified` | `boolean` | Whether medic was notified under consent. |
| `is_resolved` | `boolean` | Whether flag is resolved. |
| `resolved_at` | `datetime nullable` | Resolution timestamp. |

### NOTIFICATION Columns

Athlete-facing notification/prompt table.

| Column | Type | Notes |
| --- | --- | --- |
| `notification_id` | `int` | Primary key. |
| `user_id` | `int` | FK to `USER.user_id`; athlete user. |
| `reference_type` | `enum` | `welfare_alert`, `checkin_reminder`, `low_confidence_alert`, `session_outcome_prompt`, `consent_update`, `system_message`. |
| `reference_id` | `int nullable` | Polymorphic reference; not strict FK. |
| `type` | `enum` | `prompt`, `reminder`, `status_update`, `welfare_prompt`, `system`. |
| `message_category` | `enum` | `checkin`, `session_outcome`, `context_update`, `consent`, `welfare`, `wearable`, `system`. |
| `created_at` | `datetime` | Notification creation timestamp. |
| `if_read` | `boolean` | Better name: `is_read`. |
| `read_at` | `datetime nullable` | Read timestamp. |
| `response_at` | `datetime nullable` | Response timestamp if prompt requires response. |

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
| `USER` -> `ATHLETE_CONTEXT_STATE`    |      1:0..1 | Current rolling context state for the athlete.             |
| `USER` -> `ATHLETE_CONTEXT_STATE_HISTORY` |      1:M | Athlete can have many immutable context-state snapshots. |
| `USER` -> `TRAINING_SESSION_ATHLETE` |         1:M | Athlete can be attached to many sessions.                  |
| `USER` -> `SESSION_OUTCOME`          |    indirect | Use `SESSION_OUTCOME -> TRAINING_SESSION_ATHLETE -> USER`. |
| `USER` -> `WEARABLE_CONNECTION`      |         1:M | Athlete can connect multiple devices.                      |
| `USER` -> `WEARABLE_SIGNAL`          |         1:M | Denormalized convenience relationship.                     |
| `USER` -> `NOTIFICATION`             |         1:M | Athlete receives many notifications.                       |
| `USER` -> `CONSENT_RECORD`           |         1:M | Athlete can grant/withdraw consent many times.             |
| `USER` -> `WELFARE_FLAG`             |         1:M | Athlete can have restricted welfare flags.                 |
| `USER` -> `AVAILABILITY_EVENT`       |         1:M | Athlete can have many availability events.                 |

Shared entity columns and index guidance are maintained in `ER-Shared.md`.

### TEAMS

Represents a club/team/squad context.

Relationships:

| Relationship                    | Cardinality | Notes                                        |
| ------------------------------- | ----------: | -------------------------------------------- |
| `TEAMS` -> `USER_TEAM`          |         1:M | A team has many users through memberships.   |
| `TEAMS` -> `TRAINING_SESSION`   |         1:M | A team has many training sessions.           |
| `TEAMS` -> `AVAILABILITY_EVENT` |         1:M | Availability events are team-scoped.         |
| `SPORTS` -> `TEAMS`             |         1:M | A sport can be primary sport for many teams. |

Shared entity columns and index guidance are maintained in `ER-Shared.md`.

### USER_TEAM

Associative entity between `USER` and `TEAMS`. Also stores a user's role within a team.

Relationships:

| Relationship           | Cardinality | Notes                                    |
| ---------------------- | ----------: | ---------------------------------------- |
| `USER` -> `USER_TEAM`  |         1:M | User may have multiple team memberships. |
| `TEAMS` -> `USER_TEAM` |         1:M | Team may have many members.              |

Shared entity columns and index guidance are maintained in `ER-Shared.md`.

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
| `CYCLE_LOG` -> `ATHLETE_CONTEXT_STATE_HISTORY` | 1:0..M | Nullable source reference through `source_cycle_id`. |

Recommended indexes:

- PK: `cycle_id`
- Index: `user_id`
- Index: `(user_id, cycle_start)`
- Index: `(user_id, cycle_end)`
- Index: `(user_id, is_retroactive)`

### ATHLETE_DAILY_CHECKIN

Athlete-owned restricted daily input table.

This table contains raw daily athlete inputs, including mental readiness. Coach-facing services must not query it directly.

Relationships:

| Relationship                                 |      Cardinality | Notes                                                          |
| -------------------------------------------- | ---------------: | -------------------------------------------------------------- |
| `USER` -> `ATHLETE_DAILY_CHECKIN`            |              1:M | Athlete can submit many check-ins.                             |
| `CYCLE_LOG` -> `ATHLETE_DAILY_CHECKIN`       |           1:0..M | `cycle_id` is nullable.                                        |
| `ATHLETE_DAILY_CHECKIN` -> `LOAD_SCORE`      | 1:0..1 or 1:0..M | MVP should prefer 1:0..1; model logs track generation details. |
| `ATHLETE_DAILY_CHECKIN` -> `SESSION_OUTCOME` |           1:0..M | `checkin_id` in outcome is nullable.                           |
| `ATHLETE_DAILY_CHECKIN` -> `ATHLETE_CONTEXT_STATE_HISTORY` | 1:0..M | `source_checkin_id` is nullable; check-ins may contribute to state updates. |

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
| `MODEL_VERSION` -> `ATHLETE_CONTEXT_STATE_HISTORY` |     1:M | Context-state snapshots should record model/rule version used. |

Shared entity columns and index guidance are maintained in `ER-Shared.md`.

### LOAD_SCORE

Internal contextual output for an athlete.

`LOAD_SCORE` may be generated from a check-in, estimated from recent patterns, or regenerated by later model logic. It should include uncertainty through `confidence_level`.

Relationships:

| Relationship                                |        Cardinality | Notes                                                                       |
| ------------------------------------------- | -----------------: | --------------------------------------------------------------------------- |
| `USER` -> `LOAD_SCORE`                      |                1:M | Athlete can have many load scores.                                          |
| `ATHLETE_DAILY_CHECKIN` -> `LOAD_SCORE`     |   1:0..1 or 1:0..M | `checkin_id` should be nullable if score can be estimated without check-in. |
| `ATHLETE_CONTEXT_STATE_HISTORY` -> `LOAD_SCORE` |             1:M | Load Score is generated from an immutable context-state snapshot. |
| `MODEL_VERSION` -> `LOAD_SCORE`             |                1:M | Score records model version used.                                           |
| `LOAD_SCORE` -> `LOAD_SCORE_GENERATION_LOG` |      1:0..1 or 1:M | Use 1:M if regeneration attempts are retained.                              |
| `LOAD_SCORE` -> `TRAINING_SESSION_ATHLETE`  |                1:M | Same score may inform more than one athlete-session.                        |
| `LOAD_SCORE` -> `SESSION_OUTCOME`           | indirect preferred | Prefer `SESSION_OUTCOME -> TRAINING_SESSION_ATHLETE -> LOAD_SCORE`.         |

Shared entity columns and index guidance are maintained in `ER-Shared.md`.

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

Shared entity columns and index guidance are maintained in `ER-Shared.md`.

### ATHLETE_CONTEXT_STATE

Internal rolling context state for an athlete.

This table includes sensitive inferred context such as `cycle_phase_inferred`; coach-facing services must not query it directly.

Relationships:

| Relationship                               | Cardinality | Notes                                          |
| ------------------------------------------ | ----------: | ---------------------------------------------- |
| `USER` -> `ATHLETE_CONTEXT_STATE`          |      1:0..1 | Athlete has at most one current rolling context state, updated over time. |
| `MODEL_VERSION` -> `ATHLETE_CONTEXT_STATE` |         1:M | Many current athlete states can reference the same model version.         |
| `ATHLETE_CONTEXT_STATE` -> `ATHLETE_CONTEXT_STATE_HISTORY` | 1:M | Each state update should write an immutable history snapshot. |

Recommended indexes:

- PK: `state_id`
- Unique: `user_id`
- Index: `model_version_id`
- Index: `(user_id, last_updated)`
- Index: `(user_id, confidence_state, last_updated)`

Implementation note:

Use `model_version_id`, not `model_version`, for consistency with `MODEL_VERSION.version_id`.

Historical snapshots belong in `ATHLETE_CONTEXT_STATE_HISTORY`, not as multiple rows in `ATHLETE_CONTEXT_STATE`.

### ATHLETE_CONTEXT_STATE_HISTORY

Immutable snapshot history for `ATHLETE_CONTEXT_STATE`.

This table exists so historical `LOAD_SCORE` records can reference the exact context basis used at generation time. Without this table, old scores would point to a mutable current-state row whose values may have changed.

Relationships:

| Relationship | Cardinality | Notes |
| --- | ---: | --- |
| `USER` -> `ATHLETE_CONTEXT_STATE_HISTORY` | 1:M | Athlete can have many context-state snapshots. |
| `ATHLETE_CONTEXT_STATE` -> `ATHLETE_CONTEXT_STATE_HISTORY` | 1:M | Current-state row can produce many history snapshots over time. |
| `MODEL_VERSION` -> `ATHLETE_CONTEXT_STATE_HISTORY` | 1:M | Snapshots record model/rule version used. |
| `ATHLETE_DAILY_CHECKIN` -> `ATHLETE_CONTEXT_STATE_HISTORY` | 1:0..M | Nullable source reference through `source_checkin_id`. |
| `CYCLE_LOG` -> `ATHLETE_CONTEXT_STATE_HISTORY` | 1:0..M | Nullable source reference through `source_cycle_id`. |
| `SESSION_OUTCOME` -> `ATHLETE_CONTEXT_STATE_HISTORY` | 1:0..M | Nullable source reference through `source_session_outcome_id`. |
| `ATHLETE_CONTEXT_STATE_HISTORY` -> `LOAD_SCORE` | 1:M | A snapshot can generate one or more score outputs. |

Recommended indexes:

- PK: `state_history_id`
- Index: `user_id`
- Index: `source_state_id`
- Index: `model_version_id`
- Index: `source_checkin_id`
- Index: `source_cycle_id`
- Index: `source_session_outcome_id`
- Index: `(user_id, snapshot_at)`
- Index: `(user_id, confidence_state, snapshot_at)`

Implementation note:

Do not add a single `source_wearable_signal_id` unless the model truly uses one signal row. Context updates usually consume a window of wearable signals, so use `wearable_window_start`, `wearable_window_end`, and `source_summary` for MVP. If exact wearable provenance is required later, add a junction table between `ATHLETE_CONTEXT_STATE_HISTORY` and `WEARABLE_SIGNAL`.

### TRAINING_SESSION

Team-level training session created by a coach.

Relationships:

| Relationship                                     | Cardinality | Notes                                                |
| ------------------------------------------------ | ----------: | ---------------------------------------------------- |
| `TEAMS` -> `TRAINING_SESSION`                    |         1:M | Team has many sessions.                              |
| `USER(coach)` -> `TRAINING_SESSION`              |         1:M | Coach can create many sessions.                      |
| `TRAINING_SESSION` -> `TRAINING_SESSION_ATHLETE` |         1:M | Session includes many athletes.                      |
| `TRAINING_SESSION` -> `AVAILABILITY_EVENT`       |      1:0..M | Availability event may optionally reference session. |

Shared entity columns and index guidance are maintained in `ER-Shared.md`.

### TRAINING_SESSION_ATHLETE

Associative entity between a training session and athlete. Stores session-specific athlete planning and participation data.

Relationships:

| Relationship                                     | Cardinality | Notes                                         |
| ------------------------------------------------ | ----------: | --------------------------------------------- |
| `TRAINING_SESSION` -> `TRAINING_SESSION_ATHLETE` |         1:M | Session has many athlete rows.                |
| `USER(athlete)` -> `TRAINING_SESSION_ATHLETE`    |         1:M | Athlete can appear in many sessions.          |
| `LOAD_SCORE` -> `TRAINING_SESSION_ATHLETE`       |         1:M | Score used as pre-session context.            |
| `TRAINING_SESSION_ATHLETE` -> `SESSION_OUTCOME`  |      1:0..1 | Athlete may submit one outcome for a session. |

Shared entity columns and index guidance are maintained in `ER-Shared.md`.

### SESSION_OUTCOME

Athlete-owned post-session feedback. Used as a calibration signal.

This table should connect to `TRAINING_SESSION_ATHLETE` instead of duplicating `session_id` and `user_id`.

Relationships:

| Relationship                                    |        Cardinality | Notes                                                  |
| ----------------------------------------------- | -----------------: | ------------------------------------------------------ |
| `TRAINING_SESSION_ATHLETE` -> `SESSION_OUTCOME` |             1:0..1 | One outcome per athlete-session.                       |
| `ATHLETE_DAILY_CHECKIN` -> `SESSION_OUTCOME`    |             1:0..M | Optional connection to same-day check-in.              |
| `LOAD_SCORE` -> `SESSION_OUTCOME`               | indirect preferred | Use `TRAINING_SESSION_ATHLETE.score_id` when possible. |
| `SESSION_OUTCOME` -> `ATHLETE_CONTEXT_STATE_HISTORY` |       1:0..M | Nullable source reference through `source_session_outcome_id`. |

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

Shared entity columns and index guidance are maintained in `ER-Shared.md`.

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
- `ATHLETE_CONTEXT_STATE.user_id` should be unique.
- `WEARABLE_SIGNAL.user_id` must match the user on the referenced `WEARABLE_CONNECTION`.

## Access Rules

Backend services should enforce the following boundaries:

| Data Area               | Coach-facing direct access? | Notes                                                                      |
| ----------------------- | --------------------------: | -------------------------------------------------------------------------- |
| `ATHLETE_PROFILE`       |                          No | Sensitive onboarding data.                                                 |
| `ATHLETE_DAILY_CHECKIN` |                          No | Raw mental readiness and daily self-report values.                         |
| `CYCLE_LOG`             |                          No | Raw cycle data.                                                            |
| `WEARABLE_SIGNAL`       |                          No | Raw wearable signals.                                                      |
| `ATHLETE_CONTEXT_STATE` |                          No | Contains inferred sensitive state.                                         |
| `ATHLETE_CONTEXT_STATE_HISTORY` |                   No | Contains immutable inferred context snapshots.                             |
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

## Agent Implementation Rules

Use these rules when asking Codex, cc, or another agent to generate backend schema, migrations, seed data, API contracts, or model/service code from this document.

### Naming And Schema Style

- Use `snake_case` table and column names in implementation.
- Prefer explicit names such as `model_version_id`, `created_at`, `submitted_at`, and `is_active`.
- Avoid mixed casing from the diagram when writing real schema.
- Use `varchar`/`text` for phone numbers, external IDs, OAuth token hashes, and version tags.
- Use `datetime` or database-native timestamp types consistently.
- Use `json` only for intentional snapshot data, such as `AVAILABILITY_EVENT.load_score_context`.

### Relationship Implementation

- Implement normal entity relationships with foreign keys where the relationship is structural.
- Treat `NOTIFICATION.reference_type` and `NOTIFICATION.reference_id` as a polymorphic reference, not a strict FK.
- Treat snapshot/provenance references differently from structural FK relationships when documented as such.
- Keep `ATHLETE_CONTEXT_STATE` as one current row per athlete: `USER 1:0..1 ATHLETE_CONTEXT_STATE`.
- Store historical context snapshots in `ATHLETE_CONTEXT_STATE_HISTORY`; do not store multiple current-state rows in `ATHLETE_CONTEXT_STATE`.
- Generate `LOAD_SCORE` from `ATHLETE_CONTEXT_STATE_HISTORY.state_history_id`, not directly from the mutable current-state row.
- Connect `SESSION_OUTCOME` to `TRAINING_SESSION_ATHLETE` through `session_athlete_id`; do not duplicate `user_id` and `session_id` in `SESSION_OUTCOME`.

### Privacy And Access Boundary

- Do not generate coach-facing APIs that read directly from restricted athlete-owned tables.
- Restricted athlete-owned tables include `ATHLETE_PROFILE`, `ATHLETE_DAILY_CHECKIN`, `CYCLE_LOG`, `WEARABLE_SIGNAL`, `ATHLETE_CONTEXT_STATE`, `ATHLETE_CONTEXT_STATE_HISTORY`, `WELFARE_FLAG`, and raw `SESSION_OUTCOME`.
- Coach-facing services should consume sanitized output/read models only.
- Do not expose raw cycle data, period flags, contraception details, diagnosed conditions, RED-S details, ethnicity, neurodivergent profile, mental readiness raw history, or raw wearable signals to coach-facing APIs.
- Do not store hidden-but-present sensitive fields in coach-facing response shapes.
- If a field is not safe for a coach to see, it should not be returned to coach-facing clients at all.

### Consent And Audit

- Consent belongs to the athlete and should be checked before generating or serving coach-facing context.
- Consent withdrawal must affect the next relevant coach-facing request or generated view.
- Audit coach-facing access paths, especially access to sanitized athlete context.
- Audit records should capture actor, target athlete, resource type, resource ID, purpose, consent state at access, access result, and timestamp.
- Audit logs should not contain raw sensitive values unless explicitly reviewed.

### Index Creation

- Do not blindly create every optional index listed in this document.
- Create primary keys, foreign keys, and business-critical unique constraints first.
- Add query-driven indexes only after the API/query pattern is known.
- Avoid indexes that primarily optimize direct coach access to restricted athlete-owned data.
- Prefer adding indexes alongside the feature/query that needs them.

### Copy And Product Language

- Do not use schema, API, seed, or response names that imply medical diagnosis, injury prediction, performance prediction, or automated training prescription.
- Avoid `recommendation` and `override` in AVAIL-owned names.
- Prefer AVAIL-safe language such as `context`, `load_direction`, `confidence_level`, `different_decision`, and `context_available`.
- Use `Context unavailable` style semantics for consent-off coach-facing views; do not expose whether an athlete refused or withdrew consent.

### Seed And Mock Data

- Mock and seed data must follow the same privacy boundaries as production data.
- Do not put raw sensitive athlete values into coach-facing seed objects.
- Use fictional athletes only.
- Do not create mock coach APIs that return full athlete profiles and rely on frontend hiding.
