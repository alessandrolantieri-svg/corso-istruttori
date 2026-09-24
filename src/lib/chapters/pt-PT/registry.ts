import type { ChapterDef } from "@/lib/chapters/types";
import { capitolo1StepsPtPT } from "./capitolo-1";
import { capitolo2StepsPtPT } from "./capitolo-2";
import { capitolo3StepsPtPT } from "./capitolo-3";
import { capitolo4StepsPtPT } from "./capitolo-4";
import { capitolo5StepsPtPT } from "./capitolo-5";
import { capitolo6StepsPtPT } from "./capitolo-6";
import { capitolo7StepsPtPT } from "./capitolo-7";
import { capitolo8StepsPtPT } from "./capitolo-8";
import { capitolo9StepsPtPT } from "./capitolo-9";
import { capitolo10StepsPtPT } from "./capitolo-10";

// Stesse chiavi e stessi chapterId del registro italiano (src/lib/chapters/registry.ts) — il
// progresso è tracciato per chapterId, indipendente dalla lingua: cambiare lingua a metà
// capitolo non deve perdere lo stato. Cambiano solo title e steps (il testo).
export const chaptersPtPT: Record<string, ChapterDef> = {
  "1": { chapterId: "capitolo-1", title: "Eu", steps: capitolo1StepsPtPT },
  "2": { chapterId: "capitolo-2", title: "Quem tenho à minha frente", steps: capitolo2StepsPtPT },
  "3": { chapterId: "capitolo-3", title: "Olhar e compreender", steps: capitolo3StepsPtPT },
  "4": { chapterId: "capitolo-4", title: "A sintonia", steps: capitolo4StepsPtPT },
  "5": { chapterId: "capitolo-5", title: "A mensagem e a instrução", steps: capitolo5StepsPtPT },
  "6": { chapterId: "capitolo-6", title: "Fazê-lo agir, e ver se chegou", steps: capitolo6StepsPtPT },
  "7": { chapterId: "capitolo-7", title: "O feedback", steps: capitolo7StepsPtPT },
  "8": { chapterId: "capitolo-8", title: "Mudar de rumo", steps: capitolo8StepsPtPT },
  "9": { chapterId: "capitolo-9", title: "Quando não quer saber", steps: capitolo9StepsPtPT },
  "10": { chapterId: "capitolo-10", title: "Deixar ir", steps: capitolo10StepsPtPT },
};
