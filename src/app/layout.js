import "./globals.css";
import { Poppins } from "next/font/google";
import SiteShell from "@/components/SiteShell";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "SMA Negeri 1 Jepara",
  description: "Website profil SMA Negeri 1 Jepara, Jepara, Jawa Tengah.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${poppins.className} flex min-h-screen flex-col antialiased`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
