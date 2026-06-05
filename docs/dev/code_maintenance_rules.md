# AVAIL Code Maintenance Rules

This file defines directory structure, file naming, component rules, and code organisation standards for all AVAIL repositories. These rules apply across the full project lifecycle from prototype through pilot deployment.

API naming and contract rules are defined separately in `docs/dev/api_contracts.md` when that document is created at Milestone 5.

## Repository Structure

The top-level AVAIL-APP repository is organised as follows:

```
AVAIL-APP/
├── avail-prototype/     Pure frontend React prototype. Mock data only.
├── avail-coach/         Coach dashboard. Next.js. Tablet and web first.
├── avail-athlete/       Athlete mobile app. React Native and Expo.
├── avail-backend/
│   ├── api/             Node.js API layer.
│   └── model/           Python FastAPI model service.
└── docs/                All project documentation.
```

Each top-level directory is an independent application. Do not share source code or dependencies directly between them. Shared types or constants must be explicitly extracted into a shared package if needed, and that decision must be documented.

## docs Structure

```
docs/
├── PRD.md
├── Avail_Proposal_v2.md
├── design.md
├── diagrams/
├── dev/                 Development rules and guides.
└── pages/               Per-page PRD documents.
    ├── Login.md
    ├── athlete/
    │   ├── AthleteDashboard.md
    │   ├── ConsentSettings.md
    │   ├── DailyCheckIn.md
    │   ├── OnboardingFlow.md
    │   └── SessionOutcomeCapture.md
    └── coach/
        ├── CoachDashboard.md
        ├── CoachAthleteDetail.md
        └── DifferentDecisionFlow.md
```

Every page that exists in code must have a corresponding PRD document in `docs/pages/`. The PRD must exist before implementation begins.

## Page PRD And Code Naming Rule

Page PRD filenames and their corresponding page component filenames must be identical, with the PRD using `.md` and the component using `.tsx`.

Example:

```
docs/pages/athlete/AthleteDashboard.md   ←→   src/pages/athlete/AthleteDashboard.tsx
docs/pages/coach/CoachDashboard.md       ←→   src/pages/coach/CoachDashboard.tsx
docs/pages/Login.md                      ←→   src/pages/Login.tsx
```

If the names diverge, the PRD and the implementation are no longer clearly linked.

## Naming Conventions

| Item | Convention | Example |
| --- | --- | --- |
| Component files | PascalCase | `LoadScoreRing.tsx` |
| Page files | PascalCase | `AthleteDashboard.tsx` |
| Utility files | camelCase | `coachView.ts` |
| Type files | camelCase | `types.ts` |
| String files | camelCase | `strings.ts` |
| Token files | camelCase | `tokens.ts` |
| Mock data files | camelCase | `mockData.ts` |
| Directories | lowercase | `pages/`, `components/`, `utils/`, `athlete/`, `coach/`, `shared/` |

Do not mix conventions within the same category.

## avail-prototype Source Structure

```
avail-prototype/src/
├── pages/
│   ├── Login.tsx
│   ├── athlete/
│   │   ├── AthleteDashboard.tsx
│   │   ├── ConsentSettings.tsx
│   │   ├── DailyCheckIn.tsx
│   │   ├── OnboardingFlow.tsx
│   │   └── SessionOutcomeCapture.tsx
│   └── coach/
│       ├── CoachDashboard.tsx
│       ├── CoachAthleteDetail.tsx
│       └── DifferentDecisionFlow.tsx
├── components/
│   ├── athlete/
│   ├── coach/
│   └── shared/
├── utils/
├── types.ts
├── tokens.ts
├── strings.ts
├── mockData.ts
├── App.tsx
└── main.tsx
```

### pages/

Pages are top-level screen components. Each page corresponds to one entry in `docs/pages/`.

Rules:

