import type { ChapterDef } from "./types";
import { capitolo1Steps } from "./capitolo-1";
import { capitolo2Steps } from "./capitolo-2";
import { capitolo3Steps } from "./capitolo-3";
import { capitolo4Steps } from "./capitolo-4";
import { capitolo5Steps } from "./capitolo-5";
import { capitolo6Steps } from "./capitolo-6";
import { capitolo7Steps } from "./capitolo-7";
import { capitolo8Steps } from "./capitolo-8";
import { capitolo9Steps } from "./capitolo-9";
import { capitolo10Steps } from "./capitolo-10";

// Chiave = il numero nell'URL (/capitoli/1 ... /capitoli/10), valore = definizione del capitolo.
// Ogni capitolo aggiunto scala qui, non nella pagina — la pagina resta generica.
export const chapters: Record<string, ChapterDef> = {
  "1": { chapterId: "capitolo-1", title: "Io", steps: capitolo1Steps },
  "2": { chapterId: "capitolo-2", title: "Chi ho davanti", steps: capitolo2Steps },
  "3": { chapterId: "capitolo-3", title: "Guardare e capire", steps: capitolo3Steps },
  "4": { chapterId: "capitolo-4", title: "La sintonia", steps: capitolo4Steps },
  "5": { chapterId: "capitolo-5", title: "Il messaggio e la consegna", steps: capitolo5Steps },
  "6": { chapterId: "capitolo-6", title: "Farlo agire, e vedere se è arrivato", steps: capitolo6Steps },
  "7": { chapterId: "capitolo-7", title: "Il ritorno", steps: capitolo7Steps },
  "8": { chapterId: "capitolo-8", title: "Cambiare strada", steps: capitolo8Steps },
  "9": { chapterId: "capitolo-9", title: "Quando non ci sta", steps: capitolo9Steps },
  "10": { chapterId: "capitolo-10", title: "Lasciarlo andare", steps: capitolo10Steps },
};

export const CHAPTER_NUMS = Object.keys(chapters).sort((a, b) => Number(a) - Number(b));
