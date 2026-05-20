# AVAIL

## Athlete Variability and Availability Intelligence Layer

**Product Proposal — Updated Working Draft**

Version 2.3 | All five critical problems resolved — consent architecture, MHRA language, liability protocol, RED-S protocol, data breach procedure

Document status: ✓ Confirmed · [TBD] To be defined · [NEW] Added in v2.0

---

## 1. Product Identity

*REWRITTEN IN V2.0 — FRAMING UPDATED FROM LOAD MANAGEMENT TOOL TO PHYSIOLOGICAL CONTEXT LAYER*

### 1.1 What This Product Is

Avail is the physiological context layer that women's sport has never had — built to learn every female athlete individually.

Rather than predicting what an athlete will do, the system surfaces physiological context before a session that no current tool provides. Coaches receive structured pre-session intelligence based on each athlete's cycle context, recovery state, and individual physiological profile — enabling better load decisions before performance is affected, not after.

Physiological variability is embedded within the decision model as a core input, not treated as a separate tracking feature. The system is designed around a simple but powerful principle:

> "We do not predict performance. We give coaches the one thing none of their current tools provide: physiological context before they make a load decision."

### 1.2 What This Product Is NOT

- Not a general wellbeing app
- Not an activist or awareness initiative — the focus is performance optimisation and decision support
- Not a standalone data collection tool — data input serves load modelling, not tracking for its own sake
- Not a medical or diagnostic system
- Not a period-tracking application
- Not a performance prediction system — the Load Score is context, not instruction

### 1.3 Product Positioning

| Attribute | Detail |
|---|---|
| Category | Female physiological data infrastructure — contextual load intelligence |
| Primary focus | Pre-session training context, individual physiological modelling, dataset accumulation |
| Design philosophy | Athlete-first, consent-based, privacy-preserving, performance-framed |
| Phase 1 beachhead | Women's football — UK and Europe (WSL + Championship) |
| Expansion pathway | Women's team sports Phase 2, consumer athletes Phase 2, hardware Phase 3 |
| Theoretical basis | Neuroendocrine-informed regulation of individual load tolerance |
| Brand name | Avail — Athlete Variability and Availability Intelligence Layer |

### 1.4 What This Product Will Become [NEW]

The coaching tool is the data collection mechanism. The dataset is the long-term asset.

Every club pilot, every athlete check-in, every session outcome logged contributes to a longitudinal dataset that has never existed: continuous biometrics, cycle context, training load, and performance outcomes across a diverse female athlete population at scale.

The structural comparable is the GSK–23andMe deal: $300 million for access to 5 million genetic profiles over four years. GSK paid not for the data but for the exclusivity of insight a dataset that could not be assembled any other way. Avail's dataset is structurally identical — smaller at launch but arguably higher signal, being dynamic, longitudinal, performance-linked, and covering a physiological domain that has never been systematically measured at scale.

**The flywheel**

Club pilots → high-quality validated data from elite athletes → proves the model → makes consumer product credible

Consumer app → thousands of athletes → model learns across ethnicity, nutrition, training background → clubs get a better product

Dataset compounds → impossible to replicate → pharma, federations, research institutions pay for access → funds the hardware

Purpose-built wearable → removes API dependency → owns the full data stack → moat is complete

---

## 2. Stakeholders

### 2.1 Commercial Model

The platform operates as a dual commercial model: B2B club licences as the entry point and validation engine, and B2C consumer subscriptions as the dataset scaling engine. The paying customers are professional clubs (B2B) and individual female athletes (B2C). The long-term dataset buyers — pharmaceutical companies, nutrition brands, national federations — form a third commercial relationship that unlocks at scale.

### 2.2 Buyer Roles — Club (B2B)

**Economic buyers (budget authority):**

- Sporting Director
- Club Owner / Board
- Head Coach (where applicable)

**Operational champions (day-to-day drivers):**

- Head of Performance
- Sports Science Lead
- S&C Lead

**Commercial framing note**

Lead with: injury reduction / availability stability / load precision — not cycle management.

The word 'cycle' should not appear in any sales conversation until the buyer has already bought the performance argument.

Primary sales narrative: 'the only pre-session load tool' and 'the only system built for female physiological variability as a first-class input'.

### 2.3 Buyer Roles — Dataset (B2B, Phase 3+) [NEW]

| Buyer | Use case and value |
|---|---|
| Pharmaceutical companies | Female drug trial baseline data. Female physiological variability datasets are needed for trial design and participant benchmarking. Current cost: £2,000–£8,000 per recruited participant. Dataset provides this at scale without recruitment cost. |
| Nutrition and supplement brands | Cycle-phase consumption and performance correlation data. Brands including Huel, Precision Hydration, and PhD Nutrition are actively seeking this. Informs product development and marketing claims. |
| National federations | Cross-squad readiness benchmarks. The FA, RFU, British Swimming currently have no multi-club female dataset. Federation-level dashboard product. |
| Academic institutions | Longitudinal female athlete physiology dataset for research. Publish-or-perish incentive. Low direct revenue but high credibility and marketing value. |

### 2.4 User Roles and Access

**Structural consent principle**

Consent happens directly between Avail and the athlete — NOT mediated by the club.

The club is not in the consent chain. Opt-out shows a grey placeholder on the coach dashboard — never a compliance flag.

This is structural, not cosmetic. It is what makes consent freely given under UK GDPR.

| Role | Access level |
|---|---|
| Athlete (club) | Primary data input. Owns their data. Controls sharing. Consent direct with Avail. |
| Athlete (consumer) | Individual user via own wearable. Personal physiological profile. |
| Coach | Receives structured pre-session indicators. |
| Sports Scientist / S&C | Configures model weights, reviews trends. |
| Club Medic / Physio | Injury correlation, rehabilitation context. |
| Dataset buyer (Phase 3+) | Anonymised aggregate data access under licensing agreement. |
| Platform Admin | System configuration and consent audit. |

---

## 3. Core Problem Statement

### 3.1 A System Built for Men, Applied to Women

For as long as performance sport has existed, the tools, models, and datasets used to manage athletes have been built on one assumption: that the default athlete is male. GPS tracking, load monitoring systems, RPE scales, injury risk models, wearable algorithms — all developed primarily using male subjects, validated on male cohorts, and then applied to female athletes as if the physiological differences were negligible.

They are not negligible. They are structural. Female athletes experience meaningful week-to-week physiological variability driven by hormonal cycles that have no equivalent in male physiology. This variability affects recovery capacity, fatigue sensitivity, neuromuscular performance, and injury risk in ways that are now well-documented in the scientific literature — but have never been operationalised in a performance tool.

The result is not just suboptimal performance management. It is a systematic, decades-long failure to treat female athletes as physiologically distinct individuals. They have been measured with the wrong tools, trained on the wrong models, and injured at rates that the sports science community has struggled to explain — in part because the data required to explain it has never been collected at scale.

**The direct human cost**

- ACL injury rate is 78% higher in female athletes during the luteal phase — the risk was there in the data but no system was looking for it
- Female athletes consistently report that performance staff do not understand why their 'good days' and 'bad days' follow patterns that feel predictable to them but invisible to coaches
- Careers are shortened by injuries that were physiologically predictable but operationally invisible
- Elite female athletes have spent their entire careers being managed by tools that were never designed for their bodies

### 3.2 The Retrospective Gap — Every Tool Looks Backwards

Even setting aside the male-default problem, the primary limitation in current load management is structural. Every tool in a performance director's stack is retrospective:

| Tool | The retrospective problem |
|---|---|
| GPS and tracking systems | Tell you what load was applied after the session. Cannot tell you what load should be applied before it. |
| RPE | Tells you how hard the session felt after the athlete experienced it. Cannot tell you whether that session was appropriate for this athlete on this day. |
| Kitman Labs / injury models | Assess injury risk based on accumulated load history. Retrospective by definition — the risk has already accumulated before the flag appears. |
| Wellness monitoring | Captures subjective state in the morning. But without physiological context — specifically cycle phase and individual variability — the data is uninterpreted noise. |

**In a Premier League performance director's words**

> "The one thing none of my current tools do is tell me that the reason Sarah had a 9 RPE session on what should have been a 6 RPE day isn't poor fitness or poor sleep. It's that her physiological tolerance was structurally lower that week and I scheduled her wrong. My current systems would just log that as a hard session. Yours would have flagged it 12 hours earlier.
>
> Every tool I have is retrospective. GPS tells me what happened. RPE tells me how it felt. Kitman tells me injury risk based on accumulated load. They all look backwards. Your product looks forward."

### 3.3 The Dataset Gap — The Evidence That Has Never Existed

The absence of a structured female physiological dataset is not just a product gap. It is a scientific and medical crisis that extends far beyond sport. The data that would allow us to understand female physiology in motion — continuously, longitudinally, across diverse populations — simply does not exist. The numbers make this stark:

- Out of 780 academic papers on cycle phase and elite athletic performance: only 7 studied it rigorously
- Total elite female athletes across all cycle-performance research combined: 314
- Longitudinal wearable datasets linking cycle phase to training load outcomes in team sport: 0
- Share of sports science research participants who are female: 35%
- Female participants in clinical drug trials historically: under 25% — meaning most drugs are dosed based on male physiology
- Closest existing product: Lehigh University 2024 — 13 athletes, WHOOP + GPS, 89% accuracy. Academic paper. Never commercialised. Nobody built the product.

