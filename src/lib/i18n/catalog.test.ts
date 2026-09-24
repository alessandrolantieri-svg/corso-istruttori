import { describe, expect, it } from "vitest";
import { LOCALES, UI_CATALOG, t, DEFAULT_LOCALE } from "./catalog";

// Guardia di regressione: con 150+ file di contenuto che chiamano t(chiave, locale), una chiave
// aggiunta senza tutte e sei le lingue passerebbe inosservata fino a quando qualcuno non cambia
// lingua e trova un buco — meglio che lo trovi questo test, non un istruttore in Francia.
describe("UI_CATALOG — completezza delle traduzioni", () => {
  const entries = Object.entries(UI_CATALOG) as Array<[string, Record<string, string>]>;

  it.each(entries)("%s ha tutte le %i lingue, nessuna vuota", (_key, translations) => {
    for (const locale of LOCALES) {
      expect(translations[locale], `manca "${locale}"`).toBeTypeOf("string");
      expect(translations[locale].trim().length, `"${locale}" è vuota`).toBeGreaterThan(0);
    }
  });
});

describe("t()", () => {
  it("restituisce la traduzione nella lingua richiesta", () => {
    expect(t("progresso.correctSuffix", "en")).toBe("correct");
    expect(t("progresso.correctSuffix", "it")).toBe("corrette");
  });

  it("con la lingua di default restituisce l'italiano", () => {
    expect(t("progresso.correctSuffix", DEFAULT_LOCALE)).toBe("corrette");
  });
});
