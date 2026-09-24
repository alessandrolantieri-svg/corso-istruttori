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

// Porta 1:1 situOutcome() del mockup caso-reale-11.html.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Gli chiedi qualcosa di specifico e personale sull'allenamento, non generico («cosa ti piacerebbe migliorare, davvero, quest'anno?»), mostrando interesse reale per la sua risposta",
  },
  { value: "B", label: "Lasci correre, pensando che se esegue tutto correttamente non ci sia un problema da affrontare" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Simone ci pensa un attimo, sorpreso dalla domanda — non gliel'aveva mai chiesto nessuno in quei termini. Risponde con qualcosa di concreto, e nelle settimane seguenti quel dettaglio diventa un aggancio reale.",
  },
  B: {
    ok: false,
    text: "Simone continua a eseguire tutto bene, e a restare altrove — il fatto che non ci siano problemi visibili non vuol dire che non sia disinteressato: vuol dire solo che il disinteresse non si vede a occhio nudo.",
  },
};

export const casoReale11Steps: Step[] = [
  // 0 — intro
  {
    day: "caso reale 11",
    pct: 0,
    nextLabel: "Inizia ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casi Reali · Scenario 11</div>
        <h1>L&apos;adolescente che esegue senza esserci</h1>
        <p className="lede">
          Fascia 14-18. Competenze: comunicazione per età (Cap. 2) · sintonia (Cap. 4). Diverso da chi esegue di
          malavoglia (Scenario 12): qui non c&apos;è conflitto, c&apos;è assenza — più difficile da intercettare
          perché non chiede niente.
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
    pct: 30,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.situ,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = situOutcome(answers);
      const fb = outcome ? SITU_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Situazione</div>
          <h1>Simone, 15 anni</h1>
          <p className="lede">
            Esegue tutto quello che chiedi, correttamente, senza un errore — e senza nessun impegno visibile. Non
            protesta mai, non fa domande, non guarda mai l&apos;orologio in modo plateale. Semplicemente, sembra
            altrove.
          </p>
          <p className="prompt">
            Cosa fai — con un ragazzo che non sta chiedendo niente, e non sembra avere un problema evidente?
          </p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Cosa fai davvero, in pratica</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — chiusura
  {
    day: "chiusura",
    pct: 70,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Chiusura</div>
        <h1>Cosa porti con te</h1>
        <p className="prompt">
          Cosa porti con te, la prossima volta che un adolescente esegue tutto senza sbagliare, e senza sembrare
          davvero presente?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Riflessione libera, non entra in punteggio.
        </p>
      </>
    ),
  },

  // 3 — come si legge
  {
    day: "come si legge",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "gestita al primo colpo" : "non gestita — occasione non colta oggi";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scenario completato</div>
          <div className="eyebrow">Come si legge questo scenario</div>
          <h1>L&apos;adolescente che esegue senza esserci</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Comunicazione per età (14-18)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            Il disinteresse silenzioso è più difficile da vedere del rifiuto aperto: non c&apos;è un momento
            preciso in cui «succede qualcosa» e capisci che devi intervenire. Il disinteresse va cercato, non
            aspettato.
          </p>
        </>
      );
    },
  },
];
