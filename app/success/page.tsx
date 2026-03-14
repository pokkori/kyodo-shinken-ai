"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";

function Confetti() {
  const [particles, setParticles] = useState<{ id: number; left: number; delay: number; color: string; size: number }[]>([]);

  useEffect(() => {
    const colors = ["#34d399", "#10b981", "#6ee7b7", "#a7f3d0", "#fbbf24", "#f59e0b"];
    const ps = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 6 + Math.random() * 6,
    }));
    setParticles(ps);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti"
          style={{
            left: `${p.left}%`,
            top: -20,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti 3s ease-in forwards;
        }
      `}</style>
    </div>
  );
}

function SuccessContent() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showConfetti && <Confetti />}
      <div className="max-w-lg w-full mx-auto px-4">
        <div className="text-center mb-10">
          <div className="text-7xl mb-4">👨‍👩‍👧</div>
          <h1 className="text-3xl font-black mb-2">プレミアム登録完了！</h1>
          <p className="text-emerald-300">子どもとの時間を守る準備が整いました</p>
        </div>

        <div className="bg-emerald-900/40 border border-emerald-700 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-emerald-300 mb-3 text-sm">プレミアム特典</h2>
          <ul className="space-y-2 text-sm text-emerald-100">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              AI書類作成が無制限（面会交流計画書・養育費算定・合意書）
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              弁護士費用を節約できる書類ドラフト自動生成
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              共同親権に関するQ&A・法律解説（Premium限定）
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              生成書類のPDF保存・再利用
            </li>
          </ul>
        </div>

        <div className="space-y-4 mb-8">
          <h2 className="font-bold text-emerald-200 text-center text-sm">まずはこの3ステップ</h2>

          <Link href="/tool" className="flex items-center gap-4 bg-slate-800 border border-slate-700 rounded-xl p-4 hover:border-emerald-500 hover:shadow-md transition-all group">
            <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0 group-hover:bg-emerald-500">1</div>
            <div className="flex-1">
              <p className="font-bold text-white text-sm">書類の種類を選ぶ</p>
              <p className="text-xs text-emerald-300/60">面会交流・養育費・合意書など目的に合わせて</p>
            </div>
            <span className="text-slate-500 group-hover:text-emerald-400 transition-colors">→</span>
          </Link>

          <Link href="/tool" className="flex items-center gap-4 bg-slate-800 border border-slate-700 rounded-xl p-4 hover:border-emerald-500 hover:shadow-md transition-all group">
            <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0 group-hover:bg-emerald-500">2</div>
            <div className="flex-1">
              <p className="font-bold text-white text-sm">状況を入力してAIに生成させる</p>
              <p className="text-xs text-emerald-300/60">子どもの年齢・居住状況・希望する面会頻度など</p>
            </div>
            <span className="text-slate-500 group-hover:text-emerald-400 transition-colors">→</span>
          </Link>

          <Link href="/tool" className="flex items-center gap-4 bg-slate-800 border border-slate-700 rounded-xl p-4 hover:border-emerald-500 hover:shadow-md transition-all group">
            <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0 group-hover:bg-emerald-500">3</div>
            <div className="flex-1">
              <p className="font-bold text-white text-sm">ドラフトを保存・弁護士に相談</p>
              <p className="text-xs text-emerald-300/60">生成した書類を専門家と一緒に最終確認</p>
            </div>
            <span className="text-slate-500 group-hover:text-emerald-400 transition-colors">→</span>
          </Link>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400 mb-1">ご感想をお聞かせください（30秒）</p>
          <a href="mailto:support@pokkorilab.com?subject=共同親権サポートAI感想&body=サービス名：共同親権サポートAI%0A感想：" className="text-xs text-emerald-500 underline hover:text-emerald-700">感想を送る →</a>
        </div>
        <div className="text-center bg-slate-800 rounded-xl p-4 border border-slate-700 mt-4">
          <p className="text-xs text-emerald-300/60 mb-1">いつでもすぐアクセス</p>
          <p className="text-sm font-bold text-emerald-200">このサイトをブックマークしておきましょう</p>
        </div>
      </div>
    </>
  );
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center py-12 px-4">
      <Suspense fallback={<p className="text-emerald-400">読み込み中...</p>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
