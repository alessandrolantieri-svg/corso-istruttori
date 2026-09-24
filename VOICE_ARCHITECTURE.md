# Architettura voce — FASI 3-6 (TTS, STT, comandi vocali, quiz vocale)

Motore vocale della specifica "Sistema Corso Multilingua — Voice-First + Accessibility-First".
Tutte le fasi vocali sono fatte: lettura ad alta voce (FASE 3), riconoscimento vocale (FASE 4),
motore comandi (FASE 5) e ora il quiz vocale vero (FASE 6), che le mette insieme.

## Perché qui, non in una cartella a parte

L'audit di FASE 1 (`01_ANALISI/ARCHITECTURE_REPORT.md`) aveva già segnalato che la cartella
`/multilingual-course/` proposta dalla specifica avrebbe duplicato l'architettura lingue già
matura di questo progetto. Stessa logica qui: il motore vocale si aggancia a `ChapterRunner`,
il componente già condiviso da capitoli/esame/Casi Reali/percorso di prova — un solo punto
d'innesto, non quattro.

## Provider astratto (spec §6: Voice Engine → TTS Provider → Browser/Cloud/futuro)

`src/lib/voice/ttsProvider.ts` espone un'interfaccia `TtsProvider` (`speak`/`pause`/`resume`/
`stop`) e un solo provider reale oggi, `browserTtsProvider` — il `SpeechSynthesis` nativo del
browser. Nessun servizio a pagamento, nessuna registrazione inviata a un server: la voce esce
dal dispositivo dell'istruttore, punto. `getTtsProvider()` è l'unico posto da cui l'app prende
il provider attivo — un domani, un Cloud TTS autorizzato dal proprietario significa scrivere un
secondo oggetto che soddisfa la stessa interfaccia, non riscrivere `VoiceControls`.

Il testo lungo viene spezzato per frase (non per capitolo intero) prima di essere passato al
motore: alcuni motori del browser si fermano in silenzio oltre una certa lunghezza, e spezzare
per frase permette anche di fermarsi a un confine naturale invece che a metà parola.

## Come legge il contenuto

`VoiceControls` non riceve un testo scritto a mano — legge `element.innerText` di un
riferimento (`readableRef`) che `ChapterRunner` passa attorno al contenuto vero del passo
corrente. Funziona su ogni passo di ogni capitolo/esame/Caso Reale, in tutte e sei le lingue,
senza dover toccare i singoli file di contenuto: non è una lista di domande scritta a mano, è
"leggi quello che è visibile qui" — coerente con la regola della specifica di non hardcodare i
contenuti nel motore vocale. Le icone Phosphor (elementi vuoti, il glifo è nel CSS, non nel DOM)
non finiscono nella lettura. I controlli stessi (i bottoni "Ascolta"/"Pausa"/…) sono fuori da
`readableRef`, non dentro — altrimenti "Ascolta" leggerebbe anche i propri bottoni.

## Lingua e velocità

`speechLangForLocale()` (`src/lib/voice/settings.ts`) traduce i codici lingua dell'app in tag
BCP-47 completi (es. `"it"` → `"it-IT"`) — il motore vocale del browser sceglie la voce giusta da
un tag completo meglio che da un codice a due lettere. La velocità (0.75×/1×/1.25×/1.5×, spec §7)
è salvata in `localStorage` (non un cookie: non cambia nulla nell'HTML reso dal server, a
differenza di lingua o modalità ipovedente — non serve leggerla lato server).

## Comportamento garantito

- **Mai due voci insieme** (spec §32): cambiare passo o lasciare la pagina ferma sempre la
  lettura in corso, prima di iniziarne una nuova. Verificato dal vivo: parlando e passando al
  passo successivo, `speechSynthesis.speaking` torna `false` immediatamente.
- **Rilevamento delle funzionalità** (spec §49): se `window.speechSynthesis` non esiste (alcuni
  browser/versioni), `VoiceControls` non si mostra affatto — il resto della pagina funziona
  come sempre, nessun blocco (spec §28).
- **Verificato dal vivo**, non solo a occhio sul codice: `speechSynthesis.speaking`/`.paused`
  controllati direttamente dopo ogni bottone (Ascolta, Pausa, Riprendi, Stop), e la lingua
  dell'utterance intercettata per confermare che passa a `"fr-FR"` quando l'istruttore ha
  scelto il francese.

