import type { ChapterDef } from "@/lib/chapters/types";
import { capitolo1StepsPtBR } from "./capitolo-1";
import { capitolo2StepsPtBR } from "./capitolo-2";
import { capitolo3StepsPtBR } from "./capitolo-3";
import { capitolo4StepsPtBR } from "./capitolo-4";
import { capitolo5StepsPtBR } from "./capitolo-5";
import { capitolo6StepsPtBR } from "./capitolo-6";
import { capitolo7StepsPtBR } from "./capitolo-7";
import { capitolo8StepsPtBR } from "./capitolo-8";
import { capitolo9StepsPtBR } from "./capitolo-9";
import { capitolo10StepsPtBR } from "./capitolo-10";

// Stesse chiavi e stessi chapterId del registro italiano (src/lib/chapters/registry.ts) — il
// progresso è tracciato per chapterId, indipendente dalla lingua: cambiare lingua a metà
// capitolo non deve perdere lo stato. Cambiano solo title e steps (il testo).
export const chaptersPtBR: Record<string, ChapterDef> = {
  "1": { chapterId: "capitolo-1", title: "Eu", steps: capitolo1StepsPtBR },
  "2": { chapterId: "capitolo-2", title: "Quem tenho na minha frente", steps: capitolo2StepsPtBR },
  "3": { chapterId: "capitolo-3", title: "Olhar e entender", steps: capitolo3StepsPtBR },
  "4": { chapterId: "capitolo-4", title: "A sintonia", steps: capitolo4StepsPtBR },
  "5": { chapterId: "capitolo-5", title: "A mensagem e a instrução", steps: capitolo5StepsPtBR },
  "6": { chapterId: "capitolo-6", title: "Fazer agir, e ver se chegou", steps: capitolo6StepsPtBR },
  "7": { chapterId: "capitolo-7", title: "O retorno", steps: capitolo7StepsPtBR },
  "8": { chapterId: "capitolo-8", title: "Mudar de rumo", steps: capitolo8StepsPtBR },
  "9": { chapterId: "capitolo-9", title: "Quando ela não topa", steps: capitolo9StepsPtBR },
  "10": { chapterId: "capitolo-10", title: "Deixar ir", steps: capitolo10StepsPtBR },
};
