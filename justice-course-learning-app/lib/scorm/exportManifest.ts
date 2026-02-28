export interface ExportManifest {
  courseId: string;
  version: string;
  generatedAt: string;
  resources: Array<{
    id: string;
    type: 'module' | 'lesson' | 'activity' | 'asset';
    href: string;
  }>;
}

export function buildExportManifest(courseId: string): ExportManifest {
  return {
    courseId,
    version: '0.1.0-mvp',
    generatedAt: new Date().toISOString(),
    resources: []
  };
}
