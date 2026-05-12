import path from "path";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: ["geist"],
  images: {
    remotePatterns: [{ hostname: "localhost" }, { hostname: "randomuser.me" }],
  },
  async redirects() {
    return [
      { source: "/datenschutz", destination: "/de/privacy", permanent: true },
      { source: "/delete", destination: "/de/delete", permanent: true },
      { source: "/impressum", destination: "/de/imprint", permanent: true },
      { source: "/agb", destination: "/de/terms", permanent: true },
    ];
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(process.cwd(), "src"),
    };
    return config;
  },
};

export default withNextIntl(nextConfig);
