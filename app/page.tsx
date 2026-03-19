"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import KomojuButton from "@/components/KomojuButton";

const FAQ_ITEMS = [
  { q: "共同親権制度はいつから始まりましたか？", a: "2026年4月1日に施行されました。改正民法により、離婚後も父母双方が親権を持つ「共同親権」が選択できるようになりました。" },
  { q: "既に離婚している場合、共同親権に変更できますか？", a: "できます。2026年4月1日施行前に単独親権で離婚が成立している場合も、「親権者変更」の家庭裁判所への申立によって共同親権に変更することが可能です。申立費用は収入印紙1,200円＋連絡用郵便切手が必要です。" },
  { q: "相手が共同親権を拒否したらどうなりますか？", a: "父母が合意できない場合は家庭裁判所が判断します。裁判所は「子の利益」を最優先に、双方の親との関係・DVの有無・協力の可能性などを総合的に判断して単独親権か共同親権かを決定します。" },
  { q: "DV・モラハラ被害者でも共同親権になるのですか？", a: "DV・虐待が認定される場合、裁判所は単独親権とする判断を行います。DV被害者は、証拠（診断書・警察への届出・LINEや写真の記録）をしっかり保全した上で、必ず弁護士または法テラスにご相談ください。" },
  { q: "法定養育費2万円とは何ですか？", a: "2026年4月1日以降の離婚では、養育費の取り決めが未合意でも子ども1人あたり月額2万円の「法定養育費」が自動的に発生します（子が2人以上の場合は人数分）。先取特権が付与されており、養育費不払い時に財産差し押さえの申立がより簡易になりました。" },
  { q: "養育費は再婚したら変わりますか？", a: "再婚によって養育費が自動的に変更されるわけではありません。ただし、再婚相手が子を養子縁組した場合や、支払う側・受け取る側の収入が大幅に変わった場合は、調停・審判で変更を求めることができます。" },
  { q: "離婚後も相手と連絡を取りたくない場合は？", a: "面会交流支援機関や弁護士を通じた間接交流（メッセージ仲介）が利用できます。高葛藤・DV事案では、裁判所が第三者機関の関与を条件とした面会ルールを定めることもあります。「りむすび」などの民間支援団体（¥5,500〜/月）の活用も有効です。" },
  { q: "このAIは弁護士の代わりになりますか？", a: "法的アドバイスの補助ツールです。AIは書類の草案作成や論点整理に役立ちますが、法的効力のある書類作成や正式な法的アドバイスについては弁護士にご相談ください。" },
  { q: "費用はかかりますか？", a: "基本機能は無料でご利用いただけます。親権計画書・面会カレンダー・養育費目安・調停準備メモを1回無料で生成できます。より詳細な相談機能や繰り返し利用にはプレミアムプラン（¥980/月）をご利用ください。" },
  { q: "個人情報は安全ですか？", a: "入力データは外部に共有されません。入力内容はAI生成後に即時消去され、サーバーに保存されることはありません。" },
];


const FEATURES = [
  { icon: "📋", title: "親権計画書草案", desc: "基本居住・日常養育の分担・重要事項の共同決定ルールをAIが自動作成。調停・協議のたたき台として使えます。" },
  { icon: "📅", title: "面会交流カレンダー", desc: "月次ルール・長期休暇の分担・誕生日行事の取り決めを具体的にスケジュール化。" },
  { icon: "💰", title: "養育費の目安", desc: "養育費算定表ベースで月額の概算を提示。支払いルール・増減が必要なケースも解説。" },
  { icon: "📝", title: "調停準備メモ", desc: "家庭裁判所への申立前に準備すべき書類・費用・主張ポイントを整理。弁護士費用を節約できます。" },
  { icon: "⚠️", title: "注意事項・トラブル予防", desc: "共同親権でよく起きるトラブルTOP5・法的落とし穴・調停が長引くパターン（プレミアム）。" },
];

