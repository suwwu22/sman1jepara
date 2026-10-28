import BeritaDetail from "@/components/BeritaDetail";
import seed from "@/data/berita";

// Data seed hanya dipakai untuk metadata dan pra-render awal.
// Isi halaman dibaca dari localStorage di sisi klien (BeritaDetail).
export function generateStaticParams() {
  return seed.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const item = seed.find((b) => b.id === id);
  return {
    title: item ? `${item.title} | SMA Negeri 1 Jepara` : "Berita | SMA Negeri 1 Jepara",
    description: item ? item.excerpt : "Berita SMA Negeri 1 Jepara.",
  };
}

export default async function DetailBeritaPage({ params }) {
  const { id } = await params;
  return <BeritaDetail id={id} />;
}
