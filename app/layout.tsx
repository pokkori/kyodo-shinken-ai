import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const SITE_URL = "https://kyodo-shinken-ai.vercel.app";
const TITLE = "共同親権サポートAI｜親権計画書・面会交流・養育費を自動作成【2026年4月新制度対応】";
const DESC = "2026年4月施行の共同親権制度に対応。子どもの情報を入力するだけでAIが親権計画書草案・面会交流カレンダー・養育費目安・調停準備メモを自動生成。弁護士費用を抑えて準備できます。1回無料。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: {
    title: TITLE,
    description: DESC,
    url: SITE_URL,
    siteName: "共同親権サポートAI",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
  },
  metadataBase: new URL(SITE_URL),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "共同親権サポートAI",
      "url": SITE_URL,
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "JPY", "description": "1回無料" },
      "description": DESC,
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "共同親権とは何ですか？", "acceptedAnswer": { "@type": "Answer", "text": "2026年4月から施行される改正民法により、離婚後も父母双方が親権を持つ「共同親権」が選択できるようになります。従来の単独親権に加え、協議や家庭裁判所の決定により共同親権が設定されます。" } },
        { "@type": "Question", "name": "生成された書類はそのまま使えますか？", "acceptedAnswer": { "@type": "Answer", "text": "AIの生成結果は参考情報であり、法的効力を持つものではありません。実際の手続きは弁護士・家庭裁判所にご相談ください。" } },
        { "@type": "Question", "name": "弁護士に依頼せずに使えますか？", "acceptedAnswer": { "@type": "Answer", "text": "はい。本サービスは弁護士費用をかける前の「準備・整理」に使うツールです。生成した草案をもとに弁護士相談・調停申立の準備ができます。" } },
        { "@type": "Question", "name": "解約はいつでもできますか？", "acceptedAnswer": { "@type": "Answer", "text": "マイページからいつでも解約できます。解約後は次回更新日まで引き続きご利用いただけます。" } },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${geist.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
