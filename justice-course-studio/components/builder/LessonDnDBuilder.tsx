'use client';

import { useState } from 'react';
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { defaultLessonBlocks } from '@/lib/mocks/courseData';
import type { LessonBlock } from '@/types/domain';

interface SortableBlockProps {
  block: LessonBlock;
}

function SortableBlock({ block }: SortableBlockProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab rounded border border-slate-200 bg-slate-50 px-3 py-2 active:cursor-grabbing"
    >
      <p className="text-sm font-medium">{block.type}</p>
      <p className="text-xs text-slate-500">ID: {block.id}</p>
    </li>
  );
}

export function LessonDnDBuilder() {
  const [blocks, setBlocks] = useState<LessonBlock[]>(defaultLessonBlocks);
  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    setBlocks((currentBlocks) => {
      const oldIndex = currentBlocks.findIndex((block) => block.id === active.id);
      const newIndex = currentBlocks.findIndex((block) => block.id === over.id);
      return arrayMove(currentBlocks, oldIndex, newIndex);
    });
  }

  return (
    <section className="space-y-3 rounded-lg border border-slate-200 bg-white p-5">
      <h2 className="text-lg font-semibold">Drag-and-Drop Lesson Builder</h2>
      <p className="text-sm text-slate-600">Reorder JSON lesson blocks. Block config is schema-driven and persisted later.</p>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={blocks.map((block) => block.id)} strategy={verticalListSortingStrategy}>
          <ul className="space-y-2">
            {blocks.map((block) => (
              <SortableBlock key={block.id} block={block} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <pre className="overflow-x-auto rounded bg-slate-900 p-3 text-xs text-slate-100">{JSON.stringify(blocks, null, 2)}</pre>
    </section>
  );
}
