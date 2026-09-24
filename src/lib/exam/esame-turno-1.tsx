import { OptionGroup, type Option } from "@/components/OptionGroup";
import type { Step, StepContext } from "@/lib/chapters/types";

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

// Porta 1:1 beat1Outcome()/beat2Version() del mockup esame-turno1.html: Aurora e Diego sono due
// letture scollegate, valutate separatamente — quattro esiti, non due.
type Beat1Outcome = "A" | "B" | "C" | "D" | null;
function beat1Outcome(a: Record<string, string>): Beat1Outcome {
  const aurora = a.aurora,
    diego = a.diego;
  if (!aurora || !diego) return null;
  if (aurora === "giusta" && diego === "giusta") return "A";
  if (aurora === "giusta" && diego === "sbagliata") return "B";
  if (aurora === "sbagliata" && diego === "giusta") return "C";
  return "D";
}
function needsBeat2A(a: Record<string, string>): boolean {
  return beat1Outcome(a) === "D";
}
type Beat2Version = "pulita" | "diego-agitato" | "aurora-ferma" | "recupero-riuscito" | "mai-recuperato";
function beat2Version(a: Record<string, string>): Beat2Version {
  const o = beat1Outcome(a);
  if (o === "A") return "pulita";
  if (o === "B") return "diego-agitato";
  if (o === "C") return "aurora-ferma";
  if (o === "D") return a.beat2a === "separi" ? "recupero-riuscito" : "mai-recuperato";
  return "pulita";
}

const AURORA_OPTIONS: Option[] = [
  { value: "giusta", label: "Ti avvicini, ti metti al suo livello, tendi la mano senza dirle «entra»" },
  {
    value: "sbagliata",
    label: "Usi una rassicurazione generica o provi a farla entrare direttamente («dai, non è successo niente, vieni»)",
  },
];
const DIEGO_OPTIONS: Option[] = [
  { value: "giusta", label: "Gli dai un compito che usa la sua energia («portami tu le tavolette, corri!»)" },
  {
    value: "sbagliata",
    label: "Ti limiti a richiamarlo («Diego, fermo!») senza dargli un posto dove mettere l'energia",
  },
];
const BEAT2A_OPTIONS: Option[] = [
  {
    value: "separi",
    label: "Separi i due problemi — dai a Diego ed Elisa un compito rapido e distinto, e solo dopo torni da Aurora con calma",
  },
  {
    value: "insisti",
    label: "Insisti sulla stessa mossa che non ha già funzionato — richiami di nuovo tutti ad alta voce, o ripeti la stessa rassicurazione generica",
  },
];

const BEAT1_FEEDBACK: Record<Exclude<Beat1Outcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Aurora, sentendoti vicino e non incalzata, sposta il piede più a fondo. Diego, con qualcosa da fare, incanala la scarica e torna verso il gruppo di corsa, contento.",
  },
  B: {
    ok: false,
    text: "Aurora si scioglie e sposta il piede. Diego si ferma un secondo, ma quasi subito ricomincia a spingere — un richiamo non gli ha dato niente da fare con quell'energia.",
  },
  C: {
    ok: false,
    text: "Diego si allontana contento con il suo compito. Aurora resta ferma — la rassicurazione non l'ha raggiunta: la sua causa era la paura, non l'esitazione, e a quella non basta convincerla a parole.",
  },
  D: {
    ok: false,
    text: "Aurora non si muove — la rassicurazione generica non l'ha raggiunta. Diego, richiamato ad alta voce, si ferma un secondo ma riparte quasi subito: non aveva bisogno di un ordine, aveva bisogno di scaricare l'energia da qualche parte.",
  },
};

const BEAT2_VERSION_TEXT: Record<Beat2Version, string> = {
  pulita: "Il gruppo è tranquillo. Tutta l'attenzione è libera per Marco.",
  "diego-agitato": "Diego continua a muoversi ai margini del gruppo mentre provi a seguire Marco: un occhio deve restare su di lui.",
  "aurora-ferma": "Aurora è rimasta al bordo, non ha ripreso: un occhio deve restare su di lei mentre lavori con Marco.",
  "recupero-riuscito": "Il gruppo si è ricompattato, ma qualche minuto più tardi del previsto: Marco ha aspettato, un po' distratto da quello che è successo prima.",
  "mai-recuperato": "Il gruppo arriva ancora agitato: Diego continua a disturbare ai margini mentre provi a lavorare con Marco.",
};

