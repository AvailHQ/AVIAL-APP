# AVAIL App Development Milestones

This file tracks the staged development plan from pure frontend prototype to pilot-ready app.

## Milestone 0 - Guardrails

Status: in progress

Goal: document the product, privacy, language, review, and skill rules that keep AVAIL aligned.

Completed:

- `docs/PRD.md`
- `docs/Avail_Proposal_v2.md`
- `docs/design.md`
- `avail-prototype/prototype_scope.md`
- `docs/dev/product_boundaries.md`
- `docs/dev/data_privacy_rules.md`
- `docs/dev/copy_language_rules.md`
- `docs/dev/agent_skill_usage.md`
- `docs/dev/skill_roadmap.md`
- `avail-product-reviewer` skill

Still useful to add:

- `docs/dev/code_maintenance_rules.md`
- `docs/dev/review_checklist.md`
- `docs/dev/frontend_architecture_rules.md`

Acceptance criteria:

- Product boundaries are documented
- Coach privacy rules are documented
- Copy rules are documented
- Prototype scope is documented
- AVAIL-specific review skill exists

## Milestone 1 - Pure Frontend Prototype

Status: active

Goal: build a polished React-only prototype demonstrating athlete and coach workflows with mock data.

Scope:

- No backend
- No real auth
- No database
- No real model service
- No wearable integrations
- Local React state only
- Mock athlete squad

Required screens:

- Role selection
- Athlete onboarding
- Daily check-in
- Athlete dashboard
- Session outcome capture
- Consent settings
- Coach team dashboard
- Coach athlete detail
- Coach different-decision logging

Acceptance criteria:

- `npm.cmd run build` passes
- Prototype runs locally
- Coach views receive sanitized `CoachAthleteView` data only
- Consent-off athlete shows neutral `Context unavailable`
- Coach views do not expose raw cycle logs, sensitive onboarding answers, private reflections, or welfare details
- Direction labels use `Context suggests`
- No banned copy appears in user-facing implementation
- UI feels calm, contextual, and non-medical

Recommended review skills:

- `avail-product-reviewer`
- `react-best-practices`
- `web-design-guidelines`
- `composition-patterns`

## Milestone 2 - Prototype Hardening

Status: next

Goal: improve prototype quality for founder review, early athlete feedback, and coach walkthroughs.

Scope:

- Fix product-boundary and privacy review findings
- Improve mobile responsiveness
- Improve keyboard and focus states
- Add lightweight interaction polish
- Clean repeated styles and component patterns
- Ensure mock data covers required states
- Ensure copy remains auditable

Acceptance criteria:

- All P1/P2 `avail-product-reviewer` findings are fixed
- Desktop and mobile layouts are usable
- Main controls have visible focus states
- Check-in can be completed quickly
- Coach dashboard is scannable before a session
- Consent toggle immediately affects coach view
- Generated files are not tracked

## Milestone 3 - Frontend Architecture Decision

Status: planned

Goal: decide the next frontend target and architecture.

Key decisions:

- Web-only React prototype expansion vs Next.js coach dashboard
- React Native / Expo timing for athlete app
- Shared design tokens strategy
- Routing approach
- State management approach
- Form handling approach
- Test strategy
- Demo deployment target

Acceptance criteria:

- Frontend architecture decision is documented
- Directory structure is agreed
- Shared token and copy strategy is agreed
- Sanitized coach data boundary is preserved

Recommended skill to create:

- `avail-frontend-builder`

## Milestone 4 - Production-Like Frontend Foundation

Status: planned

Goal: move from prototype code to a maintainable frontend app foundation.

Scope:

- App directory structure
- Routing
- Reusable layout primitives
- Form components
- Design tokens
- Copy constants
- Mock API or fixture adapter
- Basic tests for privacy transforms and copy audit

Acceptance criteria:

- App can run with mock API/fixtures
- Coach views consume sanitized data only
- Copy is auditable
- Core workflows remain intact
- Components are not over-abstracted
- Build passes

## Milestone 5 - Backend/API Architecture

Status: planned

Goal: design and implement the first API layer while preserving consent and privacy boundaries.

Scope:

- Athlete profile API
- Daily check-in API
- Consent API
- Coach dashboard API
- Session outcome API
- Different-decision logging API
- Audit logging design
- Sanitized coach response shapes

