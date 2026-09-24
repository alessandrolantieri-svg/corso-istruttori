import type { ChapterDef } from "@/lib/chapters/types";
import type { Locale } from "@/lib/i18n/catalog";
import { examTurns } from "./registry";
import { examTurnsEn } from "./en/registry";
import { examTurnsEs } from "./es/registry";
import { examTurnsFr } from "./fr/registry";
import { examTurnsPtPT } from "./pt-PT/registry";
import { examTurnsPtBR } from "./pt-BR/registry";

export function examTurnsForLocale(locale: Locale): Record<string, ChapterDef> {
  if (locale === "en") return examTurnsEn;
  if (locale === "es") return examTurnsEs;
  if (locale === "fr") return examTurnsFr;
  if (locale === "pt-PT") return examTurnsPtPT;
  if (locale === "pt-BR") return examTurnsPtBR;
  return examTurns;
}
