"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import PayjpModal from "@/components/PayjpModal";
import { track } from '@vercel/analytics';

function renderMarkdown(text: string): React.ReactNode[] {
  return text.split("\n").map((line, i) => {
    if (line.startsWith("### ")) {
      return <h3 key={i} className="text-sm font-black text-teal-700 mt-3 mb-1 border-b border-teal-100 pb-1">{line.slice(4)}</h3>;
    }
    if (line.startsWith("## ")) {
      return <h2 key={i} className="text-base font-black text-teal-800 mt-4 mb-2">{line.slice(3)}</h2>;
    }
    if (line.startsWith("# ")) {
      return <h2 key={i} className="text-base font-black text-teal-800 mt-4 mb-2">{line.slice(2)}</h2>;
    }
    if (line.startsWith("■ ") || line.startsWith("▶ ")) {
      return <p key={i} className="text-sm font-bold text-gray-800 mt-2">{line}</p>;
    }
    if (line.match(/^[\d]+\.\s/) || line.startsWith("・") || line.startsWith("- ") || line.startsWith("• ")) {
      return (
        <div key={i} className="flex gap-2 items-start text-sm text-gray-700 my-0.5">
          <span className="flex-shrink-0 text-teal-500 font-bold mt-0.5">●</span>
          <span>{line.replace(/^[\d]+\.\s|^[・\-•]\s?/, "")}</span>
        </div>
      );
    }
    if (line.trim() === "") return <div key={i} className="h-2" />;
    if (line.startsWith("⚠️") || line.startsWith("🚨")) {
      return <p key={i} className="text-sm font-semibold text-red-700 bg-red-50 rounded px-2 py-1 my-1">{line}</p>;
    }
    return <p key={i} className="text-sm text-gray-700 leading-relaxed">{line}</p>;
  });
}

type Result = {
  plan: string;
  calendar: string;
  money: string;
  mediation: string;
  caution: string;
  nextActions: string;
  disclaimer: string;
} | null;

function parseResult(text: string): Result {
  const get = (tag: string) => {
    const m = text.match(new RegExp(`===\\s*${tag}\\s*===\\s*([\\s\\S]*?)(?====|$)`));
    return m ? m[1].trim() : "";
  };
  const plan = get("PLAN");
  if (!plan) return null;
  return {
    plan,
    calendar: get("CALENDAR"),
    money: get("MONEY"),
    mediation: get("MEDIATION"),
    caution: get("CAUTION"),
    nextActions: get("NEXT_ACTIONS"),
    disclaimer: get("DISCLAIMER"),
  };
}

type Tab = "plan" | "calendar" | "money" | "mediation" | "next" | "caution";
const TABS: { id: Tab; label: string; premium?: boolean }[] = [
  { id: "next", label: "🚀 次のアクション" },
  { id: "plan", label: "📋 親権計画書" },
  { id: "calendar", label: "📅 面会カレンダー" },
  { id: "money", label: "💰 養育費の目安" },
  { id: "mediation", label: "📝 調停準備" },
  { id: "caution", label: "⚠️ 注意事項", premium: true },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded transition border border-gray-200"
    >
      {copied ? "コピー済 ✓" : "コピー"}
    </button>
  );
}

