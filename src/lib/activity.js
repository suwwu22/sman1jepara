import { KEYS, readData, saveData } from "@/lib/storage";

export const MAX_ACTIVITIES = 50;

function makeId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getActivities() {
  const data = readData(KEYS.activity, []);
  return Array.isArray(data) ? data : [];
}

// Mencatat aktivitas (terbaru di depan, maksimal 50 entri).
export function logActivity(action, description) {
  const entry = { id: makeId(), action, description, timestamp: new Date().toISOString() };
  return saveData(KEYS.activity, [entry, ...getActivities()].slice(0, MAX_ACTIVITIES));
}
