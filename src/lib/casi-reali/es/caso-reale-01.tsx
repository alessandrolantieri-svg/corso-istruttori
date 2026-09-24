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

// Spanish translation of caso-reale-01.tsx — same chapterId/response keys/internal values as the
// Italian original: only the visible text changes.
type SituOutcome = "A" | "B" | "D" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}
function needsRecupero(a: Record<string, string>): boolean {
  return situOutcome(a) === "D";
}
function recuperato(a: Record<string, string>): boolean {
  return a.scelta1b === "verifica";
}
type Scelta2Version = "pulita" | "errore-successo" | "recupero-riuscito" | "mai-recuperato";
function scelta2Version(a: Record<string, string>): Scelta2Version {
  const o = situOutcome(a);
  if (o === "A") return "pulita";
  if (o === "B") return "errore-successo";
  if (o === "D") return recuperato(a) ? "recupero-riuscito" : "mai-recuperato";
  return "pulita";
}
function needsScelta3(a: Record<string, string>): boolean {
  const v = scelta2Version(a);
  return v === "errore-successo" || v === "mai-recuperato";
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "No repites toda la explicación desde el principio, sino que compruebas con una pregunta breve y concreta qué ha visto («dime: ¿hacia dónde giro la cabeza para respirar?») en vez de «¿lo has entendido?»",
  },
  { value: "B", label: "Empiezas el ejercicio pensando que «total, ya lo ha hecho otras veces»" },
  {
    value: "D",
    label: "Piensas que no tiene ganas de hacer el ejercicio, o que se ha olvidado de algo que ya sabía («venga, tú sabes hacerlo, esfuérzate»)",
  },
];
const SCELTA1B_OPTIONS: Option[] = [
  {
    value: "verifica",
    label: "Te paras, bajas el tono, le preguntas qué vio o escuchó antes («cuando llegaron los nuevos — ¿te dio tiempo a oírlo todo?»)",
  },
  { value: "insiste", label: "Sigues insistiendo con la lectura equivocada — repites que tiene que esforzarse más, quizá con un tono más firme" },
];
const CANALE_OPTIONS: Option[] = [
  {
    value: "cambia",
    label: "Cambias de canal — una demostración lenta en el borde, o un contacto físico guiado (la cabeza acompañada en el movimiento correcto)",
  },
  { value: "parole", label: "Repites otra vez con palabras" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Tommaso se vuelve otra vez hacia ti. Responde, un poco inseguro pero en la dirección correcta: «...¿de lado?» Has recuperado la información que necesitabas — sabe la parte general, le falta el detalle que se le escapó con el ruido.",
  },
  B: {
    ok: false,
    text: "Tommaso lo intenta, pero se equivoca justo en el detalle de la última parte que no había oído — gira la cabeza demasiado tarde respecto al brazo, un error que ya no cometía desde hacía semanas.",
  },
  D: {
    ok: false,
    text: "Tommaso cree que lo han regañado por vago, pero no es culpa suya: simplemente no lo había oído. Se cierra un poco, hace el ejercicio de forma mecánica, sin intentar corregirse cuando se equivoca.",
  },
};

const SCELTA2_VERSION_TEXT: Record<Scelta2Version, string> = {
  pulita: "Tommaso ha respondido bien a la pregunta de comprobación, prueba el ejercicio con la información correcta.",
  "errore-successo": "Tommaso se ha equivocado en el detalle que se le había escapado, pero sin ninguna reprimenda de por medio.",
  "recupero-riuscito": "Tommaso sabe que lo malinterpretaron y luego lo entendieron: lo intenta de nuevo, un poco más seguro.",
  "mai-recuperato": "Tommaso ha dejado de intentar corregirse solo, hace el ejercicio de forma mecánica.",
};

