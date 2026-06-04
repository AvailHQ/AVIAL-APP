# AVAIL App

AVAIL stands for **Athlete Variability and Availability Intelligence Layer**.

This repo contains the early product documentation and first pure-frontend prototype for AVAIL: a physiological context platform for women's sport. AVAIL provides structured pre-session context for coaches while preserving athlete agency, consent, and privacy.

AVAIL is **not** a medical device, fertility tracker, symptom tracker, injury prediction tool, performance prediction tool, or automated coaching system.

## Repository Structure

```text
AVIAL-APP/
├── README.md
├── LICENSE
├── .gitignore
├── docs/
│   ├── PRD.md
│   ├── Avail_Proposal_v2.md
│   ├── design.md
│   ├── diagrams/
│   │   ├── ER-Shared.md
│   │   ├── ER-Athlete.md
│   │   ├── ER-Coach.md
│   │   └── img/
│   │       ├── ER-Athlete.png
│   │       └── ER-Coach.png
│   └── dev/
│       ├── product_boundaries.md
│       ├── data_privacy_rules.md
│       ├── copy_language_rules.md
│       ├── agent_skill_usage.md
│       ├── skill_roadmap.md
│       └── milestone.md
└── avail-prototype/
    ├── prototype_scope.md
    ├── package.json
    ├── package-lock.json
    ├── index.html
    ├── vite.config.ts
    ├── tsconfig.json
    └── src/
```

## Development Flow And Current Progress

AVAIL development is staged. Do not jump straight to backend, model logic, or real athlete data before the earlier guardrails are in place.

Before Codex, cc, or any other AI agent starts project work, read the most recent entries in:

```text
docs/dev/development_log.md
```

The log is intentionally brief and commit-message-like. Use it to understand recent project actions before making changes or recommendations.

After reading the recent log entries, do a lightweight handoff check:

- Check whether the logged work appears complete in the repository.
- Note any obvious missing follow-ups, contradictions, or incomplete actions.
- Then proceed with the requested task.

This is a recent-log check, not a full project audit.

AVAIL uses lightweight agile delivery with milestone gates. Work should be split into small tickets rather than broad open-ended tasks.

A ticket is a small task that can be assigned, implemented, reviewed, and accepted. A ticket may be a feature, bug fix, documentation task, design decision, Supabase schema slice, or review task.

Good AVAIL tickets should state:

- Who the work is for
- What capability or artifact is needed
- Why it matters
- What counts as done
- Which privacy, consent, copy, and confidence checks apply

Example ticket:

```text
Ticket: Coach squad context list

As a coach,
I want to view a squad context list,
so that I can prepare for a session using structured physiological context.

Acceptance criteria:
- Coach UI only receives sanitized CoachAthleteView data.
- Consent-off athlete shows Context unavailable.
- No raw check-in, cycle, wearable, profile, or welfare data appears.
- Confidence is visible for every available context state.
- Build passes.
```

```text
0. Guardrails
   ↓
1. Pure Frontend Prototype
   ↓
2. Prototype Hardening
   ↓
3. Frontend Architecture Decision
   ↓
4. Production-Like Frontend Foundation
   ↓
5. Backend / API Architecture
   ↓
6. Data Model And Persistence
   ↓
7. MVP Load Score And Confidence Logic
   ↓
8. Pilot Workflow Readiness
   ↓
9. Security, Legal, And Expert Review Gate
   ↓
10. Pilot Deployment
```

Full milestone details live in:

```text
docs/dev/milestone.md
```

### Current Stage

Current stage:

```text
Milestone 1 - Pure Frontend Prototype
```

The prototype exists and builds, but it still needs review fixes and hardening before it should be treated as founder/coach walkthrough material.

### Completed

- Core product docs exist: `docs/PRD.md`, `docs/Avail_Proposal_v2.md`
- Design guidance exists: `docs/design.md`
- ER diagram documentation exists:
  - `docs/diagrams/ER-Shared.md`
  - `docs/diagrams/ER-Athlete.md`
  - `docs/diagrams/ER-Coach.md`
- Prototype scope exists: `avail-prototype/prototype_scope.md`
- Development guardrails exist:
  - `docs/dev/product_boundaries.md`
  - `docs/dev/data_privacy_rules.md`
  - `docs/dev/copy_language_rules.md`
- Skill usage docs exist:
  - `docs/dev/agent_skill_usage.md`
  - `docs/dev/skill_roadmap.md`
