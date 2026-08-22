import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#12161c",
        color: "#f3f1eb",
        fontSize: 70,
        fontWeight: 700,
        letterSpacing: -6,
        border: "8px solid #91b8a3",
      }}
    >
      TG
    </div>,
    size,
  );
}
