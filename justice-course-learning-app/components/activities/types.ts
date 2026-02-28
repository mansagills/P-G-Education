import { ActivityRecord } from '@/types/course';

export interface ActivityActionResult {
  xpAwarded: number;
  unlockedAchievements?: string[];
}

export interface ActivityRendererProps {
  activity: ActivityRecord;
  courseId: string;
  lessonId: string;
  onSaved?: (result: ActivityActionResult) => void;
}
