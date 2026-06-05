# AVAIL App Development Milestones

This file defines the staged development plan for AVAIL from pure frontend prototype to pilot-ready app.

The milestones are intentionally conservative. AVAIL has unusual product, privacy, consent, and language risks, so every phase must preserve trust and avoid medical, prediction, or prescription framing.

## Milestone 0 - Product And Development Guardrails

Status: in progress

Goal:

Create the rules that keep all future implementation aligned with AVAIL's product boundaries.

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
- Review skill exists for AVAIL-specific risks

## Milestone 1 - Pure Frontend Prototype

Status: active

Goal:

Build a polished React-only prototype that demonstrates the athlete and coach workflows using mock data.

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

- `npm run build` passes
- Prototype runs locally
- Coach views receive sanitized `CoachAthleteView` data only
- Consent-off athlete shows neutral `Context unavailable`
- Coach views do not expose raw cycle logs, sensitive onboarding answers, private reflections, or welfare details
- Direction labels use `Context suggests`
- No banned copy appears in user-facing implementation
- UI feels calm, contextual, and non-medical
- Main workflows can be clicked through without login

Recommended review skills:

- `avail-product-reviewer`
- `react-best-practices`
- `web-design-guidelines`
- `composition-patterns`

## Milestone 2 - Prototype Hardening

Status: next

Goal:

Improve prototype quality enough for founder review, early athlete feedback, and coach walkthroughs.

Scope:

- Fix product-boundary and privacy review findings
- Improve mobile responsiveness
- Improve keyboard and focus states
- Add lightweight interaction polish
- Clean up repeated styles and component patterns
- Ensure mock data covers required states
- Ensure prototype copy is centralized enough for audit

Acceptance criteria:

- All P1/P2 `avail-product-reviewer` findings are fixed
- Desktop and mobile layouts are usable
- Main controls have visible focus states
- Check-in can be completed quickly
- Coach dashboard is scannable before a session
- Consent toggle immediately affects coach view
- No generated files are tracked
- `node_modules` and `dist` remain ignored

Recommended docs to add before or during this phase:

- `docs/dev/code_maintenance_rules.md`
- `docs/dev/review_checklist.md`

## Milestone 3 - Frontend Architecture Decision

Status: planned

Goal:

Decide whether the next implementation target is:

- Web-only React prototype expansion
- Coach dashboard in Next.js
- Athlete mobile app in React Native / Expo
- Shared design system used by both

Key decisions:

- React web vs Next.js for coach dashboard
- React Native / Expo timing for athlete mobile app
- Shared tokens and copy package or duplicated early-stage files
- Routing approach
- State management approach
- Form handling approach
- Test strategy
- Deployment target for demos

Acceptance criteria:

- Frontend architecture decision is documented
- Directory structure is agreed
- Shared design tokens strategy is agreed
- Copy/string ownership is agreed
- Sanitized coach data boundary is preserved

Recommended skill to create:

- `avail-frontend-builder`

## Milestone 4 - Production-Like Frontend Foundation

Status: planned

Goal:

Move from prototype code to a maintainable frontend app foundation.

Scope:

- Establish app directory structure
- Add routing
- Add reusable layout primitives
- Add form components
- Add design tokens
- Add copy constants
- Add mock API layer or fixture adapter
- Add basic tests for privacy transforms and copy audit

Acceptance criteria:

- App can run with mock API/fixtures
- Coach views still consume sanitized data only
- Copy is auditable
- Core workflows remain intact
- Components are not over-abstracted
- `npm run build` passes
- Basic tests pass, if test tooling has been added

Recommended review skills:

- `avail-product-reviewer`
- `avail-frontend-builder`, when created
- `react-best-practices`
- `composition-patterns`

## Milestone 5 - Backend/API Architecture

Status: planned

Goal:

Design and implement the first API layer while preserving consent and privacy boundaries.

Scope:

- Authentication placeholder or real auth decision
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
- Audit events are recorded for sensitive access
- Tests cover consent-off and forbidden-field scenarios

Recommended docs to add:

- `docs/dev/api_contracts.md`
- `docs/dev/database_schema_rules.md`

Recommended skill to create:

- `avail-data-privacy-architect`

## Milestone 6 - Data Model And Persistence

Status: planned

Goal:

Persist athlete inputs, consent state, coach outputs, and calibration signals safely.

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
- Consent state is versioned or auditable
- Load Score records include model version
- Audit logs avoid raw sensitive values
- Sensitive fields are not casually joined into coach views
- Seed data respects privacy rules

Optional tooling after initial backend implementation:

- Consider enabling `Lum1104/Understand-Anything` locally once the first backend/API/schema implementation exists.
- Use it for codebase understanding, architecture navigation, onboarding, and impact analysis only.
- Do not treat generated knowledge graphs as the source of truth; AVAIL docs and schema files remain authoritative.
- Do not auto-commit generated `.understand-anything/` artifacts unless explicitly reviewed and approved.

Recommended review skill:

- `avail-data-privacy-architect`

## Milestone 7 - MVP Load Score And Confidence Logic

Status: planned

Goal:

Replace static mock Load Scores with an MVP rule-based contextual estimate.

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
- Model output language remains contextual
- Model version is recorded
- Tests cover missing data and confidence changes

Recommended skill to create:

- `avail-model-logic-reviewer`

## Milestone 8 - Pilot Workflow Readiness

Status: planned

Goal:

Prepare the app for a controlled pilot workflow with a small team.

Scope:

- Athlete onboarding flow
- Daily check-in habit loop
- Coach morning review workflow
- Different-decision logging
- Session outcome capture
- Consent management
- Export or review view for internal team only, if needed

Acceptance criteria:

- Pilot workflows are end-to-end usable
- Athlete can withdraw sharing
- Coach sees only allowed context
- Different decisions are logged
- Session outcomes are captured
- Confidence is prominent
- Product does not imply medical or injury prevention claims
- Legal/clinical review items are clearly marked if unresolved

## Milestone 9 - Security, Legal, And Expert Review Gate

Status: planned

Goal:

Prepare for any handling of real athlete data.

Required before production athlete data:

- GDPR specialist review
- Regulatory/MHRA language review
- Sports science advisor review
- Sports welfare professional review
- Legal counsel review for liability framing
- Security architecture review
- Data breach response procedure ready
- Cyber insurance decision
- Penetration testing plan

Acceptance criteria:

- Real data is not collected before expert review gates are satisfied
- Consent flow has been legally reviewed
- Welfare protocols have been reviewed
- Product language has been reviewed
- Security plan exists

## Milestone 10 - Pilot Deployment

Status: future

Goal:

Deploy AVAIL in a limited pilot setting with controlled scope and clear calibration framing.

Scope:

- Small pilot squad
- Daily check-ins
- Coach dashboard
- Session outcome capture
- Manual or semi-manual operational support
- Close qualitative feedback loop

Acceptance criteria:

- Pilot agreement clarifies AVAIL provides context, not instruction
- Athletes understand consent and withdrawal
- Coaches understand professional responsibility
- Support process exists
- Data access is logged
- Feedback collection is planned
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