- A page component handles screen-level layout and state only.
- A page component does not contain reusable UI logic. Extract that into `components/`.
- A page component does not contain data transform logic. Extract that into `utils/`.
- Pages are organised into `athlete/` and `coach/` subdirectories. `Login.tsx` sits directly under `pages/`.
- Coach pages must only receive `CoachAthleteView` data. They must never receive `AthleteProfile`, raw `LoadScore`, or raw check-in data directly.

### components/

Components are reusable UI pieces used within pages.

Rules:

- A component does not manage page-level state or navigation.
- Components are organised into `athlete/`, `coach/`, and `shared/` subdirectories.
- `shared/` components must contain no athlete-specific or coach-specific business logic.
- Coach components must only accept `CoachAthleteView` or its derived fields as props. They must never accept `AthleteProfile` or raw sensitive fields.
- If a component is growing too large or doing too many things, split it.

### utils/

Utilities are pure functions used across pages or components.

Rules:

- Utility functions must be pure: same input produces same output, no side effects.
- `buildCoachView` lives in `utils/coachView.ts`. It is the only place where a `CoachAthleteView` is constructed from raw athlete data.
- Do not add data transform logic to page or component files. Move it to `utils/`.

### Root files

| File | Purpose | Rule |
| --- | --- | --- |
| `types.ts` | All TypeScript types and interfaces | All shared types live here. Do not define types inline in components. |
| `tokens.ts` | Design tokens and colour helper functions | All visual constants live here. Do not hardcode colours, spacing, or font sizes in components. |
| `strings.ts` | All user-visible strings | All copy lives here. Do not write user-visible strings inline in components. |
| `mockData.ts` | Mock athlete data and initial state | Data only. No transform functions. |
| `App.tsx` | Root component and view routing | Routing and top-level state only. |

## Privacy Boundary Rules

These rules apply to all AVAIL repositories, not only the prototype.

- `buildCoachView` is the only function permitted to construct a `CoachAthleteView` from raw athlete data. No other file may perform this transformation.
- Coach-facing pages and components must only receive `CoachAthleteView`. They must never receive `AthleteProfile`, raw `LoadScore`, raw check-in data, cycle data, or welfare data.
- If a coach component needs a field that is not in `CoachAthleteView`, the correct fix is to add it to `CoachAthleteView` via `buildCoachView`, not to pass the raw object and extract it in the component.
- Mock data must obey the same privacy boundaries as production data. Do not create coach-facing mock objects containing sensitive fields for convenience.

## Component Size Rules

- A component that exceeds approximately 200 lines is likely doing too much. Consider splitting it.
- A component with more than four boolean props is likely doing too much. Consider splitting it or using composition.
- Do not create deeply nested prop drilling chains. If data needs to pass through more than two intermediate components, reconsider the structure.

## Dependency Rules

- Do not add a new dependency without discussing it first.
- Prefer the existing stack before adding new libraries.
- Each new dependency must have a clear, narrow purpose.
- Do not add dependencies that could be replaced by a small utility function.

## avail-backend Structure

```
avail-backend/
├── api/       Node.js API layer
└── model/     Python FastAPI model service
```

`api/` and `model/` are independently deployable services. They must not share source code directly. Communication between them is via HTTP only.

Internal structure for `api/` and `model/` will be defined in `docs/dev/api_contracts.md` at Milestone 5.

## avail-coach And avail-athlete Structure

Internal structure for `avail-coach/` (Next.js) and `avail-athlete/` (React Native/Expo) will be defined when those applications are initialised at Milestone 3 and beyond.

Coach dashboard targets tablet and web first. Mobile is secondary.

Athlete app targets iOS and Android mobile.

## Review Questions

Before merging any structural change, ask:

- Does the file live in the correct directory for its type?
- Does the filename follow the naming convention?
- Does a new page have a corresponding PRD in `docs/pages/`?
- Does the PRD filename match the component filename exactly?
- Are coach-facing components receiving only `CoachAthleteView`?
- Is `buildCoachView` still the only place constructing a coach view?
- Are user-visible strings in `strings.ts` and not inline?
- Are design values in `tokens.ts` and not hardcoded?
- Are types in `types.ts` and not defined inline?
