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
  keywords: ["共同親権", "共同親権 AI", "共同親権 2026", "共同親権 計画書", "面会交流 計画書", "養育費 計算", "離婚 親権", "親権計画書 作り方", "調停 準備", "共同親権 単独親権 違い", "面会交流 ルール", "養育費 相場 2026"],
  openGraph: {
    title: TITLE,
    description: DESC,
    url: SITE_URL,
    siteName: "共同親権サポートAI",
    locale: "ja_JP",
    type: "website",
    images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: "共同親権サポートAI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
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
        { "@type": "Question", "name": "共同親権と単独親権はどちらを選ぶべきですか？", "acceptedAnswer": { "@type": "Answer", "text": "子どもの最善の利益が判断基準です。両親が協力できる環境なら共同親権、DV・虐待・高葛藤が懸念される場合は単独親権が選ばれることが多いです。本サービスでは状況に応じた選択肢と注意点をAIが提示します。" } },
        { "@type": "Question", "name": "養育費の相場はいくらですか？", "acceptedAnswer": { "@type": "Answer", "text": "養育費は裁判所の養育費算定表に基づき決定されます。子どもの年齢・人数・両親の収入によって異なりますが、子ども1人の場合月2〜8万円程度が一般的です。本サービスでは入力情報をもとにAIが概算を提示します。" } },
        { "@type": "Question", "name": "面会交流のルールはどのように決めますか？", "acceptedAnswer": { "@type": "Answer", "text": "月に何回・何時間・どこで会うか、長期休暇の取り決め、連絡方法などを具体的に決めます。本サービスでは状況に応じた面会交流カレンダーの草案をAIが自動生成します。" } },
        { "@type": "Question", "name": "調停申立に必要な書類は何ですか？", "acceptedAnswer": { "@type": "Answer", "text": "家事調停申立書・子どもの戸籍謄本・収入を証明する書類（源泉徴収票等）などが必要です。本サービスでは調停準備メモとして必要書類・費用・主張ポイントをAIがまとめます。" } },
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
