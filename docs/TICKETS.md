# TripCanvas Ticket Backlog

---

## EPIC 0 — Discovery, Scope, and Architecture

### TC-001 — Define MVP scope and non-goals

Owner: You
Goal:
Create a concise project scope doc for the first release.

Acceptance criteria:

- list of in-scope features
- list of explicitly out-of-scope features
- success criteria for MVP
- assumptions and constraints documented
- reviewed with PM/team

Testing:

- none

Notes:
This is required before deep implementation.

---

### TC-002 — Clarify product requirements with stakeholders

Owner: You
Goal:
Gather missing details from PM/team.

Acceptance criteria:

- documented answers for:
  - target user
  - core journey
  - design availability
  - AI model constraints
  - hosting constraints
  - persistence expectations
  - booking/paywall expectations

- unanswered questions marked with engineering assumptions

Testing:

- none

---

### TC-003 — Choose initial tech stack and justify tradeoffs

Owner: You
Goal:
Finalize tech/tool decisions for Phase 1.

Acceptance criteria:

- documented decisions for:
  - frontend framework
  - styling approach
  - AI provider
  - persistence approach
  - testing stack
  - deployment platform

- rationale and tradeoffs captured
- “why not X” notes for major alternatives

Testing:

- none

---

### TC-004 — Define domain model and API contract

Owner: You
Goal:
Create the core data shape before implementation.

Acceptance criteria:

- documented types/schemas for:
  - trip request
  - trip assumptions
  - itinerary day
  - recommendation item
  - trip plan response
  - refinement request

- versioned response shape agreed upon
- validation strategy defined

Testing:

- basic schema tests planned

Dependencies:

- TC-003

---

### TC-005 — Define app routes and major components

Owner: You + Junior
Goal:
Map pages and reusable UI structure.

Acceptance criteria:

- route inventory defined
- component inventory defined
- shared layout rules defined
- page responsibilities documented

Dependencies:

- TC-004

---

## EPIC 1 — Project Setup and Engineering Standards

### TC-010 — Initialize repo and base project scaffolding

Owner: You
Goal:
Set up codebase for fast, stable work.

Acceptance criteria:

- project scaffolded
- TypeScript enabled
- linting configured
- formatting configured
- folder structure created
- env example file created
- README with setup instructions added

Testing:

- project builds locally
- lint/typecheck pass

---

### TC-011 — Establish folder architecture and conventions

Owner: You
Goal:
Prevent random structure during sprint.

Acceptance criteria:

- folders defined for:
  - app/routes
  - components
  - features
  - lib
  - services
  - types/schemas
  - tests

- naming rules documented
- feature ownership boundaries documented

Testing:

- none

---

### TC-012 — Set up CI pipeline

Owner: You
Goal:
Ensure pull requests validate code quality automatically.

Acceptance criteria:

- CI runs on PR
- lint runs
- typecheck runs
- tests run
- build validation runs

Dependencies:

- TC-010

---

### TC-013 — Set up testing libraries and test harness

Owner: You
Goal:
Enable testing from the start.

Acceptance criteria:

- unit/component test framework installed
- E2E framework installed
- sample tests added
- test scripts documented

Dependencies:

- TC-010

---

## EPIC 2 — UI Foundation and Design System

### TC-020 — Create app shell and layout system

Owner: Junior
Goal:
Build shared layout primitives for the app.

Acceptance criteria:

- root layout exists
- max-width/container system exists
- spacing system consistent
- header/footer structure defined
- mobile responsive baseline present

Testing:

- responsive checks
- layout smoke test

Dependencies:

- TC-010

---

### TC-021 — Build reusable UI primitives

Owner: Junior
Goal:
Establish shared components for rapid UI assembly.

Acceptance criteria:

- button
- input
- textarea
- select
- card
- badge/chip
- skeleton loader
- empty state
- alert/error state
- modal/drawer if needed

Testing:

- render tests for key primitives
- accessibility basics for controls

Dependencies:

- TC-020

---

### TC-022 — Define design tokens and theme decisions

Owner: You
Goal:
Ensure UI consistency.

Acceptance criteria:

- typography scale defined
- spacing scale defined
- color usage rules defined
- semantic token naming established
- dark mode decision explicitly documented

Testing:

- none

---

## EPIC 3 — Landing Page and Prompt Input

### TC-030 — Build landing page hero and product messaging

Owner: Junior
Goal:
Create initial entry page for TripCanvas.

Acceptance criteria:

- hero section exists
- value proposition visible
- example prompts present
- CTA to start planning
- trust/disclaimer copy present
- responsive layout

Testing:

