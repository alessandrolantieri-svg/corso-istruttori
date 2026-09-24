import { describe, expect, it } from "vitest";
import { TIER_WORD, TIER_BODY, LODE_LINE, TAGLINE, CERT_LABELS } from "./copy";
import { LOCALES } from "@/lib/i18n/catalog";
import type { Tier } from "./score";

const TIERS: Tier[] = ["sufficiente", "buono", "ottimo", "lode"];

// Stessa guardia del catalogo i18n (D54): il certificato è un documento formale (D22/D58) — una
// lingua dimenticata qui non è un dettaglio di interfaccia, è un attestato incompleto consegnato
// a un istruttore vero.
describe("Contenuto del certificato — completezza per lingua", () => {
  it.each(LOCALES)("%s: TIER_WORD ha tutti e 4 i livelli, nessuno vuoto", (locale) => {
    for (const tier of TIERS) {
      expect(TIER_WORD[locale][tier].trim().length).toBeGreaterThan(0);
    }
  });

  it.each(LOCALES)("%s: TIER_BODY ha pre/bold/post per tutti e 4 i livelli, nessuno vuoto", (locale) => {
    for (const tier of TIERS) {
      const body = TIER_BODY[locale][tier];
      expect(body.pre.trim().length, `${locale}/${tier}/pre`).toBeGreaterThan(0);
      expect(body.bold.trim().length, `${locale}/${tier}/bold`).toBeGreaterThan(0);
      expect(body.post.trim().length, `${locale}/${tier}/post`).toBeGreaterThan(0);
    }
  });

  it.each(LOCALES)("%s: LODE_LINE non è vuota", (locale) => {
    expect(LODE_LINE[locale].trim().length).toBeGreaterThan(0);
  });

  it.each(LOCALES)("%s: TAGLINE non è vuota", (locale) => {
    expect(TAGLINE[locale].trim().length).toBeGreaterThan(0);
  });

  it.each(LOCALES)("%s: CERT_LABELS ha tutte e 5 le etichette, nessuna vuota", (locale) => {
    const labels = CERT_LABELS[locale];
    for (const [key, value] of Object.entries(labels)) {
      expect(value.trim().length, `${locale}/${key}`).toBeGreaterThan(0);
    }
  });
});

describe("Tier distinti per lingua (nessuna collisione di etichetta)", () => {
  it.each(LOCALES)("%s: le 4 parole di livello sono tutte diverse fra loro", (locale) => {
    const words = TIERS.map((tier) => TIER_WORD[locale][tier]);
    expect(new Set(words).size).toBe(words.length);
  });
});
