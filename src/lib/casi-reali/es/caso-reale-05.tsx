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

// Spanish translation of caso-reale-05.tsx — same chapterId/response keys/internal values as the
// Italian original: only the visible text changes.
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
      "Cambias de canal — le enseñas el movimiento despacio, o le guías los brazos fuera del agua antes de dejarla intentarlo de nuevo",
  },
  { value: "B", label: "Lo vuelves a intentar con las mismas palabras, reformuladas de otra manera" },
];
const REC_OPTIONS: Option[] = [
  { value: "cambia", label: "Cambias por fin de canal (demostración o contacto físico guiado)" },
  { value: "parole", label: "Sigues insistiendo con palabras, quizá más despacio" },
];

export const casoReale05StepsEs: Step[] = [
  // 0 — intro
  {
    day: "caso real 05",
    pct: 0,
    nextLabel: "Empezar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casos Reales · Escenario 05</div>
        <h1>El niño que no comprende</h1>
        <p className="lede">
          Franja 6-10 años. Competencia: cambiar de rumbo (Cap. 8) — repertorio y adaptación en tiempo real.
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
    pct: 20,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.situ,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const o = situOutcome(answers);
      return (
        <>
          <div className="eyebrow">Situación</div>
          <h1>Chiara, 7 años</h1>
          <p className="lede">
            Le has explicado dos veces, con palabras, cómo coordinar los brazos en espalda. Lo intenta de nuevo, y
            se equivoca otra vez, exactamente del mismo modo. No parece distraída — te mira, concentrada, y
            todavía no le sale.
          </p>
          <p className="prompt">¿Qué haces — no una tercera explicación con palabras?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Lo que haces de verdad, en la práctica</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {o === "A" && (
            <div className="feedback ok">
              En el siguiente intento, el movimiento es casi correcto. No le faltaba esfuerzo: le faltaba un
              canal distinto de «decir».
            </div>
          )}
          {o === "B" && (
            <div className="feedback retry">
              Chiara se equivoca otra vez, del mismo modo. No es un problema de cuántas veces lo explicas: es un
              problema de qué canal usas.
            </div>
          )}
        </>
      );
    },
  },

  // 2 — recupero, solo se esito B
  {
    day: "recuperación",
    pct: 45,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1b && !!a.rec,
    visible: (a) => needsRecupero(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Recuperación · solo porque no ha funcionado</div>
        <h1>Chiara se ha equivocado tres veces con el mismo canal</h1>
        <p className="prompt">¿Qué haces ahora?</p>
        <Field id="q1b" value={answers.q1b ?? ""} onChange={(v) => setReflection("q1b", v)} />
        <h2>Lo que haces de verdad, en la práctica</h2>
        <OptionGroup name="rec" options={REC_OPTIONS} selected={answers.rec} onPick={(v) => setResponse("rec", v)} />
        {answers.rec === "cambia" && (
          <div className="feedback ok">El siguiente intento mejora enseguida y de forma visible.</div>
        )}
        {answers.rec === "parole" && (
          <div className="feedback retry">
            Chiara empieza a mostrar signos de cansancio de la atención más que del error en sí — seguir así no
            llevará a nada distinto.
          </div>
        )}
      </>
    ),
  },

  // 3 — chiusura
  {
    day: "cierre",
    pct: 75,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Cierre</div>
        <h1>Qué te llevas</h1>
        <p className="prompt">
          ¿Qué te llevas, para la próxima vez que un niño parezca concentrado pero siga equivocándose del mismo
          modo?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Reflexión libre, no cuenta para la puntuación.
        </p>
      </>
    ),
  },

  // 4 — come si legge
  {
    day: "cómo se lee",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "gestionada a la primera" : answers.rec === "cambia" ? "equivocada, pero recuperada (tarde)" : "equivocada, no recuperada";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Escenario completado</div>
          <div className="eyebrow">Cómo se lee este escenario</div>
          <h1>El niño que no comprende</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Cambiar de rumbo (Cap. 8)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            «No comprende» y «no escucha» parecen parecidos, pero no son el mismo escenario: aquí la atención
            está — es el canal lo que falta, no el contacto.
          </p>
        </>
      );
    },
  },
];
