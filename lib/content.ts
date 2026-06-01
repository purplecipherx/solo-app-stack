import {categories, comparisons, posts, toolkitItems, tools} from "./seed";
import type {Category, Comparison, Post, Tool} from "./types";
import {client, sanityEnabled} from "@/sanity/lib/client";
import {comparisonsQuery, postsQuery, toolkitItemsQuery, toolsQuery, categoriesQuery} from "@/sanity/lib/queries";

async function fetchSanity<T>(query: string, fallback: T): Promise<T> {
  if (!sanityEnabled) return fallback;
  try {
    const data = await client.fetch<T>(query, {}, {next: {revalidate: 3600}});
    return data || fallback;
  } catch (error) {
    console.warn("Sanity fetch failed, using seed content.", error);
    return fallback;
  }
}

function mergeBySlug<T extends {slug: string}>(remote: T[], fallback: T[]) {
  return remote.map((item) => {
    const local = fallback.find((entry) => entry.slug === item.slug);
    if (!local) return item;
    const cleanRemote = Object.fromEntries(
      Object.entries(item).filter(([, value]) => value !== null && value !== undefined)
    );
    return {...local, ...cleanRemote} as T;
  });
}

export async function getPosts() {
  const remote = await fetchSanity<Post[]>(postsQuery, posts);
  return sanityEnabled ? mergeBySlug(remote, posts) : remote;
}

export async function getPost(slug: string) {
  return (await getPosts()).find((post) => post.slug === slug);
}

export async function getCategories() {
  const remote = await fetchSanity<Category[]>(categoriesQuery, categories);
  return sanityEnabled ? mergeBySlug(remote, categories) : remote;
}

export async function getCategory(slug: string) {
  return (await getCategories()).find((category) => category.slug === slug);
}

export async function getTools() {
  const remote = await fetchSanity<Tool[]>(toolsQuery, tools);
  return sanityEnabled ? mergeBySlug(remote, tools) : remote;
}

export async function getTool(slug: string) {
  return (await getTools()).find((tool) => tool.slug === slug);
}

export async function getComparisons() {
  const remote = await fetchSanity<Comparison[]>(comparisonsQuery, comparisons);
  return sanityEnabled ? mergeBySlug(remote, comparisons) : remote;
}

export async function getComparison(slug: string) {
  return (await getComparisons()).find((comparison) => comparison.slug === slug);
}

export async function getToolkitItems() {
  return fetchSanity(toolkitItemsQuery, toolkitItems);
}

export function filterPosts(input: Post[], category?: string, sort = "latest", search = "") {
  const query = search.toLowerCase();
  return input
    .filter((post) => !category || post.category === category)
    .filter((post) => !query || `${post.title} ${post.excerpt} ${post.tags.join(" ")}`.toLowerCase().includes(query))
    .sort((a, b) => {
      if (sort === "popular") return b.popularity - a.popularity;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
}
