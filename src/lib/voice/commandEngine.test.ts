import { describe, expect, it } from "vitest";
import { parseVoiceCommand } from "./commandEngine";
import type { Locale } from "@/lib/i18n/catalog";

// Formalizza i casi verificati a mano in FASE 5 (D49) — non importa la tabella COMMANDS interna
// (re-incollare lo stesso elenco non proverebbe nulla): ogni frase qui è scritta a mano, come la
// direbbe davvero un istruttore, indipendente dal file sotto test.
const READ_PHRASE: Record<Locale, string> = {
  it: "leggimi",
  en: "read it",
  es: "léeme",
  fr: "écoute",
  "pt-PT": "lê em voz alta",
  "pt-BR": "leia",
};

const LOCALES = Object.keys(READ_PHRASE) as Locale[];

describe("parseVoiceCommand — corrispondenza esatta, tutte le lingue", () => {
  it.each(LOCALES)("%s: riconosce READ con confidenza 1", (locale) => {
    const result = parseVoiceCommand(READ_PHRASE[locale], locale);
    expect(result).toEqual({ intent: "READ", value: undefined, confidence: 1 });
  });
});

describe("parseVoiceCommand — SELECT_ANSWER restituisce sempre un indice, mai una lettera (spec §37)", () => {
  const CASES: Array<{ locale: Locale; phrase: string; value: string }> = [
    { locale: "it", phrase: "risposta a", value: "0" },
    { locale: "it", phrase: "la seconda", value: "1" },
    { locale: "it", phrase: "scelgo la terza", value: "2" },
    { locale: "en", phrase: "answer a", value: "0" },
    { locale: "es", phrase: "la primera", value: "0" },
    { locale: "fr", phrase: "réponse b", value: "1" },
    { locale: "pt-PT", phrase: "a primeira", value: "0" },
    { locale: "pt-BR", phrase: "escolho a primeira", value: "0" },
  ];

  it.each(CASES)("$locale: «$phrase» → indice $value, non una lettera", ({ locale, phrase, value }) => {
    const result = parseVoiceCommand(phrase, locale);
    expect(result.intent).toBe("SELECT_ANSWER");
    expect(result.value).toBe(value);
    expect(result.value).not.toMatch(/^[a-c]$/i);
  });
});

describe("parseVoiceCommand — contenimento (frase più lunga di quella nota)", () => {
  it("una frase intera contenente il comando nota vale 0.7, non 1", () => {
    const result = parseVoiceCommand("per favore torna indietro", "it");
    expect(result).toEqual({ intent: "BACK", value: undefined, confidence: 0.7 });
  });

  it("riconosce il comando anche dentro una frase naturale più lunga", () => {
    const result = parseVoiceCommand("credo sia la seconda risposta", "it");
    expect(result.intent).toBe("SELECT_ANSWER");
    expect(result.value).toBe("1");
    expect(result.confidence).toBe(0.7);
  });
});

describe("parseVoiceCommand — una lettera sola non scatta per contenimento", () => {
  it('"a" (1 carattere) non fa scattare SELECT_ANSWER dentro una frase che la contiene per caso', () => {
    // "aiuto" contiene la lettera "a", ma è anche una frase esatta di HELP — qui la prova vera è
    // una frase che NON è un comando esatto e contiene "a" solo come sottostringa casuale.
    const result = parseVoiceCommand("qualcosa a caso", "it");
    expect(result).toEqual({ intent: "UNKNOWN", value: undefined, confidence: 0 });
  });

  it("HELP resta riconosciuto per corrispondenza esatta, non per la lettera che contiene", () => {
    const result = parseVoiceCommand("aiuto", "it");
    expect(result).toEqual({ intent: "HELP", value: undefined, confidence: 1 });
  });
});

describe("parseVoiceCommand — trascrizione senza corrispondenza", () => {
  it("restituisce UNKNOWN con confidenza 0", () => {
    const result = parseVoiceCommand("il gatto sul tavolo", "it");
    expect(result).toEqual({ intent: "UNKNOWN", value: undefined, confidence: 0 });
  });

  it("normalizza maiuscole e punteggiatura prima del confronto", () => {
    const result = parseVoiceCommand("  LEGGIMI, per favore!  ", "it");
    expect(result.intent).toBe("READ");
  });
});
