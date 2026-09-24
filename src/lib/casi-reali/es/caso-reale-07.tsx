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

// Spanish translation of caso-reale-07.tsx — same chapterId/response keys/internal values as the
// Italian original: only the visible text changes.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}

const SITU_OPTIONS: Option[] = [
  { value: "A", label: "Le pides su opinión antes que la tuya, o te quedas en silencio observando" },
  { value: "B", label: "Le das de todos modos una corrección técnica, por costumbre, aunque no esté equivocada" },
];

export const casoReale07StepsEs: Step[] = [
  // 0 — intro
  {
    day: "caso real 07",
    pct: 0,
    nextLabel: "Empezar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casos Reales · Escenario 07</div>
        <h1>El niño que necesita autonomía</h1>
        <p className="lede">
          Franja 6-10 años. Competencia: autonomía (Cap. 10) — aplicada aquí antes que en los ejemplos habituales,
          para demostrar que no es una competencia solo para los mayores.
        </p>
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
          <h1>Vittoria, 10 años</h1>
          <p className="lede">
            Desde hace un mes hace correctamente, sin errores, la entrada al agua que antes corregías cada vez.
            Está a punto de repetirla delante de ti, como siempre.
          </p>
          <p className="prompt">¿Qué haces, antes de que la haga?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Lo que haces de verdad, en la práctica</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {o === "A" && (
            <div className="feedback ok">
              Vittoria la hace, luego te mira: «...creo que he entrado bien. ¿Es verdad?» — ya ha dado su propio
              juicio antes de pedir el tuyo.
            </div>
          )}
          {o === "B" && (
            <div className="feedback retry">
              Vittoria: «...vale.» Lo hace de nuevo esperando, como siempre, tu veredicto final.
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
        <p className="prompt">
          ¿Qué te llevas, para la próxima vez que un alumno ya sepa hacer bien algo que antes corregías cada vez?
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
    day: "cómo se lee",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "gestionada a la primera" : "ocasión perdida, no un error grave";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Escenario completado</div>
          <div className="eyebrow">Cómo se lee este escenario</div>
          <h1>El niño que necesita autonomía</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Autonomía (Cap. 10)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            La autonomía no es una competencia que se aplique solo al final del camino, con los alumnos mayores:
            un niño de 10 años que ya sabe hacer bien algo tiene la misma necesidad — que se le deje juzgarse
            solo — que un alumno veterano.
          </p>
        </>
      );
    },
  },
];
