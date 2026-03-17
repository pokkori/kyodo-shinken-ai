"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import PayjpModal from "@/components/PayjpModal";

const FAQ_ITEMS = [
  { q: "共同親権制度はいつから始まりますか？", a: "2026年4月1日施行予定です。改正民法により、離婚後も父母双方が親権を持つ「共同親権」が選択できるようになります。" },
  { q: "離婚後も両親が親権を持てますか？", a: "はい、協議または家庭裁判所の判断で決定されます。父母が合意すれば協議で共同親権を選択でき、合意できない場合は家庭裁判所が判断します。" },
  { q: "このAIは弁護士の代わりになりますか？", a: "法的アドバイスの補助ツールです。AIは書類の草案作成や論点整理に役立ちますが、法的効力のある書類作成や正式な法的アドバイスについては弁護士にご相談ください。" },
  { q: "費用はかかりますか？", a: "基本機能は無料でご利用いただけます。親権計画書・面会カレンダー・養育費目安・調停準備メモを1回無料で生成できます。より詳細な相談機能や繰り返し利用にはプレミアムプラン（¥3,980/月）をご利用ください。" },
  { q: "個人情報は安全ですか？", a: "入力データは外部に共有されません。入力内容はAI生成後に即時消去され、サーバーに保存されることはありません。" },
];

const PAYJP_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYJP_PUBLIC_KEY ?? "";

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
    setDaysLeft(diff > 0 ? diff : 0);
  }, []);

  function startCheckout() {
    setShowPayjp(true);
  }

  return (
    <main className="min-h-screen bg-white">
      {showPayjp && (
        <PayjpModal
          publicKey={PAYJP_PUBLIC_KEY}
          planLabel="プレミアムプラン ¥3,980/月 — 全機能無制限"
          onSuccess={() => setShowPayjp(false)}
          onClose={() => setShowPayjp(false)}
        />
      )}
      <nav className="border-b border-gray-100 px-6 py-4 sticky top-0 bg-white/95 backdrop-blur z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="font-bold text-gray-900">⚖️ 共同親権サポートAI</span>
          <Link href="/tool" className="bg-teal-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-teal-700">
            無料で試す
          </Link>
        </div>
      </nav>

      {/* 施行告知バナー */}
      <div className="bg-teal-700 text-white text-center text-sm font-semibold py-2.5 px-4">
        {daysLeft !== null && daysLeft > 0 ? (
          <>⏰ 共同親権制度 施行まで<strong className="text-yellow-300 text-base mx-1">あと{daysLeft}日</strong>— 今すぐ準備を</>
        ) : daysLeft === 0 ? (
          <>✅ 共同親権制度が<strong>本日施行</strong>されました — 今すぐ手続きを開始</>
        ) : (
          <>⚖️ 共同親権制度は<strong>施行済み</strong>です — 今すぐ手続きを開始</>
        )}
      </div>

      {/* ヒーロー */}
      <section className="max-w-4xl mx-auto px-4 py-10 md:py-20 text-center overflow-x-hidden">
        <div className="inline-block bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          2026年4月 新制度対応
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          弁護士に相談する前に、<br /><span className="text-teal-600">読んでください。</span>
        </h1>
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800 font-medium max-w-xl mx-auto mb-4">
          ⚠️ 準備なしで交渉に臨むと、子どもと過ごせる時間を失うリスクがあります
        </div>
        <p className="text-base md:text-lg text-gray-500 mb-5 max-w-2xl mx-auto">
          子どもの情報を入力するだけ。AIが<strong className="text-gray-700">親権計画書草案・面会交流カレンダー・養育費の目安・調停準備メモ</strong>をセットで生成。弁護士相談前の整理に。
        </p>
        {/* 安心バッジ群 */}
        <div className="flex flex-wrap gap-3 justify-center mt-4 mb-6">
          <span className="bg-teal-50 border border-teal-200 text-teal-700 rounded-full px-4 py-1.5 text-sm font-medium">⚖️ 2026年4月施行 共同親権法 対応</span>
          <span className="bg-teal-50 border border-teal-200 text-teal-700 rounded-full px-4 py-1.5 text-sm font-medium">🔒 入力内容は保存されません</span>
          <span className="bg-teal-50 border border-teal-200 text-teal-700 rounded-full px-4 py-1.5 text-sm font-medium">📄 法律家に相談しやすい草案を生成</span>
        </div>
        <Link href="/tool" className="inline-block bg-teal-600 text-white font-bold text-base md:text-lg px-6 md:px-8 py-4 rounded-xl hover:bg-teal-700 shadow-lg shadow-teal-100 mb-3 w-full sm:w-auto">
          まずは無料で試してみる →
        </Link>
        <p className="text-sm font-semibold text-teal-700 mb-1">親権計画書 1回・面会スケジュール 1回 無料作成</p>
        <p className="text-sm text-gray-500">登録不要・クレジットカード不要</p>
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
                    <td className="border border-gray-200 px-4 py-2 text-center text-xs text-teal-600 font-semibold">¥3,980/月（無制限）</td>
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
              { name: "プレミアム", price: "¥3,980", sub: "/月（無制限）", features: ["全機能を無制限で利用", "注意事項・トラブル事例（限定）", "複数パターンで比較作成", "いつでも解約可能"], isPremium: true },
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

      <footer className="border-t py-6 text-center text-xs text-gray-400 space-x-4">
        <Link href="/legal" className="hover:underline">特定商取引法に基づく表記</Link>
        <Link href="/privacy" className="hover:underline">プライバシーポリシー</Link>
      </footer>
    </main>
  );
}
