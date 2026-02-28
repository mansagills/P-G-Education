import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EnrollButton } from '@/components/course/EnrollButton';
import { getCourseDetail } from '@/lib/courses/queries';
import { getOptionalUser } from '@/lib/auth/session';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = await getCourseDetail(courseId);

  if (!course) {
    notFound();
  }

  const user = await getOptionalUser();
  let enrolled = false;

  if (user) {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from('enrollments')
      .select('id')
      .eq('user_id', user.id)
      .eq('course_id', course.id)
      .maybeSingle();
    enrolled = Boolean(data);
  }

  return (
    <section className="space-y-6">
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h1 className="text-3xl font-bold text-slate-900">{course.title}</h1>
        <p className="mt-3 text-slate-600">{course.description}</p>
        <div className="mt-4 flex gap-3">
          {user ? <EnrollButton courseId={course.id} enrolled={enrolled} /> : <Link href="/auth/sign-in" className="rounded bg-brand-700 px-4 py-2 text-sm text-white">Sign in to enroll</Link>}
          {enrolled ? (
            <Link href={`/learn/${course.slug}`} className="rounded border border-slate-300 px-4 py-2 text-sm text-slate-700">
              Continue Course
            </Link>
          ) : null}
        </div>
      </div>

      <div className="space-y-3">
        {course.modules.map((module) => (
          <section key={module.id} className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-800">{module.title}</h2>
            <p className="text-sm text-slate-600">{module.summary}</p>
            <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
              {module.lessons.map((lesson) => (
                <li key={lesson.id}>{lesson.title}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
