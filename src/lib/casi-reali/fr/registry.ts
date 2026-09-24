import type { ChapterDef } from "@/lib/chapters/types";
import { casoReale01StepsFr } from "./caso-reale-01";
import { casoReale02StepsFr } from "./caso-reale-02";
import { casoReale03StepsFr } from "./caso-reale-03";
import { casoReale04StepsFr } from "./caso-reale-04";
import { casoReale05StepsFr } from "./caso-reale-05";
import { casoReale06StepsFr } from "./caso-reale-06";
import { casoReale07StepsFr } from "./caso-reale-07";
import { casoReale08StepsFr } from "./caso-reale-08";
import { casoReale09StepsFr } from "./caso-reale-09";
import { casoReale10StepsFr } from "./caso-reale-10";
import { casoReale11StepsFr } from "./caso-reale-11";
import { casoReale12StepsFr } from "./caso-reale-12";
import { casoReale13StepsFr } from "./caso-reale-13";

export const casiRealiFr: Record<string, ChapterDef> = {
  "1": { chapterId: "caso-reale-01", title: "L'enfant qui se distrait (6-10)", steps: casoReale01StepsFr },
  "2": { chapterId: "caso-reale-02", title: "L'enfant qui n'écoute pas (3-5)", steps: casoReale02StepsFr },
  "3": { chapterId: "caso-reale-03", title: "L'enfant qui a peur (3-5)", steps: casoReale03StepsFr },
  "4": { chapterId: "caso-reale-04", title: "L'enfant qui refuse la consigne (3-5)", steps: casoReale04StepsFr },
  "5": { chapterId: "caso-reale-05", title: "L'enfant qui ne comprend pas (6-10)", steps: casoReale05StepsFr },
  "6": { chapterId: "caso-reale-06", title: "L'enfant qui dit qu'il sait déjà faire (6-10)", steps: casoReale06StepsFr },
  "7": { chapterId: "caso-reale-07", title: "L'enfant qui a besoin d'autonomie (6-10)", steps: casoReale07StepsFr },
  "8": { chapterId: "caso-reale-08", title: "Le garçon qui se trompe et se referme (11-13)", steps: casoReale08StepsFr },
  "9": { chapterId: "caso-reale-09", title: "La fille qui répète la même erreur (11-13)", steps: casoReale09StepsFr },
  "10": { chapterId: "caso-reale-10", title: "La fille qui ne croit pas à son résultat (11-13)", steps: casoReale10StepsFr },
  "11": { chapterId: "caso-reale-11", title: "L'adolescent qui exécute sans être présent (14-18)", steps: casoReale11StepsFr },
  "12": { chapterId: "caso-reale-12", title: "L'adolescente qui exécute à contrecœur (14-18)", steps: casoReale12StepsFr },
  "13": { chapterId: "caso-reale-13", title: "L'adolescent qui veut être traité comme un adulte (14-18)", steps: casoReale13StepsFr },
};
