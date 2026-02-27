interface LessonLike {
  id: string;
}

interface CourseTree {
  modules: Array<{
    lessons: LessonLike[];
  }>;
}

export function computeCourseProgress(course: CourseTree, completedLessonIds: string[]) {
  const lessons = course.modules.flatMap((module) => module.lessons);
  const totalLessons = lessons.length;
  const completed = lessons.filter((lesson) => completedLessonIds.includes(lesson.id)).length;
  const percent = totalLessons === 0 ? 0 : Math.round((completed / totalLessons) * 100);

  return { totalLessons, completedLessons: completed, percent };
}