The gap is not lack of interest. It is lack of infrastructure. Nobody has built the system that collects this data at scale, continuously, in real training environments, linked to actual performance outcomes. Avail is that system.

### 3.4 The Individualisation Problem [NEW]

Even the limited research that exists applies population-level findings to individual athletes — which is only marginally better than ignoring variability entirely. Female physiological responses are not just different from male responses. They are different from each other, in ways that are systematic and learnable but have never been modelled at scale.

A 22 year old Kenyan long distance runner with a 26-day natural cycle and high carbohydrate intake responds completely differently to the same training load in the same cycle phase as a 28 year old British sprinter on the combined pill with a gym-based background and diagnosed dysmenorrhea. Applying identical modifiers to both is not personalised medicine. It is a slightly more sophisticated population average.

The following dimensions create meaningful individual variability that no current system models. These are not fixed — they will expand as necessity demands and as compute power and longitudinal data make new dimensions modelable:

| Dimension | Individual variability it creates |
|---|---|
| Biological baseline | Cycle length, phase duration, hormonal contraception type, menstrual disorder history (dysmenorrhea, PCOS, endometriosis), hormone sensitivity |
| Ethnicity and genetics | Iron metabolism, muscle fibre distribution, thermoregulatory response, baseline HRV ranges, inflammatory profiles — almost entirely absent from existing research and the most commercially valuable gap in the dataset |
| Nutrition and energy availability | Carbohydrate availability, iron and ferritin levels, RED-S risk, hydration patterns by cycle phase, supplement use |
| Training history | Years of structured training, aerobic vs strength background, accumulated fatigue baseline, previous injury profile, sport-specific movement demands |
| Psychological profile | Stress regulation capacity, sleep sensitivity to cycle phase, RPE calibration tendency (over/underreporters), neurodivergent profiles |
| Temporal and contextual factors | Season phase, travel and time zone disruption, age and career stage, adolescent vs adult physiology, life stress outside sport |

**These dimensions will expand over time**

The six dimensions above represent what can be modelled with current data availability and compute power.

As the dataset accumulates across seasons and populations, new dimensions will become modelable — hormonal sensitivity markers, microbiome profiles, genetic polymorphisms relevant to recovery, environmental and altitude adaptation.

The architecture is designed for this expansion. Adding a new dimension does not require rebuilding the model — it requires enough longitudinal data to learn its weight vector.

This is the compounding scientific value of the dataset. It gets more useful as it grows, not just larger.

The model learns a personal weight vector for each athlete over time — the set of coefficients that determines how much each input affects the output for this specific individual. Population defaults are the starting point. Individual truth is the destination.

### 3.5 Core Modelling Assumption

Female physiological cycles introduce structured variability across three load-critical domains: recovery capacity, fatigue sensitivity, and load tolerance. These domains do not replace existing load metrics but modify how load should be interpreted within individual physiological context.

The system does not predict performance. It surfaces the physiological context within which a training decision is being made — giving coaches the one input their current tools structurally cannot provide.

### 3.6 Consequences of Misaligned Load Decisions

When female physiological variability is not integrated into load decisions, the consequences are measurable and documented:

- Increased injury frequency — ACL injury rate 78% higher in luteal phase in published research. Soft tissue injury clustering correlates with cycle phase in multiple studies.
- Reduced athlete availability consistency — misaligned load in one microcycle compounds into availability problems in the next
- Inefficient over- or under-loading — training that is too hard in a low-tolerance phase and too easy in a high-tolerance phase produces suboptimal adaptation
- Systematically misleading retrospective data — when high-RPE sessions are logged without physiological context, coaches misattribute cause and repeat the same mistakes
- Career shortening — repeated misaligned load events accumulate into chronic injury patterns that end careers earlier than physiology requires

---

## 4. Product Logic and Model Structure

### 4.1 Core Variables

#### 4.1.1 Cycle Context (Athlete-reported)

Athletes log period start and end only. Cycle phase is inferred by the system from cycle history. Athletes do not categorise their own phase — menstrual/follicular/ovulatory/luteal labels are removed from the athlete-facing interface entirely. Phase inference happens automatically.

**Why this matters**

Requiring athletes to self-categorise their cycle phase in clinical terms is both a UX failure and an accuracy failure.

The system infers the phase. The athlete taps when their period starts and stops. That is all.

#### 4.1.2 Daily Adjustment Parameters (Athlete-reported)

- Sleep quality (1–5 scale)
- Fatigue level (1–5 scale)
- Muscle soreness (1–5 scale)
- Mental readiness (1–5 scale) — framed as performance language, not mood. Core input, not optional.

Note: RPE is removed from MVP inputs. Post-session RPE requires a different behavioural moment from the morning check-in and splits the habit loop. Reintroduced in Phase 2 once the morning check-in habit is established.

#### 4.1.3 Hormonal Contraception Handling [NEW]

Approximately 40–50% of female athletes use hormonal contraception. This suppresses or significantly alters the natural cycle, making the cycle modulation layer inapplicable in its standard form. The system must handle this explicitly:

| Contraception status | Model behaviour |
|---|---|
| Natural cycle | Standard cycle modulation layer applied. Phase inferred from period start/end history. Modifier ±15% at population level, personalised over time. |
| Combined pill / patch | Cycle suppressed. Cycle modulation layer suspended. Model runs on physiological inputs only (sleep, fatigue, soreness, mental readiness). Conservative load bias applied. |
| Progesterone-only / implant / hormonal IUD | Cycle may be irregular or absent. System defaults to conservative mode. Wearable signals (skin temp, HRV) used as primary cycle proxies where available. |
| Prefer not to say | System defaults to conservative population baseline. Cycle modulation applied at reduced weight. Confidence score reduced. |

#### 4.1.4 RED-S Detection Protocol [NEW]

Relative Energy Deficiency in Sport affects an estimated 30–45% of elite female athletes. It suppresses the menstrual cycle, impairs recovery, and increases injury risk. The Load Score must not treat RED-S symptoms as normal physiological variability.

**RED-S trigger pattern**

- Absent or highly irregular cycle for 3+ consecutive cycles
- AND chronically elevated fatigue scores (4–5) across 10+ consecutive days
- AND declining Load Score trend not explained by training load data
- AND sleep quality declining despite no reported external stressors

**Response:** System flags to the club physio or medic (not the coach) under a separate consent layer. Athlete is prompted to speak with medical staff. Load Score confidence is reduced to Low. Model enters conservative mode.

This protocol requires clinical review before MVP deployment.

### 4.2 Load Regulation Model (MVP Stage)

The MVP uses a structured rule-based adjustment framework. The model integrates weighted physiological inputs, contextual cycle-phase modulation, and boundary-based risk band categorisation.

**Step 1: Input Normalisation**
All daily inputs scaled to [0,1] for comparability. Higher soreness = worse soreness. Higher fatigue = more fatigue.

**Step 2: Recovery and Fatigue Index**
Sleep and soreness contribute to a Recovery Index. Fatigue modifies the overall physiological readiness estimate. Default weight α = 0.6 (cold start).

**Step 3: Physiological State Index (PSI)**
Composite readiness derived from recovery and fatigue components. Default weight β = 0.3 (cold start).

**Step 4: Cycle Modulation Layer**
PSI adjusted by cycle-phase modifier. Range ±15% at population level. Personalised over time as individual pattern data accumulates. Suspended for athletes on cycle-suppressing contraception.

**Step 5: Load Score Generation**
Final Load Score 0–100 representing relative training load tolerance. Paired with Confidence Indicator (High / Medium / Low) based on data completeness and cycle history.

### 4.3 System Outputs

| Output | Description |
|---|---|
| Load Score | Numeric 0–100. Athlete's relative training load tolerance today. |
| Load Direction | Increase / Maintain / Reduce / Recovery focus. Pre-session recommendation. |
| Confidence Indicator | High / Medium / Low. Reflects data completeness and history length. |
| Training Modification Suggestion | Plain-language text recommendation for session adjustment. |

### 4.4 Cold Start and Missing Data Handling

Improved cold start protocol (updated from v1.0):

At onboarding: athlete retrospectively logs last 2–3 cycles from memory.

This provides enough history to start at Medium confidence from day one.

Previous approach left athletes at Low confidence for 6–8 weeks — during which coaches habitually ignored the system.

For incomplete daily data: missing values imputed using short-term rolling averages. Confidence score reduced accordingly.

### 4.5 Individualisation Roadmap

| Stage | What changes |
|---|---|
| Stage 1 — Cold start | Population defaults. Conservative cycle modifiers. Low confidence flagged loudly. Risk-averse mode. |
| Stage 2 — Personal baseline (after 2–3 cycles) | Model learns this athlete's personal response pattern. Modifiers become athlete-specific. |
| Stage 3 — Contextual model (after one full season) | Nutrition, training type, ethnicity, psychological factors layer in as contextual modifiers. The model knows not just when this athlete struggles but why. |
| Stage 4 — Longitudinal intelligence (multi-season) | Individualised tolerance curves. Cross-athlete pattern matching. Predictive calibration from accumulated data. |

