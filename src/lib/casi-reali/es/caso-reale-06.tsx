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

// Spanish translation of caso-reale-06.tsx — same chapterId/response keys/internal values as the
// Italian original: only the visible text changes.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Observas un primer intento breve antes de dejarle seguir — aunque parezca seguro, le pides que te enseñe solo los primeros metros",
  },
  { value: "B", label: "Confías en la seguridad con la que habla y le dejas salir para el ejercicio entero" },
];

export const casoReale06StepsEs: Step[] = [
  // 0 — intro
  {
    day: "caso real 06",
    pct: 0,
    nextLabel: "Empezar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casos Reales · Escenario 06</div>
        <h1>El niño que dice que ya sabe hacerlo</h1>
        <p className="lede">Franja 6-10 años. Competencia: verificar con la acción (Cap. 6 <i className="ph-duotone ph-trophy" aria-hidden="true" />).</p>
        <div className="card">
          Escenario breve y autónomo — no tiene una puntuación de examen: es material al que puedes volver cuando
          quieras.
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
      const o = situOutcome(answers);
      return (
        <>
          <div className="eyebrow">Situación</div>
          <h1>Filippo, 9 años</h1>
          <p className="lede">
            Acabas de explicarle cómo mantener el cuerpo extendido durante el deslizamiento. Dice, con total
            seguridad: «sí sí, sé hacerlo, siempre lo hago así.»
          </p>
          <p className="prompt">¿Qué haces — antes de dejarle salir para hacer todo el largo?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Lo que haces de verdad, en la práctica</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {o === "A" && (
            <div className="feedback ok">
              Filippo se desliza — el cuerpo se curva ligeramente a mitad de camino. Era un detalle que ni él
              mismo notaba, porque se sentía demasiado seguro. Tú lo ves enseguida, antes de que se convierta en
              un hábito.
            </div>
          )}
          {o === "B" && (
            <div className="feedback retry">
              Filippo nada todo el largo repitiendo siempre el mismo error. Si lo hubieras corregido enseguida,
              habría bastado un instante. Descubierto solo ahora, ya se ha convertido en un hábito — y es más
              difícil de corregir.
            </div>
          )}
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
        <p className="prompt">¿Qué te llevas, para la próxima vez que un alumno te responda con total seguridad?</p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Reflexión libre, no cuenta para la puntuación.
        </p>
      </>
    ),
  },

  // 3 — come si legge
  {
    day: "cómo se lee",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "gestionada a la primera" : "no gestionada — la corrección llegó tarde";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Escenario completado</div>
          <div className="eyebrow">Cómo se lee este escenario</div>
          <h1>El niño que dice que ya sabe hacerlo</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Verificar con la acción (Cap. 6 <i className="ph-duotone ph-trophy" aria-hidden="true" />)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            La seguridad con la que responde un niño no es más fiable que un «sí, lo he entendido»: el Capítulo 6
            lo dice para la incertidumbre, pero vale igual al revés — también la confianza hay que verificarla
            con la acción, no darla por buena de palabra.
          </p>
        </>
      );
    },
  },
];
