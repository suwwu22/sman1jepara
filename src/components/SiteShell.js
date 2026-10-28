"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Navbar dan Footer publik hanya tampil di luar /admin.
export default function SiteShell({ children }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return children;
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