---

## 5. Unified Foundational Logic and Core Model Architecture

The underlying mechanism is neuroendocrine regulation of individual load tolerance. The menstrual cycle represents one observable and low-cost modulation window within that system — not the root mechanism itself.

This framing is more precise, more scientifically defensible, and more scalable than cycle-specific positioning. The core algorithm estimates an athlete's current load tolerance based on sleep, fatigue, soreness, and cycle context. It is independent of sport type and operates at the physiological regulation layer.

Sport-specific differences are handled at the decision-mapping layer. The algorithm remains singular and stable. Variation occurs in how outputs are interpreted and translated into training recommendations.

Future architectural expansion naturally incorporates: neurodivergent athlete profiles, HRT and hormonal intervention users, adolescent developmental stages, chronic stress and recovery regulation modelling. None of these require changes to the athlete-facing input layer.

---

## 6. Design Principles

### 6.1 Athlete-First Data Architecture

Athletes retain ownership of their personal data. Data sharing is controlled at the individual level through granular permissions. Coaches and performance staff receive structured indicators only — never raw cycle logs or sensitive personal details unless explicitly authorised by the athlete.

The athlete dashboard is the primary product, not the coach dashboard. Athletes must receive more direct value from the app than coaches do — at least in early stages. This is what drives compliance. Coach intelligence is a byproduct of athlete engagement, not the primary purpose.

### 6.2 Explicit Consent and Governance

- All data sharing is opt-in by default
- Consent can be modified or withdrawn at any time
- Consent happens directly between Avail and the athlete — not mediated by the club
- Opt-out results in a grey placeholder on the coach dashboard — never a compliance flag
- Audit logs ensure transparency of all data access
- Post-session feedback used to compare predicted load tolerance with perceived session difficulty for model calibration

### 6.3 Performance-Centred Framing

- All user-facing language is framed around training load and availability
- Cycle context is presented as a performance-adjustment factor, not a health disclosure
- The Load Score is explicitly framed as context for a coach decision — not an instruction
- The system does not provide medical diagnosis or clinical recommendations

### 6.4 Data Quality Tiering [NEW]

Club data and consumer data are fundamentally different quality tiers and must be managed separately:

| Tier | Characteristics and use |
|---|---|
| Club tier | Elite athletes, structured environment, coaching context, GPS ground truth, high compliance pressure. Used for core model validation and training. |
| Consumer tier | Voluntary engagement, variable compliance, no external ground truth, diverse wearables. Used for scale and pattern discovery — not core model validation until quality threshold is met. |
| Graduation protocol | Consumer athlete data graduates to model training use after: 6+ months continuous engagement, >80% check-in compliance, at least one wearable linked, and at least one performance outcome recorded. |

### 6.5 Data Breach Incident Response Procedure [RESOLVED]

Avail processes special category personal data under UK GDPR including menstrual cycle data, health indicators, and physiological data in an employment context. A breach of this data carries the highest regulatory and reputational risk. The following procedure is mandatory before any production athlete data is handled.

**Phase 1 — Detection and containment (0–2 hours)**

- Any team member who suspects a breach immediately alerts the designated Data Incident Lead (technical co-founder as default until DPO appointed)
- Incident Lead assesses: what data was affected, how many athletes, what was the access vector, is the breach ongoing
- If breach is ongoing: immediately revoke affected access tokens, rotate encryption keys for affected data tier, isolate affected system components
- Incident log opened — every action timestamped from this point forward

**Phase 2 — Assessment and notification decision (2–24 hours)**

- Assess likelihood that affected athletes face risk — consider: sensitivity of data exposed (menstrual data = highest sensitivity), whether data is identifiable, whether it could reach the employing club
- If risk to individuals is likely: ICO notification is mandatory within 72 hours of discovery — not of decision
- If high risk to individuals: direct notification to affected athletes required without undue delay
- Prepare notification drafts: ICO notification template and athlete notification template — both drafted in advance, stored securely

**Phase 3 — ICO notification (within 72 hours of discovery)**

- Required content: nature of breach, categories and approximate number of individuals affected, likely consequences, measures taken or proposed
- Do NOT delay notification to investigate fully — notify with known information and update as more becomes available
- ICO notification does not require informing the club — athlete data is between Avail and athlete, not the club

**Phase 4 — Remediation and post-incident review**

- Root cause analysis completed within 7 days
- Technical fix deployed and verified before any affected systems return to production
- Affected athletes informed of remediation steps taken
- Post-incident review documents: what happened, why, what was fixed, what process changes prevent recurrence
- Annual penetration test brought forward if breach was via external attack vector

**Pre-launch requirements — mandatory before first production athlete data**

- Cyber insurance policy in place — minimum £2M liability, specifically covering special category health data breach
- Penetration test completed by external security firm — report reviewed and critical findings remediated
- Breach notification templates prepared and stored — not drafted under pressure during an incident
- Data access anomaly detection active on audit log — breach detection is automated, not manual
- All team members briefed on breach reporting procedure — anyone can trigger Phase 1

### 6.6 Mental Health Signal Protocol [RESOLVED]

The system will accumulate data on athletes who are struggling. The following protocol is documented, legally reviewed, and must be implemented before MVP deployment. The system does not diagnose. It detects a pattern and signposts. That distinction is legally and clinically essential.

**Detection trigger**

- Mental readiness ≤2 AND sleep quality ≤2 for 5 or more consecutive days
- AND Load Score declining trend (not explained by known training load increase)
- AND no illness flag logged (to distinguish mental health pattern from physical illness recovery)
- System must have at least 14 days of baseline data before this trigger activates — prevents false positives in early onboarding

**Response pathway — athlete only, no coach notification**

**Step 1:** Athlete receives in-app prompt on day 5. Wording: 'We've noticed your readiness scores have been low for a few days. How are you doing beyond training? It can help to talk to someone you trust or your club's medical team.'

**Step 2:** Prompt offers three responses — 'I'm fine, just a tough week', 'I'd like to speak to someone', 'Not sure'. Each response is logged but not shared with coach.

**Step 3:** If athlete selects 'I'd like to speak to someone' — app surfaces club medical contact details and optionally Samaritans / Mind signposting. No further action by Avail.

**Step 4:** If pattern continues beyond day 10 with no response — second prompt with same wording. After day 10 no further automated prompts.

Coach is NEVER notified. Club medic is NEVER automatically notified. Avail does not act as a clinical intermediary.

**Legal boundary**

This protocol has been reviewed against: duty of care obligations for technology platforms, clinical responsibility limits for non-medical software, GDPR requirements for sensitive data processing, and safeguarding obligations.

Avail's legal position: we are a performance monitoring tool that surfaces a usage pattern and signposts support. We do not assess mental health, provide clinical advice, or carry clinical responsibility.

The protocol must not be described in any external material as a 'mental health monitoring' feature — it is a 'wellbeing pattern flag'.

This protocol requires annual review as case law around technology platform duty of care continues to develop.

---

## 7. Competitive Advantage

### 7.1 Existing Platform Landscape

**Performance monitoring platforms**

| Platform | Limitation |
|---|---|
| Catapult Sports | GPS-based tracking. Widely used in professional football. Male-default models. Retrospective — tells you what happened, not what to do next. No cycle data. |
| Kitman Labs | Athlete management and injury tracking. Used by professional teams. Emphasis on injury prediction from accumulated load. Retrospective. No female physiology layer. |
| STATSports | Wearable GPS for professional and semi-professional clubs. Real-time physical performance data. Match and training intensity monitoring. No cycle data. |

**Consumer wearables**

| Platform | Limitation |
|---|---|
| WHOOP | Continuous recovery monitoring via HRV, sleep, strain. Individual athletes only. Not team-integrated. No sport-specific female physiology model. |
| Oura Ring | Best skin temperature + HRV dataset. 2.5M+ users, 59% female. Clue partnership and UC Berkeley research underway. PRIMARY COMPETITIVE THREAT — see §7.3. |
| Garmin | Athlete performance and recovery metrics. Broad consumer base. Not team-focused. No female-specific performance modelling. |

**Cycle tracking apps**

| Platform | Limitation |
|---|---|
| Clue | 12M+ active users. Largest cycle self-report dataset. No wearable biometrics. No training load data. Health and fertility focus — not athletic performance. States explicitly they do not sell user data. |
| Flo / Natural Cycles | Large cycle prediction datasets. Fertility and contraception focus. No athletic performance or training load data. Consumer health not sports performance. |

### 7.2 The Research Anchor

**Lehigh University Study 2024 — the closest academic equivalent**

13 female soccer athletes. WHOOP monitors + GPS data. 55,839 data points. One competitive season.

89% accuracy predicting physiological stress using cycle phase + wearable biometrics + training load.

Published as an academic paper. Never commercialised. Nobody built the product.

Avail is that study run across thousands of athletes, permanently, as a product.

### 7.3 Primary Competitive Threat — Oura [NEW]

**Why Oura is the threat to watch**

2.5 million rings sold. 59% female users. Best continuous skin temperature dataset in existence.

