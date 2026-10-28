"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import { CHANGE_EVENT, KEYS, parseJSON } from "@/lib/storage";
import { buildSeedNews, ensureSeedNews } from "@/lib/news";
import { mergeProfile } from "@/lib/profile";
import { DEFAULT_SETTINGS } from "@/lib/auth";

// Hook ini membaca localStorage lewat useSyncExternalStore:
// - di server nilainya "undefined" (belum siap), sehingga tidak ada hydration error;
// - setiap saveData/removeData memicu event sehingga semua komponen ikut diperbarui.
function subscribe(callback) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function useRaw(key) {
  return useSyncExternalStore(
    subscribe,
    () => {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    () => undefined
  );
}

export function useNews() {
  const raw = useRaw(KEYS.news);
  const ready = raw !== undefined;
  const stored = useMemo(() => {
    const parsed = parseJSON(raw);
    return Array.isArray(parsed) ? parsed : null;
  }, [raw]);

  useEffect(() => {
    if (ready && stored === null) ensureSeedNews();
  }, [ready, stored]);

  const news = useMemo(() => stored ?? (ready ? buildSeedNews() : []), [stored, ready]);
  return { news, ready };
}

export function useProfile() {
  const raw = useRaw(KEYS.profile);
  const ready = raw !== undefined;
  const stored = useMemo(() => {
    const parsed = parseJSON(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : null;
  }, [raw]);
  const profile = useMemo(() => mergeProfile(stored), [stored]);
  return { profile, ready, customized: stored !== null };
}

export function useSession() {
  const raw = useRaw(KEYS.session);
  const ready = raw !== undefined;
  const session = useMemo(() => {
    const parsed = parseJSON(raw);
    return parsed && parsed.authenticated === true && typeof parsed.username === "string"
      ? parsed
      : null;
  }, [raw]);
  return { session, ready };
}

export function useAdminSettings() {
  const raw = useRaw(KEYS.settings);
  return useMemo(() => {
    const parsed = parseJSON(raw);
    return { ...DEFAULT_SETTINGS, ...(parsed && typeof parsed === "object" ? parsed : {}) };
  }, [raw]);
}

export function useActivities() {
  const raw = useRaw(KEYS.activity);
  return useMemo(() => {
    const parsed = parseJSON(raw);
    return Array.isArray(parsed) ? parsed : [];
  }, [raw]);
}
