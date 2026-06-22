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
- 2026-06-06 cc: Fix avatar filename to squad.png; switch from CSS sprite to individual cropped images per athlete using sips; Avatar component updated to use object-fit img approach for accurate face centering.
- 2026-06-06 cc: Fix avatar face alignment — tighter sips crop (6% padding), objectPosition changed to center 20% to focus on face area.
- 2026-06-06 Human: Revert avatars to single squad.png with per-athlete AvatarCrop coordinates; delete individual cropped pngs (commits "update", "detlet", "profile" — logged retroactively).
- 2026-06-11 cc: Move 8 page components from components/{athlete,coach}/ to pages/{athlete,coach}/ to match code_maintenance_rules.md; update all imports; build passes.
- 2026-06-11 cc: Add docs/pages/ PRD documents for all 9 pages (Login + 5 athlete + 3 coach), written retroactively against the implemented prototype.
- 2026-06-11 cc: Re-review prototype against review_checklist, product boundaries, privacy, and copy rules — findings recorded in review output (no P1 privacy leaks; P2/P3 copy-token findings open).
- 2026-06-11 cc: Fix review P2-1 — move hardcoded pending-check-in athlete id out of utils/coachView.ts into mockData PENDING_CHECK_IN_IDS, passed as a buildCoachView parameter; verified in browser, behaviour unchanged.
- 2026-06-11 cc: Fix review P2-2 — replace aisha-okafor placeholder LoadScore (value 0, empty label) with complete realistic mock data; verified in browser: coach still sees Context Unavailable while consent off, her own dashboard renders fully, and consent-on immediately shows valid context to coach.
- 2026-06-11 cc: Fix review P2-3 — Squad Load Overview rows now show confidence under each Load Score (confidenceColor-tinted, 10px); Pending and unavailable states unchanged; verified in browser.
- 2026-06-11 cc: Fix review P2-4 — move all remaining inline user-visible strings (~40 across 14 files) into strings.ts; Badge/BackButton now consume S.* helpers; remove unused sessionSubheading/differentDecisionSubheading duplicates; build passes, all screens verified in browser.
- 2026-06-11 cc: Fix review P3-1 — add brandGradient/brandShadow/brandGreen/statusAttention tokens; replace repeated hardcoded hex (#96680A, #3D9B6B gradient, #2D7A52, #B07A10) across 18 files with token refs.
- 2026-06-11 cc: Fix review P3-2 — rename internal injury* identifiers (injuryHistory, onboardingInjury* keys, INJURY_OPTIONS) to physicalHistory* so banned-term scans need no exemptions; user-visible copy unchanged.
- 2026-06-11 cc: Fix review P3-3 — drop chloe-williams duplicate avatarCrop (was identical to maya-chen); she now falls back to the initials avatar (squad.png has 6 faces for 7 athletes).
- 2026-06-11 cc: Fix review P3-4 — extract MetricCard and SquadOverviewRow from CoachDashboard into components/coach/ (414→266 lines); verified in browser, no visual change.
- 2026-06-11 Human+cc: Decide coach navigation stays single-column in prototype; sidebar/top-nav deferred to real product with concrete triggers. Record as Decision 1 in new docs/dev/frontend_architecture_rules.md (draft) — last missing Milestone 0 doc now exists.
- 2026-06-11 cc: M2 hardening — convert ToggleSwitch to button with role=switch/aria-checked and focus ring; verified focus, real-click toggle, and coach-view effect in browser.
- 2026-06-11 cc: M2 hardening — mobile walkthrough at 375px across all screens; fix AthleteListRow overflow (badges wrap to second line under 540px) and hide squeezed chart scale labels on narrow screens; all pages now fit without horizontal scroll.
- 2026-06-11 cc: M2 hardening — confirm .gitignore covers dist/node_modules/env/logs and git index contains no generated files. Mark Milestones 0, 1, 2 complete in milestone.md; M3 is next.
- 2026-06-22 Codex: Add root vercel.json so Vercel can deploy avail-prototype while keeping the repository root as the Vercel root directory.
