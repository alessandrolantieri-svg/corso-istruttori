import { OptionGroup, type Option } from "@/components/OptionGroup";
import type { Step, StepContext } from "@/lib/chapters/types";

function Field({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  return (
    <textarea
      className="field"
      id={id}
      placeholder="Escribe aquí..."
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
      "Reconoces la oposición bajo el tono complaciente y la nombras con calma, sin enfrentamiento («he oído el \"como tú quieras\" — ¿qué es lo que no te convence de este ejercicio?»)",
  },
  { value: "B", label: "Te tomas el «como tú quieras» al pie de la letra, o insistes solo en el esfuerzo técnico («venga, ponle más energía»)" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Greta se descoloca un momento — no esperaba que notaras el sarcasmo y no lo usaras contra ella. Responde, más directa: «...sinceramente, me parece inútil.» Ahora puedes trabajar con eso.",
  },
  B: {
    ok: false,
    text: "Greta sigue con el mismo tono complaciente y la misma ejecución perezosa — nadie ha notado su oposición silenciosa, así que no tiene ningún motivo para cambiar de actitud.",
  },
};

export const casoReale12StepsEs: Step[] = [
  // 0 — intro
  {
    day: "caso real 12",
    pct: 0,
    nextLabel: "Empezar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casos Reales · Escenario 12</div>
        <h1>El adolescente que ejecuta de mala gana</h1>
        <p className="lede">
          Franja 14-18. Competencia: situaciones difíciles (Cap. 9). Distinto de los ejemplos de desafío abierto
          ya vistos en el Capítulo 9 y en la Ronda 2 del examen: aquí la oposición no levanta la voz — sonríe,
          ejecuta, y desactiva todo con un tono que dice otra cosa.
        </p>
        <div className="card">
          Escenario breve y autónomo — no tiene una puntuación de examen: es material al que puedes volver
          cuando quieras.
        </div>
      </>
    ),
  },

  // 1 — situazione
  {
    day: "situación",
    pct: 30,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.situ,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = situOutcome(answers);
      const fb = outcome ? SITU_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Situación</div>
          <h1>Greta, 17 años</h1>
          <p className="lede">
            Le das una instrucción técnica. Responde: «claro, como tú quieras», con una sonrisa y un tono ligeramente
            sarcástico, y luego ejecuta una versión deliberadamente perezosa del ejercicio — no mal hecha, solo
            sin ningún esfuerzo.
          </p>
          <p className="prompt">
            ¿Es un problema técnico o de relación? ¿Y qué haces — no qué le dices para que se esfuerce más?
          </p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Qué haces realmente, en la práctica</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — chiusura
  {
    day: "cierre",
    pct: 70,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Cierre</div>
        <h1>Qué te llevas</h1>
        <p className="prompt">
          ¿Qué te llevas, la próxima vez que un rechazo llega sonriendo en lugar de desafiando?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Reflexión libre, no cuenta para la puntuación.
        </p>
      </>
    ),
  },

  // 3 — come si legge
  {
    day: "cómo se lee esto",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "gestionada a la primera" : "no gestionada — señal no captada hoy";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Escenario completado</div>
          <div className="eyebrow">Cómo se lee este escenario</div>
          <h1>El adolescente que ejecuta de mala gana</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Situaciones difíciles (Cap. 9)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            El Capítulo 9 dice que el rechazo no siempre es ruidoso — aquí va un paso más allá: puede incluso
            sonar a acuerdo. La señal no está en las palabras («como tú quieras» es técnicamente un sí), está en
            el tono y en lo que se ejecuta justo después.
          </p>
        </>
      );
    },
  },
];
