'use client';

import { useMemo, useState } from 'react';
import type { Annotation } from '@/types/domain';
import { AnnotationPanel } from './AnnotationPanel';

interface PrimarySourceViewerProps {
  sourceId: string;
  title: string;
  text: string;
}

export function PrimarySourceViewer({ sourceId, title, text }: PrimarySourceViewerProps) {
  const [note, setNote] = useState('');
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [selection, setSelection] = useState<{ start: number; end: number } | null>(null);

  const selectedText = useMemo(() => {
    if (!selection) {
      return '';
    }
    return text.slice(selection.start, selection.end);
  }, [selection, text]);

  function captureSelection() {
    const value = window.getSelection()?.toString() ?? '';
    if (!value) {
      return;
    }

    const start = text.indexOf(value);
    if (start < 0) {
      return;
    }

    setSelection({ start, end: start + value.length });
  }

  function addAnnotation() {
    if (!selection || !note.trim()) {
      return;
    }

    setAnnotations((current) => [
      {
        id: `annotation-${crypto.randomUUID()}`,
        sourceId,
        selectionStart: selection.start,
        selectionEnd: selection.end,
        note: note.trim(),
        color: '#facc15',
        createdAt: new Date().toISOString()
      },
      ...current
    ]);

    setNote('');
    setSelection(null);
  }

  function removeAnnotation(id: string) {
    setAnnotations((current) => current.filter((annotation) => annotation.id !== id));
  }

  return (
    <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
      <section className="space-y-3 rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p onMouseUp={captureSelection} className="rounded bg-slate-50 p-4 leading-7">
          {text}
        </p>
        <p className="text-xs text-slate-500">Highlight text, then add annotation notes.</p>
        {selection ? (
          <div className="space-y-2 rounded border border-brand-100 bg-brand-50/40 p-3">
            <p className="text-sm">
              Selected: <span className="font-medium">{selectedText}</span>
            </p>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Add annotation note"
              className="w-full rounded border border-slate-300 px-3 py-2"
              rows={3}
            />
            <button type="button" onClick={addAnnotation} className="rounded bg-brand-700 px-3 py-2 text-white">
              Save annotation
            </button>
          </div>
        ) : null}
      </section>
      <AnnotationPanel annotations={annotations} onRemove={removeAnnotation} />
    </div>
  );
}
