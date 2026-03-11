"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import PayjpModal from "@/components/PayjpModal";

type Result = {
  plan: string;
  calendar: string;
  money: string;
  mediation: string;
  caution: string;
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
    disclaimer: get("DISCLAIMER"),
  };
}

type Tab = "plan" | "calendar" | "money" | "mediation" | "caution";
const TABS: { id: Tab; label: string; premium?: boolean }[] = [
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
      className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded transition"
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
  const [result, setResult] = useState<Result>(null);
  const [error, setError] = useState("");
  const [remaining, setRemaining] = useState<number | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showPayjp, setShowPayjp] = useState(false);
  const [tab, setTab] = useState<Tab>("plan");

  useEffect(() => {
    fetch("/api/auth/status").then((r) => r.json()).then((d) => {
      setIsPremium(d.premium);
      setRemaining(d.remaining);
    });
  }, []);

  async function generate() {
    if (!childrenInfo.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ childrenInfo, parentInfo, situationInfo }),
      });
      if (res.status === 402) { setShowPaywall(true); setLoading(false); return; }
      const data = await res.json();
      if (data.error) { setError(data.error); setLoading(false); return; }
      const parsed = parseResult(data.result);
      setResult(parsed);
      setRemaining(data.remaining);
      setTab("plan");
    } catch {
      setError("エラーが発生しました。もう一度お試しください。");
    }
    setLoading(false);
  }

  const startCheckout = () => setShowPayjp(true);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-teal-400">⚖️ 共同親権サポートAI</Link>
        <div className="flex items-center gap-3">
          {!isPremium && remaining !== null && (
            <span className="text-xs text-slate-400">残り無料 {remaining}回</span>
          )}
          {isPremium && <span className="text-xs text-teal-400 font-bold">✓ プレミアム</span>}
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-10 space-y-5">
        <div className="bg-teal-900/30 border border-teal-700 rounded-xl p-4 text-xs text-teal-200">
          📅 <strong>2026年4月1日施行</strong> — 改正民法により共同親権が選択可能になりました。本ツールは準備・整理に活用できます。
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-slate-300">
            お子さんの情報 <span className="text-red-400">*</span>
          </label>
          <textarea
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm text-white placeholder-slate-500 resize-none focus:outline-none focus:border-teal-500 h-28"
            placeholder={"例）長男・8歳（小学2年）、次女・5歳（保育園）\n2人とも現在は妻と同居中"}
            value={childrenInfo}
            onChange={(e) => setChildrenInfo(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-slate-300">両親の状況（任意）</label>
          <textarea
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm text-white placeholder-slate-500 resize-none focus:outline-none focus:border-teal-500 h-24"
            placeholder={"例）\n父: 東京都在住・会社員・残業多め\n母: 神奈川県在住・パートタイム\n車で約1時間の距離"}
            value={parentInfo}
            onChange={(e) => setParentInfo(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-slate-300">現在の状況・希望（任意）</label>
          <input
            type="text"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
            placeholder="例：協議中・比較的話し合いができる・月2回程度の面会を希望"
            value={situationInfo}
            onChange={(e) => setSituationInfo(e.target.value)}
          />
        </div>

        {!isPremium && remaining === 0 && !result && (
          <div className="bg-teal-900/40 border border-teal-600 rounded-xl p-4 text-center">
            <p className="text-sm text-teal-200 mb-3">無料回数を使い切りました。月額¥1,980で使い放題！</p>
            <button onClick={startCheckout} className="bg-teal-500 hover:bg-teal-400 text-white font-bold px-6 py-2 rounded-xl text-sm transition">
              プレミアムにアップグレード
            </button>
          </div>
        )}

        <button
          onClick={generate}
          disabled={loading || !childrenInfo.trim() || (!isPremium && remaining === 0)}
          className="w-full bg-teal-500 hover:bg-teal-400 text-white font-black py-4 rounded-xl text-lg transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "AIが作成中…（20〜30秒）" : "親権サポートドキュメントを作成する"}
        </button>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        {showPaywall && (
          <div className="bg-slate-800 border border-teal-500 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-2">無料回数が終わりました</h3>
            <p className="text-slate-400 text-sm mb-6">月額¥1,980で親権計画書・養育費・調停準備まで無制限に作成</p>
            <button onClick={startCheckout} className="bg-teal-500 hover:bg-teal-400 text-white font-black px-8 py-4 rounded-xl text-lg transition w-full">
              ¥1,980/月でアップグレード
            </button>
          </div>
        )}

        {result && (
          <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
            <div className="flex overflow-x-auto border-b border-slate-700">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { if (t.premium && !isPremium) { startCheckout(); return; } setTab(t.id); }}
                  className={`px-4 py-3 text-xs font-bold whitespace-nowrap transition flex items-center gap-1 ${tab === t.id ? "text-teal-400 border-b-2 border-teal-400" : "text-slate-500 hover:text-slate-300"}`}
                >
                  {t.label}
                  {t.premium && !isPremium && <span className="text-yellow-500">🔒</span>}
                </button>
              ))}
            </div>

            <div className="p-6">
              {tab === "plan" && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-teal-400">📋 親権計画書草案</span>
                    <CopyButton text={result.plan} />
                  </div>
                  <pre className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{result.plan}</pre>
                </div>
              )}
              {tab === "calendar" && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-teal-400">📅 面会交流カレンダー</span>
                    <CopyButton text={result.calendar} />
                  </div>
                  <pre className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{result.calendar}</pre>
                </div>
              )}
              {tab === "money" && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-teal-400">💰 養育費の目安</span>
                    <CopyButton text={result.money} />
                  </div>
                  <pre className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{result.money}</pre>
                </div>
              )}
              {tab === "mediation" && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-teal-400">📝 調停準備メモ</span>
                    <CopyButton text={result.mediation} />
                  </div>
                  <pre className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{result.mediation}</pre>
                </div>
              )}
              {tab === "caution" && isPremium && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-teal-400">⚠️ 注意事項・よくあるトラブル</span>
                    <CopyButton text={result.caution} />
                  </div>
                  <pre className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{result.caution}</pre>
                </div>
              )}

              {result.disclaimer && (
                <div className="mt-4 bg-slate-800 rounded-lg p-3 text-xs text-slate-500">
                  {result.disclaimer}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-600 space-x-4 mt-10">
        <Link href="/legal" className="hover:underline">特定商取引法</Link>
        <Link href="/privacy" className="hover:underline">プライバシーポリシー</Link>
        <Link href="/" className="hover:underline">トップへ戻る</Link>
      </footer>

      {showPayjp && (
        <PayjpModal
          publicKey={process.env.NEXT_PUBLIC_PAYJP_PUBLIC_KEY!}
          planLabel="プレミアムプラン ¥1,980/月 — 全機能無制限"
          onSuccess={() => { setShowPayjp(false); setIsPremium(true); }}
          onClose={() => setShowPayjp(false)}
        />
      )}
    </main>
  );
}
