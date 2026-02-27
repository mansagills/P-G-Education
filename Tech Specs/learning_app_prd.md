# JusticeCourse Learning App  
DataCamp-Style Interactive Course Platform  

Author: Mansa Gills  
Primary Content Source: Montgomery Bus Boycott Course  
Referenced Curriculum Files:
- Montgomery Bus Boycott Slide Deck (R-CatchtheFire-MontgomeryBusBoycott.pdf)
- Bus Boycott Learning Objectives
- Bus Boycott Learning Activities

---

# 1. Product Vision

JusticeCourse Learning App is a student-facing interactive learning platform that allows users to:

- Log in securely
- Enroll in history courses
- Complete interactive lessons
- Track progress
- Earn Experience Points (XP)
- Unlock achievements
- Complete simulations
- Submit reflections
- View learning analytics

The experience should feel similar to DataCamp, but focused on immersive history education.

---

# 2. Target Users

Primary:
- Middle school students
- High school students
- College students

Secondary:
- Teachers assigning coursework
- Institutions licensing curriculum

---

# 3. Core Problem

Traditional history courses are:
- Passive
- Text-heavy
- Lecture-driven
- Not progress-tracked
- Not gamified

JusticeCourse Learning App transforms:

Static Curriculum → Interactive Experience → Measurable Progress

---

# 4. Core Platform Features (MVP)

## A. Authentication System

- Email/password login
- OAuth (Google optional in Phase 2)
- Role types:
  - Student
  - Instructor
  - Admin

---

## B. Student Dashboard

Upon login, students see:

- Enrolled courses
- XP progress bar
- Current lesson progress
- Achievements earned
- Recommended next lesson

Dashboard Components:
- Total XP
- Streak counter
- Course completion percentage
- Achievement badges

---

## C. Course Player Interface

Course Structure:

Course  
→ Module  
→ Lesson  
→ Interactive Activity  

Course Player Layout:
Left Sidebar:
- Module navigation
- Lesson checklist

Main Panel:
- Interactive content
- Timeline
- Video
- Simulation
- Primary source viewer
- Reflection entry

Bottom:
- Continue button
- XP earned display

---

## D. XP & Gamification System

Students earn XP for:

- Completing lessons
- Finishing simulations
- Submitting reflections
- Completing assessments
- Participation in discussions

XP Model:

- Lesson completion: 50 XP
- Activity completion: 25 XP
- Simulation success: 75 XP
- Assessment pass: 100 XP
- Reflection submission: 30 XP

Leveling System:

Level 1: 0 XP  
Level 2: 500 XP  
Level 3: 1000 XP  
Level 4: 2000 XP  
Level 5: 3500 XP  

---

## E. Interactive Components

Pulled from Montgomery Bus Boycott content:

1. Interactive Timeline
   - December 1, 1955 (Rosa Parks Arrest)
   - December 5, 1955 (Boycott begins)
   - February 24, 1956 (Bi-Racial Commission)
   - December 21, 1956 (Boycott ends)

2. Primary Source Viewer
   - WPC Leaflet
   - Arrest Report
   - Langston Hughes poem

3. Carpool Simulation Engine
   - Assign student role
   - Manage limited resources
   - Sustain boycott

4. Debate Engine
   - Claudette Colvin vs Rosa Parks historical framing

5. Mock Trial Simulator
   - Legal challenge to segregation

6. Oral History Submission Portal

All interactive content originates from the curriculum materials:
- Slide Deck
- Learning Activities
- Extended Activities

---

# 5. Progress Tracking

Track per user:

- Course completion %
- Module completion %
- Lesson completion %
- XP earned
- Simulation performance score
- Reflection submissions
- Assessment score history

Progress should auto-save.

---

# 6. Achievement System

Badges:

- “Grassroots Organizer”
- “Legal Scholar”
- “Primary Source Analyst”
- “Community Strategist”
- “Civil Rights Historian”

Badges are unlocked when:

- Completing simulations
- Completing debates
- Passing assessments
- Completing full course

---

# 7. Instructor Panel (MVP Lite)

Instructor can:

- View enrolled students
- See progress dashboard
- View XP totals
- Review reflection submissions
- Download reports

---

# 8. Technical Architecture

Frontend:
- Next.js
- Tailwind CSS
- React
- Component-based interactive modules

Backend:
- Supabase (Postgres + Auth + Storage)
- REST API

Database Tables:

Users  
Roles  
Courses  
Enrollments  
Modules  
Lessons  
Activities  
XP_Transactions  
Achievements  
Assessments  
Submissions  
SimulationResults  

---

# 9. API Design

Endpoints:

POST /auth/signup  
POST /auth/login  
GET /courses  
GET /courses/:id  
POST /enroll  
POST /completeLesson  
POST /submitReflection  
POST /submitAssessment  
GET /progress  
GET /achievements  

---

# 10. UX Flow

Student Flow:

1. Sign up
2. Log in
3. Enroll in Montgomery Bus Boycott
4. Begin Module 1
5. Complete activities
6. Earn XP
7. Unlock badge
8. Finish course
9. Download completion certificate

---

# 11. Phase 2 Enhancements

- Streak tracking
- Leaderboards (optional)
- AI tutor assistant
- Adaptive difficulty
- Branching history scenarios
- Institutional analytics dashboard
- White-label deployments

---

# 12. Long-Term Vision

JusticeCourse Learning App becomes:

- A subscription-based interactive history platform
- A licensing tool for institutions
- A scalable civil rights education SaaS
- The student-facing engine for JusticeCourse Studio

---

# 13. Success Metrics

- Course completion rate
- XP engagement rate
- Student time-on-platform
- Instructor adoption rate
- Institution licensing conversions