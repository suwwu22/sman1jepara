import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import berita from "@/data/berita";

export function generateStaticParams() {
  return berita.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const item = berita.find((b) => b.id === id);
  return {
    title: item ? `${item.title} | SMA Negeri 1 Jepara` : "Berita tidak ditemukan",
    description: item ? item.excerpt : undefined,
  };
}

export default async function DetailBeritaPage({ params }) {
  const { id } = await params;
  const item = berita.find((b) => b.id === id);

  if (!item) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-blue-700">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/berita" className="hover:text-blue-700">Berita</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{item.category}</span>
      </nav>

      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
        {item.category}
      </span>
      <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">{item.title}</h1>
      <p className="mt-2 text-sm text-slate-500">{item.date}</p>

      <div className="relative mt-6 h-56 overflow-hidden rounded-2xl bg-blue-50 sm:h-80">
        <Image src={item.image} alt={item.title} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
      </div>

      <div className="mt-8 space-y-4 leading-relaxed text-slate-700">
        {item.content.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <Link
        href="/berita"
        className="mt-10 inline-block rounded-full bg-blue-700 px-6 py-3 font-semibold text-white transition duration-200 hover:bg-blue-800"
      >
        Kembali ke Berita
      </Link>
    </article>
  );
}
