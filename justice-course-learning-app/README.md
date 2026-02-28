# JusticeCourse Learning App (External Learner Platform)

Student/instructor-facing platform for taking published JusticeCourse courses.

## Purpose
- Course catalog and enrollment
- Interactive course player
- Progress autosave
- XP + achievements
- Instructor analytics (owned courses)

## Routes
- `/`
- `/auth/sign-in`
- `/auth/sign-up`
- `/courses`
- `/courses/[courseId]`
- `/dashboard`
- `/learn/[courseId]`
- `/profile`
- `/instructor`
- `/instructor/courses/[courseId]`

## Environment
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Database
Uses shared Supabase schema and published content from JusticeCourse Studio.
- Run `database/schema.sql`
- Run `database/seed.sql`

## Run
```bash
npm install
npm run dev
```
