export function ContactSignalField() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-0 right-0 h-[58%] w-full overflow-hidden opacity-30 sm:w-[78%] lg:w-[62%] lg:opacity-40"
    >
      <svg
        viewBox="0 0 900 650"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
      >
        <defs>
          <linearGradient
            id="contact-signal-surface"
            x1="0"
            y1="1"
            x2="1"
            y2="0"
          >
            <stop offset="0" stopColor="var(--surface)" stopOpacity="0" />
            <stop
              offset="0.55"
              stopColor="var(--mineral-deep)"
              stopOpacity="0.6"
            />
            <stop offset="1" stopColor="var(--background)" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <rect width="900" height="650" fill="url(#contact-signal-surface)" />

        <g fill="none" stroke="var(--text)" strokeOpacity="0.12">
          <path d="M118 650V524H258V408H404V290H572V166H770V0" />
          <path
            d="M248 650V568H388V472H526V372H678V270H900"
            strokeDasharray="5 12"
          />
          <path
            d="M0 492H174V358H316V238H474V118H640V0"
            strokeDasharray="3 11"
          />
          <path d="M350 650V604H500V530H650V452H804V368H900" />
        </g>

        <g fill="none" stroke="var(--mineral)" strokeWidth="2">
          <path d="M62 650V548H204V438H352V326H514V214H690V98H846V0" />
          <path
            d="M0 570H144V474H294V364H450V258H612V146H782V42H900"
            strokeDasharray="8 12"
            strokeOpacity="0.72"
          />
        </g>

        <path
          d="M292 650V588H438V492H584V394H728V296H856V212"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
        />

        <g fill="var(--surface-soft)" stroke="var(--text)" strokeOpacity="0.16">
          <rect x="386" y="168" width="122" height="72" />
          <rect x="538" y="286" width="142" height="82" />
          <rect x="688" y="102" width="126" height="72" />
        </g>

        <g stroke="var(--text)" strokeOpacity="0.24">
          <path d="M406 190H486M406 210H462" />
          <path d="M560 310H654M560 332H624M560 350H642" />
          <path d="M710 124H790M710 146H766" />
        </g>

        <g fill="var(--background)" stroke="var(--mineral)" strokeWidth="2">
          <rect x="198" y="432" width="12" height="12" />
          <rect x="508" y="208" width="12" height="12" />
          <rect x="684" y="92" width="12" height="12" />
          <rect x="840" y="-6" width="12" height="12" />
        </g>

        <g fill="var(--accent)">
          <rect x="286" y="582" width="12" height="12" />
          <rect x="578" y="388" width="12" height="12" />
          <rect x="850" y="206" width="12" height="12" />
        </g>

        <g fill="var(--mineral-bright)">
          <rect x="56" y="542" width="12" height="12" />
          <rect x="606" y="140" width="12" height="12" />
          <rect x="776" y="36" width="12" height="12" />
        </g>
      </svg>
      <div className="from-surface absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r to-transparent" />
      <div className="from-surface absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t to-transparent" />
    </div>
  );
}
