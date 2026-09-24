import type { ChapterDef } from "@/lib/chapters/types";
import { esameTurno1StepsPtBR } from "./esame-turno-1";
import { esameTurno2StepsPtBR } from "./esame-turno-2";
import { esameTurno3StepsPtBR } from "./esame-turno-3";

export const examTurnsPtBR: Record<string, ChapterDef> = {
  "1": { chapterId: "esame-turno-1", title: "O grupo dos pequenos", steps: esameTurno1StepsPtBR },
  "2": { chapterId: "esame-turno-2", title: "A situação difícil", steps: esameTurno2StepsPtBR },
  "3": { chapterId: "esame-turno-3", title: "Os adolescentes, e quem já sabe se virar sozinho", steps: esameTurno3StepsPtBR },
};
