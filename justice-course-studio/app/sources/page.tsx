import { PrimarySourceViewer } from '@/components/sources/PrimarySourceViewer';

const sourceText = `On December 1, 1955, Rosa Parks refused to surrender her seat on a Montgomery bus.
The resulting boycott began on December 5, 1955 and lasted more than a year.`;

export default function SourcesPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Primary Source Viewer</h1>
      <PrimarySourceViewer sourceId="source-demo-1" title="Bus Boycott Excerpt" text={sourceText} />
    </section>
  );
}
