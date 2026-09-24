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

// Porta 1:1 situOutcome()/needsRecupero() del mockup caso-reale-03.html.
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
      "Riconosci la paura (spalle tese, sguardo fisso sull'acqua, non su di te) e ti avvicini senza incalzarla, tendendo la mano senza dire «entra»",
  },
  {
    value: "B",
    label: "Leggi la pausa come capriccio o distrazione e provi a convincerla a parole («dai, lo sai già fare, l'hai fatto tante volte»)",
  },
];
const REC_OPTIONS: Option[] = [
  { value: "tempo", label: "Ti fermi, ti abbassi al suo livello e le dai tempo, senza altre parole di convinzione" },
  { value: "insisti", label: "Continui a insistere a parole, magari promettendo qualcosa in cambio" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Beatrice non si muove subito, ma dopo un momento sposta il peso verso di te — sentendosi non incalzata, comincia a fidarsi.",
  },
  B: {
    ok: false,
    text: "Beatrice si irrigidisce di più — le parole non erano il problema, e insistere a convincerla non tocca la paura vera.",
  },
};

const REC_FEEDBACK: Record<"tempo" | "insisti", { ok: boolean; text: string }> = {
  tempo: {
    ok: true,
    text: "Dopo un momento di silenzio condiviso, Beatrice sposta un piede. Non è stata convinta — le è stato dato lo spazio di cui aveva bisogno.",
  },
  insisti: {
    ok: false,
    text: "Beatrice entra, ma tenendosi stretta al bordo per tutta la lezione — ha ceduto, non si è sentita capita.",
  },
};

export const casoReale03Steps: Step[] = [
  // 0 — intro
  {
    day: "caso reale 03",
    pct: 0,
    nextLabel: "Inizia ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casi Reali · Scenario 03</div>
        <h1>Il bambino che ha paura</h1>
        <p className="lede">Fascia 3-5. Competenze: osservare e interpretare (Cap. 3) · sintonia (Cap. 4).</p>
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
          <h1>Beatrice, 5 anni</h1>
          <p className="lede">
            Prima lezione dopo le vacanze. Al bordo vasca si blocca, non entra: spalle strette, occhi fissi
            sull&apos;acqua, non ti cerca con lo sguardo. Non piange, non dice niente.
          </p>
          <p className="prompt">
            Quale causa ti sembra più probabile — e cosa fai per verificarlo, non cosa le chiedi a parole?
          </p>
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
      const rec = answers.rec as "tempo" | "insisti" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Recupero · solo perché non ha funzionato</div>
          <h1>Beatrice è ancora ferma, ora più tesa</h1>
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
          Cosa porti con te di questo scenario, la prossima volta che un bambino piccolo si blocca in silenzio?
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
      const esito = o === "A" ? "gestita al primo colpo" : answers.rec === "tempo" ? "sbagliata, ma recuperata" : "sbagliata, non recuperata";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scenario completato</div>
          <div className="eyebrow">Come si legge questo scenario</div>
          <h1>Il bambino che ha paura</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Osservare e interpretare (Cap. 3)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            Il silenzio di un bambino spaventato non è un vuoto da riempire con altre parole — è
            un&apos;informazione, e la risposta giusta comincia sempre da come si legge, non da cosa si dice.
          </p>
        </>
      );
    },
  },
];