- Milestone roadmap exists: `docs/dev/milestone.md`
- Agile, workflow, testing, and development log docs exist:
  - `docs/dev/agile_delivery_rules.md`
  - `docs/dev/workflow_ci_cd_rules.md`
  - `docs/dev/testing_rules.md`
  - `docs/dev/development_log.md`
- Pure frontend prototype exists in `avail-prototype/`
- Prototype build passes with `npm.cmd run build`
- `.gitignore` excludes `node_modules/`, `dist/`, `.claude/`, logs, and local env files
- `avail-product-reviewer` skill has been created
- External review skills have been installed:
  - `react-best-practices`
  - `web-design-guidelines`
  - `composition-patterns`

### In Progress

- Fix current prototype review findings
- Harden prototype UI and interaction details
- Keep coach-facing data restricted to sanitized context only
- Improve copy where it still drifts toward training advice or consent disclosure

### Not Yet Complete

- `docs/dev/code_maintenance_rules.md`
- `docs/dev/review_checklist.md`
- `docs/dev/frontend_architecture_rules.md`
- `avail-frontend-builder` skill
- `avail-data-privacy-architect` skill
- `avail-model-logic-reviewer` skill
- Production frontend architecture decision
- Backend/API architecture
- Implemented database schema
- Real consent middleware
- Real Load Score calculation
- Real confidence calculation
- Real auth
- Real wearable integration
- Security/legal/expert review gate
- Pilot deployment

### Immediate Next Steps

1. Fix current `avail-product-reviewer` prototype findings.
2. Add `docs/dev/code_maintenance_rules.md`.
3. Add `docs/dev/review_checklist.md`.
4. Re-review prototype with:

```text
avail-product-reviewer
react-best-practices
web-design-guidelines
composition-patterns
```

5. Create `avail-frontend-builder` before major frontend expansion.

## Key Documents

Start here:

1. `docs/PRD.md`  
   Concise MVP product requirements.

2. `docs/Avail_Proposal_v2.md`  
   Long-form product, strategy, privacy, legal, welfare, and commercial context.

3. `avail-prototype/prototype_scope.md`  
   Scope and rules for the current pure-frontend React prototype.

4. `docs/dev/product_boundaries.md`  
   Hard product boundaries. Use this to avoid drifting into medical, injury prediction, or coaching prescription territory.

5. `docs/dev/data_privacy_rules.md`  
   Coach data boundary, consent handling, raw athlete data isolation, and welfare privacy rules.

6. `docs/dev/copy_language_rules.md`  
   Allowed and banned product language.

7. `docs/dev/milestone.md`  
   Development roadmap from prototype to pilot deployment.

8. `docs/dev/agile_delivery_rules.md`  
   Lightweight agile delivery rules, sprint gates, ticket format, and Supabase pilot iteration rules.

9. `docs/dev/workflow_ci_cd_rules.md`  
   Standard ticket-to-merge workflow, GitHub Actions, Playwright scope, staging, and deployment rules.

10. `docs/dev/testing_rules.md`  
   Testing strategy for build/typecheck, unit tests, privacy transforms, Playwright smoke tests, copy audit, and Supabase/RLS tests.

11. `docs/dev/development_log.md`  
   One-line development log for human, Codex, cc, and other AI project actions. Read recent entries before starting work.

12. `docs/dev/agent_skill_usage.md`  
   How to ask Codex to use installed skills during review.

13. `docs/dev/skill_roadmap.md`  
   Completed and planned Codex skills for AVAIL development.

14. `docs/diagrams/ER-Shared.md`  
    Shared backend schema reference for entities used by both athlete-side and coach-side ER diagrams.

15. `docs/diagrams/ER-Athlete.md`  
    Athlete-perspective ER diagram notes, restricted athlete-owned data boundaries, relationships, columns, enum suggestions, and implementation rules.

16. `docs/diagrams/ER-Coach.md`  
    Coach-perspective ER diagram notes for sanitized coach views, different-decision logging, audit logging, and coach-facing access boundaries.

## First-Time Setup

Use PowerShell from the repo root:

```powershell
cd E:\Github\AVIAL-APP\avail-prototype
npm.cmd install
npm.cmd run dev
```

Open:

```text
http://localhost:5173
```

Build check:

```powershell
cd E:\Github\AVIAL-APP\avail-prototype
npm.cmd run build
```

