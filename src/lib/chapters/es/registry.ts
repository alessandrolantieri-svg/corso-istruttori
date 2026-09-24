import type { ChapterDef } from "@/lib/chapters/types";
import { capitolo1StepsEs } from "./capitolo-1";
import { capitolo2StepsEs } from "./capitolo-2";
import { capitolo3StepsEs } from "./capitolo-3";
import { capitolo4StepsEs } from "./capitolo-4";
import { capitolo5StepsEs } from "./capitolo-5";
import { capitolo6StepsEs } from "./capitolo-6";
import { capitolo7StepsEs } from "./capitolo-7";
import { capitolo8StepsEs } from "./capitolo-8";
import { capitolo9StepsEs } from "./capitolo-9";
import { capitolo10StepsEs } from "./capitolo-10";

// Stesse chiavi e stessi chapterId del registro italiano (src/lib/chapters/registry.ts) — il
// progresso è tracciato per chapterId, indipendente dalla lingua: cambiare lingua a metà
// capitolo non deve perdere lo stato. Cambiano solo title e steps (il testo).
export const chaptersEs: Record<string, ChapterDef> = {
  "1": { chapterId: "capitolo-1", title: "Yo", steps: capitolo1StepsEs },
  "2": { chapterId: "capitolo-2", title: "Quién tengo delante", steps: capitolo2StepsEs },
  "3": { chapterId: "capitolo-3", title: "Mirar y entender", steps: capitolo3StepsEs },
  "4": { chapterId: "capitolo-4", title: "La sintonía", steps: capitolo4StepsEs },
  "5": { chapterId: "capitolo-5", title: "El mensaje y la instrucción", steps: capitolo5StepsEs },
  "6": { chapterId: "capitolo-6", title: "Hacerlo actuar, y ver si llegó", steps: capitolo6StepsEs },
  "7": { chapterId: "capitolo-7", title: "La respuesta", steps: capitolo7StepsEs },
  "8": { chapterId: "capitolo-8", title: "Cambiar de rumbo", steps: capitolo8StepsEs },
  "9": { chapterId: "capitolo-9", title: "Cuando no quiere", steps: capitolo9StepsEs },
  "10": { chapterId: "capitolo-10", title: "Dejar ir", steps: capitolo10StepsEs },
};
