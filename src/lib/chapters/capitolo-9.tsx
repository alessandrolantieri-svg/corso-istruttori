import { OptionGroup } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "./types";

function Field({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  return (
    <textarea
      className="field"
      id={id}
      placeholder="Scrivi qui..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

const DIARY_KEYS = ["q2","q7","q7b","qtrasf","t10"];

export const capitolo9Steps: Step[] = [
  // 0 — copertina
  {
    day: "inizio",
    pct: 0,
    nextLabel: "Inizia ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capitolo 9 · QUANDO NON CI STA</div>
        <h1>Non ci riesce, o non ci sta?</h1>
        <p className="lede">
          Davanti a un bambino che rifiuta, si oppone o sfida apertamente, l&apos;istruttore cerca
          prima l&apos;intenzione buona sotto il rifiuto — invece di insistere o di scontrarsi.
        </p>
      </>
    ),
  },

  // 1 — lunedì: riflessione + consolidamento Cap.8
  {
    day: "lunedì · 10 min",
    pct: 11,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Lunedì</div>
        <h1>Com&apos;è andata in vasca?</h1>
        <p className="lede">
          La settimana scorsa: tre modi diversi pronti per una stessa cosa tecnica, e cambiare
          strada se il primo non funzionava. Ti è servito? Quale modo hai usato di più?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidamento — il Capitolo 8 torna</h2>
        <p className="prompt">1. Se un modo non funziona, la cosa giusta è ripeterlo più forte?</p>
        <OptionGroup
          name="k1"
          options={[
            { value: "no", label: "No — se ne prova uno diverso", correct: true },
            { value: "si", label: "Sì — se lo ripeti con più decisione, di solito funziona", correct: false },
          ]}
          selected={answers.k1}
          onPick={(v, correct) => setResponse("k1", v, correct)}
        />
        <p className="prompt">2. Un buon repertorio ha, per ogni cosa importante, almeno tre modi diversi di dirla?</p>
        <OptionGroup
          name="k2"
          options={[
            { value: "si", label: "Sì", correct: true },
            { value: "no", label: "No, uno ben fatto basta", correct: false },
          ]}
          selected={answers.k2}
          onPick={(v, correct) => setResponse("k2", v, correct)}
        />
        <p className="prompt">3. Se un bambino non riesce con un modo, vuol dire che non ce la fa?</p>
        <OptionGroup
          name="k3"
          options={[
            { value: "no", label: "No — vuol dire solo che non era ancora il modo giusto", correct: true },
            { value: "si", label: "Sì — se un modo non basta, vuol dire che il bambino non ce la fa ancora", correct: false },
          ]}
          selected={answers.k3}
          onPick={(v, correct) => setResponse("k3", v, correct)}
        />
        <p className="prompt">4. Il repertorio ha un ordine fisso, valido per ogni bambino?</p>
        <OptionGroup
          name="k4"
          options={[
            { value: "si", label: "Sì — prima le parole, poi il gesto, poi il contatto, sempre in quest'ordine", correct: false },
            { value: "no", label: "No — dipende dal bambino", correct: true },
          ]}
          selected={answers.k4}
          onPick={(v, correct) => setResponse("k4", v, correct)}
        />
        <p className="prompt">
          5. Hai provato tutti e tre i canali con un bambino, senza risultato. La cosa giusta è
          inventare una quarta variazione?
        </p>
        <OptionGroup
          name="k5"
          options={[
            { value: "no", label: "No — è il momento di fermarsi e guardare cos'altro c'è", correct: true },
            { value: "si", label: "Sì, bisogna insistere", correct: false },
          ]}
          selected={answers.k5}
          onPick={(v, correct) => setResponse("k5", v, correct)}
        />
        <p className="prompt">
          6. Un canale che ha funzionato su un esercizio funziona automaticamente anche
          sull&apos;esercizio successivo?
        </p>
        <OptionGroup
          name="k6"
          options={[
            { value: "si", label: "Sì, una volta trovato resta quello giusto", correct: false },
            { value: "no", label: "No — ogni esercizio nuovo può richiedere un canale diverso", correct: true },
          ]}
          selected={answers.k6}
          onPick={(v, correct) => setResponse("k6", v, correct)}
        />
      </>
    ),
  },

  // 2 — martedì: spiegazione + controllo
  {
    day: "martedì · 13 min",
    pct: 27,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Martedì</div>
        <h1>«Non ci riesce» e «non ci sta» non sono la stessa cosa</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Finora hai imparato cosa fare quando un bambino non ci riesce. Oggi impari la
          differenza — perché non è la stessa cosa — quando un bambino non ci sta.
        </p>
        <p className="lede">
          <strong>«Non ci riesce» è un problema didattico.</strong> Il bambino vuole fare quello che
          gli chiedi, ma la strada non funziona ancora — è quello che hai imparato al Capitolo 8: si
          cambia strada.
        </p>
        <p className="lede">
          <strong>«Non ci sta» è tutta un&apos;altra cosa.</strong> Non è che la strada sia
          sbagliata: è che lui, adesso, non vuole percorrerla. Rifiuta, si oppone, a volte sfida
          apertamente — soprattutto negli anni dell&apos;adolescenza.
        </p>
        <p className="lede">
          Confondere le due cose è il secondo errore più comune del mestiere (il primo è quello
          del Capitolo 8: ripetere la stessa spiegazione invece di cambiare strada). Il motivo è
          semplice: davanti a un rifiuto viene naturale spiegare di nuovo, magari più chiaramente.
          Questa mossa funziona per «non ci riesce». Ma non serve a niente per «non ci sta». Un
          bambino che rifiuta non ha bisogno di un&apos;altra spiegazione: ha bisogno che tu
          capisca perché rifiuta.
        </p>
        <div className="card quote">
          Anche il comportamento più fastidioso — il rifiuto, l&apos;opposizione, la sfida —
          nasconde quasi sempre un&apos;intenzione che, dal punto di vista di chi la fa, è positiva.
          Non giustifica il comportamento. Ma ti dà una leva diversa da tirare.
        </div>
        <p className="lede">
          Il bambino che rifiuta di entrare spesso non sta rifiutando te: sta proteggendo se stesso
          da qualcosa che teme. Il ragazzo che ti sfida davanti al gruppo, spesso, non vuole vincere
          contro di te: vuole essere visto come qualcuno che conta, davanti ai suoi coetanei.
          Trovata l&apos;intenzione, spesso trovi anche un modo di darla soddisfazione senza cedere
          sulla sostanza.
        </p>
        <p className="lede">
          Il rifiuto non è sempre rumoroso: a volte è un ragazzo che sfida ad alta voce, altre volte
          una bambina di 11 anni che, senza alzare la voce, si tira indietro e dice «non ci provo
          nemmeno» — stesso meccanismo, volume diverso.
        </p>
        <p className="lede">
          <strong>E se anche la proposta che offri viene rifiutata?</strong> Può succedere. Non è
          una trattativa infinita: puoi provare una seconda lettura, con calma — ma se anche quella
          non porta da nessuna parte, va bene fermarsi e dire chiaramente qual è il limite, senza
          durezza: «va bene, oggi questo esercizio lo lasciamo — ma il turno continua.» Cercare
          l&apos;intenzione buona non vuol dire inseguirla all&apos;infinito: vuol dire darle un
          vero tentativo, non zero tentativi.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controllo di fine giornata</h2>
        <p className="prompt">1. «Non ci riesce» e «non ci sta» richiedono la stessa risposta?</p>
        <OptionGroup
          name="m1"
          options={[
            { value: "no", label: "No — uno è didattico, l'altro è di relazione", correct: true },
            { value: "si", label: "Sì — in entrambi i casi la risposta giusta è spiegare di nuovo", correct: false },
          ]}
          selected={answers.m1}
          onPick={(v, correct) => setResponse("m1", v, correct)}
        />
        <p className="prompt">2. Trovare l&apos;intenzione buona dietro un rifiuto giustifica il comportamento?</p>
        <OptionGroup
          name="m2"
          options={[
            { value: "si", label: "Sì — se capisci il motivo, allora il rifiuto va bene così com'è", correct: false },
            { value: "no", label: "No — ti dà solo una leva diversa da tirare", correct: true },
          ]}
          selected={answers.m2}
          onPick={(v, correct) => setResponse("m2", v, correct)}
        />
        <p className="prompt">3. Se anche la seconda proposta viene rifiutata, bisogna continuare a cercarne altre all&apos;infinito?</p>
        <OptionGroup
          name="m3"
          options={[
            { value: "no", label: "No — dopo un vero secondo tentativo, va bene fermarsi con calma", correct: true },
            { value: "si", label: "Sì, finché non si trova quella giusta", correct: false },
          ]}
          selected={answers.m3}
          onPick={(v, correct) => setResponse("m3", v, correct)}
        />
      </>
    ),
  },

  // 3 — mercoledì: tre scene + simulazione Riccardo (due scambi condizionali)
  {
    day: "mercoledì",
    pct: 44,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.sim && (a.sim === "impone" || !!a.sim2),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Mercoledì</div>
        <h1>Tre rifiuti, tre intenzioni diverse</h1>
        <div className="card scene">
          <div className="who">Un ragazzo di 15 anni</div>
          <p>
            Si ferma a bordo vasca, ad alta voce, davanti al gruppo: «questo esercizio è una
            cazzata, non lo faccio.» Non è che non capisca l&apos;utilità dell&apos;esercizio: ha
            appena messo alla prova, davanti a tutti, se l&apos;istruttore ha il controllo della
            situazione. L&apos;istruttore risponde, senza alzare la voce: «ok. Fammi vedere tu come
            lo faresti diverso.» Non è una resa — è dargli un ruolo, invece di uno scontro. Il
            ragazzo propone una piccola variante, abbastanza vicina da poter essere accettata. Il
            rifiuto non era sull&apos;esercizio: era sul chi decide.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Alice, 12 anni</div>
          <p>
            Tuffo di partenza, mai provato davanti al gruppo. Incrocia le braccia: «non lo faccio, è
            stupido.» Nessuna sfida ad alta voce, solo un rifiuto secco. L&apos;istruttore capisce
            che il problema non è il tuffo: è sbagliarlo davanti alle amiche. Le propone, sottovoce,
            di provarlo per prima, mentre gli altri sistemano ancora le cuffie. Alice lo fa.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Un bambino di 8 anni</div>
          <p>
            Incrocia le braccia e non dice niente, si volta a guardare il muro, davanti a un
            esercizio che aveva già fatto la settimana scorsa senza problemi. Nessuna sfida, nessun
            pubblico da impressionare — solo un rifiuto silenzioso e fermo. L&apos;istruttore,
            invece di proporre incentivi («dai, poi facciamo il gioco che ti piace») o insistere, si
            abbassa al suo livello: «oggi è una giornata un po&apos; pesante?» Il bambino annuisce
            appena — non è opposizione, è stanchezza che a 8 anni non sa ancora dire con le parole
            giuste. L&apos;istruttore riduce l&apos;esercizio, senza farne un problema. Il bambino
            lo fa.
          </p>
        </div>
        <p className="lede">
          <strong>
            Tre rifiuti, tre intenzioni diverse — sfidare chi comanda, proteggersi dallo sguardo dei
            coetanei, o semplicemente reggere una stanchezza che non sa ancora spiegare a parole — e tre
            risposte diverse, ognuna rivolta all&apos;intenzione vera, non al rifiuto in sé.
          </strong>
        </p>
        <p className="prompt">
          Una bambina di 6 anni, al terzo tentativo di entrare in acqua, si mette a piangere e dice
          «no, non voglio, basta». Scrivi cosa fai — non cosa le dici per convincerla, ma cosa fai
          per capire cosa c&apos;è sotto quel «no».
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Nota per la correzione, non mostrata all'istruttore: il sistema cerca se cerca di
            capire la causa (paura? stanchezza? qualcosa successo prima?) invece di insistere
            direttamente sull'entrare in acqua. */}
        <h2>Simulazione</h2>
        <p className="lede">
          <strong>RICCARDO, 16 anni.</strong> Incrocia le braccia: «non ho voglia di fare questo
          esercizio, punto.» Cosa gli rispondi?
        </p>
        <OptionGroup
          name="sim"
          options={[
            { value: "impone", label: "Spieghi di nuovo perché serve l'esercizio, o gli dici che deve farlo comunque" },
            {
              value: "capisce",
              label: "Cerchi cosa c'è sotto, o gli offri una scelta dentro un confine — es. «quale altro esercizio ti andrebbe di provare?»",
            },
          ]}
          selected={answers.sim}
          onPick={(v) => setResponse("sim", v)}
        />
        {answers.sim === "impone" && (
          <div className="feedback retry">
            RICCARDO: «Ho detto di no.» <em>(si allontana, resta fuori dall&apos;esercizio)</em>
          </div>
        )}
        {answers.sim === "capisce" && (
          <>
            <div className="feedback ok">
              RICCARDO: «...boh, magari i tuffi.» <em>(si avvicina di nuovo al gruppo)</em>
              <br />
              Non hai ceduto sulla sostanza — l&apos;allenamento continua. Hai ceduto sul chi
              sceglie, e a 16 anni è spesso quello che conta davvero.
            </div>
            <p className="lede" style={{ marginTop: 14 }}>
              Dopo un paio di tuffi, Riccardo si ferma di nuovo: «no, basta anche questo, non mi va
              più niente oggi.»
            </p>
            <p className="prompt">Scrivi cosa fai adesso.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup
              name="sim2"
              options={[
                { value: "ancora", label: "Cerchi ancora una terza alternativa, e poi una quarta" },
                { value: "confine", label: "Dopo un vero secondo tentativo già offerto, dici chiaramente qual è il limite, con calma" },
              ]}
              selected={answers.sim2}
              onPick={(v) => setResponse("sim2", v)}
            />
            {answers.sim2 === "ancora" && (
              <div className="feedback retry">
                RICCARDO capisce che rifiutare funziona sempre — ogni «no» ottiene una nuova
                proposta, senza mai un confine reale.
              </div>
            )}
            {answers.sim2 === "confine" && (
              <div className="feedback ok">
                RICCARDO: «...ok» <em>(resta nel gruppo, senza protestare oltre)</em>
                <br />
                Cercare l&apos;intenzione buona non vuol dire inseguirla all&apos;infinito: un vero
                tentativo, non zero tentativi — e nemmeno una trattativa senza fine.
              </div>
            )}
          </>
        )}
      </>
    ),
  },

  // 4 — mercoledì sera: trasferimento
  {
    day: "mercoledì sera",
    pct: 60,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controllo di fine giornata — trasferimento</div>
        <h1>Non ci riesce, o non ci sta?</h1>
        <p className="lede">
          Una bambina di 9 anni, senza alzare la voce, dice semplicemente: «non ci provo nemmeno,
          tanto non mi riesce mai.» Non è arrabbiata, sembra rassegnata.
        </p>
        <p className="prompt">
          È «non ci riesce» o «non ci sta»? Cosa ti fa pensare che sia l&apos;una piuttosto che
          l&apos;altra?
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Nota per la correzione, non mostrata all'istruttore: non ha una risposta ovvia — è
            voluto. Il sistema controlla se ragiona sul segnale (rassegnazione, non opposizione
            attiva) invece di applicare automaticamente lo schema visto negli esempi di oggi.
            Potrebbe essere entrambe le cose insieme: una difficoltà tecnica reale che, ripetuta,
            si è trasformata in rifiuto di riprovare. */}
      </>
    ),
  },

  // 5 — turno in vasca
  {
    day: "in vasca",
    pct: 68,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Il tuo turno in vasca</div>
        <h1>Prima l&apos;intenzione, poi la risposta</h1>
        <p className="lede">
          Questa settimana, con chi rifiuta qualcosa: prima di insistere, cerca l&apos;intenzione
          buona sotto il rifiuto. Non deve giustificarti niente — deve solo darti una leva diversa
          da quella che stavi per usare.
        </p>
      </>
    ),
  },

  // 6 — venerdì: test cumulativo Cap.8 + Cap.9
  {
    day: "venerdì · 11 min",
    pct: 86,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Venerdì — test cumulativo: Capitolo 8 + Capitolo 9</div>
        <h1>Il test</h1>
        <p className="prompt">1. «Non ci riesce» e «non ci sta» sono lo stesso problema?</p>
        <OptionGroup
          name="t1"
          options={[
            { value: "si", label: "Sì — nella pratica il rifiuto e la difficoltà si affrontano allo stesso modo", correct: false },
            { value: "no", label: "No — uno è didattico, l'altro è di relazione", correct: true },
          ]}
          selected={answers.t1}
          onPick={(v, correct) => setResponse("t1", v, correct)}
        />
        <p className="prompt">2. Un bambino che rifiuta ha bisogno soprattutto di:</p>
        <OptionGroup
          name="t2"
          options={[
            { value: "capisce", label: "Che tu capisca cosa c'è sotto il rifiuto", correct: true },
            { value: "spiega", label: "Un'altra spiegazione più chiara", correct: false },
          ]}
          selected={answers.t2}
          onPick={(v, correct) => setResponse("t2", v, correct)}
        />
        <p className="prompt">3. Un ragazzo di 15 anni ti sfida davanti al gruppo. È probabile che stia mettendo alla prova cosa?</p>
        <OptionGroup
          name="t3"
          options={[
            { value: "tecnica", label: "La tua competenza tecnica", correct: false },
            { value: "controllo", label: "Se hai il controllo della situazione", correct: true },
          ]}
          selected={answers.t3}
          onPick={(v, correct) => setResponse("t3", v, correct)}
        />
        <p className="prompt">4. Una ragazza di 12 anni rifiuta un esercizio nuovo davanti al gruppo. Cosa protegge più probabilmente?</p>
        <OptionGroup
          name="t4"
          options={[
            { value: "vergogna", label: "Non vuole sbagliare davanti alle amiche", correct: true },
            { value: "sfida", label: "Vuole sfidare l'autorità dell'istruttore", correct: false },
          ]}
          selected={answers.t4}
          onPick={(v, correct) => setResponse("t4", v, correct)}
        />
        <p className="prompt">
          5. <em>(dal Capitolo 8)</em> Se un modo non funziona, la cosa giusta è:
        </p>
        <OptionGroup
          name="t5"
          options={[
            { value: "forte", label: "Ripeterlo più forte", correct: false },
            { value: "diverso", label: "Usarne uno diverso", correct: true },
          ]}
          selected={answers.t5}
          onPick={(v, correct) => setResponse("t5", v, correct)}
        />
        <p className="prompt">6. Il rifiuto è sempre rumoroso e ad alta voce?</p>
        <OptionGroup
          name="t6"
          options={[
            { value: "no", label: "No — può essere anche silenzioso, un tirarsi indietro senza dramma", correct: true },
            { value: "si", label: "Sì — un rifiuto vero si vede sempre, altrimenti non è reale", correct: false },
          ]}
          selected={answers.t6}
          onPick={(v, correct) => setResponse("t6", v, correct)}
        />
        <p className="prompt">7. Un bambino di 8 anni incrocia le braccia e non risponde, davanti a un esercizio che sapeva già fare. Cosa può nascondere, oltre a sfida o vergogna?</p>
        <OptionGroup
          name="t7"
          options={[
            { value: "niente", label: "Niente, a quell'età è sempre capriccio", correct: false },
            { value: "stanchezza", label: "Anche una stanchezza che non sa ancora esprimere a parole", correct: true },
          ]}
          selected={answers.t7}
          onPick={(v, correct) => setResponse("t7", v, correct)}
        />
        <p className="prompt">8. Se anche la seconda proposta viene rifiutata, bisogna continuare a cercarne altre all&apos;infinito?</p>
        <OptionGroup
          name="t8"
          options={[
            { value: "si", label: "Sì, finché non si trova quella giusta", correct: false },
            { value: "no", label: "No — dopo un vero secondo tentativo, va bene dire chiaramente qual è il limite, con calma", correct: true },
          ]}
          selected={answers.t8}
          onPick={(v, correct) => setResponse("t8", v, correct)}
        />
        <p className="prompt">9. Dire chiaramente qual è il limite, dopo un vero tentativo di capire, è in contraddizione con «cercare l&apos;intenzione buona»?</p>
        <OptionGroup
          name="t9"
          options={[
            { value: "si", label: "Sì, bisogna insistere finché il rifiuto non finisce", correct: false },
            { value: "no", label: "No — cercare l'intenzione non vuol dire inseguirla all'infinito", correct: true },
          ]}
          selected={answers.t9}
          onPick={(v, correct) => setResponse("t9", v, correct)}
        />
        <p className="prompt">
          10. Un bambino di 8 anni rifiuta un esercizio che aveva già fatto bene la settimana
          scorsa. Scrivi in due righe cosa fai prima di insistere.
        </p>
        <Field id="t10" value={answers.t10 ?? ""} onChange={(v) => setReflection("t10", v)} />
      </>
    ),
  },

  // 7 — feedback: spiega come funziona la correzione (§10, D34)
  {
    day: "venerdì · feedback",
    pct: 88,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">§10 · Feedback</div>
        <h1>Ecco cosa dicono le tue risposte</h1>
        <p className="lede">Non su di te — su quello che hai fatto in queste domande.</p>
        <p className="lede" style={{ fontSize: ".85rem", fontStyle: "italic" }}>
          Esempio di feedback generato, in caso di errore alla domanda 2:
        </p>
        <div className="card quote">
          Hai risposto che serve un&apos;altra spiegazione più chiara. Ma se il problema non è che
          non capisce — è che non vuole — spiegare di nuovo non cambia niente, perché non è quello
          il punto. Prima capisci cosa c&apos;è sotto, poi decidi cosa dire.
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Il feedback non dice mai «hai sbagliato» e basta: dice cosa guardare la prossima volta.
          Il tono resta sempre sul comportamento osservato, mai sulla persona — la stessa regola
          del Capitolo 7.
        </p>
      </>
    ),
  },

  // 8 — recupero: solo se il test del venerdì ha troppi errori (§12, D25/D27)
  {
    day: "recupero",
    pct: 91,
    nextLabel: "Continua ▸",
    showBack: true,
    visible: (a) => {
      const corrette: Record<string, string> = {
        t1: "no", t2: "capisce", t3: "controllo", t4: "vergogna", t5: "diverso",
        t6: "no", t7: "stanchezza", t8: "no", t9: "no",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recupero — solo perché il test ha trovato qualche difficoltà</div>
        <h1>Tre esempi in più, per allenare il confine</h1>
        <p className="lede">
          Non è un fallimento: è solo il segnale che vale la pena rivedere il punto più delicato di
          questo capitolo con qualche esempio in più — riconoscere il rifiuto prima di reagire.
        </p>

        <div className="card scene">
          <div className="who">Un bambino di 10 anni</div>
          <p>
            Si ferma davanti a un tuffo nuovo e dice, secco: «non lo faccio.» L&apos;istruttore, per
            abitudine, ripete la spiegazione tecnica — più lenta, più dettagliata — convinto che
            basti farsi capire meglio.
          </p>
        </div>
        <p className="prompt">È la risposta giusta a un rifiuto?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "si", label: "Sì — se la spiegazione è più chiara, di solito il rifiuto si scioglie", correct: false },
            {
              value: "no",
              label: "No — un rifiuto non si risolve con una spiegazione più chiara: prima bisogna capire cosa c'è sotto",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Alessia, 11 anni</div>
          <p>
            Durante il riscaldamento, ad alta voce, davanti al gruppo: «non voglio fare giochetti da
            bambini piccoli.» La settimana scorsa, proprio su quell&apos;esercizio, aveva sbagliato
            davanti a tutti.
          </p>
        </div>
        <p className="prompt">Cosa protegge, più probabilmente, il suo rifiuto?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "sfida", label: "Vuole sfidare l'autorità dell'istruttore", correct: false },
            {
              value: "imbarazzo",
              label: "Si sta proteggendo da un imbarazzo già vissuto, non dall'esercizio in sé",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Davide, 14 anni</div>
          <p>
            Rifiuta la prima proposta. L&apos;istruttore ne offre una seconda, calibrata: rifiutata
            anche quella. Offre una terza, poi accenna a una quarta.
          </p>
        </div>
        <p className="prompt">È corretto continuare a offrire alternative all&apos;infinito?</p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "si", label: "Sì, finché non si trova quella giusta", correct: false },
            {
              value: "no",
              label: "No — dopo un vero secondo tentativo, va bene fermarsi e dire chiaramente qual è il limite, con calma",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Il rifiuto non è mai la richiesta vera: è il sintomo. E cercare l&apos;intenzione buona non
          vuol dire inseguirla all&apos;infinito — un vero tentativo, non zero tentativi, e nemmeno
          una trattativa senza fine.
        </p>
      </>
    ),
  },

  // 9 — risultato
  {
    day: "venerdì · risultato",
    pct: 95,
    nextLabel: "Vai alla Dashboard ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">§11 · Risultato</div>
        <h1>Il tuo profilo si aggiorna</h1>
        <div className="card">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".86rem" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>Punteggio</th>
                <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>Da cosa nasce</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>knowledge_score</td>
                <td style={{ padding: "6px 0" }}>Le 10 domande del test</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>application_score</td>
                <td style={{ padding: "6px 0" }}>La risposta al §7</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Come hai gestito Riccardo al §8, in entrambi gli scambi</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>Il racconto di lunedì sul Capitolo 8</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Situazioni difficili</td>
                <td style={{ padding: "6px 0" }}>Il più basso dei precedenti</td>
                <td style={{ textAlign: "right" }}>✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },

  // 10 — dashboard
  {
    day: "dashboard",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ vakProfile, answers }: StepContext) => (
      <>
        <div className="done-badge">✓ Capitolo 9 completato</div>
        <div className="eyebrow">Settimana 9 di 10 · Capitolo 10 in arrivo</div>
        <h1>Lasciarlo andare</h1>
        <p className="lede">
          Hai imparato a leggere, a entrare in sintonia, a comunicare, a verificare, a correggere, a
          cambiare strada, a reggere il rifiuto. La settimana prossima chiude il cerchio: come fai
          in modo che, un giorno, non serva più.
        </p>
        <ChapterVakSection vakProfile={vakProfile} />
        <ChapterDiarySection answers={answers} keys={DIARY_KEYS} />
        <h2>Il tuo progresso</h2>
        <div className="chip-grid">
          <div className="chip consolidata">
            <span className="name">1 · Consapevolezza personale</span>
            <span className="state">consolidata</span>
          </div>
          <div className="chip consolidata">
            <span className="name">2 · Riconoscimento dell&apos;allievo</span>
            <span className="state">consolidata</span>
          </div>
          <div className="chip consolidata">
            <span className="name">3 · Osservare e interpretare <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">consolidata</span>
          </div>
          <div className="chip consolidata">
            <span className="name">4 · Sintonia</span>
            <span className="state">consolidata</span>
          </div>
          <div className="chip consolidata">
            <span className="name">5 · Consegne e congruenza</span>
            <span className="state">consolidata</span>
          </div>
          <div className="chip consolidata">
            <span className="name">6 · Verificare con l&apos;azione <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">consolidata</span>
          </div>
          <div className="chip consolidata">
            <span className="name">7 · Il ritorno</span>
            <span className="state">consolidata</span>
          </div>
          <div className="chip consolidata">
            <span className="name">8 · Cambiare strada</span>
            <span className="state">consolidata</span>
          </div>
          <div className="chip acquisita">
            <span className="name">9 · Situazioni difficili</span>
            <span className="state">acquisita</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">10 · Autonomia</span>
            <span className="state">non acquisita</span>
          </div>
        </div>
      </>
    ),
  },
];
