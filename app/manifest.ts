import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "共同親権サポートAI",
    short_name: "共同親権AI",
    description: "2026年4月施行の共同親権制度対応。AIが親権計画書・面会交流カレンダー・養育費を自動生成。",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#0d9488",
    orientation: "portrait",
    icons: [
      { src: "/og.png", sizes: "192x192", type: "image/png" },
      { src: "/og.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