export const esameTurno1Steps: Step[] = [
  // 0 — intro
  {
    day: "prima di cominciare",
    pct: 0,
    nextLabel: "Inizia ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Esame finale · Turno 1</div>
        <h1>Il gruppo dei piccoli</h1>
        <p className="lede">
          Hai davanti un gruppo di quattro bambini: <strong>Aurora (4 anni)</strong>, <strong>Elisa (6 anni)</strong>,{" "}
          <strong>Marco (7 anni)</strong> e <strong>Diego (9 anni)</strong>. È il turno del mercoledì: quindici minuti
          di riscaldamento, poi l&apos;esercizio della settimana.
        </p>
        <div className="card warn">
          Non è un capitolo. Non c&apos;è un tasto «prossima domanda». C&apos;è solo quello che succede dopo quello che
          scegli.
        </div>
        <p className="lede">
          Il turno è diviso in <strong>beat</strong> — i momenti della stessa scena, uno dopo
          l&apos;altro: quello che scegli in un beat cambia il beat che segue. Non sono domande
          separate, è una scena unica che si muove con te.
        </p>
        <p className="lede">
          Il voto va da 80 a 100. Il <strong>100 e lode</strong> è il livello più alto: non basta
          rispondere bene, serve anche saper recuperare un errore in tempo reale, davanti al
          gruppo — se ti capita, è un&apos;occasione, non un problema.
        </p>
      </>
    ),
  },

  // 1 — beat1
  {
    day: "beat 1",
    pct: 14,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.aurora && !!a.diego,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = beat1Outcome(answers);
      const fb = outcome ? BEAT1_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Beat 1 · Due cose insieme</div>
          <h1>Aurora e Diego, nello stesso momento</h1>
          <p className="lede">
            Sei appena arrivato al bordo. <strong>Aurora</strong> è ferma, il piede in acqua fino alla caviglia, non si
            muove — le spalle sono su, strette, gli occhi fissi sull&apos;acqua. Nello stesso momento,{" "}
            <strong>Diego</strong> comincia a spingere scherzosamente Marco, ridendo forte, e non riesce a stare fermo.
          </p>
          <p className="prompt">Hai un attimo. Con chi cominci, e cosa fai per primo?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Cosa fai davvero, in pratica</h2>
          <p className="lede">
            Aurora e Diego sono due situazioni scollegate — vengono valutate separatamente, non come un blocco unico.
          </p>
          <p className="prompt">Con Aurora:</p>
          <OptionGroup name="aurora" options={AURORA_OPTIONS} selected={answers.aurora} onPick={(v) => setResponse("aurora", v)} />
          <p className="prompt">Con Diego:</p>
          <OptionGroup name="diego" options={DIEGO_OPTIONS} selected={answers.diego} onPick={(v) => setResponse("diego", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — beat2a, solo se esito D
  {
    day: "beat 2a — recupero",
    pct: 28,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q2a && !!a.beat2a,
    visible: (a) => needsBeat2A(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Beat 2A · solo perché nessuna delle due letture era giusta</div>
        <h1>Il gruppo si disunisce</h1>
        <p className="lede">
          Aurora è ancora ferma. Diego, nel frattempo, ha ricominciato a spingere — stavolta Elisa, che si allontana
          infastidita. Il gruppo comincia a disunirsi.
        </p>
        <p className="prompt">Hai un secondo bivio. Cosa fai adesso?</p>
        <Field id="q2a" value={answers.q2a ?? ""} onChange={(v) => setReflection("q2a", v)} />
        <h2>Cosa fai davvero, in pratica</h2>
        <OptionGroup name="beat2a" options={BEAT2A_OPTIONS} selected={answers.beat2a} onPick={(v) => setResponse("beat2a", v)} />
        {answers.beat2a === "separi" && (
          <div className="feedback ok">
            Diego si allontana contento con un compito da fare. Elisa, sentita per un attimo per conto suo, si
            tranquillizza. Aurora, non più circondata dal trambusto, sposta finalmente il piede più a fondo.
          </div>
        )}
        {answers.beat2a === "insisti" && (
          <div className="feedback retry">
            Elisa si allontana ancora di più, ora anche imbronciata. Diego, senza un compito da fare, torna a spingere.
            Aurora, sentendo la voce alzata nel gruppo, si irrigidisce di più invece che meno.
          </div>
        )}
      </>
    ),
  },

  // 3 — beat2, la consegna a Marco
  {
    day: "beat 2",
    pct: 45,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q2,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Beat 2 · La consegna a Marco</div>
        <h1>Il contesto con cui arrivi</h1>
        <div className="card">{BEAT2_VERSION_TEXT[beat2Version(answers)]}</div>
        <p className="lede">
          <strong>Ora tocca a Marco, 7 anni.</strong> Deve imparare l&apos;ingresso in acqua in due tempi — braccia, poi
          gambe — un esercizio nuovo per lui.
        </p>
        <p className="prompt">
          Scrivi la consegna che gli daresti, in positivo, adatta alla sua fascia (6-10 anni: può reggere due passaggi
          in fila).
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
      </>
    ),
  },

  // 4 — beat3, la verifica che non si vede
  {
    day: "beat 3",
    pct: 62,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q3,
    render: ({ answers, setReflection }: StepContext) => {
      const v = beat2Version(answers);
      const noise =
        v === "diego-agitato" || v === "mai-recuperato" ? (
          <div className="card">
            Proprio in quel momento Diego, ai margini, ride forte per qualcosa — Marco potrebbe essersi fermato per
            l&apos;esitazione tecnica, o per essersi distratto voltandosi verso la risata. La lettura delle quattro
            cause del Capitolo 3 è genuinamente più difficile qui, non solo più stressante: un elemento in più da
            scartare prima di arrivare alla causa vera.
          </div>
        ) : v === "aurora-ferma" ? (
          <div className="card">
            L&apos;attenzione è divisa fra Marco e Aurora — il rischio non è un rumore che confonde la lettura, ma il
            tempo: quanto in fretta noti l&apos;esitazione di Marco mentre un occhio resta su di lei.
          </div>
        ) : (
          <div className="card">Il momento è chiaro, nessun rumore intorno — solo Marco e la sua esitazione.</div>
        );
      return (
        <>
          <div className="eyebrow">Beat 3 · La verifica che non si vede</div>
          <h1>L&apos;esitazione di Marco</h1>
          <p className="lede">
            Marco esegue. Sembra corretto — ma è fermo un attimo prima del secondo passaggio, con un&apos;espressione
            che non riesci a leggere bene.
          </p>
          {noise}
          <p className="prompt">
            Quale delle quattro cause del Capitolo 3 ti sembra più probabile, e cosa fai — non cosa gli chiedi a
            parole, cosa fai — per scoprirlo?
          </p>
          <Field id="q3" value={answers.q3 ?? ""} onChange={(v) => setReflection("q3", v)} />
        </>
      );
    },
  },

  // 5 — chiusura
  {
    day: "chiusura",
    pct: 80,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Chiusura del Turno 1</div>
        <h1>Cosa porti con te</h1>
        <p className="lede">
          Il turno finisce. Il gruppo esce dall&apos;acqua, Aurora sorridendo, Marco un po&apos; incerto ancora
          sull&apos;ultimo esercizio.
        </p>
        <p className="prompt">
          Un&apos;ultima domanda, prima di passare al Turno 2: cosa porti con te, di questo turno, per il prossimo?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Questa riflessione non entra nel punteggio: è la stessa che hai fatto per dieci settimane, l&apos;ultima
          volta prima dell&apos;esito.
        </p>
      </>
    ),
  },

  // 6 — risultato
  {
    day: "risultato",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = beat1Outcome(answers);
      const c4 =
        o === "A"
          ? "gestita al primo colpo"
          : o === "B" || o === "C"
            ? "gestita in parte"
            : answers.beat2a === "separi"
              ? "sbagliata, ma recuperata"
              : "sbagliata, non recuperata";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Turno 1 completato</div>
          <div className="eyebrow">Come si legge il risultato</div>
          <h1>Il gruppo dei piccoli</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">C4 · Sintonia</span>
              <span className="esito">{c4}</span>
            </div>
            <div className="result-row">
              <span className="comp">C2 · Riconoscimento dell&apos;allievo</span>
              <span className="esito">registrato <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
            <div className="result-row">
              <span className="comp">C5 · Consegna in positivo</span>
              <span className="esito">registrato <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
            <div className="result-row">
              <span className="comp">C3 <i className="ph-duotone ph-trophy" aria-hidden="true" /> · Osservare e interpretare</span>
              <span className="esito">registrato <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
          </div>
          {o === "D" && answers.beat2a === "separi" && (
            <div className="card quote">
              Un errore recuperato bene non è un pareggio col non aver mai sbagliato — ma non è nemmeno un semplice
              rimedio. Dimostra che sai adattarti bene sotto pressione: la strada verso il massimo del punteggio non
              passa solo da un turno perfetto dall&apos;inizio alla fine.
            </div>
          )}
          <p className="lede">
            Il turno prosegue in ogni caso, qualunque strada tu abbia preso — coerente con «non si può fallire, solo
            rimandare». Il prossimo turno ti aspetta: <strong>Turno 2 — La situazione difficile.</strong>
          </p>
        </>
      );
    },
  },
];
