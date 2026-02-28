'use client';

import { useState } from 'react';

interface EnrollButtonProps {
  courseId: string;
  enrolled: boolean;
}

export function EnrollButton({ courseId, enrolled }: EnrollButtonProps) {
  const [isEnrolled, setIsEnrolled] = useState(enrolled);
  const [saving, setSaving] = useState(false);

  async function enroll() {
    setSaving(true);
    const response = await fetch('/api/enroll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId })
    });

    if (response.ok) {
      setIsEnrolled(true);
    }

    setSaving(false);
  }

  return (
    <button
      type="button"
      disabled={isEnrolled || saving}
      onClick={enroll}
      className="rounded bg-brand-700 px-4 py-2 text-sm text-white disabled:bg-slate-400"
    >
      {isEnrolled ? 'Enrolled' : saving ? 'Enrolling...' : 'Enroll'}
    </button>
  );
}
