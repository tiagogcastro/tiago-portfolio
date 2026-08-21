export function SystemsInterlude() {
  return (
    <div
      aria-hidden="true"
      className="bg-background pointer-events-none relative aspect-[4/3] overflow-hidden border-y border-white/15 md:aspect-[16/7] lg:aspect-[3/1]"
    >
      <svg
        viewBox="0 0 1600 560"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
      >
        <defs>
          <linearGradient id="interlude-surface" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--background)" />
            <stop
              offset="0.46"
              stopColor="var(--mineral-deep)"
              stopOpacity="0.72"
            />
            <stop offset="1" stopColor="var(--surface)" />
          </linearGradient>
          <linearGradient id="interlude-edge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--background)" />
            <stop offset="0.2" stopColor="var(--background)" stopOpacity="0" />
            <stop offset="0.8" stopColor="var(--background)" stopOpacity="0" />
            <stop offset="1" stopColor="var(--background)" />
          </linearGradient>
        </defs>

        <rect width="1600" height="560" fill="url(#interlude-surface)" />

        <g fill="none" stroke="var(--text)" strokeOpacity="0.1">
          <path d="M0 92H310L382 164H668L736 96H1014L1094 176H1600" />
          <path d="M0 470H266L350 386H642L724 468H1052L1140 380H1600" />
          <path d="M0 280H1600" strokeDasharray="3 14" />
          <path
            d="M318 0V560M686 0V560M1048 0V560M1380 0V560"
            strokeDasharray="2 12"
          />
        </g>

        <g fill="var(--surface-soft)" stroke="var(--text)" strokeOpacity="0.14">
          <path d="M402 154H594V246H402Z" />
          <path d="M710 210H900V350H710Z" />
          <path d="M1018 142H1192V242H1018Z" />
          <path d="M1018 318H1260V414H1018Z" />
        </g>

        <g stroke="var(--text)" strokeOpacity="0.2">
          <path d="M430 182H566M430 204H530M430 226H548" />
          <path d="M742 244H866M742 270H836M742 296H874M742 322H812" />
          <path d="M1048 172H1160M1048 196H1128M1048 220H1148" />
          <path d="M1048 348H1228M1048 372H1178M1048 396H1208" />
        </g>

        <g fill="none" stroke="var(--mineral)" strokeWidth="2">
          <path d="M0 176H210L288 254H512L592 334H794L882 242H1110L1194 306H1600" />
          <path
            d="M0 382H172L270 292H488L566 206H808L886 310H1086L1174 220H1398L1476 294H1600"
            strokeDasharray="9 13"
            strokeOpacity="0.72"
          />
        </g>

        <path
          d="M76 498V432H250V356H474V280H784V198H1112V112H1524V64"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
        />

        <g fill="var(--background)" stroke="var(--mineral)" strokeWidth="2">
          <rect x="282" y="248" width="13" height="13" />
          <rect x="586" y="328" width="13" height="13" />
          <rect x="876" y="236" width="13" height="13" />
          <rect x="1188" y="300" width="13" height="13" />
          <rect x="1470" y="288" width="13" height="13" />
        </g>

        <g fill="var(--mineral-bright)">
          <rect x="36" y="170" width="13" height="13" />
          <rect x="788" y="192" width="13" height="13" />
          <rect x="1374" y="214" width="13" height="13" />
          <rect x="1550" y="288" width="13" height="13" />
        </g>

        <g fill="var(--accent)">
          <rect x="70" y="492" width="13" height="13" />
          <rect x="468" y="274" width="13" height="13" />
          <rect x="1106" y="106" width="13" height="13" />
          <rect x="1518" y="58" width="13" height="13" />
        </g>

        <g fill="var(--text)" fillOpacity="0.3">
          <rect x="92" y="130" width="4" height="42" />
          <rect x="126" y="112" width="4" height="60" />
          <rect x="160" y="142" width="4" height="30" />
          <rect x="194" y="96" width="4" height="76" />
          <rect x="1402" y="322" width="4" height="64" />
          <rect x="1436" y="342" width="4" height="44" />
          <rect x="1470" y="304" width="4" height="82" />
          <rect x="1504" y="330" width="4" height="56" />
        </g>

        <rect width="1600" height="560" fill="url(#interlude-edge)" />
      </svg>
      <div className="from-background absolute inset-y-0 left-0 w-[12%] bg-gradient-to-r to-transparent" />
      <div className="from-background absolute inset-y-0 right-0 w-[12%] bg-gradient-to-l to-transparent" />
    </div>
  );
}
