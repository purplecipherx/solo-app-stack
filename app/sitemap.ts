import type {MetadataRoute} from "next";
import {getCategories, getComparisons, getPosts, getTools} from "@/lib/content";
import {absoluteUrl} from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories, tools, comparisons] = await Promise.all([getPosts(), getCategories(), getTools(), getComparisons()]);
  const staticPages = ["", "/blog", "/categories", "/tools", "/comparisons", "/toolkit", "/start-here", "/about", "/contact", "/privacy", "/terms", "/affiliate-disclosure"];
  return [
    ...staticPages.map((path) => ({url: absoluteUrl(path), lastModified: new Date()})),
    ...posts.map((post) => ({url: absoluteUrl(`/blog/${post.slug}`), lastModified: new Date(post.updatedAt)})),
    ...categories.map((category) => ({url: absoluteUrl(`/categories/${category.slug}`), lastModified: new Date()})),
    ...tools.map((tool) => ({url: absoluteUrl(`/tools/${tool.slug}`), lastModified: new Date(tool.updatedAt)})),
    ...comparisons.map((comparison) => ({url: absoluteUrl(`/comparisons/${comparison.slug}`), lastModified: new Date(comparison.updatedAt)}))
  ];
}
