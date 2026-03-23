import { defaultPosts, Post } from "@/data/posts";

const STORAGE_KEY = "alpha-frameworks-posts";

export type { Post };

export function getDefaultPosts(): Post[] {
  return defaultPosts;
}

export function getPosts(): Post[] {
  if (typeof window === "undefined") return defaultPosts;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return defaultPosts;
  try {
    const overrides: Post[] = JSON.parse(stored);
    const slugMap = new Map(defaultPosts.map((p) => [p.slug, p]));
    for (const p of overrides) {
      slugMap.set(p.slug, p);
    }
    return Array.from(slugMap.values());
  } catch {
    return defaultPosts;
  }
}

export function savePosts(posts: Post[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function getPostBySlug(
  slug: string,
  posts: Post[]
): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
