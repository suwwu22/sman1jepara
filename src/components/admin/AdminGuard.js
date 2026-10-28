"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/hooks";

// Proteksi SIMULASI: memeriksa session localStorage setelah komponen di-mount.
export default function AdminGuard({ children }) {
  const router = useRouter();
  const { session, ready } = useSession();

  useEffect(() => {
    if (ready && !session) router.replace("/admin/login");
  }, [ready, session, router]);

  if (!ready || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-sm text-slate-500">Memeriksa sesi...</p>
      </div>
    );
  }
  return children;
}