Active partnership with Clue (cycle tracking) and UC Berkeley (female health research).

Moving aggressively into female health as a strategic priority.

Defence: Speed. Sports performance angle they do not have. Coaching workflow they would never prioritise.

API partnership agreements with Oura and WHOOP must be signed now — while Avail is small and non-threatening.

Every month of delay on the hardware roadmap extends API dependency risk.

### 7.4 Strategic Differentiators

| Differentiator | Strategic impact |
|---|---|
| Pre-session not retrospective | Every competitor tells you what happened. Avail tells you what physiological context exists before the decision is made. |
| Female physiology as first-class input | Built from the ground up for female athletes — not an add-on to a male-default system. |
| Individual not population | The model learns each athlete individually across ethnicity, nutrition, contraception status, and training history. No competitor does this. |
| Dataset as the product | The coaching tool is the data collection mechanism. The longitudinal female physiological dataset that accumulates is the long-term asset. |
| Consent architecture | Trust-first design makes athlete adoption more likely, improving data quality and therefore model accuracy. |
| Research-backed | Strong existing research base — Lehigh study, BJSM ACL data, neuroendocrine load literature — underpins the algorithm. |

---

## 8. Strategic Roadmap and Scalability

### 8.1 Phase 1 — Prove It (Now to 9 months)

B2B beachhead. 1–2 WSL or Championship clubs. Pull Oura/WHOOP data via API. Deliver Load Scores manually — spreadsheet and WhatsApp is acceptable at this stage. Season 1 is explicitly a calibration season. Clubs are told this upfront. The goal is validation data, not a finished product.

- Secure API partnership agreements with Oura and WHOOP before becoming visible as a threat
- Get first coach interview quotes on record — use verbatim in all investor applications
- Attach scientific advisor and GDPR specialist to the team before first pilot agreement is signed

### 8.2 Phase 2 — Scale It (6 to 18 months)

B2C consumer app launch running in parallel with B2B club expansion. App works with existing wearables. £9.99/month subscription. Dataset grows fast across a diverse athlete population. Apply to YC with club validation data and consumer early adopter numbers.

- Consumer app is athlete-first — more valuable to the athlete than to any third party
- Club-validated science ('used by WSL clubs') is the primary consumer marketing claim
- Target ethnic diversity in consumer acquisition from launch — this is what makes the dataset scientifically valuable

### 8.3 Phase 3 — Own It (18 to 36 months)

Both channels compound. Model accuracy improves across both club and consumer data. Federation deals open. Series A raise specifically to fund hardware development. Hardware design begins based on what the data has revealed about which signals actually matter.

### 8.4 Phase 4 — Defend It (36 to 48 months)

Purpose-built wearable ships. No longer dependent on Oura or WHOOP API access. Dataset licensing begins — pharma, nutrition, federation contracts. The data moat is complete and structurally impossible to replicate without starting now.

### 8.5 Phase 5 — Longitudinal Intelligence (48 months+)

Platform transitions from rule-based adjustment to female-specific individualised tolerance modelling. Individualised tolerance curves per athlete. Cross-club female benchmarks. Injury probability calibration. The longitudinal dataset becomes a strategic data asset forming a defensible foundation for continued model improvement.

---

## 9. Business Model and Pricing Strategy

### 9.1 Target Customers

**Primary market (Phase 1–2):** Women's professional football clubs — WSL and Championship. High-performance and sports science departments. Head of Performance and Sports Science leads.

**Secondary markets (Phase 2+):** Individual female athletes via consumer app. National federations and elite development squads. Any female athlete with an existing wearable.

**Dataset buyers (Phase 3+):** Pharmaceutical companies, nutrition brands, national federations, academic research institutions.

### 9.2 Three Revenue Streams

| Stream | Description and scale |
|---|---|
| Stream 1 — Club licences (now) | £7,500 pilot tier (up to 25 athletes). £15,000 professional tier with GPS/HR integration. £25,000+ elite tier with cross-club benchmarking and federation dashboard. Slow to scale. High credibility. Cash from month one. |
| Stream 2 — Consumer subscriptions (month 6) | £9.99/month individual athlete. Works with Oura, WHOOP, Garmin from day one. Scales fast once product-market fit found. 10,000 subscribers = £1.2M ARR. Eventually the largest single revenue stream. |
| Stream 3 — Dataset licensing (year 2+) | Pharma: female drug trial baseline data — comparable value £2,000–£8,000 per equivalent participant recruited. Nutrition brands: cycle-phase consumption correlations. Federations: cross-squad readiness benchmarks. Structural comparable: GSK–23andMe — $300M for access to 5M profiles over 4 years. |

### 9.3 Revenue Projections

| Scenario | Components |
|---|---|
| Conservative (Year 3) | 15 clubs at £12,500 avg = £187,500. 5,000 consumers = £600,000. 1 federation deal = £150,000. Total: ~£940,000 ARR. |
| Optimistic (Year 3) | 40 clubs at £15,000 avg = £600,000. 20,000 consumers = £2.4M. 3 dataset deals = £750,000. Total: ~£3.75M ARR. |

---

## 9B. Funding Strategy [NEW]

### 9B.1 Recommended Funding Sequence

| Stage | Details |
|---|---|
| Apply now — EF London | Entrepreneur First. Pre-product accepted. The insight is the application. 60–70% fit probability. Apply before building anything. London cohort. |
| Apply now — Antler London/Amsterdam | No product needed. Helps find technical co-founders. Invests £100k for ~10% at end of cohort. Apply if technical co-founder not yet locked. |
| Apply now — EIC Accelerator | EU non-dilutive grant. €500k–€2.5M. Female physiology dataset qualifies as research infrastructure. Non-dilutive — apply before any equity raise to strengthen negotiating position. |
| Apply with traction — YC | Next batch after first club pilot confirmed. $500k investment. 35–45% fit probability with the dataset framing. Do not wait for a finished product — one club running any version counts. |
| Seed — £1–2M | YC + femtech VCs (Portfolia, Female Founders Fund). Target: 5–10 clubs, 2,000+ consumer users, first dataset conversations on record. |
| Series A — £8–15M | Specifically to fund hardware development. Target: 50+ clubs, 20,000+ consumers, first dataset licensing deal signed. Hardware design begins here not before. |

### 9B.2 The 8-Week Action Plan

| Timeline | Action |
|---|---|
| Week 1–2 | Apply to EF London. This week, not next month. |
| Week 1–4 | Get one club running the model manually. Spreadsheet + WhatsApp. You need the data not the product. |
| Week 2–4 | Lock technical co-founder or start Antler process. Every investor asks. Every non-answer kills momentum. |
| Week 3–5 | Attach sports science advisor. One credible academic name kills the scientific credibility gap immediately. |
| Week 4–6 | Conduct 5–10 coach interviews on record. Quote them verbatim in every application. |
| Week 6–8 | Apply for EIC grant. Non-dilutive. Changes negotiating position with every subsequent investor. |
| Before any pitch | Have three real dataset conversations — pharma, nutrition brand, federation. Even informal interest beats TAM calculations. |

---

## 10. Technical Architecture

The technical co-founder is confirmed on the team. Full architecture documentation is in progress. The high-level system design is documented below. Detailed component specifications will be added before seed round.

### 10.1 System Overview

The architecture is designed around three principles: the dataset is the long-term asset and must be protected and structured accordingly from day one; the model must be able to learn individual weight vectors across a growing population without requiring a rebuild; and privacy architecture is structural, not cosmetic — the consent and data isolation layers are core infrastructure, not afterthoughts.

### 10.2 High-Level Component Architecture

| Component | Description |
|---|---|
| Athlete mobile app | React Native cross-platform application. Handles onboarding profile, daily check-in, session outcome capture, and personal dashboard. Communicates with the API layer only — no direct database access. |
| Coach web dashboard | Responsive web application. Displays Load Score, direction, confidence, team overview, override logging. Receives structured output only — never raw health data from any athlete. |
| API layer | Node.js REST API. Handles all client communication, authentication, consent verification on every request, and routing to appropriate services. Consent check is middleware — no request reaches data without passing consent validation. |
| Neuroendocrine Engine | Python-based model service. Runs input normalisation, recovery index, PSI calculation, cycle modulation, and Load Score generation. Stateless — receives inputs, returns outputs, writes nothing directly to the database. Versioned and containerised. |
| Data pipeline | Three input streams: self-report (from athlete app), wearable APIs (Oura, WHOOP, Garmin — pull on schedule), club systems (Catapult, Kitman — import or webhook). Normalised and staged before reaching the model. |
| Tiered data store | Two logical tiers within the same infrastructure: club tier (high compliance, verified ground truth, used for model training and validation) and consumer tier (voluntary, variable quality, used for pattern discovery and subgroup analysis until graduation threshold met). Physically separated at storage level. |
| Consent management layer | Standalone service. Stores consent state per athlete per data type per recipient. Every data access request is validated against consent state in real time. Audit log written for every access event. |
| Individual weight vector store | Per-athlete model parameter storage. Initialised from onboarding profile subgroup defaults. Updated incrementally after each session outcome capture. Versioned — previous weight vectors are never deleted, only superseded. |

### 10.3 Data Flow — Daily Check-in to Load Score

