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

// Porta 1:1 situOutcome()/needsRecupero() del mockup caso-reale-09.html.
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
      "Cambi canale comunque, anche se con lei finora aveva sempre funzionato dire, perché quello che stai usando non sta funzionando",
  },
  { value: "B", label: "Insisti a parole, perché finora con lei era sempre bastato, riformulando ancora" },
];
const REC_OPTIONS: Option[] = [
  { value: "cambia", label: "Finalmente cambi canale (dimostrazione, o contatto fisico guidato)" },
  { value: "parole", label: "Insisti ancora a parole, magari più lentamente" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Le mostri il movimento lentamente in acqua, davanti a lei. Al tentativo successivo, qualcosa si sblocca. Non è che parlare non funzioni più con lei in generale: è solo che quel dettaglio specifico aveva bisogno di un altro modo per essere spiegato.",
  },
  B: {
    ok: false,
    text: "Camilla sbaglia una terza volta, nello stesso modo. Il fatto che «dire» funzioni di solito con lei non significa che funzioni sempre, con ogni dettaglio.",
  },
};

const REC_FEEDBACK: Record<"cambia" | "parole", { ok: boolean; text: string }> = {
  cambia: {
    ok: true,
    text: "Il tentativo successivo migliora. Non era garantito che il canale giusto fosse diverso da quello di sempre. Per questo il repertorio serve anche con chi di solito risponde bene a un solo modo.",
  },
  parole: {
    ok: false,
    text: "Camilla continua a sbagliare, e comincia a sembrare più stanca dell'attenzione che dell'errore stesso.",
  },
};

export const casoReale09Steps: Step[] = [
  // 0 — intro
  {
    day: "caso reale 09",
    pct: 0,
    nextLabel: "Inizia ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casi Reali · Scenario 09</div>
        <h1>La ragazza che ripete lo stesso errore</h1>
        <p className="lede">
          Fascia 11-13. Competenza: cambiare strada (Cap. 8) — repertorio, con una ragazza con cui finora
          «dire» era sempre bastato.
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
      const outcome = situOutcome(answers);
      const fb = outcome ? SITU_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Situazione</div>
          <h1>Camilla, 13 anni</h1>
          <p className="lede">
            Con lei le spiegazioni a parole hanno sempre funzionato finora. Ma su un dettaglio della
            bracciata a rana, dopo due spiegazioni verbali dettagliate, continua a sbagliare nello stesso identico
            modo.
          </p>
          <p className="prompt">Cosa fai — visto che finora le spiegazioni a parole erano bastate?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Cosa fai davvero, in pratica</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — recupero, solo se situ === "B"
  {
    day: "recupero",
    pct: 45,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q1b && !!a.rec,
    visible: (a) => needsRecupero(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const rec = answers.rec as "cambia" | "parole" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Recupero · solo perché non ha funzionato</div>
          <h1>Tre tentativi identici</h1>
          <p className="lede">Tutti con la stessa spiegazione verbale.</p>
          <p className="prompt">Cosa fai adesso?</p>
          <Field id="q1b" value={answers.q1b ?? ""} onChange={(v) => setReflection("q1b", v)} />
          <h2>Cosa fai davvero, in pratica</h2>
          <OptionGroup name="rec" options={REC_OPTIONS} selected={answers.rec} onPick={(v) => setResponse("rec", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
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
          Cosa porti con te, la prossima volta che un canale che finora aveva sempre funzionato smette di
          funzionare su un dettaglio specifico?
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
          <h1>La ragazza che ripete lo stesso errore</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Cambiare strada (Cap. 8)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            Il Capitolo 8 lo dice esplicitamente: un canale che ha funzionato con un bambino su un esercizio non
            chiude il repertorio: è servito per quel momento, non vuol dire che funzionerà sempre con lui.
          </p>
        </>
      );
    },
  },
];
