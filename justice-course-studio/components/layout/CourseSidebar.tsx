interface SidebarModule {
  id: string;
  title: string;
  lessons: Array<{ id: string; title: string }>;
}

interface CourseSidebarProps {
  modules: SidebarModule[];
  completedLessonIds: string[];
  activeLessonId: string;
  courseSlug: string;
}

export function CourseSidebar({ modules, completedLessonIds, activeLessonId, courseSlug }: CourseSidebarProps) {
  return (
    <aside className="space-y-4 rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-sm font-semibold text-slate-700">Course Outline</p>
      {modules.map((module) => (
        <section key={module.id} className="space-y-2">
          <h3 className="text-sm font-medium text-slate-800">{module.title}</h3>
          <ul className="space-y-1">
            {module.lessons.map((lesson) => {
              const completed = completedLessonIds.includes(lesson.id);
              const active = lesson.id === activeLessonId;
              return (
                <li key={lesson.id}>
                  <a
                    href={`/learn/${courseSlug}?lesson=${lesson.id}`}
                    className={`block rounded px-2 py-1 text-xs ${
                      active ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {completed ? '✓ ' : ''}
                    {lesson.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </aside>
  );
}
