"use client";

import { useState } from "react";
import NewsImage from "@/components/NewsImage";
import { CATEGORIES, STATUS, slugify, todayISO, toIndoDate } from "@/lib/news";

const LOCAL_IMAGES = [
  "/sekolah.jpg",
  "/berita/berita-1.jpg",
  "/berita/berita-2.jpg",
  "/berita/berita-3.jpg",
  "/berita/berita-4.jpg",
  "/berita/berita-5.jpg",
  "/berita/berita-6.jpg",
];

const inputCls =
  "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

function detectMode(img) {
  if (!img || LOCAL_IMAGES.includes(img)) return "lokal";
  return "url";
}

function Field({ label, htmlFor, error, hint, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-slate-700">{label}</label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default function NewsForm({ mode, initial, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.id ?? "");
  const [slugTouched, setSlugTouched] = useState(false);
  const [category, setCategory] = useState(initial?.category ?? CATEGORIES[0]);
  const [dateISO, setDateISO] = useState(initial?.dateISO || todayISO());
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [status, setStatus] = useState(initial?.status ?? STATUS.DRAFT);
  const [imageMode, setImageMode] = useState(detectMode(initial?.image));
  const [image, setImage] = useState(initial?.image ?? "/sekolah.jpg");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const changeTitle = (value) => {
    setTitle(value);
    if (mode === "add" && !slugTouched) setSlug(slugify(value));
  };

  const changeImageMode = (value) => {
    setImageMode(value);
    setImage(value === "lokal" ? LOCAL_IMAGES[0] : "");
    setErrors((e) => ({ ...e, image: undefined }));
  };

  const validate = () => {
    const err = {};
    if (title.trim().length < 5) err.title = "Judul minimal 5 karakter.";
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      err.slug = "Slug hanya huruf kecil, angka, dan tanda hubung.";
    }
    if (!category) err.category = "Pilih kategori.";
    if (!dateISO) err.dateISO = "Tanggal wajib diisi.";
    if (!excerpt.trim()) err.excerpt = "Ringkasan wajib diisi.";
    else if (excerpt.length > 200) err.excerpt = "Ringkasan maksimal 200 karakter.";
    if (content.trim().length < 30) err.content = "Isi berita minimal 30 karakter.";
    if (!image) err.image = "Gambar wajib diisi.";
    else if (imageMode === "url" && !/^(https?:\/\/|\/)/.test(image)) {
      err.image = "URL harus diawali http://, https://, atau /.";
    }
    return err;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const err = validate();
    setErrors(err);
    setFormError("");
    if (Object.keys(err).length > 0) return;

    setSaving(true);
    const result = await onSubmit({
      id: slug,
      title: title.trim(),
      date: toIndoDate(dateISO),
      dateISO,
      category,
      image,
      excerpt: excerpt.trim(),
      content: content.trim(),
      status,
    });
    setSaving(false);
    if (result && !result.ok) setFormError(result.error);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-3xl space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {formError && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">{formError}</p>
      )}

      <Field label="Judul Berita" htmlFor="title" error={errors.title}>
        <input id="title" value={title} onChange={(e) => changeTitle(e.target.value)} className={inputCls} />
      </Field>

      <Field
        label="Slug / ID"
        htmlFor="slug"
        error={errors.slug}
        hint={mode === "edit" ? "Slug tidak dapat diubah saat edit agar URL lama tetap berlaku." : "Dibuat otomatis dari judul, boleh disesuaikan."}
      >
        <input
          id="slug"
          value={slug}
          disabled={mode === "edit"}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value);
          }}
          className={`${inputCls} disabled:bg-slate-100 disabled:text-slate-500`}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Kategori" htmlFor="category" error={errors.category}>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
            {Array.from(new Set([...CATEGORIES, category])).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Tanggal" htmlFor="date" error={errors.dateISO}>
          <input id="date" type="date" value={dateISO} onChange={(e) => setDateISO(e.target.value)} className={inputCls} />
        </Field>
      </div>

      <Field label="Ringkasan" htmlFor="excerpt" error={errors.excerpt} hint={`${excerpt.length}/200 karakter`}>
        <textarea id="excerpt" rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className={inputCls} />
      </Field>

      <Field label="Isi Berita" htmlFor="content" error={errors.content} hint="Pisahkan paragraf dengan satu baris kosong.">
        <textarea id="content" rows={8} value={content} onChange={(e) => setContent(e.target.value)} className={inputCls} />
      </Field>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-slate-700">Gambar</legend>
        <div className="flex flex-wrap gap-4 text-sm text-slate-700">
          {[
            ["lokal", "Gambar lokal (folder public)"],
            ["url", "URL gambar"],
          ].map(([value, label]) => (
            <label key={value} className="flex items-center gap-2">
              <input type="radio" name="imageMode" checked={imageMode === value} onChange={() => changeImageMode(value)} />
              {label}
            </label>
          ))}
        </div>

        {imageMode === "lokal" ? (
          <select aria-label="Gambar lokal" value={image} onChange={(e) => setImage(e.target.value)} className={inputCls}>
            {LOCAL_IMAGES.map((src) => (
              <option key={src} value={src}>{src}</option>
            ))}
          </select>
        ) : (
          <input aria-label="URL gambar" placeholder="https://..." value={image} onChange={(e) => setImage(e.target.value)} className={inputCls} />
        )}
        {errors.image && <p className="text-xs text-red-600">{errors.image}</p>}
        {image && (
          <NewsImage key={image} src={image} alt="Pratinjau gambar berita" className="h-40 w-full max-w-sm rounded-lg border border-slate-200 object-cover" />
        )}
      </fieldset>

      <Field label="Status Publikasi" htmlFor="status">
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className={inputCls}>
          <option value={STATUS.DRAFT}>Draft (tidak tampil di publik)</option>
          <option value={STATUS.PUBLISHED}>Published (tampil di publik)</option>
        </select>
      </Field>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Menyimpan..." : mode === "edit" ? "Simpan Perubahan" : "Simpan Berita"}
        </button>
        <button type="button" onClick={onCancel} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition duration-200 hover:bg-slate-50">
          Batal
        </button>
      </div>
    </form>
  );
}
