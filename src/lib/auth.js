// Autentikasi SIMULASI di sisi klien. TIDAK AMAN untuk produksi:
// kode frontend dapat dibaca dan dimodifikasi oleh pengguna.
import { KEYS, readData, removeData, saveData } from "@/lib/storage";
import { logActivity } from "@/lib/activity";

// Kredensial demo dikonfigurasi di satu tempat ini saja.
export const DEMO_ADMIN = {
  username: "admin",
  password: "Admin123!",
};

export const DEFAULT_SETTINGS = {
  displayName: "Administrator",
};

export function login(username, password) {
  if (username.trim() === DEMO_ADMIN.username && password === DEMO_ADMIN.password) {
    // Password tidak disimpan di localStorage.
    const result = saveData(KEYS.session, {
      authenticated: true,
      username: DEMO_ADMIN.username,
      loggedInAt: new Date().toISOString(),
    });
    if (!result.ok) return result;
    logActivity("LOGIN", "Login berhasil");
    return { ok: true };
  }
  return { ok: false, error: "Username atau password salah." };
}

export function logout() {
  logActivity("LOGOUT", "Logout");
  removeData(KEYS.session);
}

export function saveSettings(settings) {
  const result = saveData(KEYS.settings, settings);
  if (result.ok) logActivity("UPDATE_SETTINGS", "Memperbarui pengaturan admin");
  return result;
}

export function getSettings() {
  return { ...DEFAULT_SETTINGS, ...readData(KEYS.settings, {}) };
}
