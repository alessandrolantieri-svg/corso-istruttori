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

// Porta 1:1 situOutcome()/needsRecupero() del mockup caso-reale-10.html.
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
      "Le dai un ritorno specifico e concreto sul gesto tecnico, senza discutere la sua frase («hai spinto forte con le gambe e allungato le braccia — è esattamente questo che l'ha fatto funzionare»)",
  },
  { value: "B", label: "Provi a convincerla a parole che non è stato un caso, in modo generico («ma no, sei brava, dai»)" },
];
const REC_OPTIONS: Option[] = [
  { value: "specifico", label: "Torni indietro con un ritorno specifico invece di rassicurazioni generiche" },
  { value: "generico", label: "Insisti con rassicurazioni generiche" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Ginevra ti ascolta, un po' sorpresa: non le hai detto che si sbagliava, le hai dato un motivo tecnico preciso — e quel motivo dimostra che non è stato un caso. Al tentativo successivo, ci riprova con più attenzione.",
  },
  B: {
    ok: false,
    text: "Ginevra scrolla le spalle, non convinta — un complimento generico non basta a smontare una convinzione radicata, specialmente a questa età, davanti al gruppo.",
  },
};

const REC_FEEDBACK: Record<"specifico" | "generico", { ok: boolean; text: string }> = {
  specifico: {
    ok: true,
    text: "Questa volta il dettaglio tecnico preciso arriva — e, a differenza di un «sei brava», è qualcosa che Ginevra può verificare da sola al tentativo successivo.",
  },
  generico: {
    ok: false,
    text: "Ginevra non cambia idea — la sfiducia resta intatta, perché niente di quello che hai detto le ha dato un motivo concreto per pensarla diversamente.",
  },
};

export const casoReale10Steps: Step[] = [
  // 0 — intro
  {
    day: "caso reale 10",
    pct: 0,
    nextLabel: "Inizia ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casi Reali · Scenario 10</div>
        <h1>La ragazza che non si crede il risultato</h1>
        <p className="lede">
          Fascia 11-13. Competenze: il ritorno (Cap. 7) · sintonia (Cap. 4). Diversa da «ha paura» (Scenario 03):
          qui non c&apos;è un pericolo percepito, c&apos;è sfiducia cronica nelle proprie capacità.
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
          <h1>Ginevra, 11 anni</h1>
          <p className="lede">
            Ha appena eseguito un tuffo di partenza tecnicamente corretto — il primo riuscito bene, dopo
            settimane. Invece di essere contenta, dice, guardando altrove: «tanto è stato un caso, di solito lo
            sbaglio.»
          </p>
          <p className="prompt">Cosa rispondi?</p>
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
      const rec = answers.rec as "specifico" | "generico" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Recupero · solo perché non ha funzionato</div>
          <h1>Ginevra resta scettica</h1>
          <p className="lede">Pronta a liquidare anche il prossimo tentativo come un caso.</p>
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
          Cosa porti con te, la prossima volta che un allievo liquida un proprio successo come un caso?
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
      const esito = o === "A" ? "gestita al primo colpo" : answers.rec === "specifico" ? "sbagliata, ma recuperata" : "sbagliata, non recuperata";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scenario completato</div>
          <div className="eyebrow">Come si legge questo scenario</div>
          <h1>La ragazza che non si crede il risultato</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Il ritorno (Cap. 7)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            Contro la sfiducia, «sei brava» non regge — «hai fatto questo, ed è per questo che ha funzionato» sì. È
            lo stesso principio del Capitolo 7 — un complimento specifico si ricorda, uno vago si dimentica —
            applicato a chi non si crede.
          </p>
        </>
      );
    },
  },
];
