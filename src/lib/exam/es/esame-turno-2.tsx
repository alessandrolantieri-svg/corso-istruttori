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

// Traducción al español, no es un turno independiente: mismos chapterId/claves de respuesta/valores
// internos que el turno italiano (src/lib/exam/esame-turno-2.tsx) — solo cambia el texto visible.
// Porta 1:1 beat1Outcome()/needsBeat2A()/beat2Version()/soggetto() del mockup esame-turno2.html:
// aquí, a diferencia del Turno 1, el Beat 1 es una única encrucijada con tres resultados (no dos
// lecturas separadas).
type Beat1Outcome = "A" | "B" | "D" | null;
function beat1Outcome(a: Record<string, string>): Beat1Outcome {
  return (a.beat1 as Beat1Outcome) || null;
}
function needsBeat2A(a: Record<string, string>): boolean {
  return beat1Outcome(a) === "D";
}
type Beat2Version = "pulita" | "leonardo-rigido" | "recupero-riuscito" | "leonardo-fuori";
function beat2Version(a: Record<string, string>): Beat2Version {
  const o = beat1Outcome(a);
  if (o === "A") return "pulita";
  if (o === "B") return "leonardo-rigido";
  if (o === "D") return a.beat2a === "cambia" ? "recupero-riuscito" : "leonardo-fuori";
  return "pulita";
}
function soggetto(a: Record<string, string>): string {
  return beat2Version(a) === "leonardo-fuori" ? "Sofia" : "Leonardo";
}

const BEAT1_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Reconoces que el problema no es el salto, es hacerlo primero delante de todos — le ofreces un papel o una salida que no es una rendición («enséñame tú cómo lo harías diferente»)",
  },
  {
    value: "B",
    label: "Entiendes que el problema es relacional, pero aun así insistes en que lo pruebe ya, delante de todos («venga, hazlo y ya está, todos están mirando»)",
  },
  {
    value: "D",
    label: "Le explicas otra vez la técnica del salto, quizá más despacio («mira, es fácil: doblas las rodillas...»)",
  },
];
const BEAT2A_OPTIONS: Option[] = [
  {
    value: "cambia",
    label: "Reconoces el error y cambias de enfoque — dejas de explicar la técnica, te acercas, bajas la voz, le ofreces una salida que no lo expone",
  },
  {
    value: "insisti",
    label: "Insistes con la misma lectura — repites la explicación técnica, quizá con más firmeza",
  },
];
const CANALE_OPTIONS: Option[] = [
  {
    value: "cambia",
    label: "Cambias de canal — enseñas el salto despacio desde el borde, o guías físicamente la posición de los brazos",
  },
  { value: "parole", label: "Lo repites otra vez con palabras, aunque las reformules de otra manera" },
];

const BEAT1_FEEDBACK: Record<Exclude<Beat1Outcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Leonardo se descoloca un instante, luego suelta los brazos. Propone una pequeña variante suya, no exactamente el salto previsto pero parecida — y la hace.",
  },
  B: {
    ok: false,
    text: "Leonardo lo hace, pero con los hombros rígidos y sin mirar a nadie — obedece, no participa.",
  },
  D: {
    ok: false,
    text: "Leonardo no estaba pidiendo una explicación técnica — ya lo habías notado por el tono, pero la explicación llega igual. Se cierra más: «he dicho que no.» Un compañero cercano se ríe por lo bajo.",
  },
};

const BEAT2_VERSION_TEXT: Record<Beat2Version, string> = {
  pulita: "Leonardo se prepara en el borde, relajado, listo para probar su variante.",
  "leonardo-rigido": "Leonardo está en el borde, pero su cuerpo está tenso: lo intenta sin participar de verdad.",
  "recupero-riuscito": "Leonardo, tras mirar a Sofia, se acerca él solo, un poco cauteloso pero genuino.",
  "leonardo-fuori":
    "Leonardo se queda sentado fuera del grupo. Le toca a Sofia, que de todos modos esperaba su turno — el beat continúa con ella, con un ojo que tiene que quedarse en Leonardo, sin excluirlo del todo.",
};

