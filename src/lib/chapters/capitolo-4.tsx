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

const K1_OPTIONS: Option[] = [
  { value: "via", label: "Il tuo via libera, prima di lanciarsi", correct: true },
  { value: "coraggio", label: "Coraggio — crede di non essere abbastanza coraggioso", correct: false },
];
const K2_OPTIONS: Option[] = [
  { value: "si", label: "Sì — guardare e capire sono praticamente la stessa cosa", correct: false },
  {
    value: "no",
    label: "No — guardare è vedere che è successo qualcosa, capire è decidere cosa significa",
    correct: true,
  },
];
const K3_OPTIONS: Option[] = [
  { value: "no", label: "No — a volte manca ancora qualcos'altro, prima", correct: true },
  { value: "si", label: "Sì, per forza — se la causa è quella giusta il bambino si muove subito", correct: false },
];
const K4_OPTIONS: Option[] = [
  { value: "si", label: "Sì, una buona simulazione già dimostra che la competenza è acquisita", correct: false },
  { value: "no", label: "No — serve sempre almeno una vasca vera", correct: true },
];
const K5_OPTIONS: Option[] = [
  { value: "no", label: "No, i segnali restano sempre distinti", correct: false },
  {
    value: "si",
    label: "Sì — il segnale può cambiare mentre osservi, se l'attesa si allunga",
    correct: true,
  },
];
const K6_OPTIONS: Option[] = [
  {
    value: "misto",
    label: "Un misto fra aspettare il via libera e l'imbarazzo di un gruppo nuovo",
    correct: true,
  },
  { value: "dimenticato", label: "Aveva dimenticato come si fa il tuffo", correct: false },
];

const M1_OPTIONS: Option[] = [
  { value: "domanda", label: "Gli fai una domanda diretta per farlo parlare", correct: false },
  { value: "silenzio", label: "Per un momento, sei fermo e silenzioso anche tu", correct: true },
];
const M2_OPTIONS: Option[] = [
  {
    value: "tirare",
    label: "Tirare qualcuno per un braccio che non ti sta ancora seguendo",
    correct: true,
  },
  { value: "esempio", label: "Dare il buon esempio, così lo segue quasi subito", correct: false },
];
const M3_OPTIONS: Option[] = [
  {
    value: "torni",
    label: "Torni indietro di un passo: ritrovi il suo ritmo di nuovo, prima di riproporre la direzione",
    correct: true,
  },
  { value: "insisti", label: "Insisti — fino a un attimo fa andava tutto bene", correct: false },
];

const SIM_OPTIONS: Option[] = [
  { value: "diretta", label: "«Noa, vuoi entrare?»" },
  { value: "silenzio", label: "Ti siedi vicino a lei in silenzio, rispecchiando la sua immobilità" },
];
const SIM2_OPTIONS: Option[] = [
  { value: "minimizza", label: "«Ma dai, è solo acqua, non ti preoccupare»" },
  {
    value: "risolvi",
    label: "Le proponi una cuffia, o le dici che può tenere la testa fuori dall'acqua per oggi",
  },
];

const T1_OPTIONS: Option[] = [
  { value: "prima", label: "Prima", correct: true },
  { value: "dopo", label: "Dopo", correct: false },
];
const T2_OPTIONS: Option[] = [
  { value: "calma", label: "Dirgli subito di calmarsi", correct: false },
  { value: "asseconda", label: "Assecondare per un momento la sua energia, poi guidarla", correct: true },
];
const T3_OPTIONS: Option[] = [
  { value: "no", label: "No — funziona uguale, al contrario, con chi si accende", correct: true },
  {
    value: "si",
    label: "Sì — con chi si agita serve solo calmarlo, non assecondarlo",
    correct: false,
  },
];
const T4_OPTIONS: Option[] = [
  { value: "capito", label: "Non abbia capito", correct: false },
  { value: "paura", label: "Abbia paura", correct: true },
];
const T5_OPTIONS: Option[] = [
  { value: "no", label: "No — serve a creare le condizioni perché ti ascolti", correct: true },
  {
    value: "si",
    label: "Sì — è soprattutto una questione di piacere al bambino",
    correct: false,
  },
];
const T6_OPTIONS: Option[] = [
  { value: "si", label: "Sì, se hai ragione", correct: false },
  { value: "no", label: "No — anche avendo ragione, di solito non funziona", correct: true },
];
const T7_OPTIONS: Option[] = [
  { value: "insisti", label: "Insistere, perché fino a un attimo fa funzionava", correct: false },
  {
    value: "torna",
    label: "Tornare indietro di un passo e ritrovare il suo ritmo, prima di riproporre la direzione",
    correct: true,
  },
];
const T8_OPTIONS: Option[] = [
  { value: "no", label: "No — la forma cambia con l'età, ma l'ordine resta lo stesso", correct: true },
  { value: "si", label: "Sì, esattamente allo stesso modo", correct: false },
];
const T9_OPTIONS: Option[] = [
  { value: "rassicurato", label: "Si sente comunque rassicurato", correct: false },
  { value: "richiude", label: "Si richiude di nuovo — non si è sentito preso sul serio", correct: true },
];

