import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { cookies } from "next/headers";
import { rateLimit, getIP } from "@/lib/ratelimit";
import { isActiveSubscription } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// 現在は審査通過前のため無料で生成可（KOMOJU審査通過後に FREE_LIMIT = 0 に変更予定）
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

  // 無料利用カウント（divorce-agreement専用）
  let usedCount = 0;
  if (!isPremium) {
    usedCount = parseInt(cookieStore.get("divorce_draft_uses")?.value ?? "0", 10);
    if (usedCount >= FREE_LIMIT) {
      return NextResponse.json({ error: "無料回数を使い切りました" }, { status: 402 });
    }
  }

  const body = await req.json();
  const {
    husbandName,
    husbandBirthdate,
    wifeName,
    wifeBirthdate,
    children,
    custodyType,
    alimonyAmount,
    alimonyDay,
    visitationFrequency,
    visitationMethod,
    propertyDivision,
  } = body;

  if (!husbandName?.trim() || !wifeName?.trim()) {
    return NextResponse.json({ error: "夫・妻の氏名を入力してください" }, { status: 400 });
  }

  const childrenText = Array.isArray(children) && children.length > 0
    ? children.filter((c: { name: string; birthdate: string; relation: string }) => c.name?.trim()).map((c: { name: string; birthdate: string; relation: string }, i: number) =>
        `  第${i + 1}子: ${c.name}（${c.birthdate || "生年月日未記入"}・${c.relation || "子"}）`
      ).join("\n")
    : "  記載なし";

  const prompt = `あなたは離婚協議書の草案作成を専門とするAIアシスタントです。以下の情報をもとに、日本の法律（民法・家事事件手続法）に準拠した離婚協議書のドラフトを作成してください。

【当事者情報】
- 甲（夫）: ${husbandName}（${husbandBirthdate || "生年月日未記入"}）
- 乙（妻）: ${wifeName}（${wifeBirthdate || "生年月日未記入"}）

【子の情報】
${childrenText}

【親権の形態】: ${custodyType === "joint" ? "共同親権（2026年4月1日施行の改正民法に基づく）" : "単独親権"}

【養育費】
- 月額: ${alimonyAmount ? `¥${Number(alimonyAmount).toLocaleString()}` : "未記入（要記載）"}
- 支払日: 毎月${alimonyDay || "○○"}日

【面会交流】
- 頻度: ${visitationFrequency || "未記入（要記載）"}
- 方法: ${visitationMethod || "未記入（要記載）"}

【財産分与の概要】
${propertyDivision || "記載なし"}

以下の形式で離婚協議書草案を作成してください。法的用語を使用し、実務的な書式で記載してください：

---

# 離婚協議書

甲（以下「甲」という。）と乙（以下「乙」という。）は、以下のとおり離婚に関する協議が成立したので、本協議書を作成する。

## 第1条（離婚の合意）
甲乙は、協議離婚することに合意した。

## 第2条（親権）
（親権の形態・権利者を明記）

## 第3条（養育費）
（金額・支払方法・支払期間・増減変更条件・未払い時の対応を記載）

## 第4条（面会交流）
（頻度・方法・場所・連絡方法・変更手続きを具体的に記載）

## 第5条（財産分与）
（財産分与の内容を記載）

## 第6条（清算条項）
甲乙は、本協議書に定めるほか、相互に何ら財産上の請求をしないことを確認する。

## 第7条（公正証書化）
本協議書は、公正証書として作成することに合意する。

---

作成日: 　　年　　月　　日

甲（署名・押印）: _______________
住所: ___________________________

乙（署名・押印）: _______________
住所: ___________________________

---

※【作成上の注意事項】として、以下も必ず追加してください：
1. この草案の法的確認が必要な箇所
2. 公正証書化の手順と費用目安
3. 追加すべき条項の候補
4. 免責事項（本ドラフトはAIが生成した参考資料であり、法的効力を持ちません。弁護士または公証人に確認を受けることを強く推奨します）`;

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
      headers["Set-Cookie"] = `divorce_draft_uses=${newUsedCount}; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax; HttpOnly; Secure; Path=/`;
    }
    return new Response(readable, { headers });
  } catch {
    return NextResponse.json({ error: "AI生成中にエラーが発生しました" }, { status: 500 });
  }
}
