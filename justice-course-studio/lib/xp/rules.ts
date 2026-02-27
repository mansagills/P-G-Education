import { Level, XpRuleKey } from '@/types/xp';

export const XP_RULE_VALUES: Record<XpRuleKey, number> = {
  lesson_completion: 50,
  activity_completion: 25,
  simulation_success: 75,
  assessment_pass: 100,
  reflection_submission: 30,
  achievement_bonus: 0
};

export const LEVEL_THRESHOLDS: Level[] = [
  { level: 1, minXp: 0 },
  { level: 2, minXp: 500 },
  { level: 3, minXp: 1000 },
  { level: 4, minXp: 2000 },
  { level: 5, minXp: 3500 }
];

export function getLevelFromXp(totalXp: number) {
  return LEVEL_THRESHOLDS.reduce((acc, threshold) => (totalXp >= threshold.minXp ? threshold.level : acc), 1);
}
