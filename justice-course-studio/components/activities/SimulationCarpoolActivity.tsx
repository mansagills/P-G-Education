'use client';

import { FormEvent, useMemo, useState } from 'react';
import { ActivityRendererProps } from './types';

export function SimulationCarpoolActivity({ activity, courseId, lessonId, onSaved }: ActivityRendererProps) {
  const payload = activity.payload as {
    scenarioKey?: string;
    goal?: string;
    roles?: string[];
    resources?: Record<string, number>;
    rules?: Record<string, number>;
    successThreshold?: number;
  };

  const [selectedRole, setSelectedRole] = useState(payload.roles?.[0] ?? 'organizer');
  const [plannedTrips, setPlannedTrips] = useState(20);
  const [onTimeTrips, setOnTimeTrips] = useState(18);
  const score = useMemo(() => Math.round((onTimeTrips / Math.max(plannedTrips, 1)) * 100), [plannedTrips, onTimeTrips]);

  async function runSimulation(event: FormEvent) {
    event.preventDefault();
    const successThreshold = payload.successThreshold ?? 70;
    const outcome = score >= successThreshold ? 'success' : 'needs_improvement';

    const response = await fetch('/api/simulations/result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        courseId,
        lessonId,
        activityId: activity.id,
        scenarioKey: payload.scenarioKey ?? 'carpool',
        score,
        outcome,
        state: {
          selectedRole,
          plannedTrips,
          onTimeTrips,
          resources: payload.resources ?? {}
        }
      })
    });

    const data = await response.json();
    onSaved?.({ xpAwarded: data.xpAwarded ?? 0, unlockedAchievements: data.unlockedAchievements ?? [] });
  }

  return (
    <form onSubmit={runSimulation} className="space-y-4 rounded border border-slate-200 p-4">
      <p className="text-sm text-slate-700">{payload.goal ?? 'Coordinate trips with limited resources.'}</p>
      <label className="block text-sm">
        Role
        <select value={selectedRole} onChange={(event) => setSelectedRole(event.target.value)} className="mt-1 w-full rounded border border-slate-300 p-2">
          {(payload.roles ?? []).map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        Planned trips
        <input type="number" min={1} value={plannedTrips} onChange={(event) => setPlannedTrips(Number(event.target.value))} className="mt-1 w-full rounded border border-slate-300 p-2" />
      </label>
      <label className="block text-sm">
        On-time trips
        <input type="number" min={0} value={onTimeTrips} onChange={(event) => setOnTimeTrips(Number(event.target.value))} className="mt-1 w-full rounded border border-slate-300 p-2" />
      </label>
      <p className="text-sm text-slate-600">Simulation score: {score}</p>
      <button type="submit" className="rounded bg-brand-700 px-3 py-2 text-sm text-white">
        Submit Simulation
      </button>
    </form>
  );
}
