import type { Annotation } from '@/types/domain';

interface AnnotationPanelProps {
  annotations: Annotation[];
  onRemove: (id: string) => void;
}

export function AnnotationPanel({ annotations, onRemove }: AnnotationPanelProps) {
  return (
    <aside className="space-y-3 rounded-lg border border-slate-200 bg-white p-4">
      <h3 className="text-lg font-semibold">Annotations</h3>
      {annotations.length === 0 ? <p className="text-sm text-slate-500">No annotations yet.</p> : null}
      {annotations.map((annotation) => (
        <article key={annotation.id} className="rounded border border-slate-200 p-3">
          <p className="text-xs text-slate-500">
            Range: {annotation.selectionStart}-{annotation.selectionEnd}
          </p>
          <p className="mt-1 text-sm">{annotation.note}</p>
          <button
            onClick={() => onRemove(annotation.id)}
            className="mt-2 rounded border border-slate-300 px-2 py-1 text-xs"
            type="button"
          >
            Remove
          </button>
        </article>
      ))}
    </aside>
  );
}
