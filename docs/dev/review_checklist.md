# AVAIL Review Checklist

This checklist is used before merging any code change. It applies to all contributors, including human developers, cc, and Codex.

Work through each section relevant to the change. Not every section applies to every change — use judgement. A documentation-only change does not need a build check. A copy change does not need a structure check. Any change that touches coach-facing data, consent, Load Score, or user-visible copy must complete the relevant sections in full.

---

## 1. Build

- [ ] `npm run build` passes with no TypeScript errors
- [ ] No new console errors or warnings introduced

---

## 2. Code Structure

- [ ] New files are in the correct directory (`pages/`, `components/`, `utils/`, etc.)
- [ ] File names follow the naming convention (PascalCase for components and pages, camelCase for utilities and data files, lowercase for directories)
- [ ] Any new page has a corresponding PRD in `docs/pages/` with the same filename
- [ ] Page PRD filename matches the page component filename exactly
- [ ] No user-visible strings are written inline in components — they are in `strings.ts`
- [ ] No colours, spacing, or font sizes are hardcoded in components — they are in `tokens.ts`
- [ ] No TypeScript types are defined inline in components — they are in `types.ts`
- [ ] No data transform logic lives inside a page or component — it is in `utils/`

---

## 3. Privacy Boundary

- [ ] Coach-facing pages and components only receive `CoachAthleteView` as props
- [ ] No coach component receives `AthleteProfile`, raw `LoadScore`, raw check-in data, cycle data, or welfare data
- [ ] `buildCoachView` in `utils/coachView.ts` is still the only place constructing a `CoachAthleteView`
- [ ] Mock data does not contain sensitive fields on coach-facing objects
- [ ] No sensitive athlete field is present in a coach API response or coach component prop, even if the UI does not display it

---

## 4. Consent Behaviour

- [ ] Consent-off athlete shows "Context unavailable" in coach view
- [ ] Consent-off state does not reveal why context is unavailable (no "did not consent", "opted out", "refused")
- [ ] Consent toggle change immediately affects the coach view in the same session
- [ ] Athlete consent copy preserves athlete agency ("You control what coaching staff can see")

---

## 5. Product Boundary

- [ ] No feature implies medical diagnosis, injury prediction, injury prevention, or performance prediction
- [ ] Load Score is paired with a confidence level wherever it appears
- [ ] The system does not appear to be telling the coach what to do
- [ ] The system does not appear to be telling the athlete to change their training
- [ ] Welfare-related patterns do not surface sensitive details to the coach

---

## 6. Copy And Language

- [ ] No banned terms appear in user-facing implementation: `injury`, `prediction`, `prevention`, `diagnosis`, `medical advice`, `clinical`, `fertility`, `symptom`, `recommendation`, `override`, `non-compliant`, `refused`
- [ ] Coach direction labels use "Context suggests: Maintain / Reduce / Recovery Focus / Increase"
- [ ] Coach different-decision action uses "I'm making a different decision" (not "Override")
- [ ] Required coach framing appears on all coach screens: "Today's physiological context — use alongside your professional judgement."
- [ ] Athlete copy feels supportive and calm, not clinical or evaluative

---

## 7. Confidence And Uncertainty

- [ ] Confidence level is visible wherever Load Score is displayed
- [ ] Low confidence state is visually distinct without being alarming
- [ ] Missing data is communicated as uncertainty, not hidden
- [ ] The system does not simulate precision when confidence is low

---

## 8. UX — Automated (Playwright)

These checks should be covered by Playwright smoke tests. If Playwright is not yet set up, verify manually.

- [ ] App loads and the login screen appears
- [ ] Athlete flow can be navigated end to end
- [ ] Daily check-in can be submitted
- [ ] Coach dashboard loads and displays squad context
- [ ] Consent-off athlete shows "Context unavailable" in coach view
- [ ] Coach athlete detail opens correctly
- [ ] Different-decision flow opens and can be submitted
- [ ] Required coach framing text is present on coach screens
- [ ] Confidence is visible for athletes with available context
- [ ] Desktop layout has no broken or overlapping elements
- [ ] Mobile layout has no broken or overlapping elements

---

## 9. UX — Manual

These checks require human judgement. They cannot be automated.

- [ ] The page feels calm and composed, not medical or surveillance-heavy
- [ ] Information density is appropriate — no data overload
- [ ] Visual hierarchy is clear — the most important information is easy to find at a glance
- [ ] Colours, spacing, and typography are consistent with the design system
- [ ] Athlete-facing screens feel like the athlete is understood, not monitored
- [ ] Coach-facing screens are fast to scan before a session
- [ ] The product does not feel like a fertility app, symptom tracker, or generic fitness dashboard
- [ ] Interactive elements have visible focus states for keyboard navigation
- [ ] Any empty state, loading state, or error state is handled gracefully

---

## Checklist Summary

| Section | Required for |
| --- | --- |
| 1. Build | All code changes |
| 2. Code Structure | All code changes |
| 3. Privacy Boundary | Any change touching coach data, athlete data, or data transforms |
| 4. Consent Behaviour | Any change touching consent, coach view, or athlete sharing settings |
| 5. Product Boundary | Any change touching features, copy, or model output |
| 6. Copy And Language | Any change touching user-visible text |
| 7. Confidence And Uncertainty | Any change touching Load Score or context display |
| 8. UX — Automated | Any change touching UI |
| 9. UX — Manual | Any meaningful UI change |
