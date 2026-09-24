import type { ChapterDef } from "@/lib/chapters/types";
import { casoReale01StepsPtBR } from "./caso-reale-01";
import { casoReale02StepsPtBR } from "./caso-reale-02";
import { casoReale03StepsPtBR } from "./caso-reale-03";
import { casoReale04StepsPtBR } from "./caso-reale-04";
import { casoReale05StepsPtBR } from "./caso-reale-05";
import { casoReale06StepsPtBR } from "./caso-reale-06";
import { casoReale07StepsPtBR } from "./caso-reale-07";
import { casoReale08StepsPtBR } from "./caso-reale-08";
import { casoReale09StepsPtBR } from "./caso-reale-09";
import { casoReale10StepsPtBR } from "./caso-reale-10";
import { casoReale11StepsPtBR } from "./caso-reale-11";
import { casoReale12StepsPtBR } from "./caso-reale-12";
import { casoReale13StepsPtBR } from "./caso-reale-13";

export const casiRealiPtBR: Record<string, ChapterDef> = {
  "1": { chapterId: "caso-reale-01", title: "A criança que se distrai (6-10)", steps: casoReale01StepsPtBR },
  "2": { chapterId: "caso-reale-02", title: "A criança que não escuta (3-5)", steps: casoReale02StepsPtBR },
  "3": { chapterId: "caso-reale-03", title: "A criança que tem medo (3-5)", steps: casoReale03StepsPtBR },
  "4": { chapterId: "caso-reale-04", title: "A criança que recusa a instrução (3-5)", steps: casoReale04StepsPtBR },
  "5": { chapterId: "caso-reale-05", title: "A criança que não entende (6-10)", steps: casoReale05StepsPtBR },
  "6": { chapterId: "caso-reale-06", title: "A criança que diz que já sabe fazer (6-10)", steps: casoReale06StepsPtBR },
  "7": { chapterId: "caso-reale-07", title: "A criança que precisa de autonomia (6-10)", steps: casoReale07StepsPtBR },
  "8": { chapterId: "caso-reale-08", title: "O garoto que erra e se fecha (11-13)", steps: casoReale08StepsPtBR },
  "9": { chapterId: "caso-reale-09", title: "A garota que repete o mesmo erro (11-13)", steps: casoReale09StepsPtBR },
  "10": { chapterId: "caso-reale-10", title: "A garota que não acredita no próprio resultado (11-13)", steps: casoReale10StepsPtBR },
  "11": { chapterId: "caso-reale-11", title: "O adolescente que executa sem estar presente (14-18)", steps: casoReale11StepsPtBR },
  "12": { chapterId: "caso-reale-12", title: "A adolescente que executa de má vontade (14-18)", steps: casoReale12StepsPtBR },
  "13": { chapterId: "caso-reale-13", title: "O adolescente que quer ser tratado como um adulto (14-18)", steps: casoReale13StepsPtBR },
};
