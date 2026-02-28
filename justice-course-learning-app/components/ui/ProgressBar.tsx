interface ProgressBarProps {
  value: number;
  label?: string;
}

export function ProgressBar({ value, label }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className="space-y-2">
      {label ? <p className="text-sm text-slate-600">{label}</p> : null}
      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-brand-700 transition-all" style={{ width: `${clamped}%` }} />
      </div>
      <p className="text-xs text-slate-500">{clamped}% complete</p>
    </div>
  );
}
