import { KEYS, readData, removeData, saveData } from "@/lib/storage";
import { logActivity } from "@/lib/activity";

// Data awal profil (informasi dari website resmi sman1jepara.sch.id).
export const defaultProfile = {
  name: "SMA Negeri 1 Jepara",
  tagline: "Cerdas Kreatif Santun",
  description:
    "Sekolah menengah atas negeri di Jepara, Jawa Tengah, yang berdiri sejak 1963 dan berkomitmen mencetak generasi berprestasi dan berkarakter.",
  address: "Jl. CS Tubun No. 1,\nDemaan, Kecamatan Jepara,\nKabupaten Jepara,\nJawa Tengah",
  phone: "(0291) 591148",
  email: "info@sman1jepara.sch.id",
  hours: "Senin - Jumat\n07.00 - 15.30 WIB",
  vision:
    "Terwujudnya lulusan yang bertakwa kepada Tuhan Yang Maha Esa, unggul dalam prestasi, kreatif, santun, dan berwawasan global.",
  mission: [
    "Melaksanakan proses pembelajaran secara efektif sehingga siswa berkembang secara optimal untuk meraih prestasi terbaik.",
    "Mengembangkan potensi siswa sesuai dengan bakat dan minat yang dimiliki agar meraih prestasi optimal.",
    "Mengembangkan kegiatan yang mendorong siswa berpikir kreatif dan mampu berkarya inovatif.",
    "Menumbuhkan sikap santun dalam bertutur kata dan berperilaku.",
    "Meningkatkan pengetahuan dan memperluas wawasan agar mampu menghadapi persaingan global.",
    "Menanamkan sikap jujur pada setiap individu dan tekun melaksanakan ibadah sesuai dengan agama dan keyakinannya.",
  ],
};

export function mergeProfile(stored) {
  if (!stored || typeof stored !== "object" || Array.isArray(stored)) return defaultProfile;
  const merged = { ...defaultProfile, ...stored };
  if (!Array.isArray(merged.mission)) merged.mission = defaultProfile.mission;
  return merged;
}

export function getProfile() {
  return mergeProfile(readData(KEYS.profile, null));
}

export function saveProfile(profile) {
  const result = saveData(KEYS.profile, profile);
  if (result.ok) logActivity("UPDATE_PROFILE", "Memperbarui profil sekolah");
  return result;
}

export function resetProfile() {
  removeData(KEYS.profile);
  logActivity("RESET_PROFILE", "Mengembalikan profil sekolah ke data awal");
}
