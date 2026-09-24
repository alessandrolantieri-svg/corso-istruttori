import type { ChapterDef } from "@/lib/chapters/types";
import { esameTurno1StepsFr } from "./esame-turno-1";
import { esameTurno2StepsFr } from "./esame-turno-2";
import { esameTurno3StepsFr } from "./esame-turno-3";

export const examTurnsFr: Record<string, ChapterDef> = {
  "1": { chapterId: "esame-turno-1", title: "Le groupe des petits", steps: esameTurno1StepsFr },
  "2": { chapterId: "esame-turno-2", title: "La situation difficile", steps: esameTurno2StepsFr },
  "3": { chapterId: "esame-turno-3", title: "Les adolescents, et ceux qui savent déjà faire seuls", steps: esameTurno3StepsFr },
};
