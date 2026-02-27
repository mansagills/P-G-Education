'use client';

import { FormEvent, useState } from 'react';
import type { AssetStructurerOutput } from '@/types/ai';

export function AutoModuleStructurer() {
  const [result, setResult] = useState<AssetStructurerOutput | null>(null);
  const [error, setError] = useState<string>('');

  async function handleGenerate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const form = new FormData(event.currentTarget);
    const courseTitle = String(form.get('courseTitle') ?? '').trim();

    const response = await fetch('/api/modules/structure', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        courseTitle,
        assetSummaries: [
          { id: 'asset-1', assetType: 'pdf', extractedText: 'Bus boycott source materials and dates.' },
          { id: 'asset-2', assetType: 'image', extractedText: 'Photographs and flyers from 1955-1956.' }
        ]
      })
    });

    const data = (await response.json()) as AssetStructurerOutput & { error?: string };

    if (!response.ok) {
      setError(data.error ?? 'Unable to structure modules');
      return;
    }

    setResult(data);
  }

  return (
    <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-5">
      <h2 className="text-lg font-semibold">Auto Module Structurer</h2>
      <form onSubmit={handleGenerate} className="flex items-end gap-3">
        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium" htmlFor="courseTitle">
            Course title
          </label>
          <input
            id="courseTitle"
            name="courseTitle"
            className="w-full rounded border border-slate-300 px-3 py-2"
            defaultValue="Montgomery Bus Boycott Interactive Course"
            required
          />
        </div>
        <button type="submit" className="rounded bg-brand-700 px-4 py-2 text-white">
          Generate
        </button>
      </form>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {result ? (
        <div className="space-y-3">
          {result.modules.map((module) => (
            <article key={module.id} className="rounded border border-slate-200 p-3">
              <h3 className="font-medium">{module.title}</h3>
              <p className="text-sm text-slate-600">{module.summary}</p>
              <p className="text-xs text-slate-500">Lessons: {module.lessonCount}</p>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