| Step | Action |
|---|---|
| Step 1 | Athlete completes check-in in mobile app. Inputs validated client-side for range and completeness. |
| Step 2 | API layer receives inputs. Consent middleware verifies sharing permissions. Request rejected if any consent state is invalid. |
| Step 3 | Inputs written to club or consumer tier data store depending on athlete type. Timestamp and device metadata logged. |
| Step 4 | Neuroendocrine Engine service called with: today's inputs, athlete's current weight vector, cycle history, wearable signals if available. Returns Load Score, direction, confidence level. |
| Step 5 | Load Score written to coach dashboard store. Raw inputs never written to coach-accessible data. Audit log entry written. |
| Step 6 | Session outcome capture (after training) triggers weight vector update. Outcome compared to predicted direction. Discrepancy logged as calibration signal. |

### 10.4 Privacy Architecture

| Layer | Implementation |
|---|---|
| Data isolation | Athlete health data and coach-facing output data are stored in separate tables with no foreign key relationships. Coach dashboard cannot query the health data store — it can only read from the structured output store. |
| Consent as middleware | Every API request passes through consent validation before reaching any data. Consent can be withdrawn in real time — the next request after withdrawal returns no data for that athlete. |
| Anonymisation pipeline | Data moving to the dataset tier (for model training or future licensing) passes through an anonymisation pipeline that removes all direct and quasi-identifiers before storage. Re-identification is architecturally impossible from the anonymised tier. |
| Encryption | All data encrypted at rest (AES-256). All data in transit encrypted (TLS 1.3). Encryption keys managed separately from data — key compromise does not expose data without key. |
| Breach detection | Anomalous access pattern detection on the audit log. Alerts on: bulk data access, access outside normal hours, access from new IP ranges, failed consent checks at elevated rate. |

### 10.5 Wearable API Integration

| Platform | Integration detail |
|---|---|
| Oura Ring | API v2. Pulls: skin temperature deviation (cycle phase proxy), HRV, sleep score, sleep stages, readiness score. Pull frequency: nightly. Athlete authorises via OAuth. Data stored in wearable signals table — separate from self-report. |
| WHOOP | WHOOP API. Pulls: strain, recovery, HRV, skin temp, sleep performance. Pull frequency: nightly. OAuth authorisation. WHOOP is prioritised for sports performance angle — higher HRV accuracy in athletic populations. |
| Garmin | Garmin Health API. Pulls: HRV status, sleep, stress score, body battery. Pull frequency: nightly. Opens recreational athlete market. |
| Catapult / Kitman | Club system integration via CSV import or webhook. Session load, GPS data, session type. Manual import acceptable in MVP — API integration in Phase 2. |

### 10.6 Model Versioning and Governance

The Neuroendocrine Engine is versioned independently of the application. Every athlete's Load Score history records which model version generated it. When the model is updated, historical scores are not retroactively recalculated — the version is logged so future analysis can account for model changes. This is critical for longitudinal dataset integrity.

**Technical items still to document before seed round**

- Mobile app stack finalisation (React Native confirmed — native module decisions pending)
- Cloud infrastructure provider and data residency confirmation (UK or EU required for GDPR)
- Detailed model training pipeline for weight vector updates at scale
- Load testing and scalability plan for consumer app launch
- Full security architecture review by external penetration tester

---

## 11. MVP Scope

The MVP validates whether pre-session physiological context, generated by the system, is practically useful within real training environments and correlates with actual athlete availability and training outcomes.

**MVP philosophy**

Season 1 with any pilot club is explicitly a calibration season — stated upfront, not discovered mid-way through.

The MVP has three core modules, not five. Report export is cut entirely — in a pilot you are in the room with the performance staff. Reports are a scaling feature, not a validation feature.

The confidence indicator must be prominent. The system must say 'I don't know' loudly when data is thin. Honest uncertainty is a differentiator against tools that always produce a confident number nobody trusts.

### 11.1 Three Core MVP Modules

#### Module 1 — Athlete Daily Input [UPDATED — Individualised]

Module 1 is restructured into two parts: a one-time onboarding profile that initialises the individual weight vector, and an adaptive daily check-in that adjusts prompts, optional inputs, and consistency checks based on that profile and accumulated pattern data.

**Core design principle**

Every athlete sees the same five core inputs. What changes is everything around them — the prompts, the optional fields, the consistency thresholds, the phase context — all of which adapt to who this athlete is.

The form is not the product. The model learning this specific athlete is the product.

##### Module 1A — Onboarding Profile (One-time, 3–4 minutes)

Completed at first login. Framed as a short guided conversation in the app, not a clinical form. Captures the permanent individual context that shapes the weight vector from day one. This is what separates Avail from a generic wellness check-in tool.

**SECTION 1 — PHYSIOLOGICAL BASELINE**

| Field | Options |
|---|---|
| Cycle regularity | Regular / Irregular (cycles vary by more than 7 days) / Absent / Not applicable |
| Hormonal contraception | Combined pill or patch / Progesterone-only pill / Implant / Hormonal IUD / Non-hormonal / None / Prefer not to say |
| Diagnosed conditions | Dysmenorrhea / PCOS / Endometriosis / None / Prefer not to say (multi-select) |
| RED-S or disordered eating history | Yes / No / Prefer not to say — triggers conservative load bias and weekly energy check-in if yes |
| Retrospective cycle history | Roughly when did your last 2–3 cycles start? (month/week, approximate is fine) — initialises phase inference immediately |

**SECTION 2 — TRAINING AND PHYSICAL BACKGROUND**

| Field | Options |
|---|---|
| Years of structured training | Under 2 / 2–5 / 5–10 / 10+ |
| Primary training type | Endurance dominant / Strength dominant / Mixed / Technical / Other |
| Current weekly training load | Under 5 hours / 5–10 hours / 10–15 hours / 15+ hours |
| Previous significant injuries | Yes (location flag) / No — informs soreness weighting and injury context tracking |

**SECTION 3 — NUTRITION AND ENERGY**

| Field | Options |
|---|---|
| Dietary pattern | High carbohydrate (endurance-focused) / Plant-based / Mixed omnivore / High protein / Restricted / Other |
| Iron supplementation | Currently supplementing / Previously diagnosed low / No / Prefer not to say — affects fatigue weighting |
| Energy availability concern | Rarely feel adequately fuelled / Sometimes / Usually fine — RED-S proxy, triggers monitoring flag if concerning |

**SECTION 4 — INDIVIDUAL CONTEXT**

| Field | Options |
|---|---|
| Ethnicity | Multi-select with prefer not to say option — used for dataset diversity tracking and subgroup modelling, never shown to coach |
| Neurodivergent profile | ADHD / Autism / Neither / Prefer not to say — affects sleep and stress input weighting |
| Sleep sensitivity | My sleep is highly variable / Fairly consistent / Very consistent — calibrates sleep weight in model |
| RPE calibration tendency | I tend to underreport effort / I report accurately / I tend to overreport effort — adjusts consistency check thresholds |

**What the onboarding profile immediately changes**

- Cold start defaults are narrowed to the relevant physiological subgroup — not generic population averages
- Confidence score starts at Medium for most athletes rather than Low — because the system already knows meaningful context
- Cycle phase inference begins immediately using retrospective history rather than waiting months for first full cycle
- Contraception status triggers the correct model branch from day one (see §4.1.3)
- RED-S history flag activates weekly energy availability check-in and conservative load bias
- Ethnicity data is stored separately, never surfaced to coach, used only for dataset subgroup analysis

##### Module 1B — Adaptive Daily Check-in (Under 60 seconds)

The five core inputs are identical for every athlete every day. What adapts is everything around them — prompts, optional fields, and consistency check thresholds — based on the onboarding profile and accumulated pattern data.

**THE FIVE CORE INPUTS — SAME FOR EVERY ATHLETE**

| Input | Adaptation logic |
|---|---|
| Sleep quality | 1–5. Prompt adapts: high-variability sleepers get 'compared to your usual' framing. Consistent sleepers get a simpler prompt. |
| Fatigue level | 1–5. Prompt adapts based on training phase — pre-season prompts differ from competition week prompts. |
| Muscle soreness | 1–5. Dysmenorrhea flag adds optional pain location during menstrual phase. Previous injury flag adds optional location check. |
| Mental readiness | 1–5. Performance framing only — 'how ready do you feel to train hard today'. Never framed as mood or emotional state. |
| Period tap | Period started / Period ended / Neither. Phase inferred by system. No phase label shown to athlete. |

**OPTIONAL INPUTS — APPEAR ONLY WHEN RELEVANT TO THIS ATHLETE**

| Optional input | Trigger condition |
|---|---|
| Pain location flag | Appears during menstrual phase for athletes with dysmenorrhea. Never shown to other athletes. |
| Energy availability check | Appears weekly for athletes with RED-S history or energy concern flag. 'How fuelled do you feel today 1–5'. Not in standard check-in. |
| Sensory load note | Appears during high-competition periods for neurodivergent athletes. Optional free text. Never shown to coach without consent. |
| Travel / time zone flag | Appears automatically after logged travel in club session data. 'Did travel affect your sleep or recovery?' |
| Illness flag | Appears if fatigue ≥4 AND soreness ≥4 for 3+ consecutive days — system prompts to flag illness separately from training load. |

