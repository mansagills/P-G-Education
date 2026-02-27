import { describe, expect, it } from 'vitest';
import { POST } from '@/app/api/modules/structure/route';

describe('POST /api/modules/structure', () => {
  it('returns module suggestions for valid input', async () => {
    const request = new Request('http://localhost/api/modules/structure', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        courseTitle: 'Course',
        assetSummaries: [{ id: 'a1', assetType: 'pdf', extractedText: 'sample' }]
      })
    });

    const response = await POST(request);
    const body = (await response.json()) as { modules: unknown[] };

    expect(response.status).toBe(200);
    expect(Array.isArray(body.modules)).toBe(true);
  });
});
