import { z } from 'zod';
import { moduleSuggestionSchema, timelineSchema } from '@/types/jsonSchemas';

export function validateTimelinePayload(payload: unknown) {
  return timelineSchema.safeParse(payload);
}

export function validateModuleSuggestions(payload: unknown) {
  return z.array(moduleSuggestionSchema).safeParse(payload);
}