**CONSISTENCY CHECKS — PERSONALISED TO INDIVIDUAL BASELINE**

Contradiction flags are calibrated to each athlete's personal pattern range, not population averages. A fatigue score of 3 is unremarkable for one athlete and a significant deviation for another.

| Check type | Logic |
|---|---|
| Personal baseline deviation | If any input deviates more than 1.5 standard deviations from this athlete's rolling 28-day average, system prompts: 'This is lower than your usual — anything worth noting?' |
| Cross-input contradiction | Fatigue ≤2 combined with soreness ≥4 triggers: 'You feel low fatigue but high soreness — does that feel right?' |
| Sustained pattern flag | Same score (±0.5) on any input for 7+ consecutive days: 'Your [input] has been very consistent lately — still accurate?' |
| Post-cycle pattern check | After each completed cycle: 'Last cycle your [fatigue / soreness / sleep] tended to be higher in the [phase] phase — does that match how you felt?' |

**SESSION OUTCOME CAPTURE — AFTER EVERY TRAINING SESSION**

| Element | Detail |
|---|---|
| Primary tap | Easier than expected / As expected / Harder than expected |
| Secondary prompt (if harder) | Was it physical or mental that made it harder? (optional) |
| Calibration function | This is the feedback loop that trains the model. Without it the Load Score never learns whether it was right. This input is as important as the morning check-in. |

**How the daily check-in evolves over time**

- Weeks 1–4: Population defaults + onboarding profile. Confidence Low to Medium. System learns this athlete's baseline ranges.
- Months 1–3 (2–3 cycles): Personal baseline established. Consistency checks calibrated to individual. Optional inputs tuned. Confidence Medium to High.
- Season 1+: Full individual weight vector active. Prompts personalised to her language and patterns. Cycle modulation individualised. Confidence reliably High for complete data days.
- Multi-season: Tolerance curves built. Seasonal pattern recognition. Cross-cycle predictive calibration.

#### Module 2 — Coach Dashboard

- Daily Load Score per athlete (0–100)
- Load Direction: Increase / Maintain / Reduce / Recovery focus
- Confidence Indicator: High / Medium / Low — prominently displayed
- Team overview — all athletes in a single view
- Weekly load trend per athlete
- Override mechanism — coach can override, system logs decision and context

**Legal framing requirement [NEW]**

The coach dashboard must make it visually and textually unambiguous that the Load Score is physiological context for a coaching decision — not an instruction.

Recommended dashboard header: 'Today's physiological context — use alongside your professional judgement'

Legal opinion required before first pilot on liability framing. This is non-negotiable.

#### Module 3 — Availability and Injury Context Tracking

- Injury and absence events logged with Load Score context from preceding 5–7 days
- Direction changes (Increase / Reduce signals) logged automatically
- Confidence levels at time of event recorded
- This passive logging builds the validation evidence base required for Phase 2 sales

### 11.2 Athlete Dashboard (MVP)

The athlete dashboard is the primary product for compliance. Athletes must get more from the app than they give. If they log and get nothing back, compliance collapses by week 3.

- Personal readiness trend — last 7 days
- Current cycle vs previous cycle comparison
- Visibility when coach adjusts load based on their score
- Session outcome capture — feeds the calibration loop

### 11.3 Coach Education Component [NEW]

The majority of performance directors and head coaches in women's football are male. A meaningful number will find the subject matter uncomfortable or deprioritise engagement after initial enthusiasm.

Required: a short optional performance-framed education module. Not medical training. Specifically designed to give male coaching staff the language and confidence to engage with cycle-contextualised outputs without feeling they are navigating medical territory.

[TBD] — Module content to be developed with sports science advisor. Estimated 15 minutes. Video format. Available in coach dashboard onboarding.

---

## 12. Validation Logic

An initial pilot with a women's team (15–20 athletes) over a full competitive season. Data collected will analyse the relationship between predicted load tolerance (Load Score) and actual availability outcomes including injury occurrence and training modification events.

This dataset provides the first structured evidence base linking physiological variability-informed load decisions to performance outcomes — and is the primary evidence required for subsequent funding rounds and club sales.

---

## 12B. Go-To-Market Strategy

### 12B.1 Two Parallel Tracks

| Track | Approach |
|---|---|
| B2B track (now) | WSL and Championship clubs. Relationship-based entry. Performance department direct outreach. Pilot collaboration framed as research partnership — club gets the product free in exchange for the data and the reference case. |
| B2C track (month 6) | Consumer app for any female athlete. Works with existing wearables. Acquisition via: WSL club association ('used by professional clubs'), sports science community, female athlete social communities. Ethnic diversity in acquisition strategy from day one. |

### 12B.2 Pilot Programme

| Element | Detail |
|---|---|
| Duration | 4–6 months minimum. One full training block or competitive microcycle period. |
| Scope | Daily athlete wellness input. Coach performance dashboard. Availability tracking. No report export in MVP. |
| Framing with club | Season 1 is a calibration season. We are building the model together. You get the product free. We get the data and reference case. |
| Objectives | Validate load tolerance model reliability. Measure athlete availability trends. Collect qualitative feedback. Calibrate model parameters. |

### 12B.3 Strategic Partnerships

| Contact / Partner | Role |
|---|---|
| AFC Stretford / Manchester Women's Swimming | Early pilot testing and domain feedback |
| Mark Lecock (Manchester City Junior) | Coaching network entry point |
| Chris Smith (Futsal and Football Coach) | Early deployment opportunities |
| English Institute of Sport | Federation-level performance technology procurement — approach for benchmarking and eventual partnership |
| Oura / WHOOP | API partnership agreements — sign before becoming a visible competitive threat |

---

## 13. Team and Roles

**Team priority note [UPDATED]**

The three most critical gaps — technical co-founder, scientific advisor, GDPR specialist — are the first things every investor will ask about.

These gaps must be filled before any serious funding conversation.

EF and Antler are both useful specifically because they help complete founding teams.

### 13.1 Core Founding Team

**Business Co-founder**

- Go-to-market strategy and execution
- Fundraising and investor relations
- Sales development and partnership building
- Primary point of contact for club pilots

**Product Co-founder**

- Product roadmap and feature prioritisation
- User experience feedback integration
- MVP scope definition and iteration
- Athlete and coach interview programme

**Technical Co-founder [TBD — critical hire]**

- Platform architecture design
- Neuroendocrine Engine implementation
- Data infrastructure, pipeline, and scalability
- Wearable API integration (Oura, WHOOP, Garmin)
- Privacy architecture and consent management system
- ML background preferred — the model needs to adapt over time

**Bio-domain Co-founder**

- Development and validation of the neuroendocrine load model
- Integration of neuroscience and female physiology research
- RED-S detection protocol clinical design
- Scientific credibility and research alignment

### 13.2 Advisory Board [TBD — all three critical before MVP]

| Role | Requirement |
|---|---|
| Sports Science Advisor [TBD] | Academic or applied sports scientist specialising in female athlete physiology. Needs to be willing to state publicly that the problem is real and the approach is sound. One credible name eliminates the scientific credibility gap in every investor conversation. |
| GDPR / Data Privacy Specialist [TBD] | UK GDPR specialist with health data and employment law experience. Required to review consent architecture, data breach protocol, and coercive consent risk in club environment before first pilot agreement is signed. |
| Sports Welfare Professional [TBD] | To review RED-S detection protocol and mental health signal protocol before MVP deployment. Could be from English Institute of Sport or a national federation medical team. |

---

## 14. Regulation and Legal

### 14.1 Data Protection and Privacy

The platform processes special category personal data under UK GDPR and the Data Protection Act 2018, including menstrual cycle information, health indicators, and physiological data in an employment context.

- Explicit informed consent mechanisms — direct between Avail and athlete
- Data minimisation and purpose limitation
- Secure data storage and encrypted transmission
- Role-based access control for sensitive information
- Audit logs for all data access events

### 14.2 Coercive Consent — Resolved Architecture [RESOLVED]

Consent from athletes employed by clubs cannot be treated as freely given under UK GDPR if the employment relationship creates pressure to participate. This is not a framing problem — it is a structural legal problem that requires a structural solution. The following architecture resolves it.

**The resolved consent architecture**

1. **DIRECT CONSENT** — consent happens exclusively between Avail and the athlete via the Avail app. The club never presents, initiates, or is party to the consent process. The club is not in the consent chain.

2. **ZERO CONSEQUENCE OPT-OUT** — an athlete who does not consent or who withdraws consent sees a grey 'data unavailable' placeholder on the coach dashboard. The system never surfaces their name as non-compliant, never flags their absence to the club, and never creates a record accessible to the club of their non-participation.

3. **REAL-TIME WITHDRAWAL** — consent can be withdrawn at any time via the athlete app. Withdrawal takes effect on the next data request — there is no delay, no cooling-off period, no notification to the club.

4. **PILOT AGREEMENT CLAUSE** — every pilot agreement with a club contains an explicit clause stating: 'The Club agrees not to require, incentivise, pressure, or imply consequences relating to any athlete's decision to participate in or withdraw from the Avail data sharing programme. Breach of this clause constitutes material breach of this agreement.'

