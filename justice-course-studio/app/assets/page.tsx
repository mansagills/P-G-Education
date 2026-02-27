import { AssetUploadForm } from '@/components/assets/AssetUploadForm';

export default function AssetsPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Asset Upload</h1>
      <AssetUploadForm />
    </section>
  );
}
