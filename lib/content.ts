import {categories, comparisons, posts, toolkitItems, tools} from "./seed";
import type {Post} from "./types";

export async function getPosts() {
  return posts;
}

export async function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export async function getCategories() {
  return categories;
}

export async function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export async function getTools() {
  return tools;
}

export async function getTool(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export async function getComparisons() {
  return comparisons;
}

export async function getComparison(slug: string) {
  return comparisons.find((comparison) => comparison.slug === slug);
}

export async function getToolkitItems() {
  return toolkitItems;
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
