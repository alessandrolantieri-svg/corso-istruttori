# Accessibilità — FASE 2 (voice-first / accessibility-first)

Stato dell'accessibilità dell'app dopo la FASE 2 della specifica tecnica "Sistema Corso
Multilingua — Voice-First + Accessibility-First". Vedi `01_ANALISI/ARCHITECTURE_REPORT.md`
(FASE 1) per l'audit che ha preceduto questo lavoro.

## Cosa c'è, oggi

**Struttura semantica**: ogni pagina ha `<header>` (testata/wordmark), `<main>` (contenuto) e,
dove ci sono comandi di navigazione, `<nav aria-label="…">` (`FootBar`, il piè di pagina
indietro/continua di capitoli/esame/Casi Reali). Sulle domande a scelta multipla, le opzioni sono
`<label><input type="radio"></label>` reali, non `<div onClick>` — navigabili da tastiera senza
JavaScript aggiuntivo.

**Focus da tastiera**:
- Un solo anello doppio (bianco + ink) per `:focus-visible`, non un colore piatto — un contorno a
  tinta unica sparisce quando il controllo è già sullo stesso colore dello sfondo (es. i bottoni
  sulla testata colorata dei capitoli). L'anello doppio resta visibile su qualunque sfondo.
- Cambiando passo in un capitolo/esame/Caso Reale, il focus si sposta sul nuovo contenuto
  (`ChapterRunner`, `mainRef.current.focus()`) — senza, il focus resterebbe su un bottone rimosso
  dal DOM e chi usa uno screen reader non saprebbe che la pagina è cambiata. Non succede al primo
  caricamento, solo ai cambi di passo successivi.
- Le due schede della Dashboard (`DashboardTabs`) seguono il pattern ARIA "tablist" con
  attivazione automatica: le frecce sinistra/destra spostano insieme focus e selezione fra le due
  schede, non solo il Tab.

**Annunci per chi usa uno screen reader** (`aria-live`): la conversazione col Tutor
(`role="log"`, ogni nuovo messaggio annunciato), il consiglio del giorno dell'Orchestratore, il
feedback delle riflessioni, il riepilogo del Progresso — tutti gli agenti IA rispondono in modo
asincrono, e senza `aria-live` chi non vede lo schermo non saprebbe mai che una risposta è
arrivata. L'errore di login usa `role="alert"`.

**`<html lang>` dinamico**: corretto durante l'audit (era fisso su "it", non seguiva la lingua
scelta — con sei lingue attive uno screen reader avrebbe sempre pronunciato in italiano).

**Modalità ipovedente**: un interruttore vero (`AccessibilityToggle`, cookie `lcg_a11y`, stesso
schema del cookie di lingua — nessun JavaScript richiesto per attivarla) presente sul login e
sulla Dashboard. Attiva: testo di base più grande (18px invece di 16px, tutto il resto in
em/rem segue), bordi più spessi, bersagli tattili più grandi, più respiro fra i blocchi, testo
secondario più contrastato, animazione di comparsa disattivata, anello di focus ancora più
grande. **Non tolgo bordi o ombre**: per chi vede poco aiutano a distinguere un elemento
dall'altro, non sono decorazione da rimuovere (scelta esplicita, coerente col §18 della
specifica).

**Zoom**: nessun blocco — l'app non ha mai impostato `maximum-scale`/`user-scalable=no`, lo zoom
nativo del browser ha sempre funzionato. Verificato durante l'audit, non serviva una correzione.

## Cosa NON c'è ancora, di proposito

- **Nessun test con uno screen reader vero** (NVDA/VoiceOver) — solo verifica del codice e della
  struttura DOM/ARIA. Andrebbe fatto prima di considerare la FASE 2 davvero chiusa.
- **Il feedback dentro i singoli passi** (la spiegazione che compare sotto un'opzione appena
  scelta, dentro ogni capitolo/esame/Caso Reale) non ha `aria-live` — è dentro centinaia di file
  di contenuto per sei lingue, non nei quattro componenti condivisi. È comunque leggibile (compare
  nella stessa vista, non serve navigare altrove), solo non annunciato in automatico. Rimandato,
  non dimenticato.
- **La pagina attestato** non è ancora tradotta in nessuna lingua (testo fisso in italiano, gap
  pre-esistente non legato all'accessibilità) — le landmark semantiche ci sono, il resto no.
- **"Voce sempre disponibile"** (§18 della specifica, dentro la modalità ipovedente) — non
  esiste ancora nessun motore vocale (FASE 3). La modalità ipovedente di oggi è solo visiva.

## Verificato

- `npx tsc --noEmit` pulito.
- `npx eslint src` pulito (compreso un problema di apostrofi non gestiti trovato per caso in
  cinque file francesi già esistenti, corretto nello stesso giro).
- Dal vivo nel browser: struttura header/main/nav/tablist/tabpanel confermata via DOM, modalità
  ipovedente attivabile e persistente dopo ricarica, cambio-scheda da tastiera verificato con un
  evento nativo (il tool di test automatico di questa sessione ha un bug proprio suo sui tasti
  freccia — non nel codice, confermato disegnando l'evento a mano).
