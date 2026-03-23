"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import KomojuButton from "@/components/KomojuButton";
import { track } from '@vercel/analytics';

// ===== 離婚協議書AIドラフト生成コンポーネント =====
type ChildInfo = { name: string; birthdate: string; relation: string };

function DivorceAgreementGenerator() {
  const [husbandName, setHusbandName] = useState("");
  const [husbandBirthdate, setHusbandBirthdate] = useState("");
  const [wifeName, setWifeName] = useState("");
  const [wifeBirthdate, setWifeBirthdate] = useState("");
  const [children, setChildren] = useState<ChildInfo[]>([{ name: "", birthdate: "", relation: "長男" }]);
  const [custodyType, setCustodyType] = useState<"joint" | "sole">("joint");
  const [alimonyAmount, setAlimonyAmount] = useState("");
  const [alimonyDay, setAlimonyDay] = useState("25");
  const [visitationFrequency, setVisitationFrequency] = useState("");
  const [visitationMethod, setVisitationMethod] = useState("");
  const [propertyDivision, setPropertyDivision] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamText, setStreamText] = useState("");
  const [draftText, setDraftText] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function updateChild(index: number, field: keyof ChildInfo, value: string) {
    setChildren(prev => prev.map((c, i) => i === index ? { ...c, [field]: value } : c));
  }

  function addChild() {
    if (children.length < 3) {
      const relations = ["長男", "長女", "次男", "次女", "三男", "三女"];
      setChildren(prev => [...prev, { name: "", birthdate: "", relation: relations[prev.length] || "子" }]);
    }
  }

  function removeChild(index: number) {
    if (children.length > 1) {
      setChildren(prev => prev.filter((_, i) => i !== index));
    }
  }

  async function generate() {
    if (!husbandName.trim() || !wifeName.trim()) return;
    track('ai_generated', { service: '共同親権サポートAI', feature: '離婚協議書ドラフト' });
    setLoading(true);
    setError("");
    setDraftText("");
    setStreamText("");
    try {
      const res = await fetch("/api/generate-divorce-agreement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          husbandName, husbandBirthdate, wifeName, wifeBirthdate,
          children, custodyType, alimonyAmount, alimonyDay,
          visitationFrequency, visitationMethod, propertyDivision,
        }),
      });
      if (res.status === 402) {
        track('paywall_shown', { service: '共同親権サポートAI', feature: '離婚協議書ドラフト' });
        setError("無料回数を使い切りました。プレミアムプランをご利用ください。");
        setLoading(false);
        return;
      }
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
          accumulated += chunk.slice(0, doneIdx);
          setStreamText(accumulated);
          break;
        }
        accumulated += chunk;
        setStreamText(accumulated);
      }
      setDraftText(accumulated);
    } catch {
      setError("エラーが発生しました。もう一度お試しください。");
    }
    setLoading(false);
  }

  function handleDownload() {
    const content = [
      "===== 離婚協議書 AIドラフト =====",
      `生成日時: ${new Date().toLocaleString("ja-JP")}`,
      "",
      draftText,
      "",
      "------",
      "※本ドキュメントはAIが生成した参考情報です。法的効力はありません。",
      "実際の手続きは弁護士・公証人にご確認ください。",
      "共同親権サポートAI: https://kyodo-shinken-ai.vercel.app",
    ].join("\n");
    const bom = "\uFEFF";
    const blob = new Blob([bom + content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `離婚協議書ドラフト_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      {/* 説明バナー */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl shrink-0">📄</span>
          <div>
            <p className="text-sm font-black text-blue-900 mb-1">離婚協議書 AIドラフト生成（無料体験中）</p>
            <p className="text-xs text-blue-700 leading-relaxed">
              必要事項を入力するだけで、法的用語を使った離婚協議書の草案をAIが自動生成。弁護士への持参資料として活用できます。
            </p>
            <p className="text-xs text-blue-500 mt-1">※ KOMOJU決済審査通過後、¥980/件の有料機能になる予定です</p>
          </div>
        </div>
      </div>

      {/* 費用比較カード */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <p className="text-xs font-bold text-gray-500 mb-3 text-center">離婚協議書の作成にかかる費用</p>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-xs font-bold text-red-600 mb-1">弁護士に依頼</p>
            <p className="text-base font-black text-red-700">¥22万〜</p>
            <p className="text-xs text-red-400">¥50万</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs font-bold text-amber-600 mb-1">司法書士</p>
            <p className="text-base font-black text-amber-700">¥5万〜</p>
            <p className="text-xs text-amber-400">¥15万</p>
          </div>
          <div className="bg-teal-50 border-2 border-teal-400 rounded-lg p-3 relative">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-xs font-black px-2 py-0.5 rounded-full whitespace-nowrap">NEW</div>
            <p className="text-xs font-bold text-teal-600 mb-1">このAI</p>
            <p className="text-base font-black text-teal-700">¥980</p>
            <p className="text-xs text-teal-400">無料体験中</p>
          </div>
        </div>
      </div>

      {/* 入力フォーム */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-5">
        <h3 className="text-sm font-black text-gray-800">当事者情報を入力</h3>

        {/* 夫情報 */}
        <div>
          <p className="text-xs font-bold text-gray-500 mb-2">甲（夫）の情報</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">氏名 <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={husbandName}
                onChange={e => setHusbandName(e.target.value)}
                placeholder="例）田中 太郎"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                aria-label="甲（夫）の氏名"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">生年月日</label>
              <input
                type="date"
                value={husbandBirthdate}
                onChange={e => setHusbandBirthdate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                aria-label="甲（夫）の生年月日"
              />
            </div>
          </div>
        </div>

        {/* 妻情報 */}
        <div>
          <p className="text-xs font-bold text-gray-500 mb-2">乙（妻）の情報</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">氏名 <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={wifeName}
                onChange={e => setWifeName(e.target.value)}
                placeholder="例）田中 花子"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                aria-label="乙（妻）の氏名"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">生年月日</label>
              <input
                type="date"
                value={wifeBirthdate}
                onChange={e => setWifeBirthdate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                aria-label="乙（妻）の生年月日"
              />
            </div>
          </div>
        </div>

        {/* 子の情報 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-gray-500">子の情報（最大3人）</p>
            {children.length < 3 && (
              <button
                type="button"
                onClick={addChild}
                className="text-xs bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 px-2 py-1 rounded-lg transition min-h-[44px] px-3"
                aria-label="子の情報を追加する"
              >
                + 子を追加
              </button>
            )}
          </div>
          <div className="space-y-3">
            {children.map((child, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-600">第{index + 1}子</span>
                  {children.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeChild(index)}
                      className="text-xs text-red-400 hover:text-red-600 min-h-[44px] px-2"
                      aria-label={`第${index + 1}子の情報を削除する`}
                    >
                      削除
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <input
                      type="text"
                      value={child.name}
                      onChange={e => updateChild(index, "name", e.target.value)}
                      placeholder="氏名"
                      className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      aria-label={`第${index + 1}子の氏名`}
                    />
                  </div>
                  <div className="col-span-1">
                    <input
                      type="date"
                      value={child.birthdate}
                      onChange={e => updateChild(index, "birthdate", e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      aria-label={`第${index + 1}子の生年月日`}
                    />
                  </div>
                  <div className="col-span-1">
                    <select
                      value={child.relation}
                      onChange={e => updateChild(index, "relation", e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      aria-label={`第${index + 1}子の続柄`}
                    >
                      {["長男", "長女", "次男", "次女", "三男", "三女"].map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 親権の形態 */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-2">親権の形態</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setCustodyType("joint")}
              className={`py-2.5 rounded-xl text-sm font-bold border transition min-h-[44px] ${custodyType === "joint" ? "bg-teal-600 text-white border-teal-600" : "bg-white text-gray-600 border-gray-200 hover:border-teal-300"}`}
              aria-label="共同親権を選択"
              aria-pressed={custodyType === "joint"}
            >
              共同親権
            </button>
            <button
              type="button"
              onClick={() => setCustodyType("sole")}
              className={`py-2.5 rounded-xl text-sm font-bold border transition min-h-[44px] ${custodyType === "sole" ? "bg-teal-600 text-white border-teal-600" : "bg-white text-gray-600 border-gray-200 hover:border-teal-300"}`}
              aria-label="単独親権を選択"
              aria-pressed={custodyType === "sole"}
            >
              単独親権
            </button>
          </div>
        </div>

        {/* 養育費 */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-2">養育費</label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">月額（円）</label>
              <input
                type="number"
                value={alimonyAmount}
                onChange={e => setAlimonyAmount(e.target.value)}
                placeholder="例）50000"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                aria-label="養育費の月額（円）"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">支払日（毎月）</label>
              <select
                value={alimonyDay}
                onChange={e => setAlimonyDay(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                aria-label="養育費の支払日（毎月）"
              >
                {["1", "5", "10", "15", "20", "25", "末日"].map(d => (
                  <option key={d} value={d}>{d}日</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 面会交流 */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-2">面会交流</label>
          <div className="space-y-2">
            <input
              type="text"
              value={visitationFrequency}
              onChange={e => setVisitationFrequency(e.target.value)}
              placeholder="頻度（例：月2回・毎週日曜日など）"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              aria-label="面会交流の頻度"
            />
            <input
              type="text"
              value={visitationMethod}
              onChange={e => setVisitationMethod(e.target.value)}
              placeholder="方法（例：直接交流・ビデオ通話など）"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              aria-label="面会交流の方法"
            />
          </div>
        </div>

        {/* 財産分与 */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">財産分与の概要（任意）</label>
          <textarea
            value={propertyDivision}
            onChange={e => setPropertyDivision(e.target.value)}
            placeholder="例）不動産（自宅）は乙が取得し、住宅ローンは乙が引き継ぐ。預貯金は折半。"
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
            aria-label="財産分与の概要"
          />
        </div>
      </div>

      {/* 生成ボタン */}
      <button
        onClick={generate}
        disabled={loading || !husbandName.trim() || !wifeName.trim()}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl text-lg transition disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px]"
        aria-label="入力内容をもとにAIが離婚協議書ドラフトを生成する"
      >
        {loading ? "AIが作成中…" : "離婚協議書ドラフトを生成する"}
      </button>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* ローディング */}
      {loading && !streamText && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center">
          <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-blue-700 font-medium text-sm mb-1">AIが離婚協議書を作成中...</p>
          <p className="text-xs text-blue-600">📄 当事者情報確認 → ⚖️ 法的条項生成 → 📝 注意事項追加</p>
        </div>
      )}
      {loading && streamText && (
        <div className="bg-white border border-blue-200 rounded-2xl p-5">
          <p className="text-xs text-blue-600 font-bold mb-2">AIが作成中...</p>
          <pre className="text-xs text-gray-500 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">{streamText}</pre>
        </div>
      )}

      {/* 結果表示 */}
      {draftText && !loading && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-5 text-center">
            <div className="text-3xl mb-2">📄</div>
            <p className="text-lg font-black mb-1">離婚協議書ドラフトが完成しました</p>
            <p className="text-sm text-blue-100">弁護士に持参する前の下書きとして活用してください</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-200">
              <span className="text-sm font-bold text-gray-700">生成されたドラフト</span>
              <div className="flex gap-2">
                <button
                  onClick={() => { navigator.clipboard.writeText(draftText); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-lg transition min-h-[44px]"
                  aria-label="離婚協議書ドラフトをクリップボードにコピーする"
                >
                  {copied ? "コピー済 ✓" : "コピー"}
                </button>
                <button
                  onClick={handleDownload}
                  className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg transition min-h-[44px]"
                  aria-label="離婚協議書ドラフトをテキストファイルでダウンロードする"
                >
                  TXTでDL
                </button>
              </div>
            </div>
            <div className="p-5 max-h-96 overflow-y-auto">
              <pre className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed font-sans">{draftText}</pre>
            </div>
          </div>

          {/* 次のステップ：弁護士CTA */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <p className="text-sm font-black text-amber-900 mb-1">次のステップ：弁護士に確認してもらう</p>
            <p className="text-xs text-amber-700 mb-3">このドラフトを弁護士に持参すると相談時間を大幅に節約できます。公正証書化（費用5〜10万円）で強制執行力が付与されます。</p>
            <div className="space-y-2">
              <a href="https://www.bengo4.com/c_3/" target="_blank" rel="noopener noreferrer sponsored"
                className="flex items-center justify-between bg-white border border-amber-300 rounded-xl px-4 py-3 hover:bg-amber-50 transition-colors">
                <div>
                  <div className="text-sm font-bold text-slate-800">弁護士ドットコム — 離婚・親権</div>
                  <div className="text-xs text-slate-500 mt-0.5">初回相談無料 • 全国対応 • 公正証書作成対応</div>
                </div>
                <span className="text-amber-600 font-bold text-xs bg-amber-100 px-2 py-1 rounded-full whitespace-nowrap">無料相談 →</span>
              </a>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">※ 広告・PR掲載</p>
          </div>

          <p className="text-xs text-gray-500 bg-gray-100 rounded-lg p-3">
            ⚠️ 本ドラフトはAIが生成した参考情報です。法的効力はありません。実際の離婚協議書の作成・公正証書化は弁護士または公証人にご相談ください。
          </p>
        </div>
      )}
    </div>
  );
}

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
      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded transition border border-gray-200 min-h-[44px]"
      aria-label="このセクションの内容をクリップボードにコピーする"
    >
      {copied ? "コピー済 ✓" : "コピー"}
    </button>
  );
}

function DownloadAllButton({ result }: { result: NonNullable<Result> }) {
  function handleDownload() {
    const content = [
      "===== 共同親権サポートAI 生成ドキュメント一式 =====",
      `生成日時: ${new Date().toLocaleString("ja-JP")}`,
      "",
      "【1. 次のアクション】",
      result.nextActions,
      "",
      "【2. 親権計画書草案】",
      result.plan,
      "",
      "【3. 面会交流カレンダー】",
      result.calendar,
      "",
      "【4. 養育費の目安】",
      result.money,
      "",
      "【5. 調停準備メモ】",
      result.mediation,
      "",
      "------",
      "※本ドキュメントはAIが生成した参考情報です。法的効力はありません。",
      "実際の手続きは弁護士・家庭裁判所にご相談ください。",
      "共同親権サポートAI: https://kyodo-shinken-ai.vercel.app",
    ].join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `共同親権サポートAI_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition min-h-[44px]"
      aria-label="全ドキュメントをテキストファイルでダウンロードする"
    >
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M12 16l-5-5 1.4-1.4 2.6 2.6V4h2v8.2l2.6-2.6L17 11l-5 5zM5 20v-2h14v2H5z"/></svg>
      全ドキュメントをTXTでDL
    </button>
  );
}

// 養育費かんたん試算（家庭裁判所算定表ベース概算）
function calcAlimony(payerIncome: number, receiverIncome: number, numChildren: number, childrenOver14: boolean): number {
  // 子ども人数補正係数
  const childMultiplier = numChildren === 1 ? 1.0 : numChildren === 2 ? 1.6 : 2.1;
  // 義務者(支払う側)の基礎収入率: 給与所得者 約38%
  const payerBase = payerIncome * 0.38;
  // 権利者(受け取る側)の基礎収入率: 給与所得者 約38%
  const receiverBase = receiverIncome * 0.38;
  // 生活費指数: 〜14歳=100, 15歳以上=115（算定表ベース）
  const childIndex = childrenOver14 ? 115 : 100;
  // 義務者が負担すべき割合
  const totalBase = payerBase + receiverBase;
  if (totalBase <= 0) return 0;
  const payerShare = payerBase / totalBase;
  // 年間養育費 = 子の生活費 × 義務者負担割合
  const childCost = (payerBase + receiverBase) * (childIndex / 100) * 0.5 * childMultiplier;
  const annualAlimony = childCost * payerShare;
  // 月額に変換（万円）
  return Math.round((annualAlimony / 12) * 10) / 10;
}

const HISTORY_KEY = "kyoudosinken_history";

type HistoryItem = {
  text: string; // 先頭50文字
  date: string; // ISO文字列
};

function loadHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]") ?? [];
  } catch {
    return [];
  }
}

