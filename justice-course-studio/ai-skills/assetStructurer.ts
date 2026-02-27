import type { AssetStructurerInput, AssetStructurerOutput } from '@/types/ai';

export async function assetStructurer(input: AssetStructurerInput): Promise<AssetStructurerOutput> {
  const modules = input.assetSummaries.slice(0, 3).map((asset, index) => ({
    id: `module-suggested-${index + 1}`,
    title: `${input.courseTitle} - Module ${index + 1}`,
    summary: `Generated from ${asset.assetType} asset ${asset.id}`,
    lessonCount: 2
  }));

  return {
    modules,
    recommendations: ['Add a timeline activity', 'Include a primary source annotation lesson']
  };
}