export const casoReale01StepsEs: Step[] = [
  // 0 — intro
  {
    day: "caso real 01",
    pct: 0,
    nextLabel: "Empezar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casos Reales · Escenario 01</div>
        <h1>El niño que se distrae</h1>
        <p className="lede">
          Franja 6-10 años. Competencias tratadas: observar e interpretar (Cap. 3) · sintonía (Cap. 4) · la
          feedback (Cap. 7) · cambiar de rumbo (Cap. 8).
        </p>
        <div className="card">
          A diferencia de un capítulo o de un turno de examen, este escenario es breve y autónomo — no tiene una
          puntuación de examen: es material al que puedes volver cuando quieras.
        </div>
      </>
    ),
  },

  // 1 — situación
  {
    day: "situación",
    pct: 14,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.situ,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = situOutcome(answers);
      const fb = outcome ? SITU_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Situación</div>
          <h1>Tommaso, 8 años</h1>
          <p className="lede">
            Tercera clase de la semana. Estás trabajando la respiración lateral en el borde de la piscina, un
            ejercicio que ya ha hecho otras veces. A mitad de la explicación, Tommaso mira hacia la entrada — ha
            llegado un grupo nuevo, hacen ruido al dejar las bolsas en el suelo. Cuando vuelve a mirarte, tienes la
            sensación de que no oyó la última parte de lo que dijiste.
          </p>
          <p className="prompt">¿Qué haces — antes de dejarle probar el ejercicio?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Lo que haces de verdad, en la práctica</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — scelta1b, solo se esito D
  {
    day: "elección 1B — recuperación",
    pct: 28,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1b && !!a.scelta1b,
    visible: (a) => needsRecupero(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Elección 1B · solo porque no reconociste la causa</div>
        <h1>Algo no encaja</h1>
        <p className="lede">
          Tommaso hace el ejercicio mecánicamente, cometiendo el mismo error de antes sin intentar corregirse. No
          parece desganado — parece un poco apagado, como quien espera otra reprimenda.
        </p>
        <p className="prompt">Te das cuenta de que algo no encaja en tu primera lectura. ¿Qué haces ahora?</p>
        <Field id="q1b" value={answers.q1b ?? ""} onChange={(v) => setReflection("q1b", v)} />
        <h2>Lo que haces de verdad, en la práctica</h2>
        <OptionGroup name="scelta1b" options={SCELTA1B_OPTIONS} selected={answers.scelta1b} onPick={(v) => setResponse("scelta1b", v)} />
        {answers.scelta1b === "verifica" && (
          <div className="feedback ok">
            Tommaso se anima un poco: «...no, en realidad no.» No era desgana: se le había escapado un trozo, y la
            reprimenda solo lo había desanimado más.
          </div>
        )}
        {answers.scelta1b === "insiste" && (
          <div className="feedback retry">
            Tommaso hace dos intentos más, siempre iguales, sin volver a intentar corregirse solo. Ha dejado de
            buscar — no porque no sepa, sino porque ha entendido que, para ti, el problema es él y no el detalle
            que se le escapó.
          </div>
        )}
      </>
    ),
  },

  // 3 — scelta2, il ritorno
  {
    day: "elección 2 — el feedback",
    pct: 45,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q2,
    render: ({ answers, setReflection }: StepContext) => {
      const v = scelta2Version(answers);
      const esito =
        v === "pulita" || v === "recupero-riuscito"
          ? "Tommaso prueba el ejercicio, y le sale casi bien."
          : "Tommaso prueba el ejercicio, y repite el mismo error en el detalle que se le había escapado.";
      return (
        <>
          <div className="eyebrow">Elección 2 · El feedback</div>
          <h1>El contexto con el que llegas</h1>
          <div className="card">{SCELTA2_VERSION_TEXT[v]}</div>
          <p className="lede">{esito}</p>
          <p className="prompt">Escribe el feedback que le das ahora — específico sobre el comportamiento, nunca sobre la persona.</p>
          <Field id="q2" value={answers.q2 ?? ""} onChange={(v2) => setReflection("q2", v2)} />
        </>
      );
    },
  },

  // 4 — scelta3, cambiare strada, solo se serve
  {
    day: "elección 3 — cambiar de rumbo",
    pct: 65,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q3 && !!a.canale,
    visible: (a) => needsScelta3(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = answers.canale as "cambia" | "parole" | undefined;
      return (
        <>
          <div className="eyebrow">Elección 3 · Cambiar de rumbo</div>
          <h1>Mismo error, una tercera vez</h1>
          <p className="lede">
            Después del feedback específico, Tommaso lo intenta de nuevo — mismo error una tercera vez. La
            explicación con palabras, aunque repetida con precisión, ya no basta.
          </p>
          <p className="prompt">¿Qué haces ahora — sin repetir otra vez las mismas palabras?</p>
          <Field id="q3" value={answers.q3 ?? ""} onChange={(v) => setReflection("q3", v)} />
          <h2>Lo que haces de verdad, en la práctica</h2>
          <OptionGroup name="canale" options={CANALE_OPTIONS} selected={answers.canale} onPick={(v) => setResponse("canale", v)} />
          {outcome === "cambia" && (
            <div className="feedback ok">
              En el siguiente intento el movimiento es casi correcto — no perfecto, pero la cabeza gira en el
              momento adecuado.
            </div>
          )}
          {outcome === "parole" && (
            <div className="feedback retry">
              Tommaso sigue cometiendo el mismo error. Ya no es un problema de distracción: se ha convertido en un
              problema de canal — y el canal «decir» ya ha demostrado, tres veces, que no basta.
            </div>
          )}
        </>
      );
    },
  },

  // 5 — chiusura
  {
    day: "cierre",
    pct: 84,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Cierre</div>
        <h1>Qué te llevas</h1>
        <p className="prompt">
          En todas las versiones: ¿qué te llevas, de este escenario, para la próxima vez que un alumno parezca
          distraído en vez de en dificultad?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Reflexión libre, no cuenta para ninguna puntuación: los Casos Reales no son un examen, son material de
          entrenamiento al que puedes volver en cualquier momento.
        </p>
      </>
    ),
  },

  // 6 — come si legge
  {
    day: "cómo se lee",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const oss =
        o === "A" ? "gestionada a la primera" : o === "B" ? "gestionada en parte" : recuperato(answers) ? "equivocada, pero recuperada" : "equivocada, no recuperada";
      const showScelta3 = needsScelta3(answers);
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Escenario completado</div>
          <div className="eyebrow">Cómo se lee este escenario</div>
          <h1>El niño que se distrae</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Observar e interpretar (Cap. 3)</span>
              <span className="esito">{oss}</span>
            </div>
            <div className="result-row">
              <span className="comp">El feedback (Cap. 7)</span>
              <span className="esito">registrado <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
            {showScelta3 && (
              <div className="result-row">
                <span className="comp">Cambiar de rumbo (Cap. 8)</span>
                <span className="esito">{answers.canale === "cambia" ? "gestionada" : "por reforzar"}</span>
              </div>
            )}
          </div>
          <p className="lede">
            La primera elección tiene tres desenlaces, no dos: reconocer la distracción y actuar bien no es lo
            mismo que reconocerla e ignorarla. Un error de lectura no cierra el escenario — abre una segunda
            bifurcación, con una recuperación real posible.
          </p>
        </>
      );
    },
  },
];
