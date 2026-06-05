# AVAIL Development Log

One-line log for meaningful AVAIL project actions by human, Codex, cc, or other AI agents.

Rule: before starting project work, read the most recent entries in this file and do a lightweight handoff check.

Handoff check:

- Check whether the logged work appears complete in the repository.
- Note any obvious missing follow-ups, contradictions, or incomplete actions.
- Then proceed with the requested task.

This is a recent-log check, not a full project audit.

- 2026-06-04 Human: Confirm Supabase as the intended pilot backend platform.
- 2026-06-04 Codex: Add agile delivery rules and ticket guidance.
- 2026-06-04 Codex: Add workflow and CI/CD rules for ticket-to-staging delivery.
- 2026-06-04 Human: Require a concise one-line development log for human, Codex, cc, and other AI actions.
- 2026-06-04 Human: Require AI agents to do a lightweight handoff check from recent log entries before starting new tasks.
- 2026-06-05 Codex: Add testing rules v1 for prototype, Playwright, privacy, copy, and Supabase/RLS checks.
- 2026-06-05 cc: Standardise npm commands for cross-platform team; add .nvmrc (Node 20); update README, workflow, testing, and milestone docs.
- 2026-06-05 cc: Add .github/workflows/ci.yml — runs npm ci and npm run build on every push and PR.
- 2026-06-05 cc: Add code_maintenance_rules.md — repo structure, naming conventions, pages/components/utils rules, privacy boundary rules.
- 2026-06-05 cc: Add review_checklist.md — pre-merge checklist covering build, structure, privacy, consent, product boundary, copy, confidence, and UX (automated and manual).
- 2026-06-05 cc: Fix all P1 review findings — copy violations, buildCoachView moved to utils/coachView.ts, inline strings to strings.ts, accessibility fixes on interactive divs.
- 2026-06-05 cc: Fix all P2 review findings — useMemo for coachViews, setTimeout cleanup, Badge reuse in AthleteListRow, shared components moved, RoleSelect renamed to Login and moved to pages/, OnboardingFlow split into 5 step components, mobile responsive coach headers.
- 2026-06-05 cc: Fix all P3 review findings — crypto.randomUUID() replaces Math.random(), hover effects converted to state-based in AthleteListRow/CoachAthleteDetail/DifferentDecisionFlow.
- 2026-06-05 cc: Redesign coach dashboard — add metric cards, Squad Load Overview chart, and card/list toggle view with AthleteCard component.
- 2026-06-05 cc: Add CLAUDE.md — commands, source structure, privacy firewall, product boundaries, copy rules, naming conventions.
- 2026-06-05 cc: Add Avatar component with squad.jpg sprite support; update all avatar rendering across Login, coach components, and dashboard.
