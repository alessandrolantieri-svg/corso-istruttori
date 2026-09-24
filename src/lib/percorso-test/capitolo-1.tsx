import { OptionGroup, type Option } from "@/components/OptionGroup";
import type { Step, StepContext } from "@/lib/chapters/types";

// Contenuto segnaposto, non un corso reale. Serve solo a dimostrare che ChapterRunner e
// progressActions funzionano identici sotto un pathId/courseId diverso da quello nuoto — stessi
// tre tipi di dato (progresso, risposta valutabile, riflessione libera), nessuna modifica al
// motore oltre ai parametri pathId/courseId già aggiunti.

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

const PROVA_OPTIONS: Option[] = [
  { value: "si", label: "Sì, la vedo nella lista dei percorsi", correct: true },
  { value: "no", label: "No, non la vedo", correct: false },
];

export const percorsoTestCapitolo1Steps: Step[] = [
  {
    day: "inizio",
    pct: 0,
    nextLabel: "Inizia ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Percorso di prova · verifica tecnica</div>
        <h1>Capitolo di prova</h1>
        <div className="card warn">
          Questo non è un corso reale — è contenuto segnaposto, usato solo per verificare che la
          piattaforma regga un secondo percorso oltre a &quot;Comunicazione nell&apos;insegnamento del
          nuoto&quot;, senza cambiare né lo schema del database né il motore che fa girare i capitoli.
        </div>
      </>
    ),
  },
  {
    day: "domanda di prova",
    pct: 50,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.check,
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Domanda di prova</div>
        <h1>Due tipi di dato, come in ogni capitolo vero</h1>
        <p className="lede">
          Scrivi una riga qualunque — verifica che le riflessioni libere si salvino anche su questo
          percorso, in uno spazio separato dalle risposte valutabili (Muro 1).
        </p>
        <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
        <p className="prompt">Questa domanda a scelta è la stessa identica meccanica dei quiz veri — la vedi?</p>
        <OptionGroup name="check" options={PROVA_OPTIONS} selected={answers.check} onPick={(v, correct) => setResponse("check", v, correct)} />
      </>
    ),
  },
  {
    day: "fine",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: () => (
      <>
        <div className="done-badge">✓ Capitolo di prova completato</div>
        <div className="eyebrow">Verifica riuscita</div>
        <h1>Il secondo percorso funziona</h1>
        <p className="lede">
          Progresso, risposta valutabile e riflessione libera sono stati salvati sotto un pathId/courseId
          diverso da quello del corso nuoto, con lo stesso motore e la stessa tabella — nessuna riscrittura
          dello schema, come previsto da D23.
        </p>
      </>
    ),
  },
];
