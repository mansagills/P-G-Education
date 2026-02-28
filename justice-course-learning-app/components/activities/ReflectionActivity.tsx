'use client';

import { FormEvent, useState } from 'react';
import { ActivityRendererProps } from './types';

export function ReflectionActivity({ activity, courseId, lessonId, onSaved }: ActivityRendererProps) {
  const payload = activity.payload as { prompt?: string; minWords?: number };
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    const response = await fetch('/api/submissions/reflection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId, lessonId, activityId: activity.id, content })
    });
    const data = await response.json();
    onSaved?.({ xpAwarded: data.xpAwarded ?? 0, unlockedAchievements: data.unlockedAchievements ?? [] });
    setSaving(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <p className="rounded bg-amber-50 p-3 text-sm text-amber-900">{payload.prompt ?? 'Reflection prompt missing.'}</p>
      <textarea
        required
        minLength={(payload.minWords ?? 20) * 4}
        rows={8}
        className="w-full rounded border border-slate-300 p-3 text-sm"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
      <button disabled={saving} className="rounded bg-brand-700 px-3 py-2 text-sm text-white" type="submit">
        {saving ? 'Submitting...' : 'Submit Reflection'}
      </button>
    </form>
  );
}
