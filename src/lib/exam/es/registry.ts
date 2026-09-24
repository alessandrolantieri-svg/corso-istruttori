import type { ChapterDef } from "@/lib/chapters/types";
import { esameTurno1StepsEs } from "./esame-turno-1";
import { esameTurno2StepsEs } from "./esame-turno-2";
import { esameTurno3StepsEs } from "./esame-turno-3";

export const examTurnsEs: Record<string, ChapterDef> = {
  "1": { chapterId: "esame-turno-1", title: "El grupo de los pequeños", steps: esameTurno1StepsEs },
  "2": { chapterId: "esame-turno-2", title: "La situación difícil", steps: esameTurno2StepsEs },
  "3": { chapterId: "esame-turno-3", title: "Los adolescentes, y quien ya sabe arreglárselas solo", steps: esameTurno3StepsEs },
};
