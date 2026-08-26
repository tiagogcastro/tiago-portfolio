import { brandLockup } from "@/lib/og";

type SiteOgImageProps = {
  label?: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
};

export function SiteOgImage({
  label,
  title,
  titleHighlight,
  subtitle,
}: SiteOgImageProps) {
  return (
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
          {/* ImageResponse requires a regular img element. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={brandLockup}
            alt="Tiago G Castro"
            width={350}
            height={56}
            style={{ objectFit: "contain", objectPosition: "left center" }}
          />
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {label ? (
          <span
            style={{
              display: "flex",
              marginBottom: 26,
              fontFamily: "Plex Mono",
              fontSize: 24,
              fontWeight: 500,
              letterSpacing: 6,
              color: "#789987",
            }}
          >
            {label}
          </span>
        ) : null}
        <div
          style={{
            display: "flex",
            fontFamily: "Newsreader",
            fontSize: label ? 96 : 148,
            lineHeight: 0.95,
            fontWeight: 600,
            letterSpacing: -3,
            maxWidth: 900,
          }}
        >
          {title}
          {titleHighlight ? (
            <span style={{ color: "#c9aa70" }}>{` ${titleHighlight}`}</span>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontFamily: "Plex Sans",
            fontSize: 28,
            lineHeight: 1.4,
            fontWeight: 400,
            color: "#c5c5ba",
            maxWidth: 820,
          }}
        >
          {subtitle}
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
          {label ? "Tiago Castro" : "Desenvolvedor Full Stack"}
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
    </div>
  );
}