## FASE 4 — riconoscimento vocale (STT)

Stessa architettura della FASE 3, letta al contrario: `src/lib/voice/sttProvider.ts` espone
`SttProvider` (`startListening`/`stopListening`/`cancel`) sopra `SpeechRecognition` /
`webkitSpeechRecognition` — API sperimentale, non nelle librerie DOM standard di TypeScript,
per questo `src/types/speech.d.ts` dichiara solo i tipi minimi usati davvero (non l'intera
specifica). `getSttProvider()` è il punto unico da cui l'app lo prende, stesso principio di
`getTtsProvider()`.

**Privacy per costruzione, non per promessa** (spec §29): l'audio non passa mai da questa app —
il browser cattura, riconosce e restituisce solo la trascrizione. Non c'è nessuna registrazione
da eliminare perché non ne esiste mai una nel codice dell'app.

**Dove si vede oggi**: `DictationButton` (bottone microfono riutilizzabile, non sa dove finisce
il testo — chiama solo `onTranscript`) agganciato al campo di scrittura del Tutor
(`TutorChat.tsx`). Non ai campi di testo libero dentro i singoli passi di capitoli/esame/Casi
Reali: quel componente (`Field`) è **duplicato in ogni singolo file di contenuto** (centinaia di
file, non uno condiviso), a differenza di `ChapterRunner`/`VoiceControls` in FASE 3 — agganciarlo
lì oggi avrebbe significato toccare ogni file invece di un punto solo. Rimandato, non
dimenticato: il Tutor è il primo punto reale, condiviso, dove dettare invece di scrivere ha già
un'utilità concreta.

**Errori gestiti** (spec §27): permesso del microfono negato → messaggio con l'invito a scrivere
comunque; voce non capita → stesso invito, si può riprovare. Verificato dal vivo, non solo sul
codice: cliccando "Detta" il browser richiede davvero il permesso del microfono, e negandolo (o
in un ambiente senza microfono) appare il messaggio corretto e il bottone torna pronto a un
nuovo tentativo.

## FASE 5 — motore comandi vocali

`src/lib/voice/commandEngine.ts` espone una funzione pura, `parseVoiceCommand(transcript,
locale)`: prende una trascrizione già pronta (da `sttProvider`, FASE 4) e restituisce un intent
strutturato (`{ intent, value?, confidence }`) — non decide da sola cosa fare, quello resta a
chi la chiama. Undici intent (spec §35): `READ`, `REPEAT`, `PAUSE`, `RESUME`, `STOP`, `NEXT`,
`BACK`, `HELP`, `SELECT_ANSWER`, `CONFIRM`, `CANCEL`.

**Normalizzazione linguistica** (spec §36): per ogni intent, più frasi equivalenti per lingua —
"leggi"/"leggimi"/"ascolta" valgono tutte `READ` in italiano, "read"/"read it"/"listen" in
inglese, e così per le altre quattro lingue. Corrispondenza esatta prima (confidenza 1), poi per
contenimento su frasi di almeno 4 caratteri con la frase più lunga a vincere (confidenza 0.7) —
una singola lettera come "a" non scatta dentro una parola che la contiene per caso ("aiuto").

**Mai una lettera come valore** (spec §37): `SELECT_ANSWER` restituisce sempre un indice
("0"/"1"/"2"), mai "a"/"b"/"c" — le lettere non sono universali fra le lingue, l'indice sì. "A",
"risposta a", "la prima", "scelgo la prima" portano tutti allo stesso `value: "0"`.

