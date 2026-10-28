"use client";

import { useProfile } from "@/lib/hooks";

export default function VisiCard() {
  const { profile } = useProfile();
  return (
    <div className="rounded-2xl bg-blue-50 p-6">
      <h3 className="font-bold text-blue-900">Visi Sekolah</h3>
      <p className="mt-2 leading-relaxed text-slate-700">{profile.vision}</p>
    </div>
  );
}
