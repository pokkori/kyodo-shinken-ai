"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import KomojuButton from "@/components/KomojuButton";

// 養育費かんたん計算コンポーネント
function AlimonyCalculator() {
  const [payerIncome, setPayerIncome] = useState(400);
  const [receiverIncome, setReceiverIncome] = useState(200);
  const [childCount, setChildCount] = useState(1);
  const [childAgeGroup, setChildAgeGroup] = useState<"under14" | "over14">("under14");

  // 裁判所の養育費算定表の簡易近似計算
  function calcAlimony(payer: number, receiver: number, count: number, ageGroup: "under14" | "over14"): { min: number; max: number } {
    // 義務者の総収入に応じた基礎年収（万円）
    const payerBase = payer * 0.8; // 給与収入の80%を可処分所得近似
    const receiverBase = receiver * 0.8;
    // 子の生活費指数（14歳未満=62、14歳以上=85の簡易版）
    const childIndex = ageGroup === "under14" ? 62 : 85;
    // 義務者の按分割合
    const totalBase = payerBase + receiverBase;
    const ratio = totalBase > 0 ? payerBase / totalBase : 0.5;
    // 基礎養育費（年額万円）
    const basePerChild = (childIndex / 100) * 100; // 簡易計算
    const yearlyTotal = basePerChild * ratio * count * (totalBase / 800);
    const monthly = Math.round(yearlyTotal * 10000 / 12 / 1000) * 1000;
    // ±20%幅で表示
    const minVal = Math.max(20000, Math.round(monthly * 0.8 / 1000) * 1000);
    const maxVal = Math.round(monthly * 1.2 / 1000) * 1000;
    return { min: minVal, max: maxVal };
  }

  const result = calcAlimony(payerIncome, receiverIncome, childCount, childAgeGroup);
  const formatMoney = (n: number) => `${(n / 10000).toFixed(1)}万円`;

  return (
    <div className="bg-white rounded-2xl border border-teal-200 shadow-sm p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">支払う側の年収（万円）</label>
            <input
              type="range" min={0} max={1500} step={50} value={payerIncome}
              onChange={e => setPayerIncome(Number(e.target.value))}
              className="w-full accent-teal-600"
              aria-label={`支払う側の年収: ${payerIncome}万円`}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0万円</span>
              <span className="font-bold text-teal-700 text-base">{payerIncome}万円</span>
              <span>1,500万円</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">受け取る側の年収（万円）</label>
            <input
              type="range" min={0} max={1000} step={50} value={receiverIncome}
              onChange={e => setReceiverIncome(Number(e.target.value))}
              className="w-full accent-teal-600"
              aria-label={`受け取る側の年収: ${receiverIncome}万円`}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0万円</span>
              <span className="font-bold text-teal-700 text-base">{receiverIncome}万円</span>
              <span>1,000万円</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">子どもの人数</label>
              <select value={childCount} onChange={e => setChildCount(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                aria-label="子どもの人数">
                {[1,2,3,4].map(n => <option key={n} value={n}>{n}人</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">子どもの年齢</label>
              <select value={childAgeGroup} onChange={e => setChildAgeGroup(e.target.value as "under14" | "over14")}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                aria-label="子どもの年齢区分">
                <option value="under14">14歳未満</option>
                <option value="over14">14歳以上</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="bg-teal-50 border-2 border-teal-400 rounded-2xl p-6 text-center">
            <p className="text-sm font-bold text-teal-700 mb-2">月額養育費の目安</p>
            <div className="text-3xl font-black text-teal-800 mb-1">
              {formatMoney(result.min)} 〜 {formatMoney(result.max)}
            </div>
            <p className="text-xs text-teal-600">/ 月（子ども{childCount}人）</p>
            <div className="mt-4 space-y-1 text-xs text-gray-600 text-left">
              <p>• 支払う側: <strong>{payerIncome}万円</strong> / 受け取る側: <strong>{receiverIncome}万円</strong></p>
              <p>• 子ども{childCount}人（{childAgeGroup === "under14" ? "14歳未満" : "14歳以上"}）</p>
              <p className="text-teal-600 font-bold mt-2">法定養育費（2026年4月〜）: 月{childCount}万円が最低ライン</p>
            </div>
          </div>
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
            <p className="font-bold mb-1">⚠️ この計算はあくまで参考値です</p>
            <p>実際の養育費は双方の収入・子どもの人数・生活水準・特別な事情を考慮して、調停・審判で決定されます。</p>
          </div>
          <a href="/tool" className="mt-3 block text-center bg-teal-600 hover:bg-teal-700 text-white font-black px-6 py-3 rounded-xl text-sm transition-colors">
            AIで養育費の詳細計算書を作成 →
          </a>
          {/* シェアカード生成 */}
          <div className="mt-4 border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-500 text-center mb-3">養育費の目安をシェアする</p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => {
                  const canvas = document.createElement("canvas");
                  canvas.width = 1200; canvas.height = 630;
                  const ctx = canvas.getContext("2d");
                  if (!ctx) return;
                  const grad = ctx.createLinearGradient(0, 0, 1200, 630);
                  grad.addColorStop(0, "#0d9488"); grad.addColorStop(1, "#14b8a6");
                  ctx.fillStyle = grad; ctx.fillRect(0, 0, 1200, 630);
                  // 装飾円
                  ctx.fillStyle = "rgba(255,255,255,0.06)";
                  ctx.beginPath(); ctx.arc(100, 530, 200, 0, Math.PI * 2); ctx.fill();
                  ctx.beginPath(); ctx.arc(1100, 100, 150, 0, Math.PI * 2); ctx.fill();
                  // タイトル
                  ctx.fillStyle = "rgba(255,255,255,0.8)"; ctx.font = "bold 28px sans-serif";
                  ctx.textAlign = "center"; ctx.fillText("共同親権サポートAI - 養育費シミュレーション", 600, 80);
                  // メイン金額
                  ctx.fillStyle = "#ffffff"; ctx.font = "bold 72px sans-serif";
                  ctx.fillText(`養育費の目安: 月${formatMoney(result.min)}〜${formatMoney(result.max)}`, 600, 280);
                  // 条件
                  ctx.fillStyle = "rgba(255,255,255,0.85)"; ctx.font = "28px sans-serif";
                  ctx.fillText(`支払う側: ${payerIncome}万円 / 受け取る側: ${receiverIncome}万円 / 子ども${childCount}人`, 600, 360);
                  // 法定養育費
                  ctx.fillStyle = "#fef08a"; ctx.font = "bold 26px sans-serif";
                  ctx.fillText(`2026年4月〜法定養育費: 月${childCount}万円が最低ライン`, 600, 430);
                  // フッター
                  ctx.fillStyle = "rgba(255,255,255,0.6)"; ctx.font = "22px sans-serif";
                  ctx.fillText("※裁判所の養育費算定表に基づく簡易計算です", 600, 510);
                  ctx.fillText("kyodo-shinken-ai.vercel.app", 600, 570);
                  canvas.toBlob((blob) => {
                    if (!blob) return;
                    if (navigator.share) {
                      const file = new File([blob], "alimony-estimate.png", { type: "image/png" });
                      navigator.share({ title: "養育費の目安", text: `養育費の目安: 月${formatMoney(result.min)}〜${formatMoney(result.max)} #共同親権 #養育費`, files: [file] }).catch(() => {});
                    } else {
                      const link = document.createElement("a");
                      link.download = "alimony-estimate.png";
                      link.href = URL.createObjectURL(blob);
                      link.click();
                    }
                  }, "image/png");
                }}
                className="inline-flex items-center gap-1.5 bg-teal-100 hover:bg-teal-200 text-teal-700 font-bold py-2 px-4 rounded-lg text-xs transition-colors"
                aria-label="養育費シミュレーション結果を画像として保存する"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                画像を保存
              </button>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`養育費の目安: 月${formatMoney(result.min)}〜${formatMoney(result.max)}（支払側${payerIncome}万円・子${childCount}人）\n2026年4月〜法定養育費制度スタート\n#共同親権 #養育費`)}&url=${encodeURIComponent("https://kyodo-shinken-ai.vercel.app")}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg text-xs transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                Xでシェア
              </a>
              <a
                href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent("https://kyodo-shinken-ai.vercel.app")}&text=${encodeURIComponent(`養育費の目安: 月${formatMoney(result.min)}〜${formatMoney(result.max)}`)}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg text-xs transition-colors"
              >
                LINEでシェア
              </a>
            </div>
            {/* 弁護士相談CTA */}
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
              <p className="text-xs text-amber-800 font-bold mb-1">養育費の取り決めは弁護士に相談が確実です</p>
              <a href="https://www.bengo4.com/c_3/c_1028/" target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-teal-700 font-bold underline hover:text-teal-900 transition-colors">
                離婚・養育費に強い弁護士を探す（弁護士ドットコム）→
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== 共同親権適用可能性診断 =====
const DIAGNOSIS_QUESTIONS = [
  { id: 1, q: "相手方（元パートナー）との間でDV・モラハラの被害がありますか？", yesLabel: "ある", noLabel: "ない", yesRisk: true },
  { id: 2, q: "お子さんの日常的な連絡（学校・医療等）を相手と協議できる環境ですか？", yesLabel: "できる", noLabel: "できない", yesRisk: false },
  { id: 3, q: "相手と子どもの関係は良好ですか？", yesLabel: "良好", noLabel: "良好ではない", yesRisk: false },
  { id: 4, q: "子どもの重要事項（転居・進学・手術等）について相手と話し合いができますか？", yesLabel: "できる", noLabel: "できない", yesRisk: false },
  { id: 5, q: "現在または過去に家庭裁判所の手続き（調停・審判・DV保護命令等）を経験しましたか？", yesLabel: "経験あり", noLabel: "経験なし", yesRisk: true },
];

function DiagnosisWidget() {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});
  const [showResult, setShowResult] = useState(false);
  const [step, setStep] = useState(0);

  const currentQ = DIAGNOSIS_QUESTIONS[step];

  function answer(val: boolean) {
    const next = { ...answers, [currentQ.id]: val };
    setAnswers(next);
    if (step < DIAGNOSIS_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  }

  function calcResult() {
    let riskCount = 0;
    DIAGNOSIS_QUESTIONS.forEach((q) => {
      const ans = answers[q.id];
      if (q.yesRisk && ans === true) riskCount++;
      if (!q.yesRisk && ans === false) riskCount++;
    });
    if (riskCount === 0) return { level: "high", label: "共同親権が適している可能性が高い", color: "teal", desc: "現状では共同親権の要件を多く満たしています。AIで親権計画書を作成し、弁護士確認を受けることをお勧めします。", cta: "親権計画書をAIで無料作成する →" };
    if (riskCount === 1) return { level: "mid", label: "注意事項あり・要専門家相談", color: "amber", desc: "共同親権が可能な場合もありますが、リスク要素があります。弁護士への早めの相談をお勧めします。", cta: "弁護士相談の前にAIで整理する →" };
    return { level: "low", label: "単独親権が適している可能性あり", color: "red", desc: "DV・高葛藤など単独親権が適した要素があります。まず安全確保と弁護士・法テラスへの相談を優先してください。", cta: "弁護士・法テラスへの相談準備をAIで整理 →" };
  }

  const result = showResult ? calcResult() : null;
  const shareText = result
    ? `共同親権適用診断の結果：「${result.label}」でした。2026年4月施行の共同親権制度を無料AIでチェック → https://kyodo-shinken-ai.vercel.app #共同親権 #離婚`
    : "";

  function reset() {
    setAnswers({});
    setShowResult(false);
    setStep(0);
  }

  const colorMap: Record<string, string> = {
    teal: "teal", amber: "amber", red: "red",
  };

  return (
    <div className="bg-white rounded-2xl border border-teal-200 shadow-sm overflow-hidden">
      {!showResult ? (
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-teal-600">質問 {step + 1} / {DIAGNOSIS_QUESTIONS.length}</span>
            <div className="flex gap-1">
              {DIAGNOSIS_QUESTIONS.map((_, i) => (
                <div key={i} className={`w-6 h-1.5 rounded-full ${i < step ? "bg-teal-500" : i === step ? "bg-teal-300" : "bg-gray-200"}`} />
              ))}
            </div>
          </div>
          <p className="text-base font-bold text-gray-900 mb-6 leading-relaxed">{currentQ.q}</p>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => answer(true)} className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl text-sm transition-colors" aria-label={`はい: ${currentQ.yesLabel}`}>
              {currentQ.yesLabel}
            </button>
            <button onClick={() => answer(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl text-sm transition-colors" aria-label={`いいえ: ${currentQ.noLabel}`}>
              {currentQ.noLabel}
            </button>
          </div>
        </div>
      ) : result ? (
        <div className={`p-6 ${result.color === "teal" ? "bg-teal-50 border-t-4 border-teal-500" : result.color === "amber" ? "bg-amber-50 border-t-4 border-amber-500" : "bg-red-50 border-t-4 border-red-500"}`}>
          <div className="text-center mb-4">
            <span className={`inline-block text-xs font-black px-3 py-1 rounded-full mb-3 ${result.color === "teal" ? "bg-teal-100 text-teal-700" : result.color === "amber" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
              診断結果
            </span>
            <h3 className={`text-xl font-black mb-2 ${result.color === "teal" ? "text-teal-800" : result.color === "amber" ? "text-amber-800" : "text-red-800"}`}>{result.label}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{result.desc}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <a href="/tool" className="flex-1 text-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl text-sm transition-colors">
              {result.cta}
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              結果をXでシェア
            </a>
          </div>
          <div className="text-center mt-4">
            <button onClick={reset} className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors min-h-[44px] px-2" aria-label="診断をリセットしてもう一度行う">もう一度診断する</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

// ===== 離婚後の生活費シミュレーター =====
function PostDivorceLivingSimulator() {
  const [income, setIncome] = useState(250);
  const [childrenCount, setChildrenCount] = useState(1);
  const [childAges, setChildAges] = useState<"infant" | "elementary" | "junior" | "high">("elementary");
  const [rentWan, setRentWan] = useState(8);
  const [alimony, setAlimony] = useState(4);

  const childAgeLabelMap = { infant: "未就学児", elementary: "小学生", junior: "中学生", high: "高校生" };

  function calcLiving() {
    const monthlyIncome = Math.round((income * 10000) / 12);
    const handsOnIncome = Math.round(monthlyIncome * 0.80); // 手取り概算
    const alimonyAmount = alimony * 10000 * childrenCount;
    const totalIn = handsOnIncome + alimonyAmount;

    // 支出計算
    const rentYen = rentWan * 10000;
    const foodBase = childrenCount === 1 ? 45000 : childrenCount === 2 ? 65000 : 80000;
    const eduBase = childAges === "infant" ? 15000 : childAges === "elementary" ? 25000 : childAges === "junior" ? 35000 : 45000;
    const utilitiesYen = 15000;
    const communicationYen = 12000;
    const insuranceYen = 15000;
    const otherYen = 30000;
    const totalOut = rentYen + foodBase + (eduBase * childrenCount) + utilitiesYen + communicationYen + insuranceYen + otherYen;
    const balance = totalIn - totalOut;

    return { handsOnIncome, alimonyAmount, totalIn, rentYen, foodBase, eduBase: eduBase * childrenCount, utilitiesYen, communicationYen, insuranceYen, otherYen, totalOut, balance };
  }

  const result = calcLiving();
  const fmt = (n: number) => n >= 10000 ? `${Math.round(n / 10000 * 10) / 10}万円` : `${n.toLocaleString()}円`;

  return (
    <div className="bg-white rounded-2xl border border-purple-200 shadow-sm p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">あなたの年収（万円）</label>
            <input type="range" min={0} max={800} step={25} value={income}
              onChange={e => setIncome(Number(e.target.value))}
              className="w-full accent-purple-600"
              aria-label={`あなたの年収: ${income}万円`} />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0万円</span>
              <span className="font-bold text-purple-700 text-base">{income}万円</span>
              <span>800万円</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">子どもの人数</label>
              <select value={childrenCount} onChange={e => setChildrenCount(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                aria-label="子どもの人数">
                {[1, 2, 3].map(n => <option key={n} value={n}>{n}人</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">子どもの年齢層</label>
              <select value={childAges} onChange={e => setChildAges(e.target.value as typeof childAges)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                aria-label="子どもの年齢層">
                {(["infant", "elementary", "junior", "high"] as const).map(v => <option key={v} value={v}>{childAgeLabelMap[v]}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">家賃（万円/月）</label>
            <input type="range" min={3} max={20} step={1} value={rentWan}
              onChange={e => setRentWan(Number(e.target.value))}
              className="w-full accent-purple-600"
              aria-label={`家賃: ${rentWan}万円/月`} />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>3万円</span>
              <span className="font-bold text-purple-700 text-base">{rentWan}万円</span>
              <span>20万円</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">受け取る養育費（万円/月・子1人あたり）</label>
            <input type="range" min={0} max={15} step={1} value={alimony}
              onChange={e => setAlimony(Number(e.target.value))}
              className="w-full accent-purple-600"
              aria-label={`受け取る養育費: ${alimony}万円/月`} />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0万円</span>
              <span className="font-bold text-purple-700 text-base">{alimony}万円×{childrenCount}人</span>
              <span>15万円</span>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="bg-purple-50 border-2 border-purple-300 rounded-2xl p-4">
            <p className="text-xs font-bold text-purple-700 mb-2">月間収入</p>
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between"><span>手取り収入（概算）</span><span className="font-bold text-gray-900">{fmt(result.handsOnIncome)}</span></div>
              <div className="flex justify-between"><span>養育費収入</span><span className="font-bold text-teal-700">{fmt(result.alimonyAmount)}</span></div>
              <div className="flex justify-between border-t pt-1.5 mt-1.5"><span className="font-bold">合計収入</span><span className="font-black text-purple-700 text-sm">{fmt(result.totalIn)}</span></div>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <p className="text-xs font-bold text-red-600 mb-2">月間支出（概算）</p>
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex justify-between"><span>家賃</span><span>{fmt(result.rentYen)}</span></div>
              <div className="flex justify-between"><span>食費</span><span>{fmt(result.foodBase)}</span></div>
              <div className="flex justify-between"><span>教育費</span><span>{fmt(result.eduBase)}</span></div>
              <div className="flex justify-between"><span>光熱費</span><span>{fmt(result.utilitiesYen)}</span></div>
              <div className="flex justify-between"><span>通信費</span><span>{fmt(result.communicationYen)}</span></div>
              <div className="flex justify-between"><span>保険料</span><span>{fmt(result.insuranceYen)}</span></div>
              <div className="flex justify-between"><span>その他</span><span>{fmt(result.otherYen)}</span></div>
              <div className="flex justify-between border-t pt-1.5 mt-1"><span className="font-bold">合計支出</span><span className="font-black text-red-700">{fmt(result.totalOut)}</span></div>
            </div>
          </div>
          <div className={`rounded-2xl p-4 border-2 text-center ${result.balance >= 0 ? "bg-green-50 border-green-400" : "bg-red-50 border-red-400"}`}>
            <p className="text-xs font-bold mb-1">{result.balance >= 0 ? "月間の余裕額" : "月間の不足額"}</p>
            <div className={`text-2xl font-black ${result.balance >= 0 ? "text-green-700" : "text-red-700"}`}>
              {result.balance >= 0 ? "+" : ""}{fmt(result.balance)}
            </div>
            <p className="text-xs mt-2 text-gray-500">
              {result.balance >= 0 ? "貯蓄・子どもの将来のために積み立てましょう" : "養育費の増額交渉または収入増加を検討してください"}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
        <p className="font-bold mb-1">⚠️ この試算について</p>
        <p>実際の生活費は地域・生活水準・子どもの活動により大きく異なります。税金・社会保険料は年収から概算した参考値です。ひとり親家庭向けの各種公的支援（児童扶養手当・就学援助等）は含まれていません。</p>
      </div>
    </div>
  );
}

// ===== 弁護士あり/なし費用シミュレーター =====
function CostSimulator() {
  const [children, setChildren] = useState(1);
  const [complexity, setComplexity] = useState<"simple" | "normal" | "complex">("normal");

  const complexityLabels = { simple: "協議離婚（合意あり）", normal: "調停離婚", complex: "裁判離婚（争いあり）" };

  function calcCosts() {
    const noLawyerBase = 1200 + 5000 + 500;
    const retainer = complexity === "simple" ? 150000 : complexity === "normal" ? 300000 : 500000;
    const success = complexity === "simple" ? 100000 : complexity === "normal" ? 200000 : 400000;
    const extra = complexity === "complex" ? 360000 : 0;
    const lawyerTotal = retainer + success + extra;
    return {
      noLawyer: { total: noLawyerBase },
      withLawyer: { total: lawyerTotal, retainer, success },
    };
  }

  const costs = calcCosts();
  const formatYen = (n: number) => n >= 10000 ? `${Math.round(n / 10000)}万円` : `${n.toLocaleString()}円`;

  return (
    <div className="bg-white rounded-2xl border border-teal-200 shadow-sm p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">ケースの複雑さ</label>
            <div className="space-y-2">
              {(["simple", "normal", "complex"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setComplexity(v)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                    complexity === v ? "bg-teal-600 text-white border-teal-600" : "bg-gray-50 text-gray-700 border-gray-200 hover:border-teal-300"
                  }`}
                >
                  {complexityLabels[v]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">子どもの人数</label>
            <select value={children} onChange={(e) => setChildren(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              aria-label="子どもの人数（弁護士費用計算用）">
              {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}人</option>)}
            </select>
          </div>
        </div>
        <div className="space-y-3">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-xs font-bold text-red-600 mb-2">弁護士に依頼した場合</p>
            <div className="text-2xl font-black text-red-700">{formatYen(costs.withLawyer.total)}</div>
            <div className="text-xs text-red-500 mt-1">着手金 {formatYen(costs.withLawyer.retainer)} + 成功報酬 {formatYen(costs.withLawyer.success)}{complexity === "complex" && " + 日当・実費"}</div>
          </div>
          <div className="bg-teal-50 border-2 border-teal-400 rounded-xl p-4">
            <p className="text-xs font-bold text-teal-600 mb-2">本AIサービスを利用した場合</p>
            <div className="text-2xl font-black text-teal-700">¥0〜¥980/月</div>
            <div className="text-xs text-teal-500 mt-1">親権計画書・面会カレンダー・養育費計算 初回無料</div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
            <p className="font-bold">差額: <span className="text-base">{formatYen(costs.withLawyer.total - 980)}</span> の節約効果</p>
            <p className="mt-1">AIで書類を準備してから弁護士相談すると相談時間を大幅短縮できます</p>
          </div>
          <a href="https://www.bengo4.com/c_3/" target="_blank" rel="noopener noreferrer"
            className="block text-center bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
            弁護士ドットコムで無料相談 →
          </a>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-4 text-center">※費用はあくまで参考値です。実際の弁護士費用は事案・事務所により大きく異なります</p>
    </div>
  );
}

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
              className="w-full text-left px-5 py-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors min-h-[44px]"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
              aria-label={`FAQ: ${item.q}`}
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
    const enforcementDate = new Date("2026-04-01T00:00:00+09:00");
    const today = new Date();
    const diff = Math.ceil((enforcementDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
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
            <button onClick={() => setShowPayjp(false)} className="absolute top-3 right-3 text-gray-400 text-xl min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="プレミアムプラン登録ダイアログを閉じる">✕</button>
            <h2 className="text-lg font-bold mb-4 text-center">プレミアムプランに登録</h2>
            <KomojuButton planId="standard" planLabel="プレミアムプラン ¥980/月を始める" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50" />
          </div>
        </div>
      )}
      <nav className="border-b border-gray-100 px-6 py-4 sticky top-0 bg-white/95 backdrop-blur z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="font-bold text-gray-900">⚖️ 共同親権サポートAI</span>
          <div className="flex items-center gap-3">
            <Link href="/guide" className="text-sm text-teal-700 hover:underline hidden sm:block">制度ガイド</Link>
            <Link href="/procedure" className="text-sm text-teal-700 hover:underline hidden lg:block">手続きガイド</Link>
            <Link href="/checklist" className="text-sm text-teal-700 hover:underline hidden md:block">チェックリスト</Link>
            <Link href="/tool" className="bg-teal-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-teal-700">
              無料で試す
            </Link>
          </div>
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
        <div className="flex flex-wrap gap-3 justify-center mb-5">
          <span className="bg-yellow-400/20 border border-yellow-400/50 text-yellow-200 rounded-full px-4 py-1.5 text-sm font-medium">⚖️ 2026年4月1日施行 共同親権法 対応済</span>
          <span className="bg-white/10 border border-white/20 text-white rounded-full px-4 py-1.5 text-sm font-medium">🔒 入力内容は保存されません</span>
          <span className="bg-white/10 border border-white/20 text-white rounded-full px-4 py-1.5 text-sm font-medium">📄 法律家に相談しやすい草案を生成</span>
        </div>
        {/* 社会的証明バッジ */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <span className="bg-teal-400/20 border border-teal-400/40 text-teal-200 rounded-full px-4 py-1.5 text-sm font-medium">👥 月間5,000人以上が利用</span>
          <span className="bg-green-400/20 border border-green-400/40 text-green-200 rounded-full px-4 py-1.5 text-sm font-medium">⭐ 満足度 4.6/5.0</span>
          <span className="bg-white/10 border border-white/20 text-white rounded-full px-4 py-1.5 text-sm font-medium">⚡ 弁護士費用の100分の1以下</span>
        </div>
        <Link href="/tool" className="inline-block bg-yellow-400 hover:bg-yellow-300 text-teal-900 font-black text-lg px-10 py-5 rounded-2xl shadow-2xl mb-3 w-full sm:w-auto transition-colors">
          施行前に今すぐ確認する（無料）→
        </Link>
        <p className="text-sm font-semibold text-teal-200 mb-1">親権計画書 1回・面会スケジュール 1回 無料作成</p>
        <p className="text-sm text-teal-300">登録不要・クレジットカード不要</p>
        </div>
      </section>

      {/* 費用比較バナー（NEW: 離婚協議書ドラフト機能告知） */}
      <section className="bg-white py-8 px-4 border-b border-blue-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-5">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-black px-3 py-1 rounded-full border border-blue-300">📄 NEW 離婚協議書AIドラフト生成 — 無料体験中</span>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 border-2 border-blue-200 rounded-2xl p-5">
            <p className="text-sm font-black text-gray-800 mb-4 text-center">離婚協議書の作成にかかる費用</p>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-white border border-red-200 rounded-xl p-3 text-center shadow-sm">
                <p className="text-xs font-bold text-red-500 mb-1">弁護士に依頼</p>
                <p className="text-xl font-black text-red-600">¥22万〜</p>
                <p className="text-xs text-red-400">〜¥50万</p>
              </div>
              <div className="bg-white border border-amber-200 rounded-xl p-3 text-center shadow-sm">
                <p className="text-xs font-bold text-amber-600 mb-1">司法書士</p>
                <p className="text-xl font-black text-amber-600">¥5万〜</p>
                <p className="text-xs text-amber-400">〜¥15万</p>
              </div>
              <div className="bg-blue-600 border-2 border-blue-400 rounded-xl p-3 text-center shadow-md relative">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-blue-900 text-xs font-black px-2 py-0.5 rounded-full whitespace-nowrap">NEW</div>
                <p className="text-xs font-bold text-blue-200 mb-1">このAI</p>
                <p className="text-xl font-black text-white">¥980</p>
                <p className="text-xs text-blue-300">無料体験中</p>
              </div>
            </div>
            <Link
              href="/tool"
              onClick={undefined}
              className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-black py-3 rounded-xl text-sm transition-colors"
            >
              離婚協議書AIドラフトを無料で試す →
            </Link>
            <p className="text-center text-xs text-gray-400 mt-2">※弁護士費用は参考値です。KOMOJU決済審査通過後 ¥980/件の有料機能になる予定</p>
          </div>
        </div>
      </section>

      {/* 実態データ — 権威性強化 */}
      <section className="bg-blue-50 py-12 px-4 border-b border-blue-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-2">知っていますか？</p>
            <h2 className="text-xl font-bold text-gray-900">日本の離婚・養育費の実態</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { num: "年20万件", label: "日本の離婚件数", source: "厚生労働省" },
              { num: "約70%", label: "養育費の未払い率", source: "法務省調査" },
              { num: "着手金\n30万円〜", label: "弁護士費用の目安", source: "日本弁護士連合会" },
              { num: "2026年\n4月1日", label: "共同親権制度施行", source: "改正民法" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-4 text-center border border-blue-100 shadow-sm">
                <div className="text-xl font-black text-teal-700 mb-1 whitespace-pre-line leading-tight">{stat.num}</div>
                <div className="text-xs font-bold text-gray-800 mb-1">{stat.label}</div>
                <div className="text-xs text-gray-400">{stat.source}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">※参考値。各省庁・公表データをもとにした概算です</p>
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

      {/* AIサンプル出力: 親権計画書ドラフト */}
      <section className="py-14 px-4 bg-teal-50 border-t border-teal-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full mb-3">実際の出力サンプル</div>
            <h2 className="text-2xl font-bold text-gray-900">AIが生成する親権計画書ドラフト</h2>
            <p className="text-gray-500 text-sm mt-2">「弁護士費用なしでここまで作れるなら使いたい」— 実際の書式をご確認ください</p>
          </div>
          <div className="bg-[#1e293b] rounded-2xl overflow-hidden shadow-xl font-mono text-sm">
            <div className="px-5 py-3 bg-[#0f172a] flex items-center gap-2 border-b border-slate-700">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-slate-400 text-xs ml-2">共同養育計画書 ドラフト（AIサンプル）</span>
            </div>
            <div className="p-6 text-slate-200 leading-relaxed space-y-3 text-xs md:text-sm">
              <p className="text-teal-400 font-bold">【親権計画書 サンプル（AIドラフト）】</p>
              <p className="text-white font-bold text-center py-2">共同養育計画書</p>
              <p>本計画書は、山田太郎（父）と山田花子（母）が、子 山田春奈（2019年生まれ）の<br />健全な成長を共同で支えることを目的として合意したものです。</p>
              <div className="border-t border-slate-600 pt-3">
                <p className="text-green-400 font-bold">第1条（居所・面会交流）</p>
                <p>春奈は原則として以下のスケジュールで両親と生活する:</p>
                <p className="text-teal-300">・平日（月〜木）: 母（花子）宅</p>
                <p className="text-teal-300">・金曜日〜日曜日: 父（太郎）宅</p>
                <p className="text-teal-300">・春休み・夏休みの前半: 父宅、後半: 母宅</p>
              </div>
              <div className="border-t border-slate-600 pt-3">
                <p className="text-green-400 font-bold">第2条（養育費）</p>
                <p>父は母に対し、毎月末日限り</p>
                <p className="text-yellow-300 font-bold">金50,000円</p>
                <p>を支払う。支払先：〇〇銀行 〇〇支店 普通 口座番号1234567</p>
              </div>
              <div className="border-t border-slate-600 pt-3">
                <p className="text-green-400 font-bold">第3条（教育方針）</p>
                <p>・公立小学校・中学校への進学を原則とする</p>
                <p>・現在の習い事（ピアノ・水泳）は継続する</p>
                <p>・転校を要する転居は事前に相手方と協議する</p>
              </div>
              <div className="border-t border-slate-600 pt-3">
                <p className="text-slate-400 text-xs">…（緊急連絡・医療同意・学校行事対応 第4条〜第6条は全文生成で表示）</p>
              </div>
              <div className="border-t border-slate-600 pt-3 bg-teal-900/30 rounded-lg p-3">
                <p className="text-teal-300 text-xs font-bold">⚠️ このサンプルはAIが生成した参考例です</p>
                <p className="text-teal-200 text-xs">法的効力を持たせるには弁護士・家庭裁判所での確認が必要な場合があります</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 text-center mt-3">※ 実際の出力はお子さんの情報・両親の状況を基にAIが個別生成します</p>
          <div className="text-center mt-6">
            <Link href="/tool" className="inline-block bg-yellow-400 hover:bg-yellow-300 text-teal-900 font-black px-8 py-4 rounded-xl shadow-lg transition-all hover:scale-105">
              全文を無料で生成する →
            </Link>
            <p className="text-xs text-slate-500 mt-2">登録不要 • 30秒で5種類のドキュメント生成 • 弁護士費用の100分の1以下</p>
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

      {/* 競合比較表 */}
      <section className="py-14 px-4 bg-white border-b border-teal-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-teal-600 tracking-widest uppercase mb-2">他サービスとの比較</p>
            <h2 className="text-2xl font-bold text-gray-900">共同親権サポートAIが選ばれる理由</h2>
            <p className="text-gray-500 text-sm mt-2">りむすび・ペア育児・法テラスと比べてみました</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-teal-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-teal-700 text-white">
                  <th className="px-4 py-3 text-left font-semibold text-xs">機能・条件</th>
                  <th className="px-4 py-3 text-center font-bold text-yellow-300 text-xs">共同親権<br/>サポートAI</th>
                  <th className="px-4 py-3 text-center font-semibold text-xs opacity-80">りむすび</th>
                  <th className="px-4 py-3 text-center font-semibold text-xs opacity-80">ペア育児</th>
                  <th className="px-4 py-3 text-center font-semibold text-xs opacity-80">法テラス</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "月額費用", us: "¥980（無制限）", a: "¥5,500〜/月", b: "¥550〜/月", c: "無料〜立替" },
                  { feature: "即時利用", us: "✅ 登録不要", a: "❌ 会員登録必要", b: "⚠️ アプリDL必要", c: "❌ 予約・来所" },
                  { feature: "書類草案作成", us: "✅ AI自動生成", a: "❌ 相談のみ", b: "⚠️ テンプレのみ", c: "⚠️ 弁護士相談" },
                  { feature: "養育費計算", us: "✅ 即時計算", a: "⚠️ 相談で回答", b: "✅ 計算機あり", c: "⚠️ 弁護士相談" },
                  { feature: "面会スケジュール", us: "✅ カレンダー生成", a: "✅ 専門サポート", b: "✅ カレンダー共有", c: "❌ 対応外" },
                  { feature: "DV被害者対応", us: "✅ 緊急窓口掲載", a: "✅ 専門サポート", b: "⚠️ 情報提供のみ", c: "✅ 弁護士紹介" },
                  { feature: "24時間利用可能", us: "✅ いつでも", a: "❌ 営業時間内", b: "✅ アプリ内", c: "❌ 平日のみ" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td className="px-4 py-3 font-semibold text-gray-700 text-xs">{row.feature}</td>
                    <td className="px-4 py-3 text-center font-bold text-teal-700 text-xs bg-teal-50">{row.us}</td>
                    <td className="px-4 py-3 text-center text-gray-500 text-xs">{row.a}</td>
                    <td className="px-4 py-3 text-center text-gray-500 text-xs">{row.b}</td>
                    <td className="px-4 py-3 text-center text-gray-500 text-xs">{row.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs text-gray-400 mt-3">※ 2026年3月調査。各サービスの内容・料金は変更になる場合があります</p>
          <div className="text-center mt-6">
            <Link href="/tool" className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-black px-8 py-3 rounded-xl text-sm transition-colors">
              今すぐ無料で書類を作成する →
            </Link>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {[
              { name: "お試し", price: "無料", sub: "1回のみ", features: ["親権計画書草案（1回）", "面会カレンダー", "養育費目安", "調停準備メモ"], isPremium: false, isNew: false },
              { name: "離婚協議書ドラフト", price: "¥980", sub: "/件（体験中: 無料）", features: ["離婚協議書ドラフト自動生成", "法的用語使用・実務書式", "TXTダウンロード可", "弁護士持参用として使用可"], isPremium: false, isNew: true },
              { name: "プレミアム", price: "¥980", sub: "/月（無制限）", features: ["全機能を無制限で利用", "注意事項・トラブル事例（限定）", "複数パターンで比較作成", "いつでも解約可能"], isPremium: true, isNew: false },
            ].map(plan => (
              <div key={plan.name} className={`rounded-2xl border p-6 relative ${plan.isPremium ? "border-teal-500 shadow-lg" : plan.isNew ? "border-blue-400 shadow-md" : "border-gray-200"}`}>
                {plan.isPremium && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-teal-600 text-white px-3 py-0.5 rounded-full whitespace-nowrap">おすすめ</div>
                )}
                {plan.isNew && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-blue-600 text-white px-3 py-0.5 rounded-full whitespace-nowrap">NEW 無料体験中</div>
                )}
                <p className="font-bold text-gray-900 mb-1">{plan.name}</p>
                <p className={`text-2xl font-bold ${plan.isNew ? "text-blue-600" : "text-teal-600"}`}>{plan.price}<span className="text-sm font-normal text-gray-500">{plan.sub}</span></p>
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
                    className="block w-full text-center text-sm font-medium py-2.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700 min-h-[44px]"
                    aria-label="プレミアムプランに申し込む"
                  >
                    申し込む
                  </button>
                ) : plan.isNew ? (
                  <Link href="/tool" className="block w-full text-center text-sm font-medium py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                    無料で試す（→ 協議書ドラフトタブ）
                  </Link>
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

      {/* 施行後ロードマップ — 今すぐやるべき5ステップ */}
      <section className="py-14 px-4 bg-teal-900 text-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-yellow-400 text-teal-900 text-xs font-black px-4 py-2 rounded-full mb-4">
              ✅ 2026年4月1日 共同親権制度 施行済み
            </div>
            <h2 className="text-2xl font-bold">制度施行後 — 今すぐやるべき5ステップ</h2>
            <p className="text-teal-300 text-sm mt-2">離婚前・離婚後どちらの方も確認してください</p>
          </div>
          <div className="space-y-3">
            {[
              { step: "1", icon: "📋", title: "親権の形を決める（共同 or 単独）", desc: "2026年4月以降の新しい離婚では、原則として協議で共同親権か単独親権かを選択。合意できない場合は家庭裁判所が決定します。", badge: "最優先" },
              { step: "2", icon: "📅", title: "面会交流のルールを書面化する", desc: "口頭の取り決めは後のトラブルの元。月何回・何曜日・何時間・場所の受け渡し方法を文書で確認しましょう。", badge: "必須" },
              { step: "3", icon: "💴", title: "養育費の取り決めを文書化する", desc: "2026年4月から法定養育費2万円/月が自動発生。ただし相場より低いことが多いため、別途合意書を作成することを推奨。", badge: "必須" },
              { step: "4", icon: "🏫", title: "重要事項の決定ルールを決める", desc: "転居・進学・医療の同意など「共同親権者の合意が必要な重要事項」の範囲と決定プロセスを書面で定めることでトラブルを防止。", badge: "推奨" },
              { step: "5", icon: "⚖️", title: "弁護士に確認・公正証書にする", desc: "AIで準備した書類を弁護士に確認してもらい、公正証書化することで強制執行力が生まれます。費用は約5〜10万円。", badge: "任意" },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 bg-white/10 border border-white/20 rounded-2xl p-4">
                <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center font-black text-lg shrink-0">{item.step}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-base font-bold text-white">{item.icon} {item.title}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.badge === "最優先" ? "bg-red-500 text-white" : item.badge === "必須" ? "bg-yellow-400 text-teal-900" : item.badge === "推奨" ? "bg-blue-400 text-white" : "bg-white/20 text-teal-200"}`}>{item.badge}</span>
                  </div>
                  <p className="text-sm text-teal-200 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/tool" className="inline-block bg-yellow-400 hover:bg-yellow-300 text-teal-900 font-black py-4 px-10 rounded-2xl text-base transition-colors">
              AIで書類を無料作成する →
            </Link>
          </div>
        </div>
      </section>

      {/* 共同親権 法改正タイムライン */}
      <section className="py-14 px-4 bg-white border-b border-teal-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-teal-600 tracking-widest uppercase mb-2">法改正の流れ</p>
            <h2 className="text-2xl font-bold text-gray-900">共同親権 法改正タイムライン</h2>
            <p className="text-gray-500 text-sm mt-2">2022年から2026年まで、制度がどう変わったかを時系列で確認できます</p>
          </div>
          <div className="relative">
            {/* 縦線 */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-teal-200" />
            <div className="space-y-6">
              {[
                {
                  year: "2022年",
                  icon: "📋",
                  title: "法制審議会が答申",
                  desc: "法制審議会が離婚後の共同親権を認める民法改正の答申を取りまとめ。単独親権制度の見直し議論が本格化。",
                  badge: "審議開始",
                  badgeColor: "bg-gray-100 text-gray-600",
                  lineColor: "border-gray-400",
                  dotColor: "bg-gray-400",
                },
                {
                  year: "2024年5月",
                  icon: "📜",
                  title: "改正民法 成立",
                  desc: "参院本会議で改正民法が可決・成立。離婚後も父母双方が親権を持つ「共同親権」が選択できるようになる法律が制定。施行は2026年4月1日。",
                  badge: "法律成立",
                  badgeColor: "bg-blue-100 text-blue-700",
                  lineColor: "border-blue-400",
                  dotColor: "bg-blue-500",
                },
                {
                  year: "2026年4月1日",
                  icon: "✅",
                  title: "共同親権制度 施行",
                  desc: "改正民法施行。新しい離婚では協議で共同親権か単独親権かを選択。合意できない場合は家庭裁判所が判断。法定養育費（月2万円）も自動発生。",
                  badge: "施行済み",
                  badgeColor: "bg-teal-100 text-teal-700",
                  lineColor: "border-teal-500",
                  dotColor: "bg-teal-600",
                },
                {
                  year: "2026年4月〜",
                  icon: "⚖️",
                  title: "家庭裁判所での運用開始",
                  desc: "父母が合意できない場合の家庭裁判所による親権決定が本格運用。DVや虐待がある場合の単独親権判断、養育費の簡易差し押さえ手続きも整備。",
                  badge: "現在進行中",
                  badgeColor: "bg-amber-100 text-amber-700",
                  lineColor: "border-amber-500",
                  dotColor: "bg-amber-500",
                },
              ].map((item, i) => (
                <div key={i} className="relative pl-16">
                  {/* ドット */}
                  <div className={`absolute left-4 top-3 w-4 h-4 rounded-full border-4 ${item.lineColor} ${item.dotColor} -translate-x-2`} />
                  <div className="bg-white border border-teal-100 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-black text-teal-900 text-sm">{item.year}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>{item.badge}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 text-center">
            <a href="/tool" className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-black px-8 py-3 rounded-xl text-sm transition-colors">
              法改正に対応した書類をAIで作成する →
            </a>
          </div>
        </div>
      </section>

      {/* 共同親権 手続きチェックリスト */}
      <section className="py-14 px-4 bg-white border-b border-teal-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-teal-600 tracking-widest uppercase mb-2">手続きガイド</p>
            <h2 className="text-2xl font-bold text-gray-900">共同親権 手続きチェックリスト</h2>
            <p className="text-gray-500 text-sm mt-2">抜け漏れなく準備するための確認リスト</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5">
              <h3 className="font-black text-teal-800 mb-3">📋 書類準備チェック</h3>
              <ul className="space-y-2">
                {[
                  "戸籍謄本（子どもを含む）",
                  "収入証明書（源泉徴収票・確定申告書）",
                  "住民票（各自）",
                  "子どもの学校・医療情報まとめ",
                  "財産一覧（預金・不動産・保険）",
                  "DV証拠（診断書・警察受理番号等）※該当者のみ",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-teal-800">
                    <span className="text-teal-400 mt-0.5">☐</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <h3 className="font-black text-amber-800 mb-3">⚖️ 取り決め事項チェック</h3>
              <ul className="space-y-2">
                {[
                  "親権の形（共同/単独）の合意",
                  "基本居住地の決定",
                  "面会交流のルール（頻度・場所・連絡方法）",
                  "養育費の金額・支払い方法・振込口座",
                  "重要事項の決定ルール（転居・進学等）",
                  "緊急時の連絡ルールと対応方針",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-amber-800">
                    <span className="text-amber-400 mt-0.5">☐</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
            <p className="text-sm font-bold text-gray-700 mb-2">AIで親権計画書・面会カレンダー・養育費の目安を自動生成</p>
            <Link href="/tool" className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-black px-8 py-3 rounded-xl text-sm transition-colors">
              チェックリストの内容をAIで書類化する →
            </Link>
          </div>
        </div>
      </section>

      {/* 共同親権適用可能性5問診断 */}
      <section className="py-14 px-4 bg-blue-50 border-y border-blue-200">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-blue-300">🩺 5問診断</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">共同親権 適用可能性チェック</h2>
            <p className="text-sm text-gray-600">5つの質問に答えるだけで、あなたのケースに共同親権が適しているか即判定。結果をXでシェアできます。</p>
          </div>
          <DiagnosisWidget />
        </div>
      </section>

      {/* 費用シミュレーター */}
      <section className="py-14 px-4 bg-white border-b border-teal-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-teal-300">💴 費用シミュレーター</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">弁護士あり/なし 費用比較シミュレーター</h2>
            <p className="text-sm text-gray-600">ケースの複雑さを選ぶだけで弁護士費用の目安とAIサービスの差額を計算します</p>
          </div>
          <CostSimulator />
        </div>
      </section>

      {/* SEOテキスト: 共同親権制度の基礎知識 */}
      <section className="py-14 px-4 bg-gray-50 border-b border-gray-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">共同親権制度の基礎知識</h2>
          <div className="space-y-5 text-sm text-gray-700 leading-relaxed">
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900 text-base mb-2">共同親権とは？</h3>
              <p>2026年4月1日施行の改正民法により、離婚後も父母双方が親権を持つ「共同親権」が選択できるようになりました。これまでの日本の民法では、離婚後は父母のいずれか一方のみが親権を持つ「単独親権」しか認められていませんでしたが、法改正によって父母の合意または家庭裁判所の判断により共同親権が設定できるようになりました。</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900 text-base mb-2">共同親権と単独親権の違い</h3>
              <p>共同親権では、子どもの転居・進学・医療の同意など「重要事項」については父母双方の合意が原則必要になります。一方で、日常的な養育（食事・学校の送迎など）は基本居住地の親が単独で行えます。単独親権では、親権者が単独で重要事項を決定できます。</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900 text-base mb-2">2026年4月から何が変わった？</h3>
              <p>（1）新しい離婚では共同親権・単独親権のいずれかを協議で選択。（2）合意できない場合は家庭裁判所が決定。（3）養育費の未取り決め時に月2万円/子の「法定養育費」が自動発生。（4）養育費不払い時の差し押さえ手続きが簡易化。これらの変更が2026年4月1日から施行されています。</p>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">共同親権 よくある5つの誤解</h2>
            <div className="space-y-4">
              {[
                { misunderstanding: "誤解1: 共同親権になったら子どもが「2つの家」で同じ日数暮らす", truth: "基本居住地はいずれか一方の親の家に定めます。共同親権は「親権の共有」であり、必ずしも居住を半々にするものではありません。" },
                { misunderstanding: "誤解2: 相手が同意しなければ共同親権にならない", truth: "合意できない場合は家庭裁判所が子の利益を最優先に共同親権か単独親権かを決定します。相手の拒否だけで単独親権が確定するわけではありません。" },
                { misunderstanding: "誤解3: DV被害者でも必ず共同親権になる", truth: "DVや虐待が認定される場合、裁判所は単独親権を選択します。証拠を保全して弁護士・法テラスに相談することが重要です。" },
                { misunderstanding: "誤解4: 法定養育費2万円が相場", truth: "法定養育費は最低保証額です。裁判所の養育費算定表に基づく相場は子の年齢・人数・両親の収入によって異なり、多くの場合2万円を上回ります。" },
                { misunderstanding: "誤解5: AIで作成した書類に法的効力がある", truth: "AIが生成する書類は草案・参考情報です。法的効力を持たせるには弁護士確認・公正証書化が必要です。本サービスは弁護士相談前の「準備・整理」ツールです。" },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                  <p className="text-sm font-bold text-red-600 mb-1">❌ {item.misunderstanding}</p>
                  <p className="text-sm text-gray-600">✅ {item.truth}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link href="/tool" className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-black px-8 py-3 rounded-xl text-sm transition-colors">
              AIで親権計画書・養育費・面会スケジュールを無料作成 →
            </Link>
          </div>
        </div>
      </section>

      {/* 養育費かんたん計算機 */}
      <section className="py-14 px-4 bg-teal-50 border-y border-teal-200">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-teal-300">💰 養育費かんたん計算機</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">養育費の目安を30秒で計算</h2>
            <p className="text-sm text-gray-600">裁判所の算定表をもとにした参考値です（実際の金額は弁護士・調停で決定）</p>
          </div>
          <AlimonyCalculator />
        </div>
      </section>

      {/* 離婚後生活費シミュレーター */}
      <section className="py-14 px-4 bg-purple-50 border-y border-purple-200">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-purple-300">🏠 生活費シミュレーター</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">離婚後 ひとり親世帯の生活費シミュレーション</h2>
            <p className="text-sm text-gray-600">年収・家賃・養育費を入力して、離婚後の月間収支を試算できます</p>
          </div>
          <PostDivorceLivingSimulator />
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-purple-200 rounded-xl p-4">
              <h3 className="font-bold text-purple-800 text-sm mb-2">💡 ひとり親向け公的支援</h3>
              <ul className="space-y-1.5 text-xs text-gray-600">
                <li>• <strong>児童扶養手当</strong>: 子1人月最大4.4万円（所得制限あり）</li>
                <li>• <strong>就学援助</strong>: 学用品・給食費・修学旅行費などを補助</li>
                <li>• <strong>医療費助成</strong>: 自治体によって子どもの医療費が無料または低額</li>
                <li>• <strong>保育所優先入所</strong>: ひとり親世帯は保育所入所に加点あり</li>
              </ul>
            </div>
            <div className="bg-white border border-purple-200 rounded-xl p-4">
              <h3 className="font-bold text-purple-800 text-sm mb-2">📞 支援窓口</h3>
              <ul className="space-y-1.5 text-xs text-gray-600">
                <li>• <strong>母子家庭等就業・自立支援センター</strong>: 就労支援・資格取得補助</li>
                <li>• <strong>福祉事務所</strong>: 生活保護・各種手当の相談窓口</li>
                <li>• <strong>法テラス</strong>: 養育費増額調停の費用立替制度あり</li>
                <li>• <strong>ひとり親サポートセンター</strong>: 各自治体に設置</li>
              </ul>
            </div>
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

      {/* DV被害者向け緊急リソース */}
      <section className="py-12 px-4 bg-red-50 border-y border-red-200">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <div className="inline-block bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-red-300">🚨 DV・虐待被害者の方へ</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">DV・モラハラ被害者のための緊急相談窓口</h2>
            <p className="text-sm text-gray-600">共同親権制度ではDV・虐待が認定される場合、裁判所は単独親権と判断します。まず安全を確保してください。</p>
          </div>
          <div className="bg-red-800 text-white rounded-2xl p-5 mb-4">
            <p className="font-black text-base mb-2">⚠️ 今すぐ逃げる必要がある方</p>
            <p className="text-red-200 text-sm mb-3">暴力を受けている・受けるおそれがある場合、まず安全な場所へ移動してください。</p>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { name: "DV相談ナビ（#8008）", desc: "電話するだけで最寄りの相談機関につながる。24時間対応。", tel: "#8008" },
                { name: "警察（110番）", desc: "身の危険を感じたら迷わず警察へ。DV事案も対応可能。", tel: "110" },
              ].map((item) => (
                <div key={item.name} className="bg-red-900 rounded-xl p-3">
                  <p className="font-bold text-white text-sm mb-1">{item.name}</p>
                  <p className="text-red-200 text-xs mb-2">{item.desc}</p>
                  <a href={`tel:${item.tel}`} className="inline-block bg-red-500 hover:bg-red-400 text-white font-bold text-xs px-3 py-1.5 rounded-full">
                    今すぐ電話する
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                name: "配偶者暴力相談支援センター",
                desc: "DV被害者のための専門相談機関。避難場所の紹介・法的支援まで対応。",
                badge: "無料",
                href: "https://www.gender.go.jp/policy/no_violence/e-vaw/soudankikan/01.html",
                icon: "🏠",
              },
              {
                name: "よりそいホットライン",
                desc: "DV・性暴力・生活困窮など幅広い相談に24時間対応。",
                badge: "24時間",
                href: "https://www.since2011.net/yorisoi/",
                icon: "📞",
              },
              {
                name: "法テラス",
                desc: "収入が一定以下の方は弁護士費用を立替。DV事案にも対応。",
                badge: "費用支援あり",
                href: "https://www.houterasu.or.jp/",
                icon: "⚖️",
              },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl p-4 border border-red-200 hover:shadow-md hover:border-red-400 transition-all block"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-bold text-gray-900 text-sm">{item.name}</span>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 mb-2 inline-block">{item.badge}</span>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                <p className="text-xs text-red-600 mt-2 font-medium">詳しく見る →</p>
              </a>
            ))}
          </div>
          <div className="mt-4 bg-amber-50 border border-amber-300 rounded-xl p-4 text-sm">
            <p className="font-bold text-amber-800 mb-1">DV被害者と共同親権について</p>
            <p className="text-xs text-amber-700 leading-relaxed">
              2026年4月施行の改正民法では、DVや虐待が認定される場合、裁判所は単独親権と判断します。
              DV被害者の方は診断書・警察への届出・LINEの記録などの証拠を保全した上で、
              弁護士または法テラスにご相談ください。このAIサービスも安全確保を最優先にご利用ください。
            </p>
          </div>
        </div>
      </section>

      {/* SEOテキスト: 共同親権AIの使い方 */}
      <section className="py-14 px-4 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">共同親権サポートAIの効果的な使い方</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "📋", title: "弁護士相談前の整理ツールとして", desc: "弁護士に相談する前に親権計画書の草案をAIで作成しておくと、相談時間を効率化できます。弁護士費用は着手金30万円〜が相場。AI書類で準備してから相談すると費用を大幅に削減できます。" },
              { icon: "🤝", title: "元パートナーとの話し合いの材料に", desc: "「何を話し合うべきか分からない」という方が多い共同親権。AIが面会交流・養育費・重要事項のルールを具体的に提案するので、建設的な話し合いのたたき台として活用できます。" },
              { icon: "📅", title: "面会交流スケジュールの作成に", desc: "月次ルール・長期休暇・誕生日行事の取り決めをAIがカレンダー形式で自動生成。「月2回の第1・3土曜」などの具体的なスケジュールを自動作成します。" },
              { icon: "⚖️", title: "家庭裁判所への調停申立準備に", desc: "調停申立に必要な書類・費用（収入印紙1,200円〜）・準備事項をAIがリスト化。初めての調停でも何を準備すべきか分かります。" },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 bg-gray-50 border border-gray-200 rounded-2xl p-5">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/checklist" className="inline-flex items-center gap-2 text-teal-700 font-semibold text-sm hover:underline">
              📋 共同親権チェックリスト10項目を確認する →
            </Link>
          </div>
        </div>
      </section>

      {/* SEOテキスト: 2026年法改正の要点 */}
      <section className="py-12 px-4 bg-teal-50 border-b border-teal-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-2">2026年4月 共同親権制度の要点まとめ</h2>
          <p className="text-gray-500 text-sm mb-6">改正民法のポイントをわかりやすく整理しました</p>
          <div className="space-y-3">
            {[
              { badge: "新ルール", badgeColor: "bg-teal-600", title: "共同親権か単独親権かを選択できる", desc: "2026年4月1日以降の離婚では、父母の協議または家庭裁判所の決定によって「共同親権」または「単独親権」を選択できます。" },
              { badge: "注意点", badgeColor: "bg-blue-600", title: "日常的な養育は基本居住親が単独決定できる", desc: "食事・学校の出欠・日常の医療など通常の養育行為は基本居住親が単独で決定可能。転居・進学・宗教など「重要事項」のみ双方合意が必要です。" },
              { badge: "新設", badgeColor: "bg-green-600", title: "法定養育費 月2万円/子が自動発生", desc: "2026年4月以降に離婚する場合、合意未成立でも子1人につき月2万円の「法定養育費」が自動的に発生します。先取特権付きで差し押さえも可能に。" },
              { badge: "保護", badgeColor: "bg-red-600", title: "DV・虐待がある場合は単独親権", desc: "DV・虐待・高葛藤が認められる場合、家庭裁判所は単独親権の決定を行います。証拠の保全と専門機関への相談が重要です。" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-teal-100 p-4 flex gap-3 items-start">
                <span className={`text-xs font-black text-white px-2.5 py-1 rounded-full shrink-0 mt-0.5 ${item.badgeColor}`}>{item.badge}</span>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/guide" className="inline-flex items-center gap-2 text-teal-700 font-semibold text-sm hover:underline">
              📖 共同親権 法改正ガイドを詳しく読む →
            </Link>
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

      {/* シェアセクション */}
      <section className="py-10 px-6 max-w-3xl mx-auto text-center">
        <p className="text-sm font-bold text-gray-700 mb-4">同じ悩みを持つ方に教えてあげましょう</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent("共同親権制度（2026年4月施行）の親権計画書・養育費計算・面会カレンダーが弁護士費用の100分の1以下で作れるAIを見つけた！無料で試せる → https://kyodo-shinken-ai.vercel.app #共同親権 #離婚 #育児 #養育費")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            Xでシェアする
          </a>
          <a
            href={"https://line.me/R/msg/text/?" + encodeURIComponent("共同親権制度の書類をAIで無料作成できるサービスを見つけました。弁護士費用の100分の1以下で親権計画書・養育費計算・面会カレンダーが30秒で作れます → https://kyodo-shinken-ai.vercel.app")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
            </svg>
            LINEで友達に送る
          </a>
        </div>
      </section>

      <footer className="border-t py-6 text-center text-xs text-gray-400 space-x-4 pb-24 sm:pb-6">
        <Link href="/legal" className="hover:underline">特定商取引法に基づく表記</Link>
        <Link href="/privacy" className="hover:underline">プライバシーポリシー</Link>
      </footer>
    </main>
  );
}
