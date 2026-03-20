"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const CHECKLIST = [
  {
    category: "基本確認",
    color: "teal",
    items: [
      {
        id: "check-1",
        num: 1,
        title: "DV・虐待・高葛藤の有無を確認",
        desc: "共同親権は両親が協力できる場合に適しています。DV・虐待・高葛藤がある場合は単独親権が選択されます。証拠（診断書・警察届出・LINE記録）を保全してください。",
        priority: "最重要",
        priorityColor: "red",
      },
      {
        id: "check-2",
        num: 2,
        title: "子どもの意見・意思の確認",
        desc: "15歳以上の子は自ら意見を述べる機会があります。子どもの意思・意見をしっかり聞き、最善の利益を最優先に考えましょう。",
        priority: "必須",
        priorityColor: "orange",
      },
      {
        id: "check-3",
        num: 3,
        title: "両親の協力関係が維持できるか判断",
        desc: "共同親権では転居・進学・医療など「重要事項」で両親の合意が必要になります。元パートナーと最低限の連絡・協議ができるか確認してください。",
        priority: "必須",
        priorityColor: "orange",
      },
    ],
  },
  {
    category: "親権計画書の作成",
    color: "blue",
    items: [
      {
        id: "check-4",
        num: 4,
        title: "基本居住地（どちらと主に住むか）を決定",
        desc: "子どもが主に住む場所（基本居住地）を決定します。基本居住地の親が日常的な養育を担い、転居・進学は双方合意が必要になります。",
        priority: "必須",
        priorityColor: "orange",
      },
      {
        id: "check-5",
        num: 5,
        title: "重要事項の決定ルール（合意の方法）を明文化",
        desc: "転居・入学・医療の同意・習い事・宗教教育など、重要事項の定義と合意のプロセスを書面で定めます。曖昧にするとトラブルの原因になります。",
        priority: "必須",
        priorityColor: "orange",
      },
      {
        id: "check-6",
        num: 6,
        title: "緊急時の連絡・対応方法を決定",
        desc: "子どもが病気・事故・緊急入院の際の連絡方法と意思決定プロセスを事前に決めます。緊急事態で合意を得られない場合の対応も定めておきましょう。",
        priority: "推奨",
        priorityColor: "blue",
      },
    ],
  },
  {
    category: "面会交流の取り決め",
    color: "green",
    items: [
      {
        id: "check-7",
        num: 7,
        title: "月次の面会スケジュールを書面化",
        desc: "月何回・何曜日・何時間・どこで会うかを具体的に書面で決定します。「月2回程度」など曖昧な表現は後のトラブルの原因になります。",
        priority: "必須",
        priorityColor: "orange",
      },
      {
        id: "check-8",
        num: 8,
        title: "長期休暇・誕生日・行事の取り決め",
        desc: "夏休み・冬休み・春休みの面会・誕生日の過ごし方・入学式などの行事への参加方法を具体的に決めます。",
        priority: "推奨",
        priorityColor: "blue",
      },
    ],
  },
  {
    category: "養育費・費用負担",
    color: "yellow",
    items: [
      {
        id: "check-9",
        num: 9,
        title: "養育費の金額・支払い方法を合意書で文書化",
        desc: "裁判所の養育費算定表をもとに金額を決定し、公正証書を作成します。2026年4月から法定養育費（月2万円/子）が自動発生しますが、算定表による相場より低いケースが多いです。",
        priority: "必須",
        priorityColor: "orange",
      },
      {
        id: "check-10",
        num: 10,
        title: "教育費・医療費などの分担ルールを決定",
        desc: "学校の給食費・修学旅行費・塾・部活・医療費の自己負担分など、継続費用以外の追加費用の負担割合を事前に決めておきましょう。",
        priority: "推奨",
        priorityColor: "blue",
      },
    ],
  },
];

const ALL_IDS = CHECKLIST.flatMap((s) => s.items.map((i) => i.id));
const STORAGE_KEY = "kyodo-checklist-v1";

