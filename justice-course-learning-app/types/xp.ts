export type XpRuleKey =
  | 'lesson_completion'
  | 'activity_completion'
  | 'simulation_success'
  | 'assessment_pass'
  | 'reflection_submission'
  | 'achievement_bonus';

export interface Level {
  level: number;
  minXp: number;
}

export interface AwardXpInput {
  userId: string;
  courseId: string;
  sourceType: 'lesson' | 'activity' | 'simulation' | 'assessment' | 'reflection' | 'achievement';
  sourceId: string;
  ruleKey: XpRuleKey;
  metadata?: Record<string, unknown>;
}

export interface AwardXpResult {
  xpAwarded: number;
  totalXp: number;
  level: number;
  unlockedAchievements: string[];
}
