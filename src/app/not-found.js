import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-blue-900">Halaman tidak ditemukan</h1>
      <p className="mt-3 text-slate-600">Berita atau halaman yang Anda cari tidak tersedia.</p>
      <Link href="/berita" className="mt-6 inline-block rounded-full bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800">
        Kembali ke Berita
      </Link>
    </div>
  );
}
