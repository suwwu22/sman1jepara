# Admin Dashboard + Supabase

- Berita: tabel `berita` di Supabase (schema: supabase/schema.sql, data awal: supabase/seed.sql).
- Login admin: Supabase Authentication (email + password) di /admin/login.
- Pengunjung hanya dapat membaca berita berstatus published (Row Level Security).
- Profil sekolah, pengaturan tampilan, dan log aktivitas masih disimpan di localStorage browser.
- Konfigurasi: salin .env.local.example menjadi .env.local, isi URL dan anon key Supabase.
- Jalankan: npm install @supabase/supabase-js, lalu npm run dev.
