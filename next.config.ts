import type { NextConfig } from "next";

const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const allowedDevOrigins = process.env.NEXT_ALLOWED_DEV_ORIGINS?.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const sanityRemotePatterns =
  sanityProjectId && sanityDataset
    ? [
        {
          protocol: "https" as const,
          hostname: "cdn.sanity.io",
          port: "",
          pathname: `/images/${sanityProjectId}/${sanityDataset}/**`,
        },
      ]
    : [];

const nextConfig: NextConfig = {
  ...(allowedDevOrigins?.length ? { allowedDevOrigins } : {}),
  images: {
    remotePatterns: [
      ...sanityRemotePatterns,
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/vi/*/hqdefault.jpg",
        search: "",
      },
    ],
  },
};

export default nextConfig;
