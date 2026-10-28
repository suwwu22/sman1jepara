"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/auth";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { ToastProvider } from "@/components/admin/Toast";

function Frame({ children }) {
  const router = useRouter();
  const [drawer, setDrawer] = useState(false);

  const handleLogout = () => {
    logout();
    router.replace("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar open={drawer} onClose={() => setDrawer(false)} onLogout={handleLogout} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader onMenu={() => setDrawer(true)} onLogout={handleLogout} />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

export default function AdminShell({ children }) {
  const pathname = usePathname();

  // Halaman login tampil tanpa sidebar dan tanpa guard.
  if (pathname.startsWith("/admin/login")) {
    return <ToastProvider>{children}</ToastProvider>;
  }

  return (
    <ToastProvider>
      <AdminGuard>
        <Frame>{children}</Frame>
      </AdminGuard>
    </ToastProvider>
  );
}