export const esameTurno2StepsEs: Step[] = [
  // 0 — intro
  {
    day: "antes de empezar",
    pct: 0,
    nextLabel: "Empezar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Examen final · Turno 2</div>
        <h1>La situación difícil</h1>
        <p className="lede">
          Estás con un grupo de chicos de 11 a 13 años. Le toca a <strong>Leonardo (12 años)</strong> probar primero
          un salto de salida — nunca lo ha hecho antes, nunca delante del grupo. También{" "}
          <strong>Sofia (11 años)</strong> espera su turno, un poco más atrás.
        </p>
        <div className="card warn">
          Esto no es un capítulo. No hay un botón «siguiente pregunta». Solo está lo que pasa después de lo que
          eliges.
        </div>
        <p className="lede">
          Como en el Turno 1: el turno está dividido en <strong>beats</strong> — los momentos de la misma escena,
          uno tras otro — y la nota va de 80 a 100, con el <strong>100 con honores</strong> reservado para quien
          también sabe recuperar bien un error en tiempo real.
        </p>
      </>
    ),
  },

  // 1 — beat1
  {
    day: "beat 1",
    pct: 12,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.beat1,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = beat1Outcome(answers);
      const fb = outcome ? BEAT1_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Beat 1 · El rechazo</div>
          <h1>«No lo hago, es una estupidez.»</h1>
          <p className="lede">
            Leonardo se para en el borde, cruza los brazos. No tiembla, no busca tu mirada, no parece asustado —
            parece alguien que ha decidido.
          </p>
          <p className="prompt">
            ¿Es más probable que Leonardo no pueda hacerlo o que no quiera? ¿Y qué haces — no qué le explicas otra
            vez?
          </p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Qué haces en realidad, en la práctica</h2>
          <OptionGroup name="beat1" options={BEAT1_OPTIONS} selected={answers.beat1} onPick={(v) => setResponse("beat1", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — beat2a, solo si el resultado es D
  {
    day: "beat 2a — recuperación",
    pct: 24,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q2a && !!a.beat2a,
    visible: (a) => needsBeat2A(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Beat 2A · solo porque el diagnóstico era erróneo</div>
        <h1>Un rechazo observado por los demás</h1>
        <p className="lede">
          Leonardo sigue quieto, con los brazos cruzados. La risita de un compañero cercano no ayuda — ahora ya no
          es solo un rechazo, es un rechazo observado por los demás.
        </p>
        <p className="prompt">Tienes una segunda encrucijada. ¿Qué haces ahora?</p>
        <Field id="q2a" value={answers.q2a ?? ""} onChange={(v) => setReflection("q2a", v)} />
        <h2>Qué haces en realidad, en la práctica</h2>
        <OptionGroup name="beat2a" options={BEAT2A_OPTIONS} selected={answers.beat2a} onPick={(v) => setResponse("beat2a", v)} />
        {answers.beat2a === "cambia" && (
          <div className="feedback ok">
            Leonardo se relaja, no del todo — sigue un poco cauteloso — pero asiente. Mira a Sofia intentarlo y
            luego, sin que nadie se lo vuelva a pedir, se acerca al borde.
          </div>
        )}
        {answers.beat2a === "insisti" && (
          <div className="feedback retry">
            Leonardo da un paso atrás, se sienta en el borde, fuera del grupo de los que esperan su turno. Ya no
            responde.
          </div>
        )}
      </>
    ),
  },

  // 3 — beat2, la comprobación que no se ve
  {
    day: "beat 2",
    pct: 38,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q2,
    render: ({ answers, setReflection }: StepContext) => {
      const chi = soggetto(answers);
      return (
        <>
          <div className="eyebrow">Beat 2 · La comprobación que no se ve</div>
          <h1>El contexto con el que llegas</h1>
          <div className="card">{BEAT2_VERSION_TEXT[beat2Version(answers)]}</div>
          <p className="lede">
            <strong>{chi} prueba el salto.</strong> Entra de barriga en vez de de cabeza — los brazos no están
            extendidos hacia delante en el momento de la entrada.
          </p>
          <p className="prompt">
            ¿Cómo compruebas si la instrucción anterior ha llegado — sin preguntar «¿lo has entendido?» — y qué
            notas?
          </p>
          <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        </>
      );
    },
  },

  // 4 — beat3a, cambiar de estrategia
  {
    day: "beat 3 — cambiar de rumbo",
    pct: 52,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q3 && !!a.canale,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const chi = soggetto(answers);
      return (
        <>
          <div className="eyebrow">Beat 3 · Cambiar de rumbo</div>
          <h1>Mismo error, segundo intento</h1>
          <p className="lede">
            Intentas corregir la entrada con palabras: «mantén los brazos más juntos y extendidos al entrar.» En el
            segundo intento, mismo error — de barriga, brazos sin extender.
          </p>
          <p className="prompt">
            El segundo intento es igual que el primero. ¿Qué haces ahora — no repetir las mismas palabras?
          </p>
          <Field id="q3" value={answers.q3 ?? ""} onChange={(v) => setReflection("q3", v)} />
          <h2>Qué haces en realidad, en la práctica</h2>
          <OptionGroup name="canale" options={CANALE_OPTIONS} selected={answers.canale} onPick={(v) => setResponse("canale", v)} />
          {answers.canale === "cambia" && (
            <div className="feedback ok">
              En el tercer intento la entrada es casi correcta — no perfecta, pero los brazos se quedan extendidos,
              y entra de cabeza.
            </div>
          )}
          {answers.canale === "parole" && (
            <div className="feedback retry">
              El tercer intento es idéntico al segundo — {chi} empieza a mostrar signos de cansancio en la atención,
              ya no en el error en sí.
            </div>
          )}
          <p className="lede" style={{ marginTop: 14, fontSize: ".86rem" }}>
            ({chi} es quien está probando el salto en esta versión del turno.)
          </p>
        </>
      );
    },
  },

  // 5 — beat3b, el feedback
  {
    day: "beat 3 — el feedback",
    pct: 66,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q4,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Beat 3 · El feedback</div>
        <h1>Sea cual sea el resultado del tercer intento</h1>
        <p className="lede">
          Sea cual sea el resultado del tercer intento — casi correcto, o igual que antes — tienes que dar un
          feedback.
        </p>
        <p className="prompt">Escribe el feedback que le das ahora, específico sobre el comportamiento, no sobre la persona.</p>
        <Field id="q4" value={answers.q4 ?? ""} onChange={(v) => setReflection("q4", v)} />
      </>
    ),
  },

  // 6 — cierre
  {
    day: "cierre",
    pct: 82,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => (beat2Version(a) === "leonardo-fuori" ? !!a.qleonardo && !!a.qchiusura : !!a.qchiusura),
    render: ({ answers, setReflection }: StepContext) => {
      const isFuori = beat2Version(answers) === "leonardo-fuori";
      return (
        <>
          <div className="eyebrow">Cierre del Turno 2</div>
          <h1>{isFuori ? "Antes de seguir adelante" : "Qué te llevas"}</h1>
          {isFuori && (
            <>
              <p className="prompt">
                ¿Vuelves con Leonardo, que sigue sentado en el borde? ¿Qué le dices, o no le dices, antes de
                terminar?
              </p>
              <Field id="qleonardo" value={answers.qleonardo ?? ""} onChange={(v) => setReflection("qleonardo", v)} />
              <p className="lede" style={{ marginTop: 10, fontSize: ".84rem" }}>
                No cuenta para la nota — pero el sistema registra si la puerta se queda abierta para el próximo
                turno, o si el rechazo se queda sin una palabra más.
              </p>
            </>
          )}
          <p className="prompt" style={{ marginTop: 18 }}>
            En todas las versiones: ¿qué te llevas de este turno, para el siguiente?
          </p>
          <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        </>
      );
    },
  },

  // 7 — resultado
  {
    day: "resultado",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = beat1Outcome(answers);
      const c9 =
        o === "A"
          ? "resuelta a la primera"
          : o === "B"
            ? "resuelta en parte"
            : answers.beat2a === "cambia"
              ? "fallada, pero recuperada"
              : "fallada, sin recuperar";
      const c8 = answers.canale === "cambia" ? "resuelta a la primera" : "por reforzar";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Turno 2 completado</div>
          <div className="eyebrow">Cómo se lee el resultado</div>
          <h1>La situación difícil</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">C9 · Situaciones difíciles</span>
              <span className="esito">{c9}</span>
            </div>
            <div className="result-row">
              <span className="comp">C6 <i className="ph-duotone ph-trophy" aria-hidden="true" /> · Verificar con la acción</span>
              <span className="esito">registrado <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
            <div className="result-row">
              <span className="comp">C8 · Cambiar de rumbo</span>
              <span className="esito">{c8}</span>
            </div>
            <div className="result-row">
              <span className="comp">C7 · El feedback</span>
              <span className="esito">registrado <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
          </div>
          {o === "D" && answers.beat2a === "cambia" && (
            <div className="card quote">
              Darte cuenta en tiempo real de que has leído mal la situación, y cambiar de rumbo delante del grupo
              sin dar marcha atrás de forma torpe: esto es una recuperación excelente, hecha ante los ojos de todos.
              Y es exactamente el tipo de prueba que hace falta para el 100 con honores.
            </div>
          )}
          <p className="lede">
            El turno continúa en cualquier caso — coherente con «no se puede fallar, solo posponer». El próximo
            turno te espera: <strong>Turno 3 — Los adolescentes, y quien ya sabe arreglárselas solo.</strong>
          </p>
        </>
      );
    },
  },
];
