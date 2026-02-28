import { evaluateAchievementUnlocks } from '@/lib/achievements/checks';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { AwardXpInput, AwardXpResult } from '@/types/xp';
import { getLevelFromXp, XP_RULE_VALUES } from './rules';

export async function awardXp(input: AwardXpInput): Promise<AwardXpResult> {
  const supabase = createSupabaseAdminClient();
  const xpAmount = XP_RULE_VALUES[input.ruleKey] ?? 0;

  const { data: existingTransaction } = await supabase
    .from('xp_transactions')
    .select('id')
    .eq('user_id', input.userId)
    .eq('source_type', input.sourceType)
    .eq('source_id', input.sourceId)
    .eq('rule_key', input.ruleKey)
    .maybeSingle();

  let awarded = 0;
  if (!existingTransaction && xpAmount > 0) {
    const { error } = await supabase.from('xp_transactions').insert({
      user_id: input.userId,
      course_id: input.courseId,
      source_type: input.sourceType,
      source_id: input.sourceId,
      rule_key: input.ruleKey,
      xp_amount: xpAmount,
      metadata: input.metadata ?? {}
    });

    if (error) {
      throw new Error(error.message);
    }

    awarded = xpAmount;
  }

  const achievementsToGrant = await evaluateAchievementUnlocks(input.userId, input.courseId);
  const unlockedAchievements: string[] = [];

  if (achievementsToGrant.length > 0) {
    const { data: achievements, error: achievementsError } = await supabase
      .from('achievements')
      .select('id, key, xp_bonus')
      .in('key', achievementsToGrant);

    if (achievementsError) {
      throw new Error(achievementsError.message);
    }

    for (const achievement of achievements ?? []) {
      const { data: existingUnlock } = await supabase
        .from('user_achievements')
        .select('id')
        .eq('user_id', input.userId)
        .eq('achievement_id', achievement.id)
        .eq('course_id', input.courseId)
        .maybeSingle();

      if (!existingUnlock) {
        const { error: unlockError } = await supabase.from('user_achievements').insert({
          user_id: input.userId,
          achievement_id: achievement.id,
          course_id: input.courseId
        });

        if (unlockError) {
          throw new Error(unlockError.message);
        }

        unlockedAchievements.push(achievement.key);

        if (achievement.xp_bonus > 0) {
          await supabase.from('xp_transactions').insert({
            user_id: input.userId,
            course_id: input.courseId,
            source_type: 'achievement',
            source_id: achievement.id,
            rule_key: 'achievement_bonus',
            xp_amount: achievement.xp_bonus,
            metadata: { achievementKey: achievement.key }
          });
        }
      }
    }
  }

  const { data: finalTotals, error: finalError } = await supabase
    .from('xp_transactions')
    .select('xp_amount')
    .eq('user_id', input.userId)
    .eq('course_id', input.courseId);

  if (finalError) {
    throw new Error(finalError.message);
  }

  const totalXp = (finalTotals ?? []).reduce((sum, row) => sum + row.xp_amount, 0);

  return {
    xpAwarded: awarded,
    totalXp,
    level: getLevelFromXp(totalXp),
    unlockedAchievements
  };
}
