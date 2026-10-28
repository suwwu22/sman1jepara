"use client";

import { useState } from "react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { useToast } from "@/components/admin/Toast";
import { saveSettings } from "@/lib/auth";
import { logActivity } from "@/lib/activity";
import { useAdminSettings, useSession } from "@/lib/hooks";
import { KEYS, removeData } from "@/lib/storage";

const inputCls =
  "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

function SettingsForm({ initialName }) {
  const { showToast } = useToast();
  const [name, setName] = useState(initialName);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.trim().length < 3) {
      setError("Nama tampilan minimal 3 karakter.");
      return;
    }
    setError("");
    const result = saveSettings({ displayName: name.trim() });
    if (result.ok) showToast("Pengaturan berhasil disimpan.");
    else showToast(result.error, "error");
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="font-bold text-slate-900">Nama Tampilan Administrator</h2>
      <label htmlFor="displayName" className="mt-4 block text-sm font-semibold text-slate-700">Nama tampilan</label>
      <input id="displayName" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      <button type="submit" className="mt-4 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-blue-800">
        Simpan
      </button>
    </form>
  );
}

export default function AdminPengaturanPage() {
  const settings = useAdminSettings();
  const { session } = useSession();
  const { showToast } = useToast();
  const [confirmReset, setConfirmReset] = useState(false);

  const handleResetLocal = () => {
    [KEYS.profile, KEYS.activity, KEYS.settings].forEach(removeData);
    logActivity("RESET_DATA", "Mereset data lokal (profil, pengaturan, log)");
    setConfirmReset(false);
    showToast("Data lokal dikembalikan ke data awal.");
  };

  return (
    <div className="max-w-2xl space-y-6">
      <SettingsForm key={settings.displayName} initialName={settings.displayName} />

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="font-bold text-slate-900">Akun Admin</h2>
        <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm text-slate-700">
          <dt className="font-semibold">Email</dt>
          <dd>{session?.email}</dd>
          <dt className="font-semibold">Autentikasi</dt>
          <dd>Supabase Authentication</dd>
        </dl>
        <p className="mt-3 text-xs leading-relaxed text-slate-500">
          Data berita disimpan di database Supabase. Profil sekolah, pengaturan tampilan, dan log aktivitas
          masih disimpan di localStorage browser ini.
        </p>
      </section>

      <section className="rounded-xl border border-red-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="font-bold text-red-700">Reset Data Lokal</h2>
        <p className="mt-2 text-sm text-slate-600">
          Menghapus perubahan profil sekolah, pengaturan tampilan, dan log aktivitas di browser ini. Data berita di
          Supabase tidak ikut terhapus.
        </p>
        <button type="button" onClick={() => setConfirmReset(true)} className="mt-4 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-red-700">
          Reset Data Lokal
        </button>
      </section>

      <ConfirmDialog
        open={confirmReset}
        title="Reset data lokal?"
        message="Perubahan profil, pengaturan tampilan, dan log aktivitas di browser ini akan hilang. Berita di Supabase tidak terpengaruh."
        confirmLabel="Ya, reset"
        onConfirm={handleResetLocal}
        onCancel={() => setConfirmReset(false)}
      />
    </div>
  );
}
