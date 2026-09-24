# La Chiave Giusta — app tecnica

App della piattaforma multi-percorso "La Chiave Giusta" (D21/D23 in
`01_ANALISI/DECISIONI PRESE.md`). Oggi ospita un solo percorso — "Comunicazione
nell'insegnamento del nuoto" — con un backend vero: login, database Postgres,
persistenza reale, ripresa del progresso dopo reload. Pubblicata su Netlify
(https://corso-comunicazione-istruttori-nuoto.netlify.app, D71/D72), con il
codice su GitHub (`alessandrolantieri-svg/corso-istruttori`, solo questa
cartella).

Stack: Next.js 16 (App Router, TypeScript) + Prisma 7 + Postgres (Netlify DB su
Neon in produzione, PGlite locale in sviluppo — adattatore scelto in
`src/lib/db/adapter.ts`) + sessione fatta in casa (token opaco + hash in DB,
niente NextAuth) + Anthropic SDK (Tutor, Riflessioni, Progresso e gli altri
agenti — vedi sotto) + Web Speech API del browser (lettura ad alta voce e
comando vocale, nessun servizio a pagamento).

## Avvio

```bash
npm install
npx netlify dev
```

Apri http://localhost:3101 — reindirizza a `/login` senza sessione, a
`/dashboard` con sessione attiva. `netlify dev` (configurato in `netlify.toml`)
avvia Next.js e, insieme, un Postgres di prova locale con le tabelle e i due
account demo già dentro: non c'è nessun database da creare o popolare a mano.

`npm run dev` da solo avvia Next.js senza database: le pagine che leggono dati
falliscono. Serve solo se punti a un altro Postgres tuo via `DATABASE_URL`.

Per il Tutor, le Riflessioni, il Progresso e gli altri agenti serve una
`ANTHROPIC_API_KEY` valida in `.env` — senza, quelle funzioni rispondono con un
errore invece di bloccare il resto dell'app.

## Credenziali demo

Due scuole diverse, per verificare che i dati restino separati per tenant.
Nella pagina di login, i due bottoni "Entra come Delfino" / "Entra come
Airone" accedono con un click, senza password (solo in sviluppo locale —
disabilitato se `NODE_ENV=production`).

**Fase di costruzione** (`APP_IN_CONSTRUCTION` in `src/lib/construction.ts`,
D73/D74): finché è `true`, anche sul sito pubblico c'è il tasto "Entra e prova
l'app, senza account" (entra sempre come Delfino: un profilo di prova
condiviso da tutti) e capitoli ed esame sono tutti apribili senza completare
i precedenti. Al lancio si mette a `false` quella riga sola: tornano login
obbligatorio e sblocco in sequenza.

| Scuola | Email | Password |
|---|---|---|
| Scuola Nuoto Delfino | `demo@delfino.it` | `Chiave123!` |
| Scuola Nuoto Airone | `demo@airone.it` | `Chiave123!` |

## Database

Postgres, in due forme: in produzione Netlify DB (Neon), creato da Netlify al
primo deploy; in locale un Postgres di prova (PGlite) che `netlify dev` avvia da
solo. In entrambi i casi le tabelle e i due account demo arrivano dalle
migrazioni SQL in `netlify/database/migrations/`, applicate automaticamente
(al deploy in produzione, all'avvio in locale). Non serve un seed a mano.

`prisma/schema.prisma` resta la fonte di verità dello schema. Per cambiarlo:

```bash
# 1. modifica prisma/schema.prisma, poi genera l'SQL della differenza
npx prisma migrate diff --from-migrations netlify/database/migrations --to-schema prisma/schema.prisma --script
# 2. crea una nuova migrazione Netlify e incolla lì quell'SQL
npx netlify database migrations new --description "cosa cambia" --scheme sequential
# 3. provala in locale (PGlite), poi committa: al prossimo deploy va in produzione
npx netlify database migrations apply
```

Una migrazione già applicata in produzione non si modifica mai: ogni cambio è
una migrazione nuova. Per guardare i dati:

```bash
npx netlify database status
npx netlify database connect --query "SELECT email FROM \"Learner\""
```

`prisma/seed.ts` (`npm run db:seed`) resta per chi punta a un altro Postgres
via `DATABASE_URL`.

## Test

```bash
npm test
```

Suite Vitest (`environment: "node"`, di proposito — un ambiente di test finto
darebbe una falsa sicurezza sul comportamento vero del browser): copre solo
logica pura — catalogo traduzioni (completezza delle 6 lingue su ogni chiave),
copy dell'attestato, motore comandi vocali, provider TTS/STT, segnale Tutor.
Tutto ciò che dipende davvero dal browser (microfono, motore vocale) si
verifica dal vivo, non con un finto DOM.

## Cosa fa oggi

Login/logout reali, isolamento dei dati fra le due scuole demo, tutti e dieci
i capitoli del corso nuoto (ogni domanda, ogni scena, ogni simulazione a
bivi), l'esame finale (3 turni, sbloccati in sequenza — il Turno 1 richiede
tutti i capitoli, i successivi il turno precedente), 13 Casi Reali (materiale
richiamabile liberamente, nessun ordine da rispettare), l'attestato generato
davvero (immagine dinamica dal punteggio reale, scaricabile), il test VAK che
calcola il profilo dalle risposte del Capitolo 1 e lo mostra in sola lettura
altrove, salvataggio reale ad ogni passo con ripresa dopo reload.

