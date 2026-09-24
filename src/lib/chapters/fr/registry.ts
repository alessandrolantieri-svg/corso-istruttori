import type { ChapterDef } from "@/lib/chapters/types";
import { capitolo1StepsFr } from "./capitolo-1";
import { capitolo2StepsFr } from "./capitolo-2";
import { capitolo3StepsFr } from "./capitolo-3";
import { capitolo4StepsFr } from "./capitolo-4";
import { capitolo5StepsFr } from "./capitolo-5";
import { capitolo6StepsFr } from "./capitolo-6";
import { capitolo7StepsFr } from "./capitolo-7";
import { capitolo8StepsFr } from "./capitolo-8";
import { capitolo9StepsFr } from "./capitolo-9";
import { capitolo10StepsFr } from "./capitolo-10";

// Stesse chiavi e stessi chapterId del registro italiano (src/lib/chapters/registry.ts) — il
// progresso è tracciato per chapterId, indipendente dalla lingua: cambiare lingua a metà
// capitolo non deve perdere lo stato. Cambiano solo title e steps (il testo).
export const chaptersFr: Record<string, ChapterDef> = {
  "1": { chapterId: "capitolo-1", title: "Moi", steps: capitolo1StepsFr },
  "2": { chapterId: "capitolo-2", title: "Qui j'ai en face de moi", steps: capitolo2StepsFr },
  "3": { chapterId: "capitolo-3", title: "Regarder et comprendre", steps: capitolo3StepsFr },
  "4": { chapterId: "capitolo-4", title: "La mise en phase", steps: capitolo4StepsFr },
  "5": { chapterId: "capitolo-5", title: "Le message et la consigne", steps: capitolo5StepsFr },
  "6": { chapterId: "capitolo-6", title: "Le faire agir, et voir si le message est passé", steps: capitolo6StepsFr },
  "7": { chapterId: "capitolo-7", title: "Le retour", steps: capitolo7StepsFr },
  "8": { chapterId: "capitolo-8", title: "Changer de cap", steps: capitolo8StepsFr },
  "9": { chapterId: "capitolo-9", title: "Quand il ne veut pas", steps: capitolo9StepsFr },
  "10": { chapterId: "capitolo-10", title: "Le lâcher-prise", steps: capitolo10StepsFr },
};
