import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "共同親権サポートAI | 法的情報・養育費・面会交流をAIがサポート";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 16 }}>👨‍👧‍👦</div>
        <div style={{ fontSize: 52, fontWeight: 700, color: "#93c5fd", marginBottom: 16, textAlign: "center" }}>
          共同親権サポートAI
        </div>
        <div style={{ fontSize: 28, color: "#bfdbfe", textAlign: "center", maxWidth: 900 }}>
          法的情報・養育費・面会交流をAIがわかりやすく解説
        </div>
        <div style={{ fontSize: 24, color: "#60a5fa", marginTop: 12, textAlign: "center" }}>
          共同親権の疑問に24時間対応 📋
        </div>
        <div
          style={{
            marginTop: 40,
            padding: "12px 32px",
            background: "#3b82f6",
            borderRadius: 40,
            fontSize: 22,
            color: "#fff",
            fontWeight: 600,
          }}
        >
          無料で相談する
        </div>
      </div>
    ),
    { ...size }
  );
}
