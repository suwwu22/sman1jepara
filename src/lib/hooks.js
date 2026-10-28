"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { CHANGE_EVENT, KEYS, parseJSON } from "@/lib/storage";
import { mergeProfile } from "@/lib/profile";
import { DEFAULT_SETTINGS } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { fetchAllNews, fetchPublishedNews, fetchPublishedNewsById } from "@/lib/news";

// ---------- Data dari Supabase ----------
function useRemote(load) {
  const [state, setState] = useState({ data: null, ready: false, error: null });
  const [tick, setTick] = useState(0);
  const reload = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    let cancelled = false;
    load().then(({ data, error }) => {
      if (!cancelled) setState({ data, ready: true, error });
    });
    return () => {
      cancelled = true;
    };
  }, [load, tick]);

  return { ...state, reload };
}

// Berita published untuk halaman publik.
export function usePublishedNews(limit) {
  const load = useCallback(() => fetchPublishedNews(limit), [limit]);
  const { data, ready, error, reload } = useRemote(load);
  return { news: data ?? [], ready, error, reload };
}

// Satu berita published berdasarkan id (halaman detail).
export function usePublishedNewsItem(id) {
  const load = useCallback(() => fetchPublishedNewsById(id), [id]);
  const { data, ready, error } = useRemote(load);
  return { item: data, ready, error };
}

// Semua berita untuk admin (butuh login; diatur oleh RLS).
export function useAdminNews() {
  const { data, ready, error, reload } = useRemote(fetchAllNews);
  return { news: data ?? [], ready, error, reload };
}

// ---------- Session Supabase Auth ----------
function toSession(s) {
  if (!s || !s.user) return null;
  return {
    authenticated: true,
    username: s.user.email,
    email: s.user.email,
    loggedInAt: s.user.last_sign_in_at,
  };
}

export function useSession() {
  const [state, setState] = useState({ session: null, ready: false });

  useEffect(() => {
    if (!supabase) {
      Promise.resolve().then(() => setState({ session: null, ready: true }));
      return undefined;
    }
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) setState({ session: toSession(data.session), ready: true });
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setState({ session: toSession(session), ready: true });
    });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  return state;
}

// ---------- Data lokal (localStorage): profil, pengaturan, log ----------
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
