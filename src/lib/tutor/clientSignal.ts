"use client";

// FASE 8 (Tutor mode): distinguere risposta autonoma da risposta aiutata senza collegare lo
// spazio Certificazione allo spazio Mentoring (Muro 1). Qui si ricorda SOLO un timestamp —
// "quando" il Tutor è stato usato l'ultima volta — mai il contenuto della conversazione, e mai
// una lettura di TutorMessage dal server. Il segnale vive solo nel browser, non nel database.
const KEY = "lcg_tutor_last_used";

// Finestra entro cui una risposta conta come "aiutata". Non "dopo l'apertura del capitolo": il
// Tutor vive in una pagina separata (/tutor), quindi il percorso reale è spesso
// capitolo → Tutor → torna al capitolo — un ritorno ricarica la pagina e un confine legato al
// montaggio del componente perderebbe proprio l'uso appena fatto. Una finestra scorrevole non ha
// questo problema. 20 minuti: abbastanza per "sto ancora lavorando su questo", non così ampio da
// etichettare come aiutata una risposta data molto più tardi.
const ASSIST_WINDOW_MS = 20 * 60 * 1000;

export function markTutorUsed(): void {
  try {
    localStorage.setItem(KEY, String(Date.now()));
  } catch {
    // Storage non disponibile (es. navigazione privata): nessuna risposta verrà mai segnata come
    // aiutata in questo caso — degradazione silenziosa, non un errore per lo studente.
  }
}

export function wasTutorUsedRecently(windowMs: number = ASSIST_WINDOW_MS): boolean {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return false;
    return Date.now() - Number(raw) <= windowMs;
  } catch {
    return false;
  }
}
