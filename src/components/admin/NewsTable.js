"use client";

import Link from "next/link";
import NewsImage from "@/components/NewsImage";
import { STATUS } from "@/lib/news";

export default function NewsTable({ items, onDelete, onToggleStatus }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[820px] text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">No</th>
            <th className="px-4 py-3">Gambar</th>
            <th className="px-4 py-3">Judul</th>
            <th className="px-4 py-3">Kategori</th>
            <th className="px-4 py-3">Tanggal</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((item, i) => {
            const published = item.status === STATUS.PUBLISHED;
            return (
              <tr key={item.id} className="align-top">
                <td className="px-4 py-3 text-slate-500">{i + 1}</td>
                <td className="px-4 py-3">
                  <NewsImage src={item.image} alt={item.title} className="h-12 w-20 rounded-md object-cover" />
                </td>
                <td className="max-w-xs px-4 py-3 font-semibold text-slate-900">{item.title}</td>
                <td className="px-4 py-3 text-slate-600">{item.category}</td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-600">{item.date}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      published ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-x-3 gap-y-1 font-semibold">
                    {published ? (
                      <Link href={`/berita/${item.id}`} className="text-blue-700 hover:underline">Lihat</Link>
                    ) : (
                      <span className="cursor-not-allowed text-slate-400" title="Draft tidak tampil di website publik">
                        Lihat
                      </span>
                    )}
                    <Link href={`/admin/berita/edit/${item.id}`} className="text-blue-700 hover:underline">Edit</Link>
                    <button type="button" onClick={() => onToggleStatus(item)} className="text-slate-700 hover:underline">
                      {published ? "Jadikan Draft" : "Publikasikan"}
                    </button>
                    <button type="button" onClick={() => onDelete(item)} className="text-red-600 hover:underline">Hapus</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