- rendering tests
- visual sanity across breakpoints

---

### TC-031 — Build prompt input experience

Owner: Junior
Goal:
Allow user to enter natural-language request.

Acceptance criteria:

- textarea input
- helper prompt examples
- validation for empty state
- submit button states
- loading state hook points
- accessible labels

Testing:

- validation tests
- interaction tests

Dependencies:

- TC-021

---

### TC-032 — Add optional structured helper inputs

Owner: Junior
Goal:
Support partially structured trip entry.

Acceptance criteria:

- optional fields for:
  - destination
  - duration
  - month/date
  - budget
  - traveler type
  - interests

- values merge into request payload
- optional fields do not block freeform usage

Testing:

- form interaction tests

Dependencies:

- TC-031

---

## EPIC 4 — AI Generation Engine

### TC-040 — Select LLM provider and output strategy

Owner: You
Goal:
Finalize AI generation approach.

Acceptance criteria:

- chosen provider documented
- structured JSON output strategy documented
- prompt orchestration approach documented
- fallback strategy documented
- cost considerations documented

Testing:

- none

---

### TC-041 — Implement AI prompt builder

Owner: You
Goal:
Create prompt construction logic for trip generation.

Acceptance criteria:

- user input normalized
- prompt builder supports natural-language + structured fields
- generation prompt defines response schema
- output instructions include confidence/fallback guidance

Testing:

- unit tests for prompt assembly
- snapshot tests if helpful

Dependencies:

- TC-040

---

### TC-042 — Implement trip generation API route

Owner: You
Goal:
Expose server-side generation endpoint.

Acceptance criteria:

- endpoint accepts trip request
- calls AI provider
- returns typed structured response
- handles provider errors gracefully
- includes traceable error states

Testing:

- API integration tests
- invalid payload tests
- provider failure tests

Dependencies:

- TC-041

---

### TC-043 — Add schema validation and normalization layer

Owner: You
Goal:
Prevent malformed AI output from breaking UI.

Acceptance criteria:

- response parsed against schema
- missing fields handled safely
- optional fallback content injected when needed
- malformed output returns recoverable error or degraded result

Testing:

- schema validation tests
- malformed response tests

Dependencies:

- TC-042

---

## EPIC 5 — Trip Results Experience

### TC-050 — Build trip results page route and data wiring

Owner: You
Goal:
Connect generated trip data to route/UI.

Acceptance criteria:

- route renders generated trip plan
- supports loading/error/empty states
- handles direct navigation safety
- supports basic trip id state strategy

Testing:

- route render tests
- failure state tests

Dependencies:

- TC-042, TC-043

---

### TC-051 — Build trip summary section

Owner: Junior
Goal:
Display top-level trip summary clearly.

Acceptance criteria:

- title
- destination
- duration
- budget label
- overall summary text
- clean responsive layout

Testing:

- component render tests

Dependencies:

- TC-050

---

### TC-052 — Build assumptions and confidence section

Owner: Junior
Goal:
Surface inferred assumptions and confidence/fallback info.

Acceptance criteria:

- assumptions list shown
- confidence notes shown
- fallback/uncertainty copy styled clearly
- handles missing data gracefully

Testing:

- component tests for presence/absence cases

Dependencies:

- TC-050

---

### TC-053 — Build itinerary section and day cards

Owner: Junior
Goal:
Display day-by-day trip structure.

Acceptance criteria:

- itinerary day cards
- activity list
- food/area suggestions
- per-day metadata if present
- mobile-friendly layout

Testing:

- component tests
- empty day fallback tests

Dependencies:

- TC-050

---

### TC-054 — Build recommendation cards for hotel and flights

Owner: Junior
Goal:
Render recommendation sections in productized card form.

Acceptance criteria:

- hotel cards render from data
- flight cards render from data
- placeholder state supported
- recommendation reason shown
- CTA/link handling ready for future use

Testing:

- component tests

Dependencies:

- TC-050

---

## EPIC 6 — Refinement Experience

### TC-060 — Design refinement request model

Owner: You
Goal:
Define how refinements are represented and sent.

Acceptance criteria:

- refinement request schema defined
- refinement history strategy decided
- re-generation scope defined
- prior trip context usage documented

Testing:

- schema tests

Dependencies:

- TC-004

---

### TC-061 — Build quick refinement action UI

Owner: Junior
Goal:
Create entry points for common refinements.

Acceptance criteria:

- quick actions visible:
  - cheaper
  - fewer activities
  - more family-friendly
  - closer to city center

- interaction hooks connected
- disabled/loading states handled

Testing:

- click interaction tests

Dependencies:

- TC-050

---

