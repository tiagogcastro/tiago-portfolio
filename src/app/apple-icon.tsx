import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <svg width="180" height="180" viewBox="0 0 64 64">
      <rect
        x="1.5"
        y="1.5"
        width="61"
        height="61"
        rx="13"
        fill="#26372e"
        stroke="#789987"
        strokeWidth="2"
      />
      <path
        d="M8 18.5H38L38 25Q23 22 8 25ZM20.25 21.75H25.75V41L29.75 46H16.25L20.25 41Z"
        fill="#f2f0e8"
      />
      <path
        d="M57 23Q50 28 43 33M43 33Q50 38 57 43"
        fill="none"
        stroke="#c9aa70"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>,
    size,
  );
}
