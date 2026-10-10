import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 bg-blue-950 text-blue-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold text-white">SMAN 1 Jepara</h3>
          <p className="mt-2 text-sm">Cerdas Kreatif Santun</p>
        </div>
        <div className="text-sm leading-relaxed">
          <h3 className="mb-2 font-semibold text-white">Alamat dan Kontak</h3>
          <p>
            Jl. CS Tubun No. 1,
            <br />
            Demaan, Kecamatan Jepara,
            <br />
            Kabupaten Jepara,
            <br />
            Jawa Tengah
          </p>
          <p className="mt-3">(0291) 591148</p>
          <p>info@sman1jepara.sch.id</p>
        </div>
        <div className="text-sm leading-relaxed">
          <h3 className="mb-2 font-semibold text-white">Jam Layanan</h3>
          <p>Senin - Jumat</p>
          <p>07.00 - 15.30 WIB</p>
          <ul className="mt-4 flex gap-4">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/berita" className="hover:text-white">Berita</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-blue-900 py-4 text-center text-xs text-blue-300">
        © 2026 SMA Negeri 1 Jepara. Proyek frontend untuk tugas kuliah.
      </div>
    </footer>
  );
}
