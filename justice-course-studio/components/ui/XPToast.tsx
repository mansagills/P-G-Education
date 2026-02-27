'use client';

interface XPToastProps {
  xpAwarded: number;
  unlockedAchievements?: string[];
}

export function XPToast({ xpAwarded, unlockedAchievements = [] }: XPToastProps) {
  if (xpAwarded <= 0 && unlockedAchievements.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
      {xpAwarded > 0 ? <p>+{xpAwarded} XP earned</p> : null}
      {unlockedAchievements.length > 0 ? (
        <p className="text-xs">Unlocked: {unlockedAchievements.join(', ')}</p>
      ) : null}
    </div>
  );
}
