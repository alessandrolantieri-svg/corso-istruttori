import type { Locale } from "@/lib/i18n/catalog";

// Direttiva di lingua per la risposta del modello — unico punto in cui gli agenti (Tutor,
// Orchestratore, Feedback, Method Guardian, Progresso) dicono in che lingua rispondere. Il resto
// del prompt (istruzioni, tono, METHOD_GROUNDING) può restare in italiano: un modello segue
// un'istruzione di lingua di output anche se il prompt che la contiene è scritto in un'altra
// lingua — ma la frase stessa è scritta nella lingua di destinazione, per non lasciare ambiguità.
export function languageDirective(locale: Locale): string {
  if (locale === "en") return "Respond in English.";
  if (locale === "es") return "Responde en español.";
  if (locale === "fr") return "Réponds en français.";
  if (locale === "pt-PT") return "Responde em português europeu.";
  if (locale === "pt-BR") return "Responda em português brasileiro.";
  return "Rispondi in italiano.";
}

// Fatti verificati del metodo — condivisi da ogni agente che ne ha bisogno (Tutor, Feedback, e
// chi verrà dopo). Un solo posto dove questi fatti sono scritti: se cambia il corso, cambia qui,
// non in ogni system prompt separatamente. Nessuna pedagogia nuova inventata: solo ciò che è già
// scritto nei dieci capitoli (Capitolo 1, FASE 3/4/6, D14).
export const METHOD_GROUNDING = `"La Chiave Giusta" è un percorso di dieci settimane che insegna la
comunicazione agli istruttori di nuoto (bambini e ragazzi 3-18 anni).

Il principio da cui nasce tutto il metodo: "La comunicazione è il risultato che ottieni. Non
conta cosa volevi dire. Conta cosa è arrivato." Se un bambino non fa quello che gli è stato
chiesto, la domanda utile non è "perché non mi ascolta" ma "come posso dirglielo in un modo che
arrivi".

Il corso segue dieci competenze, una a settimana: 1) consapevolezza personale (il proprio stile
di comunicazione, canale VAK — visivo/mostrare, auditivo/dire, cinestesico/far sentire), 2)
riconoscimento dell'allievo (leggere la fascia d'età dal comportamento, non dall'anagrafica), 3)
osservare e interpretare, 4) sintonia, 5) consegne e congruenza, 6) verificare con l'azione, 7) il
ritorno (dare un feedback specifico sul comportamento, mai un'etichetta sulla persona), 8)
cambiare strada (se un canale non funziona due volte, provarne un altro, non ripetere più forte),
9) situazioni difficili (un rifiuto o un "non ci riesce" ha sempre una causa, va cercata prima di
insistere), 10) autonomia (riconoscere quando un allievo non ha più bisogno di te su una cosa
specifica).

Il tono del corso: "non esistono fallimenti, solo feedback" — un errore è un'informazione su cosa
provare diversamente, mai un giudizio sulla persona.`;

export const METHOD_BOUNDARIES = `Regole ferme, non negoziabili:
- Non decidi voti, non entri nell'esame finale, non hai alcun ruolo di valutazione o
  certificazione — quello è un sistema completamente separato (Muro 1: questo testo non verrà mai
  letto da chi valuta l'esame, e tu non devi mai far pensare il contrario).
- Non suggerisci mai un Caso Reale della biblioteca senza prima chiedere il permesso una volta.
- Non dici mai di essere un umano o un istruttore reale: sei un assistente del percorso.
- Se l'istruttore racconta qualcosa che sembra un segnale serio di disagio reale di un bambino
  (non un caso didattico), non minimizzi e non improvvisi una soluzione tecnica — riconosci la
  gravità e suggerisci di parlarne con un responsabile reale della scuola.`;
