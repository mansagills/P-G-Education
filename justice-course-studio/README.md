# JusticeCourse Studio (Builder App)

JusticeCourse Studio is the internal course-authoring and publishing tool.

## Purpose
- Build courses, modules, lessons, and interactive activity structures.
- Upload source assets.
- Generate timeline/source/module scaffolds.
- Publish courses to the external learner platform via shared Supabase data.

## Routes
- `/dashboard`
- `/assets`
- `/builder`
- `/timeline`
- `/sources`
- `/auth/sign-in`

## Environment
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Run
```bash
npm install
npm run dev
```
