import type { Course, LessonBlock, Module } from '@/types/domain';

export const mockCourse: Course = {
  id: 'course-bus-boycott',
  userId: 'user-demo-1',
  title: 'Montgomery Bus Boycott Interactive Course',
  description: 'MVP scaffold course for JusticeCourse Studio.',
  status: 'draft',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export const mockModules: Module[] = [
  {
    id: 'module-context',
    courseId: mockCourse.id,
    title: 'Historical Context and Triggers',
    summary: 'Origins and early events that triggered collective action.',
    sequence: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'module-mobilization',
    courseId: mockCourse.id,
    title: 'Mobilization and Legal Strategy',
    summary: 'Community coordination and legal milestones.',
    sequence: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const defaultLessonBlocks: LessonBlock[] = [
  { id: 'block-1', type: 'text', config: { text: 'Lesson opener' } },
  { id: 'block-2', type: 'timeline', config: { timelineId: 'timeline-bus-boycott' } },
  { id: 'block-3', type: 'primary_source', config: { sourceId: 'source-1' } }
];
