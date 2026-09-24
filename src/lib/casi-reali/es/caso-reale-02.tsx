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

// Spanish translation of caso-reale-02.tsx — same chapterId/response keys/internal values as the
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
      "Te colocas realmente en su campo visual — no solo a su lado, sino entre él y la distracción — esperando a que sus ojos lleguen a los tuyos antes de hablar",
  },
  { value: "B", label: "Repites la misma instrucción más fuerte, desde donde estás, sin captar su mirada" },
];
const REC_OPTIONS: Option[] = [
  { value: "sposti", label: "Te desplazas físicamente a su campo visual y esperas el contacto visual antes de hablar" },
  { value: "voce", label: "Alzas la voz otra vez, esperando que esta vez funcione" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Nicolò te mira. Le das la instrucción una vez, simple: «coge mi mano, entramos juntos.» La sigue.",
  },
  B: {
    ok: false,
    text: "Nicolò sigue mirando a su compañero. Tu voz se ha convertido en parte del ruido de fondo — no ha dejado de escucharte a propósito, todavía no te ha oído de verdad.",
  },
};

const REC_FEEDBACK: Record<"sposti" | "voce", { ok: boolean; text: string }> = {
  sposti: { ok: true, text: "Nicolò te nota, un poco sorprendido de encontrarte ahí. Esta vez la instrucción llega." },
  voce: {
    ok: false,
    text: "Nicolò se vuelve, pero asustado por el tono más que atraído por la instrucción — entra en el agua, pero echándose atrás, sin darte la mano como se le pidió.",
  },
};

export const casoReale02StepsEs: Step[] = [
  // 0 — intro
  {
    day: "caso real 02",
    pct: 0,
    nextLabel: "Empezar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casos Reales · Escenario 02</div>
        <h1>El niño que no escucha</h1>
        <p className="lede">Franja 3-5 años. Competencias: sintonía (Cap. 4) · instrucciones (Cap. 5).</p>
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
      const outcome = situOutcome(answers);
      const fb = outcome ? SITU_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Situación</div>
          <h1>Nicolò, 4 años</h1>
          <p className="lede">
            Es su segundo mes de curso. Estás agachado a su altura, le explicas que ahora le toca entrar en el
            agua cogido de tu mano. Él mira hacia otro lado — un compañero que juega con una tabla — y no da
            señales de haberte oído.
          </p>
          <p className="prompt">¿Qué haces, antes de repetir la instrucción?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Lo que haces de verdad, en la práctica</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
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
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const rec = answers.rec as "sposti" | "voce" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Recuperación · solo porque no ha funcionado</div>
          <h1>Nicolò sigue mirando hacia otro lado</h1>
          <p className="lede">Has repetido dos veces, sin resultado.</p>
          <p className="prompt">¿Qué haces ahora — algo distinto de repetir otra vez?</p>
          <Field id="q1b" value={answers.q1b ?? ""} onChange={(v) => setReflection("q1b", v)} />
          <h2>Lo que haces de verdad, en la práctica</h2>
          <OptionGroup name="rec" options={REC_OPTIONS} selected={answers.rec} onPick={(v) => setResponse("rec", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
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
          ¿Qué te llevas, de este escenario, para la próxima vez que un niño pequeño parezca no escucharte?
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
      const esito = o === "A" ? "gestionada a la primera" : answers.rec === "sposti" ? "equivocada, pero recuperada" : "equivocada, no recuperada";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Escenario completado</div>
          <div className="eyebrow">Cómo se lee este escenario</div>
          <h1>El niño que no escucha</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Sintonía (Cap. 4)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            A los 3-5 años, «no escucha» casi siempre significa «todavía no me ha visto» — la voz no es el problema,
            es el canal equivocado: sin el contacto visual primero, cuesta que el resto llegue.
          </p>
        </>
      );
    },
  },
];
