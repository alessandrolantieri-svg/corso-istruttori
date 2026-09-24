# Specifica voice-first + accessibility-first — riepilogo FASE 1-10

Indice unico di tutto il lavoro fatto sulla specifica a 54 sezioni "Voice-First +
Accessibility-First", integrato nell'architettura reale del corso (mai una cartella a parte —
vedi FASE 1). I documenti dettagliati restano quelli citati sotto; questo pagina solo li mette
in fila e raccoglie, in un solo posto, tutto ciò che resta onestamente aperto.

## Cosa copre ogni fase

| Fase | Cosa | Dettagli |
|---|---|---|
| 1 | Audit — architettura reale, integrazione senza cartella a parte | `01_ANALISI/ARCHITECTURE_REPORT.md` |
| 2 | Accessibilità di base (landmark, focus, aria-live, modalità ipovedente) | `ACCESSIBILITY.md` |
| 3-6 | Lettura ad alta voce, dettatura, comandi vocali, quiz vocale | `VOICE_ARCHITECTURE.md` |
| 7 | Multilingua (6 lingue: it/en/es/fr/pt-PT/pt-BR) | già soddisfatta da D42/D45, prima di questa specifica |
| 8 | Tutor mode — risposta autonoma o aiutata dal Tutor IA | `TUTOR_ASSISTANCE.md` (D51/D52) |
| 9 | Analytics — quante risposte aiutate, per capitolo, in `/progresso` | D53 (ambito ridotto: nessuna vista scuola, richiederebbe un ruolo/login nuovo) |
| 10 | Suite di test + questo documento | vedi sotto |

## FASE 10 — suite di test

Il progetto non aveva alcun framework di test prima d'ora. Aggiunto **Vitest** (pinnato a 3.2.7,
compatibile con le dipendenze esistenti — la 5.x avrebbe richiesto di toccare `@types/node`),
solo per la **logica pura** costruita in FASE 3-9 — non per i componenti React/browser, che
restano verificati dal vivo (un ambiente di test finto darebbe una falsa sicurezza su cose come
il permesso del microfono o la voce di sistema).

Coperti: `commandEngine.parseVoiceCommand` (tutte le 6 lingue, corrispondenza esatta e per
contenimento, la regola "una lettera sola non scatta per sbaglio"), `ttsProvider.splitIntoChunks`
e `pickBestVoice` (compreso il fallback quando nessuna voce naturale esiste), `sttProvider.mapError`,
`clientSignal.wasTutorUsedRecently` (la finestra dei 20 minuti di D52), e una guardia sul catalogo
i18n: nessuna chiave `voice.*`/`progresso.*` può restare senza tutte e sei le traduzioni senza far
fallire i test. **152 test**, `npm test` per lanciarli.

## Cosa resta ancora aperto, di proposito — tutto in un posto solo

- **Qualità della voce** dipende dal dispositivo di chi ascolta — nessuna voce "tipo Siri"
  garantita senza un servizio a pagamento, non attivato (D52).
- **Dettatura nei singoli passi** (Field, riflessioni) non agganciata — stesso motivo tecnico di
  FASE 4 (`VOICE_ARCHITECTURE.md`).
- **Domande con più di tre opzioni** rispondibili solo a tocco per l'opzione in più (FASE 5).
- **Conferma del quiz vocale** solo a tocco, non ancora anche a voce (FASE 6).
- **Il segnale "aiutato dal Tutor"** non si consuma per singola domanda — un uso del Tutor marca
  come aiutate tutte le risposte dei 20 minuti successivi (D51).
- **Vista aggregata "scuola"** non esiste — richiederebbe un ruolo/login nuovo, mai costruito;
  decisione separata da FASE 9 (D53).
- **Nessun test end-to-end reale del microfono**: verificato solo il percorso di errore (permesso
  negato); il percorso "risposta riconosciuta" resta provato solo dalla logica di
  `parseVoiceCommand`, mai da un microfono vero in questo ambiente.
