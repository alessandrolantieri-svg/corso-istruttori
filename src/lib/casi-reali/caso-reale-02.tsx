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

// Porta 1:1 situOutcome()/needsRecupero() del mockup caso-reale-02.html.
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
      "Ti metti davvero nel suo campo visivo — non solo accanto a lui, ma tra lui e la distrazione — aspettando che i suoi occhi arrivino sui tuoi prima di parlare",
  },
  { value: "B", label: "Ripeti la stessa consegna più forte, dalla tua posizione, senza intercettare il suo sguardo" },
];
const REC_OPTIONS: Option[] = [
  { value: "sposti", label: "Ti sposti fisicamente nel suo campo visivo e aspetti il contatto visivo prima di parlare" },
  { value: "voce", label: "Alzi ancora la voce, sperando che questa volta funzioni" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Nicolò ti guarda. Dai la consegna una volta, semplice: «prendi la mia mano, entriamo insieme.» La segue.",
  },
  B: {
    ok: false,
    text: "Nicolò continua a guardare il compagno. La tua voce è diventata parte del rumore di fondo — non ha smesso di ascoltarti apposta, non ti ha ancora davvero sentito.",
  },
};

const REC_FEEDBACK: Record<"sposti" | "voce", { ok: boolean; text: string }> = {
  sposti: { ok: true, text: "Nicolò ti nota, un po' sorpreso di trovarti lì. Questa volta la consegna arriva." },
  voce: {
    ok: false,
    text: "Nicolò si volta, ma spaventato dal tono più che richiamato dalla consegna — entra in acqua, ma tirandosi indietro, non tendendoti la mano come chiesto.",
  },
};

export const casoReale02Steps: Step[] = [
  // 0 — intro
  {
    day: "caso reale 02",
    pct: 0,
    nextLabel: "Inizia ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casi Reali · Scenario 02</div>
        <h1>Il bambino che non ascolta</h1>
        <p className="lede">Fascia 3-5. Competenze: sintonia (Cap. 4) · consegne (Cap. 5).</p>
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
          <h1>Nicolò, 4 anni</h1>
          <p className="lede">
            È il suo secondo mese di corso. Sei accovacciato al suo livello, gli spieghi che ora tocca a lui
            entrare in acqua tenendoti la mano. Lui guarda altrove — un compagno che gioca con una tavoletta — e
            non dà segno di averti sentito.
          </p>
          <p className="prompt">Cosa fai, prima di ripetere la consegna?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Cosa fai davvero, in pratica</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
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
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const rec = answers.rec as "sposti" | "voce" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Recupero · solo perché non ha funzionato</div>
          <h1>Nicolò è ancora rivolto altrove</h1>
          <p className="lede">Hai ripetuto due volte, senza risultato.</p>
          <p className="prompt">Cosa fai adesso — diverso da ripetere ancora?</p>
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
          Cosa porti con te, di questo scenario, la prossima volta che un bambino piccolo sembra non ascoltarti?
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
      const esito = o === "A" ? "gestita al primo colpo" : answers.rec === "sposti" ? "sbagliata, ma recuperata" : "sbagliata, non recuperata";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scenario completato</div>
          <div className="eyebrow">Come si legge questo scenario</div>
          <h1>Il bambino che non ascolta</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Sintonia (Cap. 4)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            A 3-5 anni, «non ascolta» quasi sempre significa «non mi ha ancora visto» — la voce non è il
            problema, è il canale sbagliato: senza prima il contatto visivo, il resto fatica ad arrivare.
          </p>
        </>
      );
    },
  },
];
