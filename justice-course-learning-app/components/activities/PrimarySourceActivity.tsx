'use client';

import { useState } from 'react';
import { ActivityRendererProps } from './types';

export function PrimarySourceActivity({ activity, courseId, lessonId, onSaved }: ActivityRendererProps) {
  const payload = activity.payload as {
    sources?: Array<{ title: string; type: string; excerpt: string; link?: string }>;
  };
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  async function submitAnalysis() {
    setSaving(true);
    const response = await fetch('/api/progress/activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        courseId,
        lessonId,
        activityId: activity.id,
        status: 'submitted',
        response: { note }
      })
    });
    const data = await response.json();
    onSaved?.({ xpAwarded: data.xpAwarded ?? 0, unlockedAchievements: data.unlockedAchievements ?? [] });
    setSaving(false);
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        {(payload.sources ?? []).map((source) => (
          <article key={source.title} className="rounded border border-slate-200 p-3 text-sm">
            <h4 className="font-semibold text-slate-800">{source.title}</h4>
            <p className="text-xs uppercase tracking-wide text-slate-500">{source.type}</p>
            <p className="mt-2 text-slate-600">{source.excerpt}</p>
            {source.link ? (
              <a className="mt-2 inline-block text-xs text-brand-700 underline" href={source.link} target="_blank">
                Open Source
              </a>
            ) : null}
          </article>
        ))}
      </div>
      <textarea
        className="w-full rounded border border-slate-300 p-3 text-sm"
        rows={4}
        placeholder="Annotation placeholder: add your analysis notes"
        value={note}
        onChange={(event) => setNote(event.target.value)}
      />
      <button onClick={submitAnalysis} disabled={saving} className="rounded bg-brand-700 px-3 py-2 text-sm text-white">
        {saving ? 'Saving...' : 'Save Source Analysis'}
      </button>
    </div>
  );
}
