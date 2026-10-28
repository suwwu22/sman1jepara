"use client";

import { useState } from "react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { useToast } from "@/components/admin/Toast";
import { useProfile } from "@/lib/hooks";
import { resetProfile, saveProfile } from "@/lib/profile";

const inputCls =
  "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

function Field({ label, id, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function ProfileForm({ initial, onReset }) {
  const { showToast } = useToast();
  const [form, setForm] = useState({
    name: initial.name,
    tagline: initial.tagline,
    description: initial.description,
    address: initial.address,
    phone: initial.phone,
    email: initial.email,
    hours: initial.hours,
    vision: initial.vision,
    mission: initial.mission.join("\n"),
  });
  const [errors, setErrors] = useState({});

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const err = {};
    const required = ["name", "tagline", "description", "address", "phone", "hours", "vision"];
    required.forEach((k) => {
      if (!form[k].trim()) err[k] = "Wajib diisi.";
    });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) err.email = "Format email tidak valid.";
    const mission = form.mission.split("\n").map((m) => m.trim()).filter(Boolean);
    if (mission.length === 0) err.mission = "Isi minimal satu misi (satu misi per baris).";
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    const result = saveProfile({
      name: form.name.trim(),
      tagline: form.tagline.trim(),
      description: form.description.trim(),
      address: form.address.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      hours: form.hours.trim(),
      vision: form.vision.trim(),
      mission,
    });
    if (result.ok) showToast("Profil sekolah berhasil disimpan.");
    else showToast(result.error, "error");
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-3xl space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nama Sekolah" id="name" error={errors.name}>
          <input id="name" value={form.name} onChange={set("name")} className={inputCls} />
        </Field>
        <Field label="Tagline" id="tagline" error={errors.tagline}>
          <input id="tagline" value={form.tagline} onChange={set("tagline")} className={inputCls} />
        </Field>
      </div>
      <Field label="Deskripsi Singkat" id="description" error={errors.description}>
        <textarea id="description" rows={3} value={form.description} onChange={set("description")} className={inputCls} />
      </Field>
      <Field label="Alamat" id="address" error={errors.address}>
        <textarea id="address" rows={4} value={form.address} onChange={set("address")} className={inputCls} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Telepon" id="phone" error={errors.phone}>
          <input id="phone" value={form.phone} onChange={set("phone")} className={inputCls} />
        </Field>
        <Field label="Email" id="email" error={errors.email}>
          <input id="email" type="email" value={form.email} onChange={set("email")} className={inputCls} />
        </Field>
      </div>
      <Field label="Jam Layanan" id="hours" error={errors.hours}>
        <textarea id="hours" rows={2} value={form.hours} onChange={set("hours")} className={inputCls} />
      </Field>
      <Field label="Visi" id="vision" error={errors.vision}>
        <textarea id="vision" rows={3} value={form.vision} onChange={set("vision")} className={inputCls} />
      </Field>
      <Field label="Misi (satu misi per baris)" id="mission" error={errors.mission}>
        <textarea id="mission" rows={8} value={form.mission} onChange={set("mission")} className={inputCls} />
      </Field>

      <div className="flex flex-wrap gap-3 pt-2">
        <button type="submit" className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-blue-800">
          Simpan Profil
        </button>
        <button type="button" onClick={onReset} className="rounded-lg border border-red-300 px-5 py-2.5 text-sm font-semibold text-red-700 transition duration-200 hover:bg-red-50">
          Reset ke Data Awal
        </button>
      </div>
    </form>
  );
}

export default function AdminProfilPage() {
  const { profile, ready } = useProfile();
  const { showToast } = useToast();
  const [formKey, setFormKey] = useState(0);
  const [confirmReset, setConfirmReset] = useState(false);

  if (!ready) return <p className="text-sm text-slate-500">Memuat data...</p>;

  const handleReset = () => {
    resetProfile();
    setFormKey((k) => k + 1);
    setConfirmReset(false);
    showToast("Profil dikembalikan ke data awal.");
  };

  return (
    <>
      <ProfileForm key={formKey} initial={profile} onReset={() => setConfirmReset(true)} />
      <ConfirmDialog
        open={confirmReset}
        title="Reset profil sekolah?"
        message="Semua perubahan profil akan dihapus dan dikembalikan ke data awal."
        confirmLabel="Reset"
        onConfirm={handleReset}
        onCancel={() => setConfirmReset(false)}
      />
    </>
  );
}
