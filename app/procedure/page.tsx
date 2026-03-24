import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "共同親権の手続き方法・申立書の書き方【2026年4月版】— 共同親権サポートAI",
  description: "共同親権の手続き方法を完全解説。協議で共同親権を選ぶ方法・家庭裁判所への申立手順・必要書類・費用・調停から審判までの流れを分かりやすく説明。1回無料で申立準備書類をAI作成。",
  keywords: ["共同親権 手続き", "共同親権 申立", "共同親権 書き方", "共同親権 必要書類", "調停 申立書 書き方", "親権者変更 手続き", "共同親権 費用", "家庭裁判所 親権"],
  openGraph: {
    title: "共同親権の手続き方法・申立書の書き方【2026年4月版】",
    description: "共同親権の手続きを完全解説。協議・調停・審判の流れ、必要書類、費用まで。AIで申立書類草案を無料作成。",
    url: "https://kyodo-shinken-ai.vercel.app/procedure",
  },
  alternates: { canonical: "https://kyodo-shinken-ai.vercel.app/procedure" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "共同親権の手続き方法・申立書の書き方【2026年4月版】",
      "description": "共同親権の手続き方法を完全解説。協議・調停・審判の流れ、必要書類、費用まで。",
      "url": "https://kyodo-shinken-ai.vercel.app/procedure",
      "datePublished": "2026-04-01",
      "dateModified": "2026-03-20",
      "publisher": { "@type": "Organization", "name": "共同親権サポートAI" },
      "author": { "@type": "Organization", "name": "共同親権サポートAI編集部" },
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "共同親権の手続きはどこでできますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "離婚協議書で合意した場合は市区町村役場への離婚届提出で完了します。合意できない場合は家庭裁判所に「離婚調停」または「親権者変更調停」を申し立てます。すでに離婚済みの場合は「親権者変更調停」申立が必要です。"
          }
        },
        {
          "@type": "Question",
          "name": "共同親権の申立に必要な書類は何ですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "家事調停申立書（裁判所のWEBから入手可能）・申立人と相手方の戸籍謄本（3ヶ月以内）・子どもの戸籍謄本・収入を証明する書類（源泉徴収票など）・収入印紙1,200円・連絡用郵便切手（裁判所により異なる）が必要です。"
          }
        },
        {
          "@type": "Question",
          "name": "共同親権の手続き費用はいくらですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "協議で決める場合は離婚届の収入印紙代（数百円）のみです。調停申立の場合は収入印紙1,200円＋郵便切手（裁判所によって1,000〜2,000円）で3,000〜5,000円程度。弁護士に依頼すると着手金15〜30万円＋成功報酬10〜20万円が一般的です。"
          }
        },
        {
          "@type": "Question",
          "name": "調停で共同親権が決まるまで何ヶ月かかりますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "通常3〜8ヶ月程度です。1回の調停期日（約2時間）から始まり、合意に至らない場合は2〜3ヶ月ごとに期日が設けられます。複雑な案件や審判移行の場合は1〜2年かかることもあります。"
          }
        },
        {
          "@type": "Question",
          "name": "すでに離婚している場合、共同親権に変更できますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "できます。2026年4月施行前に単独親権で離婚済みの場合も、家庭裁判所への「親権者変更調停」申立によって共同親権に変更できます。申立費用は収入印紙1,200円＋郵便切手代です。相手方の同意があれば調停成立、なければ審判で裁判所が決定します。"
          }
        },
      ],
    },
  ],
};

const PROCEDURE_STEPS = [
  {
    step: 1,
    title: "話し合い（協議）",
    duration: "1週間〜数ヶ月",
    icon: "",
    color: "teal",
    content: [
      "父母双方が「共同親権」か「単独親権」かを話し合いで決める",
      "合意した場合は「離婚協議書」を作成し、公正証書にすることを推奨",
      "養育費・面会交流・親権の3点セットを書面で残すことが重要",
      "市区町村役場への離婚届提出で手続き完了（協議離婚の場合）",
    ],
    tip: "協議書の作成前に当AIで「親権計画書草案」を無料作成しておくと話し合いがスムーズになります",
  },
  {
    step: 2,
    title: "家庭裁判所への調停申立",
    duration: "合意できない場合",
    icon: "",
    color: "amber",
    content: [
      "申立先：相手方の住所地を管轄する家庭裁判所",
      "申立書類：家事調停申立書・双方の戸籍謄本・収入証明（源泉徴収票等）",
      "申立費用：収入印紙1,200円＋郵便切手代（1,000〜2,000円）",
      "申立書は裁判所の公式サイトからダウンロード可能",
    ],
    tip: "当AIの「調停準備メモ」で必要書類・主張ポイントを事前に整理できます",
  },
  {
    step: 3,
    title: "調停（話し合い）",
    duration: "3〜8ヶ月",
    icon: "",
    color: "blue",
    content: [
      "調停委員（弁護士や有識者2名）が仲介して父母交互に話し合い",
      "1回の期日は約2〜3時間、2〜3ヶ月ごとに開催",
      "合意できれば「調停調書」が作成され確定（強制執行力あり）",
      "養育費・面会交流・財産分与も同時に決めることが多い",
    ],
    tip: "調停では書面で主張を整理することが重要。当AIの「親権計画書」が主張の軸になります",
  },
  {
    step: 4,
    title: "審判（裁判官の決定）",
    duration: "調停不成立後",
    icon: "️",
    color: "red",
    content: [
      "調停が成立しない場合、自動的に審判手続きへ移行",
      "裁判官が双方の主張・証拠・子どもの意思（10歳以上が目安）を考慮",
      "判断基準は「子の利益」が最優先",
      "DVや虐待が認定される場合は単独親権とする判断が多い",
    ],
    tip: "審判では証拠が重要。日記・写真・医療記録・LINE履歴などを保全しておきましょう",
  },
];

