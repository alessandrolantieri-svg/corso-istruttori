import type { ChapterDef } from "@/lib/chapters/types";
import { casoReale01StepsEn } from "./caso-reale-01";
import { casoReale02StepsEn } from "./caso-reale-02";
import { casoReale03StepsEn } from "./caso-reale-03";
import { casoReale04StepsEn } from "./caso-reale-04";
import { casoReale05StepsEn } from "./caso-reale-05";
import { casoReale06StepsEn } from "./caso-reale-06";
import { casoReale07StepsEn } from "./caso-reale-07";
import { casoReale08StepsEn } from "./caso-reale-08";
import { casoReale09StepsEn } from "./caso-reale-09";
import { casoReale10StepsEn } from "./caso-reale-10";
import { casoReale11StepsEn } from "./caso-reale-11";
import { casoReale12StepsEn } from "./caso-reale-12";
import { casoReale13StepsEn } from "./caso-reale-13";

// Stesse chiavi/chapterId del registro italiano — vedi la nota in chapters/en/registry.ts.
export const casiRealiEn: Record<string, ChapterDef> = {
  "1": { chapterId: "caso-reale-01", title: "The Child Who Gets Distracted (6-10)", steps: casoReale01StepsEn },
  "2": { chapterId: "caso-reale-02", title: "The Child Who Doesn't Listen (3-5)", steps: casoReale02StepsEn },
  "3": { chapterId: "caso-reale-03", title: "The Child Who's Afraid (3-5)", steps: casoReale03StepsEn },
  "4": { chapterId: "caso-reale-04", title: "The Child Who Refuses the Instruction (3-5)", steps: casoReale04StepsEn },
  "5": { chapterId: "caso-reale-05", title: "The Child Who Doesn't Understand (6-10)", steps: casoReale05StepsEn },
  "6": { chapterId: "caso-reale-06", title: "The Child Who Says He Already Knows How (6-10)", steps: casoReale06StepsEn },
  "7": { chapterId: "caso-reale-07", title: "The Child Who Needs Autonomy (6-10)", steps: casoReale07StepsEn },
  "8": { chapterId: "caso-reale-08", title: "The Boy Who Fails and Shuts Down (11-13)", steps: casoReale08StepsEn },
  "9": { chapterId: "caso-reale-09", title: "The Girl Who Repeats the Same Mistake (11-13)", steps: casoReale09StepsEn },
  "10": { chapterId: "caso-reale-10", title: "The Girl Who Doesn't Believe Her Result (11-13)", steps: casoReale10StepsEn },
  "11": { chapterId: "caso-reale-11", title: "The Teenager Who Goes Through the Motions (14-18)", steps: casoReale11StepsEn },
  "12": { chapterId: "caso-reale-12", title: "The Teenager Who Complies Reluctantly (14-18)", steps: casoReale12StepsEn },
  "13": {
    chapterId: "caso-reale-13",
    title: "The Teenager Who Wants to Be Treated Like an Adult (14-18)",
    steps: casoReale13StepsEn,
  },
};
