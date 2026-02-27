import { AutoModuleStructurer } from '@/components/builder/AutoModuleStructurer';
import { LessonDnDBuilder } from '@/components/builder/LessonDnDBuilder';

export default function BuilderPage() {
  return (
    <section className="space-y-8">
      <h1 className="text-2xl font-semibold">Lesson Builder</h1>
      <AutoModuleStructurer />
      <LessonDnDBuilder />
    </section>
  );
}
