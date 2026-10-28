import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
  title: "Admin Dashboard | SMA Negeri 1 Jepara",
  description: "Dashboard admin simulasi (frontend-only, localStorage).",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}
