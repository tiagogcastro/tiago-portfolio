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
