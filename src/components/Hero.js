"use client";

import Image from "next/image";
import Link from "next/link";
import { useProfile } from "@/lib/hooks";

export default function Hero() {
  const { profile } = useProfile();
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/sekolah.jpg"
        alt="Gedung SMA Negeri 1 Jepara"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-blue-950/70" />
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-200">{profile.name}</p>
        <h1 className="mt-3 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
          {profile.tagline}
        </h1>
        <p className="mt-5 max-w-xl text-base text-blue-100 sm:text-lg">{profile.description}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/about"
            className="rounded-full bg-white px-6 py-3 text-center font-semibold text-blue-900 transition duration-200 hover:bg-blue-50"
          >
            Kenali Sekolah
          </Link>
          <Link
            href="/berita"
            className="rounded-full border border-white px-6 py-3 text-center font-semibold text-white transition duration-200 hover:bg-white/10"
          >
            Lihat Berita
          </Link>
        </div>
      </div>
    </section>
  );
}
