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

// Porta 1:1 situOutcome()/needsRecupero() del mockup caso-reale-09.html.
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
      "Cambias de canal de todas formas, aunque con ella hasta ahora explicar con palabras siempre había funcionado, porque lo que estás usando no está funcionando",
  },
  { value: "B", label: "Insistes con palabras, porque hasta ahora con ella siempre había bastado, reformulando otra vez" },
];
const REC_OPTIONS: Option[] = [
  { value: "cambia", label: "Por fin cambias de canal (demostración, o contacto físico guiado)" },
  { value: "parole", label: "Sigues insistiendo con palabras, tal vez más despacio" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Le muestras el movimiento despacio en el agua, delante de ella. En el intento siguiente, algo se desbloquea. No es que hablar ya no funcione con ella en general: es solo que ese detalle concreto necesitaba otra forma de explicarse.",
  },
  B: {
    ok: false,
    text: "Camilla se equivoca una tercera vez, de la misma manera. Que «explicar con palabras» funcione normalmente con ella no significa que funcione siempre, con cada detalle.",
  },
};

const REC_FEEDBACK: Record<"cambia" | "parole", { ok: boolean; text: string }> = {
  cambia: {
    ok: true,
    text: "El intento siguiente mejora. No estaba garantizado que el canal correcto fuera distinto del de siempre. Por eso el repertorio sirve también con quien normalmente responde bien a una sola forma.",
  },
  parole: {
    ok: false,
    text: "Camilla sigue equivocándose, y empieza a parecer más cansada de la atención que del error en sí.",
  },
};

export const casoReale09StepsEs: Step[] = [
  // 0 — intro
  {
    day: "caso real 09",
    pct: 0,
    nextLabel: "Empezar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casos Reales · Escenario 09</div>
        <h1>La chica que repite el mismo error</h1>
        <p className="lede">
          Franja 11-13. Competencia: cambiar de rumbo (Cap. 8) — repertorio, con una chica con la que hasta
          ahora «explicar con palabras» siempre había bastado.
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
          <h1>Camilla, 13 años</h1>
          <p className="lede">
            Con ella, las explicaciones con palabras siempre han funcionado hasta ahora. Pero en un detalle de
            la brazada de rana, después de dos explicaciones verbales detalladas, sigue equivocándose exactamente
            de la misma manera.
          </p>
          <p className="prompt">¿Qué haces — teniendo en cuenta que hasta ahora explicar con palabras había bastado?</p>
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
    pct: 45,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1b && !!a.rec,
    visible: (a) => needsRecupero(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const rec = answers.rec as "cambia" | "parole" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Recuperación · solo porque no ha funcionado</div>
          <h1>Tres intentos idénticos</h1>
          <p className="lede">Todos con la misma explicación verbal.</p>
          <p className="prompt">¿Qué haces ahora?</p>
          <Field id="q1b" value={answers.q1b ?? ""} onChange={(v) => setReflection("q1b", v)} />
          <h2>Qué haces realmente, en la práctica</h2>
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
          ¿Qué te llevas, la próxima vez que un canal que hasta ahora siempre había funcionado deja de funcionar
          en un detalle concreto?
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
    day: "cómo se lee esto",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "gestionada a la primera" : answers.rec === "cambia" ? "fallada, pero recuperada (tarde)" : "fallada, no recuperada";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Escenario completado</div>
          <div className="eyebrow">Cómo se lee este escenario</div>
          <h1>La chica que repite el mismo error</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Cambiar de rumbo (Cap. 8)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            El Capítulo 8 lo dice de forma explícita: un canal que ha funcionado con un niño en un ejercicio no
            cierra el repertorio: sirvió para ese momento, no significa que siempre vaya a funcionar con él.
          </p>
        </>
      );
    },
  },
];
