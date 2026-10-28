"use client";

import { useState } from "react";

export const DEFAULT_IMAGE = "/sekolah.jpg";

// Gambar berita dinamis (URL, Data URL, atau file lokal) dengan gambar default jika gagal dimuat.
export default function NewsImage({ src, alt, className = "" }) {
  const [failedSrc, setFailedSrc] = useState(null);
  const finalSrc = !src || failedSrc === src ? DEFAULT_IMAGE : src;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={finalSrc} alt={alt} onError={() => setFailedSrc(src)} className={className} />
  );
}
