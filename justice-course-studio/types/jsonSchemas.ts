import { z } from 'zod';

export const timelineEventSchema = z.object({
  id: z.string(),
  date: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string().optional()
});

export const timelineSchema = z.object({
  id: z.string(),
  title: z.string(),
  events: z.array(timelineEventSchema)
});

export const lessonBlockSchema = z.object({
  id: z.string(),
  type: z.enum(['timeline', 'primary_source', 'activity', 'simulation', 'assessment', 'text']),
  config: z.record(z.unknown())
});

export const moduleSuggestionSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  lessonCount: z.number().int().positive()
});

export type TimelineSchema = z.infer<typeof timelineSchema>;
export type TimelineEventSchema = z.infer<typeof timelineEventSchema>;
export type LessonBlockSchema = z.infer<typeof lessonBlockSchema>;
export type ModuleSuggestionSchema = z.infer<typeof moduleSuggestionSchema>;