### TC-062 — Implement refinement API flow

Owner: You
Goal:
Allow user to refine existing plan.

Acceptance criteria:

- current trip context sent with refinement intent
- updated plan returned
- loading state supported
- errors handled safely

Testing:

- API tests
- invalid refinement tests

Dependencies:

- TC-060, TC-042

---

### TC-063 — Add freeform refinement input

Owner: Junior
Goal:
Allow custom trip changes beyond preset actions.

Acceptance criteria:

- text input for refinement
- submission triggers same refinement flow
- loading and error states included

Testing:

- form interaction tests

Dependencies:

- TC-062

---

## EPIC 7 — Save, Retrieve, and Manage Trips

### TC-070 — Decide persistence strategy for Phase 1 and Phase 2

Owner: You
Goal:
Choose short-term and long-term trip storage path.

Acceptance criteria:

- Phase 1 persistence approach documented
- Phase 2 DB approach documented
- migration approach considered
- save/load/delete flows outlined

Testing:

- none

---

### TC-071 — Implement save trip capability

Owner: You
Goal:
Allow a user to save generated plans.

Acceptance criteria:

- save action exists
- trip can be retrieved after save
- save feedback shown
- data shape persisted safely

Testing:

- save/retrieve tests

Dependencies:

- TC-070, TC-050

---

### TC-072 — Build saved trips dashboard/list view

Owner: Junior
Goal:
Provide overview of previously saved trips.

Acceptance criteria:

- list of saved trips
- metadata preview
- click through to trip detail
- empty state

Testing:

- list rendering tests
- empty state tests

Dependencies:

- TC-071

---

### TC-073 — Build editable assumptions UI

Owner: Junior
Goal:
Allow user to edit core trip assumptions.

Acceptance criteria:

- assumptions editable
- save/update trigger present
- values can be used in future regeneration flow

Testing:

- form interaction tests

Dependencies:

- TC-071

---

### TC-074 — Add delete/archive/duplicate trip actions

Owner: Junior
Goal:
Support basic trip management.

Acceptance criteria:

- delete action
- archive or soft-delete decision made
- duplicate action
- confirmation flow where needed

Testing:

- interaction tests

Dependencies:

- TC-072

---

## EPIC 8 — Authentication and User Accounts

### TC-080 — Decide auth approach

Owner: You
Goal:
Choose auth path based on phase and constraints.

Acceptance criteria:

- guest mode policy defined
- provider choice documented
- protected route strategy documented
- session management basics decided

Testing:

- none

---

### TC-081 — Implement authentication flow

Owner: You
Goal:
Add user sign-in capability.

Acceptance criteria:

- sign in flow works
- session persists
- protected saved-trip routes handled
- logged-out UX handled

Testing:

- auth flow tests
- route protection tests

Dependencies:

- TC-080

---

### TC-082 — Build profile/preferences model

Owner: You
Goal:
Support reusable trip preferences.

Acceptance criteria:

- user profile fields defined
- profile retrieval/update flow designed
- trip generation can optionally consume preferences

Testing:

- schema and API tests

Dependencies:

- TC-081

---

### TC-083 — Build profile/preferences UI

Owner: Junior
Goal:
Let user manage default travel preferences.

Acceptance criteria:

- edit profile/preferences form
- saved confirmation
- preferences usable by generation flow

Testing:

- form tests

Dependencies:

- TC-082

---

## EPIC 9 — Real Travel Data Integrations

### TC-090 — Research hotel data integration options

Owner: You
Goal:
Evaluate best path for hotel recommendations.

Acceptance criteria:

- at least 2–3 provider options compared
- cost and complexity considered
- mock-to-real migration plan documented
- chosen path recommended

Testing:

- none

---

### TC-091 — Implement hotel recommendation service

Owner: You
Goal:
Replace mock hotel cards with service-driven data.

Acceptance criteria:

- service abstraction exists
- hotel data normalized to app schema
- graceful fallback to mock or empty state supported

Testing:

- service tests
- normalization tests

Dependencies:

- TC-090

---

### TC-092 — Research flight data integration options

Owner: You
Goal:
Evaluate flight API options.

Acceptance criteria:

- provider comparison documented
- pricing/cost/rate limit considerations documented
- chosen path recommended

Testing:

- none

---

### TC-093 — Implement flight recommendation service

Owner: You
Goal:
Replace mock flight cards with service-driven data.

Acceptance criteria:

- service abstraction exists
- normalized flight schema returned
- fallback supported

Testing:

- service tests
- normalization tests

Dependencies:

- TC-092

---

### TC-094 — Add booking handoff UX

