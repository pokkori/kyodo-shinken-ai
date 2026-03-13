"use client";
import { useState } from "react";
import Link from "next/link";
import PayjpModal from "@/components/PayjpModal";

const PAYJP_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYJP_PUBLIC_KEY ?? "";

const FEATURES = [
  { icon: "📋", title: "親権計画書草案", desc: "基本居住・日常養育の分担・重要事項の共同決定ルールをAIが自動作成。調停・協議のたたき台として使えます。" },
  { icon: "📅", title: "面会交流カレンダー", desc: "月次ルール・長期休暇の分担・誕生日行事の取り決めを具体的にスケジュール化。" },
  { icon: "💰", title: "養育費の目安", desc: "養育費算定表ベースで月額の概算を提示。支払いルール・増減が必要なケースも解説。" },
  { icon: "📝", title: "調停準備メモ", desc: "家庭裁判所への申立前に準備すべき書類・費用・主張ポイントを整理。弁護士費用を節約できます。" },
  { icon: "⚠️", title: "注意事項・トラブル予防", desc: "共同親権でよく起きるトラブルTOP5・法的落とし穴・調停が長引くパターン（プレミアム）。" },
];

const VOICES = [
  { role: "30代男性・2児の父", text: "弁護士に相談する前の整理に使いました。面会交流の希望を具体的な計画書にまとめてくれて、調停の準備がスムーズになりました。" },
  { role: "30代女性・1児の母", text: "共同親権が始まって何を決めればいいか全然わからなかったんですが、このAIが項目を整理してくれて助かりました。" },
  { role: "40代男性・単身赴任中", text: "東京と大阪の遠距離で面会スケジュールを組むのが大変でしたが、AIが季節ごとに具体的な案を出してくれました。" },
];

export default function LandingPage() {
  const [showPayjp, setShowPayjp] = useState(false);

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
        📅 2026年4月1日施行予定 — 改正民法により<strong>共同親権制度がスタート</strong>します
      </div>

      {/* ヒーロー */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-block bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full mb-6">
          2026年4月 新制度対応
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          弁護士に相談する前に、<br /><span className="text-teal-600">読んでください。</span>
        </h1>
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 text-sm text-amber-800 font-medium max-w-xl mx-auto mb-4">
          ⚠️ 準備なしで交渉に臨むと、子どもと過ごせる時間を失うリスクがあります
        </div>
        <p className="text-lg text-gray-500 mb-4 max-w-2xl mx-auto">
          子どもの情報を入力するだけ。AIが<strong className="text-gray-700">親権計画書草案・面会交流カレンダー・養育費の目安・調停準備メモ</strong>をセットで生成。弁護士相談前の整理に。
        </p>
        <Link href="/tool" className="inline-block bg-teal-600 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-teal-700 shadow-lg shadow-teal-100 mb-3">
          子どもとの時間を守る書類を、今すぐ無料で作る →
        </Link>
        <p className="text-sm font-semibold text-gray-500">クレジットカード不要・登録不要・今すぐ使える</p>
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
          <p className="text-center text-gray-500 text-sm mb-10">すべてのプランで親権計画書・面会カレンダー・養育費・調停メモがセット</p>
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

      {/* 免責 */}
      <section className="py-8 bg-yellow-50 border-y border-yellow-100">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-xs text-yellow-800 leading-relaxed">
            ⚠️ 本サービスはAIが生成する参考情報の提供であり、法律相談・法的サービスではありません。生成されたドキュメントに法的効力はありません。実際の手続きは弁護士・家庭裁判所にご相談ください。DV・虐待が絡む場合は必ず専門機関にご相談ください。
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-600 py-16 text-center px-6">
        <h2 className="text-2xl font-bold text-white mb-3">今すぐ共同親権の準備を始める</h2>
        <p className="text-teal-100 text-sm mb-8">登録不要・クレジットカード不要で1回無料</p>
        <Link href="/tool" className="inline-block bg-white text-teal-600 font-bold text-lg px-8 py-4 rounded-xl hover:bg-teal-50 shadow-lg">
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