Use `npm.cmd` instead of `npm` on this machine because PowerShell may block `npm.ps1`.

## Current Prototype

The current prototype is a pure frontend React/Vite app.

It uses:

- React
- TypeScript
- Vite
- Iconify for icons
- Local state only
- Mock data only

It does not use:

- Backend
- Auth
- Database
- Real model service
- Wearable integrations
- Production security

## Current Prototype Workflows

The prototype should demonstrate:

- Athlete onboarding
- Daily check-in
- Athlete dashboard
- Session outcome capture
- Consent settings
- Coach team dashboard
- Coach athlete detail view
- Coach different-decision logging

Important rule: coach-facing UI must receive sanitized context only. It must never receive raw cycle logs, raw symptoms, sensitive onboarding answers, private reflections, RED-S details, mental health pattern details, ethnicity, neurodivergent profile, or detailed contraception status.

## Codex And cc Roles

We use cc and Codex together, with different responsibilities.

### cc Responsibilities

cc is primarily responsible for implementation:

- Generate or modify React prototype code
- Add screens and components
- Implement local state interactions
- Apply design and product constraints from docs
- Run build checks
- Summarize changed files

When asking cc to build or change the prototype, point it to:

```text
docs/PRD.md
docs/Avail_Proposal_v2.md
avail-prototype/prototype_scope.md
docs/dev/product_boundaries.md
docs/dev/data_privacy_rules.md
docs/dev/copy_language_rules.md
```

### Codex Responsibilities

Codex is primarily responsible for supervision, review, and guardrails:

- Read docs and maintain project context
- Review cc-generated code
- Check product boundary violations
- Check coach privacy and consent handling
- Check banned language
- Check React maintainability
- Check UI/UX and accessibility
- Maintain development docs and skill docs
- Suggest fixes before implementation drifts too far

Codex should review before accepting larger cc changes.

## Codex Skills

Installed or planned skills are tracked in:

```text
docs/dev/agent_skill_usage.md
docs/dev/skill_roadmap.md
```

### AVAIL-Specific Skill

`avail-product-reviewer`

Use for AVAIL-specific review:

- Product boundaries
- Coach privacy
- Consent
- Copy language
- Confidence
- Welfare routing
- Prototype safety

Example:

```text
Use avail-product-reviewer to review cc's latest AVAIL prototype changes.
```

### External Skills

`react-best-practices`

Use for:

- React component quality
- State placement
- Re-render risks
- General React maintainability

`web-design-guidelines`

Use for:

- UI/UX review
- Accessibility
- Responsive layout
- Visual hierarchy
- Calm, contextual AVAIL design direction

`composition-patterns`

Use for:

- Component architecture
- Prop design
- Avoiding duplicated patterns
- Avoiding over-abstracted components

## Recommended Review Prompt

Use this after cc makes a meaningful prototype change:

```text
Use avail-product-reviewer, react-best-practices, web-design-guidelines, and composition-patterns to review avail-prototype.

Focus on AVAIL product boundaries, coach privacy, consent behavior, banned language, confidence handling, React maintainability, component structure, UI/UX, and accessibility.
```

## Product Language Rules

Use:

```text
physiological context
load tolerance estimate
context suggests
confidence
recent pattern
different decision
use alongside your professional judgement
```

Avoid:

```text
injury prediction
injury prevention
diagnosis
medical advice
clinical recommendation
fertility tracking
symptom tracker
performance prediction
recommendation
override
non-compliant
refused
```

Coach-facing direction should use:

```text
Context suggests: Maintain
Context suggests: Reduce
Context suggests: Recovery focus
Context suggests: Increase
```

Coach action should use:

```text
I'm making a different decision
```

Do not use:

```text
Override
```

## Git And Generated Files

Do not commit:

- `node_modules/`
- `dist/`
- `.claude/`
- `.env`
- local logs or editor state

These are ignored in `.gitignore`.

If `.claude/` appears, it is a local cc/Claude worktree/cache directory, not AVAIL source code.

## Current Next Steps

See:

```text
docs/dev/milestone.md
```

Immediate priorities:

1. Fix current prototype review findings.
2. Add code maintenance and review checklist docs.
3. Harden prototype responsiveness and accessibility.
4. Create `avail-frontend-builder` before major frontend expansion.
5. Re-review prototype using the recommended skill combination.
