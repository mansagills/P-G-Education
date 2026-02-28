import Link from 'next/link';
import { requireStudentAccess } from '@/components/layout/RouteGuard';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { BadgePill } from '@/components/ui/BadgePill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { getLevelFromXp } from '@/lib/xp/rules';

export default async function DashboardPage() {
  const user = await requireStudentAccess();
  const supabase = await createSupabaseServerClient();

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('course_id, courses(id, slug, title, description), enrolled_at')
    .eq('user_id', user.id)
    .order('enrolled_at', { ascending: false });

  const { data: xpRows } = await supabase
    .from('xp_transactions')
    .select('xp_amount')
    .eq('user_id', user.id);

  const totalXp = (xpRows ?? []).reduce((sum, row) => sum + row.xp_amount, 0);
  const level = getLevelFromXp(totalXp);

  const { data: achievements } = await supabase
    .from('user_achievements')
    .select('achievement_id, achievements(title)')
    .eq('user_id', user.id)
    .order('awarded_at', { ascending: false })
    .limit(6);

  const { data: completedLessons } = await supabase.from('lesson_completions').select('lesson_id').eq('user_id', user.id);

  const completedCount = completedLessons?.length ?? 0;

  return (
    <section className="space-y-6">
      <header className="rounded-lg border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-bold text-slate-900">Student Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">Track course progress, XP, and achievements.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded border border-slate-200 p-3">
            <p className="text-xs text-slate-500">Total XP</p>
            <p className="text-xl font-semibold text-slate-800">{totalXp}</p>
          </div>
          <div className="rounded border border-slate-200 p-3">
            <p className="text-xs text-slate-500">Level</p>
            <p className="text-xl font-semibold text-slate-800">{level}</p>
          </div>
          <div className="rounded border border-slate-200 p-3">
            <p className="text-xs text-slate-500">Streak</p>
            <p className="text-xl font-semibold text-slate-800">Phase 2</p>
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar value={Math.min(100, Math.round((completedCount / 6) * 100))} label="Lesson Completion (MVP placeholder)" />
        </div>
      </header>

      <section className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Enrolled Courses</h2>
        <div className="mt-4 space-y-3">
          {(enrollments ?? []).length === 0 ? <p className="text-sm text-slate-600">No enrollments yet.</p> : null}
          {(enrollments ?? []).map((row) => {
            const course = Array.isArray(row.courses) ? row.courses[0] : row.courses;
            if (!course) {
              return null;
            }
            return (
              <article key={row.course_id} className="rounded border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-800">{course.title}</h3>
                <p className="text-sm text-slate-600">{course.description}</p>
                <div className="mt-3 flex gap-2">
                  <Link href={`/learn/${course.slug}`} className="rounded bg-brand-700 px-3 py-2 text-sm text-white">
                    Continue
                  </Link>
                  <Link href={`/courses/${course.slug}`} className="rounded border border-slate-300 px-3 py-2 text-sm text-slate-700">
                    Course Detail
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Achievements Preview</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {(achievements ?? []).length === 0 ? <p className="text-sm text-slate-600">No achievements unlocked yet.</p> : null}
          {(achievements ?? []).map((entry, index) => {
            const achievement = Array.isArray(entry.achievements) ? entry.achievements[0] : entry.achievements;
            return <BadgePill key={`${entry.achievement_id}-${index}`} label={achievement?.title ?? 'Achievement'} />;
          })}
        </div>
      </section>
    </section>
  );
}
