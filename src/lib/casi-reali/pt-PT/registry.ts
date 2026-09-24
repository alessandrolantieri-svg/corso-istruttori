import type { ChapterDef } from "@/lib/chapters/types";
import { casoReale01StepsPtPT } from "./caso-reale-01";
import { casoReale02StepsPtPT } from "./caso-reale-02";
import { casoReale03StepsPtPT } from "./caso-reale-03";
import { casoReale04StepsPtPT } from "./caso-reale-04";
import { casoReale05StepsPtPT } from "./caso-reale-05";
import { casoReale06StepsPtPT } from "./caso-reale-06";
import { casoReale07StepsPtPT } from "./caso-reale-07";
import { casoReale08StepsPtPT } from "./caso-reale-08";
import { casoReale09StepsPtPT } from "./caso-reale-09";
import { casoReale10StepsPtPT } from "./caso-reale-10";
import { casoReale11StepsPtPT } from "./caso-reale-11";
import { casoReale12StepsPtPT } from "./caso-reale-12";
import { casoReale13StepsPtPT } from "./caso-reale-13";

export const casiRealiPtPT: Record<string, ChapterDef> = {
  "1": { chapterId: "caso-reale-01", title: "A criança que se distrai (6-10)", steps: casoReale01StepsPtPT },
  "2": { chapterId: "caso-reale-02", title: "A criança que não ouve (3-5)", steps: casoReale02StepsPtPT },
  "3": { chapterId: "caso-reale-03", title: "A criança que tem medo (3-5)", steps: casoReale03StepsPtPT },
  "4": { chapterId: "caso-reale-04", title: "A criança que recusa a instrução (3-5)", steps: casoReale04StepsPtPT },
  "5": { chapterId: "caso-reale-05", title: "A criança que não compreende (6-10)", steps: casoReale05StepsPtPT },
  "6": { chapterId: "caso-reale-06", title: "A criança que diz que já sabe fazer (6-10)", steps: casoReale06StepsPtPT },
  "7": { chapterId: "caso-reale-07", title: "A criança que precisa de autonomia (6-10)", steps: casoReale07StepsPtPT },
  "8": { chapterId: "caso-reale-08", title: "O rapaz que erra e se fecha (11-13)", steps: casoReale08StepsPtPT },
  "9": { chapterId: "caso-reale-09", title: "A rapariga que repete o mesmo erro (11-13)", steps: casoReale09StepsPtPT },
  "10": { chapterId: "caso-reale-10", title: "A rapariga que não acredita no resultado (11-13)", steps: casoReale10StepsPtPT },
  "11": { chapterId: "caso-reale-11", title: "O adolescente que executa sem estar presente (14-18)", steps: casoReale11StepsPtPT },
  "12": { chapterId: "caso-reale-12", title: "O adolescente que executa de má vontade (14-18)", steps: casoReale12StepsPtPT },
  "13": { chapterId: "caso-reale-13", title: "O adolescente que quer ser tratado como um adulto (14-18)", steps: casoReale13StepsPtPT },
};
