import type { Locale } from "@/lib/i18n/catalog";

// Profilo iniziale del Capitolo 1 del percorso "comunicazione-nuoto" — non un concetto di
// piattaforma: un percorso futuro potrebbe non avere un test VAK.

export type VakChannel = "mostra" | "dire" | "sentire";
export type VakAnswers = Record<string, VakChannel | undefined>;

export interface VakResult {
  mostra: number;
  dire: number;
  sentire: number;
  prevalente: VakChannel;
}

const VAK_QUESTION_KEYS = ["v1", "v2", "v3", "v4", "v5", "v6"] as const;

export function computeVak(answers: VakAnswers): VakResult {
  const counts: Record<VakChannel, number> = { mostra: 0, dire: 0, sentire: 0 };

  for (const key of VAK_QUESTION_KEYS) {
    const value = answers[key];
    if (value === "mostra" || value === "dire" || value === "sentire") {
      counts[value]++;
    }
  }

  const prevalente = (Object.keys(counts) as VakChannel[]).reduce((a, b) =>
    counts[b] > counts[a] ? b : a
  );

  return { ...counts, prevalente };
}

export function vakIsComplete(answers: VakAnswers): boolean {
  return VAK_QUESTION_KEYS.every((k) => !!answers[k]);
}

export const VAK_NOUN: Record<VakChannel, string> = {
  mostra: "mostrare",
  dire: "dire",
  sentire: "far sentire",
};

export const VAK_ADJ: Record<VakChannel, string> = {
  mostra: "visivo",
  dire: "verbale",
  sentire: "cinestetico",
};

// Equivalenti inglesi delle stesse due mappe — i VALORI (VakChannel: "mostra"|"dire"|"sentire")
// restano SEMPRE questi tre, in ogni lingua: sono chiavi interne salvate in InitialProfile.values
// (FASE 8 §3), mai testo da tradurre. Solo l'etichetta mostrata cambia.
export const VAK_NOUN_EN: Record<VakChannel, string> = {
  mostra: "showing",
  dire: "telling",
  sentire: "guiding by feel",
};

export const VAK_ADJ_EN: Record<VakChannel, string> = {
  mostra: "visual",
  dire: "verbal",
  sentire: "kinesthetic",
};

// Equivalenti spagnoli delle stesse due mappe — stessa nota di VAK_NOUN_EN/VAK_ADJ_EN qui sopra:
// i VALORI (VakChannel) restano identici in ogni lingua, solo l'etichetta mostrata cambia.
export const VAK_NOUN_ES: Record<VakChannel, string> = {
  mostra: "mostrar",
  dire: "decir",
  sentire: "hacer sentir",
};

export const VAK_ADJ_ES: Record<VakChannel, string> = {
  mostra: "visual",
  dire: "verbal",
  sentire: "cinestésico",
};

// Equivalenti francesi — stessa nota di VAK_NOUN_EN/VAK_ADJ_EN qui sopra.
export const VAK_NOUN_FR: Record<VakChannel, string> = {
  mostra: "montrer",
  dire: "dire",
  sentire: "faire sentir",
};

export const VAK_ADJ_FR: Record<VakChannel, string> = {
  mostra: "visuel",
  dire: "verbal",
  sentire: "kinesthésique",
};

// Equivalenti portoghesi (europeo e brasiliano) — stessa nota qui sopra. I due dialetti
// coincidono su queste etichette brevi (differiscono altrove: palavra-passe/senha, ronda/rodada).
export const VAK_NOUN_PT: Record<VakChannel, string> = {
  mostra: "mostrar",
  dire: "dizer",
  sentire: "fazer sentir",
};

export const VAK_ADJ_PT: Record<VakChannel, string> = {
  mostra: "visual",
  dire: "verbal",
  sentire: "cinestésico",
};

// Punto unico da cui pescare il sostantivo giusto per lingua — usato dalla Dashboard, che ha
// `locale` ma userebbe altrimenti sempre VAK_NOUN (italiano) indipendentemente dalla lingua.
export function vakNounForLocale(channel: VakChannel, locale: Locale): string {
  if (locale === "en") return VAK_NOUN_EN[channel];
  if (locale === "es") return VAK_NOUN_ES[channel];
  if (locale === "fr") return VAK_NOUN_FR[channel];
  if (locale === "pt-PT" || locale === "pt-BR") return VAK_NOUN_PT[channel];
  return VAK_NOUN[channel];
}
