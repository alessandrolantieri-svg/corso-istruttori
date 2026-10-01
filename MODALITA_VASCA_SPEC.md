# Modalità Vasca — Specifica funzionale

> Prototipo di riferimento (Design canvas, non codice di produzione): https://claude.ai/artifact/GdE1h2p3jtjHqcicyRruqf
> Questo documento descrive COSA deve fare la "Modalità Vasca" di PoolFlow e con quali regole esatte, perché venga implementata nell'app reale (Next.js, repo `corso-istruttori`). Non è un redesign estetico: è la vista operativa che l'istruttore usa a bordo vasca, mentre segue il cliente in acqua.

## 1. Obiettivo di prodotto

L'istruttore non può stare a leggere/navigare il telefono mentre lavora: deve restare concentrato sul cliente in acqua. La UI deve quindi essere:

- **Veloce da leggere a colpo d'occhio** — testo grande, massimo 1-2 informazioni per schermata alla volta.
- **Utilizzabile con una mano/pollice**, spesso con le mani bagnate: target di tocco grandi (minimo ~50px, i pulsanti primari 76-84px di altezza).
- **Completa, non impoverita**: "ottimizzare" non significa togliere funzioni, significa navigazione veloce e comprensiva che porta comunque a un risultato certo. Tutte le sezioni dell'app restano raggiungibili in 1 tap dalla bottom nav.
- **Senza popup/modali bloccanti.** Tutto lo stato vive nella schermata.

## 2. Navigazione principale (bottom nav, sempre visibile)

5 tab fisse, icona + etichetta, tab attiva in ciano (`#4FD1E8`), le altre in grigio (`#7E92A8`):

1. **Oggi** (Home) — cosa fare adesso
2. **Clienti** — elenco clienti, azioni rapide
3. **Calendario** — agenda mensile
4. **Progressi** — storico e record personali per cliente
5. **Impostazioni**

La bottom nav NON è presente nelle schermate di flusso a schermo intero senza possibilità di distrazione: Lezione live (Main), Allenamento in corso (cronometro), Timer recupero, Fine lezione. In quelle schermate l'unica via d'uscita è il link "Indietro"/"Torna alla lezione" in alto o il flusso stesso che porta avanti.

## 3. Concetto chiave: Lezione ≠ Allenamento

Questa distinzione è il cuore del modello:

| | **Allenamento** | **Lezione** |
|---|---|---|
| Cosa misura | **Dove sta ora** il cliente: un test a tempo secco su uno stile+distanza | Il lavoro tecnico per **migliorare**: esercizi/drills organizzati in blocchi |
| Struttura | Scelta stile+distanza → cronometro VIA/FINE → risultato confrontato col record precedente | Sequenza fissa di blocchi (riscaldamento, blocchi tecnici con ripetute, defaticamento) |
| Output | Un tempo secco, confrontato con lo storico, che aggiorna il record personale di quello stile+distanza | Tempi di ogni ripetuta/serie, usati per valutare l'andamento dell'esercizio, non necessariamente un record |
| A cosa serve | Fotografare il livello attuale → feed per Progressi/record personali | Allenare in modo mirato, idealmente deciso guardando i risultati dell'Allenamento |

**Relazione tra i due**: l'Allenamento fornisce il dato oggettivo ("è a 1:34.2 sui 100 SL"); la Lezione è il lavoro che l'istruttore costruisce di conseguenza per migliorare quel dato. Non sono due modi diversi di fare la stessa cosa: sono due fasi diverse del ciclo coaching (misura → allena → rimisura).

**Punti di accesso all'Allenamento** (deve essere raggiungibile da tutti e tre, non solo da Home):
- Home → card "prossima lezione": due pulsanti affiancati, "Lezione" (primario, ciano) e "Allenamento" (secondario, outline)
- Clienti → ogni card cliente ha due pulsanti affiancati: "Lezione →" e "Allenamento"
- Calendario → la card della lezione del giorno selezionato ha gli stessi due pulsanti affiancati

## 3bis. Piano personalizzato — cliente che ha già un proprio programma

