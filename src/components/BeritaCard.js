import Image from "next/image";
import Link from "next/link";

export default function BeritaCard({ id, title, date, category, image, excerpt }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:shadow-lg">
      <div className="relative h-48 w-full bg-blue-50">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="rounded-full bg-blue-100 px-3 py-1 font-semibold text-blue-800">
            {category}
          </span>
          <span className="text-slate-500">{date}</span>
        </div>
        <h3 className="mt-3 text-lg font-bold leading-snug text-slate-900">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{excerpt}</p>
        <Link
          href={`/berita/${id}`}
          className="mt-4 inline-block text-sm font-semibold text-blue-700 transition duration-200 hover:text-blue-900"
        >
          Baca Selengkapnya
        </Link>
      </div>
    </article>
  );
}
