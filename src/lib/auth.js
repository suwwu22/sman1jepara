// Login admin memakai Supabase Authentication (email + password).
import { supabase, CONFIG_ERROR } from "@/lib/supabase";
import { KEYS, readData, saveData } from "@/lib/storage";
import { logActivity } from "@/lib/activity";

export const DEFAULT_SETTINGS = {
  displayName: "Administrator",
};

export async function login(email, password) {
  if (!supabase) return { ok: false, error: CONFIG_ERROR };
  const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
  if (error) {
    const invalid = /invalid|credentials/i.test(error.message || "");
    return { ok: false, error: invalid ? "Email atau password salah." : `Login gagal: ${error.message}` };
  }
  logActivity("LOGIN", "Login berhasil");
  return { ok: true };
}

export async function logout() {
  logActivity("LOGOUT", "Logout");
  if (supabase) await supabase.auth.signOut();
}

// Pengaturan tampilan (nama tampilan) tetap disimpan lokal di browser.
export function saveSettings(settings) {
  const result = saveData(KEYS.settings, settings);
  if (result.ok) logActivity("UPDATE_SETTINGS", "Memperbarui pengaturan admin");
  return result;
}

export function getSettings() {
  return { ...DEFAULT_SETTINGS, ...readData(KEYS.settings, {}) };
}
