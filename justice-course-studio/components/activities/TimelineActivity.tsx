'use client';

import { useState } from 'react';
import { ActivityRendererProps } from './types';

export function TimelineActivity({ activity, courseId, lessonId, onSaved }: ActivityRendererProps) {
  const payload = activity.payload as {
    events?: Array<{ date: string; title: string; description: string }>;
  };
  const [saving, setSaving] = useState(false);

  const events = [...(payload.events ?? [])].sort((a, b) => a.date.localeCompare(b.date));

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
      <ul className="space-y-3">
        {events.map((event) => (
          <li key={event.date + event.title} className="rounded border border-slate-200 p-3">
            <p className="text-xs font-semibold text-brand-700">{event.date}</p>
            <h4 className="text-sm font-semibold text-slate-800">{event.title}</h4>
            <p className="text-sm text-slate-600">{event.description}</p>
          </li>
        ))}
      </ul>
      <button onClick={markComplete} disabled={saving} className="rounded bg-brand-700 px-3 py-2 text-sm text-white">
        {saving ? 'Saving...' : 'Mark Timeline Complete'}
      </button>
    </div>
  );
}
