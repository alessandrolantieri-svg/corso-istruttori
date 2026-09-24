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

// Porta 1:1 beat1Outcome()/needsBeat2A()/beat2Version()/soggetto() del mockup esame-turno2.html:
// qui, a differenza del Turno 1, il Beat 1 è un unico bivio a tre esiti (non due letture separate).
type Beat1Outcome = "A" | "B" | "D" | null;
function beat1Outcome(a: Record<string, string>): Beat1Outcome {
  return (a.beat1 as Beat1Outcome) || null;
}
function needsBeat2A(a: Record<string, string>): boolean {
  return beat1Outcome(a) === "D";
}
type Beat2Version = "pulita" | "leonardo-rigido" | "recupero-riuscito" | "leonardo-fuori";
function beat2Version(a: Record<string, string>): Beat2Version {
  const o = beat1Outcome(a);
  if (o === "A") return "pulita";
  if (o === "B") return "leonardo-rigido";
  if (o === "D") return a.beat2a === "cambia" ? "recupero-riuscito" : "leonardo-fuori";
  return "pulita";
}
function soggetto(a: Record<string, string>): string {
  return beat2Version(a) === "leonardo-fuori" ? "Sofia" : "Leonardo";
}

const BEAT1_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Riconosci che il tuffo non è il problema, è farlo per primo davanti a tutti — gli offri un ruolo o una via d'uscita che non è una resa («fammi vedere tu come lo faresti diverso»)",
  },
  {
    value: "B",
    label: "Capisci che il problema è relazionale, ma insisti comunque a farlo provare subito, davanti a tutti («dai, lo fai e basta, tutti guardano»)",
  },
  {
    value: "D",
    label: "Rispieghi la tecnica del tuffo, magari più lentamente («guarda, è facile: pieghi le ginocchia...»)",
  },
];
const BEAT2A_OPTIONS: Option[] = [
  {
    value: "cambia",
    label: "Riconosci l'errore e cambi approccio — smetti di spiegare la tecnica, ti avvicini, abbassi la voce, gli offri una via che non lo espone",
  },
  {
    value: "insisti",
    label: "Insisti sulla stessa lettura — ripeti la spiegazione tecnica, magari con più fermezza",
  },
];
const CANALE_OPTIONS: Option[] = [
  {
    value: "cambia",
    label: "Cambi canale — mostri il tuffo lentamente sul bordo, o guidi fisicamente la posizione delle braccia",
  },
  { value: "parole", label: "Ripeti ancora a parole, anche riformulate diversamente" },
];

const BEAT1_FEEDBACK: Record<Exclude<Beat1Outcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Leonardo si spiazza un attimo, poi scioglie le braccia. Propone una piccola variante sua, non esattamente il tuffo previsto ma vicina — e la fa.",
  },
  B: {
    ok: false,
    text: "Leonardo lo fa, ma con le spalle rigide e senza guardare nessuno — obbedisce, non partecipa.",
  },
  D: {
    ok: false,
    text: "Leonardo non stava chiedendo una spiegazione tecnica — l'hai già capito dal tono, ma la spiegazione arriva comunque. Si chiude di più: «ho detto di no.» Un compagno vicino ridacchia.",
  },
};

const BEAT2_VERSION_TEXT: Record<Beat2Version, string> = {
  pulita: "Leonardo si prepara al bordo, disteso, pronto a provare la sua variante.",
  "leonardo-rigido": "Leonardo è al bordo, ma il corpo è teso: prova senza partecipare davvero.",
  "recupero-riuscito": "Leonardo, dopo aver guardato Sofia, si avvicina lui stesso, un po' guardingo ma genuino.",
  "leonardo-fuori":
    "Leonardo resta seduto fuori dal gruppo. Tocca a Sofia, che aspettava comunque il suo turno — il beat prosegue su di lei, con un occhio che deve restare su Leonardo, senza escluderlo del tutto.",
};

