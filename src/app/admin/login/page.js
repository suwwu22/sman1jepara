"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DEMO_ADMIN, login } from "@/lib/auth";
import { useSession } from "@/lib/hooks";

const inputCls =
  "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

export default function AdminLoginPage() {
  const router = useRouter();
  const { session, ready } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  // Sudah login -> kembali ke dashboard.
  useEffect(() => {
    if (ready && session) router.replace("/admin");
  }, [ready, session, router]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const err = {};
    if (!username.trim()) err.username = "Username wajib diisi.";
    if (!password) err.password = "Password wajib diisi.";
    setErrors(err);
    setFormError("");
    if (Object.keys(err).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      const result = login(username, password);
      if (result.ok) {
        router.replace("/admin");
      } else {
        setFormError(result.error);
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-blue-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <div className="flex flex-col items-center text-center">
          <Image src="/logo.png" alt="Logo SMAN 1 Jepara" width={56} height={56} className="rounded-full" />
          <p className="mt-3 text-sm font-semibold text-blue-800">SMA Negeri 1 Jepara</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          {formError && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">{formError}</p>
          )}

          <div>
            <label htmlFor="username" className="text-sm font-semibold text-slate-700">Username</label>
            <input id="username" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} className={inputCls} />
            {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username}</p>}
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-semibold text-slate-700">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputCls} pr-20`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 mt-0.5 -translate-y-1/2 rounded px-2 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-50"
              >
                {showPassword ? "Sembunyikan" : "Tampilkan"}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>

        <div className="mt-6 rounded-lg bg-slate-50 p-4 text-xs leading-relaxed text-slate-600">
          <p className="font-semibold text-slate-700">Akun demo (simulasi tugas)</p>
          <p>Username: <code>{DEMO_ADMIN.username}</code></p>
          <p>Password: <code>{DEMO_ADMIN.password}</code></p>
          <p className="mt-2">Login ini hanya simulasi di sisi klien dan tidak aman untuk produksi.</p>
        </div>
      </div>
    </div>
  );
}
