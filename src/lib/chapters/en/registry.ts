import type { ChapterDef } from "@/lib/chapters/types";
import { capitolo1StepsEn } from "./capitolo-1";
import { capitolo2StepsEn } from "./capitolo-2";
import { capitolo3StepsEn } from "./capitolo-3";
import { capitolo4StepsEn } from "./capitolo-4";
import { capitolo5StepsEn } from "./capitolo-5";
import { capitolo6StepsEn } from "./capitolo-6";
import { capitolo7StepsEn } from "./capitolo-7";
import { capitolo8StepsEn } from "./capitolo-8";
import { capitolo9StepsEn } from "./capitolo-9";
import { capitolo10StepsEn } from "./capitolo-10";

// Stesse chiavi e stessi chapterId del registro italiano (src/lib/chapters/registry.ts) — il
// progresso è tracciato per chapterId, indipendente dalla lingua: cambiare lingua a metà
// capitolo non deve perdere lo stato. Cambiano solo title e steps (il testo).
export const chaptersEn: Record<string, ChapterDef> = {
  "1": { chapterId: "capitolo-1", title: "Me", steps: capitolo1StepsEn },
  "2": { chapterId: "capitolo-2", title: "Who's in Front of Me", steps: capitolo2StepsEn },
  "3": { chapterId: "capitolo-3", title: "Watching and Understanding", steps: capitolo3StepsEn },
  "4": { chapterId: "capitolo-4", title: "Rapport", steps: capitolo4StepsEn },
  "5": { chapterId: "capitolo-5", title: "The Message and the Instruction", steps: capitolo5StepsEn },
  "6": { chapterId: "capitolo-6", title: "Getting Them to Act, and Seeing If It Landed", steps: capitolo6StepsEn },
  "7": { chapterId: "capitolo-7", title: "The Feedback", steps: capitolo7StepsEn },
  "8": { chapterId: "capitolo-8", title: "Changing Course", steps: capitolo8StepsEn },
  "9": { chapterId: "capitolo-9", title: "When They Say No", steps: capitolo9StepsEn },
  "10": { chapterId: "capitolo-10", title: "Letting Go", steps: capitolo10StepsEn },
};
