import Link from 'next/link';

export default function LandingPage() {
  return (
    <section className="space-y-8">
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">JusticeCourse Learning App</p>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">Learn History Through Interactive Civil Rights Courses</h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Enroll in immersive modules, complete simulations and reflections, and track your progress with XP and achievements.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/courses" className="rounded bg-brand-700 px-4 py-2 text-sm text-white">
            Explore Courses
          </Link>
          <Link href="/auth/sign-up" className="rounded border border-slate-300 px-4 py-2 text-sm text-slate-700">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