export default function ChecklistPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChecked(JSON.parse(saved));
    } catch {}
  }, []);

  function toggle(id: string) {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }

  function resetAll() {
    setChecked({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }

  const completedCount = ALL_IDS.filter((id) => checked[id]).length;
  const totalCount = ALL_IDS.length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  const shareText = `共同親権サポートAIのチェックリスト ${completedCount}/${totalCount}項目完了！2026年4月施行の共同親権制度に備えて準備中 → https://kyodo-shinken-ai.vercel.app/checklist #共同親権 #離婚準備`;

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4 sticky top-0 bg-white/95 backdrop-blur z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-teal-700">← 共同親権サポートAI</Link>
          <Link href="/tool" className="bg-teal-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-teal-700">
            無料で書類作成 →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-900 to-teal-700 text-white py-14 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-yellow-400 text-teal-900 text-xs font-black px-4 py-1.5 rounded-full mb-5">
            ✅ 2026年4月1日 施行済み
          </span>
          <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
            共同親権チェックリスト<br />
            <span className="text-teal-300">離婚前・離婚後に確認すべき10項目</span>
          </h1>
          <p className="text-teal-100 text-base max-w-xl mx-auto mb-6">
            2026年4月施行の改正民法に対応。弁護士に相談する前に自分でできる準備を10のチェック項目で解説します。チェック済み項目はブラウザに自動保存されます。
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="bg-white/10 border border-white/20 text-white rounded-full px-4 py-1.5 text-sm font-medium">📋 10項目完全網羅</span>
            <span className="bg-white/10 border border-white/20 text-white rounded-full px-4 py-1.5 text-sm font-medium">⚖️ 改正民法2026対応</span>
            <span className="bg-white/10 border border-white/20 text-white rounded-full px-4 py-1.5 text-sm font-medium">💾 進捗自動保存</span>
          </div>
        </div>
      </section>

      {/* 進捗バー */}
      {mounted && (
        <div className="bg-white border-b border-teal-100 py-5 px-4 sticky top-[57px] z-10 shadow-sm">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-gray-700">
                進捗: <span className="text-teal-700">{completedCount}/{totalCount}</span> 項目完了
              </span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-teal-700">{progressPct}%</span>
                <button onClick={resetAll} className="text-xs text-gray-400 hover:text-red-500 underline transition-colors">リセット</button>
              </div>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            {completedCount === totalCount && (
              <div className="mt-3 bg-teal-50 border border-teal-200 rounded-xl p-3 flex items-center justify-between flex-wrap gap-3">
                <p className="text-sm font-bold text-teal-700">🎉 全10項目完了！次はAIで書類を作成しましょう。</p>
                <div className="flex gap-2">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    Xでシェア
                  </a>
                  <Link href="/tool" className="inline-block bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">
                    書類作成へ →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 優先度説明 */}
      <section className="bg-gray-50 border-b border-gray-200 py-4 px-4">
        <div className="max-w-3xl mx-auto flex flex-wrap gap-3 justify-center text-xs font-bold">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" />最重要（必ず確認）</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />必須（書面化必要）</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />推奨（強くお勧め）</span>
        </div>
      </section>

      {/* チェックリスト本体 */}
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-12">
        {CHECKLIST.map((section) => (
          <section key={section.category}>
            <h2 className="text-lg font-black text-gray-900 mb-5 flex items-center gap-2">
              <span className={`w-1.5 h-6 rounded-full bg-${section.color}-500 inline-block`} />
              {section.category}
            </h2>
            <div className="space-y-4">
              {section.items.map((item) => {
                const isDone = mounted ? !!checked[item.id] : false;
                return (
                  <div
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className={`bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition-all cursor-pointer ${
                      isDone ? "border-teal-400 bg-teal-50" : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* チェックボックス */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shrink-0 transition-colors ${
                        isDone ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-500"
                      }`}>
                        {isDone ? "✓" : item.num}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h3 className={`font-bold text-sm ${isDone ? "line-through text-teal-600" : "text-gray-900"}`}>{item.title}</h3>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            item.priorityColor === "red" ? "bg-red-100 text-red-700" :
                            item.priorityColor === "orange" ? "bg-orange-100 text-orange-700" :
                            "bg-blue-100 text-blue-700"
                          }`}>{item.priority}</span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Xシェアボタン（中間） */}
      <div className="max-w-3xl mx-auto px-4 pb-6 text-center">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          進捗をXでシェア（{mounted ? completedCount : 0}/{totalCount}完了）
        </a>
      </div>

      {/* AIで書類作成 CTA */}
      <section className="bg-teal-700 py-12 px-4 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black mb-4">チェックリストを確認したら、次はAIで書類を作成</h2>
          <p className="text-teal-200 mb-6 text-sm">子どもの情報を入力するだけで、親権計画書・面会交流カレンダー・養育費の目安・調停準備メモを30秒で生成します。弁護士費用の100分の1以下。</p>
          <Link href="/tool" className="inline-block bg-yellow-400 hover:bg-yellow-300 text-teal-900 font-black text-lg px-10 py-4 rounded-2xl shadow-xl transition-colors">
            今すぐ無料で書類を作成する →
          </Link>
          <p className="text-teal-300 text-xs mt-3">登録不要・クレジットカード不要 • 1回無料</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-6">チェックリストに関するよくある質問</h2>
          <div className="space-y-4">
            {[
              { q: "共同親権を選んだ後で変更できますか？", a: "できます。共同親権から単独親権への変更は、家庭裁判所への「親権者変更」申立で可能です。DVや虐待が認定される場合、裁判所は単独親権に変更する判断を行います。" },
              { q: "共同親権で最もトラブルになりやすいことは？", a: "最も多いトラブルは「重要事項の決定で合意できない」ことです。転居・進学・医療の同意など両親の合意が必要な事項で意見が割れると、家庭裁判所への申立が必要になります。事前に親権計画書でルールを明確化しておくことが重要です。" },
              { q: "DV被害者でも共同親権になりますか？", a: "DVや虐待が認定される場合、裁判所は単独親権と判断します。証拠（診断書・警察届出・LINEや写真の記録）を保全し、弁護士または法テラスにご相談ください。" },
              { q: "このチェックリストを使って書類を作れますか？", a: "本ページは確認事項の一覧です。実際の書類（親権計画書・面会カレンダー・養育費計算・調停準備メモ）はAIツール（無料）で自動生成できます。" },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="font-semibold text-gray-800 text-sm mb-2">Q. {faq.q}</p>
                <p className="text-sm text-gray-600 leading-relaxed">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-gray-100 text-center text-xs text-gray-400">
        <div className="max-w-xl mx-auto">
          <p className="mb-2">⚠️ 本チェックリストは法的アドバイスの補助を目的とした情報提供です。個別の法的判断は弁護士にご相談ください。</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link href="/" className="underline hover:opacity-70">トップ</Link>
            <Link href="/guide" className="underline hover:opacity-70">制度ガイド</Link>
            <Link href="/tool" className="underline hover:opacity-70">無料ツール</Link>
            <Link href="/legal" className="underline hover:opacity-70">特商法</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
