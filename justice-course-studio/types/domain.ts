export interface User {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  sequence: number;
  summary: string;
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  sequence: number;
  contentJson: LessonBlock[];
  createdAt: string;
  updatedAt: string;
}

export type LessonBlockType =
  | 'timeline'
  | 'primary_source'
  | 'activity'
  | 'simulation'
  | 'assessment'
  | 'text';

export interface LessonBlock {
  id: string;
  type: LessonBlockType;
  config: Record<string, unknown>;
}

export interface Activity {
  id: string;
  lessonId: string;
  type: 'debate' | 'quiz' | 'journal' | 'role_play' | 'simulation' | 'custom';
  title: string;
  configJson: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface Asset {
  id: string;
  courseId: string;
  filename: string;
  mimeType: string;
  storagePath: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface Timeline {
  id: string;
  lessonId: string;
  title: string;
  eventsJson: TimelineEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category?: string;
}

export interface MapEntry {
  id: string;
  lessonId: string;
  title: string;
  layersJson: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface Simulation {
  id: string;
  lessonId: string;
  title: string;
  stateJson: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface Assessment {
  id: string;
  lessonId: string;
  title: string;
  questionsJson: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface Submission {
  id: string;
  assessmentId: string;
  userId: string;
  score: number | null;
  answersJson: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface Annotation {
  id: string;
  sourceId: string;
  selectionStart: number;
  selectionEnd: number;
  note: string;
  color: string;
  createdAt: string;
}
