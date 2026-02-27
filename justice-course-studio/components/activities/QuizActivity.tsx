'use client';

import { FormEvent, useState } from 'react';
import { ActivityRendererProps } from './types';

export function QuizActivity({ activity, courseId, lessonId, onSaved }: ActivityRendererProps) {
  const payload = activity.payload as {
    passingScore?: number;
    questions?: Array<{ id: string; prompt: string; options: string[]; correctIndex: number; explanation?: string }>;
  };

  const questions = payload.questions ?? [];
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [status, setStatus] = useState<string>('');

  const allAnswered = questions.every((question) => answers[question.id] !== undefined);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const correct = questions.filter((question) => answers[question.id] === question.correctIndex).length;
    const score = questions.length ? Math.round((correct / questions.length) * 100) : 0;
    const passed = score >= (payload.passingScore ?? 70);

    const response = await fetch('/api/assessments/attempt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        courseId,
        lessonId,
        activityId: activity.id,
        score,
        passed,
        answers
      })
    });

    const data = await response.json();
    setStatus(passed ? `Passed with ${score}%` : `Scored ${score}%. Try again to pass.`);
    onSaved?.({ xpAwarded: data.xpAwarded ?? 0, unlockedAchievements: data.unlockedAchievements ?? [] });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {questions.map((question) => (
        <fieldset key={question.id} className="space-y-2 rounded border border-slate-200 p-3">
          <legend className="text-sm font-semibold text-slate-800">{question.prompt}</legend>
          <div className="space-y-1">
            {question.options.map((option, index) => (
              <label key={option} className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name={question.id}
                  checked={answers[question.id] === index}
                  onChange={() => setAnswers((prev) => ({ ...prev, [question.id]: index }))}
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      <button type="submit" disabled={!allAnswered} className="rounded bg-brand-700 px-3 py-2 text-sm text-white disabled:bg-slate-400">
        Submit Quiz
      </button>
      {status ? <p className="text-sm text-slate-600">{status}</p> : null}
    </form>
  );
}
