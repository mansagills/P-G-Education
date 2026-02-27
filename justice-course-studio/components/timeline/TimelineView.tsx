import React from 'react';
import type { TimelineSchema } from '@/types/jsonSchemas';

interface TimelineViewProps {
  timeline: TimelineSchema;
}

export function TimelineView({ timeline }: TimelineViewProps) {
  const sortedEvents = [...timeline.events].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5">
      <h2 className="text-lg font-semibold">{timeline.title}</h2>
      <ol className="mt-4 space-y-3 border-l-2 border-brand-100 pl-4">
        {sortedEvents.map((event) => (
          <li key={event.id}>
            <p className="text-sm font-semibold text-brand-700">{event.date}</p>
            <p className="font-medium">{event.title}</p>
            <p className="text-sm text-slate-600">{event.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
