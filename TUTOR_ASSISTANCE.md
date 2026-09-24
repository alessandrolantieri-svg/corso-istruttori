# FASE 8 — risposta autonoma o aiutata dal Tutor

La specifica voice-first (§22) chiede di distinguere `studentAnswer` da `tutorAssistance`, dentro
uno scenario di "Tutor mode" pensato per una compresenza umana mai richiesta in questo progetto.
Direzione confermata dal proprietario: **nessun sistema nuovo di compresenza** — aggancio
all'agente Tutor IA già esistente (`TutorChat`, `/tutor`), registrando solo *se* è stato
consultato prima di una risposta, non un ruolo umano in più.

## Come funziona

Un segnale minimo, vive solo nel browser (`src/lib/tutor/clientSignal.ts`): quando l'istruttore
invia un messaggio al Tutor, si scrive un timestamp in `localStorage`
(`lcg_tutor_last_used`) — **mai il contenuto del messaggio**. Quando una risposta a scelta
multipla viene salvata (`ChapterRunner.setResponse`, unico punto per tutto il corso), si controlla
se quel timestamp è entro gli ultimi 20 minuti: se sì, la risposta viene salvata con
`AssessmentResponse.tutorAssisted = true`.

**Muro 1 resta intatto**: lo spazio Certificazione non legge mai `TutorMessage` (né qui né altrove
nel progetto) — il segnale non nasce da una query su quella tabella, ma da un valore scritto dal
client stesso nel momento dell'invio.

## Perché una finestra temporale, non "dopo l'apertura del capitolo"

Primo tentativo: confrontare l'uso del Tutor con l'istante di montaggio di `ChapterRunner`. Non
funziona per il percorso reale più comune — capitolo → Tutor (pagina separata) → ritorno al
capitolo — perché il ritorno ricarica la pagina e sposta in avanti quell'istante, **dopo** la
consultazione appena fatta: la risposta risulterebbe erroneamente "autonoma". Una finestra
scorrevole di 20 minuti dall'ultimo uso del Tutor non ha questo problema.

## Verificato dal vivo, non solo letto nel codice

Con l'account demo Delfino: un messaggio inviato al Tutor, poi una risposta al test del Capitolo
2 → salvata con `tutorAssisted: 1`. Segnale locale cancellato manualmente (simula "nessun uso
recente"), risposta a una seconda domanda → salvata con `tutorAssisted: 0`. Dati di prova
ripuliti al termine (le due risposte, i tre messaggi di test al Tutor, `currentStep` del capitolo
riportato al valore originale).

## Cosa manca ancora, di proposito

- **Nessuna interfaccia mostra ancora questa distinzione** (Dashboard, Progresso, attestato): oggi
  è solo un dato raccolto, non ancora presentato a nessuno. È lo spazio naturale della FASE 9
  (Analytics) della specifica, non di questa fase.
- **Il segnale non si "consuma"**: un solo uso del Tutor marca come aiutata ogni risposta data nei
  20 minuti successivi, anche su domande diverse da quella per cui è stato chiesto aiuto —
  un'approssimazione dichiarata, non un collegamento vero domanda-per-domanda (che richiederebbe
  sapere di quale domanda si sta parlando nella conversazione, cosa che romperebbe Muro 1).
- **Nessuna pulizia del segnale al logout**: se due account condividessero lo stesso browser a
  meno di 20 minuti di distanza, il secondo potrebbe risultare erroneamente "aiutato" — caso raro
  in questo prodotto (un account per persona), non risolto.
- **Riguarda solo lo spazio Certificazione**: le riflessioni libere (`FreeReflection`) non hanno
  un campo equivalente — la distinzione autonoma/aiutata ha senso solo dove esiste una risposta
  valutabile, non su un pensiero scritto liberamente.
