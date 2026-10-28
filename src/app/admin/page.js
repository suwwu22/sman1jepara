"use client";

import Link from "next/link";
import AdminStatCard from "@/components/admin/AdminStatCard";
import { useActivities, useAdminSettings, useNews, useProfile, useSession } from "@/lib/hooks";
import { STATUS, sortNews } from "@/lib/news";

export default function AdminDashboardPage() {
  const { news } = useNews();
  const { customized } = useProfile();
  const activities = useActivities();
  const { session } = useSession();
  const settings = useAdminSettings();

  const published = news.filter((n) => n.status === STATUS.PUBLISHED).length;
  const drafts = news.filter((n) => n.status === STATUS.DRAFT).length;
  const categories = new Set(news.map((n) => n.category)).size;
  const recentNews = sortNews(news).slice(0, 5);
  const recentActivities = activities.slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Selamat datang, {settings.displayName}</h2>
          <p className="text-sm text-slate-500">
            Login sebagai @{session?.username} sejak{" "}
            {session?.loggedInAt ? new Date(session.loggedInAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }) : "-"}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/berita/tambah" className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-blue-800">
            Tambah Berita
          </Link>
          <Link href="/admin/berita" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition duration-200 hover:bg-slate-50">
            Kelola Semua Berita
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <AdminStatCard label="Total Berita" value={news.length} />
        <AdminStatCard label="Published" value={published} />
        <AdminStatCard label="Draft" value={drafts} />
        <AdminStatCard label="Kategori Berita" value={categories} />
        <AdminStatCard label="Profil Sekolah" value={customized ? "Disesuaikan" : "Data awal"} hint="Status data profil" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-bold text-slate-900">Berita Terbaru</h2>
          {recentNews.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">Belum ada berita.</p>
          ) : (
            <ul className="mt-4 divide-y divide-slate-100">
              {recentNews.map((n) => (
                <li key={n.id} className="flex items-start justify-between gap-3 py-3">
                  <div>
                    <Link href={`/admin/berita/edit/${n.id}`} className="text-sm font-semibold text-slate-900 hover:text-blue-700">
                      {n.title}
                    </Link>
                    <p className="text-xs text-slate-500">{n.category} &middot; {n.date}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${n.status === STATUS.PUBLISHED ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                    {n.status === STATUS.PUBLISHED ? "Published" : "Draft"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-bold text-slate-900">Aktivitas Terbaru</h2>
          {recentActivities.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">Belum ada aktivitas tercatat.</p>
          ) : (
            <ul className="mt-4 divide-y divide-slate-100">
              {recentActivities.map((a) => (
                <li key={a.id} className="py-3">
                  <p className="text-sm text-slate-800">{a.description}</p>
                  <p className="text-xs text-slate-500">
                    {new Date(a.timestamp).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}
                  </p>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-3 text-xs text-slate-400">Log hanya mencatat aktivitas di browser ini (simulasi).</p>
        </section>
      </div>
    </div>
  );
}