const REQUIRED_DOCS = [
  { doc: "家事調停申立書", note: "裁判所公式サイトからDL", where: "最寄りの家庭裁判所または裁判所公式サイト", cost: "無料" },
  { doc: "収入印紙", note: "1,200円分", where: "裁判所内窓口・郵便局・コンビニ", cost: "¥1,200" },
  { doc: "連絡用郵便切手", note: "裁判所指定の金額", where: "郵便局・コンビニ", cost: "¥1,000〜2,000程度" },
  { doc: "申立人・相手方の戸籍謄本", note: "3ヶ月以内のもの", where: "本籍地の市区町村役場", cost: "¥450/通" },
  { doc: "子どもの戸籍謄本", note: "3ヶ月以内のもの", where: "本籍地の市区町村役場", cost: "¥450/通" },
  { doc: "収入証明書類", note: "源泉徴収票または課税証明書", where: "勤務先または市区町村役場", cost: "無料〜¥200" },
];

const COST_TABLE = [
  { method: "協議離婚（合意あり）", court: "不要", lawyer: "不要", total: "¥5,000以下", period: "1〜3ヶ月" },
  { method: "調停離婚", court: "¥3,000〜5,000", lawyer: "任意（¥25〜50万）", total: "¥3,000〜55万", period: "3〜8ヶ月" },
  { method: "審判（調停不成立後）", court: "¥3,000〜5,000", lawyer: "推奨（¥40〜90万）", total: "¥40〜95万", period: "6〜18ヶ月" },
];

