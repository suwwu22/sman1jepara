"use client";

import BeritaCard from "@/components/BeritaCard";
import BeritaSkeleton from "@/components/BeritaSkeleton";
import { useNews } from "@/lib/hooks";
import { publishedNews } from "@/lib/news";

export default function BeritaTerbaru({ limit = 3 }) {
  const { news, ready } = useNews();
  if (!ready) return <BeritaSkeleton count={limit} />;
  const items = publishedNews(news).slice(0, limit);
  if (items.length === 0) {
    return <p className="rounded-xl bg-slate-50 p-6 text-center text-slate-500">Belum ada berita yang dipublikasikan.</p>;
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((b) => (
        <BeritaCard key={b.id} {...b} />
      ))}
    </div>
  );
}
