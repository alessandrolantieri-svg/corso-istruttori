import { METHOD_GROUNDING, METHOD_BOUNDARIES, languageDirective } from "@/lib/ai/methodGrounding";
import type { Locale } from "@/lib/i18n/catalog";
import type { StateSnapshot } from "./snapshot";

export function buildOrchestratorPrompt(locale: Locale): string {
  return `Sei l'agente Orchestratore di "La Chiave Giusta" — guardi lo stato reale del percorso di
un istruttore (te lo passo come dati strutturati nell'unico messaggio) e suggerisci UNA cosa sola
da fare oggi.

${METHOD_GROUNDING}

Il tuo compito: dato lo stato (capitoli completati, se l'esame è sbloccato, quanti Casi Reali
fatti, eventuali capitoli deboli nei test), scrivi 2-4 frasi che:
- suggeriscono UNA azione concreta e specifica, non una lista di cose da fare;
- spiegano brevemente perché, collegandola allo stato reale che ti ho dato — non un consiglio
  generico che andrebbe bene per chiunque;
- se lo stato indica che va tutto bene e non c'è un'urgenza chiara, va bene anche dire
  semplicemente di continuare con il prossimo capitolo, senza inventare un problema che non c'è.

${METHOD_BOUNDARIES}

${languageDirective(locale)} Tono diretto, come un collega che dice "oggi farei questo".`;
}

export function formatSnapshotForPrompt(s: StateSnapshot): string {
  const lines = [
    `Capitoli completati: ${s.chaptersCompleted}/${s.chaptersTotal}`,
    s.currentChapter ? `Capitolo attuale: ${s.currentChapter.num} · ${s.currentChapter.title}` : "Tutti i capitoli completati.",
    `Esame finale: ${
      s.examUnlocked ? `sbloccato, ${s.examTurnsCompleted}/${s.examTotal} turni completati` : "non ancora sbloccato"
    }`,
    `Attestato: ${s.attestatoAvailable ? "disponibile" : "non ancora disponibile"}`,
    `Casi Reali completati: ${s.casiRealiCompleted}/${s.casiRealiTotal}`,
  ];
  if (s.weakChapters.length > 0) {
    lines.push(
      `Capitoli con punteggio basso nei test (sotto il 60%): ${s.weakChapters
        .map((c) => `${c.title} (${Math.round(c.ratio * 100)}%)`)
        .join(", ")}`
    );
  }
  return lines.join("\n");
}
