import { notFound } from 'next/navigation';
import { requireInstructorAccess } from '@/components/layout/RouteGuard';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getInstructorCourseSnapshot } from '@/lib/instructor/queries';

export default async function InstructorCoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const user = await requireInstructorAccess();
  const { courseId } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: course } = await supabase
    .from('courses')
    .select('id, title, owner_user_id')
    .eq('id', courseId)
    .maybeSingle();

  if (!course || course.owner_user_id !== user.id) {
    notFound();
  }

  const snapshot = await getInstructorCourseSnapshot(courseId);

  const completionByUser = snapshot.lessonCompletions.reduce<Record<string, number>>((acc, row) => {
    acc[row.user_id] = (acc[row.user_id] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <section className="space-y-6">
      <header className="rounded-lg border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-bold text-slate-900">{course.title}: Instructor View</h1>
      </header>

      <section className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Roster & Progress</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="py-2 pr-4">Student</th>
                <th className="py-2 pr-4">User ID</th>
                <th className="py-2">Completed Lessons</th>
              </tr>
            </thead>
            <tbody>
              {snapshot.enrollments.map((row) => {
                const profile = Array.isArray(row.profiles) ? row.profiles[0] : row.profiles;
                return (
                  <tr key={row.user_id} className="border-b border-slate-100">
                    <td className="py-2 pr-4">{profile?.display_name ?? 'Student'}</td>
                    <td className="py-2 pr-4 text-xs text-slate-500">{row.user_id}</td>
                    <td className="py-2">{completionByUser[row.user_id] ?? 0}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Recent Reflections</h2>
        <ul className="mt-4 space-y-3">
          {snapshot.reflections.map((reflection) => {
            const profile = Array.isArray(reflection.profiles) ? reflection.profiles[0] : reflection.profiles;
            const lesson = Array.isArray(reflection.lessons) ? reflection.lessons[0] : reflection.lessons;
            return (
              <li key={reflection.id} className="rounded border border-slate-200 p-3 text-sm">
                <p className="font-medium text-slate-800">{profile?.display_name ?? reflection.user_id}</p>
                <p className="text-xs text-slate-500">{lesson?.title ?? 'Lesson'} • {new Date(reflection.created_at).toLocaleString()}</p>
                <p className="mt-2 text-slate-700">{reflection.content}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
}
