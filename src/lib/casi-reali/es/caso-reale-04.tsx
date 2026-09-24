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

// Spanish translation of caso-reale-04.tsx — same chapterId/response keys/internal values as the
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
      "Buscas la causa antes de insistir — te acercas, bajas el ritmo, le preguntas con calma si está cansado o si prefiere un juego más sencillo",
  },
  { value: "B", label: "Insistes en el ejercicio previsto, quizá con un tono más firme o prometiendo un premio" },
];
const REC_OPTIONS: Option[] = [
  {
    value: "abbassi",
    label: "Te paras, bajas las exigencias y le ofreces algo mucho más sencillo y divertido, sin volver a nombrar el ejercicio anterior",
  },
  { value: "insisti", label: "Sigues insistiendo en el ejercicio, esperando a que el llanto pase solo" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Samuele se abre un poco: «...estoy cansado.» No era un rechazo del agua, era un niño de 4 años sin energía — y a esta edad, decirlo con un «no» es normal.",
  },
  B: {
    ok: false,
    text: "Samuele se cierra más, repite «no» con más fuerza, y empieza a llorar.",
  },
};

const REC_FEEDBACK: Record<"abbassi" | "insisti", { ok: boolean; text: string }> = {
  abbassi: {
    ok: true,
    text: "Samuele se calma, poco a poco. No hará el ejercicio previsto hoy — pero vuelve a estar en el agua contigo, y eso ya es mucho.",
  },
  insisti: {
    ok: false,
    text: "Samuele sigue cerrado el resto de la clase — el episodio no se ha resuelto, solo se ha detenido.",
  },
};

export const casoReale04StepsEs: Step[] = [
  // 0 — intro
  {
    day: "caso real 04",
    pct: 0,
    nextLabel: "Empezar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casos Reales · Escenario 04</div>
        <h1>El niño que rechaza la instrucción</h1>
        <p className="lede">
          Franja 3-5 años. Competencias: situaciones difíciles (Cap. 9) · sintonía (Cap. 4). A esta edad «no
          quiere» rara vez es un desafío social — más a menudo es sobrecarga: demasiadas cosas a la vez, poca
          capacidad de decirlo con palabras.
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
      const outcome = situOutcome(answers);
      const fb = outcome ? SITU_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Situación</div>
          <h1>Samuele, 4 años</h1>
          <p className="lede">
            En el tercer ejercicio de la clase, cruza los brazos y dice, con voz pequeña pero decidida: «no, no lo
            hago.» No está enfadado contigo — solo parece agotado.
          </p>
          <p className="prompt">
            ¿Qué haces — no qué le dices para convencerlo, sino qué haces para entender qué hay detrás de ese
            «no»?
          </p>
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
      const rec = answers.rec as "abbassi" | "insisti" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Recuperación · solo porque no ha funcionado</div>
          <h1>Samuele llora, sentado en el borde</h1>
          <p className="lede">Ya no responde a las peticiones.</p>
          <p className="prompt">¿Qué haces ahora?</p>
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
          ¿Qué te llevas, para la próxima vez que un niño pequeño diga «no» sin parecer enfadado?
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
      const esito = o === "A" ? "gestionada a la primera" : answers.rec === "abbassi" ? "equivocada, pero recuperada" : "equivocada, no recuperada";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Escenario completado</div>
          <div className="eyebrow">Cómo se lee este escenario</div>
          <h1>El niño que rechaza la instrucción</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Situaciones difíciles (Cap. 9)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            No todos los «no», a los 3-5 años, son un problema de relación que resolver — a veces son solo una forma
            sencilla de decir algo verdadero: por hoy, basta.
          </p>
        </>
      );
    },
  },
];
