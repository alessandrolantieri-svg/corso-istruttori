import type { ChapterDef } from "@/lib/chapters/types";
import { esameTurno1StepsEn } from "./esame-turno-1";
import { esameTurno2StepsEn } from "./esame-turno-2";
import { esameTurno3StepsEn } from "./esame-turno-3";

// Stesse chiavi/chapterId del registro italiano — vedi la nota in chapters/en/registry.ts.
export const examTurnsEn: Record<string, ChapterDef> = {
  "1": { chapterId: "esame-turno-1", title: "The Little Ones' Group", steps: esameTurno1StepsEn },
  "2": { chapterId: "esame-turno-2", title: "The Difficult Situation", steps: esameTurno2StepsEn },
  "3": {
    chapterId: "esame-turno-3",
    title: "The Teenagers, and Those Who Can Already Manage on Their Own",
    steps: esameTurno3StepsEn,
  },
};
