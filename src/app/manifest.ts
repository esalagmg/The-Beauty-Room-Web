import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.fullName,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F7F3EC",
    theme_color: "#F7F3EC",
    icons: [
      {
        src: "/images/brand/logo-emblem.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