**Sei lingue complete** (IT master, EN, ES, FR, PT-PT, PT-BR) — interfaccia,
contenuto dei capitoli/esame/Casi Reali e certificato, tutte tradotte,
verificate per completezza (test automatico) e riviste una per una per
naturalezza e chiarezza (D69, D70).

**Voce**: lettura ad alta voce di ogni passo ("Ascolta"), con velocità
regolabile e la voce migliore disponibile nel browser; comando vocale per
navigare senza mani ("leggi", "pausa", "avanti"...); una modalità "Testo più
grande" che ingrandisce il testo e aumenta il contrasto per chi vede poco
(non legge ad alta voce: per quello c'è "Ascolta" — il vecchio nome "Leggi
per me" confondeva, D75).

**L'assistente**: Tutor conversazionale, Riflessioni libere con un feedback
dell'IA, Progresso narrato — tre schede in un solo punto d'accesso
(`/assistente`). Le conversazioni del Tutor e le riflessioni libere non sono
mai lette da chi valuta l'esame ("Muro 1", vincolo del modello dati, non solo
applicativo — vedi sotto).

**Barra laterale desktop**: sopra i 960px di larghezza, tutte le pagine
principali (capitoli, esame, Casi Reali, Dashboard, Assistente, Attestato)
mostrano una barra laterale fissa con la navigazione, invece della sola
colonna verticale pensata per il telefono — sotto quella soglia l'app resta
pixel per pixel quella di sempre (`src/components/desktop/`, leggi il README
lì dentro).

## Cosa non fa ancora

Registrazione utenti vera (oggi solo i due account demo creati dal seed più un
login email/password fatto in casa — niente Google/OAuth, deciso ma non
implementato, D64), un secondo percorso oltre al nuoto, i 7
agenti IA del brief originale come servizi separati (oggi sono funzioni
dentro Tutor/Feedback/Progress/Orchestrator/Method Guardian, non processi a sé
— scelta consapevole, vedi il documento di analisi).

`/percorso-test` è un percorso tecnico di verifica, di proposito solo in
italiano per sempre (D23) — non contenuto reale, da rimuovere o sostituire
prima di un lancio pubblico.

## Struttura del codice

```
src/lib/chapters/          — capitolo-N.tsx (master italiano) + en/es/fr/pt-PT/pt-BR/
src/lib/exam/               — stessa struttura, per i 3 turni d'esame
src/lib/casi-reali/         — stessa struttura, per i 13 Casi Reali
src/lib/i18n/catalog.ts     — UI_CATALOG: solo l'interfaccia generica (non il contenuto corso)
src/lib/voice/              — TTS/STT (Web Speech API) + motore comandi vocali
src/lib/tutor/ feedback/ progress-agent/ orchestrator/ method-guardian/
                             — le funzioni IA (Anthropic SDK), ognuna con la propria system prompt
src/lib/attestato/          — calcolo esito + generazione immagine + copy per lingua
src/lib/a11y/                — modalità "Testo più grande" (cookie, non account)
src/components/ChapterRunner.tsx — motore generico: un solo componente per capitoli/esame/Casi Reali
src/components/desktop/     — barra laterale desktop, isolata (leggi il README lì dentro)
src/app/capitoli|esame|casi-reali/[num]/page.tsx — pagine dinamiche generiche
prisma/schema.prisma        — modello dati
```

Aggiungere un capitolo undici richiede solo: un nuovo `capitolo-X.tsx` (e le
sue traduzioni) e una riga in `registry.ts` — nessuna nuova pagina, nessuna
nuova Server Action generica.

## Modello dati generico

Nomi di proposito generici — `Learner` non "Instructor", `Organization` non
"School" (nullable: un percorso futuro potrebbe non averne una) — perché il
nuoto è il primo percorso ospitato dalla piattaforma, non un vincolo
dell'architettura. Il "Muro 1" è un vincolo tecnico del modello dati, non un
filtro applicativo: `AssessmentResponse` (risposte valutabili) e
`FreeReflection` (testo libero, incluse le conversazioni del Tutor in
`TutorMessage`) sono tabelle separate fin da oggi. Dettagli completi in
`prisma/schema.prisma` e nel documento di analisi
(`01_ANALISI/DECISIONI PRESE.md`).
