export function ProfileSystemMap() {
  return (
    <div
      aria-hidden="true"
      className="border-mineral/20 bg-background/70 pointer-events-none relative aspect-[16/10] overflow-hidden border lg:aspect-[4/5]"
    >
      <svg
        viewBox="0 0 520 640"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
      >
        <defs>
          <linearGradient id="profile-map-fade" x1="0" y1="0" x2="1" y2="1">
            <stop
              offset="0"
              stopColor="var(--mineral-deep)"
              stopOpacity="0.8"
            />
            <stop offset="0.58" stopColor="var(--surface)" stopOpacity="0.2" />
            <stop offset="1" stopColor="var(--background)" stopOpacity="0.9" />
          </linearGradient>
          <pattern
            id="profile-map-grid"
            width="52"
            height="52"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M52 0H0V52"
              fill="none"
              stroke="var(--text)"
              strokeOpacity="0.055"
            />
          </pattern>
        </defs>

        <rect width="520" height="640" fill="url(#profile-map-fade)" />
        <rect width="520" height="640" fill="url(#profile-map-grid)" />

        <g fill="none" stroke="var(--text)" strokeOpacity="0.14">
          <path d="M42 102H180V54H332V132H478" />
          <path d="M42 514H154V574H324V494H478" />
          <path d="M104 174V288H44V404H176" strokeDasharray="5 10" />
          <path d="M412 180V262H478V384H394" strokeDasharray="5 10" />
        </g>

        <g fill="var(--surface-soft)" stroke="var(--text)" strokeOpacity="0.16">
          <path d="M120 136H274V222H120Z" />
          <path d="M250 250H430V354H250Z" />
          <path d="M82 382H268V486H82Z" />
          <path d="M290 430H438V526H290Z" />
        </g>

        <g fill="none" stroke="var(--mineral)" strokeWidth="1.5">
          <path d="M42 178H164V274H338V206H478" />
          <path
            d="M42 448H184V330H350V466H478"
            strokeDasharray="8 10"
            strokeOpacity="0.7"
          />
        </g>

        <path
          d="M64 566V530H214V424H334V316H448V82"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
        />

        <g fill="var(--background)" stroke="var(--mineral)" strokeWidth="2">
          <rect x="114" y="166" width="12" height="12" />
          <rect x="268" y="268" width="12" height="12" />
          <rect x="160" y="442" width="12" height="12" />
          <rect x="404" y="328" width="12" height="12" />
        </g>

        <g fill="var(--mineral-bright)">
          <rect x="36" y="172" width="12" height="12" />
          <rect x="472" y="200" width="12" height="12" />
          <rect x="472" y="460" width="12" height="12" />
        </g>

        <g fill="var(--accent)">
          <rect x="58" y="560" width="12" height="12" />
          <rect x="442" y="76" width="12" height="12" />
        </g>

        <g stroke="var(--text)" strokeOpacity="0.22">
          <path d="M142 162H242M142 181H222M142 200H196" />
          <path d="M274 280H402M274 302H366M274 324H386" />
          <path d="M108 414H232M108 436H210M108 458H244" />
          <path d="M314 462H414M314 484H384" />
        </g>

        <path d="M0 594H520" stroke="var(--mineral)" strokeOpacity="0.35" />
        <path d="M38 594H150" stroke="var(--mineral-bright)" strokeWidth="3" />
        <path d="M378 594H482" stroke="var(--accent)" strokeWidth="3" />
      </svg>
      <div className="from-background/70 absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t to-transparent" />
    </div>
  );
}
