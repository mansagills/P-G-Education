import { NextResponse } from 'next/server';
import { z } from 'zod';
import { primarySourceAnalyzer } from '@/ai-skills/primarySourceAnalyzer';

const requestSchema = z.object({
  sourceTitle: z.string().min(1),
  sourceText: z.string().min(1)
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const result = await primarySourceAnalyzer(parsed.data);
  return NextResponse.json(result, { status: 200 });
}
