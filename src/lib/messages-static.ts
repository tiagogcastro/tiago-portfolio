import enUS from "../../messages/en-US.json";
import esES from "../../messages/es-ES.json";
import ptBR from "../../messages/pt-BR.json";

const messagesByLocale = {
  "pt-BR": ptBR,
  "en-US": enUS,
  "es-ES": esES,
};

type MessagesShape = typeof ptBR;

export function getMessagesForLocale(locale: string): MessagesShape {
  return messagesByLocale[locale as keyof typeof messagesByLocale] ?? ptBR;
}

export function getOgCopy(locale: string) {
  const messages = getMessagesForLocale(locale);

  return {
    homeTitle: String(messages.hero.firstName),
    homeTitleHighlight: String(messages.hero.lastName),
    homeSubtitle: String(messages.hero.positioning),
    footerRole: String(messages.identity.role),
    expertise: String(messages.hero.cosmic.role),
    projectsLabel: String(messages.header.projects),
    projectsTitle: String(messages.projects.title),
    projectsSubtitle: String(messages.metadata.pages.projects.description),
    experienceLabel: String(messages.header.experience),
    experienceTitle: String(messages.experience.title),
    experienceSubtitle: String(messages.metadata.pages.experience.description),
  };
}
