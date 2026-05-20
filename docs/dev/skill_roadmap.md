# AVAIL Skill Roadmap

This file tracks Codex skills that support AVAIL development.

## Completed AVAIL Skills

### `avail-product-reviewer`

Status: done

Purpose:

- Review AVAIL code and product artifacts for product-boundary risks
- Check coach privacy and consent behavior
- Audit banned or risky language
- Check confidence and uncertainty handling
- Check welfare-routing exposure risks
- Review prototype changes against AVAIL-specific docs

Use when:

- Reviewing cc-generated code
- Reviewing prototype changes
- Checking coach dashboard data flow
- Checking copy and product positioning
- Reviewing mock data, API contracts, or data models for AVAIL-specific risks

## Installed External Skills

### `react-best-practices`

Status: installed

Use for:

- React code quality
- Component state placement
- Performance issues
- Re-render risks
- General React implementation review

### `web-design-guidelines`

Status: installed

Use for:

- UI/UX review
- Accessibility review
- Responsive behavior
- Visual hierarchy
- Form usability
- Checking whether the UI feels calm, contextual, and non-medical

### `composition-patterns`

Status: installed

Use for:

- Component architecture review
- Prop design
- Avoiding over-abstracted components
- Reducing duplicated layout patterns
- Keeping coach and athlete component boundaries clean

## Recommended Future AVAIL Skills

### `avail-frontend-builder`

Status: not created

Priority: next, before larger frontend expansion

Purpose:

- Guide AVAIL frontend implementation, not just review it
- Translate AVAIL product rules into React / React Native frontend patterns
- Keep athlete and coach screen architecture consistent

Should cover:

- React component structure
- React Native / Expo structure when mobile app begins
- Screen-level patterns
- Shared component rules
- Design token usage
- Iconify usage
- Athlete / coach directory boundaries
- Responsive and accessibility baseline
- Avoiding marketing landing pages when building app experiences
- Ensuring coach views only receive sanitized props
- Keeping user-visible strings centralized where practical

Use when:

- Asking cc to build new frontend screens
- Refactoring prototype screens
- Starting the real React / React Native app
- Creating shared UI components
- Expanding beyond the prototype into production-like frontend structure

### `avail-data-privacy-architect`

Status: not created

Priority: create before backend, API, or database implementation

Purpose:

- Guide backend/API/database architecture around AVAIL privacy and consent
- Make privacy structural instead of UI-only

Should cover:

- Consent middleware
- Coach API response shapes
- Raw athlete data isolation
- Coach-facing output storage
- Audit logging
- Data access logs
- Welfare data routing
- RED-S and mental readiness data separation
- Club tier vs consumer tier data
- Anonymisation pipeline expectations
- Mock data and test data privacy rules
- API contract review for forbidden fields

Use when:

- Designing backend APIs
- Creating database schemas
- Writing consent logic
- Building coach dashboard endpoints
- Building athlete check-in endpoints
- Building model service inputs/outputs
- Reviewing whether sensitive fields can leak into coach-facing responses

### `avail-model-logic-reviewer`

Status: not created

Priority: create before implementing Load Score or confidence logic

Purpose:

- Review and guide MVP rule-based model logic
- Prevent the model from drifting into medical, injury prediction, or performance prediction framing

Should cover:

- Input normalization
- Sleep / fatigue / soreness / mental readiness handling
- Missing data handling
- Confidence calculation
- Cycle modulation branch
- Hormonal contraception branch
- Conservative mode behavior
- Session outcome calibration
- Model versioning
- No retroactive score mutation
- No false precision
- Output language boundaries

Use when:

- Implementing Load Score logic
- Implementing confidence logic
- Adding missing-data estimation
- Adding session outcome calibration
- Designing model service API
- Reviewing whether the model output implies prediction, diagnosis, or prescription

## Suggested Creation Order

1. `avail-frontend-builder`
2. `avail-data-privacy-architect`
3. `avail-model-logic-reviewer`

Rationale:

- Current work is frontend prototype and app experience, so frontend guidance comes next.
- Backend/API/privacy architecture should be created before server-side work begins.
- Model logic skill should be created before Load Score moves from mock data into real calculation.

## Current Minimum Skill Set For Prototype Review

Use this combination now:

```text
avail-product-reviewer
react-best-practices
web-design-guidelines
composition-patterns
```

Suggested prompt:

```text
Use avail-product-reviewer, react-best-practices, web-design-guidelines, and composition-patterns to review avail-prototype.

Focus on AVAIL product boundaries, coach privacy, consent behavior, banned language, confidence handling, React maintainability, component structure, UI/UX, and accessibility.
```

## Reminder

External skills improve generic engineering quality.

AVAIL-specific skills protect the product's unique risks:

- Athlete trust
- Consent integrity
- Coach data boundaries
- Regulatory language discipline
- Honest uncertainty
- Human-centered physiological context

When in doubt, AVAIL-specific rules win.
