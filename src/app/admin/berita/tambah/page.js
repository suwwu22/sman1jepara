"use client";

import { useRouter } from "next/navigation";
import NewsForm from "@/components/admin/NewsForm";
import { useToast } from "@/components/admin/Toast";
import { addNews } from "@/lib/news";

export default function TambahBeritaPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const handleSubmit = (values) => {
    const result = addNews(values);
    if (result.ok) {
      showToast("Berita berhasil ditambahkan.");
      router.push("/admin/berita");
    } else {
      showToast(result.error, "error");
    }
    return result;
  };

  return <NewsForm mode="add" onSubmit={handleSubmit} onCancel={() => router.push("/admin/berita")} />;
}
