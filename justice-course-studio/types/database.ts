import { ActivityType } from '@/types/course';

export interface ProfileRow {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
}

export interface CourseRow {
  id: string;
  slug: string;
  title: string;
  description: string;
  owner_user_id: string | null;
  is_public: boolean;
  status: 'draft' | 'published';
  estimated_minutes: number;
}

export interface ModuleRow {
  id: string;
  course_id: string;
  title: string;
  summary: string;
  position: number;
}

export interface LessonRow {
  id: string;
  module_id: string;
  title: string;
  objective: string;
  position: number;
  estimated_minutes: number;
}

export interface ActivityRow {
  id: string;
  lesson_id: string;
  type: ActivityType;
  title: string;
  position: number;
  payload: Record<string, unknown>;
}
