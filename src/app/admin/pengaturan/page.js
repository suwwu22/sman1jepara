"use client";

import { useState } from "react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { useToast } from "@/components/admin/Toast";
import { DEMO_ADMIN, saveSettings } from "@/lib/auth";
import { logActivity } from "@/lib/activity";
import { useAdminSettings } from "@/lib/hooks";
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
  const { showToast } = useToast();
  const [confirmReset, setConfirmReset] = useState(false);

  const handleResetAll = () => {
    [KEYS.news, KEYS.profile, KEYS.activity, KEYS.settings].forEach(removeData);
    logActivity("RESET_DATA", "Mereset seluruh data simulasi ke data awal");
    setConfirmReset(false);
    showToast("Seluruh data simulasi dikembalikan ke data awal.");
  };

  return (
    <div className="max-w-2xl space-y-6">
      <SettingsForm key={settings.displayName} initialName={settings.displayName} />

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="font-bold text-slate-900">Informasi Akun Demo</h2>
        <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm text-slate-700">
          <dt className="font-semibold">Username</dt>
          <dd><code>{DEMO_ADMIN.username}</code></dd>
          <dt className="font-semibold">Password</dt>
          <dd><code>{DEMO_ADMIN.password}</code></dd>
        </dl>
        <p className="mt-3 text-xs leading-relaxed text-slate-500">
          Autentikasi ini hanya simulasi di sisi klien. Kredensial berada di kode frontend sehingga tidak aman untuk
          produksi. Seluruh data disimpan di localStorage browser ini saja.
        </p>
      </section>

      <section className="rounded-xl border border-red-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="font-bold text-red-700">Reset Data Simulasi</h2>
        <p className="mt-2 text-sm text-slate-600">
          Menghapus semua perubahan berita, profil, pengaturan, dan log aktivitas, lalu mengembalikannya ke data awal.
        </p>
        <button type="button" onClick={() => setConfirmReset(true)} className="mt-4 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-red-700">
          Reset Semua Data
        </button>
      </section>

      <ConfirmDialog
        open={confirmReset}
        title="Reset seluruh data simulasi?"
        message="Berita yang Anda tambah, edit, atau hapus serta perubahan profil akan hilang dan kembali ke data awal. Tindakan ini tidak dapat dibatalkan."
        confirmLabel="Ya, reset"
        onConfirm={handleResetAll}
        onCancel={() => setConfirmReset(false)}
      />
    </div>
  );
}
