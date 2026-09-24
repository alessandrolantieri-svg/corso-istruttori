import { chaptersForLocale } from "@/lib/chapters/byLocale";
import { examTurnsForLocale } from "@/lib/exam/byLocale";
import { casiRealiForLocale } from "@/lib/casi-reali/byLocale";
import { percorsoTestChapters } from "@/lib/percorso-test/registry";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/catalog";

interface SourceInfo {
  label: string;
}

// Indice inverso chapterId → etichetta leggibile, ricostruito per lingua (i quattro registri
// sorgente sono già per-lingua da byLocale.ts) — nessun dato nuovo, solo un modo di presentare
// quello che c'è già, nella lingua di chi legge. Il percorso di prova resta solo in italiano
// (non è contenuto reale del corso).
function buildSourceIndex(locale: Locale): Record<string, SourceInfo> {
  const index: Record<string, SourceInfo> = {};
  const chapters = chaptersForLocale(locale);
  const examTurns = examTurnsForLocale(locale);
  const casiReali = casiRealiForLocale(locale);

  for (const [num, def] of Object.entries(chapters)) {
    index[def.chapterId] = { label: `Capitolo ${num} · ${def.title}` };
  }
  for (const [num, def] of Object.entries(examTurns)) {
    index[def.chapterId] = { label: `Esame, Turno ${num} · ${def.title}` };
  }
  for (const def of Object.values(casiReali)) {
    index[def.chapterId] = { label: `Caso Reale · ${def.title}` };
  }
  for (const def of Object.values(percorsoTestChapters)) {
    index[def.chapterId] = { label: `Percorso di prova · ${def.title}` };
  }
  return index;
}

export function resolveSource(chapterId: string, locale: Locale = DEFAULT_LOCALE): SourceInfo {
  return buildSourceIndex(locale)[chapterId] ?? { label: chapterId };
}
