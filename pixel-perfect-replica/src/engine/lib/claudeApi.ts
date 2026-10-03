import type { PostOutput, Wing } from "./types";

export async function generatePost(
  wing: Wing,
  entryNum: number,
  factIdea: string
): Promise<PostOutput> {
  const base = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
  const res = await fetch(`${base}/api/generate-post`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wing: wing.name, entryNum, factIdea }),
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => `HTTP ${res.status}`);
    throw new Error(msg || `Server error: ${res.status}`);
  }
  return res.json() as Promise<PostOutput>;
}
