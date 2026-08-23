import { ImageResponse } from "next/og";
import messages from "../../../messages/pt-BR.json";

const size = { width: 1200, height: 630 };

export const dynamic = "force-static";

const fontSources = [
  {
    name: "Newsreader",
    weight: 600 as const,
    url: "https://fonts.gstatic.com/s/newsreader/v26/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438wpojADw.woff",
  },
  {
    name: "Plex Sans",
    weight: 400 as const,
    url: "https://fonts.gstatic.com/s/ibmplexsans/v23/zYXGKVElMYYaJe8bpLHnCwDKr932-G7dytD-Dmu1swZSAXcomDVmadSD6llzAw.woff",
  },
  {
    name: "Plex Sans",
    weight: 600 as const,
    url: "https://fonts.gstatic.com/s/ibmplexsans/v23/zYXGKVElMYYaJe8bpLHnCwDKr932-G7dytD-Dmu1swZSAXcomDVmadSDNF5zAw.woff",
  },
  {
    name: "Plex Mono",
    weight: 500 as const,
    url: "https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3twJ8lQ.woff",
  },
];

const fonts = Promise.all(
  fontSources.map(async ({ name, weight, url }) => ({
    name,
    weight,
    data: await fetch(url).then((res) => res.arrayBuffer()),
  })),
);

export async function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#141815",
        color: "#f2f0e8",
        padding: "64px 76px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: "-180px",
          bottom: "-260px",
          width: 560,
          height: 560,
          borderRadius: "50%",
          border: "1px solid rgba(120, 153, 135, 0.25)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "-60px",
          bottom: "-140px",
          width: 340,
          height: 340,
          borderRadius: "50%",
          border: "1px solid rgba(120, 153, 135, 0.2)",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "#26372e",
              border: "2px solid #789987",
              color: "#f2f0e8",
              fontSize: 40,
              fontWeight: 600,
              fontFamily: "Newsreader",
              lineHeight: 1,
            }}
          >
            T
          </div>
          <span
            style={{
              fontFamily: "Plex Mono",
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: 6,
              color: "#f2f0e8",
            }}
          >
            TIAGO G CASTRO
          </span>
        </div>
        <span
          style={{
            fontFamily: "Plex Mono",
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: 3,
            color: "#789987",
          }}
        >
          TIAGOGCASTRO.COM.BR
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
        <div
          style={{
            display: "flex",
            fontFamily: "Newsreader",
            fontSize: 148,
            lineHeight: 0.92,
            fontWeight: 600,
            letterSpacing: -4,
          }}
        >
          {messages.hero.firstName}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Newsreader",
            fontSize: 148,
            lineHeight: 0.92,
            fontWeight: 600,
            letterSpacing: -4,
            color: "#c9aa70",
          }}
        >
          {messages.hero.lastName}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 34,
            fontFamily: "Plex Sans",
            fontSize: 30,
            lineHeight: 1.4,
            fontWeight: 400,
            color: "#c5c5ba",
          }}
        >
          {messages.hero.positioning}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #26372e",
          paddingTop: 26,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: "Plex Sans",
            fontSize: 26,
            fontWeight: 600,
            color: "#f2f0e8",
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#c9aa70",
            }}
          />
          {messages.hero.eyebrow}
        </div>
        <span
          style={{
            fontFamily: "Plex Mono",
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: 2,
            color: "#789987",
          }}
        >
          FULL STACK · CLOUD · AWS
        </span>
      </div>
    </div>,
    { ...size, fonts: await fonts },
  );
}
