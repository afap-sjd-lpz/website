import type {MetadataRoute} from "next";

import {getAbsoluteUrl} from "@/config/site.config";
import {client} from "@/sanity/lib/client";
import {SITEMAP_RESOURCES_QUERY} from "@/sanity/queries";

const staticPaths = [
  "/",
  "/quienes-somos",
  "/comunidad",
  "/recursos",
  "/contacto",
  "/politica-de-privacidad",
] as const;

const resourceSegments = {
  article: "articulos",
  material: "materiales",
  video: "videos",
} as const;

interface SitemapResource {
  _type: keyof typeof resourceSegments;
  slug: string;
  _updatedAt: string;
}

function getLastModified(value: string) {
  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const resources = await client.fetch<SitemapResource[]>(
    SITEMAP_RESOURCES_QUERY,
  );

  return [
    ...staticPaths.map((path) => ({url: getAbsoluteUrl(path)})),
    ...resources.map((resource) => ({
      url: getAbsoluteUrl(
        `/recursos/${resourceSegments[resource._type]}/${resource.slug}`,
      ),
      lastModified: getLastModified(resource._updatedAt),
    })),
  ];
}
