interface LessonNode {
  id: string;
}

interface CourseTree {
  modules: Array<{
    lessons: LessonNode[];
  }>;
}

export function getNextIncompleteLessonId(course: CourseTree, completedLessonIds: string[]) {
  const orderedLessons = course.modules.flatMap((module) => module.lessons);
  const pending = orderedLessons.find((lesson) => !completedLessonIds.includes(lesson.id));
  return pending?.id ?? orderedLessons.at(0)?.id ?? null;
}