Critical rule:

Coach APIs must never return raw sensitive fields, even if the frontend does not display them.

Acceptance criteria:

- API contracts are documented
- Consent is checked server-side
- Coach API returns sanitized shapes only
- Consent withdrawal affects next coach request
- Tests cover consent-off and forbidden-field scenarios

Recommended docs to add:

- `docs/dev/api_contracts.md`
- `docs/dev/database_schema_rules.md`

Recommended skill to create:

- `avail-data-privacy-architect`

## Milestone 6 - Data Model And Persistence

Status: planned

Goal: persist athlete inputs, consent state, coach outputs, and calibration signals safely.

Scope:

- Athlete identity layer
- Physiological input history
- Athlete context state
- Load Score history
- Coach decision layer
- Session outcome layer
- Consent layer
- Audit logs

Acceptance criteria:

- Raw athlete data and coach-facing outputs are separated
- Consent state is auditable
- Load Score records include model version
- Audit logs avoid raw sensitive values
- Sensitive fields are not casually joined into coach views

## Milestone 7 - MVP Load Score And Confidence Logic

Status: planned

Goal: replace static mock Load Scores with MVP rule-based contextual estimation.

Scope:

- Input normalization
- Recovery and fatigue index
- Physiological State Index
- Cycle modulation branch
- Hormonal contraception branch
- Missing-data estimation
- Confidence calculation
- Context dimensions
- Model versioning

Non-goals:

- Injury prediction
- Medical diagnosis
- Performance prediction
- Advanced personalization
- Autonomous training decisions

Acceptance criteria:

- Load Score output includes confidence
- Low data lowers confidence
- Missing data is visible as uncertainty
- Hormonal contraception branch does not apply standard cycle modulation blindly
- Output language remains contextual
- Model version is recorded

Recommended skill to create:

- `avail-model-logic-reviewer`

## Milestone 8 - Pilot Workflow Readiness

Status: planned

Goal: prepare the app for a controlled pilot workflow with a small team.

Scope:

- Athlete onboarding flow
- Daily check-in habit loop
- Coach morning review workflow
- Different-decision logging
- Session outcome capture
- Consent management

Acceptance criteria:

- Pilot workflows are end-to-end usable
- Athlete can withdraw sharing
- Coach sees only allowed context
- Different decisions are logged
- Session outcomes are captured
- Confidence is prominent
- Product does not imply medical or injury prevention claims

## Milestone 9 - Security, Legal, And Expert Review Gate

Status: planned

Goal: prepare for any handling of real athlete data.

Required before production athlete data:

- GDPR specialist review
- Regulatory/MHRA language review
- Sports science advisor review
- Sports welfare professional review
- Legal counsel review for liability framing
- Security architecture review
- Data breach response procedure
- Penetration testing plan

Acceptance criteria:

- Real data is not collected before expert review gates are satisfied
- Consent flow has been legally reviewed
- Welfare protocols have been reviewed
- Product language has been reviewed
- Security plan exists

## Milestone 10 - Pilot Deployment

Status: future

Goal: deploy AVAIL in a limited pilot setting with controlled scope and calibration framing.

Scope:

- Small pilot squad
- Daily check-ins
- Coach dashboard
- Session outcome capture
- Manual or semi-manual operational support
- Qualitative feedback loop

Acceptance criteria:

- Pilot agreement clarifies AVAIL provides context, not instruction
- Athletes understand consent and withdrawal
- Coaches understand professional responsibility
- Support process exists
- Data access is logged
- Success metrics are tracked

## Cross-Milestone Review Checklist

Every milestone should be checked for:

- Product boundary compliance
- Coach privacy boundary
- Consent behavior
- Copy language compliance
- Confidence and uncertainty handling
- Welfare data handling
- Build/test status
- Accessibility and responsive usability
- Maintainability
- Dependency discipline

## Current Recommended Next Steps

1. Fix current prototype review findings.
2. Add `docs/dev/code_maintenance_rules.md`.
3. Add `docs/dev/review_checklist.md`.
4. Create `avail-frontend-builder` before major frontend expansion.
5. Re-review prototype with:

```text
avail-product-reviewer
react-best-practices
web-design-guidelines
composition-patterns
```
