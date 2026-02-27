'use client';

import { useState } from 'react';
import { ActivityRendererProps } from './types';

export function VideoActivity({ activity, courseId, lessonId, onSaved }: ActivityRendererProps) {
  const payload = activity.payload as { url?: string; transcript?: string };
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
      {payload.url ? (
        <iframe className="aspect-video w-full rounded" src={payload.url} title={activity.title} allowFullScreen />
      ) : (
        <p className="text-sm text-slate-500">Video URL missing.</p>
      )}
      <p className="rounded bg-slate-50 p-3 text-xs text-slate-600">{payload.transcript ?? 'Transcript placeholder.'}</p>
      <button onClick={markComplete} disabled={saving} className="rounded bg-brand-700 px-3 py-2 text-sm text-white">
        {saving ? 'Saving...' : 'Mark Video Complete'}
      </button>
    </div>
  );
}
