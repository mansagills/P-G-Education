import Link from 'next/link';
import { requireInstructorAccess } from '@/components/layout/RouteGuard';
import { getOwnedCourses } from '@/lib/instructor/queries';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function InstructorPage() {
  const user = await requireInstructorAccess();
  const courses = await getOwnedCourses(user.id);
  const supabase = await createSupabaseServerClient();

  const cards = await Promise.all(
    courses.map(async (course) => {
      const { count: enrollmentCount } = await supabase
        .from('enrollments')
        .select('*', { count: 'exact', head: true })
        .eq('course_id', course.id);

      return {
        ...course,
        enrollmentCount: enrollmentCount ?? 0
      };
    })
  );

  return (
    <section className="space-y-6">
      <header className="rounded-lg border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-bold text-slate-900">Instructor Panel</h1>
        <p className="text-sm text-slate-600">View roster, progress, and reflections for your owned courses.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((course) => (
          <article key={course.id} className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-800">{course.title}</h2>
            <p className="text-sm text-slate-600">{course.description}</p>
            <p className="mt-2 text-xs text-slate-500">Enrollments: {course.enrollmentCount}</p>
            <Link href={`/instructor/courses/${course.id}`} className="mt-3 inline-block text-sm font-medium text-brand-700">
              View Course Analytics →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
