import { NextResponse } from 'next/server';
import { z } from 'zod';
import { assetStructurer } from '@/ai-skills/assetStructurer';

const requestSchema = z.object({
  courseTitle: z.string().min(1),
  assetSummaries: z.array(
    z.object({
      id: z.string(),
      assetType: z.string(),
      extractedText: z.string()
    })
  )
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const result = await assetStructurer(parsed.data);
  return NextResponse.json(result, { status: 200 });
}