**Dove si vede oggi**: `VoiceCommandButton` (bottone microfono distinto da `DictationButton` —
qui la trascrizione passa dal motore comandi prima di uscire, non è testo grezzo) agganciato a
`ChapterRunner`, accanto a `VoiceControls`. `VoiceControls` ora espone le sue azioni tramite un
riferimento imperativo (`VoiceControlsHandle`: `read`/`pause`/`resume`/`stop`/`speakText`) — i
comandi vocali pilotano **lo stesso lettore** dei bottoni a tocco, non uno separato. Solo gli
intent con un'azione vera oggi sono collegati: `READ`/`REPEAT` → legge il passo corrente,
`PAUSE`/`RESUME`/`STOP` → controllano la lettura in corso, `NEXT`/`BACK` → `goNext()`/`goBack()`
già esistenti, `HELP` → legge ad alta voce l'elenco dei comandi disponibili (tradotto in tutte
le sei lingue). `SELECT_ANSWER`/`CONFIRM`/`CANCEL` sono **già riconosciuti correttamente** dal
motore ma, da *questo* microfono, non hanno ancora un'azione — non esisteva ancora un flusso di
domanda-a-voce da pilotare. (Aggiornamento FASE 6, qui sotto: adesso esiste, ma vive in un
secondo bottone microfono dedicato dentro `OptionGroup`, non in questo — "Comando vocale" resta
per navigare/controllare la lettura, "Rispondi a voce" per scegliere un'opzione. Due bottoni,
due scopi distinti, non uno che fa tutto in modo ambiguo.)

**Verificato**, non solo letto: 24 casi di prova eseguiti davvero (non letti a occhio) coprendo
tutti gli undici intent nelle sei lingue, incluso il caso limite "aiuto per favore" che non deve
confondersi con la lettera "a" — 24 su 24 corretti. Il percorso microfono→comando→azione non è
stato eseguibile end-to-end in questo ambiente di verifica (nessun microfono reale disponibile,
stesso limite già incontrato in FASE 4) — ma le funzioni che i comandi pilotano
(`read`/`pause`/`resume`/`stop`) sono le stesse già verificate dal vivo in FASE 3 tramite i
bottoni a tocco, non funzioni nuove e non provate.

## FASE 6 — quiz vocale (QUESTION → OPTIONS → LISTEN → INTERPRET → CONFIRM → EVALUATE)

**Aggangiato a `OptionGroup`, non a un componente nuovo.** `OptionGroup` (`src/components/
OptionGroup.tsx`) è già il renderizzatore condiviso di ogni domanda a scelta multipla del corso
— capitoli, esame, Casi Reali, in tutte e sei le lingue, un punto solo, come `ChapterRunner` per
la lettura. EVALUATE è `onPick(value, correct)`, la stessa funzione che il tocco su un'opzione
chiama da sempre: rispondere a voce e rispondere a tocco finiscono nello stesso posto, stesso
salvataggio, stesso calcolo del punteggio, nessuna logica duplicata.

**Un problema architetturale risolto prima di scrivere il flusso**: `OptionGroup` non sapeva mai
la lingua corrente, perché i file di contenuto (uno per lingua) non gliela passano — non ne
avevano mai avuto bisogno finché il componente era muto. Aggiungere `locale` come prop avrebbe
voluto dire toccare ogni singola chiamata a `OptionGroup` in ogni file di contenuto, lo stesso
problema già scartato per la dettatura nei singoli passi (FASE 4). Soluzione: un contesto React
(`src/lib/i18n/LocaleContext.tsx`, `useLocale()`), con `ChapterRunner` come unico `Provider` —
`OptionGroup` legge la lingua senza che nessun file di contenuto debba cambiare.

**Il flusso**: un bottone "Rispondi a voce" per gruppo di opzioni (invisibile se
`SpeechRecognition` non è supportato, stesso rilevamento delle altre fasi). Ascolta →
`parseVoiceCommand` (FASE 5) interpreta la trascrizione → se l'intent è `SELECT_ANSWER` con un
indice dentro l'intervallo delle opzioni disponibili:
- **corrispondenza esatta** ("a", "risposta a") → seleziona subito, `onPick` chiamato
  immediatamente — coerente con "un clic per agire" (spec §43): chi ha detto chiaramente la
  lettera non deve confermare due volte;
- **corrispondenza per contenimento** (una frase più lunga, meno certa) → non seleziona subito:
  mostra "Hai detto: «…». È questa la risposta?" con due bottoni (Sì/No), letto anche ad alta
  voce. Confermare tocca `onPick`, esattamente come una selezione diretta.

**Le mie soglie di confidenza, spiegate** (spec §13 ne propone tre: ≥0.85 accetta, 0.60-0.84
conferma, <0.60 richiedi di ripetere): il motore comandi di FASE 5 non produce un punteggio
continuo — è basato su regole, non statistico — e restituisce solo due valori possibili,
1 (corrispondenza esatta) o 0.7 (corrispondenza per contenimento). Ho mappato questi due livelli
sulle prime due fasce della specifica (accetta / conferma); la terza fascia (richiedi di
ripetere) coincide qui con "non riconosciuto affatto" — mostra lo stesso messaggio che chiede di
riprovare o toccare un'opzione, non una soglia numerica separata da tarare.

