import { supabase, CONFIG_ERROR } from "@/lib/supabase";
import { logActivity } from "@/lib/activity";

export const CATEGORIES = ["Berita Sekolah", "Kegiatan Ekstrakurikuler", "Prestasi Siswa"];
export const STATUS = { DRAFT: "draft", PUBLISHED: "published" };

const TABLE = "berita";

const BULAN = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

export function todayISO() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

// "2026-10-05" -> "5 Oktober 2026"
export function toIndoDate(iso) {
  const [y, m, d] = String(iso).split("-").map(Number);
  if (!y || !m || !d || !BULAN[m - 1]) return "";
  return `${d} ${BULAN[m - 1]} ${y}`;
}

// "5 Oktober 2026" -> "2026-10-05"
export function fromIndoDate(text) {
  const match = /(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/.exec(String(text));
  if (!match) return "";
  const index = BULAN.findIndex((b) => b.toLowerCase() === match[2].toLowerCase());
  if (index === -1) return "";
  return `${match[3]}-${String(index + 1).padStart(2, "0")}-${match[1].padStart(2, "0")}`;
}

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}

export function sortNews(list) {
  return [...list].sort((a, b) => (b.dateISO || "").localeCompare(a.dateISO || ""));
}

// Baris database (snake_case) -> objek aplikasi
export function fromRow(r) {
  return {
    id: r.id,
    title: r.title,
    dateISO: r.date_iso,
    date: toIndoDate(r.date_iso),
    category: r.category,
    image: r.image,
    excerpt: r.excerpt,
    content: r.content,
    status: r.status,
    createdAt: r.created_at,
  };
}

// Objek aplikasi -> baris database (tanpa id dan created_at)
export function toRow(item) {
  return {
    title: item.title,
    date_iso: item.dateISO,
    category: item.category,
    image: item.image,
    excerpt: item.excerpt,
    content: item.content,
    status: item.status,
  };
}

const orderBy = (query) =>
  query.order("date_iso", { ascending: false }).order("created_at", { ascending: false });

// Admin (sudah login) melihat semua berita; pengunjung hanya melihat yang published (diatur RLS).
export async function fetchAllNews() {
  if (!supabase) return { data: [], error: CONFIG_ERROR };
  const { data, error } = await orderBy(supabase.from(TABLE).select("*"));
  return error ? { data: [], error: error.message } : { data: data.map(fromRow), error: null };
}

export async function fetchPublishedNews(limit) {
  if (!supabase) return { data: [], error: CONFIG_ERROR };
  let query = orderBy(supabase.from(TABLE).select("*").eq("status", STATUS.PUBLISHED));
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  return error ? { data: [], error: error.message } : { data: data.map(fromRow), error: null };
}

export async function fetchPublishedNewsById(id) {
  if (!supabase) return { data: null, error: CONFIG_ERROR };
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .eq("status", STATUS.PUBLISHED)
    .maybeSingle();
  if (error) return { data: null, error: error.message };
  return { data: data ? fromRow(data) : null, error: null };
}

export async function addNews(item) {
  if (!supabase) return { ok: false, error: CONFIG_ERROR };
  const { error } = await supabase.from(TABLE).insert({ id: item.id, ...toRow(item) });
  if (error) {
    return {
      ok: false,
      error: error.code === "23505" ? "Slug sudah dipakai berita lain." : `Gagal menyimpan: ${error.message}`,
    };
  }
  logActivity("CREATE_NEWS", `Menambahkan berita "${item.title}"`);
  return { ok: true };
}

export async function updateNews(id, values) {
  if (!supabase) return { ok: false, error: CONFIG_ERROR };
  const { data, error } = await supabase.from(TABLE).update(toRow(values)).eq("id", id).select("id");
  if (error) return { ok: false, error: `Gagal memperbarui: ${error.message}` };
  if (!data || data.length === 0) {
    return { ok: false, error: "Gagal memperbarui: berita tidak ditemukan atau Anda belum login." };
  }
  logActivity("UPDATE_NEWS", `Mengedit berita "${values.title}"`);
  return { ok: true };
}

export async function setNewsStatus(item, status) {
  if (!supabase) return { ok: false, error: CONFIG_ERROR };
  const { data, error } = await supabase.from(TABLE).update({ status }).eq("id", item.id).select("id");
  if (error) return { ok: false, error: `Gagal mengubah status: ${error.message}` };
  if (!data || data.length === 0) return { ok: false, error: "Gagal mengubah status: tidak ada izin." };
  const label = status === STATUS.PUBLISHED ? "Published" : "Draft";
  logActivity("STATUS_NEWS", `Mengubah status "${item.title}" menjadi ${label}`);
  return { ok: true };
}

export async function deleteNews(item) {
  if (!supabase) return { ok: false, error: CONFIG_ERROR };
  const { data, error } = await supabase.from(TABLE).delete().eq("id", item.id).select("id");
  if (error) return { ok: false, error: `Gagal menghapus: ${error.message}` };
  if (!data || data.length === 0) return { ok: false, error: "Gagal menghapus: tidak ada izin." };
  logActivity("DELETE_NEWS", `Menghapus berita "${item.title}"`);
  return { ok: true };
}