const VOICES = [
  { role: "40代男性", text: "離婚後の面会交流の取り決め方が分かりました。AIが具体的なスケジュールの案を出してくれて、元妻との話し合いがスムーズになりました。" },
  { role: "30代女性・1児の母", text: "共同親権が始まって何を決めればいいか全然わからなかったんですが、このAIが項目を整理してくれて助かりました。弁護士に相談する前の準備に最適です。" },
  { role: "40代男性・単身赴任中", text: "東京と大阪の遠距離で面会スケジュールを組むのが大変でしたが、AIが季節ごとに具体的な案を出してくれました。弁護士費用を大幅に節約できました。" },
];

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="max-w-2xl mx-auto px-4 py-12">
      <h2 className="text-xl font-bold text-center mb-6">よくある質問（FAQ）</h2>
      <div className="space-y-3">
        {FAQ_ITEMS.map((item, i) => (
          <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              className="w-full text-left px-5 py-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="text-sm font-semibold text-gray-800">{item.q}</span>
              <span className="text-gray-400 text-lg ml-3 shrink-0">{openIndex === i ? "−" : "+"}</span>
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 bg-gray-50 text-sm text-gray-600 leading-relaxed">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function LandingPage() {
  const [showPayjp, setShowPayjp] = useState(false);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    const施行日 = new Date("2026-04-01T00:00:00+09:00");
    const today = new Date();
    const diff = Math.ceil((施行日.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    setDaysLeft(diff); // 負数も保持（施行後の経過日数表示のため）
  }, []);

  function startCheckout() {
    setShowPayjp(true);
  }

  return (
    <main className="min-h-screen bg-white">
      {/* 施行済みバナー */}
      <div className="bg-teal-700 text-white text-center py-3 px-4">
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="text-lg">✅</span>
          <span className="font-bold text-sm md:text-base">
            共同親権制度は2026年4月1日に施行されました
          </span>
          <span className="text-xs md:text-sm opacity-90">
            — 今すぐ親権計画書を作成 →
          </span>
        </div>
      </div>
      {showPayjp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl relative">
            <button onClick={() => setShowPayjp(false)} className="absolute top-3 right-3 text-gray-400 text-xl">✕</button>
            <h2 className="text-lg font-bold mb-4 text-center">プレミアムプランに登録</h2>
            <KomojuButton planId="standard" planLabel="プレミアムプラン ¥980/月を始める" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50" />
          </div>
        </div>
      )}
      <nav className="border-b border-gray-100 px-6 py-4 sticky top-0 bg-white/95 backdrop-blur z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="font-bold text-gray-900">⚖️ 共同親権サポートAI</span>
          <Link href="/tool" className="bg-teal-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-teal-700">
            無料で試す
          </Link>
        </div>
      </nav>

      {/* 施行告知バナー — 施行前後で動的切替 */}
      {daysLeft !== null && daysLeft > 0 ? (
        <div className="bg-red-600 text-white text-center text-sm font-bold py-3 px-4">
          🎯 2026年4月1日施行決定！新制度スタートまで<strong className="text-yellow-200 text-lg mx-2">あと{daysLeft}日</strong>— 今すぐ準備を！<Link href="/tool" className="ml-2 underline hover:no-underline text-yellow-200">無料で書類作成 →</Link>
        </div>
      ) : daysLeft === 0 ? (
        <div className="bg-red-600 text-white text-center text-sm font-bold py-3 px-4 animate-pulse">
          🎉 共同親権制度が<strong>本日2026年4月1日に施行</strong>されました！ 今すぐ手続きを開始しましょう<Link href="/tool" className="ml-2 underline hover:no-underline">AIで書類を作成する →</Link>
        </div>
      ) : (
        <div className="bg-teal-700 text-white text-center text-sm font-semibold py-2.5 px-4">
          ✅ 共同親権制度は<strong>2026年4月1日に施行済み</strong>です — AIで今すぐ親権計画書を作成<Link href="/tool" className="ml-2 underline hover:no-underline text-yellow-200">無料で試す →</Link>
        </div>
      )}

      {/* ヒーロー — ダークグラデーション刷新 */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700 text-white px-4 py-16 md:py-24 text-center overflow-x-hidden">
        <div className="max-w-4xl mx-auto">
        {/* 法的安心感バッジ */}
        <div className="inline-block bg-yellow-400 text-teal-900 text-xs font-black px-4 py-2 rounded-full mb-6 shadow-lg">
          ⚡ 弁護士費用の100分の1で法的書類作成
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
          2026年4月1日 共同親権制度、施行。<br /><span className="text-teal-300">あなたの子どもへの権利、どう変わる？今すぐ確認を。</span>
        </h1>
        <div className="bg-red-500/20 border border-red-400/50 rounded-xl px-4 py-3 text-sm text-red-200 font-medium max-w-xl mx-auto mb-6">
          ⚠️ 準備なしで交渉に臨むと、子どもと過ごせる時間を失うリスクがあります
        </div>
        <p className="text-base md:text-lg text-teal-100 mb-6 max-w-2xl mx-auto">
          子どもの情報を入力するだけ。AIが<strong className="text-white">親権計画書草案・面会交流カレンダー・養育費の目安・調停準備メモ</strong>をセットで生成。弁護士相談前の整理に。
        </p>
        {/* 安心バッジ群 */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <span className="bg-yellow-400/20 border border-yellow-400/50 text-yellow-200 rounded-full px-4 py-1.5 text-sm font-medium">⚖️ 2026年4月1日施行 共同親権法 対応済</span>
          <span className="bg-white/10 border border-white/20 text-white rounded-full px-4 py-1.5 text-sm font-medium">🔒 入力内容は保存されません</span>
          <span className="bg-white/10 border border-white/20 text-white rounded-full px-4 py-1.5 text-sm font-medium">📄 法律家に相談しやすい草案を生成</span>
        </div>
        <Link href="/tool" className="inline-block bg-yellow-400 hover:bg-yellow-300 text-teal-900 font-black text-lg px-10 py-5 rounded-2xl shadow-2xl mb-3 w-full sm:w-auto transition-colors">
          施行前に今すぐ確認する（無料）→
        </Link>
        <p className="text-sm font-semibold text-teal-200 mb-1">親権計画書 1回・面会スケジュール 1回 無料作成</p>
        <p className="text-sm text-teal-300">登録不要・クレジットカード不要</p>
        </div>
      </section>

      {/* 感情フック：ストーリー型 */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-red-50 text-red-600 text-xs font-bold px-4 py-2 rounded-full mb-4 border border-red-200">
              こんな経験、ありませんか？
            </div>
          </div>
          <div className="space-y-4">
            {[
              { icon: "😰", title: "「何を決めればいいか」が全くわからない", body: "共同親権になった途端、学校の転校・医療の同意・習い事まで「両親の合意が必要」に。どんな書類で何を決めればいいのか、調べても調べても正解が見えない。" },
              { icon: "💸", title: "弁護士に相談する費用が怖い", body: "初回相談だけで1万円以上。争いになったら着手金30万円〜。でも相手との交渉はもう始まっている。時間がない、お金もない、どうすればいい？" },
              { icon: "😤", title: "「話し合い」が全く進まない", body: "元パートナーと直接話すのが辛い。でも家庭裁判所は「まず当事者間で話し合いを」という。具体的な提案書がなければ、いつまでも平行線のまま。" },
            ].map((p) => (
              <div key={p.title} className="flex gap-4 bg-gray-50 border border-gray-200 rounded-2xl p-5">
                <div className="text-3xl shrink-0">{p.icon}</div>
                <div>
                  <p className="font-bold text-gray-900 text-sm mb-1">{p.title}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-teal-50 border border-teal-200 rounded-2xl p-6 text-center">
            <p className="text-teal-800 font-bold text-sm mb-1">その悩み、AIが30秒で解決できます</p>
            <p className="text-teal-600 text-xs mb-4">親権計画書・面会カレンダー・養育費の目安・調停準備メモをセットで生成</p>
            <Link href="/tool" className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-black px-8 py-3 rounded-xl text-sm transition-colors">
              今すぐ無料で書類を作成する →
            </Link>
          </div>
        </div>
      </section>

      {/* 課題 */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-10">こんな悩みを解決します</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              "共同親権で何を決めればいいか全くわからない",
              "弁護士費用が高くて気軽に相談できない",
              "面会交流のルールをどう決めるか揉めている",
              "養育費の相場がわからない",
              "調停申立に何の書類が必要か分からない",
              "相手と話し合うための具体的な提案書を作りたい",
            ].map(p => (
              <div key={p} className="flex gap-3 bg-white rounded-xl p-4 border border-gray-200">
                <span className="text-red-500 text-lg shrink-0">✗</span>
                <p className="text-sm text-gray-700">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 機能 */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-3">生成されるドキュメントセット</h2>
          <p className="text-center text-gray-500 text-sm mb-10">1回の入力で5種類のドキュメントが出力されます</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(f => (
              <div key={f.title} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="text-2xl mb-2">{f.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 使い方 */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-10">使い方は3ステップ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { step: "1", title: "お子さんの情報を入力", desc: "年齢・人数・現在の同居状況を入力" },
              { step: "2", title: "両親の状況を入力（任意）", desc: "居住地・仕事・紛争レベルなどを入力" },
              { step: "3", title: "ドキュメントを受け取る", desc: "30秒で5種類のドキュメントが生成" },
            ].map(s => (
              <div key={s.step} className="text-center">
                <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">{s.step}</div>
                <p className="font-semibold text-gray-900 mb-1 text-sm">{s.title}</p>
                <p className="text-xs text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 声 */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-10">ご利用者の声</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {VOICES.map((v, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-200">
                <div className="flex text-yellow-400 text-sm mb-3">{"★★★★★"}</div>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">{v.text}</p>
                <p className="text-xs text-gray-400">{v.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 料金 */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-3">料金プラン</h2>
          <p className="text-center text-gray-500 text-sm mb-8">すべてのプランで親権計画書・面会カレンダー・養育費・調停メモがセット</p>

          {/* 費用比較表 */}
          <div className="bg-white border border-teal-200 rounded-2xl px-6 py-5 max-w-xl mx-auto mb-8 shadow-sm">
            <p className="text-center text-sm font-bold text-gray-700 mb-4">💡 弁護士費用と比べると...</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-2 text-left text-xs text-gray-500 font-semibold"></th>
                    <th className="border border-gray-200 px-4 py-2 text-center text-xs text-red-600 font-bold">弁護士</th>
                    <th className="border border-gray-200 px-4 py-2 text-center text-xs text-teal-700 font-bold">本AI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 text-xs text-gray-600">相談料</td>
                    <td className="border border-gray-200 px-4 py-2 text-center text-xs text-red-500 font-semibold">¥5,000〜/時間</td>
                    <td className="border border-gray-200 px-4 py-2 text-center text-xs text-teal-600 font-semibold">基本無料</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 text-xs text-gray-600">着手金</td>
                    <td className="border border-gray-200 px-4 py-2 text-center text-xs text-red-500 font-semibold">¥30万〜</td>
                    <td className="border border-gray-200 px-4 py-2 text-center text-xs text-teal-600 font-semibold">不要</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 text-xs text-gray-600">継続利用</td>
                    <td className="border border-gray-200 px-4 py-2 text-center text-xs text-red-500 font-semibold">都度費用発生</td>
                    <td className="border border-gray-200 px-4 py-2 text-center text-xs text-teal-600 font-semibold">¥980/月（無制限）</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-center text-xs font-bold text-teal-700 mt-4 bg-teal-50 rounded-lg py-2">
              弁護士費用の <span className="text-lg">100分の1以下</span> で書類準備が整います
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl mx-auto">
            {[
              { name: "お試し", price: "無料", sub: "1回のみ", features: ["親権計画書草案（1回）", "面会カレンダー", "養育費目安", "調停準備メモ"], isPremium: false },
              { name: "プレミアム", price: "¥980", sub: "/月（無制限）", features: ["全機能を無制限で利用", "注意事項・トラブル事例（限定）", "複数パターンで比較作成", "いつでも解約可能"], isPremium: true },
            ].map(plan => (
              <div key={plan.name} className={`rounded-2xl border p-6 relative ${plan.isPremium ? "border-teal-500 shadow-lg" : "border-gray-200"}`}>
                {plan.isPremium && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-teal-600 text-white px-3 py-0.5 rounded-full whitespace-nowrap">おすすめ</div>
                )}
                <p className="font-bold text-gray-900 mb-1">{plan.name}</p>
                <p className="text-2xl font-bold text-teal-600">{plan.price}<span className="text-sm font-normal text-gray-500">{plan.sub}</span></p>
                <ul className="mt-4 mb-5 space-y-2">
                  {plan.features.map(f => (
                    <li key={f} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="text-green-500">✓</span>{f}
                    </li>
                  ))}
                </ul>
                {plan.isPremium ? (
                  <button
                    onClick={startCheckout}
                    className="block w-full text-center text-sm font-medium py-2.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
                  >
                    申し込む
                  </button>
                ) : (
                  <Link href="/tool" className="block w-full text-center text-sm font-medium py-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">
                    無料で試す
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 弁護士無料相談アフィリセクション */}
      <section className="py-12 px-4 bg-amber-50 border-y border-amber-200">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <div className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-amber-300">⚖️ 弁護士への相談も検討されている方へ</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">AIで整理した内容を、弁護士に相談する</h2>
            <p className="text-sm text-gray-600">このAIで準備した親権計画書・養育費の資料を持参すれば、弁護士との相談時間を大幅に節約できます。</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                name: "弁護士ドットコム",
                desc: "約4,000名の弁護士から無料相談・電話相談可能。共同親権・離婚問題の専門家に即日相談。",
                badge: "無料相談あり",
                badgeColor: "bg-green-100 text-green-700",
                href: "https://www.bengo4.com/c_3/",
                icon: "⚖️",
              },
              {
                name: "ベンナビ離婚",
                desc: "離婚・親権問題の弁護士を地域から検索。初回無料相談・着手金0円の事務所も掲載。",
                badge: "着手金0円あり",
                badgeColor: "bg-blue-100 text-blue-700",
                href: "https://ben54.jp/c/divorce",
                icon: "🏛️",
              },
              {
                name: "法テラス（法的支援）",
                desc: "収入が一定以下の方は弁護士費用を立替。審査があるが、費用が心配な方に最適。",
                badge: "費用立替制度あり",
                badgeColor: "bg-purple-100 text-purple-700",
                href: "https://www.houterasu.or.jp/",
                icon: "🤝",
              },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl p-4 border border-amber-200 hover:shadow-md hover:border-amber-400 transition-all block group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-bold text-gray-900 text-sm group-hover:text-amber-700">{item.name}</span>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.badgeColor} mb-2 inline-block`}>{item.badge}</span>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                <p className="text-xs text-amber-600 mt-2 font-medium">詳しく見る →</p>
              </a>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">※ AIで書類を準備してから相談すると、相談時間を節約できます</p>
        </div>
      </section>

      {/* FAQ */}
      <FaqAccordion />

      {/* 免責 */}
      <section className="py-8 bg-yellow-50 border-y border-yellow-100">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-xs text-yellow-800 leading-relaxed">
            ⚠️ 本サービスはAIが生成する参考情報の提供であり、法律相談・法的サービスではありません。生成されたドキュメントに法的効力はありません。実際の手続きは弁護士・家庭裁判所にご相談ください。DV・虐待が絡む場合は必ず専門機関にご相談ください。
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-600 py-16 text-center px-4 overflow-x-hidden">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-3">今すぐ共同親権の準備を始める</h2>
        <p className="text-teal-100 text-sm mb-8">登録不要・クレジットカード不要で1回無料</p>
        <Link href="/tool" className="inline-block bg-white text-teal-600 font-bold text-lg px-8 py-4 rounded-xl hover:bg-teal-50 shadow-lg w-full sm:w-auto">
          無料でドキュメントを作成する →
        </Link>
      </section>

      {/* スティッキーモバイルCTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-teal-200 px-4 py-3 z-40 sm:hidden shadow-lg">
        <Link href="/tool" className="block w-full bg-teal-600 hover:bg-teal-700 text-white font-black text-center py-3.5 rounded-xl text-sm transition-colors">
          共同親権書類を無料作成する →
        </Link>
      </div>

      {/* もっと活用する3選 */}
      <section className="py-8 px-4 max-w-lg mx-auto">
        <h2 className="text-center text-base font-bold text-blue-800 mb-4">📋 共同親権AIをもっと活用する3選</h2>
        <ol className="space-y-3">
          {[
            { icon: "📑", title: "面会交流スケジュールを書面化", desc: "AIが生成した提案をベースに、弁護士・調停委員に見せる書面を作成しよう。" },
            { icon: "💬", title: "養育費の交渉材料に活用", desc: "AIの分析結果を相手方との話し合いの参考資料として使い、建設的な対話を進めよう。" },
            { icon: "🤝", title: "専門家に相談する前の準備に", desc: "弁護士・家庭裁判所・行政書士への相談前に整理するツールとして活用してください。" },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 rounded-xl p-3"
              style={{ background: "rgba(29,78,216,0.05)", border: "1px solid rgba(29,78,216,0.12)" }}>
              <span style={{ fontSize: "22px", lineHeight: "1" }}>{item.icon}</span>
              <div>
                <div className="text-blue-900 font-bold text-sm">{i + 1}. {item.title}</div>
                <div className="text-blue-700 text-xs mt-0.5 opacity-80">{item.desc}</div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* X Share */}
      <section className="py-8 px-6 max-w-3xl mx-auto text-center">
        <a
          href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent("共同親権サポートAI — 2026年4月施行の共同親権制度に対応。親権計画書を弁護士費用の100分の1以下でAIが30秒でサポート。無料で試せます → https://kyodo-shinken-ai.vercel.app #共同親権 #離婚 #育児")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          Xでシェアする
        </a>
      </section>

      <footer className="border-t py-6 text-center text-xs text-gray-400 space-x-4 pb-24 sm:pb-6">
        <Link href="/legal" className="hover:underline">特定商取引法に基づく表記</Link>
        <Link href="/privacy" className="hover:underline">プライバシーポリシー</Link>
      </footer>
    </main>
  );
}
