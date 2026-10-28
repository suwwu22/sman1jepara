"use client";

import Link from "next/link";
import NewsImage from "@/components/NewsImage";
import { useNews } from "@/lib/hooks";
import { STATUS } from "@/lib/news";

function TidakDitemukan() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-blue-900">Halaman tidak ditemukan</h1>
      <p className="mt-3 text-slate-600">Berita yang Anda cari tidak tersedia.</p>
      <Link href="/berita" className="mt-6 inline-block rounded-full bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800">
        Kembali ke Berita
      </Link>
    </div>
  );
}

export default function BeritaDetail({ id }) {
  const { news, ready } = useNews();

  if (!ready) {
    return <div className="mx-auto max-w-3xl px-4 py-12" aria-busy="true"><div className="h-96 animate-pulse rounded-2xl bg-slate-100" /></div>;
  }

  const item = news.find((n) => n.id === id);
  if (!item || item.status !== STATUS.PUBLISHED) return <TidakDitemukan />;

  const paragraphs = (Array.isArray(item.content) ? item.content.join("\n\n") : String(item.content))
    .split(/\n{2,}/)
    .filter(Boolean);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-blue-700">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/berita" className="hover:text-blue-700">Berita</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{item.category}</span>
      </nav>

      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">{item.category}</span>
      <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">{item.title}</h1>
      <p className="mt-2 text-sm text-slate-500">{item.date}</p>

      <div className="relative mt-6 h-56 overflow-hidden rounded-2xl bg-blue-50 sm:h-80">
        <NewsImage src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover" />
      </div>

      <div className="mt-8 space-y-4 leading-relaxed text-slate-700">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <Link href="/berita" className="mt-10 inline-block rounded-full bg-blue-700 px-6 py-3 font-semibold text-white transition duration-200 hover:bg-blue-800">
        Kembali ke Berita
      </Link>
    </article>
  );
}
