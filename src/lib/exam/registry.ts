import type { ChapterDef } from "@/lib/chapters/types";
import { esameTurno1Steps } from "./esame-turno-1";
import { esameTurno2Steps } from "./esame-turno-2";
import { esameTurno3Steps } from "./esame-turno-3";

// Chiave = il numero nell'URL (/esame/1 ... /esame/3), valore = definizione del turno.
// Stesso ChapterDef dei capitoli — "non è un capitolo" nel contenuto, ma è la stessa forma di
// dato: title/steps, motore condiviso via ChapterRunner({ kind: "esame" }).
export const examTurns: Record<string, ChapterDef> = {
  "1": { chapterId: "esame-turno-1", title: "Il gruppo dei piccoli", steps: esameTurno1Steps },
  "2": { chapterId: "esame-turno-2", title: "La situazione difficile", steps: esameTurno2Steps },
  "3": { chapterId: "esame-turno-3", title: "Gli adolescenti, e chi ormai sa fare da solo", steps: esameTurno3Steps },
};

export const EXAM_NUMS = Object.keys(examTurns).sort((a, b) => Number(a) - Number(b));