Owner: Junior
Goal:
Support outbound provider CTA.

Acceptance criteria:

- recommendation cards support outbound booking action
- click tracking hook available
- disclosures present if needed

Testing:

- interaction tests

Dependencies:

- TC-091, TC-093

---

## EPIC 10 — Monetization / Payments

### TC-100 — Define monetization model

Owner: You + PM
Goal:
Decide whether and how the product should charge users.

Acceptance criteria:

- pricing strategy documented
- free vs paid features defined
- MVP decision captured

Testing:

- none

---

### TC-101 — Define entitlements / paywall rules

Owner: You
Goal:
Model who gets access to which features.

Acceptance criteria:

- plan tiers defined
- entitlement model defined
- usage limit strategy documented

Testing:

- rule tests planned

Dependencies:

- TC-100

---

### TC-102 — Implement payment integration

Owner: You
Goal:
Add ability to collect payment if required.

Acceptance criteria:

- checkout/session flow works
- user subscription/payment state stored
- failed payment handling defined

Testing:

- payment flow test coverage
- webhook tests if applicable

Dependencies:

- TC-101

---

### TC-103 — Build paywall and upgrade UX

Owner: Junior
Goal:
Show clear upgrade pathways.

Acceptance criteria:

- upgrade page/modal exists
- gated feature messaging exists
- upgrade CTA connected

Testing:

- UI tests
- gated flow tests

Dependencies:

- TC-102

---

## EPIC 11 — Sharing, Export, and Presentation

### TC-110 — Implement shareable trip link strategy

Owner: You
Goal:
Allow saved trips to be shared externally.

Acceptance criteria:

- share link behavior defined
- public/private decision documented
- shared trip route implemented

Testing:

- route accessibility tests
- permission tests if needed

Dependencies:

- TC-071

---

### TC-111 — Build share interaction UI

Owner: Junior
Goal:
Provide share actions to users.

Acceptance criteria:

- copy link
- share CTA
- confirmation feedback

Testing:

- interaction tests

Dependencies:

- TC-110

---

### TC-112 — Implement printable/PDF export

Owner: You or Junior depending on scope
Goal:
Allow trip export outside the app.

Acceptance criteria:

- print-friendly view or PDF export exists
- itinerary exports cleanly
- key sections included

Testing:

- export smoke tests

Dependencies:

- TC-050

---

## EPIC 12 — Analytics, Monitoring, and Reliability

### TC-120 — Define analytics event taxonomy

Owner: You
Goal:
Create event tracking plan before random analytics calls appear.

Acceptance criteria:

- event list documented
- payload schema documented
- event naming conventions defined

Testing:

- none

---

### TC-121 — Implement product analytics tracking

Owner: You
Goal:
Track key user actions.

Acceptance criteria:

- events tracked for:
  - prompt submit
  - trip generated
  - refinement clicked
  - save clicked
  - share clicked
  - recommendation CTA clicked
  - errors surfaced

- tracking abstraction exists

Testing:

- event firing tests where practical

Dependencies:

- TC-120

---

### TC-122 — Implement error monitoring/logging

Owner: You
Goal:
Capture runtime and API failures.

Acceptance criteria:

- frontend errors captured
- API failures logged
- AI generation failures logged
- environment-sensitive logging behavior defined

Testing:

- error pathway smoke tests

Dependencies:

- TC-042

---

### TC-123 — Add retry and degraded-mode UX

Owner: Junior + You
Goal:
Improve resilience when generation fails.

Acceptance criteria:

- retry action available
- degraded fallback copy exists
- partial result handling exists where possible

Testing:

- failure case tests

Dependencies:

- TC-042, TC-043

---

## EPIC 13 — Accessibility, Performance, and Polish

### TC-130 — Accessibility audit and remediation pass

Owner: Junior
Goal:
Bring key flows to a respectable accessibility baseline.

Acceptance criteria:

- label coverage
- semantic headings
- focus states
- keyboard interaction
- contrast issues addressed
- basic screen-reader support

Testing:

- accessibility checks
- keyboard smoke tests

---

### TC-131 — Performance pass on key screens

Owner: You
Goal:
Improve responsiveness and frontend performance.

Acceptance criteria:

- heavy render paths reviewed
- unnecessary rerenders reduced
- loading states optimized
- large bundle risks identified

Testing:

- performance sanity checks

---

### TC-132 — Demo polish pass

Owner: You + Junior
Goal:
Improve presentation quality before team demo.

Acceptance criteria:

- visual consistency improved
- loading copy polished
- edge states covered
- seeded sample trips available
- no broken states in main demo path

Testing:

- manual demo checklist executed

---
