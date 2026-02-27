import { describe, expect, it } from 'vitest';
import { assetStructurer } from '@/ai-skills/assetStructurer';

describe('assetStructurer', () => {
  it('returns deterministic module suggestions as JSON output', async () => {
    const result = await assetStructurer({
      courseTitle: 'Test Course',
      assetSummaries: [
        { id: '1', assetType: 'pdf', extractedText: 'content' },
        { id: '2', assetType: 'image', extractedText: 'content' }
      ]
    });

    expect(result.modules).toHaveLength(2);
    expect(result.recommendations.length).toBeGreaterThan(0);
    expect(result.modules[0].title).toContain('Test Course');
  });
});