Alcuni clienti arrivano con un programma già pronto (scritto altrove, da un altro istruttore, da un piano precedente). Per loro **il sistema non deve costruire né calcolare nulla**: si incolla il testo del programma e si usa così com'è.

- **Quando si chiede**: alla creazione di un nuovo cliente ("Nuovo cliente"), una domanda: **"Hai già un tuo programma?"**
  - **No** → flusso normale: il piano per quel cliente viene costruito a blocchi (sequenza di blocchi come in 5.2/6), come per tutti gli altri clienti.
  - **Sì** → campo di testo libero ("Incolla qui il tuo programma"), pulsante "Salva". Il testo viene salvato esattamente come incollato, nessun parsing/struttura.
- **Non è una scelta per singola lezione**: è un attributo del cliente, impostato una volta alla creazione (un cambio successivo — es. passare da piano personalizzato a piano a blocchi — è un'azione di gestione cliente, fuori dallo scope di questo prototipo "a bordo vasca").
- **Effetto su Piano (5.3)**: se il cliente ha un piano personalizzato, questa schermata mostra il testo incollato così com'è (scrollabile), invece della lista di blocchi.
- **Effetto su Lezione live (5.2 — Main)**: se il cliente ha un piano personalizzato, Main **non genera blocchi né segmenti automatici** — non esiste una sequenza strutturata da cui calcolare `segmentoPer`, lap, serie. Main mostra il testo del programma come riferimento in alto e un cronometro semplice che l'istruttore avvia/pausa/segna manualmente guardando il testo; nessun calcolo automatico di LAP/FINE, nessun raggruppamento in serie. Tutto il resto della sezione 5.2 (motore a blocchi, lap, serie, "il migliore") si applica solo ai clienti con piano a blocchi generato dall'app.
- **Allenamento (5.6) non cambia**: il test a tempo secco (stile+distanza, confronto record) resta identico e disponibile per **tutti** i clienti, con o senza piano personalizzato — è un concetto indipendente dal Piano/Lezione (vedi tabella sezione 3), quindi non va confuso con questa funzione.

## 4. Design system

- **Palette**: sfondo `#0D1B2E`, superficie card `#15273F`, bordo `#1E3A58`, accento ciano `#4FD1E8` (azioni primarie/stato attivo), successo verde `#34D399`, attenzione arancio `#FB923C`, testo muted su 3 livelli `#9FB3C8` / `#7E92A8` / `#6B8099`, testo principale bianco `#FFFFFF`.
- **Font**: Manrope (500/700/800). Nessun altro font.
- **Niente emoji**: icone SVG a tratto (stroke), stile outline coerente in tutta l'app.
- **Niente gradient wash, niente card con bordo colorato a sinistra** (evitare "tropi da AI").
- **Elementi reali**: `<button>`/`<a>` veri, `<input>`+`<label>`, mai `<div onClick>` per azioni.
- **Touch target**: pulsanti secondari ≥ 48-56px di altezza, pulsanti primari/azioni critiche 76-84px.
- **Frame di riferimento**: mobile, 390×844 (iPhone-size), bottom nav alta 82px.

## 5. Schermate

### 5.1 Oggi (Home)
- Saluto + data.
- Card "prossima lezione" del cliente più imminente: nome, orario, durata, corsia.
- Due pulsanti affiancati: **Lezione** (va al flusso Main/lezione live) · **Allenamento** (va al flusso test).
- Link secondario "Vedi il piano della lezione" → schermata Piano (sola lettura, lista blocchi).
- Lista "Anche oggi" con gli altri appuntamenti della giornata.

### 5.2 Lezione live (Main) — il cuore dell'app

La lezione è una sequenza fissa di blocchi. Esempio di struttura reale (6 blocchi):

```js
blocchi = [
  { titolo: 'Riscaldamento',        categoria: null, stile: 'MISTO',         distanza: '300m', target: 1, libero: true  },
  { titolo: 'Blocco 1 · Tecnica',   categoria: 'A2', stile: 'STILE LIBERO',  distanza: '50m',  target: 6, libero: false },
  { titolo: 'Blocco 2 · Soglia',    categoria: 'C1', stile: 'STILE LIBERO',  distanza: '100m', target: 4, libero: false },
  { titolo: 'Blocco 3 · Velocità',  categoria: 'C3', stile: 'STILE LIBERO',  distanza: '25m',  target: 8, libero: false },
  { titolo: 'Blocco 4 · Resistenza',categoria: 'B1', stile: 'STILE LIBERO',  distanza: '200m', target: 3, libero: false },
  { titolo: 'Defaticamento',        categoria: null, stile: 'MISTO',         distanza: '200m', target: 1, libero: true  },
]
```

Ogni blocco ha `target` ripetute da fare (es. Blocco 1 = 6 × 50m).

**Blocco libero** (Riscaldamento / Defaticamento): **nessun cronometro, nessun timer, nessun recupero**. È nuoto libero. Schermata = titolo blocco + distanza + nota, un solo pulsante "COMPLETATO →" che passa al blocco successivo.

**Blocco strutturato** (tutti gli altri): cronometro con registrazione lap automatica.

#### Regola dei segmenti (lap) — DEVE essere rispettata esattamente

La distanza del LAP intermedio dipende dalla distanza **della singola ripetuta**, non dal volume totale del blocco:

```js
function segmentoPer(distanzaRipetuta) {
  if (distanzaRipetuta <= 100) return 25;   // ripetute di 50m/100m → lap ogni 25m
  if (distanzaRipetuta <= 400) return 50;   // ripetute di 200m/400m → lap ogni 50m
  return 100;                                // ripetute ≥ 800/1500m → lap ogni 100m
}
```

Esempi concreti:
- Ripetuta da **50m** → 1 LAP a 25m, poi FINE a 50m.
- Ripetuta da **100m** → LAP a 25/50/75m, poi FINE a 100m.
- Ripetuta da **200m** → LAP a 50/100/150m, poi FINE a 200m.
- Ripetuta da **1500m** → LAP ogni 100m, poi FINE a 1500m.

Il pulsante del cronometro mostra sempre **"LAP {prossima distanza}m"**, tranne sull'ultimo segmento della ripetuta dove mostra **"FINE {distanza totale}m"**.

#### Raggruppamento per serie (ripetuta) — NON un flusso piatto

I lap **non** sono una lista unica continua: sono raggruppati per ripetuta ("serie"). Esempio per un blocco **6×50m**:

```
Serie 1 — LAP 25m / FINE 50m
Serie 2 — LAP 25m / FINE 50m
Serie 3 — LAP 25m / FINE 50m
...fino a Serie 6
```

Modello dati:
```js
serie = [
  { segmenti: ['0:13.2'], finale: '0:28.4' },   // serie 1 completata
  { segmenti: ['0:14.0'], finale: null },         // serie 2 in corso (solo il lap intermedio registrato)
  ...
]
```

Al tap sul pulsante:
- se **non** è l'ultimo segmento → push in `segmenti` della serie corrente, il cronometro si azzera e continua a correre, si passa al segmento successivo.
- se **è** l'ultimo segmento → si scrive `finale` sulla serie corrente; se ci sono altre ripetute da fare, si apre una nuova serie vuota e il cronometro riparte da zero in automatico (resta `running`); se era l'ultima ripetuta, il cronometro si ferma e si mostra il pulsante "CHIUDI ESERCIZIO →".

**"Annulla ultimo"**: deve poter tornare indietro di un singolo lap, anche attraversando il confine tra due serie (se la serie corrente è vuota, elimina la serie e riapre il `finale` di quella precedente).

**Tempo migliore ("il migliore")**: calcolato live come il minimo tra tutti i `finale` registrati nel blocco corrente, mostrato sempre vicino al cronometro (es. "Ripetuta 3 di 6 · migliore 0:27.9"). Confronto tempi fatto su decimi di secondo (vedi `parseTempoADecimi`/`formatTempo` sotto), mai per confronto di stringa.

```js
function formatTempo(ms) {
  const totaliDecimi = Math.floor(ms / 100);
  const minuti = Math.floor(totaliDecimi / 600);
  const secondi = Math.floor((totaliDecimi % 600) / 10);
  const decimi = totaliDecimi % 10;
  return String(minuti).padStart(2,'0') + ':' + String(secondi).padStart(2,'0') + '.' + decimi;
}
function parseTempoADecimi(str) {
  const [mmss, decimi] = str.split('.');
  const [mm, ss] = mmss.split(':');
  return (parseInt(mm) * 600) + (parseInt(ss) * 10) + parseInt(decimi);
}
```

**Indicatori ripetute**: una riga di pallini (uno per ripetuta target), verde se completata, grigio scuro se no.

**Tutti questi dati (ogni lap, ogni finale, il migliore per blocco) devono essere persistiti e alimentare l'area Progressi/statistiche** — non sono solo UI effimera.

Durante una ripetuta in corso sono disponibili anche:
- **"Annulla ultimo"** (vedi sopra)
- **"Timer extra"** → apre il Timer di recupero come utility indipendente (non è il recupero "ufficiale" tra ripetute previsto dal piano, è un cronometro a scalare opzionale che l'istruttore può usare quando vuole).

A fine lezione (tutti i blocchi completati): schermata di chiusura con numero esercizi e volume totale (metri), pulsante "VEDI RIEPILOGO →" → schermata Fine.

### 5.3 Piano (sola lettura)
Lista completa dei blocchi della lezione corrente, stesso ordine di Main, con volume totale e numero blocchi calcolati. Nessuna azione se non tornare indietro.

### 5.4 Timer di recupero (utility standalone)
Cronometro a scalare circolare (SVG ring), utilizzabile da qualunque blocco strutturato.

- **Valore di partenza: sempre 10 secondi** (non configurabile da lezione a lezione nel prototipo — è un default fisso).
- Pulsanti di regolazione: **−5″ / +5″** (non ±10″). Devono avere lo stesso peso visivo del pulsante AVVIA: altezza 76px, sfondo pieno (`#15273F`), testo bianco grande (24px/800), non un piccolo outline — a bordo vasca devono essere leggibili e toccabili con la stessa facilità del pulsante principale.
- Minimo consentito: 5 secondi (il countdown non scende sotto, anche premendo −5 più volte).
- Stato AVVIA (ciano pieno) / PAUSA (outline ciano) si alternano sullo stesso pulsante grande (76px) in base allo stato `running`.
- Link "Torna alla lezione" in alto riporta a Main.

### 5.5 Fine lezione (feedback rapido)
Tre card grandi selezionabili, mutuamente esclusive (ring di evidenziazione sulla selezione): **Troppo intensa / Giusta così / Troppo leggera**. Pulsante "FATTO" abilitato solo dopo una selezione, porta a Home.

### 5.6 Allenamento (test di valutazione) — 3 fasi in un'unica schermata

**Fase 1 — Scelta.** Pillole stile (Stile Libero / Dorso / Rana / Delfino / Misti) + griglia distanze (50/100/200/400/800/1500m). Selezione singola per entrambi (stato evidenziato in ciano). Pulsante "INIZIA TEST →" attivo solo quando sia stile che distanza sono scelti; altrimenti placeholder muto "Scegli stile e distanza".

**Fase 2 — Cronometro.** Badge con `{stile} · {distanza}m`, cronometro grande, **nessun lap intermedio, nessuna serie**: è un tempo secco su tutta la distanza. Un solo pulsante che alterna:
- **VIA** (ciano, icona play) quando non è partito
- **FINE** (arancio `#FB923C`, icona stop) quando è in corso

**Fase 3 — Risultato.** Badge, tempo finale grande, messaggio di confronto col record precedente per quello stesso stile+distanza:
- se non esiste un record precedente → "Primo test registrato per questa distanza e stile" (muted)
- se il nuovo tempo è migliore → "Nuovo record personale · −X.Xs rispetto a {record precedente}" (verde)
- se è peggiore → "A +X.Xs dal tuo record ({record precedente})" (muted)

Azioni: "Salva e vedi record →" (va a Progressi, **deve effettivamente scrivere il nuovo risultato nello storico del cliente per quello stile+distanza**), oppure "Rifai test" (torna alla Fase 1 azzerando la selezione).

Il confronto record va fatto su una chiave `{stile}-{distanza}` e deve leggere/scrivere lo **stesso storico per-stile/per-distanza** usato in Progressi (sezione 5.9) — non un dataset separato.

### 5.7 Clienti
Ricerca per nome, filtri a pillola (In corso / In pausa / Concluse), lista card cliente. Ogni card: avatar iniziali, nome, prossimo appuntamento/obiettivo, due pulsanti affiancati **Lezione →** / **Allenamento** (per i clienti con appuntamento futuro, il primo pulsante può essere "Vedi piano" invece di "Lezione →", ma l'Allenamento resta sempre disponibile).

### 5.8 Calendario
Vista mese con indicatori (puntino) sui giorni con lezioni programmate, giorno corrente evidenziato in ciano. Sotto la griglia, card della/e lezione/i del giorno selezionato con gli stessi due pulsanti **Lezione →** / **Allenamento**.

### 5.9 Progressi — record personali (deve essere visibile SUBITO, senza scroll per arrivarci)

Ordine della schermata dall'alto:
1. **RECORD PERSONALI** — per **tutti** gli stili nuotati dal cliente (non solo uno), ciascuno con tutte le distanze per cui esiste un record. Non un singolo stat isolato: una card per stile (Stile Libero, Dorso, Rana, Delfino, Misti), ognuna con una griglia di pillole {distanza → tempo}.
2. Statistiche aggregate (volume ultimi 30gg, lezioni fatte, frequenza settimanale).
3. "Ultimi risultati": elenco cronologico delle ultime sessioni (lezione o allenamento) con media/migliore.

Il dato che popola "RECORD PERSONALI" è lo stesso storico aggiornato sia dai `finale` delle serie in Lezione sia dai test in Allenamento: ogni tempo finale registrato in un blocco strutturato o in un test aggiorna il record di quello stile+distanza se è un miglioramento.

### 5.10 Impostazioni
Profilo istruttore, toggle "Modalità Vasca" (attiva/disattiva questa vista semplificata rispetto alla gestione completa da scrivania), voci standard (notifiche, esporta dati clienti, assistenza, esci).

## 6. Modello dati da persistere (riassunto)

Per implementare questo comportamento in modo reale serve, per ogni cliente:

- **Storico risultati per stile+distanza** (`{stile, distanza} → tempo migliore`), aggiornato da:
  - ogni `finale` di serie completata in un blocco strutturato di Lezione
  - ogni test completato in Allenamento
- **Log sessioni** (lezione completata o allenamento completato) con data, tipo (lezione/allenamento), dettaglio (blocco e tempi, oppure stile/distanza/tempo del test), per alimentare "Ultimi risultati" e le statistiche aggregate.
- **Piano lezione** per cliente/data: sequenza di blocchi con `titolo, categoria, stile, distanza, target` (il motore di lap/serie descritto in 5.2 è generico e lavora su qualunque sequenza di blocchi con questa forma).
- **Piano personalizzato (opzionale, per cliente — vedi 3bis)**: `pianoPersonalizzato: boolean` + `pianoTesto: string` (testo libero incollato dall'istruttore alla creazione del cliente). Quando `pianoPersonalizzato` è `true`, sostituisce completamente la sequenza di blocchi per quel cliente: Piano e Main trattano `pianoTesto` come riferimento di sola lettura, senza generare/calcolare blocchi, segmenti o serie.

## 7. Cosa NON fare (errori già corretti nel prototipo, da non reintrodurre)

- Non rimuovere tab o sezioni per "semplificare" — la velocità viene dalla UI dentro ogni schermata, non dal tagliare funzioni.
- Non mettere timer/recupero/cronometro su Riscaldamento o Defaticamento: sono nuoto libero, un solo pulsante "COMPLETATO".
- Non mostrare i lap come lista piatta continua: vanno raggruppati per serie/ripetuta.
- Non mostrare un solo stat in Progressi: tutti gli stili con record vanno mostrati insieme, in cima, senza richiedere scroll per trovarli.
- Non confondere Allenamento (test secco, nessun lap, confronto a record) con Lezione (blocchi con lap/serie, obiettivo tecnico).
- Non provare a "strutturare" automaticamente il testo di un piano personalizzato (3bis) in blocchi/serie: resta testo libero così com'è incollato, il motore a blocchi/lap si applica solo ai piani generati dall'app.
