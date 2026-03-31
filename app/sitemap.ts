import { MetadataRoute } from "next";

const BASE_URL = "https://kyodo-shinken-ai.vercel.app";

const KEYWORD_SLUGS = [
  "kyodo-shinken-seido-kaisetsu",
  "rikon-shinken-kettei-houhou",
  "mensetsuko-menkaikou-schedule",
  "kyodo-shinken-merit-demerit",
  "child-support-keisan",
  "rikon-kodomo-mental-care",
  "single-parent-rikon-support",
  "kyodo-shinken-DV-case",
  "mensetsuko-拒否-taio",
  "rikon-kodomo-gakko-transfer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BASE_URL;
  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/tool`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/guide`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/checklist`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/procedure`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/legal`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];
  const keywordPages: MetadataRoute.Sitemap = KEYWORD_SLUGS.map((slug) => ({
    url: `${base}/keywords/${slug}`,
    lastModified: new Date("2026-03-31"),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
  return [...staticPages, ...keywordPages];
}
