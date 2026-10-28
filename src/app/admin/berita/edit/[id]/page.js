"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import NewsForm from "@/components/admin/NewsForm";
import { useToast } from "@/components/admin/Toast";
import { useNews } from "@/lib/hooks";
import { updateNews } from "@/lib/news";

export default function EditBeritaPage() {
  const { id } = useParams();
  const router = useRouter();
  const { news, ready } = useNews();
  const { showToast } = useToast();

  if (!ready) return <p className="text-sm text-slate-500">Memuat data...</p>;

  const item = news.find((n) => n.id === id);
  if (!item) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <p className="font-semibold text-slate-900">Berita tidak ditemukan.</p>
        <Link href="/admin/berita" className="mt-4 inline-block text-sm font-semibold text-blue-700 hover:underline">
          Kembali ke daftar berita
        </Link>
      </div>
    );
  }

  const handleSubmit = (values) => {
    const result = updateNews(item.id, values);
    if (result.ok) {
      showToast("Berita berhasil diperbarui.");
      router.push("/admin/berita");
    } else {
      showToast(result.error, "error");
    }
    return result;
  };

  return (
    <NewsForm key={item.id} mode="edit" initial={item} onSubmit={handleSubmit} onCancel={() => router.push("/admin/berita")} />
  );
}
