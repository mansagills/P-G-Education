'use client';

import { useState } from 'react';
import { ActivityRendererProps } from './types';

export function ReadingActivity({ activity, courseId, lessonId, onSaved }: ActivityRendererProps) {
  const payload = activity.payload as { markdown?: string };
  const [saving, setSaving] = useState(false);

  async function markComplete() {
    setSaving(true);
    const response = await fetch('/api/progress/activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId, lessonId, activityId: activity.id, status: 'completed' })
    });
    const data = await response.json();
    onSaved?.({ xpAwarded: data.xpAwarded ?? 0, unlockedAchievements: data.unlockedAchievements ?? [] });
    setSaving(false);
  }

  return (
    <div className="space-y-4">
      <article className="prose max-w-none whitespace-pre-wrap rounded-md bg-slate-50 p-4 text-sm text-slate-700">
        {payload.markdown ?? 'Reading content unavailable.'}
      </article>
      <button onClick={markComplete} disabled={saving} className="rounded bg-brand-700 px-3 py-2 text-sm text-white">
        {saving ? 'Saving...' : 'Mark Reading Complete'}
      </button>
    </div>
  );
}
