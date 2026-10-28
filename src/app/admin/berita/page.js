"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import NewsTable from "@/components/admin/NewsTable";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { useToast } from "@/components/admin/Toast";
import { useAdminNews } from "@/lib/hooks";
import { CATEGORIES, STATUS, deleteNews, setNewsStatus, sortNews } from "@/lib/news";

const filterCls =
  "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

export default function AdminBeritaPage() {
  const { news, ready, error, reload } = useAdminNews();
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [toDelete, setToDelete] = useState(null);

  const categories = useMemo(
    () => Array.from(new Set([...CATEGORIES, ...news.map((n) => n.category)])),
    [news]
  );

  const filtered = useMemo(
    () =>
      sortNews(news).filter(
        (n) =>
          n.title.toLowerCase().includes(search.trim().toLowerCase()) &&
          (category === "all" || n.category === category) &&
          (status === "all" || n.status === status)
      ),
    [news, search, category, status]
  );

  const handleToggle = async (item) => {
    const next = item.status === STATUS.PUBLISHED ? STATUS.DRAFT : STATUS.PUBLISHED;
    const result = await setNewsStatus(item, next);
    if (result.ok) {
      showToast(next === STATUS.PUBLISHED ? "Berita dipublikasikan." : "Berita dijadikan draft.");
      reload();
    } else {
      showToast(result.error, "error");
    }
  };

  const confirmDelete = async () => {
    const target = toDelete;
    setToDelete(null);
    const result = await deleteNews(target);
    if (result.ok) {
      showToast("Berita berhasil dihapus.");
      reload();
    } else {
      showToast(result.error, "error");
    }
  };

  if (!ready) return <p className="text-sm text-slate-500">Memuat data...</p>;

  return (
    <div className="space-y-4">
      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          Data berita tidak dapat dimuat. {error}
        </p>
      )}

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="search"
            aria-label="Cari judul berita"
            placeholder="Cari judul berita..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`${filterCls} sm:w-64`}
          />
          <select aria-label="Filter kategori" value={category} onChange={(e) => setCategory(e.target.value)} className={filterCls}>
            <option value="all">Semua kategori</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select aria-label="Filter status" value={status} onChange={(e) => setStatus(e.target.value)} className={filterCls}>
            <option value="all">Semua status</option>
            <option value={STATUS.PUBLISHED}>Published</option>
            <option value={STATUS.DRAFT}>Draft</option>
          </select>
        </div>
        <Link href="/admin/berita/tambah" className="rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-semibold text-white transition duration-200 hover:bg-blue-800">
          Tambah Berita
        </Link>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
          {news.length === 0 ? "Belum ada berita. Klik Tambah Berita untuk membuat yang pertama." : "Tidak ada berita yang cocok dengan pencarian atau filter."}
        </div>
      ) : (
        <NewsTable items={filtered} onDelete={setToDelete} onToggleStatus={handleToggle} />
      )}

      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Hapus berita?"
        message={toDelete ? `Berita "${toDelete.title}" akan dihapus permanen dan tidak lagi muncul di website publik.` : ""}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
