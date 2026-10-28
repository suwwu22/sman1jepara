"use client";

import Link from "next/link";
import { useProfile } from "@/lib/hooks";

export default function Footer() {
  const { profile } = useProfile();
  return (
    <footer className="mt-16 bg-blue-950 text-blue-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold text-white">{profile.name}</h3>
          <p className="mt-2 text-sm">{profile.tagline}</p>
        </div>
        <div className="text-sm leading-relaxed">
          <h3 className="mb-2 font-semibold text-white">Alamat dan Kontak</h3>
          <p className="whitespace-pre-line">{profile.address}</p>
          <p className="mt-3">{profile.phone}</p>
          <p>{profile.email}</p>
        </div>
        <div className="text-sm leading-relaxed">
          <h3 className="mb-2 font-semibold text-white">Jam Layanan</h3>
          <p className="whitespace-pre-line">{profile.hours}</p>
          <ul className="mt-4 flex gap-4">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/berita" className="hover:text-white">Berita</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-blue-900 py-4 text-center text-xs text-blue-300">
        © 2026 {profile.name}. Proyek frontend untuk tugas kuliah.
      </div>
    </footer>
  );
}