export default function ProcedurePage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-teal-600"> 共同親権サポートAI</Link>
        <div className="flex items-center gap-4">
          <Link href="/guide" className="text-sm text-gray-600 hover:text-teal-600 hidden md:block">解説ガイド</Link>
          <Link href="/checklist" className="text-sm text-gray-600 hover:text-teal-600 hidden md:block">チェックリスト</Link>
          <Link href="/tool" className="text-sm bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">無料で書類作成</Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-teal-600 font-bold mb-3">
            <Link href="/" className="hover:underline">トップ</Link>
            <span>›</span>
            <span>手続きガイド</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-4">
            共同親権の手続き方法・<br className="md:hidden" />申立書の書き方【2026年4月版】
          </h1>
          <p className="text-gray-600 leading-relaxed mb-4">
            2026年4月1日施行の改正民法による「共同親権」を選ぶための手続きを完全解説します。協議で決める方法・家庭裁判所への調停申立・必要書類・費用まで、ステップ順に説明します。
          </p>
          <div className="flex flex-wrap gap-2">
            {["共同親権 手続き", "調停申立書 書き方", "必要書類 費用", "2026年4月版"].map((kw) => (
              <span key={kw} className="text-xs bg-teal-50 text-teal-700 border border-teal-200 px-2 py-1 rounded-full">{kw}</span>
            ))}
          </div>
        </div>

        {/* Summary box */}
        <div className="bg-teal-50 border-l-4 border-teal-500 rounded-xl p-5 mb-8">
          <h2 className="text-base font-black text-teal-800 mb-3">この記事のポイント</h2>
          <ul className="space-y-2 text-sm text-teal-800">
            <li className="flex gap-2"><span className="text-teal-500 font-bold shrink-0"></span>共同親権の手続きは「協議→調停→審判」の順に進む</li>
            <li className="flex gap-2"><span className="text-teal-500 font-bold shrink-0"></span>協議で合意できれば費用は5,000円以下、弁護士不要</li>
            <li className="flex gap-2"><span className="text-teal-500 font-bold shrink-0"></span>調停申立の費用は収入印紙1,200円＋郵便切手で約3,000〜5,000円</li>
            <li className="flex gap-2"><span className="text-teal-500 font-bold shrink-0"></span>すでに離婚済みでも「親権者変更調停」で共同親権に変更可能</li>
            <li className="flex gap-2"><span className="text-teal-500 font-bold shrink-0"></span>当AIで申立準備書類（親権計画書・養育費・調停メモ）を無料作成できる</li>
          </ul>
        </div>

        {/* Steps */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-gray-900 mb-5">共同親権手続きの4ステップ</h2>
          <div className="space-y-4">
            {PROCEDURE_STEPS.map((s) => (
              <div key={s.step} className={`bg-white rounded-2xl border ${s.color === "teal" ? "border-teal-200" : s.color === "amber" ? "border-amber-200" : s.color === "blue" ? "border-blue-200" : "border-red-200"} p-6`}>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0 ${s.color === "teal" ? "bg-teal-500" : s.color === "amber" ? "bg-amber-500" : s.color === "blue" ? "bg-blue-500" : "bg-red-500"}`}>
                    {s.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-base font-black text-gray-900">{s.icon} {s.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${s.color === "teal" ? "bg-teal-100 text-teal-700" : s.color === "amber" ? "bg-amber-100 text-amber-700" : s.color === "blue" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"}`}>
                        目安: {s.duration}
                      </span>
                    </div>
                    <ul className="space-y-1.5 mt-3">
                      {s.content.map((c, i) => (
                        <li key={i} className="flex gap-2 text-sm text-gray-700">
                          <span className={`shrink-0 font-bold mt-0.5 ${s.color === "teal" ? "text-teal-500" : s.color === "amber" ? "text-amber-500" : s.color === "blue" ? "text-blue-500" : "text-red-500"}`}>●</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                    <div className={`mt-3 p-3 rounded-lg text-xs font-medium ${s.color === "teal" ? "bg-teal-50 text-teal-700" : s.color === "amber" ? "bg-amber-50 text-amber-700" : s.color === "blue" ? "bg-blue-50 text-blue-700" : "bg-red-50 text-red-700"}`}>
                       {s.tip}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Required documents table */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-gray-900 mb-5">調停申立に必要な書類一覧</h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-bold text-gray-700">書類名</th>
                    <th className="text-left px-4 py-3 font-bold text-gray-700 hidden md:table-cell">備考</th>
                    <th className="text-left px-4 py-3 font-bold text-gray-700 hidden md:table-cell">入手先</th>
                    <th className="text-left px-4 py-3 font-bold text-gray-700">費用</th>
                  </tr>
                </thead>
                <tbody>
                  {REQUIRED_DOCS.map((d, i) => (
                    <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "" : "bg-gray-50"}`}>
                      <td className="px-4 py-3 font-medium text-gray-900">{d.doc}</td>
                      <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{d.note}</td>
                      <td className="px-4 py-3 text-gray-600 hidden md:table-cell text-xs">{d.where}</td>
                      <td className="px-4 py-3 font-bold text-teal-700">{d.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">※費用は2026年4月時点の概算です。裁判所により郵便切手の金額が異なります。</p>
        </section>

        {/* Cost comparison */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-gray-900 mb-5">手続き別 費用・期間の比較</h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-teal-50 border-b border-teal-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-bold text-teal-800">手続き方法</th>
                    <th className="text-left px-4 py-3 font-bold text-teal-800">裁判所費用</th>
                    <th className="text-left px-4 py-3 font-bold text-teal-800 hidden md:table-cell">弁護士費用</th>
                    <th className="text-left px-4 py-3 font-bold text-teal-800">合計目安</th>
                    <th className="text-left px-4 py-3 font-bold text-teal-800 hidden md:table-cell">期間</th>
                  </tr>
                </thead>
                <tbody>
                  {COST_TABLE.map((row, i) => (
                    <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "" : "bg-gray-50"}`}>
                      <td className="px-4 py-3 font-medium text-gray-900">{row.method}</td>
                      <td className="px-4 py-3 text-gray-700">{row.court}</td>
                      <td className="px-4 py-3 text-gray-700 hidden md:table-cell">{row.lawyer}</td>
                      <td className="px-4 py-3 font-bold text-teal-700">{row.total}</td>
                      <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{row.period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Changed custody after divorce */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-gray-900 mb-4">すでに離婚済みの方：親権変更の手続き</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <p className="text-sm text-amber-800 mb-4 leading-relaxed">
              2026年4月1日施行前に単独親権で離婚が成立していても、<strong>「親権者変更調停」</strong>を家庭裁判所に申し立てることで共同親権に変更できます。
            </p>
            <ol className="space-y-3">
              {[
                { n: 1, text: "家庭裁判所に「親権者変更調停申立書」を提出（印紙1,200円）" },
                { n: 2, text: "相手方に呼出状が送達、調停期日が設定される（1〜2ヶ月後）" },
                { n: 3, text: "調停委員の仲介のもと双方が話し合い" },
                { n: 4, text: "合意すれば調停成立→調停調書に記載" },
                { n: 5, text: "不合意の場合は審判移行→裁判官が判断" },
                { n: 6, text: "成立後、市区町村役場に「親権者変更届」を提出（申立から変更届まで2〜12ヶ月が目安）" },
              ].map((item) => (
                <li key={item.n} className="flex gap-3 text-sm text-amber-900">
                  <span className="flex-shrink-0 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">{item.n}</span>
                  <span className="leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-gray-900 mb-5">よくある質問（共同親権 手続き編）</h2>
          <div className="space-y-4">
            {[
              { q: "調停の申立書はどこで手に入りますか？", a: "最寄りの家庭裁判所の窓口か、裁判所公式サイト（https://www.courts.go.jp）から書式をダウンロードできます。記入方法は裁判所窓口で相談することも可能です。また、司法書士に書類作成を依頼することもできます（費用3〜5万円程度）。" },
              { q: "弁護士なしで調停に臨めますか？", a: "法律上は弁護士なしで調停に出席できます。ただし、養育費・財産分与・DV被害など複雑な案件では弁護士のサポートが有利です。費用を抑えるなら、調停前に当AIで書類を整理→弁護士に1〜2回相談（約1〜3万円）という方法がコスト効率的です。" },
              { q: "共同親権の手続き中、子どもと会えますか？", a: "申立中であっても面会交流の権利は認められます。手続き中は裁判所に「審判前の保全処分」として面会交流を求めることもできます。また、調停の中で面会交流のルールを同時に取り決めることが一般的です。" },
              { q: "相手が調停に来ない場合はどうなりますか？", a: "相手方が正当な理由なく調停に出席しない場合、過料（5万円以下）が科せられる場合があります。また、調停が不成立となり審判に移行することで、相手方不在でも裁判官が判断を下すことができます。" },
            ].map((item, i) => (
              <details key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden group">
                <summary className="px-6 py-4 cursor-pointer text-sm font-bold text-gray-800 hover:bg-gray-50 flex items-center justify-between">
                  <span>Q. {item.q}</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform duration-200 text-lg">▼</span>
                </summary>
                <div className="px-6 pb-5 text-sm text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-7 text-white text-center">
          <div className="text-3xl mb-3"></div>
          <h2 className="text-xl font-black mb-2">調停申立の前にAIで書類を準備しよう</h2>
          <p className="text-teal-100 text-sm mb-5 leading-relaxed">
            お子さんの情報を入力するだけで、AIが親権計画書草案・面会交流カレンダー・養育費の目安・調停準備メモを自動生成。弁護士相談の費用を大幅節約できます。初回1回無料。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/tool"
              className="bg-white text-teal-700 font-black px-8 py-4 rounded-xl text-sm hover:bg-teal-50 transition-colors"
            >
              無料で調停準備書類を作成する →
            </Link>
            <Link
              href="/checklist"
              className="bg-teal-500 border border-teal-400 text-white font-bold px-8 py-4 rounded-xl text-sm hover:bg-teal-400 transition-colors"
            >
              手続きチェックリストを確認する
            </Link>
          </div>
          <p className="text-teal-200 text-xs mt-3">初回1回無料 • クレジットカード不要 • 30秒で完成</p>
        </div>

        {/* Related links */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-sm font-black text-gray-700 mb-3">関連ページ</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Link href="/guide" className="block bg-gray-50 hover:bg-teal-50 border border-gray-200 hover:border-teal-200 rounded-xl p-4 transition-colors">
              <div className="font-bold text-sm text-gray-800 mb-1">共同親権とは？</div>
              <div className="text-xs text-gray-500">制度の概要・2026年4月の変更点</div>
            </Link>
            <Link href="/checklist" className="block bg-gray-50 hover:bg-teal-50 border border-gray-200 hover:border-teal-200 rounded-xl p-4 transition-colors">
              <div className="font-bold text-sm text-gray-800 mb-1">手続きチェックリスト</div>
              <div className="text-xs text-gray-500">忘れずに確認すべき10項目</div>
            </Link>
            <Link href="/tool" className="block bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl p-4 transition-colors">
              <div className="font-bold text-sm text-teal-800 mb-1">AI書類作成ツール</div>
              <div className="text-xs text-teal-600">親権計画書・養育費・調停メモ</div>
            </Link>
          </div>
        </div>
      </div>

      <footer className="border-t border-gray-200 py-6 text-center text-xs text-gray-400 space-x-4 mt-10">
        <Link href="/legal" className="hover:underline">特定商取引法</Link>
        <Link href="/privacy" className="hover:underline">プライバシーポリシー</Link>
        <Link href="/" className="hover:underline">トップへ戻る</Link>
      </footer>
    </main>
  );
}
