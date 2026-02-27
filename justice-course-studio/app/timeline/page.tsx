import timelineSeed from '@/database/seed.timeline.json';
import { TimelineView } from '@/components/timeline/TimelineView';

export default function TimelinePage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Timeline Preview</h1>
      <TimelineView timeline={timelineSeed} />
    </section>
  );
}