**Nessuna spiegazione inventata** (spec §15: "non inventare spiegazioni quando il corso ne
prevede una specifica"): il testo di feedback dopo la risposta (corretto/sbagliato, con la
spiegazione) esiste già in ogni file di contenuto, renderizzato in JSX subito dopo
`OptionGroup` — non duplicato né riscritto qui. Chi vuole sentirlo ad alta voce dopo aver
risposto (a voce o a tocco) può premere di nuovo "Ripeti" su `VoiceControls`: rilegge tutto il
passo corrente dal DOM, feedback compreso, perché ormai è visibile — nessuna narrazione nuova da
costruire, la sinergia con la FASE 3 esiste già.

**Verificato**: il bottone "Rispondi a voce" compare su ogni gruppo di opzioni con
`SpeechRecognition` disponibile (provato su tre gruppi nello stesso passo, Capitolo 1). Il
percorso di errore verificato dal vivo, con un permesso del microfono negato per davvero: appare
"Non ho capito quale risposta. Puoi riprovare, oppure toccare un'opzione." e il bottone torna
pronto. Il percorso "corrispondenza trovata" non è stato eseguibile end-to-end con una voce vera
in questo ambiente (stesso limite delle FASI 4-5, nessun microfono disponibile, e qui in più il
provider cattura il costruttore `SpeechRecognition` al caricamento del modulo — un finto
riconoscitore iniettato dopo non lo raggiunge in tempo) — ma la logica che quel percorso usa
(`parseVoiceCommand`) è la stessa già provata con 24 casi reali in FASE 5, e `onPick` è la
funzione di selezione già in uso dal tocco da prima ancora che questo progetto vocale
cominciasse.

## Cosa manca ancora, di proposito

- **Dettatura nei singoli passi** (Field, riflessioni dentro capitoli/esame/Casi Reali) — non
  agganciata ancora, per il motivo spiegato sopra (§ FASE 4).
- **Domande con più di tre opzioni** — il motore comandi (FASE 5) riconosce solo A/B/C
  (indici 0/1/2, spec §38: "le tre risposte sono il requisito iniziale"). Un gruppo con una
  quarta opzione resta rispondibile solo a tocco per quell'opzione in più — non un blocco, ma un
  limite onesto da segnalare.
- **Conferma anche a voce, non solo a tocco** — oggi "Sì, questa"/"No, riprova" sono solo
  bottoni: affidabile, ma non "tutto voce". Una seconda fase di ascolto per la conferma stessa è
  un'estensione naturale, non fatta ora per non incatenare due riconoscimenti vocali di fila
  senza prima aver visto come si comporta il primo con utenti veri.
- Il testo letto da `VoiceControls` segue l'ordine visivo del DOM, non l'enumerazione esplicita
  "Domanda 1. Risposta A. Risposta B." della specifica (§9) — la sinergia FASE 3 + FASE 6 già
  copre la lettura naturale della domanda e delle opzioni nell'ordine in cui appaiono; l'enunciato
  rigido "Risposta A. [testo]. Risposta B. [testo]." resta un miglioramento possibile, non
  necessario per far funzionare il quiz vocale.
- **Qualità della voce**: `ttsProvider.ts` sceglie sempre la migliore voce installata (preferisce
  automaticamente una voce "Natural"/"Online"/neurale quando il dispositivo ne ha una), ma resta
  legato a cosa offre il sistema di chi ascolta — su un dispositivo con solo voci sintetiche
  vecchio stile (visto in test: le due voci Windows legacy "Cosimo"/"Elsa"), la lettura resta
  meno fluida di una voce vera, per limite del motore nativo del browser, non del codice. Una
  voce garantita "tipo Siri" su ogni dispositivo richiederebbe un servizio a pagamento (mai
  attivato senza autorizzazione esplicita del proprietario, stesso schema del Tutor IA) — non
  fatto ora, deciso di rimandarlo dopo aver verificato l'effetto del fix gratuito sul dispositivo
  reale del proprietario.
