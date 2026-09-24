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

// Porta 1:1 situOutcome()/needsRecupero() del mockup caso-reale-05.html.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}
function needsRecupero(a: Record<string, string>): boolean {
  return situOutcome(a) === "B";
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Cambi canale — le mostri il movimento lentamente, o le guidi le braccia fuori dall'acqua prima di farla riprovare",
  },
  { value: "B", label: "Riprovi con le stesse parole, riformulate diversamente" },
];
const REC_OPTIONS: Option[] = [
  { value: "cambia", label: "Cambi finalmente canale (dimostrazione o contatto fisico guidato)" },
  { value: "parole", label: "Insisti ancora a parole, magari più lentamente" },
];

export const casoReale05Steps: Step[] = [
  // 0 — intro
  {
    day: "caso reale 05",
    pct: 0,
    nextLabel: "Inizia ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casi Reali · Scenario 05</div>
        <h1>Il bambino che non comprende</h1>
        <p className="lede">
          Fascia 6-10. Competenza: cambiare strada (Cap. 8) — repertorio e adattamento in tempo reale.
        </p>
        <div className="card">
          Scenario breve e autonomo — non ha un punteggio d&apos;esame: è materiale che puoi richiamare quando
          vuoi.
        </div>
      </>
    ),
  },

  // 1 — situazione
  {
    day: "situazione",
    pct: 20,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.situ,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const o = situOutcome(answers);
      return (
        <>
          <div className="eyebrow">Situazione</div>
          <h1>Chiara, 7 anni</h1>
          <p className="lede">
            Le hai spiegato due volte, a parole, come coordinare le braccia nel dorso. Ci riprova, e sbaglia di
            nuovo, nello stesso identico modo. Non sembra distratta — ti guarda, concentrata, e ancora non le
            viene.
          </p>
          <p className="prompt">Cosa fai — non una terza spiegazione a parole?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Cosa fai davvero, in pratica</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {o === "A" && (
            <div className="feedback ok">
              Al tentativo successivo, il movimento è quasi giusto. Non le mancava l&apos;impegno: le mancava un
              canale diverso da «dire».
            </div>
          )}
          {o === "B" && (
            <div className="feedback retry">
              Chiara sbaglia ancora, nello stesso modo. Non è un problema di quante volte lo spieghi: è un
              problema di quale canale usi.
            </div>
          )}
        </>
      );
    },
  },

  // 2 — recupero, solo se esito B
  {
    day: "recupero",
    pct: 45,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q1b && !!a.rec,
    visible: (a) => needsRecupero(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Recupero · solo perché non ha funzionato</div>
        <h1>Chiara ha sbagliato tre volte con lo stesso canale</h1>
        <p className="prompt">Cosa fai adesso?</p>
        <Field id="q1b" value={answers.q1b ?? ""} onChange={(v) => setReflection("q1b", v)} />
        <h2>Cosa fai davvero, in pratica</h2>
        <OptionGroup name="rec" options={REC_OPTIONS} selected={answers.rec} onPick={(v) => setResponse("rec", v)} />
        {answers.rec === "cambia" && (
          <div className="feedback ok">Il tentativo successivo migliora subito e visibilmente.</div>
        )}
        {answers.rec === "parole" && (
          <div className="feedback retry">
            Chiara comincia a mostrare segni di stanchezza dell&apos;attenzione più che dell&apos;errore in sé —
            continuare così non porterà a niente di diverso.
          </div>
        )}
      </>
    ),
  },

  // 3 — chiusura
  {
    day: "chiusura",
    pct: 75,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Chiusura</div>
        <h1>Cosa porti con te</h1>
        <p className="prompt">
          Cosa porti con te, la prossima volta che un bambino sembra concentrato ma continua a sbagliare allo
          stesso modo?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Riflessione libera, non entra in punteggio.
        </p>
      </>
    ),
  },

  // 4 — come si legge
  {
    day: "come si legge",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "gestita al primo colpo" : answers.rec === "cambia" ? "sbagliata, ma recuperata (tardi)" : "sbagliata, non recuperata";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scenario completato</div>
          <div className="eyebrow">Come si legge questo scenario</div>
          <h1>Il bambino che non comprende</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Cambiare strada (Cap. 8)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            «Non comprende» e «non ascolta» sembrano vicini, ma non sono lo stesso scenario: qui l&apos;attenzione
            c&apos;è — è il canale a mancare, non il contatto.
          </p>
        </>
      );
    },
  },
];
