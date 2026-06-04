# Agent Skill Usage

This file explains when and how to ask Codex to use the installed Vercel agent skills for AVAIL development.

Installed skills:

- `avail-product-reviewer`
- `react-best-practices`
- `web-design-guidelines`
- `composition-patterns`

After installing new skills, restart Codex before expecting them to appear in the active skills list.

## General Rule

Before Codex, cc, or any other AI agent starts AVAIL project work, read the most recent entries in:

```text
docs/dev/development_log.md
```

Use the log to understand recent project actions. Keep new entries concise and one-line, similar to Git commit messages.

After reading recent log entries, do a lightweight handoff check:

- Check whether the logged work appears complete in the repository.
- Note any obvious missing follow-ups, contradictions, or incomplete actions.
- Then proceed with the requested task.

This is a recent-log check, not a full project audit.

Use these skills as review and implementation aids. They do not replace AVAIL-specific rules.

AVAIL-specific docs always remain the source of truth:

- `docs/dev/development_log.md`
- `docs/dev/product_boundaries.md`
- `docs/dev/data_privacy_rules.md`
- `docs/dev/copy_language_rules.md`
- `docs/dev/code_maintenance_rules.md`, when added
- `docs/dev/review_checklist.md`, when added
- `avail-prototype/prototype_scope.md`, for prototype work

If a Vercel skill conflicts with AVAIL product, privacy, or copy rules, AVAIL rules win.

## avail-product-reviewer

Use this skill as the default review lens for AVAIL-specific product, privacy, consent, confidence, welfare-routing, and copy-language risks.

### Use When

- Reviewing cc-generated AVAIL code
- Reviewing athlete or coach UI
- Reviewing coach dashboard data flow
- Reviewing mock data, API contracts, or data models
- Checking whether coach views expose sensitive fields
- Checking consent-off behavior
- Checking banned language or risky product framing
- Reviewing prototype changes against AVAIL-specific docs

### Example Commands

```text
Use avail-product-reviewer to review cc's latest AVAIL prototype changes.
```

```text
Use avail-product-reviewer to check whether the coach dashboard leaks sensitive athlete data.
```

```text
Use avail-product-reviewer with react-best-practices and web-design-guidelines to review avail-prototype end to end.
```

### What To Ask For

Ask for:

- Findings ordered by severity
- Product-boundary violations
- Coach privacy leaks
- Consent and unavailable-state issues
- Banned copy or risky terminology
- Confidence and uncertainty issues
- Welfare protocol exposure risks
- File and line references

## react-best-practices

Use this skill when reviewing or improving React and Next.js code quality, performance, and component implementation.

### Use When

- Writing new React components
- Reviewing cc-generated React code
- Checking for unnecessary re-renders
- Checking component state placement
- Reviewing data fetching patterns in future app work
- Optimizing bundle size or expensive UI
- Reviewing Next.js pages or layouts, if the coach dashboard moves to Next.js

### Example Commands

```text
Use react-best-practices to review avail-prototype/src for React quality and performance issues.
```

```text
Use react-best-practices to review this component before we accept cc's implementation.
```

```text
Use react-best-practices and AVAIL's privacy rules to check whether the coach dashboard components are structured safely.
```

### What To Ask For

Ask for:

- Findings ordered by severity
- File and line references
- Concrete fixes
- Notes on unnecessary complexity
- Re-render or state management risks
- Any places where React structure makes privacy boundaries easier or harder to enforce

## web-design-guidelines

Use this skill when reviewing the user interface, accessibility, interaction design, responsiveness, and visual polish.

### Use When

- Reviewing the prototype in the browser
- Checking mobile and desktop layouts
- Checking accessibility basics
- Checking focus states and keyboard use
- Reviewing forms and validation states
- Reviewing visual hierarchy
- Checking if the UI feels too much like a medical dashboard or generic SaaS dashboard
- Checking whether AVAIL's calm contextual design direction is respected

### Example Commands

```text
Use web-design-guidelines to audit the AVAIL prototype UI in the browser.
```

```text
Use web-design-guidelines to check the athlete onboarding, daily check-in, and coach dashboard for UX and accessibility issues.
```

```text
Use web-design-guidelines together with docs/dev/copy_language_rules.md to review the prototype's UI copy and interaction states.
```

### What To Ask For

Ask for:

- Accessibility findings
- Responsive layout issues
- Form usability issues
- Focus and keyboard navigation issues
- Visual hierarchy problems
- Copy or tone issues
- Screens that feel inconsistent with AVAIL's product philosophy

## composition-patterns

Use this skill when components are becoming too large, prop-heavy, duplicated, or difficult to maintain.

### Use When

- Refactoring shared components
- Reviewing repeated card/list/badge patterns
- Components have many boolean props
- Coach and athlete screens duplicate similar layout logic
- Component props are becoming unclear
- State is being passed through too many layers
- A component is doing too many jobs

### Example Commands

```text
Use composition-patterns to review the component structure in avail-prototype/src/components.
```

```text
Use composition-patterns to suggest a cleaner structure for the coach dashboard components without changing product behavior.
```

```text
Use composition-patterns to check whether shared components like Card, Badge, Button, and PageWrapper are flexible without becoming over-abstracted.
```

### What To Ask For

Ask for:

- Components that should be split
- Components that are over-abstracted
- Boolean prop problems
- Duplicated layout patterns
- Better composition boundaries
- Safer prop shapes for privacy-sensitive views

## Recommended Review Prompts

### Full Prototype Review

```text
Use react-best-practices, web-design-guidelines, and composition-patterns to review avail-prototype.

Also apply:
- docs/dev/product_boundaries.md
- docs/dev/data_privacy_rules.md
- docs/dev/copy_language_rules.md
- avail-prototype/prototype_scope.md

Focus on product boundary violations, coach privacy leaks, banned language, React maintainability, UI accessibility, and AVAIL's calm contextual design direction.
```

### cc Code Review

```text
Use react-best-practices and composition-patterns to review cc's latest React changes.

Then cross-check against:
- docs/dev/data_privacy_rules.md
- docs/dev/copy_language_rules.md

Prioritize bugs, privacy risks, product-boundary violations, and maintainability issues. Provide file and line references.
```

### UI And UX Review

```text
Use web-design-guidelines to review the current AVAIL prototype in the browser.

Check desktop and mobile responsiveness, accessibility, focus states, form usability, visual hierarchy, and whether the experience feels calm and contextual rather than medical or alarmist.
```

### Component Architecture Review

```text
Use composition-patterns to review the component architecture.

Look for duplicated patterns, prop drilling, oversized components, excessive boolean props, and places where privacy-sensitive coach views should receive narrower props.
```

## Review Output Format

When asking Codex to use these skills for review, prefer this output format:

```text
Findings first, ordered by severity.
For each finding include:
- File and line
- Why it matters
- Suggested fix

Then include:
- Open questions
- Short summary
- Verification performed
```

## Important AVAIL-Specific Reminder

These skills improve engineering and interface quality. They do not understand AVAIL's regulatory, privacy, and product boundaries unless those docs are included in the prompt.

Always combine skill-based reviews with AVAIL-specific docs when reviewing production-facing work.
