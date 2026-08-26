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
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <svg width="56" height="56" viewBox="0 0 64 64">
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
            </svg>
            <div
              style={{
                width: 3,
                height: 36,
                background: "#789987",
              }}
            />
            <span
              style={{
                fontFamily: "Newsreader",
                fontSize: 28,
                fontWeight: 600,
                letterSpacing: 1,
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
