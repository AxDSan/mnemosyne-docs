import type { MetadataRoute } from "next";
import { getPageMeta, SITE_CONFIG } from "@/lib/seo";
import { pageOrder } from "@/lib/content";

export const dynamic = "force-static";

/**
 * Derive the sitemap from pageOrder, which is the real route list.
 *
 * This previously mapped over PAGE_METADATA in seo.ts, a hand-maintained
 * record that had fallen to 43 entries against 78 routes, so roughly 45%
 * of the site was missing from the sitemap. pageOrder is the same list the
 * sidebar and prev/next navigation use, so a new page is now indexed the
 * moment it is routable.
 *
 * PAGE_METADATA is still consulted for priority and change frequency when
 * an entry exists; pages without one get defaults rather than being dropped.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return pageOrder.map((slug) => {
    const path = `/${slug}`;
    const meta = getPageMeta(path) ?? getPageMeta(slug);

    return {
      url: `${SITE_CONFIG.siteUrl}${path}`,
      lastModified,
      changeFrequency: meta?.changeFreq ?? "monthly",
      priority: meta?.priority ?? 0.5,
    };
  });
}
