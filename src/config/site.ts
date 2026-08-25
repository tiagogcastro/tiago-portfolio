export const siteConfig = {
  name: "Tiago Castro",
  fullName: "Tiago Gonçalves de Castro",
  domain: "https://tiagogcastro.com.br",
  email: "tiagogcastro1@gmail.com",
  whatsappDisplay: "+55 21 96428-4144",
  whatsappRaw: "5521964284144",
  whatsappUrl: "https://wa.me/5521964284144",
  linkedin: "https://linkedin.com/in/tiagogcastro",
  github: "https://github.com/tiagogcastro",
  nexsift: "https://nexsift.vercel.app",
  lakeit: "https://www.claro.com.br/empresas/data-analytics/lakeit",
  futbuynow: "https://www.futbuynow.com",
  credentials: {
    degree:
      "https://descomplica.jacad.com.br/academico/docs/about/243787DC053R339224",
    awsServerless:
      "https://www.credly.com/badges/c12ab3fd-2e95-4f3e-b4db-9d1eb75be81d",
  },
  resume: {
    "pt-BR": "/resume/tiago-castro-desenvolvedor-fullstack-cloud-pt-br.pdf",
    "en-US": "/resume/tiago-castro-fullstack-cloud-developer-en-us.pdf",
    "es-ES": "/resume/tiago-castro-desenvolvedor-fullstack-cloud-pt-br.pdf",
  } as const,
} as const;

export function resumeHref(locale: string): string {
  return (
    siteConfig.resume[locale as keyof typeof siteConfig.resume] ??
    siteConfig.resume["pt-BR"]
  );
}
