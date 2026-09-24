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

// Spanish translation of caso-reale-03.tsx — same chapterId/response keys/internal values as the
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
      "Reconoces el miedo (hombros tensos, mirada fija en el agua, no en ti) y te acercas sin presionarla, tendiéndole la mano sin decir «entra»",
  },
  {
    value: "B",
    label: "Lees la pausa como un capricho o una distracción e intentas convencerla con palabras («venga, si ya sabes hacerlo, lo has hecho muchas veces»)",
  },
];
const REC_OPTIONS: Option[] = [
  { value: "tempo", label: "Te paras, te agachas a su nivel y le das tiempo, sin más palabras de convencimiento" },
  { value: "insisti", label: "Sigues insistiendo con palabras, quizá prometiéndole algo a cambio" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Beatrice no se mueve enseguida, pero después de un momento desplaza el peso hacia ti — al sentirse no presionada, empieza a confiar.",
  },
  B: {
    ok: false,
    text: "Beatrice se pone más rígida — las palabras no eran el problema, e insistir para convencerla no toca el miedo real.",
  },
};

const REC_FEEDBACK: Record<"tempo" | "insisti", { ok: boolean; text: string }> = {
  tempo: {
    ok: true,
    text: "Después de un momento de silencio compartido, Beatrice mueve un pie. No la has convencido — se le ha dado el espacio que necesitaba.",
  },
  insisti: {
    ok: false,
    text: "Beatrice entra, pero agarrada al borde durante toda la clase — ha cedido, no se ha sentido comprendida.",
  },
};

export const casoReale03StepsEs: Step[] = [
  // 0 — intro
  {
    day: "caso real 03",
    pct: 0,
    nextLabel: "Empezar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casos Reales · Escenario 03</div>
        <h1>El niño que tiene miedo</h1>
        <p className="lede">Franja 3-5 años. Competencias: observar e interpretar (Cap. 3) · sintonía (Cap. 4).</p>
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
          <h1>Beatrice, 5 años</h1>
          <p className="lede">
            Primera clase después de las vacaciones. En el borde de la piscina se bloquea, no entra: hombros
            tensos, ojos fijos en el agua, no te busca con la mirada. No llora, no dice nada.
          </p>
          <p className="prompt">
            ¿Qué causa te parece más probable — y qué haces para comprobarlo, no qué le preguntas con palabras?
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
      const rec = answers.rec as "tempo" | "insisti" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Recuperación · solo porque no ha funcionado</div>
          <h1>Beatrice sigue parada, ahora más tensa</h1>
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
          ¿Qué te llevas de este escenario, para la próxima vez que un niño pequeño se bloquee en silencio?
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
      const esito = o === "A" ? "gestionada a la primera" : answers.rec === "tempo" ? "equivocada, pero recuperada" : "equivocada, no recuperada";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Escenario completado</div>
          <div className="eyebrow">Cómo se lee este escenario</div>
          <h1>El niño que tiene miedo</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Observar e interpretar (Cap. 3)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            El silencio de un niño asustado no es un vacío que rellenar con más palabras — es información, y la
            respuesta correcta siempre empieza por cómo se lee, no por lo que se dice.
          </p>
        </>
      );
    },
  },
];