export default function ToolPage() {
  const [childrenInfo, setChildrenInfo] = useState("");
  const [parentInfo, setParentInfo] = useState("");
  const [situationInfo, setSituationInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamText, setStreamText] = useState("");
  const [result, setResult] = useState<Result>(null);
  const [error, setError] = useState("");
  const [remaining, setRemaining] = useState<number | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showPayjp, setShowPayjp] = useState(false);
  const [tab, setTab] = useState<Tab>("next");

  useEffect(() => {
    fetch("/api/auth/status").then((r) => r.json()).then((d) => {
      setIsPremium(d.premium);
      setRemaining(d.remaining);
    });
  }, []);

  async function generate() {
    if (!childrenInfo.trim()) return;
    track('ai_generated', { service: '共同親権サポートAI' });
    setLoading(true);
    setError("");
    setResult(null);
    setStreamText("");
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ childrenInfo, parentInfo, situationInfo }),
      });
      if (res.status === 402) { track('paywall_shown', { service: '共同親権サポートAI' }); setShowPaywall(true); setLoading(false); return; }
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "エラーが発生しました");
        setLoading(false);
        return;
      }
      if (!res.body) { setError("レスポンスエラー"); setLoading(false); return; }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const doneIdx = chunk.indexOf("\nDONE:");
        if (doneIdx !== -1) {
          const textPart = chunk.slice(0, doneIdx);
          accumulated += textPart;
          setStreamText(accumulated);
          try {
            const meta = JSON.parse(chunk.slice(doneIdx + 6));
            if (meta.remaining !== undefined) setRemaining(meta.remaining);
          } catch { /* ignore */ }
          break;
        }
        accumulated += chunk;
        setStreamText(accumulated);
      }

      const parsed = parseResult(accumulated);
      setResult(parsed);
      setTab("next");
    } catch {
      setError("エラーが発生しました。もう一度お試しください。");
    }
    setLoading(false);
  }

  const startCheckout = () => setShowPayjp(true);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-teal-600">⚖️ 共同親権サポートAI</Link>
        <div className="flex items-center gap-3">
          {!isPremium && remaining !== null && (
            <span className="text-xs text-gray-500">残り無料 {remaining}回</span>
          )}
          {isPremium && <span className="text-xs text-teal-600 font-bold">✓ プレミアム</span>}
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-10 space-y-5">
        {/* 施行告知バナー:
            - 施行前（〜3/31）: 「間もなく施行」訴求 → 現在このファイルは施行済み表現で統一済み
            - 施行当日・施行後（4/1〜）: 「施行されました」表現 → 下記がその表現（変更不要）
        */}
        <div className="bg-red-50 border border-red-300 rounded-xl p-4 text-xs text-red-800">
          🚨 <strong>2026年4月1日に共同親権制度が施行されました。</strong> — 改正民法により離婚後も父母双方が親権を持てる「共同親権」が選択可能です。面会交流・養育費・親権計画書の整理を今すぐ始めましょう。
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700">
            お子さんの情報 <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:border-teal-500 h-28"
            placeholder={"例）長男・8歳（小学2年）、次女・5歳（保育園）\n2人とも現在は妻と同居中"}
            value={childrenInfo}
            onChange={(e) => setChildrenInfo(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700">両親の状況（任意）</label>
          <textarea
            className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:border-teal-500 h-24"
            placeholder={"例）\n父: 東京都在住・会社員・残業多め\n母: 神奈川県在住・パートタイム\n車で約1時間の距離"}
            value={parentInfo}
            onChange={(e) => setParentInfo(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700">現在の状況・希望（任意）</label>
          <input
            type="text"
            className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-500"
            placeholder="例：協議中・比較的話し合いができる・月2回程度の面会を希望"
            value={situationInfo}
            onChange={(e) => setSituationInfo(e.target.value)}
          />
        </div>

        {!isPremium && remaining === 0 && !result && (
          <div className="bg-teal-50 border border-teal-400 rounded-xl p-4 text-center">
            <p className="text-sm text-teal-800 mb-3">無料回数を使い切りました。月額¥3,980で使い放題！</p>
            <button onClick={() => { track('upgrade_click', { service: '共同親権サポートAI', plan: 'premium' }); startCheckout(); }} className="bg-teal-500 hover:bg-teal-400 text-white font-bold px-6 py-2 rounded-xl text-sm transition">
              プレミアムにアップグレード
            </button>
          </div>
        )}

        <button
          onClick={generate}
          disabled={loading || !childrenInfo.trim() || (!isPremium && remaining === 0)}
          className="w-full bg-teal-500 hover:bg-teal-400 text-white font-black py-4 rounded-xl text-lg transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "AIが作成中…" : "親権サポートドキュメントを作成する"}
        </button>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        {/* ローディング初期表示 */}
        {loading && !streamText && (
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 text-center">
            <div className="inline-block w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-teal-700 font-medium text-sm mb-1">AIが分析中...</p>
            <p className="text-xs text-teal-600">⚖️ 状況分析 → 📋 法的根拠確認 → 💡 対応アドバイス生成</p>
            <p className="text-xs text-gray-400 mt-1">通常5〜10秒かかります</p>
          </div>
        )}
        {/* Streaming中の進捗表示 */}
        {loading && streamText && (
          <div className="bg-white border border-teal-200 rounded-2xl p-5">
            <p className="text-xs text-teal-600 font-bold mb-2">AIが作成中...</p>
            <pre className="text-xs text-gray-500 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">{streamText}</pre>
          </div>
        )}

        {showPaywall && (
          <div className="bg-white border border-teal-500 rounded-2xl p-8 text-center shadow-sm">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">無料回数が終わりました</h3>
            <p className="text-gray-500 text-sm mb-4">月額¥3,980で親権計画書・養育費・調停準備まで無制限に作成</p>
            <ul className="text-sm text-teal-700 space-y-1.5 mb-5 text-left">
              <li>✅ 6種類のドキュメント（親権計画・面会・養育費など）</li>
              <li>✅ 2026年4月施行の共同親権法に完全対応</li>
              <li>✅ 弁護士費用¥30〜50万 vs AI月額¥3,980</li>
            </ul>
            <button onClick={() => { track('upgrade_click', { service: '共同親権サポートAI', plan: 'premium' }); startCheckout(); }} className="bg-teal-500 hover:bg-teal-400 text-white font-black px-8 py-4 rounded-xl text-lg transition w-full">
              ¥3,980/月でアップグレード
            </button>
            <div className="flex items-center justify-center gap-3 mt-3 text-xs text-gray-400">
              <span>🛡️ 30日返金保証</span>
              <span>🔒 SSL暗号化決済</span>
              <span>❌ いつでも解約</span>
            </div>
          </div>
        )}

        {result && (
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-2xl p-6 mb-4 text-center shadow-lg">
            <div className="text-4xl mb-2">📋</div>
            <p className="text-xl font-black mb-1">6種類のドキュメントが完成しました！</p>
            <p className="text-sm text-teal-100 mb-4">次のアクション・親権計画書・面会カレンダー・養育費・調停準備を下のタブで確認</p>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("共同親権サポートAIを使ってみた⚖️\n親権計画書・面会カレンダー・養育費の目安が30秒で出てきて驚いた…\n弁護士に相談する前の整理に本当に役立った。\n2026年4月施行の共同親権制度に対応済み\n#共同親権 #離婚 #子育て #法律")}&url=${encodeURIComponent("https://kyodo-shinken-ai.vercel.app")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-teal-700 text-sm font-black px-6 py-3 rounded-xl hover:bg-teal-50 transition"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Xでシェア（同じ境遇の方に届けよう）
            </a>
          </div>
        )}

        {result && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="flex overflow-x-auto border-b border-gray-200">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { if (t.premium && !isPremium) { startCheckout(); return; } setTab(t.id); }}
                  className={`px-4 py-3 text-xs font-bold whitespace-nowrap transition flex items-center gap-1 ${tab === t.id ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-400 hover:text-gray-600"}`}
                >
                  {t.label}
                  {t.premium && !isPremium && <span className="text-yellow-500">🔒</span>}
                </button>
              ))}
            </div>

            <div className="p-6">
              {tab === "next" && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-teal-600">🚀 今すぐできる次のアクション</span>
                    <CopyButton text={result.nextActions} />
                  </div>
                  <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 mb-4 text-xs text-teal-700 font-medium">
                    ⚡ 2026年4月1日に共同親権制度が施行されました。今すぐ行動しましょう。
                  </div>
                  <div className="space-y-0.5">{renderMarkdown(result.nextActions || "次のアクションを生成中...")}</div>

                  {/* A8.net: クロスハウス 離婚後の住まい探し */}
                  <div className="mt-5 bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-sm font-black text-blue-900 mb-1">🏠 離婚後の住まいを探す</p>
                    <p className="text-xs text-blue-700 mb-3">新生活のスタートに。都内3.8万円〜家具家電付きで初期費用を抑えられます。</p>
                    <a
                      href="https://px.a8.net/svt/ejp?a8mat=4AZIOF+8LLFCI+4EZ2+BYLJL"
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="flex items-center justify-between bg-white border border-blue-300 rounded-xl px-4 py-3 hover:bg-blue-50 transition-colors"
                    >
                      <div>
                        <div className="text-sm font-bold text-slate-800">クロスハウス — 都内3.8万円〜</div>
                        <div className="text-xs text-slate-500 mt-0.5">家具家電付き • 初期費用を大幅節約 • 敷金礼金なし</div>
                      </div>
                      <span className="text-blue-600 font-bold text-xs bg-blue-100 px-2 py-1 rounded-full whitespace-nowrap">物件を探す →</span>
                    </a>
                    <p className="text-xs text-slate-400 text-center mt-2">※ 広告・PR掲載（公式サイトに遷移します）</p>
                  </div>
                </div>
              )}
              {tab === "plan" && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-teal-600">📋 親権計画書草案</span>
                    <CopyButton text={result.plan} />
                  </div>
                  <div className="space-y-0.5">{renderMarkdown(result.plan)}</div>
                </div>
              )}
              {tab === "calendar" && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-teal-600">📅 面会交流カレンダー</span>
                    <CopyButton text={result.calendar} />
                  </div>
                  <div className="space-y-0.5">{renderMarkdown(result.calendar)}</div>
                </div>
              )}
              {tab === "money" && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-teal-600">💰 養育費の目安</span>
                    <CopyButton text={result.money} />
                  </div>
                  <div className="space-y-0.5">{renderMarkdown(result.money)}</div>
                </div>
              )}
              {tab === "mediation" && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-teal-600">📝 調停準備メモ</span>
                    <CopyButton text={result.mediation} />
                  </div>
                  <div className="space-y-0.5">{renderMarkdown(result.mediation)}</div>
                </div>
              )}
              {tab === "caution" && isPremium && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-teal-600">⚠️ 注意事項・よくあるトラブル</span>
                    <CopyButton text={result.caution} />
                  </div>
                  <div className="space-y-0.5">{renderMarkdown(result.caution)}</div>
                </div>
              )}

              {result.disclaimer && (
                <div className="mt-4 bg-gray-100 rounded-lg p-3 text-xs text-gray-500">
                  {result.disclaimer}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-4 p-3 bg-gray-100 rounded">
                ※本サービスはAIが生成する参考情報です。法的効力はありません。重要な判断は必ず弁護士にご相談ください。
              </p>
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-gray-200 py-6 text-center text-xs text-gray-400 space-x-4 mt-10">
        <Link href="/legal" className="hover:underline">特定商取引法</Link>
        <Link href="/privacy" className="hover:underline">プライバシーポリシー</Link>
        <Link href="/" className="hover:underline">トップへ戻る</Link>
      </footer>

      {showPayjp && (
        <PayjpModal
          publicKey={process.env.NEXT_PUBLIC_PAYJP_PUBLIC_KEY!}
          planLabel="プレミアムプラン ¥3,980/月 — 全機能無制限"
          onSuccess={() => { setShowPayjp(false); setIsPremium(true); }}
          onClose={() => setShowPayjp(false)}
        />
      )}
    </main>
  );
}
