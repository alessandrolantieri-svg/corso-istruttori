import type { ChapterDef } from "@/lib/chapters/types";
import { casoReale01StepsEs } from "./caso-reale-01";
import { casoReale02StepsEs } from "./caso-reale-02";
import { casoReale03StepsEs } from "./caso-reale-03";
import { casoReale04StepsEs } from "./caso-reale-04";
import { casoReale05StepsEs } from "./caso-reale-05";
import { casoReale06StepsEs } from "./caso-reale-06";
import { casoReale07StepsEs } from "./caso-reale-07";
import { casoReale08StepsEs } from "./caso-reale-08";
import { casoReale09StepsEs } from "./caso-reale-09";
import { casoReale10StepsEs } from "./caso-reale-10";
import { casoReale11StepsEs } from "./caso-reale-11";
import { casoReale12StepsEs } from "./caso-reale-12";
import { casoReale13StepsEs } from "./caso-reale-13";

export const casiRealiEs: Record<string, ChapterDef> = {
  "1": { chapterId: "caso-reale-01", title: "El niño que se distrae (6-10)", steps: casoReale01StepsEs },
  "2": { chapterId: "caso-reale-02", title: "El niño que no escucha (3-5)", steps: casoReale02StepsEs },
  "3": { chapterId: "caso-reale-03", title: "El niño que tiene miedo (3-5)", steps: casoReale03StepsEs },
  "4": { chapterId: "caso-reale-04", title: "El niño que rechaza la instrucción (3-5)", steps: casoReale04StepsEs },
  "5": { chapterId: "caso-reale-05", title: "El niño que no comprende (6-10)", steps: casoReale05StepsEs },
  "6": { chapterId: "caso-reale-06", title: "El niño que dice que ya sabe hacerlo (6-10)", steps: casoReale06StepsEs },
  "7": { chapterId: "caso-reale-07", title: "El niño que necesita autonomía (6-10)", steps: casoReale07StepsEs },
  "8": { chapterId: "caso-reale-08", title: "El chico que se equivoca y se cierra (11-13)", steps: casoReale08StepsEs },
  "9": { chapterId: "caso-reale-09", title: "La chica que repite el mismo error (11-13)", steps: casoReale09StepsEs },
  "10": { chapterId: "caso-reale-10", title: "La chica que no se cree su resultado (11-13)", steps: casoReale10StepsEs },
  "11": { chapterId: "caso-reale-11", title: "El adolescente que ejecuta sin estar presente (14-18)", steps: casoReale11StepsEs },
  "12": { chapterId: "caso-reale-12", title: "El adolescente que ejecuta de mala gana (14-18)", steps: casoReale12StepsEs },
  "13": { chapterId: "caso-reale-13", title: "El adolescente que quiere ser tratado como un adulto (14-18)", steps: casoReale13StepsEs },
};