5. **INDEPENDENT CONSENT AUDIT** — annually, Avail reviews consent logs for patterns that suggest coercive pressure (e.g. entire squad opts in simultaneously on day one, zero opt-outs over a season). Anomalous patterns trigger a direct confidential survey to athletes.

**What the pilot agreement must contain**

- Clause 1: Club confirms it will not directly or indirectly pressure athletes to participate
- Clause 2: Club confirms no employment consequence, playing time decision, or contractual matter will be linked to participation
- Clause 3: Club confirms athlete data shared with the club is limited to Load Score, direction, and confidence — no raw health data
- Clause 4: Club confirms it will not attempt to infer cycle phase or health status from Load Score outputs
- Clause 5: Avail retains the right to suspend club access if coercive practice is detected

### 14.3 MHRA Regulatory Language — Resolved Framework [RESOLVED]

The product is classified as a decision-support tool and performance monitoring system — not a regulated medical device. This classification is valid and must be actively maintained through disciplined language use across all team members, in all contexts.

**Permitted language — use these terms in all external communication**

- PRE-SESSION CONTEXT: 'physiological context', 'readiness context', 'pre-session indicator', 'context for a coaching decision'
- THE SCORE: 'Load Score', 'readiness signal', 'load tolerance indicator', 'physiological state indicator'
- THE OUTPUT: 'decision support', 'coaching intelligence', 'pre-session information', 'availability support'
- THE BENEFIT: 'more informed load decisions', 'improved decision context', 'better pre-session information', 'availability stability'

**Prohibited language — never use in any context, sales, marketing, or product**

- INJURY CLAIMS: 'injury prevention', 'injury prediction', 'reduces injury risk', 'injury risk reduction', 'prevents ACL injuries'
- MEDICAL CLAIMS: 'clinical recommendation', 'medical advice', 'diagnoses', 'treats', 'medical efficacy', 'clinically proven'
- PERFORMANCE PREDICTION: 'predicts performance', 'tells you how an athlete will perform', 'performance forecasting'
- CERTAINTY CLAIMS: 'will reduce', 'guarantees', 'ensures availability', 'eliminates overtraining'

The ACL / injury statistics in the problem statement are scientific evidence about the problem — they can be used to describe why the problem exists. They cannot be used to imply the product prevents injuries.

**Onboarding requirement for all team members**

Every team member who speaks externally about the product — including in investor meetings, sales conversations, conferences, and social media — must be briefed on this language framework before their first external conversation.

This is not optional. One sentence using prohibited language in a recorded sales call could trigger MHRA review.

Annual refresh required as the product evolves and new features are added.

### 14.4 Athlete Consent and Ethical Data Use

- Participation in daily data input is voluntary — athletes may withdraw consent at any time
- Sensitive information accessible only to authorised performance staff with athlete consent
- Data used in aggregated anonymised form for model training — never individual identifiable data in any dataset product

### 14.5 Medical Disclaimer

The platform supports training load decision-making and athlete monitoring. It does not provide medical diagnoses, treatment recommendations, or replace professional medical advice from qualified healthcare providers. This disclaimer must appear prominently in both athlete and coach interfaces.

### 14.6 Data Security

- Encrypted data transmission (HTTPS) — all connections
- Secure cloud-based hosting with UK or EU data residency
- Role-based authentication and access control
- Data access logging and anomaly monitoring
- Encrypted storage of all sensitive data at rest
- Annual penetration testing — mandatory before and after each major release
- Cyber insurance — mandatory before any production athlete data is handled

---

## 14B. Welfare Protocols [RESOLVED]

Three specific welfare protocols are required before any pilot deployment. All three are now documented with resolved procedures. Expert clinical and legal review is required to validate the trigger thresholds before live deployment — but the structure, response pathway, and legal framing are confirmed.

### 14B.1 RED-S Detection Protocol [RESOLVED]

Relative Energy Deficiency in Sport affects an estimated 30–45% of elite female athletes and causes suppression of the menstrual cycle, impaired recovery, increased injury risk, and long-term health consequences. The Load Score must not normalise or mask RED-S symptoms. This protocol detects the pattern and routes it appropriately — never to the coach, always to medical.

**Detection trigger — validated against IOC consensus statement 2023**

- Signal 1: Menstrual cycle absent or highly irregular (cycle gap >45 days) for 2+ consecutive cycles
- AND Signal 2: Fatigue score ≥4 on 10+ of the last 14 days
- AND Signal 3: Load Score declining trend over 14+ days not explained by training load increase
- AND Signal 4: Energy availability check (weekly prompt) scoring ≤2 on 3+ consecutive weeks

All four signals must be present simultaneously. Single signals in isolation do not trigger the protocol.

System must have minimum 60 days of athlete data before protocol can activate — prevents false positives in early onboarding.

**Response pathway — tiered and athlete-led**

**Step 1 (trigger day):** Athlete receives in-app message — 'Your energy and recovery patterns have been lower than usual for a while. It might be worth a conversation with your medical team — they can help figure out if anything needs attention.' No diagnosis language. No alarm.

**Step 2 (athlete choice):** Athlete can respond 'I've already spoken to medical', 'I'd like to speak to someone', or 'I'm fine'. Each response logged. If 'I've already spoken to medical' — protocol suspends for 30 days.

**Step 3 (club medic notification — conditional on athlete consent):** If athlete has previously consented to sharing welfare flags with the club medic, a notification is sent to club medic only (not coach, not performance director). Notification content: 'Avail has detected a pattern that may warrant a welfare check-in. Athlete name. No further detail.'

**Step 4:** Load Score confidence reduced to Low. Model enters conservative load bias mode. Coach sees confidence flag without explanation — maintains athlete privacy.

**Step 5:** If no response and pattern continues beyond 14 days — single follow-up prompt to athlete. No further automated action after that.

**What this protocol does NOT do**

- Does not diagnose RED-S or any medical condition
- Does not tell the coach why confidence is low
- Does not contact the club without athlete consent
- Does not prevent the athlete from continuing to use the app normally
- Does not generate any record accessible to the club

### 14B.2 Mental Health Signal Protocol [RESOLVED]

See §6.6 for the full resolved protocol. Summary for cross-reference:

**Summary**

Trigger: mental readiness ≤2 AND sleep ≤2 for 5+ consecutive days with declining Load Score and no illness flag.

Response: in-app prompt to athlete only. Three response options. Signpost to trusted person or club medical staff.

Coach: never notified. Club: never notified. Avail: does not act as clinical intermediary.

Legal framing: wellbeing pattern flag, not mental health monitoring.

### 14B.3 Load Score Liability Protocol [RESOLVED]

The Load Score is physiological context for a professional coaching decision. It is not an instruction. The following architecture makes this legally and practically unambiguous.

**Dashboard framing — mandatory UI requirements**

- Persistent header on coach dashboard: 'Physiological context — use alongside your professional judgement'
- Load Score card label: 'Today's context' not 'Today's recommendation'
- Direction label prefixed with: 'Context suggests:' not 'Recommendation:'
- Override button always visible and always labelled: 'I'm making a different decision' — never 'Override' which implies the system was right
- Footer on every athlete card: 'You retain full professional responsibility for all training decisions'

**Pilot agreement clauses — mandatory in every pilot contract**

- Clause A: 'Avail provides physiological context to support coaching decisions. It does not direct, recommend, or prescribe training activities.'
- Clause B: 'The Club and its coaching staff retain full professional responsibility for all training load decisions made in respect of athletes.'
- Clause C: 'The Load Score is one input among many. Avail makes no representation that following or not following the Load Score context will prevent injury or guarantee any outcome.'
- Clause D: 'The Club agrees to use the override logging function when deviating from Load Score context, to maintain an accurate record of coaching decisions.'

**What happens when Load Score says high and athlete gets injured**

The audit log shows: what the Load Score was, what direction was suggested, whether the coach logged an override, and what the session outcome was.

If the coach followed the Load Score context without override: the pilot agreement clause establishes Avail provided context, coach made the decision.

If the coach overrode the Load Score: the override log documents the independent decision.

In either case: Avail is a decision-support tool. The coach is the decision-maker. This distinction is architecturally enforced through the override mechanism and legally established through the pilot agreement.

Avail carries no clinical liability for training decisions made by qualified coaching professionals.

---

## 15. Open Risks and Unresolved Questions

Risks marked [RESOLVED] have documented solutions in this proposal. Risks marked [ONGOING] require continued monitoring. Risks marked [OPEN] require resolution before the stated milestone.

