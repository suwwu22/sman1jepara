import SectionTitle from "@/components/SectionTitle";
import BeritaCard from "@/components/BeritaCard";
import berita from "@/data/berita";

export const metadata = {
  title: "Berita | SMA Negeri 1 Jepara",
  description: "Berita sekolah, kegiatan, dan prestasi siswa SMA Negeri 1 Jepara.",
};

export default function BeritaPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <SectionTitle title="Berita Sekolah" subtitle="Berita sekolah, kegiatan ekstrakurikuler, dan prestasi siswa." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {berita.map((b) => (
          <BeritaCard key={b.id} {...b} />
        ))}
      </div>
    </div>
  );
}
