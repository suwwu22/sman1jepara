import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const CONFIG_ERROR =
  "Konfigurasi Supabase belum diisi. Buat file .env.local (lihat .env.local.example) lalu jalankan ulang npm run dev.";

export const supabaseReady = Boolean(url && key);

// Hanya memakai anon key (aman di frontend). Hak akses diatur oleh Row Level Security di database.
export const supabase = supabaseReady ? createClient(url, key) : null;
