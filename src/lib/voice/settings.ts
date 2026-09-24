import type { Locale } from "@/lib/i18n/catalog";

// Il TTS del browser vuole un tag BCP-47 completo per scegliere la voce giusta — i codici
// interni dell'app ("it", "en", "es") bastano per l'interfaccia ma non sempre per le voci di
// sistema. pt-PT/pt-BR sono già tag completi, non serve una mappa per quei due.
const SPEECH_LANG: Record<Locale, string> = {
  it: "it-IT",
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
  "pt-PT": "pt-PT",
  "pt-BR": "pt-BR",
};

export function speechLangForLocale(locale: Locale): string {
  return SPEECH_LANG[locale];
}

export const VOICE_SPEEDS = [0.75, 1, 1.25, 1.5] as const;
export type VoiceSpeed = (typeof VOICE_SPEEDS)[number];

const SPEED_KEY = "lcg_voice_speed";

// Preferenza puramente client (non cambia nulla nell'HTML reso dal server, a differenza di
// lingua/modalità ipovedente) — localStorage basta, non serve un cookie letto lato server.
export function loadVoiceSpeed(): VoiceSpeed {
  if (typeof window === "undefined") return 1;
  const raw = Number(window.localStorage.getItem(SPEED_KEY));
  return (VOICE_SPEEDS as readonly number[]).includes(raw) ? (raw as VoiceSpeed) : 1;
}

export function saveVoiceSpeed(speed: VoiceSpeed): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SPEED_KEY, String(speed));
}
