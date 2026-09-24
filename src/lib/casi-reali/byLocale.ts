import type { ChapterDef } from "@/lib/chapters/types";
import type { Locale } from "@/lib/i18n/catalog";
import { casiReali } from "./registry";
import { casiRealiEn } from "./en/registry";
import { casiRealiEs } from "./es/registry";
import { casiRealiFr } from "./fr/registry";
import { casiRealiPtPT } from "./pt-PT/registry";
import { casiRealiPtBR } from "./pt-BR/registry";

export function casiRealiForLocale(locale: Locale): Record<string, ChapterDef> {
  if (locale === "en") return casiRealiEn;
  if (locale === "es") return casiRealiEs;
  if (locale === "fr") return casiRealiFr;
  if (locale === "pt-PT") return casiRealiPtPT;
  if (locale === "pt-BR") return casiRealiPtBR;
  return casiReali;
}
