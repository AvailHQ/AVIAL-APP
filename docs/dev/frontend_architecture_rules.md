# AVAIL Frontend Architecture Rules

Status: draft — most decisions land at Milestone 3 (Frontend Architecture Decision). This file exists early so settled decisions are recorded as they happen instead of being re-litigated later.

Decisions recorded here are inputs to Milestone 3, not a replacement for it.

## Decision Log

| # | Date | Decision | Status |
| --- | --- | --- | --- |
| 1 | 2026-06-11 | Coach navigation: single-column in prototype, sidebar/top-nav in real product | Settled |

## Decision 1 — Coach Navigation Evolution

**Context.** The Milestone 1 prototype's coach view has exactly one top-level destination (the pre-session squad scan); athlete detail and different-decision logging are drill-downs from it.

**Decision.**

- The prototype keeps the current single-column centered layout (~680px). No sidebar.
- The real coach product (`avail-coach`, Next.js, tablet/web first) is expected to need persistent navigation — sidebar on tablet landscape, top tabs on portrait/narrow — but only when concrete triggers appear.

**Triggers that justify adding persistent navigation:**

- Multi-squad or multi-age-group switching (e.g. U18 / U21 / first team)
- Modules that live outside the pre-session scan: history/trends library, decision-log archive, roster management, notifications
- Multiple staff roles (head coach / S&C / sports science) with different navigation needs

**Why not earlier.** A sidebar wrapping a single destination is an empty shell, and it pushes the UI toward a generic SaaS admin / monitoring-console feel. AVAIL's design direction is calm and contextual — the product should feel like "a system that gradually understands the athlete", not a surveillance dashboard. Layout choices carry that message as much as copy does.

**Constraint carried forward.** Whatever navigation shell is chosen at Milestone 3+, coach screens must continue to receive only `CoachAthleteView` data, and the required coach framing line must remain visible on every coach screen.

## Open Questions (to settle at Milestone 3)

- Web-only React expansion vs Next.js coach dashboard
- React Native / Expo timing for the athlete app
- Routing approach (file-based vs library)
- State management approach
- Form handling approach
- Shared design tokens and copy strategy across `avail-coach` / `avail-athlete`
- Test strategy and demo deployment target
