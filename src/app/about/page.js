import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";

export const metadata = {
  title: "About | SMA Negeri 1 Jepara",
  description: "Profil, sejarah, visi, misi, dan fasilitas SMA Negeri 1 Jepara.",
};

const misi = [
  "Melaksanakan proses pembelajaran secara efektif sehingga siswa berkembang secara optimal untuk meraih prestasi terbaik.",
  "Mengembangkan potensi siswa sesuai dengan bakat dan minat yang dimiliki agar meraih prestasi optimal.",
  "Mengembangkan kegiatan yang mendorong siswa berpikir kreatif dan mampu berkarya inovatif.",
  "Menumbuhkan sikap santun dalam bertutur kata dan berperilaku.",
  "Meningkatkan pengetahuan dan memperluas wawasan agar mampu menghadapi persaingan global.",
  "Menanamkan sikap jujur pada setiap individu dan tekun melaksanakan ibadah sesuai dengan agama dan keyakinannya.",
];

const fasilitas = [
  "Perpustakaan",
  "Laboratorium Biologi, Fisika, Kimia",
  "4 Laboratorium Komputer",
  "Aula",
  "Ruang Multimedia (Serbaguna)",
  "Sport Center",
  "Ruang UKS",
  "Ruang Ibadah Muslim, Kristen, dan Katolik",
  "Wi-Fi di 40 titik",
  "4 Kantin",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <SectionTitle title="Tentang SMA Negeri 1 Jepara" subtitle="Cerdas Kreatif Santun" />

      <section className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold text-blue-900">Profil Sekolah</h2>
          <p className="mt-3 leading-relaxed text-slate-600">
            SMA Negeri 1 Jepara adalah sekolah menengah atas negeri di Jepara, Jawa Tengah. Masa belajar
            ditempuh selama tiga tahun, mulai Kelas X sampai Kelas XII. Saat ini sekolah memiliki 1.184
            siswa aktif dan 72 tenaga pendidik.
          </p>
        </div>
        <div className="relative h-64 overflow-hidden rounded-2xl bg-blue-50">
          <Image src="/sekolah.jpg" alt="Gedung SMA Negeri 1 Jepara" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      </section>

      <section className="mt-14 rounded-2xl bg-blue-50 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-blue-900">Sejarah</h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          SMA Negeri 1 Jepara didirikan pada 1 Agustus 1963 dan menjadi salah satu SMA negeri di Provinsi
          Jawa Tengah. Izin operasional sekolah tercatat bertanggal 31 Juli 1964.
        </p>
      </section>

      <section className="mt-14 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-blue-900">Visi</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Terwujudnya lulusan yang bertakwa kepada Tuhan Yang Maha Esa, unggul dalam prestasi, kreatif,
            santun, dan berwawasan global.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-blue-900">Misi</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
            {misi.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-14 flex flex-col items-center gap-6 rounded-2xl border border-slate-200 p-6 shadow-sm sm:flex-row">
        <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full bg-blue-50">
          <Image src="/kepala-sekolah.jpg" alt="Foto Kepala Sekolah" fill sizes="128px" className="object-cover" />
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-bold text-blue-900">Kepala Sekolah</h2>
          <p className="mt-2 font-semibold text-slate-900">Dra. Puji Rahayu, M.Pd.</p>
          <p className="text-slate-600">Kepala Sekolah SMA Negeri 1 Jepara</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-bold text-blue-900">Fasilitas</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {fasilitas.map((f) => (
            <li key={f} className="rounded-xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-900">
              {f}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-bold text-blue-900">Alamat</h2>
        <address className="mt-3 not-italic leading-relaxed text-slate-700">
          Jl. CS Tubun No. 1,
          <br />
          Demaan, Kecamatan Jepara,
          <br />
          Kabupaten Jepara,
          <br />
          Jawa Tengah
        </address>
      </section>
    </div>
  );
}
