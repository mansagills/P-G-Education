'use client';

import { useState } from 'react';
import { activityRegistry } from '@/components/activities';
import { ActivityRecord } from '@/types/course';
import { XPToast } from '@/components/ui/XPToast';

interface ActivityRendererListProps {
  activities: ActivityRecord[];
  courseId: string;
  lessonId: string;
}

export function ActivityRendererList({ activities, courseId, lessonId }: ActivityRendererListProps) {
  const [lastXP, setLastXP] = useState<{ xpAwarded: number; unlockedAchievements: string[] }>({
    xpAwarded: 0,
    unlockedAchievements: []
  });

  return (
    <div className="space-y-6">
      {activities.map((activity) => {
        const Activity = activityRegistry[activity.type];
        return (
          <section key={activity.id} className="space-y-3 rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="text-lg font-semibold text-slate-900">{activity.title}</h3>
            <Activity
              activity={activity}
              courseId={courseId}
              lessonId={lessonId}
              onSaved={(result) =>
                setLastXP({ xpAwarded: result.xpAwarded, unlockedAchievements: result.unlockedAchievements ?? [] })
              }
            />
          </section>
        );
      })}
      <XPToast xpAwarded={lastXP.xpAwarded} unlockedAchievements={lastXP.unlockedAchievements} />
    </div>
  );
}
