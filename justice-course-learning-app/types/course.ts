export type ActivityType =
  | 'reading'
  | 'video'
  | 'timeline'
  | 'primary_source'
  | 'reflection'
  | 'quiz'
  | 'simulation_carpool';

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

export interface ReadingPayload {
  markdown: string;
}

export interface VideoPayload {
  url: string;
  transcript?: string;
}

export interface TimelinePayload {
  events: TimelineEvent[];
}

export interface PrimarySourcePayload {
  sources: Array<{
    title: string;
    type: string;
    excerpt: string;
    link?: string;
  }>;
  annotationPlaceholder?: boolean;
}

export interface ReflectionPayload {
  prompt: string;
  minWords?: number;
}

export interface QuizPayload {
  passingScore: number;
  questions: Array<{
    id: string;
    prompt: string;
    options: string[];
    correctIndex: number;
    explanation?: string;
  }>;
}

export interface SimulationCarpoolPayload {
  scenarioKey: string;
  goal: string;
  roles: string[];
  resources: Record<string, number>;
  rules: Record<string, number>;
  successThreshold: number;
}

export type ActivityPayload =
  | ReadingPayload
  | VideoPayload
  | TimelinePayload
  | PrimarySourcePayload
  | ReflectionPayload
  | QuizPayload
  | SimulationCarpoolPayload;

export interface ActivityRecord {
  id: string;
  lesson_id: string;
  type: ActivityType;
  title: string;
  position: number;
  payload: ActivityPayload;
}

export interface LessonRecord {
  id: string;
  module_id: string;
  title: string;
  objective: string;
  position: number;
  estimated_minutes: number;
  activities: ActivityRecord[];
}

export interface ModuleRecord {
  id: string;
  course_id: string;
  title: string;
  summary: string;
  position: number;
  lessons: LessonRecord[];
}

export interface CourseRecord {
  id: string;
  slug: string;
  title: string;
  description: string;
  estimated_minutes: number;
  modules: ModuleRecord[];
}
