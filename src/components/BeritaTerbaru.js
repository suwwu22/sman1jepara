"use client";

import BeritaCard from "@/components/BeritaCard";
import BeritaSkeleton from "@/components/BeritaSkeleton";
import { usePublishedNews } from "@/lib/hooks";

// limit = jumlah maksimal berita; null = tampilkan semua yang published.
export default function BeritaTerbaru({ limit = 3 }) {
  const { news, ready, error } = usePublishedNews(limit);

  if (!ready) return <BeritaSkeleton count={limit ?? 3} />;
  if (error) {
    return (
      <p className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-800" role="alert">
        Berita tidak dapat dimuat. {error}
      </p>
    );
  }
  if (news.length === 0) {
    return <p className="rounded-xl bg-slate-50 p-6 text-center text-slate-500">Belum ada berita yang dipublikasikan.</p>;
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {news.map((b) => (
        <BeritaCard key={b.id} {...b} />
      ))}
    </div>
  );
}
