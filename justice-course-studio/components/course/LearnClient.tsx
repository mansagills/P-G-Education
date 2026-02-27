'use client';

import { useMemo, useState } from 'react';
import { ActivityRendererList } from '@/components/activities/ActivityRenderer';
import { CourseSidebar } from '@/components/layout/CourseSidebar';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { XPToast } from '@/components/ui/XPToast';
import { getNextIncompleteLessonId } from '@/lib/progress/nextLesson';

interface LearnClientProps {
  course: {
    id: string;
    slug: string;
    title: string;
    modules: Array<{
      id: string;
      title: string;
      lessons: Array<{
        id: string;
        title: string;
        objective: string;
        activities: Array<{
          id: string;
          lesson_id: string;
          type: 'reading' | 'video' | 'timeline' | 'primary_source' | 'reflection' | 'quiz' | 'simulation_carpool';
          title: string;
          position: number;
          payload: Record<string, unknown>;
        }>;
      }>;
    }>;
  };
  completedLessonIds: string[];
  activeLessonId: string;
}

export function LearnClient({ course, completedLessonIds, activeLessonId }: LearnClientProps) {
  const [currentLessonId, setCurrentLessonId] = useState(activeLessonId);
  const [localCompleted, setLocalCompleted] = useState(completedLessonIds);
  const [lastXp, setLastXp] = useState({ xpAwarded: 0, unlockedAchievements: [] as string[] });

  const lessons = useMemo(() => course.modules.flatMap((module) => module.lessons), [course.modules]);
  const currentLesson = lessons.find((lesson) => lesson.id === currentLessonId) ?? lessons[0];
  const progressPercent = lessons.length ? Math.round((localCompleted.length / lessons.length) * 100) : 0;

  async function saveAndContinue() {
    if (!currentLesson) {
      return;
    }

    const response = await fetch('/api/progress/lesson', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId: course.id, lessonId: currentLesson.id })
    });

    const data = await response.json();
    if (!localCompleted.includes(currentLesson.id)) {
      setLocalCompleted((prev) => [...prev, currentLesson.id]);
    }

    setLastXp({ xpAwarded: data.xpAwarded ?? 0, unlockedAchievements: data.unlockedAchievements ?? [] });

    const nextId = getNextIncompleteLessonId(
      {
        modules: course.modules.map((module) => ({
          lessons: module.lessons.map((lesson) => ({ id: lesson.id }))
        }))
      },
      localCompleted.includes(currentLesson.id) ? localCompleted : [...localCompleted, currentLesson.id]
    );

    if (nextId) {
      setCurrentLessonId(nextId);
      window.history.replaceState({}, '', `/learn/${course.slug}?lesson=${nextId}`);
    }
  }

  if (!currentLesson) {
    return <p className="text-sm text-slate-600">No lesson available.</p>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
      <CourseSidebar
        modules={course.modules.map((module) => ({
          id: module.id,
          title: module.title,
          lessons: module.lessons.map((lesson) => ({ id: lesson.id, title: lesson.title }))
        }))}
        completedLessonIds={localCompleted}
        activeLessonId={currentLesson.id}
        courseSlug={course.slug}
      />

      <section className="space-y-5">
        <header className="rounded-lg border border-slate-200 bg-white p-4">
          <h1 className="text-2xl font-bold text-slate-900">{course.title}</h1>
          <h2 className="mt-1 text-lg font-semibold text-slate-800">{currentLesson.title}</h2>
          <p className="text-sm text-slate-600">{currentLesson.objective}</p>
          <div className="mt-4">
            <ProgressBar value={progressPercent} label="Course Progress" />
          </div>
        </header>

        <ActivityRendererList
          activities={currentLesson.activities.map((activity) => ({
            ...activity,
            payload: activity.payload as never
          }))}
          courseId={course.id}
          lessonId={currentLesson.id}
        />

        <footer className="sticky bottom-0 rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button onClick={saveAndContinue} className="rounded bg-brand-700 px-4 py-2 text-sm text-white">
              Save & Continue
            </button>
            <p className="text-sm text-slate-600">
              {localCompleted.length}/{lessons.length} lessons completed
            </p>
          </div>
          <div className="mt-3">
            <XPToast xpAwarded={lastXp.xpAwarded} unlockedAchievements={lastXp.unlockedAchievements} />
          </div>
        </footer>
      </section>
    </div>
  );
}
