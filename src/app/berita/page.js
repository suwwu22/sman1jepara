import SectionTitle from "@/components/SectionTitle";
import BeritaList from "@/components/BeritaList";

export const metadata = {
  title: "Berita | SMA Negeri 1 Jepara",
  description: "Berita sekolah, kegiatan, dan prestasi siswa SMA Negeri 1 Jepara.",
};

export default function BeritaPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <SectionTitle as="h1" title="Berita Sekolah" subtitle="Berita sekolah, kegiatan ekstrakurikuler, dan prestasi siswa." />
      <BeritaList />
    </div>
  );
}
