import { OptionGroup, type Option } from "@/components/OptionGroup";
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

const SIM_OPTIONS: Option[] = [
  { value: "correggi", label: "Le dai comunque una correzione tecnica, per abitudine" },
  { value: "chiedi", label: "Le chiedi cosa ne pensa lei, per prima" },
];

const SIM2_OPTIONS: Option[] = [
  { value: "ancora", label: "Le rispondi ancora «tu che ne pensi?», come per l'esercizio di prima" },
  { value: "indica", label: "Le dai un'indicazione tecnica, perché è un esercizio nuovo, non ancora consolidato" },
];

const DIARY_KEYS = ["q2","q7","q7b","qtrasf","t10","qchiusura"];

export const capitolo10Steps: Step[] = [
  // 0 — copertina
  {
    day: "inizio",
    pct: 0,
    nextLabel: "Inizia ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capitolo 10 · LASCIARLO ANDARE</div>
        <h1>L&apos;ultimo capitolo</h1>
        <p className="lede">
          L&apos;istruttore riconosce quando un allievo non ha più bisogno di lui su una cosa
          specifica — e applica a se stesso la stessa regola che ha imparato a dare ai bambini: non
          esistono fallimenti, solo feedback.
        </p>
      </>
    ),
  },

  // 1 — lunedì: consolidamento Capitolo 9
  {
    day: "lunedì · 10 min",
    pct: 10,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Lunedì</div>
        <h1>Com&apos;è andata in vasca?</h1>
        <p className="lede">
          La settimana scorsa: con chi rifiutava qualcosa, cercare l&apos;intenzione buona prima di
          insistere. Ti è capitato di doverlo fare? Com&apos;è andata?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidamento — il Capitolo 9 torna</h2>
        <p className="prompt">1. «Non ci riesce» e «non ci sta» sono lo stesso problema?</p>
        <OptionGroup
          name="k1"
          options={[
            { value: "no", label: "No — uno è un problema didattico, l'altro di relazione", correct: true },
            { value: "si", label: "Sì — in pratica si risolvono allo stesso modo", correct: false },
          ]}
          selected={answers.k1}
          onPick={(v, correct) => setResponse("k1", v, correct)}
        />
        <p className="prompt">2. Un bambino che rifiuta ha bisogno soprattutto di:</p>
        <OptionGroup
          name="k2"
          options={[
            { value: "spiega", label: "Una spiegazione più chiara", correct: false },
            { value: "capisce", label: "Che tu capisca cosa c'è sotto", correct: true },
          ]}
          selected={answers.k2}
          onPick={(v, correct) => setResponse("k2", v, correct)}
        />
        <p className="prompt">3. Trovare l&apos;intenzione buona dietro un rifiuto giustifica il comportamento?</p>
        <OptionGroup
          name="k3"
          options={[
            { value: "no", label: "No — ti dà solo una leva diversa da tirare", correct: true },
            { value: "si", label: "Sì — se capisci perché lo fa, allora va bene lasciarlo fare", correct: false },
          ]}
          selected={answers.k3}
          onPick={(v, correct) => setResponse("k3", v, correct)}
        />
        <p className="prompt">4. Il rifiuto è sempre rumoroso, ad alta voce?</p>
        <OptionGroup
          name="k4"
          options={[
            { value: "si", label: "Sì — altrimenti non lo noteresti nemmeno", correct: false },
            { value: "no", label: "No — può essere anche un tirarsi indietro silenzioso", correct: true },
          ]}
          selected={answers.k4}
          onPick={(v, correct) => setResponse("k4", v, correct)}
        />
        <p className="prompt">
          5. Se anche una seconda proposta viene rifiutata, la cosa giusta è continuare a cercarne
          altre all&apos;infinito?
        </p>
        <OptionGroup
          name="k5"
          options={[
            { value: "no", label: "No — dopo un vero secondo tentativo, va bene fermarsi con calma", correct: true },
            { value: "si", label: "Sì, finché non si trova quella giusta", correct: false },
          ]}
          selected={answers.k5}
          onPick={(v, correct) => setResponse("k5", v, correct)}
        />
        <p className="prompt">
          6. Un rifiuto silenzioso — braccia incrociate, nessuna parola — può nascondere
          semplicemente stanchezza, non sfida?
        </p>
        <OptionGroup
          name="k6"
          options={[
            { value: "si", label: "Sì — a volte non è opposizione, solo stanchezza che non sa ancora dire a parole", correct: true },
            { value: "no", label: "No, è sempre capriccio", correct: false },
          ]}
          selected={answers.k6}
          onPick={(v, correct) => setResponse("k6", v, correct)}
        />
      </>
    ),
  },

  // 2 — martedì: sapere quando smettere di essere necessario
  {
    day: "martedì · 15 min",
    pct: 20,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3 && !!a.m4,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Martedì</div>
        <h1>Sapere quando smettere di essere necessario</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Hai imparato a leggere, entrare in sintonia, comunicare, verificare, correggere, cambiare
          strada, reggere il rifiuto. L&apos;ultima competenza è la più difficile di tutte: sapere
          quando smettere di essere necessario.
        </p>
        <p className="lede">
          Ogni cosa che hai imparato in questo corso — osservare, entrare in sintonia, dare la
          consegna giusta, cambiare strada — ha un unico vero traguardo: un bambino che, su quella
          cosa, un giorno non ha più bisogno di te.
        </p>
        <p className="lede">
          È facile dimenticarlo, perché ogni giorno il tuo lavoro si giudica da quanto sei
          presente, attento, pronto a intervenire. Ma un istruttore che interviene sempre, anche
          quando non serve più, sta rallentando esattamente la cosa che voleva ottenere. Riconoscere
          il momento in cui un bambino può fare da solo — un esercizio che prima seguivi passo
          passo, un gesto che prima correggevi ogni volta — è un atto di fiducia, non di abbandono.
          Vuol dire dirgli, senza parole, «questo lo sai già fare. Fallo.»
        </p>
        <p className="lede">
          <strong>Ma come fai a sapere se è già quel momento, o se è ancora troppo presto?</strong>{" "}
          Un segnale utile: l&apos;allievo ha fatto suo un gesto davvero quando lo esegue
          identico anche quando non ti sente vicino, e non si volta a cercare la tua approvazione
          appena ha finito. Se invece esegue bene solo quando sa che lo stai guardando, o si blocca a
          cercarti con gli occhi in attesa di un verdetto, è ancora presto: non ha ancora fatto suo il
          gesto — si è abituato alla tua presenza, non al movimento. Lasciarlo andare in quel momento non sarebbe
          fiducia: sarebbe un azzardo travestito da fiducia.
        </p>
        <div className="card quote">
          E la stessa regola che hai insegnato a leggere nell&apos;errore del bambino — non esistono
          fallimenti, solo feedback — oggi la applichi a te. Ogni turno che non è andato come volevi
          non è un fallimento tuo: è un&apos;informazione su cosa provare diversamente la prossima
          volta. Il Capitolo 1 ti ha chiesto di scoprire come comunichi tu. Questo capitolo ti chiede
          di continuare a scoprirlo, ogni settimana, per il resto della tua carriera — non solo
          durante questo corso.
        </div>
        <p className="lede">
          Le due metà di questo capitolo dicono la stessa cosa, vista da due lati diversi. Lasciare
          andare un allievo che non ha più bisogno di te, e lasciare andare l&apos;idea di aver
          «fallito» un turno andato male: sono lo stesso gesto. In entrambi i casi si tratta di
          fidarsi che il ciclo — osservare, provare, correggere — funzioni anche senza il tuo
          controllo continuo, sul bambino o su te stesso.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controllo di fine giornata</h2>
        <p className="prompt">1. Un istruttore che interviene sempre, anche quando non serve, sta aiutando l&apos;allievo?</p>
        <OptionGroup
          name="m1"
          options={[
            { value: "no", label: "No — sta rallentando l'autonomia che voleva ottenere", correct: true },
            { value: "si", label: "Sì — più presente è, meglio è per l'allievo", correct: false },
          ]}
          selected={answers.m1}
          onPick={(v, correct) => setResponse("m1", v, correct)}
        />
        <p className="prompt">2. Un turno andato male è un fallimento dell&apos;istruttore?</p>
        <OptionGroup
          name="m2"
          options={[
            { value: "si", label: "Sì — se il turno va male, vuol dire che ha sbagliato qualcosa", correct: false },
            { value: "no", label: "No — è un'informazione su cosa provare diversamente", correct: true },
          ]}
          selected={answers.m2}
          onPick={(v, correct) => setResponse("m2", v, correct)}
        />
        <p className="prompt">
          3. Un allievo esegue bene un gesto solo quando sente l&apos;istruttore vicino, e si blocca
          a cercarlo con lo sguardo appena finisce. È il momento di lasciarlo andare su quella cosa?
        </p>
        <OptionGroup
          name="m3"
          options={[
            { value: "no", label: "No — non ha ancora fatto suo il gesto, si è abituato alla tua presenza, non al movimento", correct: true },
            { value: "si", label: "Sì — se esegue bene, vuol dire che il gesto è acquisito", correct: false },
          ]}
          selected={answers.m3}
          onPick={(v, correct) => setResponse("m3", v, correct)}
        />
        <p className="prompt">
          4. Un allievo ripete lo stesso gesto identico anche quando l&apos;istruttore guarda
          altrove, senza cercare conferma. Cosa segnala?
        </p>
        <OptionGroup
          name="m4"
          options={[
            { value: "fortuna", label: "Che ha solo avuto fortuna", correct: false },
            { value: "suo", label: "Che il gesto è ormai suo, non più legato alla tua presenza", correct: true },
          ]}
          selected={answers.m4}
          onPick={(v, correct) => setResponse("m4", v, correct)}
        />
      </>
    ),
  },

  // 3 — mercoledì: due «lasciare andare» + simulazione Giulia
  {
    day: "mercoledì",
    pct: 30,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.sim && (a.sim === "correggi" || !!a.sim2),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Mercoledì</div>
        <h1>Due «lasciare andare», nello stesso turno</h1>
        <div className="card scene">
          <div className="who">Un bambino di 10 anni</div>
          <p>
            Un anno prima aveva bisogno che l&apos;istruttore lo guardasse a ogni bracciata per
            correggerlo. Oggi nuota una vasca intera senza che nessuno intervenga, e la tecnica
            regge. L&apos;istruttore, per abitudine, si avvicina comunque al bordo, pronto a
            correggere qualcosa appena finisce. Poi si ferma, e non dice niente: lascia che il
            bambino stesso guardi la propria vasca, si giudichi da solo — «come ti è sembrata?» —
            invece di dargli lui il verdetto.
          </p>
          <p>
            Non è che l&apos;istruttore non abbia più niente da dire. È che, su questa cosa
            specifica, dirlo lui invece di lasciarglielo scoprire sarebbe un passo indietro, non
            avanti.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Lo stesso istruttore, la sera</div>
          <p>
            Con un altro bambino del gruppo aveva provato lo stesso silenzio — restare zitto e
            lasciare che si correggesse da solo. Ma con quel bambino l&apos;errore non si è
            corretto: si è consolidato, ripetuto identico per tutta la vasca. Per un attimo pensa:
            «ho sbagliato, dovevo intervenire.» Poi si ferma, e applica a se stesso la stessa regola
            che userebbe con un allievo: non è un fallimento — è un&apos;informazione. La prossima
            volta, prima di restare in silenzio, guarderà un attimo di più per essere sicuro che
            l&apos;esercizio sia davvero già acquisito, e non solo sembri esserlo.
          </p>
          <p>
            Due «lasciare andare» nello stesso turno — uno riuscito, uno da correggere — e
            l&apos;istruttore tratta il secondo esattamente come tratterebbe l&apos;errore di un
            bambino: senza etichettarsi, solo prendendo nota di cosa cambiare.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Un ragazzo di 15 anni, Marco</div>
          <p>
            Da due mesi nuota gli ottanta metri di dorso senza una sola correzione: il tecnico
            ormai è solido, e l&apos;istruttore lo sa. Un turno, per abitudine, si allontana un poco
            più del solito, guardando anche gli altri bambini del gruppo. Marco, arrivato al bordo,
            chiede: «tutto ok? Non mi hai guardato manco una volta.» Non è una domanda tecnica — è
            un dubbio su una cosa diversa: essere ancora seguito. L&apos;istruttore risponde: «ti ho
            guardato, e infatti non ho detto niente — vuol dire che andava bene.» Marco resta un
            attimo zitto, poi sorride.
          </p>
        </div>
        <p className="lede">
          <strong>
            Lasciare andare non significa smettere di guardare: significa smettere di intervenire
            quando guardare basta.
          </strong>{" "}
          Ma per l&apos;allievo, dall&apos;esterno, le due cose possono sembrare identiche — ed è
          per questo che, a volte, vale la pena dirlo a voce, non solo farlo in silenzio.
        </p>
        <p className="prompt">
          Pensa a un allievo che segui da tempo, e a una cosa specifica che ormai sa fare bene senza
          il tuo intervento costante. Scrivi cosa faresti diversamente, la prossima volta, per
          lasciargli più spazio — senza sparire del tutto.
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Nota per la correzione, non mostrata all'istruttore: non c'è una risposta giusta. Il
            sistema guarda se sta descrivendo un passo indietro graduale (osservare invece di
            correggere, chiedere il suo giudizio invece di dare il tuo) e non un abbandono totale
            né un controllo che resta identico. */}
        <h2>Simulazione</h2>
        <p className="lede">
          <strong>GIULIA, 11 anni.</strong> Ha appena completato un esercizio tecnico che, fino a un
          mese fa, richiedeva una correzione a ogni tentativo. Oggi non ne ha avuta bisogno. Cosa le
          dici, subito dopo?
        </p>
        <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
        {answers.sim === "correggi" && (
          <div className="feedback retry">
            GIULIA: «...ok.» <em>(esegue di nuovo aspettando, come sempre, il tuo giudizio finale)</em>
          </div>
        )}
        {answers.sim === "chiedi" && (
          <div className="feedback ok">
            GIULIA: «...credo di essermi allungata meglio stavolta. È vero?»{" "}
            <em>(ti guarda, ma ha già dato il suo giudizio prima di chiedere il tuo)</em>
            <br />
            Piccola differenza, effetto grande: nel secondo caso Giulia sta imparando a valutarsi da
            sola — che è, letteralmente, l&apos;obiettivo di questo intero capitolo.
          </div>
        )}
        {answers.sim === "chiedi" && (
          <div>
            <p className="lede" style={{ marginTop: 14 }}>
              Subito dopo, Giulia prova un secondo esercizio — mai fatto prima, un tuffo di partenza.
              Lo esegue in modo incerto, poi si volta e aspetta, zitta, il tuo giudizio.
            </p>
            <p className="prompt">Scrivi cosa fai adesso.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup
              name="sim2"
              options={SIM2_OPTIONS}
              selected={answers.sim2}
              onPick={(v) => setResponse("sim2", v)}
            />
            {answers.sim2 === "ancora" && (
              <div className="feedback retry">
                GIULIA resta ferma, incerta, senza sapere se va bene o no. Lasciare spazio funziona
                quando la base è già solida. Su un gesto nuovo, il silenzio non è fiducia: è
                lasciarla sola — proprio il segnale del martedì, letto al contrario.
              </div>
            )}
            {answers.sim2 === "indica" && (
              <div className="feedback ok">
                GIULIA annuisce e riprova, con l&apos;indicazione in mente. Lasciare andare non è
                una regola fissa uguale per ogni esercizio: dipende da cosa è già acquisito e cosa
                no.
              </div>
            )}
          </div>
        )}
      </>
    ),
  },

  // 4 — mercoledì sera: trasferimento
  {
    day: "mercoledì sera",
    pct: 42,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controllo di fine giornata — trasferimento</div>
        <h1>Quando il silenzio non basta</h1>
        <p className="lede">
          Hai provato, con un allievo, a restare in silenzio su un esercizio che credevi già
          acquisito — ma lui ha comunque sbagliato, in un modo che non ti aspettavi.
        </p>
        <p className="prompt">
          Cosa pensi, in quel momento — e cosa fai la volta successiva? Scrivi il tuo ragionamento,
          non solo la conclusione.
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Nota per la correzione, non mostrata all'istruttore: il sistema cerca se applica a se
            stesso la stessa regola del martedì — non un fallimento, un'informazione — invece di
            concludere che «lasciare andare» sia stato un errore da non ripetere mai più. */}
      </>
    ),
  },

  // 5 — in vasca
  {
    day: "in vasca",
    pct: 52,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Il tuo turno in vasca</div>
        <h1>Parti dal silenzio</h1>
        <p className="lede">
          Questa settimana, scegli un esercizio intero e non dire niente per tutta la sua durata a
          un allievo che lo sa già fare bene. Solo guarda. Se serve intervenire, intervieni — ma
          parti dal silenzio, non dal commento.
        </p>
      </>
    ),
  },

  // 6 — venerdì: test cumulativo Capitolo 9 + Capitolo 10
  {
    day: "venerdì · 11 min",
    pct: 70,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Venerdì — test cumulativo: Capitolo 9 + Capitolo 10</div>
        <h1>Il test</h1>
        <p className="prompt">1. Un istruttore che interviene sempre, anche quando non serve, sta:</p>
        <OptionGroup
          name="t1"
          options={[
            { value: "bene", label: "Facendo bene il suo lavoro", correct: false },
            { value: "rallenta", label: "Rallentando l'autonomia che voleva ottenere", correct: true },
          ]}
          selected={answers.t1}
          onPick={(v, correct) => setResponse("t1", v, correct)}
        />
        <p className="prompt">2. Un turno andato male è un fallimento dell&apos;istruttore?</p>
        <OptionGroup
          name="t2"
          options={[
            { value: "no", label: "No — è un'informazione su cosa provare diversamente", correct: true },
            { value: "si", label: "Sì — un turno andato male vuol dire che ha sbagliato qualcosa", correct: false },
          ]}
          selected={answers.t2}
          onPick={(v, correct) => setResponse("t2", v, correct)}
        />
        <p className="prompt">3. Lasciare più spazio a un allievo che sa già fare qualcosa significa:</p>
        <OptionGroup
          name="t3"
          options={[
            { value: "sparire", label: "Sparire del tutto", correct: false },
            { value: "graduale", label: "Un passo indietro graduale, non un abbandono", correct: true },
          ]}
          selected={answers.t3}
          onPick={(v, correct) => setResponse("t3", v, correct)}
        />
        <p className="prompt">
          4. Le due metà di questo capitolo — l&apos;autonomia del bambino e l&apos;errore
          dell&apos;istruttore — sono collegate?
        </p>
        <OptionGroup
          name="t4"
          options={[
            {
              value: "si",
              label: "Sì — sono lo stesso gesto: fidarsi che il ciclo funzioni senza controllo costante",
              correct: true,
            },
            { value: "no", label: "No, sono due argomenti diversi", correct: false },
          ]}
          selected={answers.t4}
          onPick={(v, correct) => setResponse("t4", v, correct)}
        />
        <p className="prompt">
          5. <em>(dal Capitolo 9)</em> «Non ci riesce» e «non ci sta» sono lo stesso problema?
        </p>
        <OptionGroup
          name="t5"
          options={[
            { value: "si", label: "Sì — nella pratica si affrontano allo stesso modo", correct: false },
            { value: "no", label: "No — uno è un problema didattico, l'altro di relazione", correct: true },
          ]}
          selected={answers.t5}
          onPick={(v, correct) => setResponse("t5", v, correct)}
        />
        <p className="prompt">
          6. Se un turno è andato male perché hai lasciato andare troppo presto, la conclusione
          giusta è «non lascerò mai più andare nessuno»?
        </p>
        <OptionGroup
          name="t6"
          options={[
            { value: "no", label: "No — la conclusione è calibrare meglio quando farlo, non smettere di farlo", correct: true },
            { value: "si", label: "Sì, meglio essere prudenti", correct: false },
          ]}
          selected={answers.t6}
          onPick={(v, correct) => setResponse("t6", v, correct)}
        />
        <p className="prompt">
          7. Un allievo esegue bene un gesto solo quando ti sente vicino, e cerca il tuo sguardo
          appena finisce. È già il momento di lasciarlo andare su quella cosa?
        </p>
        <OptionGroup
          name="t7"
          options={[
            { value: "si", label: "Sì — se lo esegue bene, il gesto è già acquisito", correct: false },
            { value: "no", label: "No — non ha ancora fatto suo il gesto, si è abituato alla tua presenza, non al movimento", correct: true },
          ]}
          selected={answers.t7}
          onPick={(v, correct) => setResponse("t7", v, correct)}
        />
        <p className="prompt">
          8. Un allievo nota che oggi lo guardi meno del solito e chiede se va tutto bene. Il
          silenzio, su un gesto già buono, è:
        </p>
        <OptionGroup
          name="t8"
          options={[
            { value: "complimento", label: "Un complimento, non una distrazione", correct: true },
            { value: "distrazione", label: "Una distrazione da correggere", correct: false },
          ]}
          selected={answers.t8}
          onPick={(v, correct) => setResponse("t8", v, correct)}
        />
        <p className="prompt">
          9. <em>(dal Capitolo 9)</em> Se anche una seconda proposta viene rifiutata, bisogna
          continuare a cercarne altre all&apos;infinito?
        </p>
        <OptionGroup
          name="t9"
          options={[
            { value: "si", label: "Sì, finché non si trova quella giusta", correct: false },
            { value: "no", label: "No — dopo un vero secondo tentativo, va bene fermarsi con calma", correct: true },
          ]}
          selected={answers.t9}
          onPick={(v, correct) => setResponse("t9", v, correct)}
        />
        <p className="prompt">
          10. Un allievo che segui da due anni ti chiede, per la prima volta, «come sono andato?»
          prima che tu dica qualcosa. Scrivi in due righe come rispondi.
        </p>
        <Field id="t10" value={answers.t10 ?? ""} onChange={(v) => setReflection("t10", v)} />
      </>
    ),
  },

  // 7 — feedback: spiega come funziona la correzione (§10)
  {
    day: "venerdì · feedback",
    pct: 73,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">§10 · Feedback</div>
        <h1>Ecco cosa dicono le tue risposte</h1>
        <p className="lede">Non su di te — su quello che hai fatto in queste domande.</p>
        <p className="lede" style={{ fontSize: ".85rem", fontStyle: "italic" }}>
          Esempio di feedback generato, in caso di errore alla domanda 1:
        </p>
        <div className="card quote">
          Hai risposto che intervenire sempre è fare bene il proprio lavoro. È comprensibile
          pensarlo — è quello che si vede di più. Ma il traguardo di ogni cosa insegnata è un
          allievo che, su quella cosa, non ha più bisogno di te. Intervenire quando non serve
          rallenta esattamente questo.
        </div>
      </>
    ),
  },

  // 8 — recupero: solo se il test del venerdì ha troppi errori (§12, D25/D27)
  {
    day: "recupero",
    pct: 76,
    nextLabel: "Continua ▸",
    showBack: true,
    visible: (a) => {
      const corrette: Record<string, string> = {
        t1: "rallenta", t2: "no", t3: "graduale", t4: "si", t5: "no",
        t6: "no", t7: "no", t8: "complimento", t9: "no",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recupero — solo perché il test ha trovato qualche difficoltà</div>
        <h1>Due esempi in più, per allenare il silenzio giusto</h1>
        <p className="lede">
          Non è un fallimento: è solo il segnale che vale la pena rivedere il punto più delicato di
          questo capitolo con qualche esempio in più — riconoscere quando tacere è la risposta
          giusta, e quando non lo è ancora.
        </p>

        <div className="card scene">
          <div className="who">Elena, 9 anni</div>
          <p>
            Un mese fa, la sua virata richiedeva una correzione quasi a ogni tentativo. Oggi la
            esegue da sola, si guarda le mani sott&apos;acqua e riemerge sorridendo — senza cercare
            lo sguardo dell&apos;istruttore. Lui si avvicina comunque al bordo, pronto a dire
            qualcosa.
          </p>
        </div>
        <p className="prompt">Qual è la cosa giusta da fare?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "correggi", label: "Le dà comunque un piccolo suggerimento tecnico, per abitudine", correct: false },
            {
              value: "tace",
              label: "Resta zitto — il sorriso senza cercare conferma dice che il gesto è già suo",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Filippo, 13 anni</div>
          <p>
            Esegue lo stesso esercizio tecnicamente bene. Ma dopo ogni tentativo si volta di scatto
            verso l&apos;istruttore, cercando un cenno, e resta fermo finché non lo ottiene.
          </p>
        </div>
        <p className="prompt">È già il momento di lasciarlo andare su questo esercizio?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "si", label: "Sì — se lo esegue bene tecnicamente, il gesto è acquisito", correct: false },
            {
              value: "no",
              label: "No — cerca ancora conferma: non ha ancora fatto suo il gesto, si è abituato alla tua presenza, non al movimento",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Lasciare andare non è una regola uguale per tutti: è il silenzio detto al momento giusto.
          Non troppo presto, quando l&apos;allievo ha ancora bisogno di te. Non troppo tardi, quando
          ormai sei tu ad averne l&apos;abitudine, non lui il bisogno.
        </p>
      </>
    ),
  },

  // 9 — venerdì: risultato
  {
    day: "venerdì · risultato",
    pct: 82,
    nextLabel: "Continua ▸",
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
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  knowledge_score
                </td>
                <td style={{ padding: "6px 0" }}>Le 9 domande del test</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  application_score
                </td>
                <td style={{ padding: "6px 0" }}>La risposta al §7</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  simulation_score
                </td>
                <td style={{ padding: "6px 0" }}>Come hai risposto a Giulia al §8</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  reflection_score
                </td>
                <td style={{ padding: "6px 0" }}>Il racconto di lunedì sul Capitolo 9</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  competency_score — Autonomia e miglioramento continuo
                </td>
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
    pct: 92,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: () => true,
    render: ({ vakProfile, answers }: StepContext) => (
      <>
        <div className="done-badge">✓ Capitolo 10 completato</div>
        <div className="eyebrow">Settimana 10 di 10 · corso concluso</div>
        <h1>I dieci capitoli, chiusi</h1>
        <p className="lede">
          Hai imparato a leggere, entrare in sintonia, comunicare, verificare, correggere, cambiare
          strada, reggere il rifiuto, lasciare andare. Manca solo un&apos;ultima riflessione, prima
          dell&apos;esame finale.
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
          <div className="chip consolidata">
            <span className="name">9 · Situazioni difficili</span>
            <span className="state">consolidata</span>
          </div>
          <div className="chip acquisita">
            <span className="name">10 · Autonomia e miglioramento</span>
            <span className="state">acquisita</span>
          </div>
        </div>
      </>
    ),
  },

  // 11 — chiusura: la chiusura, prima dell'esame
  {
    day: "chiusura",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="exam-badge"><i className="ph-duotone ph-flag-checkered" aria-hidden="true" /> La chiusura — prima dell&apos;esame</div>
        <h1>Ultima domanda, prima di andare avanti</h1>
        <p className="lede">
          Hai provato, questa settimana, a restare in silenzio su un esercizio che un allievo
          sapeva già fare. Com&apos;è andata? E, guardando indietro a tutte le dieci settimane: qual
          è la cosa che è cambiata di più — in un bambino, o in te?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Questa riflessione resta fra te e il tuo profilo: chi valuterà il tuo esame finale non la
          vedrà mai.
        </p>
        <div className="card quote">
          Da qui parte l&apos;esame finale. Non è un&apos;altra prova come le altre nove: è il
          momento in cui tutto quello che hai costruito — non solo quello che sai, ma quello che sai
          fare — viene messo insieme e verificato una volta sola, con calma. Non puoi fallirlo —
          puoi solo rimandarlo. Se non sei ancora pronto, si torna indietro, si rinforza quello che
          serve, e si riprova. Lo standard è lo stesso per tutti. La strada per arrivarci, come è
          stato per tutto il corso, resta tua.
        </div>
      </>
    ),
  },
];
