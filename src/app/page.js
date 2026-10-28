import Link from "next/link";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import StatCard from "@/components/StatCard";
import VisiCard from "@/components/VisiCard";
import BeritaTerbaru from "@/components/BeritaTerbaru";

const statistik = [
  { value: "1.184", label: "Siswa Aktif" },
  { value: "72", label: "Tenaga Pendidik" },
  { value: "36", label: "Ruang Kelas" },
  { value: "38", label: "Ekstrakurikuler" },
  { value: "150+", label: "Prestasi Tahunan" },
  { value: "6", label: "Laboratorium" },
];

const sorotan = [
  { title: "Prestasi Siswa", text: "Medali dari kompetisi matematika nasional dan kejuaraan finswimming tingkat provinsi." },
  { title: "Kegiatan Ekstrakurikuler", text: "38 ekstrakurikuler, dari olimpiade sains, seni, hingga olahraga dan kewirausahaan." },
  { title: "Karakter dan Kepedulian", text: "Simulasi tanggap bencana dan kegiatan literasi nilai Pancasila serta kesehatan." },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-blue-900 sm:text-3xl">Mengenal SMA Negeri 1 Jepara</h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              SMA Negeri 1 Jepara berdiri pada 1 Agustus 1963 dan menjadi salah satu SMA negeri di Provinsi
              Jawa Tengah. Siswa menempuh pendidikan selama tiga tahun, dari Kelas X sampai Kelas XII.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-block rounded-full bg-blue-700 px-6 py-3 font-semibold text-white transition duration-200 hover:bg-blue-800"
            >
              Selengkapnya
            </Link>
          </div>
          <VisiCard />
        </div>
      </section>

      <section className="bg-blue-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle title="Sekolah dalam Angka" subtitle="Gambaran singkat SMA Negeri 1 Jepara saat ini." center />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {statistik.map((s) => (
              <StatCard key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionTitle title="Berita Terbaru" subtitle="Kabar terkini dari lingkungan sekolah." />
        <BeritaTerbaru limit={3} />
        <div className="mt-10 text-center">
          <Link
            href="/berita"
            className="inline-block rounded-full border border-blue-700 px-6 py-3 font-semibold text-blue-700 transition duration-200 hover:bg-blue-700 hover:text-white"
          >
            Lihat Semua Berita
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <SectionTitle title="Prestasi dan Kegiatan" />
        <div className="grid gap-6 md:grid-cols-3">
          {sorotan.map((s) => (
            <div key={s.title} className="rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-blue-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl bg-blue-700 px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-2xl font-bold sm:text-3xl">Ingin tahu lebih banyak tentang sekolah kami?</h2>
          <p className="mx-auto mt-3 max-w-xl text-blue-100">
            Baca profil, visi, misi, dan fasilitas SMA Negeri 1 Jepara.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-semibold text-blue-800 transition duration-200 hover:bg-blue-50"
          >
            Kenali Sekolah
          </Link>
        </div>
      </section>
    </>
  );
}
