export const siteConfig = {
  name: "Tiago Castro",
  fullName: "Tiago Gonçalves de Castro",
  domain: "https://tiagogcastro.com.br",
  cardDomain: "https://contato.tiagogcastro.com.br",
  professionalAvailability: true,
  email: "tiagogcastro1@gmail.com",
  whatsappDisplay: "+55 21 96428-4144",
  whatsappRaw: "5521964284144",
  whatsappUrl: "https://wa.me/5521964284144",
  linkedin: "https://linkedin.com/in/tiagogcastro",
  github: "https://github.com/tiagogcastro",
  tiktok: "https://www.tiktok.com/@tiago.gcastro",
  nexsift: "https://nexsift.vercel.app",
  globalHitss: "https://www.hitss.com/br/",
  lakeit: "https://www.claro.com.br/empresas/data-analytics/lakeit",
  futbuynow: "https://www.futbuynow.com",
  credentials: {
    degree:
      "https://descomplica.jacad.com.br/academico/docs/about/243787DC053R339224",
    awsCloudPractitioner:
      "https://www.credly.com/badges/2e86b275-895d-49f4-807e-d6e264ef47e4/public_url",
    awsAiPractitioner:
      "https://www.credly.com/badges/f21d87ea-e9df-46b9-9d0b-938f728f79b6/public_url",
    awsServerless:
      "https://www.credly.com/badges/c12ab3fd-2e95-4f3e-b4db-9d1eb75be81d",
    udemyJavaScript:
      "https://www.udemy.com/certificate/UC-497ce18e-50ae-44eb-8a8e-664cf2128781/",
  },
  resume: {
    "pt-BR": "/resume/Tiago_Castro_Curriculo_Desenvolvedor_Fullstack.pdf",
    "en-US": "/resume/Tiago_Castro_Resume_Fullstack_Developer_en_US.pdf",
    "es-ES": "/resume/Tiago_Castro_Resume_Fullstack_Developer_en_US.pdf",
  } as const,
} as const;

export function resumeHref(locale: string): string {
  return (
    siteConfig.resume[locale as keyof typeof siteConfig.resume] ??
    siteConfig.resume["pt-BR"]
  );
}

export function linkedinHref(locale: string): string {
  return locale === "en-US"
    ? "https://www.linkedin.com/in/tiagogcastro/?locale=en-US"
    : siteConfig.linkedin;
}
