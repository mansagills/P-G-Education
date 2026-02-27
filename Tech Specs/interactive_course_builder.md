# JusticeCourse Studio  
Interactive History Course Builder Platform  

Author: Mansa Gills  
Initial Course: Montgomery Bus Boycott Interactive Experience  
Source Materials Referenced:  
- Montgomery Bus Boycott Slide Deck (R-CatchtheFire-MontgomeryBusBoycott.pdf)  
- Bus Boycott Learning Objectives  
- Bus Boycott Learning Activities  

---

# 1. Product Vision

JusticeCourse Studio is a web-based interactive course builder that allows educators to:

- Upload PDFs, slide decks, screenshots, video, audio
- Automatically structure content into modules
- Convert static history content into interactive learning experiences
- Add simulations, timelines, primary source tools, debates, and assessments
- Export interactive experiences for web or LMS (SCORM-ready)

The first implementation will convert the Montgomery Bus Boycott curriculum into an immersive interactive course.

---

# 2. Target Users

## Primary User
- History educator
- Curriculum developer
- Education consultant

## Secondary User
- K-12 teachers
- University instructors
- Students consuming the interactive course

---

# 3. Core Problem

Existing curriculum materials (PDFs, slides) are:
- Static
- Non-interactive
- Difficult to reuse
- Not LMS-native
- Not immersive

We need a system that enables:

Upload → Structure → Enhance → Publish

---

# 4. MVP Scope

## A. Asset Upload System

Supported Upload Types:
- PDF
- PowerPoint
- Word
- Markdown
- Images (JPG/PNG)
- Video (MP4)
- Audio (MP3/WAV)
- Screenshots
- YouTube/Vimeo links

System Capabilities:
- Extract headings
- Detect dates
- Identify key figures
- Suggest modules
- Suggest interactive activities

---

## B. Course Builder Interface

Course Structure:
Course  
→ Modules  
→ Lessons  
→ Activities  
→ Assessments  

Drag-and-Drop Builder Features:
- Timeline component
- Interactive map
- Primary source viewer
- Debate module
- Role-play simulation
- Carpool logistics simulation
- Reflection journal
- Quiz builder
- Oral history submission portal

---

## C. Auto-Interactive Generator Logic

If uploaded content contains:
- Date ranges → Suggest Timeline
- Primary source document → Suggest Annotation Tool
- Legal case → Suggest Mock Trial
- Logistics discussion → Suggest Simulation
- Poem or speech → Suggest Dramatic Reading Activity

---

# 5. Interactive Tools (MVP Components)

1. Timeline Builder
2. Interactive Map Builder
3. Primary Source Annotation Viewer
4. Debate Builder
5. Role-Play Simulation Builder
6. Logistics Simulation Engine
7. Reflection Journal System
8. Assessment Generator
9. Oral History Upload Portal
10. Export Engine (Web + SCORM-ready)

---

# 6. Technical Architecture

## Frontend
- Next.js (App Router)
- React
- Tailwind CSS
- Drag-and-drop library (DndKit)

## Backend
- Node / Express
- Supabase (Postgres + Storage)
- REST API layer

## AI Layer (Codex-Orchestrated Skills)
- Asset Structurer
- Timeline Generator
- Primary Source Analyzer
- Activity Generator
- Simulation Generator
- Assessment Builder
- Video Script Generator

---

# 7. Codex Skill Modules

Each Skill must:
- Accept structured input
- Return JSON
- Be modular
- Be swappable with external AI APIs later

Skill Files:

/ai-skills/assetStructurer.ts  
/ai-skills/timelineGenerator.ts  
/ai-skills/primarySourceAnalyzer.ts  
/ai-skills/activityGenerator.ts  
/ai-skills/simulationGenerator.ts  
/ai-skills/assessmentBuilder.ts  
/ai-skills/videoScriptGenerator.ts  

---

# 8. Database Schema (High-Level)

Tables:

Users  
Courses  
Modules  
Lessons  
Activities  
Assets  
Timelines  
Maps  
Simulations  
Assessments  
Submissions  

---

# 9. User Flow

1. Create course
2. Upload Montgomery Bus Boycott PDF
3. System parses content
4. Suggests module breakdown
5. User approves
6. Adds interactive elements
7. Publishes course

---

# 10. Phase 2 Enhancements

- AI-generated visuals
- Auto narration
- Branching story modules
- Student analytics
- LMS integrations (Canvas, Blackboard, Google Classroom)
- White-label institutional deployments

---

# 11. Long-Term Vision

JusticeCourse Studio becomes:

- A licensing platform for interactive history curriculum
- A consulting platform for education institutions
- A reusable tool for additional Civil Rights courses
- The foundation of a scalable education SaaS

---

# 12. Success Metrics

- <10 minutes to convert PDF into interactive outline
- High educator usability score
- Increased student engagement time
- SCORM export compatibility
- Modular course reusability