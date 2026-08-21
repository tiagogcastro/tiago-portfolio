export const projects = [
  {
    id: "nexsift",
    featured: true,
    type: "authorial",
    technologies: ["Next.js", "TypeScript", "AWS", "Terraform", "MCP", "IA"],
    links: [
      { type: "website", href: "https://nexsift.vercel.app" },
      { type: "github", href: "https://github.com/tiagogcastro/nexsift" },
    ],
    translationKey: "projects.items.nexsift",
  },
  {
    id: "aws-iac-blueprint",
    featured: false,
    type: "openSource",
    technologies: ["Terraform", "Terragrunt", "LocalStack"],
    links: [
      {
        type: "github",
        href: "https://github.com/tiagogcastro/aws-iac-blueprint",
      },
    ],
    translationKey: "projects.items.awsIac",
  },
  {
    id: "ai-i18n-translate",
    featured: false,
    type: "npmOpenSource",
    technologies: ["TypeScript", "IA", "i18n"],
    links: [
      {
        type: "github",
        href: "https://github.com/tiagogcastro/ai-i18n-translate",
      },
      {
        type: "npm",
        href: "https://www.npmjs.com/package/@tiagogcastro/ai-i18n-translate",
      },
    ],
    translationKey: "projects.items.aiI18n",
  },
] as const;
