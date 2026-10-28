"use client";

import BeritaTerbaru from "@/components/BeritaTerbaru";

// Daftar seluruh berita Published (tanpa batas jumlah).
export default function BeritaList() {
  return <BeritaTerbaru limit={null} />;
}
