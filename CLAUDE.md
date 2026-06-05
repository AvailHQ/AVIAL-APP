# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Before Starting Any Task

Read the most recent entries in `docs/dev/development_log.md` and do a lightweight handoff check:
- Check whether logged work appears complete in the repository
- Note any missing follow-ups or contradictions
- Then proceed

This is a recent-log check, not a full audit.

## What This Project Is

AVAIL (Athlete Variability and Availability Intelligence Layer) is a physiological context platform for women's sport. It provides coaches with structured pre-session load intelligence while preserving athlete data ownership and consent.

Current stage: **Milestone 1 — Pure Frontend Prototype** (React + Vite, mock data only, no backend).

## Commands

All commands run from `avail-prototype/`:

```bash
npm install       # install dependencies
npm run dev       # dev server at http://localhost:5173
npm run build     # TypeScript check + Vite build (required before any review)
npm run preview   # preview the production build
```

Node version: 20 LTS (see `avail-prototype/.nvmrc`).

**Windows PowerShell only:** replace `npm` with `npm.cmd`. Use Git Bash or WSL to avoid this. Never use `npm.cmd` in scripts or CI.

CI runs `npm ci && npm run build` on every push and PR via `.github/workflows/ci.yml`.

## Source Structure

```
avail-prototype/src/
├── pages/
│   ├── Login.tsx                      # Role selection / entry screen
│   ├── athlete/                       # Athlete-facing page components
│   │   ├── AthleteDashboard.tsx
│   │   ├── ConsentSettings.tsx
│   │   ├── DailyCheckIn.tsx
│   │   ├── OnboardingFlow.tsx         # Orchestrates onboarding/ steps
│   │   └── SessionOutcomeCapture.tsx
│   └── coach/                         # Coach-facing page components
│       ├── CoachDashboard.tsx         # List/card toggle, metric cards, Squad Load Overview
│       ├── CoachAthleteDetail.tsx
│       └── DifferentDecisionFlow.tsx
├── components/
│   ├── athlete/                       # Athlete-specific reusable components
│   ├── coach/                         # Coach-specific reusable components
│   │   ├── AthleteCard.tsx            # Card grid view card
│   │   └── AthleteListRow.tsx         # List view row
│   └── shared/                        # Used by both athlete and coach
│       ├── Badge.tsx                  # DirectionBadge, ConfidenceBadge, TrendBadge, PriorityBadge
│       ├── LoadScoreRing.tsx
│       └── TrendChart.tsx
├── utils/
│   └── coachView.ts                   # buildCoachView() — privacy firewall (see below)
├── types.ts                           # All TypeScript types
├── tokens.ts                          # Design tokens + colour helpers (directionColors, confidenceColor, trendColor)
├── strings.ts                         # All user-visible strings (S.*)
└── mockData.ts                        # Mock athlete data and initial state (data only, no functions)
```

Page filenames match their PRD documents in `docs/pages/` exactly.

## The Privacy Firewall — Most Important Rule

`utils/coachView.ts` contains `buildCoachView()`. This is the **only** place where a `CoachAthleteView` is constructed from raw athlete data.

- Coach pages and components must only receive `CoachAthleteView` — never `AthleteProfile`, raw `LoadScore`, raw check-in data, cycle data, or welfare data.
- If a coach component needs a field not in `CoachAthleteView`, add it via `buildCoachView()` — do not pass raw objects.
- Mock data must obey the same privacy boundaries as production data.

Consent-off athletes must show `"Context unavailable"` in coach views. The coach must not be told why context is unavailable.

## Product Boundary — What AVAIL Must Never Do

AVAIL must never be built, described, or framed as:
- A medical device, diagnostic tool, fertility tracker, symptom tracker
- An injury prediction or injury prevention system
- A performance prediction system
- A system that tells coaches what to do or prescribes training

Load Score, Direction, Confidence, and contextual summaries are the only outputs coaches receive.

## Copy Rules

All user-visible strings live in `strings.ts` — do not write inline strings in components.

**Required coach framing** (must appear on all coach screens):
```
Today's physiological context — use alongside your professional judgement.
```

**Direction labels** must use:
```
Context suggests: Maintain / Reduce / Recovery Focus / Increase
```

**Coach action** must use:
```
I'm making a different decision
```

**Never use:** `override`, `recommendation`, `injury`, `prediction`, `prevention`, `diagnosis`, `medical advice`, `clinical`, `fertility`, `symptom`, `non-compliant`, `refused`.

Confidence is a core product feature, not decoration. It must appear wherever Load Score is displayed.

## Naming Conventions

| Item | Convention |
|---|---|
| Component and page files | PascalCase (`AthleteDashboard.tsx`) |
| Utility and data files | camelCase (`coachView.ts`, `mockData.ts`) |
| Directories | lowercase (`pages/`, `components/`, `athlete/`, `shared/`) |

Page PRD filename = page component filename (e.g. `docs/pages/athlete/AthleteDashboard.md` ↔ `src/pages/athlete/AthleteDashboard.tsx`).

## Key Docs

| Document | Purpose |
|---|---|
| `docs/dev/development_log.md` | One-line log of all project actions — read before starting work |
| `docs/dev/product_boundaries.md` | Hard product boundaries |
| `docs/dev/data_privacy_rules.md` | Coach data boundary, consent, raw data isolation |
| `docs/dev/copy_language_rules.md` | Allowed and banned language |
| `docs/dev/code_maintenance_rules.md` | Directory structure, naming, component rules |
| `docs/dev/review_checklist.md` | Pre-merge checklist (build, privacy, copy, UX) |
| `docs/dev/milestone.md` | Development roadmap (Milestones 0–10) |
| `docs/dev/testing_rules.md` | Test strategy by milestone |
| `avail-prototype/prototype_scope.md` | Scope and rules for the current prototype |

## Future Repo Structure (Not Yet Built)

```
AVAIL-APP/
├── avail-prototype/    # Current — pure frontend prototype
├── avail-coach/        # Planned — Next.js, tablet/web first
├── avail-athlete/      # Planned — React Native/Expo
├── avail-backend/
│   ├── api/            # Planned — Node.js API layer
│   └── model/          # Planned — Python FastAPI model service
└── docs/
```
