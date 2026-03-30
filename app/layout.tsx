import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAdScript } from "@/components/GoogleAdScript";
import "./globals.css";
import { InstallPrompt } from "@/components/InstallPrompt";


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

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": SITE_URL },
    { "@type": "ListItem", "position": 2, "name": "共同親権サポートAIツール", "item": `${SITE_URL}/tool` },
  ],
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
        { "@type": "Question", "name": "共同親権になると毎日連絡を取り合う必要がありますか？", "acceptedAnswer": { "@type": "Answer", "text": "毎日の連絡は必要ありません。日常的な養育（食事・学校など）は基本居住親が単独で決定できます。転居・進学・医療など『重要事項』のみ双方の合意が必要です。本サービスでは重要事項の範囲と決定プロセスを明確化する書類も作成できます。" } },
        { "@type": "Question", "name": "法定養育費の2万円は少なすぎませんか？", "acceptedAnswer": { "@type": "Answer", "text": "法定養育費（月2万円）は最低保障額です。実際の養育費は裁判所の養育費算定表に基づき、子どもの人数・年齢・両親の収入によって決定されます。子ども1人なら月2〜8万円が一般的です。本サービスの養育費計算ツールで目安額を確認できます。" } },
        { "@type": "Question", "name": "既に離婚している場合、共同親権に変更できますか？", "acceptedAnswer": { "@type": "Answer", "text": "できます。2026年4月施行前に単独親権で離婚した場合も、家庭裁判所への『親権者変更』申立によって共同親権に変更できます。費用は収入印紙1,200円＋郵便切手代が必要です。" } },
        { "@type": "Question", "name": "2026年4月から何が変わりますか？", "acceptedAnswer": { "@type": "Answer", "text": "（1）新しい離婚では共同親権・単独親権のいずれかを協議で選択できるようになりました。（2）合意できない場合は家庭裁判所が子の利益を最優先に判断します。（3）養育費の未取り決め時に月2万円/子の「法定養育費」が自動発生します。（4）養育費不払い時の差し押さえ手続きが簡易化されました。" } },
        { "@type": "Question", "name": "親権者は誰が決めますか？", "acceptedAnswer": { "@type": "Answer", "text": "まず父母の協議で共同親権か単独親権かを決めます。協議が整わない場合は家庭裁判所が子の利益を最優先に判断します。DVや虐待が認定される場合は単独親権になります。" } },
        { "@type": "Question", "name": "共同親権になった場合、養育費はどうなりますか？", "acceptedAnswer": { "@type": "Answer", "text": "共同親権であっても養育費の取り決めは必要です。2026年4月以降の離婚では取り決めがない場合でも月2万円/子の法定養育費が自動発生しますが、算定表に基づく相場はこれを上回る場合が多く、別途合意書の作成を推奨します。" } },
        { "@type": "Question", "name": "離婚協議書は必要ですか？", "acceptedAnswer": { "@type": "Answer", "text": "法律上の義務ではありませんが、強く推奨されます。親権・面会交流・養育費・財産分与などを書面で残すことで後のトラブルを防止できます。公正証書にすることで養育費不払い時の強制執行が可能になります。本サービスで草案を作成してから弁護士・行政書士に確認を依頼することをお勧めします。" } },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="antialiased min-h-screen text-white" style={{ background: '#0B0F1E' }}>
        {children}
        <InstallPrompt />
        <Analytics />
        <GoogleAdScript />
      </body>
    </html>
  );
}
