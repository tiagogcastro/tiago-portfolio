export type ProjectLinkType = "website" | "github" | "npm";

export type ProjectFigure = {
  src: string;
  width: number;
  height: number;
  imageKey: string;
};

export type ProjectLink = {
  type: ProjectLinkType;
  href: string;
};

export type ProjectDates = {
  created?: string;
  restored?: string;
};

export type Project = {
  id: string;
  translationKey: string;
  featured: boolean;
  technologies: readonly string[];
  links: readonly ProjectLink[];
  cover: ProjectFigure | null;
  figures: readonly ProjectFigure[];
  dates?: ProjectDates;
};

const nexsiftFigures = [
  {
    src: "/projects/nexsift/topics.png",
    width: 1200,
    height: 750,
    imageKey: "topics",
  },
  {
    src: "/projects/nexsift/blog.png",
    width: 1200,
    height: 750,
    imageKey: "blog",
  },
  {
    src: "/projects/nexsift/sinal.png",
    width: 760,
    height: 1371,
    imageKey: "signal",
  },
] as const;

export const projects: readonly Project[] = [
  {
    id: "kaguya",
    dates: { created: "2021-08", restored: "2026-08" },
    translationKey: "projects.items.kaguya",
    featured: true,
    technologies: [
      "Next.js 15",
      "React 19",
      "Express",
      "NestJS",
      "GraphQL Federation",
      "Prisma 6",
      "PostgreSQL",
      "TypeScript",
      "Firebase Auth",
      "Zod",
    ],
    links: [{ type: "github", href: "https://github.com/tiagogcastro/kaguya" }],
    cover: {
      src: "/projects/kaguya/cover.png",
      width: 1200,
      height: 750,
      imageKey: "cover",
    },
    figures: [
      {
        src: "/projects/kaguya/dashboard.png",
        width: 1200,
        height: 750,
        imageKey: "dashboard",
      },
      {
        src: "/projects/kaguya/lesson-player.png",
        width: 1200,
        height: 750,
        imageKey: "lessonPlayer",
      },
      {
        src: "/projects/kaguya/mobile-dashboard.png",
        width: 390,
        height: 844,
        imageKey: "mobileDashboard",
      },
    ],
  },
  {
    id: "monkeynauts",
    dates: { created: "2021-12", restored: "2026-08" },
    translationKey: "projects.items.monkeynauts",
    featured: true,
    technologies: [
      "React 19",
      "Vite",
      "Express 5",
      "Prisma 6",
      "PostgreSQL",
      "ethers v6",
      "TypeScript strict",
      "zod",
      "Docker",
    ],
    links: [
      {
        type: "github",
        href: "https://github.com/tiagogcastro/themonkeynauts",
      },
    ],
    cover: {
      src: "/projects/themonkeynauts/cover.png",
      width: 1200,
      height: 750,
      imageKey: "cover",
    },
    figures: [
      {
        src: "/projects/themonkeynauts/login.png",
        width: 1200,
        height: 750,
        imageKey: "login",
      },
      {
        src: "/projects/themonkeynauts/admin.png",
        width: 1200,
        height: 750,
        imageKey: "admin",
      },
      {
        src: "/projects/themonkeynauts/account.png",
        width: 1200,
        height: 750,
        imageKey: "account",
      },
    ],
  },
  {
    id: "nexsift",
    dates: { created: "2026-08" },
    translationKey: "projects.items.nexsift",
    featured: false,
    technologies: ["Next.js", "TypeScript", "AWS", "Terraform", "MCP", "IA"],
    links: [
      { type: "website", href: "https://nexsift.vercel.app" },
      { type: "github", href: "https://github.com/tiagogcastro/nexsift" },
    ],
    cover: {
      src: "/projects/nexsift/home.png",
      width: 1200,
      height: 750,
      imageKey: "home",
    },
    figures: [...nexsiftFigures],
  },
  {
    id: "pagarme-simplified-psp",
    dates: { created: "2023-04", restored: "2026-08" },
    translationKey: "projects.items.pagarme",
    featured: false,
    technologies: [
      "Node.js 22",
      "TypeScript strict",
      "Express 5",
      "Zod 4",
      "Vitest 4",
      "date-fns",
      "tsup",
    ],
    links: [
      {
        type: "github",
        href: "https://github.com/tiagogcastro/pagarme-simplified-psp",
      },
    ],
    cover: {
      src: "/projects/pagarme-simplified-psp/cover.png",
      width: 1200,
      height: 360,
      imageKey: "cover",
    },
    figures: [
      {
        src: "/projects/pagarme-simplified-psp/api-demo.png",
        width: 1200,
        height: 830,
        imageKey: "apiDemo",
      },
    ],
  },
  {
    id: "ai-i18n-translate",
    dates: { created: "2026-03" },
    translationKey: "projects.items.aiI18n",
    featured: false,
    technologies: [
      "TypeScript",
      "Node.js",
      "OpenAI",
      "Anthropic",
      "Gemini",
      "DeepSeek",
      "CLI",
    ],
    links: [
      {
        type: "npm",
        href: "https://www.npmjs.com/package/@tiagogcastro/ai-i18n-translate",
      },
      {
        type: "github",
        href: "https://github.com/tiagogcastro/i18n-json-translation",
      },
    ],
    cover: {
      src: "/projects/ai-i18n-translate/cover.png",
      width: 1200,
      height: 750,
      imageKey: "cover",
    },
    figures: [],
  },
  {
    id: "aws-iac-blueprint",
    translationKey: "projects.items.awsIac",
    dates: { created: "2026-05" },
    featured: false,
    technologies: ["Terraform", "Terragrunt", "LocalStack", "AWS"],
    links: [
      {
        type: "github",
        href: "https://github.com/tiagogcastro/aws-iac-blueprint",
      },
    ],
    cover: {
      src: "/projects/aws-iac-blueprint/cover.png",
      width: 934,
      height: 531,
      imageKey: "cover",
    },
    figures: [],
  },
  {
    id: "ignews",
    dates: { created: "2022-05", restored: "2026-08" },
    translationKey: "projects.items.ignews",
    featured: false,
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript strict",
      "Stripe",
      "next-auth",
      "Prisma 7",
      "Prismic CMS",
      "zod",
      "Playwright",
    ],
    links: [{ type: "github", href: "https://github.com/tiagogcastro/ignews" }],
    cover: {
      src: "/projects/ignews/cover.png",
      width: 1200,
      height: 750,
      imageKey: "cover",
    },
    figures: [],
  },
  {
    id: "letmeask",
    dates: { created: "2021-06", restored: "2026-08" },
    translationKey: "projects.items.letmeask",
    featured: false,
    technologies: [
      "React 19",
      "TypeScript",
      "Vite 8",
      "Firebase 12",
      "react-hook-form",
      "zod",
      "Sass",
    ],
    links: [
      { type: "github", href: "https://github.com/tiagogcastro/letmeask" },
    ],
    cover: {
      src: "/projects/letmeask/cover.png",
      width: 1200,
      height: 750,
      imageKey: "cover",
    },
    figures: [],
  },
];