| Risk / Question | Status | Next Action |
|---|---|---|
| Coach adoption — will coaches act on cycle-contextualised recommendations? | Ongoing | Coach education module in §11.3. Dashboard language fully performance-framed. Engagement tracked separately from outcome correlation. |
| Athlete compliance — will daily logging be sustained beyond week 3? | Ongoing | Athlete-first dashboard design. Prototype test with 10 female athletes before build starts. 80% compliance target in pilot. |
| Commercial framing — cycle management vs availability vs load precision? | Ongoing | Lead with availability and load precision. Cycle language never used in opening sales conversation. Resolved permitted language in §14.3. |
| Over-simplification — does rule-based model reflect real variability? | Ongoing | Conservative thresholds. Prominent confidence indicator. Calibration season framing with pilot clubs. Individual weight vectors from season 2. |
| Hormonal contraception model — edge cases unresolved | Open — before Series A | Sports science advisor to define model behaviour for: post-pill re-establishment, mid-season type change, contraception for condition management. |
| Coercive consent in club employment context | RESOLVED — see §14.2 | Direct consent architecture. Zero-consequence opt-out. Pilot agreement clause. Independent consent audit. Full architecture documented. |
| RED-S blind spot | RESOLVED — see §14B.1 | Four-signal trigger protocol. Tiered response pathway. Athlete-led. Medical routing with consent. Conservative mode activation. Validated against IOC 2023. |
| Load Score legal liability | RESOLVED — see §14B.3 | Dashboard framing requirements. Five pilot agreement clauses. Override logging creates audit trail. Legal position clearly documented. |
| MHRA regulatory language risk | RESOLVED — see §14.3 | Full permitted and prohibited language framework. Team onboarding requirement. Annual refresh process. All external communication covered. |
| Data breach exposure | RESOLVED — see §6.5 | Four-phase incident response procedure. Pre-launch requirements (cyber insurance, pen test, templates). Anomaly detection on audit log. |
| Mental health signal — no protocol | RESOLVED — see §6.6 and §14B.2 | Detection trigger defined. Three-step athlete-only response pathway. Legal framing as wellbeing pattern flag not mental health monitoring. |
| Male coaching staff adoption | Ongoing | Coach education module (§11.3). Performance-only dashboard language. Coach engagement tracked as separate metric from outcome data. |
| Oura competitive threat and API dependency | Open — this week | API partnership agreements with Oura and WHOOP must be signed before Avail becomes visible as a threat. Business co-founder to initiate. |
| B2C / B2B data quality contamination | Open — before consumer launch | Tiered data architecture in §6.4. Consumer graduation protocol defined. Technical co-founder to implement before consumer app launches. |
| No dataset buyer conversations on record | Open — before seed round | Three conversations needed: pharma medical affairs, nutrition brand sports science lead, federation performance director. Business co-founder this month. |
| Technical architecture detail incomplete | Ongoing — before seed round | High-level architecture in §10. Remaining items: cloud provider, detailed model training pipeline, load testing plan, external security review. |

---

## 16. Success Metrics — MVP Stage

### 16.1 Product Adoption

- ≥80% athlete daily check-in compliance across pilot squad
- Coaches accessing dashboard multiple times per week during training cycle
- ≥70% of athletes completing session outcome capture

### 16.2 Product Impact

- Coaches adjusting training load based on Load Score insights — logged via override mechanism
- Observable improvements in athlete availability across microcycles
- Positive qualitative feedback from coaching and performance staff
- Load Score confidence reaches High for ≥60% of squad by end of season

### 16.3 Commercial Validation

- At least one pilot club expressing interest in continued paid deployment
- Interest from additional clubs requesting pilot access
- At least one dataset buyer conversation on record before Series A

---

## 17. Market Size

### 17.1 Three Addressable Markets

| Market | Size and entry |
|---|---|
| Market 1 — Women's performance sport | TAM: £200M+ globally (women's football, rugby, basketball, hockey). SAM: £2.5M UK and European top-tier leagues (150–300 clubs). SOM: £100k–£250k ARR in early deployment phase (8–20 clubs). |
| Market 2 — Female athlete consumer | TAM: £2B+ global female health and fitness wearable market. Digital menstrual health market projected to grow from €1.2B in 2024 to €9.3B by 2030. Clue has 1M paid subscribers on self-report alone — wearable-linked is a step change. |
| Market 3 — Dataset licensing | TAM: undefined and potentially very large. No comparable dataset exists to price against. Structural comparable: GSK–23andMe — $300M for 5M genetic profiles. Three specific buyers: pharma, nutrition, federations. |

### 17.2 Why the Dataset Market Has No Ceiling

The longitudinal female physiological dataset Avail will accumulate does not exist. There is no existing comparable to price it against. The value is determined by what buyers would otherwise pay to access equivalent data — which for pharma companies means clinical trial participant recruitment costs of £2,000–£8,000 per person. At 50,000 athlete profiles that implies a dataset floor value of £100M–£400M in equivalent participant recruitment cost.

This is not a revenue projection. It is a floor valuation argument for the dataset asset — which compounds every month the platform operates.

### 17.3 The Wider Consequence — What This Dataset Could Change [NEW]

The Avail dataset is not just a commercial asset. At sufficient scale and diversity, it becomes a foundational scientific resource with consequences that extend far beyond sport performance. Female physiology has been systematically understudied across medicine for decades — not through malice but through structural assumption. The female body was treated as a variation on the male default, and the data infrastructure to understand it on its own terms was never built.

What Avail builds passively — as a byproduct of helping coaches make better decisions — is the data infrastructure that closes that gap. The consequences are significant:

| Consequence | Why it matters |
|---|---|
| Hormonal disorder research | Conditions including endometriosis, PCOS, and dysmenorrhea affect approximately 1 in 10 women and remain significantly underdiagnosed and undertreated. A longitudinal dataset linking hormonal cycle patterns to physiological and performance outcomes provides the kind of population-level signal that drives earlier diagnosis, better treatment protocols, and ultimately better lives for millions of women. |
| Drug trial design and dosing | The majority of clinical drug trials have historically enrolled predominantly male participants. Female hormonal variability means that drug responses — efficacy, side effects, optimal dosing — can differ significantly across the cycle. A structured female physiological dataset provides the baseline data that makes female-inclusive trial design possible at scale. |
| Closing the gender health gap in medicine | The gender health gap — the documented difference in health outcomes between men and women — is in large part a data problem. Diseases that present differently in women are diagnosed later. Treatments calibrated on male physiology perform suboptimally in female patients. The dataset Avail builds contributes directly to closing this gap by providing the longitudinal female physiological data that medical research has been missing. |
| Contraception and hormonal intervention optimisation | Hormonal contraception is used by over 150 million women globally, yet its effect on athletic performance, recovery, and physiological variability is almost entirely unstudied. A dataset linking contraception type to training response and performance outcomes would inform individualised prescription, reduce side effects for athletes, and generate genuinely novel medical knowledge. |
| Adolescent athlete development | The transition from adolescent to adult female physiology is a critical and poorly understood period for athletic development. The onset of menstruation, hormonal establishment, and the associated physiological changes are almost entirely absent from sports science literature. A dataset that captures this transition longitudinally would reshape how female athletes are developed from youth to elite level. |
| Mental health and hormonal connection | The relationship between hormonal cycle phase and mental health — mood, anxiety, cognitive performance, stress regulation — is documented but poorly quantified at the individual level. A dataset that captures both physiological signals and psychological state across cycles, at scale, across diverse populations, would advance both sports psychology and broader mental health research. |

**The long-term vision**

Avail starts as a coaching tool for women's football. It becomes a consumer app for female athletes. It becomes a wearable company.

But the dataset it accumulates is something larger than any of those products.

It is the first structured, longitudinal, performance-linked record of female physiology in motion across a diverse population — built not in a lab, but in the real world, continuously, at scale.

The sporting application is the entry point. The scientific and medical consequences are the legacy.

Every athlete who logs a check-in, every coach who records an override, every session outcome that gets captured — contributes to a dataset that will inform how female physiology is understood, measured, and treated for decades.

That is what we are building.

---

## 18. Expert Input Required Before MVP [NEW]

Five expert inputs are non-negotiable before the first pilot agreement is signed. Each represents a gap that could cause regulatory, legal, clinical, or reputational harm if not addressed.

| Risk / Question | Status | Next Action |
|---|---|---|
| Sports science advisor | Validate RED-S detection trigger criteria against IOC consensus statement. Define ethnicity data collection and use protocol. Validate scientific claims in all external materials. | [TBD] — hire or attach as advisory board member this month |
| GDPR / data privacy specialist | Review consent architecture. Write data breach incident response procedure. Assess coercive consent risk in club employment context. Review data tiering architecture. | [TBD] — engage before first pilot agreement |
| Regulatory lawyer (MHRA) | Define exact language permitted in sales and marketing materials. Confirm current product classification as decision-support not medical device. Review any injury-related claims. | [TBD] — engage before any commercial conversation |
| Sports welfare professional | Review RED-S detection protocol. Review mental health signal protocol. Validate response procedures against best practice. | [TBD] — could be from EIS or national federation medical team |
| Legal counsel (liability) | Opinion on Load Score liability framing. Draft pilot agreement clauses clarifying coach professional responsibility. Review override mechanism documentation. | [TBD] — engage before first pilot agreement |

---

**Final note**

The strategic opportunity is real. The scientific foundation is solid. The market gap is documented. The technical co-founder is confirmed.

The remaining gaps are legal, clinical, and expert input — not product. The next actions are: engage GDPR specialist, engage regulatory lawyer, attach sports science advisor, get one club running manually, and start the three dataset buyer conversations.

The window to build this is open now. Every month without the dataset is a month someone else could start collecting it.
