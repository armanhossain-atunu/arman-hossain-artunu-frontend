export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");
export type ApiError = { error?: string; message?: string; issues?: { path?: string; message?: string }[] };
export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: { ...(init.body ? { "Content-Type": "application/json" } : {}), ...init.headers },
    cache: "no-store"
  });
  if (response.status === 204) return undefined as T;
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const err = data as ApiError;
    throw new Error(err.message || err.issues?.map(x => x.message).join("; ") || err.error || `Request failed (${response.status})`);
  }
  return data as T;
}
