import type { Metadata } from "next";
import Link from "next/link";

interface KeywordData {
  title: string;
  h1: string;
  description: string;
  features: { icon: string; title: string; text: string }[];
  faqs: { q: string; a: string }[];
  lastUpdated: string;
}

export const KEYWORDS: Record<string, KeywordData> = {
  "kyodo-shinken-seido-kaisetsu": {
    title: "共同親権 制度 解説 2024年 | 共同親権サポートAI",
    h1: "共同親権 制度 解説 2024年",
    description: "2024年改正の共同親権制度をわかりやすく解説。AIが共同親権の手続き・メリット・デメリットをサポートします。",
    features: [
      { icon: "⚖️", title: "制度解説AI", text: "2024年民法改正で導入された共同親権制度の内容をAIが分かりやすく解説" },
      { icon: "📋", title: "手続きサポート", text: "共同親権に関する各種手続きの流れと必要書類をAIが案内" },
      { icon: "🤝", title: "個別相談対応", text: "具体的な状況を入力するとAIが状況に合ったアドバイスを提供" },
    ],
    faqs: [
      { q: "共同親権とは何ですか？", a: "2024年の民法改正により導入された制度で、離婚後も父母双方が子どもの親権を持つことができます。従来の単独親権に加えて選択できるようになりました。" },
      { q: "共同親権と単独親権どちらを選ぶべき？", a: "子どもの最善の利益を最優先に考える必要があります。AIが状況別のメリット・デメリットを整理して判断をサポートします。" },
      { q: "共同親権の場合、日常の決定はどうなる？", a: "日常的なことは各親が単独で決定できますが、重要事項（引越し・進路変更など）は双方の合意が必要です。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "rikon-shinken-kettei-houhou": {
    title: "離婚 親権 決め方 手続き | 共同親権サポートAI",
    h1: "離婚 親権 決め方 手続き",
    description: "離婚時の親権の決め方と手続きをAIが解説。協議・調停・裁判の各手続きと親権決定の基準をサポートします。",
    features: [
      { icon: "📝", title: "親権決定フロー解説", text: "協議離婚→調停→裁判の各段階での親権決定プロセスをAIが解説" },
      { icon: "⚖️", title: "判断基準の説明", text: "裁判所が親権を判断する基準（継続性・主たる監護者など）をAIが解説" },
      { icon: "📋", title: "必要書類の案内", text: "親権手続きに必要な書類と作成方法をAIがサポート" },
    ],
    faqs: [
      { q: "親権はどうやって決まる？", a: "まず当事者間の協議、合意できない場合は家庭裁判所の調停・審判で決定します。子どもの年齢・生活環境・監護状況などが判断基準になります。" },
      { q: "親権と監護権の違いは？", a: "親権は法的な代理権を含む広い権利、監護権は実際に子どもを養育する権利です。分離して決める場合もあります。" },
      { q: "父親が親権を取れる可能性は？", a: "主たる監護者・経済力・環境などが総合的に評価されます。AIが個別の状況を分析してアドバイスします。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "mensetsuko-menkaikou-schedule": {
    title: "面会交流 取り決め スケジュール | 共同親権サポートAI",
    h1: "面会交流 取り決め スケジュール",
    description: "面会交流の取り決めとスケジュール作成をAIがサポート。子どもの利益を最優先にした面会計画をAIが提案します。",
    features: [
      { icon: "📅", title: "面会スケジュール作成", text: "子どもの年齢・生活リズム・両親の状況に合わせた面会スケジュールをAIが提案" },
      { icon: "📝", title: "面会合意書作成", text: "面会交流の合意内容を法的に有効な形で文書化するサポートをAIが提供" },
      { icon: "🔄", title: "スケジュール変更対応", text: "急な予定変更・祝日対応・長期休暇中の面会計画をAIが調整" },
    ],
    faqs: [
      { q: "面会交流の頻度はどれくらいが標準？", a: "月1〜2回が一般的ですが、子どもの年齢・両親の状況によって異なります。AIが状況に合ったスケジュールを提案します。" },
      { q: "面会交流の取り決めは変更できる？", a: "双方合意があれば変更可能です。大幅な変更は家庭裁判所への申し立てが必要な場合もあります。" },
      { q: "子どもが面会を嫌がる場合は？", a: "子どもの意思も重要な要素です。AIが年齢に応じた対応方法と専門家への相談タイミングを提案します。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "kyodo-shinken-merit-demerit": {
    title: "共同親権 メリット デメリット | 共同親権サポートAI",
    h1: "共同親権 メリット デメリット",
    description: "共同親権のメリットとデメリットをAIが解説。子どもへの影響・両親の負担・実務上の課題を整理してサポートします。",
    features: [
      { icon: "✅", title: "メリット解説", text: "子どもにとっての両親との関係継続・養育費確保などのメリットをAIが解説" },
      { icon: "⚠️", title: "デメリット・リスク解説", text: "意見対立・手続き負担・DV被害者への配慮など注意点をAIが解説" },
      { icon: "🎯", title: "状況別判断サポート", text: "個別の家族状況に応じた共同/単独親権の選択をAIが総合的にサポート" },
    ],
    faqs: [
      { q: "共同親権を選ぶべき状況は？", a: "両親の関係が比較的良好で、子どもとの関係も継続できる状況が適しています。AIが具体的な条件を整理します。" },
      { q: "共同親権でトラブルになりやすい場面は？", a: "進路・医療・引越しなど重要な決定で意見が割れた場合です。AIが事前の合意形成方法を提案します。" },
      { q: "DVがある場合は共同親権を避けるべき？", a: "DV・虐待がある場合は単独親権が原則です。AIが安全確保のための対応方法を案内します。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "child-support-keisan": {
    title: "養育費 計算 相場 支払い方法 | 共同親権サポートAI",
    h1: "養育費 計算 相場 支払い方法",
    description: "養育費の計算方法と相場をAIが解説。収入・子どもの年齢に基づいた養育費の目安と支払い方法をサポートします。",
    features: [
      { icon: "💰", title: "養育費計算AI", text: "両親の年収・子どもの年齢・人数を入力するとAIが養育費の目安を計算" },
      { icon: "📊", title: "算定表解説", text: "裁判所の養育費算定表の見方と適用方法をAIが分かりやすく解説" },
      { icon: "📋", title: "公正証書作成サポート", text: "養育費の取り決めを公正証書にする手順と文書作成をAIがサポート" },
    ],
    faqs: [
      { q: "養育費の相場は？", a: "裁判所の算定表に基づいて計算されます。年収・子の年齢によって異なりますが、月2〜10万円程度が多いです。AIが具体的な目安を計算します。" },
      { q: "養育費を払わない場合はどうなる？", a: "公正証書・調停調書があれば強制執行が可能です。AIが未払い対応の方法を案内します。" },
      { q: "養育費はいつまで支払う？", a: "原則として子どもが20歳（成人）になるまでですが、大学進学中は22歳まで延長することも可能です。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "rikon-kodomo-mental-care": {
    title: "離婚 子供 メンタル ケア 方法 | 共同親権サポートAI",
    h1: "離婚 子供 メンタル ケア 方法",
    description: "離婚が子どものメンタルに与える影響とケア方法をAIが解説。年齢別の対応と専門家への相談タイミングをサポートします。",
    features: [
      { icon: "💚", title: "年齢別ケア方法", text: "幼児・小学生・中高生の年齢別に離婚の伝え方とメンタルケアをAIが提案" },
      { icon: "🔍", title: "サイン早期発見", text: "子どもが悩んでいるサインをAIが解説。早期対応で問題を最小化" },
      { icon: "🏥", title: "専門家連携サポート", text: "スクールカウンセラー・児童精神科への相談タイミングをAIが案内" },
    ],
    faqs: [
      { q: "離婚を子どもに伝えるタイミングは？", a: "決定したら早めに、子どもが理解できる言葉で伝えることが重要です。AIが年齢に合った伝え方を提案します。" },
      { q: "離婚後に子どもの様子がおかしい場合は？", a: "食欲不振・登校拒否・夜泣きなどのサインは注意が必要です。AIが対応方法と専門家相談の判断基準を提示します。" },
      { q: "片方の親の悪口を言ってはいけない理由は？", a: "子どものアイデンティティと心理的安定に影響します。AIが子どものために望ましいコミュニケーション方法を提案します。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "single-parent-rikon-support": {
    title: "ひとり親 離婚後 サポート 支援 | 共同親権サポートAI",
    h1: "ひとり親 離婚後 サポート 支援",
    description: "ひとり親家庭への離婚後サポートと支援制度をAIが解説。公的支援・経済的支援・生活支援をAIが総合的に案内します。",
    features: [
      { icon: "🏛️", title: "公的支援制度案内", text: "児童扶養手当・ひとり親控除・住宅支援など利用できる公的サービスをAIが案内" },
      { icon: "💰", title: "経済的サポート", text: "養育費確保・就労支援・各種給付金の活用方法をAIが具体的に提案" },
      { icon: "🤝", title: "地域サポート連携", text: "NPO・民間支援団体・行政窓口への連絡方法をAIが案内" },
    ],
    faqs: [
      { q: "離婚後に使える公的支援は？", a: "児童扶養手当・医療費助成・住宅支援・就業訓練など多数あります。AIが状況に応じて利用可能な支援をリストアップします。" },
      { q: "養育費を確実に受け取るには？", a: "公正証書の作成・強制執行の手続きが重要です。AIが確実な養育費確保の方法を案内します。" },
      { q: "ひとり親で仕事と育児を両立するには？", a: "保育所・学童・ファミリーサポートなどのサービス活用と職場への相談方法をAIが提案します。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "kyodo-shinken-DV-case": {
    title: "共同親権 DV 例外 対応 方法 | 共同親権サポートAI",
    h1: "共同親権 DV 例外 対応 方法",
    description: "DV・虐待がある場合の共同親権の例外規定と対応方法をAIが解説。安全確保を最優先にした法的対応をサポートします。",
    features: [
      { icon: "🚨", title: "緊急対応案内", text: "DV被害に遭っている場合の緊急相談窓口と避難方法をAIが即時案内" },
      { icon: "⚖️", title: "法的保護手続き", text: "保護命令・接近禁止命令の申請方法とDVを理由とした単独親権取得をAIが支援" },
      { icon: "🔒", title: "証拠収集サポート", text: "DV被害の証拠収集方法と安全な保管方法をAIが案内" },
    ],
    faqs: [
      { q: "DVがある場合でも共同親権になる？", a: "DV・虐待がある場合は単独親権が認められます。AIが証拠収集と法的手続きをサポートします。" },
      { q: "DVを相手に知られずに逃げるには？", a: "配偶者暴力相談支援センター・シェルター・DV支援団体への相談を推奨します。AIが緊急連絡先を案内します。" },
      { q: "子どもへの虐待が疑われる場合は？", a: "児童相談所・警察への通報が最優先です。AIが通報の手順と親権の緊急保全手続きを案内します。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "mensetsuko-拒否-taio": {
    title: "面会交流 拒否 対応 方法 | 共同親権サポートAI",
    h1: "面会交流 拒否 対応 方法",
    description: "面会交流を拒否された場合の対応方法をAIが解説。法的手続きと子どもの利益を守るためのアプローチをサポートします。",
    features: [
      { icon: "📋", title: "面会強制手続き", text: "面会交流審判・強制執行の手続き方法をAIが分かりやすく解説" },
      { icon: "🤝", title: "交渉・調停サポート", text: "面会再開に向けた交渉アプローチと家庭裁判所調停の活用をAIが支援" },
      { icon: "💡", title: "柔軟な面会方法提案", text: "直接面会が困難な場合のビデオ通話・手紙などの代替面会方法をAIが提案" },
    ],
    faqs: [
      { q: "面会交流を拒否されたらどうする？", a: "まず話し合い、解決しなければ家庭裁判所の調停・審判を申し立てることができます。AIが手続きを案内します。" },
      { q: "面会交流の強制執行はできる？", a: "調停・審判で面会が決まっている場合は間接強制（制裁金）が可能です。AIが強制執行の手続きを説明します。" },
      { q: "子どもが会いたくないと言っている場合は？", a: "子どもの意思も重要ですが、片親による影響の可能性もあります。AIが年齢・状況に応じた対応を提案します。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "kyodo-shinken-2026": {
    title: "共同親権 2026年4月施行 何が変わった？完全ガイド | 共同親権サポートAI",
    h1: "共同親権 2026年4月施行 — 何が変わった？完全ガイド",
    description: "2026年4月1日に施行された共同親権制度の全変更点を解説。法定養育費2万円・養育計画書・面会交流ルールの最新情報と、AIでの書類作成方法をご案内します。",
    features: [
      { icon: "⚡", title: "2026年4月施行の変更点", text: "共同親権の選択制・法定養育費2万円の自動発生・養育費差し押さえ簡易化など4つの大改正をAIが解説" },
      { icon: "📋", title: "養育計画書・養育費合意書テンプレート", text: "法定養育費（月8万円基準）に準拠した養育計画書の雛形をAIが30秒で生成。弁護士への持参資料として活用可能" },
      { icon: "⚖️", title: "共同親権・単独親権の選択サポート", text: "2026年4月施行の改正民法に基づき、あなたの状況に最適な親権形態をAIが判断サポート" },
    ],
    faqs: [
      { q: "2026年4月に共同親権制度で何が変わりましたか？", a: "（1）離婚後に共同親権か単独親権かを選択できるようになりました。（2）合意できない場合は家庭裁判所が判断します。（3）養育費の取り決めがなくても子ども1人あたり月2万円の「法定養育費」が自動発生します。（4）養育費不払い時の差し押さえ手続きが大幅に簡易化されました。" },
      { q: "2026年4月以前に離婚した場合も共同親権になれますか？", a: "なれます。2026年4月1日施行前に単独親権で離婚した方も、家庭裁判所に「親権者変更調停」を申し立てることで共同親権に変更できます。申立費用は収入印紙1,200円＋郵便切手代です。" },
      { q: "法定養育費の月2万円は少なすぎませんか？", a: "法定養育費は最低保証額（下限）です。実際の養育費は裁判所の算定表に基づき、両親の年収・子の年齢・人数によって決まります。一般的に子ども1人で月4〜8万円が相場です。AIで養育計画書に適切な金額を盛り込むことをお勧めします。" },
      { q: "養育計画書とは何ですか？", a: "共同親権の取り決め事項（基本居住・面会交流・養育費・重要事項の決定ルール）をまとめた合意文書です。2026年4月施行の改正民法では養育計画書を作成しておくことで、後のトラブルを大幅に減らせます。本AIが30秒で雛形を生成します。" },
    ],
    lastUpdated: "2026-04-02",
  },
  "youiku-keikakusho-template": {
    title: "養育計画書 テンプレート 書き方 2026年 | 共同親権サポートAI",
    h1: "養育計画書 テンプレート・書き方 2026年4月施行版",
    description: "2026年4月施行の共同親権制度に対応した養育計画書のテンプレートと書き方をAIが解説。法定養育費（月8万円基準）・面会交流・重要事項の決定ルールを含む雛形をAIが自動生成します。",
    features: [
      { icon: "📝", title: "養育計画書テンプレートAI生成", text: "子どもの情報を入力するだけで、2026年4月施行の改正民法に準拠した養育計画書の雛形をAIが30秒で作成" },
      { icon: "💰", title: "養育費合意書（法定養育費基準）", text: "法定養育費（月2万円）を踏まえた上で、裁判所算定表に基づく適切な養育費合意書の草案を生成" },
      { icon: "⚖️", title: "弁護士相談前の準備に", text: "弁護士費用を節約しながら、法的確認の前段階としてAIで養育計画書を整理" },
    ],
    faqs: [
      { q: "養育計画書に何を書けばいいですか？", a: "基本居住地・面会交流のルール（頻度・場所・連絡方法）・養育費（金額・支払い方法）・重要事項の決定ルール（転居・進学・医療の同意）・緊急時の対応手順を記載します。AIが入力情報をもとに雛形を自動生成します。" },
      { q: "養育計画書を弁護士なしで作れますか？", a: "AIで草案を作成することは可能です。ただし、法的効力を持たせるには弁護士の確認と公正証書化（費用5〜10万円）が推奨されます。本AIは弁護士相談前の準備ツールとしてお使いください。" },
      { q: "養育計画書と離婚協議書の違いは？", a: "養育計画書は子どもの養育に特化した書類（親権・面会・養育費など）です。離婚協議書は財産分与・慰謝料を含む離婚全般の取り決め書類です。本AIは両方の草案を作成できます。" },
    ],
    lastUpdated: "2026-04-02",
  },
  "rikon-kodomo-gakko-transfer": {
    title: "離婚 子供 学校 転校 手続き | 共同親権サポートAI",
    h1: "離婚 子供 学校 転校 手続き",
    description: "離婚に伴う子どもの学校・転校手続きをAIが解説。転校の影響を最小化する方法と手続きの流れをサポートします。",
    features: [
      { icon: "🏫", title: "転校手続き案内", text: "転校に必要な書類・手続きの流れをAIが段階的に案内" },
      { icon: "💚", title: "子どもの心理的ケア", text: "転校による友達・環境変化のストレスを最小化するケア方法をAIが提案" },
      { icon: "🔄", title: "転校不要の選択肢", text: "住所変更があっても転校を避けられる場合の条件と手続きをAIが説明" },
    ],
    faqs: [
      { q: "離婚で引越す場合、子どもは転校しないといけない？", a: "通学区域が変わる場合は原則転校が必要ですが、就学特例で現在の学校に通い続けられる場合もあります。AIが詳細を説明します。" },
      { q: "転校のベストなタイミングは？", a: "学年末・長期休暇後が子どもへの影響が最小です。緊急の場合でも子どもの心理的準備のサポートをAIが提案します。" },
      { q: "転校先の学校への説明はどうすれば？", a: "家庭事情を伝えるかどうかは慎重に判断する必要があります。AIが学校との適切なコミュニケーション方法を提案します。" },
    ],
    lastUpdated: "2026-03-31",
  },
};

const ALL_SLUGS = Object.keys(KEYWORDS);
export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = KEYWORDS[slug];
  if (!data) return { title: "Not Found" };
  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      type: "article",
      modifiedTime: data.lastUpdated,
      url: `https://kyodo-shinken-ai.vercel.app/keywords/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
    },
    alternates: {
      canonical: `https://kyodo-shinken-ai.vercel.app/keywords/${slug}`,
    },
    other: { "article:modified_time": data.lastUpdated },
  };
}

export default async function KeywordPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = KEYWORDS[slug];
  if (!data)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0f172a",
          color: "#e2e8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1>ページが見つかりません</h1>
          <Link href="/" style={{ color: "#7c3aed" }}>
            トップへ戻る
          </Link>
        </div>
      </div>
    );
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    dateModified: data.lastUpdated,
    mainEntity: data.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #0f172a 0%, #2e1065 50%, #0f172a 100%)",
          color: "#e2e8f0",
          padding: "2rem 1rem",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚖️</div>
            <h1
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                fontWeight: "bold",
                marginBottom: "1rem",
                background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {data.h1}
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#94a3b8",
                marginBottom: "2rem",
              }}
            >
              {data.description}
            </p>
            <Link
              href="/"
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                color: "#fff",
                padding: "1rem 2.5rem",
                borderRadius: "50px",
                fontWeight: "bold",
                fontSize: "1.1rem",
                textDecoration: "none",
              }}
            >
              今すぐ無料で相談する →
            </Link>
          </div>
          <div style={{ marginBottom: "3rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "1.5rem",
                textAlign: "center",
                color: "#a78bfa",
              }}
            >
              AIがサポートする3つのポイント
            </h2>
            <div style={{ display: "grid", gap: "1rem" }}>
              {data.features.map((f, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(124,58,237,0.2)",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ fontSize: "2rem" }}>{f.icon}</span>
                  <div>
                    <h3
                      style={{
                        fontWeight: "bold",
                        marginBottom: "0.5rem",
                        color: "#a78bfa",
                      }}
                    >
                      {f.title}
                    </h3>
                    <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
                      {f.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: "3rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "1.5rem",
                textAlign: "center",
                color: "#a78bfa",
              }}
            >
              よくある質問
            </h2>
            <div style={{ display: "grid", gap: "1rem" }}>
              {data.faqs.map((faq, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(124,58,237,0.2)",
                    borderRadius: "12px",
                    padding: "1.5rem",
                  }}
                >
                  <h3
                    style={{
                      fontWeight: "bold",
                      marginBottom: "0.75rem",
                      color: "#a78bfa",
                      fontSize: "1rem",
                    }}
                  >
                    Q: {faq.q}
                  </h3>
                  <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
                    A: {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              marginBottom: "3rem",
              padding: "2rem",
              background: "rgba(124,58,237,0.1)",
              border: "1px solid rgba(124,58,237,0.3)",
              borderRadius: "16px",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                color: "#a78bfa",
              }}
            >
              共同親権・離婚サポートをAIが提供
            </h2>
            <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
              状況を入力するだけでAIが手続きと対応方法をガイド
            </p>
            <Link
              href="/"
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                color: "#fff",
                padding: "1rem 2.5rem",
                borderRadius: "50px",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              無料でサポートを受ける →
            </Link>
          </div>
          <p
            style={{
              textAlign: "center",
              color: "#475569",
              fontSize: "0.8rem",
              marginBottom: "2rem",
            }}
          >
            最終更新: {data.lastUpdated}
          </p>
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.1)",
              paddingTop: "2rem",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                color: "#94a3b8",
                marginBottom: "1rem",
              }}
            >
              他のAIツールも試してみる
            </h3>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="https://souzoku-ai.vercel.app"
                style={{ color: "#a78bfa", textDecoration: "none", fontSize: "0.9rem" }}
              >
                相続AI
              </Link>
              <Link
                href="https://keiyakusho-review-ai.vercel.app"
                style={{ color: "#a78bfa", textDecoration: "none", fontSize: "0.9rem" }}
              >
                契約書AIレビュー
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
