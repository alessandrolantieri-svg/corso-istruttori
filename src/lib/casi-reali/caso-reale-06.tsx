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

// Porta 1:1 situOutcome() del mockup caso-reale-06.html.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Osservi un primo tentativo breve prima di lasciarlo andare avanti — anche se sembra sicuro, gli chiedi di farti vedere solo i primi metri",
  },
  { value: "B", label: "Ti fidi della sicurezza con cui parla e lo lasci partire per l'esercizio intero" },
];

export const casoReale06Steps: Step[] = [
  // 0 — intro
  {
    day: "caso reale 06",
    pct: 0,
    nextLabel: "Inizia ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casi Reali · Scenario 06</div>
        <h1>Il bambino che dice di sapere già fare</h1>
        <p className="lede">Fascia 6-10. Competenza: verificare con l&apos;azione (Cap. 6 <i className="ph-duotone ph-trophy" aria-hidden="true" />).</p>
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
      const o = situOutcome(answers);
      return (
        <>
          <div className="eyebrow">Situazione</div>
          <h1>Filippo, 9 anni</h1>
          <p className="lede">
            Gli hai appena spiegato come tenere il corpo disteso durante la scivolata. Dice, con sicurezza
            totale: «sì sì, lo so fare, faccio sempre così.»
          </p>
          <p className="prompt">Cosa fai — prima di lasciarlo partire per la vasca intera?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Cosa fai davvero, in pratica</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {o === "A" && (
            <div className="feedback ok">
              Filippo scivola — il corpo si incurva leggermente a metà. Era un dettaglio che nemmeno lui notava,
              perché si sentiva troppo sicuro. Tu lo vedi subito, prima che diventi un&apos;abitudine.
            </div>
          )}
          {o === "B" && (
            <div className="feedback retry">
              Filippo nuota tutta la vasca ripetendo sempre lo stesso errore. Se lo avessi corretto subito,
              sarebbe bastato un attimo. Scoperto solo ora, è già diventato un&apos;abitudine — ed è più difficile
              da correggere.
            </div>
          )}
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
        <p className="prompt">Cosa porti con te, la prossima volta che un allievo ti risponde con sicurezza totale?</p>
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
      const esito = o === "A" ? "gestita al primo colpo" : "non gestita — correzione arrivata in ritardo";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scenario completato</div>
          <div className="eyebrow">Come si legge questo scenario</div>
          <h1>Il bambino che dice di sapere già fare</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Verificare con l&apos;azione (Cap. 6 <i className="ph-duotone ph-trophy" aria-hidden="true" />)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            La sicurezza con cui un bambino risponde non è più affidabile di un «sì, ho capito»: il Capitolo 6 lo
            dice per l&apos;incertezza, ma vale identico al contrario — anche la fiducia va verificata con
            l&apos;azione, non presa in parola.
          </p>
        </>
      );
    },
  },
];
