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

// Porta 1:1 situOutcome() del mockup caso-reale-12.html.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Riconosci l'opposizione sotto il tono accomodante e la nomini con calma, senza scontro («ho sentito il \"come vuoi tu\" — cosa c'è che non ti torna di questo esercizio?»)",
  },
  { value: "B", label: "Prendi il «come vuoi tu» alla lettera, o insisti solo sull'impegno tecnico («dai, mettici più energia»)" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Greta si spiazza un attimo — non si aspettava che il sarcasmo venisse notato e non usato contro di lei. Risponde, più diretta: «...lo trovo inutile, sinceramente.» Ora puoi lavorarci.",
  },
  B: {
    ok: false,
    text: "Greta continua con lo stesso tono accomodante e la stessa esecuzione pigra — nessuno ha notato la sua opposizione silenziosa, quindi Greta non ha motivo di cambiare atteggiamento.",
  },
};

export const casoReale12Steps: Step[] = [
  // 0 — intro
  {
    day: "caso reale 12",
    pct: 0,
    nextLabel: "Inizia ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casi Reali · Scenario 12</div>
        <h1>L&apos;adolescente che esegue di malavoglia</h1>
        <p className="lede">
          Fascia 14-18. Competenza: situazioni difficili (Cap. 9). Diverso dagli esempi di sfida aperta già visti
          nel Capitolo 9 e nel Turno 2 dell&apos;esame: qui l&apos;opposizione non alza la voce — sorride, esegue, e
          disinnesca ogni cosa con un tono che dice altro.
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
          <h1>Greta, 17 anni</h1>
          <p className="lede">
            Le dai una consegna tecnica. Risponde: «certo, come vuoi tu», con un sorriso e un tono leggermente
            sarcastico, poi esegue una versione volutamente pigra dell&apos;esercizio — non sbagliata, solo priva di
            qualunque impegno.
          </p>
          <p className="prompt">
            È un problema tecnico o di relazione? E cosa fai — non cosa le dici per farla impegnare di più?
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
          Cosa porti con te, la prossima volta che un rifiuto arriva sorridendo invece che sfidando?
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
      const esito = o === "A" ? "gestita al primo colpo" : "non gestita — segnale non colto oggi";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scenario completato</div>
          <div className="eyebrow">Come si legge questo scenario</div>
          <h1>L&apos;adolescente che esegue di malavoglia</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Situazioni difficili (Cap. 9)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            Il Capitolo 9 dice che il rifiuto non è sempre rumoroso — qui va un passo oltre: può persino suonare come
            accordo. Il segnale non è nelle parole («come vuoi tu» è tecnicamente un sì), è nel tono e in quello che
            viene eseguito subito dopo.
          </p>
        </>
      );
    },
  },
];
