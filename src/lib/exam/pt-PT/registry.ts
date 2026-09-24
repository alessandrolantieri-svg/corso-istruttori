import type { ChapterDef } from "@/lib/chapters/types";
import { esameTurno1StepsPtPT } from "./esame-turno-1";
import { esameTurno2StepsPtPT } from "./esame-turno-2";
import { esameTurno3StepsPtPT } from "./esame-turno-3";

export const examTurnsPtPT: Record<string, ChapterDef> = {
  "1": { chapterId: "esame-turno-1", title: "O grupo dos pequenos", steps: esameTurno1StepsPtPT },
  "2": { chapterId: "esame-turno-2", title: "A situação difícil", steps: esameTurno2StepsPtPT },
  "3": { chapterId: "esame-turno-3", title: "Os adolescentes, e quem já sabe fazer sozinho", steps: esameTurno3StepsPtPT },
};
