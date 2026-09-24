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

// Porta 1:1 situOutcome() del mockup caso-reale-13.html.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Prendi la domanda sul serio e gli offri una scelta reale e limitata, non simbolica («scegli tu quale dei due esercizi di gambe facciamo per primo, il resto resta come programmato»), con un tono che dice che ci hai pensato davvero",
  },
  {
    value: "B",
    label:
      "Rispondi in modo tecnicamente corretto ma sbrigativo («la programmazione la faccio io, c'è un motivo per ogni esercizio»), vero nel contenuto ma detto senza fermarti, quasi infastidito",
  },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Andrea sceglie, con più attenzione di quanta ne avrebbe messo in un esercizio imposto — non era la scelta in sé il punto, era essere stato preso sul serio.",
  },
  B: {
    ok: false,
    text: "Andrea non insiste, ma per il resto della lezione resta distaccato. Ha ricevuto una risposta giusta nel contenuto, ma detta con un tono sbrigativo, quasi infastidito. Le parole dicevano una cosa, il tono un'altra — e questo lo ha fatto smettere di fidarsi.",
  },
};

export const casoReale13Steps: Step[] = [
  // 0 — intro
  {
    day: "caso reale 13",
    pct: 0,
    nextLabel: "Inizia ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casi Reali · Scenario 13 · ultimo della biblioteca</div>
        <h1>L&apos;adolescente che vuole essere trattato da adulto</h1>
        <p className="lede">
          Fascia 14-18. Competenze: comunicazione per età (Cap. 2) · congruenza (Cap. 5). Ultimo scenario della
          biblioteca — chiude l&apos;arco 3-18 iniziato con Nicolò, 4 anni, che aveva solo bisogno di essere
          guardato negli occhi.
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
          <h1>Andrea, 16 anni</h1>
          <p className="lede">
            Ti chiede, non per fare polemica ma sul serio: «perché non mi fai mai scegliere niente della
            programmazione? So bene cosa mi serve migliorare.»
          </p>
          <p className="prompt">Cosa rispondi — le parole, e con che tono?</p>
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
    day: "chiusura — l'ultima della biblioteca",
    pct: 70,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Chiusura — l&apos;ultima della biblioteca</div>
        <h1>Guardando indietro a tutti e tredici gli scenari</h1>
        <p className="prompt">
          Cosa hanno in comune un bambino di 4 anni che ha solo bisogno di essere guardato negli occhi, e un ragazzo
          di 16 che chiede di scegliere?
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
      const esito = o === "A" ? "gestita al primo colpo" : "non gestita — la richiesta resta sul tavolo";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scenario completato</div>
          <div className="exam-badge"><i className="ph-duotone ph-flag-checkered" aria-hidden="true" /> Biblioteca dei 13 Casi Reali completa</div>
          <div className="eyebrow">Come si legge questo scenario</div>
          <h1>L&apos;adolescente che vuole essere trattato da adulto</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Comunicazione per età + congruenza</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <div className="card quote">
            Il filo che attraversa tutta la biblioteca, dal primo scenario all&apos;ultimo: a ogni età la richiesta
            cambia forma — uno sguardo, una domanda, un «perché» — ma è sempre la stessa cosa: sentirsi visto per
            come si è in quel momento, non per l&apos;età che si ha.
          </div>
        </>
      );
    },
  },
];
