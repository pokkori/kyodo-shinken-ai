import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { cookies } from "next/headers";
import { rateLimit, getIP } from "@/lib/ratelimit";
import { isActiveSubscription } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const FREE_LIMIT = 3;
const APP_ID = "kyodo-shinken";

function getAnthropic() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
}

export async function POST(req: NextRequest) {
  const { ok } = rateLimit(getIP(req));
  if (!ok) {
    return NextResponse.json({ error: "リクエストが多すぎます。しばらく待ってから再試行してください。" }, { status: 429 });
  }

  const cookieStore = await cookies();
  const email = cookieStore.get("user_email")?.value;

  let isPremium = false;
  if (email) {
    isPremium = await isActiveSubscription(email, APP_ID);
  } else {
    const pv = cookieStore.get("premium")?.value;
    isPremium = pv === "1" || pv === "biz";
  }

  let usedCount = 0;
  if (!isPremium) {
    usedCount = parseInt(cookieStore.get("free_uses")?.value ?? "0", 10);
    if (usedCount >= FREE_LIMIT) {
      return NextResponse.json({ error: "無料回数を使い切りました" }, { status: 402 });
    }
  }

  const { childrenInfo, parentInfo, situationInfo } = await req.json();
  if (!childrenInfo?.trim()) {
    return NextResponse.json({ error: "お子さんの情報を入力してください" }, { status: 400 });
  }

  const prompt = `あなたは共同親権・離婚調停の準備支援AIアシスタントです。以下の情報をもとに、2026年4月1日施行の改正民法（共同親権制度）に完全対応した親権サポートドキュメントを作成してください。

【重要】2026年4月1日より共同親権制度が施行されました。離婚後も父母双方が親権を持てる「共同親権」が選択可能になっています。この制度に基づいて、具体的かつ実践的なアドバイスを提供してください。

【お子さんの情報】
${childrenInfo}

【両親の状況】
${parentInfo || "記載なし"}

【現在の状況・紛争レベル】
${situationInfo || "記載なし"}

以下の形式で必ず回答してください（各セクションは===タグで区切ること）：

===PLAN===
【親権計画書草案】

■ 基本居住設定
（主たる居住地・相手方との交流頻度の基本方針を記載）

■ 日常的な養育の分担
（学校・習い事・通院など日常的な決定は誰が行うか）

■ 重要事項の決定方法
（進学先・手術・海外渡航など重要事項の共同決定ルール）

■ 緊急時の対応
（緊急入院・事故発生時の連絡・決定手順）

===CALENDAR===
【面会交流カレンダー（月次ルール）】

■ 通常の面会ルール
（月○回、週末/平日の基本パターン）

■ 長期休暇の取り決め
（夏休み・冬休み・春休みの分担案）

■ 誕生日・行事の扱い
（子どもの誕生日・学校行事・クリスマス等の取り決め）

■ 連絡ルール
（日常の連絡頻度・手段・禁止事項）

===MONEY===
【養育費の目安】

（以下の内容を記載してください）
・養育費算定表に基づく概算の月額範囲（収入情報がない場合は相場感を記載）
・支払い方法・口座振込のタイミング
・増減が必要になるケース（進学・病気等）
・未払い時の対応方針

※ 正確な金額は家庭裁判所の算定表または弁護士にご確認ください

===MEDIATION===
【調停準備メモ】

■ 家庭裁判所へ申立る前に準備すべきこと
（必要書類・費用・期間の目安）

■ 調停での主張ポイント
（子どもの利益を中心とした主張の組み立て方）

■ 提出できる証拠・資料
（LINE履歴・日記・写真・学校連絡帳など）

■ 弁護士を依頼すべきケース
（DV・虐待・高葛藤事案の場合の注意点）

===CAUTION===
【注意事項・よくあるトラブル（プレミアム）】

■ 共同親権でよく起きるトラブルTOP5
（面会拒否・教育方針の対立・引越し問題・再婚・養育費不払い）

■ 法律上の落とし穴
（共同親権でも単独で決めていい事項 vs 共同決定必須の事項）

■ 調停が長引くケースのパターン
（早期解決のための戦略）

===NEXT_ACTIONS===
【今すぐできる次のアクション（優先順）】

■ 今週中にやること（優先度：高）
1. ○○（具体的な行動・連絡先・費用の目安）
2. ○○
3. ○○

■ 1ヶ月以内にやること（優先度：中）
1. ○○（具体的な手順・準備物）
2. ○○

■ 相手方への第一声（提案文）
以下のような文章で話し合いを始めることをAIが提案します：
「○○（具体的な提案文・140字以内・丁寧かつ建設的なトーン）」

■ 専門家への相談が特に必要なケース
（現在の状況に基づいて、弁護士・調停・法テラスどれが最優先か判断）

===DISCLAIMER===
⚠️ 本ドキュメントはAIが生成した参考情報であり、法的効力を持つものではありません。実際の手続きは弁護士・家庭裁判所にご相談ください。個別の事情によって最適な対応は異なります。DV・虐待が絡む場合は必ず専門家に相談してください。`;

  try {
    const anthropic = getAnthropic();
    const newUsedCount = usedCount + 1;
    const remaining = isPremium ? null : FREE_LIMIT - newUsedCount;

    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: 4000,
      messages: [{ role: "user", content: prompt }],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
              controller.enqueue(encoder.encode(chunk.delta.text));
            }
          }
          controller.enqueue(encoder.encode(`\nDONE:${JSON.stringify({ remaining })}`));
          controller.close();
        } catch (err) {
          console.error(err);
          controller.error(err);
        }
      },
    });

    const headers: Record<string, string> = {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache",
    };
    if (!isPremium) {
      headers["Set-Cookie"] = `free_uses=${newUsedCount}; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax; HttpOnly; Secure; Path=/`;
    }
    return new Response(readable, { headers });
  } catch {
    return NextResponse.json({ error: "AI生成中にエラーが発生しました" }, { status: 500 });
  }
}
