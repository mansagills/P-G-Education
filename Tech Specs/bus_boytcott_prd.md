Excellent — this is exactly how you professionalize the build process.

Below is your **UPDATED PRD** and **UPDATED CODEX PROMPT** with:

* Mandatory testing after each phase
* Pull request review + bug fixing
* Required progress markdown updates
* Controlled phase gating before proceeding

Grounded in your source deck 
Aligned to objectives 
Aligned to learning activities 

---

# 📘 UPDATED PRODUCT REQUIREMENTS DOCUMENT (PRD)

# Project Title

Montgomery Bus Boycott: Interdisciplinary Interactive High School Course

---

# 1. PRODUCT OVERVIEW

This course will serve as the flagship course built inside the Interactive Course Builder App.

It is a 9-week interdisciplinary high school course based on:

* Catch the Fire source material 
* Learning objectives 
* Interactive activity framework 

The course must be built in **9 controlled development phases**.

Each week = one phase.
No phase may begin until testing and review is complete for the prior phase.

---

# 2. TARGET AUDIENCE

* Grades 9–12
* U.S. History
* African American Studies
* Civics/Government
* ELA interdisciplinary
* Social Justice electives

---

# 3. LEARNING MODEL

* Inquiry-Based Learning
* Project-Based Learning
* Experiential Learning Cycle
* Interdisciplinary integration (History, Law, Civics, ELA, Media Studies)

---

# 4. TECHNICAL REQUIREMENTS

Platform must:

* Be web-based
* Be SCORM exportable
* Support branching logic
* Support AI text feedback
* Include rubric scoring
* Include teacher dashboard
* Support decision simulations

Must NOT include:

* Audio recording tools
* Podcast builder tools
* Heavy media upload dependencies

---

# 5. DEVELOPMENT PROCESS REQUIREMENTS (NEW)

Each phase must include:

### 1️⃣ Build

* Implement phase features
* Create modular components
* Ensure code documentation

### 2️⃣ Testing

* Run automated unit tests
* Run UI functional tests
* Test branching logic paths
* Test scoring engine
* Validate data persistence

### 3️⃣ Pull Request Review

* Create PR
* Review for:

  * Bugs
  * Broken logic
  * UI inconsistencies
  * Edge case failures
* Fix all identified issues

### 4️⃣ Update Progress Markdown File

After each phase, update:

`/docs/progress.md`

Must include:

* Phase name
* Features completed
* Tests run
* Bugs fixed
* Remaining risks
* Performance notes
* Teacher dashboard status
* SCORM export validation status

### 5️⃣ Approval Gate

Only after:

* Tests pass
* PR merged
* progress.md updated
* No critical bugs remain

May the next phase begin.

---

# 6. COURSE STRUCTURE (PHASED BUILD)

---

## 🔹 PHASE 1 — Historical Context & Timeline

Interactive timeline tool
Reflection scoring engine

Testing Focus:

* Timeline ordering accuracy
* Save/restore session
* Reflection submission storage

---

## 🔹 PHASE 2 — AI Reenactment Courtroom

Branching courtroom simulation
Majority opinion writing tool

Testing Focus:

* All decision branches reachable
* Vote aggregation accuracy
* Opinion submission storage
* No broken media references

---

## 🔹 PHASE 3 — Strategy Lab

Decision-tree organizing simulation

Testing Focus:

* Turnout outcome logic
* Branch weighting accuracy
* Reflection scoring

---

## 🔹 PHASE 4 — Carpool Logistics Simulator

Resource allocation engine

Testing Focus:

* Resource limits enforced
* City resistance triggers correctly
* Scoring feedback logic

---

## 🔹 PHASE 5 — Speech Annotation Tool

AI rhetorical analysis

Testing Focus:

* Highlight persistence
* Feedback accuracy
* Rubric scoring consistency

---

## 🔹 PHASE 6 — Protest Messaging Studio

Leaflet analyzer
Message builder
Poster canvas

Testing Focus:

* Persuasion scoring logic
* Poster export rendering
* Text save functionality

---

## 🔹 PHASE 7 — Civil Rights Expansion Map

Interactive geographic map

Testing Focus:

* Node linking accuracy
* Map navigation
* Historical annotation rendering

---

## 🔹 PHASE 8 — Digital Memorial Builder

Memorial design tool

Testing Focus:

* Text engraving save
* Design rendering
* Justification submission storage

---

## 🔹 PHASE 9 — Capstone Builder

Strategic resistance blueprint generator

Testing Focus:

* Rubric integration
* Multi-section submission save
* Teacher grading workflow

---

# 7. DOCUMENTATION REQUIREMENTS

Repository must include:

* `/docs/progress.md`
* `/docs/architecture.md`
* `/docs/testing-checklist.md`
* `/docs/phase-reports/`

Each phase must generate:

* Phase summary report
* Bug log summary
* Performance notes

---

# 8. SUCCESS CRITERIA

* All phases pass automated tests
* No critical UI blockers
* Teacher dashboard functional
* SCORM export validated
* Phase documentation complete

---



