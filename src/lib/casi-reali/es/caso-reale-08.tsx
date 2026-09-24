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

// Porta 1:1 situOutcome()/needsRecupero()/recuperato()/needsScelta2() del mockup caso-reale-08.html.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}
function needsRecupero(a: Record<string, string>): boolean {
  return situOutcome(a) === "B";
}
function recuperato(a: Record<string, string>): boolean {
  return a.rec === "nomini";
}
function needsScelta2(a: Record<string, string>): boolean {
  return situOutcome(a) === "A" || (situOutcome(a) === "B" && recuperato(a));
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Reconoces la frustración (no rechazo, no cansancio físico) y la nombras con calma antes de volver a la técnica («es frustrante, lo veo. Intentemos algo pequeño, no todo junto»)",
  },
  { value: "B", label: "Vas directo a la corrección técnica, sin reconocer lo que está sintiendo" },
];
const REC_OPTIONS: Option[] = [
  { value: "nomini", label: "Retrocedes y nombras lo que ves, antes de volver a la técnica" },
  {
    value: "tecnica",
    label: "Insistes solo con la técnica, esperando que un intento logrado resuelva la frustración",
  },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Davide levanta la mirada, sorprendido de que lo hayan notado antes de corregirlo. Asiente, y vuelve a intentarlo con menos tensión en los hombros.",
  },
  B: {
    ok: false,
    text: "Davide lo hace otra vez, mecánicamente, sin intentar corregirse. Nadie ha dicho en voz alta lo que está sintiendo, y esa frustración empieza a parecerse a la resignación.",
  },
};

const REC_FEEDBACK: Record<"nomini" | "tecnica", { ok: boolean; text: string }> = {
  nomini: {
    ok: true,
    text: "Davide se relaja un poco: «...es que nunca me sale.» Ahora que se ha dicho, puedes trabajar con eso.",
  },
  tecnica: {
    ok: false,
    text: "Davide sigue ejecutando sin verdadero esfuerzo — la frustración no abordada se ha convertido en desinterés.",
  },
};

export const casoReale08StepsEs: Step[] = [
  // 0 — intro
  {
    day: "caso real 08",
    pct: 0,
    nextLabel: "Empezar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casos Reales · Escenario 08</div>
        <h1>El chico que se equivoca y se cierra</h1>
        <p className="lede">
          Franja 11-13. Competencias: observar e interpretar (Cap. 3) · el feedback (Cap. 7) — reencuadre del
          error.
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
    pct: 16,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.situ,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = situOutcome(answers);
      const fb = outcome ? SITU_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Situación</div>
          <h1>Davide, 12 años</h1>
          <p className="lede">
            En su cuarto intento seguido de un viraje, se equivoca otra vez. No protesta, no se niega — golpea
            el agua con una mano y aparta la mirada, con los hombros caídos.
          </p>
          <p className="prompt">¿Qué haces — qué notas primero, y qué haces primero?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Qué haces realmente, en la práctica</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — recupero, solo se situ === "B"
  {
    day: "recuperación",
    pct: 34,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1b && !!a.rec,
    visible: (a) => needsRecupero(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const rec = answers.rec as "nomini" | "tecnica" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Recuperación · solo porque no ha funcionado</div>
          <h1>Davide ejecuta mecánicamente</h1>
          <p className="lede">Sin intentar ya corregirse.</p>
          <p className="prompt">¿Qué haces ahora?</p>
          <Field id="q1b" value={answers.q1b ?? ""} onChange={(v) => setReflection("q1b", v)} />
          <h2>Qué haces realmente, en la práctica</h2>
          <OptionGroup name="rec" options={REC_OPTIONS} selected={answers.rec} onPick={(v) => setResponse("rec", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 3 — scelta2, il ritorno dopo il tentativo riuscito, solo se needsScelta2
  {
    day: "elección 2 — el feedback",
    pct: 55,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q2,
    visible: (a) => needsScelta2(a),
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Elección 2 · El feedback, después del intento logrado</div>
        <h1>Davide lo intenta de nuevo</h1>
        <p className="lede">Y esta vez el viraje es casi correcto.</p>
        <p className="prompt">Escribe el feedback que le das — específico, no un «bien» genérico.</p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
      </>
    ),
  },

  // 4 — chiusura
  {
    day: "cierre",
    pct: 80,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Cierre</div>
        <h1>Qué te llevas</h1>
        <p className="prompt">
          ¿Qué te llevas, la próxima vez que un chico de 11-13 años no proteste pero deje de intentar
          corregirse?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Reflexión libre, no cuenta para la puntuación.
        </p>
      </>
    ),
  },

  // 5 — come si legge
  {
    day: "cómo se lee esto",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "gestionada a la primera" : recuperato(answers) ? "fallada, pero recuperada" : "fallada, no recuperada";
      const showScelta2 = needsScelta2(answers);
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Escenario completado</div>
          <div className="eyebrow">Cómo se lee este escenario</div>
          <h1>El chico que se equivoca y se cierra</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Observar e interpretar (Cap. 3)</span>
              <span className="esito">{esito}</span>
            </div>
            {showScelta2 && (
              <div className="result-row">
                <span className="comp">El feedback (Cap. 7)</span>
                <span className="esito">registrado <i className="ph-duotone ph-check" aria-hidden="true" /></span>
              </div>
            )}
          </div>
          <p className="lede">
            A los 11-13 años, la frustración muchas veces no se dice con palabras: se ve en el gesto (la mano en el
            agua, la mirada que se aparta) antes que en la voz. El instructor tiene que darse cuenta antes de
            corregir el error.
          </p>
        </>
      );
    },
  },
];
