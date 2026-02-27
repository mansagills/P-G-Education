import { NextResponse } from 'next/server';
import { z } from 'zod';
import { timelineGenerator } from '@/ai-skills/timelineGenerator';

const requestSchema = z.object({
  lessonTitle: z.string().min(1),
  sourceText: z.string().min(1),
  requiredDates: z.array(z.string()).optional()
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const result = await timelineGenerator(parsed.data);
  return NextResponse.json(result, { status: 200 });
}
