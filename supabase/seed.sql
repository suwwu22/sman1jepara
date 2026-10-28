-- Data awal 6 berita (opsional). Jalankan setelah schema.sql.
insert into public.berita (id, title, date_iso, category, image, excerpt, content, status) values
  ('kusta-bukan-kutukan', 'Kusta Bukan Kutukan, Penyintas Tak Boleh Dikucilkan', '2026-10-05', 'Berita Sekolah', '/berita/berita-1.jpg', 'Siswa diajak memahami fakta medis tentang kusta dan ikut menghapus stigma terhadap para penyintas.', 'Kegiatan ini mengajak para pelajar mengenal kusta dari sisi medis, sehingga pemahaman yang keliru di masyarakat dapat diluruskan.

Siswa juga didorong untuk menjadi agen perubahan, yaitu dengan tidak mengucilkan penyintas dan membantu menghentikan diskriminasi di lingkungan sekitar.', 'published'),
  ('dilantik-pengurus-osis-mpk', 'Dilantik, Pengurus OSIS-MPK Dipesan Lanjutkan Perjuangan', '2026-10-05', 'Berita Sekolah', '/berita/berita-2.jpg', 'Pengurus baru OSIS-MPK diminta ikhlas berkegiatan serta menjaga kesehatan agar tugas berjalan optimal.', 'Pengurus OSIS-MPK yang baru dilantik diberi pesan untuk melanjutkan perjuangan para pendahulunya.

Mereka juga diingatkan agar berkegiatan dengan ikhlas dan menjaga kesehatan serta kewarasan, supaya dapat menjalankan tugas dengan baik.', 'published'),
  ('medali-perak-kompetisi-matematika', 'Medali Perak Kompetisi Matematika Nasional Unisma', '2026-10-05', 'Prestasi Siswa', '/berita/berita-3.jpg', 'Rafada Al-Ghaniyy meraih medali perak pada Kompetisi Matematika Nasional Paket Hari Ilmiah XXV Unisma.', 'Siswa SMA Negeri 1 Jepara, Rafada Al-Ghaniyy, meraih Medali Perak dalam Kompetisi Matematika Nasional Paket Hari Ilmiah XXV Unisma.

Capaian ini menambah daftar prestasi siswa di bidang akademik.', 'published'),
  ('simulasi-tanggap-bencana', 'Bangun Budaya Siaga, SMAN 1 Jepara Gelar Simulasi Tanggap Bencana', '2026-10-02', 'Berita Sekolah', '/berita/berita-4.jpg', 'Simulasi tanggap bencana digelar bersama fasilitator Dompet Dhuafa pada Jumat, 2 Oktober.', 'SMA Negeri 1 Jepara menyelenggarakan simulasi tanggap bencana bersama fasilitator dari Dompet Dhuafa pada Jumat, 2 Oktober.

Kegiatan ini bertujuan membangun budaya siaga di lingkungan sekolah.', 'published'),
  ('pancasila-diamalkan', 'Pancasila Harus Diamalkan, Bukan Sekadar Dihafalkan', '2026-10-01', 'Berita Sekolah', '/berita/berita-5.jpg', 'Nilai Pancasila perlu diwujudkan dalam tindakan nyata, termasuk lewat kepatuhan pada kesepakatan sekolah.', 'Pesan utama kegiatan ini adalah bahwa Pancasila tidak cukup dihafalkan, tetapi harus dipraktikkan dalam kehidupan sehari-hari.

Salah satu wujudnya adalah mematuhi berbagai kesepakatan yang berlaku di sekolah.', 'published'),
  ('juara-kejurprov-finswimming', 'Juara Kejurprov Finswimming Piala Walikota Pekalongan', '2026-09-29', 'Prestasi Siswa', '/berita/berita-6.jpg', 'Huda Fahrizal Mulia membawa pulang 3 medali perak dan 2 perunggu dari Kejurprov Finswimming.', 'Huda Fahrizal Mulia, siswa SMA Negeri 1 Jepara, meraih 3 medali perak dan 2 medali perunggu dalam Kejurprov Finswimming Piala Walikota Pekalongan.

Kejuaraan tersebut berlangsung pada 26–27 September.', 'published')
on conflict (id) do nothing;
