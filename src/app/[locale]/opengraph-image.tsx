import { ImageResponse } from "next/og";
import messages from "../../../messages/pt-BR.json";

export const alt = messages.metadata.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#12161c",
        color: "#f3f1eb",
        padding: "64px 76px",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          color: "#c4a56a",
          fontSize: 30,
          fontWeight: 700,
        }}
      >
        <span style={{ borderTop: "4px solid #91b8a3", paddingTop: 8 }}>
          {messages.identity.wordmark}
        </span>
        <span
          style={{
            color: "#b8bec5",
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          {messages.hero.eyebrow}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 148,
            lineHeight: 0.82,
            fontWeight: 800,
            letterSpacing: -10,
            textTransform: "uppercase",
          }}
        >
          {messages.hero.firstName}
        </div>
        <div
          style={{
            display: "flex",
            color: "#b8bec5",
            fontSize: 148,
            lineHeight: 0.82,
            fontWeight: 800,
            letterSpacing: -10,
            textTransform: "uppercase",
          }}
        >
          {messages.hero.lastName}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: "1px solid #41464d",
          paddingTop: 24,
        }}
      >
        <span style={{ fontSize: 26 }}>{messages.hero.statement}</span>
        <span style={{ color: "#c4a56a", fontSize: 28, fontWeight: 700 }}>
          {messages.hero.narrative}
        </span>
      </div>
    </div>,
    size,
  );
}
