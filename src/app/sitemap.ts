import { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const domain = headersList.get("host") as string;
  let protocol = "https";
  const baseUrl = `${protocol}://${domain}`;
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified,
    },
    {
      url: `${baseUrl}/delete`,
      lastModified,
    },
  ];
}
