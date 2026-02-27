'use client';

import { FormEvent, useState } from 'react';

export function AssetUploadForm() {
  const [status, setStatus] = useState<string>('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await fetch('/api/assets/upload', {
      method: 'POST',
      body: formData
    });

    const data = (await response.json()) as { message?: string; error?: string };

    if (!response.ok) {
      setStatus(data.error ?? 'Upload failed');
      return;
    }

    setStatus(data.message ?? 'Asset uploaded');
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-slate-200 bg-white p-5">
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="courseId">
          Course ID
        </label>
        <input id="courseId" name="courseId" required className="w-full rounded border border-slate-300 px-3 py-2" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="asset">
          File
        </label>
        <input
          id="asset"
          name="asset"
          type="file"
          required
          className="w-full rounded border border-slate-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="assetType">
          Asset Type
        </label>
        <select id="assetType" name="assetType" className="w-full rounded border border-slate-300 px-3 py-2">
          <option value="pdf">PDF</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="audio">Audio</option>
          <option value="markdown">Markdown</option>
        </select>
      </div>
      <button type="submit" className="rounded bg-brand-700 px-4 py-2 text-white">
        Upload Asset
      </button>
      {status ? <p className="text-sm text-slate-600">{status}</p> : null}
    </form>
  );
}
