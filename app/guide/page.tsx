import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "共同親権とは？2026年4月施行の改正民法を分かりやすく解説 — 共同親権サポートAI",
  description: "2026年4月1日に施行された共同親権制度を完全解説。単独親権との違い・養育費・面会交流・手続き方法・DVがある場合の対応まで。弁護士費用を節約して準備しよう。",
  openGraph: {
    title: "共同親権とは？2026年4月施行の改正民法を分かりやすく解説",
    description: "2026年4月1日施行の共同親権制度を完全解説。手続き・養育費・面会交流まで。",
    url: "https://kyodo-shinken-ai.vercel.app/guide",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "共同親権とは？2026年4月施行の改正民法を分かりやすく解説",
      "description": "2026年4月1日に施行された共同親権制度について、単独親権との違い・養育費・面会交流・手続き方法を解説。",
      "url": "https://kyodo-shinken-ai.vercel.app/guide",
      "datePublished": "2026-04-01",
      "dateModified": "2026-03-20",
      "publisher": { "@type": "Organization", "name": "ポッコリラボ" },
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "共同親権と単独親権どちらがいいですか？", "acceptedAnswer": { "@type": "Answer", "text": "「子の最善の利益」が判断基準です。両親が協力できる関係なら共同親権が選べます。DVや虐待、高葛藤が懸念される場合は単独親権が適切です。弁護士や家庭裁判所に相談してください。" } },
        { "@type": "Question", "name": "共同親権になると毎日連絡が必要ですか？", "acceptedAnswer": { "@type": "Answer", "text": "日常的な養育（食事・学校・遊びなど）は基本居住地の親が単独で決定できます。転居・進学・医療など「重要事項」についてのみ両親の合意が必要です。" } },
        { "@type": "Question", "name": "法定養育費の2万円は少なすぎませんか？", "acceptedAnswer": { "@type": "Answer", "text": "法定養育費（月2万円）は「最低限の自動発生額」です。実際の養育費はお互いの収入・子どもの人数などに応じて裁判所の算定表で決まります。養育費算定表の相場は子ども1人なら月2〜8万円が一般的です。" } },
      ],
    },
  ],
};

const TIMELINE = [
  { year: "2022年", month: "2月", title: "法制審議会で議論開始", desc: "離婚後の親子関係見直しの議論が法制審議会でスタート。" },
  { year: "2022年", month: "9月", title: "要綱案たたき台（第1稿）", desc: "共同親権の導入を含む改正案のたたき台が作成される。" },
  { year: "2024年", month: "5月", title: "改正民法が国会で成立", desc: "共同親権を盛り込んだ改正民法が衆参両院で可決・成立。施行日は2026年4月1日と決定。" },
  { year: "2025年", month: "通年", title: "家庭裁判所・関係機関の準備", desc: "家庭裁判所・自治体・法務省による施行準備が進む。" },
  { year: "2026年", month: "4月1日", title: "共同親権制度 施行", desc: "改正民法が施行。離婚後の親権選択に「共同親権」が加わる。新しい離婚には共同親権か単独親権かの選択が必要に。", highlight: true },
];

