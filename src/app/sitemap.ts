import { MetadataRoute } from "next";
import { headers } from "next/headers";

const LOCALES = ["de", "en"] as const;
const LEGAL_PATHS = ["privacy", "delete", "imprint", "terms"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const domain = headersList.get("host") as string;
  const protocol = "https";
  const baseUrl = `${protocol}://${domain}`;
  const lastModified = new Date();

  const entries: MetadataRoute.Sitemap = [{ url: baseUrl, lastModified }];

  for (const locale of LOCALES) {
    for (const path of LEGAL_PATHS) {
      entries.push({
        url: `${baseUrl}/${locale}/${path}`,
        lastModified,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${baseUrl}/${l}/${path}`])
          ),
        },
      });
    }
  }

  return entries;
}
