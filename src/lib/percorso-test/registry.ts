import type { ChapterDef } from "@/lib/chapters/types";
import { percorsoTestCapitolo1Steps } from "./capitolo-1";

export const percorsoTestChapters: Record<string, ChapterDef> = {
  "1": { chapterId: "prova-capitolo-1", title: "Capitolo di prova", steps: percorsoTestCapitolo1Steps },
};

export const PERCORSO_TEST_CHAPTER_NUMS = Object.keys(percorsoTestChapters).sort((a, b) => Number(a) - Number(b));