const DIFFERENCES = [
  {
    category: "親権の形",
    solo: "父母のどちらか一方が親権を持つ",
    joint: "父母双方が親権を持つ（原則）",
  },
  {
    category: "日常的な養育決定",
    solo: "親権者が単独で決定",
    joint: "基本居住親が単独で決定（転居・進学は両者合意）",
  },
  {
    category: "重要事項の決定",
    solo: "親権者が単独で決定",
    joint: "転居・進学・医療など両親の合意が必要",
  },
  {
    category: "選択方法",
    solo: "2024年以前の離婚はすべて単独親権",
    joint: "2026年4月以降、協議または裁判所が選択",
  },
  {
    category: "変更・修正",
    solo: "家庭裁判所への申立で変更可能",
    joint: "家庭裁判所への申立で変更可能",
  },
  {
    category: "DV・虐待がある場合",
    solo: "すでに単独親権が原則",
    joint: "DVや虐待が認定される場合、裁判所は単独親権に",
  },
];

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Nav */}
      <nav className="border-b border-teal-100 px-6 py-4 sticky top-0 bg-white/95 backdrop-blur z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-sm text-teal-700">← 共同親権サポートAI</Link>
          <Link href="/tool" className="bg-teal-600 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-teal-700">
            無料でドキュメント作成 →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-900 to-teal-700 text-white py-14 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-yellow-400 text-teal-900 text-xs font-black px-4 py-1.5 rounded-full mb-4">
            ✅ 2026年4月1日 施行済み
          </div>
          <h1 className="text-3xl font-black mb-4 leading-tight">
            共同親権とは？<br />
            <span className="text-teal-300">改正民法 完全ガイド</span>
          </h1>
          <p className="text-teal-200 text-sm mb-6">
            2026年4月1日に施行された共同親権制度を分かりやすく解説。<br />
            単独親権との違い・養育費・面会交流・手続き方法まで。
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="text-xs bg-teal-800 text-teal-200 px-3 py-1 rounded-full border border-teal-700">制度の概要</span>
            <span className="text-xs bg-teal-800 text-teal-200 px-3 py-1 rounded-full border border-teal-700">単独親権との違い</span>
            <span className="text-xs bg-teal-800 text-teal-200 px-3 py-1 rounded-full border border-teal-700">養育費</span>
            <span className="text-xs bg-teal-800 text-teal-200 px-3 py-1 rounded-full border border-teal-700">面会交流</span>
            <span className="text-xs bg-teal-800 text-teal-200 px-3 py-1 rounded-full border border-teal-700">DV被害者の方へ</span>
          </div>
          <Link href="/tool" className="inline-block bg-yellow-400 hover:bg-yellow-300 text-teal-900 font-black py-3 px-8 rounded-xl text-sm transition-colors">
            AIで親権計画書を無料作成する →
          </Link>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* 共同親権とは */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">共同親権とは</h2>
          <div className="prose prose-sm text-gray-700 space-y-3">
            <p className="leading-relaxed">
              <strong>共同親権</strong>とは、離婚後も父母双方が親権を持つ制度です。2026年4月1日に施行された改正民法により、日本でも「離婚後の共同親権」が選択できるようになりました。
            </p>
            <p className="leading-relaxed">
              これまでの日本の民法では、離婚後は父または母の「単独親権」のみが認められていました。改正により、2026年4月1日以降に離婚する夫婦は、<strong>協議によって共同親権か単独親権かを選択</strong>できるようになります。合意できない場合は家庭裁判所が決定します。
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="font-bold text-amber-800 mb-1">⚠️ 重要な注意点</p>
              <p className="text-amber-700 text-xs">
                DV（ドメスティック・バイオレンス）や子への虐待が認定される場合、裁判所は単独親権と判断します。DV被害者の方は必ず弁護士または法テラスにご相談ください。
              </p>
            </div>
          </div>
        </section>

        {/* 法改正タイムライン */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">法改正タイムライン</h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-teal-200" />
            <div className="space-y-5">
              {TIMELINE.map((item, i) => (
                <div key={i} className="relative pl-14">
                  <div className={`absolute left-4 top-4 w-4 h-4 rounded-full border-4 ${item.highlight ? "border-teal-600 bg-yellow-400" : "border-teal-300 bg-white"} -translate-x-2`} />
                  <div className={`rounded-2xl p-4 ${item.highlight ? "bg-teal-900 text-white border-2 border-yellow-400" : "bg-gray-50 border border-gray-200"}`}>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.highlight ? "bg-yellow-400 text-teal-900" : "bg-teal-100 text-teal-700"}`}>{item.year} {item.month}</span>
                      <span className={`font-bold text-sm ${item.highlight ? "text-yellow-300" : "text-gray-900"}`}>{item.title}</span>
                    </div>
                    <p className={`text-xs leading-relaxed ${item.highlight ? "text-teal-200" : "text-gray-600"}`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 単独親権との違い */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">共同親権 vs 単独親権 の違い</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-teal-800 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-bold">項目</th>
                  <th className="px-4 py-3 text-center font-bold text-gray-200">単独親権</th>
                  <th className="px-4 py-3 text-center font-bold text-yellow-300">共同親権</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {DIFFERENCES.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3 font-bold text-gray-800 text-xs">{row.category}</td>
                    <td className="px-4 py-3 text-center text-gray-600 text-xs">{row.solo}</td>
                    <td className="px-4 py-3 text-center text-teal-700 text-xs font-medium">{row.joint}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 養育費について */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">養育費 — 2026年の新しいルール</h2>
          <div className="space-y-4">
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5">
              <h3 className="font-bold text-teal-800 mb-2">法定養育費（2026年4月〜）</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                2026年4月1日以降の離婚では、養育費の取り決めが未合意でも<strong>子ども1人につき月額2万円の「法定養育費」が自動的に発生</strong>します。法定養育費には先取特権が付与されており、不払い時の財産差し押さえがより簡易になりました。
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <h3 className="font-bold text-amber-800 mb-2">法定養育費2万円は「最低ライン」</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                法定養育費はあくまで最低保障額です。実際の養育費は裁判所の「養育費算定表」に基づき決定されます。子ども1人の場合、一般的な月額相場は<strong>月2〜8万円程度</strong>です。収入差・子の年齢・特別な事情によって大きく異なります。
              </p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Link href="/#alimony" className="inline-block text-sm font-bold text-teal-700 hover:underline">
              → 養育費かんたん計算機を使う
            </Link>
          </div>
        </section>

        {/* DV被害者へ */}
        <section className="mb-12 bg-red-50 border border-red-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🚨 DV・虐待被害者の方へ</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            共同親権制度ではDVや子への虐待が認定される場合、裁判所は<strong>単独親権</strong>と判断します。DV被害者の方は、まず安全を確保することが最優先です。
          </p>
          <div className="space-y-2">
            <div className="bg-red-900 text-white rounded-xl p-3">
              <p className="font-bold text-sm">DV相談ナビ</p>
              <p className="text-red-200 text-xs">電話番号: <strong>#8008</strong>（24時間対応・無料）</p>
            </div>
            <div className="bg-red-900 text-white rounded-xl p-3">
              <p className="font-bold text-sm">法テラス（費用立替制度）</p>
              <p className="text-red-200 text-xs">収入が一定以下の方は弁護士費用を立替。<a href="https://www.houterasu.or.jp/" target="_blank" rel="noopener noreferrer" className="underline text-red-300">houterasu.or.jp</a></p>
            </div>
          </div>
        </section>

        {/* AI活用 */}
        <section className="mb-12 bg-teal-900 text-white rounded-2xl p-6 text-center">
          <h2 className="text-xl font-bold mb-3">AIで親権計画書・養育費計算書を無料作成</h2>
          <p className="text-teal-200 text-sm mb-5">このガイドで学んだ内容を基に、AIが30秒で親権計画書・面会カレンダー・養育費目安・調停準備メモを生成します。</p>
          <Link href="/tool" className="inline-block bg-yellow-400 hover:bg-yellow-300 text-teal-900 font-black py-3 px-8 rounded-xl text-sm transition-colors">
            AIで書類を無料作成する →
          </Link>
          <p className="text-teal-400 text-xs mt-2">登録不要・弁護士費用の100分の1以下</p>
        </section>
      </div>

      <footer className="text-center text-xs pb-8 text-gray-400 border-t pt-6">
        <Link href="/" className="hover:underline">共同親権サポートAI トップ</Link>
        {" | "}
        <Link href="/tool" className="hover:underline">書類作成ツール</Link>
        {" | "}
        <Link href="/legal" className="hover:underline">特定商取引法</Link>
        {" | "}
        <Link href="/privacy" className="hover:underline">プライバシーポリシー</Link>
        <p className="mt-2 text-xs">
          ⚠️ 本ガイドはAIが生成する参考情報です。法律相談・法的サービスではありません。実際の手続きは弁護士・家庭裁判所にご相談ください。
        </p>
      </footer>
    </main>
  );
}