export const esameTurno2Steps: Step[] = [
  // 0 — intro
  {
    day: "prima di cominciare",
    pct: 0,
    nextLabel: "Inizia ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Esame finale · Turno 2</div>
        <h1>La situazione difficile</h1>
        <p className="lede">
          Sei con un gruppo di ragazzi 11-13 anni. Tocca a <strong>Leonardo (12 anni)</strong> provare per primo un
          tuffo di partenza — mai fatto prima, mai davanti al gruppo. Anche <strong>Sofia (11 anni)</strong> aspetta
          il suo turno, un po&apos; più indietro.
        </p>
        <div className="card warn">
          Non è un capitolo. Non c&apos;è un tasto «prossima domanda». C&apos;è solo quello che succede dopo quello
          che scegli.
        </div>
        <p className="lede">
          Come nel Turno 1: il turno è diviso in <strong>beat</strong> — i momenti della stessa
          scena, uno dopo l&apos;altro — e il voto va da 80 a 100, con il{" "}
          <strong>100 e lode</strong> riservato a chi sa anche recuperare bene un errore in tempo
          reale.
        </p>
      </>
    ),
  },

  // 1 — beat1
  {
    day: "beat 1",
    pct: 12,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.beat1,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = beat1Outcome(answers);
      const fb = outcome ? BEAT1_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Beat 1 · Il rifiuto</div>
          <h1>«Non lo faccio, è stupido.»</h1>
          <p className="lede">
            Leonardo si ferma sul bordo, incrocia le braccia. Non trema, non cerca il tuo sguardo, non ha
            l&apos;aria di chi ha paura — ha l&apos;aria di chi ha deciso.
          </p>
          <p className="prompt">
            È più probabile che Leonardo non ci riesca o che non ci stia? E cosa fai — non cosa gli spieghi di
            nuovo?
          </p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Cosa fai davvero, in pratica</h2>
          <OptionGroup name="beat1" options={BEAT1_OPTIONS} selected={answers.beat1} onPick={(v) => setResponse("beat1", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — beat2a, solo se esito D
  {
    day: "beat 2a — recupero",
    pct: 24,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q2a && !!a.beat2a,
    visible: (a) => needsBeat2A(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Beat 2A · solo perché la diagnosi era sbagliata</div>
        <h1>Un rifiuto guardato dagli altri</h1>
        <p className="lede">
          Leonardo resta fermo, braccia conserte. Il ridacchiare di un compagno vicino non aiuta — ora non è più
          solo un rifiuto, è un rifiuto guardato dagli altri.
        </p>
        <p className="prompt">Hai un secondo bivio. Cosa fai adesso?</p>
        <Field id="q2a" value={answers.q2a ?? ""} onChange={(v) => setReflection("q2a", v)} />
        <h2>Cosa fai davvero, in pratica</h2>
        <OptionGroup name="beat2a" options={BEAT2A_OPTIONS} selected={answers.beat2a} onPick={(v) => setResponse("beat2a", v)} />
        {answers.beat2a === "cambia" && (
          <div className="feedback ok">
            Leonardo si scioglie, non del tutto — resta un po&apos; guardingo — ma annuisce. Guarda Sofia provare,
            poi, senza che nessuno glielo richieda di nuovo, si avvicina al bordo.
          </div>
        )}
        {answers.beat2a === "insisti" && (
          <div className="feedback retry">
            Leonardo si allontana di un passo, si siede sul bordo, fuori dal gruppo di chi aspetta il proprio turno.
            Non risponde più.
          </div>
        )}
      </>
    ),
  },

  // 3 — beat2, la verifica che non si vede
  {
    day: "beat 2",
    pct: 38,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q2,
    render: ({ answers, setReflection }: StepContext) => {
      const chi = soggetto(answers);
      return (
        <>
          <div className="eyebrow">Beat 2 · La verifica che non si vede</div>
          <h1>Il contesto con cui arrivi</h1>
          <div className="card">{BEAT2_VERSION_TEXT[beat2Version(answers)]}</div>
          <p className="lede">
            <strong>{chi} prova il tuffo.</strong> Entra di pancia invece che di testa — le braccia non sono tese in
            avanti al momento dell&apos;ingresso.
          </p>
          <p className="prompt">
            Come verifichi se la consegna precedente è arrivata — non chiedendo «hai capito?» — e cosa noti?
          </p>
          <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        </>
      );
    },
  },

  // 4 — beat3a, cambiare strada
  {
    day: "beat 3 — cambiare strada",
    pct: 52,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q3 && !!a.canale,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const chi = soggetto(answers);
      return (
        <>
          <div className="eyebrow">Beat 3 · Cambiare strada</div>
          <h1>Stesso errore, secondo tentativo</h1>
          <p className="lede">
            Provi a correggere l&apos;ingresso a parole: «tieni le braccia più unite e tese quando entri.» Al
            secondo tentativo, stesso errore — di pancia, braccia non tese.
          </p>
          <p className="prompt">
            Il secondo tentativo è uguale al primo. Cosa fai adesso — non ripetere le stesse parole?
          </p>
          <Field id="q3" value={answers.q3 ?? ""} onChange={(v) => setReflection("q3", v)} />
          <h2>Cosa fai davvero, in pratica</h2>
          <OptionGroup name="canale" options={CANALE_OPTIONS} selected={answers.canale} onPick={(v) => setResponse("canale", v)} />
          {answers.canale === "cambia" && (
            <div className="feedback ok">
              Al terzo tentativo l&apos;ingresso è quasi corretto — non perfetto, ma le braccia restano tese, e
              l&apos;entrata è di testa.
            </div>
          )}
          {answers.canale === "parole" && (
            <div className="feedback retry">
              Il terzo tentativo è identico al secondo — {chi} comincia a mostrare segni di stanchezza
              dell&apos;attenzione, non più dell&apos;errore in sé.
            </div>
          )}
          <p className="lede" style={{ marginTop: 14, fontSize: ".86rem" }}>
            ({chi} è chi sta provando il tuffo in questa versione del turno.)
          </p>
        </>
      );
    },
  },

  // 5 — beat3b, il ritorno
  {
    day: "beat 3 — il ritorno",
    pct: 66,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q4,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Beat 3 · Il ritorno</div>
        <h1>Qualunque sia andato il terzo tentativo</h1>
        <p className="lede">
          Qualunque sia stato il terzo tentativo — quasi giusto, o ancora uguale — devi dare un ritorno.
        </p>
        <p className="prompt">Scrivi il ritorno che dai adesso, specifico sul comportamento, non sulla persona.</p>
        <Field id="q4" value={answers.q4 ?? ""} onChange={(v) => setReflection("q4", v)} />
      </>
    ),
  },

  // 6 — chiusura
  {
    day: "chiusura",
    pct: 82,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => (beat2Version(a) === "leonardo-fuori" ? !!a.qleonardo && !!a.qchiusura : !!a.qchiusura),
    render: ({ answers, setReflection }: StepContext) => {
      const isFuori = beat2Version(answers) === "leonardo-fuori";
      return (
        <>
          <div className="eyebrow">Chiusura del Turno 2</div>
          <h1>{isFuori ? "Prima di andare avanti" : "Cosa porti con te"}</h1>
          {isFuori && (
            <>
              <p className="prompt">
                Torni da Leonardo, seduto sul bordo? Cosa gli dici, o non gli dici, prima di chiudere?
              </p>
              <Field id="qleonardo" value={answers.qleonardo ?? ""} onChange={(v) => setReflection("qleonardo", v)} />
              <p className="lede" style={{ marginTop: 10, fontSize: ".84rem" }}>
                Non entra nel punteggio — ma il sistema registra se la porta resta aperta per il prossimo turno, o
                se il rifiuto resta senza una parola in più.
              </p>
            </>
          )}
          <p className="prompt" style={{ marginTop: 18 }}>
            In tutte le versioni: cosa porti con te, di questo turno, per il prossimo?
          </p>
          <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        </>
      );
    },
  },

  // 7 — risultato
  {
    day: "risultato",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = beat1Outcome(answers);
      const c9 =
        o === "A"
          ? "gestita al primo colpo"
          : o === "B"
            ? "gestita in parte"
            : answers.beat2a === "cambia"
              ? "sbagliata, ma recuperata"
              : "sbagliata, non recuperata";
      const c8 = answers.canale === "cambia" ? "gestita al primo colpo" : "da rinforzare";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Turno 2 completato</div>
          <div className="eyebrow">Come si legge il risultato</div>
          <h1>La situazione difficile</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">C9 · Situazioni difficili</span>
              <span className="esito">{c9}</span>
            </div>
            <div className="result-row">
              <span className="comp">C6 <i className="ph-duotone ph-trophy" aria-hidden="true" /> · Verificare con l&apos;azione</span>
              <span className="esito">registrato <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
            <div className="result-row">
              <span className="comp">C8 · Cambiare strada</span>
              <span className="esito">{c8}</span>
            </div>
            <div className="result-row">
              <span className="comp">C7 · Il ritorno</span>
              <span className="esito">registrato <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
          </div>
          {o === "D" && answers.beat2a === "cambia" && (
            <div className="card quote">
              Capire in tempo reale di aver letto male la situazione, e cambiare rotta davanti al gruppo senza fare
              marcia indietro in modo goffo: questo è un ottimo recupero, fatto sotto gli occhi di tutti. Ed è
              proprio il tipo di prova che serve per il 100 e lode.
            </div>
          )}
          <p className="lede">
            Il turno prosegue in ogni caso — coerente con «non si può fallire, solo rimandare». Il prossimo turno ti
            aspetta: <strong>Turno 3 — Gli adolescenti, e chi ormai sa fare da solo.</strong>
          </p>
        </>
      );
    },
  },
];
