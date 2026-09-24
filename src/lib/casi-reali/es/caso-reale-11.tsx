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

// Porta 1:1 situOutcome() del mockup caso-reale-11.html.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Le preguntas algo específico y personal sobre el entrenamiento, no genérico («¿qué te gustaría mejorar de verdad, este año?»), mostrando interés real por su respuesta",
  },
  { value: "B", label: "Lo dejas pasar, pensando que si lo hace todo bien no hay ningún problema que atender" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Simone se queda pensando un momento, sorprendido por la pregunta — nadie se lo había preguntado nunca en esos términos. Responde con algo concreto, y en las semanas siguientes ese detalle se convierte en un punto de conexión real.",
  },
  B: {
    ok: false,
    text: "Simone sigue haciéndolo todo bien, y sigue estando en otra parte — que no haya problemas visibles no significa que no esté desinteresado: solo significa que el desinterés no se ve a simple vista.",
  },
};

export const casoReale11StepsEs: Step[] = [
  // 0 — intro
  {
    day: "caso real 11",
    pct: 0,
    nextLabel: "Empezar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casos Reales · Escenario 11</div>
        <h1>El adolescente que ejecuta sin estar presente</h1>
        <p className="lede">
          Franja 14-18. Competencias: comunicación por edad (Cap. 2) · sintonía (Cap. 4). Distinto de quien
          ejecuta de mala gana (Escenario 12): aquí no hay conflicto, hay ausencia — más difícil de detectar
          porque no pide nada.
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
          <h1>Simone, 15 años</h1>
          <p className="lede">
            Hace todo lo que le pides, correctamente, sin un solo error — y sin ningún compromiso visible. No
            protesta nunca, no hace preguntas, no mira el reloj de forma llamativa. Simplemente, parece estar en
            otra parte.
          </p>
          <p className="prompt">
            ¿Qué haces — con un chico que no está pidiendo nada, y no parece tener un problema evidente?
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
          ¿Qué te llevas, la próxima vez que un adolescente lo hace todo sin equivocarse, y sin parecer
          realmente presente?
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
      const esito = o === "A" ? "gestionada a la primera" : "no gestionada — ocasión no aprovechada hoy";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Escenario completado</div>
          <div className="eyebrow">Cómo se lee este escenario</div>
          <h1>El adolescente que ejecuta sin estar presente</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Comunicación por edad (14-18)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            El desinterés silencioso es más difícil de ver que el rechazo abierto: no hay un momento preciso en
            el que «pasa algo» y entiendes que hay que intervenir. El desinterés hay que buscarlo, no esperarlo.
          </p>
        </>
      );
    },
  },
];
