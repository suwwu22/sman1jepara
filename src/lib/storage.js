// Modul penyimpanan localStorage (hanya dijalankan di browser).
export const KEYS = {
  news: "sman1jepara_news",
  profile: "sman1jepara_profile",
  session: "sman1jepara_admin_session",
  settings: "sman1jepara_admin_settings",
  activity: "sman1jepara_activity_logs",
};

export const CHANGE_EVENT = "sman1jepara:storage-change";

const isBrowser = () => typeof window !== "undefined";

export function parseJSON(raw) {
  if (raw === null || raw === undefined) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null; // JSON rusak dianggap tidak ada
  }
}

export function readRaw(key) {
  if (!isBrowser()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

// Membaca data; mengembalikan fallback jika key belum ada atau JSON rusak.
export function readData(key, fallback = null) {
  const value = parseJSON(readRaw(key));
  return value === null || value === undefined ? fallback : value;
}

function notify() {
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

// Menyimpan data; mengembalikan { ok, error }.
export function saveData(key, value) {
  if (!isBrowser()) return { ok: false, error: "Penyimpanan hanya tersedia di browser." };
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    notify();
    return { ok: true };
  } catch (e) {
    const penuh = e && (e.name === "QuotaExceededError" || e.code === 22 || e.code === 1014);
    return {
      ok: false,
      error: penuh
        ? "Penyimpanan browser penuh. Kurangi ukuran gambar atau hapus data lama."
        : "Gagal menyimpan data ke browser.",
    };
  }
}

export function updateData(key, updater, fallback = null) {
  return saveData(key, updater(readData(key, fallback)));
}

export function removeData(key) {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // diabaikan
  }
  notify();
}
