import type { ChapterDef } from "@/lib/chapters/types";
import { casoReale01Steps } from "./caso-reale-01";
import { casoReale02Steps } from "./caso-reale-02";
import { casoReale03Steps } from "./caso-reale-03";
import { casoReale04Steps } from "./caso-reale-04";
import { casoReale05Steps } from "./caso-reale-05";
import { casoReale06Steps } from "./caso-reale-06";
import { casoReale07Steps } from "./caso-reale-07";
import { casoReale08Steps } from "./caso-reale-08";
import { casoReale09Steps } from "./caso-reale-09";
import { casoReale10Steps } from "./caso-reale-10";
import { casoReale11Steps } from "./caso-reale-11";
import { casoReale12Steps } from "./caso-reale-12";
import { casoReale13Steps } from "./caso-reale-13";

// Chiave = il numero nell'URL (/casi-reali/1 ... /casi-reali/13), valore = definizione dello
// scenario. A differenza dei capitoli e dell'esame, questi scenari non hanno un ordine da
// rispettare — sono materiale richiamabile liberamente, in qualsiasi momento (vedi la nota di
// chiusura in ciascuna fonte in 03_CONTENUTI): nessuno sblocco, nessuna sequenza.
export const casiReali: Record<string, ChapterDef> = {
  "1": { chapterId: "caso-reale-01", title: "Il bambino che si distrae (6-10)", steps: casoReale01Steps },
  "2": { chapterId: "caso-reale-02", title: "Il bambino che non ascolta (3-5)", steps: casoReale02Steps },
  "3": { chapterId: "caso-reale-03", title: "Il bambino che ha paura (3-5)", steps: casoReale03Steps },
  "4": { chapterId: "caso-reale-04", title: "Il bambino che rifiuta la consegna (3-5)", steps: casoReale04Steps },
  "5": { chapterId: "caso-reale-05", title: "Il bambino che non comprende (6-10)", steps: casoReale05Steps },
  "6": { chapterId: "caso-reale-06", title: "Il bambino che dice di sapere già fare (6-10)", steps: casoReale06Steps },
  "7": { chapterId: "caso-reale-07", title: "Il bambino che ha bisogno di autonomia (6-10)", steps: casoReale07Steps },
  "8": { chapterId: "caso-reale-08", title: "Il ragazzo che sbaglia e si chiude (11-13)", steps: casoReale08Steps },
  "9": { chapterId: "caso-reale-09", title: "La ragazza che ripete lo stesso errore (11-13)", steps: casoReale09Steps },
  "10": { chapterId: "caso-reale-10", title: "La ragazza che non si crede il risultato (11-13)", steps: casoReale10Steps },
  "11": { chapterId: "caso-reale-11", title: "L'adolescente che esegue senza esserci (14-18)", steps: casoReale11Steps },
  "12": { chapterId: "caso-reale-12", title: "L'adolescente che esegue di malavoglia (14-18)", steps: casoReale12Steps },
  "13": { chapterId: "caso-reale-13", title: "L'adolescente che vuole essere trattato da adulto (14-18)", steps: casoReale13Steps },
};

export const CASO_NUMS = Object.keys(casiReali).sort((a, b) => Number(a) - Number(b));
