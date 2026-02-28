import Link from 'next/link';
import { getPublishedCourses } from '@/lib/courses/queries';

export default async function CoursesPage() {
  const courses = await getPublishedCourses();

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Course Catalog</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {courses.map((course) => (
          <article key={course.id} className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-xl font-semibold text-slate-800">{course.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{course.description}</p>
            <p className="mt-2 text-xs text-slate-500">Estimated {course.estimated_minutes} minutes</p>
            <Link href={`/courses/${course.slug}`} className="mt-4 inline-block text-sm font-medium text-brand-700">
              View Course →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
