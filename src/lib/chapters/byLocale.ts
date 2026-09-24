import type { ChapterDef } from "./types";
import type { Locale } from "@/lib/i18n/catalog";
import { chapters } from "./registry";
import { chaptersEn } from "./en/registry";
import { chaptersEs } from "./es/registry";
import { chaptersFr } from "./fr/registry";
import { chaptersPtPT } from "./pt-PT/registry";
import { chaptersPtBR } from "./pt-BR/registry";

// L'italiano resta il registro di default, invariato — nessuna chiamata esistente a
// `chapters[num]` ha dovuto cambiare. Solo chi ha bisogno di scegliere in base alla lingua
// dell'istruttore (ChapterRunner, le pagine dei capitoli, la Dashboard) passa da qui.
export function chaptersForLocale(locale: Locale): Record<string, ChapterDef> {
  if (locale === "en") return chaptersEn;
  if (locale === "es") return chaptersEs;
  if (locale === "fr") return chaptersFr;
  if (locale === "pt-PT") return chaptersPtPT;
  if (locale === "pt-BR") return chaptersPtBR;
  return chapters;
}