function saveHistory(childrenInfo: string): void {
  if (typeof window === "undefined") return;
  try {
    const prev = loadHistory();
    const newItem: HistoryItem = {
      text: childrenInfo.slice(0, 50),
      date: new Date().toISOString(),
    };
    const updated = [newItem, ...prev].slice(0, 5);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch { /* noop */ }
}

function HistoryPanel({ onRestore }: { onRestore: (text: string) => void }) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setHistory(loadHistory());
  }, [open]);

  if (history.length === 0) return null;

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-white/40 shadow-lg rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50/80 transition-colors min-h-[44px]"
        aria-label={open ? "ご利用履歴を閉じる" : "ご利用履歴を開く"}
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          ご利用履歴（直近{history.length}件）
        </span>
        <span className="text-gray-400">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="divide-y divide-gray-100/80">
          {history.map((item, i) => (
            <button
              key={i}
              onClick={() => { onRestore(item.text); setOpen(false); }}
              className="w-full text-left px-4 py-3 hover:bg-teal-50/80 transition-colors min-h-[44px]"
              aria-label={`履歴を復元: ${item.text}`}
            >
              <p className="text-xs text-gray-700 truncate">{item.text}{item.text.length >= 50 ? "…" : ""}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {new Date(item.date).toLocaleString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ToolPage() {
  const [activeMainTab, setActiveMainTab] = useState<"support" | "divorce-draft">("support");
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

  // 養育費試算ステート
  const [calcPayer, setCalcPayer] = useState(500);
  const [calcReceiver, setCalcReceiver] = useState(200);
  const [calcChildren, setCalcChildren] = useState(1);
  const [calcOver14, setCalcOver14] = useState(false);

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
      if (parsed) saveHistory(childrenInfo);
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

      {/* メインタブ切り替え */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 flex gap-0">
          <button
            onClick={() => setActiveMainTab("support")}
            className={`flex-1 py-3 text-sm font-bold transition border-b-2 min-h-[44px] ${activeMainTab === "support" ? "text-teal-600 border-teal-600" : "text-gray-400 border-transparent hover:text-gray-600"}`}
            aria-label="親権サポートタブを表示する"
            aria-selected={activeMainTab === "support"}
          >
            ⚖️ 親権サポート
          </button>
          <button
            onClick={() => setActiveMainTab("divorce-draft")}
            className={`flex-1 py-3 text-sm font-bold transition border-b-2 relative min-h-[44px] ${activeMainTab === "divorce-draft" ? "text-blue-600 border-blue-600" : "text-gray-400 border-transparent hover:text-gray-600"}`}
            aria-label="離婚協議書ドラフトタブを表示する"
            aria-selected={activeMainTab === "divorce-draft"}
          >
            📄 離婚協議書ドラフト
            <span className="absolute -top-0.5 right-2 bg-blue-500 text-white text-xs font-black px-1.5 py-0.5 rounded-full">NEW</span>
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10 space-y-5">
        {activeMainTab === "divorce-draft" ? (
          <DivorceAgreementGenerator />
        ) : (
        <>
        {/* 施行告知バナー:
            - 施行前（〜3/31）: 「間もなく施行」訴求 → 現在このファイルは施行済み表現で統一済み
            - 施行当日・施行後（4/1〜）: 「施行されました」表現 → 下記がその表現（変更不要）
        */}
        <div className="bg-red-50 border border-red-300 rounded-xl p-4 text-xs text-red-800">
          🚨 <strong>2026年4月1日に共同親権制度が施行されました。</strong> — 改正民法により離婚後も父母双方が親権を持てる「共同親権」が選択可能です。面会交流・養育費・親権計画書の整理を今すぐ始めましょう。
        </div>

        {/* 法定養育費2万円アラート */}
        <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl shrink-0">💴</span>
            <div>
              <p className="text-sm font-black text-amber-900 mb-1">2026年4月〜「法定養育費2万円」制度スタート</p>
              <p className="text-xs text-amber-800 leading-relaxed">
                2026年4月1日以降の離婚では、<strong>取り決めなしでも子ども1人あたり月額2万円の養育費</strong>が自動発生（先取特権付き）。未払いの場合、より簡易に財産差し押さえが可能になりました。
              </p>
              <p className="text-xs text-amber-700 mt-1.5">→ 下の試算ツールで相場額を確認し、AIで取り決め書類を作成しましょう。</p>
            </div>
          </div>
        </div>

        <HistoryPanel onRestore={(text) => setChildrenInfo(text)} />

        <div id="tool-input-section">
          <label className="block text-sm font-bold mb-2 text-gray-700">
            お子さんの情報 <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:border-teal-500 h-28"
            placeholder={"例）長男・8歳（小学2年）、次女・5歳（保育園）\n2人とも現在は妻と同居中"}
            value={childrenInfo}
            onChange={(e) => setChildrenInfo(e.target.value)}
            aria-label="お子さんの情報（年齢・人数・現在の居住状況など）"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700">両親の状況（任意）</label>
          <textarea
            className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:border-teal-500 h-24"
            placeholder={"例）\n父: 東京都在住・会社員・残業多め\n母: 神奈川県在住・パートタイム\n車で約1時間の距離"}
            value={parentInfo}
            onChange={(e) => setParentInfo(e.target.value)}
            aria-label="両親の状況（居住地・職業・距離など）"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700">現在の状況・希望（任意）</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {[
              { emoji: "🤝", label: "協議中（穏やか）", text: "現在協議中。比較的話し合いができており、月2回程度の面会を希望" },
              { emoji: "⚖️", label: "調停申立済み", text: "家庭裁判所に調停を申し立て済み。次回期日は1ヶ月後" },
              { emoji: "🏠", label: "子は相手方同居", text: "子どもは現在相手方と同居中。面会交流を増やしたい" },
              { emoji: "👥", label: "共同親権を希望", text: "共同親権を強く希望。相手方はまだ検討中" },
              { emoji: "🚨", label: "DV・モラハラあり", text: "相手方によるモラルハラスメントあり。安全な面会交流を希望" },
            ].map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setSituationInfo(p.text)}
                className="text-xs bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 px-3 py-1.5 rounded-full transition font-medium min-h-[44px]"
                aria-label={`状況テンプレートを入力: ${p.label}`}
              >
                {p.emoji} {p.label}
              </button>
            ))}
          </div>
          <input
            type="text"
            className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-500"
            placeholder="例：協議中・比較的話し合いができる・月2回程度の面会を希望"
            value={situationInfo}
            onChange={(e) => setSituationInfo(e.target.value)}
            aria-label="現在の状況・希望（協議状況、DV有無など）"
          />
        </div>

        {/* 養育費かんたん試算セクション */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <h2 className="text-base font-black text-amber-800 mb-4">💴 養育費かんたん試算（目安）</h2>
          <div className="space-y-4">
            {/* 支払う側の年収 */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-bold text-gray-700">支払う側の年収</label>
                <span className="text-sm font-black text-amber-700">{calcPayer}万円</span>
              </div>
              <input
                type="range" min={200} max={1000} step={50}
                value={calcPayer}
                onChange={(e) => setCalcPayer(Number(e.target.value))}
                className="w-full accent-amber-500"
                aria-label={`支払う側の年収: ${calcPayer}万円`}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-0.5"><span>200万</span><span>1,000万</span></div>
            </div>
            {/* 受け取る側の年収 */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-bold text-gray-700">受け取る側の年収</label>
                <span className="text-sm font-black text-amber-700">{calcReceiver}万円</span>
              </div>
              <input
                type="range" min={0} max={500} step={50}
                value={calcReceiver}
                onChange={(e) => setCalcReceiver(Number(e.target.value))}
                className="w-full accent-amber-500"
                aria-label={`受け取る側の年収: ${calcReceiver}万円`}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-0.5"><span>0万</span><span>500万</span></div>
            </div>
            {/* 子どもの人数 */}
            <div>
              <label className="text-sm font-bold text-gray-700 block mb-2">子どもの人数</label>
              <div className="flex gap-2">
                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setCalcChildren(n)}
                    className={`flex-1 py-2 rounded-xl text-sm font-bold border transition min-h-[44px] ${calcChildren === n ? "bg-amber-500 text-white border-amber-500" : "bg-white text-gray-600 border-gray-200 hover:border-amber-300"}`}
                    aria-label={`子ども${n}人を選択`}
                    aria-pressed={calcChildren === n}
                  >
                    {n}人
                  </button>
                ))}
              </div>
            </div>
            {/* 子どもの年齢 */}
            <div>
              <label className="text-sm font-bold text-gray-700 block mb-2">子どもの年齢</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCalcOver14(false)}
                  className={`flex-1 py-2 rounded-xl text-sm font-bold border transition min-h-[44px] ${!calcOver14 ? "bg-amber-500 text-white border-amber-500" : "bg-white text-gray-600 border-gray-200 hover:border-amber-300"}`}
                  aria-label="子どもの年齢: 14歳以下を選択"
                  aria-pressed={!calcOver14}
                >
                  〜14歳
                </button>
                <button
                  type="button"
                  onClick={() => setCalcOver14(true)}
                  className={`flex-1 py-2 rounded-xl text-sm font-bold border transition min-h-[44px] ${calcOver14 ? "bg-amber-500 text-white border-amber-500" : "bg-white text-gray-600 border-gray-200 hover:border-amber-300"}`}
                  aria-label="子どもの年齢: 15歳以上を選択"
                  aria-pressed={calcOver14}
                >
                  15歳以上
                </button>
              </div>
            </div>
          </div>

          {/* 試算結果 */}
          <div className="mt-4 bg-white border-2 border-amber-300 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">月額養育費（概算）</p>
            <p className="text-3xl font-black text-amber-600">
              約{calcAlimony(calcPayer, calcReceiver, calcChildren, calcOver14)}万円<span className="text-base font-bold text-gray-500">/月</span>
            </p>
            <p className="text-xs text-red-600 mt-2">⚠️ 実際の養育費は家庭裁判所の算定表や双方合意によります。あくまで目安としてご参考ください。</p>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => {
                const toolEl = document.getElementById("tool-input-section");
                if (toolEl) toolEl.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex-1 bg-amber-500 hover:bg-amber-400 text-white font-bold py-2.5 rounded-xl text-sm transition min-h-[44px]"
              aria-label="養育費の詳細についてAIに相談する"
            >
              詳しくAIに相談する →
            </button>
            <a
              href="https://rikon.vennavi.jp/"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex-1 bg-white border border-amber-300 hover:bg-amber-50 text-amber-700 font-bold py-2.5 rounded-xl text-sm transition text-center"
            >
              弁護士に相談する →
            </a>
          </div>
          <p className="text-xs text-gray-400 text-center mt-1">※ 弁護士リンクはPR掲載です</p>
        </div>

        {!isPremium && remaining === 0 && !result && (
          <div className="bg-teal-50 border border-teal-400 rounded-xl p-4 text-center">
            <p className="text-sm text-teal-800 mb-3">無料回数を使い切りました。月額¥3,980で使い放題！</p>
            <button onClick={() => { track('upgrade_click', { service: '共同親権サポートAI', plan: 'premium' }); startCheckout(); }} className="bg-teal-500 hover:bg-teal-400 text-white font-bold px-6 py-2 rounded-xl text-sm transition min-h-[44px]" aria-label="プレミアムプランにアップグレードする">
              プレミアムにアップグレード
            </button>
          </div>
        )}

        <button
          onClick={generate}
          disabled={loading || !childrenInfo.trim() || (!isPremium && remaining === 0)}
          className="w-full bg-teal-500 hover:bg-teal-400 text-white font-black py-4 rounded-xl text-lg transition disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px]"
          aria-label="入力内容をもとに親権サポートドキュメントをAIで作成する"
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
            <button onClick={() => { track('upgrade_click', { service: '共同親権サポートAI', plan: 'premium' }); startCheckout(); }} className="bg-teal-500 hover:bg-teal-400 text-white font-black px-8 py-4 rounded-xl text-lg transition w-full min-h-[44px]" aria-label="月額3,980円のプレミアムプランにアップグレードする">
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
            <a
              href={`https://line.me/R/msg/text/?${encodeURIComponent("共同親権で何を決めればいいか分からないなら、このAIが書類を作ってくれるよ（30秒で6種類！）弁護士費用の100分の1で準備できる → https://kyodo-shinken-ai.vercel.app #共同親権 #離婚")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-black px-6 py-3 rounded-xl transition mt-2"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
              LINEで友人に紹介する
            </a>
            <div className="mt-3 flex justify-center">
              <DownloadAllButton result={result} />
            </div>
          </div>
        )}

        {result && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="flex overflow-x-auto border-b border-gray-200">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { if (t.premium && !isPremium) { startCheckout(); return; } setTab(t.id); }}
                  className={`px-4 py-3 text-xs font-bold whitespace-nowrap transition flex items-center gap-1 min-h-[44px] ${tab === t.id ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-400 hover:text-gray-600"}`}
                  aria-label={t.premium && !isPremium ? `${t.label}（プレミアム機能）` : `${t.label}タブを表示する`}
                  aria-selected={tab === t.id}
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

                  {/* 法定養育費2万円制度案内 */}
                  <div className="mt-4 bg-amber-50 border border-amber-300 rounded-xl p-4">
                    <p className="text-xs font-black text-amber-900 mb-1.5">💴 法定養育費制度（2026年4月〜）</p>
                    <ul className="space-y-1 text-xs text-amber-800">
                      <li className="flex gap-1.5"><span className="text-amber-500 shrink-0">●</span>取り決めなしでも子1人あたり<strong>月額2万円</strong>が自動発生</li>
                      <li className="flex gap-1.5"><span className="text-amber-500 shrink-0">●</span>先取特権付き — 他の債権より<strong>優先して差し押さえ可能</strong></li>
                      <li className="flex gap-1.5"><span className="text-amber-500 shrink-0">●</span>文書で合意していれば裁判なしで<strong>給与差し押さえ申立が可能</strong>に</li>
                    </ul>
                    <p className="text-xs text-amber-700 mt-2">※ 2万円は最低保証額。実際の相場（上の試算）との差額は別途取り決めを推奨。</p>
                  </div>

                  {/* 既離婚者向け親権変更導線 */}
                  <div className="mt-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-xs font-black text-blue-900 mb-1.5">📋 既に離婚済みの方へ — 親権変更の手続き</p>
                    <ul className="space-y-1 text-xs text-blue-800">
                      <li className="flex gap-1.5"><span className="text-blue-500 shrink-0">1.</span>家庭裁判所に「親権者変更調停」を申立（印紙1,200円）</li>
                      <li className="flex gap-1.5"><span className="text-blue-500 shrink-0">2.</span>相手方と合意できれば調停成立、合意困難なら審判へ</li>
                      <li className="flex gap-1.5"><span className="text-blue-500 shrink-0">3.</span>成立後、市区町村役場に「親権者変更届」を提出</li>
                    </ul>
                    <a
                      href="https://www.bengo4.com/c_3/"
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="mt-3 flex items-center justify-between bg-white border border-blue-300 rounded-xl px-3 py-2.5 hover:bg-blue-50 transition-colors"
                    >
                      <span className="text-xs font-bold text-slate-800">手続きに不安な方 — 弁護士ドットコムで無料相談</span>
                      <span className="text-blue-600 font-bold text-xs bg-blue-100 px-2 py-0.5 rounded-full whitespace-nowrap">無料相談 →</span>
                    </a>
                  </div>
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

              {/* 専門家相談アフィリ導線 */}
              <div className="mt-5 bg-teal-50 border border-teal-200 rounded-xl p-4">
                <p className="text-sm font-black text-teal-900 mb-1">⚖️ 次のステップ：専門家に相談する</p>
                <p className="text-xs text-teal-700 mb-3">AI書類はあくまで準備用です。実際の親権・養育費・面会交流の取り決めは弁護士への相談で安心して進められます。初回無料の事務所多数。</p>
                <div className="space-y-2">
                  <a href="https://www.bengo4.com/c_3/" target="_blank" rel="noopener noreferrer sponsored"
                    className="flex items-center justify-between bg-white border border-teal-300 rounded-xl px-4 py-3 hover:bg-teal-50 transition-colors">
                    <div>
                      <div className="text-sm font-bold text-slate-800">弁護士ドットコム — 離婚・親権</div>
                      <div className="text-xs text-slate-500 mt-0.5">初回相談無料 • 全国対応 • 土日OK</div>
                    </div>
                    <span className="text-teal-600 font-bold text-xs bg-teal-100 px-2 py-1 rounded-full whitespace-nowrap">無料相談 →</span>
                  </a>
                  <a href="https://rikon.vennavi.jp/" target="_blank" rel="noopener noreferrer sponsored"
                    className="flex items-center justify-between bg-white border border-teal-300 rounded-xl px-4 py-3 hover:bg-teal-50 transition-colors">
                    <div>
                      <div className="text-sm font-bold text-slate-800">ベンナビ離婚 — 離婚専門弁護士検索</div>
                      <div className="text-xs text-slate-500 mt-0.5">共同親権・親権争い・養育費交渉に特化</div>
                    </div>
                    <span className="text-teal-600 font-bold text-xs bg-teal-100 px-2 py-1 rounded-full whitespace-nowrap">弁護士を探す →</span>
                  </a>
                </div>
                <p className="text-xs text-slate-400 text-center mt-2">※ 広告・PR掲載（各社公式サイトに遷移します）</p>
              </div>
            </div>
          </div>
        )}
        </>
        )}
      </div>

      <footer className="border-t border-gray-200 py-6 text-center text-xs text-gray-400 space-x-4 mt-10">
        <Link href="/legal" className="hover:underline">特定商取引法</Link>
        <Link href="/privacy" className="hover:underline">プライバシーポリシー</Link>
        <Link href="/" className="hover:underline">トップへ戻る</Link>
      </footer>

      {showPayjp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl relative">
            <button onClick={() => setShowPayjp(false)} className="absolute top-3 right-3 text-gray-400 text-xl min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="プレミアムプラン登録ダイアログを閉じる">✕</button>
            <h2 className="text-lg font-bold mb-4 text-center">プレミアムプランに登録</h2>
            <KomojuButton planId="standard" planLabel="プレミアムプラン ¥980/月を始める" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50" />
          </div>
        </div>
      )}
    </main>
  );
}