const DIARY_KEYS = ["q2","q7","q7b","qtrasf","t10"];

export const capitolo4Steps: Step[] = [
  // 0 — copertina
  {
    day: "inizio",
    pct: 0,
    nextLabel: "Inizia ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capitolo 4 · LA SINTONIA</div>
        <h1>Perché dovrebbe darmi retta?</h1>
        <p className="lede">
          Davanti a un bambino chiuso o silenzioso — o davanti a uno agitato ed euforico —
          l&apos;istruttore si mette al suo ritmo per un momento prima di chiedergli qualsiasi
          cosa, invece di incalzarlo o di spegnerlo subito.
        </p>
      </>
    ),
  },

  // 1 — lunedì: riflessione + consolidamento Capitolo 3
  {
    day: "lunedì · 10 min",
    pct: 12,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Lunedì</div>
        <h1>Com&apos;è andata in vasca?</h1>
        <p className="lede">
          La settimana scorsa ti ho chiesto che, al primo bambino che si fermava o esitava, ti
          fermassi un secondo anche tu, e decidessi quale delle quattro cause ti sembrava più
          probabile. Come è andata? La lettura era quella giusta?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidamento — il Capitolo 3 torna</h2>
        <p className="prompt">
          1. Un bambino si ferma, ti cerca con gli occhi, il corpo non è teso. Cosa gli manca più
          probabilmente?
        </p>
        <OptionGroup name="k1" options={K1_OPTIONS} selected={answers.k1} onPick={(v, c) => setResponse("k1", v, c)} />
        <p className="prompt">2. Guardare e capire sono la stessa cosa?</p>
        <OptionGroup name="k2" options={K2_OPTIONS} selected={answers.k2} onPick={(v, c) => setResponse("k2", v, c)} />
        <p className="prompt">
          3. Hai capito bene la causa, ma il bambino continua a non muoversi. Vuol dire che avevi
          sbagliato lettura?
        </p>
        <OptionGroup name="k3" options={K3_OPTIONS} selected={answers.k3} onPick={(v, c) => setResponse("k3", v, c)} />
        <p className="prompt">4. Per la competenza del Capitolo 3, una buona simulazione basta per ECCELLENTE?</p>
        <OptionGroup name="k4" options={K4_OPTIONS} selected={answers.k4} onPick={(v, c) => setResponse("k4", v, c)} />
        <p className="prompt">
          5. Un bambino che sta solo aspettando il tuo via libera può, se aspetti troppo,
          cominciare a mostrare segnali di paura vera?
        </p>
        <OptionGroup name="k5" options={K5_OPTIONS} selected={answers.k5} onPick={(v, c) => setResponse("k5", v, c)} />
        <p className="prompt">
          6. Nell&apos;esempio di Nadia, 12 anni, cosa c&apos;era dietro la sua esitazione davanti
          a un gruppo diverso dal solito?
        </p>
        <OptionGroup name="k6" options={K6_OPTIONS} selected={answers.k6} onPick={(v, c) => setResponse("k6", v, c)} />
      </>
    ),
  },

  // 2 — martedì: spiegazione + controllo di fine giornata
  {
    day: "martedì · 13 min",
    pct: 30,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Martedì</div>
        <h1>Prima il suo ritmo, poi il tuo</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Anche quando leggi giusto la situazione, a volte il bambino non ti dà comunque retta.
          Oggi impari perché — e cosa fare, prima ancora di parlare.
        </p>
        <p className="lede">
          <strong>La sintonia non è essere simpatici.</strong> È creare, in pochi secondi, le
          condizioni perché un bambino sia disposto ad ascoltarti. Senza, anche la consegna più
          giusta rimbalza.
        </p>
        <p className="lede">
          <strong>Prima ti metti al suo ritmo.</strong> Se è fermo e silenzioso, per un attimo sei
          fermo e silenzioso anche tu. Se è agitato ed euforico, per un attimo assecondi
          l&apos;energia invece di spegnerla con un «calmati». Non stai imitando: stai dicendo,
          con il corpo, «sono qui con te, dove sei tu adesso».
        </p>
        <p className="lede">
          <strong>Solo dopo, lo guidi.</strong> Una volta che ha sentito che sei al suo passo, puoi
          proporre un piccolo passo nella direzione che vuoi tu.
        </p>
        <div className="card quote">
          Guidare prima di esserti messo al suo ritmo è come tirare qualcuno per un braccio che non
          ti sta ancora seguendo: puoi anche avere ragione, ma non funziona.
        </div>
        <p className="lede">
          Funziona con chi si chiude — e funziona uguale, al contrario, con chi si accende. Il
          primo movimento è sempre lo stesso: andare verso di lui, non chiedergli di venire subito
          verso di te.
        </p>
        <p className="lede">
          <strong>Un&apos;ultima cosa, prima di andare avanti.</strong> La sintonia non è un
          interruttore che, acceso una volta, resta acceso per tutto il turno: si può perdere a
          metà strada, e allora va ricostruita, non forzata. Un bambino che ti ha seguito per due
          esercizi può, al terzo, richiudersi di nuovo — magari è stanco, magari l&apos;esercizio
          nuovo lo ha spiazzato. La tentazione è insistere («dai, andava tutto bene fino a un
          attimo fa»), ma è di nuovo lo stesso errore: stai cercando di guidarlo mentre lui, in
          questo momento, non ti sta più seguendo. Torna indietro di un passo: ritrova il suo
          ritmo di nuovo, prima di riproporre la direzione. Non devi ricominciare da capo: devi
          solo applicare di nuovo la stessa regola di sempre.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controllo di fine giornata</h2>
        <p className="prompt">1. Un bambino è silenzioso e immobile. Cosa fai per primo?</p>
        <OptionGroup name="m1" options={M1_OPTIONS} selected={answers.m1} onPick={(v, c) => setResponse("m1", v, c)} />
        <p className="prompt">2. Guidare prima di esserti messo al suo ritmo è come:</p>
        <OptionGroup name="m2" options={M2_OPTIONS} selected={answers.m2} onPick={(v, c) => setResponse("m2", v, c)} />
        <p className="prompt">
          3. Un bambino che ti seguiva bene si richiude a metà turno, su un esercizio nuovo. Cosa
          fai?
        </p>
        <OptionGroup name="m3" options={M3_OPTIONS} selected={answers.m3} onPick={(v, c) => setResponse("m3", v, c)} />
      </>
    ),
  },

  // 3 — mercoledì: scene + riflessione + simulazione a bivio
  {
    day: "mercoledì",
    pct: 48,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.sim && (a.sim === "diretta" || !!a.sim2),
    render: ({ answers, setResponse, setReflection }: StepContext) => {
      const simFeedback =
        answers.sim === "diretta" ? (
          <div className="feedback retry">
            NOA: <em>(silenzio, non si muove)</em>
            <br />
            Una domanda diretta le ha chiesto di seguire un ritmo che non era ancora il suo.
          </div>
        ) : answers.sim === "silenzio" ? (
          <div className="feedback ok">
            NOA: <em>(dopo qualche secondo, sposta lo sguardo verso di te)</em> «...ho paura dei
            capelli bagnati.»
            <br />
            Mettersi al suo ritmo non l&apos;ha «sbloccata» con la magia: le ha dato lo spazio per
            dire cosa c&apos;era davvero.
          </div>
        ) : null;

      const sim2Feedback =
        answers.sim2 === "minimizza" ? (
          <div className="feedback retry">
            NOA si richiude di nuovo, torna in silenzio — aveva rischiato a dirtelo, e non è stata
            presa sul serio.
          </div>
        ) : answers.sim2 === "risolvi" ? (
          <div className="feedback ok">
            NOA: «...va bene, ci provo così.» <em>(si alza, si avvicina al bordo)</em>
            <br />
            Aprire la porta con la sintonia non basta se poi, appena il bambino dice cosa c&apos;è
            davvero, la richiudi tu con una risposta generica. La seconda mossa conta quanto la
            prima.
          </div>
        ) : null;

      return (
        <>
          <div className="eyebrow">Mercoledì</div>
          <h1>Un bambino chiuso, uno agitato, un&apos;adolescente distaccata</h1>
          <div className="card scene">
            <div className="who">Elia, 6 anni</div>
            <p>
              Primo giorno con un nuovo gruppo. Non risponde, braccia conserte, sguardo basso.
              L&apos;istruttore si siede accanto a lui, in silenzio, per venti secondi — stessa
              immobilità, stesso silenzio. Poi, piano: «anche a me a volte non va di parlare.»
              Poi: «vuoi solo bagnarti i piedi, per ora?» Elia non risponde a parole. Ma sposta i
              piedi nell&apos;acqua.
            </p>
            <p>
              Se l&apos;istruttore avesse guidato subito — «dai, andiamo, sarà divertente!» — gli
              avrebbe chiesto di seguire un ritmo che non era ancora il suo. Quei venti secondi al
              suo ritmo non hanno «convinto» Elia con un argomento: gli hanno solo fatto capire che
              poteva restare dov&apos;era. E da lì, un piccolo passo, l&apos;ha fatto lui da solo.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Diego, 8 anni</div>
            <p>
              Arriva a bordo vasca già a mille: salta, parla velocissimo. L&apos;istruttore, invece
              di dire «calmati», per un po&apos; gli va dietro: annuisce veloce, gli fa una domanda
              breve e rapida come il suo ritmo. Solo dopo, gradualmente, rallenta lui il ritmo
              della conversazione — e Diego rallenta con lui, fino a essere pronto per la prima
              consegna.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Bianca, 15 anni</div>
            <p>
              Arriva con la faccia scura, risponde ai saluti con un cenno appena accennato, braccia
              conserte — non è chiusa come Elia, è distacco da adolescente che non ha voglia di
              essere lì oggi. L&apos;istruttore non si siede accanto a lei in silenzio, a 15 anni
              sarebbe strano: le parla poco, con lo stesso tono asciutto di lei — «ok, giornata
              pesante?» Bianca risponde con un «...un po&apos;», ma è già qualcosa: ha lasciato che
              l&apos;istruttore la raggiungesse, fino a dove lei era disposta ad aprirsi — non di
              più. Solo a quel punto arriva l&apos;esercizio, con un tono normale — niente falso
              entusiasmo, che non andrebbe bene con il suo umore.
            </p>
          </div>
          <p className="lede">
            <strong>
              Un bambino chiuso, uno agitato, un&apos;adolescente distaccata — la forma cambia,
              l&apos;ordine no: prima il suo ritmo, solo dopo il tuo.
            </strong>
          </p>
          <p className="prompt">
            Un bambino di 8 anni arriva al bordo vasca già agitatissimo, parla veloce, non sta
            fermo un secondo. Cosa fai — o dici — nei primi trenta secondi, PRIMA di dargli
            qualsiasi consegna?
          </p>
          <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
          {/* Nota per la correzione, non mostrata all'istruttore: il sistema cerca se sta
              assecondando l'energia per un momento prima di calarla — non se la spegne subito
              con un «calmati». */}
          <h2>Simulazione</h2>
          <p className="lede">
            <strong>NOA, 7 anni.</strong> Bordo vasca, silenziosa, non risponde a domande dirette.
            Cosa fai o dici per primo?
          </p>
          <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
          {simFeedback}
          {answers.sim === "silenzio" && (
            <div>
              <p className="lede" style={{ marginTop: 14 }}>
                La scena continua. Ora che Noa ha detto qual è il problema vero, tocca a te
                rispondere a <em>quello</em>.
              </p>
              <p className="prompt">Scrivi cosa le dici o le proponi adesso.</p>
              <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
              <OptionGroup
                name="sim2"
                options={SIM2_OPTIONS}
                selected={answers.sim2}
                onPick={(v) => setResponse("sim2", v)}
              />
              {sim2Feedback}
            </div>
          )}
        </>
      );
    },
  },

  // 4 — mercoledì sera: controllo di fine giornata (trasferimento)
  {
    day: "mercoledì sera",
    pct: 62,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controllo di fine giornata — trasferimento</div>
        <h1>Una scena diversa da quella di ieri</h1>
        <p className="lede">
          Un bambino di 10 anni arriva ridendo forte, spinge scherzosamente un compagno, non
          riesce a stare fermo in fila. Non sembra arrabbiato né spaventato: sembra solo pieno di
          energia.
        </p>
        <p className="prompt">
          Come apri il contatto con lui, PRIMA di chiedergli di mettersi in fila e stare fermo?
          Scrivi il tuo ragionamento, non solo la mossa.
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Nota per la correzione, non mostrata all'istruttore: il sistema cerca se riconosce
            questo come un caso di «agitato/euforico» — assecondare per un momento la sua
            energia, non chiedergli subito di calmarsi. */}
      </>
    ),
  },

  // 5 — in vasca
  {
    day: "in vasca",
    pct: 68,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Il tuo turno in vasca</div>
        <h1>Un minuto al suo ritmo</h1>
        <p className="lede">
          Questa settimana, con il bambino più chiuso — o più agitato — del gruppo: mettiti al suo
          ritmo per un minuto prima di chiedergli qualsiasi cosa. Fermo se è fermo, silenzioso se è
          silenzioso; veloce se è veloce, acceso se è acceso. Poi, solo dopo, proponi un passo
          piccolo.
        </p>
      </>
    ),
  },

  // 6 — venerdì: test cumulativo
  {
    day: "venerdì · 11 min",
    pct: 85,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Venerdì — test cumulativo: Capitolo 3 + Capitolo 4</div>
        <h1>Il test</h1>
        <p className="prompt">1. Mettersi al ritmo del bambino viene prima o dopo guidarlo?</p>
        <OptionGroup name="t1" options={T1_OPTIONS} selected={answers.t1} onPick={(v, c) => setResponse("t1", v, c)} />
        <p className="prompt">2. Un bambino è euforico e agitato. La prima mossa giusta è:</p>
        <OptionGroup name="t2" options={T2_OPTIONS} selected={answers.t2} onPick={(v, c) => setResponse("t2", v, c)} />
        <p className="prompt">3. Mettersi al ritmo del bambino funziona solo con chi si chiude?</p>
        <OptionGroup name="t3" options={T3_OPTIONS} selected={answers.t3} onPick={(v, c) => setResponse("t3", v, c)} />
        <p className="prompt">
          4. <em>(dal Capitolo 3)</em> Un bambino si blocca, spalle tese, sguardo fisso
          sull&apos;acqua. È più probabile che:
        </p>
        <OptionGroup name="t4" options={T4_OPTIONS} selected={answers.t4} onPick={(v, c) => setResponse("t4", v, c)} />
        <p className="prompt">5. La sintonia serve a essere simpatici con il bambino?</p>
        <OptionGroup name="t5" options={T5_OPTIONS} selected={answers.t5} onPick={(v, c) => setResponse("t5", v, c)} />
        <p className="prompt">6. Guidare prima di essersi messi al suo ritmo funziona di solito?</p>
        <OptionGroup name="t6" options={T6_OPTIONS} selected={answers.t6} onPick={(v, c) => setResponse("t6", v, c)} />
        <p className="prompt">
          7. Un bambino che ti seguiva bene si richiude a metà turno. La cosa giusta è:
        </p>
        <OptionGroup name="t7" options={T7_OPTIONS} selected={answers.t7} onPick={(v, c) => setResponse("t7", v, c)} />
        <p className="prompt">
          8. Con un&apos;adolescente distaccata, la sintonia si costruisce nello stesso modo che
          con un bambino di 6 anni?
        </p>
        <OptionGroup name="t8" options={T8_OPTIONS} selected={answers.t8} onPick={(v, c) => setResponse("t8", v, c)} />
        <p className="prompt">
          9. Un bambino rivela qual è la sua paura vera, dopo che ti sei messo al suo ritmo. Se
          rispondi in modo generico o minimizzi, cosa succede di solito?
        </p>
        <OptionGroup name="t9" options={T9_OPTIONS} selected={answers.t9} onPick={(v, c) => setResponse("t9", v, c)} />
        <p className="prompt">
          10. Un ragazzo di 13 anni arriva al bordo vasca in silenzio, senza salutare nessuno.
          Scrivi in due righe cosa fai nei primi dieci secondi.
        </p>
        <Field id="t10" value={answers.t10 ?? ""} onChange={(v) => setReflection("t10", v)} />
      </>
    ),
  },

  // 7 — feedback: spiega come funziona la correzione (§10, D34)
  {
    day: "venerdì · feedback",
    pct: 87,
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
          Hai risposto di calmarlo subito. Ma un «calmati» detto a chi è già sopra le righe
          raramente funziona — perché non lo hai raggiunto dove si trova, gli hai solo chiesto di
          spostarsi da solo. Assecondare per primo, anche solo per pochi secondi, apre la porta che
          poi puoi richiudere tu.
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Il feedback non dice mai «hai sbagliato» e basta: dice cosa guardare la prossima volta.
          Il tono è sempre sul comportamento osservato, mai sulla persona (vedi Capitolo 7, che
          riprenderà proprio questa regola).
        </p>
      </>
    ),
  },

  // 8 — recupero: solo se il test del venerdì ha troppi errori (§12, D25/D27)
  {
    day: "recupero",
    pct: 90,
    nextLabel: "Continua ▸",
    showBack: true,
    visible: (a) => {
      const corrette: Record<string, string> = {
        t1: "prima", t2: "asseconda", t3: "no", t4: "paura", t5: "no",
        t6: "no", t7: "torna", t8: "no", t9: "richiude",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recupero — solo perché il test ha trovato qualche difficoltà</div>
        <h1>Tre scene in più, per allenare l&apos;ordine</h1>
        <p className="lede">
          Non è un fallimento: è solo il segnale che vale la pena rivedere il punto più delicato di
          questo capitolo con qualche esempio in più — prima il suo ritmo, solo dopo il tuo.
        </p>

        <div className="card scene">
          <div className="who">Samuele, 9 anni</div>
          <p>
            Primo giorno con il gruppo. Seduto sul bordo, gambe fuori dall&apos;acqua, braccia
            conserte, non risponde a chi lo saluta.
          </p>
        </div>
        <p className="prompt">Cosa fai per primo?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "gioco", label: "Gli proponi subito un gioco per rompere il ghiaccio", correct: false },
            {
              value: "silenzio",
              label: "Ti siedi vicino a lui, in silenzio, per un momento, prima di proporre qualsiasi cosa",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Greta, 7 anni</div>
          <p>
            Arriva a bordo vasca saltellando, racconta il weekend a raffica senza finire una frase,
            non sta ferma un secondo.
          </p>
        </div>
        <p className="prompt">Cosa fai per primo, prima di darle la prima consegna?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "calma", label: "Le dici di calmarsi, così puoi iniziare l'esercizio", correct: false },
            {
              value: "asseconda",
              label: "Per un momento assecondi il suo ritmo — annuisci veloce, una domanda breve sulla stessa energia",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Un bambino che ti seguiva bene</div>
          <p>
            Ha seguito senza problemi i primi due esercizi. Al terzo — nuovo, mai fatto prima — si
            blocca di nuovo, chiuso come all&apos;inizio del turno.
          </p>
        </div>
        <p className="prompt">Cosa fai?</p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "insisti", label: "Insisti — fino a un attimo fa ti seguiva, continui sulla stessa strada", correct: false },
            {
              value: "torna",
              label: "Torni indietro di un passo: ritrovi il suo ritmo di nuovo, prima di riproporre la direzione",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Chiuso, agitato, o già in cammino e poi di nuovo fermo — cambia la forma, mai
          l&apos;ordine: prima ti metti al suo ritmo, solo dopo lo guidi.
        </p>
      </>
    ),
  },

  // 9 — venerdì: risultato
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
                <td style={{ padding: "6px 0" }}>Come hai raggiunto Noa al §8, in entrambi gli scambi</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>Il racconto di lunedì sul Capitolo 3</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Sintonia</td>
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
        <div className="done-badge">✓ Capitolo 4 completato</div>
        <div className="eyebrow">Settimana 4 di 10 · Capitolo 5 in arrivo</div>
        <h1>Il messaggio e la consegna</h1>
        <p className="lede">
          Oggi hai imparato ad aprire la porta. La settimana prossima impari cosa dire, una volta
          che è aperta — e perché le parole, la voce e il corpo devono dire la stessa cosa.
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
          <div className="chip acquisita">
            <span className="name">4 · Sintonia</span>
            <span className="state">acquisita</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">5 · Consegne e congruenza</span>
            <span className="state">non acquisita</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">6 · Verificare con l&apos;azione <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">non acquisita</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">7 · Il ritorno</span>
            <span className="state">non acquisita</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">8 · Cambiare strada</span>
            <span className="state">non acquisita</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">9 · Situazioni difficili</span>
            <span className="state">non acquisita</span>
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
