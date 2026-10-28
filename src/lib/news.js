import seed from "@/data/berita";
import { KEYS, readData, saveData } from "@/lib/storage";
import { logActivity } from "@/lib/activity";

export const CATEGORIES = ["Berita Sekolah", "Kegiatan Ekstrakurikuler", "Prestasi Siswa"];
export const STATUS = { DRAFT: "draft", PUBLISHED: "published" };

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

// Data statis src/data/berita.js dipakai sebagai data awal (seed).
export function buildSeedNews() {
  return seed.map((b) => {
    const dateISO = fromIndoDate(b.date);
    return {
      id: b.id,
      title: b.title,
      date: b.date,
      dateISO,
      category: b.category,
      image: b.image,
      excerpt: b.excerpt,
      content: Array.isArray(b.content) ? b.content.join("\n\n") : String(b.content),
      status: STATUS.PUBLISHED,
      createdAt: dateISO,
    };
  });
}

// Salin seed ke localStorage hanya jika key belum ada (atau JSON rusak).
export function ensureSeedNews() {
  if (!Array.isArray(readData(KEYS.news, null))) {
    saveData(KEYS.news, buildSeedNews());
  }
}

export function getNews() {
  const data = readData(KEYS.news, null);
  return Array.isArray(data) ? data : buildSeedNews();
}

export function sortNews(list) {
  return [...list].sort((a, b) => (b.dateISO || "").localeCompare(a.dateISO || ""));
}

export function publishedNews(list) {
  return sortNews(list.filter((n) => n.status === STATUS.PUBLISHED));
}

export function isSlugTaken(slug, excludeId, list) {
  return list.some((n) => n.id === slug && n.id !== excludeId);
}

export function addNews(item) {
  const current = getNews();
  if (isSlugTaken(item.id, null, current)) {
    return { ok: false, error: "Slug sudah dipakai berita lain." };
  }
  const result = saveData(KEYS.news, [item, ...current]);
  if (result.ok) logActivity("CREATE_NEWS", `Menambahkan berita "${item.title}"`);
  return result;
}

export function updateNews(id, changes) {
  const current = getNews();
  const index = current.findIndex((n) => n.id === id);
  if (index === -1) return { ok: false, error: "Berita tidak ditemukan." };
  const next = [...current];
  next[index] = { ...current[index], ...changes, id };
  const result = saveData(KEYS.news, next);
  if (result.ok) logActivity("UPDATE_NEWS", `Mengedit berita "${next[index].title}"`);
  return result;
}

export function setNewsStatus(id, status) {
  const current = getNews();
  const index = current.findIndex((n) => n.id === id);
  if (index === -1) return { ok: false, error: "Berita tidak ditemukan." };
  const next = [...current];
  next[index] = { ...current[index], status };
  const result = saveData(KEYS.news, next);
  if (result.ok) {
    const label = status === STATUS.PUBLISHED ? "Published" : "Draft";
    logActivity("STATUS_NEWS", `Mengubah status "${next[index].title}" menjadi ${label}`);
  }
  return result;
}

export function deleteNews(id) {
  const current = getNews();
  const target = current.find((n) => n.id === id);
  if (!target) return { ok: false, error: "Berita tidak ditemukan." };
  const result = saveData(KEYS.news, current.filter((n) => n.id !== id));
  if (result.ok) logActivity("DELETE_NEWS", `Menghapus berita "${target.title}"`);
  return result;
}
