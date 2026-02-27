import { mockCourse, mockModules } from '@/lib/mocks/courseData';

export function CourseDashboard() {
  return (
    <section className="space-y-6">
      <div className="rounded-lg border border-slate-200 bg-white p-5">
        <h1 className="text-2xl font-semibold">{mockCourse.title}</h1>
        <p className="mt-2 text-slate-600">{mockCourse.description}</p>
        <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">Status: {mockCourse.status}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {mockModules.map((module) => (
          <article key={module.id} className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-xs uppercase tracking-wide text-brand-700">Module {module.sequence}</p>
            <h2 className="mt-2 text-lg font-semibold">{module.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{module.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
