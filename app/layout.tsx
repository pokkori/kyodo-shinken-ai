import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { GoogleAdScript } from "@/components/GoogleAdScript";
import "./globals.css";
import { InstallPrompt } from "@/components/InstallPrompt";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

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
        { "@type": "Question", "name": "共同親権が認められない場合はありますか？", "acceptedAnswer": { "@type": "Answer", "text": "DVや虐待・高葛藤が認定される場合、家庭裁判所は子の利益を最優先として単独親権を決定します。また、一方の親が強く拒否し協議が整わない場合も、調停・審判で単独親権になることがあります。本AIが状況に応じた選択肢と注意点を提示します。" } },
        { "@type": "Question", "name": "養育費の不払いがある場合はどうすればいいですか？", "acceptedAnswer": { "@type": "Answer", "text": "2026年4月以降は養育費不払い時の差し押さえ手続きが簡易化されました。公正証書・調停調書があれば裁判所への申立なしに給与の差押えが可能になる制度改正も施行済みです。本AIが督促文・内容証明・法的手続き開始の文書テンプレートを生成します。" } },
        { "@type": "Question", "name": "海外在住の場合でも共同親権は適用されますか？", "acceptedAnswer": { "@type": "Answer", "text": "日本の改正民法は日本国籍者・日本在住者への離婚に適用されます。一方の親が海外在住の場合、国際私法・ハーグ条約の取り決めが絡むため、国際家事法専門の弁護士への相談が不可欠です。本AIが相談前の準備情報・確認事項の整理をサポートします。" } },
        { "@type": "Question", "name": "子どもが転校・引越しをする場合の手続きは？", "acceptedAnswer": { "@type": "Answer", "text": "共同親権下では子どもの転校・引越しは重要事項として原則双方の合意が必要です。急迫の事情がある場合を除き、一方的な転居は親権の侵害とみなされる可能性があります。本AIが合意書・通知書・緊急時の対応手順書を生成します。" } },
        { "@type": "Question", "name": "子どもが拒否した場合の面会交流はどうなりますか？", "acceptedAnswer": { "@type": "Answer", "text": "子どもの意思は年齢に応じて尊重されます。15歳以上の場合は子どもの意見が重視され、10〜14歳も意見が考慮されます。無理強いは子どもの福祉を損なうとして面会交流の見直し申立が可能です。本AIが子どもの年齢・状況に応じた面会計画の草案を生成します。" } },
        { "@type": "Question", "name": "無料で何回使えますか？", "acceptedAnswer": { "@type": "Answer", "text": "登録不要で1回無料でお試しいただけます。プレミアムプラン（¥980/月）では回数無制限・全種類の書類生成・PDF出力・弁護士相談前チェックリストが利用可能になります。" } },
        { "@type": "Question", "name": "生成した書類を弁護士に見てもらう際の注意点は？", "acceptedAnswer": { "@type": "Answer", "text": "本AIの生成結果はあくまで草案・参考情報です。弁護士相談の際はAIが生成した書類を「叩き台」として持参することで、相談時間を短縮しコスト削減につながります。法的効力を持たせるには弁護士・公証役場での正式な手続きが必要です。" } },
        { "@type": "Question", "name": "モラハラ・DVがある場合の親権手続きはどうなりますか？", "acceptedAnswer": { "@type": "Answer", "text": "DV・モラハラが認定される場合は単独親権が優先的に認められます。配偶者暴力相談支援センター・警察への相談履歴・医療記録が証拠として重要です。本AIがDV被害記録テンプレートと緊急対応チェックリストを生成します。まず最寄りのDV相談窓口への相談を強くお勧めします。" } },
        { "@type": "Question", "name": "再婚した場合、共同親権はどうなりますか？", "acceptedAnswer": { "@type": "Answer", "text": "再婚しても前の婚姻から生じた共同親権は原則として継続します。再婚相手が養子縁組する場合は別途手続きが必要です。子どもの姓変更・生活環境の変化については共同親権者双方の合意が必要な事項となります。本AIが再婚に伴う親権・養育費見直しの手続き整理書を生成します。" } },
        { "@type": "Question", "name": "離婚後の子どもの医療・教育の決定はどうすればいいですか？", "acceptedAnswer": { "@type": "Answer", "text": "共同親権下では手術などの重大な医療行為・進学先変更などの教育重要事項は双方の合意が原則です。ただし、日常的な医療（通院・投薬）は居住親が単独決定できます。本AIが重要事項と日常事項の区分表・合意プロセスフローを生成します。" } },
      ],
    },
    {
      "@type": "SoftwareApplication",
      "name": "共同親権サポートAI",
      "applicationCategory": "LegalService",
      "operatingSystem": "Web Browser",
      "url": SITE_URL,
      "description": DESC,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "JPY",
        "description": "1回無料・プレミアム¥980/月"
      }
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="antialiased min-h-screen text-white" style={{ background: '#0B0F1E' }}>
        <div className="orb-container" aria-hidden="true">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        {children}
        <InstallPrompt />
        <Analytics />
        <SpeedInsights />
        <GoogleAdScript />
        {process.env.NEXT_PUBLIC_CLARITY_ID && process.env.NODE_ENV === 'production' && (
          <Script
            id="clarity-init"
            strategy="afterInteractive"
          >
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID}");`}
          </Script>
        )}
      </body>
    </html>
  );
}
